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

    prop_SYSTEM = [],

    prop_RATIO = 0

    // --BIND
    export let system_TARGET = null

// #IMPORTS

    // --JS
    import MATH from '../../assets/js/utils/math'
    import { wait_throttle } from '../../assets/js/utils/wait'

    // --CONTEXTS
    import { APP, COMMAND, EVENT } from '../../App.svelte'

    // --SVELTE
    import { onMount, onDestroy } from 'svelte'

    // --COMPONENT-COVERS
    import Group from '../covers/Group.svelte'
    import GravityArea from '../covers/GravityArea.svelte'
    import Cell from '../covers/Cell.svelte'

    // --COMPONENT-ELEMENTS
    import Tag from './Tag.svelte'
    import Cube from './Cube.svelte'

    // --COMPONENT-DECOR
    import Moon from '../decors/Moon.svelte'

// #CONSTANTES

    // --ELEMENT-SYSTEM
    const
    SYSTEM = 'system',
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
    ],
    SYSTEM_EVENTS = { mouseMove: wait_throttle(system_e$MouseMove, 50) }

    // --ELEMENT-GROUP
    const
    GROUP_Z_POSITIONS = new Float64Array(prop_SYSTEM.length),
    GROUP_EVENTS = { scroll: wait_throttle(group_e$Scroll, 200.04) }

    // --ELEMENT-ORBIT
    const ORBIT_EVENTS = { resize: orbit_e$Resize }

    // --ELEMENT-GRAVITYAREA
    const GRAVITYAREA_EVENTS = { scroll: wait_throttle(gravityarea_e$Scroll, 33.34) }

    // --ELEMENT-TAG
    const TAG_DURATION = 400

