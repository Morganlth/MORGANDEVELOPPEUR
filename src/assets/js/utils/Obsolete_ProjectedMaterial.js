// Code simplified and modified since: https://github.com/marcofugaro/three-projected-material

import { Matrix4, MeshStandardMaterial, Vector3 } from 'three'

  import SHADERS_VERTEX from '../glsl/vertex'
  import SHADERS_FRAGMENT from '../glsl/fragment'

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
        // Object.assign(this.uniforms, shader.uniforms)
        shader.uniforms = { ...this.uniforms, ...shader.uniforms}
    
        shader.vertexShader = monkeyPatch(shader.vertexShader, SHADERS_VERTEX)
        shader.fragmentShader = monkeyPatch(shader.fragmentShader, SHADERS_FRAGMENT)
    }

    project(mesh)
    {
      // make sure the matrix is updated
      mesh.updateWorldMatrix(true, false)

      // we save the object model matrix so it's projected relative
      // to that position, like a snapshot
      // this.uniforms.savedModelMatrix.value.copy(mesh.matrixWorld)
      this.uniforms.savedModelMatrix.value = mesh.matrixWorld

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
  const MODEL_MATRIX_CAMERA = this.camera.matrixWorld

  this.uniforms.viewMatrixCamera.value.copy(this.camera.matrixWorldInverse)
  this.uniforms.projectionMatrixCamera.value.copy(this.camera.projectionMatrix)
  this.uniforms.projPosition.value.setFromMatrixPosition(MODEL_MATRIX_CAMERA)
  this.uniforms.projDirection.value.set(0, 0, 1).applyMatrix4(MODEL_MATRIX_CAMERA)
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
