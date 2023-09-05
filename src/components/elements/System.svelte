<!-- #MAP

-EVENT
    SYSTEM
        MOON
        GROUP
            ORBIT * 5
                GRAVITYAREA
                    CUBES

        TAG

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

    // --COMPONENT-ELEMENTS
    import Tag from './Tag.svelte'
    import Cube from './Cube.svelte'

    // --COMPONENT-DECOR
    import Moon from '../decors/Moon.svelte'

// #CONSTANTES

    // --ELEMENT-SYSTEM
    const SYSTEM_EVENTS =
    {
        scroll: wait_throttle(system_e$Scroll, 50),
        resize: system_e$Resize
    }

    // --ELEMENT-GROUP
    const
    GROUP_Z_POSITIONS = new Float64Array(SYSTEM_ORBITS_DATAS.length),
    GROUP_EVENTS = { mouseMove: wait_throttle(group_e$MouseMove, 50) }

// #VARIABLES

    // --ELEMENT-SYSTEM
    let
    system_CHARGED = false,
    system_START,
    system_END,
    system_SCROLL_RATIO = 0,
    group_ROTATE_X = 0,
    group_ROTATE_Y = 0

    // --ELEMENT-GROUP
    let
    group_TIMEOUT,
    group_start,
    group_stop

    // --ELEMENT-ORBIT
    let orbit_RADIUS = 0

// #REACTIVE

    // --ELEMENT-GROUP
    $: system_CHARGED
        ? prop_FOCUS
            ? system_start()
            : system_stop()
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

    function group_setEvents() { EVENT.event_add(GROUP_EVENTS) }

    function orbit_setVars() { orbit_RADIUS = Math.min(window.innerWidth * .3, window.innerHeight * .6) }

    // --DESTROY
    function system_destroy() { system_destroyEvents() }

    function system_destroyEvents()
    {
        EVENT.event_remove(SYSTEM_EVENTS)

        group_destroyEvents()
    }

    function group_destroyEvents() { EVENT.event_remove(GROUP_EVENTS) }

    // --GET
    function group_getIndexFocus()
    {
        let index = GROUP_Z_POSITIONS.indexOf(Math.max(...GROUP_Z_POSITIONS))

        if (!~index) index = 0

        return index
    }

    // --UPDATES
    function group_update()
    {
        clearTimeout(group_TIMEOUT)

        group_updateFocus()

        group_TIMEOUT = setTimeout(group_updateFocus, 100)
    }

    function group_updateFocus()
    {
        const INDEX = prop_FOCUS ? group_getIndexFocus() : void 0

        for (let i = 0; i < GROUP_Z_POSITIONS.length; i++) SYSTEM_ORBITS_DATAS[i] = { ...SYSTEM_ORBITS_DATAS[i], focus: i === INDEX }
    }

    // --EVENTS
    async function system_e$Scroll(scrollTop)
    {
        system_SCROLL_RATIO = (scrollTop - system_START) / system_END

        if (prop_FOCUS) group_update()
    }

    async function system_e$Resize() { system_setVars() }

    async function group_e$MouseMove(clientX, clientY)
    {
        const
        VW50 = window.innerWidth * .5,
        VH50 = window.innerHeight * .5
        
        group_ROTATE_X = (clientY - VH50) / VH50
        group_ROTATE_Y = (clientX - VW50) / VW50
    }

    // --CONTROLS
    function system_start()
    {
        group_setEvents()

        group_start()
    }

    function system_stop()
    {
        group_destroyEvents()
        
        group_stop()
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
    <Group
    let:resize
    let:animation
    prop_STYLE="
        position: absolute;
        display: flex; justify-content: center; align-items: center;
        transform-style: preserve-3d;
        transform: rotate3d({group_ROTATE_X}, {group_ROTATE_Y}, 0, .03rad);
        transition: transform .3s
        "
    bind:group_start
    bind:group_stop
    >
        <Moon />

        {#each SYSTEM_ORBITS_DATAS as orbit, i}
            <Orbit
            prop_ROTATE={orbit.props.prop_ROTATE}
            >
                <GravityArea
                let:rotation
                let:grabbing
                {...orbit.props}
                prop_e$RESIZE={resize}
                prop_e$ANIMATION={animation}
                prop_RATIO={system_SCROLL_RATIO}
                prop_GRABBING={false}
                prop_ORBIT_RADIUS={orbit_RADIUS}
                prop_FORCE={.2}
                {prop_FOCUS}
                bind:gravityarea_TRANSLATE_Z={GROUP_Z_POSITIONS[i]}
                >
                    <Cube
                    prop_$ROTATION={rotation}
                    prop_$GRABBING={grabbing}
                    prop_FOCUS={orbit.focus ?? false}
                    prop_ROTATE={orbit.props.prop_ROTATE}
                    />
                </GravityArea>
            </Orbit>
        {/each}
    </Group>

    {#each SYSTEM_ORBITS_DATAS as orbit}
        <Tag
        prop_FOCUS={prop_FOCUS && (orbit.focus ?? false)}
        prop_CONTENT={orbit.tag}
        prop_X={group_ROTATE_Y * 6}
        prop_Y={group_ROTATE_X * 6}
        />
    {/each}
</div>

<!-- #STYLE -->

<style
lang="scss"
>
/* #USE */

@use '../../assets/scss/styles/position';

/* #SYSTEM */

.system
{
    @include position.placement(absolute, 0, auto, 0, 50vw);

    transform: translate(30%, -30%) scale(.2);

    width: 50vw;
    height: 100%;

    transition: transform .6s;

    &.focus { transform: scale(1); }
}
</style>