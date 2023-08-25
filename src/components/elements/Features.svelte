<!-- #MAP

    FEATURE

-->

<!-- #SCRIPT -->

<script>
// #IMPORTS

    // --JS
    import FEATURES_DATAS from '../../assets/js/datas/dFeature'
    import { wait_throttle } from '../../assets/js/utils/wait'

    // --CONTEXT
    import { EVENT } from '../../App.svelte'

    // --SVELTE
    import { onMount, onDestroy } from 'svelte'

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
    features_GAP,
    features_END,
    features_TRANSLATE_X = 0

    // --ELEMENT-TRACK
    let
    track,
    track_START,
    track_END,
    track_WIDTH,
    track_TRANSLATE_X = 0

// #FUNCTIONS

    // --SET
    function features_set()
    {
        features_setVars()
        features_setEvents()

        track_setVars()
    }

    function features_setVars()
    {
        features_GAP = window.innerWidth * .25
    }

    function features_setEvents() { EVENT.event_add(FEATURES_EVENTS) }

    function track_setVars()
    {
        const HEIGHT = window.innerHeight
    
        features_END = HEIGHT * 4

        track_START = HEIGHT * 3
        track_END = HEIGHT * 8
        track_WIDTH = track.offsetWidth
    }

    // --DESTROY
    function features_destroy()
    {
        features_destroyEvents()
    }

    function features_destroyEvents() { EVENT.event_remove(FEATURES_EVENTS) }

    // --EVENTS
    function features_e$Scroll(scrollTop)
    {
        const FEATURES_RATIO = scrollTop / features_END / 2

        features_TRANSLATE_X = features_GAP * FEATURES_RATIO

        track_TRANSLATE_X = track_WIDTH * ((scrollTop - track_START) / track_END)
    }

    function features_e$Resize()
    {
        features_setVars()

        track_setVars()
    }

// #CYCLES

onMount(features_set)
onDestroy(features_destroy)
</script>

<!-- #HTML -->

<div
class="features"
style:transform="translateX({features_TRANSLATE_X}px)"
>
    <div
    class="track"
    style:transform="translateX({-track_TRANSLATE_X}px)"
    bind:this={track}
    >
        {#each FEATURES_DATAS as data}
            <div>
                <p
                class="topic"
                >
                    #{data.topic}
                </p>

                <ul>
                    {#each data.contents as content}
                        <li>
                            <svelte:element
                            this={content.htmlElement}
                            class="content"
                            >
                                {content.data}
                            </svelte:element>
                        </li>
                    {/each}
                </ul>
            </div>
        {/each}
    </div>
</div>

<!-- #STYLE -->

<style
lang="scss"
>
/* #USES */

@use 'sass:math';
@use 'sass:map';

@use '../../assets/scss/app';

@use '../../assets/scss/styles/utils';
@use '../../assets/scss/styles/position';
@use '../../assets/scss/styles/display';
@use '../../assets/scss/styles/size';
@use '../../assets/scss/styles/font';

/* #FEATURES */
.features
{
    &, .track { transition: transform .5s ease-out; }

    @include utils.solid-border($intermediate, 2px, true, false, true, false);

    overflow: hidden;

    width: 100%;
    height: 22vh;

    background-color: $dark;

    .track
    {
        display: flex;

        width: fit-content;
        height: 100%;

        margin-left: 50%;
    
        &>div
        {
            &, &>* { flex-shrink: 0; }

            @extend %f-a-center;

            min-width: 100vw;
            height: 100%;
        }

        .topic { @include font.interact($primary, map.get(font.$font-sizes, s3)); }
        .content { @include font.interact($light, map.get(font.$font-sizes, s3), 1, map.get(font.$content-font-weight, w1)); }
        
        ul
        {
            display: flex;
    
            width: fit-content;
            height: fit-content;

            li
            {
                &::before
                {
                    $width: 1.5rem;
            
                    @include utils.solid-border($primary, 1.5px, true, false, true, false);
                    @include position.placement(absolute, 50%, auto, 50%, calc(app.$gap-inline - math.div($width, 2)), true);
        
                    width: $width;
                    height: 0;
                }

                position: relative;
    
                padding-left: calc(app.$gap-inline * 2);
            }

            a
            {
                @extend %simple-hover;

                pointer-events: auto;

                cursor: pointer;
            }
        }
    }
}
</style>