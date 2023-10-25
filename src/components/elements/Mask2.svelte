<!-- #MAP

    MASK2

-->

<!-- #SCRIPT -->

<script>
// #EXPORT

    // --PROP
    export let prop_DESTROY = false

// #IMPORT

    // --LIB
    import COLORS from '$lib/colors'

// #VARIABLES

    // --ELEMENT-MASK2
    let
    mask2_OPACITY = 0,

    mask2_BACKGROUND_COLOR = COLORS.primary,

    mask2_PE_BEFORE_CLIP_POINTS = 'none',
    mask2_PE_AFTER_CLIP_POINTS = 'none'

// #REACTIVE

    // --ELEMENT-MASK2
    $: mask2_update(prop_DESTROY)

// #FUNCTION

    // --UPDATE
    function mask2_update(destroy)
    {
        [mask2_OPACITY, mask2_BACKGROUND_COLOR, mask2_PE_BEFORE_CLIP_POINTS, mask2_PE_AFTER_CLIP_POINTS] =
        destroy
        ? [0, COLORS.primary, '0 0, 0 0, 0 100%, 0% 100%', '100% 0, 100% 0, 100% 100%, 100% 100%']
        : [1, COLORS.dark, '100% 0, 50% 0, 50% 100%, 100% 100%', '0 0, 50% 0, 50% 100%, 0 100%']
    }
</script>

<!-- #HTML -->

<div
class="mask2"
style:opacity={mask2_OPACITY}
style:--pe-bg-color={mask2_BACKGROUND_COLOR}
style:--pe-before-clip="polygon({mask2_PE_BEFORE_CLIP_POINTS})"
style:--pe-after-clip="polygon({mask2_PE_AFTER_CLIP_POINTS})"
>
</div>

<!-- #STYLE -->

<style
lang="scss"
>
/* #USES */

@use '../../assets/scss/styles/position';
@use '../../assets/scss/styles/size';

/* #MASK2 */

.mask2
{
    &::before, &::after
    {
        @include position.placement(absolute, 0, 0, 0, 0, true);

        @extend %any;

        background-color: var(--pe-bg-color, $dark);

        transition: clip-path ease-in-out, background 1s;
    }
    &::before
    {
        clip-path: var(--pe-before-clip, 'none');

        transition-duration: .8s;
    }

    @include position.placement(fixed, 0, 0, 0, 0);

    @extend %any;

    pointer-events: none;

    mix-blend-mode: color-dodge;

    transition: opacity 1s;

    &::after
    {
        clip-path: var(--pe-after-clip, 'none');

        transition-duration: 1s;
    }
}
</style>