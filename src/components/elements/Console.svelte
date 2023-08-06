<!-- #SCRIPT -->

<script>
// #IMPORT

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
    const
    CONSOLE_LINES = [],
    CONSOLE_HISTORY = ['app']

    // --ELEMENT-MIRROR
    const MIRROR_ITEMS = []

// #VARIABLES

    // --ELEMENT-CONSOLE
    let
    console,
    console_ON = false,
    console_INPUT,
    console_CURRENTVALUE,
    console_INDEX = 0

    // --ELEMENT-MIRROR
    let
    mirror_APP = false,
    mirror_COMMAND = false

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

        tick().then(() => console.scrollTop = console.scrollHeight - console.offsetHeight)
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

    // --COMMANDS
    function console_log(msg)
    {
        const
        TYPE = msg instanceof Error ? msg instanceof AppSuccess ? 'success' : 'error' : null,
        MESSAGE = TYPE ? { name: msg.name, message: msg.message.trim() } : msg.trim()

        CONSOLE_LINES.push({ type: TYPE, msg: MESSAGE })
    }

    function console_clear() { CONSOLE_LINES.length = 0 }

    // --EVENTS
    async function console_click()
    {
        console_ON = !console_ON

        if (console_ON) console_focus('')
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

        CONSOLE_HISTORY.push(console_CURRENTVALUE)
        console_INDEX = CONSOLE_HISTORY.length

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
bind:this={console}
on:mouseenter={SPRING.spring_mouseEnter.bind(SPRING)}
on:mouseleave={SPRING.spring_mouseLeave.bind(SPRING)}
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
    class="command-line"
    >
        <input
        type="text"
        maxlength="59"
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

<!-- #STYLE -->

<style
lang="scss"
>
/* #USES */

@use '../../assets/scss/app';

@use '../../assets/scss/styles/elements';
@use '../../assets/scss/styles/position';
@use '../../assets/scss/styles/display';
@use '../../assets/scss/styles/size';
@use '../../assets/scss/styles/font';

/* #VARIABLES */

$size: 7rem;
$width: 30vw;

/* #CONSOLE */

.console
{
    @include position.placement(fixed, auto, $width * -1, 7rem);

    @extend %f-a-center;

    overflow-y: auto;

    width: fit-content;
    min-height: $size;
    max-height: calc(100vh - $size * 2);

    padding-block: .8rem;

    background-color: $dark;

    box-sizing: border-box;

    transition: transform .6s ease-in-out;

    &.on { transform: translateX($width * -1); }

    &>button
    {
        @extend %button-reset;
        @extend %f-center;

        width: $size;
        height: 100%;

        svg
        {
            &.reverse
            {
                animation: reverse .3s .4s ease-in forwards;

                @keyframes reverse { 100% { transform: scaleX(-1); } }
            }
        }
    }

    .command-line
    {
        position: relative;

        width: $width;

        input, .mirror { @extend %any; }
        input
        {
            @include position.placement(absolute, auto, 0, 0, 0);
            @include font.interact(transparent);

            @extend %input-reset;

            caret-color: $primary;
        }
        .mirror 
        {
            @include font.interact($light);

            @extend %f-a-center;

            &.app-available>pre:nth-child(1), &.command-available>pre:nth-child(2) { color: $primary; }
        }
    }
}
</style>