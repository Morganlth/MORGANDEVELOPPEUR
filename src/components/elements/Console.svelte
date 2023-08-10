<!-- #SCRIPT -->

<script>
// #IMPORT

    // --JS
    import AppError from '../../assets/js/class/error'
    import AppSuccess from '../../assets/js/class/success'

    // --LIB
    import { COLORS } from '$lib/app'

    // --CONTEXTS
    import { APP, SPRING } from '../../App.svelte'

    // --SVELTE
    import { onMount, tick } from 'svelte'

    // --COMPONENT-COVER
    import Icon from '../covers/Icon.svelte'

// #CONSTANTES

    // --ELEMENT-CONSOLE
    const CONSOLE_HISTORY = ['app']

    // --ELEMENT-MIRROR
    const MIRROR_ITEMS = []

// #VARIABLES

    // --ELEMENT-CONSOLE
    let
    console_ON = false,
    console_INPUT,
    console_CURRENTVALUE = '',
    console_OUTPUT_LINES = [],
    console_INDEX = 0

    // --ELEMENT-MIRROR
    let
    mirror_APP = false,
    mirror_COMMAND = false

    // --ELEMENT-OUTPUT
    let output

// #FUNCTIONS

    // --SET
    function console_set() { console_setCommand() }

    function console_setCommand()
    {
        APP.app_add('log', console_log)
        APP.app_add('clear', console_clear)
    }

    // --RESET
    function console_reset()
    {
        console_update(false)
        console_CURRENTVALUE = ''

        tick().then(() => output.scrollTop = output.scrollHeight - output.offsetHeight)
    }

    // --RESTORE
    function console_restore()
    {
        console_testRange()
        console_write(CONSOLE_HISTORY[console_INDEX])
    }

    // --UPDATES
    function console_update(status, values = [])
    {
        mirror_APP = status

        for (let i = 0; i < MIRROR_ITEMS.length; i++) MIRROR_ITEMS[i].innerText = values[i] ?? ''
    }

    function console_updateCommand(command) { mirror_COMMAND = APP.app_KEYWORDS.includes(command.trim()) }

    function console_updateHistory()
    {
        const
        VALUE = console_CURRENTVALUE.trim(),
        INDEX = CONSOLE_HISTORY.indexOf(VALUE)

        if (INDEX !== -1) CONSOLE_HISTORY.splice(INDEX, 1)
    
        CONSOLE_HISTORY.push(VALUE)

        console_INDEX = CONSOLE_HISTORY.length
    }

    // --COMMANDS
    function console_log(msg)
    {
        const
        [ERROR, SUCCESS] = [msg instanceof Error, msg instanceof AppSuccess],
        [NAME, MESSAGE] = ERROR || SUCCESS ? [msg.name, msg.message.trim()] : [void 0, msg.trim()]

        console_OUTPUT_LINES = [...console_OUTPUT_LINES, { error: ERROR, success: SUCCESS, name: NAME, message: MESSAGE }]
    }

    function console_clear() { console_OUTPUT_LINES = [] }

    // --EVENTS
    async function console_click()
    {
        console_ON = !console_ON

        if (console_ON) console_focus(console_CURRENTVALUE)
    }

    function console_input()
    {
        (console_CURRENTVALUE.length === 3 || console_CURRENTVALUE[3] === ' ') && console_CURRENTVALUE.substring(0, 3) === 'app'
        ? console_analyse()
        : console_update(false, [console_CURRENTVALUE])
    }

    function console_keyup(e)
    {
        switch (e.key)
        {
            case 'Enter':
                if (MIRROR_ITEMS[0].innerText === 'app') console_execute()
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

    // --TEST
    function console_testRange()
    {
        if (console_INDEX < 0) console_INDEX = 0
        else if (console_INDEX >= CONSOLE_HISTORY.length) console_INDEX = CONSOLE_HISTORY.length - 1
    }

    // --UTILS
    function console_write(value)
    {
        console_CURRENTVALUE = value

        console_focus(value)
        console_input()
    }

    function console_focus(value)
    {
        const LENGTH = value.length

        console_INPUT.focus()
        console_INPUT.setSelectionRange(LENGTH, LENGTH)
    }

    function console_analyse()
    {
        const VALUES = console_CURRENTVALUE.match(/^(app)(\s+\S*)?(\s.*)?$/)

        VALUES.shift()

        if (VALUES[1]) console_updateCommand(VALUES[1])

        console_update(true, VALUES)
    }

    function console_execute()
    {
        const
        COMMAND = MIRROR_ITEMS[1].innerText.trim(),
        PARAMS = MIRROR_ITEMS[2].innerText.trim().split(',')

        console_updateHistory()

        try { APP.app_COMMANDS[COMMAND](...PARAMS), console_reset() } catch (e) { console_error(e, COMMAND) }
    }

    function console_error(e, command)
    {
        const ERROR = e instanceof AppError
        ? e
        : new AppError(
            ...(APP.app_KEYWORDS.includes(command)
            ? ['Error', 'une erreur est survenue :/']
            : ['TypeError', `"${command}" n'est pas une commande`])
        )

        console_log(ERROR)
    }

// #CYCLE

onMount(console_set)
</script>
<!-- #HTML -->

<!-- svelte-ignore a11y-no-static-element-interactions -->
<div
class="console"
class:on={console_ON}
on:mouseenter={SPRING.spring_mouseEnter.bind(SPRING)}
on:mouseleave={SPRING.spring_mouseLeave.bind(SPRING)}
>
    <div
    class="input"
    >
        <button
        type="button"
        on:click={console_click}
        >
            <Icon
            prop_SIZE="1.2rem"
            prop_COLOR={COLORS.primary}
            prop_SPRING={false}
            >
                <svg
                class:reverse={console_ON}
                viewBox="0 0 43 66"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                    d="M38 5L5 33L38 61"
                    stroke="var(--icon-color)"
                    stroke-width="9"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    />
                </svg>
            </Icon>
        </button>

        <div
        class="line"
        >
            <input
            type="text"
            maxlength="55"
            spellcheck="false"
            bind:this={console_INPUT}
            bind:value={console_CURRENTVALUE}
            on:input={console_input}
            on:keyup|preventDefault={console_keyup}
            />

            <div
            class="mirror"
            class:app-available={mirror_APP}
            class:command-available={mirror_COMMAND}
            >
                {#each [0, 1, 2] as i}
                    <pre
                    bind:this={MIRROR_ITEMS[i]}
                    >
                    </pre>
                {/each}
            </div>
        </div>
    </div>

    <div
    class="output"
    bind:this={output}
    >
        {#each console_OUTPUT_LINES as line}
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

    display: flex;
    flex-direction: column-reverse;

    transform: translateX(calc(100% - $btn-width));

    overflow: hidden;

    width: 100%;
    height: fit-content;

    pointer-events: none;

    transition: transform .3s ease;

    &.on
    {
        transform: translateX(0);

        .input { border-color: rgba($light, .3); }
    }


    &>*
    {
        height: fit-content;

        pointer-events: auto;

        .line
        {
            height: $line-height;
            min-height: $line-height;
            max-height: $line-height;

            &>* { @include font.interact(var(--line-color)); }
        }
    }
}

.input
{
    @include utils.solid-border($intermediate, 7px, true, false);

    @extend %f-a-center;

    width: 100%;

    background-color: $dark;

    box-sizing: border-box;

    transition: border-color .5s;

    &>button
    {
        @extend %button-reset;
        @extend %f-center;

        flex-shrink: 0;

        width: $btn-width;
        height: $line-height;

        padding-right: 1rem;

        box-sizing: border-box;

        svg.reverse { transform: scaleX(-1); }
    }

    .line
    {
        position: relative;

        width: calc(100% - $btn-width);

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

    align-items: flex-end;
    align-self: flex-end;

    overflow: auto;

    width: fit-content;
    max-width: 100%;
    min-height: 0;
    max-height: calc(100vh - ($gap-block * 2 + $line-height));

    padding-right: app.$gap-inline;

    box-sizing: border-box;

    &::-webkit-scrollbar
    {
        width: 10px;

        background-color: $dark;

        pointer-events: auto;
    }
    &::-webkit-scrollbar-thumb
    {
        background-color: $primary;

        pointer-events: auto;
    }

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

@include media.min($ms3)
{
    .console { width: fit-content; }
    .input { width: $line-width; }
    .output { max-width: $line-width; }
}
</style>