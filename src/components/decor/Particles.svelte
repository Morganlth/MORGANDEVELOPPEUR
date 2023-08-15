<!-- #SCRIPT -->

<script>
// #IMPORTS

    // --LIB
    import { COLORS } from '$lib/colors'

    // --CONTEXTS
    import { COMMAND, EVENT } from '../../App.svelte'

    // --SVELTE
    import { onMount, onDestroy } from 'svelte'

// #CONSTANTES

    // --ELEMENT-PARTICLES
    const
    PARTICLES_PARTICLES = [],
    PARTICLES_EVENTS =
    {
        resize: particles_resize,
        animation: particles_animation
    }

// #VARIABLES

    // --ELEMENT-PARTICLES
    let
    particles,
    particles_ON = true,
    particles_CONTEXT,
    particles_COUNT = 0,
    particles_DELAY = 100,
    particles_MAX = 50

// #FUNCTIONS

    // --SET
    function particles_set()
    {
        particles_setVar()
        particles_setCommand()
        particles_setEvent()
    }

    function particles_setVar()
    {
        particles.width = window.innerWidth
        particles.height = window.innerHeight

        particles_CONTEXT = particles_CONTEXT ?? particles.getContext('2d')
    }

    function particles_setCommand()
    {
        COMMAND.command_setBasicCommand(
            'particles',
            particles_command,
            { defaultValue: true, optimise: true },
            { testBoolean: true },
            true
        )
    
        COMMAND.command_setBasicCommand(
            'particles_delay',
            particles_commandDelay,
            { defaultValue: 100, min: 10, max: 1000 },
            { testNumber: true },
            true
        )
    }

    function particles_setEvent() { EVENT.event_add(PARTICLES_EVENTS) }

    function particles_setParticle()
    {
        particles_COUNT = 0

        PARTICLES_PARTICLES.push(
        {
            x: 0,
            y: 0,
            vel_X: Math.random(),
            vel_Y: -Math.random(),
            size: Math.random() * 10 + 10,
            color: COLORS[Math.round(Math.random()) ? 'light' : 'primary']
        })

        if (PARTICLES_PARTICLES.length > particles_MAX) PARTICLES_PARTICLES.shift()
    }

    // --DESTROY
    function particles_destroy() { EVENT.event_remove(PARTICLES_EVENTS) }

    // --UPDATES
    function particles_update(on)
    {
        if (particles_ON === on) return

        EVENT['event_' + (on ? 'add' : 'remove')]({ animation: particles_animation })

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
    function particles_clear() { particles_CONTEXT.clearRect(0, 0, window.innerWidth, window.innerHeight) }

    // --COMMANDS
    function particles_command(on) { COMMAND.command_test(on, 'boolean', particles_update, 'particles', particles_ON) }

    function particles_commandDelay(delay) { COMMAND.command_test(delay, 'number', particles_updateDelay, 'particles_delay', particles_DELAY) }

    // --EVENTS
    async function particles_resize() { particles_setVar() }

    async function particles_animation()
    {
        particles_clear()
        particles_draw()

        if (++particles_COUNT > particles_DELAY) particles_setParticle()
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