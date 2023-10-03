<!-- https://tekeye.uk/playing_cards/svg-playing-cards -->

<!-- #MAP

-EVENT
    CARD
        DECOR
            SVG
            SVG
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
    prop_ON = false,
    prop_FOCUS = void 0,

    prop_ID = void 0,
    prop_CONTENT = '',
    prop_COLOR = '#FFF',

    prop_$MOUSEENTER = () => {},
    prop_$MOUSELEAVE = () => {},
    prop_$CLICK = () => {}

// #IMPORTS

    // --JS
    import { wait_throttle } from '../../assets/js/utils/wait'

    // --LIB
    import COLORS from '$lib/colors'

    // --CONTEXT
    import { EVENT } from '../../App.svelte'

    // --SVELTE
    import { onMount, onDestroy } from 'svelte'

    // --COMPONENT-COVER
    import Icon from '../covers/Icon.svelte'

    // --COMPONENT-ELEMENT
    import Tag from './Tag.svelte'

    // --COMPONENT-ICON
    import Logo from '../icons/Logo.svelte'

// #CONSTANTES

    // --ELEMENT-CARD
    const
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
    card_START = false,
    card_TARGET = false,
    card_GRABBING = false,

    card_TRANSLATE_X = 0,
    card_TRANSLATE_Y = 0,
    card_TRANSLATE_Z = 0,
    card_ROTATE = 0,
    card_ROTATE_X = 0,
    card_ROTATE_Y = 0,
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

    // --ELEMENT-TAG
    let
    tag_FOCUS = false,
    tag_DELAY

// #REACTIVE

    // --ELEMENT-CARD
    $: card_update(prop_ON)

