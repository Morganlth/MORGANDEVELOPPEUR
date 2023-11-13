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
class="line"
>
    <div
    class="id"
    >
        <slot
        name="id"
        />
    </div>

    <div
    class="content"
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
    @use '../../assets/scss/styles/display';
    @use '../../assets/scss/styles/font';

    /* --MEDIA */
    @use '../../assets/scss/styles/media';


/* #\-VARIABLES-\ */

    /* --* */
    $line-h: var(--line-height, 3rem);

    $font-size: map.get(font.$font-sizes, s3);


/* #\-THIS-\ */

.line
{
    --line-height: 3rem;

    @include font.text($regular: true, $font-size: inherit);

    display: flex;

    width:      100%;
    height:     $line-h;
    min-height: $line-h;
    max-height: $line-h;

    .id, .content
    {
        @extend %f-a-center;

        height: 100%;
    }

    .id
    {
        flex-shrink: 0;

        width: 4rem;

        color:     $primary;
        font-size: $font-size;
    }

    .content
    {
        flex: 1;

        width: 100%;

        user-select: text;

        color:     $light;
        font-size: map.get(font.$font-sizes, s2);
    }

    @include media.min($ms3)
    {
        --line-height: 5rem;

        gap: 1rem;

        .content { font-size: $font-size; }
    }
}


</style>