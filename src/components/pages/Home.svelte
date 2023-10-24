<!-- #MAP

-COMMAND
-EVENT
    HOME
        PARTICLES
        SNAKE
        SPACECUBE
        MASK
        GROUP
            GRAVITYAREA * 3
                CUBE
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

    prop_SPACECUBE = new Float64Array([]),
    prop_CUBES = [],

    prop_TOP = 0

    // --BINDS
    export let page_CHARGED = false

    // BIND page_process

// #IMPORTS

    // --JS
    import MATH from '../../assets/js/utils/math'

    // --CONTEXTS
    import { COMMAND, EVENT } from '../../App.svelte'

    // --SVELTE
    import { onMount, tick } from 'svelte'

    // --COMPONENT-COVERS
    import GravityArea from '../covers/GravityArea.svelte'
    import Group from '../covers/Group.svelte'

    // --COMPONENT-ELEMENTS
    import Snake from '../elements/Snake.svelte'
    import Mask from '../elements/Mask.svelte'
    import Cube from '../elements/Cube.svelte'
    import TicTacToe from '../elements/TicTacToe.svelte'
    import Terminal from '../elements/Terminal.svelte'

    // --COMPONENT-DECOR
    import SpaceCube from '../decors/SpaceCube.svelte'

// #CONSTANTES

    // --ELEMENT-SNAKE
    const
    SNAKE = 'snake',

    SNAKE_COMMANDS =
    [
        {
            name: SNAKE,
            callback: snake_c$,
            params: { defaultValue: true },
            tests: { testBoolean: true },
            storage: true
        }
    ]

// #VARIABLES

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

// #REACTIVE

    // --ELEMENT-GROUP
    $: group_start instanceof Function && group_stop instanceof Function
    ? prop_FOCUS && !snake_GAME ? group_start() : group_stop()
    : void 0

// #FUNCTIONS

    // --SET
    function home_set() { snake_setCommands() }

    function snake_setCommands() { COMMAND.command_setBasicCommands(SNAKE_COMMANDS) }

    // --UPDATES
    function snake_update(on) { snake_ON = on }

    function snake_update2(value) { snake_GAME = value }

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
    export async function page_process(str)
    {
        EVENT.event_scrollTo(prop_TOP)

        await tick()

        snake_update2(str === 'snake')
        tictactoe_update(str === 'tictactoe')
        terminal_update(str === 'terminal')
    }

// #LIFECYCLE

onMount(home_set)
</script>

<!-- #HTML -->

<div
class="home"
data-page-id={prop_ID}
>
    <Snake
    prop_ON={snake_ON && prop_FOCUS}
    bind:snake_GAME
    />

    <SpaceCube
    prop_ON={!snake_GAME}
    {prop_FOCUS}
    {prop_SPACECUBE}
    bind:spacecube_CHARGED={page_CHARGED}
    />

    <Mask
    prop_BLUR={true}
    prop_COORDS={[70, 50]}
    prop_GRADIENT={[10, 60]}
    prop_OPACITY={prop_FOCUS ? 1 : 0}
    />

    <Group
    let:resize
    let:animation
    bind:group_start
    bind:group_stop
    >
        {#each prop_CUBES as cube}
            <GravityArea
            let:rotation
            let:grabbing
            {...cube.props}
            prop_FOCUS={prop_FOCUS && page_CHARGED}
            prop_$RESIZE={resize}
            prop_$ANIMATION={animation}
            prop_GRABBING={prop_FOCUS}
            on:click={gravityarea_eClick.bind(null, cube.id)}
            >
                <Cube
                prop_$ROTATION={rotation}
                prop_GRABBING={grabbing}
                prop_ROTATE={Math.random() * MATH.PI.x2}
                prop_ROTATE_Y={Math.random() * MATH.PI.x2}
                prop_COMPONENT={cube.component}
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

    overflow: hidden;

    :global .group
    {
        width: 0;
        height: 0;
    }
}
</style>