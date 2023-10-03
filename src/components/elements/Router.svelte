<!-- #MAP

-ROUTER
-EVENT
-SPRING
    ROUTER
        FRAGMENTS

-->

<!-- #SCRIPT -->

<script>
// #IMPORTS

    // --JS
    import ROUTER_LINKS_DATAS from '../../assets/js/datas/dRouter'
    import { animation_writing } from '../../assets/js/utils/animation'

    // --CONTEXTS
    import { ROUTER, EVENT, SPRING } from '../../App.svelte'

    // --SVELTE
    import { onMount, onDestroy } from 'svelte'

    // --COMPONENT-ELEMENT
    import Fragments from './Fragments.svelte'

// #CONSTANTES

    // --ELEMENT-ROUTER
    const
    ROUTER_TAGS = [],
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

        router_TIMEOUT = setTimeout(router_intro, 300)
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

    // --UPDATES
    function router_update(id)
    {
        const LINK = ROUTER_LINKS_DATAS[id]

        if (LINK.selected) return

        try { ROUTER_LINKS_DATAS.find(link => link.selected).selected = false } catch { /* recuperer le chemin dans l'url pour définir le lien sélectionné */ }

        ROUTER_LINKS_DATAS[id] = { ...LINK, selected: true }
    }

    function spring_update(state, size)
    {
        SPRING.spring_$STATE = state
        SPRING.spring_$SIZE = size
    }

    // --INTRO
    async function router_intro()
    {
        await new Promise(resolve =>
        {
            ROUTER_EVENTS.animation = animation_writing(ROUTER_TAGS, resolve)
            
            router_setEvents()
        })

        router_destroyEvents()
        
        router_CHARGED = true
    }

    // --EVENTS
    function router_eMouseEnter(id) { spring_update(ROUTER_LINKS_DATAS[id].selected ? -1 : 1, SPRING.spring_D_SIZE * 4) }

    function router_eMouseLeave() { spring_update(0, SPRING.spring_D_SIZE) }

    async function router_eClick(id) { if (router_CHARGED) ROUTER.router_update(id) }

// #CYCLE

onMount(router_set)
onDestroy(router_destroy)
</script>

<!-- #HTML -->

<nav
class="router"
class:charged={router_CHARGED}
style:opacity={router_OPACITY}
>
    <ul>
        <!-- svelte-ignore a11y-no-static-element-interactions a11y-missing-attribute -->
        {#each ROUTER_LINKS_DATAS as link, id}
            <li>
                <a
                class:selected={link.selected}
                aria-label={link.label}
                {...link.attributes}
                on:mouseenter={router_eMouseEnter.bind(null, id)}
                on:mouseleave={router_eMouseLeave}
                on:click|preventDefault={router_eClick.bind(null, id)}
                >
                    <Fragments
                    prop_TAGS={{ children: ROUTER_TAGS, value: link.content }}
                    />
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

    &.charged a { cursor: pointer; }

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

    a
    {
        &::before
        {
            @include position.placement(absolute, 50%, 0, 0, 0, true);

            transform: translateX(-50%) scaleX(.05);

            width: 100%;
            height: 0;
            
            border-top: solid $light 1px;
        }

        @include font.content($light, false, $line-height: 1.4);

        @extend %any;

        position: relative;

        display: inline-block;

        transform: rotate(-.8deg);

        opacity: .9;

        width: 100%;
        height: fit-content;
        
        padding-inline: 1.1rem;

        pointer-events: auto;

        box-sizing: border-box;

        text-decoration: none;

        cursor: default;

        transition: opacity .3s;

        &::after
        {
            @include position.placement(absolute, 50%, 0, 0, 0, true);

            @extend %any;

            transform: translateY(-50%) scale(1, 0);

            border: solid $primary 1px;
            
            box-shadow: 0 0 5px $primary;
            box-sizing: border-box;
        }

        &.selected
        {
            &::before
            {
                border-top-color: $primary;

                animation: aSelected-before .3s ease-out;

                @keyframes aSelected-before { 100% { transform: scaleX(1); } }
            }

            opacity: 1;

            animation: aSelected .4s forwards;

            @keyframes aSelected
            {
                40% { color: $indicator; }
                100% { color: $primary; }    
            }

            &::after
            {
                animation: aSelected-after .2s linear .25s forwards;

                @keyframes aSelected-after { 100% { transform: translateY(-50%) scale(1); } }
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

        top: 60%;
        right: auto;
        left: app.$gap-inline;

        ul
        {
            flex-direction: column;
            align-items: flex-start;

            gap: 0;
        }

        a { font-size: map.get(font.$font-sizes, s3); }
    }
    @include media.min($ms4, $ms4) { top: 55%; }
}
</style>