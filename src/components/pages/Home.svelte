<!-- #MAP

-EVENT
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
    prop_BREAK = 0

// #IMPORTS

    // --JS
    import { HOME_CONTENT_DATAS, HOME_CUBES_DATAS } from '../../assets/js/datas/dHome'
    import MATH from '../../assets/js/utils/math'

    // --LIB
    import COLORS from '$lib/colors'

    // --CONTEXT
    import { EVENT } from '../../App.svelte'

    // --SVELTE
    import { onMount, onDestroy } from 'svelte'

    // --COMPONENT-COVERS
    import Content from '../covers/Content.svelte'
    import GravityArea from '../covers/GravityArea.svelte'
    import Icon from '../covers/Icon.svelte'
    import Group from '../covers/Group.svelte'

    // --COMPONENT-ELEMENTS
    import Cube from '../elements/Cube.svelte'
    import Mask from '../elements/Mask.svelte'
    import TicTacToe from '../elements/TicTacToe.svelte'

    // --COMPONENT-ICON
    import Logo from '../icons/Logo.svelte'

    // --COMPONENT-DECORS
    import Particles from '../decors/Particles.svelte'
    import SpaceCube from '../decors/SpaceCube.svelte'

// #CONSTANTES

    // --ELEMENT-HOME
    const HOME_EVENTS =
    {
        scroll: home_e$Scroll,
        resize: home_e$Resize
    }

// #VARIABLES

    // --ELEMENT-HOME
    let
    home_END,
    home_SCROLL_RATIO = 0

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
    function home_set()
    {
        home_setVars()
        home_setEvents()

        group_start()
    }

    function home_setVars() { home_END = window.innerHeight * prop_BREAK }

    function home_setEvents() { EVENT.event_add(HOME_EVENTS) }

    // --DESTROY
    function home_destroy() { home_destroyEvents() }

    function home_destroyEvents() { EVENT.event_remove(HOME_EVENTS) }

    // --EVENTS
    async function home_e$Scroll(scrollTop) { home_SCROLL_RATIO = scrollTop / home_END }

    async function home_e$Resize() { home_setVars() }

    async function cube_eClick(id)
    {
        if (id === 0) spacecube_TICTACTOE = true
    }

// #CYCLES

onMount(home_set)
onDestroy(home_destroy)
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
        prop_RATIO={home_SCROLL_RATIO}
        prop_TICTACTOE={spacecube_TICTACTOE}
        bind:spacecube_CHARGED
        />
        
        <Mask
        prop_BLUR={true}
        prop_COORDS={[68, 50]}
        prop_GRADIENT={[0, 80]}
        prop_RATIO={1 - home_SCROLL_RATIO}
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
    prop_STYLE="position: absolute; top: 0; left: 0"
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
            prop_GRABBING={!home_SCROLL_RATIO}
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

    .wrapper
    {
        @extend %wrapper;

        :global{ .icon { #{--icon-size}: calc(var(--title-size) * font.$line-height-title-min) } }
    }
}
</style>