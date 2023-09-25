<!-- #MAP

-COMMAND
-EVENT
    PRESENTATION
        WRAPPER
            SNAKE

            CONTENT
                FEATURE
    
                #if NAV
                    CONTACT

            MASK

-->

<!-- #SCRIPT -->

<script>
// #EXPORTS

    // --PROPS
    export let
    prop_FOCUS = false,
    prop_INTRO = false,
    prop_RATIO = 0,
    prop_TOP = void 0,
    prop_START = void 0,
    prop_END = void 0,
    prop_DIF = void 0

// #IMPORTS

    // --JS
    import { PRESENTATION_CONTENT_DATAS } from '../../assets/js/datas/dPresentation'

    // --CONTEXTS
    import { COMMAND, EVENT } from '../../App.svelte'

    // --SVELTE
    import { onMount } from 'svelte'

    // --COMPONENT-COVER
    import Content from '../covers/Content.svelte'

    // --COMPONENT-ELEMENTS
    import Snake from '../elements/Snake.svelte'
    import Mask from '../elements/Mask.svelte'
    import Features from '../elements/Features.svelte'

// #CONSTANTES

    // --ELEMENT-SNAKE
    const
    SNAKE_NAME = 'snake',
    SNAKE_COMMANDS =
    [
        {
            name: SNAKE_NAME,
            callback: snake_c$,
            params: { defaultValue: true },
            tests: { testBoolean: true },
            storage: true
        }
    ]

// #VARIABLES

    // --ELEMENT-PRESENTATION
    let
    presentation_CHARGED = false,
    presentation_RATIO_START_DIF = 0

    // --ELEMENT-SNAKE
    let
    snake_ON = true,
    snake_GAME = false

    // --ELEMENT-TITLE
    let title_HEIGHT = 0

    // --ELEMENT-FEATURES
    let
    features_LENGTH, // LENGTH of FEATURES_DATAS + 1 (padding-right in track)
    features_CONTACT_OFFSET_TOP = 0

// #REACTIVE

    // --ELEMENT-PRESENTATION
    $: prop_TOP != null ? presentation_setVars() : void 0

// #FUNCTIONS

    // --SET
    function presentation_set()
    {
        snake_setCommands()

        presentation_CHARGED = true
    }

    function presentation_setVars() // resize by pages
    {
        presentation_RATIO_START_DIF = prop_DIF / prop_START

        features_setVars()
    }

    function snake_setCommands() { COMMAND.command_setBasicCommands(SNAKE_COMMANDS) }

    function features_setVars() { features_CONTACT_OFFSET_TOP = prop_END - prop_DIF / features_LENGTH }

    // --UPDATE
    function snake_update(on) { snake_ON = on }

    // --COMMAND
    function snake_c$(on) { COMMAND.command_test(on, 'boolean', snake_update, SNAKE_NAME, snake_ON) }

    // --EVENTS
    async function snake_eClick(i)
    {
        switch (i)
        {
            case 0:
                snake_GAME = true
                break
            case 1:
                COMMAND.command_COMMANDS[SNAKE_NAME](!snake_ON)
                break
            default: break
        }
    }

    async function contact_eClick() { EVENT.event_scrollTo(features_CONTACT_OFFSET_TOP, 'instant') }

// #CYCLE

onMount(presentation_set)
</script>

<!-- #HTML -->

<div
id="presentation"
style:z-index={prop_FOCUS ? 1 : 0}
>
    <div
    class="wrapper"
    >
        <Snake
        prop_ON={snake_ON && prop_RATIO < 1}
        bind:snake_GAME
        />

        <Content
        prop_CHARGED={presentation_CHARGED}
        {...PRESENTATION_CONTENT_DATAS}
        {prop_FOCUS}
        {prop_INTRO}
        bind:title_HEIGHT
        >
            <Features
            {prop_FOCUS}
            {prop_RATIO}
            bind:features_LENGTH
            />

            {#if prop_FOCUS}
                <nav
                class="nav"
                class:top={!prop_INTRO}
                style:--nav-translate-y="{-title_HEIGHT}px"
                >
                    <ul>
                        <li>
                            <button
                            type="button"
                            title="Jouer au jeu du serpent revisité"
                            on:click={snake_eClick.bind(null, 0)}
                            >
                                JOUER
                            </button>
                        </li>

                        <li>
                            <button
                            type="button"
                            title="{snake_ON ? 'Masque' : 'Affiche'} le serpent"
                            on:click={snake_eClick.bind(null, 1)}
                            >
                                {snake_ON ? 'MASQUER' : 'AFFICHER'}
                            </button>
                        </li>
        
                        <li>
                            <button
                            class="contact"
                            type="button"
                            title="Page de contact"
                            on:click={contact_eClick}
                            >
                                CONTACT
                            </button>
                        </li>
                    </ul>
                </nav>
            {/if}
        </Content>

        <Mask
        prop_SHADOW={true}
        prop_COORDS={[45, -10]}
        prop_GRADIENT={[50, 90]}
        prop_RATIO={prop_RATIO * presentation_RATIO_START_DIF + 1}
        />
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
@use '../../assets/scss/styles/position';
@use '../../assets/scss/styles/display';
@use '../../assets/scss/styles/size';
@use '../../assets/scss/styles/font';

/* #PRESENTATION */

#presentation
{
    @include position.placement(absolute, $top: 0, $right: 0, $left: 0);

    @extend %any;

    .wrapper { @extend %wrapper; }

    .nav
    {
        $animation-duration: 1.4;
        
        &::before
        {
            @include position.placement(absolute, $top: 0, $right: 0, $left: 0, $pseudo-element: true);

            transform: translateX(0) rotate(90deg);

            width: 100%;
            height: 0;

            border-top: solid $light 1px;

            transition: border .8s;

            animation: aBeforeIntro #{$animation-duration}s ease-in-out forwards;

            @keyframes aBeforeIntro
            {
                50% { border-top-color: $light; }
                70% { transform: translateX(-90%) rotate(0); }  
                100%
                {
                    transform: translateX(0) rotate(0);

                    border-top-color: $intermediate;
                }    
            }
        }
    
        position: relative;

        z-index: 1;

        transition: transform .4s ease-out;

        &.top
        {
            &::before { border-top-color: transparent !important; }

            transform: translateY(var(--nav-translate-y, -320%));
        }

        ul
        {
            @extend %f-a-center;
        
            gap: 1rem;

            transform: translateX(-100%);

            opacity: 0;
    
            width: 100%;

            padding-block: 1rem;

            animation: aUlIntro  #{$animation-duration * .3}s  #{$animation-duration * .7}s ease-in-out forwards;

            @keyframes aUlIntro
            {
                100%
                {
                    transform: translateX(0);
            
                    opacity: 1;
                }
            }
        }

        li button
        {
            @include font.content($light, $font-size: map.get(font.$font-sizes, s3));
            @include font.simple-hover;

            @extend %button-reset;

            padding-block: .5rem;

            pointer-events: auto;
        }

        li:first-child button { padding-right: 1rem; }
        li button:not(li:first-child button) { padding-inline: 1rem; }
    }
}
</style>