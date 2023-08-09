<!-- #SCRIPT -->

<script
context="module"
>
// #EXPORTS

    // --CONTEXTS
    export const APP = a
    export const EVENT = e
    export const SPRING = s

// #IMPORTS

    // --CONTEXTS
    import a from './assets/js/managers/appManager'
    import e from './assets/js/managers/eventManager'
    import s from './assets/js/managers/springManager'
</script>

<script>
// #IMPORTS

    // --SVELTE
    import { onMount, onDestroy } from 'svelte'

    // --COMPONENT-FIELDS
    import Header from './components/fields/Header.svelte'
    import Main from './components/fields/Main.svelte'
    import Footer from './components/fields/Footer.svelte'

// #VARIABLE

    // --ELEMENT-APP
    let app_OPACITY = 0

    // --ELEMENT-SPRING
    let
    spring_COORDS = SPRING.spring_COORDS,
    spring_SIZE = SPRING.spring_SIZE

// #FUNCTION

    // --SET
    function app_set()
    {
        app_setContexts()
        app_setCommands()

        APP.app_restore()
        APP.app_setFormat()

        app_OPACITY = 1
    }

    function app_setContexts()
    {
        EVENT.event_set()
        SPRING.spring_set()
    }

    function app_setCommands()
    {
        APP.app_add('app', app_app)
        APP.app_add('event', app_event)
    }

    // --DESTROY
    function app_destroy() { EVENT.event_destroy() }

    // --COMMANDS
    function app_app() { console.log(APP) }

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

    <svg
    class="spring"
    >
	    <circle
        cx={$spring_COORDS.x}
        cy={$spring_COORDS.y}
        r={$spring_SIZE < 0 ? 0 : $spring_SIZE}
        />
    </svg>
</div>

<!-- #STYLE -->

<style
lang="scss"
>
/* #USES */

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

    a, img
    {
        -webkit-user-drag: none;
        -webkit-app-region: no-drag;
    }

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

        @include media.min($ms4) { font-size: 46.875%; }
        @include media.min($ms6) { font-size: 62.5%; }
    }
}

/* #APP */

#app
{
    background-color: $light;

    .spring
    {
        @include position.placement(absolute, 0, 0, 0, 0);
        
        @extend %any;

        z-index: 2;

        mix-blend-mode: difference;

        pointer-events: none;

        circle { fill: $light; }
    }
}
</style>