// #FUNCTIONS

    // --SET
    function card_set()
    {
        card_setVars()

        prop_$RESIZE.push(card_e$Resize)
    }

    function card_setVars()
    {
        const [WIDTH, HEIGHT] = [window.innerWidth, window.innerHeight]
    
        card_TRANSLATE_X = WIDTH * .5 - WIDTH * .05 * prop_ID
        card_TRANSLATE_Y = HEIGHT * .85 - card.offsetHeight - HEIGHT * .08 * prop_ID
        card_TRANSLATE_Z = 0
        card_ROTATE = 10 - 10 * prop_ID
    
        card_HALF_WIDTH = card.offsetWidth / 2
        card_HALF_HEIGHT = card.offsetHeight / 2

        card_X = card_HALF_WIDTH
        card_Y = card_HALF_HEIGHT

        if (!card_TRANSITION_DURATION) setTimeout(() => card_TRANSITION_DURATION = 400, 50.01)
    }

    function card_setEvents() { EVENT.event_add(CARD_EVENTS) }

    function card_setEvents2() { EVENT.event_add(CARD_EVENTS_2) }

    // --DESTROY
    function card_destroy()
    {
        card_clearTimeout()

        card_destroyEvents()

        prop_$RESIZE.splice(card_e$Resize)
    }

    function card_destroyEvents() { EVENT.event_remove(CARD_EVENTS) }

    function card_destroyEvents2() { EVENT.event_remove(CARD_EVENTS_2) }

    // --GET
    function tag_getTransform(x, y, scale) { return `translate(${x}, ${y}) scale(${scale})` }

    // --UPDATES
    function card_update(on)
    {
        card_clearTimeout()

        on
        ? card_TIMEOUT = setTimeout(() => card_START = true, prop_ID * 800 + 400)
        : card_START = false
    }

    function card_updateTarget()
    {
        card_TARGET = !card_TARGET
    
        if (card_TARGET)
        {
            prop_$CLICK(prop_ID)

            card_TRANSLATE_X = window.innerWidth * .5 - card_HALF_WIDTH
            card_TRANSLATE_Y = window.innerHeight * .5 - card_HALF_HEIGHT
            card_TRANSLATE_Z = 50
            card_ROTATE = 0
        }
        else
        {
            prop_$CLICK(null)

            card_setVars()
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

    // --EVENTS
    async function card_e$MouseMove(clientX, clientY) { card_updateTranslate(clientX, clientY) }

    const card_eMouseMove = wait_throttle(({ offsetX, offsetY }) =>
    {
        if (offsetX === 0 && offsetY === 0) return

        const [X, Y] = [offsetX - card_HALF_WIDTH, offsetY - card_HALF_HEIGHT]

        card_updateRotate(X, Y)

        card_X = offsetX
        card_Y = offsetY
    }, 100.02)

    function card_eMouseEnter()
    {
        prop_$MOUSEENTER(prop_ID)
    
        tag_FOCUS = true

        card_destroyEvents2()

        card_TRANSLATE_Z = 20
    }

    function card_eMouseLeave()
    {
        prop_$MOUSELEAVE()

        tag_FOCUS = false

        card_TRANSLATE_Z = 0
    
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
        if (+new Date() < card_LAST + 200.04) card_updateTarget()

        card_destroyEvents()
        
        card_GRABBING = false
    }

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

    // --TRANSITION
    function decor_tOut() { return { duration: 400, css: (t, u) => `transform: rotate(${u * -180}deg) scale(${t})` }}

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

    // --CLEAR
    function card_clearTimeout() { clearTimeout(card_TIMEOUT) }

    // --UTIL
    function card_view()
    {
        prop_$CLICK(prop_ID)

        card_TARGET = true

        card_TRANSLATE_X = window.innerWidth * .5 - card_HALF_WIDTH
        card_TRANSLATE_Y = window.innerHeight * .5 - card_HALF_HEIGHT
        card_TRANSLATE_Z = 50
        card_ROTATE = 0
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
style:transform="
translate3d(
    {card_TRANSLATE_X}px,
    {card_TRANSLATE_Y}px,
    {(prop_ID - (prop_FOCUS ?? prop_ID)) * 50}px)
rotate({card_ROTATE}deg)
rotateX({card_ROTATE_X}rad)
rotateY({card_ROTATE_Y}rad)"
style:pointer-events={card_START ? 'auto' : 'none'}
style:transition-duration="{card_TRANSITION_DURATION}ms"
bind:this={card}
on:mousemove={card_eMouseMove}
on:mouseenter={card_eMouseEnter}
on:mouseleave={card_eMouseLeave}
on:mousedown={card_eMouseDown}
>
    {#if card_START}
        <div
        class="decor"
        out:decor_tOut
        >
            <svg
            viewBox="0 0 234 333"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            >
                <path
                d="M8.91919 3.5H224.325C227.308 3.5 229.744 5.92832 229.744 8.94574V323.298C229.744 326.316 227.308 328.744 224.325 328.744H8.91919C5.93608 328.744 3.5 326.316 3.5
                323.298V8.94574C3.5 5.92832 5.93605 3.5 8.91919 3.5Z"
                fill={COLORS.dark}
                stroke={COLORS[card_GRABBING ? 'primary' : 'light']}
                stroke-width="4"
                />
            </svg>

            <svg
            viewBox="0 0 234 333"
            fill={prop_COLOR}
            xmlns="http://www.w3.org/2000/svg"
            >
                <slot />
            </svg>

            <Icon
            prop_COLOR={COLORS.light}
            prop_SIZE="18%"
            >
                <Logo />
            </Icon>
        </div>

        {#if tag_FOCUS}
            <Tag
            prop_DURATION={TAG_DURATION}
            prop_INTRO={tag_intro}
            prop_OUTRO={tag_outro}
            prop_STYLE={{ tag_style: () => '', fragments_style }}
            {prop_CONTENT}
            />
        {/if}
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

    @extend %button-reset;

    position: absolute;

    transform-style: preserve-3d;

    aspect-ratio: 234 / 333;

    width: $size;
    height: calc($size * $card-ratio);

    transition: transform ease-out;

    .decor
    {
        $d: .2s;

        @extend %f-center;

        transform-style: preserve-3d;
        transform: rotateY(180deg) translate3d(0, 100vh, -400px);

        pointer-events: none;
    
        animation: aCardTranslate $d ease-out forwards, aCardRotate .4s ($d + .05s) ease-in-out forwards;

        @keyframes aCardTranslate { to { transform: rotateY(180deg) translate3d(0, 0, 0); } }
        @keyframes aCardRotate { to { transform: rotateY(0deg); } }

        &>svg:nth-child(1)
        {
            @extend %any;

            path { transition: stroke .6s; }
        }
        &>svg:nth-child(2)
        {
            position: absolute;

            transform-style: preserve-3d;

            width: 94%;
            height: 94%;
    
            backface-visibility: hidden;
        }
    }

    :global
    {
        .decor .icon
        {
            position: absolute;

            transform: rotateY(180deg);
        
            backface-visibility: hidden;
        }

        .tag
        {
            @include position.placement(absolute, $top: 0, $left: 0);

            pointer-events: none;
        }
    }
}
</style>