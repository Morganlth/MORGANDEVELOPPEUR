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
class="project o-hid s-any"
class:scroller={prop_TARGET}
style:--tag-x="{tag_TRANSLATE_X}px"
style:--tag-y="{tag_TRANSLATE_Y}px"
bind:this={project}
>
    <div
    class="head p-stk"
    bind:this={head}
    >
        <Mask2
        prop_DESTROY={!prop_TARGET}
        />

        <Tag
        prop_FOCUS={prop_FOCUS && tag_FOCUS}
        prop_IMG_ON={tag_IMG_ON}
        prop_CONTENT={prop_PROJECT.title}
        prop_IMG={prop_PROJECT.img}
        prop_DURATION={TAG_DURATION}
        prop_getFragmentsStyle={fragments_getStyle}
        {prop_TARGET}
        on:in={tag_eIn}
        on:out={tag_eOut}
        />
    
        {#if prop_TARGET}
        {@const {id, about} = prop_PROJECT}
            <About
            prop_ID={id}
            prop_GLOBAL={prop_ABOUT_GLOBAL}
            prop_THIS={about}
            prop_X={card_TRANSLATE_X}
            prop_Y={card_TRANSLATE_Y}
            prop_W={card_HALF_WIDTH  * 2}
            on:click
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
    </div>
    

    {#if prop_TARGET}
    {@const {component, data} = prop_PROJECT}
        <div
        class="content p-rlt s-a-w"
        >
            <svelte:component
            this={component}
            prop_DATA={data}
            />
        </div>
    {/if}
</section>


<!-- #|-SCRIPT-| -->

<script>

// #\-IMPORTS-\

    // --DATA

    // --SVELTE
    import { onMount, onDestroy, createEventDispatcher } from 'svelte'

    // --LIB
    import { wait_getDelay } from '$lib/wait'

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
    let project

    // --INSIDE
    let head

    let
    tag_FOCUS  = false,
    tag_IMG_ON = false
    ,
    tag_TRANSLATE_X = 0,
    tag_TRANSLATE_Y = 0
    ,
    tag_DELAY
    ,
    tag_TIMEOUT

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
        tag_TRANSLATE_Y = APP.app_HALF_HEIGHT
    }

    function tag_setTimeout()
    {
        tag_IMG_ON = false

        tag_TIMEOUT = setTimeout(() => tag_IMG_ON = true, TAG_DURATION)
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
    async function particles_update(target) { (particles ??= document.querySelector('.particles'))?.moveTo(target ? head : null) }

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
    function project_destroy()
    {
        particles_update(false)

        tag_destroyTimeout()
    }

    function tag_destroyTimeout() { clearTimeout(tag_TIMEOUT) }


//=======@COMMANDS|

    // --*


//=======@EVENTS|

    // --*
    async function card_eMouseAndTouchMove({ detail: {x, y} })
    {
        tag_destroyTimeout()

        if (tag_FOCUS) tag_setTimeout()

        tag_updateTranslate(x, y)
    }

    function card_eMouseEnter({detail})
    {
        tag_FOCUS = true

        SVELTE_DISPATCH('mouseenter', detail)
    }

    function card_eMouseLeave()
    {
        tag_destroyTimeout()
    
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

    overscroll-behavior: none;

    &.scroller
    {
        @extend %scroll-bar;

        z-index: 2; /* label & nav */

        overflow-y: scroll;

        max-height: 100svh;

        pointer-events: auto;
    }

    .content
    {
        z-index: 1;

        height: fit-content;
    }
}


</style>