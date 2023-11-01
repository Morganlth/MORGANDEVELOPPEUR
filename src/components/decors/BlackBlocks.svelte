<!-- #MAP

-APP
-COMMAND
-EVENT
    BLACKBLOCKS
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

    prop_BLACKBLOCKS = new Float64Array([])

    // --BIND
    export let blackblocks_CHARGED = false

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

    // --ELEMENT-BLACKBLOCKS
    const
    BLACKBLOCKS_OPTIMISE_NAME = 'blackblocks_optimise'
,
    BLACKBLOCKS_ANTIALIAS = true,
    BLACKBLOCKS_PIXELRATIO = 2
,
    BLACKBLOCKS_CAMERA_FOV = 75,
    BLACKBLOCKS_CAMERA_NEAR = .1,
    BLACKBLOCKS_CAMERA_Z = 5
,
    BLACKBLOCKS_LINES = new Group(),
    BLACKBLOCKS_LINE_POINTS_COUNT = 30
,
    BLACKBLOCKS_FORCE_POSITION = .05,
    BLACKBLOCKS_FORCE_ROTATION = .01
,
    BLACKBLOCKS_ROTATION_X = -MATH.rad.r45 / 2,
    BLACKBLOCKS_ROTATION_Y = MATH.rad.r45
,
    BLACKBLOCKS_MOUSE_RADIUS = 3,                           // mouse radius ?
    BLACKBLOCKS_MOUSE_INTENSITY = .5
,
    BLACKBLOCKS_CUBES = new Group()
,
    BLACKBLOCKS_SHADER_UNIFORMS =
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
,
    BLACKBLOCKS_COMMANDS =
    [
        {
            name: BLACKBLOCKS_OPTIMISE_NAME,
            callback: blackblocks_c$Optimise,
            params: { defaultValue: false, optimise: { value: true } },
            tests: { testBoolean: true },
            desc: 'Optimiser les cubes noirs (p: \'t\' ou \'f\')',
            storage: true
        }
    ]
,
    BLACKBLOCKS_EVENTS = { resize: blackblocks_e$Resize },
    BLACKBLOCKS_EVENTS_2 =
    {
        mouseMove: wait_throttle(blackblocks_e$MouseMove, 33.34),
        mouseDown: blackblocks_e$MouseDown,
        mouseUp: blackblocks_e$MouseUp,
        animation: blackblocks_e$Animation
    },
    BLACKBLOCKS_EVENTS_3 =
    {
        mouseMove: wait_throttle(blackblocks_e$MouseMove, 50.01),
        animation: wait_throttle(blackblocks_e$Animation2, 50.01)
    }

// #VARIABLES

    // --ELEMENT-BLACKBLOCKS
    let
    blackblocks
,
    blackblocks_OPTIMISE = false
,
    blackblocks_SCENE,
    blackblocks_CAMERA,
    blackblocks_RENDERER,
    blackblocks_MOUSELIGHT
,
    blackblocks_FLOATING_CUBES_UPDATE = []
,
    blackblocks_OPACITY = 0
,
    blackblocks_WIDTH,
    blackblocks_HEIGHT
,
    blackblocks_DEPTH
,
    blackblocks_TEXTURE = null
,
    blackblocks_MOUSE_RADIUS = BLACKBLOCKS_MOUSE_RADIUS
,
    blackblocks_FORCE_POSITION = BLACKBLOCKS_FORCE_POSITION,
    blackblocks_FORCE_ROTATION = BLACKBLOCKS_FORCE_ROTATION
,
    blackblocks_MOUSE_X = 0,
    blackblocks_MOUSE_Y = 0
,
    blackblocks_TIMEOUT,
    blackblocks_TIMEOUT_2
,
    blackblocks_cancel = () => {}

// #REACTIVES

    // --ELEMENT-BLACKBLOCKS
    $: blackblocks_update2(prop_FOCUS)
    $: blackblocks_updateEvent(prop_ON, blackblocks_OPTIMISE)

