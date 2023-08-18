<!-- #MAP

    CUBE
        \ SIDE * 6

-->

<!-- #SCRIPT -->

<script>
// #EXPORTS

    // --PROPS
    export let
    prop_$GRABBING,
    prop_$ROTATION,
    prop_ROTATE,
    prop_ROTATE_Y

// #IMPORTS

    // --LIB
    import COLORS from '$lib/colors'

    // --CONTEXT
    import { EVENT } from '../../App.svelte'

    // --SVELTE
    import { onMount, onDestroy, createEventDispatcher } from 'svelte'

    // --COMPONENT-COVER
    import Icon from '../covers/Icon.svelte'

    // --COMPONENT-ICON
    import Logo from '../icons/Logo.svelte'

// #CONSTANTE

    // --SVELTE
    const SVELTE_DISPATCH = createEventDispatcher()

    // --ELEMENT-CUBE
    const CUBE_EVENTS = { mouseUp: cube_e$MouseUp }

// #VARIABLES

    // --ELEMENT-CUBE
    let
    cube_CHARGED = false,
    cube_ROTATE = prop_ROTATE,
    cube_ROTATE_Y = prop_ROTATE_Y,
    cube_LAST_MOUSEDOWN

// #REACTIVE

    // --ELEMENT-CUBE
    $: cube_CHARGED ? cube_updatePosition($prop_$ROTATION) : null

// #FUNCTIONS

    // --SET
    function cube_set() { cube_CHARGED = true }

    function cube_setEvents() { EVENT.event_add(CUBE_EVENTS) }

    // --DESTROY

    function cube_destroy() { cube_destroyEvents() }

    function cube_destroyEvents() { EVENT.event_remove(CUBE_EVENTS) }

    // --UPDATES
    function cube_updatePosition({ rX, rY })
    {
        cube_ROTATE += rX
        cube_ROTATE_Y += rY
    }

    function cube_updateCursor(grabbing) { prop_$GRABBING.set(grabbing) }

    // --EVENTS
    function cube_eMouseDown() // no async
    {
        cube_updateCursor(true)

        cube_setEvents()

        cube_LAST_MOUSEDOWN = +new Date()
    }

    function cube_e$MouseUp() // no async
    {
        if (+new Date() - cube_LAST_MOUSEDOWN < 200) SVELTE_DISPATCH('click')

        cube_updateCursor(false)
    
        cube_destroyEvents()
    }

// #CYCLES

onMount(cube_set)
onDestroy(cube_destroy)
</script>

<!-- #HTML -->

<!-- svelte-ignore a11y-no-static-element-interactions -->
<div
class="cube"
style:transform="rotate({cube_ROTATE}rad) rotateY({cube_ROTATE_Y}rad)"
on:mousedown={cube_eMouseDown}
>
    {#each [0, 1, 2, 3, 4, 5] as id}
        <div
        class="side"
        class:grabbing={$prop_$GRABBING}
        data-side-id={id}
        >
            <Icon
            prop_SIZE="30%"
            prop_COLOR={COLORS.light}
            prop_SPRING={false}
            >
                <Logo />
            </Icon>
        </div>
    {/each}
</div>

<!-- #STYLE -->

<style
lang="scss"
>
/* #USES */

@use '../../assets/scss/styles/display';
@use '../../assets/scss/styles/size';

/* #CUBE */

.cube
{
    &, .side { @extend %any; }

    transform-style: preserve-3d;
    transform-origin: center;

    cursor: grab;

    transition: transform .35s ease-out;

    .side
    {
        @extend %f-center;

        background-color: $dark;

        border: solid $primary calc(var(--content-size) * .05);

        box-sizing: border-box;

        transition: border .7s ease-in;

        &.grabbing { border-color: $indicator; }
    }
    .side:nth-child(1) { transform: translateZ(calc(var(--content-size) / 2)); }
    .side:nth-child(2) { transform: translateY(-150%) rotateX(-90deg); }
    .side:nth-child(3) { transform: translate(-50%, -200%) rotateY(90deg) scaleX(-1); }
    .side:nth-child(4) { transform: translateY(-250%) rotateX(90deg); }
    .side:nth-child(5) { transform: translate(50%, -400%) rotateY(-90deg); }
    .side:nth-child(6) { transform: translateY(-500%) translateZ(calc(var(--content-size) / -2)); }
}
</style>