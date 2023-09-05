<!-- #MAP

-APP
-ROUTER
-EVENT
    PAGES
        HOME
        PRESENTATION

-->

<!-- #SCRIPT -->

<script>
// #IMPORTS

    // --CONTEXTS
    import { APP, ROUTER, EVENT } from '../../App.svelte'

    // --SVELTE
    import { onMount, onDestroy } from 'svelte'

    // --COMPONENT-PAGES
    import Home from '../pages/Home.svelte'
    import Presentation from '../pages/Presentation.svelte'
    import Skills from '../pages/Skills.svelte'

// #CONSTANTES

    // --ELEMENT-PAGES
    const
    PAGES_PAGES =
    [
        {
            id: 2,
            name: 'skills',
            component: Skills,
            props:
            {
                prop_OFFSET_TOP: 9,
                prop_BREAK: 4
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
    ],
    PAGES_EVENTS = { resize: pages_e$Resize }

// #VARIABLES

    // --APP
    let app_$HIDE = APP.app_$HIDE

    // --ROUTER
    let router_$ID = ROUTER.router_$ID

// #FUNCTIONS

    // --SET
    function pages_set()
    {
        pages_setEvents()
    
        router_setPages()
    }

    function pages_setEvents() { EVENT.event_add(PAGES_EVENTS) }

    function router_setPages() { for (const PAGES of PAGES_PAGES) ROUTER.router_add(PAGES.id, PAGES.name, window.innerHeight * (PAGES.props.prop_OFFSET_TOP ?? 0)) }

    // --DESTROY
    function pages_destroy() { pages_destroyEvents() }

    function pages_destroyEvents() { EVENT.event_remove(PAGES_EVENTS) }

    // --EVENT
    async function pages_e$Resize() { router_setPages() }

// #CYCLES

onMount(pages_set)
onDestroy(pages_destroy)
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
    height: 1400vh;

    transition: opacity .2s;

    &.hide { opacity: 0; }
}
</style>