<!-- #MAP

    APP
        HEADER
        MAIN
        FOOTER

        #if OPTI
        #else ASIDE

-->

<!-- #SCRIPT -->

<script
context="module"
>
// #EXPORTS

    // --CONTEXTS
    export const APP = a
    export const COMMAND = c
    export const EVENT = e
    export const SPRING = s

// #IMPORTS

    // --CONTEXTS
    import a from './assets/js/managers/mApp'
    import c from './assets/js/managers/mCommand'
    import e from './assets/js/managers/mEvent'
    import s from './assets/js/managers/mSpring'
</script>

<script>
// #IMPORTS

    // --SVELTE
    import { onMount } from 'svelte'

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

// #VARIABLE

    // --ELEMENT-APP
    let
    app_CHARGED = false,
    app_$FREEZE = APP.app_$FREEZE

    // --ELEMENT-OPTI
    let opti_ON = false

// #REACTIVE

    // --ELEMENT-APP
    $: APP.app_$START = app_CHARGED && !opti_ON

// #FUNCTIONS

    // --SET
    function app_set()
    {
        opti_setVars()

        app_setContexts()
        app_setCommands()

        app_restore()

        app_setFormat() // after app_restore()

        app_CHARGED = true
    }

    function opti_setVars() { opti_ON = (performance.now() - APP_PERFORMANCE) > 250 && localStorage.getItem('optimise') !== 'true' }

    function app_setContexts()
    {
        APP.app_set()
        EVENT.event_set()
        SPRING.spring_set()
    }

    function app_setCommands()
    {
        COMMAND.command_add('app', app_c$App)
        COMMAND.command_add('command', app_c$Command)
        COMMAND.command_add('event', app_c$Event)
    }

    function app_setFormat() { APP.app_setFormat() }

    // --RESTORE
    function app_restore() { APP.app_restore() }

    // --COMMANDS
    function app_c$App() { console.log(APP) }

    function app_c$Command() { console.log(COMMAND) }

    function app_c$Event() { console.log(EVENT) }

    // --EVENT
    async function app_eTouchStart() { APP.app_MOBILE = true }

// #CYCLE

onMount(app_set)
</script>

<!-- #HTML -->

<!-- svelte-ignore a11y-no-static-element-interactions -->
<div
id="app"
class:freeze={$app_$FREEZE}
style:opacity={app_CHARGED ? 1 : 0}
on:scroll={EVENT.event_scroll.bind(EVENT)}
on:mousemove={EVENT.event_mouseMove.bind(EVENT)}
on:mousedown={EVENT.event_mouseDown.bind(EVENT)}
on:mouseup={EVENT.event_mouseUp.bind(EVENT)}
on:mouseleave={EVENT.event_mouseUp.bind(EVENT)}
on:touchstart|once={app_eTouchStart}
>
    <Header />
    <Main />
    <Footer />

    {#if opti_ON}
        <Opti
        bind:opti_ON
        />
    {:else}
        <Aside />
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