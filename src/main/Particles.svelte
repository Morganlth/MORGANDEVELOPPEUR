<!----------------------------------------------- #||--particles--|| -->


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

<canvas
class="particles"
bind:this={particles}
>
</canvas>


<!-- #|-SCRIPT-| -->

<script>

// #\-IMPORTS-\

    // --DATA

    // --SVELTE
    import { onMount, onDestroy } from 'svelte'
    import { cubicOut }           from 'svelte/easing'

    // --LIB
    import MATH                   from '$lib/math'
    import COLORS, { color_rgba } from '$lib/colors'
    import { wait_getDelay }      from '$lib/wait'
    import { animation }          from '$lib/animation'

    // --CONTEXTS
    import { APP, COMMAND, EVENT } from '../App.svelte'

    import { SNAKE_$ON, SNAKE_$BLOCKSIZE, GAMEOVER_$ON } from './pages/page/home/Snake.svelte'

//=======@COMPONENTS|

    // --*
    
//=======@STYLE|

    // --*


// #\-EXPORTS-\

    // --PROPS

    // --BINDING


// #\-CONSTANTES-\

    // --SVELTE

    // --CONTEXTS

    // --OUTSIDE

    // --THIS
    const
    PARTICLES_COLORS           = [COLORS.indicator, COLORS.primary, COLORS.light],
    PARTICLES_BACKGROUND_COLOR = color_rgba(COLORS.dark, .2)
    ,
    PARTICLES_MAX                  = 20,
    PARTICLES_DEFAULT_MOUSE_RADIUS = 100,
    PARTICLES_DEFAULT_DELAY        = 100,
    PARTICLES_DURATION             = wait_getDelay(36) // +- 600ms
    ,
    PARTICLES_MODEL = 
    [
        () => .1,                                                   // t
        () => -PARTICLES_DEFAULT_MOUSE_RADIUS,                      // x
        () => -PARTICLES_DEFAULT_MOUSE_RADIUS,                      // y
        () => Math.random() + particles_ANGLE_X,                    // vel_X
        () => Math.random() + particles_ANGLE_Y,                    // vel_Y
        () => Math.random() * 3 + 3,                                // size_X
        () => Math.random() * 3 + 3,                                // size_Y
        () => Math.random() < .05 ? 0 : MATH.headsOrTails() ? 1 : 2 // color
    ]
    ,
    PARTICLES_COMMANDS =
    [
        {
            name: 'particles',
            callback: particles_c$,
            getCurrentValue: () => particles_ON,
            params: { defaultValue: true, optimise: { value: false } },
            tests: { testBoolean: true },
            desc: 'Activer/Désactiver les particules (p: \'t\' ou \'f\')',
            storage: true
        },
        {
            name: 'particles_delay',
            callback: particles_c$Delay,
            getCurrentValue: () => particles_DELAY,
            params: { defaultValue: PARTICLES_DEFAULT_DELAY, min: 10, max: 1000 },
            tests: { testNumber: true },
            desc: 'Augmenter/Diminuer le nombre de particules (p: [10; 1000])',
            storage: true
        }
    ]
    ,
    PARTICLES_EVENTS    = { resize: particles_e$Resize },
    PARTICLES_EVENTS_2  =
    {
        mouseDown: particles_e$MouseDown,
        mouseUp:   particles_e$MouseUp,
        animation: particles_e$Animation
    }

    // --INSIDE


// #\-VARIABLES-\

    // --CONTEXTS
    let
    event_CLIENT_X = 0,
    event_CLIENT_Y = 0

    // --OUTSIDE

    // --THIS
    let
    particles,
    particles_PARENT
    ,
    particles_ON = true
    ,
    particles_WIDTH,
    particles_HEIGHT
    ,
    particles_ANGLE_X = 0,
    particles_ANGLE_Y = 0
    ,
    particles_CONTEXT
    ,
    particles_PARTICLES
    ,
    particles_I   = 0,
    particles_MAX = PARTICLES_MAX * PARTICLES_MODEL.length
    ,
    particles_MOUSE_RADIUS = PARTICLES_DEFAULT_MOUSE_RADIUS
    ,
    particles_COUNT = 0,
    particles_DELAY = PARTICLES_DEFAULT_DELAY
    ,
    particles_cancel = () => {}

    // --INSIDE


