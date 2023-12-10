<!----------------------------------------------- #||--line--|| -->


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
class="line d-fac s-a-w"
>
    <div
    class="id"
    >
        <slot
        name="id"
        />
    </div>

    <div
    class="content d-fac s-any"
    >
        <slot
        name="content"
        />
    </div>
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

    /* --DEPENDENCIES */
    @use '../../assets/scss/styles/font';

    /* --MEDIA */
    @use '../../assets/scss/styles/media';


/* #\-VARIABLES-\ */

    /* --* */
    $line-h: var(--line-height, 3rem);


/* #\-THIS-\ */

.line
{
    @include font.text($regular: true, $font-size: map.get(font.$font-sizes, s3));

    height:     $line-h;
    min-height: $line-h;
    max-height: $line-h;

    .id, .content { font: inherit; }

    .id
    {
        flex-shrink: 0;

        width: 4rem;

        color: $primary;
    }

    .content
    {
        flex: 1;

        user-select: text;

        color: $light;
    }

    @include media.min($ms3) { gap: 1rem; }
}


</style>