<!-- #MAP

-ROUTER
    PAGES
        HOME
        PRESENTATION

-->

<!-- #SCRIPT -->

<script>
// #IMPORTS

    // --CONTEXT
    import { ROUTER } from '../../App.svelte'

    // --COMPONENT-PAGES
    import Home from '../pages/Home.svelte'
    import Presentation from '../pages/Presentation.svelte'

// #VARIABLE

    // --ROUTER
    let router_$ID = ROUTER.router_$ID
</script>

<!-- #HTML -->

<main
class="pages"
>
    <Home
    prop_FOCUS={$router_$ID === 0}
    />
    <Presentation
    prop_FOCUS={$router_$ID === 1}
    />
</main>

<!-- #STYLE -->

<style>
/* #PAGES */

.pages
{
    position: relative;

    width: 100%;
    height: fit-content;
}
</style>