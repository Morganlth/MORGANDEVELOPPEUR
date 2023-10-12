<!-- https://tekeye.uk/playing_cards/svg-playing-cards -->

<!-- #MAP

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

    prop_ID = void 0,

    prop_ON = false,
    prop_TARGET = false,

    prop_CONTENT = '',
    prop_COLOR = "#FFF",

    prop_$MOUSEENTER = () => {},
    prop_$MOUSELEAVE = () => {},
    prop_$CLICK = () => {}

// #IMPORTS

    // --JS
    import { wait_throttle } from '../../assets/js/utils/wait'
    import { animation } from '../../assets/js/utils/animation'

    // --LIB
    import COLORS from '$lib/colors'

    // --CONTEXT
    import { EVENT } from '../../App.svelte'

    // --SVELTE
    import { onMount, onDestroy } from 'svelte'
    import { cubicIn, cubicOut, cubicInOut } from 'svelte/easing'

    // --COMPONENT-COVER
    import Icon from '../covers/Icon.svelte'

    // --COMPONENT-ELEMENT
    import Tag from './Tag.svelte'

    // --COMPONENT-ICON
    import Logo from '../icons/Logo.svelte'

// #CONSTANTES

    // --ELEMENT-CARD
    const
    CARD_DELAY = (prop_ID ?? 0) * 600, 
    CARD_PERSPECTIVE = 3000,
    CARD_EVENTS =
    {
        mouseMove: wait_throttle(card_e$MouseMove, 50.01),
        mouseUp: card_e$MouseUp
    },
    CARD_EVENTS_2 = { animation: wait_throttle(card_e$Animation, 50.01) }

    // --ELEMENT-TAG
    const TAG_DURATION = 300

// #VARIABLES

    // --ELEMENT-CARD
    let
    card,

    card_CHARGED = false,
    card_ON = false,
    card_START = true,
    card_GRABBING = false,

    card_TRANSLATE_X = 0,
    card_TRANSLATE_Y = 0,

    card_ROTATE_X = 0,
    card_ROTATE_Y = 0,
    card_ROTATE_Z = 0,

    card_OPACITY = 0,

    card_TRANSITION_DURATION = 0,

    card_HALF_WIDTH = 0,
    card_HALF_HEIGHT = 0,

    card_X = 0,
    card_Y = 0,

    card_U,
    card_X_I,
    card_Y_I,
    card_X_A,
    card_Y_A,

    card_LAST,
    card_TIMEOUT

    // --ELEMENT-DECOR
    let
    decor_TRANSLATE_Z = 0,

    decor_ROTATE_Y = 0

    // --ELEMENT-TAG
    let
    tag_FOCUS = false,
    tag_DELAY

// #REACTIVE

    // --ELEMENT-CARD
    $: card_CHARGED ? card_update(prop_ON, prop_TARGET) : void 0