// #\-REATIVES-\

    // --CONTEXTS
    $: snake$_ON        = $SNAKE_$ON
    $: snake$_BLOCKSIZE = $SNAKE_$BLOCKSIZE
    $: gameover$_ON     = $GAMEOVER_$ON

    // --OUTSIDE

    // --THIS

    // --INSIDE


// #\-FUNCTIONS-\

//=======@LIFE|

    // --SVELTE
    onMount(particles_set), onDestroy(particles_destroy)

    // --SET
    function particles_set()
    {
        particles_updateArray()
        particles_setVars()
        particles_setCommands()
        particles_setEvents()

        particles.moveTo = particles_moveTo
    }

    function particles_setVars()
    {
        particles_PARENT ??= particles.parentElement
    
        particles.width  = (particles_WIDTH  = APP.app_WIDTH)
        particles.height = (particles_HEIGHT = APP.app_HEIGHT)

        particles_ANGLE_X = Math.atan(PARTICLES_DEFAULT_MOUSE_RADIUS / particles_HEIGHT)
        particles_ANGLE_Y = Math.atan(PARTICLES_DEFAULT_MOUSE_RADIUS / particles_WIDTH)

        particles_CONTEXT = particles_CONTEXT ?? particles.getContext('2d')
    }

    function particles_setCommands() { COMMAND.command_setCommands(PARTICLES_COMMANDS) }

    function particles_setEvents()
    {
        EVENT.event_add(PARTICLES_EVENTS)

        particles_setEvents2()
    }

    function particles_setEvents2() { EVENT.event_add(PARTICLES_EVENTS_2) }

    function particles_setParticle()
    {
        const LENGTH = PARTICLES_MODEL.length
    
        for (let i = 0; i < LENGTH; i++) { particles_PARTICLES[particles_I + i] = PARTICLES_MODEL[i]() }

        particles_I += LENGTH
    }

    // --GET
    function particles_getDistances(x, y)
    {
        const
        [DISTANCE_X, DISTANCE_Y] = [x - event_CLIENT_X, y - event_CLIENT_Y],
        DISTANCE                 = Math.sqrt(DISTANCE_X ** 2 + DISTANCE_Y ** 2)

        return [DISTANCE, DISTANCE_X, DISTANCE_Y]
    }

    // --UPDATES
    function particles_updateArray(array = new Float32Array())
    {
        const ARRAY = new Float32Array(particles_MAX)

        ARRAY.set(array.subarray(0, particles_MAX))

        if (particles_I > particles_MAX) particles_I = particles_MAX

        particles_PARTICLES = ARRAY
    }

    function particles_updateParticle()
    {
        // i = current position in PARTICLES clone
        // j = current position in particles_PARTICLES
        // remove particles => j is not incremented

        const
        PARTICLES = new Float32Array(particles_PARTICLES),
        LENGTH    = PARTICLES_MODEL.length

        let j = 0
    
        for (let i = 0; i < particles_I; i += LENGTH)
        {
            let [x, y] = [PARTICLES[i + 1], PARTICLES[i + 2]]

            const
            [DISTANCE, DISTANCE_X, DISTANCE_Y] = particles_getDistances(x, y),
            T                                  = PARTICLES[i]

            if (particles_testOutside(x, y)) continue
        
            if (snake$_ON && !gameover$_ON && !PARTICLES[i + 7])
            {
                if (DISTANCE < snake$_BLOCKSIZE) continue
            }
            else if (DISTANCE < particles_MOUSE_RADIUS) [x, y] = particles_updateXY(DISTANCE_X, DISTANCE_Y)

            particles_draw(x, y, PARTICLES[i + 5] * T, PARTICLES[i + 6] * T, PARTICLES_COLORS[PARTICLES[i + 7]])

            particles_PARTICLES[j]     = T + .0015
            particles_PARTICLES[j + 1] = PARTICLES[i + 3] * T + x
            particles_PARTICLES[j + 2] = PARTICLES[i + 4] * T + y
            particles_PARTICLES[j + 3] = PARTICLES[i + 3]
            particles_PARTICLES[j + 4] = PARTICLES[i + 4]
            particles_PARTICLES[j + 5] = PARTICLES[i + 5]
            particles_PARTICLES[j + 6] = PARTICLES[i + 6]
            particles_PARTICLES[j + 7] = PARTICLES[i + 7]

            j += LENGTH
        }

        particles_I = j // new LENGTH
    }

    function particles_updateXY(distance_X, distance_Y)
    {
        const
        ANGLE = Math.atan2(distance_Y, distance_X),
        X     = (event_CLIENT_X + Math.cos(ANGLE) * particles_MOUSE_RADIUS),
        Y     = (event_CLIENT_Y + Math.sin(ANGLE) * particles_MOUSE_RADIUS)

        return [X, Y]
    }

    // --DESTROY
    function particles_destroy()
    {
        particles_cancel()

        particles_destroyEvents()
    }

    function particles_destroyEvents()
    {
        EVENT.event_remove(PARTICLES_EVENTS)

        particles_destroyEvents2()
    }

    function particles_destroyEvents2() { EVENT.event_remove(PARTICLES_EVENTS_2) }


