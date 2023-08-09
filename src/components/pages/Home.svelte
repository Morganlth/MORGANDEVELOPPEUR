<!-- #SCRIPT -->

<script>
// #IMPORTS

    // --JS
    import HOME_CUBES from '../../assets/js/datas/home_cubes'
    import MATH from '../../assets/js/utils/math'
    import { wait_throttle } from '../../assets/js/utils/wait'

    // --LIB
    import { COLORS } from '$lib/app'

    // --CONTEXT
    import { EVENT } from '../../App.svelte'

    // --SVELTE
    import { onMount, onDestroy } from 'svelte'

    // --COMPONENT-ELEMENT
    import Particles from '../decor/Particles.svelte'
    import SpaceCube from '../decor/SpaceCube.svelte'
    import Cube from '../elements/Cube.svelte'

    // --COMPONENT-COVER
    import Icon from '../covers/Icon.svelte'

    // --COMPONENT-ICON
    import Logo from '../icons/Logo.svelte'

// #CONSTANTES

    // --ELEMENT-CUBES-WRAPPER
    const
    CUBESWRAPPER_RESIZE = [],
    CUBESWRAPPER_ANIMATION = []

// #VARIABLE

    // --ELEMENT-CUBES-WRAPPER
    let cubeswrapper_EVENTS

// #FUNCTIONS

    // --SET
    function home_set()
    {
        cubeswrapper_setVar()
        cubeswrapper_setEvent()
    }

    function cubeswrapper_setVar() { cubeswrapper_EVENTS = { resize: cubeswrapper_resize, animation: cubeswrapper_animation } }

    function cubeswrapper_setEvent() { EVENT.event_add(cubeswrapper_EVENTS) }

    // --DESTROY
    function home_destroy() { EVENT.event_remove(cubeswrapper_EVENTS) }

    // --EVENTS
    async function cubeswrapper_resize() { for (const CUBE_RESIZE of CUBESWRAPPER_RESIZE) CUBE_RESIZE() }

    const cubeswrapper_animation = wait_throttle(() => { for (const CUBE_ANIMATION of CUBESWRAPPER_ANIMATION) CUBE_ANIMATION() }, 100)

// #CYCLES

onMount(home_set)
onDestroy(home_destroy)
</script>

<!-- #HTML -->

<section
id="home"
>
    <Particles />
    <SpaceCube />

    <span
    class="lang"
    >
        FR
    </span>

    <h1>
        <strong>DEVELOPPEUR</strong>

        <span>WEB</span>

        <Icon
        prop_COLOR={COLORS.light}
        prop_SPRING={false}
        >
            <Logo />
        </Icon>
    </h1>

    <div
    class="cubes-wrapper"
    >
        {#each HOME_CUBES as cube, i}
            <Cube
            {...cube}
            prop_CUBES_ANIMATION={CUBESWRAPPER_ANIMATION}
            prop_ROTATE={Math.random() * MATH.PI.x2}
            prop_ROTATEY={Math.random() * MATH.PI.x2}
            bind:cube_resize={CUBESWRAPPER_RESIZE[i]}
            />
        {/each}
    </div>
</section>

<!-- #STYLE -->

<style
lang="scss"
>
/* #USES */

@use 'sass:map';

@use '../../assets/scss/app';

@use '../../assets/scss/styles/position';
@use '../../assets/scss/styles/display';
@use '../../assets/scss/styles/size';
@use '../../assets/scss/styles/font';
@use '../../assets/scss/styles/media';

/* #HOME */

#home
{
    @extend %any;

    position: relative;

    overflow: hidden;

    padding: calc(app.$gap-inline * 3.3) 0 0 app.$gap-inline;

    box-sizing: border-box;

    .lang, h1 { position: relative; }

    .lang { @include font.interact($light, map.get(font.$font-sizes, s2), 1, map.get(font.$content-font-weight, w1)); }

    h1
    {
        #{--title-size}: map.get(font.$font-sizes, s6); 
        --icon-size: calc(var(--title-size) * .71);

        @include font.h-(1);

        z-index: 1;

        width: fit-content;
        height: fit-content;

        margin-top: 3rem;

        user-select: none;
        pointer-events: none;

        strong, span { display: block; }
        span { padding-bottom: 1rem; }

        @include media.min($ms2) { #{--title-size}: map.get(font.$font-sizes, s7); }
        @include media.min($ms3, $ms3)
        {
            #{--title-size}: map.get(font.$font-sizes, s8);

            strong, span
            {
                &::before
                {
                    @include position.placement(absolute, -.7rem, auto, auto, 0, true);

                    width: 2.4rem;
                    height: 2.4rem;

                    background-color: $primary;
                }

                position: relative;
    
                padding-left: app.$gap-inline;
            }
            strong { margin-left: app.$gap-inline; }
        }
    }

    .cubes-wrapper
    {
        --cube-ratio: .25;

        @include position.placement(absolute, 0, 0, 0, 0);

        @extend %any;

        pointer-events: none;

        @include media.min($ms3, $ms2) { --cube-ratio: .35; }
        @include media.min($ms4, $ms3) { --cube-ratio: .5; }
        @include media.min($ms5, $ms4) { --cube-ratio: .75; }
        @include media.min($ms6, $ms4) { --cube-ratio: 1; }
    }

    @include media.min($ms3) { padding-top: calc(app.$gap-inline * 2); }
}
</style>