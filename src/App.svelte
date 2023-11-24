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

<!-- svelte-ignore a11y-no-static-element-interactions -->
<div
id="app"
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
        bind:main_CHARGED
        />
        <Footer />
    {/if}
</div>


<!-- #|-SCRIPT-| -->

<script>

// #\-IMPORTS-\

    // --SVELTE
    import { onMount, onDestroy } from 'svelte'

    // --LIB

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
    function app_set()
    {
        app_setVars()
        app_setCommands()
    }

    function app_setVars()
    {
        // set screen size + small screen
        APP.app_updateSize()
        APP.app_updateSmallScreen()

        document.fonts.ready.then(() => app_FONTS_CHARGED = true)
    }

    function app_setCommands()
    {
        COMMAND.command_add('app',     app_c$App)
        COMMAND.command_add('router',  app_c$Router)
        COMMAND.command_add('command', app_c$Command)
        COMMAND.command_add('event',   app_c$Event)
    }

    function app_setContexts(charged)
    {
        if (charged)
        {
            ROUTER.router_set(prop_PAGE_ID, prop_SUBPATH, prop_RESPONSE)
            EVENT.event_set()
            PROCESS.process_set()
            SPRING.spring_set()

            APP.app_set(app)

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
    function app_c$App()     { console.log(APP) }

    function app_c$Router()  { console.log(ROUTER) }

    function app_c$Command() { console.log(COMMAND) }

    function app_c$Event()   { console.log(EVENT) }


//=======@EVENTS|

    // --*
    async function app_eTouchStart() { APP.app_$MOBILE = true }


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
    @use './assets/scss/styles/utils';

    /* --MEDIA  */


/* #\-VARIABLES-\ */

    /* --* */


/* #\-THIS-\ */

#app
{
    @include utils.fixed;

    @extend %scroll-bar;

    overflow:            clip scroll;
    overscroll-behavior: none;

    background-color: $dark;

    &.freeze { overflow: clip !important; }
}


</style>