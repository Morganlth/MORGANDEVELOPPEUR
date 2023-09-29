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

    // --BIND
    export let features_LENGTH = FEATURES_DATAS.length + 1

// #IMPORTS

    // --JS
    import FEATURES_DATAS from '../../assets/js/datas/dFeature'

    // --CONTEXT
    import { EVENT } from '../../App.svelte'

    // --SVELTE
    import { onMount, onDestroy } from 'svelte'

// #CONSTANTES

    // --ELEMENT-FEATURES
    const
    FEATURES_PHASE = Math.PI * features_LENGTH,
    FEATURES_EVENTS = { resize: features_e$Resize }

// #VARIABLES

    // --ELEMENT-TRACK
    let track_ROTATE = 0

    // --ELEMENT-TOPIC
    let topic_WIDTH = 0

// #REACTIVE

    // --ELEMENT-FEATURES
    $: features_SIN = Math.abs(Math.sin(prop_RATIO * FEATURES_PHASE)) // 0 - 100

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
style:--features-sin={features_SIN}
>
    {#each [0, 1] as i}
        <div
        class="track"
        style:--track-sign={i ? 1 : -1}
        style:transform={
            (i
            ? `rotate(${-track_ROTATE}rad) translate3d(calc(100% * ${1 - prop_RATIO}), -50%`
            : `rotate(${-track_ROTATE + Math.PI}rad) translate3d(calc(-100% * ${prop_RATIO}), 50%`)

            + `, ${features_SIN * 100}px)`
        }
        style:padding-right="{topic_WIDTH}px"
        >
            {#each FEATURES_DATAS as data}
                <div
                class="topic"
                style:width="{topic_WIDTH}px"
                >
                    <p
                    style:transform="rotate({track_ROTATE + (i ? 0 : Math.PI)}rad)"
                    data-topic={data.topic[i ? 0 : data.topic.length - 1]}
                    >
                        {data.topic[i ? 0 : data.topic.length - 1]}
                    </p>
                </div>
            {/each}
        </div>
    {/each}

    <div
    class="track"
    style:transform="translate(calc(-100% * {prop_RATIO}), -50%)"
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

    opacity: 0;

    width: 100vw;
    height: 100%;

    perspective: 200px;

    margin-left: 5%;

    transition: opacity .4s;

    &.focus
    {
        opacity: 1;

        .track { will-change: transform; }
    }

    .track
    {
        @include utils.solid-border(1px, $intermediate, $right: false, $left: false);
    
        display: flex;

        transform-style: preserve-3d;

        width: fit-content;
        height: fit-content;

        transition: transform .5s ease-out;

        &:nth-child(1)
        {
            @include position.placement(absolute, $bottom: 0, $left: 0);

            transform-origin: bottom left;

            height: 20%;

            color: rgba($light, .2);
        }
        &:nth-child(2)
        {
            @include position.placement(absolute, $top: 0, $right: 0);

            transform-origin: top right;

            height: 18%;

            color: $primary;
        }
        &:nth-child(3)
        {
            @include position.placement(absolute, $top: 50%, $left: 0);

            margin-left: 100vw;
            padding-right: 100vw;
        }

        &>* { flex-shrink: 0; }

        .topic
        {
            @extend %f-center;
    
            p
            {
                $x: .8rem;
                $y: .4rem;
        
                @include font.h-custom($font-size: var(--title-size, map.get(font.$font-sizes, s7)), $italic: true);
    
                @extend %m-h-2;

                position: relative;

                pointer-events: auto;

                text-align: center;

                &::after
                {
                    #{--x}: calc($x * var(--track-sign, 1));
                    #{--y}: calc($y * var(--track-sign, 1));
                
                    @include position.placement(absolute, $top: 0, $left: 0, $pseudo-element: attr(data-topic));

                    transform: translate(calc(var(--x, $x) * var(--features-sin, 0)), calc(var(--y, $y) * var(--features-sin, 0)));
            
                    opacity: var(--features-sin, 0);
            
                    color: transparent;
                    -webkit-text-stroke: 3px $intermediate;

                    transition: transform .4s, opacity .4s;
                }

                &:hover::after
                {
                    transform: translate(var(--x, $x), var(--y, $y));

                    opacity: 1;
                }
            }
        }
        
        ul
        {
            @extend %f-j-center;
    
            min-width: max(100vw, 100vh);
            height: fit-content;

            pointer-events: auto;

            li
            {
                @include font.content($light, $font-size: map.get(font.$font-sizes, s3), $line-height: 6);
    
                padding-left: app.$gap-inline;

                user-select: auto;
            }

            a
            {
                @include font.simple-hover($primary);

                font-family: font.$family-content-bold !important;
        
                cursor: pointer;
            }
        }
    }
}
</style>