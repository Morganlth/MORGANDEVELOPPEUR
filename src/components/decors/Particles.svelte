<!-- #MAP

-APP
-COMMAND
-EVENT
-SNAKE
    PARTICLES

-->

<!-- #SCRIPT -->

<script>
// #IMPORTS

    // --JS
    import MATH from '../../assets/js/utils/math'
    import { animation } from '../../assets/js/utils/animation'
    import { color_rgba } from '../../assets/js/utils/color'

    // --LIB
    import COLORS from '$lib/colors'

    // --CONTEXTS
    import { APP, COMMAND, EVENT } from '../../App.svelte'
    import { SNAKE_$ON, SNAKE_$BLOCKSIZE, GAMEOVER_$ON } from '../elements/Snake.svelte'

    // --SVELTE
    import { onMount, onDestroy } from 'svelte'
    import { cubicOut } from 'svelte/easing'

// #CONSTANTES

    // --ELEMENT-PARTICLES
    const
    PARTICLES = 'particles',
    PARTICLES_DELAY_NAME = 'particles_delay',

    PARTICLES_COLORS = [COLORS.indicator, COLORS.primary, COLORS.light],
    PARTICLES_BACKGROUND_COLOR = color_rgba(COLORS.dark, .2),

    PARTICLES_MAX = 20,
    PARTICLES_GAP = 100,
    PARTICLES_D_MOUSE_RADIUS = 100,

    PARTICLES_MODEL = 
    [
        () => .1,                                                   // t
        () => -PARTICLES_GAP,                                       // x
        () => -PARTICLES_GAP,                                        // y
        () => Math.random() + particles_ANGLE_X,                    // vel_X
        () => Math.random() + particles_ANGLE_Y,                    // vel_Y
        () => Math.random() * 3 + 5,                                // size_X
        () => Math.random() * 3 + 5,                                // size_Y
        () => Math.random() < .05 ? 0 : MATH.headsOrTails() ? 1 : 2  // color
    ],

    PARTICLES_COMMANDS =
    [
        {
            name: PARTICLES,
            callback: particles_c$,
            params: { defaultValue: true, optimise: { value: false } },
            tests: { testBoolean: true },
            desc: 'Activer/Désactiver les particules (p: \'t\' ou \'f\')',
            storage: true
        },
        {
            name: PARTICLES_DELAY_NAME,
            callback: particles_c$Delay,
            params: { defaultValue: 100, min: 10, max: 1000 },
            tests: { testNumber: true },
            desc: 'Augmenter/Diminuer le nombre de particules (p: [10; 1000])',
            storage: true
        }
    ],

    PARTICLES_EVENTS = { resize: particles_e$Resize },
    PARTICLES_EVENTS_2 =
    {
        mouseDown: particles_e$MouseDown,
        mouseUp: particles_e$MouseUp,
        animation: particles_e$Animation
    }

// #VARIABLES

    // --EVENT
    let
    event_CLIENT_X = 0,
    event_CLIENT_Y = 0

    // --ELEMENT-PARTICLES
    let
    particles,
    particles_PARENT,

    particles_ON = true,

    particles_WIDTH,
    particles_HEIGHT,

    particles_ANGLE_X = 0,
    particles_ANGLE_Y = 0,

    particles_CONTEXT,

    particles_PARTICLES,

    particles_I = 0,
    particles_MAX = PARTICLES_MAX * PARTICLES_MODEL.length,

    particles_MOUSE_RADIUS = PARTICLES_D_MOUSE_RADIUS,

    particles_COUNT = 0,
    particles_DELAY = 100,

    particles_cancel = () => {}

// #REACTIVES

    // --ELEMENT-SNAKE
    $: snake$_ON = $SNAKE_$ON
    $: snake$_BLOCKSIZE = $SNAKE_$BLOCKSIZE
    
    // --ELEMENT-GAMEOVER
    $: gameover$_ON = $GAMEOVER_$ON

