<!-- #SCRIPT -->

<script>
// Code inspired, adapted / modified for texture projection in Three js from: https://github.com/marcofugaro/three-projected-material

// #IMPORTS

    // --JS
    import SHADER_VERTEX from '../../assets/js/glsl/vertex'
    import SHADER_FRAGMENT from '../../assets/js/glsl/fragment'
    import MATH from '../../assets/js/utils/math'
    import { animation_floating } from '../../assets/js/utils/animation'
    import { wait_throttle } from '../../assets/js/utils/wait'

    // --LIB
    import { COLORS } from '$lib/app'
    import { SPACECUBE_FIXED_CUBES, SPACECUBE_FLOATING_CUBES } from '../../assets/js/datas/spacecube_cubes'

    // --CONTEXTS
    import { APP, EVENT } from '../../App.svelte'

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
    spacecube_ANIMATIONS = [],
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
        spacecube_RENDERER = new WebGLRenderer({ alpha: true, antialias: true })

        spacecube.appendChild(spacecube_RENDERER.domElement)

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
        spacecube_updateCameraMatrices()
        spacecube_setLight()
        spacecube_setResponsive()

        new TextureLoader().load('./images/me.png', async (texture) =>
        {
            spacecube_TEXTURE = texture

            shader_setUniforms()
            spacecube_setCubes()
            spacecube_setEvent()
        })
    }

    function spacecube_setLight()
    {
        spacecube_setAmbientLight()
        spacecube_setDirectionalLight()
        spacecube_setSpotLight()
    }
    function spacecube_setAmbientLight()
    {
        const AMBIENTLIGHT = new AmbientLight(COLORS.light)

        spacecube_SCENE.add(AMBIENTLIGHT)
    }
    function spacecube_setDirectionalLight()
    {
        const DIRECTIONALLIGHT = new DirectionalLight(COLORS.light, 1.5)

        DIRECTIONALLIGHT.position.set(5, -3, 0)

        spacecube_SCENE.add(DIRECTIONALLIGHT)
    }
    function spacecube_setSpotLight()
    {
        const SPOTLIGHT = new SpotLight(COLORS.primary, 70, 10, .3, .7, .7)

        SPOTLIGHT.position.set(5, -5, .7)
        SPOTLIGHT.target.position.set(6, 0, 0)

        spacecube_SCENE.add(SPOTLIGHT)
        spacecube_SCENE.add(SPOTLIGHT.target)
    }
    function spacecube_setMouseLight()
    {
        spacecube_MOUSELIGHT = new SpotLight(COLORS.light, 1.5, 11, .6, 1, .7)

        spacecube_MOUSELIGHT.position.z = 5

        spacecube_SCENE.add(spacecube_MOUSELIGHT)
        spacecube_SCENE.add(spacecube_MOUSELIGHT.target)
    }

    function spacecube_setCubes()
    {
        spacecube_buildCubes(SPACECUBE_FIXED_CUBES)
        spacecube_buildCubes(SPACECUBE_FLOATING_CUBES, true)
        
        spacecube_ANIMATIONS = wait_throttle(
        (() =>
        {
            const ANIMATIONS = spacecube_ANIMATIONS

            return () => { for (const ANIMATION of ANIMATIONS) ANIMATION() }
        })(), 100)
    }
    function spacecube_setCubeAnimation(cube)
    {
        const ANIMATION = animation_floating().animation

        return async () => cube.position.y += ANIMATION() * 0.001
    }

    function spacecube_setResponsive() { APP.app_addResponsive(spacecube_responsive) }

    function spacecube_setEvent() { EVENT.event_add(SPACECUBE_EVENTS) }

    function shader_set(shader)
    {
        shader.uniforms =
        {
            ...shader_UNIFORMS,
            ...shader.uniforms,
            savedModelMatrix: { value: new Matrix4().copy(this.matrixWorld) }
        }
        shader.vertexShader = spacecube_monkeyPatch(shader.vertexShader, SHADER_VERTEX)
        shader.fragmentShader = spacecube_monkeyPatch(shader.fragmentShader, SHADER_FRAGMENT)
    }

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
    function spacecube_destroy()
    {
        spacecube_destroyResponsive()
        spacecube_destroyEvent()
    }

    function spacecube_destroyResponsive() { APP.app_removeResponsive(spacecube_responsive) }

    function spacecube_destroyEvent() { EVENT.event_remove({ ...SPACECUBE_EVENTS, mouseMove: spacecube_mouseMove }) }

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

    // --RESPONSIVE
    async function spacecube_responsive(mobile)
    {
        EVENT['event_' + (mobile ? 'remove' : 'add')]({ mouseMove: spacecube_mouseMove })

        if (!mobile) spacecube_setMouseLight()
        else if (spacecube_MOUSELIGHT) spacecube_SCENE.remove(spacecube_MOUSELIGHT)
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
        spacecube_ANIMATIONS()

        spacecube_RENDERER.render(spacecube_SCENE, spacecube_CAMERA)
        
        // spacecube_CONTROLS.update()
    }

    // --UTILS
    function spacecube_buildCubes(cubes, float = false)
    {
        for (let i = 0; i < cubes.length; i += 3)
        {
            const
            SIZE = cubes[i],
            GEOMETRY = new BoxGeometry(SIZE, SIZE, SIZE),
            MATERIAL = new MeshStandardMaterial({ color: COLORS.dark, wireframe: false }),
            CUBE = new Mesh(GEOMETRY, MATERIAL)

            MATERIAL.onBeforeCompile = shader_set.bind(CUBE)

            CUBE.position.set(cubes[i + 1], cubes[i + 2])
            CUBE.rotation.x = -MATH.rad.r45 / 2
            CUBE.rotation.y = MATH.rad.r45

            CUBE.updateWorldMatrix(true, false)

            if (float) spacecube_ANIMATIONS.push(spacecube_setCubeAnimation(CUBE))
    
            spacecube_SCENE.add(CUBE)
        }
    }

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

<div
class="space-cube"
bind:this={spacecube}
>
    <div
    class="mask"
    >
    </div>
</div>

<!-- #STYLE -->

<style
lang="scss"
>
/* #USES */

@use '../../assets/scss/styles/position';
@use '../../assets/scss/styles/size';

/* #SPACECUBE */

.space-cube { @include position.placement(absolute, 0, auto, auto, 0); }

.mask
{
    @include position.placement(absolute, 0, 0, 0, 0);

    @extend %any;

    backdrop-filter: blur(3px);

    mask: radial-gradient(circle at 68% 50%, transparent 30%, $dark 100%);

    pointer-events: none;
}
</style>