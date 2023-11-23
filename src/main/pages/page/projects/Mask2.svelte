<!----------------------------------------------- #||--mask2--|| -->


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
class="mask2"
style:opacity={mask2_OPACITY}
style:--pe-bg-color={mask2_BACKGROUND_COLOR}
style:--pe-before-clip="polygon({mask2_PE_BEFORE_CLIP_POINTS})"
style:--pe-after-clip="polygon({mask2_PE_AFTER_CLIP_POINTS})"
>
</div>


<!-- #|-SCRIPT-| -->

<script>

// #\-IMPORTS-\

    // --DATA

    // --SVELTE

    // --LIB
    import COLORS from '$lib/colors'

    // --CONTEXTS

//=======@COMPONENTS|

    // --*
    
//=======@STYLE|

    // --*


// #\-EXPORTS-\

    // --PROPS
    export let prop_DESTROY = false

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
    let
    mask2_OPACITY = 0
    ,
    mask2_BACKGROUND_COLOR = COLORS.primary
    ,
    mask2_PE_BEFORE_CLIP_POINTS = 'none',
    mask2_PE_AFTER_CLIP_POINTS  = 'none'

    // --INSIDE


// #\-REATIVES-\

    // --CONTEXTS

    // --OUTSIDE

    // --THIS
    $: mask2_update(prop_DESTROY)

    // --INSIDE


// #\-FUNCTIONS-\

//=======@LIFE|

    // --SVELTE

    // --SET

    // --GET

    // --UPDATES
    function mask2_update(destroy)
    {
        [mask2_OPACITY, mask2_BACKGROUND_COLOR, mask2_PE_BEFORE_CLIP_POINTS, mask2_PE_AFTER_CLIP_POINTS] =
        destroy
        ? [0, COLORS.primary, '0 0, 0 0, 0 100%, 0% 100%', '100% 0, 100% 0, 100% 100%, 100% 100%']
        : [1, COLORS.dark, '100% 0, 50% 0, 50% 100%, 100% 100%', '0 0, 50% 0, 50% 100%, 0 100%']
    }

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
    $duration: .8s;


/* #\-THIS-\ */

.mask2
{
    &, &::before, &::after { @extend %any-size; }

    &::before, &::after
    {
        @include utils.placement(absolute, 0, 0, 0, 0, $pe: true);

        background-color: var(--pe-bg-color, $dark);

        transition: clip-path ease-in-out, background 1s;
    }

    &::before
    {
        clip-path: var(--pe-before-clip, 'none');

        transition-duration: $duration;
    }

    @include utils.placement(absolute, 0, 0, 0, 0);

    pointer-events: none;

    mix-blend-mode: color-dodge;

    transition: opacity 1s;

    &::after
    {
        clip-path: var(--pe-after-clip, 'none');

        transition-duration: $duration + .2s;
    }
}


</style>