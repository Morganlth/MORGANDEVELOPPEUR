<!----------------------------------------------- #||--card--|| -->


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

<button
class="card"
class:focus={card_ON}
data-id={prop_ID}
style:transform="
translate3d(
{card_TRANSLATE_X}px,
{card_TRANSLATE_Y}px,
{(prop_ID - (prop_CARD_HOVER ?? prop_ID)) * 50}px)
perspective({CARD_PERSPECTIVE}px)
rotateX({card_ROTATE_X}rad)
rotateY({card_ROTATE_Y}rad)
rotateZ({card_ROTATE_Z}deg)"
style:transition-duration="{card_TRANSITION_DURATION}ms"
tabindex={card_ON ? 0 : -1}
bind:this={card}
on:mousemove={card_eMouseMove}
on:mouseenter={card_eMouseEnter}
on:mouseleave={card_eMouseLeave}
on:mousedown={card_eMouseDown}
on:touchstart={card_eTouchStart}
on:touchend={card_eTouchEnd}
>
    <div
    class="decor"
    class:hide={decor_HIDE}
    style:transform="rotateY({decor_ROTATE_Y}deg) translateZ({decor_TRANSLATE_Z}px)"
    >
        <svg
        class="background"
        viewBox="0 0 234 333"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        >
            <path
            d="M8.91919 3.5H224.325C227.308 3.5 229.744 5.92832 229.744 8.94574V323.298C229.744 326.316 227.308 328.744 224.325 328.744H8.91919C5.93608 328.744 3.5 326.316 3.5
            323.298V8.94574C3.5 5.92832 5.93605 3.5 8.91919 3.5Z"
            fill={COLORS.dark}
            stroke={COLORS.light}
            stroke-width="1"
            />
        </svg>

        <svg
        class="texture"
        viewBox="0 0 234 333"
        fill={prop_COLOR}
        xmlns="http://www.w3.org/2000/svg"
        >
            <slot />
        </svg>

        <Icon
        prop_COLOR={COLORS.light}
        prop_SIZE="18%"
        prop_SPRING={false}
        >
            <Logo />
        </Icon>
    </div>
</button>

<Tag
prop_FOCUS={prop_ON && (tag_FOCUS || prop_TARGET === 1)}
prop_DURATION={TAG_DURATION}
prop_STYLE={{ tag_style: () => '', fragments_style }}
{prop_CONTENT}
--tag-x="{tag_TRANSLATE_X}px"
--tag-y="{tag_TRANSLATE_Y}px"
on:in={tag_eIn}
on:out={tag_eOut}
/>


<!-- #|-SCRIPT-| -->

<script>

// #\-IMPORTS-\

    // --DATA

    // --SVELTE
    import { onMount, onDestroy, createEventDispatcher } from 'svelte'
    import { cubicIn, cubicOut, cubicInOut }             from 'svelte/easing'

    // --LIB
    import COLORS                           from '$lib/colors'
    import { wait_throttle, wait_getDelay } from '$lib/wait'
    import { animation }                    from '$lib/animation'

    // --CONTEXTS
    import { APP, EVENT } from '../../../../../App.svelte'

//=======@COMPONENTS|

    // --*
    import Icon from '../../../../../global/covers/Icon.svelte'

    import Tag from '../../../../../global/elements/Tag.svelte'

    import Logo from '../../../../../global/icons/Logo.svelte'


// #\-EXPORTS-\

    // --PROPS
    export let
    prop_$RESIZE = {}
    ,
    prop_CARD_HOVER = void 0 // hovering card id
    ,
    prop_ON = false
    ,
    prop_ID     = void 0,
    prop_TARGET = 0  // -1 | 0 | 1
    ,
    prop_CONTENT = '',
    prop_COLOR   = '#FFF'

    // --BINDING


