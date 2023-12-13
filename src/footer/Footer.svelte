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
class="footer d-fac s-a-w p-n-- b-box"
>
    <nav>
        <ul
        class="d-flx s-a-w"
        >
            {#each LINKS as a}
            {@const {value, href} = a}
                <li>
                    <a
                    class="p-rlt p-y--"
                    href={href}
                    alt="LE THUAUT Morgan - {value}"
                    aria-label={value}
                    data-content={value}
                    target="_blank"
                    draggable="false"
                    >
                        {value}
                    </a>
                </li>
            {/each}
        </ul>
    </nav>

    <div
    class="lang d-fac"
    >
        <span>lang:</span>

        <form
        method="post"
        action="/"
        bind:this={form}
        >
            <input
            class="d-hid"
            type="hidden"
            name="url"
            value={router_ROUTE}
            >
    
            <select
            class="p-y-- b-drk"
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
    import { tick } from 'svelte'

    // --LIB
    import { LANGS }                      from '$lib/lang'
    import { DATA_LINKEDIN, DATA_GITHUB } from '$lib/data'

    // --CONTEXTS
    import { ROUTER } from '../App.svelte'

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
    const LINKS =
    [
        {
            value: 'LinkedIn',
            href : DATA_LINKEDIN
        },
        {
            value: 'Github',
            href : DATA_GITHUB
        }
    ]


// #\-VARIABLES-\

    // --CONTEXTS

    // --OUTSIDE
    let router_ROUTE = '/'

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
    function select_setCookie(value) { document.cookie = `lang=${value}; path=/; expires=${select_getCookieExpiration()}; samesite=strict;` }

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
    async function select_eInput({ target: {value} })
    {
        const VALUE = encodeURIComponent(value)
    
        if (LANGS.includes(VALUE))
        {
            select_setCookie(VALUE)

            router_ROUTE = ROUTER.router_ROUTE

      await tick() 

            form.submit()
        }
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


/* #\-THIS-\ */

.footer
{
    @include utils.placement(fixed, $right: 0, $bottom: 0, $z: 2);
    @include font.text($color: $light, $regular: false);

    @extend %no-drag;
    @extend %a-scaled;

    justify-content: space-between;

    height: fit-content;

    padding: 0 app.$gap-inline app.$gap-block;

    a, select
    {
        color: inherit;
        font : inherit;
    }

    nav { width: 50%; }

    ul
    {
        justify-content: flex-start;

        gap: app.$gap-block;

        a
        {
            @extend %a-text;

            padding: .4rem 1rem;

            &:focus { color: $primary; }

            &::after
            {
                justify-content: center;
                align-items    : center;
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
        span
        {
            font-family: font.$family-text;
            font-weight: lighter;
        }
    
        select { padding: 0 .2rem; }
    }
}


</style>