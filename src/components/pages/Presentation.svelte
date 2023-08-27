<!-- #MAP

-EVENT
    PRESENTATION
        WRAPPER
            SNAKE

            FEATURE

            CONTENT
                GAME
                CONTACT

-->

<!-- #SCRIPT -->

<script>
// #EXPORTS

    // --PROPS
    export let
    prop_FOCUS = false,
    prop_HEIGHT = 0,
    prop_OFFSET_TOP = 0,
    prop_BREAK = 0

// #IMPORTS

    // --JS
    import { PRESENTATION_CONTENT_DATAS } from '../../assets/js/datas/dPresentation'

    // --CONTEXT
    import { EVENT } from '../../App.svelte'

    // --SVELTE
    import { onMount } from 'svelte'

    // --COMPONENT-COVER
    import Content from '../covers/Content.svelte'

    // --COMPONENT-ELEMENTS
    import Snake from '../elements/Snake.svelte'
    import Features from '../elements/Features.svelte'

// #VARIABLE

    // --ELEMENT-PRESENTATION
    let presentation_CHARGED = false

// #FUNCTIONS

    // --SET
    function presentation_set() { presentation_setVars() }

    function presentation_setVars() { presentation_CHARGED = true }

    // --EVENT
    async function contact_eClick() { EVENT.event_scrollTo((prop_HEIGHT - 1) * window.innerHeight) }

// #CYCLE

onMount(presentation_set)
</script>

<!-- #HTML -->

<div
id="presentation"
style:height="{prop_HEIGHT * 100}vh"
>
    <div
    class="wrapper"
    >
        <Snake />

        <Features
        {prop_OFFSET_TOP}
        {prop_BREAK}
        />

        <Content
        prop_CHARGED={presentation_CHARGED}
        {...PRESENTATION_CONTENT_DATAS}
        {prop_FOCUS}
        >
            <nav>
                <ul>
                    <li>
                        <button
                        class="game"
                        type="button"
                        >
                            ~~JOUER
                        </button>
                    </li>
    
                    <li>
                        <button
                        class="contact"
                        type="button"
                        on:click={contact_eClick}
                        >
                            ~~CONTACT
                        </button>
                    </li>
                </ul>
            </nav>
        </Content>
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
@use '../../assets/scss/styles/font';

/* #PRESENTATION */

#presentation
{
    @include position.placement(absolute, 0, 0, auto, 0);

    width: 100%;

    .wrapper { @extend %wrapper; }

    nav
    {
        ul
        {
            @extend %f-a-center;
        
            gap: 1rem;
        }

        .game, .contact
        {
            @include font.interact($light, map.get(font.$font-sizes, s3), 1, map.get(font.$content-font-weight, w1));
            @include font.simple-hover;

            @extend %button-reset;

            padding-block: .5rem;

            pointer-events: auto;
        }

        .game { padding-right: 1rem; }

        .contact { padding-inline: 1rem; }
    }
}
</style>