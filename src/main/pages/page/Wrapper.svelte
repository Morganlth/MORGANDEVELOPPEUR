<!----------------------------------------------- #||--wrapper--|| -->


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

<section
class="wrapper"
>
    <slot
    name="label"
    />

    <div
    class="head"
    >
        <slot
        name="title"
        />

        <slot
        name="nav"
        />

        <slot
        name="quote"
        />
    </div>

    <slot />
</section>


<!-- #|-SCRIPT-| -->

<!-- <script>

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


</script> -->


<!-- #|-STYLE-| -->

<style
lang="scss"
>

/* #\-USES-\ */

    /* --SASS */

    /* --APP */
    @use '../../../assets/scss/app';

    /* --DEPENDENCIES */
    @use '../../../assets/scss/styles/utils';

    /* --MEDIA */
    @use '../../../assets/scss/styles/media';


/* #\-VARIABLES-\ */

    /* --* */


/* #\-THIS-\ */

.wrapper
{
    @extend %sticky;

    transform: scale(1); /* fixed */

    padding: 8rem app.$gap-inline;

    box-sizing: border-box;

    .head
    {
        @include utils.placement(absolute, $z: 1);

        width: calc(100% - app.$gap-inline * 2);
    }

    @include media.min($height: $ms3) { padding-top: max(11rem, 70px); }
}


</style>