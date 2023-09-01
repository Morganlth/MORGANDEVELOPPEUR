<!-- #MAP

-EVENT
    SYSTEM
        MOON
        GROUP
            ORBIT * 5
                GRAVITYAREA
                    CUBES

-->

<!-- #SCRIPT -->

<script>
// #EXPORTS

    // --PROPS
    export let
    prop_FOCUS = false,
    prop_OFFSET_TOP,
    prop_BREAK

// #IMPORTS

    // --JS
    import { SYSTEM_ORBITS_DATAS } from '../../assets/js/datas/dSystem'
    import { wait_throttle } from '../../assets/js/utils/wait'

    // --CONTEXT
    import { EVENT } from '../../App.svelte'

    // --SVELTE
    import { onMount, onDestroy } from 'svelte'

    // --COMPONENT-COVERS
    import Group from '../covers/Group.svelte'
    import Orbit from '../covers/Orbit.svelte'
    import GravityArea from '../covers/GravityArea.svelte'

    // --COMPONENT-ELEMENT
    import Cube from './Cube.svelte'

    // --COMPONENT-DECOR
    import Moon from '../decors/Moon.svelte'

// #CONSTANTE

    // --ELEMENT-SYSTEM
    const SYSTEM_EVENTS = { scroll: wait_throttle(system_e$Scroll, 50) }

// #VARIABLES

    // --ELEMENT-SYSTEM
    let
    system_CHARGED = false,
    system_START,
    system_END,
    system_SCROLL_RATIO = 0

    // --ELEMENT-GROUP
    let
    group_start,
    group_stop

    // --ELEMENT-ORBIT
    let orbit_RADIUS = 0

// #REACTIVE

    // --ELEMENT-GROUP
    $: system_CHARGED
        ? prop_FOCUS
            ? group_start()
            : group_stop()
        : void 0

// #FUNCTIONS

    // --SET
    function system_set()
    {
        system_setVars()
        system_setEvents()

        system_CHARGED = true
    }

    function system_setVars()
    {
        const HEIGHT = window.innerHeight

        system_START = prop_OFFSET_TOP * HEIGHT
        system_END = prop_BREAK * HEIGHT

        orbit_setVars()
    }

    function system_setEvents() { EVENT.event_add(SYSTEM_EVENTS) }

    function orbit_setVars() { orbit_RADIUS = Math.min(window.innerWidth * .3, window.innerHeight * .6) }

    // --DESTROY
    function system_destroy() { system_destroyEvents() }

    function system_destroyEvents() { EVENT.event_remove(SYSTEM_EVENTS) }

    // --EVENT
    async function system_e$Scroll(scrollTop) { system_SCROLL_RATIO = (scrollTop - system_START) / system_END }

// #CYCLES

onMount(system_set)
onDestroy(system_destroy)
</script>

<!-- #HTML -->

<div
class="system"
class:focus={prop_FOCUS}
>
<Moon
prop_SIZE={25}
/>

<Group
let:resize
let:animation
prop_STYLE="position: absolute; transform-style: preserve-3d"
bind:group_start
bind:group_stop
>
    {#each SYSTEM_ORBITS_DATAS as orbit}
        <Orbit
        prop_ROTATE={orbit.prop_ROTATE}
        >
            <GravityArea
            let:rotation
            let:grabbing
            prop_e$RESIZE={resize}
            prop_e$ANIMATION={animation}
            prop_RATIO={system_SCROLL_RATIO}
            prop_GRABBING={false}
            prop_ORBIT_RADIUS={orbit_RADIUS}
            prop_ROTATE={orbit.prop_ROTATE}
            prop_OFFSET={orbit.prop_OFFSET}
            prop_FORCE={.2}
            {prop_FOCUS}
            >
                <Cube
                prop_$ROTATION={rotation}
                prop_$GRABBING={grabbing}
                prop_ROTATE={orbit.prop_ROTATE}
                />
            </GravityArea>
        </Orbit>
    {/each}
</Group>
</div>

<!-- #STYLE -->

<style
lang="scss"
>
/* #USES */

@use '../../assets/scss/styles/position';
@use '../../assets/scss/styles/display';

/* #SYSTEM */

.system
{
    @include position.placement(absolute, 0, auto, 0, 50vw);

    @extend %f-center;

    transform-style: preserve-3d;
    transform: translate(30%, -30%) scale(.2);

    width: 50vw;
    height: 100%;

    transition: transform .6s;

    &.focus { transform: scale(1); }
}
</style>