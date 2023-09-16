<!-- #MAP

-APP
-COMMAND
-EVENT
-SPRING
    CONSOLE
        INPUT
            LINE
                MIRROR
            BTN
        OUTPUT
            LINE * n

-->

<!-- #SCRIPT -->

<script>
// #IMPORT

    // --JS
    import { CommandError, CommandSuccess } from '../../assets/js/managers/mCommand'

    // --LIB
    import COLORS from '$lib/colors'

    // --CONTEXTS
    import { APP, COMMAND, EVENT, SPRING } from '../../App.svelte'

    // --SVELTE
    import { onMount, onDestroy, tick } from 'svelte'

    // --COMPONENT-COVER
    import Icon from '../covers/Icon.svelte'

    // --COMPONENT-ICON
    import Arrow from '../icons/Arrow.svelte'

// #CONSTANTES

    // --ELEMENT-CONSOLE
    const
    CONSOLE_HISTORY = ['app '],
    CONSOLE_EVENTS = { mouseDown: console_e$MouseDown }

    // --ELEMENT-INPUT
    const INPUT_EVENTS = { resize: input_e$Resize }

    // --ELEMENT-MIRROR
    const MIRROR_FIELDS = []

// #VARIABLES

    // --ELEMENT-CONSOLE
    let
    console_ON = false,
    console_FOCUS = false,
    console_INDEX = 0

    // --ELEMENT-INPUT
    let
    input_FIELD,
    input_CURRENT_VALUE = '',
    input_CHAR_WIDTH = 0

    // --ELEMENT-MIRROR
    let
    mirror_APP_AVAILABLE = false,
    mirror_COMMAND_AVAILABLE = false

    // --ELEMENT-OUTPUT
    let
    output,
    output_LINES = []

