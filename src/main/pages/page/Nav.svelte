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
itemscope
itemtype="https://schema.org/SiteNavigationElement"
>
    <ul
    class="items"
    style:transform="translateX({items_TRANSLATE_X}%)"
    style:opacity={items_OPACITY}
    >
        {#each prop_NAV as item}
            <li
            class="item"
            style:--item-color={item.color ?? COLORS.light}
            itemprop="name"
            >
                <Cell
                prop_TEXT_WRAPPER={true}
                prop_TITLE={item.title ?? (item.value ?? '')}
                {prop_FOCUS}
                on:click={cell_eClick.bind(null, item.id)}
                >
                    {item.value ?? ''}
                </Cell>
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

//=======@COMPONENTS|

    // --*
    import Cell from '../../../global/covers/Cell.svelte'
            
//=======@STYLE|

    // --*


// #\-EXPORTS-\

    // --PROPS
    export let
    prop_NAV = []
    ,
    prop_FOCUS = false,
    prop_INTRO = false
    ,
    prop_TRANSLATE_Y = 0

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
    function nav_update(focus)
    {
        nav_cancel()

        nav_a(!focus)
    }

    // --DESTROY
    function nav_destroy() { nav_cancel() }


//=======@COMMANDS|

    // --*


//=======@EVENTS|

    // --*
    function cell_eClick(id) { SVELTE_DISPATCH('click', { id: id, item: prop_NAV[id] }) }


//=======@TRANSITIONS|

    // --*


//=======@ANIMATIONS|

    // --*
    async function nav_a(invert = false)
    {
        let {cancel, promise} = animation(t =>
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
        NAV_DURATION, nav_T, invert)

        nav_cancel = cancel

        try { await promise, nav_PE_COLOR = 'transparent' } catch {}
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

    /* --APP */

    /* --DEPENDENCIES */
    @use '../../../assets/scss/styles/utils';
    @use '../../../assets/scss/styles/display';

    /* --MEDIA */


/* #\-VARIABLES-\ */

    /* --* */
    $pe-transition: background-color .6s;


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

        &.top { transform: translateY(var(--nav-t-y, -300%)); }
    }

    .items
    {
        --icon-size: 2.4rem;

        @extend %f-a-center;

        justify-content: flex-start;
        flex-wrap: wrap;
        gap: .8rem;
    }
}


</style>