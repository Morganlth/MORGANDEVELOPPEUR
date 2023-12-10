<!----------------------------------------------- #||--back--|| -->


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
class="back p-rlt s-any b-box"
>
    <Cell
    prop_ICON_WRAPPER={true}
    prop_CENTER={true}
    prop_TITLE={prop_BACK.cellTitle}
    {prop_FOCUS}
    on:click={prop_turn.bind(null, false)}
    >
        <Icon
        prop_COLOR={COLORS.light}
        >
            <Cross />
        </Icon>
    </Cell>

    <article
    class="desc s-a-w b-box"
    >
        <h2>{prop_BACK.desc.title}</h2>

        {#each prop_BACK.desc.sections as section}
            <section>
                <h3>- {section.title}</h3>

                <p>
                    {#each section.contents as content}
                        {#if content instanceof Object}
                        {@const {br, cell, command, commandFraction} = content}
                            {#if br}
                                <br>
                            {:else if cell}
                            {@const {cellTitle, value} = content}
                                <Cell
                                prop_TEXT_WRAPPER={true}
                                prop_TITLE={cellTitle}
                                {prop_FOCUS}
                                on:click={cell_eClick.bind(null, value)}
                                >
                                    "{value}"
                                </Cell>
                            {:else if command}
                            {@const {name, params} = content}
                                <Cell
                                prop_TEXT_WRAPPER={true}
                                prop_TITLE={prop_BACK.cellCommandTitle}
                                {prop_FOCUS}
                                on:click={cell_eClick.bind(null, `${TERMINAL_WORD_REFERENCE} ${name} ${params ?? ''}`)}
                                >
                                    <span
                                    class="command-app"
                                    >
                                        {TERMINAL_WORD_REFERENCE}
                                    </span>
                
                                    <span
                                    class="command-name"
                                    >
                                        {name}
                                    </span>
                
                                    <span
                                    class="command-params"
                                    >
                                        {params ?? ''}
                                    </span>
                                </Cell>
                            {:else if commandFraction}
                            {@const {commandType, value} = content}
                                <span
                                class="command-{commandType}"
                                >
                                    {commandType === 'app' ? TERMINAL_WORD_REFERENCE : value}
                                </span>
                            {/if}
                        {:else}
                            {content}&nbsp;
                        {/if}
                    {/each}
                </p>
            </section>
        {/each}
    </article>
</div>


<!-- #|-SCRIPT-| -->

<script>

// #\-IMPORTS-\

    // --DATA

    // --SVELTE

    // --LIB
    import COLORS from '$lib/colors'

    // --CONTEXTS
    import { COMMAND } from '../../../../../App.svelte'

    import { TERMINAL_WORD_REFERENCE } from './Terminal.svelte'

//=======@COMPONENTS|

    // --*
    import Cell from '../../../../../global/covers/Cell.svelte'
    import Icon from '../../../../../global/covers/Icon.svelte'

    import Cross from '../../../../../global/icons/Cross.svelte'
    
//=======@STYLE|

    // --*


// #\-EXPORTS-\

    // --PROPS
    export let
    prop_BACK = {}
    ,
    prop_FOCUS = false
    ,
    prop_turn = () => {}

    // --BINDING


// #\-CONSTANTES-\

    // --SVELTE

    // --CONTEXTS

    // --OUTSIDE

    // --THIS

    // --INSIDE


// #\-VARIABLES-\

    // --CONTEXTS

    // --OUTSIDE

    // --THIS

    // --INSIDE


// #\-REATIVES-\

    // --CONTEXTS

    // --OUTSIDE

    // --THIS

    // --INSIDE


// #\-FUNCTIONS-\

//=======@LIFE|

    // --SVELTE

    // --SET

    // --GET

    // --UPDATES

    // --DESTROY


//=======@COMMANDS|

    // --*


//=======@EVENTS|

    // --*
    async function cell_eClick(command)
    {
        const COMMANDS = COMMAND.command_COMMANDS
    
        if (COMMAND.command_test('clear') && COMMAND.command_test('write'))
        {
            COMMANDS.clear()

            prop_turn(false)

            COMMANDS.write(command)
        }
    }


//=======@TRANSITIONS|

    // --*


//=======@ANIMATIONS|

    // --*


//=======@UTILS|

    // --*


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
    @use '../../../../../assets/scss/styles/font';

    /* --MEDIA */
    @use '../../../../../assets/scss/styles/media';


/* #\-VARIABLES-\ */

    /* --* */


/* #\-THIS-\ */

.back
{
    top: -100%;

    transform: rotateY(180deg);

    background-color: $dark;

    .desc
    {
        $margin-top: 1rem;

        @extend %scroll-bar;

        overflow           : auto;
        overscroll-behavior: none;

        height: calc(100% - var(--cell-size) - $margin-top);

        margin-top:     $margin-top;
        padding-bottom: 1rem;
        padding-right:  2rem;

        background-color: $dark;

        user-select: text;

        h2 { @include font.h-(4, $light, 1.4); }

        h3
        {
            @include font.text($color: $light, $regular: false, $font-size: map.get(font.$font-sizes, s3));

            margin-block: 2.4rem 1.2rem;
        }

        p
        {
            @include font.text($color: $light, $font-size: map.get(font.$font-sizes, s2), $line-height: 1.2);

            text-align: justify;
        }

        .command-app { color: $primary; }

        .command-name { color: $indicator; }
    }
}


</style>