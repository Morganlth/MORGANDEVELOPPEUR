<!-- #MAP

-EVENT
    FEATURES
        TRACK * 2
            TOPIC * n
        TRACK
            
-->

<!-- #SCRIPT -->

<script>
// #EXPORT

    // --PROP
    export let
    prop_FOCUS = false,
    prop_RATIO = 0

// #IMPORTS

    // --JS
    import FEATURES_DATAS from '../../assets/js/datas/dFeature'

    // --CONTEXT
    import { EVENT } from '../../App.svelte'

    // --SVELTE
    import { onMount, onDestroy } from 'svelte'

// #CONSTANTE

    // --ELEMENT-FEATURES
    const FEATURES_EVENTS = { resize: features_e$Resize }

// #VARIABLES

    // --ELEMENT-TRACK
    let track_ROTATE = 0

    // --ELEMENT-TOPIC
    let topic_WIDTH = 0

// #REACTIVE

    // --ELEMENT-TRACK
    $: track_TRANSLATE_Z = Math.abs(Math.sin(prop_RATIO * Math.PI * FEATURES_DATAS.length)) * 100

// #FUNCTIONS

    // --SET
    function features_set()
    {
        features_setVars()
        features_setEvents()
    }

    function features_setVars()
    {
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

    // --EVENT
    async function features_e$Resize() { features_setVars() }

// #CYCLES

onMount(features_set)
onDestroy(features_destroy)
</script>

<!-- #HTML -->

<div
class="features"
class:focus={prop_FOCUS}
>
    <div
    class="track"
    style:transform="rotate({-track_ROTATE}rad) translate3d(calc(100% * {1 - prop_RATIO}), -50%, {track_TRANSLATE_Z}px)"
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
    style:transform="rotate({-track_ROTATE + Math.PI}rad) translate3d(calc(-100% * {prop_RATIO}), 50%, {track_TRANSLATE_Z}px)"
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
    style:transform="translate3d(calc(-100% * {prop_RATIO}), -50%, {-track_TRANSLATE_Z}px)"
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
</div>

<!-- #STYLE -->

<style
lang="scss"
>
/* #USES */

@use 'sass:map';

@use '../../assets/scss/app';

@use '../../assets/scss/styles/utils';
@use '../../assets/scss/styles/position';
@use '../../assets/scss/styles/display';
@use '../../assets/scss/styles/font';

/* #FEATURES */

.features
{
    @include position.placement(absolute, 0, 0, 0, 0);

    width: 100vw;
    height: 100%;

    perspective: 200px;

    margin-left: 5%;

    &.focus .track { will-change: transform; }

    .track
    {
        @include utils.solid-border(1px, $intermediate, true, false, true, false);
    
        display: flex;

        transform-style: preserve-3d;

        width: fit-content;
        height: fit-content;

        transition: transform .5s ease-out;

        &:nth-child(1)
        {
            @include position.placement(absolute, 0, 0, auto, auto);

            transform-origin: top right;

            color: $primary;
            line-height: 2.5;
        }
        &:nth-child(2)
        {
            @include position.placement(absolute, auto, auto, 0, 0);

            transform-origin: bottom left;

            color: $intermediate;
            line-height: 2.7;
        }
        &:nth-child(3)
        {
            @include position.placement(absolute, 50%, auto, auto, 0);

            margin-left: 100vw;
        }

        &>* { flex-shrink: 0; }

        .topic
        {
            @include font.h-custom(inherit, var(--title-size, map.get(font.$font-sizes, s7)), inherit);
    
            @extend %m-h-2;

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
                @include font.interact($light, map.get(font.$font-sizes, s3), 2.5, map.get(font.$content-font-weight, w1));
    
                padding-left: app.$gap-inline;
            }

            a
            {
                @include font.simple-hover($primary);

                pointer-events: auto;

                font-weight: map.get(font.$content-font-weight, w2);
        
                cursor: pointer;
            }
        }
    }
}
</style>