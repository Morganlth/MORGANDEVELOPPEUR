<!----------------------------------------------- #||--cross--|| -->


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

<svg
class="cross {prop_DESTROY ? 'destroy' : 'build'}"
viewBox="0 0 81 81"
fill="none"
stroke="var(--icon-color, #FFF)"
stroke-width="15"
stroke-linecap="round"
xmlns="http://www.w3.org/2000/svg"
>
    <path d="M8 8.05371L73 73"/>
    <path d="M8 72.9504L72.9957 7.99989"/>
</svg>


<!-- #|-SCRIPT-| -->

<script>

// #\-IMPORTS-\

    // --DATA

    // --SVELTE

    // --LIB

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
    @use '../../assets/scss/styles/utils';

    /* --MEDIA */


/* #\-VARIABLES-\ */

    /* --* */


/* #\-THIS-\ */

.cross
{
    @extend %any-size;

    &.build path
    {
        stroke-dashoffset: 120%;

        animation: a-build .15s ease-in forwards;

        &:nth-child(1) { animation-delay: .25s; }
        &:nth-child(2) { animation-delay: .4s; }

        @keyframes a-build { to { stroke-dashoffset: 0%; } }
    }

    &.destroy path
    {
        stroke-dashoffset: 0%;

        animation: a-destroy .15s ease-in forwards;

        &:nth-child(1) { animation-delay: .0s; }
        &:nth-child(2) { animation-delay: .15s; }

        @keyframes a-destroy { to { stroke-dashoffset: 120%; } }
    }

    path { stroke-dasharray: 120%; }
}


</style>