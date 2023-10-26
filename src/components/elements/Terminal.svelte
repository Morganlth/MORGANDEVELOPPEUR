<!-- #MAP

-APP
-ROUTER
-COMMAND
-EVENT
-PROCESS
-SPRING
    TERMINAL
        CONTAINER
            INFOS
                CELL
                    ICON
                        QUESTION
            INPUT
                LINE
                    ICON
                        COMMANDLINE
                    MIRROR
            OUTPUT
                LINE * n

-->

<!-- #SCRIPT -->

<script>
// #EXPORT

    // --BIND
    export let terminal_ON = false

// #IMPORTS

    // --JS
    import { CommandError, CommandSuccess } from '../../assets/js/managers/mCommand'
    import MATH from '../../assets/js/utils/math'

    // --LIB
    import COLORS from '$lib/colors'

    // --CONTEXTS
    import { APP, ROUTER, COMMAND, EVENT, PROCESS, SPRING } from '../../App.svelte'

    // --SVELTE
    import { onMount, onDestroy, tick } from 'svelte'

    // --COMPONENT-COVERS
    import Line from '../covers/Line.svelte'
    import Cell from '../covers/Cell.svelte'
    import Icon from '../covers/Icon.svelte'

    // --COMPONENT-ICONS
    import Question from '../icons/Question.svelte'
    import Cross from '../icons/Cross.svelte'
    import CommandLine from '../icons/CommandLine.svelte'

// #CONSTANTES

    // --ELEMENT-TERMINAL
    const
    TERMINAL = 'terminal',

    TERMINAL_ROTATE_Y = MATH.toRad(18),

    TERMINAL_HISTORY = ['app '],

    TERMINAL_EVENTS = { mouseDown: terminal_e$MouseDown }

    // --ELEMENT-INPUT
    const INPUT_EVENTS = { resize: input_e$Resize }

    // --ELEMENT-MIRROR
    const MIRROR_FIELDS = []

// #VARIABLES

    // --ELEMENT-TERMINAL
    let
    terminal_FOCUS = false,

    terminal_INDEX = 0,

    terminal_TIMEOUT

    // --ELEMENT-INPUT
    let
    input_FIELD,

    input_LENGTH = 0,
    input_CURRENT_VALUE = ''

    // --ELEMENT-MIRROR
    let
    mirror_APP_AVAILABLE = false,
    mirror_COMMAND_AVAILABLE = false

    // --ELEMENT-OUTPUT
    let
    output,

    output_LINES = []

    // --ELEMENT-MANUAL
    let manual_ON = false

// #REACTIVE

    // --ELEMENT-TERMINAL
    $: terminal_update(terminal_ON)

