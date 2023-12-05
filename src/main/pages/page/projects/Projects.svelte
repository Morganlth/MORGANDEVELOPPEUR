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
data-page-id={prop_ID}
>
    <Group
    let:resize
    >
        {#each prop_CHILDREN.projects as project}
            <Project
            prop__$RESIZE={resize}
            prop__TARGET={project__TARGET}
            prop__CARD_HOVER={card__HOVER}
            prop_FOCUS={project$_FOCUS}
            prop_TARGET={project__TARGET === project.id}
            prop_PROJECT={project}
            prop_ABOUT_GLOBAL={prop_CHILDREN.about_GLOBAL}
            on:mouseenter={card_eMouseEnter}
            on:mouseleave={card_eMouseLeave}
            on:click={project_eClick}
            />
        {/each}
    </Group>
</div>


<!-- #|-SCRIPT-| -->

<script>

// #\-IMPORTS-\

    // --DATA

    // --SVELTE
    import { onMount } from 'svelte'

    // --LIB

    // --CONTEXTS
    import { APP, ROUTER, EVENT } from '../../../../App.svelte'

//=======@COMPONENTS|

    // --*
    import Group from '../../../../global/covers/Group.svelte'

    import Project from './Project.svelte'
        
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
    prop_TOP   = 0,
    prop_START = 0
    ,
    prop_CHILDREN = {}

    // --BINDING
    export let page_CHARGED = false

    export const PAGE_NAV = { callback: nav_e$Click }


// #\-CONSTANTES-\

    // --SVELTE

    // --CONTEXTS
    const APP_$FREEZE = APP.app_$FREEZE

    const ROUTER_$SUBPATH = ROUTER.router_$SUBPATH

    // --OUTSIDE

    // --THIS

    // --INSIDE


// #\-VARIABLES-\

    // --CONTEXTS

    // --OUTSIDE

    // --THIS

    // --INSIDE
    let project__TARGET

    let card__HOVER


// #\-REATIVES-\

    // --CONTEXTS

    // --OUTSIDE

    // --THIS
    $: !$APP_$FREEZE ? projects_setProject(null) : void 0

    $: projects_update($ROUTER_$SUBPATH)

    // --INSIDE
    $: project$_FOCUS = prop_FOCUS && !prop_INTRO


// #\-FUNCTIONS-\

//=======@LIFE|

    // --SVELTE
    onMount(projects_set)

    // --SET
    function projects_set() { page_CHARGED = true }

    function projects_setProject(id) { if (page_CHARGED && (id != null || project__TARGET != null)) router_updatePage(id) } // update router => $ROUTER_$SUBPATH

    // --GET
    function projects_getProject(name) { return prop_CHILDREN.projects.find(project => project.name === name) ?? null }

    // --UPDATES
    function app_updateFreeze(value) { APP.app_$FREEZE = { value, target: prop_ID } }

    function router_updatePage(id)
    {
        const SUBPATH = id == null || project__TARGET === id ? null : prop_CHILDREN.projects[id]?.name

        ROUTER.router_updatePage(prop_ID, SUBPATH)
    }

    async function projects_update()
    {
        if (page_CHARGED)
        {
            const LAST_TARGET = project__TARGET
    
            projects_updateTarget()
            projects_updateScrollPosition(LAST_TARGET)
        }
    }

    function projects_updateTarget()
    {
        const PROJECT = projects_getProject(ROUTER.router_$SUBPATH.value)

        project__TARGET = PROJECT?.id
    }

    function projects_updateScrollPosition(last_TARGET)
    {
             if (last_TARGET == null && project__TARGET != null) EVENT.event_scrollTo(prop_START, true, false, app_updateFreeze.bind(null, true))
        else if (last_TARGET != null && project__TARGET == null) app_updateFreeze(false)
    }

    function card_updateCardHover(id) { card__HOVER = id }

    // --DESTROY


//=======@COMMANDS|

    // --*


//=======@EVENTS|

    // --*
    function project_eClick({detail: {id}})   { projects_setProject(id) }

    function card_eMouseEnter({detail: {id}}) { card_updateCardHover(id) }

    function card_eMouseLeave()               { card_updateCardHover(null) }

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
            case 'top'     : EVENT.event_scrollTo(prop_TOP, true)              ;break
            case 'start'   : EVENT.event_scrollTo(prop_START, true)            ;break
            case 'projects': projects_setProject(projects_getProject(str)?.id) ;break
            default        :                                                   ;break
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
}


</style>