// #FUNCTIONS

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
    
        particles.width = (particles_WIDTH = APP.app_WIDTH)
        particles.height = (particles_HEIGHT = APP.app_HEIGHT)

        particles_ANGLE_X = Math.atan(PARTICLES_GAP / particles_HEIGHT)
        particles_ANGLE_Y = Math.atan(PARTICLES_GAP / particles_WIDTH)

        particles_CONTEXT = particles_CONTEXT ?? particles.getContext('2d')
    }

    function particles_setCommands() { COMMAND.command_setBasicCommands(PARTICLES_COMMANDS) }

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

    // --GET
    function particles_getDistances(x, y)
    {
        const
        [DISTANCE_X, DISTANCE_Y] = [x - event_CLIENT_X, y - event_CLIENT_Y],
        DISTANCE = Math.sqrt(DISTANCE_X ** 2 + DISTANCE_Y ** 2)

        return [DISTANCE, DISTANCE_X, DISTANCE_Y]
    }

    // --UPDATES
    function particles_update(on)
    {
        if (particles_ON === on) return

        on ? particles_setEvents2() : particles_destroyEvents2()

        if (!on) particles_clear()

        particles_ON = on
    }

    function particles_updateDelay(delay)
    {
        particles_DELAY = delay

        particles_MAX = (delay < 100 ? 160 - delay : PARTICLES_MAX) * PARTICLES_MODEL.length

        particles_updateArray(particles_PARTICLES)
    }

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
        LENGTH = PARTICLES_MODEL.length

        let j = 0
    
        for (let i = 0; i < particles_I; i += LENGTH)
        {
            let [x, y] = [PARTICLES[i + 1], PARTICLES[i + 2]]

            const
            [DISTANCE, DISTANCE_X, DISTANCE_Y] = particles_getDistances(x, y),
            T = PARTICLES[i]

            if (particles_testOutside(x, y)) continue
        
            if (snake$_ON && !gameover$_ON && !PARTICLES[i + 7])
            {
                if (DISTANCE < snake$_BLOCKSIZE) continue
            }
            else if (DISTANCE < particles_MOUSE_RADIUS) [x, y] = particles_updateXY(DISTANCE_X, DISTANCE_Y)

            particles_draw(x, y, PARTICLES[i + 5] * T, PARTICLES[i + 6] * T, PARTICLES_COLORS[PARTICLES[i + 7]])

            particles_PARTICLES[j] = T + .0015
            particles_PARTICLES[j + 1] = x + PARTICLES[i + 3] * T
            particles_PARTICLES[j + 2] = y + PARTICLES[i + 4] * T
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
        X = (event_CLIENT_X + Math.cos(ANGLE) * particles_MOUSE_RADIUS),
        Y = (event_CLIENT_Y + Math.sin(ANGLE) * particles_MOUSE_RADIUS)

        return [X, Y]
    }

    // --DRAW
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

    // --CLEAR
    function particles_clear() { particles_CONTEXT.clearRect(0, 0, particles_WIDTH, particles_HEIGHT) }

    // --TESTS
    function particles_testMax() { return particles_I < particles_MAX ? true : false }

    function particles_testOutside(x, y) { return x > APP.app_WIDTH || y > APP.app_HEIGHT ? true : false }

    // --COMMANDS
    function particles_c$(on) { COMMAND.command_test(on, 'boolean', particles_update, PARTICLES, particles_ON) }

    function particles_c$Delay(delay) { COMMAND.command_test(delay, 'number', particles_updateDelay, PARTICLES_DELAY_NAME, particles_DELAY) }

    // --EVENTS
    function particles_e$MouseDown() { particles_a() }

    function particles_e$MouseUp()
    {
        particles_cancel()

        particles_MOUSE_RADIUS = PARTICLES_D_MOUSE_RADIUS
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

    // --ANIMATION
    async function particles_a() { particles_cancel = animation((t) => particles_MOUSE_RADIUS = PARTICLES_D_MOUSE_RADIUS + 200 * cubicOut(t), 600).cancel }

    // --UTIL
    function particles_moveTo(parent)
    {
        const PARENT = parent instanceof HTMLElement ? parent : particles_PARENT
    
        if (particles && particles.parentElement !== PARENT) PARENT.insertBefore(particles, PARENT.children[0])
    }

// #CYCLES

onMount(particles_set)
onDestroy(particles_destroy)
</script>

<!-- #HTML -->

<canvas
class="particles"
bind:this={particles}
>
</canvas>

<!-- #STYLE -->

<style
lang="scss"
>
/* #USE */

@use '../../assets/scss/styles/position';

/* #PARTICLES */

.particles
{
    @include position.placement(sticky, $top: 0, $right: 0, $left: 0);

    width: 100%;
    height: 100vh;
}
</style>