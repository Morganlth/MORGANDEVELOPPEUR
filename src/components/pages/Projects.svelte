<!-- #MAP

    PROJECTS
        WRAPPER
            CONTENT
-->

<!-- #SCRIPT -->

<script>
// #EXPORT

    // --PROP
    export let
    prop_FOCUS = false,
    prop_INTRO = false

// #IMPORT

    // --JS
    import { PROJECTS_CONTENT_DATAS } from '../../assets/js/datas/dProjects'

    // --SVELTE
    import { onMount } from 'svelte'

    // --COMPONENT-COVER
    import Content from '../covers/Content.svelte'

    // --COMPONENT-DECORS
    import Particles from '../decors/Particles.svelte'

// #VARIABLES

    // --ELEMENT-PROJECTS
    let projects_CHARGED = false

    // --ELEMENT-TITLE
    let title_HEIGHT

// #FUNCTION

    // --SET
    function projects_set() { projects_CHARGED = true }

// #CYCLE

onMount(projects_set)
</script>

<!-- #HTML -->

<div
id="projects"
style:z-index={prop_FOCUS ? 1 : 0}
>
    <div
    class="wrapper"
    >
        <!-- <Particles /> -->

        <Content
        prop_CHARGED={projects_CHARGED}
        {...PROJECTS_CONTENT_DATAS}
        {prop_FOCUS}
        {prop_INTRO}
        bind:title_HEIGHT
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

/* #PROJECTS */

#projects
{
    @include position.placement(absolute, 0, 0, auto, 0);

    @extend %any;

    .wrapper
    {
        @extend %wrapper;
    }
}
</style>