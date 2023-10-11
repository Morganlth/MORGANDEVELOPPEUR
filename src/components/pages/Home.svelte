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
    
    export const PAGE_ELEMENT =
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

    // BIND page_process

// #IMPORTS

    // --JS
    import MATH from '../../assets/js/utils/math'

    // --LIB
    import COLORS from '$lib/colors'

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
    import Terminal from '../elements/Terminal.svelte'

    // --COMPONENT-ICONS
    import Logo from '../icons/Logo.svelte'
    import Grid from '../icons/Grid.svelte'
    import CommandLine from '../icons/CommandLine.svelte'

    // --COMPONENT-DECOR
    import SpaceCube from '../decors/SpaceCube.svelte'
    import Icon from '../covers/Icon.svelte';

// #CONSTANTE

    // --ELEMENT-GROUP
    const GROUP_DATAS = prop_CUBES.map(cube =>
    {
        cube.component = [Logo, Grid, CommandLine][cube.id]

        return cube
    })

// #VARIABLES

    // --ELEMENT-GROUP
    let
    group_start,
    group_stop

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

    // --UPDATE
    function terminal_update(on) { terminal_ON = on }

    // --EVENT
    async function gravityarea_eClick(id)
    {
        switch (id)
        {
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

        console.log(str)

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
        {#each GROUP_DATAS as cube}
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