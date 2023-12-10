<!----------------------------------------------- #||--home--|| -->


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
class="home p-a00 s-any"
data-page-id={prop_ID}
>
    <Snake
    prop_SNAKE={prop_CHILDREN.snake}
    prop_ON={snake_ON && prop_FOCUS && !$APP_$MOBILE}
    {prop_ID}
    bind:snake_GAME
    />

    <BlackBlocks
    prop_BLACKBLOCKS={prop_CHILDREN.blackblocks}
    prop_ON={!snake_GAME}
    {prop_FOCUS}
    bind:page_CHARGED
    />

    {#if prop_FOCUS}
        <Mask
        prop_BLUR={true}
        prop_COORDS={[70, 60]}
        prop_GRADIENT={[10, 95]}
        />
    {/if}

    <Slider
    prop_SLIDER={prop_CHILDREN.slider}
    prop_FOCUS={prop_FOCUS && page_CHARGED}
    />

    <TicTacToe
    prop_ON={prop_FOCUS && tictactoe_ON}
    />

    <Group
    prop_CLASS="p-abs"
    prop_STYLE="top:0;left:0;width:0;height:0;"
    let:resize
    let:animation
    bind:group_start
    bind:group_stop
    >
        {#each prop_CHILDREN.games as item}
            <GravityArea
            let:hide
            let:grabbing
            {...item.props}
            prop_FOCUS={gravityarea$_FOCUS}
            prop_FOCUSABLE={gravityarea$_FOCUS}
            prop_$RESIZE={resize}
            prop_$ANIMATION={animation}
            prop_GRABBING={prop_FOCUS}
            prop_ROTATE_Y={Math.random() * MATH.PIx2}
            prop_ROTATE_Z={Math.random() * MATH.PIx2}
            on:click={gravityarea_eClick.bind(null, item.id)}
            >
                <Block
                prop_HIDE={hide}
                prop_GRABBING={grabbing}
                prop_COMPONENT={item.component}
                {prop_FOCUS}
                />
            </GravityArea>
        {/each}
    </Group>

    <Terminal
    prop_TERMINAL={prop_CHILDREN.terminal}
    {prop_ID}
    bind:terminal_ON
    />
</div>


<!-- #|-SCRIPT-| -->

<script>

// #\-IMPORTS-\

    // --DATA

    // --SVELTE
    import { onMount } from 'svelte'

    // --LIB
    import MATH from '$lib/math'

    // --CONTEXTS
    import { APP, COMMAND, EVENT } from '../../../../App.svelte'

//=======@COMPONENTS|

    // --*
    import GravityArea from '../../../../global/covers/GravityArea.svelte'
    import Group       from '../../../../global/covers/Group.svelte'
    import Block       from '../../../../global/elements/Block.svelte'

    import Snake       from './Snake.svelte'
    import BlackBlocks from './BlackBlocks.svelte'
    import Mask        from './Mask.svelte'
    import Slider      from './Slider.svelte'
    import TicTacToe   from './TicTacToe.svelte'
    import Terminal    from './terminal/Terminal.svelte'
    
//=======@STYLE|

    // --*
    import '../../../../assets/scss/global/home.scss'


// #\-EXPORTS-\

    // --PROPS
    export let
    prop_ID = void 0
    ,
    prop_FOCUS = false
    ,
    prop_TOP = 0
    ,
    prop_CHILDREN = {}

    // --BINDING
    export let page_CHARGED = false


// #\-CONSTANTES-\

    // --SVELTE

    // --CONTEXTS
    const
    APP_$OPTIMIZE = APP.app_$OPTIMIZE,
    APP_$MOBILE   = APP.app_$MOBILE

    // --OUTSIDE

    // --THIS

    // --INSIDE
    const
    SNAKE_TAG = games_getTagGame('snake')
    ,
    SNAKE_COMMANDS =
    [
        {
            name           : 'snake',
            callback       : snake_c$,
            getCurrentValue: () => snake_ON,
            params         : { defaultValue: true, optimize: { value: false } },
            tests          : { testBoolean: true },
            desc           : { fr: 'Activer/Désactiver le serpent (p: \'t\' ou \'f\')', en: 'Enable/Disable the snake (p: \'t\' or \'f\')' },
            storage        : true
        }
    ]

    const TICTACTOE_TAG = games_getTagGame('tictactoe')

    const TERMINAL_TAG = games_getTagGame('terminal')


// #\-VARIABLES-\

    // --CONTEXTS

    // --OUTSIDE

    // --THIS

    // --INSIDE
    let
    snake_ON   = true,
    snake_GAME = false

    let
    group_start,
    group_stop

    let tictactoe_ON = false

    let terminal_ON = false


// #\-REATIVES-\

    // --CONTEXTS

    // --OUTSIDE

    // --THIS

    // --INSIDE
    $: group_update(prop_FOCUS && !snake_GAME && !$APP_$OPTIMIZE)

    $: gravityarea$_FOCUS = prop_FOCUS && page_CHARGED


// #\-FUNCTIONS-\

//=======@LIFE|

    // --SVELTE
    onMount(home_set)

    // --SET
    function home_set() { snake_setCommands() }

    function snake_setCommands() { COMMAND.command_setCommands(SNAKE_COMMANDS) }

    // --GET
    function games_getTagGame(name) { return prop_CHILDREN.games.find(game => game.name === name)?.tags[0] }

    // --UPDATES
    function snake_update(value) { snake_GAME = value }

    function group_update(value) { if (group_start instanceof Function && group_stop instanceof Function) value ? group_start() : group_stop() }

    function tictactoe_update(value) { tictactoe_ON = value }

    function terminal_update(value) { terminal_ON = value }

    // --DESTROY


//=======@COMMANDS|

    // --*
    function snake_c$(on) { snake_ON = on }


//=======@EVENTS|

    // --*
    async function gravityarea_eClick(id)
    {
        switch (id)
        {
            case 0 : snake_update(!snake_GAME)       ;break
            case 1 : tictactoe_update(!tictactoe_ON) ;break
            case 2 : terminal_update(!terminal_ON)   ;break
            default:                                 ;break
        }
    }


//=======@TRANSITIONS|

    // --*


//=======@ANIMATIONS|

    // --*

//=======@UTILS|

    // --*
    export function page_process(str)
    {
        EVENT.event_scrollTo(prop_TOP, true, false, () =>
        {
            switch (str)
            {
                case SNAKE_TAG    : snake_update(true)     ;break
                case TICTACTOE_TAG: tictactoe_update(true) ;break
                case TERMINAL_TAG : terminal_update(true)  ;break
                default           :                        ;break
            }
        })
    }


</script>


<!-- #|-STYLE-| -->

<!-- <style
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


</style> -->