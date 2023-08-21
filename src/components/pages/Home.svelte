<!-- #MAP

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

                UNDERTITLE
                    PAGELINK
                    TICTACTOE

        CUBES
            GRAVITYAREA * 3
                CUBE

-->

<!-- #SCRIPT -->

<script>
// #IMPORTS

    // --JS
    import HOME_PAGE_LINKS from '../../assets/js/datas/home_page_links'
    import HOME_CUBES from '../../assets/js/datas/home_cubes'
    import MATH from '../../assets/js/utils/math'
    import { wait_throttle } from '../../assets/js/utils/wait'

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
    const
    TITLE_CHILDREN = [],
    TITLE_EVENTS = {}

    // --ELEMENT-PAGELINKS
    const PAGELINKS_CHILDREN = []

// #VARIABLES

    // --ELEMENT-WRAPPER
    let
    wrapper,
    wrapper_HEIGHT,
    wrapper_AVAILABLE_HEIGHT,
    wrapper_SCROLL_RATIO

    // --ELEMENT-SPACECUBE
    let
    spacecube_COMPLETED = false,
    spacecube_TICTACTOE = false

    // --ELEMENT-TITLE
    let
    title_OPACITY = 0,
    title_TRANSITION_DELAY = 0,
    title_LAST = +new Date(),
    title_I = 0,
    title_J = 0

    // --ELEMENT-PAGELINKS
    let pagelinks_CHARGED = false

// #REACTIVE

    // --ELEMENT-SPACECUBE
    $: spacecube_COMPLETED ? home_intro() : void 0

// #FUNCTIONS

    // --SET
    function home_set()
    {
        home_setEvents()

        wrapper_setVars()
        wrapper_setEvents()
    
        cubes_setEvents()
    }

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

    // --UPDATE
    function pagelinks_update()
    {
        HOME_PAGE_LINKS[0].on = true

        pagelinks_CHARGED = true
    }

    // --EVENTS
    async function home_e$Resize()
    {
        wrapper_setVars()

        for (const RESIZE of CUBES_RESIZE) RESIZE()
    }

    async function wrapper_e$Scroll()
    {
        wrapper_SCROLL_RATIO = wrapper.offsetTop / wrapper_AVAILABLE_HEIGHT

        wrapper_SCROLL_RATIO >= .66
        ?   title_OPACITY
            ? title_outro()
            : void 0
        :   !title_OPACITY
            ? title_intro()
            : void 0
    }

    async function cubes_e$Animation() { for (const UPDATE of CUBES_ANIMATION_UPDATE) UPDATE() }

    async function cube_eClick(id)
    {
        if (id === 0) spacecube_TICTACTOE = true
    }

    async function pagelinks_eClick(id)
    {
        if (pagelinks_CHARGED)
        {
            const LINK = HOME_PAGE_LINKS[id]

            if (LINK.on) return

            try { HOME_PAGE_LINKS.find(link => link.on).on = false } catch { /* recuperer le chemin dans l'url pour définir le lien sélectionné */ }

            HOME_PAGE_LINKS[id] = { ...LINK, on: true }
        }
    }

    // --INTROS
    async function home_intro()
    {
        title_TRANSITION_DELAY = '1.2s'

        title_intro()
        
        setTimeout(pagelinks_intro, 1200)
    }

    async function title_intro()
    {
        title_OPACITY = 1

        for (const CHILD of TITLE_CHILDREN) CHILD.style.transform = 'translate3d(0, 0, 0)'
    }

    async function pagelinks_intro()
    {
        await new Promise(resolve =>
        {
            TITLE_EVENTS.animation = pagelinks_a$Writing.bind(null, resolve)
            
            EVENT.event_add(TITLE_EVENTS)
        })

        EVENT.event_remove(TITLE_EVENTS)

        pagelinks_update()
    }

    // --OUTRO
    async function title_outro()
    {
        title_OPACITY = 0

        for (const CHILD of TITLE_CHILDREN) CHILD.style.transform = title_getTranslate3d()
    }

    // --ANIMATION
    async function pagelinks_a$Writing(resolve)
    {
        const
        NOW = +new Date(),
        GAP = NOW - title_LAST

        for (let k = title_I; k < title_J; k++) PAGELINKS_CHILDREN[k].innerText = [' ', '>'][Math.round(Math.random())]

        if (GAP > 16.67)
        {
            const MAX = PAGELINKS_CHILDREN.length - 1

            if (title_J < MAX && title_J < title_I + 5) title_J++
    
            if (GAP > 33.34)
            {
                const CHILD = PAGELINKS_CHILDREN[title_I]

                CHILD.innerText = CHILD.dataset.char

                if (title_I++ >= MAX) resolve()

                title_LAST = NOW
            }
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
        <Particles />

        <SpaceCube
        prop_RATIO={wrapper_SCROLL_RATIO}
        prop_TICTACTOE={spacecube_TICTACTOE}
        bind:spacecube_COMPLETED
        />

        <div
        class="content"
        style:opacity={title_OPACITY}
        style:transition="opacity {title_TRANSITION_DELAY} ease-in"
        >
            <section>
                <div
                class="lang"
                >
                    FR
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
                                style:transition="transform {title_TRANSITION_DELAY} ease-out"
                                bind:this={TITLE_CHILDREN[TITLE_CHILDREN.length]}
                                >{char}</span>
                            {/each}
                        </div>
                    {/each}

                    <div
                    class="logo"
                    style:transform={title_getTranslate3d()}
                    style:transition="transform {title_TRANSITION_DELAY} ease-out"
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
                            on:click|preventDefault={pagelinks_eClick.bind(null, id)}
                            >
                                {#each link.content as char}
                                    <span
                                    data-char={char}
                                    bind:this={PAGELINKS_CHILDREN[PAGELINKS_CHILDREN.length]}
                                    >&nbsp;</span>
                                {/each}
                            </a>
                        </li>
                    {/each}
                </ul>
            </nav>
        </div>
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

@use '../../assets/scss/styles/position';
@use '../../assets/scss/styles/display';
@use '../../assets/scss/styles/size';
@use '../../assets/scss/styles/font';
@use '../../assets/scss/styles/animation';
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

            perspective: 400px;

            width: fit-content;
            height: fit-content;

            margin-block: 1rem 3rem;

            &>div { transform-style: preserve-3d; }
            .text span { display: inline-block; }
            .logo { margin-top: .9rem; }

            @include media.min($ms2) { #{--title-size}: map.get(font.$font-sizes, s7); }
            @include media.min($ms3, $ms3)
            {
                #{--title-size}: map.get(font.$font-sizes, s8);

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

    .cubes
    {
        --content-ratio: .27;

        @include position.placement(absolute, 0, 0, 0, 0);

        @extend %any;

        @include media.min($ms3, $ms2) { --content-ratio: .35; }
        @include media.min($ms4, $ms3) { --content-ratio: .5; }
        @include media.min($ms5, $ms4) { --content-ratio: .75; }
        @include media.min($ms6, $ms4) { --content-ratio: 1; }
    }
}
</style>