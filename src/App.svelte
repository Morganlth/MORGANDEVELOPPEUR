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

        APP.app_restore()

        app_OPACITY = 1
    }

    function app_setContexts()
    {
        EVENT.event_set()
        SPRING.spring_set()
    }

    // --DESTROY
    function app_destroy() { EVENT.event_destroy() }

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

@use './assets/scss/styles/_position';
@use './assets/scss/styles/_size';

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