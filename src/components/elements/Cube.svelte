<!-- #SCRIPT -->

<script>
// #EXPORTS

    // --PROPS
    export let
    prop_TRANSLATEX,
    prop_TRANSLATEY,
    prop_ROTATE,
    prop_ROTATEY,
    prop_SIZE,
    prop_ORBIT = false

// #IMPORTS

    // --JS
    import MATH from '../../assets/js/utils/math'
    import { wait_throttle } from '../../assets/js/utils/wait'

    // --LIB
    import { COLORS } from '$lib/app'

    // --CONTEXTS
    import { EVENT, ANIMATION, SPRING } from '../../App.svelte'

    // --SVELTE
    import { onMount, onDestroy } from 'svelte'

    // --COMPONENT-COVER
    import Icon from '../covers/Icon.svelte'

    // --COMPONENT-ICON
    import Logo from '../icons/Logo.svelte'

// #CONSTANTE

    // --ELEMENT-CUBE
    const CUBE_EVENTS = { mouseMove: cube_mouseMove, mouseUp: cube_mouseUp }

// #VARIABLES

    // --ELEMENT-GRAVITY-AREA
    let
    gravityarea,
    gravityarea_LAST = +new Date(),
    gravityarea_TIMEOUT

    // --ELEMENT-CUBE
    let
    cube,
    cube_FLOATY = Math.random(),
    cube_FLOATUP = false,
    cube_FORCEX = 0,
    cube_FORCEY = 0,
    cube_GRABBING = false,
    cube_ANIMATIONTHROTTLE = wait_throttle(cube_animationFloating, 100),
    cube_MOUSETHROTTLE = wait_throttle(cube_updatePosition, 50)

// #FUNCTIONS

    // --SET
    function cube_set()
    {
        cube_setEvent()
        cube_start()
    }

    function cube_setEvent() { EVENT.event_add(CUBE_EVENTS) }

    // --DESTROY
    function cube_destroy()
    {
        cube_destroyEvent()
        cube_end()
    }

    function cube_destroyEvent() { EVENT.event_remove(CUBE_EVENTS) }

    // --UPDATES
    function elements_update(value)
    {
        SPRING.spring_LOCK = value

        cube_GRABBING = value
    }

    function cube_updatePosition(x, y)
    {
        if (cube_GRABBING)
        {
            prop_ROTATE += (x - prop_TRANSLATEX) * .005
            prop_ROTATEY += (y - prop_TRANSLATEY) * .005

            prop_TRANSLATEX = x
            prop_TRANSLATEY = y
        }
    }

    // --EVENTS
    async function gravityarea_mouseMove({clientX, clientY})
    {
        const NOW = +new Date()

        clearTimeout(gravityarea_TIMEOUT)

        if (NOW > gravityarea_LAST + 50)
        {
            cube_end()
            gravityarea_animationAttract(clientX, clientY)

            gravityarea_LAST = NOW
        }
        else gravityarea_TIMEOUT = setTimeout(gravityarea_animationAttract.bind(null, clientX, clientY), 200)
    }

    async function gravityarea_mouseLeave()
    {
        [cube_FORCEX, cube_FORCEY] = [0, 0]

        clearTimeout(gravityarea_TIMEOUT)

        gravityarea_TIMEOUT = setTimeout(() =>
        {
            cube_FLOATY = .5

            cube_start()
        }, 200)
    }

    async function cube_mouseDown() { elements_update(true) }

    async function cube_mouseMove(clientX, clientY) { cube_MOUSETHROTTLE(clientX - prop_SIZE, clientY - prop_SIZE) }

    async function cube_mouseUp() { elements_update(false) }

    // --ANIMATION
    async function cube_animationFloating()
    {
        cube_FORCEY = 10 * (Math.sin((cube_FLOATY - .5) * Math.PI) + 1) - 10

        cube_FLOATY += cube_FLOATUP ? -.05 : .05

        if (cube_FLOATY > 1) cube_FLOATY = 1, cube_FLOATUP = true
        else if (cube_FLOATY < 0) cube_FLOATY = 0, cube_FLOATUP = false
    }

    function gravityarea_animationAttract(clientX, clientY)
    {
        const
        CLIENTRECT = gravityarea.getBoundingClientRect(),
        SIZE = CLIENTRECT.width / 2,
        [DIFX, DIFY] = [clientX - (CLIENTRECT.left + SIZE), clientY - (CLIENTRECT.top + SIZE)],
        [ANGLE, RADIUS] = [Math.atan(DIFY / DIFX), Math.cos(MATH.rad.r45) * (SIZE / Math.cos((MATH.rad.r90 - (prop_ORBIT ? Math.abs(prop_ROTATE) : 0) - MATH.rad.r45)))]

        cube_FORCEX = DIFX * (1 - Math.abs(DIFX) / (Math.cos(ANGLE) * RADIUS)) * .5
        cube_FORCEY = DIFY * (1 - Math.abs(DIFY) / Math.abs(Math.sin(ANGLE) * RADIUS)) * .5
    }

    // --UTILS
    function cube_start() { ANIMATION.animation_add(cube_ANIMATIONTHROTTLE) }

    function cube_end() { ANIMATION.animation_remove(cube_ANIMATIONTHROTTLE) }

