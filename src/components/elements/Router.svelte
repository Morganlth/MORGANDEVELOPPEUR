<!-- #MAP

-ROUTER
-EVENT
    ROUTER

-->

<!-- #SCRIPT -->

<script>
// #IMPORTS

    // --JS
    import ROUTER_LINKS_DATAS from '../../assets/js/datas/dRouter'
    import { animation_writing } from '../../assets/js/utils/animation'

    // --CONTEXTS
    import { ROUTER, EVENT } from '../../App.svelte'

    // --SVELTE
    import { onMount, onDestroy } from 'svelte'

    // --COMPONENT-ELEMENT
    import Char from './Char.svelte'

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
    router_TIMEOUT

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
            ROUTER_EVENTS.animation = animation_writing(ROUTER_CHILDREN, resolve)
            
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
                        <Char
                        prop_CHILDREN={ROUTER_CHILDREN}
                        prop_CHAR={char}
                        />
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

@use 'sass:map';

@use '../../assets/scss/app';

@use '../../assets/scss/styles/position';
@use '../../assets/scss/styles/size';
@use '../../assets/scss/styles/font';
@use '../../assets/scss/styles/media';

/* #ROUTER */

.router
{
    @include position.placement(fixed, app.$gap-block, calc(app.$gap-inline * 3));

    z-index: 1;

    opacity: 0;

    width: fit-content;
    height: fit-content;

    user-select: none;

    transition: opacity .3s;

    ul
    {
        display: flex;
        align-items: flex-end;

        gap: 1.2rem;

        width: fit-content;
        height: 2.5rem;

        li
        {
            width: 100%;
            height: fit-content;
        }
    }

    a
    {
        @include font.interact($light, map.get(font.$font-sizes, s2));

        @extend %any;
        @extend %selected;

        display: inline-block;

        transform: rotate(-.7deg);

        width: 100%;
        height: fit-content;
        
        padding-inline: 1.1rem;

        pointer-events: auto;

        box-sizing: border-box;

        text-decoration: none;
    }

    @include media.min(false, $ms3)
    {
        top: 63%;
        right: auto;
        left: app.$gap-inline;

        ul
        {
            flex-direction: column;
            align-items: flex-start;
        }

        a { font-size: map.get(font.$font-sizes, s3); }
    }
    @include media.min(false, $ms4) { top: 50%; }
}
</style>