// #VARIABLES

    // --ELEMENT-SYSTEM
    let
    system_CHARGED = false,
    system_OPTIMISED = false,

    system_ROTATE_X = 0,
    system_ROTATE_Y = 0

    // --ELEMENT-GROUP
    let
    group_TIMEOUT,

    group_start,
    group_stop

    // --ELEMENT-ORBIT
    let orbit_RADIUS = 0

    // --ELEMENT-GRAVITYAREA
    let
    gravityarea_RATIO = 0,

    gravityarea_TIMEOUT

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

    function system_setEvents()
    {
        EVENT.event_add(SYSTEM_EVENTS)

        group_setEvents()
        gravityarea_setEvents()
    }

    function group_setEvents() { EVENT.event_add(GROUP_EVENTS) }

    function orbit_setVars() { orbit_RADIUS = Math.min(APP.app_WIDTH * .6, APP.app_HEIGHT * .6) }

    function orbit_setEvents() { EVENT.event_add(ORBIT_EVENTS) }

    function gravityarea_setEvents() { EVENT.event_add(GRAVITYAREA_EVENTS) }

    // --DESTROY
    function system_destroy()
    {
        gravityarea_clear()

        system_destroyEvents()
        orbit_destroyEvents()
    }

    function system_destroyEvents()
    {
        EVENT.event_remove(SYSTEM_EVENTS)

        group_destroyEvents()
        gravityarea_destroyEvents()
    }

    function group_destroyEvents() { EVENT.event_remove(GROUP_EVENTS) }

    function orbit_destroyEvents() { EVENT.event_remove(ORBIT_EVENTS) }
    
    function gravityarea_destroyEvents() { EVENT.event_remove(GRAVITYAREA_EVENTS) }

    // --GET
    function group_getIndexFocus()
    {
        let index = system_OPTIMISED
        ? Math.floor(prop_SYSTEM.length * prop_RATIO)
        : GROUP_Z_POSITIONS.indexOf(Math.max(...GROUP_Z_POSITIONS))

        if (!~index) index = 0

        return index
    }

    function tag_getY() { return 400 * Math.random() + 100 + '%' }

    // --UPDATES
    function system_update(optimised) { system_OPTIMISED = optimised }

    function system_updateTarget(target)
    {
        system_TARGET = target

        APP.app_$FREEZE = { value: true, target: SYSTEM }
    }

    function group_updateFocus()
    {
        const INDEX = prop_START ? group_getIndexFocus() : void 0

        for (let i = 0; i < GROUP_Z_POSITIONS.length; i++) prop_SYSTEM[i] = { ...prop_SYSTEM[i], focus: i === INDEX }
    }

    function gravityarea_update(ratio) { gravityarea_RATIO = ratio ?? prop_RATIO }

    function tag_update(tag, fragments, y, scale)
    {
        for (let i = 0; i < fragments.length; i++) fragments[i].style.setProperty('--frag-y', y)

        tag.style.setProperty('--frag-scale', scale)
    }

    // --CLEAR
    function gravityarea_clear() { clearTimeout(gravityarea_TIMEOUT) }

    // --COMMAND
    function system_c$Optimise(optimised) { COMMAND.command_test(optimised, 'boolean', system_update, SYSTEM_OPTIMISE_NAME, system_OPTIMISED) }

    // --EVENTS
    async function group_e$Scroll()
    {
        clearTimeout(group_TIMEOUT)

        group_updateFocus()

        group_TIMEOUT = setTimeout(group_updateFocus, 300)
    }

    async function system_e$MouseMove(clientX, clientY)
    {
        const [VW50, VH50] = [APP.app_WIDTH * .5, APP.app_HEIGHT * .5]
        
        system_ROTATE_X = (clientY - VH50) / VH50
        system_ROTATE_Y = (clientX - VW50) / VW50
    }

    async function orbit_e$Resize() { orbit_setVars() }

    async function gravityarea_e$Scroll()
    {
        gravityarea_clear()
    
        gravityarea_TIMEOUT = setTimeout(gravityarea_update, 66.68)

        gravityarea_update()
    }

    function gravityarea_eClick() { if (this.focus) system_updateTarget(this) }

    function tag_eClick() { system_updateTarget(this) }

    // --CONTROLS
    function system_start()
    {
        system_setEvents()

        group_start()
    }

    function system_stop()
    {
        system_destroyEvents()

        group_updateFocus()
        group_stop()
    }

    // --INTRO
    function tag_in(tag, fragments)
    {
        const Y = MATH.headsOrTails() * 2 + '%'
    
        tag_update(tag, fragments, Y, 1)
    }

    // --OUTRO
    function tag_out(tag, fragments) { tag_update(tag, fragments, tag_getY(), 0) }

    // --STYLES
    function tag_style()
    {
        return `
        --frag-scale: 0;
        --frag-duration: ${TAG_DURATION}ms;`
    }

    function fragments_style()
    {
        return `
        --frag-y: ${tag_getY()};
        --frag-sign: ${MATH.headsOrTails() ? 1 : -1};
        transform: translateY(calc(var(--frag-y, 0) * var(--frag-sign, 1))) scale(var(--frag-scale, 1));
        transition: transform var(--frag-duration, ${TAG_DURATION}ms) ease-out;
        `
    }

// #CYCLES

onMount(system_set)
onDestroy(system_destroy)
</script>

<!-- #HTML -->

