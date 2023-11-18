<!----------------------------------------------- #||--projects--|| -->


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
class="projects"
class:scroller={projects_TARGET}
data-page-id={prop_ID}
bind:this={projects}
>
    {#if projects_TARGET}
        <About
        prop_CONTENT={[prop_ABOUT, (projects_TARGET.about ?? [])]}
        />
    {/if}

    <Group
    let:resize
    >
        {#each prop_CARDS as card}
            <Card
            prop_$RESIZE={resize}
            prop_CARD_HOVER={card_HOVER}
            prop_ON={card$_ON}
            prop_ID={card.id}
            prop_TARGET={projects_TARGET ? projects_TARGET.id === card.id ? 1 : -1 : 0}
            prop_CONTENT={card.value}
            prop_COLOR={card.color}
            on:click={card_eClick}
            on:mouseenter={card_eMouseEnter}
            on:mouseleave={card_eMouseLeave}
            >
                <svelte:component
                this={card.texture}
                />
            </Card>
        {/each}
    </Group>

    <Mask2
    prop_DESTROY={!projects_TARGET}
    />

    {#if projects_TARGET}
        <div
        class="project"
        >
            <svelte:component
            this={projects_TARGET.component}
            prop_DATAS={projects_TARGET.datas}
            />
        </div>
    {/if}
</div>


<!-- #|-SCRIPT-| -->

<script>

// #\-IMPORTS-\

    // --DATA

    // --SVELTE
    import { onMount, onDestroy, tick } from 'svelte'

    // --LIB

    // --CONTEXTS
    import { APP, ROUTER, EVENT } from '../../../../App.svelte'

//=======@COMPONENTS|

    // --*
    import Group from '../../../../global/covers/Group.svelte'

    import Card  from './cards/Card.svelte'
    import Mask2 from './Mask2.svelte'
    import About from './About.svelte'
        
//=======@STYLE|

    // --*
    import '../../../../assets/scss/global/projects.scss'


// #\-EXPORTS-\

    // --PROPS
    export let
    prop_ID = void 0
    ,
    prop_FOCUS = false,
    prop_INTRO = false
    ,
    prop_ABOUT    = [],
    prop_PROJECTS = [],
    prop_CARDS    = []
    ,
    prop_TOP   = 0,
    prop_START = 0

    // --BINDING
    export let page_CHARGED = false

    export const PAGE_NAV = { callback: nav_e$Click }


// #\-CONSTANTES-\

    // --SVELTE

    // --CONTEXTS
    const APP_$FREEZE  = APP.app_$FREEZE

    // --OUTSIDE

    // --THIS

    // --INSIDE


// #\-VARIABLES-\

    // --CONTEXTS

    // --OUTSIDE
    let particles

    // --THIS
    let
    projects
    ,
    projects_TARGET

    // --INSIDE
    let card_HOVER


// #\-REATIVES-\

    // --CONTEXTS

    // --OUTSIDE

    // --THIS
    $: !$APP_$FREEZE ? projects_setProject(null) : void 0

    // --INSIDE
    $: card$_ON = prop_FOCUS && !prop_INTRO


// #\-FUNCTIONS-\

//=======@LIFE|

    // --SVELTE
    onMount(projects_set), onDestroy(projects_destroy)

    // --SET
    function projects_set()
    {
        APP.app_WAITING_LOADING.push(projects_update)

        page_CHARGED = true
    }

    async function projects_setProject(id)
    {
        if (page_CHARGED && (id != null || projects_TARGET))
        {
            router_updatePaths(id)

            projects_update()
        }
    }

    // --GET
    function card_get(name) { return prop_CARDS.find(card => card.name === name) ?? null }

    // --UPDATES
    function app_updateFreeze(value) { APP.app_$FREEZE = { value, target: prop_ID } }

    function router_updatePaths(id)
    {
        const VALUE = projects_TARGET?.id === id ? null : id

        ROUTER.router_updateSubPath(prop_ID, VALUE == null ? null : prop_CARDS[id].name)
        ROUTER.router_updatePath(prop_ID)
    }

    async function projects_update()
    {
        const LAST_TARGET = projects_TARGET
    
        projects_updateTarget()
        projects_updateScrollPosition(LAST_TARGET)
        projects_updateParticles()
    }

    function projects_updateTarget()
    {
        const CARD = card_get(ROUTER.router_SUBPATH)

        projects_TARGET = CARD ? prop_PROJECTS[CARD.id] : null
    }

    function projects_updateScrollPosition(last_TARGET)
    {
        if (last_TARGET == null && projects_TARGET) EVENT.event_scrollTo(prop_START, true, false, app_updateFreeze.bind(null, true))
        else
        {
            projects?.scrollTo({ top: 0 })

            if (last_TARGET && !projects_TARGET) app_updateFreeze(false)
        }
    }

    async function projects_updateParticles()
    {
        await tick() // set about and project

        ;(particles ??= document.querySelector('.particles'))?.moveTo(projects_TARGET ? projects : null)
    }

    function card_updateCardHover(id) { card_HOVER = id }

    // --DESTROY
    function projects_destroy()
    {
        projects_TARGET = null

        projects_updateParticles()
    }


//=======@COMMANDS|

    // --*


//=======@EVENTS|

    // --*
    function card_eMouseEnter({detail: {id}}) { card_updateCardHover(id) }

    function card_eMouseLeave() { card_updateCardHover(null) }

    function card_eClick({detail: {id}}) { projects_setProject(id) }

    export function nav_e$Click({id}) { projects_setProject(id) }


//=======@TRANSITIONS|

    // --*


//=======@ANIMATIONS|

    // --*


//=======@UTILS|

    // --*
    export function page_process(str, target)
    {
        switch (target)
        {
            case 'top'  : EVENT.event_scrollTo(prop_TOP, true)   ;break
            case 'start': EVENT.event_scrollTo(prop_START, true) ;break
            case 'cards': projects_setProject(card_get(str)?.id) ;break
            default     :                                        ;break
        }
    }


</script>


<!-- #|-STYLE-| -->

<style
lang="scss"
>

/* #\-USES-\ */

    /* --SASS */

    /* --APP */

    /* --DEPENDENCIES */
    @use '../../../../assets/scss/styles/utils';

    /* --MEDIA */


/* #\-VARIABLES-\ */

    /* --* */


/* #\-THIS-\ */

.projects
{
    @include utils.placement(absolute, 0, 0, 0, 0);

    @extend %any-size;

    overflow: clip;

    &.scroller
    {
        @extend %scroll-bar;

        will-change: scroll-position;

        z-index: 2; /* label & nav */

        overflow-y:          scroll;
        overscroll-behavior: none;

        max-height: 100svh;

        pointer-events: auto;
    }

    .project
    {
        @include utils.placement(relative, $top: 100vh);

        top: 100svh;

        width:  100%;
        height: fit-content;
    }
}


</style>