// #FUNCTIONS

    // --SET
    function console_set()
    {
        console_setCommands()

        input_setVars()
        input_setEvents()
    }

    function console_setCommands()
    {
        COMMAND.command_add('log', console_c$Log)
        COMMAND.command_add('clear', console_c$Clear)
    }

    function console_setEvents() { EVENT.event_add(CONSOLE_EVENTS) }

    function input_setEvents() { EVENT.event_add(INPUT_EVENTS) }

    function input_setVars()
    {
        input_CHAR_WIDTH = parseFloat(window.getComputedStyle(input_FIELD).getPropertyValue('font-size')) * .55

        console.log(Math.floor(input_FIELD.offsetWidth / input_CHAR_WIDTH)) // prend en compte le padding left !! => calculer nombre de caractère possible
    }

    // --DESTROY
    function console_destroy()
    {
        console_destroyEvents()

        input_destroyEvents()
    }

    function console_destroyEvents() { EVENT.event_remove(CONSOLE_EVENTS) }

    function input_destroyEvents() { EVENT.event_remove(INPUT_EVENTS) }

    // --RESET
    function input_reset()
    {
        input_CURRENT_VALUE = '' // before update
    
        mirror_update()
    }

    // --RESTORE
    function console_restore()
    {
        console_testRange()

        input_CURRENT_VALUE = CONSOLE_HISTORY[console_INDEX]

        input_fieldFocus()
        input_eInput()
    }

    // --UPDATES
    function console_updateHistory()
    {
        const
        VALUE = input_CURRENT_VALUE.trim(),
        INDEX = CONSOLE_HISTORY.indexOf(VALUE)

        if (~INDEX) CONSOLE_HISTORY.splice(INDEX, 1)
    
        CONSOLE_HISTORY.push(VALUE)

        console_INDEX = CONSOLE_HISTORY.length
    }

    function mirror_update(status = false, values = [input_CURRENT_VALUE])
    {
        mirror_APP_AVAILABLE = status

        for (let i = 0; i < MIRROR_FIELDS.length; i++) MIRROR_FIELDS[i].innerText = values[i] ?? ''
    }

    function mirror_updateCommand(command) { mirror_COMMAND_AVAILABLE = COMMAND.command_KEYWORDS.includes(command.trim()) }

    async function output_update()
    {
        await tick()

        if (output) output.scrollTop = output.scrollHeight - output.offsetHeight
    }

    // --COMMANDS
    function console_c$Log(msg)
    {
        const
        [ERROR, SUCCESS] = [msg instanceof Error, msg instanceof CommandSuccess],
        [NAME, MESSAGE] = ERROR || SUCCESS ? [msg.name, msg.message.trim()] : [void 0, msg.trim()]

        output_LINES = [...output_LINES, { error: ERROR, success: SUCCESS, name: NAME, message: MESSAGE }] // svelte update array

        output_update()
    }

    function console_c$Clear() { output_LINES = [] }

    // --EVENTS
    async function console_e$MouseDown() { if (!console_FOCUS) btn_eClick() }

    function console_eMouseEnter()
    {
        SPRING.spring_e$Hide()

        console_FOCUS = true
    }

    function console_eMouseLeave()
    {
        SPRING.spring_e$Show()

        console_FOCUS = false
    }

    async function input_e$Resize() { input_setVars() }

    async function input_eKeyup(e)
    {
        switch (e.key)
        {
            case 'Enter':
                if (mirror_APP_AVAILABLE) console_execute()
                break
            case 'ArrowUp':
                console_INDEX--
                console_restore()
                break
            case 'ArrowDown':
                console_INDEX++
                console_restore()
                break
            default: break
        }
    }

    function input_eInput() // no async
    {
        (input_CURRENT_VALUE.length === 3 || input_CURRENT_VALUE[3] === ' ') && input_CURRENT_VALUE.substring(0, 3).toLowerCase() === 'app'
        ? input_analyse()
        : mirror_update()
    }

    async function btn_eClick()
    {
        console_ON = !console_ON

        if (console_ON)
        {
            console_setEvents()

            input_fieldFocus()
        }
        else console_destroyEvents()

        APP.app_$FREEZE = { on: console_ON, target: 'console' }
    }

    // --TEST
    function console_testRange()
    {
        if (console_INDEX < 0) console_INDEX = 0
        else if (console_INDEX >= CONSOLE_HISTORY.length) console_INDEX = CONSOLE_HISTORY.length - 1
    }

    // --UTILS
    function input_fieldFocus()
    {
        const LENGTH = input_CURRENT_VALUE.length

        input_FIELD.focus()
        input_FIELD.setSelectionRange(LENGTH, LENGTH)
    }

    function input_analyse()
    {
        const VALUES = input_CURRENT_VALUE.match(/^(app)(\s+\S*)?(\s.*)?$/i)

        VALUES.shift()

        if (VALUES[1]) mirror_updateCommand(VALUES[1])

        mirror_update(true, VALUES)
    }

    function console_execute()
    {
        const [NAME, PARAMS] = [MIRROR_FIELDS[1].innerText.trim(), MIRROR_FIELDS[2].innerText.trim().split(',')]

        console_updateHistory()

        try
        {
            COMMAND.command_COMMANDS[NAME](...PARAMS)
            
            input_reset()
        } catch (e) { console_error(e, NAME) }
    }

    function console_error(e, command)
    {
        const ERROR = e instanceof CommandError
        ? e
        : new CommandError(
            ...(COMMAND.command_KEYWORDS.includes(command)
            ? ['Error', 'une erreur est survenue :/']
            : ['TypeError', `"${command}" n'est pas une commande`])
        )

        console_c$Log(ERROR)
    }

// #CYCLES

onMount(console_set)
onDestroy(console_destroy)
</script>
<!-- #HTML -->

