<!-- #MAP

    IMAGE

-->

<!-- #SCRIPT -->

<script>
// #EXPORTS

    // -PROPS
    export let
    prop_FOCUS = false,
    prop_SRC = '',
    prop_ALT = ''

// #IMPORT

    // --SVELTE
    import { base } from '$app/paths'
</script>

<!-- #HTML -->

<img
class="image"
class:focus={prop_FOCUS}
src="{base}/images/icons/{prop_SRC}"
alt={prop_ALT}
>

<!-- #STYLE -->

<style
lang="scss"
>
/* #USE */

@use '../../assets/scss/styles/size';

/* #LOGO */

.image
{
    @extend %any;

    opacity: .1;

    filter: grayscale(100%);

    image-rendering: optimizeQuality;

    transition: opacity .7s, filter .7s;

    &.focus
    {
        opacity: 1;

        filter: none;
    }
}
</style>