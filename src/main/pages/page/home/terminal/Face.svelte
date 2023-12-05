<!----------------------------------------------- #||--face--|| -->


<!-- #|-CONTEXT-| -->
<!--
<script
context="module"
>

// #\-IMPORTS-\

    // --SVELTE

     // --LIB

    // --JS


// #\-EXPORTS-\

    // --CONTEXTS


</script>
-->

<!-- #|-HTML-| -->

<div
class="face"
>
    <div
    class="head"
    >
        <Cell
        prop_ICON_WRAPPER={true}
        prop_CENTER={true}
        prop_TITLE={prop_FACE.head.cellTitle}
        {prop_FOCUS}
        on:click={prop_turn.bind(null, true)}
        >
            <Icon
            prop_COLOR={COLORS.light}
            >
                <Question />
            </Icon>
        </Cell>

        <span
        class="info"
        >
            {#each prop_FACE.head.info as _}
                {_.topic}:
                [<span>{_.datatype}</span>]
                &nbsp;
            {/each}
        </span>
    </div>

    <Line>
        <Cell
        prop_TITLE="terminal input"
        {prop_FOCUS}
        on:click={cell_eClick}
        slot="id"
        >
            <Icon
            prop_SIZE="1.8rem"
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
            name="command-line"
            inputmode="text"
            maxlength={input_MAX_LENGTH}
            aria-label="command line"
            tabindex={prop_FOCUS ? 0 : -1}
            spellcheck="false"
            autocomplete="off"
            autocorrect="off"
            autocapitalize="off" 
            bind:this={input_FIELD}
            bind:value={input_VALUE}
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
                        prop_TITLE={line.datas.str}
                        {prop_FOCUS}
                        on:click={cell_eClick2.bind(null, line.datas)}
                        >
                            {line.message}
                        </Cell>

                        {#if line.datas.placeholder}
                            <span
                            class="placeholder"
                            >
                                {line.datas.placeholder}
                            </span>
                        {/if}
                    {:else}
                        <pre>{line.message}</pre>
                    {/if}
                </div>
            </Line>
        {/each}
    </div>
</div>


<!-- #|-SCRIPT-| -->

<script>

// #\-IMPORTS-\

    // --DATA
    import { CommandError, CommandSuccess } from '../../../../../assets/js/managers/command'

    // --SVELTE
    import { onMount, onDestroy, tick } from 'svelte'

    // --LIB
    import COLORS        from '$lib/colors'
    import { animation } from '$lib/animation'

    // --CONTEXTS
    import { COMMAND, EVENT, PROCESS } from '../../../../../App.svelte'

    import { TERMINAL_WORD_REFERENCE } from './Terminal.svelte'

//=======@COMPONENTS|

    // --*
    import Cell from '../../../../../global/covers/Cell.svelte'
    import Icon from '../../../../../global/covers/Icon.svelte'
    import Line from '../../../../../global/covers/Line.svelte'

    import Question    from '../../../../../global/icons/Question.svelte'
    import CommandLine from '../../../../../global/icons/CommandLine.svelte'
    
//=======@STYLE|

    // --*


// #\-EXPORTS-\

    // --PROPS
    export let
    prop_FACE = {}
    ,
    prop_FOCUS = false
    ,
    prop_updateProcessDatas = () => {},
    prop_turn               = () => {}

    // --BINDING


// #\-CONSTANTES-\

    // --SVELTE

    // --CONTEXTS

    // --OUTSIDE

    // --THIS
    const
    FACE_COMMANDS =
    [
        {
            name    : 'write',
            callback: input_c$Write,
            desc    : { fr: 'Écrire une commande (p: commande)', en: 'Write a command (p: command)' },
            args    : true
        }
    ,
        {
            name    : 'log',
            callback: output_c$Log,
            desc    : { fr: 'Afficher un message (p: message)', en: 'Display a message (p: message)' },
            args    : true
        }
    ,
        {
            name    : 'clear',
            callback: output_c$Clear,
            desc    : { fr: 'Nettoyer le Terminal', en: 'Clean the Terminal' },
            args    : false
        }
    ]
    ,
    FACE_EVENTS = { resize: face_e$Resize }

    // --INSIDE
    const
    INPUT_COMMAND_REGEX = new RegExp(`^(${TERMINAL_WORD_REFERENCE})(\\s+\\S*)?(\\s.*)?$`, 'i')
    ,
    INPUT_HISTORY = [TERMINAL_WORD_REFERENCE + ' ']

    const MIRROR_FIELDS = []


// #\-VARIABLES-\

    // --CONTEXTS

    // --OUTSIDE

    // --THIS

    // --INSIDE
    let
    input_FIELD
    ,
    input_VALUE
    ,
    input_MAX_LENGTH = 0,
    input_I          = 0
    ,
    input_TIMEOUT
    ,
    input_cancel = () => {}

    let
    mirror_APP_AVAILABLE     = false,
    mirror_COMMAND_AVAILABLE = false

    let
    output
    ,
    output_HEIGHT = 0
    ,
    output_LINES = []


// #\-REATIVES-\

    // --CONTEXTS

    // --OUTSIDE

    // --THIS

    // --INSIDE


// #\-FUNCTIONS-\

//=======@LIFE|

    // --SVELTE
    onMount(face_set), onDestroy(face_destroy)

    // --SET
    function face_set()
    {
        face_setCommands()
        face_setEvents()
    
        input_setVars()

        output_setVars()
    }

    function face_setCommands() { for (const CMD of FACE_COMMANDS) COMMAND.command_add(CMD.name, CMD.callback, CMD.desc, CMD.args) }
    
    function face_setEvents() { EVENT.event_add(FACE_EVENTS) }

    function input_setVars()
    {
        const VALUE = input_FIELD.value // save value

        input_reset() // reset input & mirror (not affect the size calc)

        const CHAR_WIDTH = parseFloat(window.getComputedStyle(input_FIELD).getPropertyValue('font-size')) * .55 // calc width of 1 char (.55 = width / height of Anonymous Pro)

        input_MAX_LENGTH = Math.floor(input_FIELD.offsetWidth / CHAR_WIDTH) - 1 // char max in input
        input_VALUE      = VALUE.substring(0, input_MAX_LENGTH) // replace value

        input_eInput() // set mirror
    }

    function output_setVars() { output_HEIGHT = output.offsetHeight }

    // --GET

    // --UPDATES
    function input_updateHistory()
    {
        const
        VALUE = input_VALUE.trim(),
        INDEX = INPUT_HISTORY.indexOf(VALUE)

        if (~INDEX) INPUT_HISTORY.splice(INDEX, 1)
    
        INPUT_HISTORY.push(VALUE)

        input_I = INPUT_HISTORY.length
    }

    function input_updateIndex(up = false)
    {
        input_I += up ? -1 : 1
    
             if (input_I < 0) input_I = 0
        else if (input_I >= INPUT_HISTORY.length) input_I = INPUT_HISTORY.length - 1
    }

    function mirror_update(available = false, values = [input_VALUE])
    {
        mirror_APP_AVAILABLE = available

        for (let i = 0; i < MIRROR_FIELDS.length; i++) MIRROR_FIELDS[i].innerText = values[i] ?? ''
    }

    async function output_update()
    {
        if (output)
        {
      await tick()

            output.scrollTop = output.scrollHeight - output_HEIGHT
        }
    }

    // --DESTROY
    function face_destroy()
    {
        face_destroyEvents()

        input_destroy()
    }

    function face_destroyEvents() { EVENT.event_remove(FACE_EVENTS) }

    function input_destroy()
    {
        clearTimeout(input_TIMEOUT)

        input_cancel()
    }


//=======@COMMANDS|

    // --*
    async function input_c$Write(value = '')
    {
        await tick() // await input_reset in input_execute

        input_destroy()
        input_fieldFocus()

        try
        {
            await input_a(value)
    
            input_TIMEOUT = setTimeout(() => input_eKeyup({ key: 'Enter' }), 600)
        }
        catch {}
    }

    function output_c$Log(msg, datas = null)
    {
        const
        [ERROR, SUCCESS] = [msg instanceof Error, msg instanceof CommandSuccess],
        [NAME, MESSAGE]  = ERROR || SUCCESS ? [msg.name, msg.message] : [void 0, msg + ''] // parse String

        const LINE = { error: ERROR, success: SUCCESS, name: NAME, message: MESSAGE.trim(), datas }

        output_LINES = [...output_LINES, LINE]

        output_update()
    }

    function output_c$Clear() { output_LINES = [] }


//=======@EVENTS|

    // --*
    async function face_e$Resize()
    {
        input_setVars()
    
        output_setVars()
    }

    function cell_eClick() { input_fieldFocus() }

    function cell_eClick2(datas) { datas.target ? prop_updateProcessDatas(datas) : datas.callback() }

    function input_eInput() { input_testApp() ? input_analyseCommand() : input_keywordFormat() }

    async function input_eKeyup({key})
    {
             if (key === 'Enter')     mirror_APP_AVAILABLE ? input_execute() : input_analyseKeyword()
        else if (key === 'ArrowUp')   input_restore(true)
        else if (key === 'ArrowDown') input_restore(false)
    }


//=======@TRANSITIONS|

    // --*


//=======@ANIMATIONS|

    // --*
    function input_a(value)
    {
        const
        LENGTH = value.length,
        DELAY  = 100

        let { cancel, promise } = animation(t =>
        {
            input_VALUE = value.substring(0, Math.floor(t * LENGTH))
    
            input_eInput()
        },
        DELAY * LENGTH, 0, false, LENGTH)

        input_cancel = cancel

        return promise
    }


//=======@UTILS|

    // --*
    export function input_fieldFocus()
    {
        const LENGTH = input_VALUE.length

        input_FIELD.focus()
        input_FIELD.setSelectionRange(LENGTH, LENGTH)
    }

    function input_analyseCommand()
    {
        const VALUES = input_VALUE.match(INPUT_COMMAND_REGEX)

        VALUES.shift()

        if (VALUES[1]) mirror_COMMAND_AVAILABLE = mirror_testCommand(VALUES[1].trim())

        mirror_update(true, VALUES)
    }

    function input_analyseKeyword()
    {
        const DATAS = PROCESS.process_spellChecker(input_VALUE)[0]

        if (DATAS)
        {
            output_c$Log('=> ' + DATAS.str)
    
            prop_updateProcessDatas(DATAS)

            input_reset()
        }
    }

    function input_execute()
    {
        const [NAME, PARAMS] = [MIRROR_FIELDS[1].innerText.trim(), MIRROR_FIELDS[2].innerText.trim().split(',')]

        input_updateHistory()

        try
        {
            COMMAND.command_COMMANDS[NAME](...PARAMS)
            
            input_reset()
        }
        catch (e) { input_error(e, NAME) }
    }

    function input_reset()
    {
        input_VALUE = '' // before update
    
        mirror_update()
    }

    function input_restore(up = false)
    {
        input_updateIndex(up)

        input_VALUE = INPUT_HISTORY[input_I]

        input_eInput()
        input_fieldFocus()
    }

    function input_error(e, command)
    {
        const ERROR = e instanceof CommandError
        ? e
        : new CommandError(
            ...(command in COMMAND.command_COMMANDS
            ? ['Error', 'une erreur est survenue :/']
            : ['TypeError', `"${command}" n'est pas une commande`])
        )

        output_c$Log(ERROR)
    }

    function input_keywordFormat()
    {
        input_VALUE = input_VALUE.replaceAll(/\s/g, '')
    
        mirror_update()
    }
    
    function input_testApp() { return (input_VALUE.length === 3 || input_VALUE[3] === ' ') && input_VALUE.substring(0, 3).toLowerCase() === TERMINAL_WORD_REFERENCE }
    
    function mirror_testCommand(command) { return command in COMMAND.command_COMMANDS }


</script>


<!-- #|-STYLE-| -->

<style
lang="scss"
>

/* #\-USES-\ */

    /* --SASS */
    @use 'sass:map';

    /* --APP */

    /* --DEPENDENCIES */
    @use '../../../../../assets/scss/styles/utils';
    @use '../../../../../assets/scss/styles/display';
    @use '../../../../../assets/scss/styles/font';

    /* --MEDIA */
    @use '../../../../../assets/scss/styles/media';


/* #\-VARIABLES-\ */

    /* --* */


/* #\-THIS-\ */

.face
{
    --line-height: 3rem;

    &, .output { @extend %f-column; }

    transform: rotateY(0);

    .head
    {
        display:         flex;
        justify-content: space-between;

        margin-bottom: 2rem;

        .info
        {
            @include font.text($color: $light, $font-size: map.get(font.$font-sizes, s1));

            text-align: right;
            
            span { color: $primary; }
        }
    }

    .input, .output { @extend %any-size; }

    .input
    {
        &, input, .mirror
        {
            @extend %f-a-center;

            box-sizing: border-box;
        }

        position: relative;

        justify-content: space-between;
    
        border-bottom: solid $primary 1px;
    }

    input, .mirror, pre { font: inherit !important; }

    input, .mirror { @extend %any-size; }

    input
    {
        &, &::selection { color: transparent; }
    
        @include utils.placement(absolute, $top: 0, $right: 0, $bottom: 0);

        caret-color: $light;

        &::selection { background-color: rgba($primary, .5); }
    }

    .mirror 
    {
        color: $light;

        &.app-available    >pre:nth-child(1) { color: $primary; }
        &.command-available>pre:nth-child(2) { color: $indicator; }
    }

    .output
    {
        @extend %scroll-bar;

        align-items: flex-end;

        overflow:            auto scroll;
        overscroll-behavior: none;

        max-height: 100%;

        margin-top: 1rem;

        background-color: $dark;

        div
        {
            @extend %f-a-center;

            gap: 1rem;
        }

        .error { color: $indicator; }

        .success { color: $primary; }

        .placeholder { font-size: map.get(font.$font-sizes, s2); }
    }

    @include media.min($ms3)
    {
        --line-height: 5rem;

        .head .info { font-size: map.get(font.$font-sizes, s2); }
    }
}


</style>