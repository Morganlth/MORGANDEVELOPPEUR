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
    prop_ON = false,
    prop_CONTENT = ''

// #IMPORT

    // --COMPONENT-ELEMENT
    import Fragments from './Fragments.svelte'

// #VARIABLE

    // --ELEMENT-TAG
    let tag_FRAGS = []

// #FUNCTIONS

    // --INTRO
    function tag_intro()
    {
        // for (let i = 0; i < tag_FRAGS.length; i++) tag_FRAGS[i].style.transform = `translateY(${Math.round(Math.random()) ? -1 : 1}%) scaleX(1)`
    }

    // --OUTROS
    function tag_outroStart()
    {
        // for (let i = 0; i < tag_FRAGS.length; i++) tag_FRAGS[i].style.transform = tag_style()

        tag_FRAGS = []
    }

    // --TRANSITION
    function tag_tFade() { return { duration: 300, css: (t) => `opacity: ${t}` }}

    // --UTIL
    function tag_style() { return `--frag-y: ${1000 * Math.random()}%; --frag-sign: ${Math.round(Math.random()) ? 1 : -1}` } 
</script>

<!-- #HTML -->

{#if prop_FOCUS && prop_ON}
    <h3
    class="tag"
    transition:tag_tFade
    on:introend={tag_intro}
    on:outrostart={tag_outroStart}
    >
        <Fragments
        prop_FRAGS={{ children: tag_FRAGS, value: prop_CONTENT }}
        prop_STYLE={tag_style}
        prop_DURATION={.3}
        />
    </h3>
{/if}

<!-- #STYLE -->

<style
lang="scss"
>
/* #USES */

@use 'sass:map';

@use '../../assets/scss/styles/position';
@use '../../assets/scss/styles/font';

/* #TAG */

.tag
{
    @include position.placement(absolute, 50%, auto, auto, 0);
    @include font.h-custom($light, var(--title-size, map.get(font.$font-sizes, s5)));

    @extend %m-h-3;

    transform: translateX(-50%);

    width: fit-content;
    height: fit-content;

    :global
    {
        .fragments>pre
        {
            &::before
            {
                @include position.placement(absolute, 50%, auto, auto, 50%, true);

                transform-origin: left;
                transform: translateY(-50%) rotate(calc(-90deg * var(--frag-sign))) scaleX(1);
    
                width: var(--frag-y);
                height: 1rem;

                background-color: $light;

                border-radius: 40%;

                animation: aBefore .6s forwards ease-out;

                @keyframes aBefore
                {
                    100% { transform: translateY(-50%) rotate(calc(-90deg * var(--frag-sign))) scaleX(0); }
                }
            }

            transform: translateY(calc(var(--frag-y) * var(--frag-sign))) scaleX(0);

            animation: a .6s forwards ease-out;

            @keyframes a
            {
                100% { transform: translateY(0) scaleX(1); }
            }
        }
    }
}
</style>