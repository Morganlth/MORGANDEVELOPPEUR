<!-- #MAP

-APP
-COMMAND
-EVENT
    SYSTEM
        GROUP
            MOON
            ORBIT * n
                GRAVITYAREA
                    BLOCK

        GROUP
            TAG * n

-->

<!-- #SCRIPT -->

<script>
// #EXPORTS

    // --PROPS
    export let
    prop_ID = void 0,

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
    import Block from './Block.svelte'

    // --COMPONENT-DECOR
    import Moon from '../decors/Moon.svelte'

// #CONSTANTES

    // --ELEMENT-SYSTEM
    const
    SYSTEM_OPTIMISE_NAME = 'system_optimise'
,
    SYSTEM_COMMANDS =
    [
        {
            name: SYSTEM_OPTIMISE_NAME,
            callback: system_c$Optimise,
            params: { defaultValue: false, optimise: { value: true } },
            tests: { testBoolean: true },
            desc: 'Optimiser le système dans la section compétence (p: \'t\' ou \'f\')',
            storage: true
        }
    ]
,
    SYSTEM_EVENTS = { mouseMove: wait_throttle(system_e$MouseMove, 50) }

    // --ELEMENT-GROUP
    const
    GROUP_DELAY = 400.08,

    GROUP_Z_POSITIONS = new Float64Array(prop_SYSTEM.length),

    GROUP_EVENTS = { scroll: wait_throttle(group_e$Scroll, 200.04) }

    // --ELEMENT-ORBIT
    const ORBIT_EVENTS = { resize: orbit_e$Resize }

    // --ELEMENT-TAG
    const TAG_DURATION = 600

// #VARIABLES

    // --ELEMENT-SYSTEM
    let
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
    let gravityarea_RATIO = prop_RATIO

// #REACTIVES

    // --ELEMENT-SYSTEM
    $: system_update2(prop_FOCUS)

    // --ELEMENT-GRAVITYAREA
    $: prop_FOCUS ? gravityarea_update(prop_RATIO) : void 0

