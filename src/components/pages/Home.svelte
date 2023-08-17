<!-- #SCRIPT -->

<script>
// #IMPORTS

    // --JS
    import HOME_PAGE_LINKS from '../../assets/js/datas/home_page_links'
    import HOME_CUBES from '../../assets/js/datas/home_cubes'
    import MATH from '../../assets/js/utils/math'
    import { wait_throttle } from '../../assets/js/utils/wait'

    // --LIB
    import { COLORS } from '$lib/colors'

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

    // --ELEMENT-WRAPPER
    const WRAPPER_EVENTS =
    {
        scroll: wrapper_scroll,
        resize: wrapper_resize
    }

    // --ELEMENT-CUBES
    const
    CUBES_MOUSEMOVE = [],
    CUBES_MOUSEUP = [],
    CUBES_RESIZE = [],
    CUBES_ANIMATION = [],
    CUBES_EVENTS =
    {
        mouseMove: cubes_mouseMove,
        mouseUp: cubes_mouseUp,
        resize: cubes_resize,
        animation: wait_throttle(cubes_animation, 100)
    }

// #VARIABLES

    // --ELEMENT-WRAPPER
    let
    wrapper,
    wrapper_HEIGHT,
    wrapper_AVAILABLE_HEIGHT,
    wrapper_SCROLL_RATIO

    // --ELEMENT-TITLE
    let title

// #FUNCTIONS

    // --SET
    function home_set()
    {
        wrapper_setVars()
        wrapper_setEvent()
    
        cubes_setEvent()
    }

    function wrapper_setVars()
    {
        wrapper_HEIGHT = wrapper.offsetHeight,
        wrapper_AVAILABLE_HEIGHT = wrapper.parentNode.offsetHeight - wrapper_HEIGHT
    }

    function wrapper_setEvent() { EVENT.event_add(WRAPPER_EVENTS) }

    function cubes_setEvent() { EVENT.event_add(CUBES_EVENTS) }

    // --DESTROY
    function home_destroy()
    {
        wrapper_destroyEvent()
        cubes_destroyEvent()
    }

    function wrapper_destroyEvent() { EVENT.event_remove(WRAPPER_EVENTS) }

    function cubes_destroyEvent() { EVENT.event_remove(CUBES_EVENTS) }

    // --EVENTS
    async function wrapper_scroll() { wrapper_SCROLL_RATIO = wrapper.offsetTop / wrapper_AVAILABLE_HEIGHT }

    async function wrapper_resize() { wrapper_setVars() }

    async function cubes_mouseMove(clientX, clientY) { cubes_run.call(CUBES_MOUSEMOVE, clientX, clientY) }

    async function cubes_mouseUp() { cubes_run.call(CUBES_MOUSEUP) }

    async function cubes_resize() { cubes_run.call(CUBES_RESIZE) }

    async function cubes_animation() { for (const CUBE_ANIMATION of CUBES_ANIMATION) CUBE_ANIMATION() }

    async function homepagelinks_click()
    {
        const LINK = HOME_PAGE_LINKS[this]

        if (LINK.on) return

        try { HOME_PAGE_LINKS.find(link => link.on).on = false } catch { /* recuperer le chemin dans l'url pour définir le lien sélectionné */ }

        HOME_PAGE_LINKS[this] = { ...LINK, on: true }
    }

    // --ANIMATION
    async function animation()
    {

    }
    
    // --UTIL
    function cubes_run() { for (const EVENT of this) EVENT(...arguments) }
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
            />

            <div
            class="cubes"
            >
                {#each HOME_CUBES as cube, i}
                    <Cube
                    {...cube}
                    prop_CUBES_ANIMATION={CUBES_ANIMATION}
                    prop_ROTATE={Math.random() * MATH.PI.x2}
                    prop_ROTATEY={Math.random() * MATH.PI.x2}
                    bind:cube_mouseMove={CUBES_MOUSEMOVE[i]}
                    bind:cube_mouseUp={CUBES_MOUSEUP[i]}
                    bind:cube_resize={CUBES_RESIZE[i]}
                    />
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
                bind:this={title}
                >
                    <strong>DEVELOPPEUR</strong>
            
                    <span>WEB</span>

                    <Icon
                    prop_COLOR={COLORS.light}
                    prop_SPRING={false}
                    >
                        <Logo />
                    </Icon>
                </h1>
            </section>

            <nav
            class="page-links"
            >
                <ul>
                    <!-- svelte-ignore a11y-no-static-element-interactions a11y-missing-attribute -->
                    {#each HOME_PAGE_LINKS as link, id}
                        <li>
                            <a
                            class:selected={link.on}
                            aria-label={link.label}
                            {...link.attributes}
                            on:click|preventDefault={homepagelinks_click.bind(id)}
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
            --cube-ratio: .27;

            position: relative;

            @include media.min($ms3, $ms2) { --cube-ratio: .35; }
            @include media.min($ms4, $ms3) { --cube-ratio: .5; }
            @include media.min($ms5, $ms4) { --cube-ratio: .75; }
            @include media.min($ms6, $ms4) { --cube-ratio: 1; }
        }
    }

    .content
    {
        @extend %f-column;

        justify-content: space-between;
    
        width: fit-content;
        height: 100%;
        max-height: 65%;

        pointer-events: none;

        .lang, h1, .page-links
        {
            position: relative;

            z-index: 1;

            user-select: none;
        }

        .lang { @include font.interact($light, map.get(font.$font-sizes, s2), 1, map.get(font.$content-font-weight, w1)); }

        h1
        {
            #{--title-size}: map.get(font.$font-sizes, s6); 
            --icon-size: calc(var(--title-size) * .71);

            @include font.h-(1);

            width: fit-content;
            height: fit-content;

            margin-block: 1rem 3rem;

            &>strong, &>span { display: block; }
            &>span { padding-bottom: 1rem; }

            @include media.min($ms2) { #{--title-size}: map.get(font.$font-sizes, s7); }
            @include media.min($ms3, $ms3)
            {
                #{--title-size}: map.get(font.$font-sizes, s8);

                margin-top: 3rem;

                &>strong, &>span
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
                &>strong { margin-left: app.$gap-inline; }
            }
        }

        .page-links
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