// #FUNCTIONS

    // --SET
    function terminal_set()
    {
        terminal_setCommands()

        input_setVars()
        input_setEvents()
    }

    function terminal_setCommands()
    {
        COMMAND.command_add('log', terminal_c$Log)
        COMMAND.command_add('clear', terminal_c$Clear)
    }

    function terminal_setEvents() { EVENT.event_add(TERMINAL_EVENTS) }

    function input_setVars()
    {
        const VALUE = input_FIELD.value // save value

        input_reset() // reset input & mirror (not affect the size calc)

        const CHAR_WIDTH = parseFloat(window.getComputedStyle(input_FIELD).getPropertyValue('font-size')) * .55 // calc width of 1 char (.55 = width / height of Anonymous Pro)

        input_LENGTH = Math.floor(input_FIELD.offsetWidth / CHAR_WIDTH) - 1 // char max in input
        input_CURRENT_VALUE = VALUE.slice(0, input_LENGTH) // replace value

        input_eInput() // set mirror
    }

    function input_setEvents() { EVENT.event_add(INPUT_EVENTS) }

    // --DESTROY
    function terminal_destroy()
    {
        terminal_clear()
    
        terminal_destroyEvents()
        input_destroyEvents()
    }

    function terminal_destroyEvents() { EVENT.event_remove(TERMINAL_EVENTS) }

    function input_destroyEvents() { EVENT.event_remove(INPUT_EVENTS) }

    // --RESET
    function input_reset()
    {
        input_CURRENT_VALUE = '' // before update
    
        mirror_update()
    }

    // --RESTORE
    function terminal_restore()
    {
        terminal_updateIndex()

        input_CURRENT_VALUE = TERMINAL_HISTORY[terminal_INDEX]

        input_fieldFocus()
        input_eInput()
    }

    // --UPDATES
    function contexts_update()
    {
        const UPDATE = { value: terminal_ON, target: null }

        APP.app_$FREEZE = UPDATE
        ROUTER.router_$HIDE = UPDATE
    }

    function terminal_update()
    {
        terminal_clear()

        if (terminal_ON)
        {
            terminal_setEvents()

            terminal_TIMEOUT = setTimeout(input_fieldFocus, 500)
        }
        else terminal_destroyEvents()

        contexts_update()
    }

    function terminal_updateHistory()
    {
        const
        VALUE = input_CURRENT_VALUE.trim(),
        INDEX = TERMINAL_HISTORY.indexOf(VALUE)

        if (~INDEX) TERMINAL_HISTORY.splice(INDEX, 1)
    
        TERMINAL_HISTORY.push(VALUE)

        terminal_INDEX = TERMINAL_HISTORY.length
    }

    function terminal_updateIndex()
    {
        if (terminal_INDEX < 0) terminal_INDEX = 0
        else if (terminal_INDEX >= TERMINAL_HISTORY.length) terminal_INDEX = TERMINAL_HISTORY.length - 1
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
    function terminal_c$Log(msg, datas = null)
    {
        const
        [ERROR, SUCCESS] = [msg instanceof Error, msg instanceof CommandSuccess],
        [NAME, MESSAGE] = ERROR || SUCCESS ? [msg.name, msg.message.trim()] : [void 0, msg.trim()]

        const LINE = { error: ERROR, success: SUCCESS, name: NAME, message: MESSAGE, datas }

        output_LINES = [...output_LINES, LINE]

        output_update()
    }

    function terminal_c$Clear() { output_LINES = [] }

    // --EVENTS
    async function terminal_e$MouseDown({target})
    {
        if (!terminal_FOCUS && target.dataset.tag !== TERMINAL)
        {
            terminal_ON = false

            terminal_update()
        }
    }

    function terminal_eMouseEnter()
    {
        SPRING.spring_e$Hide()

        terminal_FOCUS = true
    }

    function terminal_eMouseLeave()
    {
        SPRING.spring_e$Show()

        terminal_FOCUS = false
    }

    function cell_eClick(on) { manual_ON = on }

    function cell_eClick2() { input_fieldFocus() }

    async function input_eKeyup({key})
    {
        switch (key)
        {
            case 'Enter':
                mirror_APP_AVAILABLE ? terminal_execute() : terminal_analyse()
                break
            case 'ArrowUp':
                terminal_INDEX--
                terminal_restore()
                break
            case 'ArrowDown':
                terminal_INDEX++
                terminal_restore()
                break
            default: break
        }
    }

    function input_eInput() // no async
    {
        if ((
        input_CURRENT_VALUE.length === 3 ||
        input_CURRENT_VALUE[3] === ' ') &&
        input_CURRENT_VALUE.substring(0, 3).toLowerCase() === 'app') input_analyse()
        else
        {
            input_CURRENT_VALUE = input_CURRENT_VALUE.replaceAll(/\s/g, '')
    
            mirror_update()
        }
    }

    async function input_e$Resize() { input_setVars() }

    // --CLEAR
    function terminal_clear() { clearTimeout(terminal_TIMEOUT) }

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

    function terminal_execute()
    {
        const [NAME, PARAMS] = [MIRROR_FIELDS[1].innerText.trim(), MIRROR_FIELDS[2].innerText.trim().split(',')]

        terminal_updateHistory()

        try
        {
            COMMAND.command_COMMANDS[NAME](...PARAMS)
            
            input_reset()
        } catch (e) { terminal_error(e, NAME) }
    }

    function terminal_error(e, command)
    {
        const ERROR = e instanceof CommandError
        ? e
        : new CommandError(
            ...(COMMAND.command_KEYWORDS.includes(command)
            ? ['Error', 'une erreur est survenue :/']
            : ['TypeError', `"${command}" n'est pas une commande`])
        )

        terminal_c$Log(ERROR)
    }

    async function terminal_analyse()
    {
        const DATAS = (await PROCESS.process_spellChecker(input_CURRENT_VALUE))[0]

        if (DATAS)
        {
            terminal_c$Log('=> ' + DATAS.str)
    
            terminal_goTo(DATAS)

            input_reset()
        }
    }

    async function terminal_goTo(datas)
    {
        terminal_ON = false

        datas.callback(datas.str, datas.target)
    }

// #CYCLES

onMount(terminal_set)
onDestroy(terminal_destroy)
</script>
<!-- #HTML -->

<!-- svelte-ignore a11y-no-static-element-interactions -->
<div
class="terminal"
class:focus={terminal_ON}
style:--r-y="{TERMINAL_ROTATE_Y}rad"
style:--cos={Math.cos(TERMINAL_ROTATE_Y)}
on:mouseenter={terminal_eMouseEnter}
on:mouseleave={terminal_eMouseLeave}
>
    <div
    class="container"
    class:manual={manual_ON}
    >
        <div
        class="back"
        >
            <Cell
            prop_FOCUS={terminal_ON}
            prop_CONTAINER={true}
            prop_TITLE="fermer"
            on:click={cell_eClick.bind(null, false)}
            >
                <Icon
                prop_COLOR={COLORS.light}
                >
                    <Cross />
                </Icon>
            </Cell>
    
            <p>
                FONCTIONS DU TERMINAL:
            <br>
            <br>
                - RECHERCHER PAR MOTS CLÉS UNE SECTION OU UNE INFORMATION
            <br>
                <span>
                    Vous pouvez retrouver la liste des mots clés avec la commande
                    <span>app keywords</span>
                </span>
            <br>
            <br>
                - TAPER UNE COMMANDE POUR OBTENIR UNE INFORMATION, MODIFIER L'AFFICHAGE OU OPTIMISER LE SITE WEB
            <br>
                <span>
                    Vous pouvez retrouver la liste des commandes avec la commande
                    <span>app commands</span>
                </span>
            </p>
        </div>

        <div
        class="face"
        >
            <div
            class="infos"
            >
                <Cell
                prop_FOCUS={terminal_ON}
                prop_CONTAINER={true}
                prop_TITLE="infos"
                on:click={cell_eClick.bind(null, true)}
                >
                    <Icon
                    prop_COLOR={COLORS.light}
                    >
                        <Question />
                    </Icon>
                </Cell>
        
                <p>
                    recherche:
                    [<span>text</span>]
                    commande:
                    [<span>app...</span>]
                </p>
            </div>

            <Line>
                <Cell
                prop_FOCUS={terminal_ON}
                prop_TITLE="terminal input"
                on:click={cell_eClick2}
                slot="id"
                >
                    <Icon
                    prop_COLOR={COLORS.primary}
                    >
                        <CommandLine />
                    </Icon>
                </Cell>

                <div
                class="input"
                slot="content"
                >
                    <input
                    type="text"
                    maxlength={input_LENGTH}
                    tabindex={terminal_ON ? 0 : -1}
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
            </Line>

            <div
            class="output"
            bind:this={output}
            >
                {#each output_LINES as line, i}
                    <Line>
                        <span
                        slot="id"
                        >
                            {i}
                        </span>

                        <div
                        slot="content"
                        >
                            {#if line.name}
                                <span
                                class:error={line.error}
                                class:success={line.success}
                                >
                                    {line.name}:
                                </span>
                            {/if}

                            {#if line.datas}
                                <Cell
                                prop_FOCUS={terminal_ON}
                                prop_TITLE={line.datas.str}
                                on:click={terminal_goTo.bind(null, line.datas)}
                                >
                                    {line.message}
                                </Cell>
                            {:else}
                                <pre>{line.message}</pre>
                            {/if}
                        </div>
                    </Line>
                {/each}
            </div>
        </div>
    </div>
</div>

<!-- #STYLE -->

<style
lang="scss"
>
/* #USES */

@use 'sass:map';

@use '../../assets/scss/app';

@use '../../assets/scss/styles/elements';
@use '../../assets/scss/styles/utils';
@use '../../assets/scss/styles/position';
@use '../../assets/scss/styles/display';
@use '../../assets/scss/styles/size';
@use '../../assets/scss/styles/font';
@use '../../assets/scss/styles/media';

/* #TERMINAL */

.terminal
{
    $r-y: var(--r-y, 18deg);

    $icon-size: 2.4rem;

    @include position.placement(absolute, $right: app.$gap-inline, $bottom: 20%);

    perspective-origin: left;
    perspective: 2000px;

    overflow: visible;

    width: calc((100vw - app.$gap-inline * 2) / var(--cos, 1));
    height: 26vh;

    &.focus .container
    {
        transform: rotateY(calc($r-y * -1)) translateX(0);

        pointer-events: auto;
    }

    .container
    {
        #{--cell-size}: calc(var(--icon-size, $icon-size) * .6);

        transform-origin: right;
        transform-style: preserve-3d;
        transform: rotateY(calc($r-y * -1)) translateX(calc(100% + app.$gap-inline));

        &, .back, .face
        {
            @extend %any;

            transition: transform .4s ease-out;
        }

        &, .face { @include position.placement(absolute, 0, 0, 0, 0); }

        .back, .face
        {
            padding: 2rem 4rem;

            background-color: $dark;
            backface-visibility: hidden;

            border: solid $light .1rem;

            box-sizing: border-box;
        }

        .back
        {
            transform: rotateY(180deg);

            box-shadow: 0 0 .6rem $light;
            
            p
            {
                @include font.content($light, $font-size: map.get(font.$font-sizes, s3));

                @extend %scroll-bar;

                overflow: clip auto;

                height: auto;
                max-height: calc(100% - var(--cell-size));

                padding-top: 2rem;

                box-sizing: border-box;

                &>span
                {
                    font-size: map.get(font.$font-sizes, s2);

                    span
                    {
                        color: $primary;
                        user-select: text;
                    }
                }
            }
        }

        .face
        {
            #{--icon-size}: $icon-size;
    
            @extend %f-column;

            box-shadow: 0 0 .6rem $primary;
        }

        .infos
        {
            display: flex;
            justify-content: space-between;

            margin-bottom: 2rem;

            p
            {
                @include font.content($light, $font-size: map.get(font.$font-sizes, s1));

                text-align: right;
                
                span { color: $primary; }
            }
        }

        &.manual
        {
            .back { transform: rotateY(0); }

            .face { transform: rotateY(-180deg); }
        }
    }

    .input
    {
        @extend %f-a-center;
        @extend %any;

        position: relative;

        justify-content: space-between;
    
        border-bottom: solid $primary 1px;

        box-sizing: border-box;

        input, .mirror { @extend %f-a-center; }
        input, .mirror { @extend %any; }
        input
        {
            @include position.placement(absolute, 0, 0, 0);

            @extend %input-reset;

            color: transparent;
    
            caret-color: $light;

            box-sizing: border-box;

            &::selection
            {
                background-color: rgba($primary, .5);

                color: transparent;
            }
        }
        .mirror 
        {
            color: $light;
    
            &.app-available>pre:nth-child(1) { color: $primary; }
            &.command-available>pre:nth-child(2) { color: $indicator; }
        }
    }

    .output
    {
        @extend %scroll-bar;
        @extend %f-column;
        @extend %any;

        align-items: flex-end;

        overflow: auto scroll;

        max-height: 100%;

        margin-top: 1rem;

        div
        {
            display: flex;

            gap: 1rem;
        }

        .error { color: $indicator; }
        .success { color: $primary; }

        :global .cell
        {
            padding: .2rem .6rem;

            background-color: $light;

            border: none;

            color: $dark;

            cursor: pointer;
        }
    }

    @include media.min($ms3)
    {
        top: 44%;
        bottom: auto;

        width: 56vw;
        height: 46vh;

        .container
        {
            #{--cell-size}: var(--icon-size, $icon-size);
        
            .infos p { font-size: map.get(font.$font-sizes, s2); }
        }
    }
    @include media.min($ms4, $ms4) { top: 33%; }
}
</style>