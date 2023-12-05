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
    prop_HIDE={table__TARGET || table_SET_TARGET}
    {prop_FOCUS}
    {prop_RATIO}
    on:click={system_eClick}
    />

    {#if table__TARGET}
    {@const {name, skills} = table__TARGET}
        <Table
        prop_TITLE={name}
        prop_LINES={skills}
        prop_SET_TARGET={table_SET_TARGET}
        prop_DURATION={TABLE_DURATION + TABLE_DELAY}
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
    import { wait_getDelay } from '$lib/wait'

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
    const APP_$FREEZE = APP.app_$FREEZE

    const ROUTER_$SUBPATH = ROUTER.router_$SUBPATH

    // --OUTSIDE

    // --THIS

    // --INSIDE
    const SYSTEM_EVENTS = { resize: system_e$Resize }

    const
    TABLE_DURATION = wait_getDelay(24), // +- 400ms
    TABLE_DELAY    = wait_getDelay(6)   // +- 100ms


// #\-VARIABLES-\

    // --CONTEXTS

    // --OUTSIDE

    // --THIS
    let skills_INSTANT = true

    // --INSIDE
    let
    table__TARGET = null
    ,
    table_SET_TARGET = false,
    table_CLICK      = false
    ,
    table_TIMEOUT


// #\-REATIVES-\

    // --CONTEXTS

    // --OUTSIDE

    // --THIS

    // --INSIDE
    $: table_setTarget($ROUTER_$SUBPATH)

    $: !$APP_$FREEZE ? table_reset() : void 0


// #\-FUNCTIONS-\

//=======@LIFE|

    // --SVELTE
    onMount(skills_set), onDestroy(skills_destroy)

    // --SET
    function skills_set()
    {
        system_setEvents()

        APP.app_WAITING_LOADING = system_setVars
    
        page_CHARGED = true
    }

    function system_setVars() { for (const ITEM of prop_CHILDREN.system) ITEM.top = prop_START + prop_DIF * ITEM.props.prop_OFFSET }

    function system_setEvents() { EVENT.event_add(SYSTEM_EVENTS) }

    function table_setTarget(subPath)
    {
        if (page_CHARGED)
        {
            const TARGET = table_getTarget(subPath)

            if (TARGET)
            {
                const DELAY = table__TARGET || table_SET_TARGET ? TABLE_DURATION : 0
        
                table_SET_TARGET = true

                skills_goTo(TARGET, table_updateTarget.bind(TARGET, DELAY))
            }
        }
    }

    // --GET
    function system_getTarget(target) { return prop_CHILDREN.system.find(item => item.tags.includes(target)) }

    function table_getTarget(subPath) { return prop_CHILDREN.system.find(item => item.path === subPath) }

    // --UPDATES
    function app_updateFreeze(value) { APP.app_$FREEZE = { value, target: prop_ID } }

    function router_updatePage(subPath) { ROUTER.router_updatePage(prop_ID, subPath) }

    async function table_updateTarget(delay)
    {
        const update = () =>
        {
            table__TARGET    = this
            table_SET_TARGET = false
            table_TIMEOUT    = null
        }
    
        delay ? table_TIMEOUT = setTimeout(update, delay) : update()

  await tick() // table_reset => tick

        app_updateFreeze(true)
    }

    // --DESTROY
    function skills_destroy()
    {
        system_destroyEvents()

        table_destroyTimeout()
    }

    function system_destroyEvents() { EVENT.event_remove(SYSTEM_EVENTS) }

    function table_destroyTimeout()
    {
        clearTimeout(table_TIMEOUT)

        table_TIMEOUT = null
    }


//=======@COMMANDS|

    // --*


//=======@EVENTS|

    // --*
    export function nav_e$Click({id})
    {
        if (table_SET_TARGET) return

        const TARGET = prop_CHILDREN.system[id]

        if (table__TARGET) router_updatePage(TARGET?.path)
        else
        {
            skills_INSTANT = false

            skills_goTo(TARGET)
        }
    }

    function system_eClick({ detail: {target} })
    {
        skills_INSTANT = false
    
        router_updatePage(target?.path)
    }

    async function system_e$Resize()
    {
  await tick() // wait prop_START and prop_DIF
    
        system_setVars()
    }

    function table_eClick()
    {
        table_CLICK = true
    
        app_updateFreeze(false) // APP_$FREEZE => skills_reset
        router_updatePage(null)
    }


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

    async function table_reset()
    {
        if (table__TARGET || table_SET_TARGET)
        {
            if (table_TIMEOUT) table_SET_TARGET = false
    
      await tick() // table_SET_TARGET prop => table

            table__TARGET = null

            table_destroyTimeout()
        }
    }

    function skills_goTo(target, callback)
    {
        EVENT.event_scrollTo(target?.top ?? prop_START, skills_INSTANT, false, callback)

        skills_INSTANT = true
    }


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