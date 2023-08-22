<!-- #MAP

-ROUTER
    PRESENTATION
        SNAKE

-->

<!-- #SCRIPT -->

<script>
// #IMPORTS

    // --CONTEXT
    import { ROUTER } from '../../App.svelte'

    // --SVELTE
    import { onMount } from 'svelte'

    // --COMPONENT-ELEMENT
    import Snake from '../elements/Snake.svelte'

// #FUNCTIONS

    // --SET
    function presentation_set() { presentation_setPage() }

    function presentation_setPage() { ROUTER.router_add(1, 'presentation', window.innerHeight * 3 * (2 / 3))}

// #CYCLE

onMount(presentation_set)
</script>

<!-- #HTML -->

<div
id="presentation"
>
    <Snake />
</div>

<!-- #STYLE -->

<style
lang="scss"
>
/* #USES */

@use '../../assets/scss/styles/position';

/* #PRESENTATION */

#presentation
{
    @include position.placement(absolute, 0, 0, auto, 0);

    width: 100%;
    height: 300vh;
}
</style>