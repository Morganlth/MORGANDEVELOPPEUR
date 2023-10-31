<!-- #MAP

-APP
    OPTI
        \ CONTENT
            \ COMMAND
            \ CHOICE

-->

<!-- #SCRIPT -->

<script>
// #EXPORT

    // --BIND
    export let opti_ON = true

// #IMPORTS

    // --CONTEXTS
    import { APP } from '../../App.svelte'
    import { TERMINAL_WORD_REFERENCE } from '../elements/terminal/Terminal.svelte'

// #VARIABLE

    // --ELEMENT-OPTI
    let opti_OPACITY = 1

// #FUNCTION

    // --SET
    function opti_setMode(on)
    {
        opti_OPACITY = 0

        APP.app_$OPTIMISE = on

        setTimeout(() => opti_ON = false, 500)
    }
</script>

<!-- #HTML -->

<div
class="opti"
style:opacity={opti_OPACITY}
>
    <section>
        <h5>RESSOURCES LIMITEES</h5>

        <div
        class="content"
        >
            <section>
                <h6>- OPTIMISATION</h6>

                <p>Votre machine ne permet pas une expérience optimale.</p>
    
                <p>
                    Vous pouvez choisir d'optimiser les <span>performances</span>.
                    <br>
                    Certains paramètres seront désactivés.
                    <br>
                    De plus, ce message d'alerte ne s'affichera plus lors de vos prochains passages.
                </p>
            </section>
    
            <section>
                <h6>- TERMINAL</h6>
    
                <p>
                    Si vous souhaitez redéfinir les paramètres par défaut, vous pouvez passer par la commande
                    
                    <span
                    class="command"
                    >
                        <span>{TERMINAL_WORD_REFERENCE}</span>
                        <span>reset</span>
                    </span>
                    
                    dans le <span>Terminal</span> (selon les dimensions des écrans le <span>Terminal</span> n'est pas toujours affichée).
                    <br>
                    Vous retrouvez la liste des commandes en utilisant

                    <span
                    class="command"
                    >
                        <span>{TERMINAL_WORD_REFERENCE}</span>
                        <span>commands</span>
                    </span>
                </p>
            </section>

            <div
            class="choice"
            >
                <button
                type="button"
                title="conseillé"
                on:click={opti_setMode.bind(null, true)}
                >
                    OPTIMISER LES PERFORMANCES
                </button>

                <button
                type="button"
                title="déconseillé"
                on:click={opti_setMode.bind(null, false)}
                >
                    GARDER LES OPTIONS ACTUELLES
                </button>
            </div>
        </div>
    </section>
</div>

<!-- #STYLE -->

<style
lang="scss"
>
    /* #USES */

    @use 'sass:map';

    @use '../../assets/scss/app';

    @use '../../assets/scss/styles/elements';
    @use '../../assets/scss/styles/position';
    @use '../../assets/scss/styles/display';
    @use '../../assets/scss/styles/size';
    @use '../../assets/scss/styles/font';
    @use '../../assets/scss/styles/media';

    /* #ECOPOPUP */

    .opti
    {
        @include position.placement(fixed, 0, 0, 0, 0);
    
        @extend %f-center;
        @extend %any;

        z-index: 1;

        transition: opacity .4s;

        &>section
        {
            width: 90%;
            height: fit-content;
        }

        h5
        {
            --title-size: 30rem;
    
            @include position.placement(absolute, 0, 0, 0, 0);
            @include font.h-custom($indicator, $line-height: .8);

            @extend %f-a-center;
            @extend %any;

            z-index: -1;

            opacity: .2;

            word-break: break-all;
            writing-mode: vertical-rl;
        }

        h6
        {
            @include font.h-custom($light);

            margin-block: app.$gap-block 1rem;
        }
    
        .content>section { box-sizing: border-box; }

        p
        {
            @include font.content($light, $font-size: map.get(font.$font-sizes, s2), $line-height: 1.3);

            margin-bottom: .8rem;
    
            text-align: justify;

            &>span { font-family: font.$family-content-bold !important; }
    
            .command
            {
                padding: .1rem 1rem .4rem;
        
                background-color: $dark;
        
                span:nth-child(1) { color: $primary; }
                span:nth-child(2) { color: $indicator; }
            }
        }

        .choice
        {
            display: flex;
            flex-wrap: wrap;

            gap: 1rem;
    
            margin-top: 1.3rem;

            button
            {
                @include font.content($light, false);

                @extend %button-reset;

                padding: .8rem 1.6rem;

                border: solid var(--btn-color, $primary) 1px;

                &:hover { color: var(--btn-color, $primary); }

                &:nth-child(1) { #{--btn-color}: $primary; }
                
                &:nth-child(2) { #{--btn-color}: $indicator; }
            }
        }

        @include media.min($ms4, $ms4)
        {
            &>section { width: 74%;}

            h5
            {
                margin-right: app.$gap-block;
                margin-bottom: 0;
            }

            .choice { margin-top: app.$gap-block; }
        }
        @include media.min($ms6, $ms4) { &>section { width: 34%; } }
    }
</style>