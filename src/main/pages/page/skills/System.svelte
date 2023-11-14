<!----------------------------------------------- #||--system--|| -->


<!-- #|-CONTEXT-| -->
<!--
<script
context="module"
>

// #\-IMPORTS-\

    // --SVELTE

     // --LIB

    // --JS


// #\-EXPORTS-\

    // --CONTEXTS


</script>
-->

<!-- #|-HTML-| -->

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

        {#if !system_OPTIMISE}
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
                prop_ORBIT_RADIUS={gravityarea_ORBIT_RADIUS}
                prop_ROTATE_Z={item.props.prop_ROTATE}
                prop_OFFSET={item.props.prop_OFFSET}
                prop_FORCE={.16}
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
        prop_TITLE={item.name}
        on:click={tag_eClick.bind(item)}
        >
            <Tag
            prop_FOCUS={item.focus ?? false}
            prop_CONTENT={item.name}
            prop_DURATION={TAG_DURATION}
            prop_STYLE={{ tag_style, fragments_style }}
            on:in={tag_eIn}
            on:out={tag_eOut}
            />
        </Cell>
    {/each}
</div>


<!-- #|-SCRIPT-| -->

<script>

// #\-IMPORTS-\

    // --DATA

    // --SVELTE
    import { onMount, onDestroy } from 'svelte'

    // --LIB
    import MATH                             from '$lib/math'
    import { wait_throttle, wait_getDelay } from '$lib/wait'

    // --CONTEXTS
    import { APP, COMMAND, EVENT } from '../../../../App.svelte'

//=======@COMPONENTS|

    // --*
    import Group       from '../../../../global/covers/Group.svelte'
    import GravityArea from '../../../../global/covers/GravityArea.svelte'
    import Cell        from '../../../../global/covers/Cell.svelte'

    import Tag   from '../../../../global/elements/Tag.svelte'
    import Block from '../../../../global/elements/Block.svelte'

    import Moon from './Moon.svelte'
            
//=======@STYLE|

    // --*
    import '../../../../assets/scss/global/system.scss'


// #\-EXPORTS-\

    // --PROPS
    export let
    prop_ID = void 0
    ,
    prop_FOCUS = false,
    prop_START = false
    ,
    prop_SYSTEM = []
    ,
    prop_RATIO = 0

    // --BINDING
    export let system_TARGET = null


// #\-CONSTANTES-\

    // --SVELTE

    // --CONTEXTS

    // --OUTSIDE

    // --THIS
    const
    SYSTEM_COMMANDS =
    [
        {
            name: 'system_optimise',
            callback: system_c$Optimise,
            getCurrentValue: () => system_OPTIMISE,
            params: { defaultValue: false, optimise: { value: true } },
            tests: { testBoolean: true },
            desc: 'Optimiser le système dans la section compétence (p: \'t\' ou \'f\')',
            storage: true
        }
    ]
    ,
    SYSTEM_EVENTS = { mouseMove: wait_throttle(system_e$MouseMove, 3) } // +- 50ms

    // --INSIDE
    const
    GROUP_DELAY = wait_getDelay(24) // +- 400ms
    ,
    GROUP_Z_POSITIONS = new Float64Array(prop_SYSTEM.length)
    ,
    GROUP_EVENTS = { scroll: wait_throttle(group_e$Scroll, 12, 13) } // +- 200ms, +- 220ms

    const GRAVITYAREA_EVENTS = { resize: gravityarea_e$Resize }

    const TAG_DURATION = wait_getDelay(36) // +- 600ms


// #\-VARIABLES-\

    // --CONTEXTS

    // --OUTSIDE

    // --THIS
    let
    system_OPTIMISE = false
    ,
    system_ROTATE_X = 0,
    system_ROTATE_Y = 0

    // --INSIDE
    let
    group_TIMEOUT
    ,
    group_start,
    group_stop

    let
    gravityarea_RATIO        = prop_RATIO,
    gravityarea_ORBIT_RADIUS = 0


// #\-REATIVES-\

    // --CONTEXTS

    // --OUTSIDE

    // --THIS
    $: system_startAndStop(prop_FOCUS)

    // --INSIDE
    $: prop_FOCUS ? gravityarea_update(prop_RATIO) : void 0


// #\-FUNCTIONS-\

//=======@LIFE|

    // --SVELTE
    onMount(system_set), onDestroy(system_destroy)

    // --SET
    function system_set()
    {
        system_setCommands()

        gravityarea_setVars()
        gravityarea_setEvents()
    }

    function system_setCommands() { COMMAND.command_setCommands(SYSTEM_COMMANDS) }

    function system_setEvents() { EVENT.event_add(SYSTEM_EVENTS) }

    function group_setEvents() { EVENT.event_add(GROUP_EVENTS) }

    function gravityarea_setVars() { gravityarea_ORBIT_RADIUS = Math.min(APP.app_WIDTH * .6, APP.app_HEIGHT * .6) }

    function gravityarea_setEvents() { EVENT.event_add(GRAVITYAREA_EVENTS) }

    // --GET
    function group_getIndexFocus()
    {
        const INDEX = system_OPTIMISE
        ? Math.floor(prop_SYSTEM.length * prop_RATIO)
        : GROUP_Z_POSITIONS.indexOf(Math.max(...GROUP_Z_POSITIONS))

        return ~INDEX ? INDEX : 0
    }

    function tag_getY() { return Math.random() * 600 + 100 + '%' }

    // --UPDATES
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

    const gravityarea_update = wait_throttle(async function gravityarea_update(ratio) { gravityarea_RATIO = ratio }, 2, 3) // +- 30 ms, +- 50ms

    function tag_update(tag, frags, y, n)
    {
        for (let i = 0; i < frags.length; i++)
        {
            const FRAG = frags[i]
    
            FRAG.style.setProperty('--frag-y', y)
            FRAG.style.setProperty('opacity', n)
        }

        tag.style.setProperty('--frag-scale', n)
    }

    // --DESTROY
    function system_destroy()
    {
        system_destroyEvents()

        group_destroy()

        gravityarea_destroyEvents()
    }

    function system_destroyEvents() { EVENT.event_remove(SYSTEM_EVENTS) }

    function group_destroy()
    {
        group_destroyTimeout()

        group_destroyEvents()
    }

    function group_destroyTimeout() { clearTimeout(group_TIMEOUT) }

    function group_destroyEvents() { EVENT.event_remove(GROUP_EVENTS) }

    function gravityarea_destroyEvents() { EVENT.event_remove(GRAVITYAREA_EVENTS) }


//=======@COMMANDS|

    // --*
    function system_c$Optimise(value) { system_OPTIMISE = value }


//=======@EVENTS|

    // --*
    async function group_e$Scroll()
    {
        group_destroyTimeout()
        group_updateFocus()

        group_TIMEOUT = setTimeout(group_updateFocus, GROUP_DELAY)
    }

    async function system_e$MouseMove(clientX, clientY)
    {
        const
        VW50 = APP.app_WIDTH  * .5,
        VH50 = APP.app_HEIGHT * .5
        
        system_ROTATE_X = (clientY - VH50) / VH50
        system_ROTATE_Y = (clientX - VW50) / VW50
    }

    async function gravityarea_e$Resize() { gravityarea_setVars() }

    function gravityarea_eClick() { if (this.focus) system_updateTarget(this) }

    function tag_eIn({detail: { tag, frags }})
    {
        const Y = MATH.headsOrTails() * 4 + '%'
    
        tag_update(tag, frags, Y, 1)
    }

    function tag_eOut({detail: { tag, frags }}) { tag_update(tag, frags, tag_getY(), 0) }

    function tag_eClick() { system_updateTarget(this) }


//=======@TRANSITIONS|

    // --*


//=======@ANIMATIONS|

    // --*


//=======@UTILS|

    // --*
    function system_startAndStop(focus) { focus ? system_start() : system_stop() }

    function system_start()
    {
        if (!system_OPTIMISE)
        {
            system_setEvents()

            if (group_start instanceof Function) group_start()
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


</script>


<!-- #|-STYLE-| -->

<style
lang="scss"
>

/* #\-USES-\ */

    /* --SASS */

    /* --APP */

    /* --DEPENDENCIES */
    @use '../../../../assets/scss/styles/utils';

    /* --MEDIA */


/* #\-VARIABLES-\ */

    /* --* */


/* #\-THIS-\ */

.system
{
    @include utils.placement(absolute, $top: 0, $left: 50%);

    transform: translateX(-50%);

    width:  50vw;
    height: 100%;
}


</style>