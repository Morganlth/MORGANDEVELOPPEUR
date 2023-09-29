<!-- #MAP

    PROJECTS
        PARTICLES

        CONTENT
            GROUP
                #if CARD * n
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

    // --LIB
    import COLORS from '$lib/colors'

    // --SVELTE
    import { onMount } from 'svelte'

    // --COMPONENT-COVERS
    import Content from '../covers/Content.svelte'
    import Group from '../covers/Group.svelte'

    // --COMPONENT-ELEMENT
    import Card from '../elements/Card.svelte'

    // --COMPONENT-DECORS
    import Particles from '../decors/Particles.svelte'
    import Card2Hearts from '../decors/Card2Hearts.svelte'
    import Card3Diamonds from '../decors/Card3Diamonds.svelte'
    import Card1Clubs from '../decors/Card1Clubs.svelte'

// #CONSTANTE

    // --ELEMENT-GROUP
    const GROUP_ELEMENT =
    [
        {
            card: Card3Diamonds,
            color: COLORS.primary
        },
        {
            card: Card2Hearts,
            color: COLORS.primary
        },
        {
            card: Card1Clubs,
            color: COLORS.light
        }
    ]

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
            {#each GROUP_ELEMENT as element, id}
                <Card
                prop_ID={id}
                prop_COLOR={element.color}
                prop_GROUP={children}
                {prop_FOCUS}
                >
                    <svelte:component
                    this={element.card}
                    />
                </Card>
            {/each}
        </Group>
    </Content>
</div>

<!-- #STYLE -->

<style
lang="scss"
>
/* #USES */

@use '../../assets/scss/styles/position';
@use '../../assets/scss/styles/size';

/* #PROJECTS */

#projects
{
    :global
    {
        .group
        {
            @include position.placement(absolute, 0, 0, 0, 0);

            @extend %any;

            perspective: 2000px;
        }
    }
}
</style>