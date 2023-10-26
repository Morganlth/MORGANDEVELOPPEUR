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

    PARTICLES_GAP = 100,
    PARTICLES_D_MOUSE_RADIUS = 100,

    PARTICLES_BACKGROUND_COLOR = color_rgba(COLORS.dark, .2),

    PARTICLES_PARTICLES = [],

    PARTICLES_COMMANDS =
    [
        {
            name: PARTICLES,
            callback: particles_c$,
            params: { defaultValue: true, optimise: { value: false } },
            tests: { testBoolean: true },
            storage: true
        },
        {
            name: PARTICLES_DELAY_NAME,
            callback: particles_c$Delay,
            params: { defaultValue: 100, min: 10, max: 1000 },
            tests: { testNumber: true },
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

    particles_COUNT = 0,
    particles_DELAY = 100,
    particles_MAX = 50,

    particles_MOUSE_RADIUS = PARTICLES_D_MOUSE_RADIUS,

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
        const [COLOR, EDIBLE] = particles_getColor()
    
        PARTICLES_PARTICLES.push(
        {
            t: .1,
            x: -PARTICLES_GAP,
            y: -PARTICLES_GAP,
            vel_X: Math.random() + particles_ANGLE_X,
            vel_Y: -Math.random() - particles_ANGLE_Y,
            size_X: Math.random() * 3 + 5,
            size_Y: Math.random() * 3 + 5,
            color: COLOR,
            edible: EDIBLE
        })
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
    function particles_getColor()
    {
        const [COLOR, EDIBLE] = Math.random() < .1 ? [COLORS.indicator, true] : [COLORS[MATH.headsOrTails() ? 'primary' : 'light'], false]
    
        return [color_rgba(COLOR, Math.random() * .3 + .3), EDIBLE]
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

        delay < 100
        ? particles_MAX = 230 - delay
        : particles_MAX = 30
    }

    function particles_updateXY(particle)
    {
        const
        [CLIENT_X, CLIENT_Y] = EVENT.event_CLIENT_XY,
        [DISTANCE_X, DISTANCE_Y] = [particle.x - CLIENT_X, particle.y - CLIENT_Y],
        DISTANCE = Math.sqrt(DISTANCE_X ** 2 + DISTANCE_Y ** 2)

        if (snake$_ON && !gameover$_ON && particle.edible)
        {
            if (DISTANCE < snake$_BLOCKSIZE) PARTICLES_PARTICLES.splice(PARTICLES_PARTICLES.indexOf(particle), 1)
        }
        else if (DISTANCE < particles_MOUSE_RADIUS)
        {
            const ANGLE = Math.atan2(DISTANCE_Y, DISTANCE_X)

            particle.x = CLIENT_X + Math.cos(ANGLE) * particles_MOUSE_RADIUS
            particle.y = CLIENT_Y + Math.sin(ANGLE) * particles_MOUSE_RADIUS
        }
    }

    // --DRAW
    function particles_draw()
    {
        const PARTICLES = [...PARTICLES_PARTICLES]
    
        for (const PARTICLE of PARTICLES)
        {
            const [T, SIZE_X, SIZE_Y] = [PARTICLE.t, PARTICLE.size_X, PARTICLE.size_Y]

            particles_updateXY(PARTICLE)
    
            particles_CONTEXT.fillStyle = PARTICLE.color
            particles_CONTEXT.fillRect(PARTICLE.x, PARTICLE.y, SIZE_X * T, SIZE_Y * T)
            particles_CONTEXT.fill()

            PARTICLE.t += .0015
            PARTICLE.x += PARTICLE.vel_X * PARTICLE.t
            PARTICLE.y -= PARTICLE.vel_Y * PARTICLE.t
        }
    }

    function particles_drawBackground()
    {
        particles_CONTEXT.fillStyle = PARTICLES_BACKGROUND_COLOR
        particles_CONTEXT.fillRect(0, 0, particles_WIDTH, particles_HEIGHT)
    }

    // --CLEAR
    function particles_clear() { particles_CONTEXT.clearRect(0, 0, particles_WIDTH, particles_HEIGHT) }

    // --TEST
    function particles_testMax() { if (PARTICLES_PARTICLES.length > particles_MAX) PARTICLES_PARTICLES.shift() }

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
        particles_drawBackground()
        particles_draw()

        if (++particles_COUNT > particles_DELAY)
        {
            particles_COUNT = 0

            particles_setParticle()
            particles_testMax()
        }
    }

    // --ANIMATION
    async function particles_a() { particles_cancel = animation((t) => particles_MOUSE_RADIUS = PARTICLES_D_MOUSE_RADIUS + 200 * cubicOut(t), 600).cancel }

    // --UTIL
    function particles_moveTo(parent)
    {
        const PARENT = parent instanceof HTMLElement ? parent : particles_PARENT
    
        PARENT.insertBefore(particles, PARENT.children[0])
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

    pointer-events: none;
}
</style>