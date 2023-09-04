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
/* #USES */

@use '../../assets/scss/styles/display';
@use '../../assets/scss/styles/size';

/* #ORBIT */

.orbit
{
    @extend %f-center;
    @extend %any;

    position: absolute;

    transform-style: preserve-3d;
}
</style>