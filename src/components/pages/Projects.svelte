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

    // --COMPONENT-COVERS
    import Content from '../covers/Content.svelte'
    import Group from '../covers/Group.svelte'

    // --COMPONENT-ELEMENT
    import Card from '../elements/Card.svelte'

    // --COMPONENT-DECORS
    import Particles from '../decors/Particles.svelte'

// #VARIABLES

    // --ELEMENT-PROJECTS
    let projects_CHARGED = false

    // --ELEMENT-TITLE
    let title_HEIGHT

    // --ELEMENT-GROUP
    let group_update

// #FUNCTION

    // --SET
    function projects_set() { projects_CHARGED = true; group_update() }

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
        <Particles />

        <Content
        prop_CHARGED={projects_CHARGED}
        {...PROJECTS_CONTENT_DATAS}
        {prop_FOCUS}
        {prop_INTRO}
        bind:title_HEIGHT
        >
            <Group
            let:children
            bind:group_update
            >
                {#each [0, 1, 2] as id}
                    <Card
                    prop_ID={id}
                    prop_GROUP={children}
                    />
                {/each}
            </Group>
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
@use '../../assets/scss/styles/display';
@use '../../assets/scss/styles/size';

/* #PROJECTS */

#projects
{
    @include position.placement(absolute, $top: 0, $right: 0, $left: 0);

    @extend %any;

    .wrapper { @extend %wrapper; }

    :global { .group { @extend %f-j-center; } }
}
</style>