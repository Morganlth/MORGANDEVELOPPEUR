<!-- #SCRIPT -->

<script>
// Code inspired, adapted / modified for texture projection in Three js from: https://github.com/marcofugaro/three-projected-material

// #IMPORTS

    // --JS
    import MATH from '../../assets/js/utils/math'
    import SHADER_VERTEX from '../../assets/js/glsl/vertex'
    import SHADER_FRAGMENT from '../../assets/js/glsl/fragment'

    // --LIB
    import { COLORS } from '$lib/app'
    import SPACECUBE_CUBES from '../../assets/js/datas/spacecube_cubes'

    // --CONTEXT
    import { EVENT } from '../../App.svelte'

    // --THREE
    import WebGL from 'three/addons/capabilities/WebGL'
    import
    {
        AmbientLight,
        BoxGeometry,
        DirectionalLight,
        Matrix4,
        Mesh,
        MeshStandardMaterial,
        PerspectiveCamera,
        Plane,
        Raycaster,
        Scene,
        SpotLight,
        TextureLoader,
        Vector2,
        Vector3,
        WebGLRenderer
    } from 'three'

    import { OrbitControls } from 'three/addons/controls/OrbitControls'

    // --SVELTE
    import { onMount, onDestroy } from 'svelte'

// #CONSTANTES

    // --ELEMENT-SPACECUBE
    const
    SPACECUBE_TEXTUREOFFSET = new Vector2(-0.22, 0),
    SPACECUBE_EVENTS =
    {
        mouseMove: spacecube_mouseMove,
        resize: spacecube_resize,
        animation: spacecube_animation
    }

// #VARIABLES

    // --ELEMENT-SPACECUBE
    let
    spacecube,
    spacecube_SCENE,
    spacecube_CAMERA,
    spacecube_RENDERER,
    spacecube_MOUSELIGHT,
    spacecube_TEXTURE,
    spacecube_CONTROLS

    // --SHADERS
    let
    shader_UNIFORMS =
    {
        viewMatrixCamera: { value: new Matrix4() },
        projectionMatrixCamera: { value: new Matrix4() },
        projPosition: { value: new Vector3() },
        projDirection: { value: new Vector3(0, 0, -1) },
        projectedTexture: { value: '' },
        widthScaled: { value: 0 },
        heightScaled: { value: 0 },
        textureOffset: { value: SPACECUBE_TEXTUREOFFSET }
    }

