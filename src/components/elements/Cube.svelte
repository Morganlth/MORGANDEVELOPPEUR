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
    prop_FOCUS = false,
    prop_GRABBING = false,

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

// #VARIABLE

    // --ELEMENT-ICON
    let icon_OPACITY = 0

// #FUNCTION

    // --SET
    function cube_set() { setTimeout(() => icon_OPACITY = 1, 1200) }

// #CYCLE

onMount(cube_set)
</script>

<!-- #HTML -->

<div
class="cube"
class:focus={prop_FOCUS}
class:grabbing={prop_GRABBING}
style:--cube-color={prop_COLOR ?? COLORS.primary}
>
    {#each [1, 2, 3, 4, 5, 6] as id}
        <div
        class="side"
        data-side-id={id}
        >
            <Icon
            prop_OPACITY={icon_OPACITY}
            prop_SIZE="30%"
            prop_COLOR={COLORS[prop_FOCUS ? 'light' : 'intermediate']}
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
    $size: var(--slot-size, '100px');

    transform-style: preserve-3d;
    transform-origin: center;
    transform:
    translate(var(--slot-f-x, 0), var(--slot-f-y, 0))
    rotateY(var(--slot-r-y, 0))
    rotateZ(var(--slot-r-z, 0))
    translateZ(calc(var(--slot-size, '100px') / 2));

    width: 50%;
    height: 50%;

    pointer-events: none;

    transition: transform .6s ease-out;

    &.focus .side
    {
        opacity: 1;

        border-color: var(--cube-color, $primary);
    }

    &.grabbing .side { border-color: $indicator !important; }

    .side
    {
        @extend %f-center;
        @extend %any;

        position: absolute;

        opacity: .3;

        background-color: $dark;

        border: solid $intermediate calc($size * .05);

        box-sizing: border-box;

        transition: border .4s ease-in, opacity .4s;
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
}
</style>