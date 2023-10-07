<!-- #MAP

-ROUTER
    HOME
        SPACECUBE
        GROUP
            GRAVITYAREA * 3
                CUBE

-->

<!-- #SCRIPT -->

<script>
// #EXPORTS

    // --PROPS
    export let
    prop_FOCUS = false,

    prop_SPACECUBE = new Float64Array([]),
    prop_CUBES = [],

    prop_RATIO = 0

    // --BINDS
    export let page_CHARGED = false
    
    export const page_ELEMENT =
    {
        component: Icon,
        props:
        {
            prop_SIZE: 'calc(var(--title-size) * .71)',
            prop_COLOR: COLORS.light,
            prop_SPRING: false
        },
        children: [{ component: Logo }]
    }

// #IMPORTS

    // --JS
    import MATH from '../../assets/js/utils/math'

    // --LIB
    import COLORS from '$lib/colors'

    // --CONTEXT
    import { ROUTER } from '../../App.svelte'

    // --COMPONENT-COVERS
    import GravityArea from '../covers/GravityArea.svelte'
    import Group from '../covers/Group.svelte'

    // --COMPONENT-ELEMENTS
    import Cube from '../elements/Cube.svelte'
    import Mask from '../elements/Mask.svelte'

    // --COMPONENT-ICONS
    import Logo from '../icons/Logo.svelte'
    import TicTacToe from '../icons/TicTacToe.svelte'
    import Terminal from '../icons/Terminal.svelte'

    // --COMPONENT-DECOR
    import SpaceCube from '../decors/SpaceCube.svelte'
    import Icon from '../covers/Icon.svelte';

// #CONSTANTE

    // --ELEMENT-CUBE
    const CUBE_DATAS = prop_CUBES.map(cube =>
    {
        cube.component = [Logo, TicTacToe, Terminal][cube.id]

        return cube
    })

// #VARIABLES

    // --ELEMENT-GROUP
    let
    group_start,
    group_stop

// #REACTIVE

    // --ELEMENT-GROUP
    $: group_start instanceof Function && group_stop instanceof Function
    ? prop_FOCUS
        ? group_start()
        : group_stop()
    : void 0

// #FUNCTION

    // --EVENT
    async function cube_eClick(id) { ROUTER.router_update(id) }
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
        {#each CUBE_DATAS as cube}
            <GravityArea
            let:rotation
            let:grabbing
            {...cube.props}
            prop_$RESIZE={resize}
            prop_$ANIMATION={animation}
            prop_GRABBING={!prop_RATIO}
            >
                <Cube
                prop_$ROTATION={rotation}
                prop_$GRABBING={grabbing}
                prop_DESTROY={!prop_FOCUS}
                prop_ROTATE={Math.random() * MATH.PI.x2}
                prop_ROTATE_Y={Math.random() * MATH.PI.x2}
                prop_COMPONENT={cube.component}
                {prop_FOCUS}
                on:click={cube_eClick.bind(null, cube.id + 1)}
                />
            </GravityArea>
        {/each}
    </Group>
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

    @extend %any;

    :global .group { @include position.placement(absolute, $top: 0, $left: 0); }
}
</style>