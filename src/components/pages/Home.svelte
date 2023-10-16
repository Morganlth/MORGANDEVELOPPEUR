<!-- #MAP

-EVENT
    HOME
        SPACECUBE
        GROUP
            GRAVITYAREA * 3
                CUBE
        TERMINAL

-->

<!-- #SCRIPT -->

<script>
// #EXPORTS

    // --PROPS
    export let
    prop_FOCUS = false,

    prop_SPACECUBE = new Float64Array([]),
    prop_CUBES = [],

    prop_TOP = 0,
    prop_RATIO = 0

    // --BINDS
    export let page_CHARGED = false

    // BIND page_process

// #IMPORTS

    // --JS
    import MATH from '../../assets/js/utils/math'

    // --CONTEXT
    import { EVENT } from '../../App.svelte'

    // --SVELTE
    import { tick } from 'svelte'

    // --COMPONENT-COVERS
    import GravityArea from '../covers/GravityArea.svelte'
    import Group from '../covers/Group.svelte'

    // --COMPONENT-ELEMENTS
    import Mask from '../elements/Mask.svelte'
    import Cube from '../elements/Cube.svelte'
    import TicTacToe from '../elements/TicTacToe.svelte'
    import Terminal from '../elements/Terminal.svelte'

    import System from '../elements/System.svelte'

    // --COMPONENT-DECOR
    import SpaceCube from '../decors/SpaceCube.svelte'

// #VARIABLES

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
    ? prop_FOCUS
        ? group_start()
        : group_stop()
    : void 0

// #FUNCTIONS

    // --UPDATES
    function tictactoe_update(on) { tictactoe_ON = on }

    function terminal_update(on) { terminal_ON = on }

    // --EVENT
    async function gravityarea_eClick(id)
    {
        switch (id)
        {
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

        tictactoe_update(str === 'tictactoe')
        terminal_update(str === 'terminal')
    }
</script>

<!-- #HTML -->

<div
class="home"
>
    <SpaceCube
    {prop_FOCUS}
    {prop_SPACECUBE}
    {prop_RATIO}
    bind:spacecube_CHARGED={page_CHARGED}
    />

    <Mask
    prop_BLUR={true}
    prop_COORDS={[68, 50]}
    prop_GRADIENT={[0, 80]}
    prop_RATIO={1 - prop_RATIO}
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
            prop_$RESIZE={resize}
            prop_$ANIMATION={animation}
            prop_GRABBING={!prop_RATIO}
            on:click={gravityarea_eClick.bind(null, cube.id)}
            >
                <Cube
                prop_$ROTATION={rotation}
                prop_GRABBING={grabbing}
                prop_DESTROY={!prop_FOCUS}
                prop_ROTATE={Math.random() * MATH.PI.x2}
                prop_ROTATE_Y={Math.random() * MATH.PI.x2}
                prop_COMPONENT={cube.component}
                {prop_FOCUS}
                />
            </GravityArea>
        {/each}
    </Group>

    <!-- <TicTacToe
    prop_ON={tictactoe_ON}
    /> -->

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