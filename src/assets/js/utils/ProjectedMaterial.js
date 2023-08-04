// Code simplified and modified since: https://github.com/marcofugaro/three-projected-material

import { Matrix4, MeshStandardMaterial, Vector3 } from 'three'

function monkeyPatch(shader, _ref)
{
    let
    patchedShader = shader,
    { header = '', main = '', ...replaces } = _ref

    for (const KEY in replaces) patchedShader = patchedShader.split(KEY).join(replaces[KEY])

    return patchedShader.replace('void main() {', `${header} void main() { ${main}`)
}

class ProjectedMaterial extends MeshStandardMaterial
{
    constructor(_temp)
    {
      let { camera, texture, textureOffset, ...color } = _temp
    
      super(color)

      this.camera = camera
      this.texture = texture
      this.textureOffset = textureOffset
      this.onBeforeCompile = this.setShaders

      this.setUniforms()

                              // Listen on resize if the camera used for the projection
                              // is the same used to render.
                              // We do this on window resize because there is no way to
                              // listen for the resize of the renderer
                              // window.addEventListener('resize', _classPrivateFieldLooseBase(this, _saveCameraProjectionMatrix)[_saveCameraProjectionMatrix]);
  }

    setUniforms()
    {
      // scale to keep the image proportions and apply textureScale
      const [TEXTURE_WIDTHSCALED, TEXTURE_HEIGHTSCALED] = computeScaledDimensions(this.texture.image, this.camera)

      this.uniforms =
      {
          projectedTexture: { value: this.texture },
          // don't show the texture if we haven't called project()
          isTextureProjected: { value: false },
          // these will be set on project()
          viewMatrixCamera: { value: new Matrix4() },
          projectionMatrixCamera: { value: new Matrix4() },
          projPosition: { value: new Vector3() },
          projDirection: { value: new Vector3(0, 0, -1) },
          // we will set this later when we will have positioned the object
          savedModelMatrix: { value: new Matrix4() },
          widthScaled: { value: TEXTURE_WIDTHSCALED },
          heightScaled: { value: TEXTURE_HEIGHTSCALED },
          textureOffset: { value: this.textureOffset }
      }
    }

    setShaders(shader)
    {
        // expose also the material's uniforms
        Object.assign(this.uniforms, shader.uniforms)
        shader.uniforms = this.uniforms
    
        shader.vertexShader = monkeyPatch(shader.vertexShader,
        {
            header: /* glsl */`
              uniform mat4 viewMatrixCamera;
              uniform mat4 projectionMatrixCamera;

              #ifdef USE_INSTANCING
              attribute vec4 savedModelMatrix0;
              attribute vec4 savedModelMatrix1;
              attribute vec4 savedModelMatrix2;
              attribute vec4 savedModelMatrix3;
              #else
              uniform mat4 savedModelMatrix;
              #endif

              varying vec3 vSavedNormal;
              varying vec4 vTexCoords;
              varying vec4 vWorldPosition;
            `,
            main: /* glsl */`
              #ifdef USE_INSTANCING
              mat4 savedModelMatrix = mat4(
                savedModelMatrix0,
                savedModelMatrix1,
                savedModelMatrix2,
                savedModelMatrix3
              );
              #endif

              vSavedNormal = mat3(savedModelMatrix) * normal;
              vTexCoords = projectionMatrixCamera * viewMatrixCamera * savedModelMatrix * vec4(position, 1.0);
              vWorldPosition = savedModelMatrix * vec4(position, 1.0);
            `
        })
  
        shader.fragmentShader = monkeyPatch(shader.fragmentShader,
        {
            header: /* glsl */`
                uniform sampler2D projectedTexture;
                uniform bool isTextureProjected;
                uniform vec3 projPosition;
                uniform vec3 projDirection;
                uniform float widthScaled;
                uniform float heightScaled;
                uniform vec2 textureOffset;

                varying vec3 vSavedNormal;
                varying vec4 vTexCoords;
                varying vec4 vWorldPosition;

                float mapRange(float value, float min1, float max1, float min2, float max2) { return min2 + (value - min1) * (max2 - min2) / (max1 - min1); }
            `,
            'vec4 diffuseColor = vec4( diffuse, opacity );': /* glsl */`
            // clamp the w to make sure we don't project behind
            float w = max(vTexCoords.w, 0.0);

            vec2 uv = (vTexCoords.xy / w) * 0.5 + 0.5;

            uv += textureOffset;

            // apply the corrected width and height
            uv.x = mapRange(uv.x, 0.0, 1.0, 0.5 - widthScaled / 2.0, 0.5 + widthScaled / 2.0);
            uv.y = mapRange(uv.y, 0.0, 1.0, 0.5 - heightScaled / 2.0, 0.5 + heightScaled / 2.0);

            // this makes sure we don't sample out of the texture
            bool isInTexture = (max(uv.x, uv.y) <= 1.0 && min(uv.x, uv.y) >= 0.0);

            // this makes sure we don't render also the back of the object
            vec3 projectorDirection = normalize(projPosition - vWorldPosition.xyz);

            float dotProduct = dot(vSavedNormal, projectorDirection);
            bool isFacingProjector = dotProduct > 0.0000001;


            vec4 diffuseColor = vec4(diffuse, opacity);

            if (isFacingProjector && isInTexture && isTextureProjected)
            {
                vec4 textureColor = texture2D(projectedTexture, uv);

                // apply the material opacity
                textureColor.a *= opacity;

                // https://learnopengl.com/Advanced-OpenGL/Blending
                diffuseColor = textureColor * textureColor.a + diffuseColor * (1.0 - textureColor.a);
            }
            `
        })
    }

