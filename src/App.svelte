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
    export const APP = a
    export const ROUTER = r
    export const COMMAND = c
    export const EVENT = e
    export const PROCESS = p
    export const SPRING = s

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
// #EXPORT

    // --PROP
    export let prop_PAGE_ID = 0

// #IMPORTS

    // --SVELTE
    import { onMount, afterUpdate } from 'svelte'

    // --COMPONENT-FIELDS
    import Header from './components/fields/Header.svelte'
    import Main from './components/fields/Main.svelte'
    import Footer from './components/fields/Footer.svelte'
    import Aside from './components/fields/Aside.svelte'

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

    // --ELEMENT-OPTI
    let opti_ON = false

// #REACTIVE

    // --ELEMENT-APP
    $: app$_CHARGED = app_FONTS_CHARGED && !opti_ON

// #FUNCTIONS

    // --SET
    function app_set()
    {
        opti_setVars()

        app_setCommands()

        document.fonts.ready.then(() => app_FONTS_CHARGED = true)
    }

    function app_setContexts()
    {
        SPRING.spring_set() // set command
        APP.app_set()
        ROUTER.router_set(prop_PAGE_ID)
        EVENT.event_set()
    }

    function app_setCommands()
    {
        COMMAND.command_add('app', app_c$App)
        COMMAND.command_add('router', app_c$Router)
        COMMAND.command_add('command', app_c$Command)
        COMMAND.command_add('event', app_c$Event)
    }

    function opti_setVars() { opti_ON = (performance.now() - APP_PERFORMANCE) > 7 && localStorage.getItem('optimise') !== 'true' }

    // --UPDATE
    function app_update()
    {
        if (app$_CHARGED)
        {
            app_setContexts()

            app_update = () => {} // destroy func
        }
    }

    // --COMMANDS
    function app_c$App() { console.log(APP) }

    function app_c$Router() { console.log(ROUTER) }

    function app_c$Command() { console.log(COMMAND) }

    function app_c$Event() { console.log(EVENT) }

    // --EVENT
    async function app_eTouchStart() { /* APP.app_MOBILE = true */ }

// #CYCLES

onMount(app_set)

afterUpdate(() => app_update())
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
    {#if app$_CHARGED}
        <Header />
        <Main />
        <Aside />
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
    @extend %any;
    @extend %scroll-bar;

    overflow: hidden scroll;

    background-color: $dark;

    &.freeze { overflow: hidden !important; }
}
</style>