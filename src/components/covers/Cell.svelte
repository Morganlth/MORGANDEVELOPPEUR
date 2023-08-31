<!-- #MAP

    CELL
        ~SLOT

-->

<!-- #SCRIPT -->

<script>
    // #IMPORT

        // --SVELTE
        import { createEventDispatcher } from 'svelte'

    // #CONSTANTE

        // --SVELTE
        const SVELTE_DISPATCH = createEventDispatcher()

    // #FUNCTION

        // --EVENT
        function cell_eClick(e) { SVELTE_DISPATCH('click', { event: e }) }
</script>

<!-- #HTML -->

<button
class="cell"
type="button"
on:click={cell_eClick}
>
    <slot />
</button>

<!-- #STYLE -->

<style
lang="scss"
>
/* #USE */

@use '../../assets/scss/styles/elements';

/* #CELL */

.cell
{
    @extend %button-reset;

    pointer-events: auto;
}
</style>