<!-- #MAP

-EVENT
    CONTENT
        INFO
        TITLE
            #if FRAGMENTS * n
            #else FRAGMENT
            #if ELEMENT
                ~SLOT
        ~SLOT

-->

<!-- #SCRIPT -->

<script>
// #EXPORTS

    // --PROPS
    export let
    prop_TITLE =
    {
        htmlElement: 'h2',
        contents: {},
        element: false
    },
    prop_INFO = '',
    prop_CHARGED = false,
    prop_FOCUS = false

// #IMPORTS

    // --JS
    import { transform_getTranslate3d } from '../../assets/js/utils/transform'
    import { animation_writing } from '../../assets/js/utils/animation'

    // --CONTEXT
    import { EVENT } from '../../App.svelte'

    // --SVELTE
    import { onDestroy } from 'svelte'

    // --COMPONENT-ELEMENT
    import Fragments from '../elements/Fragments.svelte'

// #CONSTANTES

    // --ELEMENT-TITLE
    const TITLE_CHILDREN = { frags: [], tags: [] }

    // --ELEMENT-FRAGMENTS
    const FRAGMENTS_EVENTS = {}

// #VARIABLES

    // --ELEMENT-CONTENT
    let content_OPACITY = 0

    // --ELEMENT-FRAGMENTS
    let fragments_TIMEOUT

// #REACTIVE

    // --ELEMENT-CONTENT
    $: prop_CHARGED ? content_update(prop_FOCUS) : void 0

// #FUNCTIONS

    // --SET
    function fragments_setEvents() { EVENT.event_add(FRAGMENTS_EVENTS) }

    // --DESTROY
    function fragments_destroy()
    {
        clearTimeout(fragments_TIMEOUT)
    
        fragments_destroyEvents()
    }

    function fragments_destroyEvents() { EVENT.event_remove(FRAGMENTS_EVENTS) }

    // --INTRO
    async function content_intro()
    {
        content_OPACITY = 1

        title_intro()

        fragments_introTags()
    }

    function title_intro() { for (const FRAG of TITLE_CHILDREN.frags) FRAG.style.transform = `translate3d(0, 0, 0)` }

    function fragments_introTags()
    {
        if (TITLE_CHILDREN.tags.length)
        {
            fragments_destroy()

            FRAGMENTS_EVENTS.animation = animation_writing(TITLE_CHILDREN.tags, fragments_destroyEvents)

            fragments_TIMEOUT = setTimeout(fragments_setEvents, 1100)
        }
    }

    // --OUTRO
    async function content_outro()
    {
        content_OPACITY = 0

        title_outro()
    }

    function title_outro() { for (const FRAG of TITLE_CHILDREN.frags) FRAG.style.transform = transform_getTranslate3d() }

    // --UPDATE
    function content_update(focus)
    {
        focus
        ?   content_intro()
        :   content_outro()
    }

// #CYCLE

onDestroy(fragments_destroy)
</script>

<!-- #HTML -->

<section
class="content"
style:opacity={content_OPACITY}
>
    <div
    class="info"
    >
        {`{${prop_INFO}}`}
    </div>

    <svelte:element
    this={prop_TITLE.htmlElement}
    class="title"
    >
        {#if prop_TITLE.contents instanceof Array}
            {#each prop_TITLE.contents as content}
                <Fragments
                prop_CHILDREN={TITLE_CHILDREN}
                prop_CONTENT={content}
                />
            {/each}
        {:else}
            <Fragments
            prop_CHILDREN={TITLE_CHILDREN}
            prop_CONTENT={prop_TITLE.contents}
            />
        {/if}

        {#if prop_TITLE.element}
            <div
            class="element"
            style:transform={transform_getTranslate3d()}
            bind:this={TITLE_CHILDREN.frags[TITLE_CHILDREN.frags.length]}
            >
                <slot name="title-element" />
            </div>
        {/if}
    </svelte:element>

    <slot />
</section>

<!-- #STYLE -->

<style
lang="scss"
>
/* #USES */

@use 'sass:map';

@use '../../assets/scss/app';

@use '../../assets/scss/styles/font';
@use '../../assets/scss/styles/media';

/* #CONTENT */

.content
{
    width: 100%;
    height: fit-content;

    transition: opacity .4s ease-in;

    .info, .title
    {
        position: relative;

        z-index: 1;
    
        user-select: none;
    }

    .info { @include font.interact($light, map.get(font.$font-sizes, s2), 1, map.get(font.$content-font-weight, w1)); }

    .title
    {
        @include font.h-(1);
    
        @extend %m-h-1;

        perspective: 300px;

        width: fit-content;
        height: fit-content;

        margin-block: 3rem;

        .element
        {
            margin-top: .9rem;

            transition: transform 1.2s ease-out;
        }

        :global { @include media.min($ms1) { .fragments:nth-child(1) { margin-left: app.$gap-inline; } } }
    }
}
</style>