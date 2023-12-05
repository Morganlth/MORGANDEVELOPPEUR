<!----------------------------------------------- #||--app--|| -->


<!-- #|-CONTEXT-| -->

<script
context="module"
>

// #\-IMPORTS-\

    // --SVELTE

     // --LIB

    // --JS
    import a from './assets/js/managers/app'
    import r from './assets/js/managers/router'
    import c from './assets/js/managers/command'
    import e from './assets/js/managers/event'
    import p from './assets/js/managers/process'
    import s from './assets/js/managers/spring'


// #\-EXPORTS-\

    // --CONTEXTS
    export const
    APP     = a,
    ROUTER  = r,
    COMMAND = c,
    EVENT   = e,
    PROCESS = p,
    SPRING  = s


</script>


<!-- #|-HTML-| -->

<svelte:head>
    <title>{APP_DATA.title}</title>

    <meta
    name="description"
    content={APP_DATA.desc}
    >

    <meta
    property="og:type"
    content="website"
    >
    <meta
    property="og:url"
    content={$page.url.origin}
    >
    <meta
    property="og:locale"
    content="fr_FR"
    >
    <meta
    property="og:title"
    content={APP_DATA.title}
    >
    <meta
    property="og:description"
    content={APP_DATA.desc}
    >
    <meta
    name="og:image"
    content={APP_DATA.image}
    >
    <meta
    property="og:image:type"
    content="image/png"
    >
    <meta
    property="og:image:width"
    content="1200"
    >
    <meta
    property="og:image:height"
    content="630"
    >
    <meta
    property="og:image:alt"
    content="LE THUAUT {APP_DATA.title}"
    >

    <meta
    name="twitter:url"
    content={$page.url.origin}
    >
    <meta
    name="twitter:title"
    content={APP_DATA.title}
    >
    <meta
    name="twitter:description"
    content={APP_DATA.desc}
    >
    <meta
    name="twitter:image"
    content={APP_DATA.image}
    >
    <meta
    name="twitter:card"
    content="summary_large_image"
    >
    <meta
    name="twitter:site"
    content="@morganDeveloppeur"
    >
    <meta
    name="twitter:creator"
    content="@morganLeThuaut"
    >
</svelte:head>

<!-- svelte-ignore a11y-no-static-element-interactions -->
<div
id="app"
class="lang-{prop_LANG}"
class:freeze={$app_$FREEZE}
style:visibility={app_FONTS_CHARGED ? 'visible' : 'hidden'}
bind:this={app}
on:scroll={EVENT.event_scroll.bind(EVENT)}
on:mousemove={EVENT.event_mouseMove.bind(EVENT)}
on:mousedown={EVENT.event_mouseDown.bind(EVENT)}
on:mouseup={EVENT.event_mouseUp.bind(EVENT)}
on:mouseleave={EVENT.event_mouseUp.bind(EVENT)}
on:touchmove|passive={EVENT.event_touchMove.bind(EVENT)}
on:touchstart|once={app_eTouchStart}
>
    {#if app_FONTS_CHARGED}
        <Header />

        <Main
        {prop_LANG}
        bind:main_CHARGED
        />
    
        <Footer
        {prop_LANG}
        />
    {/if}
</div>


<!-- #|-SCRIPT-| -->

<script>

// #\-IMPORTS-\

    // --DATA
    import app_getData from './assets/js/data/appData'

    // --SVELTE
    import { onMount, onDestroy } from 'svelte'
    import { page }               from '$app/stores'

    // --LIB
    import { LANGS } from '$lib/lang'

    // --CONTEXTS

//=======@COMPONENTS|

    // --*
    import Header from './header/Header.svelte'
    import Main   from './main/Main.svelte'
    import Footer from './footer/Footer.svelte'

//=======@STYLE|

    // --*
    import './assets/scss/global/setter.scss'


// #\-EXPORTS-\

    // --PROPS
    export let
    prop_LANG    = LANGS[0],
    prop_PAGE_ID = 0
    ,
    prop_SUBPATH  = void '',
    prop_RESPONSE = void ''

    // --BINDING


// #\-CONSTANTES-\

    // --SVELTE

    // --CONTEXTS

    // --OUTSIDE

    // --THIS
    const APP_DATA = app_getData(prop_LANG)

    // --INSIDE


// #\-VARIABLES-\

    // --CONTEXTS
    let app_$FREEZE = APP.app_$FREEZE

    // --OUTSIDE

    // --THIS
    let
    app
    ,
    app_FONTS_CHARGED = false

    // --INSIDE
    let main_CHARGED = false


// #\\-REATIVES-\\

    // --CONTEXTS

    // --OUTSIDE

    // --THIS

    // --INSIDE
    $: app_setContexts(main_CHARGED)


// #\-FUNCTIONS-\

//=======@LIFE|

    // --SVELTE
    onMount(app_set), onDestroy(app_destroy)

    // --SET
    function app_set() { app_setVars() }

    function app_setVars()
    {
        // set screen size + small screen
        APP.app_updateSize()
        APP.app_updateSmallScreen()

        document.fonts.ready.then(() => app_FONTS_CHARGED = true)
    }

    function app_setContexts(charged)
    {
        if (charged)
        {
            ROUTER .router_set(prop_PAGE_ID, prop_SUBPATH, prop_RESPONSE)
            COMMAND.command_set()
            EVENT  .event_set()
            PROCESS.process_set()
            SPRING .spring_set()
            APP    .app_set(app, prop_LANG)

            app_setContexts = () => {}
        }
    }

    // --GET

    // --UPDATES

    // --DESTROY
    function app_destroy()
    {
        EVENT.event_destroy()
        SPRING.spring_destroy()
    }


//=======@COMMANDS|

    // --*


//=======@EVENTS|

    // --*
    async function app_eTouchStart() { APP.app_$MOBILE = true }


//=======@TRANSITIONS|

    // --*


//=======@ANIMATIONS|

    // --*


//=======@UTILS|

    // --*
    ;(function app_setLang() { APP.app_setLang(prop_LANG) })()


</script>


<!-- #|-STYLE-| -->

<style
lang="scss"
>

/* #\-USES-\ */

    /* --SASS */

    /* --APP */

    /* --DEPENDENCIES */
    @use './assets/scss/styles/utils';

    /* --MEDIA  */


/* #\-VARIABLES-\ */

    /* --* */


/* #\-THIS-\ */

#app
{
    @include utils.fixed;

    @extend %scroll-bar;

    overflow           : hidden scroll;
    overscroll-behavior: none;

    background-color: $dark;

    &.freeze { overflow: hidden !important; }
}


</style>