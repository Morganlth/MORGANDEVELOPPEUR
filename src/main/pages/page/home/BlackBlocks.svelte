<!----------------------------------------------- #||--blackblocks--|| -->

<!-- Code inspired, adapted / modified for texture projection in Three js from: https://github.com/marcofugaro/three-projected-material -->


<!-- #|-CONTEXT-| -->
<!--
<script
context="module"
>

// #\-IMPORTS-\

    // --SVELTE

     // --LIB

    // --JS


// #\-EXPORTS-\

    // --CONTEXTS


</script>
-->

<!-- #|-HTML-| -->

<div
class="blackblocks"
class:hide={blackblocks_HIDE}
bind:this={blackblocks}
>
</div>


<!-- #|-SCRIPT-| -->

<script>

// #\-IMPORTS-\

    // --DATA
    import SHADER_VERTEX   from '../../../../assets/js/data/glsl/vertex'
    import SHADER_FRAGMENT from '../../../../assets/js/data/glsl/fragment'

    // --DEPENDENCIES
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
    import { cubicInOut }         from 'svelte/easing'

    // --LIB
    import COLORS                                  from '$lib/colors'
    import MATH                                    from '$lib/math'
    import { wait_throttle }                       from '$lib/wait'
    import { animation, animation_staticFloating } from '$lib/animation'

    // --CONTEXTS
    import { APP, COMMAND, EVENT } from '../../../../App.svelte'

//=======@COMPONENTS|

    // --*
    
//=======@STYLE|

    // --*


// #\-EXPORTS-\

    // --PROPS
    export let
    prop_ON    = false,
    prop_FOCUS = false
    ,
    prop_BLACKBLOCKS = new Float32Array([])

    // --BINDING
    export let page_CHARGED = false


// #\-CONSTANTES-\

    // --SVELTE

    // --CONTEXTS

    // --OUTSIDE

    // --THIS
    const
    BLACKBLOCKS_ANTIALIAS  = true,
    BLACKBLOCKS_PIXELRATIO = 2
    ,
    BLACKBLOCKS_CAMERA_FOV  = 75,
    BLACKBLOCKS_CAMERA_NEAR = .1,
    BLACKBLOCKS_CAMERA_Z    = 5
    ,
    BLACKBLOCKS_LINES             = new Group(),
    BLACKBLOCKS_LINE_POINTS_COUNT = 30
    ,
    BLACKBLOCKS_FORCE_POSITION = .05,
    BLACKBLOCKS_FORCE_ROTATION = .01
    ,
    BLACKBLOCKS_ROTATION_X = -MATH.toRad(16),
    BLACKBLOCKS_ROTATION_Y =  MATH.toRad(32)
    ,
    BLACKBLOCKS_MOUSE_RADIUS    = 3,
    BLACKBLOCKS_MOUSE_ANGLE     = .46,
    BLACKBLOCKS_MOUSE_INTENSITY = 6
    ,
    BLACKBLOCKS_GEOMETRIES = [],
    BLACKBLOCKS_BLOCKS     = new Group()
    ,
    BLACKBLOCKS_SHADER_UNIFORMS =
    {
        viewMatrixCamera      : { value: new Matrix4() },
        projectionMatrixCamera: { value: new Matrix4() },
        projPosition          : { value: new Vector3() },
        projDirection         : { value: new Vector3(0, 0, -1) },
        projectedTexture      : { value: '' },
        widthScaled           : { value: 0 },
        heightScaled          : { value: 0 },
        textureOffset         : { value: new Vector2(-.21, -.02) }
    }
    ,
    BLACKBLOCKS_COMMANDS =
    [
        {
            name           : 'blackblocks_optimise',
            callback       : blackblocks_c$Optimise,
            getCurrentValue: () => blackblocks_OPTIMISE,
            params         : { defaultValue: false, optimise: { value: true } },
            tests          : { testBoolean: true },
            desc           : 'Optimiser les blocks noirs (p: \'t\' ou \'f\')',
            storage        : true
        }
    ]
    ,
    BLACKBLOCKS_EVENTS   = { resize: blackblocks_e$Resize },
    BLACKBLOCKS_EVENTS_2 =
    {
        mouseMove: wait_throttle(blackblocks_e$MouseMove, 2),
        mouseDown: blackblocks_e$MouseDown,
        mouseUp  : blackblocks_e$MouseUp,
        animation: blackblocks_e$Animation
    },
    BLACKBLOCKS_EVENTS_3 =
    {
        mouseMove: wait_throttle(blackblocks_e$MouseMove,  3),
        animation: wait_throttle(blackblocks_e$Animation2, 3)
    }

    // --INSIDE


