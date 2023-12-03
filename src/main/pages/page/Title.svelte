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
{...(prop_TITLE.attributes ?? {})}
style:--fragments-t-x="{fragments_TRANSLATE_X}px"
bind:this={title}
>
    {#each prop_TITLE.fragments ?? [] as fragments, i}
        <Fragments
        prop_DIRECTION={i % 2 ? -1 : 1}
        prop_FRAGS={{ children: FRAGMENTS_FRAGS, value: fragments.frags ?? '' }}
        prop_TAGS={{ children: FRAGMENTS_TAGS, value: fragments.tags }}
        prop_getStyle={fragments_getStyle}
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
    import { onMount, onDestroy } from 'svelte'

    // --LIB
    import { wait_throttle }                                  from '$lib/wait'
    import { animation_staticWriting, animation_staticErase } from '$lib/animation'

    // --CONTEXTS
    import { APP, EVENT } from '../../../App.svelte'

//=======@COMPONENTS|

    // --*
    import Fragments from '../../../global/elements/Fragments.svelte'
            
//=======@STYLE|

    // --*
    import '../../../assets/scss/global/title.scss'


// #\-EXPORTS-\

    // --PROPS
    export let
    prop_TITLE = {}
    ,
    prop_CHARGED = false,
    prop_INTRO   = false
    ,
    prop_TOP = 0

    // --BINDING
    export let title_HEIGHT = 0


// #\-CONSTANTES-\

    // --SVELTE

    // --CONTEXTS

    // --OUTSIDE

    // --THIS
    const TITLE_EVENTS = { resize: title_e$Resize }

    // --INSIDE
    const
    FRAGMENTS_FORCE = 2000
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
    let
    title
    ,
    title_LEFT = 0

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
    onMount(title_set), onDestroy(title_destroy)

    // --SET
    function title_set()
    {
        title_setVars()
        title_setEvents()
    }

    function title_setVars()
    {
        title_HEIGHT = title?.offsetHeight                              ?? 0
        title_LEFT   = title?.firstChild?.getBoundingClientRect()?.left ?? 0
    }

    function title_setEvents() { EVENT.event_add(TITLE_EVENTS) }

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
            FRAG.style.opacity   = opacity
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
    function title_destroy()
    {
        title_destroyEvents()
    
        fragments_destroy()
    }

    function title_destroyEvents() { EVENT.event_remove(TITLE_EVENTS) }
        
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
    async function title_e$Resize() { title_setVars() }

    async function fragments_e$Scroll(scrollTop)
    {
        const DIF = scrollTop - prop_TOP

        if (DIF < 0) fragments_TRANSLATE_X = 0
        else
        {
            const RATIO = DIF / APP.app_PAGE_INTRO_HEIGHT
        
            fragments_TRANSLATE_X = -title_LEFT * RATIO
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

    /* --DEPENDENCIES */
    @use '../../../assets/scss/styles/utils';
    @use '../../../assets/scss/styles/display';
    @use '../../../assets/scss/styles/font';

    /* --MEDIA */
    @use '../../../assets/scss/styles/media';


/* #\-VARIABLES-\ */

    /* --* */


/* #\-THIS-\ */

.title
{
    @include font.h-(1, $light);
    
    @extend %f-column;

    position: relative;

    gap: 2rem;

    perspective: 1000px;

    width : fit-content;
    height: fit-content;

    padding-bottom: 2rem;

    .element { transition: transform .8s ease-out; }

    @include media.min($ms3, $ms3)
    {
        $pe-duration: .4s;
    
        &::before
        {
            @include utils.placement(absolute, $top: 2.4rem, $left: 0, $pe: attr(data-pe-content));

            padding-right: 2.2rem;
        
            clip-path: polygon(100% 0, 100% 0, 100% 100%, 100% 100%);

            color      : $intermediate;
            font-family: inherit;
            font-size  : 212%;
            font-style : italic;

            transition: clip-path $pe-duration ease-in-out;
        }

        padding-block: 2rem 3rem;

        &.focus::before
        {
            clip-path: polygon(0 0, 100% 0, 100% 100%, 0% 100%);

            transition-delay: $pe-duration;
        }
    }
}


</style>