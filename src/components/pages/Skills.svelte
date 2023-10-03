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
            value: 'HTML & CSS'
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

    // --APP
    let app_$FREEZE = APP.app_$FREEZE

    // --ELEMENT-SKILLS
    let skills_CHARGED = false

    // --ELEMENT-SYSTEM
    let system_TARGET = null

    // --ELEMENT-TITLE
    let title_HEIGHT = 0

    // --ELEMENT-TABLE
    let table_HEIGHT = 0

// #REACTIVES

    // --ELEMENT-SKILLS
    $: !$app_$FREEZE ? skills_reset() : void 0

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

    // --RESET
    function skills_reset()
    {
        system_TARGET = null

        table_HEIGHT = 0
    }

    // --EVENTS
    function nav_eClick({detail: {item}}) { EVENT.event_scrollTo(item.top) }

    function table_eClick() { APP.app_$FREEZE = { on: false, target: APP.app_$FREEZE.target } } // call skills_reset with reactive app_$FREEZE

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

        {#if system_TARGET}
            <Table
            prop_TITLE={system_TARGET.tag}
            prop_LINES={system_TARGET.skills}
            prop_TRANSLATE_Y={title_HEIGHT}
            bind:head_HEIGHT={table_HEIGHT}
            on:click={table_eClick}
            />
        {/if}

        <Nav
        prop_TRANSLATE_Y={title_HEIGHT - table_HEIGHT}
        prop_ITEMS={NAV_ITEMS}
        {prop_FOCUS}
        {prop_INTRO}
        on:click={nav_eClick}
        />
    </Content>
</div>