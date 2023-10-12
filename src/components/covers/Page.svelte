<!-- #MAP

-EVENT
-PROCESS
    PAGE
        WRAPPER
            INFO
            TITLE
                ?FRAGMENTS * n
                ?FRAGMENT
                ?ELEMENT
                    :COMPONENT
            ?NAV
            :COMPONENT

-->

<!-- #SCRIPT -->

<script>
// #EXPORTS

    // --PROPS
    export let
    prop_NAME = '',

    prop_FOCUS = false,
    prop_INTRO = false,

    prop_COMPONENT = {},
    prop_INFO = '',
    prop_TITLE = {},
    prop_NAV = {},
    prop_PROPS = {},
    prop_PROCESS = {}

// #IMPORTS

    // --JS
    import { transform_getTranslate3d } from '../../assets/js/utils/transform'
    import { animation_writing } from '../../assets/js/utils/animation'

    // --CONTEXTS
    import { EVENT, PROCESS } from '../../App.svelte'

    // --SVELTE
    import { onMount, onDestroy } from 'svelte'

    // --COMPONENT-COVER
    import Wrapper from './Wrapper.svelte'

    // --COMPONENT-ELEMENTS
    import Info from '../elements/Info.svelte'
    import Fragments from '../elements/Fragments.svelte'
    import Nav from '../elements/Nav.svelte'

// #CONSTANTE

    // --ELEMENT-FRAGMENTS
    const
    FRAGMENTS_FRAGS = [],
    FRAGMENTS_TAGS = [],
    FRAGMENTS_EVENTS = {}

// #VARIABLES

    // --ELEMENT-PAGE
    let
    page_CHARGED = false,

    page_NAV,

    page_process

    // --ELEMENT-TITLE
    let title_HEIGHT = 0

    // --ELEMENT-FRAGMENTS
    let fragments_TIMEOUT

// #REACTIVE

    // --ELEMENT-TITLE
    $: page_CHARGED ? title_update(prop_INTRO) : void 0

// #FUNCTIONS

    // --SET
    function page_set() { PROCESS.process_push(prop_PROCESS, page_process) }

    function fragments_setEvents() { EVENT.event_add(FRAGMENTS_EVENTS) }

    // --DESTROY
    function page_destroy() { fragments_destroy() }

    function fragments_destroy()
    {
        clearTimeout(fragments_TIMEOUT)
    
        fragments_destroyEvents()
    }

    function fragments_destroyEvents() { EVENT.event_remove(FRAGMENTS_EVENTS) }

    // --GET
    function fragments_getStyle(i)
    {
        return `
        transform: ${transform_getTranslate3d()};
        transition: transform 1.2s ${50 * i}ms ease-out;`
    }

    // --UPDATE
    async function title_update(intro) { intro ? title_intro() : title_outro() }

    // --EVENT
    function nav_eClick({detail})
    {
        const ID = detail.id
    
        page_NAV.callback(detail)

        prop_NAV[ID] = prop_NAV[ID]
    }

    // --INTROS
    function title_intro()
    {
        fragments_introFrags()
        fragments_introTags()
    }

    function fragments_introFrags() { for (const FRAG of FRAGMENTS_FRAGS) FRAG.style.transform = `translate3d(0, 0, 0)` }

    function fragments_introTags()
    {
        if (FRAGMENTS_TAGS.length)
        {
            fragments_destroy()

            FRAGMENTS_EVENTS.animation = animation_writing(FRAGMENTS_TAGS, fragments_destroyEvents)

            fragments_TIMEOUT = setTimeout(fragments_setEvents, 1100)
        }
    }

    // --OUTROS
    function title_outro() { fragments_outroFrags() }

    function fragments_outroFrags() { for (const FRAG of FRAGMENTS_FRAGS) FRAG.style.transform = transform_getTranslate3d() }

// #CYCLES

onMount(page_set)
onDestroy(page_destroy)
</script>

<!-- #HTML -->

<div
id={prop_NAME}
class="page"
style:z-index={prop_FOCUS ? 1 : 0}
>
    <Wrapper>
        <Info
        prop_CONTENT={prop_INFO}
        {prop_FOCUS}
        slot="info"
        />
    
        <svelte:element
        this={prop_TITLE.html}
        class="title"
        style:opacity={page_CHARGED && prop_INTRO ? 1 : 0}
        bind:offsetHeight={title_HEIGHT}
        slot="title"
        >
            {#each prop_TITLE.fragments as fragments}
                <Fragments
                prop_FRAGS={{ children: FRAGMENTS_FRAGS, value: fragments.frags ?? '-' }}
                prop_TAGS={{ children: FRAGMENTS_TAGS, value: fragments.tags }}
                prop_STYLE={fragments_getStyle}
                />
            {/each}

            {#if prop_TITLE.element}
                <div
                class="element"
                style:transform={transform_getTranslate3d()}
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

        <svelte:fragment
        slot="nav"
        >
            {#if page_NAV && prop_FOCUS}
                <Nav
                prop_TRANSLATE_Y={title_HEIGHT - (page_NAV.offset ?? 0)}
                prop_ITEMS={prop_NAV}
                {prop_INTRO}
                on:click={nav_eClick}
                />
            {/if}
        </svelte:fragment>

        <svelte:component
        this={prop_COMPONENT}
        {...prop_PROPS}
        bind:page_CHARGED
        bind:PAGE_NAV={page_NAV}
        bind:page_process
        />
    </Wrapper>
</div>

<!-- #STYLE -->

<style
lang="scss"
>
/* #USES */

@use 'sass:map';

@use '../../assets/scss/app';

@use '../../assets/scss/styles/position';
@use '../../assets/scss/styles/size';
@use '../../assets/scss/styles/font';
@use '../../assets/scss/styles/media';

/* #PAGE */

.page
{
    @include position.placement(absolute, 0, 0, 0, 0);

    @extend %any;

    .title
    {
        @include font.h-(1);
    
        @extend %m-h-1;

        z-index: 1;

        perspective: 300px;

        width: fit-content;
        height: fit-content;

        padding-bottom: 5rem;

        transition: opacity .6s ease-in;

        .element { transition: transform 1.2s ease-out; }

        :global
        {
            &>* { padding-top: 2rem; }

            @include media.min($ms3)
            {
                .fragments
                {
                    &::before
                    {
                        @include position.placement(absolute, $top: 1rem, $left: 0, $pseudo-element: true);

                        width: 2.4rem;
                        height: 2.4rem;

                        background-color: $primary;
                    }

                    position: relative;

                    padding-left: app.$gap-inline;
                }
                .fragments:nth-child(1) { margin-left: app.$gap-inline; } 
            }
        }
    }
}
</style>