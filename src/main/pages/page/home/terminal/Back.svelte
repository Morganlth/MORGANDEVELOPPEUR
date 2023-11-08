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
class="back"
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


// #\-EXPORTS-\

    // --PROPS
    export let
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
    const DESC_EXEMPLE =
    {
        ref: TERMINAL_WORD_REFERENCE,
        command: 'success',
        params: 'Le terminal, Mon Succès'
    }

    const CELL_COMMAND_TITLE = 'Clicker pour éxécuter la commande'


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


/* #\-GLOBAL-\ */

    /* --* */


/* #\-THIS-\ */

.back
{
    @include utils.placement(absolute, $top: 0, $right: 0, $bottom: 0);
    
    transform: rotateY(180deg);

    height: 100%;

    .desc
    {
        $margin-top: 1rem;

        @extend %scroll-bar;

        overflow: clip scroll;

        height: calc(100% - var(--cell-size) - $margin-top);

        margin-top: $margin-top;
        padding-bottom: 1rem;
        padding-right: app.$gap-inline;

        background-color: $dark;

        box-sizing: border-box;

        &>* { pointer-events: none; }

        h3 { @include font.h-(4, $light, 1.4); }

        h4
        {
            @include font.text($light, $regular: false, $font-size: map.get(font.$font-sizes, s3));

            margin-block: 2.4rem 1.2rem;
        }

        p { @include font.text($light, $font-size: map.get(font.$font-sizes, s2), $line-height: 1.2); }

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