<!-- #SCRIPT -->

<script>
// Code inspired, adapted / modified for texture projection in Three js from: https://github.com/marcofugaro/three-projected-material

// #IMPORTS

    // --JS
    import SHADER_VERTEX from '../../assets/js/glsl/vertex'
    import SHADER_FRAGMENT from '../../assets/js/glsl/fragment'
    import MATH from '../../assets/js/utils/math'
    import { animation, animation_floating } from '../../assets/js/utils/animation'
    import { wait_throttle } from '../../assets/js/utils/wait'

    // --LIB
    import { COLORS } from '$lib/app'
    import { SPACECUBE_FIXED_CUBES, SPACECUBE_FLOATING_CUBES } from '../../assets/js/datas/spacecube_cubes'

    // --CONTEXTS
    import { COMMAND, EVENT } from '../../App.svelte'

    // --THREE
    import WebGL from 'three/addons/capabilities/WebGL'
    import
    {
        AmbientLightProbe,
        BoxGeometry,
        DirectionalLight,
        Group,
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

    // --SVELTE
    import { onMount, onDestroy } from 'svelte'

// #CONSTANTES

    // --ELEMENT-SPACECUBE
    const
    SPACECUBE_CUBES = new Group(),
    SPACECUBE_CUBES_ANIMATIONS = [],
    SPACECUBE_ROTATION_X = -MATH.rad.r45 / 2,
    SPACECUBE_ROTATION_Y = MATH.rad.r45,
    SPACECUBE_PARAMS =
    {
        antialias: true,
        fov: 75,
        near: 3,
        far: 7,
        cameraZ: 5,
        pixelRatio: 2,
        radius: 2,
        forcePosition: .1,
        forceRotate: .03,
        mouseIntensity: 1
    },
    SPACECUBE_EVENTS =
    {
        mouseMove: wait_throttle(spacecube_mouseMove, 20),
        mouseDown: spacecube_mouseDown,
        mouseUp: spacecube_mouseUp,
        resize: spacecube_resize,
        animation: spacecube_animation
    }

    // --SHADERS
    const SHADER_UNIFORMS =
    {
        viewMatrixCamera: { value: new Matrix4() },
        projectionMatrixCamera: { value: new Matrix4() },
        projPosition: { value: new Vector3() },
        projDirection: { value: new Vector3(0, 0, -1) },
        projectedTexture: { value: '' },
        widthScaled: { value: 0 },
        heightScaled: { value: 0 },
        textureOffset: { value: new Vector2(-0.215, 0) }
    }

// #VARIABLES

    // --ELEMENT-SPACECUBE
    let
    spacecube,
    spacecube_ON = true,
    spacecube_SCENE,
    spacecube_CAMERA,
    spacecube_RENDERER,
    spacecube_MOUSELIGHT,
    spacecube_TEXTURE,
    spacecube_RADIUS = SPACECUBE_PARAMS.radius,
    spacecube_FORCE_POSITION = SPACECUBE_PARAMS.forcePosition,
    spacecube_FORCE_ROTATE = SPACECUBE_PARAMS.forceRotate,
    spacecube_MOUSE_X = 0,
    spacecube_MOUSE_Y = 0,
    spacecube_TIMEOUT

// #FUNCTIONS

    // --SET
    function spacecube_set()
    {
        if (WebGL.isWebGLAvailable())
        {
            spacecube_setVar()
            spacecube_setCommand()
            spacecube_setEvent()
        
            spacecube_setCamera()
            spacecube_setRenderer()
            spacecube_setScene()
        }
    }

    function spacecube_setVar()
    {
        spacecube_SCENE = new Scene()
        spacecube_CAMERA = new PerspectiveCamera(SPACECUBE_PARAMS.fov, window.innerWidth / window.innerHeight, SPACECUBE_PARAMS.near, SPACECUBE_PARAMS.far)
        spacecube_RENDERER = new WebGLRenderer({ alpha: true, antialias: SPACECUBE_PARAMS.antialias })

        spacecube.appendChild(spacecube_RENDERER.domElement)
    }

    function spacecube_setCommand()
    {
        COMMAND.command_setBasicCommand(
            'spacecube',
            spacecube_command,
            { defaultValue: spacecube_ON, optimise: true },
            { testBoolean: true },
            true
        )
    }

    function spacecube_setEvent() { EVENT.event_add(SPACECUBE_EVENTS) }

    function spacecube_setCamera()
    {
        spacecube_CAMERA.position.z = SPACECUBE_PARAMS.cameraZ
        spacecube_CAMERA.lookAt(0, 0, 0)
    }

    function spacecube_setRenderer()
    {
        spacecube_RENDERER.setSize(window.innerWidth, window.innerHeight)
        spacecube_RENDERER.setPixelRatio(Math.min(window.devicePixelRatio, SPACECUBE_PARAMS.pixelRatio))
        spacecube_RENDERER.setClearColor(0x000000, 0)
    }

    function spacecube_setScene()
    {
        spacecube_setLight()

        new TextureLoader().load('./images/me.png', (texture) =>
        {
            spacecube_TEXTURE = texture

            shader_setUniforms()
    
            spacecube_setCubes(SPACECUBE_FIXED_CUBES)
            spacecube_setCubes(SPACECUBE_FLOATING_CUBES, true)

            spacecube_SCENE.add(SPACECUBE_CUBES)
            spacecube_RENDERER.render(spacecube_SCENE, spacecube_CAMERA)
        })
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
        const AMBIENTLIGHT = new AmbientLightProbe(COLORS.light, .5)

        spacecube_SCENE.add(AMBIENTLIGHT)
    }
    function spacecube_setDirectionalLight()
    {
        const DIRECTIONALLIGHT = new DirectionalLight(COLORS.light, 1.5)

        DIRECTIONALLIGHT.position.set(5, -2.5, 0)

        spacecube_SCENE.add(DIRECTIONALLIGHT)
    }
    function spacecube_setSpotLight()
    {
        const SPOTLIGHT = new SpotLight(COLORS.primary, 100, 10, .3, .7, .7)

        SPOTLIGHT.position.set(5, -6, .7)
        SPOTLIGHT.target.position.set(6, 0, 0)

        spacecube_SCENE.add(SPOTLIGHT)
        spacecube_SCENE.add(SPOTLIGHT.target)
    }
    function spacecube_setMouseLight()
    {
        spacecube_MOUSELIGHT = new SpotLight(COLORS.light, SPACECUBE_PARAMS.mouseIntensity, 11, .6, .5, .3)

        spacecube_MOUSELIGHT.position.z = 5

        spacecube_SCENE.add(spacecube_MOUSELIGHT)
        spacecube_SCENE.add(spacecube_MOUSELIGHT.target)
    }

    function spacecube_setCubes(cubes, float = false)
    {
        for (let i = 0; i < cubes.length; i += 3)
        {
            const
            SIZE = cubes[i],
            MATERIAL = new MeshStandardMaterial({ color: COLORS.dark }),
            CUBE = new Mesh(new BoxGeometry(SIZE, SIZE, SIZE), MATERIAL)

            MATERIAL.onBeforeCompile = shader_set.bind(CUBE)
    
            ;[CUBE.position.x, CUBE.position.y, CUBE.rotation.x, CUBE.rotation.y] = [cubes[i + 1], cubes[i + 2], SPACECUBE_ROTATION_X, SPACECUBE_ROTATION_Y]
            CUBE.initialPosition = {...CUBE.position}
            CUBE.updateWorldMatrix(true, false)                                                        
    
            SPACECUBE_CUBES.add(CUBE)

            if (float) SPACECUBE_CUBES_ANIMATIONS.push(spacecube_setCubeAnimation(CUBE))
        }
    }
    function spacecube_setCubeAnimation(cube)
    {
        const ANIMATION = animation_floating().animation

        return async () => cube.position.y += ANIMATION() * 0.0015
    }

    function shader_set(shader)
    {
        shader.uniforms =
        {
            ...SHADER_UNIFORMS,
            ...shader.uniforms,
            savedModelMatrix: { value: new Matrix4().copy(this.matrixWorld) }
        }
        shader.vertexShader = spacecube_monkeyPatch(shader.vertexShader, SHADER_VERTEX)
        shader.fragmentShader = spacecube_monkeyPatch(shader.fragmentShader, SHADER_FRAGMENT)
    }

    function shader_setUniforms()
    {
        const MODEL_MATRIX_CAMERA = spacecube_CAMERA.matrixWorld

        SHADER_UNIFORMS.projectedTexture.value = spacecube_TEXTURE
        SHADER_UNIFORMS.viewMatrixCamera.value.copy(spacecube_CAMERA.matrixWorldInverse)
        SHADER_UNIFORMS.projPosition.value.setFromMatrixPosition(MODEL_MATRIX_CAMERA)
        SHADER_UNIFORMS.projDirection.value.set(0, 0, 1).applyMatrix4(MODEL_MATRIX_CAMERA)

        shader_updateProjectionMatrixCamera()
        shader_updateTextureDimensions()
    }

    // --DESTROY
    function spacecube_destroy() { spacecube_destroyEvent() }

    function spacecube_destroyEvent() { EVENT.event_remove(SPACECUBE_EVENTS) }

    // --UPDATES
    function spacecube_update(on)
    {
        on ? spacecube_setEvent() : spacecube_destroyEvent()
    
        spacecube_ON = on
    }

    function shader_updateProjectionMatrixCamera() { SHADER_UNIFORMS.projectionMatrixCamera.value.copy(spacecube_CAMERA.projectionMatrix) }

    function shader_updateTextureDimensions()
    {
        const [TEXTURE_WIDTHSCALED, TEXTURE_HEIGHTSCALED] = spacecube_computeScaledDimensions(spacecube_TEXTURE.image, spacecube_CAMERA)

        SHADER_UNIFORMS.widthScaled.value = TEXTURE_WIDTHSCALED
        SHADER_UNIFORMS.heightScaled.value = TEXTURE_HEIGHTSCALED
    }

    function spacecube_updateVar(radius, forcePosition, forceRotate, mouseIntensity)
    {
        spacecube_RADIUS = radius
        spacecube_FORCE_POSITION = forcePosition
        spacecube_FORCE_ROTATE = forceRotate
        spacecube_MOUSELIGHT.intensity = mouseIntensity

        spacecube_updateScene()
    }

    function spacecube_updateScene()
    {
        spacecube_animationCamera()
        spacecube_animationMouseLight()
        spacecube_animationRepel()
    }

    function spacecube_updateCube(cube, dif_X, dif_Y, dif_X_ABS, dif_Y_ABS)
    {
        const
        ANGLE = Math.atan(dif_Y / dif_X),
        [X, Y] = [(1 - dif_X_ABS / (Math.cos(ANGLE) * spacecube_RADIUS)) * dif_X, (1 - dif_Y_ABS / (Math.abs(Math.sin(ANGLE)) * spacecube_RADIUS)) * dif_Y],
        [P_X, P_Y, R_X, R_Y] = [cube.position.x, cube.position.y, cube.rotation.x, cube.rotation.y],
        [STEP_P_X, STEP_P_Y] = [cube.initialPosition.x + X * spacecube_FORCE_POSITION - P_X, cube.initialPosition.y + Y * spacecube_FORCE_POSITION - P_Y],
        [STEP_R_X, STEP_R_Y] = [SPACECUBE_ROTATION_X + X * spacecube_FORCE_ROTATE - R_X, SPACECUBE_ROTATION_Y + Y * spacecube_FORCE_ROTATE - R_Y]

        clearInterval(cube.interval)

        cube.interval = animation((t) =>
        {
            [cube.position.x, cube.position.y, cube.rotation.x, cube.rotation.y] = [P_X + STEP_P_X * t, P_Y + STEP_P_Y * t, R_X + STEP_R_X * t, R_Y + STEP_R_Y * t]
        }, 200, 10)
    }

    // --COMMAND
    function spacecube_command(on) { COMMAND.command_test(on, 'boolean', spacecube_update, 'spacecube', spacecube_ON) }

    // --EVENTS
    function spacecube_mouseMove(clientX, clientY) // async throttle
    {
        const
        [RATIO_X, RATIO_Y] = [(clientX / window.innerWidth) * 2 - 1, -(clientY / window.innerHeight) * 2 + 1],
        [RAYCASTER, INTERSECTION] = [new Raycaster(), new Vector3()]
    
        RAYCASTER.setFromCamera(new Vector2(RATIO_X, RATIO_Y), spacecube_CAMERA)
        RAYCASTER.ray.intersectPlane(new Plane(new Vector3(0, 0, 1), 0), INTERSECTION)

        ;[spacecube_MOUSE_X, spacecube_MOUSE_Y] = [INTERSECTION.x, INTERSECTION.y]

        spacecube_updateScene()
    }

    async function spacecube_mouseDown() { spacecube_TIMEOUT = setTimeout(() => { spacecube_updateVar(3.5, .5, .06, 4) }, 200) }

    async function spacecube_mouseUp()
    {
        clearTimeout(spacecube_TIMEOUT)

        let { radius, forcePosition, forceRotate, mouseIntensity } = SPACECUBE_PARAMS

        spacecube_updateVar(radius, forcePosition, forceRotate, mouseIntensity)
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
        spacecube_animationFloating()

        spacecube_RENDERER.render(spacecube_SCENE, spacecube_CAMERA)
    }

    // --ANIMATIONS
    const spacecube_animationFloating = wait_throttle(() => { for (const ANIMATION of SPACECUBE_CUBES_ANIMATIONS) ANIMATION() }, 100)

    async function spacecube_animationCamera()
    {
        const
        [P_X, P_Y] = [spacecube_CAMERA.position.x, spacecube_CAMERA.position.y],
        [STEP_X, STEP_Y] = [spacecube_MOUSE_X * .015 - P_X, spacecube_MOUSE_Y * .015 - P_Y]

        clearInterval(spacecube_CAMERA.interval)

        spacecube_CAMERA.interval = animation((t) =>
        {
            spacecube_CAMERA.position.x = P_X + STEP_X * t
            spacecube_CAMERA.position.y = P_Y + STEP_Y * t
        }, 300, 10)
    }

    async function spacecube_animationMouseLight()
    {
        spacecube_MOUSELIGHT.target.position.x = spacecube_MOUSE_X
        spacecube_MOUSELIGHT.target.position.y = spacecube_MOUSE_Y
    }

    async function spacecube_animationRepel()
    {
        const CUBES = SPACECUBE_CUBES.children
    
        for (let i = 0; i < CUBES.length; i++)
        {
            const
            CUBE = CUBES[i],
            [DIF_X, DIF_Y] = [CUBE.initialPosition.x - spacecube_MOUSE_X, CUBE.initialPosition.y - spacecube_MOUSE_Y],
            [DIF_X_ABS, DIF_Y_ABS] = [Math.abs(DIF_X), Math.abs(DIF_Y)],
            HYP = Math.sqrt(DIF_X_ABS * DIF_X_ABS + DIF_Y_ABS * DIF_Y_ABS)

            if (HYP < spacecube_RADIUS) spacecube_updateCube(CUBE, DIF_X, DIF_Y, DIF_X_ABS, DIF_Y_ABS)
        }
    }

    // --UTILS
    function spacecube_monkeyPatch(shader, _ref)
    {
        let { header = '', main = '', ...replaces } = _ref

        for (const KEY in replaces) shader = shader.split(KEY).join(replaces[KEY])

        return shader.replace('void main() {', `${header} void main() { ${main}`)
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

    backdrop-filter: blur(15px);

    mask: radial-gradient(circle at 68% 50%, transparent 7%, $dark 100%);

    pointer-events: none;
}
</style>