<!-- #MAP

-SPRING
    NAV

-->

<!-- #SCRIPT -->

<script>
// #EXPORTS

    // --PROPS
    export let
    prop_INTRO = false,

    prop_TRANSLATE_Y = 0,

    prop_ITEMS = []

// #IMPORTS

    // --LIB
    import COLORS from '$lib/colors'

    // --CONTEXT
    import { SPRING } from '../../App.svelte'

    // --SVELTE
    import { onDestroy, createEventDispatcher } from 'svelte'

    // --COMPONENT-COVER
    import Icon from '../covers/Icon.svelte'

    // --COMPONENT-ICON
    import Logo from '../icons/Logo.svelte'

// #CONSTANTE

    // --SVELTE
    const SVELTE_DISPATCH = createEventDispatcher()

// #FUNCTIONS

    // --DESTROY
    function nav_destroy() { nav_eMouseLeave() }

    // --UPDATE
    function spring_update(state, size)
    {
        SPRING.spring_$STATE = state
        SPRING.spring_$SIZE = size
    }

    // --EVENTS
    function nav_eMouseEnter() { spring_update(1, SPRING.spring_D_SIZE * 3) }

    function nav_eMouseLeave() { spring_update(0, SPRING.spring_D_SIZE) }

    async function nav_eClick(id) { SVELTE_DISPATCH('click', { id: id, item: prop_ITEMS[id] }) }

// #CYCLE

onDestroy(nav_destroy)

// #CODE

for (const ITEM of prop_ITEMS) if (ITEM.update instanceof Function) ITEM.update()
</script>

<!-- #HTML -->

<nav
class="nav"
class:top={!prop_INTRO}
style:--nav-translate-y="-{prop_TRANSLATE_Y}px"
>
    <ul>
        {#each prop_ITEMS as item}
            <li>
                <button
                style:--item-color={item.color ?? COLORS.light}
                type="button"
                title={item.title ?? (item.value ?? '')}
                on:mouseenter={nav_eMouseEnter}
                on:mouseleave={nav_eMouseLeave}
                on:click={nav_eClick.bind(null, item.id)}
                >
                    <Icon
                    prop_COLOR="var(--item-color, {COLORS.light})"
                    prop_SPRING={false}
                    >
                        <svelte:component
                        this={item.component ?? Logo}
                        />
                    </Icon>
                    
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

@use '../../assets/scss/styles/elements';
@use '../../assets/scss/styles/position';
@use '../../assets/scss/styles/display';
@use '../../assets/scss/styles/font';

/* #NAV */

.nav
{
    $animation-duration: 1.4;
    
    &::before
    {
        @include position.placement(absolute, $top: -1.4rem, $right: 0, $left: 0, $pseudo-element: true);

        transform: translateX(0) rotate(90deg);

        width: 100%;
        height: 0;

        border-top: solid $intermediate 1px;

        transition: border .8s;

        animation: aBeforeIntro #{$animation-duration}s ease-in-out forwards;

        @keyframes aBeforeIntro
        {
            50% { border-top-color: $light; }
            70% { transform: translateX(-90%) rotate(0); }  
            100%
            {
                transform: translateX(0) rotate(0);

                border-top-color: $intermediate;
            }    
        }
    }

    position: relative;

    z-index: 2;

    transition: transform .4s ease-out;

    &.top
    {
        &::before { border-top-color: transparent !important; }

        transform: translateY(var(--nav-translate-y, -320%));
    }

    ul
    {
        --icon-size: 2.4rem;

        @extend %f-a-center;

        justify-content: flex-start;
        flex-wrap: wrap;
    
        gap: 1rem 3rem;

        transform: translateX(-100%);

        opacity: 0;

        width: 100%;

        animation: aUlIntro  #{$animation-duration * .3}s  #{$animation-duration * .7}s ease-in-out forwards;

        @keyframes aUlIntro
        {
            100%
            {
                transform: translateX(0);
        
                opacity: 1;
            }
        }
    }

    li button
    {
        @include font.content(var(--item-color, $light), $font-size: map.get(font.$font-sizes, s3));

        @extend %button-reset;

        display: flex;

        gap: .8rem;

        padding-block: .6rem;

        pointer-events: auto;
    }
}
</style>