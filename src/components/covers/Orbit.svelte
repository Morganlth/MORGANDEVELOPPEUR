<!-- #MAP

    ORBIT
        ~SLOT

-->

<!-- #SCRIPT -->

<script>
// #EXPORTS

    // --PROPS
    export let
    prop_ROTATE = 0,
    prop_OPACITY = 0
</script>

<!-- #HTML -->

<div
class="orbit"
style:transform="rotate({prop_ROTATE}rad)"
style:opacity={prop_OPACITY}
>
    <slot />
</div>

<!-- #STYLE -->

<style
lang="scss"
>
/* #USE */

@use '../../assets/scss/styles/display';

/* #ORBIT */

.orbit
{
    @extend %f-center;

    position: absolute;

    transform-style: preserve-3d;

    transition: opacity 1s;
}
</style>