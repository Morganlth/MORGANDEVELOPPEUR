<!-- #MAP

    TAG
        FRAGMENTS

-->

<!-- #SCRIPT -->

<script>
// #EXPORTS

    // --PROPS
    export let
    prop_FOCUS = false,
    prop_OPTIMISED = false,
    prop_CONTENT = '',
    prop_X = 0,
    prop_Y = 0

// #IMPORTS

    // --JS
    import MATH from '../../assets/js/utils/math'

    // --COMPONENT-ELEMENT
    import Fragments from './Fragments.svelte'

// #CONSTANTE

    // --ELEMENT-TAG
    const TAG_DURATION = 300

// #VARIABLE

    // --ELEMENT-TAG
    let tag_FRAGS = []

// #FUNCTIONS

    // --GET
    function fragments_getY() { return 1000 * Math.random() + '%' }

    // --UPDATE
    function tag_update(y, scale)
    {
        for (let i = 0; i < tag_FRAGS.length; i++)
        {
            const FRAG = tag_FRAGS[i]

            FRAG.style.setProperty('--frag-y', y)
            FRAG.style.setProperty('--frag-scale', scale)
        }
    }

    // --INTRO
    function tag_intro()
    {
        const Y = MATH.headsOrTails() * 2 + '%'
    
        tag_update(Y, 1)
    }

    // --OUTRO
    function tag_outroStart()
    {
        tag_update(fragments_getY(), 0)

        tag_FRAGS = []
    }

    // --TRANSITION
    function tag_tFade() { return { duration: TAG_DURATION, css: (t) => `opacity: ${t}` } }

    // --UTILS
    function fragments_style() { return `--frag-y: ${fragments_getY()}; --frag-scale: 0; --frag-sign: ${Math.round(Math.random()) ? 1 : -1}; --frag-duration: ${TAG_DURATION}ms` }

    function fragments_transform() { return `translateY(calc(var(--frag-y, 0) * var(--frag-sign, 1))) scaleX(var(--frag-scale, 1))` }
</script>

<!-- #HTML -->

{#if prop_FOCUS}
    <button
    class="tag"
    style:position={prop_OPTIMISED ? 'relative' : 'absolute' }
    style:transform="translate({prop_X}px, {prop_Y}px)"
    type="button"
    transition:tag_tFade
    on:introend={tag_intro}
    on:outrostart={tag_outroStart}
    >
        <Fragments
        prop_FRAGS={{ children: tag_FRAGS, value: prop_CONTENT }}
        prop_STYLE={fragments_style}
        prop_TRANSFORM={fragments_transform}
        prop_DURATION="var(--frag-duration, .3s)"
        />
    </button>
{/if}

<!-- #STYLE -->

<style
lang="scss"
>
/* #USES */

@use 'sass:map';

@use '../../assets/scss/styles/elements';
@use '../../assets/scss/styles/position';
@use '../../assets/scss/styles/font';

/* #TAG */

.tag
{
    &::before
    {
        @include position.placement(absolute, auto, auto, 0, -8rem, true);

        transform: translateX(0) scale(1);
    
        width: 200%;
        height: 0;

        pointer-events: none;

        border-bottom: solid $intermediate 2px;

        animation: a .6s ease-out;

        transition: transform 1s ease-out, border .6s ease-out;

        @keyframes a { from { transform: translateX(100%) scaleX(0); } }
    }

    @include font.h-custom($light, var(--title-size, map.get(font.$font-sizes, s5)));

    @extend %button-reset;
    @extend %m-h-3;

    display: block;

    width: fit-content;
    height: fit-content;

    margin-bottom: 4rem;
    padding: 2rem;

    pointer-events: auto;

    transition: transform .3s;

    &:hover::before
    {
        transform: translateX(8%);
    
        border-bottom-color: $light;
    }

    :global
    {
        .fragments>pre::before
        {
            @include position.placement(absolute, 50%, auto, auto, 50%, true);

            transform-origin: left;
            
            width: 100%;
            height: 1px;

            background-color: $light;

            transform: rotate(calc(-90deg * var(--frag-sign, 1))) scaleX(var(--frag-y, 0));

            transition: transform var(--frag-duration, .3s) ease-out;
        }
    }
}
</style>