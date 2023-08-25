<!-- #MAP

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
        contents: '',
        element: false
    },
    prop_INFO = '',
    prop_CHARGED = false,
    prop_FOCUS = false

// #IMPORTS

    // --JS
    import { transform_getTranslate3d } from '../../assets/js/utils/transform'

    // --COMPONENT-ELEMENT
    import Fragments from '../elements/Fragments.svelte'

// #CONSTANTE

    // --ELEMENT-TITLE
    const TITLE_CHILDREN = []

// #VARIABLE

    // --ELEMENT-CONTENT
    let content_OPACITY = 0

// #REACTIVE

    // --ELEMENT-CONTENT
    $: prop_CHARGED ? content_update(prop_FOCUS) : void 0

// #FUNCTIONS

    // --INTRO
    async function content_intro()
    {
        content_OPACITY = 1

        for (const CHILD of TITLE_CHILDREN) CHILD.style.transform = `translate3d(0, 0, 0)`
    }

    // --OUTRO
    async function content_outro()
    {
        content_OPACITY = 0

        for (const CHILD of TITLE_CHILDREN) CHILD.style.transform = transform_getTranslate3d()
    }

    // --UPDATE
    function content_update(focus)
    {
        focus
        ?   content_intro()
        :   content_outro()
    }
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
            bind:this={TITLE_CHILDREN[TITLE_CHILDREN.length]}
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
@use '../../assets/scss/styles/font';

/* #CONTENT */

.content
{
    position: relative;

    width: 100%;
    height: fit-content;

    transition: opacity .6s ease-in;

    .info, .title { user-select: none; }

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

        :global { .fragments:nth-child(1) { margin-left: app.$gap-inline; } }
    }
}
</style>