<!-- #MAP

    HOME
        WRAPPER
            SCENE
                PARTICLES
                SPACECUBE
                CUBES
                    GRAVITYAREA * 3
                        CUBE
            CONTENT
                LANG
                TITLE

                UNDERTITLE
                    PAGELINK
                    TICTACTOE
-->

<!-- #SCRIPT -->

<script>
// #IMPORTS

    // --JS
    import HOME_PAGE_LINKS from '../../assets/js/datas/home_page_links'
    import HOME_CUBES from '../../assets/js/datas/home_cubes'
    import MATH from '../../assets/js/utils/math'
    import { wait_throttle } from '../../assets/js/utils/wait'
    import { animation } from '../../assets/js/utils/animation'

    // --LIB
    import COLORS from '$lib/colors'

    // --CONTEXT
    import { EVENT } from '../../App.svelte'

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

    // --ELEMENT-CUBES
    const
    CUBES_RESIZE = [],
    CUBES_ANIMATION_UPDATE = [],
    CUBES_EVENTS = { animation: wait_throttle(cubes_e$Animation, 100) }

    // --ELEMENT-TITLE
    const TITLE_CHILDREN = []

// #VARIABLES

    // --ELEMENT-WRAPPER
    let
    wrapper,
    wrapper_HEIGHT,
    wrapper_AVAILABLE_HEIGHT,
    wrapper_SCROLL_RATIO

    // --ELEMENT-SPACECUBE
    let spacecube_TICTACTOE = false

    // --ELEMENT-TITLE
    let
    title,
    title_OPACITY = 0

// #FUNCTIONS

    // --SET
    function home_set()
    {
        home_setEvents()

        wrapper_setVars()
        wrapper_setEvents()
    
        cubes_setEvents()

        title_setVars()
        title_animationStart()
    }

    function home_setEvents() { EVENT.event_add(HOME_EVENTS) }

    function wrapper_setVars()
    {
        wrapper_HEIGHT = wrapper.offsetHeight,
        wrapper_AVAILABLE_HEIGHT = wrapper.parentNode.offsetHeight - wrapper_HEIGHT
    }
    function wrapper_setEvents() { EVENT.event_add(WRAPPER_EVENTS) }

    function cubes_setEvents() { EVENT.event_add(CUBES_EVENTS) }

    function title_setVars() { title_OPACITY = 1 }

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

    async function pagelinks_eClick()
    {
        const LINK = HOME_PAGE_LINKS[this]

        if (LINK.on) return

        try { HOME_PAGE_LINKS.find(link => link.on).on = false } catch { /* recuperer le chemin dans l'url pour définir le lien sélectionné */ }

        HOME_PAGE_LINKS[this] = { ...LINK, on: true }
    }

    // --ANIMATION
    async function title_animationStart()
    {
        const WIDTH = window.innerWidth

        for (const CHILD of TITLE_CHILDREN)
        {
            const TRANSLATE_X = WIDTH - (CHILD.offsetLeft - CHILD.offsetWidth)


    
            await animation((t) =>
            {
                // CHILD.style.transform = `translateX(${TRANSLATE_X * (1 - t)}px)`
            }, 1000)
        }
    }

// #CYCLES

onMount(home_set)
onDestroy(home_destroy)
</script>

<!-- #HTML -->

