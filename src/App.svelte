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
    import { onMount, onDestroy } from 'svelte'

    // --COMPONENT-FIELDS
    import Header from './components/fields/Header.svelte'
    import Main from './components/fields/Main.svelte'
    import Footer from './components/fields/Footer.svelte'

    // --COMPONENT-WARN
    import Opti from './components/warn/Opti.svelte'

// #CONSTANTE

    // --ELEMENT-APP
    const APP_START = performance.now()

// #VARIABLE

    // --ELEMENT-APP
    let app_OPACITY = 0

    // --ELEMENT-SPRING
    let
    spring_$ON = SPRING.spring_$ON,
    spring_$COORDS = SPRING.spring_$COORDS,
    spring_$SIZE = SPRING.spring_$SIZE

    // --ELEMENT-OPTI
    let opti_ON = false

// #FUNCTION

    // --SET
    function app_set()
    {
        opti_setVar()

        app_setContexts()
        app_setCommands()

        app_update()
    }

    function opti_setVar() { opti_ON = (performance.now() - APP_START) > 250 && localStorage.getItem('optimise') !== 'true' }

    function app_setContexts()
    {
        APP.app_set()
        EVENT.event_set()
        SPRING.spring_set()
    }

    function app_setCommands()
    {
        COMMAND.command_add('app', app_app)
        COMMAND.command_add('command', app_command)
        COMMAND.command_add('event', app_event)
    }

    // --DESTROY
    function app_destroy() { EVENT.event_destroy() }

    // --UPDATE
    function app_update()
    {
        APP.app_restore()
        APP.app_setFormat() // after app_restore()

        app_OPACITY = 1

        if (!opti_ON) APP.app_START = true
    }

    // --COMMANDS
    function app_app() { console.log(APP) }

    function app_command() { console.log(COMMAND) }

    function app_event() { console.log(EVENT) }

    // #EVENT
    async function app_touchStart() { APP.app_MOBILE = true }

// #CYCLES

onMount(app_set)
onDestroy(app_destroy)
</script>

<!-- #HTML -->

<!-- svelte-ignore a11y-no-static-element-interactions -->
<div
id="app"
style:opacity={app_OPACITY}
on:mousemove={EVENT.event_mouseMove.bind(EVENT)}
on:mousedown={EVENT.event_mouseDown.bind(EVENT)}
on:mouseup={EVENT.event_mouseUp.bind(EVENT)}
on:mouseleave={EVENT.event_mouseUp.bind(EVENT)}
on:touchstart|once={app_touchStart}
>
    <Header />

    <Main />

    <Footer />

    {#if opti_ON}
        <Opti
        bind:opti_ON
        />
    {:else if $spring_$ON}
        <svg
        class="spring"
        >
            <circle
            cx={$spring_$COORDS.x}
            cy={$spring_$COORDS.y}
            r={Math.abs($spring_$SIZE)}
            />
        </svg>
    {/if}
</div>

<!-- #STYLE -->

<style
lang="scss"
>
/* #USES */

@use './assets/scss/styles/elements';
@use './assets/scss/styles/position';
@use './assets/scss/styles/size';
@use './assets/scss/styles/media';

/* #GLOBAL */

:global
{
    /* #RESET */

    body, h1, h2, h3, h4, h5, h6, ul, p, figure, blockquote, pre { margin: 0; }
    ul, button, input, input[type="text"], textarea { padding: 0; }

    li { list-style: none; }

    a, img { @extend %no-drag }

    /* #FONT */

    @font-face
    {
        font-family: 'CodeNext';
        src: url('./fonts/CodeNext/CodeNext-Trial-Black.ttf');
    }
    @font-face
    {
        font-family: 'AnonymousPro';
        src: url('./fonts/AnonymousPro/AnonymousPro.ttf');
    }

    /* #SET */

    html
    {
        /* overflow: hidden; padding-top: 16vh; box-sizing: border-box; width: 100vw; height: 100vh; body { transform: scale(1); } body, body>div, #app { overflow: hidden; width: 100%; height: 100%; } */

        &, body, body>div, #app
        {
            overflow: hidden;

            width: 100vw;
            height: 100vh;
        }

        font-size: 31.25%;

        body { background-color: $dark; }

        @include media.min($ms4) { font-size: 46.875%; }
        @include media.min($ms6) { font-size: 62.5%; }
    }
}

/* #APP */

#app
{
    .spring
    {
        @include position.placement(absolute, 0, 0, 0, 0);
        
        @extend %any;

        z-index: 3;

        mix-blend-mode: difference;

        pointer-events: none;

        circle { fill: $light; }
    }
}
</style>