<!-- #MAP

-APP
-COMMAND
-EVENT
-SPRING
    CONSOLE
        INPUT
            \ LINE
                MIRROR
        OUTPUT
            \ LINE

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
    CONSOLE_TARGET_CLASS = 'console-target',
    CONSOLE_HISTORY = ['app '],
    CONSOLE_EVENTS = { mouseDown: console_e$MouseDown }

    // --ELEMENT-MIRROR
    const MIRROR_FIELDS = []

// #VARIABLES

    // --ELEMENT-CONSOLE
    let
    console_ON = false,
    console_INDEX = 0

    // --ELEMENT-INPUT
    let
    input_FIELD,
    input_CURRENT_VALUE = ''

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
    function console_set() { console_setCommands() }

    function console_setCommands()
    {
        COMMAND.command_add('log', console_c$Log)
        COMMAND.command_add('clear', console_c$Clear)
    }

    function console_setEvents() { EVENT.event_add(CONSOLE_EVENTS) }

    // --DESTROY
    function console_destroy() { console_destroyEvents() }

    function console_destroyEvents() { EVENT.event_remove(CONSOLE_EVENTS) }

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
    async function console_e$MouseDown(e) { if (!e.target.classList.contains(CONSOLE_TARGET_CLASS)) console_eClick() }

    async function console_eClick()
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

    async function console_eKeyup(e)
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
>
    <div
    class="area"
    >
        <div
        class="input"
        on:mouseenter={SPRING.spring_e$Hide.bind(SPRING)}
        on:mouseleave={SPRING.spring_e$Show.bind(SPRING)}
        >
            <div
            class="line"
            >
                <input
                class={CONSOLE_TARGET_CLASS}
                type="text"
                maxlength="55"
                spellcheck="false"
                bind:this={input_FIELD}
                bind:value={input_CURRENT_VALUE}
                on:input={input_eInput}
                on:keyup|preventDefault={console_eKeyup}
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

    <button
    class={CONSOLE_TARGET_CLASS}
    type="button"
    on:click={console_eClick}
    >
        <Icon
        prop_CLASS={CONSOLE_TARGET_CLASS}
        prop_SIZE="1.5rem"
        prop_COLOR={COLORS.light}
        >
            <Arrow
            prop_FOCUS={console_ON}
            />
        </Icon>
    </button>
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

$line-width: 35vw;
$line-height: 5rem;

$btn-width: 5rem;

$total-width: calc(app.$gap-inline + $line-width + $btn-width);

$area-width: calc(app.$gap-inline + $line-width);

/* #CONSOLE */

.console
{
    $gap-block: 7rem;

    @include position.placement(absolute, $gap-block, app.$gap-inline, $gap-block);

    z-index: 1;

    display: flex;

    width: calc(100% - app.$gap-inline * 2);
    height: calc(100% - $gap-block * 2);

    pointer-events: none;

    &.on .area
    {
        transform: translateX(0) scaleX(1);

        opacity: 1;
    }

    .area
    {
        transform: translateX(50%) scaleX(0);

        opacity: 0;
        
        width: $area-width;
        height: 100%;

        transition: transform .4s ease, opacity .4s;
    }

    &>button
    {
        @extend %button-reset;
        @extend %f-a-center;
    
        justify-content: flex-end;
        flex-shrink: 0;

        width: $btn-width;
        height: $line-height;
    }

    .input
    {
        width: 100%;
        height: fit-content;

        padding-left: app.$gap-inline;

        background-color: $dark;

        border: solid $primary 3px;

        text-align: right;

        box-sizing: border-box;

        .line { position: relative; }

        input, .mirror { @extend %any; }
        input
        {
            @include position.placement(absolute, 0, 0, 0);

            @extend %input-reset;

            color: transparent;
    
            caret-color: $primary;

            &::selection
            {
                background-color: rgba($primary, .5);

                color: transparent;
            }
        }
        .mirror 
        {
            @extend %f-a-center;

            color: $light;
    
            &.app-available>pre:nth-child(1) { color: $primary; }
            &.command-available>pre:nth-child(2) { color: $indicator; }
        }
    }

    .output
    {
        $margin-top: 1rem;
    
        @extend %scroll-bar;
        @extend %f-column;

        overflow: auto scroll;

        width: 100%;
        height: fit-content;
        max-height: calc(100% - $line-height - $margin-top);

        margin-top: $margin-top;

        backdrop-filter: hue-rotate(30deg);

        .line
        {
            @extend %f-a-center;

            justify-content: flex-end;

            .console-error { color: $indicator; }
            .console-success { color: $primary; }

            pre { color: $light; }
        }
    }

    .line
    {
        @include font.interact;
    
        width: $line-width;
        height: $line-height;
        min-height: $line-height;
        max-height: $line-height;

        * { font: inherit;  }
    }

    .console-target { pointer-events: auto; }

    @include media.min($ms3) { width: $total-width; }
}
</style>