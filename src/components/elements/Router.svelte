<!-- #MAP

-ROUTER
-EVENT
    ROUTER

-->

<!-- #SCRIPT -->

<script>
// #IMPORTS

    // --JS
    import ROUTER_LINKS_DATAS from '../../assets/js/datas/dRouter_links'

    // --CONTEXTS
    import { ROUTER, EVENT } from '../../App.svelte'

    // --SVELTE
    import { onMount, onDestroy } from 'svelte'

// #CONSTANTES

    // --ELEMENT-ROUTER
    const
    ROUTER_CHILDREN = [],
    ROUTER_EVENTS = []

// #VARIABLE

    // --ROUTER
    let router_$ID = ROUTER.router_$ID

    // --ELEMENT-ROUTER
    let
    router_CHARGED = false,
    router_OPACITY = 0,
    router_TIMEOUT,
    router_LAST = +new Date(),
    router_I = 0,
    router_J = 0

// #REACTIVE

    $: router_CHARGED ? router_update($router_$ID) : void 0

// #FUNCTIONS

    // --SET
    function router_set()
    {
        router_setVars()

        router_TIMEOUT = setTimeout(router_intro, 500)
    }

    function router_setVars() { router_OPACITY = 1 }

    function router_setEvents() { EVENT.event_add(ROUTER_EVENTS) }

    // --DESTROY
    function router_destroy()
    {
        clearTimeout(router_TIMEOUT)

        router_destroyEvents()
    }

    function router_destroyEvents() { EVENT.event_remove(ROUTER_EVENTS) }

     // --INTRO
    async function router_intro()
    {
        await new Promise(resolve =>
        {
            ROUTER_EVENTS.animation = router_a$Writing.bind(null, resolve)
            
            router_setEvents()
        })

        router_destroyEvents()
        
        router_CHARGED = true
    }

    // --UPDATE
    function router_update(id)
    {
        const LINK = ROUTER_LINKS_DATAS[id]

        if (LINK.on) return

        try { ROUTER_LINKS_DATAS.find(link => link.on).on = false } catch { /* recuperer le chemin dans l'url pour définir le lien sélectionné */ }

        ROUTER_LINKS_DATAS[id] = { ...LINK, on: true }   
    }

    // --EVENT
    async function router_eClick(id) { if (router_CHARGED) ROUTER.router_update(id) }

    // --ANIMATION
    async function router_a$Writing(resolve)
    {
        const
        NOW = +new Date(),
        GAP = NOW - router_LAST

        for (let k = router_I; k < router_J; k++) ROUTER_CHILDREN[k].innerText = [' ', '>'][Math.round(Math.random())]

        if (GAP > 16.67)
        {
            const MAX = ROUTER_CHILDREN.length - 1

            if (router_J < MAX && router_J < router_I + 5) router_J++
    
            if (GAP > 33.34)
            {
                const CHILD = ROUTER_CHILDREN[router_I]

                CHILD.innerText = CHILD.dataset.char

                if (router_I++ >= MAX) resolve()

                router_LAST = NOW
            }
        }
    }

// #CYCLE

onMount(router_set)
onDestroy(router_destroy)
</script>

<!-- #HTML -->

<nav
class="router"
style:opacity={router_OPACITY}
>
    <ul>
        <!-- svelte-ignore a11y-no-static-element-interactions a11y-missing-attribute -->
        {#each ROUTER_LINKS_DATAS as link, id}
            <li>
                <a
                class:selected={link.on}
                aria-label={link.label}
                {...link.attributes}
                on:click|preventDefault={router_eClick.bind(null, id)}
                >
                    {#each link.content as char}
                        <span
                        data-char={char}
                        bind:this={ROUTER_CHILDREN[ROUTER_CHILDREN.length]}
                        >&nbsp;</span>
                    {/each}
                </a>
            </li>
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
@use '../../assets/scss/styles/size';
@use '../../assets/scss/styles/font';
@use '../../assets/scss/styles/media';

/* #ROUTER */

.router
{
    @include position.placement(fixed, 50%, auto, auto, app.$gap-inline);

    z-index: 1;

    opacity: 0;

    width: fit-content;
    height: fit-content;

    user-select: none;

    transition: opacity .3s;

    ul
    {
        display: flex;

        gap: 1rem;

        @include media.min(false, $ms3)
        {
            display: block;
    
            gap: 0;
        }
    }

    a
    {
        @include font.interact($light, 2.4rem, 1.5);

        @extend %any;
        @extend %selected;

        position: relative;

        display: inline-block;

        transform: rotate(-.7deg);

        margin-bottom: .5rem;
        padding-inline: 1rem;

        pointer-events: auto;

        box-sizing: border-box;

        text-decoration: none;
    }
}
</style>