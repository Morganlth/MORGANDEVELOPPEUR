<!-- #SCRIPT -->

<script>
// #IMPORTS

    // --JS
    import HOME_PAGE_LINKS from '../../assets/js/datas/home_page_links'
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
    CUBESWRAPPER_ANIMATION = [],
    CUBESWRAPPER_EVENTS =
    {
        resize: cubeswrapper_resize,
        animation: wait_throttle(cubeswrapper_animation, 100)
    }

// #FUNCTIONS

    // --SET
    function home_set() { cubeswrapper_setEvent() }

    function cubeswrapper_setEvent() { EVENT.event_add(CUBESWRAPPER_EVENTS) }

    // --DESTROY
    function home_destroy() { EVENT.event_remove(CUBESWRAPPER_EVENTS) }

    // --EVENTS
    async function cubeswrapper_resize() { for (const CUBE_RESIZE of CUBESWRAPPER_RESIZE) CUBE_RESIZE() }

    function cubeswrapper_animation() { for (const CUBE_ANIMATION of CUBESWRAPPER_ANIMATION) CUBE_ANIMATION() }

    async function homepagelinks_click()
    {
        const LINK = HOME_PAGE_LINKS[this]

        if (LINK.on) return

        try { HOME_PAGE_LINKS.find(link => link.on).on = false } catch { /* recuperer le chemin dans l'url pour définir le lien sélectionné */ }

        HOME_PAGE_LINKS[this] = { ...LINK, on: true }
    }

// #CYCLES

onMount(home_set)
onDestroy(home_destroy)
</script>

<!-- #HTML -->

<div
id="home"
>
    <Particles />
    <SpaceCube />

    <div
    class="main"
    >
        <section>
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
    @extend %any;

    position: relative;

    overflow: hidden;

    padding: 10rem app.$gap-inline 0;

    box-sizing: border-box;

    .main
    {
        @extend %f-column;

        justify-content: space-between;
    
        width: fit-content;
        height: 100%;
        max-height: 65%;

        pointer-events: none;
    }

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

        strong, span { display: block; }
        span { padding-bottom: 1rem; }

        @include media.min($ms2) { #{--title-size}: map.get(font.$font-sizes, s7); }
        @include media.min($ms3, $ms3)
        {
            #{--title-size}: map.get(font.$font-sizes, s8);

            margin-top: 3rem;

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

            box-sizing: border-box;

            text-decoration: none;
            pointer-events: auto;
        }
    }

    .cubes-wrapper
    {
        --cube-ratio: .27;

        @include position.placement(absolute, 0, 0, 0, 0);

        @extend %any;

        pointer-events: none;

        @include media.min($ms3, $ms2) { --cube-ratio: .35; }
        @include media.min($ms4, $ms3) { --cube-ratio: .5; }
        @include media.min($ms5, $ms4) { --cube-ratio: .75; }
        @include media.min($ms6, $ms4) { --cube-ratio: 1; }
    }

    @include media.min(false, $ms2) { padding-top: max(11rem, 70px); }
}
</style>