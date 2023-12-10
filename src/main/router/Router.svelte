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
class="router s-fit p-y--"
class:hide={prop_HIDE}
itemscope
itemtype="https://schema.org/SiteNavigationElement"
on:mouseleave={router_eMouseLeave}
>
    <ul
    class="d-flx s-fit"
    >
        {#each prop_ROUTES as route, i}
        {@const {actif, on, id, value, attributes} = route}
            {#if actif}
                <li
                class="p-rlt s-fit"
                style:--route-t-delay="{i * 100}ms"
                itemprop="name"
                >
                    <span
                    class="indicator d-hid"
                    >
                        <Icon
                        prop_SIZE="1rem"
                        prop_COLOR={COLORS.intermediate}
                        prop_SPRING={false}
                        >
                            <Indicator
                            prop_FOCUS={on}
                            />
                        </Icon>
                    </span>
            
                    <Route
                    prop_ON={on}
                    prop_ID={id}
                    prop_VALUE={value ?? ''}
                    prop_ATTRIBUTES={attributes}
                    on:click={route_eClick}
                    on:mouseenter={route_eMouseEnter}
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
    prop_ROUTES = []
    ,
    prop_HIDE = false

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
        SPRING.spring_$SIZE  = size
    }

    function router_update(id)
    {
        const LINK = prop_ROUTES[id]

        if (!LINK || LINK.on) return

        try { prop_ROUTES.find(link => link.on).on = false } catch {}

        prop_ROUTES[id] = { ...LINK, on: true }
    }

    // --DESTROY


//=======@COMMANDS|

    // --*


//=======@EVENTS|

    // --*
    function route_eMouseEnter({ detail: {id} }) { spring_update(prop_ROUTES[id].on ? -1 : 1, SPRING.spring_D_SIZE * 4) }

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
    @include utils.placement(fixed, $top: app.$gap-block, $left: 38%, $z: 1);

    mix-blend-mode: difference;

    ul
    {
        align-items: flex-end;

        max-width : calc(50vw - app.$gap-inline * 2);
        min-height: 2.4rem;

        .indicator
        {
            @include utils.placement(absolute, $top: 50%, $left: 0);

            transform: translate(-250%, -50%);
        }

        @include media.min($ms4, $ms4) { transform: rotate(-.01rad); }
    }

    @include media.min($height: $ms3)
    {
        &::before
        {
            @include utils.placement(absolute, -70%, -50%, -70%, -100%, -1, true);

            pointer-events: none;
        }

        top : 58%;
        left: app.$gap-inline;

        ul
        {
            flex-direction: column;
            align-items   : flex-start;

            max-width: none;

            li { width: 100%; }

            .indicator { display: inline-block !important; }
        }
    }
}


</style>