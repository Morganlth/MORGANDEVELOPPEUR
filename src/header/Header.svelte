<!----------------------------------------------- #||--header--|| -->


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

<header
class="header"
>
    <strong>
        <a
        href={$page.url.origin}
        aria-label={LINK_LABEL}
        alt={LINK_LABEL}
        data-sveltekit-reload
        >
            <Icon
            prop_SIZE="2.5rem"
            prop_COLOR={COLORS.light}
            >
                <Logo />
            </Icon>
        </a>
            
        <span>DEV.</span>

        <p>LE THUAUT MORGAN</p>
    </strong>

    <span>
        {$event_$FPS}
    </span>
</header>


<!-- #|-SCRIPT-| -->

<script>

// #\-IMPORTS-\

    // --DATA

    // --SVELTE
    import { page } from '$app/stores'

    // --LIB
    import COLORS from '$lib/colors'

    // --CONTEXTS
    import { EVENT } from '../App.svelte'

//=======@COMPONENTS|

    // --*
    import Icon from '../global/covers/Icon.svelte'

    import Logo from '../global/icons/Logo.svelte'
    
//=======@STYLE|

    // --*


// #\-EXPORTS-\

    // --PROPS

    // --BINDING


// #\-CONSTANTES-\

    // --CONTEXTS

    // --OUTSIDE

    // --THIS

    // --INSIDE
    const LINK_LABEL = 'Page d\'accueil du site LE THUAUT Morgan Développeur Web'


// #\-VARIABLES-\

    // --CONTEXTS
    let event_$FPS = EVENT.event_$FPS

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
    @use '../assets/scss/app';

    /* --DEPENDENCIES */
    @use '../assets/scss/styles/utils';
    @use '../assets/scss/styles/font';
    @use '../assets/scss/styles/animation';

    /* --MEDIA  */


/* #\-VARIABLES-\ */

    /* --*  */


/* #\-THIS-\ */

.header
{
    &, &>strong
    {
        display: flex;
        align-items: flex-end;
    }

    @include utils.placement(fixed, $top: 0, $left: 0, $z: 2);
    
    @extend %a-scaled;

    justify-content: space-between;

    width: 100%;
    height: fit-content;

    padding: app.$gap-block app.$gap-inline 0;

    pointer-events: none;

    mix-blend-mode: lighten;

    box-sizing: border-box;

    &>strong
    {   
        p { @include font.text($color: $light); }

        span
        {
            margin-inline: app.$gap-block 1rem;

            font-size: map.get(font.$font-sizes, s1);
        }
    }

    span { @include font.text($color: $primary, $regular: false); }
}

</style>