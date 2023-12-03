<!----------------------------------------------- #||--quote--|| -->


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
class="quote"
class:focus={prop_INTRO}
itemscope
itemtype="https://schema.org/Quotation"
>
    {#if prop_QUOTE.author}
        <figure>
            <blockquote
            itemprop="text"
            >
                {prop_QUOTE.value}
            </blockquote>

            <figcaption
            itemprop="author"
            >
                {prop_QUOTE.author}
            </figcaption>
        </figure>
    {:else}
        <q
        itemprop="citation"
        >
            {prop_QUOTE.value}
        </q>
    {/if}
</div>


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
    export let
    prop_INTRO = false
    ,
    prop_QUOTE = {}

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
    @use 'sass:map';

    /* --APP */
    @use '../../../assets/scss/app';

    /* --DEPENDENCIES */
    @use '../../../assets/scss/styles/font';

    /* --MEDIA */
    @use '../../../assets/scss/styles/media';


/* #\-VARIABLES-\ */

    /* --* */


/* #\-THIS-\ */

.quote
{
    @include font.text($color: $light);
    
    display: none;

    justify-content: flex-end;

    width: 100%;

    margin-top: 6vh;

    &.focus>* { clip-path: polygon(100% 0, 0 0, 0 100%, 100% 100%); }

    &>*
    {
        clip-path: polygon(100% 0, 100% 0, 100% 100%, 100% 100%);

        text-align: right;

        transition: clip-path .4s ease-in;
    }

    figcaption { margin-top: 1rem; }

    q::before, q::after { content: '' }

    @include media.min($height: $ms3) { display: flex; }

    @include media.min($ms4, $ms4)    { margin-top: 26vh; }
}


</style>