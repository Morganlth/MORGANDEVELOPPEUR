<!-- #MAP

    PROJECTS
        PARTICLES

        CONTENT
            GROUP
                CARD * n
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
    import { PROJECTS_CONTENT_DATAS, PROJECTS_CARDS_DATAS } from '../../assets/js/datas/dProjects'

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

    // --ELEMENT-CARD
    let
    card_FOCUS,
    card_TARGET

// #REACTIVE

    // --ELEMENT-CARD
    $: !prop_FOCUS ? card_e$Click(void 0) : void 0

// #FUNCTIONS

    // --SET
    function projects_set() { projects_CHARGED = true }

    // --EVENTS
    function card_e$MouseEnter(id) { card_FOCUS = id }

    function card_e$MouseLeave() { card_FOCUS = null }

    function card_e$Click(id) { card_TARGET = id }

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
        let:resize
        >
            {#each GROUP_ELEMENT as element, id}
                <Card
                prop_$RESIZE={resize}
                prop_ON={prop_FOCUS && (card_TARGET == null || card_TARGET === id)}
                prop_FOCUS={card_FOCUS}
                prop_ID={id}
                prop_CONTENT={PROJECTS_CARDS_DATAS[id]}
                prop_COLOR={element.color}
                prop_$MOUSEENTER={card_e$MouseEnter}
                prop_$MOUSELEAVE={card_e$MouseLeave}
                prop_$CLICK={card_e$Click}
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

            perspective: 3000px;
        }
    }
}
</style>