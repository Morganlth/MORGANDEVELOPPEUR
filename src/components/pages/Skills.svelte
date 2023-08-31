<!-- #MAP

    SKILLS
        WRAPPER
            MOON
            CONTENT

-->

<!-- #SCRIPT -->

<script>
// #EXPORTS

    // --PROPS
    export let
    prop_FOCUS = false,
    prop_OFFSET_TOP = 0,
    prop_BREAK = 0

// #IMPORTS

    // --JS
    import { SKILLS_CONTENT_DATAS } from '../../assets/js/datas/dSkills'

    // --SVELTE
    import { onMount } from 'svelte'

    // --COMPONENT-COVER
    import Content from '../covers/Content.svelte'

    // --COMPONENT-ELEMENT
    import System from '../elements/System.svelte'

// #VARIABLE

    // --ELEMENT-SKILLS
    let skills_CHARGED = false

// #FUNCTION

    // --SET
    function skills_set()
    {
        skills_CHARGED = true
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
        {prop_FOCUS}
        {prop_OFFSET_TOP}
        {prop_BREAK}
        />

        <Content
        prop_CHARGED={skills_CHARGED}
        {...SKILLS_CONTENT_DATAS}
        {prop_FOCUS}
        >
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