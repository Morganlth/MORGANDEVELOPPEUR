<!-- #MAP

    TAG
        FRAGMENTS

-->

<!-- #SCRIPT -->

<script>
// #EXPORTS

    // --PROPS
    export let
    prop_CONTENT = '',
    prop_DURATION = 0,

    prop_INTRO = () => {},
    prop_OUTRO = () => {},

    prop_STYLE = { tag_style: () => '', fragments_style: () => '' }

// #IMPORTS

    // --JS
    import { transition_wait } from '../../assets/js/utils/transition'

    // --COMPONENT-ELEMENT
    import Fragments from './Fragments.svelte'

// #CONSTANTE

    // --ELEMENT-TAG
    const TAG_FRAGS = []

// #VARIABLE

    // --ELEMENT-TAG
    let tag

// #FUNCTIONS

    // --INTRO
    function tag_intro() { prop_INTRO(tag, TAG_FRAGS) }

    // --OUTRO
    function tag_outro() { prop_OUTRO(tag, TAG_FRAGS) }
</script>

<!-- #HTML -->

<h3
class="tag"
style={prop_STYLE.tag_style()}
bind:this={tag}
transition:transition_wait={{ duration: prop_DURATION }}
on:introend={tag_intro}
on:outrostart={tag_outro}
>
    <Fragments
    prop_FRAGS={{ children: TAG_FRAGS, value: prop_CONTENT }}
    prop_STYLE={prop_STYLE.fragments_style}
    />
</h3>

<!-- #STYLE -->

<style
lang="scss"
>
/* #USES */

@use 'sass:map';

@use '../../assets/scss/styles/font';

/* #TAG */

.tag
{
    @include font.h-custom($light, var(--title-size, map.get(font.$font-sizes, s5)));

    @extend %m-h-3;

    width: fit-content;
    height: fit-content;
}
</style>