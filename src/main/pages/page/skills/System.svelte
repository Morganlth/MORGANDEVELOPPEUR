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
class:d-hid={system_HIDE}
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

        {#if !system_OPTIMIZE}
            {#each prop_SYSTEM as item}
            {@const {focus, id, props: {prop_TITLE, prop_ROTATE, prop_OFFSET}} = item}
                <GravityArea
                let:hide
                let:grabbing
                prop_$RESIZE={resize}
                prop_$ANIMATION={animation}
                prop_FOCUSABLE={focus}
                prop_3D={true}
                prop_RATIO={gravityarea_RATIO}
                prop_GRABBING={false}
                prop_TITLE={prop_TITLE}
                prop_ORBIT_RADIUS={gravityarea_ORBIT_RADIUS}
                prop_ROTATE_Z={prop_ROTATE}
                prop_OFFSET={prop_OFFSET}
                prop_FORCE={.16}
                {prop_FOCUS}
                bind:gravityarea_TRANSLATE_Z={GROUP_Z_POSITIONS[id]}
                on:click={gravityarea_eClick.bind(item)}
                >
                {@const {props: {prop_SRC, prop_ALT, prop_COLOR}} = item}
                    <Block
                    prop_HIDE={hide}
                    prop_GRABBING={grabbing}
                    prop_FOCUS={focus}
                    prop_SRC={prop_SRC}
                    prop_ALT={prop_ALT}
                    prop_COLOR={prop_COLOR}
                    />
                </GravityArea>
            {/each}
        {/if}
    </Group>

    {#each prop_SYSTEM as item}
    {@const {focus, name} = item}
        <Cell
        prop_FOCUS={focus}
        prop_TITLE={name}
        on:click={tag_eClick.bind(item)}
        >
            <Tag
            prop_FOCUS={focus}
            prop_CONTENT={name}
            prop_DURATION={TAG_DURATION}
            prop_getTagStyle={tag_getStyle}
            prop_getFragmentsStyle={fragments_getStyle}
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
    import { onMount, onDestroy, createEventDispatcher } from 'svelte'

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
    prop_SYSTEM = []
    ,
    prop_FOCUS = false,
    prop_START = false
    ,
    prop_RATIO  = 0
    ,
    prop_HIDE = false

    // --BINDING


// #\-CONSTANTES-\

    // --SVELTE
    const SVELTE_DISPATCH = createEventDispatcher()

    // --CONTEXTS

    // --OUTSIDE

    // --THIS
    const
    SYSTEM_DELAY = wait_getDelay(60) // +- 1s
    ,
    SYSTEM_COMMANDS =
    [
        {
            name           : 'system_optimize',
            callback       : system_c$Optimize,
            getCurrentValue: () => system_OPTIMIZE,
            params         : { defaultValue: false, optimize: { value: true } },
            tests          : { testBoolean: true },
            desc           : { fr: 'Optimiser le système dans la section compétence (p: \'t\' ou \'f\')', en: 'Optimize the system in the skills section (p: \'t\' or \'f\')' },
            storage        : true
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
    system_HIDE     = false,
    system_OPTIMIZE = false
    ,
    system_ROTATE_X = 0,
    system_ROTATE_Y = 0
    ,
    system_TIMEOUT

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
    $: system_updateHide(prop_HIDE) 

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
        const INDEX = system_OPTIMIZE
        ? Math.floor(prop_SYSTEM.length * prop_RATIO)
        : GROUP_Z_POSITIONS.indexOf(Math.max(...GROUP_Z_POSITIONS))

        return ~INDEX ? INDEX : 0
    }

    function tag_getY() { return Math.random() * 600 + 100 + '%' }

    function tag_getStyle()
    {
        return `
        --frag-scale: 0;
        --frag-duration: ${TAG_DURATION}ms;`
    }

    function fragments_getStyle()
    {
        return `
        --frag-y: ${tag_getY()};
        --frag-sign: ${MATH.headsOrTails() ? 1 : -1};
        transform: translateY(calc(var(--frag-y, 0) * var(--frag-sign, 1))) scale(var(--frag-scale, 1));
        transition: transform ease-out, opacity;
        transition-duration: var(--frag-duration, ${TAG_DURATION}ms);
        `
    }

    // --UPDATES
    function system_updateHide(hide)
    {
        system_destroyTimeout()

        hide ? system_TIMEOUT = setTimeout(() => system_HIDE = true, SYSTEM_DELAY) : system_HIDE = false
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
        system_destroyTimeout()
        system_destroyEvents()

        group_destroy()

        gravityarea_destroyEvents()
    }

    function system_destroyTimeout() { clearTimeout(system_TIMEOUT) }

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
    function system_c$Optimize(value) { system_OPTIMIZE = value }


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

    function gravityarea_eClick() { if (this.focus) SVELTE_DISPATCH('click', { target: this }) }

    function tag_eIn({detail: { tag, frags }})
    {
        const Y = MATH.headsOrTails() * 2 + '%'
    
        tag_update(tag, frags, Y, 1)
    }

    function tag_eOut({detail: { tag, frags }}) { tag_update(tag, frags, tag_getY(), 0) }

    function tag_eClick() { SVELTE_DISPATCH('click', { target: this }) }


//=======@TRANSITIONS|

    // --*


//=======@ANIMATIONS|

    // --*


//=======@UTILS|

    // --*
    function system_startAndStop(focus) { focus ? system_start() : system_stop() }

    function system_start()
    {
        if (!system_OPTIMIZE)
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


</script>


<!-- #|-STYLE-| -->

<style
lang="scss"
>

/* #\-USES-\ */

    /* --SASS */

    /* --APP */

    /* --DEPENDENCIES */

    /* --MEDIA */


/* #\-VARIABLES-\ */

    /* --* */


/* #\-THIS-\ */


</style>