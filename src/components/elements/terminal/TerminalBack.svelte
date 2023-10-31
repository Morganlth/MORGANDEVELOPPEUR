<!-- #MAP

-COMMAND
    TERMINALBACK
        CELL
            ICON
                CROSS
        DESC

-->

<!-- #SCRIPT -->

<script>
// #EXPORTS

    // --PROPS
    export let
    prop_FOCUS = false
,
    prop_turn = () => {}

    // --BINDS

// #IMPORTS

    // --JS

    // --LIB
    import COLORS from '$lib/colors'

    // --CONTEXTS
    import { COMMAND } from '../../../App.svelte'
    import { TERMINAL_WORD_REFERENCE } from './Terminal.svelte'

    // --SVELTE

    // --COMPONENT-COVERS
    import Cell from '../../covers/Cell.svelte'
    import Icon from '../../covers/Icon.svelte'

    // --COMPONENT-ICON
    import Cross from '../../icons/Cross.svelte'

// #CONSTANTES

    // --ELEMENT-DESC
    const DESC_EXEMPLE =
    {
        ref: TERMINAL_WORD_REFERENCE,
        command: 'success',
        params: 'Le terminal, Mon Succès'
    }

    // --ELEMENT-CELL
    const CELL_COMMAND_TITLE = 'Clicker pour éxécuter la commande'

// #VARIABLES

// #REACTIVES

// #FUNCTIONS

    // --SET

    // --GET

    // --UPDATES

    // --CLEAR

    // --DESTROY

// !======IN-OUT=======!

    // --INTROS

    // --OUTROS

// !======CONTEXT======!

    // --COMMANDS

    // --EVENTS
    async function cell_eClick(command)
    {
        const COMMANDS = COMMAND.command_COMMANDS
    
        if (COMMAND.command_testCommand('clear') && COMMAND.command_testCommand('write'))
        {
            COMMANDS.clear()

            prop_turn(false)

            COMMANDS.write(command)
        }
    }

// !======T-A==========!

    // --TRANSITIONS

    // --ANIMATIONS

// !======CONTROL======!

    // --START

    // --END

// !======TEST=========!

    // --TESTS

// !======CANVAS=======!

    // --DRAW

// !======UTILS========!

    // --UTILS

// #LIFECYCLES

</script>

<!-- #HTML -->

<div
class="terminalback"
>
    <Cell
    prop_CONTAINER={true}
    prop_TITLE="fermer"
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
    class="desc"
    >
        <h3>FONCTIONS DU TERMINAL</h3>

        <section>
            <h4>- Taper une commande pour obtenir, modifier, ou optimiser</h4>

            <p>
                Le terminal vous offre la possibilité de personnaliser le site web LE THUAUT Morgan.
                Vous pouvez par exemple changer des paramètres pour optimiser la page ou réduire/augmenter des effets visuels.
                Les commandes se traduisent par le mot-clé

                <span
                class="command-app"
                >
                    {TERMINAL_WORD_REFERENCE}
                </span>

                suivi du nom d'une commande, par exemple:

                <span
                class="command-name"
                >
                    {DESC_EXEMPLE.command}
                </span>
        
                ; puis éventuellement d'un ou plusieurs paramètres séparés par des virgules:

                <span>"{DESC_EXEMPLE.params}"</span>
        
                (premier paramètre "p1", second paramètre "p2", ...).
            <br>
                Cela nous donne la commande suivante:

                <Cell
                prop_TITLE={CELL_COMMAND_TITLE}
                {prop_FOCUS}
                on:click={cell_eClick.bind(null, `${TERMINAL_WORD_REFERENCE} ${DESC_EXEMPLE.command} ${DESC_EXEMPLE.params}`)}
                >
                    <span
                    class="command-app"
                    >
                        {TERMINAL_WORD_REFERENCE}
                    </span>
                    <span
                    class="command-name"
                    >
                        {DESC_EXEMPLE.command}
                    </span>
                    <span>{DESC_EXEMPLE.params}</span>
                </Cell>
            <br>
            <br>
                Vous pouvez retrouver la liste des commandes avec la commande

                <Cell
                prop_TITLE={CELL_COMMAND_TITLE}
                {prop_FOCUS}
                on:click={cell_eClick.bind(null, TERMINAL_WORD_REFERENCE + ' commands')}
                >
                    <span
                    class="command-app"
                    >
                        {TERMINAL_WORD_REFERENCE}
                    </span>
                    <span
                    class="command-name"
                    >
                        commands
                    </span>
                </Cell>
            </p>
        </section>

        <section>
            <h4>- Rechercher une section ou une information</h4>

            <p>
                Le terminal agit comme une barre de recherche.
                Tapez un mot-clé pour trouver une section correspondante, par exemple:
                
                <Cell
                prop_TITLE="Clicker pour rejoindre la page de contact"
                {prop_FOCUS}
                on:click={cell_eClick.bind(null, 'contact')}
                >
                    "contact"
                </Cell>
                .
            <br>
            <br>
                Vous pouvez retrouver la liste des mots-clés avec la commande

                <Cell
                prop_TITLE={CELL_COMMAND_TITLE}
                {prop_FOCUS}
                on:click={cell_eClick.bind(null, TERMINAL_WORD_REFERENCE + ' keywords')}
                >
                    <span
                    class="command-app"
                    >
                        {TERMINAL_WORD_REFERENCE}
                    </span>
                    <span
                    class="command-name"
                    >
                        keywords
                    </span>
                </Cell>
            </p>
        </section>
    </article>
</div>

<!-- #STYLE -->

<style
lang="scss"
>
/* #USES */

@use 'sass:map';

@use '../../../assets/scss/app';

@use '../../../assets/scss/styles/utils';
@use '../../../assets/scss/styles/font';

@use '../../../assets/scss/styles/media';

/* #TERMINALBACK */

.terminalback
{
    /* transform: rotateY(180deg); */

    overflow: auto;

    .desc
    {
        $margin-top: 2rem;

        @extend %scroll-bar;

        overflow: clip scroll;

        width: 100%;
        height: calc(100% - var(--cell-size) - $margin-top);
        height: -webkit-fill-available;
        max-height: calc(100% - var(--cell-size) - $margin-top);

        margin-top: $margin-top;
        padding-bottom: 1rem;
        padding-right: app.$gap-inline;

        border: solid red 1px;

        box-sizing: border-box;

        h3
        {
            @include font.h-custom($light, map.get(font.$font-sizes, s3), 1.4);

            @include media.min($ms3) { font-size: map.get(font.$font-sizes, s4); }
        }

        h4
        {
            @include font.content($light, $regular: false, $font-size: map.get(font.$font-sizes, s3));

            margin-block: 2.4rem 1.2rem;
        }

        p { @include font.content($light, $font-size: map.get(font.$font-sizes, s2), $line-height: 1.2); }

        span { user-select: text; }

        :global .cell
        {
            padding-inline: 1rem;

            border-bottom: solid $intermediate 1px;

            color: inherit;
            font: inherit;
            text-align: left;
        }

        .command-app { color: $primary; }

        .command-name { color: $indicator; }
    }
}
</style>