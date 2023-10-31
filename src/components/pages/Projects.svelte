<!-- #MAP

-APP
-ROUTER
-EVENT
    PROJECTS
        GROUP
            CARD * n
        MASK2
        PROJECT
            BOOKI | SOPHIEBLUEL | NINACARDUCCI

-->

<!-- #SCRIPT -->

<script>
// #EXPORTS

    // --PROPS
    export let
    prop_ID = void 0,

    prop_FOCUS = false,
    prop_INTRO = false,

    prop_ABOUT = [],
    prop_PROJECTS = [],
    prop_CARDS = [],

    prop_TOP = 0,
    prop_START = 0

    // --BINDS
    export let page_CHARGED = false

    export const PAGE_NAV = { callback: nav_e$Click }

    // BIND page_process

// #IMPORTS

    // --CONTEXTS
    import { APP, ROUTER, EVENT } from '../../App.svelte'

    // --SVELTE
    import { onMount } from 'svelte'

    // --COMPONENT-COVER
    import Group from '../covers/Group.svelte'

    // --COMPONENT-ELEMENTS
    import Card from '../elements/Card.svelte'
    import Mask2 from '../elements/mask/Mask2.svelte'
    import About from '../elements/About.svelte'

// #VARIABLES

    // --APP
    let app_$FREEZE = APP.app_$FREEZE

    // --ROUTER
    let router_$SUBPATH = ROUTER.router_$SUBPATH

    // --ELEMENT-PARTICLES
    let particles

    // --ELEMENT-PROJECTS
    let projects

    // --ELEMENT-CARD
    let card_HOVER

    // --ELEMENT-PROJECT
    let
    project_TARGET,
    
    project_TIMEOUT

// #REACTIVES

    // --APP
    $: !$app_$FREEZE ? router_update(null) : void 0

    // --ELEMENT-CARD
    $: card$_ON = prop_FOCUS && !prop_INTRO

    // --ELEMENT-PROJECT
    $: projects_updateTarget($router_$SUBPATH)

// #FUNCTIONS

    // --SET
    function projects_set() { page_CHARGED = true }

    // --GET
    function card_get(name) { return prop_CARDS.find(card => card.name === name) ?? null }

    // --UPDATES
    function app_update(value) { APP.app_$FREEZE = { value: value, target: prop_ID } }

    function router_update(id)
    {
        if (!project_TIMEOUT && (id != null || project_TARGET))
        {
            const VALUE = project_TARGET?.id === id ? null : id
    
            ROUTER.router_updateSubPath(prop_ID, VALUE == null ? null : prop_CARDS[id].name)
            ROUTER.router_updatePath(prop_ID)
        }
    }

    function projects_updateTarget(subPath)
    {
        if (project_TIMEOUT || prop_START === 0) return
    
        const
        CARD = card_get(subPath),
        [PROJECT, VALUE] = CARD ? [prop_PROJECTS[CARD.id], true] : [null, false]

        CARD
        ? EVENT.event_scrollTo(prop_START, true, false)
        : projects?.scrollTo({ top: 0 })

        project_TIMEOUT = setTimeout(() =>
        {
            app_update(VALUE)

            project_TIMEOUT = null
        },
        400.08)

        projects_updateParticles(VALUE)

        project_TARGET = PROJECT
    }

    function projects_updateParticles(value) { (particles ??= document.querySelector('.particles')).moveTo(value ? projects : null) }

    function card_updateCardHover(id) { card_HOVER = id }

    // --EVENTS
    function card_e$MouseEnter(id) { card_updateCardHover(id) }

    function card_e$MouseLeave() { card_updateCardHover(null) }

    function card_e$Click({ detail: {id} }) { router_update(id) }

    export function nav_e$Click({id}) { router_update(id) }

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
                const CARD = card_get(str)
                if (CARD) router_update(CARD.id)
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
class:scroller={project_TARGET}
data-page-id={prop_ID}
bind:this={projects}
>
    {#if project_TARGET}
        <About
        prop_CONTENT={[prop_ABOUT, (project_TARGET.about ?? [])]}
        />

        <div
        class="project"
        >
            <svelte:component
            this={project_TARGET.component}
            prop_DATAS={project_TARGET.datas}
            />
        </div>
    {/if}

    <Group
    let:resize
    >
        {#each prop_CARDS as card}
            <Card
            prop_$RESIZE={resize}
            prop_CARD_HOVER={card_HOVER}
            prop_ON={card$_ON}
            prop_ID={card.id}
            prop_TARGET={project_TARGET ? project_TARGET.id === card.id ? 1 : -1 : 0}
            prop_CONTENT={card.value}
            prop_COLOR={card.color}
            prop_$MOUSEENTER={card_e$MouseEnter}
            prop_$MOUSELEAVE={card_e$MouseLeave}
            on:click={card_e$Click}
            >
                <svelte:component
                this={card.texture}
                />
            </Card>
        {/each}
    </Group>

    <Mask2
    prop_DESTROY={!project_TARGET}
    />
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

:global #projects .wrapper { transform: scale(1); } /* fixed children */

.projects
{
    @include position.placement(absolute, 0, 0, 0, 0);

    @extend %any;

    overflow: clip;

    &.scroller
    {
        @extend %scroll-bar;

        z-index: 2;

        overflow-y: scroll;

        pointer-events: auto;
    }

    .project
    {
        @include position.placement(absolute, $top: 100vh, $right: 0, $left: 0);
    
        z-index: 1;

        width: 100%;
        height: fit-content;
    }

    :global
    {
        .particles { z-index: -1; }
    
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
</style>