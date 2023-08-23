<!-- #MAP

-ROUTER
-EVENT
    HOME
        WRAPPER
            PARTICLES
            SPACECUBE

            CONTENT
                LANG
                TITLE
                    TEXT * 2
                    LOGO

        CUBES
            GRAVITYAREA * 3
                CUBE

-->

<!-- #SCRIPT -->

<script>
// #EXPORT

    // --PROP
    export let prop_FOCUS = false

// #IMPORTS

    // --JS
    import HOME_CUBES from '../../assets/js/datas/home_cubes'
    import MATH from '../../assets/js/utils/math'
    import { wait_throttle } from '../../assets/js/utils/wait'

    // --LIB
    import COLORS from '$lib/colors'

    // --CONTEXT
    import { ROUTER, EVENT } from '../../App.svelte'

    // --SVELTE
    import { onMount, onDestroy } from 'svelte'

    // --COMPONENT-ELEMENT
    import Cube from '../elements/Cube.svelte'
    import TicTacToe from '../elements/TicTacToe.svelte'

    // --COMPONENT-COVERS
    import GravityArea from '../covers/GravityArea.svelte'
    import Icon from '../covers/Icon.svelte'

    // --COMPONENT-ICON
    import Logo from '../icons/Logo.svelte'

    // --COMPONENT-DECORS
    import Particles from '../decors/Particles.svelte'
    import SpaceCube from '../decors/SpaceCube.svelte'

// #CONSTANTES

    // --ELEMENT-HOME
    const HOME_EVENTS = { resize: home_e$Resize }

    // --ELEMENT-WRAPPER
    const WRAPPER_EVENTS = { scroll: wrapper_e$Scroll }

    // --ELEMENT-TITLE
    const TITLE_CHILDREN = []

    // --ELEMENT-CUBES
    const
    CUBES_RESIZE = [],
    CUBES_ANIMATION_UPDATE = [],
    CUBES_EVENTS = { animation: wait_throttle(cubes_e$Animation, 100) }

// #VARIABLES

    // --ELEMENT-WRAPPER
    let
    wrapper,
    wrapper_HEIGHT,
    wrapper_AVAILABLE_HEIGHT,
    wrapper_SCROLL_RATIO = 0

    // --ELEMENT-SPACECUBE
    let
    spacecube_CHARGED = false,
    spacecube_TICTACTOE = false

    // --ELEMENT-CONTENT
    let
    content_OPACITY = 0,
    content_TRANSITION_DELAY = 0

// #REACTIVES

    // --ELEMENT-HOME
    $: content_update(prop_FOCUS)

    // --ELEMENT-SPACECUBE
    $: spacecube_CHARGED ? home_intro() : void 0

