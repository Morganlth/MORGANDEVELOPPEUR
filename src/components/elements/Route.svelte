<!-- #MAP

-EVENT
    ROUTE
        FRAGMENTS

-->

<!-- #SCRIPT -->

<script>
// #EXPORTS

    // --PROPS
    export let
    prop_ON = false,
    
    prop_ID = 0,
    prop_VALUE = '',
    prop_ATTRIBUTES = {},

    prop_$MOUSEENTER = () => {}

// #IMPORTS

    // --JS
    import { animation_writing } from '../../assets/js/utils/animation'

    // --CONTEXT
    import { EVENT } from '../../App.svelte'

    // --SVELTE
    import { onMount, onDestroy } from 'svelte'
    import { createEventDispatcher } from 'svelte'

    // --COMPONENT-ELEMENT
    import Fragments from './Fragments.svelte'

// #CONSTANTES

    // --SVELTE
    const SVELTE_DISPATCH = createEventDispatcher()

    // --ELEMENT-ROUTES
    const
    ROUTE_TAGS = [],
    ROUTE_EVENTS = {}

// #FUNCTIONS

    // --SET
    function route_set() { route_intro() }

    function route_setEvents() { EVENT.event_add(ROUTE_EVENTS) }

    // --DESTROY
    function route_destroy() { route_destroyEvents() }

    function route_destroyEvents() { EVENT.event_remove(ROUTE_EVENTS) }

    // --EVENTS
    function route_eMouseEnter() { prop_$MOUSEENTER(prop_ID) }

    function route_eClick() { SVELTE_DISPATCH('click', { id: prop_ID }) }

    // --INTRO
    async function route_intro()
    {
        await new Promise(resolve =>
        {
            ROUTE_EVENTS.animation = animation_writing(ROUTE_TAGS, resolve)
            
            route_setEvents()
        })

        route_destroyEvents()
    }

// #CYCLES

onMount(route_set)
onDestroy(route_destroy)
</script>

<!-- #HTML -->

<!-- svelte-ignore a11y-no-static-element-interactions a11y-missing-attribute -->
<a
class="route"
class:selected={prop_ON}
{...prop_ATTRIBUTES}
on:mouseenter={route_eMouseEnter}
on:click|preventDefault={route_eClick}
>
    <Fragments
    prop_TAGS={{ children: ROUTE_TAGS, value: prop_VALUE }}
    />
</a>

<!-- #STYLE -->

<style
lang="scss"
>
/* #USES */

@use 'sass:map';

@use '../../assets/scss/styles/position';
@use '../../assets/scss/styles/display';
@use '../../assets/scss/styles/size';
@use '../../assets/scss/styles/font';
@use '../../assets/scss/styles/media';

/* #ROUTE */

.route
{
    @include font.content($light, false);

    @extend %f-a-center;
    @extend %any;

    position: relative;

    transform: rotate(-.8deg);

    opacity: .9;

    width: 100%;
    height: 3.2rem;
    
    padding-inline: 1.1rem;

    pointer-events: auto;

    box-sizing: border-box;

    text-decoration: none;

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

    @include media.min(false, $ms3)
    {
        &::before
        {
            @include position.placement(absolute, 50%, 0, 0, 0, true);

            transform: translateX(-50%) scaleX(.05);

            width: 100%;
            height: 0;
            
            border-top: solid $light 1px;
        }

        font-size: map.get(font.$font-sizes, s3);

        &.selected::before
        {
            border-top-color: $primary;

            animation: aSelected-before .3s ease-out;

            @keyframes aSelected-before { 100% { width: 100%; } }
        }
    }
}
</style>