<!-- #MAP

-COMMAND
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
    prop_RATIO = 0

// #IMPORTS

    // --JS
    import { SYSTEM_ORBITS_DATAS } from '../../assets/js/datas/dSystem'
    import { wait_throttle } from '../../assets/js/utils/wait'

    // --CONTEXTS
    import { COMMAND, EVENT } from '../../App.svelte'

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
    const SYSTEM_COMMANDS =
    [
        {
            name: 'system_optimise',
            callback: system_c$Optimise,
            params: { defaultValue: false, optimise: { value: true } },
            tests: { testBoolean: true },
            storage: true
        }
    ]

    // --ELEMENT-GROUP
    const
    GROUP_Z_POSITIONS = new Float64Array(SYSTEM_ORBITS_DATAS.length),
    GROUP_EVENTS =
    {
        scroll: wait_throttle(group_e$Scroll, 200),
        mouseMove: wait_throttle(group_e$MouseMove, 50)
    }

    // --ELEMENT-ORBIT
    const ORBIT_EVENTS = { resize: orbit_e$Resize }

// #VARIABLES

    // --ELEMENT-SYSTEM
    let
    system_CHARGED = false,
    system_OPTIMISED = false

    // --ELEMENT-GROUP
    let
    group_ROTATE_X = 0,
    group_ROTATE_Y = 0,
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
        system_setCommands()

        orbit_setVars()
        orbit_setEvents()

        system_CHARGED = true
    }

    function system_setCommands() { COMMAND.command_setBasicCommands(SYSTEM_COMMANDS) }

    function group_setEvents() { EVENT.event_add(GROUP_EVENTS) }

    function orbit_setVars() { orbit_RADIUS = Math.min(window.innerWidth * .3, window.innerHeight * .6) }

    function orbit_setEvents() { EVENT.event_add(ORBIT_EVENTS) }

    // --DESTROY
    function system_destroy()
    {
        group_destroyEvents()
        orbit_destroyEvents()
    }

    function group_destroyEvents() { EVENT.event_remove(GROUP_EVENTS) }

    function orbit_destroyEvents() { EVENT.event_remove(ORBIT_EVENTS) }

    // --GET
    function group_getIndexFocus()
    {
        let index = GROUP_Z_POSITIONS.indexOf(Math.max(...GROUP_Z_POSITIONS))

        if (!~index) index = 0

        return index
    }

    // --UPDATES
    function system_update(optimised)
    {
        system_OPTIMISED = optimised

        optimised ? system_stop() : system_start()
    }

    function group_updateFocus()
    {
        const INDEX = prop_FOCUS && !system_OPTIMISED ? group_getIndexFocus() : void 0

        for (let i = 0; i < GROUP_Z_POSITIONS.length; i++) SYSTEM_ORBITS_DATAS[i] = { ...SYSTEM_ORBITS_DATAS[i], focus: i === INDEX }
    }

    // --COMMAND
    function system_c$Optimise(optimised) { COMMAND.command_test(optimised, 'boolean', system_update, SYSTEM_COMMANDS[0].name, system_OPTIMISED) }

    // --EVENTS
    async function group_e$Scroll()
    {
        clearTimeout(group_TIMEOUT)

        group_updateFocus()

        group_TIMEOUT = setTimeout(group_updateFocus, 300)
    }

    async function group_e$MouseMove(clientX, clientY)
    {
        const [VW50, VH50] = [window.innerWidth * .5, window.innerHeight * .5]
        
        group_ROTATE_X = (clientY - VH50) / VH50
        group_ROTATE_Y = (clientX - VW50) / VW50
    }

    async function orbit_e$Resize() { orbit_setVars() }

    // --CONTROLS
    function system_start()
    {
        if (system_OPTIMISED) return

        group_setEvents()

        group_start()
    }

    function system_stop()
    {
        group_destroyEvents()
        group_updateFocus()
        
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
    transition: transform .3s;"
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
                prop_e$RESIZE={resize}
                prop_e$ANIMATION={animation}
                prop_FOCUS={orbit.focus ?? false}
                prop_GRABBING={false}
                prop_ORBIT_RADIUS={orbit_RADIUS}
                prop_ROTATE={orbit.props.prop_ROTATE}
                prop_OFFSET={orbit.props.prop_OFFSET}
                prop_FORCE={.2}
                {prop_RATIO}
                bind:gravityarea_TRANSLATE_Z={GROUP_Z_POSITIONS[i]}
                >
                    <Cube
                    prop_$ROTATION={rotation}
                    prop_$GRABBING={grabbing}
                    prop_FOCUS={orbit.focus ?? false}
                    prop_ROTATE={orbit.props.prop_ROTATE}
                    prop_SRC={orbit.props.prop_SRC}
                    prop_ALT={orbit.props.prop_ALT}
                    prop_COLOR={orbit.props.prop_COLOR}
                    />
                </GravityArea>
            </Orbit>
        {/each}
    </Group>

    <Group
    prop_STYLE="
    position: absolute;
    top: 51%;
    left: 0;
    transform: translateY(-50%);
    width: fit-content;
    height: fit-content;"
    >
        {#each SYSTEM_ORBITS_DATAS as orbit}
            <Tag
            prop_FOCUS={(orbit.focus ?? false) || system_OPTIMISED && prop_FOCUS}
            prop_OPTIMISED={system_OPTIMISED}
            prop_CONTENT={orbit.tag}
            prop_X={group_ROTATE_Y * 6}
            prop_Y={group_ROTATE_X * 6}
            />
        {/each}
    </Group>
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