// #FUNCTIONS

    // --SET
    function system_set()
    {
        system_setCommands()

        orbit_setVars()
        orbit_setEvents()
    }

    function system_setCommands() { COMMAND.command_setBasicCommands(SYSTEM_COMMANDS) }

    function system_setEvents() { EVENT.event_add(SYSTEM_EVENTS) }

    function group_setEvents() { EVENT.event_add(GROUP_EVENTS) }

    function orbit_setVars() { orbit_RADIUS = Math.min(APP.app_WIDTH * .6, APP.app_HEIGHT * .6) }

    function orbit_setEvents() { EVENT.event_add(ORBIT_EVENTS) }

    // --DESTROY
    function system_destroy()
    {
        system_destroyEvents()
        group_destroy()
        orbit_destroyEvents()
    }

    function system_destroyEvents() { EVENT.event_remove(SYSTEM_EVENTS) }

    function group_destroy()
    {
        group_destroyEvents()
        group_clear()
    }

    function group_destroyEvents() { EVENT.event_remove(GROUP_EVENTS) }

    function orbit_destroyEvents() { EVENT.event_remove(ORBIT_EVENTS) }

    // --GET
    function group_getIndexFocus()
    {
        const INDEX = system_OPTIMISED
        ? Math.floor(prop_SYSTEM.length * prop_RATIO)
        : GROUP_Z_POSITIONS.indexOf(Math.max(...GROUP_Z_POSITIONS))

        return ~INDEX ? INDEX : 0
    }

    function tag_getY() { return Math.random() * 600 + 100 + '%' }

    // --UPDATES
    function system_update(optimised) { system_OPTIMISED = optimised }

    function system_update2(focus) { focus ? system_start() : system_stop() }

    function system_updateTarget(target)
    {
        system_TARGET = target

        APP.app_$FREEZE = { value: true, target: prop_ID }
    }

    function group_updateFocus()
    {
        const INDEX = prop_START ? group_getIndexFocus() : void 0

        for (let i = 0; i < GROUP_Z_POSITIONS.length; i++) prop_SYSTEM[i] = { ...prop_SYSTEM[i], focus: i === INDEX }
    }

    const gravityarea_update = wait_throttle(async (ratio) => { gravityarea_RATIO = ratio }, 33.34)

    function tag_update(tag, fragments, y, n)
    {
        for (let i = 0; i < fragments.length; i++)
        {
            const FRAG = fragments[i]
    
            FRAG.style.setProperty('--frag-y', y)
            FRAG.style.setProperty('opacity', n)
        }

        tag.style.setProperty('--frag-scale', n)
    }

    // --CLEAR
    function group_clear() { clearTimeout(group_TIMEOUT) }

    // --COMMAND
    function system_c$Optimise(optimised) { COMMAND.command_test(optimised, 'boolean', system_update, SYSTEM_OPTIMISE_NAME, system_OPTIMISED) }

    // --EVENTS
    async function group_e$Scroll()
    {
        group_clear()
        group_updateFocus()

        group_TIMEOUT = setTimeout(group_updateFocus, GROUP_DELAY)
    }

    async function system_e$MouseMove(clientX, clientY)
    {
        const [VW50, VH50] = [APP.app_WIDTH * .5, APP.app_HEIGHT * .5]
        
        system_ROTATE_X = (clientY - VH50) / VH50
        system_ROTATE_Y = (clientX - VW50) / VW50
    }

    async function orbit_e$Resize() { orbit_setVars() }

    function gravityarea_eClick() { if (this.focus) system_updateTarget(this) }

    function tag_eClick() { system_updateTarget(this) }

    // --CONTROLS
    function system_start()
    {
        if (!system_OPTIMISED)
        {
            system_setEvents()

            group_start()
        }

        group_TIMEOUT = setTimeout(() =>
        {
            group_e$Scroll()
            group_setEvents()
        },
        GROUP_DELAY)
    }

    function system_stop()
    {
        system_destroyEvents()
    
        group_destroy()
        group_updateFocus()
        
        if (group_stop instanceof Function) group_stop()
    }

    // --INTRO
    function tag_in(tag, fragments)
    {
        const Y = MATH.headsOrTails() * 4 + '%'
    
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
        transition: transform ease-out, opacity;
        transition-duration: var(--frag-duration, ${TAG_DURATION}ms);
        `
    }

// #CYCLES

onMount(system_set)
onDestroy(system_destroy)
</script>

<!-- #HTML -->

<div
class="system"
style:--system-r-x={system_ROTATE_X}
style:--system-r-y={system_ROTATE_Y}
>
    <Group
    let:resize
    let:animation
    bind:group_start
    bind:group_stop
    >
        <Moon
        {prop_FOCUS}
        />

        {#if !system_OPTIMISED}
            {#each prop_SYSTEM as item}
                <GravityArea
                let:hide
                let:grabbing
                prop_$RESIZE={resize}
                prop_$ANIMATION={animation}
                prop_FOCUSABLE={(item.focus ?? false) && !system_TARGET}
                prop_3D={true}
                prop_RATIO={gravityarea_RATIO}
                prop_GRABBING={false}
                prop_TITLE={item.props.prop_TITLE}
                prop_ORBIT_RADIUS={orbit_RADIUS}
                prop_ROTATE_Z={item.props.prop_ROTATE}
                prop_OFFSET={item.props.prop_OFFSET}
                {prop_FOCUS}
                bind:gravityarea_TRANSLATE_Z={GROUP_Z_POSITIONS[item.id]}
                on:click={gravityarea_eClick.bind(item)}
                >
                    <Block
                    prop_HIDE={hide}
                    prop_GRABBING={grabbing}
                    prop_FOCUS={item.focus ?? false}
                    prop_SRC={item.props.prop_SRC}
                    prop_ALT={item.props.prop_ALT}
                    prop_COLOR={item.props.prop_COLOR}
                    />
                </GravityArea>
            {/each}
        {/if}
    </Group>

    {#each prop_SYSTEM as item}
        <Cell
        prop_FOCUS={(item.focus ?? false) && !system_TARGET}
        prop_TITLE={item.tag}
        on:click={tag_eClick.bind(item)}
        >
            <Tag
            prop_FOCUS={item.focus ?? false}
            prop_CONTENT={item.tag}
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

                transform: rotateY(16deg);

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

                transition: transform var(--frag-duration, .6s) ease-out;
            }
        }
    }
}
</style>