<!----------------------------------------------- #||--pages--|| -->


<!-- #|-CONTEXT-| -->

<!-- <script
context="module"
>

// #\-IMPORTS-\

    // --SVELTE

     // --LIB

    // --JS


// #\-EXPORTS-\

    // --CONTEXTS


</script> -->


<!-- #|-HTML-| -->

<div
class="pages"
class:hide={$app_$HIDE}
>
    {#each prop_DATA as page (page.id)}
        <Page
        prop_ID={page.id}
        prop_NAME={page.name}
        prop_FOCUS={PAGES_REACTIVES[page.id].focus}
        prop_INTRO={PAGES_REACTIVES[page.id].intro}
        prop_TOP={PAGES_REACTIVES[page.id].top}
        prop_Z={PAGES_REACTIVES[page.id].z}
        prop_PROPS={PAGES_REACTIVES[page.id].props}
        prop_COMPONENT={page.component}
        prop_LABEL={page.label}
        prop_TITLE={page.title}
        prop_NAV={page.nav}
        prop_QUOTE={page.quote}
        prop_PROCESS={page.process}
        prop_CHILDREN={page.children}
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
            
//=======@STYLE|

    // --*


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
    PAGES_REACTIVES = pages_getReactives()
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

        for (const PAGE of prop_DATA)
        {
            const ID = PAGE.id
        
            page_setVars(PAGE, top)
    
            ROUTER.router_add(ID, PAGE.name, PAGE.route.value, top)

            top = PAGES_REACTIVES[ID].end
        }
    }

    function pages_setEvents() { EVENT.event_add(PAGES_EVENTS) }

    function page_setVars(page, top)
    {
        const
        SCROLLTOP = APP.app_SCROLLTOP ?? 0,
        REACTIVE  = PAGES_REACTIVES[page.id],
        HEIGHT    = page.height,
        START     = HEIGHT ? top + APP.app_PAGE_INTRO_HEIGHT : 1,
        END       = HEIGHT ? HEIGHT * APP.app_HEIGHT + top   : 1,
        INTRO     = page_getIntro(top, START, SCROLLTOP),
        DIF       = END - START + (page.gap ?? 0) * APP.app_HEIGHT,
        RATIO     = page_getRatio(START, DIF, page.overflow, SCROLLTOP)

        REACTIVE.intro = INTRO
        REACTIVE.top   = top
        REACTIVE.start = START
        REACTIVE.end   = END
        REACTIVE.dif   = DIF

        pages_updateReactivesProps(page.id, { prop_INTRO: INTRO, prop_TOP: top, prop_START: START, prop_END: END, prop_DIF: DIF, prop_RATIO: RATIO })
    }

    // --GET
    function pages_getReactives()
    {
        const REACTIVES = []

        for (const PAGE of prop_DATA)
        {
            REACTIVES[PAGE.id] =
            {
                focus: false,
                intro: false
                ,
                top  : 0,
                start: 0,
                end  : 0,
                dif  : 0
                ,
                props: PAGE.props
            }

            delete PAGE.props
        }
    
        return REACTIVES
    }

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
        for (const PAGE of prop_DATA)
        {
            const
            REACTIVE = PAGES_REACTIVES[PAGE.id],
            INTRO    = page_getIntro(REACTIVE.top, REACTIVE.start, scrollTop),
            RATIO    = page_getRatio(REACTIVE.start, REACTIVE.dif, PAGE.overflow, scrollTop)

            REACTIVE.intro = INTRO

            pages_updateReactivesProps(PAGE.id, { prop_INTRO: INTRO, prop_RATIO: RATIO })

            if (REACTIVE.focus) router_updateHide(!INTRO)
        }
    }

    function pages_updateFocus(id)
    {
        for (const PAGE of prop_DATA)
        {
            const
            ID       = PAGE.id,
            REACTIVE = PAGES_REACTIVES[ID],
            FOCUS    = id === ID
    
            REACTIVE.focus = FOCUS
            REACTIVE.z     = FOCUS ? PAGE_Z : PAGE_Z - ID - 1

            pages_updateReactivesProps(ID, { prop_FOCUS: FOCUS })
        }
    }

    function pages_updateReactivesProps(id = 0, props = {})
    {
        const REACTIVE = PAGES_REACTIVES[id]
    
        for (const PROP in props) if (PROP in REACTIVE.props) REACTIVE.props[PROP] = props[PROP]

        PAGES_REACTIVES[id] = REACTIVE
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


/* #\-THIS-\ */

.pages
{
    @include utils.placement(absolute, 0, 0, 0, 0);

    @extend %any-size;

    transform: scale(1); /* fixed and page z-index */

    overflow: hidden;

    transition: filter .6s;

    &.hide { filter: blur(100px) hue-rotate(30deg); }
}


</style>