// #FUNCTIONS

    // --SET
    function card_set()
    {
        card_setVars()

        prop_$RESIZE.push(card_e$Resize)

        card_CHARGED = true
    }

    function card_setVars()
    {
        card_TRANSLATE_X = card_getTranslateX()
        card_TRANSLATE_Y = card_getTranslateY() + (card_ON ? 0 : window.innerHeight)

        card_ROTATE_X = (card_ROTATE_Y = 0)
        card_ROTATE_Z = card_getRZ()
    
        card_HALF_WIDTH = card.offsetWidth / 2
        card_HALF_HEIGHT = card.offsetHeight / 2
    
        card_X = card_HALF_WIDTH
        card_Y = card_HALF_HEIGHT
    }

    function card_setEvents() { EVENT.event_add(CARD_EVENTS) }

    function card_setEvents2() { EVENT.event_add(CARD_EVENTS_2) }

    function card_setTransition(value) { card_TRANSITION_DURATION = value }

    // --DESTROY
    function card_destroy()
    {
        card_clear()

        card_destroyEvents()

        prop_$RESIZE.splice(card_e$Resize)
    }

    function card_destroyEvents() { EVENT.event_remove(CARD_EVENTS) }

    function card_destroyEvents2() { EVENT.event_remove(CARD_EVENTS_2) }

    // --GET
    function card_getTranslateX() { return window.innerWidth * .5 - window.innerWidth * .05 * prop_ID }

    function card_getTranslateY() { return window.innerHeight * .8 - card.offsetHeight - window.innerHeight * .08 * prop_ID }

    function card_getRZ() { return 10 - 10 * prop_ID }

    function tag_getTransform(x, y, scale) { return `translate(${x}, ${y}) scale(${scale})` }

    // --UPDATES
    function card_update(on, target)
    {
        const ON = ~target && on

        if (card && ON != card_ON)
        {
            card_clear()

            ON ? card_aIn() : card_aOut()

            card_ON = ON

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
        card_ROTATE_X = y / card_HALF_HEIGHT * .2
        card_ROTATE_Y = x / -card_HALF_WIDTH * .2
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

        cancelAnimationFrame(card.animation_FRAMEID)
    }

    // --EVENTS
    async function card_e$MouseMove(clientX, clientY) { card_updateTranslate(clientX, clientY) }

    const card_eMouseMove = wait_throttle(({ offsetX, offsetY }) =>
    {
        if (offsetX && offsetY)
        {
            const [X, Y] = [offsetX - card_HALF_WIDTH, offsetY - card_HALF_HEIGHT]

            card_updateRotate(X, Y)

            card_X = offsetX
            card_Y = offsetY
        }
    }, 100.02)

    function card_eMouseEnter()
    {
        prop_$MOUSEENTER(prop_ID)

        tag_FOCUS = true

        card_destroyEvents2()
    }

    function card_eMouseLeave()
    {
        prop_$MOUSELEAVE()

        tag_FOCUS = false
    
        card_U = 1
        card_X_I = card_ROTATE_X
        card_Y_I = card_ROTATE_Y
        card_X_A = card_X_I / 1.5
        card_Y_A = card_Y_I / 1.5

        card_setEvents2()
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

    function card_eClick() { prop_$CLICK(prop_TARGET ? null : prop_ID) }

    async function card_e$Resize() { card_setVars() }

    async function card_e$Animation()
    {
        if (card_U < 0)
        {
            card_destroyEvents2()
        
            card_updateRotate(0, 0)
        }
        else
        {
            card_ROTATE_X = card_X_I * card_U - card_X_A
            card_ROTATE_Y = card_Y_I * card_U - card_Y_A
        }

        card_U -= .1
    }

    // --ANIMATIONS
    function card_aIn()
    {
        const
        START_Y = card_TRANSLATE_Y,
        END_Y = card_getTranslateY(),
        DIF_Y = END_Y - START_Y
    
        card_ROTATE_Z = card_getRZ()
        decor_ROTATE_Y = 180
    
        card_TIMEOUT = setTimeout(async () =>
        {
            card_OPACITY = 1

            await animation.call(
            card,
            (t) =>
            {
                const EASING_T = cubicOut(t)

                card_TRANSLATE_Y = START_Y + DIF_Y * EASING_T
                decor_TRANSLATE_Z = -1000 * (1 - EASING_T)
            },
            200.04)

            card_START = false
        
            card_aIn2()
        },
        card_START ? CARD_DELAY : 0)
    }

    function card_aIn2()
    {
        card_TIMEOUT = setTimeout(async () =>
        {
            await animation.call(
            card,
            (t) => decor_ROTATE_Y = 180 * cubicInOut(1 - t),
            400.08)

            card_setTransition(400)
        },
        50.01)
    }

    async function card_aOut()
    {
        const
        TRANSLATE_Y = card_TRANSLATE_Y,
        ROTATE_Z = card_ROTATE_Z

        card_setTransition(0)
    
        await animation.call(
        card,
        (t) =>
        {
            const
            EASING_T = cubicIn(t),
            U = (1 - EASING_T)
        
            card_TRANSLATE_Y = TRANSLATE_Y + window.innerHeight * EASING_T
            card_ROTATE_Z = ROTATE_Z * U
        },
        400.08)

        card_OPACITY = 0
    }

    // --INTRO
    function tag_intro(tag, fragments)
    {
        tag_DELAY ??= TAG_DURATION / fragments.length

        const STYLE = tag_getTransform('var(--card-x, 25%)', 'var(--card-y, 45%)', 1)
    
        tag_update(fragments, STYLE, 0)
    }

    // --OUTRO
    function tag_outro(tag, fragments)
    {
        const STYLE = tag_getTransform(`calc(var(--card-x, ${card_X}px) + 200%)`, `calc(var(--card-y, ${card_Y}px) + 100%)`, 0)

        tag_update(fragments, STYLE)
    }

    // --STYLE
    function fragments_style()
    {
        const
        STYLE = tag_getTransform(`calc(var(--card-x, ${card_X}px) - 200%)`, `calc(var(--card-y, ${card_Y}px) - 100%)`, 0),
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
data-id={prop_ID}
style:--card-x="{card_X}px"
style:--card-y="{card_Y}px"
style:--tag-r="{-card_ROTATE_Z}deg"
style:transform="
translate3d(
{card_TRANSLATE_X}px,
{card_TRANSLATE_Y}px,
{(prop_ID - (prop_CARD_HOVER ?? prop_ID)) * 50}px)

perspective({CARD_PERSPECTIVE}px)

rotateX({card_ROTATE_X}rad)
rotateY({card_ROTATE_Y}rad)
rotateZ({card_ROTATE_Z}deg)"
style:opacity={card_OPACITY}
style:transition-duration="{card_TRANSITION_DURATION}ms"
bind:this={card}
on:mousemove={card_eMouseMove}
on:mouseenter={card_eMouseEnter}
on:mouseleave={card_eMouseLeave}
on:mousedown={card_eMouseDown}
>
    <div
    class="decor"
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

    {#if card_CHARGED && (tag_FOCUS || prop_TARGET === 1)}
        <Tag
        prop_DURATION={TAG_DURATION}
        prop_INTRO={tag_intro}
        prop_OUTRO={tag_outro}
        prop_STYLE={{ tag_style: () => '', fragments_style }}
        {prop_CONTENT}
        />
    {/if}
</button>

<!-- #STYLE -->

<style
lang="scss"
>
/* #USES */

@use 'sass:math';

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

    position: absolute;

    aspect-ratio: 234 / 333;

    width: $size;
    height: calc($size * $card-ratio);

    pointer-events: auto;

    transition: transform ease-out, opacity .2s;

    .decor
    {
        @extend %f-center;

        pointer-events: none;

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
        .decor .icon, .tag { backface-visibility: hidden; }
    
        .decor .icon
        {
            position: absolute;

            transform: rotateY(180deg);
        }

        .tag
        {
            @include position.placement(absolute, $top: 0, $left: 0);

            transform: rotate(var(--tag-r, 0));

            pointer-events: none;
        }
    }
}
</style>