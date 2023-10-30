<!-- #MAP

-APP
-EVENT
    CARD
        DECOR
            BACKGROUND
            TEXTURE
            ICON
                LOGO

    TAG

-->

<!-- #SCRIPT -->

<script>
// #EXPORTS

    // --PROPS
    export let
    prop_$RESIZE = {},

    prop_CARD_HOVER = void 0,   // hovering card id

    prop_ON = false,

    prop_ID = void 0,
    prop_TARGET = 0,            // -1 | 0 | 1

    prop_CONTENT = '',
    prop_COLOR = "#FFF",

    prop_$MOUSEENTER = () => {},
    prop_$MOUSELEAVE = () => {}

// #IMPORTS

    // --JS
    import { wait_throttle } from '../../assets/js/utils/wait'
    import { animation } from '../../assets/js/utils/animation'

    // --LIB
    import COLORS from '$lib/colors'

    // --CONTEXTS
    import { APP, EVENT } from '../../App.svelte'

    // --SVELTE
    import { onMount, onDestroy } from 'svelte'
    import { createEventDispatcher } from 'svelte'
    import { cubicIn, cubicOut, cubicInOut } from 'svelte/easing'

    // --COMPONENT-COVER
    import Icon from '../covers/Icon.svelte'

    // --COMPONENT-ELEMENT
    import Tag from './Tag.svelte'

    // --COMPONENT-ICON
    import Logo from '../icons/Logo.svelte'

// #CONSTANTES

    // --SVELTE
    const SVELTE_DISPATCH = createEventDispatcher()

    // --ELEMENT-CARD
    const
    CARD_DELAY = (prop_ID ?? 0) * 600, 
    CARD_PERSPECTIVE = 3000,
    CARD_EVENTS =
    {
        mouseMove: wait_throttle(card_e$MouseMove, 50.01),
        mouseUp: card_e$MouseUp
    }

    // --ELEMENT-TAG
    const TAG_DURATION = 300

// #VARIABLES

    // --ELEMENT-CARD
    let
    card,

    card_ON = false,
    card_START = true,
    card_GRABBING = false,

    card_TRANSLATE_X = 0,
    card_TRANSLATE_Y = 0,

    card_ROTATE_X = 0,
    card_ROTATE_Y = 0,
    card_ROTATE_Z = 0,

    card_TRANSITION_DURATION = 0,

    card_HALF_WIDTH = 0,
    card_HALF_HEIGHT = 0,

    card_LAST,
    card_TIMEOUT,

    card_cancel = () => {},
    card_cancel2 = () => {}

    // --ELEMENT-DECOR
    let
    decor_HIDE = true,

    decor_TRANSLATE_Z = 0,

    decor_ROTATE_Y = 0

    // --ELEMENT-TAG
    let
    tag_FOCUS = false,

    tag_TRANSLATE_X = 0,
    tag_TRANSLATE_Y = 0,

    tag_DELAY

// #REACTIVE

    // --ELEMENT-CARD
    $: card_update(prop_ON, prop_TARGET)

