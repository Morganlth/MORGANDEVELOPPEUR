<!-- #MAP

-ROUTER
-SPRING
    ROUTER
        ROUTE * n

-->

<!-- #SCRIPT -->

<script>
// #EXPORTS

    // --PROPS
    export let
    prop_ROUTES = [],

    prop_OPACITY = 1

// #IMPORTS

    // --CONTEXTS
    import { ROUTER, SPRING } from '../../App.svelte'

    // --COMPONENT-ELEMENT
    import Route from './Route.svelte'

// #VARIABLE

    // --ROUTER
    let router_$ID = ROUTER.router_$ID

// #REACTIVE

    $: router_update($router_$ID)

// #FUNCTIONS

    // --UPDATES
    function router_update(id)
    {
        const LINK = prop_ROUTES[id]

        if (!LINK || LINK.on) return

        try { prop_ROUTES.find(link => link.on).on = false } catch { /* recuperer le chemin dans l'url pour définir le lien sélectionné */ }

        prop_ROUTES[id] = { ...LINK, on: true }
    }

    function spring_update(state, size)
    {
        SPRING.spring_$STATE = state
        SPRING.spring_$SIZE = size
    }

    // --EVENTS
    function router_eMouseEnter(id) { spring_update(prop_ROUTES[id].on ? -1 : 1, SPRING.spring_D_SIZE * 4) }

    function router_eMouseLeave() { spring_update(0, SPRING.spring_D_SIZE) }

    async function router_eClick(id)
    {
        router_update(id)

        ROUTER.router_update(id)
    }
</script>

<!-- #HTML -->

<nav
class="router"
style:opacity={prop_OPACITY}
on:mouseleave={router_eMouseLeave}
>
    <ul>
        {#each prop_ROUTES as route}
            {#if route.actif}
                <li>
                    <Route
                    prop_ON={route.on}
                    prop_ID={route.id}
                    prop_VALUE={route.value ?? ''}
                    prop_ATTRIBUTES={route.attributes}
                    prop_$MOUSEENTER={router_eMouseEnter}
                    prop_$CLICK={router_eClick}
                    />
                </li>
            {/if}
        {/each}
    </ul>
</nav>

<!-- #STYLE -->

<style
lang="scss"
>
/* #USES */

@use '../../assets/scss/app';

@use '../../assets/scss/styles/position';
@use '../../assets/scss/styles/media';

/* #ROUTER */

.router
{
    @include position.placement(fixed, app.$gap-block, calc(app.$gap-inline * 3));

    z-index: 1;

    width: fit-content;
    height: fit-content;

    user-select: none;

    transition: opacity .4s;

    ul
    {
        display: flex;
        align-items: flex-end;

        gap: 1rem;

        width: fit-content;
        height: fit-content;
        min-height: 2.4rem;

        li
        {
            width: 100%;
            height: fit-content;
        }
    }

    @include media.min(false, $ms3)
    {
        &::before
        {
            @include position.placement(absolute, -70%, -50%, -70%, -100%, true);

            z-index: -1;

            pointer-events: none;
        }

        top: 60%;
        right: auto;
        left: app.$gap-inline;

        ul
        {
            flex-direction: column;
            align-items: flex-start;

            gap: 0;
        }
    }
    @include media.min($ms4, $ms4) { top: 55%; }
}
</style>