// #FUNCTIONS

    // --SET
    function spacecube_set()
    {
        if (WebGL.isWebGLAvailable())
        {
            spacecube_setVar()
            spacecube_setCamera()
            spacecube_setRenderer()
            spacecube_setBackground()
            spacecube_setScene()
        }
    }

    function spacecube_setVar()
    {
        spacecube_SCENE = new Scene()
        spacecube_CAMERA = new PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 7)
        spacecube_RENDERER = new WebGLRenderer({ alpha: true, antialias: true, canvas: spacecube })

        // spacecube_CONTROLS = new OrbitControls(spacecube_CAMERA, spacecube_RENDERER.domElement)
    }

    function spacecube_setCamera()
    {
        spacecube_CAMERA.position.z = 5
        spacecube_CAMERA.lookAt(0, 0, 0)
    }

    function spacecube_setRenderer()
    {
        spacecube_RENDERER.setSize(window.innerWidth, window.innerHeight)
        spacecube_RENDERER.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    }

    function spacecube_setBackground() { spacecube_RENDERER.setClearColor(0x000000, 0) }

    function spacecube_setScene()
    {
        new TextureLoader().load('./images/me.png', async (texture) =>
        {
            spacecube_TEXTURE = texture

            spacecube_updateCameraMatrices()
            shader_setUniforms()
            spacecube_setCubes()
            spacecube_setLight()
            spacecube_setEvent()
        })
    }

    function spacecube_setCubes()
    {
        for (let i = 0; i < SPACECUBE_CUBES.length; i += 3)
        {
            const
            SIZE = SPACECUBE_CUBES[i],
            GEOMETRY = new BoxGeometry(SIZE, SIZE, SIZE),
            MATERIAL = new MeshStandardMaterial({ color: COLORS.dark }),
            CUBE = new Mesh(GEOMETRY, MATERIAL)

            MATERIAL.onBeforeCompile = shader_set.bind(CUBE)

            CUBE.position.set(SPACECUBE_CUBES[i + 1], SPACECUBE_CUBES[i + 2])
            CUBE.rotation.x = -MATH.rad.r45 / 2
            CUBE.rotation.y = MATH.rad.r45

            CUBE.updateWorldMatrix(true, false)
    
            spacecube_SCENE.add(CUBE)
        }
    }
    function shader_set(shader)
    {
        shader.uniforms =
        {
            ...shader_UNIFORMS,
            ...shader.uniforms,
            savedModelMatrix: { value: this.matrixWorld }
        }
        shader.vertexShader = spacecube_monkeyPatch(shader.vertexShader, SHADER_VERTEX)
        shader.fragmentShader = spacecube_monkeyPatch(shader.fragmentShader, SHADER_FRAGMENT)
    }

    function spacecube_setLight()
    {
        spacecube_setAmbientLight()
        spacecube_setDirectionalLight()
        spacecube_setSpotLight()
        spacecube_setMouseLight()
    }
    function spacecube_setAmbientLight()
    {
        const AMBIENTLIGHT = new AmbientLight(COLORS.light)

        spacecube_SCENE.add(AMBIENTLIGHT)
    }
    function spacecube_setDirectionalLight()
    {
        const DIRECTIONALLIGHT = new DirectionalLight(COLORS.light, 2)

        DIRECTIONALLIGHT.position.set(5, -2, 0)

        spacecube_SCENE.add(DIRECTIONALLIGHT)
    }
    function spacecube_setSpotLight()
    {
        const SPOTLIGHT = new SpotLight(COLORS.primary, 70, 10, .3, .7, .7)

        // SPOTPRIMARYLIGHT.position.set(-7, -2, .7)
        SPOTLIGHT.position.set(5, -5, .7)
        SPOTLIGHT.target.position.set(6, 0, 0)

        spacecube_SCENE.add(SPOTLIGHT)
        spacecube_SCENE.add(SPOTLIGHT.target)
    }
    function spacecube_setMouseLight()
    {
        spacecube_MOUSELIGHT = new SpotLight(COLORS.primary, 2, 11, .35, 1, .7)

        spacecube_MOUSELIGHT.position.z = 5

        spacecube_SCENE.add(spacecube_MOUSELIGHT)
        spacecube_SCENE.add(spacecube_MOUSELIGHT.target)
    }

    function spacecube_setEvent() { EVENT.event_add(SPACECUBE_EVENTS) }

    function shader_setUniforms()
    {
        const MODEL_MATRIX_CAMERA = spacecube_CAMERA.matrixWorld

        shader_UNIFORMS.projectedTexture.value = spacecube_TEXTURE
        shader_UNIFORMS.viewMatrixCamera.value.copy(spacecube_CAMERA.matrixWorldInverse)
        shader_UNIFORMS.projPosition.value.setFromMatrixPosition(MODEL_MATRIX_CAMERA)
        shader_UNIFORMS.projDirection.value.set(0, 0, 1).applyMatrix4(MODEL_MATRIX_CAMERA)

        shader_updateProjectionMatrixCamera()
        shader_updateTextureDimensions()
    }

    // --DESTROY
    function spacecube_destroy() { EVENT.event_remove(SPACECUBE_EVENTS) }

    // --UPDATES
    function spacecube_updateCameraMatrices()
    {
        spacecube_CAMERA.updateProjectionMatrix()
        spacecube_CAMERA.updateMatrixWorld()
        spacecube_CAMERA.updateWorldMatrix()
    }

    function shader_updateProjectionMatrixCamera() { shader_UNIFORMS.projectionMatrixCamera.value.copy(spacecube_CAMERA.projectionMatrix) }

    function shader_updateTextureDimensions()
    {
        const [TEXTURE_WIDTHSCALED, TEXTURE_HEIGHTSCALED] = spacecube_computeScaledDimensions(spacecube_TEXTURE.image, spacecube_CAMERA)

        shader_UNIFORMS.widthScaled.value = TEXTURE_WIDTHSCALED
        shader_UNIFORMS.heightScaled.value = TEXTURE_HEIGHTSCALED
    }

    // --EVENTS
    async function spacecube_mouseMove(clientX, clientY)
    {
        const
        [X, Y] = [(clientX / window.innerWidth) * 2 - 1, -(clientY / window.innerHeight) * 2 + 1],
        RAYCASTER = new Raycaster(),
        INTERSECTION = new Vector3()
    
        RAYCASTER.setFromCamera(new Vector2(X, Y), spacecube_CAMERA)
        RAYCASTER.ray.intersectPlane(new Plane(new Vector3(0, 0, 1), 0), INTERSECTION)

        spacecube_MOUSELIGHT.target.position.set(INTERSECTION.x, INTERSECTION.y, 0)
    }

    async function spacecube_resize()
    {
        spacecube_CAMERA.aspect = window.innerWidth / window.innerHeight
        spacecube_CAMERA.updateProjectionMatrix()

        spacecube_setRenderer()
        shader_updateProjectionMatrixCamera()
        shader_updateTextureDimensions()
    }

    async function spacecube_animation()
    {
        spacecube_RENDERER.render(spacecube_SCENE, spacecube_CAMERA)
        
        // spacecube_CONTROLS.update()
    }

    // --UTILS
    function spacecube_monkeyPatch(shader, _ref)
    {
        let
        patchedShader = shader,
        { header = '', main = '', ...replaces } = _ref

        for (const KEY in replaces) patchedShader = patchedShader.split(KEY).join(replaces[KEY])

        return patchedShader.replace('void main() {', `${header} void main() { ${main}`)
    }

    function spacecube_computeScaledDimensions(image, camera)
    {
        const
        RATIO = image.naturalWidth / image.naturalHeight,
        CAMERA_RATIO = camera.aspect,
        CAMERA_HEIGHT = 1 / CAMERA_RATIO

        return RATIO < CAMERA_RATIO
        ? [1 / (CAMERA_HEIGHT * RATIO), 1]
        : [1, 1 / (1 / RATIO / CAMERA_HEIGHT)]
    }


// #CYCLES

onMount(spacecube_set)
onDestroy(spacecube_destroy)
</script>

<!-- #HTML -->

<canvas
class="space-cube"
bind:this={spacecube}
>
</canvas>

<!-- #STYLE -->

<style
lang="scss"
>
/* #USE */

@use '../../assets/scss/styles/position';

/* #SPACECUBE */

.space-cube { @include position.placement(absolute, 0, auto, auto, 0); }
</style>