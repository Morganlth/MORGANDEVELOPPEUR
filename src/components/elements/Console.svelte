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

        APP.app_$FREEZE = console_ON
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
on:mouseenter={SPRING.spring_e$Hide.bind(SPRING)}
on:mouseleave={SPRING.spring_e$Show.bind(SPRING)}
>
    <div
    class="input"
    >
        <button
        class={CONSOLE_TARGET_CLASS}
        type="button"
        on:click={console_eClick}
        >
            <Icon
            prop_SIZE="1.2rem"
            prop_COLOR={COLORS[console_ON ? 'light' : 'primary']}
            prop_SPRING={false}
            >
                <Arrow
                prop_FOCUS={console_ON}
                />
            </Icon>
        </button>

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
                    >
                    </pre>
                {/each}
            </div>
        </div>
    </div>

    <div
    class="output {CONSOLE_TARGET_CLASS}"
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

$gap-block: max(12rem, 50px);
$btn-width: 10rem;
$line-width: 35vw;
$line-height: 8rem;

/* #CONSOLE */

.console
{
    @include position.placement(fixed, auto, 0, $gap-block);

    z-index: 1;

    display: flex;
    flex-direction: column-reverse;

    transform: translateX(calc(100% - $btn-width - utils.$scroll-bar-width));

    overflow: hidden;

    width: 100%;
    height: fit-content;

    pointer-events: none;

    transition: transform .3s ease;

    animation: aTranslateX .4s ease-in-out;

    &.on
    {
        transform: translateX(0);

        .output { opacity: 1; }

        .input { border-bottom-color: rgba($light, .3); }
    }

    &>*
    {
        height: fit-content;

        .line
        {
            height: $line-height;
            min-height: $line-height;
            max-height: $line-height;

            &>* { @include font.interact(var(--line-color)); }
        }
    }

    & .console-target { pointer-events: auto; }

    .input
    {
        @extend %f-a-center;

        gap: utils.$scroll-bar-width;

        width: 100%;

        border-bottom: solid $intermediate 1px;

        box-sizing: border-box;

        transition: border .4s;

        &>button
        {
            @extend %button-reset;
            @extend %f-center;

            flex-shrink: 0;

            width: $btn-width;
            height: $line-height;
        }

        .line
        {
            position: relative;

            width: calc(100% - $btn-width);

            backdrop-filter: hue-rotate(180deg);

            input, .mirror { @extend %any; }
            input
            {
                --line-color: transparent;
        
                @include position.placement(absolute, auto, 0, 0, 0);

                @extend %input-reset;
        
                caret-color: $primary;

                &::selection
                {
                    background-color: rgba($primary, .5);

                    color: transparent;
                }
            }
            .mirror 
            {
                #{--line-color}: $light;

                @extend %f-a-center;
        
                &.app-available>pre:nth-child(1) { color: $primary; }
                &.command-available>pre:nth-child(2) { color: $indicator; }
            }
        }
    }

    .output
    {
        @extend %f-column;
        @extend %scroll-bar;

        align-items: flex-end;
        align-self: flex-end;

        overflow: auto;

        opacity: 0;

        width: fit-content;
        max-width: 100%;
        min-height: 0;
        max-height: calc(100vh - ($gap-block * 2 + $line-height));

        padding-right: app.$gap-inline;

        box-sizing: border-box;

        transition: opacity .4s;

        .line
        {
            @extend %f-a-center;

            justify-content: flex-end;

            pointer-events: none;

            .console-error { #{--line-color}: $indicator; }
            .console-success { #{--line-color}: $primary; }

            pre { #{--line-color}: $light; }
        }
    }

    @keyframes aTranslateX { from { transform: translateX(100%); } }

    @include media.min($ms3)
    {
        width: fit-content;

        .input { width: $line-width; }
        .output { max-width: $line-width; }
    }
}
</style>