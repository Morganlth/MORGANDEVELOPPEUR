<!-- #SCRIPT -->

<script>
// #EXPORTS

    // --PROPS
    export let
    prop_CUBES_ANIMATION = [],
    prop_X,
    prop_Y,
    prop_ROTATE,
    prop_ROTATEY,
    prop_SIZE
    // prop_ORBIT = false

    // BIND cube_mouseMove
    // BIND cube_mouseUp
    // BIND cube_resize

// #IMPORTS

    // --JS
    import { wait_throttle } from '../../assets/js/utils/wait'
    import { animation_floating } from '../../assets/js/utils/animation'

    // --LIB
    import { COLORS } from '$lib/colors'

    // --SVELTE
    import { onMount, onDestroy } from 'svelte'

    // --COMPONENT-COVER
    import Icon from '../covers/Icon.svelte'

    // --COMPONENT-ICON
    import Logo from '../icons/Logo.svelte'

// #VARIABLES

    // --ELEMENT-GRAVITY-AREA
    let
    gravityarea,
    gravityarea_TRANSLATE_X,
    gravityarea_TRANSLATE_Y,
    gravityarea_TRANSITION_DELAY,
    gravityarea_RADIUS,
    gravityarea_LAST = +new Date(),
    gravityarea_TIMEOUT

    // --ELEMENT-CUBE
    let
    cube,
    cube_FORCEX = 0,
    cube_FORCEY = 0,
    cube_GRABBING = false,
    cube_ANIMATION = animation_floating()

// #FUNCTIONS

    // --SET
    function cube_set()
    {
        gravityarea_setVar()
        cube_start()
    }

    function gravityarea_setVar()
    {
        gravityarea_TRANSLATE_X = prop_X * window.innerWidth
        gravityarea_TRANSLATE_Y = prop_Y * window.innerHeight
        gravityarea_RADIUS = gravityarea.offsetWidth / 2

        setTimeout(() => gravityarea_TRANSITION_DELAY = .3, 50)

        // Math.cos(MATH.rad.r45) * (SIZE / Math.cos((MATH.rad.r90 - (prop_ORBIT ? Math.abs(prop_ROTATE) : 0) - MATH.rad.r45))) ancien calcule du radius
    }

    // --DESTROY
    function cube_destroy() { cube_stop() }

    // --UPDATES
    function cube_update(value) { cube_GRABBING = value }

    const cube_updatePosition = wait_throttle((x, y) =>
    {
        if (cube_GRABBING)
        {
            prop_ROTATE += (x - gravityarea_TRANSLATE_X) * .005
            prop_ROTATEY += (y - gravityarea_TRANSLATE_Y) * .005

            gravityarea_TRANSLATE_X = x
            gravityarea_TRANSLATE_Y = y
        }
    }, 50)

    // --EVENTS
    async function gravityarea_mouseMove({clientX, clientY})
    {
        const NOW = +new Date()

        clearTimeout(gravityarea_TIMEOUT)

        if (NOW > gravityarea_LAST + 50)
        {
            gravityarea_animationAttract(clientX, clientY)

            gravityarea_LAST = NOW
        }
        else gravityarea_TIMEOUT = setTimeout(gravityarea_animationAttract.bind(null, clientX, clientY), 200)
    }

    async function gravityarea_mouseEnter() { if (!cube_GRABBING) cube_stop() }

    async function gravityarea_mouseLeave()
    {
        [cube_FORCEX, cube_FORCEY] = [0, 0]

        clearTimeout(gravityarea_TIMEOUT)

        gravityarea_TIMEOUT = setTimeout(() =>
        {
            cube_ANIMATION.setTime(.5)

            if (!cube_GRABBING) cube_start()
        }, 200)
    }

    async function cube_mouseDown() { cube_update(true) }

    export async function cube_mouseMove(clientX, clientY) { cube_updatePosition(clientX - gravityarea_RADIUS, clientY - gravityarea_RADIUS) }

    export async function cube_mouseUp() { if (cube_GRABBING) cube_update(false) }

    export async function cube_resize() { gravityarea_setVar() }

    async function cube_animation() { cube_FORCEY = cube_ANIMATION.animation() }

    // --ANIMATION
    function gravityarea_animationAttract(clientX, clientY)
    {
        const
        CLIENTRECT = gravityarea.getBoundingClientRect(),
        SIZE = CLIENTRECT.width / 2,
        [DIF_X, DIF_Y] = [clientX - (CLIENTRECT.left + SIZE), clientY - (CLIENTRECT.top + SIZE)],
        ANGLE = Math.atan(DIF_Y / DIF_X)

        cube_FORCEX = DIF_X * (1 - Math.abs(DIF_X) / (Math.cos(ANGLE) * gravityarea_RADIUS)) * .5
        cube_FORCEY = DIF_Y * (1 - Math.abs(DIF_Y) / Math.abs(Math.sin(ANGLE) * gravityarea_RADIUS)) * .5
    }

    // --CONTROLS
    function cube_start()
    {
        const INDEX = prop_CUBES_ANIMATION.indexOf(cube_animation)

        if (INDEX === -1) prop_CUBES_ANIMATION.push(cube_animation)
    }

    function cube_stop()
    {
        const INDEX = prop_CUBES_ANIMATION.indexOf(cube_animation)

        if (~INDEX) prop_CUBES_ANIMATION.splice(INDEX, 1)
    }

// #CYCLES

onMount(cube_set)
onDestroy(cube_destroy)
</script>

<!-- #HTML -->

<button
class="gravity-area"
style:--default-size="{prop_SIZE}px"
style:transform="translate({gravityarea_TRANSLATE_X ?? -prop_SIZE * 2}px, {gravityarea_TRANSLATE_Y ?? -prop_SIZE * 2}px)"
style:transition="transform {gravityarea_TRANSITION_DELAY}s ease-out"
bind:this={gravityarea}
on:mouseenter={gravityarea_mouseEnter}
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

@use '../../assets/scss/styles/position';
@use '../../assets/scss/styles/display';
@use '../../assets/scss/styles/size';

/* #CUBE */

.gravity-area
{
    --cube-size: calc(var(--default-size) * var(--cube-ratio));
    --gravity-area-size: calc(var(--cube-size) * 2);

    @extend %f-center;

    position: absolute;

    width: var(--gravity-area-size);
    height: var(--gravity-area-size);

    background-color: transparent;

    border: none;
    border-radius: 50%;
    outline: none;

    pointer-events: auto;

    &>div
    {
        transition: transform .5s;

        width: var(--cube-size);
        height: var(--cube-size);
    }
}

.cube
{
    &, .side { @extend %any; }

    transform-style: preserve-3d;
    transform-origin: center;

    transition: transform .35s ease-out;

    .side
    {
        @extend %f-center;

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