<div
class="system"
class:zoom1={prop_FOCUS}
class:zoom2={prop_RATIO >= 1}
style:--system-r-x={system_ROTATE_X}
style:--system-r-y={system_ROTATE_Y}
>
    <Group
    let:resize
    let:animation
    bind:group_start
    bind:group_stop
    >
        <Moon />

        {#if !system_OPTIMISED}
            {#each prop_SYSTEM as cube}
                <GravityArea
                let:rotation
                let:grabbing
                prop_$RESIZE={resize}
                prop_$ANIMATION={animation}
                prop_RATIO={gravityarea_RATIO}
                prop_GRABBING={false}
                prop_TITLE={cube.props.prop_TITLE}
                prop_ORBIT_RADIUS={orbit_RADIUS}
                prop_ROTATE={cube.props.prop_ROTATE}
                prop_OFFSET={cube.props.prop_OFFSET}
                {prop_FOCUS}
                bind:gravityarea_TRANSLATE_Z={GROUP_Z_POSITIONS[cube.id]}
                on:click={gravityarea_eClick.bind(cube)}
                >
                    <Cube
                    prop_$ROTATION={rotation}
                    prop_GRABBING={grabbing}
                    prop_DESTROY={!prop_FOCUS || system_TARGET}
                    prop_FOCUS={cube.focus ?? false}
                    prop_ROTATE={cube.props.prop_ROTATE}
                    prop_SRC={cube.props.prop_SRC}
                    prop_ALT={cube.props.prop_ALT}
                    prop_COLOR={cube.props.prop_COLOR}
                    />
                </GravityArea>
            {/each}
        {/if}
    </Group>

    {#each prop_SYSTEM as cube}
        <Cell
        prop_FOCUS={cube.focus ?? false}
        on:click={tag_eClick.bind(cube)}
        >
            <Tag
            prop_FOCUS={cube.focus ?? false}
            prop_CONTENT={cube.tag}
            prop_DURATION={TAG_DURATION}
            prop_IN={tag_in}
            prop_OUT={tag_out}
            prop_STYLE={{ tag_style, fragments_style }}
            />
        </Cell>
    {/each}
</div>

<!-- #STYLE -->

<style
lang="scss"
>
/* #USES */

@use '../../assets/scss/styles/position';
@use '../../assets/scss/styles/display';
@use '../../assets/scss/styles/size';

/* #SYSTEM */

.system
{
    @include position.placement(absolute, $top: 0, $left: 50%);

    transform: translateX(-50%);

    width: 50vw;
    height: 100%;

    &.zoom1 :global .moon { transform: translate(0, 0) scale(1); }

    &.zoom2 :global .moon
    {
        transform: translate(calc(-50vw + 50%), calc(50vh - 50%)) scale(5);

        opacity: 0;
    }

    :global
    {
        $rotate-x: var(--system-r-x, 0);
        $rotate-y: var(--system-r-y, 0);

        .group, .cell { transition: transform .4s; }
    
        .group
        {
            @include position.placement(absolute, 0, 0, 0, 0);
    
            @extend %f-center;
            @extend %any;
    
            transform-style: preserve-3d;
            transform: rotate3d($rotate-x, $rotate-y, 0, .02rad);
        }

        .moon
        {
            transform: translate(calc(50vw - 50%), calc(-50vh + 50%)) scale(.3);

            opacity: 1;

            transition: transform .8s ease-out, opacity .8s;
        }

        .cell
        {
            @include position.placement(absolute, 51%, 10%);
    
            transform: translate(calc($rotate-x * 6px), calc($rotate-y * 6px - 50%));

            .tag
            {
                &::before
                {
                    @include position.placement(absolute, $right: -8rem, $bottom: 0, $pseudo-element: true);

                    transform: translateX(100%) scaleX(0);
                
                    width: 150%;
                    height: 0;

                    pointer-events: none;

                    border-bottom: solid $intermediate 1px;

                    transition: transform 1s ease-out, border .6s ease-out;
                }

                padding: 2rem;

                &.focus::before { transform: translateX(0) scale(1); }

                &:hover::before
                {
                    transform: translateX(8%);
                
                    border-bottom-color: $light;
                }
            }

            .fragments>pre:not(.void)::before
            {
                @include position.placement(absolute, $top: 50%, $left: 50%, $pseudo-element: true);

                transform-origin: left;
                
                width: 100%;
                height: 1px;

                background-color: $light;

                transform: rotate(calc(-90deg * var(--frag-sign, 1))) scaleX(var(--frag-y, 0));

                transition: transform var(--frag-duration, .4s) ease-out;
            }
        }
    }
}
</style>