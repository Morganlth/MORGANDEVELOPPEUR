<!-- #MAP

-COMMAND
-EVENT
    PARTICLES

-->

<!-- #SCRIPT -->

<script>
// #EXPORT

    // --PROP
    export let prop_TEMP = false

// #IMPORTS

    // --LIB
    import COLORS from '$lib/colors'

    // --CONTEXTS
    import { COMMAND, EVENT } from '../../App.svelte'

    // --SVELTE
    import { onMount, onDestroy } from 'svelte'

// #CONSTANTES

    // --ELEMENT-PARTICLES
    const
    PARTICLES_GAP = 100,
    PARTICLES_PARTICLES = [],
    PARTICLES_COMMANDS =
    [
        {
            name: 'particles',
            callback: particles_c$,
            params: { defaultValue: true, optimise: { value: false } },
            tests: { testBoolean: true },
            storage: true
        },
        {
            name: 'particles_delay',
            callback: particles_c$Delay,
            params: { defaultValue: 100, min: 10, max: 1000 },
            tests: { testNumber: true },
            storage: true
        }
    ],
    PARTICLES_EVENTS =
    {
        resize: particles_e$Resize,
        animation: particles_e$Animation
    }

// #VARIABLES

    // --ELEMENT-PARTICLES
    let
    particles,
    particles_ON = true,
    particles_WIDTH,
    particles_HEIGHT,
    particles_ANGLE_X = 0,
    particles_ANGLE_Y = 0,
    particles_CONTEXT,
    particles_COUNT = 0,
    particles_DELAY = 100,
    particles_MAX = 50

// #FUNCTIONS

    // --SET
    function particles_set()
    {
        particles_setVars()
        particles_setCommands()
        particles_setEvents()

        if (prop_TEMP) particles_restore()
    }

    function particles_setVars()
    {
        particles.width = (particles_WIDTH = window.innerWidth)
        particles.height = (particles_HEIGHT = window.innerHeight)

        particles_ANGLE_X = Math.atan(PARTICLES_GAP / particles_HEIGHT)
        particles_ANGLE_Y = Math.atan(PARTICLES_GAP / particles_WIDTH)

        particles_CONTEXT = particles_CONTEXT ?? particles.getContext('2d')
    }

    function particles_setCommands()
    {
        if (prop_TEMP) return

        COMMAND.command_setBasicCommands(PARTICLES_COMMANDS)
    }

    function particles_setEvents() { EVENT.event_add(PARTICLES_EVENTS) }

    function particles_setParticle()
    {
        PARTICLES_PARTICLES.push(
        {
            x: -PARTICLES_GAP,
            y: -PARTICLES_GAP,
            vel_X: Math.random() + particles_ANGLE_X,
            vel_Y: -Math.random() - particles_ANGLE_Y,
            size: Math.random() * 10 + 10,
            color: COLORS[Math.round(Math.random()) ? 'light' : 'primary']
        })
    }

    // --DESTROY
    function particles_destroy() { particles_destroyEvents() }

    function particles_destroyEvents() { EVENT.event_remove(PARTICLES_EVENTS) }

    // --RESTORE
    function particles_restore()
    {
        for (let { name, callback, params, tests } of PARTICLES_COMMANDS)
        {
            const VALUE = COMMAND.command_testValue(localStorage.getItem(name), params, tests)

            callback(VALUE)
        }
    }

    // --UPDATES
    function particles_update(on)
    {
        if (particles_ON === on) return

        EVENT['event_' + (on ? 'add' : 'remove')]({ animation: PARTICLES_EVENTS.animation })

        if (!on) particles_clear()

        particles_ON = on
    }

    function particles_updateDelay(delay)
    {
        particles_DELAY = delay

        delay < 100
        ? particles_MAX = 3 * (100 - delay)
        : particles_MAX = 50
    }

    // --DRAW
    function particles_draw()
    {
        for (const PARTICLE of PARTICLES_PARTICLES)
        {
            particles_CONTEXT.fillStyle = PARTICLE.color
            particles_CONTEXT.fillRect(PARTICLE.x, PARTICLE.y, PARTICLE.size, PARTICLE.size)
            particles_CONTEXT.fill()

            PARTICLE.x += PARTICLE.vel_X
            PARTICLE.y -= PARTICLE.vel_Y
        }
    }

    // --CLEAR
    function particles_clear() { particles_CONTEXT.clearRect(0, 0, particles_WIDTH, particles_HEIGHT) }

    // --TEST
    function particles_testMax() { if (PARTICLES_PARTICLES.length > particles_MAX) PARTICLES_PARTICLES.shift() }

    // --COMMANDS
    function particles_c$(on) { COMMAND.command_test(on, 'boolean', particles_update, PARTICLES_COMMANDS[0].name, particles_ON) }

    function particles_c$Delay(delay) { COMMAND.command_test(delay, 'number', particles_updateDelay, PARTICLES_COMMANDS[1].name, particles_DELAY) }

    // --EVENTS
    async function particles_e$Resize() { if (particles instanceof HTMLElement) particles_setVars() }

    async function particles_e$Animation()
    {
        particles_clear()
        particles_draw()

        if (++particles_COUNT > particles_DELAY)
        {
            particles_COUNT = 0

            particles_setParticle()
            particles_testMax()
        }
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
/* #USES */

@use '../../assets/scss/styles/position';
@use '../../assets/scss/styles/size';

/* #PARTICLES */

.particles
{
    @include position.placement(absolute, 0, 0, 0, 0);

    @extend %any;

    pointer-events: none;
}
</style>