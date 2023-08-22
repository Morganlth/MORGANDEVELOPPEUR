<!-- #MAP

-APP
-ROUTER
    MAIN
        HOME
        PRESENTATION

-->

<!-- #SCRIPT -->

<script>
// #IMPORTS

    // --CONTEXTS
    import { APP, ROUTER } from '../../App.svelte'

    // --SVELTE
    import { onMount } from 'svelte'

    // --COMPONENT-PAGES
    import Home from '../pages/Home.svelte'
    import Presentation from '../pages/Presentation.svelte'

// #FUNCTIONS

    // --SET
    function main_set()
    {
        app_update()

        ROUTER.router_start()
    }

    // --UPDATE
    function app_update()
    {
        APP.app_setFormat()
        
        APP.app_restore()
    }

// #CYCLE

onMount(main_set)
</script>

<!-- #HTML -->

<main>
    <Home />
    <Presentation />
</main>

<!-- #STYLE -->

<style>
/* #MAIN */

main
{
    position: relative;

    width: 100%;
    height: fit-content;
}
</style>