<!-- #MAP

    FRAGMENTS
        FRAG * n

        #if TAGS
            TAG * n
-->

<!-- #SCRIPT -->

<script>
// #EXPORTS

    // --PROPS
    export let
    prop_CHILDREN = { frags: [], tags: [] },
    prop_CONTENT =
    {
        value: '',
        tags: void 0
    }

// #IMPORTS

    // --JS
    import { transform_getTranslate3d } from '../../assets/js/utils/transform'

    // --COMPONENT-ELEMENT
    import Char from './Char.svelte'
</script>

<!-- #HTML -->

<div
class="fragments"
>
    {#each prop_CONTENT.value as e}
        <span
        class="frag"
        style:transform={transform_getTranslate3d()}
        bind:this={prop_CHILDREN.frags[prop_CHILDREN.frags.length]}
        >{e}</span>
    {/each}

    {#if prop_CONTENT.tags instanceof Array}
        <ul
        class="tags"
        >
            {#each prop_CONTENT.tags as tag}
                <li>
                    <strong
                    class="tag"
                    >
                        {#each tag + '.' as char}
                            <Char
                            prop_CHILDREN={prop_CHILDREN.tags}
                            prop_CHAR={char}
                            />
                        {/each}
                    </strong>
                </li>
            {/each}
        </ul>
    {/if}
</div>

<!-- #STYLE -->

<style
lang="scss"
>
/* #USES */

@use '../../assets/scss/app';

@use '../../assets/scss/styles/position';
@use '../../assets/scss/styles/font';
@use '../../assets/scss/styles/media';

/* #FRAGMENTS */

.fragments
{
    display: flex;
    align-items: flex-end;

    transform-style: preserve-3d;

    .frag
    {
        display: inline-block;

        transition: transform 1.2s ease-out;
    }

    ul
    {
        display: flex;

        gap: 1rem;

        margin-left: 2rem;

        .tag { @include font.interact($primary); }
    }

    @include media.min($ms2, $ms3)
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