// #\-CONSTANTES-\

    // --SVELTE
    const SVELTE_DISPATCH = createEventDispatcher()

    // --CONTEXTS

    // --OUTSIDE
    const TAG_DURATION = wait_getDelay(18) // +- 300ms

    // --THIS
    const
    CARD_DURATION    = wait_getDelay(36), // id * +- 600ms
    CARD_DURATION_2  = wait_getDelay(24), // id * +- 400ms
    CARD_DELAY       = wait_getDelay(18), // +- 300ms
    CARD_DELAY_2     = (prop_ID ?? 0) * CARD_DURATION,
    CARD_PERSPECTIVE = 3000
    ,
    CARD_EVENTS =
    {
        mouseMove: wait_throttle(card_e$MouseMove, 3), // +- 50ms
        mouseUp  : card_e$MouseUp
    },
    CARD_EVENTS_2 = { touchMove: wait_throttle(card_e$TouchMove, 3) } // +- 50ms

    // --INSIDE


// #\-VARIABLES-\

    // --CONTEXTS

    // --OUTSIDE
    let
    tag_FOCUS = false
    ,
    tag_TRANSLATE_X = 0,
    tag_TRANSLATE_Y = 0
    ,
    tag_DELAY

    // --THIS
    let
    card
    ,
    card_ON       = false,
    card_GRABBING = false,
    card_START    = true
    ,
    card_TRANSLATE_X = 0,
    card_TRANSLATE_Y = 0
    ,
    card_ROTATE_X = 0,
    card_ROTATE_Y = 0,
    card_ROTATE_Z = 0
    ,
    card_TRANSITION_DURATION = 0
    ,
    card_HALF_WIDTH  = 0,
    card_HALF_HEIGHT = 0
    ,
    card_LAST = +new Date()
    ,
    card_TIMEOUT
    ,
    card_cancel  = () => {},
    card_cancel2 = () => {}

    // --INSIDE
    let
    decor_HIDE = true
    ,
    decor_TRANSLATE_Z = 0
    ,
    decor_ROTATE_Y = 0


// #\-REATIVES-\

    // --CONTEXTS

    // --OUTSIDE

    // --THIS
    $: card_update(prop_ON, prop_TARGET)

    // --INSIDE


// #\-FUNCTIONS-\