// #\-VARIABLES-\

    // --CONTEXTS

    // --OUTSIDE

    // --THIS
    let
    blackblocks
    ,
    blackblocks_CHARGED   = false,
    blackblocks_OPTIMISE  = false,
    blackblocks_HIDE      = true,
    blackblocks_ANIMATION = false
    ,
    blackblocks_SCENE,
    blackblocks_CAMERA,
    blackblocks_RENDERER,
    blackblocks_MOUSELIGHT
    ,
    blackblocks_FLOATING_BLOCKS = []
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
    blackblocks_TIMEOUT_2,
    blackblocks_TIMEOUT_3
    ,
    blackblocks_cancel = () => {}

    // --INSIDE


// #\-REATIVES-\

    // --CONTEXTS

    // --OUTSIDE

    // --THIS
    $: blackblocks_update(prop_FOCUS)
    $: blackblocks_updateEvent(prop_ON, blackblocks_OPTIMISE)

    // --INSIDE


// #\-FUNCTIONS-\

//=======@LIFE|

    // --SVELTE
    onMount(blackblocks_set), onDestroy(blackblocks_destroy)

    // --SET
    function blackblocks_set()
    {
        if (WebGL.isWebGLAvailable())
        {
            blackblocks_setVars()
            blackblocks_setCommands()
            blackblocks_setEvents()
            blackblocks_setHtml()
            blackblocks_setCamera()
            blackblocks_setRenderer()
            blackblocks_setScene()
        }
        else page_CHARGED = (blackblocks_CHARGED = true)
    }

    function blackblocks_setVars()
    {
        const
        ASPECT = blackblocks_getAspectRatio(),
        DEPTH  = BLACKBLOCKS_CAMERA_Z + 1
    
        blackblocks_SCENE    = new Scene()
        blackblocks_CAMERA   = new PerspectiveCamera(BLACKBLOCKS_CAMERA_FOV, ASPECT, BLACKBLOCKS_CAMERA_NEAR, DEPTH)
        blackblocks_RENDERER = new WebGLRenderer({ alpha: true, antialias: BLACKBLOCKS_ANTIALIAS })

        blackblocks_DEPTH = DEPTH

        blackblocks_setVars2(ASPECT)
    }
    function blackblocks_setVars2(aspect)
    {
        const HEIGHT = Math.tan(MATH.toRad(BLACKBLOCKS_CAMERA_FOV / 2)) * BLACKBLOCKS_CAMERA_Z

        blackblocks_WIDTH = (blackblocks_HEIGHT = HEIGHT) * aspect
    }

    function blackblocks_setCommands() { COMMAND.command_setCommands(BLACKBLOCKS_COMMANDS) }

    function blackblocks_setEvents()  { EVENT.event_add(BLACKBLOCKS_EVENTS) }
    function blackblocks_setEvents2() { EVENT.event_add(BLACKBLOCKS_EVENTS_2) }
    function blackblocks_setEvents3() { EVENT.event_add(BLACKBLOCKS_EVENTS_3) }

    function blackblocks_setHtml() { blackblocks.appendChild(blackblocks_RENDERER.domElement) }

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

    async function blackblocks_setScene()
    {
              blackblocks_setLight()
              blackblocks_setFog()
        await blackblocks_setScene2()
              blackblocks_setScene3()
              blackblocks_start()
    }

    async function blackblocks_setScene2()
    {
        return new Promise(resolve =>
        {
            new TextureLoader().load('/images/me.png', texture =>
            {
                blackblocks_TEXTURE = texture

                blackblocks_setShaderUniforms()
                blackblocks_setSceneObjects()
                resolve()
            })
        })
    }
    function blackblocks_setScene3()
    {
        blackblocks_SCENE.add(BLACKBLOCKS_LINES)
        blackblocks_SCENE.add(BLACKBLOCKS_BLOCKS)

        blackblocks_setBlocksPosition(0)
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
        const AMBIENTLIGHT = new AmbientLightProbe(COLORS.light, 1.2)

        blackblocks_SCENE.add(AMBIENTLIGHT)
    }
    function blackblocks_setDirectionalLight()
    {
        const DIRECTIONALLIGHT = new DirectionalLight(COLORS.light, .6)

        DIRECTIONALLIGHT.position.set(3, -1.2, 0)

        blackblocks_SCENE.add(DIRECTIONALLIGHT)
    }
    function blackblocks_setSpotLight()
    {
        const SPOTLIGHT = new SpotLight(COLORS.primary, 40, 16, .4, .8, .8)

        SPOTLIGHT.position.set(6, -8, 8)
        SPOTLIGHT.target.position.set(3, -1.2, 0)

        blackblocks_SCENE.add(SPOTLIGHT)
        blackblocks_SCENE.add(SPOTLIGHT.target)
    }
    function blackblocks_setMouseLight()
    {
        blackblocks_MOUSELIGHT = new SpotLight(COLORS.light, BLACKBLOCKS_MOUSE_INTENSITY, 12, BLACKBLOCKS_MOUSE_ANGLE, 1, .8)

        blackblocks_MOUSELIGHT.position.z = 6

        blackblocks_SCENE.add(blackblocks_MOUSELIGHT)
        blackblocks_SCENE.add(blackblocks_MOUSELIGHT.target)
    }

    function blackblocks_setFog() { blackblocks_SCENE.fog = new Fog(COLORS.dark, 3.8, blackblocks_DEPTH) }

    function blackblocks_setSceneObjects()
    {
        for (let i = 0; i < prop_BLACKBLOCKS.length; i += 4)
        {
            const
            SIZE  = prop_BLACKBLOCKS[i],
            X     = prop_BLACKBLOCKS[i + 1],
            Y     = prop_BLACKBLOCKS[i + 2],
            FLOAT = prop_BLACKBLOCKS[i + 3],
            BLOCK = blackblocks_getBlock(SIZE, X, Y),
            LINES = blackblocks_getBlockLine(BLOCK.checkPoints)
    
            BLACKBLOCKS_BLOCKS.add(BLOCK)
            BLACKBLOCKS_LINES.add(LINES)

            if (FLOAT) blackblocks_FLOATING_BLOCKS.push(blackblocks_getBlockFloating(BLOCK))
        }
    }

    function blackblocks_setBlockLayout(block, x, y)
    {
        const [P0, P1, P2, P3, P4] = blackblocks_getBlockPoints(x, y)

        block.position.x  = x
        block.position.y  = y
        block.iPosition   = {...block.position}
        block.checkPoints = [P0, P1, P2, P3, P4]
        block.vel         = Math.random() + 1
        block.rotation.x  = BLACKBLOCKS_ROTATION_X
        block.rotation.y  = BLACKBLOCKS_ROTATION_Y
    }
    function blackblocks_setBlocksPosition(p = 4)
    {
        blackblocks_e$Animation2() // render

        const [Z, T] = p ? [2, 1] : [-2, 0]

        for (const BLOCK of BLACKBLOCKS_BLOCKS.children)
        {
            let {x, y} = BLOCK.checkPoints[p]

            BLOCK.position.set(x, y, Z)
            BLOCK.t = T
        }
    }

    function blackblocks_setShader(shader)
    {
        shader.uniforms =
        {
            ...BLACKBLOCKS_SHADER_UNIFORMS,
            ...shader.uniforms,
            savedModelMatrix: { value: new Matrix4().copy(this.matrixWorld) }
        }
    
        shader.vertexShader   = blackblocks_monkeyPatch(shader.vertexShader,   SHADER_VERTEX)
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

    // --GET
    function blackblocks_getAspectRatio() { return APP.app_WIDTH / APP.app_HEIGHT }

    function blackblocks_getBlock(size, x, y)
    {
        const
        MATERIAL = new MeshStandardMaterial({ color: COLORS.dark, wireframe: false }),
        GEOMETRY = blackblocks_getBlockGeometry(size),
        BLOCK    = new Mesh(GEOMETRY, MATERIAL)

        MATERIAL.onBeforeCompile = blackblocks_setShader.bind(BLOCK)

        blackblocks_setBlockLayout(BLOCK, x, y)

        return BLOCK
    }

    function blackblocks_getBlockGeometry(size)
    {
        let geometry = BLACKBLOCKS_GEOMETRIES.find(g => g.parameters.width === size)
    
        if (!geometry)
        {
            geometry = new BoxGeometry(size, size, size)

            BLACKBLOCKS_GEOMETRIES.push(geometry)
        }

        return geometry
    }

    function blackblocks_getBlockLine([a, b, c, d, e])
    {
        const
        CURVE    = new CubicBezierCurve(new Vector2(a.x, a.y), new Vector2(b.x, b.y), new Vector2(d.x, d.y), new Vector2(e.x, e.y)),
        GEOMETRY = new BufferGeometry().setFromPoints(CURVE.getPoints(BLACKBLOCKS_LINE_POINTS_COUNT)),
        MATERIAL = new LineBasicMaterial({ color: COLORS.light, transparent: true, opacity: .1 }),
        LINE     = new Line(GEOMETRY, MATERIAL)

        return LINE
    }

    function blackblocks_getBlockFloating(block)
    {
        block.getFloating = animation_staticFloating(null, .01)

        return block
    }

    function blackblocks_getBlockPoints(x, y)
    {
        const
        RATIO       = blackblocks_CAMERA.aspect,
        FORCE       = 3,
        FORCE_RATIO = FORCE / RATIO,
        GAP_X       = y * RATIO + x,
        GAP_Y       = GAP_X / RATIO

        return [
            GAP_X < 0
            ?       { x: -blackblocks_WIDTH - 2,           y: blackblocks_HEIGHT - GAP_Y * 1.5 }  // P0
            :   GAP_X > 0
                ?   { x: -blackblocks_WIDTH + GAP_X * 1.5, y: blackblocks_HEIGHT + 2 }            // P0
                :   { x: -blackblocks_WIDTH - 2,           y: blackblocks_HEIGHT + 2 },           // P0
                    { x: x - FORCE,                        y: y + FORCE_RATIO },                  // P1
                    { x: x,                                y: y },                                // P2
                    { x: x + FORCE,                        y: y - FORCE_RATIO },                  // P3
            GAP_X < 0
            ?       { x: blackblocks_WIDTH + GAP_X * 1.5,  y: -blackblocks_HEIGHT - 2 }           // P4
            :   GAP_X > 0
                ?   { x: blackblocks_WIDTH + 2,            y: -blackblocks_HEIGHT + GAP_Y * 1.5 } // P4
                :   { x: blackblocks_WIDTH + 2,            y: -blackblocks_HEIGHT - 2 }           // P4
        ]
    }

    function blackblocks_getBlockLayout(block, dif_X, dif_Y, dif_X_ABS, dif_Y_ABS)
    {
        const
        ANGLE = Math.atan(dif_Y / dif_X),
        X     = (1 - dif_X_ABS / (Math.cos(ANGLE) * blackblocks_MOUSE_RADIUS)) * dif_X,
        Y     = (1 - dif_Y_ABS / (Math.abs(Math.sin(ANGLE)) * blackblocks_MOUSE_RADIUS)) * dif_Y

        return {
            block,
            x:        block.position.x,
            y:        block.position.y,
            rX:       block.rotation.x,
            rY:       block.rotation.y,
            step_P_X: block.iPosition.x + X * blackblocks_FORCE_POSITION - block.position.x,
            step_P_Y: block.iPosition.y + Y * blackblocks_FORCE_POSITION - block.position.y,
            step_R_X: BLACKBLOCKS_ROTATION_X + X * blackblocks_FORCE_ROTATION - block.rotation.x,
            step_R_Y: BLACKBLOCKS_ROTATION_Y + Y * blackblocks_FORCE_ROTATION - block.rotation.y
        }
    }

    function blackblocks_getBarycentre(a, b, c, t) { return a + a*t*t + 2*b*t - 2*t*t*b + t*t*c - 2*a*t }

    // --UPDATES
    function blackblocks_update(focus)
    {
        if (blackblocks && blackblocks_CHARGED)
        {
            const DURATION = blackblocks_updateBlocksPosition(focus)

            blackblocks_updateAnimation(DURATION)
            blackblocks_updateEvent(prop_ON, blackblocks_OPTIMISE, focus ? 0 : DURATION)
        }
    }

    function blackblocks_updateAnimation(duration = 0)
    {
        blackblocks_destroyTimeout()
    
        blackblocks_ANIMATION = true

        blackblocks_TIMEOUT = setTimeout(() => blackblocks_ANIMATION = false, duration)
    }


    function blackblocks_updateEvent(on, optimise, delay = 0)
    {
        blackblocks_destroyTimeout2()

        blackblocks_TIMEOUT_2 = setTimeout(() =>
        {
            const FOCUS = on && prop_FOCUS

            if (!optimise && FOCUS)
            {
                blackblocks_setEvents2()
                blackblocks_destroyEvents3()
            }
            else
            {
                blackblocks_destroyEvents2()

                !optimise || FOCUS ? blackblocks_setEvents3() : blackblocks_destroyEvents3()
            }
        },
        delay) 
    }

    function blackblocks_updateCamera(aspect)
    {
        blackblocks_CAMERA.aspect = aspect
        blackblocks_CAMERA.updateProjectionMatrix()
    }

    function blackblocks_updateScene()
    {
        blackblocks_aMouseCamera()
        
        if (prop_FOCUS)
        {
            blackblocks_updateMouseLight()
            
            if (!blackblocks_ANIMATION) blackblocks_updateBlocksLayout()
        }
    }
    function blackblocks_updateSceneVars(radius, intensity, angle, forcePosition, forceRotation)
    {
        blackblocks_MOUSE_RADIUS         = radius
        blackblocks_MOUSELIGHT.intensity = intensity
        blackblocks_MOUSELIGHT.angle     = angle

        blackblocks_FORCE_POSITION = forcePosition
        blackblocks_FORCE_ROTATION = forceRotation

        blackblocks_updateScene()
    }

    async function blackblocks_updateMouseLight()
    {
        blackblocks_MOUSELIGHT.target.position.x = blackblocks_MOUSE_X
        blackblocks_MOUSELIGHT.target.position.y = blackblocks_MOUSE_Y
    }

    async function blackblocks_updateBlocksLayout()
    {
        const DATA = []
    
        for (const BLOCK of BLACKBLOCKS_BLOCKS.children)
        {
            const
            DIF_X     = BLOCK.iPosition.x - blackblocks_MOUSE_X,
            DIF_Y     = BLOCK.iPosition.y - blackblocks_MOUSE_Y,
            DIF_X_ABS = Math.abs(DIF_X),
            DIF_Y_ABS = Math.abs(DIF_Y),
            HYP       = Math.sqrt(DIF_X_ABS ** 2 + DIF_Y_ABS ** 2)

            if (HYP < blackblocks_MOUSE_RADIUS) DATA.push(blackblocks_getBlockLayout(BLOCK, DIF_X, DIF_Y, DIF_X_ABS, DIF_Y_ABS))
        }

        if (DATA.length) blackblocks_aBlocksLayout(blackblocks_updateBlockLayout, DATA, 200)
    }
    function blackblocks_updateBlockLayout(t, { block, x, y, rX, rY, step_P_X, step_P_Y, step_R_X, step_R_Y })
    {
        block.position.x = x  + step_P_X * t
        block.position.y = y  + step_P_Y * t
        block.rotation.x = rX + step_R_X * t
        block.rotation.y = rY + step_R_Y * t
    }

    const blackblocks_updateBlockFloating = wait_throttle(function blackblocks_updateBlockFloating()
    {
        for (const FLOATING_BLOCK of blackblocks_FLOATING_BLOCKS)
        {
            FLOATING_BLOCK.position.y += FLOATING_BLOCK.getFloating() * .0004
        }
    },
    2) // +- 33ms

    function blackblocks_updateBlocksPosition(invert = false, intro = false)
    {
        const CALLBACK = intro ? blackblocks_updateBlocksPositionIntro : blackblocks_updateBlocksPositionOutro
    
        let total_DURATION = 0
    
        for (const BLOCK of BLACKBLOCKS_BLOCKS.children)
        {
            const
            DURATION = Math.random() * 1000 + 800,
            DELAY    = CALLBACK(BLOCK, DURATION, invert)

            total_DURATION = Math.max(total_DURATION, DURATION + DELAY)
        }

        return total_DURATION
    }
    function blackblocks_updateBlocksPositionIntro(block = {}, duration = 0)
    {
        const
        P0    = block.checkPoints[0],
        DELAY = Math.random() * 800

        block.position.set(P0.x, P0.y, -2)
    
        block.timeout = setTimeout(() => blackblocks_aBlockPosition(block, -2, duration, false, true), DELAY)

        return DELAY
    }
    function blackblocks_updateBlocksPositionOutro(block = {}, duration = 0, invert = false)
    {
        blackblocks_destroyObj(block)
        blackblocks_aBlockPosition(block, 2, duration, invert)

        return 0
    }

    function blackblocks_updateShaderProjectionMatrixCamera() { BLACKBLOCKS_SHADER_UNIFORMS.projectionMatrixCamera.value.copy(blackblocks_CAMERA.projectionMatrix) }

    function blackblocks_updateShaderTextureDimensions()
    {
        const [TEXTURE_WIDTHSCALED, TEXTURE_HEIGHTSCALED] = blackblocks_computeScaledDimensions(blackblocks_TEXTURE.image, blackblocks_CAMERA)

        BLACKBLOCKS_SHADER_UNIFORMS.widthScaled.value  = TEXTURE_WIDTHSCALED
        BLACKBLOCKS_SHADER_UNIFORMS.heightScaled.value = TEXTURE_HEIGHTSCALED
    }

    // --DESTROY
    function blackblocks_destroy()
    {
        blackblocks_cancel()
        blackblocks_destroyTimeout()
        blackblocks_destroyTimeout2()
        blackblocks_destroyTimeout3()
        blackblocks_destroyObj(blackblocks_CAMERA)
        blackblocks_destroyEvents()
    }

    function blackblocks_destroyTimeout()  { clearTimeout(blackblocks_TIMEOUT) }
    function blackblocks_destroyTimeout2() { clearTimeout(blackblocks_TIMEOUT_2) }
    function blackblocks_destroyTimeout3() { clearTimeout(blackblocks_TIMEOUT_3) }

    function blackblocks_destroyObj(obj = {})
    {
        if (obj.cancel instanceof Function) obj.cancel()

        clearTimeout(obj.timeout)
    }

    function blackblocks_destroyEvents()
    {
        EVENT.event_remove(BLACKBLOCKS_EVENTS)

        blackblocks_destroyEvents2()
        blackblocks_destroyEvents3()
    }
    function blackblocks_destroyEvents2() { EVENT.event_remove(BLACKBLOCKS_EVENTS_2) }
    function blackblocks_destroyEvents3() { EVENT.event_remove(BLACKBLOCKS_EVENTS_3) }


//=======@COMMANDS|

    // --*
    function blackblocks_c$Optimise(value) { blackblocks_OPTIMISE = value }


//=======@EVENTS|

    // --*
    async function blackblocks_e$MouseMove(clientX, clientY)
    {
        const
        RATIO_X      =  (clientX / APP.app_WIDTH)  * 2 - 1,
        RATIO_Y      = -(clientY / APP.app_HEIGHT) * 2 + 1,
        RAYCASTER    = new Raycaster(),
        INTERSECTION = new Vector3()
    
        RAYCASTER.setFromCamera(new Vector2(RATIO_X, RATIO_Y), blackblocks_CAMERA)
        RAYCASTER.ray.intersectPlane(new Plane(new Vector3(0, 0, 1), 0), INTERSECTION)

        blackblocks_MOUSE_X = INTERSECTION.x
        blackblocks_MOUSE_Y = INTERSECTION.y

        blackblocks_updateScene()
    }

    async function blackblocks_e$MouseDown() { blackblocks_TIMEOUT_3 = setTimeout(() => blackblocks_updateSceneVars(4, 18, .6, .3, .03), 200) }

    async function blackblocks_e$MouseUp()
    {
        blackblocks_destroyTimeout3()

        blackblocks_updateSceneVars(
            BLACKBLOCKS_MOUSE_RADIUS,
            BLACKBLOCKS_MOUSE_INTENSITY,
            BLACKBLOCKS_MOUSE_ANGLE,
            BLACKBLOCKS_FORCE_POSITION,
            BLACKBLOCKS_FORCE_ROTATION
        )
    }

    async function blackblocks_e$Resize()
    {
        const ASPECT = blackblocks_getAspectRatio()
    
        blackblocks_updateCamera(ASPECT)
        blackblocks_setVars2(ASPECT)
        blackblocks_setRenderer()
        blackblocks_setShaderUniforms()
        blackblocks_resetSceneObjects()

        if (!prop_FOCUS) blackblocks_setBlocksPosition()
    }

    async function blackblocks_e$Animation()
    {
        blackblocks_updateBlockFloating()
    
        blackblocks_e$Animation2()
    }

    async function blackblocks_e$Animation2() { blackblocks_RENDERER?.render(blackblocks_SCENE, blackblocks_CAMERA) }


//=======@TRANSITIONS|

    // --*


//=======@ANIMATIONS|

    // --*
    async function blackblocks_aMouseCamera()
    {
        const
        P_X    = blackblocks_CAMERA.position.x,
        P_Y    = blackblocks_CAMERA.position.y,
        STEP_X = blackblocks_MOUSE_X * .015 - P_X,
        STEP_Y = blackblocks_MOUSE_Y * .015 - P_Y

        blackblocks_destroyObj(blackblocks_CAMERA)

        blackblocks_CAMERA.cancel = animation(t =>
        {
            blackblocks_CAMERA.position.x = P_X + STEP_X * t
            blackblocks_CAMERA.position.y = P_Y + STEP_Y * t
        },
        300).cancel
    }

    function blackblocks_aBlockPosition(block, z, duration, invert = false, intro = false)
    {
        const [P0, P1, P2] = block.checkPoints.slice(...(intro ? [0, 3] : [2]))
    
        block.cancel = animation(t =>
        {
            const T = cubicInOut(t)

            let u = T
        
            intro ? u = 1 - T : block.t = t

            block.position.set(blackblocks_getBarycentre(P0.x, P1.x, P2.x, T), blackblocks_getBarycentre(P0.y, P1.y, P2.y, T), z * u)
        },
        duration, block.t ?? 0, invert).cancel
    }

    function blackblocks_aBlocksLayout(a = () => {}, data = [], duration)
    {
        blackblocks_cancel()

        blackblocks_cancel = animation(t => { for (const D of data) a(t, D) }, duration).cancel
    }


//=======@UTILS|

    // --*
    function blackblocks_start()
    {
        const DURATION = blackblocks_intro()
    
        blackblocks_loadPage(DURATION)
        blackblocks_loadBlackBlocks(DURATION)

        blackblocks_HIDE = false
    }
    function blackblocks_intro()
    {
        if (prop_FOCUS) return blackblocks_updateBlocksPosition(false, true)
        else
        {
            blackblocks_setBlocksPosition()

            return 0
        }
    }
    function blackblocks_loadPage(duration) { setTimeout(() => page_CHARGED = true, duration * .46) }
    function blackblocks_loadBlackBlocks(duration)
    {
        blackblocks_TIMEOUT = setTimeout(() =>
        {
            blackblocks_CHARGED = true

            if (!prop_FOCUS && duration) blackblocks_updateBlocksPosition()
        },
        duration)
    }

    function blackblocks_monkeyPatch(shader, _ref)
    {
        let { header = '', main = '', ...replaces } = _ref

        for (const KEY in replaces) shader = shader.split(KEY).join(replaces[KEY])

        return shader.replace('void main() {', `${header} void main() { ${main}`)
    }

    function blackblocks_computeScaledDimensions(image, camera)
    {
        const
        RATIO         = image.naturalWidth / image.naturalHeight,
        CAMERA_RATIO  = camera.aspect,
        CAMERA_HEIGHT = 1 / CAMERA_RATIO

        return RATIO < CAMERA_RATIO
        ? [1 / (CAMERA_HEIGHT * RATIO), 1]
        : [1, 1 / (1 / RATIO / CAMERA_HEIGHT)]
    }

    function blackblocks_resetSceneObjects()
    {
        BLACKBLOCKS_BLOCKS.children = []
        BLACKBLOCKS_LINES.children  = []
        blackblocks_FLOATING_BLOCKS = []

        blackblocks_setSceneObjects()
    }


</script>


<!-- #|-STYLE-| -->

<style
lang="scss"
>

/* #\-USES-\ */

    /* --SASS */

    /* --APP */

    /* --DEPENDENCIES */
    @use '../../../../assets/scss/styles/utils';

    /* --MEDIA */


/* #\-VARIABLES-\ */

    /* --* */


/* #\-THIS-\ */

.blackblocks
{
    @include utils.placement(absolute, 0, 0, 0, 0);

    @extend %any-size;

    overflow: clip;

    &.hide { visibility: hidden; }
}


</style>