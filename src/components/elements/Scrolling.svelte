<!-- #MAP

    SCROLLING

-->

<!-- #SCRIPT -->

<script>
// #EXPORTS

    // --PROPS
    export let
    prop_CONTENT = [],
    prop_DURATION = '10s'
</script>

<!-- #HTML -->

<div
class="scrolling"
style:--scrolling-duration={prop_DURATION}
>
    {#each prop_CONTENT as value}
        <p>{value}</p>
    {/each}
</div>

<!-- #STYLE -->

<style
lang="scss"
>
/* #USES */

@use '../../assets/scss/app';

@use '../../assets/scss/styles/position';
@use '../../assets/scss/styles/display';
@use '../../assets/scss/styles/font';

/* #SCROLLING */

.scrolling
{
    @include position.placement(fixed, auto, 0, calc(app.$gap-block * 3), 0);

    @extend %f-a-center;

    width: fit-content;
    height: 5%;

    animation: aScrolling var(--scrolling-duration, 10s) infinite cubic-bezier(.2, .4, .8, .4);

    p
    {
        @include font.interact($intermediate);

        min-width: 100vw;

        text-align: center;
    }

    @keyframes aScrolling
    {
        from { transform: translateX(100vw); }
        to { transform: translateX(-100%); }
    }
}
</style>