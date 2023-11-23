<!----------------------------------------------- #||--project--|| -->


<!-- #|-CONTEXT-| -->

<!--<script
context="module"
>

// #\-IMPORTS-\

    // --SVELTE

     // --LIB

    // --JS


// #\-EXPORTS-\

    // --CONTEXTS


</script>-->


<!-- #|-HTML-| -->

<section
class="project"
class:scroller={prop_TARGET}
style:--tag-x="{tag_TRANSLATE_X}px"
style:--tag-y="{tag_TRANSLATE_Y + project_SCROLL_TOP}px"
bind:this={project}
on:scroll={project_eScroll}
>
    <Tag
    prop_FOCUS={prop_FOCUS && (tag_FOCUS || prop_TARGET)}
    prop_CONTENT={prop_PROJECT.title}
    prop_DURATION={TAG_DURATION}
    prop_getFragmentsStyle={fragments_getStyle}
    on:in={tag_eIn}
    on:out={tag_eOut}
    />

    <div
    class="head"
    bind:this={head}
    >
        {#if prop_TARGET}
            <About
            prop_GLOBAL={prop_ABOUT_GLOBAL}
            prop_THIS={prop_PROJECT.about}
            prop_X={card_TRANSLATE_X}
            prop_Y={card_TRANSLATE_Y}
            prop_W={card_HALF_WIDTH  * 2}
            />
        {/if}

        <Card
        prop_ID={prop_PROJECT.id}
        prop_TARGET={card$_TARGET}
        prop_TITLE={prop_PROJECT.title}
        prop_COLOR={prop_PROJECT.color}
        {prop__$RESIZE}
        {prop__CARD_HOVER}
        {prop_FOCUS}
        bind:card_TRANSLATE_X
        bind:card_TRANSLATE_Y
        bind:card_HALF_WIDTH
        on:mouseandtouchmove={card_eMouseAndTouchMove}
        on:mouseenter={card_eMouseEnter}
        on:mouseleave={card_eMouseLeave}
        on:click
        >
            <svelte:component
            this={prop_PROJECT.cardTexture}
            />
        </Card>

        <Mask2
        prop_DESTROY={!prop_TARGET}
        />
    </div>
    

    {#if prop_TARGET}
        <div
        class="content"
        >
            <svelte:component
            this={prop_PROJECT.component}
            prop_DATAS={prop_PROJECT.datas}
            />
        </div>
    {/if}
</section>


<!-- #|-SCRIPT-| -->

<script>

// #\-IMPORTS-\

    // --DATA

    // --SVELTE
    import { onMount, onDestroy, createEventDispatcher, tick } from 'svelte'

    // --LIB
    import { wait_throttle, wait_getDelay } from '$lib/wait'

    // --CONTEXTS
    import { APP } from '../../../../App.svelte'

//=======@COMPONENTS|

    // --*
    import Tag from '../../../../global/elements/Tag.svelte'

    import About from './About.svelte'
    import Card  from './cards/Card.svelte'
    import Mask2 from './Mask2.svelte'

//=======@STYLE|

    // --*
    import '../../../../assets/scss/global/project.scss'


// #\-EXPORTS-\

    // --PROPS
    export let
    prop__$RESIZE = {}
    ,
    prop__TARGET,
    prop__CARD_HOVER
    ,
    prop_FOCUS  = false,
    prop_TARGET = false
    ,
    prop_PROJECT      = {},
    prop_ABOUT_GLOBAL = void ''

    // --BINDING


// #\-CONSTANTES-\

    // --SVELTE
    const SVELTE_DISPATCH = createEventDispatcher()

    // --CONTEXTS

    // --OUTSIDE

    // --THIS

    // --INSIDE
    const TAG_DURATION = wait_getDelay(18) // +- 300ms


// #\-VARIABLES-\

    // --CONTEXTS

    // --OUTSIDE
    let particles

    // --THIS
    let
    project
    ,
    project_SCROLL_TOP = 0

    // --INSIDE
    let head

    let
    tag_FOCUS = false
    ,
    tag_TRANSLATE_X = 0,
    tag_TRANSLATE_Y = 0
    ,
    tag_DELAY

    let
    card_TRANSLATE_X = 0,
    card_TRANSLATE_Y = 0
    ,
    card_HALF_WIDTH  = 0


// #\-REATIVES-\

    // --CONTEXTS

    // --OUTSIDE

    // --THIS
    $: project_update(prop_TARGET)

    // --INSIDE
    $: card$_TARGET = prop__TARGET != null ? prop_TARGET ? 1 : -1 : 0


// #\-FUNCTIONS-\

//=======@LIFE|

    // --SVELTE
    onMount(project_set), onDestroy(project_destroy)

    // --SET
    function project_set() { tag_setVars() }

    function tag_setVars()
    {
        tag_TRANSLATE_X = card_TRANSLATE_X + card_HALF_WIDTH
        tag_TRANSLATE_Y = APP.app_HEIGHT * .5
    }

    // --GET
    function tag_getTransform(x, y, scale) { return `translate(${x}, ${y}) scale(${scale})` }

    function fragments_getStyle()
    {
        const
        TRANSFORM = tag_getTransform(`calc(var(--tag-x, ${tag_TRANSLATE_X}px) - 200%)`, `calc(var(--tag-y, ${tag_TRANSLATE_Y}px) - 100%)`, 0),
        DURATION  = Math.random() * TAG_DURATION + TAG_DURATION + 'ms'
    
        return `
        --frag-duration: ${DURATION};
        transform: ${TRANSFORM};
        transition: transform var(--frag-duration, ${DURATION}) ease-out;`
    }

    // --UPDATES
    async function particles_update(target)
    {
        if (target) await tick() // wait about load
    
        ;(particles ??= document.querySelector('.particles'))?.moveTo(target ? head : null)
    }

    function project_update(target)
    {
        particles_update(target)
    
        project?.scrollTo({ top: 0 })
    }

    function tag_update(frags, style)
    {
        for (let i = 0; i < frags.length; i++)
        {
            const FRAG = frags[i]

            if (FRAG)
            {
                clearTimeout(FRAG.timeout)

                FRAG.timeout = setTimeout(() => FRAG.style.transform = style, tag_DELAY * i)
            }
            else return
        }
    }

    function tag_updateTranslate(x, y)
    {
        tag_TRANSLATE_X = x
        tag_TRANSLATE_Y = y
    }

    // --DESTROY
    function project_destroy() { particles_update(false) }


//=======@COMMANDS|

    // --*


//=======@EVENTS|

    // --*
    const project_eScroll = wait_throttle(async function project_eScroll() { project_SCROLL_TOP = project.scrollTop }, 2, 4) // +- 30ms - 70ms

    async function card_eMouseAndTouchMove({ detail: {x, y} }) { tag_updateTranslate(x, y) }

    function card_eMouseEnter({detail})
    {
        tag_FOCUS = true

        SVELTE_DISPATCH('mouseenter', detail)
    }

    function card_eMouseLeave()
    {
        tag_FOCUS = false

        SVELTE_DISPATCH('mouseleave')
    }

    function tag_eIn({ detail: {frags} })
    {
        tag_DELAY ??= TAG_DURATION / frags.length

        const STYLE = tag_getTransform('var(--tag-x, 25%)', 'var(--tag-y, 45%)', 1)
    
        tag_update(frags, STYLE, 0)
    }

    function tag_eOut({ detail: {frags} })
    {
        const STYLE = tag_getTransform(`calc(var(--tag-x, ${tag_TRANSLATE_X}px) + 200%)`, `calc(var(--tag-y, ${tag_TRANSLATE_Y}px) + 100%)`, 0)

        tag_update(frags, STYLE)
    }


//=======@TRANSITIONS|

    // --*


//=======@ANIMATIONS|

    // --*


//=======@UTILS|

    // --*


</script>


<!-- #|-STYLE-| -->

<style
lang="scss"
>

/* #\-USES-\ */

    /* --SASS */

    /* --APP */

    /* --DEPENDENCIES */
    @use '../../../../assets/scss/styles/utils';

    /* --MEDIA */


/* #\-VARIABLES-\ */

    /* --* */


/* #\-THIS-\ */

.project
{
    @include utils.placement(absolute, $top: 0, $left: 0, $right: 0);

    @extend %any-size;

    overflow:            clip;
    overscroll-behavior: none;

    &.scroller
    {
        @extend %scroll-bar;

        z-index: 2; /* label & nav */

        overflow-y: scroll;

        max-height: 100svh;

        pointer-events: auto;
    }

    .head
    {
        @extend %sticky;

        transform-style: flat;
    }

    .content
    {
        @include utils.placement(relative, $z: 1);

        width:  100%;
        height: fit-content;
    }
}


</style>