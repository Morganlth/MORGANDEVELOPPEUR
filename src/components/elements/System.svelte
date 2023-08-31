<!-- #MAP

-EVENT
    SYSTEM
        MOON
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
    import Orbit from '../covers/Orbit.svelte'
    import GravityArea from '../covers/GravityArea.svelte'

    // --COMPONENT-ELEMENT
    import Cube from './Cube.svelte'

    // --COMPONENT-DECOR
    import Moon from '../decors/Moon.svelte'

// #CONSTANTES

    // --ELEMENT-SYSTEM
    const SYSTEM_EVENTS =
    {
        scroll: system_e$Scroll,
        animation: system_e$Animation
    }

    // --ELEMENT-CUBE
    const CUBE_ANIMATION_UPDATE = []

// #VARIABLES

    // --ELEMENT-SYSTEM
    let
    system_START,
    system_END,
    system_SCROLL_RATIO = 0

    // --ELEMENT-ORBIT
    let orbit_RADIUS = 0

// #FUNCTIONS

    // --SET
    function system_set()
    {
        system_setVars()
        system_setEvents()
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

    // --EVENTS
    async function system_e$Scroll(scrollTop)
    {
        system_SCROLL_RATIO = (scrollTop - system_START) / system_END
    }

    async function system_e$Animation()
    {

    }

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
 
    {#each SYSTEM_ORBITS_DATAS as orbit}
        <Orbit
        prop_ROTATE={orbit.prop_ROTATE}
        >
            <GravityArea
            let:rotation
            let:grabbing
            prop_ANIMATION_UPDATE={CUBE_ANIMATION_UPDATE}
            prop_RATIO={system_SCROLL_RATIO}
            prop_ORBIT={true}
            prop_GRABBING={false}
            prop_ORBIT_RADIUS={orbit_RADIUS}
            prop_ROTATE={orbit.prop_ROTATE}
            prop_OFFSET={orbit.prop_OFFSET}
            prop_FORCE={.2}
            >
                <Cube
                prop_$ROTATION={rotation}
                prop_$GRABBING={grabbing}
                prop_ROTATE={orbit.prop_ROTATE}
                />
            </GravityArea>
        </Orbit>
    {/each}
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
    @include position.placement(absolute, 0, 0, 0, 50%);

    @extend %f-center;

    perspective: 1000px;

    transform-style: preserve-3d;
    transform: translate(30%, -30%) scale(.2);

    width: 50%;
    height: 100%;
    
    transition: transform .6s;

    &.focus { transform: scale(1); }
}
</style>