// #FUNCTIONS

    // --SET
    function home_set()
    {
        home_setPage()
        home_setEvents()

        wrapper_setVars()
        wrapper_setEvents()
    
        cubes_setEvents()
    }

    function home_setPage() { ROUTER.router_add(0, 'home', 0) }

    function home_setEvents() { EVENT.event_add(HOME_EVENTS) }

    function wrapper_setVars()
    {
        wrapper_HEIGHT = wrapper.offsetHeight,
        wrapper_AVAILABLE_HEIGHT = wrapper.parentNode.offsetHeight - wrapper_HEIGHT
    }
    function wrapper_setEvents() { EVENT.event_add(WRAPPER_EVENTS) }

    function cubes_setEvents() { EVENT.event_add(CUBES_EVENTS) }

    // --DESTROY
    function home_destroy()
    {
        home_destroyEvents()

        wrapper_destroyEvents()

        cubes_destroyEvents()
    }

    function home_destroyEvents() { EVENT.event_remove(HOME_EVENTS) }

    function wrapper_destroyEvents() { EVENT.event_remove(WRAPPER_EVENTS) }

    function cubes_destroyEvents() { EVENT.event_remove(CUBES_EVENTS) }

    // --GET
    function title_getTranslate3d()
    {
        const
        GET = () => Math.random() * 4000 - 2000,
        [X, Y, Z] = [GET(), GET(), GET()]

        return `translate3d(${X}px, ${Y}px, ${Z}px)`
    }

    // --INTROS
    async function home_intro()
    {
        content_TRANSITION_DELAY = '1.2s'

        if (wrapper_SCROLL_RATIO < 1) content_intro()
    }

    async function content_intro()
    {
        content_OPACITY = 1

        for (const CHILD of TITLE_CHILDREN) CHILD.style.transform = 'translate3d(0, 0, 0)'
    }

    // --OUTRO
    async function content_outro()
    {
        content_OPACITY = 0

        for (const CHILD of TITLE_CHILDREN) CHILD.style.transform = title_getTranslate3d()
    }

    // --UPDATE
    function content_update(focus)
    {
        if (spacecube_CHARGED)
        {
            focus
            ?   content_intro()
            :   content_outro()
        }
    }

    // --EVENTS
    async function home_e$Resize()
    {
        wrapper_setVars()

        for (const RESIZE of CUBES_RESIZE) RESIZE()
    }

    async function wrapper_e$Scroll() { wrapper_SCROLL_RATIO = wrapper.offsetTop / wrapper_AVAILABLE_HEIGHT }

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
    bind:this={wrapper}
    >
        <Particles />

        <SpaceCube
        prop_RATIO={wrapper_SCROLL_RATIO}
        prop_TICTACTOE={spacecube_TICTACTOE}
        bind:spacecube_CHARGED
        />

        <section
        class="content"
        style:opacity={content_OPACITY}
        style:transition="opacity {content_TRANSITION_DELAY} ease-in"
        >
            <div
            class="lang"
            >
            {'{FR}'}
            </div>
    
            <h1
            class="title"
            >
                {#each ['DEVELOPPEUR', 'WEB'] as string}
                    <div
                    class="text"
                    >
                        {#each string as char}
                            <span
                            style:transform={title_getTranslate3d()}
                            style:transition="transform {content_TRANSITION_DELAY} ease-out"
                            bind:this={TITLE_CHILDREN[TITLE_CHILDREN.length]}
                            >{char}</span>
                        {/each}
                    </div>
                {/each}

                <div
                class="logo"
                style:transform={title_getTranslate3d()}
                style:transition="transform {content_TRANSITION_DELAY} ease-out"
                bind:this={TITLE_CHILDREN[TITLE_CHILDREN.length]}
                >
                    <Icon
                    prop_COLOR={COLORS.light}
                    prop_SPRING={false}
                    >
                        <Logo />
                    </Icon>
                </div>
            </h1>
        </section>
    </div>

    <div
    class="cubes"
    >
        {#each HOME_CUBES as cube, i}
            <GravityArea
            let:rotation
            let:grabbing
            {...cube}
            prop_GRABBING={!wrapper_SCROLL_RATIO}
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

@use 'sass:map';

@use '../../assets/scss/app';

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

    height: 300vh;

    .wrapper { @extend %wrapper; }

    .content
    {
        position: relative;

        z-index: 1;

        pointer-events: none;

        .lang, .title { user-select: none; }

        .lang { @include font.interact($light, map.get(font.$font-sizes, s2), 1, map.get(font.$content-font-weight, w1)); }

        .title
        {
            --icon-size: calc(var(--title-size) * .71);

            @include font.h-(1);

            @extend %m-h-1;

            perspective: 400px;

            width: fit-content;
            height: fit-content;

            margin-block: 1rem 3rem;

            &>div { transform-style: preserve-3d; }
            .text span { display: inline-block; }
            .logo { margin-top: .9rem; }

            @include media.min($ms3, $ms3)
            {
                margin-top: 3rem;

                .text
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
                .text:nth-child(1) { margin-left: app.$gap-inline; }
            }
        }
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