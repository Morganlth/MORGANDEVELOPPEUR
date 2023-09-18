<!-- #MAP

-APP
-EVENT
    SKILLS
        WRAPPER
            SYSTEM

            CONTENT
                #if TABLE

-->

<!-- #SCRIPT -->

<script>
// #EXPORTS

    // --PROPS
    export let
    prop_FOCUS = false,
    prop_RATIO = 0,
    prop_START = void 0

// #IMPORTS

    // --JS
    import { SKILLS_CONTENT_DATAS } from '../../assets/js/datas/dSkills'
    import { wait_throttle } from '../../assets/js/utils/wait'

    // --CONTEXTS
    import { APP, EVENT } from '../../App.svelte'

    // --SVELTE
    import { onMount, onDestroy } from 'svelte'

    // --COMPONENT-COVER
    import Content from '../covers/Content.svelte'

    // --COMPONENT-ELEMENTS
    import System from '../elements/System.svelte'
    import Table from '../elements/Table.svelte'

// #CONSTANTE

    // --ELEMENT-SKILLS
    const SKILLS_EVENTS = { scroll: wait_throttle(skills_e$Scroll, 60), }

// #VARIABLES

    // --ELEMENT-SKILLS
    let skills_CHARGED = false

    // --ELEMENT-SYSTEM
    let system_TARGET = null

    // --ELEMENT-INFO
    let info_HEIGHT = 0

    // --ELEMENT-TITLE
    let
    title_END = 0,
    title_HEIGHT = 0,
    title_INVISIBLE = false

// #REACTIVE

    // --ELEMENT-TITLE
    $: prop_START != void 0 ? title_setVars() : void 0

// #FUNCTIONS

    // --SET
    function skills_set()
    {
        skills_setEvents()
        
        skills_CHARGED = true
    }

    function skills_setEvents() { EVENT.event_add(SKILLS_EVENTS) }

    function title_setVars() { title_END = prop_START + window.innerHeight }

    // --DESTROY
    function skills_destroy() { skills_destroyEvents() }

    function skills_destroyEvents() { EVENT.event_remove(SKILLS_EVENTS) }

    // --EVENTS
    async function skills_e$Scroll() { title_INVISIBLE = APP.app_SMALL_SCREEN && APP.app_SCROLLTOP > title_END ? true : false }

    function table_eClick()
    {
        system_TARGET = null

        APP.app_$FREEZE = { on: false, target: APP.app_$FREEZE.target }
    }

// #CYCLES

onMount(skills_set)
onDestroy(skills_destroy)
</script>

<!-- #HTML -->

<div
id="skills"
style:z-index={prop_FOCUS ? 1 : 0}
>
    <div
    class="wrapper"
    >
        <System
        {prop_FOCUS}
        {prop_RATIO}
        bind:system_TARGET
        />

        <Content
        prop_CHARGED={skills_CHARGED}
        prop_INVISIBLE={title_INVISIBLE || system_TARGET}
        {...SKILLS_CONTENT_DATAS}
        {prop_FOCUS}
        bind:info_HEIGHT
        bind:title_HEIGHT
        >
            {#if system_TARGET}
                <Table
                prop_TITLE={system_TARGET.tag}
                prop_LINES={system_TARGET.skills}
                prop_TRANSLATE_Y={title_HEIGHT}
                prop_REDUCE={info_HEIGHT}
                on:click={table_eClick}
                />
            {/if}
        </Content>
    </div>
</div>

<!-- #STYLE -->

<style
lang="scss"
>
/* #USES */

@use '../../assets/scss/styles/elements';
@use '../../assets/scss/styles/position';
@use '../../assets/scss/styles/size';

/* #SKILLS */

#skills
{
    @include position.placement(absolute, 0, 0, auto, 0);

    @extend %any;

    .wrapper { @extend %wrapper; }
}
</style>