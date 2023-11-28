<!----------------------------------------------- #||--moon--|| -->


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
class="moon"
class:focus={prop_FOCUS}
viewBox="0 0 300 300"
xmlns="http://www.w3.org/2000/svg"
>
    <path
    d="M262.5 150C262.572 177.566 252.521 204.2 234.253 224.845C215.986 245.49 190.774 258.709 163.404 261.994C136.034 265.278 108.411 258.399 85.7775 242.662C63.1443 226.925 47.0768
    203.426 40.625 176.625C56.7006 191.721 77.9479 200.085 100 200C119.135 200.012 137.747 193.751 152.985 182.176C168.222 170.601 179.245 154.35 184.365 135.912C189.485 117.474 188.42
    97.8666 181.333 80.092C174.245 62.3175 161.527 47.3563 145.125 37.5H150C179.837 37.5 208.452 49.3526 229.55 70.4505C250.647 91.5483 262.5 120.163 262.5 150Z"
    stroke={COLORS.dark}
    stroke-width="8"
    />
</svg>


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
    export let prop_FOCUS = false

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

    /* --MEDIA */


/* #\-VARIABLES-\ */

    /* --* */


/* #\-THIS-\ */

.moon
{
    transform: translate(calc(50vw - 30%), calc(-50vh + 50%)) scale(.26);

    width: 34%;
    height: 34%;

    fill: $light;

    transition: transform .8s ease-in-out, opacity .8s ease-in-out;

    &.focus
    {
        transform: translate(0, 0) scale(1);

        opacity: .2;
    }
}


</style>