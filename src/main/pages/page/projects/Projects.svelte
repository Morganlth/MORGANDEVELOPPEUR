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

        <div
        class="project"
        >
            <svelte:component
            this={projects_TARGET.component}
            prop_DATAS={projects_TARGET.datas}
            />
        </div>
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
</div>


<!-- #|-SCRIPT-| -->

<script>

// #\-IMPORTS-\

    // --DATA

    // --SVELTE
    import { onMount } from 'svelte'

    // --LIB

    // --CONTEXTS
    import { APP, ROUTER, EVENT, COMMAND } from '../../../../App.svelte'

//=======@COMPONENTS|

    // --*
    import Group from '../../../../global/covers/Group.svelte'

    import Card  from './cards/Card.svelte'
    import Mask2 from './Mask2.svelte'
    import About from './About.svelte'


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
    onMount(projects_set)

    // --SET
    function projects_set()
    {
        APP.app_WAITING_LOADING.push(projects_update)

        page_CHARGED = true
    }

    async function projects_setProject(id)
    {
        try {
            if (page_CHARGED && (id != null || projects_TARGET))
            {
                router_updatePaths(id)

                projects_update()
            }
        }
        catch (e) { COMMAND.command_COMMANDS.log(e) }
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

    function projects_updateParticles() { (particles ??= document.querySelector('.particles'))?.moveTo(projects_TARGET ? projects : null) }

    function card_updateCardHover(id) { card_HOVER = id }

    // --DESTROY


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


/* #\-GLOBAL-\ */

    /* --* */
    :global #projects .wrapper { transform: scale(1); } /* fixed children */


/* #\-THIS-\ */

.projects
{
    @include utils.placement(absolute, 0, 0, 0, 0);

    @extend %any-size;

    overflow: clip;

    &.scroller
    {
        @extend %scroll-bar;

        /* z-index: 2; */

        overflow-y: scroll;

        pointer-events: auto;
    }

    .project
    {
        @include utils.placement(absolute, $top: 100svh, $right: 0, $left: 0, $z: 1);

        width:  100%;
        height: fit-content;
    }

    :global
    {
        .particles { z-index: -1; }
    
        .group
        {
            @include utils.placement(fixed, 0, 0, 0, 0);

            @extend %any-size;
        }

        .tag
        {
            @include utils.placement(absolute, $top: 0, $left: 0, $z: 1);

            transform: translate(-50%, -100%);

            pointer-events: none;
        }
    }
}


</style>