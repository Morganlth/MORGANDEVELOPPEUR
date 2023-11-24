<!----------------------------------------------- #||--router--|| -->


<!-- #|-CONTEXT-| -->
<!--
<script
context="module"
>

// #\-IMPORTS-\

    // --SVELTE

     // --LIB

    // --JS


// #\-EXPORTS-\

    // --CONTEXTS


</script>
-->

<!-- #|-HTML-| -->

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
                    <span
                    class="indicator"
                    >
                        <Icon
                        prop_SIZE="1rem"
                        prop_COLOR={COLORS.intermediate}
                        prop_SPRING={false}
                        >
                            <Indicator
                            prop_FOCUS={route.on}
                            />
                        </Icon>
                    </span>
            
                    <Route
                    prop_ON={route.on}
                    prop_ID={route.id}
                    prop_VALUE={route.value ?? ''}
                    prop_ATTRIBUTES={route.attributes}
                    prop_e$mouseEnter={router_eMouseEnter}
                    on:click={route_eClick}
                    />
                </li>
            {/if}
        {/each}
    </ul>
</nav>


<!-- #|-SCRIPT-| -->

<script>

// #\-IMPORTS-\

    // --DATA

    // --SVELTE

    // --LIB
    import COLORS from '$lib/colors'

    // --CONTEXTS
    import { ROUTER, SPRING } from '../../App.svelte'

//=======@COMPONENTS|

    // --*
    import Icon from '../../global/covers/Icon.svelte'

    import Indicator from '../../global/icons/Indicator.svelte'

    import Route from './Route.svelte'
            
//=======@STYLE|

    // --*
    import '../../assets/scss/global/router.scss'


// #\-EXPORTS-\

    // --PROPS
    export let
    prop_HIDE = false
    ,
    prop_ROUTES = []

    // --BINDING


// #\-CONSTANTES-\

    // --SVELTE

    // --CONTEXTS

    // --OUTSIDE

    // --THIS

    // --INSIDE


// #\-VARIABLES-\

    // --CONTEXTS
    let router_$ID = ROUTER.router_$ID

    // --OUTSIDE

    // --THIS

    // --INSIDE


// #\-REATIVES-\

    // --CONTEXTS

    // --OUTSIDE

    // --THIS
    $: router_update($router_$ID)

    // --INSIDE


// #\-FUNCTIONS-\

//=======@LIFE|

    // --SVELTE

    // --SET

    // --GET

    // --UPDATES
    function spring_update(state, size)
    {
        SPRING.spring_$STATE = state
        SPRING.spring_$SIZE = size
    }

    function router_update(id)
    {
        const LINK = prop_ROUTES[id]

        if (!LINK || LINK.on) return

        try { prop_ROUTES.find(link => link.on).on = false } catch { /* recuperer le chemin dans l'url pour définir le lien sélectionné */ }

        prop_ROUTES[id] = { ...LINK, on: true }
    }

    // --DESTROY


//=======@COMMANDS|

    // --*


//=======@EVENTS|

    // --*
    function router_eMouseEnter(id) { spring_update(prop_ROUTES[id].on ? -1 : 1, SPRING.spring_D_SIZE * 4) }

    function router_eMouseLeave() { spring_update(0, SPRING.spring_D_SIZE) }

    async function route_eClick({ detail: {id} })
    {
        router_update(id)

        ROUTER.router_update(id)
    }


//=======@TRANSITIONS|

    // --*


//=======@ANIMATIONS|

    // --*


//=======@UTILS|

    // --*


</script>


<!-- #|-STYLE-| -->

<style
lang="scss"
>

/* #\-USES-\ */

    /* --SASS */

    /* --APP */
    @use '../../assets/scss/app';

    /* --DEPENDENCIES */
    @use '../../assets/scss/styles/utils';

    /* --MEDIA */
    @use '../../assets/scss/styles/media';


/* #\-VARIABLES-\ */

    /* --* */


/* #\-THIS-\ */

.router
{
    &, ul, li
    {
        width:  fit-content;
        height: fit-content;
    }

    @include utils.placement(fixed, $top: app.$gap-block, $left: 38%, $z: 1);

    pointer-events: auto;

    mix-blend-mode: difference;

    ul
    {
        display:     flex;
        align-items: flex-end;

        transform: rotate(-.01rad);

        max-width:  calc(50vw - app.$gap-inline * 2);
        min-height: 2.4rem;

        li { position: relative; }

        .indicator
        {
            @include utils.placement(absolute, $top: 50%, $left: 0);

            display: none;

            transform: translate(-250%, -50%);
        }
    }

    @include media.min($height: $ms3)
    {
        &::before
        {
            @include utils.placement(absolute, -70%, -50%, -70%, -100%, -1, true);

            pointer-events: none;
        }

        top:  56%;
        left: app.$gap-inline;

        ul
        {
            flex-direction: column;
            align-items:    flex-start;

            max-width: none;

            li { width: 100%; }

            .indicator { display: inline-block; }
        }
    }
}


</style>