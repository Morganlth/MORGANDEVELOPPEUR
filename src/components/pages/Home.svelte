<!-- #MAP

-APP
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
    import { APP, COMMAND, EVENT } from '../../App.svelte'

    // --SVELTE
    import { onMount } from 'svelte'

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

    // --APP
    let app_$OPTIMISE = APP.app_$OPTIMISE

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

    <p
    style:transform="perspective(800px) rotateX(-.6rad)"
    >
        <span style:transform="translateY({prop_FOCUS ? 0 : -100}%)">SCROLL</span>

        ACCUEIL PRÉSENTATION COMPÉTENCES PROJETS
    </p>

    <Group
    let:resize
    let:animation
    bind:group_start
    bind:group_stop
    >
        {#each prop_CUBES as cube}
            <GravityArea
            let:grabbing
            {...cube.props}
            prop_FOCUS={gravityarea$_FOCUS}
            prop_FOCUSABLE={gravityarea$_FOCUS}
            prop_$RESIZE={resize}
            prop_$ANIMATION={animation}
            prop_GRABBING={prop_FOCUS}
            prop_ROTATE_Y={Math.random() * MATH.PI.x2}
            prop_ROTATE_Z={Math.random() * MATH.PI.x2}
            on:click={gravityarea_eClick.bind(null, cube.id)}
            >
                <Cube
                prop_GRABBING={grabbing}
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

@use 'sass:map';

@use '../../assets/scss/styles/position';
@use '../../assets/scss/styles/display';
@use '../../assets/scss/styles/size';
@use '../../assets/scss/styles/font';
@use '../../assets/scss/styles/media';

/* #HOME */

.home
{
    @include position.placement(absolute, 0, 0, 0, 0);

    z-index: -1;

    @extend %any;

    overflow: clip;

    p
    {
        @include position.placement(absolute, $bottom: 0, $left: 68%);
        @include font.content($intermediate, $font-size: map.get(font.$font-sizes, s1));

        @extend %f-column;

        justify-content: center;

        transform-origin: bottom right;

        width: fit-content;
        height: 100vh;

        padding-bottom: 30vh;
        padding-left: 2rem;

        border-left: solid 1px $intermediate;

        text-align: right;
        writing-mode: vertical-rl;

        box-sizing: border-box;

        transition: transform .8s .6s ease-in-out;

        span
        {
            #{--title-size}: map.get(font.$font-sizes, s7);

            transition: transform .8s 1s ease-in;
        
            @include font.h-custom($line-height: 1.2, $italic: true);

            @include media.min($ms4, $ms3) { #{--title-size}: 100px; }
        }

        @include media.min($ms3)
        {
            padding-bottom: 22vh;
        
            span { #{--title-size}: map.get(font.$font-sizes, s8); }
        }
    }

    :global .group
    {
        width: 0;
        height: 0;
    }
}
</style>