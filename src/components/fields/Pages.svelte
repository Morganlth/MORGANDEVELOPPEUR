<!-- #MAP

-APP
-ROUTER
    PAGES
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
    import Skills from '../pages/Skills.svelte'

// #CONSTANTE

    // --ELEMENT-PAGES
    const PAGES_PAGES =
    [
        {
            id: 2,
            name: 'skills',
            component: Skills,
            props:
            {
                prop_OFFSET_TOP: 9,
                prop_BREAK: 11
            }
        },
        {
            id: 1,
            name: 'presentation',
            component: Presentation,
            props:
            {
                prop_OFFSET_TOP: 1,
                prop_BREAK: 8
            }
        },
        {
            id: 0,
            name: 'home',
            component: Home,
            props: { prop_BREAK: 1 }
        }
    ]

// #VARIABLES

    // --APP
    let app_$HIDE = APP.app_$HIDE

    // --ROUTER
    let router_$ID = ROUTER.router_$ID

// #FUNCTIONS

    // --SET
    function pages_set() { router_setPages() }

    function router_setPages() { for (const PAGES of PAGES_PAGES) ROUTER.router_add(PAGES.id, PAGES.name, window.innerHeight * (PAGES.props.prop_OFFSET_TOP ?? 0)) }

// #CYCLE

onMount(pages_set)
</script>

<!-- #HTML -->

<main
class="pages"
class:hide={$app_$HIDE}
>
    {#each PAGES_PAGES as page}
        <svelte:component
        this={page.component}
        prop_FOCUS={$router_$ID === page.id}
        {...page.props}
        />
    {/each}
</main>

<!-- #STYLE -->

<style>
/* #PAGES */

.pages
{
    position: relative;

    opacity: 1;

    width: 100%;
    height: 1200vh;

    transition: opacity .2s;

    &.hide { opacity: 0; }
}
</style>