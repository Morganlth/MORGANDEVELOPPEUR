<!----------------------------------------------- #||--features--|| -->


<!-- #|-CONTEXT-| -->
<!--
<script
context="module"
>

// #\-IMPORTS-\

    // --SVELTE

     // --LIB

    // --JS


// #\-EXPORTS-\

    // --CONTEXTS


</script>
-->

<!-- #|-HTML-| -->

<div
class="features"
style:transform="translateY({features_TRANSLATE_Y}%)"
>
    {#each prop_FEATURES as feature}
        <div
        class="container"
        class:show={feature.show}
        >
            {#each feature.contents as content, j}
                <div
                style:--feature-direction={j % 2 ? -1 : 1}
                style:--feature-delay="{.2 * j}s"
                >
                    <Line>
                        <span
                        slot="id"
                        >
                            {j}
                        </span>

                        <section
                        slot="content"
                        >
                            <h3
                            data-topic={content.topic}
                            >
                                {content.topic}
                            </h3>

                            <svelte:element
                            this={content.html ?? 'p'}
                            class="feature"
                            {...content.props}
                            data-content={content.data}
                            tabindex={content.html === 'a' && prop_FOCUS ? 0 : -1}
                            >
                                {content.data}
                            </svelte:element>
                        </section>
                    </Line>
                </div>
            {/each}
        </div>
    {/each}
</div>


<!-- #|-SCRIPT-| -->

<script>

// #\-IMPORTS-\

    // --DATA

    // --SVELTE

    // --LIB
    import { wait_throttle } from '$lib/wait'

    // --CONTEXTS

//=======@COMPONENTS|

    // --*
    import Line from '../../../../global/covers/Line.svelte'


// #\-EXPORTS-\

    // --PROPS
    export let
    prop_FOCUS = false
    ,
    prop_RATIO    = 0,
    prop_FRACTION = 0
    ,
    prop_FEATURES

    // --BINDING


// #\-CONSTANTES-\

    // --SVELTE

    // --CONTEXTS

    // --OUTSIDE

    // --THIS

    // --INSIDE


// #\-VARIABLES-\

    // --CONTEXTS

    // --OUTSIDE

    // --THIS
    let features_TRANSLATE_Y = 0

    // --INSIDE


// #\-REATIVES-\

    // --CONTEXTS

    // --OUTSIDE

    // --THIS
    $: wait_throttle(features_update, 3)(prop_RATIO) // +- 50ms

    // --INSIDE


// #\-FUNCTIONS-\

//=======@LIFE|

    // --SVELTE

    // --SET

    // --GET

    // --UPDATES
    function features_update(ratio)
    {
        features_TRANSLATE_Y = -100 * ratio

        for (let i = prop_FEATURES.length - 1; i >= 0; i--)
        {
            const
            FEATURE = prop_FEATURES[i],
            SHOW    = ratio >= FEATURE.id * prop_FRACTION
        
            prop_FEATURES[i] = { ...FEATURE, show: SHOW }
        }
    }

    // --DESTROY


//=======@COMMANDS|

    // --*


//=======@EVENTS|

    // --*


//=======@TRANSITIONS|

    // --*


//=======@ANIMATIONS|

    // --*


//=======@UTILS|

    // --*


</script>


<!-- #|-STYLE-| -->

<style
lang="scss"
>

/* #\-USES-\ */

    /* --SASS */
    @use 'sass:math';

    /* --APP */
    @use '../../../../assets/scss/app';

    /* --DEPENDENCIES */
    @use '../../../../assets/scss/styles/utils';
    @use '../../../../assets/scss/styles/display';
    @use '../../../../assets/scss/styles/font';
    @use '../../../../assets/scss/styles/animation';

    /* --MEDIA */
    @use '../../../../assets/scss/styles/media';


/* #\-VARIABLES-\ */

    /* --* */
    $duration: .8s;


/* #\-GLOBAL-\ */

    /* --* */


/* #\-THIS-\ */

.features
{
    &, .container
    {
        width:  100%;
        height: fit-content;
    }

    @include utils.placement(absolute, $top: 50%, $right: 0, $left: 0);

    pointer-events: auto;

    transition: transform $duration ease-out;

    .container
    {
        margin-bottom: 4rem;

        border-top: solid transparent .6rem;

        transition: border-color .4s;

        &.show
        {
            border-top-color: $primary;

            transition-delay: .4s; 

            &>div { transform: translate(0, 0); }
        }

        &>div
        {
            &::before
            {
                @include utils.placement(absolute, 0, 0, 0, 0, -1, true);

                @extend %any-size;

                opacity: .4;
        
                background: url('/images/feature_bg.jpg') center / cover no-repeat;
                mix-blend-mode: darken;
            }
        
            @extend %f-column;
        
            justify-content: center;

            transform: translate(calc(100% * var(--feature-direction, 1)), 100%);

            height: 24vh;

            background-color: rgba($dark, .8);

            border-bottom: solid $intermediate .4rem;

            transition: transform $duration var(--feature-delay, 0) ease-in-out;
        }

        :global .line
        {
            &, .content { box-sizing: border-box; }

            padding-left: 2rem;

            .content { padding-inline: 6% app.$gap-inline; }
        }

        h3
        {
            @include font.h-(3, $intermediate, .4, true);

            transform: translateX(-3rem);
        }

        a
        {
            @extend %a-text;

            color: inherit;
        }

        @include media.min($ms3)
        {
            :global .line .content { padding-left: 28%; }

            h3 { transform: translateX(-10rem); }
        }
        @include media.min($ms4, $ms4)
        {
            &.show>div::after
            {
                transform: scaleY(1.24);

                transition-delay: calc($duration + var(--feature-delay, 0));
            }
    
            &>div::after
            {
                @include utils.placement(absolute, $top: 0, $left: 16%, $pe: true);

                transform: scaleY(1);

                width:  0;
                height: 100%;

                mix-blend-mode: soft-light;

                border-left: solid $light 1px;

                transition: transform .4s ease-in;
            }

            .feature
            {
                position: relative;

                width: fit-content;

                &::before
                {
                    @include utils.placement(absolute, $top: 90%, $left: -12vw, $z: -1, $pe: attr(data-content));

                    /* You may not @extend selectors across media queries */
                    width:  100%;
                    height: 100%;
        
                    padding-inline: .8rem;
                
                    background-color: $dark;
                    mix-blend-mode: overlay;
                }
            }

            
        }
    }
}


</style>