// #FUNCTIONS

    // --SET
    function card_set()
    {
        card_setVars()

        prop_$RESIZE.push(card_e$Resize)
    }

    function card_setVars()
    {
        card_HALF_WIDTH = card.offsetWidth / 2
        card_HALF_HEIGHT = card.offsetHeight / 2
    
        card_TRANSLATE_X = card_getTranslateX()
        card_TRANSLATE_Y =  card_getTranslateY() + (card_ON ? 0 : APP.app_HEIGHT)

        card_ROTATE_X = (card_ROTATE_Y = 0)
        card_ROTATE_Z = card_getRZ()
    
        tag_setVars()
    }

    function card_setEvents() { EVENT.event_add(CARD_EVENTS) }

    function card_setTransition(value) { card_TRANSITION_DURATION = value }

    function tag_setVars()
    {
        tag_TRANSLATE_X = card_TRANSLATE_X + card_HALF_WIDTH
        tag_TRANSLATE_Y = card_getTranslateY() + card_HALF_HEIGHT
    }

    // --DESTROY
    function card_destroy()
    {
        card_clear()

        card_destroyEvents()

        prop_$RESIZE.splice(card_e$Resize)
    }

    function card_destroyEvents() { EVENT.event_remove(CARD_EVENTS) }

    // --GET
    function card_getTranslateX() { return APP.app_WIDTH * .5 - APP.app_WIDTH * .05 * prop_ID }

    function card_getTranslateY() { return APP.app_HEIGHT * .8 - card_HALF_HEIGHT * 2 - APP.app_HEIGHT * .08 * prop_ID }

    function card_getRZ() { return 10 - 10 * prop_ID }

    function tag_getTransform(x, y, scale) { return `translate(${x}, ${y}) scale(${scale})` }

    // --UPDATES
    function card_update(on, target /* -1 | 0 | 1 */)
    {
        const ON = ~target && on

        if (card && ON != card_ON)
        {
            card_clear()

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

    function tag_update(fragments, style)
    {
        for (let i = 0; i < fragments.length; i++)
        {
            const FRAG = fragments[i]

            if (FRAG)
            {
                clearTimeout(FRAG.timeout)

                FRAG.timeout = setTimeout(() => FRAG.style.transform = style, tag_DELAY * i)
            }
            else return
        }
    }

    // --CLEAR
    function card_clear()
    {
        clearTimeout(card_TIMEOUT)

        card_cancel()
        card_cancel2()
    }

    // --EVENTS
    async function card_e$MouseMove(clientX, clientY) { card_updateTranslate(clientX, clientY) }

    const card_eMouseMove = wait_throttle(({ clientX, clientY, offsetX, offsetY }) =>
    {
        if (offsetX && offsetY) card_updateRotate(offsetX - card_HALF_WIDTH, offsetY - card_HALF_HEIGHT)

        tag_TRANSLATE_X = clientX
        tag_TRANSLATE_Y = clientY
    }, 100.02)

    function card_eMouseEnter()
    {
        card_cancel2()
    
        prop_$MOUSEENTER(prop_ID)

        tag_FOCUS = true
    }

    function card_eMouseLeave()
    {
        prop_$MOUSELEAVE()

        tag_FOCUS = false
    
        card_a()
    }

    function card_eMouseDown()
    {
        card_setEvents()

        card_GRABBING = true
        card_LAST = +new Date()
    }

    function card_e$MouseUp()
    {
        if (+new Date() < card_LAST + 200.04) card_eClick()

        card_destroyEvents()
        
        card_GRABBING = false
    }

    function card_eClick() { SVELTE_DISPATCH('click', { id: prop_ID }) }

    async function card_e$Resize() { card_setVars() }

    // --ANIMATIONS
    async function card_aIn()
    {
        const
        START_Y = card_TRANSLATE_Y,
        END_Y = card_getTranslateY(),
        DIF_Y = END_Y - START_Y
    
        card_ROTATE_Z = card_getRZ()
        decor_ROTATE_Y = 180
    
        card_TIMEOUT = setTimeout(async () =>
        {
            decor_HIDE = false

            let {cancel, promise} = animation((t) =>
            {
                if (t < .33)
                {
                    const T = cubicOut(t / .33)

                    card_TRANSLATE_Y = START_Y + DIF_Y * T
                    decor_TRANSLATE_Z = -1000 * (1 - T)
                }
                else if (t > .4)
                {
                    const U = 1 - cubicInOut((t - .4) / .6)
            
                    decor_ROTATE_Y = 180 * U
                }
            },
            600.12)

            card_START = false
            card_cancel = cancel

            try { await promise, card_setTransition(400) } catch { card_setTransition(400) }
        },
        card_START ? CARD_DELAY : 0)
    }

    async function card_aOut()
    {
        const
        TRANSLATE_Y = card_TRANSLATE_Y,
        ROTATE_Z = card_ROTATE_Z

        card_setTransition(0)
    
        let {cancel, promise} = animation(
        (t) =>
        {
            const T = cubicIn(t)
        
            card_TRANSLATE_Y = TRANSLATE_Y + APP.app_HEIGHT * T
            card_ROTATE_Z = ROTATE_Z * (1 - T)
        },
        400.08)

        card_cancel = cancel

        try { await promise, decor_HIDE = true } catch {}
    }

    async function card_a()
    {
        const
        [ROTATE_X, ROTATE_Y] = [card_ROTATE_X, card_ROTATE_Y],
        [VEL_X, VEL_Y] = [ROTATE_X * .7, ROTATE_Y * .7]
    
        let {cancel, promise} = animation((t) =>
        {
            const U = 1 - t

            card_ROTATE_X = ROTATE_X * U - VEL_X
            card_ROTATE_Y = ROTATE_Y * U - VEL_Y
        },
        600)

        card_cancel2 = cancel

        try { await promise, card_ROTATE_X = (card_ROTATE_Y = 0) } catch {}
    }

    // --INTRO
    function tag_in(tag, fragments)
    {
        tag_DELAY ??= TAG_DURATION / fragments.length

        const STYLE = tag_getTransform('var(--tag-x, 25%)', 'var(--tag-y, 45%)', 1)
    
        tag_update(fragments, STYLE, 0)
    }

    // --OUTRO
    function tag_out(tag, fragments)
    {
        const STYLE = tag_getTransform(`calc(var(--tag-x, ${tag_TRANSLATE_X}px) + 200%)`, `calc(var(--tag-y, ${tag_TRANSLATE_Y}px) + 100%)`, 0)

        tag_update(fragments, STYLE)
    }

    // --STYLE
    function fragments_style()
    {
        const
        STYLE = tag_getTransform(`calc(var(--tag-x, ${tag_TRANSLATE_X}px) - 200%)`, `calc(var(--tag-y, ${tag_TRANSLATE_Y}px) - 100%)`, 0),
        DURATION = Math.random() * TAG_DURATION + TAG_DURATION + 'ms'
    
        return `
        --frag-duration: ${DURATION};
        transform: ${STYLE};
        transition: transform var(--frag-duration, ${DURATION}) ease-out;`
    }

// #CYCLES

onMount(card_set)
onDestroy(card_destroy)
</script>

<!-- #HTML -->

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
prop_IN={tag_in}
prop_OUT={tag_out}
prop_STYLE={{ tag_style: () => '', fragments_style }}
{prop_CONTENT}
--tag-x="{tag_TRANSLATE_X}px"
--tag-y="{tag_TRANSLATE_Y}px"
/>

<!-- #STYLE -->

<style
lang="scss"
>
/* #USES */

@use 'sass:math';

@use '../../assets/scss/styles/utils';
@use '../../assets/scss/styles/elements';
@use '../../assets/scss/styles/position';
@use '../../assets/scss/styles/display';
@use '../../assets/scss/styles/size';

/* #CARD */

.card
{
    $card-ratio: math.div(333, 234);
    $size: max(14vw, 14vh);

    &, .decor, .texture, :global .tag { transform-style: preserve-3d; }

    @extend %button-reset;

    contain: layout size;
    isolation: isolate;

    position: absolute;

    aspect-ratio: 234 / 333;

    width: $size;
    height: calc($size * $card-ratio);

    pointer-events: auto;

    transition: transform ease-out;

    &.focus { will-change: transform; }

    .decor
    {
        @extend %f-center;

        pointer-events: none;

        &.hide { display: none !important; }

        .background { @extend %any; }

        .texture
        {
            position: absolute;

            width: 94%;
            height: 94%;
    
            backface-visibility: hidden;
        }
    }

    :global
    {
        .decor .icon { backface-visibility: hidden; }
    
        .decor .icon
        {
            position: absolute;

            transform: rotateY(180deg);
        }
    }
}
</style>