<!-- #MAP

-EVENT
    WRAPPER
        INFO
        TITLE
            ?FRAGMENTS * n
            ?FRAGMENT
            ?ELEMENT
                :COMPONENT
        ~SLOT

-->

<!-- #SCRIPT -->

<script>
// #EXPORTS

    // --PROPS
    export let
    prop_CHARGED = false,
    prop_FOCUS = false,
    prop_INTRO = false,

    prop_TITLE =
    {
        htmlElement: 'h2',
        contents: [{ value: '' }]
    },
    prop_ELEMENT = void {},
    prop_INFO = ''

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

    // --ELEMENT-INFO
    const INFO_D = 600

    // --ELEMENT-TITLE
    const
    TITLE_FRAGS = [],
    TITLE_TAGS = []

    // --ELEMENT-FRAGMENTS
    const FRAGMENTS_EVENTS = {}

// #VARIABLES

    // --ELEMENT-INFO
    let
    info,
    info_TIMEOUT

    // --ELEMENT-FRAGMENTS
    let fragments_TIMEOUT

// #REACTIVE

    // --ELEMENT-WRAPPER
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

    // --GET
    function title_getStyle(i)
    {
        return `
        transform: ${transform_getTranslate3d()};
        transition: transform 1.2s ${50 * i}ms ease-out;`
    }

    // --UPDATES
    function info_updateOpacity(opacity) { info.style.opacity = opacity }

    async function title_update(intro)
    {
        intro
        ?   title_intro()
        :   title_outro()
    }

    // --INTROS
    function info_intro() { info_TIMEOUT = setTimeout(() => info_updateOpacity(1), INFO_D) }

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

    // --OUTROS
    function info_outro()
    {
        clearTimeout(info_TIMEOUT)
    
        info_updateOpacity(0)
    }

    function title_outro() { for (const FRAG of TITLE_FRAGS) FRAG.style.transform = transform_getTranslate3d() }

    // --TRANSITIONS
    function info_t1(node, { delay = 0 })
    {
        return {
            delay,
            duration: INFO_D,
            css: (t) =>
            {
                const T = t * 100 + '%'

                return `clip-path: polygon(0 0, ${T} 0, ${T} 100%, 0% 100%);`
            }
        }
    }

    function info_t2(node, { delay = 0 })
    {
        return {
            delay,
            duration: INFO_D,
            css: (t, u) => `transform: translateX(-${u * 100}%);`
        }
    }

// #CYCLE

onDestroy(fragments_destroy)
</script>

<!-- #HTML -->

<div
class="wrapper"
>
    <div
    class="info"
    bind:this={info}
    >
        {#if prop_FOCUS}
            <span
            class="opening"
            >
                {'['}
            </span>

            <p
            in:info_t1={{ delay: INFO_D }}
            out:info_t1
            >
                {prop_INFO}
            </p>

            <span
            class="closure"
            in:info_t2={{ delay: INFO_D }}
            out:info_t2
            on:introstart={info_intro}
            on:outroend={info_outro}
            >
                {']'}
            </span>
        {/if}
    </div>

    <section>
        <svelte:element
        this={prop_TITLE.htmlElement}
        class="title"
        style:opacity={prop_CHARGED && prop_INTRO ? 1 : 0}
        bind:offsetHeight={title_HEIGHT}
        >
            {#each prop_TITLE.contents as content}
                <Fragments
                prop_FRAGS={{ children: TITLE_FRAGS, value: content.frags ?? '-' }}
                prop_TAGS={{ children: TITLE_TAGS, value: content.tags }}
                prop_STYLE={title_getStyle}
                />
            {/each}

            {#if prop_ELEMENT}
                <div
                class="element"
                style:transform={transform_getTranslate3d()}
                bind:this={TITLE_FRAGS[TITLE_FRAGS.length]}
                >
                    <svelte:component
                    this={prop_ELEMENT.component}
                    {...prop_ELEMENT.props ?? {}}
                    >
                        {#each prop_ELEMENT.children ?? [] as child}
                            <svelte:component
                            this={child.component}
                            {...child.props ?? {}}
                            />
                        {/each}
                    </svelte:component>
                </div>
            {/if}
        </svelte:element>

        <slot />
    </section>
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

/* #WRAPPER */

.wrapper
{
    @include position.placement(sticky, $top: 0, $right: 0, $left: 0);

    overflow: hidden;

    width: 100%;
    height: 100vh;

    padding: 11rem app.$gap-inline 8rem;

    pointer-events: none;

    box-sizing: border-box;

    @include media.min(false, $ms2) { padding-top: max(12rem, 80px); }

    .info, .title
    {
        position: relative;

        z-index: 1;
    
        user-select: none;
    }

    .info
    {
        &, p { width: min-content; }
    
        @include font.content($light);

        opacity: 0;

        padding-bottom: 2rem;

        .opening { @include position.placement(absolute, $top: 0, $left: 0); }

        p { margin-left: 1rem; }

        .closure
        {
            @include position.placement(absolute, $top: 0, $right: 0, $left: 2rem);

            width: calc(100% - 1rem);
    
            text-align: right;
        }
    }

    .title
    {
        @include font.h-(1);
    
        @extend %m-h-1;

        perspective: 300px;

        width: fit-content;
        height: fit-content;

        padding-bottom: 5rem;

        transition: opacity .6s ease-in;

        .element { transition: transform 1.2s ease-out; }

        :global
        {
            &>* { padding-top: 2rem; }

            @include media.min($ms1) { .fragments:nth-child(1) { margin-left: app.$gap-inline; } }

            @include media.min($ms2, $ms3)
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
            }
        }
    }
}
</style>