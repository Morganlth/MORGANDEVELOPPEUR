<!-- #MAP

-ROUTER
    HOME
        DECOR
            PARTICLES
            SPACECUBE
            GROUP
                GRAVITYAREA * 3
                    CUBE

        CONTENT
            ICON
                LOGO

-->

<!-- #SCRIPT -->

<script>
// #EXPORTS

    // --PROPS
    export let
    prop_FOCUS = false,
    prop_INTRO = false,
    prop_RATIO = 0

// #IMPORTS

    // --JS
    import { HOME_CONTENT_DATAS, HOME_CUBES_DATAS } from '../../assets/js/datas/dHome'
    import MATH from '../../assets/js/utils/math'

    // --LIB
    import COLORS from '$lib/colors'

    // --CONTEXT
    import { ROUTER } from '../../App.svelte'

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

    // --COMPONENT-DECOR
    import SpaceCube from '../decors/SpaceCube.svelte'

// #VARIABLES

    // --ELEMENT-SPACECUBE
    let spacecube_CHARGED = false

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
id="home"
>
    <div
    class="decor"
    >
        <SpaceCube
        {prop_FOCUS}
        {prop_RATIO}
        bind:spacecube_CHARGED
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
            {#each HOME_CUBES_DATAS as cube, id}
                <GravityArea
                let:rotation
                let:grabbing
                {...cube}
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
                    {prop_FOCUS}
                    on:click={cube_eClick.bind(null, id + 1)}
                    />
                </GravityArea>
            {/each}
        </Group>
    </div>

    <Content
    prop_CHARGED={spacecube_CHARGED}
    {...HOME_CONTENT_DATAS}
    {prop_FOCUS}
    {prop_INTRO}
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

<!-- #STYLE -->

<style
lang="scss"
>
/* #USES */

@use '../../assets/scss/styles/position';
@use '../../assets/scss/styles/size';
@use '../../assets/scss/styles/font';

/* #HOME */

#home
{
    .decor
    {
        @include position.placement(absolute, 0, 0, 0, 0);

        @extend %any;
    }

    :global
    {
        .icon { #{--icon-size}: calc(var(--title-size) * font.$line-height-title-min) }

        .group { @include position.placement(absolute, $top: 0, $left: 0); }
    }
}
</style>