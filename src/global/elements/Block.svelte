<!----------------------------------------------- #||--block--|| -->


<!-- #|-CONTEXT-| -->
<!--
<script
context="module"
>

// #\-IMPORTS-\

    // --SVELTE

     // --LIB

    // --JS


// #\-EXPORTS-\

    // --CONTEXTS


</script>
-->

<!-- #|-HTML-| -->

<div
class="block t-p3d p-n--"
class:focus={prop_FOCUS}
class:d-hid={prop_HIDE}
class:grabbing={prop_GRABBING}
style:--block-color={prop_COLOR ?? COLORS.primary}
>
    {#each [1, 2, 3, 4, 5, 6] as id}
        <div
        class="side p-abs d-f-c s-any b-drk b-box"
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


<!-- #|-SCRIPT-| -->

<script>

// #\-IMPORTS-\

    // --DATA

    // --SVELTE
    import { onMount } from 'svelte'

    // --LIB
    import COLORS            from '$lib/colors'
    import { wait_getDelay } from '$lib/wait'

    // --CONTEXTS

//=======@COMPONENTS|

    // --*
    import Icon  from '../covers/Icon.svelte'
    import Logo  from '../icons/Logo.svelte'
    import Image from '../icons/Image.svelte'
    
//=======@STYLE|

    // --*


// #\-EXPORTS-\

    // --PROPS
    export let
    prop_FOCUS    = false,
    prop_HIDE     = true,
    prop_GRABBING = false
    ,
    prop_COMPONENT = void {},
    prop_SRC       = void '',
    prop_ALT       = '',
    prop_COLOR     = void 0

    // --BINDING


// #\-CONSTANTES-\

    // --SVELTE

    // --CONTEXTS

    // --OUTSIDE

    // --THIS

    // --INSIDE


// #\-VARIABLES-\

    // --CONTEXTS

    // --OUTSIDE

    // --THIS

    // --INSIDE
    let icon_OPACITY = 0


// #\-REATIVES-\

    // --CONTEXTS

    // --OUTSIDE

    // --THIS

    // --INSIDE


// #\-FUNCTIONS-\

//=======@LIFE|

    // --SVELTE
    onMount(block_set)

    // --SET
    function block_set() { setTimeout(() => icon_OPACITY = 1, wait_getDelay(72)) } // +- 1200ms

    // --GET

    // --UPDATES

    // --DESTROY


//=======@COMMANDS|

    // --*


//=======@EVENTS|

    // --*


//=======@TRANSITIONS|

    // --*


//=======@ANIMATIONS|

    // --*


//=======@UTILS|

    // --*


</script>


<!-- #|-STYLE-| -->

<style
lang="scss"
>

/* #\-USES-\ */

    /* --SASS */

    /* --APP */

    /* --DEPENDENCIES */
    @use '../../assets/scss/styles/utils';
    @use '../../assets/scss/styles/display';

    /* --MEDIA */


/* #\-VARIABLES-\ */

    /* --* */
    $size: var(--slot-size, '100px');


/* #\-THIS-\ */

.block
{
    transform-origin: center;
    transform       : translate(var(--slot-f-x, 0), var(--slot-f-y, 0))
                      rotateY(var(--slot-r-y, 0))
                      rotateZ(var(--slot-r-z, 0))
                      translateZ(calc(var(--slot-size, '100px') / 2));

    width : 50%;
    height: 50%;

    transition: transform .4s ease-out;

    &.focus .side { border-color: var(--block-color, $primary); }

    &.grabbing .side { border-color: $indicator !important; }

    .side
    {
        backface-visibility: hidden;

        border: solid $intermediate calc($size * .05);

        transition: border-color .4s ease-in;
    }
    .side:nth-child(1), .side:nth-child(2), .side:nth-child(3), .side:nth-child(4) { top : 0; }
    .side:nth-child(1), .side:nth-child(4), .side:nth-child(5), .side:nth-child(6) { left: 0; }
    .side:nth-child(2)
    {
        left: 100%;

        transform-origin: left;
        transform       : rotate3d(0, 1, 0, 90deg);
    }
    .side:nth-child(3)
    {
        left: -100%;

        transform-origin: right;
        transform       : rotate3d(0, -1, 0, 90deg);
    }
    .side:nth-child(4) { transform: translateZ(calc($size * -1)) rotate3d(0, 1, 0, 180deg); }
    .side:nth-child(5)
    {
        top: -100%;

        transform-origin: bottom;
        transform       : rotate3d(1, 0, 0, 90deg);
    }
    .side:nth-child(6)
    {
        top: 100%;

        transform-origin: top;
        transform       : rotate3d(-1, 0, 0, 90deg);
    }
}


</style>