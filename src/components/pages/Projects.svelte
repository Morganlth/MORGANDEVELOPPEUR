<!-- #MAP

-APP
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
    prop_INTRO = false,

    prop_RATIO = 0

// #IMPORT

    // --JS
    import { PROJECTS_CONTENT_DATAS, NAV_ITEMS_DATAS } from '../../assets/js/datas/dProjects'

    // --LIB
    import COLORS from '$lib/colors'

    // --CONTEXT
    import { APP } from '../../App.svelte'

    // --SVELTE
    import { onMount, onDestroy } from 'svelte'

    // --COMPONENT-PAGE
    import Booki from './Booki.svelte'

    // --COMPONENT-COVERS
    import Content from '../covers/Content.svelte'
    import Group from '../covers/Group.svelte'

    // --COMPONENT-ELEMENTS
    import Card from '../elements/Card.svelte'
    import Mask2 from '../elements/Mask2.svelte'
    import Nav from '../elements/Nav.svelte'

    // --COMPONENT-CARDS
    import AceClubs from '../cards/AceClubs.svelte'
    import TwoHearts from '../cards/TwoHearts.svelte'
    import ThreeDiamonds from '../cards/ThreeDiamonds.svelte'

    // --COMPONENT-DECOR
    import Particles from '../decors/Particles.svelte'

// #CONSTANTE

    // --ELEMENT-GROUP
    const GROUP_CARDS =
    [
        {
            id: 0,
            texture: ThreeDiamonds,
            color: COLORS.indicator
        },
        {
            id: 1,
            texture: TwoHearts,
            color: COLORS.indicator
        },
        {
            id: 2,
            texture: AceClubs,
            color: COLORS.primary
        }
    ]

// #VARIABLES

    // --ELEMENT-PROJECTS
    let
    projects_CHARGED = false,

    projects_TARGET

    // --ELEMENT-TITLE
    let title_HEIGHT

    // --ELEMENT-CARD
    let
    card_ON = false,

    card_I = 0,

    card_HOVER,

    card_INTERVAL

// #REACTIVE

    // --ELEMENT-CARD
    $: card_update(prop_INTRO)

// #FUNCTIONS

    // --SET
    function projects_set() { projects_CHARGED = true }

    // --DESTROY
    function projects_destroy() { card_clear() }

    // --UPDATES
    function projects_updateTarget(id)
    {
        projects_TARGET = id == null ? null : { id: id, component: Booki }

        APP.app_$FREEZE = { on: id != null, target: 'system' }
    }

    function card_update(intro)
    {
        card_ON = !intro && prop_RATIO > 0

        card_ON ? card_intro() : card_clear()
    }

    function card_updateCardHover(id) { card_HOVER = id }

    // --EVENTS
    function card_e$MouseEnter(id) { card_updateCardHover(id) }

    function card_e$MouseLeave() { card_updateCardHover(null) }

    function card_e$Click(id) { projects_updateTarget(id) }

    function nav_eClick({detail: { id }}) { projects_updateTarget(projects_TARGET === id ? null : id) }

    // --INTRO
    function card_intro()
    {
        card_I = 1

        card_INTERVAL = setInterval(() =>
        {
            card_I++

            if (card_I >= GROUP_CARDS.length) card_clear()
        }, 600)
    }

    // --CLEAR
    function card_clear() { clearInterval(card_INTERVAL) }

// #CYCLES

onMount(projects_set)
onDestroy(projects_destroy)
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
        <div
        class="container"
        class:scroller={projects_TARGET}
        >
            {#if card_ON}
                <Group
                let:resize
                >
                    {#each GROUP_CARDS.slice(0, card_I) as card}
                        {#if !projects_TARGET || projects_TARGET.id === card.id}
                            <Card
                            prop_$RESIZE={resize}
                            prop_CARD_HOVER={card_HOVER}
                            prop_ID={card.id}
                            prop_TARGET={projects_TARGET != null}
                            prop_CONTENT={NAV_ITEMS_DATAS[card.id].value}
                            prop_COLOR={card.color}
                            prop_$MOUSEENTER={card_e$MouseEnter}
                            prop_$MOUSELEAVE={card_e$MouseLeave}
                            prop_$CLICK={card_e$Click}
                            >
                                <svelte:component
                                this={card.texture}
                                />
                            </Card>
                        {/if}
                    {/each}
                </Group>
            {/if}
        
            {#if projects_TARGET}
                <Mask2
                prop_DURATION={1000}
                />

                <div
                class="project"
                >
                    <svelte:component
                    this={projects_TARGET.component}
                    />
                </div>
            {/if}
        </div>

        {#if prop_FOCUS}
            <Nav
            prop_TRANSLATE_Y={title_HEIGHT}
            prop_ITEMS={NAV_ITEMS_DATAS}
            {prop_INTRO}
            on:click={nav_eClick}
            />
        {/if}
    </Content>
</div>

<!-- #STYLE -->

<style
lang="scss"
>
/* #USES */

@use '../../assets/scss/styles/utils';
@use '../../assets/scss/styles/position';
@use '../../assets/scss/styles/size';

/* #PROJECTS */

#projects
{
    .container
    {
        @include position.placement(absolute, 0, 0, 0, 0);
    
        @extend %any;

        pointer-events: auto;

        &.scroller
        {
            @extend %scroll-bar;

            overflow: hidden scroll;
        }

        .project
        {
            @include position.placement(absolute, 100vh);

            width: 100%;
            height: fit-content;
        }

        :global
        {
            .group
            {
                @include position.placement(sticky, $top: 0, $left: 0);
    
                @extend %any;
            }
        }
    }
}
</style>