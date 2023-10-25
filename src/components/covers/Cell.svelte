<!-- #MAP

    CELL
        ~SLOT

-->

<!-- #SCRIPT -->

<script>
// #EXPORTS

    // --PROPS
    export let
    prop_FOCUS = true,
    prop_CONTAINER = false,

    prop_TITLE = ''

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
class:focus={prop_FOCUS}
class:container={prop_CONTAINER}
type="button"
title={prop_TITLE}
tabindex={prop_FOCUS ? 0 : -1}
on:click={cell_eClick}
>
    <slot />
</button>

<!-- #STYLE -->

<style
lang="scss"
>
/* #USES */

@use 'sass:map';

@use '../../assets/scss/styles/elements';
@use '../../assets/scss/styles/display';
@use '../../assets/scss/styles/font';

/* #CELL */

.cell
{
    @extend %button-reset;

    pointer-events: none;

    &.focus { pointer-events: auto; }

    &.container
    {
        $size: var(--cell-size, map.get(font.$font-sizes, s5));
    
        #{--icon-size}: calc($size * .4);

        @extend %f-center;

        width: $size;
        height: $size;

        border: solid $light .2rem;

        box-sizing: content-box;
    }
}
</style>