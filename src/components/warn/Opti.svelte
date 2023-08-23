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

// #IMPORT

    // --CONTEXT
    import { APP } from '../../App.svelte'

// #VARIABLE

    // --ELEMENT-OPTI
    let opti_OPACITY = 1

// #FUNCTION

    // --SET
    function opti_setMode(on)
    {
        opti_OPACITY = 0

        APP.app_OPTIMISE = on

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
                <h6>- LA CONSOLE</h6>
    
                <p>
                    Si vous souhaitez redéfinir les paramètres par défaut, vous pouvez passer par la commande
                    
                    <span
                    class="command"
                    >
                        <span>app</span>
                        <span>reset</span>
                    </span>
                    
                    dans la <span>Console</span> (selon les dimensions des écrans la <span>Console</span> n'est pas toujours affichée).
                    <br>
                    Vous retrouvez la liste des commandes dans la section <span>commande</span> de la <span>Console</span>.
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
    
        backdrop-filter: blur(20px);

        transition: opacity .4s;

        &>section
        {
            width: 90%;
            height: fit-content;
        }

        h5
        {
            #{--title-size}: map.get(font.$font-sizes, s4);
    
            @include font.h-(2);

            height: min-content;

            margin-bottom: 2rem;
        }

        h6
        {
            @include font.h-(4);

            margin-block: 1rem .3rem;
        }
    
        .content>section { box-sizing: border-box; }

        p
        {
            @include font.interact($light, map.get(font.$font-sizes, s2), 1.3, map.get(font.$content-font-weight, w1));

            margin-bottom: .8rem;
    
            text-align: justify;

            &>span { font-weight: map.get(font.$content-font-weight, w2); }
    
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
            margin-top: 1.3rem;

            text-align: right;

            button
            {
                @include font.interact($light);

                @extend %button-reset;
        
                margin-bottom: 1rem;
                padding: .8rem 1.6rem;

                &:nth-child(1)
                {
                    border: solid $primary 1px;

                    &:hover { color: $primary; }
                }
                &:nth-child(2)
                {
                    margin-left: 1rem;

                    border: solid $indicator 1px;
            
                    &:hover { color: $indicator; }
                }
            }
        }

        @include media.min($ms4, $ms4)
        {
            &>section
            {
                display: flex; /* @extend %f-a-center; ne fonctionne pas dans media queries */
                align-items: center;
    
                width: 74%;
            }

            h5
            {
                #{--title-size}: map.get(font.$font-sizes, s5);
    
                margin-right: app.$gap-block;
                margin-bottom: 0;

                writing-mode: vertical-rl;
            }

            h6 { margin-block: app.$gap-block 1rem; }

            .choice {margin-top: app.$gap-block; }
        }
        @include media.min($ms6, $ms4)
        {
            &>section { width: 52%; }
        }
    }
</style>