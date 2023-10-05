<!-- #MAP

    MASK2

-->

<!-- #SCRIPT -->

<script>
// #EXPORT

    // --PROP
    export let prop_DURATION = 0

// #IMPORT

    // --JS
    import { transition_wait } from '../../assets/js/utils/transition'

// #VARIABLE

    // --ELEMENT-MASK2
    let mask2_DESTROY = false

// #FUNCTION

    // --OUTRO
    function mask2_outro() { mask2_DESTROY = true }
</script>

<!-- #HTML -->

<div
class="mask2"
class:destroy={mask2_DESTROY}
out:transition_wait={{ duration: prop_DURATION }}
on:outrostart={mask2_outro}
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
    $clip-left-0: polygon(0 0, 0 0, 0 100%, 0% 100%);
    $clip-right-0: polygon(100% 0, 100% 0, 100% 100%, 100% 100%);
    $clip-left-50: polygon(0 0, 50% 0, 50% 100%, 0 100%);
    $clip-right-50: polygon(100% 0, 50% 0, 50% 100%, 100% 100%);

    &::before, &::after
    {
        @include position.placement(absolute, 0, 0, 0, 0, true);

        @extend %any;

        animation: a0 ease-in-out forwards;
    }
    &::before
    {
        #{--clip-0}: $clip-left-0;
        #{--clip-1}: $clip-right-50;

        animation-duration: .8s;
    }

    @include position.placement(absolute, 0, 0, 0, 0);

    @extend %any;

    pointer-events: none;

    mix-blend-mode: hue;

    &.destroy
    {
        &::before, &::after { animation-name: a1 !important; }
        &::before
        {
            #{--clip-0}: $clip-right-50;
            #{--clip-1}: $clip-left-0;
        }
        &::after
        {
            #{--clip-0}: $clip-left-50;
            #{--clip-1}: $clip-right-0;
        }
    }

    @keyframes a0
    {
        from
        {
            clip-path: var(--clip-0);

            background-color: $primary;
        }
        to
        {
            clip-path: var(--clip-1);

            background-color: $dark;
        }
    }

    @keyframes a1
    {
        from
        {
            clip-path: var(--clip-0);

            background-color: $dark;
        }
        to
        {
            clip-path: var(--clip-1);

            background-color: $indicator;
        }
    }

    &::after
    {
        #{--clip-0}: $clip-right-0;
        #{--clip-1}: $clip-left-50;

        animation-duration: 1s;
    }
}
</style>