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
    import Projects from '../pages/Projects.svelte'

// #CONSTANTES

    // --ELEMENT-PAGES
    const
    PAGES_PAGES =
    [
        {
            id: 3,
            name: 'projects',
            component: Projects,
            start: 15,
            end: 16,
            overflow: false,
            props: {}
        },
        {
            id: 2,
            name: 'skills',
            component: Skills,
            start: 9,
            end: 14,
            overflow: true,
            props: {}
        },
        {
            id: 1,
            name: 'presentation',
            component: Presentation,
            start: 1.3,
            end: 8,
            overflow: true,
            props: {}
        },
        {
            id: 0,
            name: 'home',
            component: Home,
            end: 1,
            overflow: false,
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
        pages_setPages()
        pages_setEvents()
    
        router_setPages()
    }

    function pages_setPages()
    {
        const [HEIGHT, SCROLLTOP] = [window.innerHeight, APP.app_SCROLLTOP ?? 0]

        let end = 0

        for (let i = PAGES_PAGES.length - 1; i >= 0; i--)
        {
            const PAGE = PAGES_PAGES[i]
    
            PAGE.props.prop_TOP = end * HEIGHT
            PAGE.props.prop_START = (PAGE.start ?? 0) * HEIGHT
            PAGE.props.prop_END = PAGE.end * HEIGHT
            PAGE.props.prop_DIF = PAGE.props.prop_END - PAGE.props.prop_START
            PAGE.props.prop_INTRO = pages_getIntro(PAGE.props.prop_TOP, SCROLLTOP)

            PAGES_PAGES[i] = PAGE

            end = PAGE.end
        }

        pages_update(SCROLLTOP)
    }

    function pages_setEvents() { EVENT.event_add(PAGES_EVENTS) }

    function router_setPages() { for (const PAGES of PAGES_PAGES) ROUTER.router_add(PAGES.id, PAGES.name, PAGES.props.prop_TOP) }

    // --DESTROY
    function pages_destroy() { pages_destroyEvents() }

    function pages_destroyEvents() { EVENT.event_remove(PAGES_EVENTS) }

    // --GET
    function pages_getHeight() { return (PAGES_PAGES[0].end + 1) * 100 }

    function pages_getIntro(start, scrollTop)
    {
        const DIF = scrollTop - start

        return DIF >= 0 && DIF < window.innerHeight
    }

    // --UPDATE
    function pages_update(scrollTop)
    {
        for (const PAGE of PAGES_PAGES)
        {
            const RATIO = (scrollTop - PAGE.props.prop_START) / PAGE.props.prop_DIF

            PAGE.props.prop_RATIO = PAGE.overflow ? RATIO : RATIO < 0 ? 0 : RATIO > 1 ? 1 : RATIO
            PAGE.props.prop_INTRO = pages_getIntro(PAGE.props.prop_TOP, scrollTop)

            PAGES_PAGES[PAGE] = PAGE
        }
    }

    // --EVENTS
    async function pages_e$Scroll(scrollTop) { pages_update(scrollTop) }

    async function pages_e$Resize()
    {
        pages_setPages()

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

    transition: opacity .4s ease-in;

    &.hide
    {
        opacity: 0;

        transition: none;
    }
}
</style>