<!-- svelte-ignore a11y-no-static-element-interactions -->
<div
class="console"
class:on={console_ON}
on:mouseenter={console_eMouseEnter}
on:mouseleave={console_eMouseLeave}
>
    <div
    class="input"
    >
        <div
        class="line"
        >
            <input
            type="text"
            maxlength="55"
            spellcheck="false"
            bind:this={input_FIELD}
            bind:value={input_CURRENT_VALUE}
            on:input={input_eInput}
            on:keyup|preventDefault={input_eKeyup}
            />

            <div
            class="mirror"
            class:app-available={mirror_APP_AVAILABLE}
            class:command-available={mirror_COMMAND_AVAILABLE}
            >
                {#each [0, 1, 2] as i}
                    <pre
                    bind:this={MIRROR_FIELDS[i]}
                    ></pre>
                {/each}
            </div>
        </div>

        <button
        class="btn"
        type="button"
        on:click={btn_eClick}
        >
            <Icon
            prop_COLOR={COLORS.light}
            >
                <Arrow
                prop_FOCUS={console_ON}
                />
            </Icon>
        </button>
    </div>

    <div
    class="output"
    bind:this={output}
    >
        {#each output_LINES as line}
            <div
            class="line"
            >
                {#if line.name}
                    <span
                    class:console-error={line.error}
                    class:console-success={line.success}
                    >
                        {line.name}:
                    </span> &nbsp;
                {/if}

                <pre>{line.message}</pre>
            </div>
        {/each}
    </div>
</div>

<!-- #STYLE -->

<style
lang="scss"
>
/* #USES */

@use '../../assets/scss/app';

@use '../../assets/scss/styles/utils';
@use '../../assets/scss/styles/elements';
@use '../../assets/scss/styles/position';
@use '../../assets/scss/styles/display';
@use '../../assets/scss/styles/size';
@use '../../assets/scss/styles/font';
@use '../../assets/scss/styles/media';

/* #VARIABLES */

$gap: 2rem; /* gap flex console */
$gap-block: 7rem;

$line-height: 5rem;

$btn-width: 1.5rem;

$total-width: calc(app.$gap-inline + 35vw + ($btn-width + $gap));
$total-height: calc(100vh - $gap-block * 2);

$input-border: .3rem;
$input-height: $line-height + $input-border * 2;

$output-margin-top: 1rem;
$output-max-height: calc($total-height - ($input-height + $output-margin-top));

/* #CONSOLE */

.console
{
    @include position.placement(absolute, $gap-block, app.$gap-inline, $gap-block);

    z-index: 1;

    width: calc(100% - app.$gap-inline * 2);
    height: fit-content;
    max-height: $total-height;

    pointer-events: none;

    &.on
    {
        pointer-events: auto;

        .input .line, .output { opacity: 1; }

        .input .line { transform: translateX(0) scaleX(1); }

        .output { transform: translateY(0) scaleY(1); }
    }

    .input .line, .output
    {
        opacity: 0;

        transition: transform .4s ease, opacity .4s;
    }

    .input
    {
        @extend %f-a-center;

        gap: $gap;

        width: 100%;
        height: $input-height;

        .line
        {
            &, input { padding-left: app.$gap-inline; }
        
            position: relative;

            flex: 1;

            transform: translateX(50%) scaleX(0);

            background-color: $dark;

            border: solid $intermediate $input-border;
        }

        input, .mirror, .btn { @extend %f-a-center; }
        input, .mirror { @extend %any; }
        input
        {
            @include position.placement(absolute, 0, 0, 0);

            @extend %input-reset;

            color: transparent;
    
            caret-color: $primary;

            box-sizing: border-box;

            &::selection
            {
                background-color: rgba($primary, .5);

                color: transparent;
            }
        }
        .mirror 
        {
            pointer-events: none;

            color: $light;
    
            &.app-available>pre:nth-child(1) { color: $primary; }
            &.command-available>pre:nth-child(2) { color: $indicator; }
        }

        .btn
        {
            #{--icon-size}: $btn-width;
    
            @extend %button-reset;
        
            justify-content: flex-end;
            flex-shrink: 0;

            width: $btn-width;
            height: $line-height;

            pointer-events: auto;
        }
    }

    .output
    {
        @extend %scroll-bar;
        @extend %f-column;

        align-items: flex-end;

        transform: translateY(-50%) scaleY(0);

        overflow: auto scroll;

        width: 100%;
        height: fit-content;
        max-height: $output-max-height;

        margin-top: $output-margin-top;
        padding-right: app.$gap-inline;

        backdrop-filter: hue-rotate(30deg);

        box-sizing: border-box;

        .line
        {
            @extend %f-a-center;

            justify-content: flex-end;

            user-select: auto;
    
            .console-error { color: $indicator; }
            .console-success { color: $primary; }

            pre { color: $light; }
        }
    }

    .line
    {
        @include font.interact;
    
        width: fit-content;
        height: $line-height;
        min-height: $line-height;
        max-height: $line-height;

        * { font: inherit;  }
    }

    @include media.min($ms3) { width: $total-width; }
}
</style>