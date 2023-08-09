<!-- #SCRIPT -->

<script>
// #IMPORTS

    // --JS
    import { wait_throttle } from '../../assets/js/utils/wait'

    // --LIB
    import { COLORS } from '$lib/app'

    // --CONTEXT
    import { EVENT } from '../../App.svelte'

    // --SVELTE
    import { onMount, onDestroy } from 'svelte'

// #CONSTANTES

    // --ELEMENT-PARTICLES
    const
    PARTICLES_PARTICLES = [],
    PARTICLES_EVENTS =
    {
        resize: particles_resize,
        animation: wait_throttle(particles_animation, 5)
    }

// #VARIABLES

    // --ELEMENT-PARTICLES
    let
    particles,
    particles_CONTEXT,
    particles_COUNT = 0

// #FUNCTIONS

    // --SET
    function particles_set()
    {
        particles_setVar()
        particles_setEvent()
    }

    function particles_setVar()
    {
        particles.width = window.innerWidth
        particles.height = window.innerHeight

        particles_CONTEXT = particles_CONTEXT ?? particles.getContext('2d')
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

        if (PARTICLES_PARTICLES.length > 50) PARTICLES_PARTICLES.shift()
    }

    // --DESTROY
    function particles_destroy() { EVENT.event_remove(PARTICLES_EVENTS) }

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

    // --EVENTS
    async function particles_resize() { particles_setVar() }

    async function particles_animation()
    {
        particles_clear()
        particles_draw()

        if (++particles_COUNT > 150) particles_setParticle()
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