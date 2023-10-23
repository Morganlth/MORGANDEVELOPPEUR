<!-- #MAP

-APP
-ROUTER
-EVENT
    MAIN
        PARTICLES
        PAGES
            PAGE * 4
                HOME | PRESENTATION | SKILLS | PROJECTS
        ROUTER
        SPRING

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

    // --COMPONENT-COVER
    import Page from '../covers/Page.svelte'

    // --COMPONENT-ELEMENTS
    import Router from '../elements/Router.svelte'
    import Spring from '../elements/Spring.svelte'

    // --COMPONENT-DECOR
    import Particles from '../decors/Particles.svelte'

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
    let
    main_CHARGED = false,

    main_TIMEOUT

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

        for (let i = 0; i < PAGES_DATAS.length; i++)
        {
            const PAGE = PAGES_DATAS[i]
    
            page_setVars(PAGE, i, h)
    
            ROUTER.router_add(PAGE)

            h += PAGE.h
        }

        pages_update(APP.app_SCROLLTOP ?? 0)
    }

    function page_setVars(page, i, h)
    {
        page.end = (h + page.h + (page.endgap ?? 0)) * APP.app_HEIGHT

        page_updateProps(page, i,
        {
            prop_TOP: (page.top = h * APP.app_HEIGHT),
            prop_INTRO: (page.intro = page_getIntro(page.top, APP.app_SCROLLTOP ?? 0)),
            prop_START: (page.start = (h + (page.h > 1 ? 1 : 0) + (page.startgap ?? 0)) * APP.app_HEIGHT),
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
    function page_getIntro(start, scrollTop)
    {
        const DIF = scrollTop - start

        return DIF >= 0 && DIF < APP.app_HEIGHT
    }

    function page_getRatio(start, dif, overflow, scrollTop)
    {
        const RATIO = ((scrollTop ?? APP.app_SCROLLTOP) - start) / dif

        return overflow ? RATIO : RATIO < 0 ? 0 : RATIO > 1 ? 1 : RATIO
    }

    function router_getRoute(page) { return { id: page.id, ...page.route } }

    // --UPDATES
    function main_update(scrollTop)
    {
        ROUTER.router_e$Scroll(scrollTop)

        pages_update(scrollTop)
    }

    function pages_update(scrollTop)
    {
        for (let i = 0; i < PAGES_DATAS.length; i++)
        {
            const PAGE = PAGES_DATAS[i]

            page_updateProps(PAGE, i,
            {
                prop_INTRO: (PAGE.intro = page_getIntro(PAGE.top, scrollTop)),
                prop_RATIO: page_getRatio(PAGE.start, PAGE.dif, PAGE.overflow, scrollTop)
            })

            if (PAGE.focus) router_update(!PAGE.intro)
        }
    }

    function pages_updateFocus(id)
    {
        for (let i = 0; i < PAGES_DATAS.length; i++)
        {
            const PAGE = PAGES_DATAS[i]
    
            PAGE.focus = PAGE.id === id

            page_updateProps(PAGE, i, { prop_FOCUS: PAGE.focus })
        }
    }

    function page_updateProps(page, i, props = {})
    {
        for (const KEY in props) if (KEY in page.props) page.props[KEY] = props[KEY]

        PAGES_DATAS[i] = page
    }

    function router_update(value) { if (ROUTER.router_$HIDE.value !== value) ROUTER.router_$HIDE = { value, target: MAIN } }

    // --EVENTS
    async function main_e$Scroll(scrollTop)
    {
        clearTimeout(main_TIMEOUT)

        main_TIMEOUT = setTimeout(() => main_update(APP.app_SCROLLTOP), 50.01)

        main_update(scrollTop)
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
    <Particles />

    <div
    class="pages"
    class:hide={$app_$HIDE}
    >
        {#each PAGES_DATAS as page (page.id)}
            <Page
            prop_ID={page.id}
            prop_NAME={page.name}
            prop_FOCUS={page.focus}
            prop_INTRO={page.intro}
            prop_COMPONENT={page.component}
            prop_INFO={page.info}
            prop_TITLE={page.title}
            prop_NAV={page.nav}
            prop_PROPS={page.props}
            prop_PROCESS={page.process}
            />
        {/each}
    </div>

    <Router
    prop_ROUTES={ROUTER_LINKS}
    prop_HIDE={$router_$HIDE}
    />

    <Spring />
</main>

<!-- #STYLE -->

<style
lang="scss"
>
/* #USES */

@use '../../assets/scss/styles/position';
@use '../../assets/scss/styles/size';

/* #MAIN */

.main
{
    position: relative;

    width: 100vw;

    .pages
    {
        @include position.placement(absolute, 0, 0, 0, 0);
    
        @extend %any;

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