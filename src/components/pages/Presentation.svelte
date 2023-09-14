<!-- #MAP

-APP
-EVENT
    PRESENTATION
        WRAPPER
            SNAKE

            CONTENT
                FEATURE
    
                CONTACT

            MASK

-->

<!-- #SCRIPT -->

<script>
// #EXPORTS

    // --PROPS
    export let
    prop_FOCUS = false,
    prop_RATIO = 0,
    prop_START = void 0,
    prop_END = void 0

// #IMPORTS

    // --JS
    import { PRESENTATION_CONTENT_DATAS } from '../../assets/js/datas/dPresentation'
    import { wait_throttle } from '../../assets/js/utils/wait'

    // --CONTEXTS
    import { APP, EVENT } from '../../App.svelte'

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
    const PRESENTATION_EVENTS = { scroll: wait_throttle(presentation_e$Scroll, 20) }

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
    title_INVISIBLE = false,
    title_HEIGHT = 0

    // --ELEMENT-FEATURES
    let
    features_LENGTH, // LENGTH of FEATURES_DATAS + 1 (padding-right in track)
    features_CONTACT_OFFSET_TOP = 0

    // --ELEMENT-MASK
    let mask_RATIO = 0

// #REACTIVE

    // --ELEMENT-PRESENTATION
    $: prop_START != null && prop_END != null ? presentation_setVars() : void 0

// #FUNCTIONS

    // --SET
    function presentation_set()
    {
        presentation_setEvents()

        presentation_CHARGED = true
    }

    function presentation_setVars()
    {
        title_setVars()
        features_setVars()
    }

    function presentation_setEvents() { EVENT.event_add(PRESENTATION_EVENTS) }

    function title_setVars() { title_END = prop_START + window.innerHeight }

    function features_setVars() { features_CONTACT_OFFSET_TOP = prop_START + prop_END - prop_END / features_LENGTH }

    // --DESTROY
    function presentation_destroy() { presentation_destroyEvents() }

    function presentation_destroyEvents() { EVENT.event_remove(PRESENTATION_EVENTS) }

    // --EVENTS
    async function presentation_e$Scroll(scrollTop)
    {
        title_INVISIBLE = APP.app_SMALL_SCREEN && APP.app_SCROLLTOP > title_END ? true : false

        mask_RATIO = scrollTop / prop_START
    }

    async function snake_eClick(i)
    {
        switch (i)
        {
            case 0:
                snake_GAME = true
                break
            case 1:
                snake_ON = !snake_ON
                break
            default: break
        }
    }

    async function contact_eClick() { EVENT.event_scrollTo(features_CONTACT_OFFSET_TOP) }

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
        snake_ON={snake_ON && prop_RATIO < 1}
        bind:snake_GAME
        />

        <Content
        prop_CHARGED={presentation_CHARGED}
        prop_INVISIBLE={title_INVISIBLE}
        {...PRESENTATION_CONTENT_DATAS}
        {prop_FOCUS}
        bind:title_HEIGHT
        >
            <Features
            {prop_FOCUS}
            {prop_RATIO}
            bind:features_LENGTH
            />

            <nav
            style:transform="translateY({title_INVISIBLE ? -title_HEIGHT : 0}px)"
            >
                <ul>
                    <li>
                        <button
                        type="button"
                        on:click={snake_eClick.bind(null, 0)}
                        >
                            ~~JOUER
                        </button>
                    </li>

                    <li>
                        <button
                        type="button"
                        on:click={snake_eClick.bind(null, 1)}
                        >
                            ~~{snake_ON ? 'MASQUER' : 'AFFICHER'}
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

    nav
    {
        position: relative;

        z-index: 1;

        transition: transform .4s ease-out;

        ul
        {
            @extend %f-a-center;
        
            gap: 1rem;
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