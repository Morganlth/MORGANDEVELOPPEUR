<!-- #MAP

-APP
-COMMAND
-EVENT
    SPACECUBE
        ~SHADER

    MASK  

-->

<!-- #SCRIPT -->

<script>
// Code inspired, adapted / modified for texture projection in Three js from: https://github.com/marcofugaro/three-projected-material

// #EXPORTS

    // --PROPS
    export let
    prop_ON = false,
    prop_FOCUS = false,

    prop_SPACECUBE = new Float64Array([])

    // --BIND
    export let spacecube_CHARGED = false

// #IMPORTS

    // --JS
    import SHADER_VERTEX from '../../assets/js/glsl/vertex'
    import SHADER_FRAGMENT from '../../assets/js/glsl/fragment'
    import MATH from '../../assets/js/utils/math'
    import { wait_throttle } from '../../assets/js/utils/wait'
    import { update_floating } from '../../assets/js/utils/update'
    import { animation } from '../../assets/js/utils/animation'

    // --LIB
    import COLORS from '$lib/colors'

    // --CONTEXTS
    import { APP, COMMAND, EVENT } from '../../App.svelte'

    // --THREE
    import WebGL from 'three/addons/capabilities/WebGL'
    import
    {
        AmbientLightProbe,
        BoxGeometry,
        BufferGeometry,
        CubicBezierCurve,
        DirectionalLight,
        Fog,
        Group,
        Line,
        LineBasicMaterial,
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
    import { cubicInOut } from 'svelte/easing'

// #CONSTANTES

    // --ELEMENT-SPACECUBE
    const
    SPACECUBE = 'spacecube',

    SPACECUBE_ANTIALIAS = true,
    SPACECUBE_PIXELRATIO = 2,

    SPACECUBE_CAMERA_FOV = 75,
    SPACECUBE_CAMERA_NEAR = .1,
    SPACECUBE_CAMERA_Z = 5,

    SPACECUBE_LINES = new Group(),
    SPACECUBE_LINE_POINTS_COUNT = 30,

    SPACECUBE_FORCE_POSITION = .05,
    SPACECUBE_FORCE_ROTATION = .01,

    SPACECUBE_ROTATION_X = -MATH.rad.r45 / 2,
    SPACECUBE_ROTATION_Y = MATH.rad.r45,

    SPACECUBE_MOUSE_RADIUS = 3,                           // mouse radius ?
    SPACECUBE_MOUSE_INTENSITY = .5,

    SPACECUBE_CUBES = new Group(),
    SPACECUBE_FLOATING_UPDATE_CUBES = [],

    SPACECUBE_SHADER_UNIFORMS =
    {
        viewMatrixCamera: { value: new Matrix4() },
        projectionMatrixCamera: { value: new Matrix4() },
        projPosition: { value: new Vector3() },
        projDirection: { value: new Vector3(0, 0, -1) },
        projectedTexture: { value: '' },
        widthScaled: { value: 0 },
        heightScaled: { value: 0 },
        textureOffset: { value: new Vector2(-0.215, 0) }
    },

    SPACECUBE_COMMANDS =
    [
        {
            name: SPACECUBE,
            callback: spacecube_c$,
            params: { defaultValue: true, optimise: { value: false } },
            tests: { testBoolean: true },
            storage: true
        }
    ],

    SPACECUBE_EVENTS = { resize: spacecube_e$Resize },
    SPACECUBE_EVENTS_2 =
    {
        mouseMove: wait_throttle(spacecube_e$MouseMove, 33.34),
        mouseDown: spacecube_e$MouseDown,
        mouseUp: spacecube_e$MouseUp,
        animation: spacecube_e$Animation
    },
    SPACECUBE_EVENTS_3 =
    {
        mouseMove: wait_throttle(spacecube_e$MouseMove, 66.68),
        animation: wait_throttle(spacecube_e$Animation2, 66.68)
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

    spacecube_OPACITY = 0,

    spacecube_WIDTH,
    spacecube_HEIGHT,

    spacecube_DEPTH,

    spacecube_TEXTURE = null,

    spacecube_MOUSE_RADIUS = SPACECUBE_MOUSE_RADIUS,

    spacecube_FORCE_POSITION = SPACECUBE_FORCE_POSITION,
    spacecube_FORCE_ROTATION = SPACECUBE_FORCE_ROTATION,

    spacecube_MOUSE_X = 0,
    spacecube_MOUSE_Y = 0,

    spacecube_TIMEOUT,
    spacecube_TIMEOUT_2,

    spacecube_cancel = () => {}

// #REACTIVES

    // --ELEMENT-SPACECUBE
    $: spacecube_ON ? spacecube_updateEvent(prop_ON) : void 0
    $: spacecube_ON ? spacecube_update2(prop_FOCUS) : void 0

// #FUNCTIONS

    // --SET
    function spacecube_set()
    {
        if (WebGL.isWebGLAvailable())
        {
            spacecube_setVars()
            spacecube_setCommands()
            spacecube_setEvents()
        
            spacecube_setCamera()
            spacecube_setRenderer()
            spacecube_setScene()
        }
    }

    function spacecube_setVars()
    {
        const
        ASPECT = spacecube_getAspectRatio(),
        HEIGHT = Math.tan(MATH.toRad(SPACECUBE_CAMERA_FOV / 2)) * SPACECUBE_CAMERA_Z,
        DEPTH = SPACECUBE_CAMERA_Z + 1
    
        spacecube_SCENE = new Scene()
        spacecube_CAMERA = new PerspectiveCamera(SPACECUBE_CAMERA_FOV, ASPECT, SPACECUBE_CAMERA_NEAR, DEPTH)
        spacecube_RENDERER = new WebGLRenderer({ alpha: true, antialias: SPACECUBE_ANTIALIAS })

        spacecube_WIDTH = HEIGHT * ASPECT
        spacecube_HEIGHT = HEIGHT
        spacecube_DEPTH = DEPTH

        spacecube.appendChild(spacecube_RENDERER.domElement)
    }

    function spacecube_setCommands() { COMMAND.command_setBasicCommands(SPACECUBE_COMMANDS) }

    function spacecube_setEvents() { EVENT.event_add(SPACECUBE_EVENTS) }

    function spacecube_setEvents2() { EVENT.event_add(SPACECUBE_EVENTS_2) }

    function spacecube_setEvents3() { EVENT.event_add(SPACECUBE_EVENTS_3) }

    function spacecube_setCamera()
    {
        spacecube_CAMERA.position.z = SPACECUBE_CAMERA_Z
        spacecube_CAMERA.lookAt(0, 0, 0)
    }

    function spacecube_setRenderer()
    {
        spacecube_RENDERER.setSize(APP.app_WIDTH, APP.app_HEIGHT)
        spacecube_RENDERER.setPixelRatio(Math.min(window.devicePixelRatio, SPACECUBE_PIXELRATIO))
        spacecube_RENDERER.setClearColor(0x000000, 0)
    }

    function spacecube_setScene()
    {
        spacecube_setLight()
        spacecube_setFog()

        new TextureLoader().load('/images/me.png', (texture) =>
        {
            spacecube_TEXTURE = texture

            spacecube_setShaderUniforms()
            spacecube_setCubes()

            spacecube_SCENE.add(SPACECUBE_LINES)
            spacecube_SCENE.add(SPACECUBE_CUBES)
            spacecube_RENDERER.render(spacecube_SCENE, spacecube_CAMERA)

            spacecube_start()
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
        spacecube_MOUSELIGHT = new SpotLight(COLORS.light, SPACECUBE_MOUSE_INTENSITY, 11, .6, .5, .3)

        spacecube_MOUSELIGHT.position.z = 5

        spacecube_SCENE.add(spacecube_MOUSELIGHT)
        spacecube_SCENE.add(spacecube_MOUSELIGHT.target)
    }

    function spacecube_setFog() { spacecube_SCENE.fog = new Fog(COLORS.dark, 4, spacecube_DEPTH) }

    function spacecube_setCubes()
    {
        for (let i = 0; i < prop_SPACECUBE.length; i += 4)
        {
            const
            [SIZE, X, Y, FLOAT] = [prop_SPACECUBE[i], prop_SPACECUBE[i + 1], prop_SPACECUBE[i + 2], prop_SPACECUBE[i + 3]],
            MATERIAL = new MeshStandardMaterial({ color: COLORS.dark }),
            CUBE = new Mesh(new BoxGeometry(SIZE, SIZE, SIZE), MATERIAL)

            MATERIAL.onBeforeCompile = spacecube_setShader.bind(CUBE)
    
            spacecube_setCubeLayout(CUBE, X, Y)
            spacecube_setCubeLine(CUBE.checkPoints)
    
            SPACECUBE_CUBES.add(CUBE)

            if (FLOAT) spacecube_setFloatingCube(CUBE)
        }
    }
    function spacecube_setCubeLayout(cube, x, y)
    {
        const [P0, P1, P2, P3, P4] = spacecube_getCubePoints(x, y)

        cube.position.x = x
        cube.position.y = y
        cube.iPosition = {...cube.position}
        cube.checkPoints = [P0, P1, P2, P3, P4]
        cube.vel = Math.random() + 1
        cube.rotation.x = SPACECUBE_ROTATION_X
        cube.rotation.y = SPACECUBE_ROTATION_Y
    }
    function spacecube_setCubeLine([a, b, c, d, e])
    {
        const
        CURVE = new CubicBezierCurve(new Vector2(a.x, a.y), new Vector2(b.x, b.y), new Vector2(d.x, d.y), new Vector2(e.x, e.y)),
        GEOMETRY = new BufferGeometry().setFromPoints(CURVE.getPoints(SPACECUBE_LINE_POINTS_COUNT)),
        MATERIAL = new LineBasicMaterial({ color: COLORS.light, transparent: true, opacity: .2 }),
        LINE = new Line(GEOMETRY, MATERIAL)

        SPACECUBE_LINES.add(LINE)
    }
    function spacecube_setFloatingCube(cube)
    {
        const UPDATE = update_floating().update

        SPACECUBE_FLOATING_UPDATE_CUBES.push(async () => cube.position.y += UPDATE() * 0.0015)
    }

    function spacecube_setShader(shader)
    {
        shader.uniforms =
        {
            ...SPACECUBE_SHADER_UNIFORMS,
            ...shader.uniforms,
            savedModelMatrix: { value: new Matrix4().copy(this.matrixWorld) }
        }
        shader.vertexShader = spacecube_monkeyPatch(shader.vertexShader, SHADER_VERTEX)
        shader.fragmentShader = spacecube_monkeyPatch(shader.fragmentShader, SHADER_FRAGMENT)
    }
    function spacecube_setShaderUniforms()
    {
        const MODEL_MATRIX_CAMERA = spacecube_CAMERA.matrixWorld

        SPACECUBE_SHADER_UNIFORMS.projectedTexture.value = spacecube_TEXTURE
        SPACECUBE_SHADER_UNIFORMS.viewMatrixCamera.value.copy(spacecube_CAMERA.matrixWorldInverse)
        SPACECUBE_SHADER_UNIFORMS.projPosition.value.setFromMatrixPosition(MODEL_MATRIX_CAMERA)
        SPACECUBE_SHADER_UNIFORMS.projDirection.value.set(0, 0, 1).applyMatrix4(MODEL_MATRIX_CAMERA)

        spacecube_updateShaderProjectionMatrixCamera()
        spacecube_updateShaderTextureDimensions()
    }

    // --DESTROY
    function spacecube_destroy()
    {
        spacecube_cancel()
        spacecube_clear(spacecube_CAMERA)

        spacecube_destroyEvents()
    }

    function spacecube_destroyEvents()
    {
        EVENT.event_remove(SPACECUBE_EVENTS)

        spacecube_destroyEvents2()
        spacecube_destroyEvents3()
    }

    function spacecube_destroyEvents2() { EVENT.event_remove(SPACECUBE_EVENTS_2) }

    function spacecube_destroyEvents3() { EVENT.event_remove(SPACECUBE_EVENTS_3) }

    // --GET
    function spacecube_getAspectRatio() { return APP.app_WIDTH / APP.app_HEIGHT }

    function spacecube_getCubePoints(x, y)
    {
        const
        [RATIO, FORCE] = [spacecube_CAMERA.aspect, 3],
        FORCE_RATIO = FORCE / RATIO,
        GAP_X = y * RATIO + x,
        GAP_Y = GAP_X / RATIO

        return [
            GAP_X < 0
            ?       { x: -spacecube_WIDTH - 2, y: spacecube_HEIGHT - GAP_Y * 1.5 }  // P0
            :   GAP_X > 0
                ?   { x: -spacecube_WIDTH + GAP_X * 1.5, y: spacecube_HEIGHT + 2 }  // P0
                :   { x: -spacecube_WIDTH - 2, y: spacecube_HEIGHT + 2 },           // P0
                    { x: x - FORCE, y: y + FORCE_RATIO },                           // P1
                    { x: x, y: y },                                                 // P2
                    { x: x + FORCE, y: y - FORCE_RATIO },                           // P3
            GAP_X < 0
            ?       { x: spacecube_WIDTH + GAP_X * 1.5, y: -spacecube_HEIGHT - 2 }  // P4
            :   GAP_X > 0
                ?   { x: spacecube_WIDTH + 2, y: -spacecube_HEIGHT + GAP_Y * 1.5 }  // P4
                :   { x: spacecube_WIDTH + 2, y: -spacecube_HEIGHT - 2 }            // P4
        ]
    }

    function spacecube_getBarycentre(a, b, c, t) { return a + a*t*t + 2*b*t - 2*t*t*b + t*t*c - 2*a*t }

    function spacecube_getCubeLayout(cube, dif_X, dif_Y, dif_X_ABS, dif_Y_ABS)
    {
        const
        ANGLE = Math.atan(dif_Y / dif_X),
        X = (1 - dif_X_ABS / (Math.cos(ANGLE) * spacecube_MOUSE_RADIUS)) * dif_X,
        Y = (1 - dif_Y_ABS / (Math.abs(Math.sin(ANGLE)) * spacecube_MOUSE_RADIUS)) * dif_Y

        return {
            cube,
            x: cube.position.x,
            y: cube.position.y,
            rX: cube.rotation.x,
            rY: cube.rotation.y,
            step_P_X: cube.iPosition.x + X * spacecube_FORCE_POSITION - cube.position.x,
            step_P_Y: cube.iPosition.y + Y * spacecube_FORCE_POSITION - cube.position.y,
            step_R_X: SPACECUBE_ROTATION_X + X * spacecube_FORCE_ROTATION - cube.rotation.x,
            step_R_Y: SPACECUBE_ROTATION_Y + Y * spacecube_FORCE_ROTATION - cube.rotation.y
        }
    }

    // --UPDATES
    function spacecube_update(on) { spacecube_ON = on }

    function spacecube_update2(focus)
    {
        const DURATION = spacecube_updateCubes(focus)

        spacecube_updateEvent(prop_ON, focus ? 0 : DURATION)
    }

    function spacecube_updateEvent(on, delay = 0)
    {
        clearTimeout(spacecube_TIMEOUT_2)

        spacecube_TIMEOUT_2 = setTimeout(() => {
            on && prop_FOCUS
            ? (spacecube_setEvents2(), spacecube_destroyEvents3())
            : (spacecube_destroyEvents2(), spacecube_setEvents3())
        },
        delay) 
    }

    function spacecube_updateCubes(invert = false, intro = false)
    {
        const Z = intro ? -2 : 0
    
        let total_DURATION = 0
    
        for (const CUBE of SPACECUBE_CUBES.children)
        {
            const
            P0 = CUBE.checkPoints[0],
            DURATION = Math.random() * 1000 + 800,
            DELAY = intro ? Math.random() * 1000 : 0

            if (intro) CUBE.position.set(P0.x, P0.y, Z)

            CUBE.timeout = setTimeout(() => spacecube_a(CUBE, intro, Z, DURATION, CUBE.t, invert), DELAY)

            total_DURATION = Math.max(total_DURATION, DURATION)
        }

        return total_DURATION * (intro ? .5 : 1)
    }

    const spacecube_updateFloatingCubes = wait_throttle(async () => { for (const UPDATE of SPACECUBE_FLOATING_UPDATE_CUBES) UPDATE() }, 100.02)

    function spacecube_updateSceneVars(radius, forcePosition, forceRotation, mouseIntensity)
    {
        spacecube_MOUSE_RADIUS = radius
        spacecube_FORCE_POSITION = forcePosition
        spacecube_FORCE_ROTATION = forceRotation
        spacecube_MOUSELIGHT.intensity = mouseIntensity

        spacecube_updateScene()
    }
    function spacecube_updateScene()
    {
        spacecube_aMouseCamera()
        
        if (prop_FOCUS)
        {
            spacecube_updateMouseLight()
            spacecube_updateCubesLayout()
        }
    }
    async function spacecube_updateMouseLight()
    {
        spacecube_MOUSELIGHT.target.position.x = spacecube_MOUSE_X
        spacecube_MOUSELIGHT.target.position.y = spacecube_MOUSE_Y
    }
    async function spacecube_updateCubesLayout()
    {
        const
        CUBES = SPACECUBE_CUBES.children,
        DATAS = []
    
        for (let i = 0; i < CUBES.length; i++)
        {
            const
            CUBE = CUBES[i],
            [DIF_X, DIF_Y] = [CUBE.iPosition.x - spacecube_MOUSE_X, CUBE.iPosition.y - spacecube_MOUSE_Y],
            [DIF_X_ABS, DIF_Y_ABS] = [Math.abs(DIF_X), Math.abs(DIF_Y)],
            HYP = Math.sqrt(DIF_X_ABS ** 2 + DIF_Y_ABS ** 2)

            if (HYP < spacecube_MOUSE_RADIUS) DATAS.push(spacecube_getCubeLayout(CUBE, DIF_X, DIF_Y, DIF_X_ABS, DIF_Y_ABS))
        }

        if (DATAS.length) spacecube_a2(spacecube_updateCubeLayout, DATAS, 200)
    }
    function spacecube_updateCubeLayout(t, { cube, x, y, rX, rY, step_P_X, step_P_Y, step_R_X, step_R_Y })
    {
        cube.position.x = x + step_P_X * t
        cube.position.y = y + step_P_Y * t
        cube.rotation.x = rX + step_R_X * t
        cube.rotation.y = rY + step_R_Y * t
    }

    function spacecube_updateShaderProjectionMatrixCamera() { SPACECUBE_SHADER_UNIFORMS.projectionMatrixCamera.value.copy(spacecube_CAMERA.projectionMatrix) }

    function spacecube_updateShaderTextureDimensions()
    {
        const [TEXTURE_WIDTHSCALED, TEXTURE_HEIGHTSCALED] = spacecube_computeScaledDimensions(spacecube_TEXTURE.image, spacecube_CAMERA)

        SPACECUBE_SHADER_UNIFORMS.widthScaled.value = TEXTURE_WIDTHSCALED
        SPACECUBE_SHADER_UNIFORMS.heightScaled.value = TEXTURE_HEIGHTSCALED
    }

    // --CLEAR
    function spacecube_clear(obj = {})
    {
        if (obj.cancel instanceof Function) obj.cancel()

        clearTimeout(obj.timeout)
    }

    // --COMMAND
    function spacecube_c$(on) { COMMAND.command_test(on, 'boolean', spacecube_update, SPACECUBE, spacecube_ON) }

    // --EVENTS
    async function spacecube_e$MouseMove(clientX, clientY)
    {
        const
        [RATIO_X, RATIO_Y] = [(clientX / APP.app_WIDTH) * 2 - 1, -(clientY / APP.app_HEIGHT) * 2 + 1],
        [RAYCASTER, INTERSECTION] = [new Raycaster(), new Vector3()]
    
        RAYCASTER.setFromCamera(new Vector2(RATIO_X, RATIO_Y), spacecube_CAMERA)
        RAYCASTER.ray.intersectPlane(new Plane(new Vector3(0, 0, 1), 0), INTERSECTION)

        ;[spacecube_MOUSE_X, spacecube_MOUSE_Y] = [INTERSECTION.x, INTERSECTION.y]

        spacecube_updateScene()
    }

    async function spacecube_e$MouseDown() { spacecube_TIMEOUT = setTimeout(() => { spacecube_updateSceneVars(4, .3, .03, 3) }, 200) }

    async function spacecube_e$MouseUp()
    {
        clearTimeout(spacecube_TIMEOUT)

        spacecube_updateSceneVars(SPACECUBE_MOUSE_RADIUS, SPACECUBE_FORCE_POSITION, SPACECUBE_FORCE_ROTATION, SPACECUBE_MOUSE_INTENSITY)
    }

    async function spacecube_e$Resize()
    {
        spacecube_CAMERA.aspect = spacecube_getAspectRatio()
        spacecube_CAMERA.updateProjectionMatrix()

        spacecube_setRenderer()
    
        spacecube_setShaderUniforms()
        spacecube_updateShaderProjectionMatrixCamera()
        spacecube_updateShaderTextureDimensions()
    }

    async function spacecube_e$Animation()
    {
        spacecube_updateFloatingCubes()

        spacecube_e$Animation2()
    }

    async function spacecube_e$Animation2() { spacecube_RENDERER.render(spacecube_SCENE, spacecube_CAMERA) }

    // --CONTROL
    async function spacecube_start()
    {
        setTimeout(() => spacecube_CHARGED = true,
        prop_FOCUS
        ? spacecube_ON ? spacecube_updateCubes(false, true) : 0
        : spacecube_hideCubes() ?? 0)

        spacecube_OPACITY = 1
    }

    // --ANIMATIONS
    function spacecube_a(cube, intro, z, duration, t, invert = false)
    {
        const [P0, P1, P2] = cube.checkPoints.slice(...(intro ? [0, 3] : [2]))

        if (!intro) spacecube_clear(cube)
    
        cube.cancel = animation((t) =>
        {
            if (!intro) cube.t = t

            const T = cubicInOut(t)

            cube.position.set(spacecube_getBarycentre(P0.x, P1.x, P2.x, T), spacecube_getBarycentre(P0.y, P1.y, P2.y, T), z * (1 - T))
        },
        duration, t ?? 0, invert).cancel
    }

    function spacecube_a2(a = () => {}, datas = [], duration)
    {
        spacecube_cancel()

        spacecube_cancel = animation((t) => { for (const ARGS of datas) a(t, ARGS) }, duration).cancel
    }

    async function spacecube_aMouseCamera()
    {
        const
        [P_X, P_Y] = [spacecube_CAMERA.position.x, spacecube_CAMERA.position.y],
        [STEP_X, STEP_Y] = [spacecube_MOUSE_X * .015 - P_X, spacecube_MOUSE_Y * .015 - P_Y]

        spacecube_clear(spacecube_CAMERA)

        spacecube_CAMERA.cancel = animation((t) =>
        {
            spacecube_CAMERA.position.x = P_X + STEP_X * t
            spacecube_CAMERA.position.y = P_Y + STEP_Y * t
        },
        300).cancel
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

    function spacecube_hideCubes()
    {
        for (const CUBE of SPACECUBE_CUBES.children)
        {
            let { x, y } = CUBE.checkPoints[4]

            CUBE.position.set(x, y, 2)
            CUBE.t = 1
        }
    }

// #CYCLES

onMount(spacecube_set)
onDestroy(spacecube_destroy)
</script>

<!-- #HTML -->

<div
class="spacecube"
style:--spacecube-rx="{SPACECUBE_ROTATION_X}rad"
style:--spacecube-ty="{prop_FOCUS ? 0 : -100}%"
style:opacity={spacecube_OPACITY}
bind:this={spacecube}
>
    <p>
        <span>SCROLL</span>

        ACCUEIL PRÉSENTATION COMPÉTENCES PROJETS
    </p>
</div>

<!-- #STYLE -->

<style
lang="scss"
>
/* #USES */

@use 'sass:map';

@use '../../assets/scss/styles/utils';
@use '../../assets/scss/styles/position';
@use '../../assets/scss/styles/display';
@use '../../assets/scss/styles/font';
@use '../../assets/scss/styles/media';

/* #SPACECUBE */

.spacecube
{
    @include position.placement(absolute, $top: 0, $left: 0);

    transition: opacity .2s;

    p
    {
        @include utils.solid-border(1px, $intermediate, $top: false, $bottom: false);
        @include position.placement(absolute, $bottom: 0, $left: 62%);
        @include font.content($intermediate, $font-size: map.get(font.$font-sizes, s1));

        @extend %f-column;

        justify-content: center;

        transform-origin: bottom right;
        transform: perspective(800px) rotateX(var(--spacecube-rx, 0)) rotateZ(-.04rad) translateY(var(--spacecube-ty, -100%));

        min-width: 20vw;
        width: fit-content;
        height: 100vh;

        padding-bottom: 30vh;
        padding-left: 2rem;

        text-align: right;
        writing-mode: vertical-rl;

        box-sizing: border-box;

        transition: transform .8s 1.2s ease-in;

        span
        {
            #{--title-size}: map.get(font.$font-sizes, s7);
        
            @include font.h-custom($line-height: 1.2, $italic: true);

            @include media.min($ms4, $ms3) { #{--title-size}: 100px; }
        }

        @include media.min($ms3)
        {
            padding-bottom: 20vh;
        
            span { #{--title-size}: map.get(font.$font-sizes, s8); }
        }
    }
}
</style>