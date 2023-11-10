<!----------------------------------------------- #||--title--|| -->


<!-- #|-CONTEXT-| -->
<!--
<script
context="module"
>

// #\-IMPORTS-\

    // --SVELTE

     // --LIB

    // --JS


// #\-EXPORTS-\

    // --CONTEXTS


</script>
-->

<!-- #|-HTML-| -->

<svelte:element
this={prop_TITLE.html}
class="title"
class:focus={prop_CHARGED && prop_INTRO}
data-pe-content={prop_TITLE.fragments[0]?.frags?.substring(0, 1)}
style:--fragments-t-x="{fragments_TRANSLATE_X}%"
bind:offsetHeight={title_HEIGHT}
>
    {#each prop_TITLE.fragments ?? [] as fragments, i}
        <Fragments
        prop_ID={i}
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


<!-- #|-SCRIPT-| -->

<script>

// #\-IMPORTS-\

    // --DATA

    // --SVELTE
    import { onDestroy } from 'svelte'

    // --LIB
    import { wait_throttle }                                  from '$lib/wait'
    import { animation_staticWriting, animation_staticErase } from '$lib/animation'

    // --CONTEXTS
    import { APP, EVENT } from '../../../App.svelte'

//=======@COMPONENTS|

    // --*
    import Fragments from '../../../global/elements/Fragments.svelte'


// #\-EXPORTS-\

    // --PROPS
    export let
    prop_CHARGED = false,
    prop_INTRO   = false
    ,
    prop_TOP = 0
    ,
    prop_TITLE = {}

    // --BINDING
    export let title_HEIGHT = 0


// #\-CONSTANTES-\

    // --SVELTE

    // --CONTEXTS

    // --OUTSIDE

    // --THIS

    // --INSIDE
    const
    FRAGMENTS_MAX_TRANSLATE = 40,
    FRAGMENTS_FORCE         = 2000
    ,
    FRAGMENTS_FRAGS = [],
    FRAGMENTS_TAGS  = []
    ,
    FRAGMENTS_EVENTS   = { scroll: wait_throttle(fragments_e$Scroll, 5) }, // +- 80ms
    FRAGMENTS_EVENTS_2 = {}


// #\-VARIABLES-\

    // --CONTEXTS

    // --OUTSIDE

    // --THIS

    // --INSIDE
    let
    fragments_TRANSLATE_X = 0
    ,
    fragments_TIMEOUT


// #\-REATIVES-\

    // --CONTEXTS

    // --OUTSIDE

    // --THIS

    // --INSIDE
    $: prop_CHARGED ? fragments_update(prop_INTRO) : void 0


// #\-FUNCTIONS-\

//=======@LIFE|

    // --SVELTE
    onDestroy(title_destroy)

    // --SET
    function fragments_setEvents()  { EVENT.event_add(FRAGMENTS_EVENTS) }

    function fragments_setEvents2() { EVENT.event_add(FRAGMENTS_EVENTS_2) }

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
        transition-delay: ${.04 * i}s;`
    }

    // --UPDATES
    function fragments_update(intro)
    {
        if (intro)
        {
            fragments_setEvents()
            fragments_intro()
        }
        else
        {
            fragments_destroyEvents()
            fragments_outro()
        }

        fragments_e$Scroll(APP.app_SCROLLTOP)
    }
    
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
            fragments_destroyTimeout()
            fragments_destroyEvents2()

            FRAGMENTS_EVENTS_2.animation = animation(FRAGMENTS_TAGS, fragments_destroyEvents2)

            fragments_TIMEOUT = setTimeout(fragments_setEvents2, delay)
        }
    }

    // --DESTROY
    function title_destroy() { fragments_destroy() }
        
    function fragments_destroy()
    {
        fragments_destroyTimeout()
        fragments_destroyEvents()
        fragments_destroyEvents2()
    }

    function fragments_destroyTimeout() { clearTimeout(fragments_TIMEOUT) }

    function fragments_destroyEvents() { EVENT.event_remove(FRAGMENTS_EVENTS) }

    function fragments_destroyEvents2() { EVENT.event_remove(FRAGMENTS_EVENTS_2) }


//=======@COMMANDS|

    // --*


//=======@EVENTS|

    // --*
    async function fragments_e$Scroll(scrollTop)
    {
        const DIF = scrollTop - prop_TOP

        if (DIF < 0) fragments_TRANSLATE_X = 0
        else
        {
            const RATIO = DIF / APP.app_HEIGHT

            fragments_TRANSLATE_X = RATIO >= 1 ? FRAGMENTS_MAX_TRANSLATE : RATIO * FRAGMENTS_MAX_TRANSLATE
        }
    }


//=======@TRANSITIONS|

    // --*


//=======@ANIMATIONS|

    // --*


//=======@UTILS|

    // --*
    function fragments_intro()
    {
        const TRANSFORM = 'translate3d(0, 0, 0)'
    
        fragments_updateFrags(1, TRANSFORM)
        fragments_updateTags(animation_staticWriting, 1000)
    }

    function fragments_outro()
    {
        fragments_updateFrags(0)
        fragments_updateTags(animation_staticErase)
    }


</script>


<!-- #|-STYLE-| -->

<style
lang="scss"
>

/* #\-USES-\ */

    /* --SASS */

    /* --APP */
    @use '../../../assets/scss/app';

    /* --DEPENDENCIES */
    @use '../../../assets/scss/styles/utils';
    @use '../../../assets/scss/styles/display';
    @use '../../../assets/scss/styles/font';

    /* --MEDIA */
    @use '../../../assets/scss/styles/media';


/* #\-VARIABLES-\ */

    /* --* */
    $shadow: 0 0 2rem rgba($light, .1);


/* #\-GLOBAL-\ */

    /* --* */


/* #\-THIS-\ */

.title
{
    @include font.h-(1, $light);
    
    @extend %f-column;

    position: relative;

    gap: 2rem;

    perspective: 1000px;

    width:  fit-content;
    height: fit-content;

    padding-bottom: 2rem;

    :global .fragments
    {
        transform: translateX(calc(var(--fragments-t-x, 0) / (var(--fragments-id, 0) + 1)));

        text-shadow: $shadow;

        transition: transform .4s ease-out;
    }

    .element
    {
        transition: transform .8s ease-out;

        :global &>* { filter: drop-shadow($shadow); }
    }

    @include media.min($ms3, $ms3)
    {
        $pe-duration: .4s;
    
        &::before
        {
            @include utils.placement(absolute, $top: 2.4rem, $left: 0, $pe: attr(data-pe-content));

            padding-right: 2.2rem;
        
            clip-path: polygon(100% 0, 100% 0, 100% 100%, 100% 100%);

            color: $intermediate;
            font-family: inherit;
            font-size: 212%;
            font-style: italic;

            transition: clip-path $pe-duration ease-in-out;
        }

        padding-block: 2rem 3rem;

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