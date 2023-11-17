<!----------------------------------------------- #||--cell--|| -->


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

<button
class="cell"
class:focus={prop_FOCUS}
class:icon-wrapper={prop_ICON_WRAPPER}
class:text-wrapper={prop_TEXT_WRAPPER}
class:center={prop_CENTER}
type={prop_SUBMIT ? 'submit' : 'button'}
title={prop_TITLE}
tabindex={prop_FOCUS ? 0 : -1}
bind:this={cell}
on:click={cell_eClick}
>
    <slot />
</button>

<!-- #|-SCRIPT-| -->

<script>

// #\-IMPORTS-\

    // --DATA

    // --SVELTE
    import { onMount, onDestroy, createEventDispatcher } from 'svelte'

    // --LIB

    // --CONTEXTS
    import { SPRING } from '../../App.svelte'

//=======@COMPONENTS|

    // --*
    
//=======@STYLE|

    // --*


// #\-EXPORTS-\

    // --PROPS
    export let
    prop_FOCUS        = true,
    prop_ICON_WRAPPER = false,
    prop_TEXT_WRAPPER = false,
    prop_CENTER       = false,
    prop_SUBMIT       = false
    ,
    prop_TITLE = ''

    // --BINDING


// #\-CONSTANTES-\

    // --SVELTE
    const SVELTE_DISPATCH = createEventDispatcher()

    // --CONTEXTS

    // --OUTSIDE

    // --THIS

    // --INSIDE


// #\-VARIABLES-\

    // --CONTEXTS

    // --OUTSIDE

    // --THIS
    let cell

    // --INSIDE


// #\-REATIVES-\

    // --CONTEXTS

    // --OUTSIDE

    // --THIS

    // --INSIDE


// #\-FUNCTIONS-\

//=======@LIFE|

    // --SVELTE
    onMount(cell_set), onDestroy(cell_destroy)

    // --SET
    function cell_set() { cell_setEvents() }

    function cell_setEvents()
    {
        if (prop_TEXT_WRAPPER)
        {
            cell.addEventListener('mouseenter', cell_eMouseEnter)
            cell.addEventListener('mouseleave', cell_eMouseLeave)
        }
    }

    // --GET

    // --UPDATES
    function spring_update(state, size)
    {
        SPRING.spring_$STATE = state
        SPRING.spring_$SIZE = size
    }

    // --DESTROY
    function cell_destroy()
    {
        cell_destroyEvents()
        cell_eMouseLeave()
    }

    function cell_destroyEvents()
    {
        cell.removeEventListener('mouseenter', cell_eMouseEnter)
        cell.removeEventListener('mouseleave', cell_eMouseLeave)
    }


//=======@COMMANDS|

    // --*


//=======@EVENTS|

    // --*
    function cell_eClick(e) { SVELTE_DISPATCH('click', { event: e }) }

    function cell_eMouseEnter() { spring_update(1, SPRING.spring_D_SIZE * 3) }
    
    function cell_eMouseLeave() { spring_update(0, SPRING.spring_D_SIZE) }


//=======@TRANSITIONS|

    // --*


//=======@ANIMATIONS|

    // --*


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
    @use '../../assets/scss/styles/display';
    @use '../../assets/scss/styles/font';

    /* --MEDIA */


/* #\-VARIABLES-\ */

    /* --* */


/* #\-THIS-\ */

.cell
{
    pointer-events: none;

    color: inherit;
    font:  inherit;

    &.focus { pointer-events: auto; }

    &.icon-wrapper, &.text-wrapper { background-color: $dark; }

    &.icon-wrapper
    {
        $size: var(--cell-size, map.get(font.$font-sizes, s5));
    
        #{--icon-size}: calc($size * .4);

        width:  $size;
        height: $size;

        border: solid var(--cell-border-color, $light) .2rem;

        box-sizing: border-box;
    }

    &.text-wrapper
    {
        @include font.text($color: var(--item-color, $light));

        padding: .8rem 1.8rem;

        border: solid var(--cell-border-color, $intermediate) 1px;
    }

    &.center { @extend %f-center; }
}


</style>