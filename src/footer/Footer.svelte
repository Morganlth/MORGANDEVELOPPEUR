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

    <div
    class="lang"
    >
        <span>lang:</span>

        <form
        method="post"
        action="/"
        bind:this={form}
        >
            <select
            name="lang"
            aria-label="choix de la langue"
            on:input={select_eInput}
            >
                {#each LANGS as LANG}
                    <option
                    value={LANG}
                    selected={LANG === prop_LANG}
                    >
                        {LANG.toUpperCase()}
                    </option>
                {/each}
            </select>
        </form>
    </div>
</footer>


<!-- #|-SCRIPT-| -->

<script>

// #\-IMPORTS-\

    // --DATA

    // --SVELTE

    // --LIB
    import { LANGS } from '$lib/lang'

    // --CONTEXTS

//=======@COMPONENTS|

    // --*
    
//=======@STYLE|

    // --*


// #\-EXPORTS-\

    // --PROPS
    export let prop_LANG

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
    let form


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
    function select_getCookieExpiration()
    {
        const DATE = new Date()

        DATE.setFullYear(DATE.getFullYear() + 1)

        return DATE.toUTCString()
    }

    // --UPDATES

    // --DESTROY


//=======@COMMANDS|

    // --*


//=======@EVENTS|

    // --*
    function select_eInput({ target: {value} })
    {
        const VALUE = encodeURIComponent(value)
    
        if (!LANGS.includes(VALUE)) return
        
        document.cookie = `lang=${VALUE}; expires=${select_getCookieExpiration()}; samesite=lax`

        form.submit()
    }


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
    &, ul { display: flex; }

    @include utils.placement(fixed, $right: 0, $bottom: 0, $z: 2);
    @include font.text($color: $light, $regular: false);

    @extend %no-drag;
    @extend %a-scaled;

    justify-content: space-between;
    align-items: flex-end;

    width: 100%;

    padding: 0 app.$gap-inline app.$gap-block;

    pointer-events: none;

    box-sizing: border-box;

    a, select
    {
        pointer-events: auto;

        color: inherit;
        font:  inherit;
    }

    nav { width: 50%; }

    ul
    {
        justify-content: flex-start;

        gap: app.$gap-block;

        width: 100%;

        a
        {
            @extend %a-text;

            position: relative;

            padding: $padding-block 1rem;

            text-decoration: none;

            &:focus { color: $primary; }

            &::after
            {
                justify-content: center;
                align-items:     center;
            }
        }

        @include media.min($ms4)
        {
            justify-content: flex-end;

            gap: 8rem;
        }
    }

    .lang
    {
        display: flex;

        padding-bottom: $padding-block;

        span
        {
            font-family: font.$family-text;
            font-weight: lighter;
        }
    
        select
        {
            background-color: $dark;

            margin: 0;
        
            border: none;
        }

        option { padding: 0; }
    }
}


</style>