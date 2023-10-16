<!-- #MAP

    CUBE
        SIDE * 6
            ICON

-->

<!-- #SCRIPT -->

<script>
// #EXPORTS

    // --PROPS
    export let
    prop_$ROTATION = {},

    prop_FOCUS = false,
    prop_GRABBING = false,
    prop_DESTROY = false,

    prop_ROTATE = 0,
    prop_ROTATE_Y = 0,

    prop_COMPONENT = void {},
    prop_SRC = void '',
    prop_ALT = '',
    prop_COLOR = void 0

// #IMPORTS

    // --LIB
    import COLORS from '$lib/colors'

    // --SVELTE
    import { onMount } from 'svelte'

    // --COMPONENT-COVER
    import Icon from '../covers/Icon.svelte'

    // --COMPONENT-ICONS
    import Logo from '../icons/Logo.svelte'
    import Image from '../icons/Image.svelte'


// #VARIABLES

    // --ELEMENT-CUBE
    let
    cube_CHARGED = false,
    cube_ROTATE = prop_ROTATE,
    cube_ROTATE_Y = prop_ROTATE_Y

    // --ELEMENT-ICON
    let icon_OPACITY = 0

// #REACTIVE

    // --ELEMENT-CUBE
    $: cube_CHARGED ? cube_updatePosition($prop_$ROTATION) : null

// #FUNCTIONS

    // --SET
    function cube_set()
    {
        cube_CHARGED = true

        setTimeout(() => icon_OPACITY = 1, 1200)
    }

    // --UPDATES
    function cube_updatePosition({ rX, rY })
    {
        cube_ROTATE += rX ?? 0
        cube_ROTATE_Y += rY ?? 0
    }

// #CYCLE

onMount(cube_set)
</script>

<!-- #HTML -->

<div
class="cube {prop_DESTROY ? 'destroy' : 'build'}"
class:focus={prop_FOCUS}
class:grabbing={prop_GRABBING}
style:--cube-color={prop_COLOR ?? COLORS.primary}
style:transform="
translate(var(--force-x, 0), var(--force-y, 0))

rotateY({cube_ROTATE_Y}rad)
rotateZ({cube_ROTATE}rad)

translateZ(calc(var(--cube-size, '100px') / 2))"
>
    {#each [1, 2, 3, 4, 5, 6] as id}
        <div
        class="side"
        data-side-id={id}
        >
            <Icon
            prop_OPACITY={prop_DESTROY ? 0 : icon_OPACITY}
            prop_SIZE="30%"
            prop_COLOR={COLORS[prop_FOCUS && !prop_DESTROY ? 'light' : 'intermediate']}
            prop_SPRING={false}
            >
                {#if prop_COMPONENT}
                    <svelte:component
                    this={prop_COMPONENT}
                    />
                {:else if prop_SRC}
                    <Image
                    {prop_FOCUS}
                    {prop_SRC}
                    {prop_ALT}
                    />
                {:else}
                    <Logo />
                {/if}
            </Icon>
        </div>
    {/each}
</div>

<!-- #STYLE -->

<style
lang="scss"
>
/* #USES */

@use '../../assets/scss/styles/display';
@use '../../assets/scss/styles/size';

/* #CUBE */

.cube
{
    $size: var(--cube-size, '100px');

    transform-style: preserve-3d;
    transform-origin: center;

    width: 50%;
    height: 50%;

    pointer-events: none;

    transition: transform .6s ease-out;

    &.build
    {
        .side
        {
            opacity: 1;

            animation: aBuild 1s ease-in;
        }
    }
    &.destroy
    {
        .side
        {
            opacity: 0;

            animation: aDestroy 1s ease-in forwards;
        }
    }
    &.focus .side  { border-color: var(--cube-color, $primary); }
    &.grabbing .side { border-color: $indicator !important; }

    .side
    {
        @extend %f-center;
        @extend %any;

        position: absolute;
    
        backface-visibility: hidden;

        background-color: $dark;

        border: solid $intermediate calc($size * .05);

        box-sizing: border-box;

        transition: border .7s ease-in, opacity .7s ease-in;
    }
    .side:nth-child(1), .side:nth-child(2), .side:nth-child(3), .side:nth-child(4) { top: 0; }
    .side:nth-child(1), .side:nth-child(4), .side:nth-child(5), .side:nth-child(6) { left: 0; }
    .side:nth-child(2)
    {
        left: 100%;

        transform-origin: left;
        transform: rotate3d(0, 1, 0, 90deg);
    }
    .side:nth-child(3)
    {
        left: -100%;

        transform-origin: right;
        transform: rotate3d(0, -1, 0, 90deg);
    }
    .side:nth-child(4) { transform: translateZ(calc($size * -1)) rotate3d(0, 1, 0, 180deg); }
    .side:nth-child(5)
    {
        top: -100%;

        transform-origin: bottom;
        transform: rotate3d(1, 0, 0, 90deg);
    }
    .side:nth-child(6)
    {
        top: 100%;

        transform-origin: top;
        transform: rotate3d(-1, 0, 0, 90deg);
    }

    @keyframes aBuild
    {
        from
        {
            transform: translate3d(0, 0, 0) rotate3d(0, 0, 0, 0);
            
            border-color: $dark;
        }
    }
    @keyframes aDestroy
    {
        to
        {
            transform: translate3d(0, 0, 0) rotate3d(0, 0, 0, 0);
            
            border-color: $dark;
        }
    }
}
</style>