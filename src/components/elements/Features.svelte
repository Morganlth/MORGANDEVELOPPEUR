<!-- #MAP

    FEATURES
        TRACK * 2
            TOPIC * n
        TRACK
            
-->

<!-- #SCRIPT -->

<script>
// #EXPORTS

    // --PROPS
    export let
    prop_OFFSET_TOP = 0,
    prop_BREAK = 0

// #IMPORTS

    // --JS
    import FEATURES_DATAS from '../../assets/js/datas/dFeature'
    import { wait_throttle } from '../../assets/js/utils/wait'

    // --CONTEXT
    import { EVENT } from '../../App.svelte'

    // --SVELTE
    import { onMount, onDestroy } from 'svelte'

    // --COMPONENT-ELEMENT
    import Mask from './Mask.svelte'

// #CONSTANTE

    // --ELEMENT-FEATURES
    const FEATURES_EVENTS =
    {
        scroll: wait_throttle(features_e$Scroll, 20),
        resize: features_e$Resize
    }

// #VARIABLES

    // --ELEMENT-FEATURES
    let
    features_START,
    features_END,
    features_SCROLL_RATIO = 0

    // --ELEMENT-TRACK
    let track_ROTATE = 0

    // --ELEMENT-TOPIC
    let topic_WIDTH = 0

// #FUNCTIONS

    // --SET
    function features_set()
    {
        features_setVars()
        features_setEvents()
    }

    function features_setVars()
    {
        const HEIGHT = window.innerHeight
    
        features_START = HEIGHT * prop_OFFSET_TOP
        features_END = HEIGHT * prop_BREAK

        track_setVars()
        topic_setVars()
    }

    function features_setEvents() { EVENT.event_add(FEATURES_EVENTS) }

    function track_setVars() { track_ROTATE = Math.atan(window.innerHeight / window.innerWidth) }

    function topic_setVars()
    {
        const [WIDTH, HEIGHT] = [window.innerWidth, window.innerHeight]
    
        topic_WIDTH = Math.sqrt(WIDTH * WIDTH + HEIGHT * HEIGHT)
    }

    // --DESTROY
    function features_destroy() { features_destroyEvents() }

    function features_destroyEvents() { EVENT.event_remove(FEATURES_EVENTS) }

    // --EVENTS
    function features_e$Scroll(scrollTop) { features_SCROLL_RATIO = (scrollTop - features_START) / features_END } // THROTTLE

    async function features_e$Resize() { features_setVars() }

// #CYCLES

onMount(features_set)
onDestroy(features_destroy)
</script>

<!-- #HTML -->

<div
class="features"
>
    <div
    class="track"
    style:transform="rotate({-track_ROTATE}rad) translate(calc(100% * {1 - features_SCROLL_RATIO}), -50%)"
    >
        {#each FEATURES_DATAS as data}
            <p
            class="topic"
            style:transform="rotate({track_ROTATE}rad)"
            style:width="{topic_WIDTH}px"
            >
                {data.topic[0]}
            </p>
        {/each}
    </div>

    <div
    class="track"
    style:transform="rotate({-track_ROTATE + Math.PI}rad) translate(calc(-100% * {features_SCROLL_RATIO}), 50%)"
    >
        {#each FEATURES_DATAS as data}
            <p
            class="topic"
            style:transform="rotate({track_ROTATE + Math.PI}rad)"
            style:width="{topic_WIDTH}px"
            >
                {data.topic[data.topic.length - 1]}
            </p>
        {/each}
    </div>

    <div
    class="track"
    style:transform="translate(calc(-100% * {features_SCROLL_RATIO}), -50%)"
    >
        {#each FEATURES_DATAS as data}
            <ul>
                {#each data.contents as content}
                    <li>
                        <svelte:element
                        this={content.htmlElement}
                        >
                            {content.data}.
                        </svelte:element>
                    </li>
                {/each}
            </ul>
        {/each}
    </div>

    <Mask
    prop_SHADOW={true}
    prop_GRADIENT={[30, 93]}
    prop_RATIO={features_SCROLL_RATIO <= 0 ? 0 : 1}
    />
</div>

<!-- #STYLE -->

<style
lang="scss"
>
/* #USES */

@use 'sass:map';

@use '../../assets/scss/app';

@use '../../assets/scss/styles/position';
@use '../../assets/scss/styles/display';
@use '../../assets/scss/styles/size';
@use '../../assets/scss/styles/font';

/* #FEATURES */

.features
{
    @include position.placement(absolute, 0, 0, 0, 0);

    @extend %any;

    .track
    {
        display: flex;

        width: fit-content;
        height: fit-content;

        transition: transform .5s ease-out;

        &:nth-child(1)
        {
            @include position.placement(absolute, 0, 0, auto, auto);

            transform-origin: top right;
        }
        &:nth-child(2)
        {
            @include position.placement(absolute, auto, auto, 0, 0);

            transform-origin: bottom left;
        }
        &:nth-child(3)
        {
            @include position.placement(absolute, 50%, auto, auto, 0);

            margin-left: 100vw;
        }

        &>* { flex-shrink: 0; }

        .topic
        {
            @include font.h-custom($primary, 11rem);

            font-style: italic;
            text-align: center;
        }
        
        ul
        {
            @extend %f-j-center;
    
            min-width: max(100vw, 100vh);
            height: fit-content;

            li
            {
                @include font.interact($light, map.get(font.$font-sizes, s3), 1, map.get(font.$content-font-weight, w1));
    
                padding-left: app.$gap-inline;
            }

            a
            {
                @include font.simple-hover($indicator);

                pointer-events: auto;

                cursor: pointer;
            }
        }
    }
}
</style>