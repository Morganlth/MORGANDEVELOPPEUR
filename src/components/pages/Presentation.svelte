<!-- #MAP

-APP
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
    prop_END = void 0,
    prop_DIF = void 0

// #IMPORTS

    // --JS
    import { PRESENTATION_CONTENT_DATAS } from '../../assets/js/datas/dPresentation'
    import { wait_throttle } from '../../assets/js/utils/wait'
    import { transition_wait, transition_fade } from '../../assets/js/utils/transition'

    // --CONTEXTS
    import { APP, COMMAND, EVENT } from '../../App.svelte'

    // --SVELTE
    import { onMount, onDestroy } from 'svelte'

    // --COMPONENT-COVER
    import Content from '../covers/Content.svelte'

    // --COMPONENT-ELEMENTS
    import Snake from '../elements/Snake.svelte'
    import Mask from '../elements/Mask.svelte'
    import Features from '../elements/Features.svelte'

// #CONSTANTES

    // --ELEMENT-PRESENTATION
    const PRESENTATION_EVENTS = { scroll: wait_throttle(presentation_e$Scroll, 20) }

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

    // --ELEMENT-NAV
    const NAV_INTRO_DURATION = 1400

// #VARIABLES

    // --ELEMENT-PRESENTATION
    let presentation_CHARGED = false

    // --ELEMENT-SNAKE
    let
    snake_ON = true,
    snake_GAME = false

    // --ELEMENT-TITLE
    let
    title_END = 0,
    title_DESTROY = false,
    title_HEIGHT = 0

    // --ELEMENT-FEATURES
    let
    features_LENGTH, // LENGTH of FEATURES_DATAS + 1 (padding-right in track)
    features_CONTACT_OFFSET_TOP = 0

    // --ELEMENT-MASK
    let mask_RATIO = 0

// #REACTIVE

    // --ELEMENT-PRESENTATION
    $: prop_TOP != null ? presentation_setVars() : void 0

// #FUNCTIONS

    // --SET
    function presentation_set()
    {
        presentation_setEvents()

        snake_setCommands()

        presentation_CHARGED = true
    }

    function presentation_setVars() // resize by pages
    {
        title_setVars()
        features_setVars()
    }

    function presentation_setEvents() { EVENT.event_add(PRESENTATION_EVENTS) }

    function snake_setCommands() { COMMAND.command_setBasicCommands(SNAKE_COMMANDS) }

    function title_setVars() { title_END = prop_TOP + window.innerHeight }

    function features_setVars() { features_CONTACT_OFFSET_TOP = prop_END - prop_DIF / features_LENGTH }

    // --DESTROY
    function presentation_destroy() { presentation_destroyEvents() }

    function presentation_destroyEvents() { EVENT.event_remove(PRESENTATION_EVENTS) }

    // --UPDATE
    function snake_update(on) { snake_ON = on }

    // --COMMAND
    function snake_c$(on) { COMMAND.command_test(on, 'boolean', snake_update, SNAKE_NAME, snake_ON) }

    // --EVENTS
    async function presentation_e$Scroll(scrollTop)
    {
        title_DESTROY = APP.app_SCROLLTOP > title_END

        mask_RATIO = scrollTop / prop_TOP
    }

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

// #CYCLES

onMount(presentation_set)
onDestroy(presentation_destroy)
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
        prop_INTRO={prop_INTRO && !title_DESTROY}
        {...PRESENTATION_CONTENT_DATAS}
        {prop_FOCUS}
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
                style:--nav-duration="{NAV_INTRO_DURATION}ms"
                style:transform="translateY({title_DESTROY ? -title_HEIGHT : 0}px)"
                in:transition_wait={{ duration: NAV_INTRO_DURATION }}
                out:transition_fade={{ duration: 600 }}
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
        prop_COORDS={[65, 50]}
        prop_GRADIENT={[50, 90]}
        prop_RATIO={mask_RATIO}
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
    @include position.placement(absolute, 0, 0, auto, 0);

    @extend %any;

    .wrapper { @extend %wrapper; }

    .nav
    {
        position: relative;

        z-index: 1;

        transition: transform .4s ease-out;

        &.top ul { border-top-color: transparent !important; }

        ul
        {
            @extend %f-a-center;

            position: relative;
        
            gap: 1rem;

            transform: translateX(0) rotate(90deg);

            width: max(100vw, 100vh);

            padding-block: 1rem;

            border-top: solid $light 1px;

            transition: border .8s;

            animation: aIntro var(--nav-duration) ease-in-out forwards;

            @keyframes aIntro
            {
                60% { border-top-color: $light; }
                70% { transform: translateX(-90%) rotate(0); }  
                100%
                {
                    transform: translateX(0) rotate(0);

                    border-top-color: $intermediate;
                }    
            }
        }

        li button
        {
            @include font.interact($light, map.get(font.$font-sizes, s3), 1, map.get(font.$content-font-weight, w1));
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