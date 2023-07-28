<!-- #SCRIPT -->

<script>
// #IMPORTS

    // --JS
    import MATH from '../../assets/js/utils/math'

    // --LIB
    import { COLORS } from '$lib/app'

    // --SVELTE
    import { page } from '$app/stores'

    // --COMPONENT-ELEMENT
    import Particles from '../decor/Particles.svelte'
    import SpaceCube from '../decor/SpaceCube.svelte'
    import SpaceWave from '../decor/SpaceWave.svelte'
    import Cube from '../elements/Cube.svelte'

    // --COMPONENT-COVER
    import Icon from '../covers/Icon.svelte'

    // --COMPONENT-ICON
    import Logo from '../icons/Logo.svelte'

// #CONSTANTE

    // --ELEMENT-SPACE
    const SPACE_CUBES =
    [
        {
            prop_TRANSLATEX: 700,
            prop_TRANSLATEY: 550,
            prop_SIZE: 150
        },
        {
            prop_TRANSLATEX: 1500,
            prop_TRANSLATEY: 170,
            prop_SIZE: 120
        },
        {
            prop_TRANSLATEX: 1270,
            prop_TRANSLATEY: 510,
            prop_SIZE: 220
        }
    ]
</script>

<!-- #HTML -->

<section
id="home"
>
    <Particles />
    <SpaceWave />
    <!-- <SpaceCube /> -->

    <span
    class="lang"
    >
        FR
    </span>

    <h1>
        <strong>
            D

            <Icon
            prop_COLOR={COLORS.dark}
            prop_SPRING={false}
            >
                <Logo
                prop_PIECE={true}
                />
            </Icon>

            VELOPPEUR
        </strong>

        <span>
            W
            
            <Icon
            prop_COLOR={COLORS.dark}
            prop_SPRING={false}
            >
                <Logo
                prop_PIECE={true}
                />
            </Icon>
            
            B
        </span>

        <Icon
        prop_COLOR={COLORS.dark}
        prop_SPRING={false}
        >
            <Logo />
        </Icon>
    </h1>

    <img
    src="{$page.url.origin}/images/me.png"
    alt="LE THUAUT MORGAN dessin"
    >

    <div
    class="space"
    >
        {#each SPACE_CUBES as cube_PROPS}
            <Cube
            {...cube_PROPS}
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
    @include size.any;

    padding: app.$gap-inline * 2 0 0 app.$gap-inline;

    box-sizing: border-box;

    .lang { @include font.interact; }

    h1
    {
        #{--icon-size}: map.get(font.$h-1, font-size) * .7;

        @include font.h-(1);

        margin-top: 3rem;

        strong, span
        {
            &::before
            {
                $before-size: .6rem;
        
                @include position.placement(absolute, 0, auto, auto, 0, true);

                width: $before-size;
                height: 100%;

                border-radius: $before-size;
            }
    
            @include display.f-a-center;

            position: relative;

            margin-bottom: math.div(app.$gap-block, 2);
            padding-left: app.$gap-inline;
        }
        strong
        {
            &::before { background-color: $primary; }

            margin-left: app.$gap-inline;
        }
        span::before { background-color: $indicator; }
    }

    img
    {
        @include position.placement(absolute, auto, 10%, 0);

        width: 40%;
        height: auto;

        user-select: none;
    }

    .space
    {
        @include position.placement(absolute, 0, 0, 0, 0);
        @include size.any;

        perspective: 1000px;

        pointer-events: none;
    }
}
</style>