// #FUNCTIONS

    // --SET
    function blackblocks_set()
    {
        if (WebGL.isWebGLAvailable())
        {
            blackblocks_setVars()
            blackblocks_setCommands()
            blackblocks_setEvents()
        
            blackblocks_setCamera()
            blackblocks_setRenderer()
            blackblocks_setScene()
        }
    }

    function blackblocks_setVars()
    {
        const
        ASPECT = blackblocks_getAspectRatio(),
        HEIGHT = Math.tan(MATH.toRad(BLACKBLOCKS_CAMERA_FOV / 2)) * BLACKBLOCKS_CAMERA_Z,
        DEPTH = BLACKBLOCKS_CAMERA_Z + 1
    
        blackblocks_SCENE = new Scene()
        blackblocks_CAMERA = new PerspectiveCamera(BLACKBLOCKS_CAMERA_FOV, ASPECT, BLACKBLOCKS_CAMERA_NEAR, DEPTH)
        blackblocks_RENDERER = new WebGLRenderer({ alpha: true, antialias: BLACKBLOCKS_ANTIALIAS })

        blackblocks_WIDTH = HEIGHT * ASPECT
        blackblocks_HEIGHT = HEIGHT
        blackblocks_DEPTH = DEPTH

        blackblocks.appendChild(blackblocks_RENDERER.domElement)
    }

    function blackblocks_setCommands() { COMMAND.command_setBasicCommands(BLACKBLOCKS_COMMANDS) }

    function blackblocks_setEvents() { EVENT.event_add(BLACKBLOCKS_EVENTS) }

    function blackblocks_setEvents2() { EVENT.event_add(BLACKBLOCKS_EVENTS_2) }

    function blackblocks_setEvents3() { EVENT.event_add(BLACKBLOCKS_EVENTS_3) }

    function blackblocks_setCamera()
    {
        blackblocks_CAMERA.position.z = BLACKBLOCKS_CAMERA_Z
        blackblocks_CAMERA.lookAt(0, 0, 0)
    }

    function blackblocks_setRenderer()
    {
        blackblocks_RENDERER.setSize(APP.app_WIDTH, APP.app_HEIGHT)
        blackblocks_RENDERER.setPixelRatio(Math.min(window.devicePixelRatio, BLACKBLOCKS_PIXELRATIO))
        blackblocks_RENDERER.setClearColor(0x000000, 0)
    }

    function blackblocks_setScene()
    {
        blackblocks_setLight()
        blackblocks_setFog()

        new TextureLoader().load('/images/me.png', (texture) =>
        {
            blackblocks_TEXTURE = texture

            blackblocks_setShaderUniforms()
            blackblocks_setCubes()

            blackblocks_SCENE.add(BLACKBLOCKS_LINES)
            blackblocks_SCENE.add(BLACKBLOCKS_CUBES)
            blackblocks_RENDERER.render(blackblocks_SCENE, blackblocks_CAMERA)

            blackblocks_start()
        })
    }

    function blackblocks_setLight()
    {
        blackblocks_setAmbientLight()
        blackblocks_setDirectionalLight()
        blackblocks_setSpotLight()
        blackblocks_setMouseLight()
    }
    function blackblocks_setAmbientLight()
    {
        const AMBIENTLIGHT = new AmbientLightProbe(COLORS.light, .5)

        blackblocks_SCENE.add(AMBIENTLIGHT)
    }
    function blackblocks_setDirectionalLight()
    {
        const DIRECTIONALLIGHT = new DirectionalLight(COLORS.light, 1.5)

        DIRECTIONALLIGHT.position.set(5, -2.5, 0)

        blackblocks_SCENE.add(DIRECTIONALLIGHT)
    }
    function blackblocks_setSpotLight()
    {
        const SPOTLIGHT = new SpotLight(COLORS.primary, 100, 10, .3, .7, .7)

        SPOTLIGHT.position.set(5, -6, .7)
        SPOTLIGHT.target.position.set(6, 0, 0)

        blackblocks_SCENE.add(SPOTLIGHT)
        blackblocks_SCENE.add(SPOTLIGHT.target)
    }
    function blackblocks_setMouseLight()
    {
        blackblocks_MOUSELIGHT = new SpotLight(COLORS.light, BLACKBLOCKS_MOUSE_INTENSITY, 11, .6, .5, .3)

        blackblocks_MOUSELIGHT.position.z = 5

        blackblocks_SCENE.add(blackblocks_MOUSELIGHT)
        blackblocks_SCENE.add(blackblocks_MOUSELIGHT.target)
    }

    function blackblocks_setFog() { blackblocks_SCENE.fog = new Fog(COLORS.dark, 4, blackblocks_DEPTH) }

    function blackblocks_setCubes()
    {
        for (let i = 0; i < prop_BLACKBLOCKS.length; i += 4)
        {
            const
            [SIZE, X, Y, FLOAT] = [prop_BLACKBLOCKS[i], prop_BLACKBLOCKS[i + 1], prop_BLACKBLOCKS[i + 2], prop_BLACKBLOCKS[i + 3]],
            MATERIAL = new MeshStandardMaterial({ color: COLORS.dark }),
            CUBE = new Mesh(new BoxGeometry(SIZE, SIZE, SIZE), MATERIAL)

            MATERIAL.onBeforeCompile = blackblocks_setShader.bind(CUBE)
    
            blackblocks_setCubeLayout(CUBE, X, Y)
            blackblocks_setCubeLine(CUBE.checkPoints)
    
            BLACKBLOCKS_CUBES.add(CUBE)

            if (FLOAT) blackblocks_setFloatingCube(CUBE)
        }
    }
    function blackblocks_setCubeLayout(cube, x, y)
    {
        const [P0, P1, P2, P3, P4] = blackblocks_getCubePoints(x, y)

        cube.position.x = x
        cube.position.y = y
        cube.iPosition = {...cube.position}
        cube.checkPoints = [P0, P1, P2, P3, P4]
        cube.vel = Math.random() + 1
        cube.rotation.x = BLACKBLOCKS_ROTATION_X
        cube.rotation.y = BLACKBLOCKS_ROTATION_Y
    }
    function blackblocks_setCubeLine([a, b, c, d, e])
    {
        const
        CURVE = new CubicBezierCurve(new Vector2(a.x, a.y), new Vector2(b.x, b.y), new Vector2(d.x, d.y), new Vector2(e.x, e.y)),
        GEOMETRY = new BufferGeometry().setFromPoints(CURVE.getPoints(BLACKBLOCKS_LINE_POINTS_COUNT)),
        MATERIAL = new LineBasicMaterial({ color: COLORS.light, transparent: true, opacity: .2 }),
        LINE = new Line(GEOMETRY, MATERIAL)

        BLACKBLOCKS_LINES.add(LINE)
    }
    function blackblocks_setFloatingCube(cube)
    {
        const UPDATE = update_floating().update

        blackblocks_FLOATING_CUBES_UPDATE.push(async () => cube.position.y += UPDATE() * .0015)
    }

    function blackblocks_setShader(shader)
    {
        shader.uniforms =
        {
            ...BLACKBLOCKS_SHADER_UNIFORMS,
            ...shader.uniforms,
            savedModelMatrix: { value: new Matrix4().copy(this.matrixWorld) }
        }
        shader.vertexShader = blackblocks_monkeyPatch(shader.vertexShader, SHADER_VERTEX)
        shader.fragmentShader = blackblocks_monkeyPatch(shader.fragmentShader, SHADER_FRAGMENT)
    }
    function blackblocks_setShaderUniforms()
    {
        const MODEL_MATRIX_CAMERA = blackblocks_CAMERA.matrixWorld

        BLACKBLOCKS_SHADER_UNIFORMS.projectedTexture.value = blackblocks_TEXTURE
        BLACKBLOCKS_SHADER_UNIFORMS.viewMatrixCamera.value.copy(blackblocks_CAMERA.matrixWorldInverse)
        BLACKBLOCKS_SHADER_UNIFORMS.projPosition.value.setFromMatrixPosition(MODEL_MATRIX_CAMERA)
        BLACKBLOCKS_SHADER_UNIFORMS.projDirection.value.set(0, 0, 1).applyMatrix4(MODEL_MATRIX_CAMERA)

        blackblocks_updateShaderProjectionMatrixCamera()
        blackblocks_updateShaderTextureDimensions()
    }

    // --DESTROY
    function blackblocks_destroy()
    {
        blackblocks_cancel()
        blackblocks_clear(blackblocks_CAMERA)

        blackblocks_destroyEvents()
    }

    function blackblocks_destroyEvents()
    {
        EVENT.event_remove(BLACKBLOCKS_EVENTS)

        blackblocks_destroyEvents2()
        blackblocks_destroyEvents3()
    }

    function blackblocks_destroyEvents2() { EVENT.event_remove(BLACKBLOCKS_EVENTS_2) }

    function blackblocks_destroyEvents3() { EVENT.event_remove(BLACKBLOCKS_EVENTS_3) }

    // --GET
    function blackblocks_getAspectRatio() { return APP.app_WIDTH / APP.app_HEIGHT }

    function blackblocks_getCubePoints(x, y)
    {
        const
        [RATIO, FORCE] = [blackblocks_CAMERA.aspect, 3],
        FORCE_RATIO = FORCE / RATIO,
        GAP_X = y * RATIO + x,
        GAP_Y = GAP_X / RATIO

        return [
            GAP_X < 0
            ?       { x: -blackblocks_WIDTH - 2, y: blackblocks_HEIGHT - GAP_Y * 1.5 }  // P0
            :   GAP_X > 0
                ?   { x: -blackblocks_WIDTH + GAP_X * 1.5, y: blackblocks_HEIGHT + 2 }  // P0
                :   { x: -blackblocks_WIDTH - 2, y: blackblocks_HEIGHT + 2 },           // P0
                    { x: x - FORCE, y: y + FORCE_RATIO },                           // P1
                    { x: x, y: y },                                                 // P2
                    { x: x + FORCE, y: y - FORCE_RATIO },                           // P3
            GAP_X < 0
            ?       { x: blackblocks_WIDTH + GAP_X * 1.5, y: -blackblocks_HEIGHT - 2 }  // P4
            :   GAP_X > 0
                ?   { x: blackblocks_WIDTH + 2, y: -blackblocks_HEIGHT + GAP_Y * 1.5 }  // P4
                :   { x: blackblocks_WIDTH + 2, y: -blackblocks_HEIGHT - 2 }            // P4
        ]
    }

    function blackblocks_getBarycentre(a, b, c, t) { return a + a*t*t + 2*b*t - 2*t*t*b + t*t*c - 2*a*t }

    function blackblocks_getCubeLayout(cube, dif_X, dif_Y, dif_X_ABS, dif_Y_ABS)
    {
        const
        ANGLE = Math.atan(dif_Y / dif_X),
        X = (1 - dif_X_ABS / (Math.cos(ANGLE) * blackblocks_MOUSE_RADIUS)) * dif_X,
        Y = (1 - dif_Y_ABS / (Math.abs(Math.sin(ANGLE)) * blackblocks_MOUSE_RADIUS)) * dif_Y

        return {
            cube,
            x: cube.position.x,
            y: cube.position.y,
            rX: cube.rotation.x,
            rY: cube.rotation.y,
            step_P_X: cube.iPosition.x + X * blackblocks_FORCE_POSITION - cube.position.x,
            step_P_Y: cube.iPosition.y + Y * blackblocks_FORCE_POSITION - cube.position.y,
            step_R_X: BLACKBLOCKS_ROTATION_X + X * blackblocks_FORCE_ROTATION - cube.rotation.x,
            step_R_Y: BLACKBLOCKS_ROTATION_Y + Y * blackblocks_FORCE_ROTATION - cube.rotation.y
        }
    }

    // --UPDATES
    function blackblocks_update(value) { blackblocks_OPTIMISE = value }

    function blackblocks_update2(focus)
    {
        const DURATION = blackblocks_updateCubesPosition(focus)

        blackblocks_updateEvent(prop_ON, blackblocks_OPTIMISE, focus ? 0 : DURATION)
    }

    function blackblocks_updateEvent(on, optimise, delay = 0)
    {
        clearTimeout(blackblocks_TIMEOUT)

        blackblocks_TIMEOUT = setTimeout(() =>
        {
            const FOCUS = on && prop_FOCUS
        
            !optimise && FOCUS
            ?   (blackblocks_setEvents2(), blackblocks_destroyEvents3())
            :   (blackblocks_destroyEvents2(),
                !optimise || FOCUS ? blackblocks_setEvents3() : blackblocks_destroyEvents3())
        },
        delay) 
    }

    function blackblocks_updateCubesPosition(invert = false, intro = false)
    {
        const Z = intro ? -2 : 2
    
        let total_DURATION = 0
    
        for (const CUBE of BLACKBLOCKS_CUBES.children)
        {
            if (!intro) blackblocks_clear(CUBE)

            const
            P0 = CUBE.checkPoints[0],
            DURATION = Math.random() * 1000 + 800,
            DELAY = intro ? Math.random() * 1000 : 0

            if (intro) CUBE.position.set(P0.x, P0.y, Z)

            CUBE.timeout = setTimeout(() => blackblocks_a(CUBE, intro, Z, DURATION, CUBE.t, invert), DELAY)

            total_DURATION = Math.max(total_DURATION, DURATION)
        }

        return total_DURATION * (intro ? .5 : 1)
    }

    const blackblocks_updateFloatingCubes = wait_throttle(async () => { for (const UPDATE of blackblocks_FLOATING_CUBES_UPDATE) UPDATE() }, 100.02)

    function blackblocks_updateSceneVars(radius, forcePosition, forceRotation, mouseIntensity)
    {
        blackblocks_MOUSE_RADIUS = radius
        blackblocks_FORCE_POSITION = forcePosition
        blackblocks_FORCE_ROTATION = forceRotation
        blackblocks_MOUSELIGHT.intensity = mouseIntensity

        blackblocks_updateScene()
    }
    function blackblocks_updateScene()
    {
        blackblocks_aMouseCamera()
        
        if (prop_FOCUS)
        {
            blackblocks_updateMouseLight()
            blackblocks_updateCubesLayout()
        }
    }
    async function blackblocks_updateMouseLight()
    {
        blackblocks_MOUSELIGHT.target.position.x = blackblocks_MOUSE_X
        blackblocks_MOUSELIGHT.target.position.y = blackblocks_MOUSE_Y
    }
    async function blackblocks_updateCubesLayout()
    {
        const
        CUBES = BLACKBLOCKS_CUBES.children,
        DATAS = []
    
        for (let i = 0; i < CUBES.length; i++)
        {
            const
            CUBE = CUBES[i],
            [DIF_X, DIF_Y] = [CUBE.iPosition.x - blackblocks_MOUSE_X, CUBE.iPosition.y - blackblocks_MOUSE_Y],
            [DIF_X_ABS, DIF_Y_ABS] = [Math.abs(DIF_X), Math.abs(DIF_Y)],
            HYP = Math.sqrt(DIF_X_ABS ** 2 + DIF_Y_ABS ** 2)

            if (HYP < blackblocks_MOUSE_RADIUS) DATAS.push(blackblocks_getCubeLayout(CUBE, DIF_X, DIF_Y, DIF_X_ABS, DIF_Y_ABS))
        }

        if (DATAS.length) blackblocks_a2(blackblocks_updateCubeLayout, DATAS, 200)
    }
    function blackblocks_updateCubeLayout(t, { cube, x, y, rX, rY, step_P_X, step_P_Y, step_R_X, step_R_Y })
    {
        cube.position.x = x + step_P_X * t
        cube.position.y = y + step_P_Y * t
        cube.rotation.x = rX + step_R_X * t
        cube.rotation.y = rY + step_R_Y * t
    }

    function blackblocks_updateShaderProjectionMatrixCamera() { BLACKBLOCKS_SHADER_UNIFORMS.projectionMatrixCamera.value.copy(blackblocks_CAMERA.projectionMatrix) }

    function blackblocks_updateShaderTextureDimensions()
    {
        const [TEXTURE_WIDTHSCALED, TEXTURE_HEIGHTSCALED] = blackblocks_computeScaledDimensions(blackblocks_TEXTURE.image, blackblocks_CAMERA)

        BLACKBLOCKS_SHADER_UNIFORMS.widthScaled.value = TEXTURE_WIDTHSCALED
        BLACKBLOCKS_SHADER_UNIFORMS.heightScaled.value = TEXTURE_HEIGHTSCALED
    }

    // --CLEAR
    function blackblocks_clear(obj = {})
    {
        if (obj.cancel instanceof Function) obj.cancel()

        clearTimeout(obj.timeout)
    }

    // --COMMAND
    function blackblocks_c$Optimise(on) { COMMAND.command_test(on, 'boolean', blackblocks_update, BLACKBLOCKS_OPTIMISE_NAME, blackblocks_OPTIMISE) }

    // --EVENTS
    async function blackblocks_e$MouseMove(clientX, clientY)
    {
        const
        [RATIO_X, RATIO_Y] = [(clientX / APP.app_WIDTH) * 2 - 1, -(clientY / APP.app_HEIGHT) * 2 + 1],
        [RAYCASTER, INTERSECTION] = [new Raycaster(), new Vector3()]
    
        RAYCASTER.setFromCamera(new Vector2(RATIO_X, RATIO_Y), blackblocks_CAMERA)
        RAYCASTER.ray.intersectPlane(new Plane(new Vector3(0, 0, 1), 0), INTERSECTION)

        ;[blackblocks_MOUSE_X, blackblocks_MOUSE_Y] = [INTERSECTION.x, INTERSECTION.y]

        blackblocks_updateScene()
    }

    async function blackblocks_e$MouseDown() { blackblocks_TIMEOUT_2 = setTimeout(() => blackblocks_updateSceneVars(4, .3, .03, 3), 200) }

    async function blackblocks_e$MouseUp()
    {
        clearTimeout(blackblocks_TIMEOUT_2)

        blackblocks_updateSceneVars(BLACKBLOCKS_MOUSE_RADIUS, BLACKBLOCKS_FORCE_POSITION, BLACKBLOCKS_FORCE_ROTATION, BLACKBLOCKS_MOUSE_INTENSITY)
    }

    async function blackblocks_e$Resize()
    {
        blackblocks_CAMERA.aspect = blackblocks_getAspectRatio()
        blackblocks_CAMERA.updateProjectionMatrix()

        blackblocks_setRenderer()
    
        blackblocks_setShaderUniforms()

        blackblocks_removeChildrenFrom(BLACKBLOCKS_LINES)
        blackblocks_removeChildrenFrom(BLACKBLOCKS_CUBES)

        blackblocks_FLOATING_CUBES_UPDATE = []

        blackblocks_setCubes()

        blackblocks_start()
    }

    async function blackblocks_e$Animation()
    {
        blackblocks_updateFloatingCubes()

        blackblocks_e$Animation2()
    }

    async function blackblocks_e$Animation2() { blackblocks_RENDERER.render(blackblocks_SCENE, blackblocks_CAMERA) }

    // --CONTROL
    async function blackblocks_start()
    {
        setTimeout(() => blackblocks_CHARGED = true,
        prop_FOCUS
        ? blackblocks_OPTIMISE ? 0 : blackblocks_updateCubesPosition(false, true)
        : blackblocks_hideCubes() ?? 0)

        blackblocks_OPACITY = 1
    }

    // --ANIMATIONS
    function blackblocks_a(cube, intro, z, duration, t, invert = false)
    {
        const [P0, P1, P2] = cube.checkPoints.slice(...(intro ? [0, 3] : [2]))
    
        cube.cancel = animation((t) =>
        {
            const T = cubicInOut(t)

            let u = T
        
            intro ? u = 1 - T : cube.t = t

            cube.position.set(blackblocks_getBarycentre(P0.x, P1.x, P2.x, T), blackblocks_getBarycentre(P0.y, P1.y, P2.y, T), z * u)
        },
        duration, t ?? 0, invert).cancel
    }

    function blackblocks_a2(a = () => {}, datas = [], duration)
    {
        blackblocks_cancel()

        blackblocks_cancel = animation((t) => { for (const ARGS of datas) a(t, ARGS) }, duration).cancel
    }

    async function blackblocks_aMouseCamera()
    {
        const
        [P_X, P_Y] = [blackblocks_CAMERA.position.x, blackblocks_CAMERA.position.y],
        [STEP_X, STEP_Y] = [blackblocks_MOUSE_X * .015 - P_X, blackblocks_MOUSE_Y * .015 - P_Y]

        blackblocks_clear(blackblocks_CAMERA)

        blackblocks_CAMERA.cancel = animation((t) =>
        {
            blackblocks_CAMERA.position.x = P_X + STEP_X * t
            blackblocks_CAMERA.position.y = P_Y + STEP_Y * t
        },
        300).cancel
    }

    // --UTILS
    function blackblocks_monkeyPatch(shader, _ref)
    {
        let { header = '', main = '', ...replaces } = _ref

        for (const KEY in replaces) shader = shader.split(KEY).join(replaces[KEY])

        return shader.replace('void main() {', `${header} void main() { ${main}`)
    }

    function blackblocks_computeScaledDimensions(image, camera)
    {
        const
        RATIO = image.naturalWidth / image.naturalHeight,
        CAMERA_RATIO = camera.aspect,
        CAMERA_HEIGHT = 1 / CAMERA_RATIO

        return RATIO < CAMERA_RATIO
        ? [1 / (CAMERA_HEIGHT * RATIO), 1]
        : [1, 1 / (1 / RATIO / CAMERA_HEIGHT)]
    }

    function blackblocks_hideCubes()
    {
        for (const CUBE of BLACKBLOCKS_CUBES.children)
        {
            let { x, y } = CUBE.checkPoints[4]

            CUBE.position.set(x, y, 2)
            CUBE.t = 1
        }
    }

    function blackblocks_removeChildrenFrom(parent = {})
    {
        const CHILDREN = parent.children
    
        while (CHILDREN?.length) parent.remove(CHILDREN[0])
    }

// #CYCLES

onMount(blackblocks_set)
onDestroy(blackblocks_destroy)
</script>

<!-- #HTML -->

<div
class="blackblocks"
style:opacity={blackblocks_OPACITY}
bind:this={blackblocks}
>
</div>

<!-- #STYLE -->

<style
lang="scss"
>
/* #USE */

@use '../../assets/scss/styles/position';

/* #BLACKBLOCKS */

.blackblocks
{
    @include position.placement(absolute, $top: 0, $left: 0);

    transition: opacity .2s;
}
</style>