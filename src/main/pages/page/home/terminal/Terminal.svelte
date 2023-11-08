<!----------------------------------------------- #||--terminal--|| -->


<!-- #|-CONTEXT-| -->

<script
context="module"
>

// #\-IMPORTS-\

    // --SVELTE

     // --LIB

    // --JS


// #\-EXPORTS-\

    // --CONTEXTS
    export const TERMINAL_WORD_REFERENCE = 'app'


</script>


<!-- #|-HTML-| -->

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
        <Face
        prop_FOCUS={terminal_ON}
        prop_updateProcessDatas={terminal_updateProcessDatas}
        prop_turn={terminal_updateTurn}
        bind:input_fieldFocus={face_focus}
        />

        <Back
        prop_FOCUS={terminal_ON && terminal_TURN}
        prop_turn={terminal_updateTurn}
        />
    </div>
</div>


<!-- #|-SCRIPT-| -->

<script>

// #\-IMPORTS-\

    // --DATA

    // --SVELTE
    import { onMount, onDestroy, tick } from 'svelte'

    // --LIB
    import MATH from '$lib/math'

    // --CONTEXTS
    import { APP, ROUTER, EVENT, SPRING } from '../../../../../App.svelte'

//=======@COMPONENTS|

    // --*
    import Face from './Face.svelte'
    import Back from './Back.svelte'


// #\-EXPORTS-\

    // --PROPS
    export let prop_ID = void 0

    // --BINDING
    export let terminal_ON = false


// #\-CONSTANTES-\

    // --SVELTE

    // --CONTEXTS

    // --OUTSIDE

    // --THIS
    const
    TERMINAL_NAME = 'terminal'
    ,
    TERMINAL_ROTATE_Y = MATH.toRad(18)
    ,
    TERMINAL_EVENTS =
    {
        mouseDown:  terminal_e$MouseDown,
        resize:     terminal_e$Resize
    }

    // --INSIDE
    const CONTAINER_DURATION = 400


// #\-VARIABLES-\

    // --CONTEXTS

    // --OUTSIDE

    // --THIS
    let
    terminal_CHARGED = false,
    terminal_TURN    = false,
    terminal_HOVER   = false
    ,
    terminal_PROCESS_DATA

    // --INSIDE
    let
    face_focus
    ,
    face_TIMEOUT


// #\-REATIVES-\

    // --CONTEXTS

    // --OUTSIDE

    // --THIS
    $: terminal_update(terminal_ON)

    // --INSIDE


// #\-FUNCTIONS-\

//=======@LIFE|

    // --SVELTE
    onMount(terminal_set), onDestroy(terminal_destroy)

    // --SET
    function terminal_set() { terminal_CHARGED = true }

    function terminal_setEvents() { EVENT.event_add(TERMINAL_EVENTS) }

    // --GET

    // --UPDATES
    function contexts_update()
    {
        const UPDATE = { value: terminal_ON, target: prop_ID }

        APP.app_$FREEZE     = UPDATE
        ROUTER.router_$HIDE = UPDATE
    }

    function terminal_update(on)
    {
        if (!terminal_CHARGED) return

        contexts_update()

        terminal_startAndStop(on)
    }

    function terminal_updateProcessDatas(data)
    {
        terminal_ON = false // close terminal

        terminal_PROCESS_DATA = data
    }

    function terminal_updateTurn(turn) { terminal_TURN = turn }

    // --DESTROY
    function terminal_destroy()
    {
        terminal_destroyEvents()
        
        face_destroyTimeout()
    }

    function terminal_destroyEvents() { EVENT.event_remove(TERMINAL_EVENTS) }

    function face_destroyTimeout() { clearTimeout(face_TIMEOUT) }


//=======@COMMANDS|

    // --*


//=======@EVENTS|

    // --*
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

    async function terminal_e$Resize() { terminal_ON = false }


//=======@TRANSITIONS|

    // --*


//=======@ANIMATIONS|

    // --*


//=======@UTILS|

    // --*
    function terminal_startAndStop(on)
    {
        face_destroyTimeout()
    
        on ? terminal_start() : terminal_stop()
    }

    function terminal_start()
    {
        terminal_setEvents()

        if (face_focus instanceof Function) face_TIMEOUT = setTimeout(face_focus, CONTAINER_DURATION)
    }

    function terminal_stop()
    {
        terminal_destroyEvents()

        if (terminal_PROCESS_DATA) terminal_goTo() // wait for the terminal to close before executing the process data
    }

    async function terminal_goTo()
    {
        await tick() // wait for 'app freeze' to change

        terminal_PROCESS_DATA.callback(terminal_PROCESS_DATA.str, terminal_PROCESS_DATA.target)

        terminal_PROCESS_DATA = null
    }


</script>


<!-- #|-STYLE-| -->

<style
lang="scss"
>

/* #\-USES-\ */

    /* --SASS */
    @use 'sass:map';

    /* --APP */
    @use '../../../../../assets/scss/app';

    /* --DEPENDENCIES */
    @use '../../../../../assets/scss/styles/utils';
    @use '../../../../../assets/scss/styles/display';
    @use '../../../../../assets/scss/styles/font';

    /* --MEDIA */
    @use '../../../../../assets/scss/styles/media';


/* #\-VARIABLES-\ */

    /* --* */
    $r-y: var(--r-y, 18deg);

    $width: calc(100vw - app.$gap-inline * 2);

    $cell-size: var(--icon-size, 2.4rem);


/* #\-GLOBAL-\ */

    /* --* */


/* #\-THIS-\ */

.terminal
{
    --icon-size: 2.4rem;

    @include utils.placement(absolute, $right: app.$gap-inline, $bottom: 20%);

    perspective-origin: left;
    perspective: 2000px;

    overflow: visible;

    width: calc($width / var(--cos, 1));
    height: 26vh;

    .container
    {
        #{--cell-size}: calc($cell-size * .6);

        @include utils.placement(absolute, 0, 0, 0, 0);

        transform-origin: right;
        transform-style: preserve-3d;
        transform: rotateY(calc($r-y * -1)) translateX(calc(101% + app.$gap-inline));

        &, :global .face, :global .back { transition: transform var(--container-duration, .4s) ease-out; }

        :global .face, :global .back
        {
            padding: 2rem 4rem;

            background-color: $dark;
            backface-visibility: hidden;

            border: solid $light .1rem;

            box-shadow: 0 0 .4rem $light;
            box-sizing: border-box;
        }

        :global .back { width: $width; }
    }

    @include media.min($ms3)
    {
        top: 44%;
        bottom: auto;

        width: max(56vw, 56vh);
        height: min(46vw, 46vh);

        .container
        {
            #{--cell-size}: $cell-size;

            :global .back { width: 100%; }
        }
    }
    @include media.min($ms4, $ms4) { top: 33%; }
}

.terminal.focus
{
    touch-action: auto;

    &.turn
    {
        z-index: 1;

        .container
        {
            transform: rotateY(0) translateX(0);

            :global .face
            {
                transform: rotateY(-180deg);

                pointer-events: none;
            }

            :global .back { transform: rotateY(0); }
        }
    }

    .container
    {
        transform: rotateY(calc($r-y * -1)) translateX(0);

        :global .face, :global .back { pointer-events: auto; }
    }
}


</style>