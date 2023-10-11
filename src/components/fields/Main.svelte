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
    import PAGES_DATAS from '../../assets/js/app'
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
    const
    MAIN = 'main',
    MAIN_HEIGHT = PAGES_DATAS.reduce((accumulator, page) => accumulator + page.h, 0) * 100,
    MAIN_EVENTS =
    {
        scroll: wait_throttle(main_e$Scroll, 16.67),
        resize: main_e$Resize
    }

    // --ELEMENT-PAGES
    const PAGES_PAGES = pages_get()

    // --ELEMENT-ROUTER
    const ROUTER_LINKS = PAGES_DATAS.map(page => router_getRoute(page))

// #VARIABLES

    // --APP
    let app_$HIDE = APP.app_$HIDE

    // --ROUTER
    let
    router_$ID = ROUTER.router_$ID,
    router_$HIDE = ROUTER.router_$HIDE

    // --ELEMENT-MAIN
    let main_CHARGED = false

    // --ELEMENT-ROUTER
    let router_INTERVAL

// #REACTIVE

    // --ROUTER
    $: pages_updateFocus($router_$ID)

// #FUNCTIONS

    // --SET
    function main_set()
    {
        main_setEvents()

        pages_setPages()
    
        router_intro()

        main_CHARGED = true
    }

    function main_setEvents() { EVENT.event_add(MAIN_EVENTS) }

    function pages_setPages()
    {
        let h = 0

        for (let i = PAGES_PAGES.length - 1; i >= 0; i--)
        {
            const PAGE = PAGES_PAGES[i]
    
            page_setVars(PAGE, i, h)
    
            ROUTER.router_add(PAGE)

            h += PAGE.h
        }

        pages_update(APP.app_SCROLLTOP ?? 0)
    }

    function page_setVars(page, i, h)
    {
        const HEIGHT = window.innerHeight

        page_updateProps(page, i,
        {
            prop_TOP: (page.top = h * HEIGHT),
            prop_INTRO: (page.intro = page_getIntro(page.top, APP.app_SCROLLTOP ?? 0)),
            prop_START: (page.start = (h + (page.h > 1 ? 1 : 0)) * HEIGHT),
            prop_END: (page.end = (h + page.h) * HEIGHT),
            prop_DIF: (page.dif = page.end - page.start)
        })
    }

    // --DESTROY
    function main_destroy()
    {
        router_clear()

        main_destroyEvents()
    }

    function main_destroyEvents() { EVENT.event_remove(MAIN_EVENTS) }

    // --GET
    function pages_get()
    {
        return PAGES_DATAS.map((page, i) =>
        {
            return {
            ...page,
            component:  [Home, Presentation, Skills, Projects][i],
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
            RATIO = (scrollTop - PAGE.start) / PAGE.dif

            page_updateProps(PAGE, i,
            {
                prop_INTRO: (PAGE.intro = page_getIntro(PAGE.top, scrollTop)),
                prop_RATIO: PAGE.overflow ? RATIO : RATIO < 0 ? 0 : RATIO > 1 ? 1 : RATIO
            })

            if (PAGE.focus) ROUTER.router_$HIDE = { value: !PAGE.intro, target: MAIN }
        }
    }

    function pages_updateFocus(id)
    {
        for (let i = 0; i < PAGES_PAGES.length; i++)
        {
            const PAGE = PAGES_PAGES[i]
    
            PAGE.focus = PAGE.id === id

            page_updateProps(PAGE, i, { prop_FOCUS: PAGE.focus })
        }
    }

    function page_updateProps(page, i, props = {})
    {
        for (const KEY in props) if (KEY in page.props) page.props[KEY] = props[KEY]

        PAGES_PAGES[i] = page
    }

    // --EVENTS
    async function main_e$Scroll(scrollTop)
    {
        ROUTER.router_e$Scroll()

        pages_update(scrollTop)
    }

    async function main_e$Resize() { pages_setPages() }

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
            prop_PAGE={page}
            />
        {/each}
    </div>

    <Router
    prop_ROUTES={ROUTER_LINKS}
    prop_HIDE={$router_$HIDE}
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