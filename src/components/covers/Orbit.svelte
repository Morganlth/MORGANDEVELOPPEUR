<!-- #MAP

    ORBIT
        ~SLOT

-->

<!-- #SCRIPT -->

<script>
// #EXPORT

    // --PROP
    export let prop_ROTATE = 0
</script>

<!-- #HTML -->

<div
class="orbit"
style:transform="rotate({prop_ROTATE}rad)"
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
}
</style>