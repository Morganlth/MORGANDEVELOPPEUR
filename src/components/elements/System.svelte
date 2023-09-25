<!-- #MAP

-APP
-COMMAND
-EVENT
    SYSTEM
        GROUP
            MOON
            ORBIT * n
                GRAVITYAREA
                    CUBES

        GROUP
            TAG * n

-->

<!-- #SCRIPT -->

<script>
// #EXPORTS

    // --PROPS
    export let
    prop_FOCUS = false,
    prop_START = false,
    prop_RATIO = 0

    // --BIND
    export let system_TARGET = null

// #IMPORTS

    // --JS
    import { SYSTEM_DATAS } from '../../assets/js/datas/dSystem'
    import { wait_throttle } from '../../assets/js/utils/wait'

    // --CONTEXTS
    import { APP, COMMAND, EVENT } from '../../App.svelte'

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
    const
    SYSTEM_OPTIMISE_NAME = 'system_optimise',
    SYSTEM_COMMANDS =
    [
        {
            name: SYSTEM_OPTIMISE_NAME,
            callback: system_c$Optimise,
            params: { defaultValue: false, optimise: { value: true } },
            tests: { testBoolean: true },
            storage: true
        }
    ]

    // --ELEMENT-GROUP
    const
    GROUP_Z_POSITIONS = new Float64Array(SYSTEM_DATAS.length),
    GROUP_EVENTS =
    {
        scroll: wait_throttle(group_e$Scroll, 200),
        mouseMove: wait_throttle(group_e$MouseMove, 50)
    }

    // --ELEMENT-ORBIT
    const ORBIT_EVENTS = { resize: orbit_e$Resize }

    // --ELEMENT-GRAVITYAREA
    const GRAVITYAREA_EVENTS = { scroll: wait_throttle(gravityarea_e$Scroll, 50.01) }

// #VARIABLES

    // --APP
    let app_$FREEZE = APP.app_$FREEZE

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

    // --ELEMENT-GRAVITYAREA
    let
    gravityarea_RATIO = 0,
    gravityarea_TIMEOUT

