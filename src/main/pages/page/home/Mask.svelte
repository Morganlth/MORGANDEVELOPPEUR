<!----------------------------------------------- #||--mask--|| -->


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

<div
class="mask"
class:blur={prop_BLUR}
class:shadow={prop_SHADOW}
style:--mask-x="{prop_COORDS[0]}%"
style:--mask-y="{prop_COORDS[1]}%"
style:--mask-transparent="{prop_GRADIENT[0]}%"
style:--mask-dark="{prop_GRADIENT[1]}%"
transition:transition_fade={{ duration: 1000 }}
>
</div>


<!-- #|-SCRIPT-| -->

<script>

// #\-IMPORTS-\

    // --DATA

    // --SVELTE

    // --LIB
    import { transition_fade } from '$lib/transition'

    // --CONTEXTS

//=======@COMPONENTS|

    // --*


// #\-EXPORTS-\

    // --PROPS
    export let
    prop_BLUR   = false,
    prop_SHADOW = false
    ,
    prop_COORDS   = [50, 50],
    prop_GRADIENT = [0, 100]

    // --BINDING


// #\-CONSTANTES-\

    // --SVELTE

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

    /* --APP */

    /* --DEPENDENCIES */
    @use '../../../../assets/scss/styles/utils';

    /* --MEDIA */


/* #\-VARIABLES-\ */

    /* --* */
    $gradient: radial-gradient(circle at var(--mask-x, 50%) var(--mask-y, 50%), transparent var(--mask-transparent, 0), $dark var(--mask-dark, 100%));


/* #\-GLOBAL-\ */

    /* --* */


/* #\-THIS-\ */

.mask
{
    @include utils.placement(absolute, 0, 0, 0, 0);

    @extend %any-size;

    pointer-events: none;

    &.blur
    {
        backdrop-filter: blur(1.4rem);

        mask: $gradient no-repeat;
    }

    &.shadow { background: $gradient; }
}


</style>