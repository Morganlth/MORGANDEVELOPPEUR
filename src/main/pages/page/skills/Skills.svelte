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
    prop_START={prop_FOCUS && !prop_INTRO}
    {prop_ID}
    {prop_FOCUS}
    {prop_SYSTEM}
    {prop_RATIO}
    bind:system_TARGET
    />

    {#if system_TARGET}
        <Table
        prop_TITLE={system_TARGET.tag}
        prop_LINES={system_TARGET.skills}
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
    import { APP, EVENT } from '../../../../App.svelte'

//=======@COMPONENTS|

    // --*
    import System from './System.svelte'
    import Table  from './Table.svelte'


// #\-EXPORTS-\

    // --PROPS
    export let
    prop_ID = void 0
    ,
    prop_FOCUS = false,
    prop_INTRO = false
    ,
    prop_SYSTEM = []
    ,
    prop_TOP   = 0,
    prop_RATIO = 0
    ,
    prop_START = void 0,
    prop_DIF   = void 0

    // --BINDING
    export let
    page_CHARGED = false
    ,
    PAGE_NAV = { callback: nav_e$Click }


// #\-CONSTANTES-\

    // --SVELTE

    // --CONTEXTS

    // --OUTSIDE

    // --THIS

    // --INSIDE
    const SYSTEM_EVENTS = { resize: system_e$Resize }


// #\-VARIABLES-\

    // --CONTEXTS
    let app_$FREEZE  = APP.app_$FREEZE

    // --OUTSIDE

    // --THIS

    // --INSIDE
    let system_TARGET = null


// #\-REATIVES-\

    // --CONTEXTS

    // --OUTSIDE

    // --THIS
    $: !$app_$FREEZE ? skills_reset() : void 0


// #\-FUNCTIONS-\

//=======@LIFE|

    // --SVELTE
    onMount(skills_set), onDestroy(skills_destroy)

    // --SET
    function skills_set()
    {
        system_setEvents()

        APP.app_WAITING_LOADING.push(system_setVars)
    
        page_CHARGED = true
    }

    function system_setVars()
    {
        for (let i = 0; i < prop_SYSTEM.length; i++)
        {
            const ITEM = prop_SYSTEM[i]

            ITEM.top = prop_START + prop_DIF * ITEM.props.prop_OFFSET
        }
    }

    function system_setEvents() { EVENT.event_add(SYSTEM_EVENTS) }

    // --GET
    function system_getTarget(target) { return prop_SYSTEM.find(orbit => orbit.tags.includes(target)) }

    // --UPDATES

    // --DESTROY
    function skills_destroy() { system_destroyEvents() }

    function system_destroyEvents() { EVENT.event_remove(SYSTEM_EVENTS) }


//=======@COMMANDS|

    // --*


//=======@EVENTS|

    // --*
    export function nav_e$Click({id}) { skills_goTo(id) }

    async function system_e$Resize()
    {
        await tick() // wait prop_START and prop_DIF
    
        system_setVars()
    }

    function table_eClick() { APP.app_$FREEZE = { value: false, target: prop_ID } } // call skills_reset with reactive app_$FREEZE


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
            case 'system': skills_goTo(system_getTarget(str)?.id) ;break
            default      :                                        ;break
        }
    }

    function skills_reset()
    {
        PAGE_NAV.offset = 0
    
        system_TARGET = null
    }

    function skills_goTo(id = 0) { EVENT.event_scrollTo(prop_SYSTEM[id].top) }


</script>


<!-- #|-STYLE-| -->

<style
lang="scss"
>

/* #\-USES-\ */

    /* --SASS */

    /* --APP */

    /* --DEPENDENCIES */

    /* --MEDIA */


/* #\-VARIABLES-\ */

    /* --* */


/* #\-GLOBAL-\ */

    /* --* */


/* #\-THIS-\ */


</style>