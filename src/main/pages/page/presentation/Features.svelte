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
class:focus={prop_FOCUS}
style:transform="translateY({features_TRANSLATE_Y}%)"
>
    {#each prop_FEATURES as group}
        <div
        class="container"
        class:show={group.show}
        >
            {#each group.contents as feature, j}
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
                            class="topic"
                            >
                                {feature.topic}
                            </h3>

                            <svelte:element
                            this={feature.html ?? 'p'}
                            class="feature"
                            {...feature.props}
                            data-content={feature.data}
                            tabindex={feature.html === 'a' && prop_FOCUS ? 0 : -1}
                            >
                                {feature.data}
                            </svelte:element>
                        </section>
                    </Line>

                    {#if feature.child}
                        <svelte:component
                        this={feature.child}
                        />
                    {/if}
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

    // --CONTEXTS

//=======@COMPONENTS|

    // --*
    import Line from '../../../../global/covers/Line.svelte'
    
//=======@STYLE|

    // --*
    import '../../../../assets/scss/global/features.scss'


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
    $: features_update(prop_RATIO)

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

            if (SHOW) break
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


/* #\-THIS-\ */

.features
{
    &, .container
    {
        width:  100%;
        height: fit-content;
    }

    @include utils.placement(absolute, $top: 50%, $right: 0, $left: 0);

    transition: transform $duration ease-out;

    &.focus
    {
        will-change: transform, contents;

        .show
        {
            animation: a-rgb 3s alternate infinite;

            @keyframes a-rgb { from { filter: hue-rotate(0deg); } to { filter: hue-rotate(30deg); } }
        }
    }

    .container
    {
        margin-bottom: 4rem;

        &.show>div { transform: translate(0, 0); }

        &>div:nth-child(1) { border-top: solid $primary 1rem; }

        &>div
        {
            &::before
            {
                @include utils.placement(absolute, 0, 0, 0, 0, -1, true);

                @extend %any-size;

                opacity: .3;
        
                background:     url('/images/feature_bg.jpg') center / cover no-repeat;
                mix-blend-mode: darken;
            }
        
            @extend %f-a-center;

            isolation: isolate;
    
            transform: translate(calc(100% * var(--feature-direction, 1)), 100%);

            overflow: clip;

            height: 30vh;

            background-color: rgba($dark, .8);

            border-bottom: solid $intermediate .4rem;

            transition: transform $duration var(--feature-delay, 0) ease-in-out;
        }

        .topic, .feature::before
        {
            mix-blend-mode: hue;
    
            white-space: nowrap;
        }

        .topic
        {
            --title-size: 50rem;
        
            @include font.h-($color: $dark, $line-height: 0);

            transform-origin: left;
            transform:        rotate(2deg);

            text-shadow:
             1px  1px $light,
            -1px  1px $light,
            -1px -1px $light,
             1px -1px $light;
        }

        .feature
        {
            &::before, & { width: fit-content; }
        
            &::before
            {
                $height: 118%;
        
                @include utils.placement(absolute, $top: 126%, $left: -6vw, $z: -1, $pe: attr(data-content));

                height: $height;
    
                padding-inline: .8rem;
            
                background-color: $dark;

                font-size: $height;
            }
    
            position: relative;

            display: block;

            @include media.min($ms4, $ms4) { margin-left: 18vw; }
        }

        a
        {
            @extend %a-text;

            pointer-events: auto;

            color:           inherit;
            text-decoration: underline;

            transition: color .4s;

            &:hover { color: $dark; }
        }
    }
}


</style>