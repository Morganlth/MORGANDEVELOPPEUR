<!-- #MAP

-APP
-ROUTER
-EVENT
    MAIN
        PAGES
            PAGE * 4
                HOME | PRESENTATION | SKILLS | PROJECTS

        ROUTER

-->

<!-- #SCRIPT -->

<script>
// #IMPORTS

    // --JS
    import PAGES_DATAS from '../../assets/js/datas/dPages'
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

    // --COMPONENT-COVER
    import Page from '../covers/Page.svelte'

    // --COMPONENT-ELEMENT
    import Router from '../elements/Router.svelte'

// #CONSTANTES

    // --ELEMENT-MAIN
    const MAIN_HEIGHT = PAGES_DATAS.reduce((accumulator, page) => accumulator + page.h, 0) * 100

    // --ELEMENT-PAGES
    const
    PAGES_PAGES = pages_get(),
    PAGES_EVENTS =
    {
        scroll: wait_throttle(pages_e$Scroll, 20),
        resize: pages_e$Resize
    }

    // --ELEMENT-ROUTER
    const ROUTER_LINKS = PAGES_DATAS.map(page => router_getRoute(page))

// #VARIABLES

    // --APP
    let app_$HIDE = APP.app_$HIDE

    // --ROUTER
    let router_$ID = ROUTER.router_$ID

    // --ELEMENT-ROUTER
    let
    router_OPACITY = 1,

    router_INTERVAL

// #REACTIVE

    // --ROUTER
    $: pages_updateFocus($router_$ID)

// #FUNCTIONS

    // --SET
    function main_set()
    {
        pages_setPages()
        pages_setEvents()
    
        router_setPages()
        router_intro()
    }

    function pages_setPages()
    {
        let h = 0

        for (let i = PAGES_PAGES.length - 1; i >= 0; i--)
        {
            const PAGE = PAGES_PAGES[i]
    
            pages_setVars(PAGE, h)

            PAGES_PAGES[i] = PAGE

            h += PAGE.h
        }

        pages_update(APP.app_SCROLLTOP ?? 0)
    }

    function pages_setVars(page, h)
    {
        const HEIGHT = window.innerHeight
    
        page.top = h * HEIGHT
    
        page.props.prop_START = (h + (page.h > 1 ? 1 : 0)) * HEIGHT
        page.props.prop_END = (h + page.h) * HEIGHT
        page.props.prop_DIF = page.props.prop_END - page.props.prop_START
        page.props.prop_INTRO = page_getIntro(page.top, APP.app_SCROLLTOP ?? 0)
    }

    function pages_setEvents() { EVENT.event_add(PAGES_EVENTS) }

    function router_setPages() { for (const PAGE of PAGES_PAGES) ROUTER.router_add(PAGE) }

    // --DESTROY
    function main_destroy()
    {
        router_clear()

        pages_destroyEvents()
    }

    function pages_destroyEvents() { EVENT.event_remove(PAGES_EVENTS) }

    // --GET
    function pages_get()
    {
        return PAGES_DATAS.map((page, i) =>
        {
            return {
            ...page,
            component:  [Home, Presentation, Skills, Projects][i],
            props: {}
            }
        }).reverse()
    }

    function page_getIntro(start, scrollTop)
    {
        const DIF = scrollTop - start

        return DIF >= 0 && DIF < window.innerHeight
    }

    function router_getRoute(page) { return { id: page.id, ...page.link } }

    // --UPDATES
    function pages_update(scrollTop)
    {
        for (let i = 0; i < PAGES_PAGES.length; i++)
        {
            const
            PAGE = PAGES_PAGES[i],
            INTRO = page_getIntro(PAGE.top, scrollTop),
            RATIO = (scrollTop - PAGE.props.prop_START) / PAGE.props.prop_DIF

            PAGE.props.prop_INTRO = INTRO
            PAGE.props.prop_RATIO = PAGE.overflow ? RATIO : RATIO < 0 ? 0 : RATIO > 1 ? 1 : RATIO

            if (PAGE.props.prop_FOCUS) router_OPACITY = INTRO ? 1 : .1

            PAGES_PAGES[i] = PAGE
        }
    }

    function pages_updateFocus(id)
    {
        for (let i = 0; i < PAGES_PAGES.length; i++)
        {
            const PAGE = PAGES_PAGES[i]
    
            PAGE.props.prop_FOCUS = PAGE.id === id

            PAGES_PAGES[i] = PAGE
        }
    }

    // --EVENTS
    async function pages_e$Scroll(scrollTop) { pages_update(scrollTop) }

    async function pages_e$Resize()
    {
        pages_setPages()

        router_setPages()
    }

    // --INTRO
    function router_intro()
    {
        let i = 0

        router_INTERVAL = setInterval(() =>
        {
            ROUTER_LINKS[i] = { ...ROUTER_LINKS[i], actif: true }

            if (++i >= ROUTER_LINKS.length) router_clear()
        }, 400)
    }

    // --CLEAR
    function router_clear() { clearInterval(router_INTERVAL) }

// #CYCLES

onMount(main_set)
onDestroy(main_destroy)
</script>

<!-- #HTML -->

<main
class="main"
style:height="{MAIN_HEIGHT}vh"
>
    <div
    class="pages"
    class:hide={$app_$HIDE}
    >
        {#each PAGES_PAGES as page (page.id)}
            <Page
            prop_FOCUS={page.props.prop_FOCUS}
            >
                <svelte:component
                this={page.component}
                {...page.props}
                />
            </Page>
        {/each}
    </div>

    <Router
    prop_ROUTES={ROUTER_LINKS}
    prop_OPACITY={router_OPACITY}
    />
</main>

<!-- #STYLE -->

<style
lang="scss"
>
/* #USE */

@use '../../assets/scss/styles/size';

/* #MAIN */

.main
{
    width: 100vw;

    .pages
    {
        @extend %any;

        position: relative;

        opacity: 1;

        transition: opacity .4s ease-in;

        &.hide
        {
            opacity: 0;

            transition: none;
        }
    }
}
</style>