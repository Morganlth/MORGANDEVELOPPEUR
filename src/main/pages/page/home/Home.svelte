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
class="home"
data-page-id={prop_ID}
>
    <Particles />

    <Snake
    prop_ON={snake_ON && prop_FOCUS && !$app_$MOBILE}
    bind:snake_GAME
    />

    <BlackBlocks
    prop_ON={!snake_GAME}
    {prop_FOCUS}
    {prop_BLACKBLOCKS}
    bind:page_CHARGED
    />

    {#if prop_FOCUS}
        <Mask
        prop_BLUR={true}
        prop_COORDS={[70, 60]}
        prop_GRADIENT={[10, 95]}
        />
    {/if}

    {#if !$app_$SMALL_SCREEN}
        <Slider
        prop_FOCUS={prop_FOCUS && page_CHARGED}
        {prop_SLIDER}
        />
    {/if}

    <TicTacToe
    prop_ON={prop_FOCUS && tictactoe_ON}
    />

    <Group
    prop_STYLE="position:absolute;top:0;left:0;width:0;height:0;"
    let:resize
    let:animation
    bind:group_start
    bind:group_stop
    >
        {#each prop_GAMES as item}
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

    import Particles   from './Particles.svelte'
    import Snake       from './Snake.svelte'
    import BlackBlocks from './BlackBlocks.svelte'
    import Mask        from './Mask.svelte'
    import Slider      from './Slider.svelte'
    import TicTacToe   from './TicTacToe.svelte'
    import Terminal    from './terminal/Terminal.svelte'
    
//=======@STYLE|

    // --*


// #\-EXPORTS-\

    // --PROPS
    export let
    prop_ID = void 0
    ,
    prop_FOCUS = false
    ,
    prop_BLACKBLOCKS = new Float64Array([]),
    prop_SLIDER      = [() => void ''],
    prop_GAMES       = []
    ,
    prop_TOP = 0

    // --BINDING
    export let page_CHARGED = false


// #\-CONSTANTES-\

    // --SVELTE

    // --CONTEXTS

    // --OUTSIDE

    // --THIS

    // --INSIDE
    const SNAKE_COMMANDS =
    [
        {
            name           : 'snake',
            callback       : snake_c$,
            getCurrentValue: () => snake_ON,
            params         : { defaultValue: true, optimise: { value: false } },
            tests          : { testBoolean: true },
            desc           : 'Activer/Désactiver le serpent (p: \'t\' ou \'f\')',
            storage        : true
        }
    ]


// #\-VARIABLES-\

    // --CONTEXTS
    let
    app_$OPTIMISE     = APP.app_$OPTIMISE,
    app_$SMALL_SCREEN = APP.app_$SMALL_SCREEN,
    app_$MOBILE       = APP.app_$MOBILE

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
    $: group_update(prop_FOCUS && !snake_GAME && !$app_$OPTIMISE)

    $: gravityarea$_FOCUS = prop_FOCUS && page_CHARGED


// #\-FUNCTIONS-\

//=======@LIFE|

    // --SVELTE
    onMount(home_set)

    // --SET
    function home_set() { snake_setCommands() }

    function snake_setCommands() { COMMAND.command_setCommands(SNAKE_COMMANDS) }

    // --GET

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
                case 'snake'    : snake_update(true)     ;break
                case 'tictactoe': tictactoe_update(true) ;break
                case 'terminal' : terminal_update(true)  ;break
                default         :                        ;break
            }
        })
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

.home
{
    @include utils.placement(absolute, 0, 0, 0, 0);

    @extend %any-size;

    overflow: clip;
}


</style>