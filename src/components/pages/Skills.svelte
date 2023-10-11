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
    prop_FOCUS = false,
    prop_INTRO = false,

    prop_SYSTEM = [],

    prop_TOP = 0,
    prop_RATIO = 0,

    prop_START = void 0,
    prop_DIF = void 0

    // --BIND
    export let page_CHARGED = false

    // BIND page_process
    // BIND nav_e$Click

// #IMPORTS

    // --JS
    import MATH from '../../assets/js/utils/math'

    // --CONTEXTS
    import { APP, EVENT } from '../../App.svelte'

    // --SVELTE
    import { onMount, tick } from 'svelte'

    // --COMPONENT-ELEMENTS
    import System from '../elements/System.svelte'
    import Table from '../elements/Table.svelte'

// #VARIABLES

    // --APP
    let app_$FREEZE = APP.app_$FREEZE

    // --ELEMENT-SYSTEM
    let system_TARGET = null

    // --ELEMENT-TABLE
    let table_HEIGHT = 0

// #REACTIVES

    // --ELEMENT-SKILLS
    $: !$app_$FREEZE ? skills_reset() : void 0

    // --ELEMENT-NAV
    $: prop_START != null && prop_DIF != null ? system_setVars() : void 0

// #FUNCTIONS

    // --SET
    function skills_set() { page_CHARGED = true }

    function system_setVars()
    {
        const PI_DIV_2 = Math.PI / 2

        for (let i = 0; i < prop_SYSTEM.length; i++)
        {
            const
            ITEM = prop_SYSTEM[i],
            RATIO = ((PI_DIV_2 - prop_SYSTEM[i].props.prop_OFFSET) + MATH.PI.x2) % MATH.PI.x2 / MATH.PI.x2

            ITEM.top = prop_START + prop_DIF * RATIO
        }
    }

    // --GET
    function system_getTarget(target) { return prop_SYSTEM.find(orbit => orbit.tags.includes(target)) }

    // --RESET
    function skills_reset()
    {
        system_TARGET = null

        table_HEIGHT = 0
    }

    // --EVENTS
    export function nav_e$Click({id}) { skills_goTo(id) }

    function table_eClick() { APP.app_$FREEZE = { value: false, target: APP.app_$FREEZE.target } } // call skills_reset with reactive app_$FREEZE

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

// #CYCLE

onMount(skills_set)
</script>

<!-- #HTML -->

<div
class="skills"
>
    <System
    prop_START={prop_FOCUS && !prop_INTRO}
    {prop_FOCUS}
    {prop_SYSTEM}
    {prop_RATIO}
    bind:system_TARGET
    />

    {#if system_TARGET} <!-- title_HEIGHT ?-->
        <Table
        prop_TITLE={system_TARGET.tag}
        prop_LINES={system_TARGET.skills}
        prop_TRANSLATE_Y={0}
        bind:head_HEIGHT={table_HEIGHT}
        on:click={table_eClick}
        />
    {/if}
</div>