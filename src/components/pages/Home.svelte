<!-- #SCRIPT -->

<script>
// #IMPORTS

    // --JS
    import HOME_CUBES from '../../assets/js/datas/home_cubes'
    import MATH from '../../assets/js/utils/math'
    import { wait_throttle } from '../../assets/js/utils/wait'

    // --LIB
    import { COLORS } from '$lib/app'

    // --CONTEXT
    import { EVENT } from '../../App.svelte'

    // --SVELTE
    import { onMount, onDestroy } from 'svelte'

    // --COMPONENT-ELEMENT
    import Particles from '../decor/Particles.svelte'
    import SpaceCube from '../decor/SpaceCube.svelte'
    import Cube from '../elements/Cube.svelte'

    // --COMPONENT-COVER
    import Icon from '../covers/Icon.svelte'

    // --COMPONENT-ICON
    import Logo from '../icons/Logo.svelte'

// #CONSTANTE

    // --ELEMENT-HOME
    const HOME_CUBES_ANIMATION = []

// #FUNCTIONS

    // --SET
    function home_set() { home_setEvent() }

    function home_setEvent() { EVENT.event_add({ animation: home_animation }) }

    // --DESTROY
    function home_destroy() { EVENT.event_remove({ animation: home_animation }) }

    // --EVENT
    const home_animation = wait_throttle(() => { for (const CUBE_ANIMATION of HOME_CUBES_ANIMATION) CUBE_ANIMATION() }, 100)

// #CYCLES

onMount(home_set)
onDestroy(home_destroy)
</script>

<!-- #HTML -->

<section
id="home"
>
    <Particles />
    <SpaceCube />

    <span
    class="lang"
    >
        FR
    </span>

    <h1>
        <strong>
            DEVELOPPEUR
        </strong>

        <span>
            WEB
        </span>

        <Icon
        prop_COLOR={COLORS.light}
        prop_SPRING={false}
        >
            <Logo />
        </Icon>
    </h1>

    <div>
        {#each HOME_CUBES as cube}
            <Cube
            {...cube}
            prop_HOME_ANIMATION={HOME_CUBES_ANIMATION}
            prop_ROTATE={Math.random() * MATH.PI.x2}
            prop_ROTATEY={Math.random() * MATH.PI.x2}
            />
        {/each}
    </div>
</section>

<!-- #STYLE -->

<style
lang="scss"
>
/* #USES */

@use 'sass:map';
@use 'sass:math';

@use '../../assets/scss/app';

@use '../../assets/scss/styles/position';
@use '../../assets/scss/styles/display';
@use '../../assets/scss/styles/size';
@use '../../assets/scss/styles/font';

/* #HOME */

#home
{
    @extend %any;

    padding: app.$gap-inline * 2 0 0 app.$gap-inline;

    box-sizing: border-box;

    .lang { @include font.interact; }

    h1
    {
        #{--icon-size}: map.get(font.$h-1, font-size) * .7;

        @include font.h-(1);

        position: relative;

        z-index: 1;

        margin-top: 3rem;

        user-select: none;
        pointer-events: none;

        strong, span
        {
            &::before
            {
                @include position.placement(absolute, -.7rem, auto, auto, 0, true);

                width: 2.4rem;
                height: 2.4rem;

                background-color: $primary;

                pointer-events: auto;

                transition: background .4s;
            }
            &:hover::before { background-color: $indicator; }
    
            @extend %f-a-center;

            position: relative;

            margin-bottom: math.div(app.$gap-block, 2);
            padding-left: app.$gap-inline;
        }
        strong { margin-left: app.$gap-inline; }
    }

    &>div
    {
        @include position.placement(absolute, 0, 0, 0, 0);

        @extend %any;

        perspective: 1000px;

        pointer-events: none;
    }
}
</style>