//=======@LIFE|

    // --SVELTE
    onMount(card_set), onDestroy(card_destroy)

    // --SET
    function card_set()
    {
        card_setVars()

        tag_setVars()

        prop_$RESIZE.push(card_e$Resize)
    }

    function card_setVars()
    {
        card_HALF_WIDTH  = card.offsetWidth  / 2
        card_HALF_HEIGHT = card.offsetHeight / 2
    
        card_TRANSLATE_X = card_getTranslateX()
        card_TRANSLATE_Y =  card_getTranslateY() + (card_ON ? 0 : APP.app_HEIGHT)

        card_ROTATE_X = (card_ROTATE_Y = 0)
        card_ROTATE_Z = card_getRotateZ()
    }

    function card_setEvents()  { EVENT.event_add(CARD_EVENTS) }

    function card_setEvents2() { EVENT.event_add(CARD_EVENTS_2) }

    function card_setTransition(value) { card_TRANSITION_DURATION = value }

    function tag_setVars()
    {
        tag_TRANSLATE_X = card_TRANSLATE_X + card_HALF_WIDTH
        tag_TRANSLATE_Y = card_getTranslateY() + card_HALF_HEIGHT
    }

    // --GET
    function card_getTranslateX() { return APP.app_WIDTH * .5 - APP.app_WIDTH * .05 * prop_ID }

    function card_getTranslateY() { return APP.app_HEIGHT * .8 - card_HALF_HEIGHT * 2 - APP.app_HEIGHT * .08 * prop_ID }

    function card_getRotateZ() { return 10 - 10 * prop_ID }

    function tag_getTransform(x, y, scale) { return `translate(${x}, ${y}) scale(${scale})` }

    // --UPDATES
    function card_update(on, target /* -1 | 0 | 1 */)
    {
        const ON = ~target && on

        if (card && ON != card_ON)
        {
            card_destroyAnimations()
           
            ;(card_ON = ON) ? card_aIn() : card_aOut()

            if (!on) card_START = true
        }
    }

    function card_updateTranslate(x, y)
    {
        card_TRANSLATE_X = x - card_HALF_WIDTH
        card_TRANSLATE_Y = y - card_HALF_HEIGHT
    }

    function card_updateRotate(x, y)
    {
        card_ROTATE_X = y / card_HALF_HEIGHT * .3
        card_ROTATE_Y = x / -card_HALF_WIDTH * .3
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

    // --DESTROY
    function card_destroy()
    {
        card_destroyAnimations()
        card_destroyEvents()

        prop_$RESIZE.splice(card_e$Resize)
    }

    function card_destroyAnimations()
    {
        card_cancel()
        card_cancel2()
        card_destroyTimeout()
    }

    function card_destroyTimeout() { clearTimeout(card_TIMEOUT) }

    function card_destroyEvents()  { EVENT.event_remove(CARD_EVENTS) }

    function card_destroyEvents2() { EVENT.event_remove(CARD_EVENTS_2) }


//=======@COMMANDS|

    // --*


//=======@EVENTS|

    // --*
    async function card_e$MouseMove(clientX, clientY) { card_updateTranslate(clientX, clientY) }

    async function card_e$TouchMove(clientX, clientY) { card_updateTranslate(clientX, clientY) }

    function card_e$MouseUp()
    {
        if (+new Date() < card_LAST + CARD_DELAY) card_eClick()

        card_destroyEvents()
        
        card_GRABBING = false
    }

    async function card_e$Resize()
    {
        card_setVars()

        tag_setVars()
    }

    function card_eClick() { SVELTE_DISPATCH('click', { id: prop_ID }) }

    const card_eMouseMove = wait_throttle(async function card_eMouseMove({ clientX, clientY, offsetX, offsetY })
    {
        if (offsetX && offsetY) card_updateRotate(offsetX - card_HALF_WIDTH, offsetY - card_HALF_HEIGHT)

        tag_TRANSLATE_X = clientX
        tag_TRANSLATE_Y = clientY
    },
    6) // +- 100ms

    function card_eMouseEnter()
    {
        tag_FOCUS = true

        card_cancel2()

        SVELTE_DISPATCH('mouseenter', { id: prop_ID })
    }

    function card_eMouseLeave()
    {
        tag_FOCUS = false
    
        card_a()

        SVELTE_DISPATCH('mouseleave')
    }

    function card_eMouseDown()
    {
        card_LAST = +new Date()

        card_setEvents()

        card_GRABBING = true
    }

    function card_eTouchStart() { card_setEvents2() }

    function card_eTouchEnd() { card_destroyEvents2() }

    function tag_eIn({detail: {frags}})
    {
        tag_DELAY ??= TAG_DURATION / frags.length

        const STYLE = tag_getTransform('var(--tag-x, 25%)', 'var(--tag-y, 45%)', 1)
    
        tag_update(frags, STYLE, 0)
    }

    function tag_eOut({detail: {frags}})
    {
        const STYLE = tag_getTransform(`calc(var(--tag-x, ${tag_TRANSLATE_X}px) + 200%)`, `calc(var(--tag-y, ${tag_TRANSLATE_Y}px) + 100%)`, 0)

        tag_update(frags, STYLE)
    }


//=======@TRANSITIONS|

    // --*


//=======@ANIMATIONS|

    // --*
    async function card_aIn()
    {
        const
        START_Y = card_TRANSLATE_Y,
        END_Y   = card_getTranslateY(),
        DIF_Y   = END_Y - START_Y
    
        card_ROTATE_Z  = card_getRotateZ()
        decor_ROTATE_Y = 180
    
        card_TIMEOUT = setTimeout(async () =>
        {
            decor_HIDE = false

            let {cancel, promise} = animation(t =>
            {
                if (t < .33)
                {
                    const T = cubicOut(t / .33)

                    card_TRANSLATE_Y  = START_Y + DIF_Y * T
                    decor_TRANSLATE_Z = -1000 * (1 - T)
                }
                else if (t > .4)
                {
                    const U = 1 - cubicInOut((t - .4) / .6)
            
                    decor_ROTATE_Y = 180 * U
                }
            },
            CARD_DURATION)

            card_START  = false
            card_cancel = cancel

            try { await promise, card_setTransition(400) } catch { card_setTransition(400) }
        },
        card_START ? CARD_DELAY_2 : 0)
    }

    async function card_aOut()
    {
        const
        TRANSLATE_Y = card_TRANSLATE_Y,
        ROTATE_Z    = card_ROTATE_Z

        card_setTransition(0)
    
        let {cancel, promise} = animation(t =>
        {
            const T = cubicIn(t)
        
            card_TRANSLATE_Y = TRANSLATE_Y + APP.app_HEIGHT * T
            card_ROTATE_Z    = ROTATE_Z * (1 - T)
        },
        CARD_DURATION_2)

        card_cancel = cancel

        try { await promise, decor_HIDE = true } catch {}
    }

    async function card_a()
    {
        const
        ROTATE_X = card_ROTATE_X,
        ROTATE_Y = card_ROTATE_Y,
        VEL_X    = ROTATE_X * .7,
        VEL_Y    = ROTATE_Y * .7
    
        let {cancel, promise} = animation(t =>
        {
            const U = 1 - t

            card_ROTATE_X = ROTATE_X * U - VEL_X
            card_ROTATE_Y = ROTATE_Y * U - VEL_Y
        },
        CARD_DURATION)

        card_cancel2 = cancel

        try { await promise, card_ROTATE_X = (card_ROTATE_Y = 0) } catch {}
    }


//=======@UTILS|

    // --*
    function fragments_style()
    {
        const
        TRANSFORM = tag_getTransform(`calc(var(--tag-x, ${tag_TRANSLATE_X}px) - 200%)`, `calc(var(--tag-y, ${tag_TRANSLATE_Y}px) - 100%)`, 0),
        DURATION  = Math.random() * TAG_DURATION + TAG_DURATION + 'ms'
    
        return `
        --frag-duration: ${DURATION};
        transform: ${TRANSFORM};
        transition: transform var(--frag-duration, ${DURATION}) ease-out;`
    }


</script>


<!-- #|-STYLE-| -->

<style
lang="scss"
>

/* #\-USES-\ */

    /* --SASS */
    @use 'sass:math';

    /* --APP */

    /* --DEPENDENCIES */
    @use '../../../../../assets/scss/styles/utils';
    @use '../../../../../assets/scss/styles/display';

    /* --MEDIA */


/* #\-VARIABLES-\ */

    /* --* */
    $card-ratio: math.div(333, 234);

    $size: max(14vw, 14vh);


/* #\-GLOBAL-\ */

    /* --* */


/* #\-THIS-\ */

.card
{
    &, .decor, .texture, :global .tag { transform-style: preserve-3d; }

    &, .texture, :global .icon { position: absolute; }

    contain: layout size;
    isolation: isolate;

    aspect-ratio: 234 / 333;

    width:  $size;
    height: calc($size * $card-ratio);

    pointer-events: auto;

    transition: transform ease-out;

    &.focus { will-change: transform; }

    .decor
    {
        @extend %f-center;

        pointer-events: none;

        &.hide { display: none !important; }

        .background { @extend %any-size; }

        .texture, :global .icon { backface-visibility: hidden; }

        .texture
        {
            width: 94%;
            height: 94%;
        }

        :global .icon { transform: rotateY(180deg); }
    }
}


</style>