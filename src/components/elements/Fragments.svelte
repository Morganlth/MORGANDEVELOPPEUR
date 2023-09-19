<!-- #MAP

    FRAGMENTS

-->

<!-- #SCRIPT -->

<script>
// #EXPORTS

    // --PROPS
    export let
    prop_FRAGS = { children: [], value: '' },
    prop_TAGS = { children: [], value: '' },
    prop_DURATION = '1.2s',
    prop_STYLE = () => {},
    prop_TRANSFORM = () => {}
</script>

<!-- #HTML -->

<div
class="fragments"
>
    {#each prop_FRAGS.value as char, i}
        <pre
        style={prop_STYLE()}
        style:transform={prop_TRANSFORM(i)}
        style:transition="transform {prop_DURATION} ease-out"
        bind:this={prop_FRAGS.children[prop_FRAGS.children.length]}
        >{char}</pre>
    {/each}

    {#if prop_TAGS.value instanceof Array}
        <ul>
            {#each prop_TAGS.value as tag}
                <li>
                    <strong>
                        {#each tag + '.' as char}
                            <pre
                            data-char={char}
                            bind:this={prop_TAGS.children[prop_TAGS.children.length]}
                            >&nbsp;</pre>
                        {/each}
                    </strong>
                </li>
            {/each}
        </ul>
    {:else if prop_TAGS.value != void '' }
        {#each prop_TAGS.value as char}
            <pre
            data-char={char}
            bind:this={prop_TAGS.children[prop_TAGS.children.length]}
            >&nbsp;</pre>
        {/each}
    {/if}
</div>

<!-- #STYLE -->

<style
lang="scss"
>
/* #USE */

@use '../../assets/scss/styles/font';

/* #FRAGMENTS */

.fragments
{
    display: flex;
    align-items: flex-end;

    transform-style: preserve-3d;

    pre
    {
        display: inline-block;

        font: inherit;
    }

    ul
    {
        display: flex;
        flex-wrap: wrap;

        gap: 1rem;

        margin-left: 2rem;

        li
        {
            @include font.interact($primary);

            white-space: nowrap;
        }
    }
}
</style>