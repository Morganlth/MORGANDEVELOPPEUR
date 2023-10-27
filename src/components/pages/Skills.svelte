<!-- #MAP

-APP
-EVENT
    SKILLS
        CONTENT
            SYSTEM
            TABLE

-->

<!-- #SCRIPT -->

<script>
// #EXPORTS

    // --PROPS
    export let
    prop_ID = void 0,

    prop_FOCUS = false,
    prop_INTRO = false,

    prop_SYSTEM = [],

    prop_TOP = 0,
    prop_RATIO = 0,

    prop_START = void 0,
    prop_DIF = void 0

    // --BIND
    export let
    page_CHARGED = false,

    PAGE_NAV = { callback: nav_e$Click }

    // BIND page_process

// #IMPORTS

    // --CONTEXTS
    import { APP, EVENT } from '../../App.svelte'

    // --SVELTE
    import { onMount, onDestroy, tick } from 'svelte'

    // --COMPONENT-ELEMENTS
    import System from '../elements/System.svelte'
    import Table from '../elements/Table.svelte'

// #CONSTANTE

    // --ELEMENT-SYSTEM
    const SYSTEM_EVENTS = { resize: system_e$Resize }

// #VARIABLES

    // --APP
    let
    app_$CHARGED = APP.app_$CHARGED,
    app_$FREEZE = APP.app_$FREEZE

    // --ELEMENT-SYSTEM
    let system_TARGET = null

// #REACTIVES

    // --ELEMENT-SKILLS
    $: !$app_$FREEZE ? skills_reset() : void 0

    // --ELEMENT-NAV
    $: $app_$CHARGED ? system_setVars() : void 0

// #FUNCTIONS

    // --SET
    function skills_set()
    {
        system_setEvents()
    
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

    // --DESTROY
    function skills_destroy() { system_destroyEvents() }

    function system_destroyEvents() { EVENT.event_remove(SYSTEM_EVENTS) }

    // --GET
    function system_getTarget(target) { return prop_SYSTEM.find(orbit => orbit.tags.includes(target)) }

    // --RESET
    function skills_reset()
    {
        PAGE_NAV.offset = 0
    
        system_TARGET = null
    }

    // --EVENTS
    export function nav_e$Click({id}) { skills_goTo(id) }

    async function system_e$Resize() { system_setVars() }

    function table_eClick() { APP.app_$FREEZE = { value: false, target: prop_ID } } // call skills_reset with reactive app_$FREEZE

    // --UTILS
    export function page_process(str, target)
    {
        switch (target)
        {
            case 'top':
                EVENT.event_scrollTo(prop_TOP, true)
                break
            case 'start':
                EVENT.event_scrollTo(prop_START, true)
                break
            case 'system':
                const ORBIT = system_getTarget(str)
        
                EVENT.event_scrollTo(prop_START, true)

                tick().then(() => { if (ORBIT) skills_goTo(ORBIT.id) })
            default:
                break
        }
    }

    function skills_goTo(id) { EVENT.event_scrollTo(prop_SYSTEM[id].top) }

// #CYCLES

onMount(skills_set)
onDestroy(skills_destroy)
</script>

<!-- #HTML -->

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