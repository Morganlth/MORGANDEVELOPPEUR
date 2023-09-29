<!-- https://tekeye.uk/playing_cards/svg-playing-cards -->

<!-- #MAP

-EVENT
    CARD
        DECOR
            SVG
            SVG
            ICON
                LOGO

-->

<!-- #SCRIPT -->

<script>
// #EXPORTS

    // --PROPS
    export let
    prop_ID = void 0,
    prop_FOCUS = false,
    prop_COLOR = '#FFF',
    prop_GROUP = []

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

    // --COMPONENT-ICON
    import Logo from '../icons/Logo.svelte'

// #CONSTANTES

    // --ELEMENT-CARD
    const
    CARD_EVENTS = { resize: card_e$Resize },
    CARD_EVENTS_2 =
    {
        mouseMove: wait_throttle(card_e$MouseMove, 50.01),
        mouseUp: card_e$MouseUp
    },
    CARD_EVENTS_3 = { animation: wait_throttle(card_e$Animation, 50.01) }

// #VARIABLES

    // --ELEMENT-CARD
    let
    card,
    card_START = false,

    card_GRABBING = false,

    card_TRANSLATE_X = 0,
    card_TRANSLATE_Y = 0,
    card_ROTATE = 0,
    card_ROTATE_X = 0,
    card_ROTATE_Y = 0,

    card_TRANSITION_DURATION = 0,

    card_HALF_WIDTH = 0,
    card_HALF_HEIGHT = 0,

    card_U,
    card_X_I,
    card_Y_I,
    card_X_A,
    card_Y_A,

    card_LAST,
    card_TIMEOUT

// #REACTIVE

    // --ELEMENT-CARD
    $: card_update(prop_FOCUS)

// #FUNCTIONS

    // --SET
    function card_set()
    {
        card_setVars()
        card_setEvents()

        prop_GROUP[prop_ID] = card
    }

    function card_setVars()
    {
        const [WIDTH, HEIGHT] = [window.innerWidth, window.innerHeight]
    
        card_TRANSLATE_X = WIDTH * .5 - WIDTH * .04 * prop_ID
        card_TRANSLATE_Y = HEIGHT * .85 - card.offsetHeight - HEIGHT * .08 * prop_ID
        card_ROTATE = 10 - 10 * prop_ID
        card_HALF_WIDTH = card.offsetWidth / 2
        card_HALF_HEIGHT = card.offsetHeight / 2

        if (!card_TRANSITION_DURATION) setTimeout(() => card_TRANSITION_DURATION = 400, 50.01)
    }

    function card_setEvents() { EVENT.event_add(CARD_EVENTS) }

    function card_setEvents2() { EVENT.event_add(CARD_EVENTS_2) }

    function card_setEvents3() { EVENT.event_add(CARD_EVENTS_3) }

    // --DESTROY
    function card_destroy()
    {
        card_clearTimeout()

        card_destroyEvents()
    }

    function card_destroyEvents()
    {
        EVENT.event_remove(CARD_EVENTS)

        card_destroyEvents2()
        card_destroyEvents3()
    }

    function card_destroyEvents2() { EVENT.event_remove(CARD_EVENTS_2) }

    function card_destroyEvents3() { EVENT.event_remove(CARD_EVENTS_3) }

    // --UPDATES
    function card_update()
    {
        card_clearTimeout()

        prop_FOCUS
        ? card_TIMEOUT = setTimeout(() => card_START = true, prop_ID * 800)
        : card_START = false
    }

    function card_updateTranslate(x, y)
    {
        card_TRANSLATE_X = x - card_HALF_WIDTH
        card_TRANSLATE_Y = y - card_HALF_HEIGHT
    }

    function card_updateRotate(x, y)
    {
        card_ROTATE_X = (y - card_HALF_HEIGHT) / card_HALF_HEIGHT * .2
        card_ROTATE_Y = (x - card_HALF_WIDTH) / -card_HALF_WIDTH * .2
    }

    // --EVENTS
    async function card_e$MouseMove(clientX, clientY) { card_updateTranslate(clientX, clientY) }

    const card_eMouseMove = wait_throttle(({ offsetX, offsetY }) => card_updateRotate(offsetX, offsetY), 50.01)

    function card_eMouseEnter() { card_destroyEvents3() }

    function card_eMouseLeave()
    {
        card_U = 1
        card_X_I = card_ROTATE_X
        card_Y_I = card_ROTATE_Y
        card_X_A = card_X_I / 1.5
        card_Y_A = card_Y_I / 1.5

        card_setEvents3()
    }

    function card_eMouseDown()
    {
        card_setEvents2()

        card_GRABBING = true
        card_LAST = +new Date()
    }

    function card_e$MouseUp()
    {
        if (+new Date() < card_LAST + 200.04) card_view()

        card_destroyEvents2()
        
        card_GRABBING = false
    }

    async function card_e$Resize() { card_setVars() }

    async function card_e$Animation()
    {
        if (card_U < 0)
        {
            card_destroyEvents3()
        
            card_updateRotate(card_HALF_WIDTH, card_HALF_HEIGHT)
        }
        else
        {
            card_ROTATE_X = card_X_I * card_U - card_X_A
            card_ROTATE_Y = card_Y_I * card_U - card_Y_A
        }

        card_U -= .1
    }

    // --TRANSITION
    function decor_tOut() { return { duration: 400, css: (t) => `transform: scale(${t})` }}

    // --CLEAR
    function card_clearTimeout() { clearTimeout(card_TIMEOUT) }

    // --UTILS
    function card_view()
    {
        // card_TRANSLATE_X = (card_TRANSLATE_Y = (card_ROTATE = 0))
    }

// #CYCLES

onMount(card_set)
onDestroy(card_destroy)
</script>

<!-- #HTML -->

<button
class="card"
data-id={prop_ID}
style:transform="translate({card_TRANSLATE_X}px, {card_TRANSLATE_Y}px) rotate({card_ROTATE}deg) rotateX({card_ROTATE_X}rad) rotateY({card_ROTATE_Y}rad)"
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
    {/if}
</button>

<!-- #STYLE -->

<style
lang="scss"
>
/* #USES */

@use 'sass:math';

@use '../../assets/scss/styles/elements';
@use '../../assets/scss/styles/display';
@use '../../assets/scss/styles/size';

/* #CARD */

.card
{
    $card-ratio: math.div(333, 234);
    $size: max(16vw, 16vh);

    @extend %button-reset;

    position: absolute;

    transform-style: preserve-3d;

    aspect-ratio: 234 / 333;

    width: $size;
    height: calc($size * $card-ratio);

    transition: transform ease-out;

    .decor
    {
        $d: .3s;

        @extend %f-center;

        transform-style: preserve-3d;
        transform: rotateY(180deg) translate3d(0, 100vh, -400px);
    
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

        :global
        {
            .icon
            {
                position: absolute;

                transform: rotateY(180deg);
            
                backface-visibility: hidden;
            }
        }
    }
}
</style>