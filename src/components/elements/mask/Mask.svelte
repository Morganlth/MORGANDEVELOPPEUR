<!-- #MAP

    MASK

-->

<!-- #SCRIPT -->

<script>
// #EXPORTS

    // --PROPS
    export let
    prop_BLUR = false,
    prop_SHADOW = false,

    prop_COORDS = [50, 50],
    prop_GRADIENT = [0, 100]

// #IMPORT

    // --JS
    import { transition_fade } from '../../../assets/js/utils/transition'
</script>

<!-- #HTML -->

<div
class="mask"
class:blur={prop_BLUR}
class:shadow={prop_SHADOW}
style:--mask-x="{prop_COORDS[0]}%"
style:--mask-y="{prop_COORDS[1]}%"
style:--mask-transparent="{prop_GRADIENT[0]}%"
style:--mask-dark="{prop_GRADIENT[1]}%"
transition:transition_fade={{ duration: 1000 }}
>
</div>

<!-- #STYLE -->

<style
lang="scss"
>
/* #USES */

@use '../../../assets/scss/styles/position';
@use '../../../assets/scss/styles/size';

/* #MASK */

.mask
{
    $gradient: radial-gradient(circle at var(--mask-x, 50%) var(--mask-y, 50%), transparent var(--mask-transparent, 0), $dark var(--mask-dark, 100%));

    @include position.placement(absolute, 0, 0, 0, 0);

    @extend %any;

    pointer-events: none;

    &.blur
    {
        backdrop-filter: blur(10px);

        mask: $gradient no-repeat;
    }
    &.shadow { background: $gradient; }
}
</style>