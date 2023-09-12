<!-- #MAP

    HOME
        WRAPPER
            PARTICLES
            SPACECUBE

            CONTENT
                ~~ICON

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
    prop_RATIO = 0

// #IMPORTS

    // --JS
    import { HOME_CONTENT_DATAS, HOME_CUBES_DATAS } from '../../assets/js/datas/dHome'
    import MATH from '../../assets/js/utils/math'

    // --LIB
    import COLORS from '$lib/colors'

    // --SVELTE
    import { onMount } from 'svelte'

    // --COMPONENT-COVERS
    import Content from '../covers/Content.svelte'
    import GravityArea from '../covers/GravityArea.svelte'
    import Icon from '../covers/Icon.svelte'
    import Group from '../covers/Group.svelte'

    // --COMPONENT-ELEMENTS
    import Cube from '../elements/Cube.svelte'
    import Mask from '../elements/Mask.svelte'

    // --COMPONENT-ICON
    import Logo from '../icons/Logo.svelte'

    // --COMPONENT-DECORS
    import Particles from '../decors/Particles.svelte'
    import SpaceCube from '../decors/SpaceCube.svelte'

// #VARIABLES

    // --ELEMENT-SPACECUBE
    let
    spacecube_CHARGED = false,
    spacecube_TICTACTOE = false

    // --ELEMENT-GROUP
    let
    group_start,
    group_stop

// #FUNCTIONS

    // --SET
    function home_set() { group_start() }

    // --EVENTS
    async function cube_eClick(id)
    {
        if (id === 0) spacecube_TICTACTOE = true
    }

// #CYCLE

onMount(home_set)
</script>

<!-- #HTML -->

<div
id="home"
style:z-index={prop_FOCUS ? 1 : 0}
>
    <div
    class="wrapper"
    >
        <Particles />

        <SpaceCube
        prop_TICTACTOE={spacecube_TICTACTOE}
        {prop_RATIO}
        bind:spacecube_CHARGED
        />
        
        <Mask
        prop_BLUR={true}
        prop_COORDS={[68, 50]}
        prop_GRADIENT={[0, 80]}
        prop_RATIO={1 - prop_RATIO}
        />

        <Content
        prop_CHARGED={spacecube_CHARGED}
        {...HOME_CONTENT_DATAS}
        {prop_FOCUS}
        >
            <Icon
            prop_COLOR={COLORS.light}
            prop_SPRING={false}
            slot="title-element"
            >
                <Logo />
            </Icon>
        </Content>
    </div>

    <Group
    let:resize
    let:animation
    bind:group_start
    bind:group_stop
    >
        {#each HOME_CUBES_DATAS as cube, i}
            <GravityArea
            let:rotation
            let:grabbing
            {...cube}
            prop_e$RESIZE={resize}
            prop_e$ANIMATION={animation}
            prop_GRABBING={!prop_RATIO}
            >
                <Cube
                prop_$ROTATION={rotation}
                prop_$GRABBING={grabbing}
                prop_FOCUS={true}
                prop_ROTATE={Math.random() * MATH.PI.x2}
                prop_ROTATE_Y={Math.random() * MATH.PI.x2}
                on:click={cube_eClick.bind(null, i)}
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

@use '../../assets/scss/styles/elements';
@use '../../assets/scss/styles/position';
@use '../../assets/scss/styles/size';
@use '../../assets/scss/styles/font';

/* #HOME */

#home
{
    &, .wrapper { width: 100%; }

    position: relative;

    @extend %any;

    .wrapper { @extend %wrapper; }

    :global
    {
        .icon { #{--icon-size}: calc(var(--title-size) * font.$line-height-title-min) }

        .group { @include position.placement(absolute, 0, auto, auto, 0); }
    }
}
</style>