//=======@COMMANDS|

    // --*
    function particles_c$(on)
    {
        if (particles_ON === on) return

        on ? particles_setEvents2() : particles_destroyEvents2()

        if (!on) particles_clear()

        particles_ON = on
    }
    
    function particles_c$Delay(delay)
    {
        particles_DELAY = delay

        particles_MAX = (delay < PARTICLES_DEFAULT_DELAY ? 160 - delay : PARTICLES_MAX) * PARTICLES_MODEL.length

        particles_updateArray(particles_PARTICLES)
    }


//=======@EVENTS|

    // --*
    function particles_e$MouseDown() { particles_a() }
    
    function particles_e$MouseUp()
    {
        particles_cancel()

        particles_MOUSE_RADIUS = PARTICLES_DEFAULT_MOUSE_RADIUS
    }

    async function particles_e$Resize() { if (particles instanceof HTMLElement) particles_setVars() }

    async function particles_e$Animation()
    {
        [event_CLIENT_X, event_CLIENT_Y] = EVENT.event_CLIENT_XY
    
        particles_drawBackground()
        particles_updateParticle()

        if (++particles_COUNT > particles_DELAY)
        {
            particles_COUNT = 0

            if (particles_testMax()) particles_setParticle()
        }
    }


//=======@TRANSITIONS|

    // --*


//=======@ANIMATIONS|

    // --*
    async function particles_a()
    {
        particles_cancel = animation(t =>
        {
            particles_MOUSE_RADIUS = PARTICLES_DEFAULT_MOUSE_RADIUS + 200 * cubicOut(t)
        },
        PARTICLES_DURATION).cancel
    }


//=======@UTILS|

    // --*
    function particles_testMax() { return particles_I < particles_MAX ? true : false }
    
    function particles_testOutside(x, y) { return x > APP.app_WIDTH || y > APP.app_HEIGHT ? true : false }

    function particles_draw(x, y, size_X, size_Y, color)
    {
        particles_CONTEXT.fillStyle = color
        particles_CONTEXT.fillRect(x, y, size_X, size_Y)
        particles_CONTEXT.fill()
    }

    function particles_drawBackground()
    {
        particles_CONTEXT.fillStyle = PARTICLES_BACKGROUND_COLOR
        particles_CONTEXT.fillRect(0, 0, particles_WIDTH, particles_HEIGHT)
    }
    

    function particles_clear() { particles_CONTEXT.clearRect(0, 0, particles_WIDTH, particles_HEIGHT) }

    function particles_moveTo(parent)
    {
        const PARENT = parent instanceof HTMLElement ? parent : particles_PARENT
    
        if (particles && particles.parentElement !== PARENT) PARENT.insertBefore(particles, PARENT.children[0])
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
    @use '../assets/scss/styles/utils';

    /* --MEDIA */


/* #\-VARIABLES-\ */

    /* --* */


/* #\-THIS-\ */

.particles
{
    @extend %sticky;

    pointer-events: none;
    touch-action:   none;
}


</style>