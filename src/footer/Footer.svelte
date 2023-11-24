<!----------------------------------------------- #||--footer--|| -->


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

<footer
class="footer"
>
    <nav>
        <ul>
            {#each ['LinkedIn', 'Github'] as a}
                <li>
                    <a
                    href="./"
                    alt="LE THUAUT Morgan - {a}"
                    data-content={a}
                    >
                        {a}
                    </a>
                </li>
            {/each}
        </ul>
    </nav>
</footer>


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

    /* --APP */
    @use '../assets/scss/app';

    /* --DEPENDENCIES */
    @use '../assets/scss/styles/utils';
    @use '../assets/scss/styles/font';
    @use '../assets/scss/styles/animation';

    /* --MEDIA */
    @use '../assets/scss/styles/media';


/* #\-VARIABLES-\ */

    /* --* */
    $padding-block: .4rem;


/* #\-THIS-\ */

.footer
{
    @include utils.placement(fixed, $right: 0, $bottom: 0, $z: 2);

    @extend %no-drag;
    @extend %a-scaled;

    width: 100%;

    padding: 0 app.$gap-inline app.$gap-block;

    pointer-events: none;

    box-sizing: border-box;

    nav { width: 50%; }

    ul
    {
        display:         flex;
        justify-content: flex-start;

        gap: app.$gap-block;

        width: 100%;

        a
        {
            @include font.text($color: $light, $regular: false);

            @extend %a-text;

            position: relative;

            padding: $padding-block 1rem;

            pointer-events: auto;

            text-decoration: none;

            &:focus { color: $primary; }
        }

        @include media.min($ms4)
        {
            justify-content: flex-end;

            gap: 8rem;
        }
    }
}


</style>