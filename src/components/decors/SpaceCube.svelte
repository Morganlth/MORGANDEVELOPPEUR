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
    prop_FOCUS = false,
    prop_RATIO = 0,
    prop_TICTACTOE = false

    // --BIND
    export let spacecube_CHARGED = false

// #IMPORTS

    // --JS
    import SPACECUBE_CUBES_DATAS from '../../assets/js/datas/dSpacecube'
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

// #CONSTANTES

    // --ELEMENT-SPACECUBE
    const
    SPACECUBE_NAME = 'spacecube',
    SPACECUBE_ANTIALIAS = true,
    SPACECUBE_PIXELRATIO = 2,
    SPACECUBE_CAMERA_FOV = 75,
    SPACECUBE_CAMERA_NEAR = .1,
    SPACECUBE_CAMERA_Z = 5,
    SPACECUBE_RADIUS = 3,
    SPACECUBE_FORCE_POSITION = .05,
    SPACECUBE_FORCE_ROTATION = .01,
    SPACECUBE_MOUSE_INTENSITY = .5,
    SPACECUBE_CUBES = new Group(),
    SPACECUBE_FLOATING_UPDATE_CUBES = [],
    SPACECUBE_ROTATION_X = -MATH.rad.r45 / 2,
    SPACECUBE_ROTATION_Y = MATH.rad.r45,
    SPACECUBE_COMMANDS =
    [
        {
            name: SPACECUBE_NAME,
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
        animation: wait_throttle(spacecube_e$Animation, 16.67)
    },
    SPACECUBE_EVENTS_3 =
    {
        scroll: wait_throttle(spacecube_e$Scroll, 33.34),
        mouseDown: spacecube_e$MouseDown,
        mouseUp: spacecube_e$MouseUp,
        animation: wait_throttle(spacecube_e$Animation2, 33.34)
    }

    // --ELEMENT-SPACECUBE~SHADERS
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
    spacecube_OPACITY = 0,
    spacecube_SCROLL_ANIMATION = false,
    spacecube_SCENE,
    spacecube_CAMERA,
    spacecube_RENDERER,
    spacecube_WIDTH,
    spacecube_HEIGHT,
    spacecube_DEPTH,
    spacecube_MOUSELIGHT,
    spacecube_TEXTURE = null,
    spacecube_RADIUS = SPACECUBE_RADIUS,
    spacecube_FORCE_POSITION = SPACECUBE_FORCE_POSITION,
    spacecube_FORCE_ROTATION = SPACECUBE_FORCE_ROTATION,
    spacecube_MOUSE_X = 0,
    spacecube_MOUSE_Y = 0,
    spacecube_TIMEOUT,
    spacecube_TIMEOUT_2

// #REACTIVES

    // --ELEMENT-SPACECUBE
    $: spacecube_CHARGED && !APP.app_$OPTIMISE.on ? spacecube_updateEvents3(prop_FOCUS) : void 0
    $: prop_TICTACTOE && spacecube_CHARGED ? spacecube_setTicTacToe() : void 0

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
        ASPECT = window.innerWidth / window.innerHeight,
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

    function spacecube_setEvents()
    {
        EVENT.event_add(SPACECUBE_EVENTS)

        spacecube_setEvents2()
    }

    function spacecube_setEvents2()
    {
        EVENT.event_add(SPACECUBE_EVENTS_2)

        if (prop_FOCUS) spacecube_setEvents3()
    }

    function spacecube_setEvents3() { EVENT.event_add(SPACECUBE_EVENTS_3) }

    function spacecube_setCamera()
    {
        spacecube_CAMERA.position.z = SPACECUBE_CAMERA_Z
        spacecube_CAMERA.lookAt(0, 0, 0)
    }

    function spacecube_setRenderer()
    {
        spacecube_RENDERER.setSize(window.innerWidth, window.innerHeight)
        spacecube_RENDERER.setPixelRatio(Math.min(window.devicePixelRatio, SPACECUBE_PIXELRATIO))
        spacecube_RENDERER.setClearColor(0x000000, 0)
    }

    function spacecube_setScene()
    {
        spacecube_setLight()
        spacecube_setFog()

        new TextureLoader().load('./images/me.png', (texture) =>
        {
            spacecube_TEXTURE = texture

            shader_setUniforms()
            spacecube_setCubes()

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
        for (let i = 0; i < SPACECUBE_CUBES_DATAS.length; i += 4)
        {
            const
            [SIZE, X, Y, FLOAT] = [SPACECUBE_CUBES_DATAS[i], SPACECUBE_CUBES_DATAS[i + 1], SPACECUBE_CUBES_DATAS[i + 2], SPACECUBE_CUBES_DATAS[i + 3]],
            MATERIAL = new MeshStandardMaterial({ color: COLORS.dark }),
            CUBE = new Mesh(new BoxGeometry(SIZE, SIZE, SIZE), MATERIAL)

            MATERIAL.onBeforeCompile = shader_set.bind(CUBE)
    
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
        spacecube_SCENE.add(
        new Line(
            new BufferGeometry().setFromPoints(
                new CubicBezierCurve(
                    new Vector2(a.x, a.y),
                    new Vector2(b.x, b.y),
                    new Vector2(d.x, d.y),
                    new Vector2(e.x, e.y)
                ).getPoints(30)),
            new LineBasicMaterial({ color: COLORS.light, transparent: true, opacity: .2 })
        ))
    }
    function spacecube_setFloatingCube(cube)
    {
        const UPDATE = update_floating().update

        SPACECUBE_FLOATING_UPDATE_CUBES.push(async () => cube.position.y += UPDATE() * 0.0015)
    }

    function spacecube_setTicTacToe()
    {
        new TextureLoader().load('./images/tictactoe.png', (texture) =>
        {
            SHADER_UNIFORMS.projectedTexture.value = texture
        })
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
    function spacecube_destroy() { spacecube_destroyEvents() }

    function spacecube_destroyEvents()
    {
        EVENT.event_remove(SPACECUBE_EVENTS)

        spacecube_destroyEvents2()
    }

    function spacecube_destroyEvents2()
    {
        EVENT.event_remove(SPACECUBE_EVENTS_2)

        spacecube_destroyEvents3()
    }

    function spacecube_destroyEvents3() { EVENT.event_remove(SPACECUBE_EVENTS_3) }

    // --GET
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

    // --UPDATES
    function spacecube_update(on)
    {
        on ? spacecube_setEvents2() : spacecube_destroyEvents2()
    
        spacecube_ON = on
    }

    function spacecube_updateEvents3()
    {
        if (prop_FOCUS)
        {
            spacecube_setEvents3()
        }
        else
        {
            spacecube_destroyEvents3()

            spacecube_updateCubesPosition(2)
        }
    }

    const spacecube_updateFloatingCubes = wait_throttle(() => { for (const UPDATE of SPACECUBE_FLOATING_UPDATE_CUBES) UPDATE() }, 100)

    async function spacecube_updateCubesPosition(ratio)
    {
        const CUBES = SPACECUBE_CUBES.children

        for (const CUBE of CUBES)
        {
            const [A, B, C, T] = [CUBE.checkPoints[2], CUBE.checkPoints[3], CUBE.checkPoints[4], ratio * CUBE.vel],
            [X, Y] = [spacecube_getBarycentre(A.x, B.x, C.x, T), spacecube_getBarycentre(A.y, B.y, C.y, T)]

            spacecube_clearAnimationFrame(CUBE)

            CUBE.position.x = X + (CUBE.position.x - CUBE.iPosition.x)
            CUBE.position.y = Y + (CUBE.position.y - CUBE.iPosition.y)
            CUBE.iPosition = { x: X, y: Y }
        }
    }

    function spacecube_updateSceneVars(radius, forcePosition, forceRotation, mouseIntensity)
    {
        spacecube_RADIUS = radius
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
    
            if (!spacecube_SCROLL_ANIMATION) spacecube_updateCubesLayout()
        }
    }
    async function spacecube_updateMouseLight()
    {
        spacecube_MOUSELIGHT.target.position.x = spacecube_MOUSE_X
        spacecube_MOUSELIGHT.target.position.y = spacecube_MOUSE_Y
    }
    async function spacecube_updateCubesLayout()
    {
        const CUBES = SPACECUBE_CUBES.children
    
        for (let i = 0; i < CUBES.length; i++)
        {
            const
            CUBE = CUBES[i],
            [DIF_X, DIF_Y] = [CUBE.iPosition.x - spacecube_MOUSE_X, CUBE.iPosition.y - spacecube_MOUSE_Y],
            [DIF_X_ABS, DIF_Y_ABS] = [Math.abs(DIF_X), Math.abs(DIF_Y)],
            HYP = Math.sqrt(DIF_X_ABS * DIF_X_ABS + DIF_Y_ABS * DIF_Y_ABS)

            if (HYP < spacecube_RADIUS) spacecube_aCubeLayout(CUBE, DIF_X, DIF_Y, DIF_X_ABS, DIF_Y_ABS)
        }
    }

    function shader_updateProjectionMatrixCamera() { SHADER_UNIFORMS.projectionMatrixCamera.value.copy(spacecube_CAMERA.projectionMatrix) }

    function shader_updateTextureDimensions()
    {
        const [TEXTURE_WIDTHSCALED, TEXTURE_HEIGHTSCALED] = spacecube_computeScaledDimensions(spacecube_TEXTURE.image, spacecube_CAMERA)

        SHADER_UNIFORMS.widthScaled.value = TEXTURE_WIDTHSCALED
        SHADER_UNIFORMS.heightScaled.value = TEXTURE_HEIGHTSCALED
    }

    // --COMMAND
    function spacecube_c$(on) { COMMAND.command_test(on, 'boolean', spacecube_update, SPACECUBE_NAME, spacecube_ON) }

    // --EVENTS
    async function spacecube_e$Scroll(scrollTop)
    {
        clearTimeout(spacecube_TIMEOUT_2)
        spacecube_SCROLL_ANIMATION = true

        spacecube_updateCubesPosition(scrollTop > 0 ? prop_RATIO : 0)

        spacecube_TIMEOUT_2 = setTimeout(() => spacecube_SCROLL_ANIMATION = false, 100)
    }

    async function spacecube_e$MouseMove(clientX, clientY)
    {
        const
        [RATIO_X, RATIO_Y] = [(clientX / window.innerWidth) * 2 - 1, -(clientY / window.innerHeight) * 2 + 1],
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

        spacecube_updateSceneVars(SPACECUBE_RADIUS, SPACECUBE_FORCE_POSITION, SPACECUBE_FORCE_ROTATION, SPACECUBE_MOUSE_INTENSITY)
    }

    async function spacecube_e$Resize()
    {
        spacecube_CAMERA.aspect = window.innerWidth / window.innerHeight
        spacecube_CAMERA.updateProjectionMatrix()

        spacecube_setRenderer()
    
        shader_setUniforms()
        shader_updateProjectionMatrixCamera()
        shader_updateTextureDimensions()
    }

    async function spacecube_e$Animation()
    {
        spacecube_updateFloatingCubes()

        spacecube_RENDERER.render(spacecube_SCENE, spacecube_CAMERA)
    }

    async function spacecube_e$Animation2() { spacecube_updateFloatingCubes() }

    // --CONTROL
    async function spacecube_start()
    {
        setTimeout(() => spacecube_CHARGED = true,
        prop_RATIO === 0
        ? APP.app_OPTIMISE
            ? 0
            : spacecube_aStart()
        : spacecube_updateCubesPosition(prop_RATIO) ?? 0)

        spacecube_OPACITY = 1
    }

    // --ANIMATIONS
    function spacecube_aStart()
    {
        const
        CUBES = SPACECUBE_CUBES.children,
        Z = -2

        let total_DURATION = 0
    
        for (const CUBE of CUBES)
        {
            const
            [A, B, C] = [CUBE.checkPoints[0], CUBE.checkPoints[1], CUBE.checkPoints[2]],
            [DURATION, DELAY] = [Math.random() * 700 + 500, Math.random() * 900]

            CUBE.position.set(A.x, A.y, Z)

            setTimeout(() =>
                animation((t) => CUBE.position.set(spacecube_getBarycentre(A.x, B.x, C.x, t), spacecube_getBarycentre(A.y, B.y, C.y, t), Z * (1 - t)), DURATION)
            , DELAY)

            total_DURATION = Math.max(total_DURATION, DURATION)
        }

        return total_DURATION
    }

    async function spacecube_aMouseCamera()
    {
        const
        [P_X, P_Y] = [spacecube_CAMERA.position.x, spacecube_CAMERA.position.y],
        [STEP_X, STEP_Y] = [spacecube_MOUSE_X * .015 - P_X, spacecube_MOUSE_Y * .015 - P_Y]

        spacecube_clearAnimationFrame(spacecube_CAMERA)

        animation.call(spacecube_CAMERA, (t) =>
        {
            spacecube_CAMERA.position.x = P_X + STEP_X * t
            spacecube_CAMERA.position.y = P_Y + STEP_Y * t
        }, 300)
    }
    async function spacecube_aCubeLayout(cube, dif_X, dif_Y, dif_X_ABS, dif_Y_ABS)
    {
        const
        ANGLE = Math.atan(dif_Y / dif_X),
        [X0, Y0] = [(1 - dif_X_ABS / (Math.cos(ANGLE) * spacecube_RADIUS)) * dif_X, (1 - dif_Y_ABS / (Math.abs(Math.sin(ANGLE)) * spacecube_RADIUS)) * dif_Y],
        [P_X, P_Y, R_X, R_Y] = [cube.position.x, cube.position.y, cube.rotation.x, cube.rotation.y],
        [STEP_P_X, STEP_P_Y] = [cube.iPosition.x + X0 * spacecube_FORCE_POSITION - P_X, cube.iPosition.y + Y0 * spacecube_FORCE_POSITION - P_Y],
        [STEP_R_X, STEP_R_Y] = [SPACECUBE_ROTATION_X + X0 * spacecube_FORCE_ROTATION - R_X, SPACECUBE_ROTATION_Y + Y0 * spacecube_FORCE_ROTATION - R_Y]

        spacecube_clearAnimationFrame(cube)
    
        animation.call(cube, (t) =>
        {
            [cube.position.x, cube.position.y, cube.rotation.x, cube.rotation.y] = [P_X + STEP_P_X * t, P_Y + STEP_P_Y * t, R_X + STEP_R_X * t, R_Y + STEP_R_Y * t]
        }, 200)
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

    function spacecube_clearAnimationFrame(obj) { cancelAnimationFrame(obj.animation_FRAMEID) } 

// #CYCLES

onMount(spacecube_set)
onDestroy(spacecube_destroy)
</script>

<!-- #HTML -->

<div
class="spacecube"
style:opacity={spacecube_OPACITY}
bind:this={spacecube}
>
</div>

<!-- #STYLE -->

<style
lang="scss"
>
/* #USE */

@use '../../assets/scss/styles/position';

/* #SPACECUBE */

.spacecube
{
    @include position.placement(absolute, 0, auto, auto, 0);

    transition: opacity .3s;
}
</style>