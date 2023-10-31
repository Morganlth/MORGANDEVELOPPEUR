<!-- #MAP

-APP
-ROUTER
-EVENT
-SPRING
    TERMINAL
        CONTAINER
            TERMINALBACK
            TERMINALFACE

-->

<!-- #SCRIPT -->

<script
context="module"
>
// #EXPORTS

    // --ELEMENT-TERMINAL
    export const TERMINAL_WORD_REFERENCE = 'app'
</script>

<script>
// #EXPORTS

    // --PROPS

    // --BINDS
    export let terminal_ON = false

// #IMPORTS

    // --JS
    import MATH from '../../../assets/js/utils/math'

    // --LIB

    // --CONTEXTS
    import { APP, ROUTER, EVENT, SPRING } from '../../../App.svelte';

    // --SVELTE
    import { onDestroy } from 'svelte'

    // --COMPONENT-ELEMENT
    import TerminalBack from './TerminalBack.svelte'
    import TerminalFace from './TerminalFace.svelte'

// #CONSTANTES

    // --ELEMENT-TERMINAL
    const
    TERMINAL_NAME = 'terminal'
,
    TERMINAL_ROTATE_Y = MATH.toRad(18)
,
    TERMINAL_EVENTS = { mouseDown: terminal_e$MouseDown }

    // --ELEMENT-CONTAINER
    const CONTAINER_DURATION = 400

// #VARIABLES

    // --ELEMENT-TERMINAL
    let
    terminal_TURN = false,
    terminal_HOVER = false

    // --ELEMENT-TERMINALFACE
    let
    terminalface_focus
,
    terminalface_TIMEOUT

// #REACTIVES

    // --ELEMENT-TERMINAL
    $: terminal_update(terminal_ON)

// #FUNCTIONS

    // --SET
    function terminal_setEvents() { EVENT.event_add(TERMINAL_EVENTS) }

    // --GET

    // --UPDATES
    function contexts_update()
    {
        const UPDATE = { value: terminal_ON, target: null }

        APP.app_$FREEZE = UPDATE
        ROUTER.router_$HIDE = UPDATE
    }

    function terminal_update(on)
    {
        terminalface_clear()

        if (on)
        {
            terminal_setEvents()

            if (terminalface_focus instanceof Function) terminalface_TIMEOUT = setTimeout(terminalface_focus, CONTAINER_DURATION)
        }
        else terminal_destroyEvents()

        contexts_update()
    }

    function terminal_updateTurn(turn) { terminal_TURN = turn }

    // --CLEAR
    function terminalface_clear() { clearTimeout(terminalface_TIMEOUT) }

    // --DESTROY
    function terminal_destroy()
    {
        terminal_destroyEvents()
        
        terminalface_clear()
    }

    function terminal_destroyEvents() { EVENT.event_remove(TERMINAL_EVENTS) }

// !===============IN-OUT===============!

    // --INTROS

    // --OUTROS

// !===============CONTEXT==============!

    // --COMMANDS

    // --EVENTS
    function terminal_eMouseEnter()
    {
        SPRING.spring_e$Hide()

        terminal_HOVER = true
    }

    function terminal_eMouseLeave()
    {
        SPRING.spring_e$Show()

        terminal_HOVER = false
    }

    async function terminal_e$MouseDown({target})
    {
        if (!terminal_HOVER && target.dataset.tag !== TERMINAL_NAME)
        {
            terminal_ON = false

            terminal_update(false)
        }
    }

// !===============T-A==================!

    // --TRANSITIONS

    // --ANIMATIONS

// !===============CONTROL==============!

    // --START

    // --END

// !===============TEST=================!

    // --TESTS

// !===============CANVAS===============!

    // --DRAW

// !===============UTILS================!

    // --UTILS
    async function terminal_goTo(datas)
    {
        terminal_ON = false

        datas.callback(datas.str, datas.target)
    }

// #LIFECYCLES

onDestroy(terminal_destroy)
</script>

<!-- #HTML -->

<!-- svelte-ignore a11y-no-static-element-interactions -->
<div
class="terminal"
class:focus={terminal_ON}
class:turn={terminal_TURN}
style:--r-y="{TERMINAL_ROTATE_Y}rad"
style:--cos={Math.cos(TERMINAL_ROTATE_Y)}
on:mouseenter={terminal_eMouseEnter}
on:mouseleave={terminal_eMouseLeave}
>
    <div
    class="container"
    style:--container-duration="{CONTAINER_DURATION}ms"
    >
        <TerminalBack
        prop_FOCUS={terminal_ON && terminal_TURN}
        prop_turn={terminal_updateTurn}
        />
        
        <TerminalFace
        prop_FOCUS={terminal_ON}
        prop_goTo={terminal_goTo}
        prop_turn={terminal_updateTurn}
        bind:input_fieldFocus={terminalface_focus}
        />
    </div>
</div>

<!-- #STYLE -->

<style
lang="scss"
>
/* #USES */

@use 'sass:map';

@use '../../../assets/scss/app';

@use '../../../assets/scss/styles/elements';
@use '../../../assets/scss/styles/utils';
@use '../../../assets/scss/styles/position';
@use '../../../assets/scss/styles/display';
@use '../../../assets/scss/styles/size';
@use '../../../assets/scss/styles/font';
@use '../../../assets/scss/styles/media';

/* #TERMINAL */

.terminal
{
    $r-y: var(--r-y, 18deg);

    $cell-size: var(--icon-size, 2.4rem);

    @include position.placement(absolute, $right: app.$gap-inline, $bottom: 20%);

    perspective-origin: left;
    perspective: 2000px;

    overflow: visible;

    width: calc((100vw - app.$gap-inline * 2) / var(--cos, 1));
    height: 26vh;

    &.focus
    {
        &.turn
        {
            z-index: 1;

            .container
            {
                transform: rotateY(0) translateX(0);

                :global .terminalback { transform: rotateY(0); }

                :global .terminalface
                {
                    transform: rotateY(-180deg);

                    pointer-events: none;
                }
            }
        }

        .container
        {
            transform: rotateY(calc($r-y * -1)) translateX(0);

            pointer-events: auto;
        }
    }

    .container
    {
        #{--cell-size}: calc($cell-size * .6);

        @include position.placement(absolute, 0, 0, 0, 0);

        transform-origin: right;
        transform-style: preserve-3d;
        transform: rotateY(calc($r-y * -1)) translateX(calc(101% + app.$gap-inline));

        &, :global .terminalback, :global .terminalface
        {
            @extend %any;

            transition: transform var(--container-duration, .4s) ease-out;
        }

        :global .terminalback, :global .terminalface
        {
            padding: 2rem 4rem;

            background-color: $dark;
            backface-visibility: hidden;

            border: solid $light .1rem;

            box-shadow: 0 0 .4rem $light;
            box-sizing: border-box;
        }
    }

    @include media.min($ms3)
    {
        top: 44%;
        bottom: auto;

        width: 56vw;
        height: 46vh;

        .container { #{--cell-size}: $cell-size; }
    }
    @include media.min($ms4, $ms4) { top: 33%; }
}
</style>