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
class:container={prop_CONTAINER}
type="button"
title={prop_TITLE}
tabindex={prop_FOCUS ? 0 : -1}
on:click={cell_eClick}
>
    <slot />
</button>

<!-- #|-SCRIPT-| -->

<script>

// #\-IMPORTS-\

    // --DATA

    // --SVELTE
    import { createEventDispatcher } from 'svelte'

    // --LIB

    // --CONTEXTS

//=======@COMPONENTS|

    // --*


// #\-EXPORTS-\

    // --PROPS
    export let
    prop_FOCUS = true,
    prop_CONTAINER = false
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

    // --INSIDE


// #\-REATIVES-\

    // --CONTEXTS

    // --OUTSIDE

    // --THIS

    // --INSIDE


// #\-FUNCTIONS-\

//=======@LIFE|

    // --SVELTE

    // --SET

    // --GET

    // --UPDATES

    // --DESTROY


//=======@COMMANDS|

    // --*


//=======@EVENTS|

    // --*
    function cell_eClick(e) { SVELTE_DISPATCH('click', { event: e }) }


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


/* #\-GLOBAL-\ */

    /* --* */


/* #\-THIS-\ */

.cell
{
    pointer-events: none;

    &.focus { pointer-events: auto; }

    &.container
    {
        $size: var(--cell-size, map.get(font.$font-sizes, s5));
    
        #{--icon-size}: calc($size * .4);

        @extend %f-center;

        width: $size;
        height: $size;

        border: solid $light .2rem;

        box-sizing: content-box;
    }
}


</style>