<!-- #MAP

-APP
-COMMAND
-EVENT
    HOME
        SNAKE
        BLACKBLOCKS
        MASK
        SLIDER
        GROUP
            GRAVITYAREA * 3
                BLOCK
        TICTACTOE
        TERMINAL

-->

<!-- #SCRIPT -->

<script>
// #EXPORTS

    // --PROPS
    export let
    prop_ID = void 0,

    prop_FOCUS = false,

    prop_BLACKBLOCKS = new Float64Array([]),
    prop_SLIDER = [() => ''],
    prop_GAMES = [],

    prop_TOP = 0

    // --BINDS
    export let page_CHARGED = false

    // BIND page_process

// #IMPORTS

    // --JS
    import MATH from '../../assets/js/utils/math'

    // --CONTEXTS
    import { APP, COMMAND, EVENT } from '../../App.svelte'

    // --SVELTE
    import { onMount } from 'svelte'

    // --COMPONENT-COVERS
    import GravityArea from '../covers/GravityArea.svelte'
    import Group from '../covers/Group.svelte'

    // --COMPONENT-ELEMENTS
    import Snake from '../elements/Snake.svelte'
    import Mask from '../elements/mask/Mask.svelte'
    import Slider from '../elements/Slider.svelte'
    import Block from '../elements/Block.svelte'
    import TicTacToe from '../elements/TicTacToe.svelte'
    import Terminal from '../elements/terminal/Terminal.svelte'

    // --COMPONENT-DECOR
    import BlackBlocks from '../decors/BlackBlocks.svelte'

// #CONSTANTES

    // --ELEMENT-SNAKE
    const
    SNAKE = 'snake'
,
    SNAKE_COMMANDS =
    [
        {
            name: SNAKE,
            callback: snake_c$,
            params: { defaultValue: true, optimise: { value: false } },
            tests: { testBoolean: true },
            desc: 'Activer/Désactiver le serpent (p: \'t\' ou \'f\')',
            storage: true
        }
    ]

// #VARIABLES

    // --APP
    let
    app_$OPTIMISE = APP.app_$OPTIMISE,
    app_$SMALL_SCREEN = APP.app_$SMALL_SCREEN,
    app_$MOBILE = APP.app_$MOBILE

    // --ELEMENT-SNAKE
    let
    snake_ON = true,
    snake_GAME = false

    // --ELEMENT-GROUP
    let
    group_start,
    group_stop

    // --ELEMENT-TICTACTOE
    let tictactoe_ON = false

    // --ELEMENT-TERMINAL
    let terminal_ON = false

// #REACTIVES

    // --ELEMENT-GROUP
    $: group_update(prop_FOCUS && !snake_GAME && !$app_$OPTIMISE)

    // --ELEMENT-GRAVITYAREA
    $: gravityarea$_FOCUS = prop_FOCUS && page_CHARGED

// #FUNCTIONS

    // --SET
    function home_set() { snake_setCommands() }

    function snake_setCommands() { COMMAND.command_setBasicCommands(SNAKE_COMMANDS) }

    // --UPDATES
    function snake_update(on) { snake_ON = on }

    function snake_update2(value) { snake_GAME = value }

    function group_update(value) { if (group_start instanceof Function && group_stop instanceof Function) value ? group_start() : group_stop() }

    function tictactoe_update(value) { tictactoe_ON = value }

    function terminal_update(value) { terminal_ON = value }

    // --COMMAND
    function snake_c$(on) { COMMAND.command_test(on, 'boolean', snake_update, SNAKE, snake_ON) }

    // --EVENT
    async function gravityarea_eClick(id)
    {
        switch (id)
        {
            case 0:
                snake_update2(!snake_GAME)
                break
            case 1:
                tictactoe_update(!tictactoe_ON)
                break
            case 2:
                terminal_update(!terminal_ON)
                break
            default:
                break
        }
    }

    // --UTIL
    export function page_process(str)
    {
        EVENT.event_scrollTo(prop_TOP)

        snake_update2(str === 'snake')
        tictactoe_update(str === 'tictactoe')
        terminal_update(str === 'terminal')
    }

// #LIFECYCLES

onMount(home_set)
</script>

<!-- #HTML -->

<div
class="home"
data-page-id={prop_ID}
>
    <Snake
    prop_ON={snake_ON && prop_FOCUS && !$app_$MOBILE}
    bind:snake_GAME
    />

    <BlackBlocks
    prop_ON={!snake_GAME}
    {prop_FOCUS}
    {prop_BLACKBLOCKS}
    bind:blackblocks_CHARGED={page_CHARGED}
    />

    {#if prop_FOCUS}
        <Mask
        prop_BLUR={true}
        prop_COORDS={[70, 50]}
        prop_GRADIENT={[20, 70]}
        />
    {/if}

    {#if !$app_$SMALL_SCREEN}
        <Slider
        {prop_FOCUS}
        {prop_SLIDER}
        />
    {/if}

    <Group
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
            prop_ROTATE_Y={Math.random() * MATH.PI.x2}
            prop_ROTATE_Z={Math.random() * MATH.PI.x2}
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

    <TicTacToe
    prop_ON={tictactoe_ON}
    />

    <Terminal
    bind:terminal_ON
    />
</div>

<!-- #STYLE -->

<style
lang="scss"
>
/* #USES */

@use '../../assets/scss/styles/position';
@use '../../assets/scss/styles/size';

/* #HOME */

.home
{
    @include position.placement(absolute, 0, 0, 0, 0);

    z-index: -1;

    @extend %any;

    overflow: clip;

    :global .group
    {
        width: 0;
        height: 0;
    }
}
</style>