<!-- #MAP

    FEATURES
        LINE * n

-->

<!-- #SCRIPT -->

<script>
// #EXPORTS

    // --PROPS
    export let
    prop_RATIO = 0,
    prop_FRACTION = 0,

    prop_FEATURES

    // --BINDS

// #IMPORTS

    // --JS

    // --LIB

    // --CONTEXTS

    // --SVELTE

    // --COMPONENT-COVER
    import Line from '../covers/Line.svelte'

// #CONSTANTES

// #VARIABLES

let features_TRANSLATE_Y = 0

// #REACTIVES

$: features_update(prop_RATIO)

// #FUNCTIONS

    // --SET

    // --GET

    // --UPDATES
    function features_update(ratio)
    {
        let last_SHOW = false
    
        features_TRANSLATE_Y = 100 * (1 - ratio)

        for (let i = prop_FEATURES.length - 1; i >= 0; i--)
        {
            const
            FEATURE = prop_FEATURES[i],
            RATIO = ratio >= FEATURE.id * prop_FRACTION
        
            prop_FEATURES[i] = { ...FEATURE, show: RATIO, focus: !last_SHOW && RATIO }

            if (RATIO) last_SHOW = true
        }
    }

    // --CLEAR

    // --DESTROY

        // !======IN-OUT=======!

    // --INTROS

    // --OUTROS

        // !======CONTEXT======!

    // --COMMANDS

    // --EVENTS

        // !======T-A==========!

    // --TRANSITIONS

    // --ANIMATIONS

        // !======CONTROL======!

    // --START

    // --END

        // !======TEST=========!

	// --TESTS

        // !======CANVAS=======!

	// --DRAW

// #LIFECYCLES

</script>

<!-- #HTML -->

<div
class="features"
style:transform="translateY({features_TRANSLATE_Y}%)"
>
    {#each prop_FEATURES as feature}
        <div
        class:focus={feature.focus}
        class:show={feature.show}
        >
            {#each feature.contents as content, j}
                <section
                style:--feature-direction={j % 2 ? -1 : 1}
                style:--feature-duration="{.2 * j + 1}s"
                >
                    <h3
                    data-topic={content.topic}
                    >
                        {content.topic}
                    </h3>

                    <Line>
                        <span
                        slot="id"
                        >
                            {j}
                        </span>

                        <svelte:element
                        this={content.html ?? 'p'}
                        {...content.props}
                        slot="content"
                        >
                            {content.data}
                        </svelte:element>
                    </Line>
                </section>
            {/each}
        </div>
    {/each}
</div>

<!-- #STYLE -->

<style
lang="scss"
>
/* #USES */

@use '../../assets/scss/app';

@use '../../assets/scss/styles/position';
@use '../../assets/scss/styles/display';
@use '../../assets/scss/styles/size';
@use '../../assets/scss/styles/font';

/* #FEATURES */

.features
{
    $duration: 1s;

    @include position.placement(absolute, $bottom: 50%, $right: 0, $left: 0);

    width: 100%;
    height: fit-content;

    pointer-events: auto;

    transition: transform .4s ease-out;

    &>div
    {
        position: relative;

        width: 100%;
        height: fit-content;

        &.focus::after { border-top-color: $light; }
    
        &.show
        {
            &::after { opacity: 1; }
    
            section { transform: translate(0, 0); }
        }

        &::after
        {
            @include position.placement(absolute, $top: 0, $left: 0, $pseudo-element: true);

            display: inline-block;
        
            opacity: 0;

            width: 30%;
            height: 0;
    
            border-top: solid $intermediate .2rem;

            transition: opacity $duration ease-out, border-color $duration;
        }
    }

    section
    {
        @extend %f-column;
    
        justify-content: center;

        transform: translate(calc(100% * var(--feature-direction, 1)), 100%);

        height: 20vh;

        background-color: $dark;

        border-block: solid $intermediate 1px;

        transition: transform var(--feature-duration, $duration) .2s ease-out;
    }

    h3, :global .line .content
    {
        padding-left: 30%;

        box-sizing: border-box;
    }

    h3
    {
        @include font.h-custom($intermediate, $line-height: 0, $italic: true);

        @extend %m-h-3;

        position: relative;

        top: .4rem;
    }

    :global .line
    {
        padding-left: 2rem;

        box-sizing: border-box;
    }

    strong { font-weight: bold; }

    a
    {
        position: relative;

        color: inherit;
        text-decoration: none;

        &:hover::after { clip-path: polygon(0 110%, 100% 110%, 100% 0, 0 0); }

        &::after
        {
            @include position.placement(absolute, $top: 0, $left: 0, $pseudo-element: attr(data-content));

            @extend %any;

            clip-path: polygon(0 100%, 100% 100%, 100% 100%, 0 100%);

            color: $primary;
            font: inherit;

            transition: clip-path .4s ease-out;
        }
    }
}
</style>