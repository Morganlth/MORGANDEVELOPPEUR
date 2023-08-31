<!-- #MAP

-EVENT
    HOME
        WRAPPER
            PARTICLES
            SPACECUBE

            CONTENT
                ~~ICON

        CUBES
            GRAVITYAREA * 3
                CUBE

-->

<!-- #SCRIPT -->

<script>
// #EXPORTS

    // --PROPS
    export let
    prop_FOCUS = false,
    prop_BREAK = 0

// #IMPORTS

    // --JS
    import { HOME_CONTENT_DATAS, HOME_CUBES_DATAS } from '../../assets/js/datas/dHome'
    import MATH from '../../assets/js/utils/math'
    import { wait_throttle } from '../../assets/js/utils/wait'

    // --LIB
    import COLORS from '$lib/colors'

    // --CONTEXT
    import { EVENT } from '../../App.svelte'

    // --SVELTE
    import { onMount, onDestroy } from 'svelte'

    // --COMPONENT-COVERS
    import Content from '../covers/Content.svelte'
    import GravityArea from '../covers/GravityArea.svelte'
    import Icon from '../covers/Icon.svelte'

    // --COMPONENT-ELEMENTS
    import Cube from '../elements/Cube.svelte'
    import Mask from '../elements/Mask.svelte'
    import TicTacToe from '../elements/TicTacToe.svelte'

    // --COMPONENT-ICON
    import Logo from '../icons/Logo.svelte'

    // --COMPONENT-DECORS
    import Particles from '../decors/Particles.svelte'
    import SpaceCube from '../decors/SpaceCube.svelte'

// #CONSTANTES

    // --ELEMENT-HOME
    const HOME_EVENTS =
    {
        scroll: home_e$Scroll,
        resize: home_e$Resize
    }

    // --ELEMENT-CUBES
    const
    CUBES_RESIZE = [],
    CUBES_ANIMATION_UPDATE = [],
    CUBES_EVENTS = { animation: wait_throttle(cubes_e$Animation, 100) }

// #VARIABLES

    // --ELEMENT-HOME
    let
    home_END,
    home_SCROLL_RATIO = 0

    // --ELEMENT-SPACECUBE
    let
    spacecube_CHARGED = false,
    spacecube_TICTACTOE = false

// #FUNCTIONS

    // --SET
    function home_set()
    {
        home_setVars()
        home_setEvents()
    }

    function home_setVars() { home_END = window.innerHeight * prop_BREAK }

    function home_setEvents()
    {
        EVENT.event_add(HOME_EVENTS)

        cubes_setEvents()
    }

    function cubes_setEvents() { EVENT.event_add(CUBES_EVENTS) }

    // --DESTROY
    function home_destroy() { home_destroyEvents() }

    function home_destroyEvents()
    {
        EVENT.event_remove(HOME_EVENTS)

        cubes_destroyEvents()
    }

    function cubes_destroyEvents() { EVENT.event_remove(CUBES_EVENTS) }

    // --EVENTS
    async function home_e$Scroll(scrollTop) { home_SCROLL_RATIO = scrollTop / home_END }

    async function home_e$Resize()
    {
        home_setVars()

        for (const RESIZE of CUBES_RESIZE) RESIZE()
    }

    async function cubes_e$Animation() { for (const UPDATE of CUBES_ANIMATION_UPDATE) UPDATE() }

    async function cube_eClick(id)
    {
        if (id === 0) spacecube_TICTACTOE = true
    }

// #CYCLES

onMount(home_set)
onDestroy(home_destroy)
</script>

<!-- #HTML -->

<div
id="home"
style:z-index={prop_FOCUS ? 1 : 0}
>
    <div
    class="wrapper"
    >
        <Particles />

        <SpaceCube
        prop_RATIO={home_SCROLL_RATIO}
        prop_TICTACTOE={spacecube_TICTACTOE}
        bind:spacecube_CHARGED
        />
        
        <Mask
        prop_BLUR={true}
        prop_COORDS={[68, 50]}
        prop_GRADIENT={[0, 80]}
        prop_RATIO={1 - home_SCROLL_RATIO}
        />

        <Content
        prop_CHARGED={spacecube_CHARGED}
        {...HOME_CONTENT_DATAS}
        {prop_FOCUS}
        >
            <Icon
            prop_COLOR={COLORS.light}
            prop_SPRING={false}
            slot="title-element"
            >
                <Logo />
            </Icon>
        </Content>
    </div>

    <div
    class="cubes"
    >
        {#each HOME_CUBES_DATAS as cube, i}
            <GravityArea
            let:rotation
            let:grabbing
            {...cube}
            prop_GRABBING={!home_SCROLL_RATIO}
            prop_ANIMATION_UPDATE={CUBES_ANIMATION_UPDATE}
            bind:gravityarea_e$Resize={CUBES_RESIZE[i]}
            >
                <Cube
                prop_$ROTATION={rotation}
                prop_$GRABBING={grabbing}
                prop_ROTATE={Math.random() * MATH.PI.x2}
                prop_ROTATE_Y={Math.random() * MATH.PI.x2}
                on:click={cube_eClick.bind(null, i)}
                />
            </GravityArea>
        {/each}
    </div>
</div>

<!-- #STYLE -->

<style
lang="scss"
>
/* #USES */

@use '../../assets/scss/styles/elements';
@use '../../assets/scss/styles/position';
@use '../../assets/scss/styles/size';
@use '../../assets/scss/styles/font';
@use '../../assets/scss/styles/media';

/* #HOME */

#home
{
    &, .wrapper { width: 100%; }

    position: relative;

    @extend %any;

    .wrapper
    {
        @extend %wrapper;

        :global{ .icon { #{--icon-size}: calc(var(--title-size) * font.$line-height-title-min) } }
    }

    .cubes
    {
        --content-ratio: .27;

        @include position.placement(absolute, 0, 0, 0, 0);
    
        @extend %any;

        pointer-events: none;

        @include media.min($ms3, $ms2) { --content-ratio: .35; }
        @include media.min($ms4, $ms3) { --content-ratio: .5; }
        @include media.min($ms5, $ms4) { --content-ratio: .75; }
        @include media.min($ms6, $ms4) { --content-ratio: 1; }
    }
}
</style>