<!----------------------------------------------- #||--warn--|| -->


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
class="warn"
transition:transition_fade={{ duration: 400 }}
>
    <article>
        <h1>RESSOURCES LIMITEES</h1>

        <section>
            <h2>OPTIMISATION</h2>

            <p>
                Votre machine ne permet pas une expérience optimale.
                <br>
                Je vous recommande de sélectionner l'option d'optimisation ci-dessous.
                <br>
                Le site web fera de son mieux pour amméliorer les performances.
                <br>
                Néanmoins, certains élements seront désactivés ou ralentis.
            </p>
        </section>
    
        <section>
            <h2>TERMINAL</h2>

            <p>
                Le terminal est un élément utilitaire qui vous permet de modifier certains paramètres.
                <br>
                Il est accessible en cliquant sur le 3ème cube (en bas à droite de l'écran) dans la section accueil/home.
                <br>
                Si vous sélectionner l'option d'optimisation, la commande

                <span
                class="command"
                >
                    <span>{TERMINAL_WORD_REFERENCE}</span>
                    <span>optimise</span>
                    <span>t</span>
                </span>
            
                sera éxécuté.
                <br>
                <br>
                Dans le cas ou vous souhaitez redéfinir les paramètres par défaut, vous pouvez utiliser la commande
                
                <span
                class="command"
                >
                    <span>{TERMINAL_WORD_REFERENCE}</span>
                    <span>reset</span>
                </span>
                
                dans le terminal.
            </p>
        </section>

        <div>
            <button
            type="button"
            title="conseillé"
            on:click={warn_eClick.bind(null, true)}
            >
                OPTIMISER LES PERFORMANCES
            </button>

            <button
            type="button"
            title="déconseillé"
            on:click={warn_eClick.bind(null, false)}
            >
                GARDER LES OPTIONS ACTUELLES
            </button>
        </div>
    </article>
</div>


<!-- #|-SCRIPT-| -->

<script>

// #\-IMPORTS-\

    // --DATA

    // --SVELTE

    // --LIB
    import { transition_fade } from '$lib/transition'

    // --CONTEXTS
    import { APP } from '../App.svelte'

    import { TERMINAL_WORD_REFERENCE } from '../main/pages/page/home/terminal/Terminal.svelte'

//=======@COMPONENTS|

    // --*

//=======@STYLE|

    // --*


// #\-EXPORTS-\

    // --PROPS

    // --BINDING
    export let warn_ACTIVE = true


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
    function app_updateOptimise(optimise) { APP.app_$OPTIMISE = optimise }

    function warn_update() { warn_ACTIVE = false }

    // --DESTROY


//=======@COMMANDS|

    // --*


//=======@EVENTS|

    // --*


//=======@TRANSITIONS|

    // --*
    async function warn_eClick(active)
    {
        app_updateOptimise(active)

        warn_update()
    }


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
    @use '../assets/scss/app';

    /* --DEPENDENCIES */
    @use '../assets/scss/styles/utils';
    @use '../assets/scss/styles/display';
    @use '../assets/scss/styles/font';

    /* --MEDIA  */


/* #\-VARIABLES-\ */

    /* --* */


/* #\-THIS-\ */

.warn
{
    &, h1, article { @extend %any-size; }

    @include utils.placement(fixed, 0, 0, 0, 0, 4); /* header / spring / footer */

    h1
    {
        --title-size: 30rem;

        @include utils.placement(absolute, 0, 0, 0, 0, -1);
        @include font.h-($color: $indicator, $line-height: .8);

        @extend %f-a-center;

        opacity: .2;

        word-break: break-all;
        writing-mode: vertical-rl;
    }

    article
    {
        @extend %f-column-center;

        max-width: 88rem;

        margin-inline: auto;
        padding: app.$gap-block app.$gap-inline;

        box-sizing: border-box;
    }

    section { width: 100%; }

    h2
    {
        @include font.h-(4, $light);

        margin-block: app.$gap-block 1rem;
        padding-left: app.$gap-inline;
    }

    p
    {
        @include font.text($color: $light, $font-size: map.get(font.$font-sizes, s2), $line-height: 1.3);

        margin-bottom: .8rem;

        text-align: justify;

        &>span { font-family: map.get(font.$family-text-bold-map, t0) !important; }

        .command
        {
            padding: .1rem 1rem .4rem;
    
            background-color: $dark;
    
            span:nth-child(1) { color: $primary; }
            span:nth-child(2) { color: $indicator; }
        }
    }

    article>div
    {
        @include font.text($color: $light, $regular: false);

        margin-top: app.$gap-block;

        button
        {
            padding: .8rem 1.6rem;

            border: solid var(--btn-color, $primary) 1px;

            color: inherit;
            font: inherit;

            &:hover { color: var(--btn-color, $primary); }

            &:nth-child(1) { #{--btn-color}: $primary; }
            
            &:nth-child(2) { #{--btn-color}: $indicator; }
        }
    }
}


</style>