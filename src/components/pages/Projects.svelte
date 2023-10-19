<!-- #MAP

-APP
-EVENT
    PROJECTS
        PARTICLES

        GROUP
            CARD * n

-->

<!-- #SCRIPT -->

<script>
// #EXPORTS

    // --PROPS
    export let
    prop_ID = void 0,

    prop_FOCUS = false,
    prop_INTRO = false,

    prop_CARDS = [],

    prop_TOP = 0,
    prop_START = 0

    // --BINDS
    export let page_CHARGED = false

    export const PAGE_NAV = { callback: nav_e$Click }

    // BIND page_process

// #IMPORTS

    // --JS
    import { wait_throttle } from '../../assets/js/utils/wait'

    // --CONTEXTS
    import { APP, EVENT } from '../../App.svelte'

    // --SVELTE
    import { onMount } from 'svelte'

    // --COMPONENT-COVER
    import Group from '../covers/Group.svelte'

    // --COMPONENT-ELEMENTS
    import Card from '../elements/Card.svelte'
    import Mask2 from '../elements/Mask2.svelte'

// #VARIABLES

    // --APP
    let app_$FREEZE = APP.app_$FREEZE

    // --ELEMENT-PROJECTS
    let projects_TARGET

    // --ELEMENT-CONTAINER
    let
    container,
    
    container_SCROLLTOP = 0

    // --ELEMENT-CARD
    let card_HOVER

// #REACTIVES

    // --APP
    $: !$app_$FREEZE ? projects_TARGET = null : void 0

    // --ELEMENT-CARD
    $: card_ON = prop_FOCUS && !prop_INTRO

// #FUNCTIONS

    // --SET
    function projects_set() { page_CHARGED = true }

    // --UPDATES
    function projects_updateTarget(id)
    {
        const NULL = id == null
    
        projects_TARGET = NULL ? null : prop_CARDS[id]

        APP.app_$FREEZE = { value: !NULL, target: prop_ID }

        if (NULL) container.scrollTo({ top: container_SCROLLTOP = 0 })
    }

    function card_updateCardHover(id) { card_HOVER = id }

    // --EVENTS
    const container_e$Scroll = wait_throttle(async ({target: {scrollTop}}) => { container_SCROLLTOP = scrollTop }, 200.04)

    function card_e$MouseEnter(id) { card_updateCardHover(id) }

    function card_e$MouseLeave() { card_updateCardHover(null) }

    function card_e$Click(id) { projects_updateTarget(id) }

    export function nav_e$Click({id}) { projects_updateTarget(projects_TARGET === id ? null : id) }

    // --UTIL
    export function page_process(str, target)
    {
        switch (target)
        {
            case 'top':
                EVENT.event_scrollTo(prop_TOP, true)
                break
            case 'start':
                EVENT.event_scrollTo(prop_START, true)
                break
            case 'cards':
                EVENT.event_scrollTo(prop_START, true)
            default:
                break
        }
    }

// #CYCLE

onMount(projects_set)
</script>

<!-- #HTML -->

<div
class="projects"
data-page-id={prop_ID}
>
    <div
    class="container"
    class:scroller={projects_TARGET}
    bind:this={container}
    on:scroll={container_e$Scroll}
    >
        <Group
        let:resize
        >
            {#each prop_CARDS as card}
                <Card
                prop_$RESIZE={resize}
                prop_CARD_HOVER={card_HOVER}
                prop_ON={card_ON}
                prop_ID={card.id}
                prop_TARGET={projects_TARGET == null ? 0 : projects_TARGET.id === card.id ? 1 : -1}
                prop_SCROLLTOP={container_SCROLLTOP}
                prop_CONTENT={card.value}
                prop_COLOR={card.color}
                prop_$MOUSEENTER={card_e$MouseEnter}
                prop_$MOUSELEAVE={card_e$MouseLeave}
                prop_$CLICK={card_e$Click}
                >
                    <svelte:component
                    this={card.texture}
                    />
                </Card>
            {/each}
        </Group>
    
        {#if projects_TARGET}
            <Mask2
            prop_DURATION={1000}
            />

            <div
            class="project"
            >
                <svelte:component
                this={projects_TARGET.component}
                prop_DATAS={projects_TARGET.datas}
                />
            </div>
        {/if}
    </div>
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

.projects
{
    .container
    {
        @include position.placement(absolute, 0, 0, 0, 0);
    
        @extend %any;

        transform: scale(1); /* fixed children */

        pointer-events: auto;

        &.scroller
        {
            @extend %scroll-bar;

            z-index: 2;

            overflow: hidden scroll;
        }

        .project
        {
            @include position.placement(relative, 100vh);

            z-index: 1;

            width: 100%;
            height: fit-content;
        }

        :global
        {
            .group
            {
                @include position.placement(fixed, 0, 0, 0, 0);
    
                @extend %any;
            }

            .tag
            {
                @include position.placement(absolute, $top: 0, $left: 0);

                z-index: 1;

                transform: translate(-50%, -100%);

                pointer-events: none;
            }
        }
    }
}
</style>