<div
id="home"
>
    <div
    class="wrapper"
    bind:this={wrapper}
    >
        <div
        class="scene"
        >
            <Particles />

            <SpaceCube
            prop_RATIO={wrapper_SCROLL_RATIO}
            prop_TICTACTOE={spacecube_TICTACTOE}
            />

            <div
            class="cubes"
            >
                {#each HOME_CUBES as cube, i}
                    <GravityArea
                    let:rotation
                    let:grabbing
                    {...cube}
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

        <div
        class="content"
        >
            <section>
                <span
                class="lang"
                >
                    FR
                </span>
        
                <h1
                class="title"
                style:opacity={title_OPACITY}
                bind:this={title}
                >
                    <div>
                        <div>
                            <span>DEVELOPPEUR</span>
                        </div>
                        
                        <div>
                            <span>DEVELOPPEUR</span>
                        </div>
                    </div>
            
                    <div>
                        <div>
                            <span>WEB</span>
                        </div>
                        
                        <div>
                            <span>WEB</span>
                        </div>
                    </div>

                    <Icon
                    prop_COLOR={COLORS.light}
                    prop_SPRING={false}
                    >
                        <Logo />
                    </Icon>
                </h1>
            </section>
        
            <nav
            class="pagelinks"
            >
                <ul>
                    <!-- svelte-ignore a11y-no-static-element-interactions a11y-missing-attribute -->
                    {#each HOME_PAGE_LINKS as link, id}
                        <li>
                            <a
                            class:selected={link.on}
                            aria-label={link.label}
                            {...link.attributes}
                            on:click|preventDefault={pagelinks_eClick.bind(id)}
                            >
                                {link.content}
                            </a>
                        </li>
                    {/each}
                </ul>
            </nav>
        </div>
    </div>
</div>

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
    &, .wrapper { width: 100%; }

    position: relative;

    height: 300vh;

    .wrapper
    {
        @include position.placement(sticky, 0, auto, auto, 0);

        overflow: hidden;

        height: 100vh;

        padding: 10rem app.$gap-inline 0;

        pointer-events: none;

        box-sizing: border-box;

        @include media.min(false, $ms2) { padding-top: max(11rem, 70px); }
    }

    .scene
    {
        &, .cubes {  @extend %any; }
    
        @include position.placement(absolute, 0, 0, 0, 0);
    
        .cubes
        {
            --content-ratio: .27;

            position: relative;

            @include media.min($ms3, $ms2) { --content-ratio: .35; }
            @include media.min($ms4, $ms3) { --content-ratio: .5; }
            @include media.min($ms5, $ms4) { --content-ratio: .75; }
            @include media.min($ms6, $ms4) { --content-ratio: 1; }
        }
    }

    .content
    {
        @extend %f-column;
        @extend %any;

        position: relative;

        z-index: 1;

        justify-content: space-between;
    
        max-height: 65%;

        pointer-events: none;

        .lang, .title, .pagelinks { user-select: none; }

        .lang { @include font.interact($light, map.get(font.$font-sizes, s2), 1, map.get(font.$content-font-weight, w1)); }

        .title
        {
            #{--title-size}: map.get(font.$font-sizes, s6); 
            --icon-size: calc(var(--title-size) * .71);

            @include font.h-(1);

            width: fit-content;
            height: fit-content;

            margin-block: 1rem 3rem;

            &>div
            {
                $animation-details: 3.5s ease-out forwards;
    
                display: flex;
    
                perspective: 750px;

                transform-style: preserve-3d;

                &>div
                {
                    overflow: hidden;

                    span { display: inline-block; }
                }

                &>div:nth-child(1) span
                {
                    transform: translateX(-200%);

                    animation: aTranslateX_1 $animation-details;

                    @keyframes aTranslateX_1 { to { transform: translateX(0); } }
                }
                &>div:nth-child(2)
                {
                    transform-origin: top right;

                    span
                    {
                        transform: translateX(-100%);

                        animation: aTranslateX_2 $animation-details;

                        @keyframes aTranslateX_2 { to { transform: translateX(100%); } }
                    }
                }
            }
            &>div:nth-child(1)
            {
                &>div span { animation-delay: .5s; }
                &>div:nth-child(2) { transform: translateX(-200%) rotateY(-20deg); }
            }
            &>div:nth-child(2)
            {
                padding-bottom: 1rem;

                &>div span { animation-delay: 1.5s; }
                &>div:nth-child(2) { transform: translateX(-200%) rotateY(30deg); }
            }

            @include media.min($ms2) { #{--title-size}: map.get(font.$font-sizes, s7); }
            @include media.min($ms3, $ms3)
            {
                #{--title-size}: map.get(font.$font-sizes, s8);

                margin-top: 3rem;

                &>div
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
                &>div:nth-child(1) { margin-left: app.$gap-inline; }
            }
        }

        .pagelinks
        {
            width: fit-content;
            height: fit-content;

            ul
            {
                display: flex;

                gap: 1rem;

                @include media.min(false, $ms3)
                {
                    display: block;
            
                    gap: 0;
                }
            }

            a
            {
                @include font.interact($light, 2.4rem, 1.5);

                @extend %any;
                @extend %selected;

                position: relative;

                display: inline-block;
        
                transform: rotate(-.7deg);
        
                margin-bottom: .5rem;
                padding-inline: 1rem;

                pointer-events: auto;
        
                box-sizing: border-box;

                text-decoration: none;
            }
        }
    }
}
</style>