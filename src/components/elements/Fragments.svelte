<!-- #MAP

    FRAGMENTS

-->

<!-- #SCRIPT -->

<script>
// #EXPORTS

    // --PROPS
    export let
    prop_CHILDREN = [],
    prop_CONTENT

// #IMPORT

    // --JS
    import { transform_getTranslate3d } from '../../assets/js/utils/transform'
</script>

<!-- #HTML -->

<div
class="fragments"
>
    {#each prop_CONTENT as e}
        <span
        style:transform={transform_getTranslate3d()}
        bind:this={prop_CHILDREN[prop_CHILDREN.length]}
        >{e}</span>
    {/each}
</div>

<!-- #STYLE -->

<style
lang="scss"
>
/* #USES */

@use '../../assets/scss/app';

@use '../../assets/scss/styles/position';
@use '../../assets/scss/styles/media';

/* #FRAGMENTS */

.fragments
{
    transform-style: preserve-3d;

    span
    {
        display: inline-block;

        transition: transform 1.2s ease-out;
    }

    @include media.min($ms3, $ms3)
    {
        &::before
        {
            @include position.placement(absolute, -.7rem, auto, auto, 0, true);

            width: 2.4rem;
            height: 2.4rem;

            background-color: $primary;
        }

        position: relative;

        padding-left: app.$gap-inline;
    }
}
</style>