<!-- #SCRIPT -->

<script>
// #IMPORTS

    // --LIB
    import { COLORS } from '$lib/app'

    // --CONTEXT
    import { ANIMATION } from '../../App.svelte'

    // --SVELTE
    import { onMount, onDestroy } from 'svelte'

// #CONSTANTE

    // --ELEMENT-PARTICLES
    const PARTICLES_PARTICLES = []

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
        particles.width = window.innerWidth
        particles.height = window.innerHeight

        particles_CONTEXT = particles.getContext('2d')

        ANIMATION.animation_add(particles_draw)
    }

    function particles_setParticles()
    {
        particles_COUNT = 0

        PARTICLES_PARTICLES.push({
            x: 0,
            y: window.innerHeight,
            vel_X: Math.random() * .5 + .2,
            vel_Y: Math.random() * 1,
            size: Math.random() * 15 + 5,
            color: COLORS[Math.round(Math.random()) ? 'light' : 'primary']
        })

        if (PARTICLES_PARTICLES.length > 50) PARTICLES_PARTICLES.shift()
    }

    // --DESTROY
    function particles_destroy() { ANIMATION.animation_remove(particles_draw) }

    // --DRAW
    async function particles_draw()
    {
        particles_clear()
        particles_drawParticles()

        if (++particles_COUNT > 100) particles_setParticles()
    }

    function particles_drawParticles()
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

@use '../../assets/scss/styles/_position';
@use '../../assets/scss/styles/_size';

/* #PARTICLES */

.particles
{
    @include position.placement(absolute, 0, 0, 0, 0);

    @extend %any;

    pointer-events: none;
}
</style>