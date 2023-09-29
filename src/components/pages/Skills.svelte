<!-- #MAP

-APP
-EVENT
    SKILLS
        CONTENT
            SYSTEM

            NAV
    
            #if TABLE

-->

<!-- #SCRIPT -->

<script>
// #EXPORTS

    // --PROPS
    export let
    prop_FOCUS = false,
    prop_INTRO = false,
    prop_RATIO = 0,
    prop_START = void 0,
    prop_DIF = void 0

// #IMPORTS

    // --JS
    import { SKILLS_CONTENT_DATAS } from '../../assets/js/datas/dSkills'
    import { SYSTEM_DATAS } from '../../assets/js/datas/dSystem'
    import MATH from '../../assets/js/utils/math'

    // --CONTEXTS
    import { APP, EVENT } from '../../App.svelte'

    // --SVELTE
    import { onMount } from 'svelte'

    // --COMPONENT-COVER
    import Content from '../covers/Content.svelte'

    // --COMPONENT-ELEMENTS
    import System from '../elements/System.svelte'
    import Nav from '../elements/Nav.svelte'
    import Table from '../elements/Table.svelte'

// #CONSTANTE

    // --ELEMENT-NAV
    const NAV_ITEMS =
    [
        {
            id: 0,
            title: 'HTML et CSS',
            value: 'H.& C.'
        },
        {
            id: 1,
            title: 'Javascript',
            value: 'JS'
        },
        {
            id: 2,
            title: 'Node JS',
            value: 'NODE JS'
        },
        {
            id: 3,
            title: 'Gestion, Outils et Adaptabilité',
            value: 'AUTRES'
        }
    ]

// #VARIABLES

    // --ELEMENT-SKILLS
    let skills_CHARGED = false

    // --ELEMENT-SYSTEM
    let system_TARGET = null

    // --ELEMENT-TITLE
    let title_HEIGHT = 0

// #REACTIVES

    // --ELEMENT-NAV
    $: prop_START != null && prop_DIF != null ? nav_setVars() : void 0

// #FUNCTIONS

    // --SET
    function skills_set() { skills_CHARGED = true }

    function nav_setVars()
    {
        const PI_DIV_2 = Math.PI / 2

        for (let i = 0; i < NAV_ITEMS.length; i++)
        {
            const
            ITEM = NAV_ITEMS[i],
            RATIO = ((PI_DIV_2 - SYSTEM_DATAS[i].props.prop_OFFSET) + MATH.PI.x2) % MATH.PI.x2 / MATH.PI.x2

            ITEM.top = prop_START + prop_DIF * RATIO
        }
    }

    // --EVENTS
    function system_eClick(id) { EVENT.event_scrollTo(NAV_ITEMS[id].top) }

    function table_eClick()
    {
        system_TARGET = null

        APP.app_$FREEZE = { on: false, target: APP.app_$FREEZE.target }
    }

// #CYCLE

onMount(skills_set)
</script>

<!-- #HTML -->

<div
id="skills"
>
    <Content
    prop_CHARGED={skills_CHARGED}
    prop_INTRO={prop_INTRO && !system_TARGET}
    {...SKILLS_CONTENT_DATAS}
    {prop_FOCUS}
    bind:title_HEIGHT
    >
        <System
        prop_START={prop_FOCUS && !prop_INTRO}
        {prop_FOCUS}
        {prop_RATIO}
        bind:system_TARGET
        />

        <Nav
        prop_TRANSLATE_Y={title_HEIGHT}
        prop_ITEMS={NAV_ITEMS}
        prop_EVENT={system_eClick}
        {prop_FOCUS}
        {prop_INTRO}
        />

        {#if system_TARGET}
            <Table
            prop_TITLE={system_TARGET.tag}
            prop_LINES={system_TARGET.skills}
            prop_TRANSLATE_Y={title_HEIGHT}
            on:click={table_eClick}
            />
        {/if}
    </Content>
</div>