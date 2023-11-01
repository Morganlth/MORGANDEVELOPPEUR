<!-- #MAP

-APP
-COMMANDS
-EVENT
-SPRING
    APP
        #if
            HEADER
            MAIN
            ASIDE
            FOOTER

        #if OPTI

-->

<!-- #SCRIPT -->

<script
context="module"
>
// #EXPORTS

    // --CONTEXTS
    export const
    APP = a,
    ROUTER = r,
    COMMAND = c,
    EVENT = e,
    PROCESS = p,
    SPRING = s

// #IMPORTS

    // --CONTEXTS
    import a from './assets/js/managers/mApp'
    import r from './assets/js/managers/mRouter'
    import c from './assets/js/managers/mCommand'
    import e from './assets/js/managers/mEvent'
    import p from './assets/js/managers/mProcess'
    import s from './assets/js/managers/mSpring'
</script>

<script>
// #EXPORTS

    // --PROPS
    export let
    prop_PAGE_ID = 0,
    prop_SUBPATH = void ''

// #IMPORTS

    // --SVELTE
    import { onMount, onDestroy } from 'svelte'

    // --COMPONENT-FIELDS
    import Header from './components/fields/Header.svelte'
    import Main from './components/fields/Main.svelte'
    import Footer from './components/fields/Footer.svelte'

    // --COMPONENT-WARN
    import Opti from './components/warn/Opti.svelte'

// #CONSTANTE

    // --ELEMENT-APP
    const APP_PERFORMANCE = performance.now()

// #VARIABLES

    // --APP
    let app_$FREEZE = APP.app_$FREEZE

    // --ELEMENT-APP
    let app_FONTS_CHARGED = false

    // --ELEMENT-MAIN
    let main_CHARGED = false

    // --ELEMENT-OPTI
    let opti_ON = false

// #REACTIVE

    // --ELEMENT-MAIN
    $: main_CHARGED ? app_setContexts() : void 0

// #FUNCTIONS

    // --SET
    function app_set()
    {
        APP.app_updateSize()

        opti_setVars()

        app_setCommands()

        document.fonts.ready.then(() => app_FONTS_CHARGED = true)
    }

    function app_setContexts()
    {
        SPRING.spring_set() // set command
        APP.app_set()
        ROUTER.router_set(prop_PAGE_ID, prop_SUBPATH)
        EVENT.event_set()
        PROCESS.process_set()
    }

    function app_setCommands()
    {
        COMMAND.command_add('app', app_c$App)
        COMMAND.command_add('router', app_c$Router)
        COMMAND.command_add('command', app_c$Command)
        COMMAND.command_add('event', app_c$Event)
    }

    function opti_setVars() { opti_ON = (performance.now() - APP_PERFORMANCE) > 7 && localStorage.getItem('optimise') !== 'true' }

    // --DESTROY
    function app_destroy() { EVENT.event_destroy() }

    // --COMMANDS
    function app_c$App() { console.log(APP) }

    function app_c$Router() { console.log(ROUTER) }

    function app_c$Command() { console.log(COMMAND) }

    function app_c$Event() { console.log(EVENT) }

    // --EVENT
    async function app_eTouchStart() { APP.app_$MOBILE = true }

// #CYCLES

onMount(app_set)
onDestroy(app_destroy)
</script>

<!-- #HTML -->

<!-- svelte-ignore a11y-no-static-element-interactions -->
<div
id="app"
class:freeze={$app_$FREEZE}
style:visibility={app_FONTS_CHARGED ? 'visible' : 'hidden'}
on:scroll={EVENT.event_scroll.bind(EVENT)}
on:mousemove={EVENT.event_mouseMove.bind(EVENT)}
on:mousedown={EVENT.event_mouseDown.bind(EVENT)}
on:mouseup={EVENT.event_mouseUp.bind(EVENT)}
on:mouseleave={EVENT.event_mouseUp.bind(EVENT)}
on:touchstart|once={app_eTouchStart}
>
    {#if app_FONTS_CHARGED && !opti_ON}
        <Header />
        <Main
        bind:main_CHARGED
        />
        <Footer />
    {/if}

    {#if opti_ON}
        <Opti
        bind:opti_ON
        />
    {/if}
</div>

<!-- #STYLE -->

<style
lang="scss"
>
/* #USES */

@use './assets/scss/app';

@use './assets/scss/styles/utils';
@use './assets/scss/styles/size';

/* #GLOBAL */

:global
{
    @extend %global;

    a, img { @extend %no-drag; }
}

/* #APP */

#app
{
    @extend %scroll-bar;
    @extend %any;

    overflow: clip scroll;

    background-color: $dark;

    &.freeze { overflow: clip !important; }
}
</style>