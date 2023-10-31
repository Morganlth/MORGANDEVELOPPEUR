<!-- #MAP

-ROUTER
-SPRING
    ROUTER
        ICON * n
            ARROW
        ROUTE * n

-->

<!-- #SCRIPT -->

<script>
// #EXPORTS

    // --PROPS
    export let
    prop_ROUTES = [],

    prop_HIDE = false

// #IMPORTS

    // --LIB
    import COLORS from '$lib/colors'

    // --CONTEXTS
    import { ROUTER, SPRING } from '../../../App.svelte'

    // --COMPONENT-COVER
    import Icon from '../../covers/Icon.svelte'

    // --COMPONENT-ELEMENT
    import Route from './Route.svelte'

     // --COMPONENT-ICON
     import Arrow from '../../icons/Arrow.svelte'

// #VARIABLE

    // --ROUTER
    let router_$ID = ROUTER.router_$ID

// #REACTIVE

    // --ELEMENT-ROUTER
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

    async function route_eClick({ detail: {id} })
    {
        router_update(id)

        ROUTER.router_update(id)
    }
</script>

<!-- #HTML -->

<nav
class="router"
class:hide={prop_HIDE}
on:mouseleave={router_eMouseLeave}
>
    <ul>
        {#each prop_ROUTES as route, i}
            {#if route.actif}
                <li
                style:--route-t-delay="{i * 100}ms"
                >
                    <Icon
                    prop_SIZE="1rem"
                    prop_COLOR={COLORS.intermediate}
                    prop_SPRING={false}
                    >
                        <Arrow
                        prop_FOCUS={route.on}
                        />
                    </Icon>
            
                    <Route
                    prop_ON={route.on}
                    prop_ID={route.id}
                    prop_VALUE={route.value ?? ''}
                    prop_ATTRIBUTES={route.attributes}
                    prop_$MOUSEENTER={router_eMouseEnter}
                    on:click={route_eClick}
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

@use '../../../assets/scss/app';

@use '../../../assets/scss/styles/position';
@use '../../../assets/scss/styles/media';

/* #ROUTER */

.router
{
    $t-duration: .4s;
    $li-d-clip: polygon(-10% -10%, 110% -10%, 110% 110%, -10% 110%);

    @include position.placement(fixed, $top: app.$gap-block, $left: 38%);

    z-index: 1;

    width: fit-content;
    height: fit-content;

    mix-blend-mode: difference;

    user-select: none;

    &.hide
    {
        &:hover :global .route, :global .route:focus { clip-path: $li-d-clip !important; }

        ul :global .route { clip-path: polygon(0 0, 0 0, 0 100%, 0% 100%); }
    }

    ul
    {
        display: flex;
        align-items: flex-end;
        flex-wrap: wrap;

        width: fit-content;
        max-width: calc(50vw - app.$gap-inline * 2);
        height: fit-content;
        min-height: 2.4rem;

        li
        {
            position: relative;

            width: fit-content;
            height: fit-content;
        }

        :global
        {
            .icon
            {
                @include position.placement(absolute, $top: 50%, $left: 0);

                display: none;

                transform: translate(-250%, -50%);
            }

            .route
            {
                clip-path: $li-d-clip;

                transition: clip-path $t-duration var(--route-t-delay, 0s) ease-out;
            }
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

        top: max(36%, 48rem);
        left: app.$gap-inline;

        ul
        {
            flex-direction: column;
            align-items: flex-start;

            max-width: auto;

            li { width: 100%; }

            :global .icon { display: inline-block; }
        }
    }
    @include media.min($ms4, $ms4) { top: 54%; }
}
</style>