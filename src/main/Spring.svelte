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
    class="spring p-fxd"
    class:d-hid={spring_HIDE}
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
    import { onDestroy } from 'svelte'

    // --LIB
    import { wait_getDelay } from '$lib/wait'

    // --CONTEXTS
    import { SPRING } from '../App.svelte'

//=======@COMPONENTS|

    // --*
    
//=======@STYLE|

    // --*


// #\-EXPORTS-\

    // --PROPS

    // --BINDING


// #\-CONSTANTES-\

    // --SVELTE

    // --CONTEXTS

    // --OUTSIDE

    // --THIS
    const SPRING_DELAY = wait_getDelay(24) // +- 400ms

    // --INSIDE


// #\-VARIABLES-\

    // --CONTEXTS
    let
    spring_$ON     = SPRING.spring_$ON,
    spring_$STATE  = SPRING.spring_$STATE,
    spring_$HIDE   = SPRING.spring_$HIDE,
    spring_$COORDS = SPRING.spring_$COORDS,
    spring_$SIZE   = SPRING.spring_$SIZE

    // --OUTSIDE

    // --THIS
    let
    spring_HIDE = false
    ,
    spring_TIMEOUT

    // --INSIDE


// #\-REATIVES-\

    // --CONTEXTS

    // --OUTSIDE

    // --THIS
    $: spring_updateHide($spring_$HIDE)

    // --INSIDE


// #\-FUNCTIONS-\

//=======@LIFE|

    // --SVELTE
    onDestroy(spring_destroy)

    // --SET

    // --GET

    // --UPDATES
    function spring_updateHide(hide)
    {
        spring_destroyTimeout()

        spring_TIMEOUT = setTimeout(() => spring_HIDE = hide, hide ? SPRING_DELAY : 0)
    }

    // --DESTROY
    function spring_destroy() { spring_destroyTimeout() }

    function spring_destroyTimeout() { clearTimeout(spring_TIMEOUT) }


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

    /* --MEDIA */


/* #\-VARIABLES-\ */

    /* --* */


/* #\-THIS-\ */

.spring
{
    z-index: 3; /* > header */

    mix-blend-mode: difference;

    &.true, &.false { mix-blend-mode: screen !important; }

    &.true  circle { fill: $primary   !important; }
    &.false circle { fill: $indicator !important; }

    circle
    {
        fill: $light;

        transition: fill .4s;
    }
}


</style>