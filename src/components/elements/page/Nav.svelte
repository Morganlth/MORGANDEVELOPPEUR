<!-- #MAP

-SPRING
    NAV
        ITEMS

-->

<!-- #SCRIPT -->

<script>
// #EXPORTS

    // --PROPS
    export let
    prop_FOCUS = false,
    prop_INTRO = false,

    prop_TRANSLATE_Y = 0,

    prop_ITEMS = []

// #IMPORTS

    // --JS
    import { animation } from '../../../assets/js/utils/animation'

    // --LIB
    import COLORS from '$lib/colors'

    // --CONTEXT
    import { SPRING } from '../../../App.svelte'

    // --SVELTE
    import { onDestroy, createEventDispatcher } from 'svelte'
    import { cubicInOut } from 'svelte/easing'

    // --COMPONENT-COVERS
    import Icon from '../../covers/Icon.svelte'

// #CONSTANTE

    // --SVELTE
    const SVELTE_DISPATCH = createEventDispatcher()

// #VARIABLES

    // --ELEMENT-NAV
    let
    nav_TRANSLATE_X = 0,
    nav_ROTATE = 90,

    nav_BORDER_COLOR = COLORS.intermediate,

    nav_T = 0,

    nav_cancel = () => {}

    // --ITEMS
    let
    items_TRANSLATE_X = 0,
    items_OPACITY = 0

// #REACTIVE

    $: nav_update(prop_FOCUS)

// #FUNCTIONS

    // --DESTROY
    function nav_destroy()
    {
        nav_clear()
        nav_eMouseLeave()
    }

    // --UPDATES
    function spring_update(state, size)
    {
        SPRING.spring_$STATE = state
        SPRING.spring_$SIZE = size
    }

    function nav_update(focus)
    {
        nav_clear()

        nav_a(!focus)
    }

    // --CLEAR
    function nav_clear() { nav_cancel() }

    // --EVENTS
    function nav_eMouseEnter() { spring_update(1, SPRING.spring_D_SIZE * 3) }

    function nav_eMouseLeave() { spring_update(0, SPRING.spring_D_SIZE) }

    async function nav_eClick(id) { SVELTE_DISPATCH('click', { id: id, item: prop_ITEMS[id] }) }

    // --ANIMATIONS
    async function nav_a(invert = false)
    {
        nav_cancel = animation((t) =>
        {
            nav_T = t
        
            if (t < .7)
            {
                const T = cubicInOut(t / .7)
        
                nav_TRANSLATE_X = -100 * T
                nav_ROTATE = 90 * (1 - T)

                nav_BORDER_COLOR = prop_INTRO ? COLORS[t > .2 ? 'light' : 'intermediate'] : 'transparent'
            }
            else
            {
                const T = cubicInOut((t - .7) / .3)
            
                items_TRANSLATE_X = (nav_TRANSLATE_X = -100 * (1 - T))
                items_OPACITY = T

                nav_BORDER_COLOR = COLORS.intermediate
            }
        },
        1400, nav_T, invert).cancel
    }

// #CYCLE

onDestroy(nav_destroy)
</script>

<!-- #HTML -->

<nav
class="nav"
class:focus={prop_FOCUS}
class:top={prop_FOCUS && !prop_INTRO}
style:--nav-t-x="{nav_TRANSLATE_X}%"
style:--nav-t-y="{prop_TRANSLATE_Y}px"
style:--nav-rotate="{nav_ROTATE}deg"
style:--nav-border-color={nav_BORDER_COLOR}
>
    <ul
    class="items"
    style:transform="translateX({items_TRANSLATE_X}%)"
    style:opacity={items_OPACITY}
    >
        {#each prop_ITEMS as item}
            <li>
                <button
                style:--item-color={item.color ?? COLORS.light}
                type="button"
                title={item.title ?? (item.value ?? '')}
                tabindex={prop_FOCUS ? 0 : -1}
                on:mouseenter={nav_eMouseEnter}
                on:mouseleave={nav_eMouseLeave}
                on:click={nav_eClick.bind(null, item.id)}
                >
                    {#if item.component}
                        <Icon
                        prop_COLOR="var(--item-color, {COLORS.light})"
                        prop_SPRING={false}
                        >
                            <svelte:component
                            this={item.component}
                            />
                        </Icon>
                    {/if}
                    
                    {item.value ?? ''}
                </button>
            </li>
        {/each}
    </ul>
</nav>

<!-- #STYLE -->

<style
lang="scss"
>
/* #USES */

@use 'sass:map';

@use '../../../assets/scss/styles/elements';
@use '../../../assets/scss/styles/position';
@use '../../../assets/scss/styles/display';
@use '../../../assets/scss/styles/font';

@use '../../../assets/scss/styles/media';

/* #NAV */

.nav
{
    $before-transition: border .6s;
    
    &::before
    {
        @include position.placement(absolute, $top: 0, $right: 0, $left: 0, $pseudo-element: true);

        transform: translateX(var(--nav-t-x, 0)) rotate(var(--nav-rotate, 0));

        opacity: 0;

        width: 100%;
        height: 0;

        border-top: solid var(--nav-border-color, $intermediate) 1px;

        transition: $before-transition, opacity 1s;
    }

    position: relative;

    width: 100%;

    transition: transform .4s .2s ease-out;

    &.focus::before
    {
        opacity: 1;

        transition: $before-transition;
    }

    &.top
    {
        &::before { border-top-color: transparent !important; }

        transform: translateY(var(--nav-t-y, -300%));
    }

    .items
    {
        --icon-size: 2.4rem;

        @extend %f-a-center;

        justify-content: flex-start;
        flex-wrap: wrap;
    
        gap: .4rem 2rem;

        width: 100%;

        @include media.min($ms4, $ms4)
        {
            gap: 1rem 3rem;

            padding-top: 1rem;
        }
    }

    li button
    {
        @include font.content(var(--item-color, $light), $font-size: map.get(font.$font-sizes, s3));

        @extend %button-reset;

        display: flex;

        gap: .8rem;

        padding-block: 1rem;

        pointer-events: auto;
    }
}
</style>