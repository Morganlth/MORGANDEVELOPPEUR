<!----------------------------------------------- #||--nav--|| -->


<!-- #|-CONTEXT-| -->
<!--
<script
context="module"
>

// #\-IMPORTS-\

    // --SVELTE

     // --LIB

    // --JS


// #\-EXPORTS-\

    // --CONTEXTS


</script>
-->

<!-- #|-HTML-| -->

<nav
class="nav"
class:focus={prop_FOCUS}
class:top={!prop_INTRO}
style:--nav-t-x="{nav_TRANSLATE_X}%"
style:--nav-t-y="{prop_TRANSLATE_Y}px"
style:--nav-rotate="{nav_ROTATE}deg"
style:--pe-color={nav_PE_COLOR}
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


<!-- #|-SCRIPT-| -->

<script>

// #\-IMPORTS-\

    // --DATA

    // --SVELTE
    import { onDestroy, createEventDispatcher } from 'svelte'
    import { cubicInOut }                       from 'svelte/easing'

    // --LIB
    import COLORS            from '$lib/colors'
    import { wait_getDelay } from '$lib/wait'
    import { animation }     from '$lib/animation'

    // --CONTEXTS
    import { SPRING } from '../../../App.svelte'

//=======@COMPONENTS|

    // --*
    import Icon from '../../../global/covers/Icon.svelte'


// #\-EXPORTS-\

    // --PROPS
    export let
    prop_FOCUS = false,
    prop_INTRO = false
    ,
    prop_TRANSLATE_Y = 0
    ,
    prop_ITEMS = []

    // --BINDING


// #\-CONSTANTES-\

    // --SVELTE
    const SVELTE_DISPATCH = createEventDispatcher()

    // --CONTEXTS

    // --OUTSIDE

    // --THIS
    const NAV_DURATION = wait_getDelay(84) // +- 1400ms

    // --INSIDE


// #\-VARIABLES-\

    // --CONTEXTS

    // --OUTSIDE

    // --THIS
    let
    nav_TRANSLATE_X = 0,
    nav_ROTATE      = 90
    ,
    nav_PE_COLOR = COLORS.intermediate
    ,
    nav_T = 0
    ,
    nav_cancel = () => {}

    // --INSIDE
    let
    items_TRANSLATE_X = 0,
    items_OPACITY     = 0


// #\-REATIVES-\

    // --CONTEXTS

    // --OUTSIDE

    // --THIS
    $: nav_update(prop_FOCUS)

    // --INSIDE


// #\-FUNCTIONS-\

//=======@LIFE|

    // --SVELTE
    onDestroy(nav_destroy)

    // --SET

    // --GET

    // --UPDATES
    function spring_update(state, size)
    {
        SPRING.spring_$STATE = state
        SPRING.spring_$SIZE = size
    }

    function nav_update(focus)
    {
        nav_cancel()

        nav_a(!focus)
    }

    // --DESTROY
    function nav_destroy()
    {
        nav_cancel()

        nav_eMouseLeave()
    }


//=======@COMMANDS|

    // --*


//=======@EVENTS|

    // --*
    function nav_eMouseEnter() { spring_update(1, SPRING.spring_D_SIZE * 3) }
    
    function nav_eMouseLeave() { spring_update(0, SPRING.spring_D_SIZE) }

    async function nav_eClick(id) { SVELTE_DISPATCH('click', { id: id, item: prop_ITEMS[id] }) }


//=======@TRANSITIONS|

    // --*


//=======@ANIMATIONS|

    // --*
    function nav_a(invert = false)
    {
        nav_cancel = animation(t =>
        {
            nav_T = t

            if (t < .7)
            {
                const T = cubicInOut(t / .7)
        
                nav_TRANSLATE_X = -100 * T
                nav_ROTATE = 90 * (1 - T)

                nav_PE_COLOR = prop_INTRO ? COLORS[t > .2 ? 'light' : 'intermediate'] : 'transparent'
            }
            else
            {
                const T = cubicInOut((t - .7) / .3)
            
                items_TRANSLATE_X = (nav_TRANSLATE_X = -100 * (1 - T))
                items_OPACITY = T

                nav_PE_COLOR = COLORS.intermediate
            }
        },
        NAV_DURATION, nav_T, invert).cancel
    }


//=======@UTILS|

    // --*


</script>


<!-- #|-STYLE-| -->

<style
lang="scss"
>

/* #\-USES-\ */

    /* --SASS */
    @use 'sass:map';

    /* --APP */

    /* --DEPENDENCIES */
    @use '../../../assets/scss/styles/utils';
    @use '../../../assets/scss/styles/display';
    @use '../../../assets/scss/styles/font';

    /* --MEDIA */
    @use '../../../assets/scss/styles/media';


/* #\-VARIABLES-\ */

    /* --* */
    $pe-transition: background-color .6s;


/* #\-GLOBAL-\ */

    /* --* */


/* #\-THIS-\ */

.nav
{
    &::before, &, .items { width: 100%; }

    &::before
    {
        @include utils.placement(absolute, $top: 0, $right: 0, $left: 0, $pe: true);

        transform: translateX(var(--nav-t-x, 0)) rotate(var(--nav-rotate, 0));

        opacity: 0;

        height: 1px;

        background-color: var(--pe-color, $intermediate);

        transition: $pe-transition, opacity 1s;
    }

    position: relative;

    transition: transform .4s .2s ease-out;

    &.focus
    {
        &::before
        {
            opacity: 1;

            transition: $pe-transition;
        }

        &.top
        {
            &::before { background-color: transparent !important; }

            transform: translateY(var(--nav-t-y, -300%));
        }

        li button { pointer-events: auto; }
    }

    .items
    {
        --icon-size: 2.4rem;

        @extend %f-a-center;

        justify-content: flex-start;
        flex-wrap: wrap;
        gap: .8rem;
    }

    li button
    {
        @include font.text($n: 0, $color: var(--item-color, $light));

        padding: .8rem 1.8rem;

        pointer-events: none;

        background-color: $dark;

        border: solid $intermediate 1px;
    }
}


</style>