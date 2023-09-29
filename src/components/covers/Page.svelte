<!-- #MAP

    PAGE
        WRAPPER
            ~SLOT

-->

<!-- #SCRIPT -->

<script>
// #EXPORT

    // --PROP
    export let prop_FOCUS = false
</script>

<!-- #HTML -->

<div
class="page"
style:z-index={prop_FOCUS ? 1 : 0}
>
    <div
    class="wrapper"
    >
        <slot />
    </div>
</div>

<!-- #STYLE -->

<style
lang="scss"
>
/* #USES */

@use '../../assets/scss/app';

@use '../../assets/scss/styles/position';
@use '../../assets/scss/styles/size';
@use '../../assets/scss/styles/media';

/* #PAGE */

.page
{
    @include position.placement(absolute, $top: 0, $right: 0, $left: 0);

    @extend %any;

    .wrapper
    {
        @include position.placement(sticky, 0, auto, auto, 0);

        overflow: hidden;

        height: 100vh;

        padding: 11rem app.$gap-inline 8rem;

        pointer-events: none;

        box-sizing: border-box;

        :global { &>* { @extend %any; } }

        @include media.min(false, $ms2) { padding-top: max(13rem, 80px); }
    }
}
</style>