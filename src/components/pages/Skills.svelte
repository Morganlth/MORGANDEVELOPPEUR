<!-- #MAP

-APP
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
    prop_INTRO = false,
    prop_RATIO = 0

// #IMPORTS

    // --JS
    import { SKILLS_CONTENT_DATAS } from '../../assets/js/datas/dSkills'

    // --CONTEXT
    import { APP } from '../../App.svelte'

    // --SVELTE
    import { onMount } from 'svelte'

    // --COMPONENT-COVER
    import Content from '../covers/Content.svelte'

    // --COMPONENT-ELEMENTS
    import System from '../elements/System.svelte'
    import Table from '../elements/Table.svelte'

// #VARIABLES

    // --ELEMENT-SKILLS
    let skills_CHARGED = false

    // --ELEMENT-SYSTEM
    let system_TARGET = null

    // --ELEMENT-TITLE
    let title_HEIGHT = 0

// #FUNCTIONS

    // --SET
    function skills_set() { skills_CHARGED = true }

    // --EVENT
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
style:z-index={prop_FOCUS ? 1 : 0}
>
    <div
    class="wrapper"
    >
        <System
        prop_START={prop_FOCUS && !prop_INTRO}
        {prop_FOCUS}
        {prop_RATIO}
        bind:system_TARGET
        />

        <Content
        prop_CHARGED={skills_CHARGED}
        prop_INTRO={prop_INTRO && !system_TARGET}
        {...SKILLS_CONTENT_DATAS}
        {prop_FOCUS}
        bind:title_HEIGHT
        >
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
    @include position.placement(absolute, $top: 0, $right: 0, $left: 0);

    @extend %any;

    .wrapper { @extend %wrapper; }
}
</style>