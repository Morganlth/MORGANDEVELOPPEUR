<!----------------------------------------------- #||--pages--|| -->


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

<div
class="pages"
class:hide={$app_$HIDE}
>
    {#each prop_DATA as page (page.id)}
        <Page
        prop_ID={page.id}
        prop_NAME={page.name}
        prop_FOCUS={page.focus}
        prop_INTRO={page.intro}
        prop_Z={page.focus ? PAGE_Z : PAGE_Z - page.id - 1}
        prop_COMPONENT={page.component}
        prop_LABEL={page.label}
        prop_TITLE={page.title}
        prop_NAV={page.nav}
        prop_QUOTE={page.quote}
        prop_PROPS={page.props}
        prop_PROCESS={page.process}
        />
    {/each}
</div>


<!-- #|-SCRIPT-| -->

<script>

// #\-IMPORTS-\

    // --DATA

    // --SVELTE
    import { onDestroy, onMount } from 'svelte'

    // --LIB

    // --CONTEXTS
    import { APP, ROUTER, EVENT } from '../../App.svelte'

//=======@COMPONENTS|

    // --*
    import Page from './page/Page.svelte'


// #\-EXPORTS-\

    // --PROPS
    export let prop_DATA = {}

    // --BINDING


// #\-CONSTANTES-\

    // --SVELTE

    // --CONTEXTS

    // --OUTSIDE

    // --THIS
    const
    PAGES_NAME = 'pages'
    ,
    PAGES_EVENTS = { resize: pages_e$Resize }

    // --INSIDE
    const PAGE_Z = prop_DATA.length


// #\-VARIABLES-\

    // --CONTEXTS
    let app_$HIDE = APP.app_$HIDE

    let router_$ID = ROUTER.router_$ID

    // --OUTSIDE

    // --THIS

    // --INSIDE


// #\-REATIVES-\

    // --CONTEXTS

    // --OUTSIDE

    // --THIS
    $: pages_updateFocus($router_$ID)

    // --INSIDE


// #\-FUNCTIONS-\

//=======@LIFE|

    // --SVELTE
    onMount(pages_set), onDestroy(pages_destroy)

    // --SET
    function pages_set()
    {
        pages_setVars()
        pages_setEvents()
    }

    function pages_setVars()
    {
        let top = 0

        for (let i = 0; i < prop_DATA.length; i++)
        {
            const PAGE = prop_DATA[i]
    
            page_setVars(PAGE, i, top)
    
            ROUTER.router_add(PAGE)

            top = PAGE.end
        }

        pages_update(APP.app_SCROLLTOP ?? 0)
    }

    function pages_setEvents() { EVENT.event_add(PAGES_EVENTS) }

    function page_setVars(page, i, top)
    {
        [page.end, page.start] = page.h
        ?   [
                (page.h + (0)) * APP.app_HEIGHT + top,
                top + APP.app_HEIGHT
            ]
        :   [1, 1]

        page_updateProps(page, i,
        {
            prop_TOP: (page.top = top),
            prop_INTRO: (page.intro = page_getIntro(page.top, page.start, APP.app_SCROLLTOP ?? 0)),
            prop_START: page.start,
            prop_DIF: (page.dif = page.end - page.start + (page.gap ?? 0) * APP.app_HEIGHT)
        })
    }

    // --GET
    function page_getIntro(top, start, scrollTop) { return scrollTop >= top && scrollTop < start }
    
    function page_getRatio(start, dif, overflow, scrollTop)
    {
        const RATIO = ((scrollTop ?? APP.app_SCROLLTOP) - start) / dif

        return overflow ? RATIO : RATIO < 0 ? 0 : RATIO > 1 ? 1 : RATIO
    }

    // --UPDATES
    function router_updateHide(value) { if (ROUTER.router_$HIDE.value !== value) ROUTER.router_$HIDE = { value, target: PAGES_NAME } }

    function pages_update(scrollTop)
    {
        for (let i = 0; i < prop_DATA.length; i++)
        {
            const PAGE = prop_DATA[i]

            page_updateProps(PAGE, i,
            {
                prop_INTRO: (PAGE.intro = page_getIntro(PAGE.top, PAGE.start, scrollTop)),
                prop_RATIO: page_getRatio(PAGE.start, PAGE.dif, PAGE.overflow, scrollTop)
            })

            if (PAGE.focus) router_updateHide(!PAGE.intro)
        }
    }

    function pages_updateFocus(id)
    {
        for (let i = 0; i < prop_DATA.length; i++)
        {
            const PAGE = prop_DATA[i]
    
            PAGE.focus = PAGE.id === id

            page_updateProps(PAGE, i, { prop_FOCUS: PAGE.focus })
        }
    }

    function page_updateProps(page, i, props = {})
    {
        for (const KEY in props) if (KEY in page.props) page.props[KEY] = props[KEY]

        prop_DATA[i] = page
    }

    // --DESTROY
    function pages_destroy() { pages_destroyEvents() }

    function pages_destroyEvents() { EVENT.event_remove(PAGES_EVENTS) }


//=======@COMMANDS|

    // --*


//=======@EVENTS|

    // --*
    export async function pages_e$Scroll(scrollTop) { pages_update(scrollTop) }

    async function pages_e$Resize() { pages_setVars() }


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
    @use '../../assets/scss/styles/utils';

    /* --MEDIA */


/* #\-VARIABLES-\ */

    /* --* */


/* #\-GLOBAL-\ */

    /* --* */


/* #\-THIS-\ */

.pages
{
    @include utils.placement(absolute, 0, 0, 0, 0);

    @extend %any-size;

    transform: scale(1); /* fixed and z-index */

    transition: filter .4s ease-in-out;

    &.hide { filter: blur(10rem) hue-rotate(30deg); }
}


</style>