// #CYCLES

onMount(cube_set)
onDestroy(cube_destroy)
</script>

<!-- #HTML -->

<button
class="gravity-area"
style:--cube-size="{prop_SIZE}px"
style:transform="translate({prop_TRANSLATEX}px, {prop_TRANSLATEY}px)"
bind:this={gravityarea}
on:mousemove={gravityarea_mouseMove}
on:mouseleave={gravityarea_mouseLeave}
>
    <!-- application des forces -->
    <div
    style:transform="translate({cube_FORCEX}px, {cube_FORCEY}px)"
    >
        <!-- rotation de l'objet -->
        <!-- svelte-ignore a11y-no-static-element-interactions -->
        <div
        class="cube"
        style:transform="rotate({prop_ROTATE}rad) rotateY({prop_ROTATEY}rad)"
        style:cursor={cube_GRABBING ? 'grabbing' : 'grab'}
        bind:this={cube}
        on:mousedown={cube_mouseDown}
        >
            {#each [0, 1, 2, 3, 4, 5] as id}
                <div
                class="side"
                class:grabbing={cube_GRABBING}
                data-side-id={id}
                >
                    <Icon
                    prop_SIZE="30%"
                    prop_COLOR={COLORS.light}
                    prop_SPRING={false}
                    >
                        <Logo />
                    </Icon>
                </div>
            {/each}
        </div>
    </div>
</button>

<!-- #STYLE -->

<style
lang="scss"
>
/* #USES */

@use '../../assets/scss/styles/_position';
@use '../../assets/scss/styles/_display';
@use '../../assets/scss/styles/_size';

/* #CUBE */

.gravity-area
{
    @extend %f-center;

    position: absolute;

    transform-style: preserve-3d;

    width: calc(var(--cube-size) * 2);
    height: calc(var(--cube-size) * 2);

    background-color: transparent;

    border: none;
    border-radius: 50%;
    outline: none;

    pointer-events: auto;

    transition: transform .3s;

    &>div { transition: transform .5s; }
}

.cube
{
    transform-style: preserve-3d;
    transform-origin: center;

    width: var(--cube-size);
    height: var(--cube-size);

    transition: transform .6s;

    .side
    {
        @extend %f-center;
        @extend %any;

        background-color: $dark;

        border: solid $primary calc(var(--cube-size) * .05);

        box-sizing: border-box;

        transition: border .7s ease-in;

        &.grabbing { border-color: $indicator; }
    }
    .side:nth-child(1) { transform: translateZ(calc(var(--cube-size) / 2)); }
    .side:nth-child(2) { transform: translateY(-150%) rotateX(-90deg); }
    .side:nth-child(3) { transform: translate(-50%, -200%) rotateY(90deg) scaleX(-1); }
    .side:nth-child(4) { transform: translateY(-250%) rotateX(90deg); }
    .side:nth-child(5) { transform: translate(50%, -400%) rotateY(-90deg); }
    .side:nth-child(6) { transform: translateY(-500%) translateZ(calc(var(--cube-size) / -2)); }
}
</style>