    project(mesh)
    {
      // make sure the matrix is updated
      mesh.updateWorldMatrix(true, false)

      // we save the object model matrix so it's projected relative
      // to that position, like a snapshot
      this.uniforms.savedModelMatrix.value.copy(mesh.matrixWorld)

      // persist also the current camera position and matrices
      saveCameraMatrices.call(this)
    }

    saveCameraProjectionMatrix() // resize ?
    {
        this.uniforms.projectionMatrixCamera.value.copy(this.camera.projectionMatrix)

        saveDimensions.call(this)
    }
}

// get camera ratio from different types of cameras
function saveDimensions()
{
    const [TEXTURE_WIDTHSCALED, TEXTURE_HEIGHTSCALED] = computeScaledDimensions(this.texture.image, this.camera)

    this.uniforms.widthScaled.value = TEXTURE_WIDTHSCALED
    this.uniforms.heightScaled.value = TEXTURE_HEIGHTSCALED
}

function saveCameraMatrices()
{
  // make sure the camera matrices are updated
  this.camera.updateProjectionMatrix()
  this.camera.updateMatrixWorld()
  this.camera.updateWorldMatrix()

  // update the uniforms from the camera so they're
  // fixed in the camera's position at the projection time
  const viewMatrixCamera = this.camera.matrixWorldInverse;
  const projectionMatrixCamera = this.camera.projectionMatrix;
  const modelMatrixCamera = this.camera.matrixWorld;
  this.uniforms.viewMatrixCamera.value.copy(viewMatrixCamera);
  this.uniforms.projectionMatrixCamera.value.copy(projectionMatrixCamera);
  this.uniforms.projPosition.value.setFromMatrixPosition(modelMatrixCamera);
  this.uniforms.projDirection.value.set(0, 0, 1).applyMatrix4(modelMatrixCamera);

  // tell the shader we've projected
  this.uniforms.isTextureProjected.value = true;
}

// scale to keep the image proportions and apply textureScale
function computeScaledDimensions(image, camera)
{
    const
    RATIO = image.naturalWidth / image.naturalHeight,
    CAMERA_RATIO = camera.aspect,
    CAMERA_HEIGHT = 1 / CAMERA_RATIO

    return RATIO < CAMERA_RATIO
    ? [1 / (CAMERA_HEIGHT * RATIO), 1]
    : [1, 1 / (1 / RATIO / CAMERA_HEIGHT)]
}

export default ProjectedMaterial
