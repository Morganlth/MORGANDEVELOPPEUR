<!----------------------------------------------- #||--skills--|| -->


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
class="skills"
data-page-id={prop_ID}
>
    <System
    prop_SYSTEM={prop_CHILDREN.system}
    prop_START={prop_FOCUS && !prop_INTRO}
    prop_HIDE={skills_TARGET || skills_SET_TARGET}
    prop_updateTarget={skills_updateTarget}
    {prop_FOCUS}
    {prop_RATIO}
    />

    {#if skills_TARGET}
    {@const {name, skills} = skills_TARGET}
        <Table
        prop_TITLE={name}
        prop_LINES={skills}
        bind:head_HEIGHT={PAGE_NAV.offset}
        on:click={table_eClick}
        />
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
    import System from './System.svelte'
    import Table  from './Table.svelte'
            
//=======@STYLE|

    // --*


// #\-EXPORTS-\

    // --PROPS
    export let
    prop_ID = void 0
    ,
    prop_FOCUS = false,
    prop_INTRO = false
    ,
    prop_TOP   = 0,
    prop_RATIO = 0
    ,
    prop_START = void 0,
    prop_DIF   = void 0
    ,
    prop_CHILDREN = {}

    // --BINDING
    export let
    page_CHARGED = false
    ,
    PAGE_NAV = { callback: nav_e$Click }


// #\-CONSTANTES-\

    // --SVELTE

    // --CONTEXTS
    const APP_$FREEZE  = APP.app_$FREEZE

    // --OUTSIDE

    // --THIS

    // --INSIDE
    const SYSTEM_EVENTS = { resize: system_e$Resize }


// #\-VARIABLES-\

    // --CONTEXTS

    // --OUTSIDE

    // --THIS
    let
    skills_SET_TARGET = false
    ,
    skills_TARGET = null

    // --INSIDE


// #\-REATIVES-\

    // --CONTEXTS

    // --OUTSIDE

    // --THIS
    $: !$APP_$FREEZE ? skills_reset() : void 0


// #\-FUNCTIONS-\

//=======@LIFE|

    // --SVELTE
    onMount(skills_set), onDestroy(skills_destroy)

    // --SET
    function skills_set()
    {
        system_setEvents()

        APP.app_WAITING_LOADING = () =>
        {
            system_setVars()
        
            const TARGET = prop_CHILDREN.system.find(item => item.path === ROUTER.router_SUBPATH)

            if (TARGET) skills_updateTarget(TARGET, true)
        }
    
        page_CHARGED = true
    }

    function system_setVars() { for (const ITEM of prop_CHILDREN.system) ITEM.top = prop_START + prop_DIF * ITEM.props.prop_OFFSET }

    function system_setEvents() { EVENT.event_add(SYSTEM_EVENTS) }

    // --GET
    function system_getTarget(target) { return prop_CHILDREN.system.find(item => item.tags.includes(target)) }

    // --UPDATES
    function app_updateFreeze(value) { APP.app_$FREEZE = { value, target: prop_ID } }

    function router_updatePaths(subpath)
    {
        ROUTER.router_updateSubPath(prop_ID, subpath)
        ROUTER.router_updatePath(prop_ID)
    }

    function skills_updateTarget(target, instant = false)
    {
        skills_SET_TARGET = true
    
        skills_goTo(target, instant, () =>
        {
            skills_SET_TARGET = false
            skills_TARGET     = target
    
            app_updateFreeze(true)
            router_updatePaths(target?.path)
        })
    }

    // --DESTROY
    function skills_destroy() { system_destroyEvents() }

    function system_destroyEvents() { EVENT.event_remove(SYSTEM_EVENTS) }


//=======@COMMANDS|

    // --*


//=======@EVENTS|

    // --*
    export function nav_e$Click({id})
    {
        const TARGET = prop_CHILDREN.system[id]

        skills_TARGET ? skills_updateTarget(TARGET) : skills_goTo(TARGET)
    }

    async function system_e$Resize()
    {
  await tick() // wait prop_START and prop_DIF
    
        system_setVars()
    }

    function table_eClick() { app_updateFreeze(false) } // call skills_reset with reactive app_$FREEZE


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
            case 'top'   : EVENT.event_scrollTo(prop_TOP, true)   ;break
            case 'start' : EVENT.event_scrollTo(prop_START, true) ;break
            case 'system': skills_goTo(system_getTarget(str))     ;break
            default      :                                        ;break
        }
    }

    function skills_reset()
    {
        if (skills_TARGET) router_updatePaths(null)
    
        skills_TARGET = null
    }

    function skills_goTo(target, instant = false, callback) { EVENT.event_scrollTo(target?.top ?? prop_START, instant, true, callback) }


</script>


<!-- #|-STYLE-| -->

<!-- <style
lang="scss"
>

/* #\-USES-\ */

    /* --SASS */

    /* --APP */

    /* --DEPENDENCIES */

    /* --MEDIA */


/* #\-VARIABLES-\ */

    /* --* */


/* #\-THIS-\ */


</style> -->