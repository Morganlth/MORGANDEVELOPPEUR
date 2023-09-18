<!-- #MAP

-APP
-ROUTER
-EVENT
    PAGES
        HOME
        PRESENTATION

-->

<!-- #SCRIPT -->

<script>
// #IMPORTS

    // --JS
    import { wait_throttle } from '../../assets/js/utils/wait'

    // --CONTEXTS
    import { APP, ROUTER, EVENT } from '../../App.svelte'

    // --SVELTE
    import { onMount, onDestroy } from 'svelte'

    // --COMPONENT-PAGES
    import Home from '../pages/Home.svelte'
    import Presentation from '../pages/Presentation.svelte'
    import Skills from '../pages/Skills.svelte'

// #CONSTANTES

    // --ELEMENT-PAGES
    const
    PAGES_PAGES =
    [
        {
            id: 2,
            name: 'skills',
            component: Skills,
            start: 8,
            end: 4,
            props: {}
        },
        {
            id: 1,
            name: 'presentation',
            component: Presentation,
            start: 1,
            end: 7,
            props: {}
        },
        {
            id: 0,
            name: 'home',
            component: Home,
            end: 1,
            props: {}
        }
    ],
    PAGES_EVENTS =
    {
        scroll: wait_throttle(pages_e$Scroll, 20),
        resize: pages_e$Resize
    }

// #VARIABLES

    // --APP
    let app_$HIDE = APP.app_$HIDE

    // --ROUTER
    let router_$ID = ROUTER.router_$ID

// #FUNCTIONS

    // --SET
    function pages_set()
    {
        pages_setVars()
        pages_setEvents()
    
        router_setPages()
    }

    function pages_setVars()
    {
        const HEIGHT = window.innerHeight

        for (const PAGE of PAGES_PAGES)
        {
            PAGE.props.prop_START = (PAGE.start ?? 0) * HEIGHT
            PAGE.props.prop_END = PAGE.end * HEIGHT

            PAGES_PAGES[PAGE] = PAGE
        }
    }

    function pages_setEvents() { EVENT.event_add(PAGES_EVENTS) }

    function router_setPages() { for (const PAGES of PAGES_PAGES) ROUTER.router_add(PAGES.id, PAGES.name, PAGES.props.prop_START) }

    // --DESTROY
    function pages_destroy() { pages_destroyEvents() }

    function pages_destroyEvents() { EVENT.event_remove(PAGES_EVENTS) }

    // --GET
    function pages_getHeight()
    {
        const { start, end } = PAGES_PAGES[0]
    
        return (start + end + 1) * 100
    }

    // --EVENTS
    async function pages_e$Scroll(scrollTop)
    {
        for (const PAGE of PAGES_PAGES)
        {
            PAGE.props.prop_RATIO = (scrollTop - PAGE.props.prop_START) / PAGE.props.prop_END

            PAGES_PAGES[PAGE] = PAGE
        }
    }

    async function pages_e$Resize()
    {
        pages_setVars()

        router_setPages()
    }

// #CYCLES

onMount(pages_set)
onDestroy(pages_destroy)
</script>

<!-- #HTML -->

<main
class="pages"
class:hide={$app_$HIDE}
style:height="{pages_getHeight()}vh"
>
    {#each PAGES_PAGES as page}
        <svelte:component
        this={page.component}
        prop_FOCUS={$router_$ID === page.id}
        {...page.props}
        />
    {/each}
</main>

<!-- #STYLE -->

<style>
/* #PAGES */

.pages
{
    position: relative;

    opacity: 1;

    width: 100vw;

    transition: opacity .2s;

    &.hide { opacity: 0; }
}
</style>