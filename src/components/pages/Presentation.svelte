<!-- #MAP

-EVENT
    PRESENTATION
        WRAPPER
            SNAKE

            CONTENT
                FEATURE
                GAME
                CONTACT

            MASK

-->

<!-- #SCRIPT -->

<script>
// #EXPORTS

    // --PROPS
    export let
    prop_FOCUS = false,
    prop_OFFSET_TOP = 0,
    prop_BREAK = 0

// #IMPORTS

    // --JS
    import { PRESENTATION_CONTENT_DATAS } from '../../assets/js/datas/dPresentation'
    import { wait_throttle } from '../../assets/js/utils/wait'

    // --CONTEXT
    import { EVENT } from '../../App.svelte'

    // --SVELTE
    import { onMount, onDestroy } from 'svelte'

    // --COMPONENT-COVER
    import Content from '../covers/Content.svelte'

    // --COMPONENT-ELEMENTS
    import Snake from '../elements/Snake.svelte'
    import Mask from '../elements/Mask.svelte'
    import Features from '../elements/Features.svelte'

// #CONSTANTE

    // --ELEMENT-PRESENTATION
    const PRESENTATION_EVENTS =
    {
        scroll: wait_throttle(presentation_e$Scroll, 20),
        resize: presentation_e$Resize
    }

// #VARIABLES

    // --ELEMENT-PRESENTATION
    let
    presentation_CHARGED = false,
    presentation_START,
    presentation_END,
    presentation_SCROLL_RATIO = 0

    // --ELEMENT-SNAKE
    let snake_GAME = false

    // --ELEMENT-MASK
    let mask_SCROLL_RATIO = 0

// #FUNCTIONS

    // --SET
    function presentation_set()
    {
        presentation_setVars()
        presentation_setEvents()

        presentation_CHARGED = true
    }

    function presentation_setVars()
    {
        const HEIGHT = window.innerHeight
    
        presentation_START = HEIGHT * prop_OFFSET_TOP
        presentation_END = HEIGHT * (prop_BREAK - 1)
    }

    function presentation_setEvents() { EVENT.event_add(PRESENTATION_EVENTS) }

    // --DESTROY
    function presentation_destroy() { presentation_destroyEvents() }

    function presentation_destroyEvents() { EVENT.event_remove(PRESENTATION_EVENTS) }

    // --EVENTS
    function presentation_e$Scroll(scrollTop) // THROTTLE
    {
        presentation_SCROLL_RATIO = (scrollTop - presentation_START) / presentation_END

        mask_SCROLL_RATIO = scrollTop / presentation_START
    }

    async function presentation_e$Resize() { presentation_setVars() }

    async function snake_eClick() { snake_GAME = true }

    async function contact_eClick() { EVENT.event_scrollTo((prop_OFFSET_TOP + prop_BREAK - 1) * window.innerHeight) }

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
        bind:snake_GAME
        />

        <Content
        prop_CHARGED={presentation_CHARGED}
        {...PRESENTATION_CONTENT_DATAS}
        {prop_FOCUS}
        >
            <Features
            prop_RATIO={presentation_SCROLL_RATIO}
            {prop_FOCUS}
            />

            <nav>
                <ul>
                    <li>
                        <button
                        class="game"
                        type="button"
                        on:click={snake_eClick}
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

        <Mask
        prop_SHADOW={true}
        prop_GRADIENT={[30, 93]}
        prop_RATIO={mask_SCROLL_RATIO}
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

    nav
    {
        position: relative;

        z-index: 1;

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