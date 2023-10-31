<!-- #MAP

-EVENT
    TITLE
        ?FRAGMENTS * n
        ?FRAGMENT
        ?ELEMENT
            :COMPONENT

-->

<!-- #SCRIPT -->

<script>
// #EXPORTS

    // --PROPS
    export let
    prop_CHARGED = false,
    prop_INTRO = false,

    prop_TITLE = {}

    // --BINDS
    export let title_HEIGHT = 0

// #IMPORTS

    // --JS
    import { animation_writing, animation_erase } from '../../../assets/js/utils/animation'

    // --LIB

    // --CONTEXTS
    import { EVENT } from '../../../App.svelte'

    // --SVELTE
    import { onDestroy } from 'svelte'

    // --COMPONENT-ELEMENT
    import Fragments from '../Fragments.svelte'

// #CONSTANTES

    // --ELEMENT-FRAGMENTS
    const
    FRAGMENTS_FORCE = 2000,

    FRAGMENTS_FRAGS = [],
    FRAGMENTS_TAGS = [],

    FRAGMENTS_EVENTS = {}

// #VARIABLES

     // --ELEMENT-FRAGMENTS
     let fragments_TIMEOUT

// #REACTIVES

    // --ELEMENT-TITLE
    $: prop_CHARGED ? title_updateInOut(prop_INTRO) : void 0

// #FUNCTIONS

    // --SET
    function fragments_setEvents() { EVENT.event_add(FRAGMENTS_EVENTS) }

    // --GET
    function fragments_getTranslate3d()
    {
        function get() { return Math.random() * FRAGMENTS_FORCE - FRAGMENTS_FORCE / 2 }

        return `translate3d(${get()}px, ${get()}px, ${get()}px)`
    }

    function fragments_getStyle(i)
    {
        return `
        transform: ${fragments_getTranslate3d()};
        opacity: 0;
        transition: transform ease-out, opacity;
        transition-duration: .6s;
        transition-delay: ${.05 * i}s;`
    }

    // --UPDATES
    function title_updateInOut(intro) { intro ? title_intro() : title_outro() }

    function fragments_updateFrags(opacity, transform)
    {
        for (const FRAG of FRAGMENTS_FRAGS)
        {
            FRAG.style.transform = transform ?? fragments_getTranslate3d()
            FRAG.style.opacity = opacity
        }
    }

    function fragments_updateTags(animation = () => {}, delay = 0)
    {
        if (FRAGMENTS_TAGS.length)
        {
            fragments_destroy()

            FRAGMENTS_EVENTS.animation = animation(FRAGMENTS_TAGS, fragments_destroyEvents)

            fragments_TIMEOUT = setTimeout(fragments_setEvents, delay)
        }
    }

    // --CLEAR

    // --DESTROY
    function title_destroy() { fragments_destroy() }
    
    function fragments_destroy()
    {
        clearTimeout(fragments_TIMEOUT)
    
        fragments_destroyEvents()
    }

    function fragments_destroyEvents() { EVENT.event_remove(FRAGMENTS_EVENTS) }

        // !======IN-OUT=======!

    // --INTROS
    function title_intro()
    {
        const TRANSFORM = 'translate3d(0, 0, 0)'
    
        fragments_updateFrags(1, TRANSFORM)
        fragments_updateTags(animation_writing, 1000)
    }

    // --OUTROS
    function title_outro()
    {
        fragments_updateFrags(0)
        fragments_updateTags(animation_erase)
    }

        // !======CONTEXT======!

    // --COMMANDS

    // --EVENTS

        // !======T-A==========!

    // --TRANSITIONS

    // --ANIMATIONS

        // !======CONTROL======!

    // --START

    // --END

        // !======TEST=========!

    // --TESTS

        // !======CANVAS=======!

    // --DRAW

// #LIFECYCLES

onDestroy(title_destroy)
</script>

<!-- #HTML -->

<svelte:element
this={prop_TITLE.html}
class="title"
class:focus={prop_INTRO}
data-pe-content={prop_TITLE.fragments[0]?.frags?.substring(0, 1)}
bind:offsetHeight={title_HEIGHT}
>
    {#each prop_TITLE.fragments ?? [] as fragments}
        <Fragments
        prop_FRAGS={{ children: FRAGMENTS_FRAGS, value: fragments.frags ?? '' }}
        prop_TAGS={{ children: FRAGMENTS_TAGS, value: fragments.tags }}
        prop_STYLE={fragments_getStyle}
        />
    {/each}

    {#if prop_TITLE.element}
        <div
        class="element"
        style:transform={fragments_getTranslate3d()}
        style:opacity="0"
        bind:this={FRAGMENTS_FRAGS[FRAGMENTS_FRAGS.length]}
        >
            <svelte:component
            this={prop_TITLE.element.component}
            {...prop_TITLE.element.props ?? {}}
            >
                {#each prop_TITLE.element.children ?? [] as child}
                    <svelte:component
                    this={child.component}
                    {...child.props ?? {}}
                    />
                {/each}
            </svelte:component>
        </div>
    {/if}
</svelte:element>

<!-- #STYLE -->

<style
lang="scss"
>
/* #USES */

@use '../../../assets/scss/app';

@use '../../../assets/scss/styles/position';
@use '../../../assets/scss/styles/display';
@use '../../../assets/scss/styles/font';

@use '../../../assets/scss/styles/media';

/* #TITLE */

.title
{
    @include font.h-(1);

    @extend %f-column;
    @extend %m-h-1;

    position: relative;

    gap: 2rem;

    perspective: 1000px;

    width: fit-content;
    height: fit-content;

    padding-bottom: 3rem;

    :global .fragments { min-height: 3rem; }

    .element { transition: transform .8s ease-out; }

    @include media.min($ms3, $ms3)
    {
        $pe-duration: .4s;
    
        &::before
        {
            @include position.placement(absolute, $top: 0, $left: 0, $pseudo-element: attr(data-pe-content));

            padding-right: 2rem;
        
            clip-path: polygon(100% 0, 100% 0, 100% 100%, 100% 100%);

            color: $intermediate;
            font-family: inherit;
            font-size: 240%;
            font-style: italic;

            transition: clip-path $pe-duration ease-in-out;
        }

        &.focus::before
        {
            clip-path: polygon(0 0, 100% 0, 100% 100%, 0% 100%);

            transition-delay: $pe-duration;
        }

        :global .fragments
        {
            &:nth-child(1) { margin-left: calc(app.$gap-inline * 2); }
            &:nth-child(2) { margin-left: app.$gap-inline; }
        }
    }
}
</style>