// #REACTIVES

    // --ELEMENT-GROUP
    $: system_CHARGED
        ? prop_FOCUS && !system_OPTIMISED
            ? system_start()
            : system_stop()
        : void 0

    // --ELEMENT-ORBIT
    $: !$app_$FREEZE ? system_TARGET = null : void 0

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

    function group_setEvents()
    {
        EVENT.event_add(GROUP_EVENTS)

        gravityarea_setEvents()
    }

    function orbit_setVars() { orbit_RADIUS = Math.min(window.innerWidth * .6, window.innerHeight * .6) }

    function orbit_setEvents() { EVENT.event_add(ORBIT_EVENTS) }

    function gravityarea_setEvents() { EVENT.event_add(GRAVITYAREA_EVENTS) }

    // --DESTROY
    function system_destroy()
    {
        group_destroyEvents()
        orbit_destroyEvents()
    }

    function group_destroyEvents()
    {
        EVENT.event_remove(GROUP_EVENTS)

        gravityarea_destroyEvents()
    }

    function orbit_destroyEvents() { EVENT.event_remove(ORBIT_EVENTS) }
    
    function gravityarea_destroyEvents() { EVENT.event_remove(GRAVITYAREA_EVENTS) }

    // --GET
    function group_getIndexFocus()
    {
        let index = GROUP_Z_POSITIONS.indexOf(Math.max(...GROUP_Z_POSITIONS))

        if (!~index) index = 0

        return index
    }

    // --UPDATES
    function system_update(optimised) { system_OPTIMISED = optimised }

    function system_updateTarget(target)
    {
        system_TARGET = target

        APP.app_$FREEZE = { on: true, target: 'system' }
    }

    function group_updateFocus()
    {
        const INDEX = prop_START && !system_OPTIMISED ? group_getIndexFocus() : void 0

        for (let i = 0; i < GROUP_Z_POSITIONS.length; i++) SYSTEM_DATAS[i] = { ...SYSTEM_DATAS[i], focus: i === INDEX }
    }

    function gravityarea_update() { gravityarea_RATIO = prop_RATIO }

    // --COMMAND
    function system_c$Optimise(optimised) { COMMAND.command_test(optimised, 'boolean', system_update, SYSTEM_OPTIMISE_NAME, system_OPTIMISED) }

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

    async function gravityarea_e$Scroll()
    {
        clearTimeout(gravityarea_TIMEOUT)
        gravityarea_TIMEOUT = setTimeout(gravityarea_update, 66.68)

        gravityarea_update()
    }

    function cube_eClick() { if (this.focus || system_OPTIMISED) system_updateTarget(this) }

    function tag_eClick() { system_updateTarget(this) }

    // --CONTROLS
    function system_start()
    {
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
class:zoom1={prop_FOCUS}
class:zoom2={prop_RATIO > 1}
>
    <Group
    let:resize
    let:animation
    prop_STYLE="transform: rotate3d({group_ROTATE_X}, {group_ROTATE_Y}, 0, .02rad);"
    bind:group_start
    bind:group_stop
    >
        <Moon />

        {#if !system_OPTIMISED}
            {#each SYSTEM_DATAS as data}
                <Orbit
                prop_ROTATE={data.props.prop_ROTATE}
                >
                    <GravityArea
                    let:rotation
                    let:grabbing
                    prop_e$RESIZE={resize}
                    prop_e$ANIMATION={animation}
                    prop_FOCUS={data.focus ?? false}
                    prop_RATIO={gravityarea_RATIO}
                    prop_GRABBING={false}
                    prop_ORBIT_RADIUS={orbit_RADIUS}
                    prop_ROTATE={data.props.prop_ROTATE}
                    prop_OFFSET={data.props.prop_OFFSET}
                    prop_FORCE={.2}
                    bind:gravityarea_TRANSLATE_Z={GROUP_Z_POSITIONS[data.id]}
                    >
                        <Cube
                        prop_$ROTATION={rotation}
                        prop_$GRABBING={grabbing}
                        prop_DESTROY={!prop_FOCUS || system_TARGET}
                        prop_FOCUS={data.focus ?? false}
                        prop_ROTATE={data.props.prop_ROTATE}
                        prop_SRC={data.props.prop_SRC}
                        prop_ALT={data.props.prop_ALT}
                        prop_COLOR={data.props.prop_COLOR}
                        on:click={cube_eClick.bind(data)}
                        />
                    </GravityArea>
                </Orbit>
            {/each}
        {/if}
    </Group>

    <Group>
        {#each SYSTEM_DATAS as data}
            <Tag
            prop_FOCUS={prop_START && !system_TARGET && (data.focus || system_OPTIMISED)}
            prop_OPTIMISED={system_OPTIMISED}
            prop_CONTENT={data.tag}
            prop_X={group_ROTATE_Y * 6}
            prop_Y={group_ROTATE_X * 6}
            on:click={tag_eClick.bind(data)}
            />
        {/each}
    </Group>
</div>

<!-- #STYLE -->

<style
lang="scss"
>
/* #USES */

@use '../../assets/scss/styles/utils';
@use '../../assets/scss/styles/position';
@use '../../assets/scss/styles/display';
@use '../../assets/scss/styles/size';

/* #SYSTEM */

.system
{
    @include position.placement(absolute, $top: 0, $left: 50%);

    transform: translate(30%, -30%) scale(.2);

    opacity: 1;

    width: 50vw;
    height: 100%;

    transition: transform 1s ease-in-out, opacity 1s;

    &.zoom1 { transform: translate(-50%, 0) scale(1); }
    &.zoom2
    {
        transform: translate(-230%, 60%) scale(5);

        opacity: 0;
    }

    :global
    {
        .group:nth-child(1)
        {
            @include position.placement(absolute, 0, 0, 0, 0);
    
            @extend %f-center;
            @extend %any;
    
            transform-style: preserve-3d;

            transition: transform .3s;
        }

        .group:nth-child(2)
        {
            @include position.placement(absolute, 51%, 10%);
            
            @extend %f-column;
    
            align-items: flex-end;
    
            transform: translateY(-50%);

            width: fit-content;
            height: fit-content;
        }
    }
}
</style>