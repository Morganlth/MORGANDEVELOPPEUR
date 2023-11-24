<!----------------------------------------------- #||--main--|| -->


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

<main
class="main"
style:height="{MAIN_HEIGHT}%"
>
    <Particles />

    <Pages
    prop_DATA={DATA}
    bind:pages_e$Scroll
    />

    <Router
    prop_HIDE={$router_$HIDE}
    prop_ROUTES={ROUTER_LINKS}
    />

    <Spring />
</main>


<!-- #|-SCRIPT-| -->

<script>

// #\-IMPORTS-\

    // --DATA
    import DATA from '../assets/js/data/appData'

    // --SVELTE
    import { onMount, onDestroy, tick } from 'svelte'

    // --LIB
    import { wait_throttle, wait_getDelay } from '$lib/wait'

    // --CONTEXTS
    import { APP, ROUTER, EVENT } from '../App.svelte'

//=======@COMPONENTS|

    // --*
    import Particles from './Particles.svelte'
    import Pages     from './pages/Pages.svelte'
    import Router    from './router/Router.svelte'
    import Spring    from './Spring.svelte'
    
//=======@STYLE|

    // --*


// #\-EXPORTS-\

    // --PROPS

    // --BINDING
    export let main_CHARGED = false


// #\-CONSTANTES-\

    // --SVELTE

    // --CONTEXTS

    // --OUTSIDE

    // --THIS
    const
    MAIN_DELAY = wait_getDelay(3)
    ,
    MAIN_HEIGHT = DATA.reduce((accumulator, page) => accumulator + page.h, 0) * 100
    ,
    MAIN_EVENTS = { scroll: wait_throttle(main_e$Scroll, 1, 2) } // +- 20ms, +- 30ms

    // --INSIDE
    const ROUTER_LINKS = DATA.map(page => router_getRoute(page))


// #\-VARIABLES-\

    // --CONTEXTS
    let router_$HIDE = ROUTER.router_$HIDE

    // --OUTSIDE

    // --THIS
    let main_TIMEOUT

    // --INSIDE
    let pages_e$Scroll

    let router_INTERVAL


// #\-REATIVES-\

    // --CONTEXTS

    // --OUTSIDE

    // --THIS

    // --INSIDE


// #\-FUNCTIONS-\

//=======@LIFE|

    // --SVELTE
    onMount(main_set), onDestroy(main_destroy)

    // --SET
    async function main_set()
    {
        main_setEvents()
    
        router_setVars()

        await tick()

        main_CHARGED = true
    }

    function main_setEvents() { EVENT.event_add(MAIN_EVENTS) }

    function router_setVars()
    {
        let i = 0

        router_INTERVAL = setInterval(() =>
        {
            ROUTER_LINKS[i] = { ...ROUTER_LINKS[i], actif: true }

            if (++i >= ROUTER_LINKS.length) router_destroyInterval()
        }, 400)
    }

    // --GET
    function router_getRoute(page) { return { id: page.id, ...page.route } }

    // --UPDATES
    function main_update(scrollTop) // synchronise ROUTER and PAGES
    {
        ROUTER.router_e$Scroll(scrollTop)

        pages_e$Scroll(scrollTop)
    }

    // --DESTROY
    function main_destroy()
    {
        main_destroyTimeout()
        main_destroyEvents()

        router_destroyInterval()
    }

    function main_destroyTimeout() { clearTimeout(main_TIMEOUT) }

    function main_destroyEvents() { EVENT.event_remove(MAIN_EVENTS) }

    function router_destroyInterval() { clearInterval(router_INTERVAL) }


//=======@COMMANDS|

    // --*


//=======@EVENTS|

    // --*
    async function main_e$Scroll(scrollTop)
    {
        main_destroyTimeout()

        main_TIMEOUT = setTimeout(() => main_update(APP.app_SCROLLTOP), MAIN_DELAY)

        main_update(scrollTop)
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

    /* --DEPENDENCIES */

    /* --MEDIA */


/* #\-VARIABLES-\ */

    /* --* */


/* #\-THIS-\ */

.main
{
    position: relative;

    /* overflow: clip; */
    
    width:      100vw;
    min-height: 100vh;
    min-height: 100svh;

    pointer-events: none;
}


</style>