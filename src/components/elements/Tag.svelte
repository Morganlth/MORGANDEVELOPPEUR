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

    prop_CONTENT = '',
    prop_DURATION = 0,

    prop_IN = () => {},
    prop_OUT = () => {},

    prop_STYLE = { tag_style: () => '', fragments_style: () => '' }

// #IMPORT

    // --COMPONENT-ELEMENT
    import Fragments from './Fragments.svelte'

// #CONSTANTE

    // --ELEMENT-TAG
    const TAG_FRAGS = []

// #VARIABLES

    // --ELEMENT-TAG
    let
    tag,

    tag_ON = false,

    tag_TIMEOUT

// #REACTIVE

    // --ELEMENT-TAG
    $: tag ? tag_update(prop_FOCUS) : void 0

// #FUNCTIONS

    // --UPDATE
    function tag_update(focus)
    {
        clearTimeout(tag_TIMEOUT)

        focus ? tag_aIn() : tag_aOut()
    }

    // --ANIMATIONS
    function tag_aIn()
    {
        tag_ON = true

        prop_IN(tag, TAG_FRAGS)
    }

    function tag_aOut()
    {
        tag_TIMEOUT = setTimeout(() => tag_ON = false, prop_DURATION)

        prop_OUT(tag, TAG_FRAGS)
    }
</script>

<!-- #HTML -->

<h3
class="tag"
class:focus={tag_ON}
style={prop_STYLE.tag_style()}
bind:this={tag}
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

    opacity: 0;

    width: fit-content;
    height: fit-content;

    transition: opacity var(--frag-duration, .4s);

    &.focus { opacity: 1; }
}
</style>