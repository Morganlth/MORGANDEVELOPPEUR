<!----------------------------------------------- #||--spring--|| -->


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

{#if $spring_$ON}
    <svg
    class="spring"
    class:true={$spring_$STATE === 1}
    class:false={$spring_$STATE === -1}
    >
        <circle
        cx={$spring_$COORDS.x}
        cy={$spring_$COORDS.y}
        r={Math.abs($spring_$SIZE)}
        />
    </svg>
{/if}


<!-- #|-SCRIPT-| -->

<script>

// #\-IMPORTS-\

    // --DATA

    // --SVELTE

    // --LIB

    // --CONTEXTS
    import { SPRING } from '../App.svelte'

//=======@COMPONENTS|

    // --*


// #\-EXPORTS-\

    // --PROPS

    // --BINDING


// #\-CONSTANTES-\

    // --SVELTE

    // --CONTEXTS

    // --OUTSIDE

    // --THIS

    // --INSIDE


// #\-VARIABLES-\

    // --CONTEXTS
    let
    spring_$ON      = SPRING.spring_$ON,
    spring_$STATE   = SPRING.spring_$STATE,
    spring_$COORDS  = SPRING.spring_$COORDS,
    spring_$SIZE    = SPRING.spring_$SIZE

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
    @use '../assets/scss/styles/utils';

    /* --MEDIA */


/* #\-VARIABLES-\ */

    /* --* */


/* #\-GLOBAL-\ */

    /* --* */


/* #\-THIS-\ */

.spring
{
    @include utils.fixed($z: 3); /* > header */

    pointer-events: none;

    mix-blend-mode: difference;

    &.true, &.false { mix-blend-mode: screen !important; }

    &.true  circle { fill: $primary !important; }
    &.false circle { fill: $indicator !important; }

    circle
    {
        fill: $light;

        transition: fill .4s;
    }
}


</style>