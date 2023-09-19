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
        contents: [{ value: '' }],
        element: false
    },
    prop_INFO = '',
    prop_CHARGED = false,
    prop_FOCUS = false,
    prop_INTRO = false

    // --BIND
    export let title_HEIGHT = 0

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
    const
    TITLE_FRAGS = [],
    TITLE_TAGS = []

    // --ELEMENT-FRAGMENTS
    const FRAGMENTS_EVENTS = {}

// #VARIABLE

    // --ELEMENT-FRAGMENTS
    let fragments_TIMEOUT

// #REACTIVE

    // --ELEMENT-CONTENT
    $: prop_CHARGED ? title_update(prop_INTRO) : void 0

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

    // --UPDATE
    async function title_update(intro)
    {
        intro
        ?   title_intro()
        :   title_outro()
    }

    // --INTRO
    function title_intro()
    {
        for (const FRAG of TITLE_FRAGS) FRAG.style.transform = `translate3d(0, 0, 0)`

        fragments_introTags()
    }

    function fragments_introTags()
    {
        if (TITLE_TAGS.length)
        {
            fragments_destroy()

            FRAGMENTS_EVENTS.animation = animation_writing(TITLE_TAGS, fragments_destroyEvents)

            fragments_TIMEOUT = setTimeout(fragments_setEvents, 1100)
        }
    }

    // --OUTRO
    function title_outro() { for (const FRAG of TITLE_FRAGS) FRAG.style.transform = transform_getTranslate3d() }

// #CYCLE

onDestroy(fragments_destroy)
</script>

<!-- #HTML -->

<section
class="content"
style:opacity={prop_CHARGED && prop_FOCUS ? 1 : 0}
>
    <div
    class="info"
    >
        {`{${prop_INFO}}`}
    </div>

    <svelte:element
    this={prop_TITLE.htmlElement}
    class="title"
    style:opacity={prop_INTRO ? 1 : 0}
    bind:offsetHeight={title_HEIGHT}
    >
        {#each prop_TITLE.contents as content}
            <Fragments
            prop_FRAGS={{ children: TITLE_FRAGS, value: content.frags ?? '-' }}
            prop_TAGS={{ children: TITLE_TAGS, value: content.tags }}
            prop_TRANSFORM={transform_getTranslate3d}
            />
        {/each}

        {#if prop_TITLE.element}
            <div
            class="element"
            style:transform={transform_getTranslate3d()}
            bind:this={TITLE_FRAGS[TITLE_FRAGS.length]}
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

@use '../../assets/scss/styles/position';
@use '../../assets/scss/styles/size';
@use '../../assets/scss/styles/font';
@use '../../assets/scss/styles/media';

/* #CONTENT */

.content
{
    @extend %any;

    transition: opacity .4s ease-in;

    .info, .title
    {
        position: relative;

        z-index: 1;

        padding-bottom: 3rem;
    
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

        transition: opacity .6s ease-in;

        .element
        {
            margin-top: .9rem;

            transition: transform 1.2s ease-out;
        }

        :global
        {
            @include media.min($ms1) { .fragments:nth-child(1) { margin-left: app.$gap-inline; } }

            @include media.min($ms2, $ms3)
            {
                .fragments
                {
                    &::before
                    {
                        @include position.placement(absolute, -.7rem, auto, auto, 0, true);

                        width: 2.4rem;
                        height: 2.4rem;

                        background-color: $primary;
                    }

                    position: relative;

                    padding-left: app.$gap-inline;
                }
            }
        }
    }
}
</style>