<!-- #SCRIPT -->

<script>
// #IMPORTS

    // --LIB
    import { COLORS } from '$lib/app'

    // --CONTEXTS
    import { APP, EVENT } from '../../App.svelte'

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
        APP.app_add('particles', particles_command, true)
        APP.app_add('particlesDelay', particles_delay, true)
    }

    function particles_setEvent() { EVENT.event_add(PARTICLES_EVENTS) }

    function particles_setParticle()
    {
        particles_COUNT = 0

        PARTICLES_PARTICLES.push(
        {
            x: 0,
            y: window.innerHeight,
            vel_X: Math.random() * .5 + .2,
            vel_Y: Math.random() * 1,
            size: Math.random() * 10 + 10,
            color: COLORS[Math.round(Math.random()) ? 'light' : 'primary']
        })

        if (PARTICLES_PARTICLES.length > particles_MAX) PARTICLES_PARTICLES.shift()
    }

    // --DESTROY
    function particles_destroy() { EVENT.event_remove(PARTICLES_EVENTS) }

    // --UPDATE
    function particles_update(on)
    {
        if (particles_ON === on) return

        EVENT['event_' + (on ? 'add' : 'remove')]({ animation: particles_animation })

        if (!on) particles_clear()

        particles_ON = on
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

    // --COMMAND
    function particles_command(on)
    {
        on = APP.app_testDefault(on) ? true : APP.app_testBoolean(on)

        particles_update(on)

        localStorage.setItem('particles', on)

        APP.app_success('particles ' + on)
    }

    function particles_delay(delay)
    {
        delay = APP.app_testDefault(delay) ? 100 : APP.app_testNumber(delay, 10, 1000)

        particles_DELAY = delay

        delay < 100
        ? particles_MAX = 3 * (100 - delay)
        : particles_MAX = 50

        localStorage.setItem('particlesDelay', delay)

        APP.app_success('particles delay ' + delay)
    }

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