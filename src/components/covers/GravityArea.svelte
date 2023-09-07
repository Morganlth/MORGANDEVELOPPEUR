<!-- #MAP

-EVENT
    GRAVITYAREA
        CONTENT
            ~SLOT

    MASK

-->

<!-- #SCRIPT -->

<script>
// #EXPORTS

    // --PROPS
    export let
    prop_e$RESIZE = [],
    prop_e$ANIMATION = [],
    prop_FOCUS = false,
    prop_RATIO = null,
    prop_GRABBING = false,
    prop_ORBIT_RADIUS = null,
    prop_ROTATE = 0,
    prop_OFFSET = 0,
    prop_X = 0,
    prop_Y = 0,
    prop_RADIUS = 100,
    prop_FORCE = .5

    // --BIND
    export let gravityarea_TRANSLATE_Z = 0

// #IMPORTS

    // --JS
    import MATH from '../../assets/js/utils/math'
    import { wait_throttle } from '../../assets/js/utils/wait'
    import { update_floating } from '../../assets/js/utils/update'

    // --CONTEXT
    import { EVENT } from '../../App.svelte'

    // --SVELTE
    import { onMount, onDestroy } from 'svelte'
    import { writable } from 'svelte/store'

// #CONSTANTES

    // --ELEMENT-GRAVITYAREA
    const GRAVITYAREA_EVENTS =
    {
        mouseMove: wait_throttle(gravityarea_e$MouseMove, 50),
        resize: gravityarea_e$Resize
    }

    // --ELEMENT-SLOT
    const
    SLOT_$GRABBING = writable(false),
    SLOT_$ROTATION = writable({ rX: 0, rY: 0 })

// #VARIABLES

    // --ELEMENT-GRAVITYAREA
    let
    gravityarea,
    gravityarea_CHARGED = false,
    gravityarea_TRANSLATE_X = 0,
    gravityarea_TRANSLATE_Y = 0,
    gravityarea_TRANSITION_DELAY = 0,
    gravityarea_RATIO = 1,
    gravityarea_LAST = +new Date(),
    gravityarea_TIMEOUT

    // --ELEMENT-CONTENT
    let
    content_FORCE_X = 0,
    content_FORCE_Y = 0,
    content_FLOATING_UPDATE = update_floating()

    // --ELEMENT-SLOT
    let slot_GRABBING = false

// #REACTIVES

    // --ELEMENT-GRAVITYAREA
    $: prop_ORBIT_RADIUS ? gravityarea_update(prop_RATIO) : void 0
    $: gravityarea_CHARGED ? gravityarea_updateGrabbing($SLOT_$GRABBING && prop_GRABBING) : void 0

// #FUNCTIONS

    // --SET
    function gravityarea_set()
    {
        gravityarea_setVars()
        gravityarea_push(prop_e$RESIZE, gravityarea_e$Resize)

        content_start()

        gravityarea_CHARGED = true
    }

    function gravityarea_setVars()
    {
        gravityarea_TRANSLATE_X = prop_X * window.innerWidth
        gravityarea_TRANSLATE_Y = prop_Y * window.innerHeight

        gravityarea_RATIO = prop_RADIUS / Math.sqrt(prop_RADIUS * prop_RADIUS * 2)

        setTimeout(() => { gravityarea_TRANSITION_DELAY = 300 }, 50)
    }

    function gravityarea_setEvents() { EVENT.event_add(GRAVITYAREA_EVENTS) }

    // --DESTROY
    function gravityarea_destroy()
    {
        gravityarea_destroyEvents()
        gravityarea_splice(prop_e$RESIZE, gravityarea_e$Resize)
    
        content_stop()
    }

    function gravityarea_destroyEvents() { EVENT.event_remove(GRAVITYAREA_EVENTS) }

    // --UPDATES
    function gravityarea_update(ratio)
    {
        const ANGLE = ratio * MATH.PI.x2 + prop_OFFSET

        gravityarea_TRANSLATE_X = prop_ORBIT_RADIUS * Math.cos(ANGLE)
        gravityarea_TRANSLATE_Z = prop_ORBIT_RADIUS * Math.sin(ANGLE)
        
        SLOT_$ROTATION.set({ rX: null, rY: .025 })

    }

    function gravityarea_updateGrabbing(grabbing)
    {
        slot_GRABBING = grabbing

        grabbing ? gravityarea_setEvents() : gravityarea_destroyEvents()
    }

    function content_update(clientX, clientY)
    {
        const
        CLIENTRECT = gravityarea.getBoundingClientRect(),
        SIZE = CLIENTRECT.width / 2,
        [DIF_X, DIF_Y] = [clientX - (CLIENTRECT.left + SIZE), clientY - (CLIENTRECT.top + SIZE)],
        [ANGLE, RADIUS] = [Math.atan(DIF_Y / DIF_X), SIZE * gravityarea_RATIO]
    
        content_FORCE_X = DIF_X * (1 - Math.abs(DIF_X) / (Math.cos(ANGLE) * RADIUS)) * prop_FORCE
        content_FORCE_Y = DIF_Y * (1 - Math.abs(DIF_Y) / Math.abs(Math.sin(ANGLE) * RADIUS)) * prop_FORCE
    }

    // --EVENTS
    function gravityarea_e$MouseMove(clientX, clientY) // THROTTLE
    {
        const [X, Y] = [clientX - prop_RADIUS, clientY - prop_RADIUS]

        SLOT_$ROTATION.set({ rX: (X - gravityarea_TRANSLATE_X) * .005, rY: (Y - gravityarea_TRANSLATE_Y) * .005 })

        gravityarea_TRANSLATE_X = X
        gravityarea_TRANSLATE_Y = Y
    }

    async function gravityarea_eMouseMove({clientX, clientY})
    {
        const NOW = +new Date()

        clearTimeout(gravityarea_TIMEOUT)

        if (NOW > gravityarea_LAST + 50)
        {
            content_update(clientX, clientY)

            gravityarea_LAST = NOW
        }
        else gravityarea_TIMEOUT = setTimeout(() => content_update(clientX, clientY), 200)
    }

    async function gravityarea_eMouseEnter() { if (!slot_GRABBING) content_stop() }

    async function gravityarea_eMouseLeave()
    {
        [content_FORCE_X, content_FORCE_Y] = [0, 0]

        clearTimeout(gravityarea_TIMEOUT)

        gravityarea_TIMEOUT = setTimeout(() =>
        {
            content_FLOATING_UPDATE.setTime(.5)

            if (!slot_GRABBING) content_start()
        }, 200)
    }

    async function gravityarea_e$Resize() { gravityarea_setVars() }

    async function content_e$Animation() { content_FORCE_Y = content_FLOATING_UPDATE.update() }

    // --CONTROLS
    function content_start() { gravityarea_push(prop_e$ANIMATION, content_e$Animation) }

    function content_stop() { gravityarea_splice(prop_e$ANIMATION, content_e$Animation) }

    // --UTILS
    function gravityarea_push(array = [], value)
    {
        const INDEX = array.indexOf(value)

        if (INDEX === -1) array.push(value)
    }

    function gravityarea_splice(array = [], value)
    {
        const INDEX = array.indexOf(value)

        if (~INDEX) array.splice(INDEX, 1)
    }

// #CYCLES

onMount(gravityarea_set)
onDestroy(gravityarea_destroy)
</script>

<!-- #HTML -->

<button
class="gravityarea"
class:focus={prop_FOCUS}
style:--default-size="{prop_RADIUS}px"
style:transform="
perspective({prop_ORBIT_RADIUS ? '1200px' : 'none'})
translate3d(
{gravityarea_TRANSLATE_X}px,
{gravityarea_TRANSLATE_Y}px,
{gravityarea_TRANSLATE_Z}px)"
style:transition="transform {gravityarea_TRANSITION_DELAY}ms ease-out"
type="button"
bind:this={gravityarea}
on:mouseenter={gravityarea_eMouseEnter}
on:mousemove={gravityarea_eMouseMove}
on:mouseleave={gravityarea_eMouseLeave}
>
    <div
    class="content"
    style:transform="rotate({-prop_ROTATE}rad) translate3d({content_FORCE_X}px, {content_FORCE_Y}px, 0)"
    >
        <slot
        rotation={SLOT_$ROTATION}
        grabbing={SLOT_$GRABBING}
        />
    </div>
</button>

<div
class="mask"
class:grabbing={slot_GRABBING}
>
</div>

<!-- #STYLE -->

<style
lang="scss"
>
/* #USES */

@use '../../assets/scss/styles/position';
@use '../../assets/scss/styles/display';
@use '../../assets/scss/styles/size';
@use '../../assets/scss/styles/media';

/* #GRAVITYAREA */

.gravityarea, .mask { pointer-events: auto; }

.gravityarea
{
    --content-ratio: .3;
    --content-size: calc(var(--default-size) * var(--content-ratio, 1));

    @extend %f-center;

    position: absolute;

    transform-style: preserve-3d;

    width: calc(var(--content-size) * 2);
    height: calc(var(--content-size) * 2);

    background-color: transparent;

    border: none;
    border-radius: 50%;
    outline: none;

    &.focus { will-change: transform; }

    .content
    {
        transform-style: preserve-3d;

        width: var(--content-size);
        height: var(--content-size);

        transition: transform .6s;
    }

    @include media.min($ms3, $ms2) { --content-ratio: .35; }
    @include media.min($ms4, $ms3) { --content-ratio: .5; }
    @include media.min($ms5, $ms4) { --content-ratio: .75; }
    @include media.min($ms6, $ms4) { --content-ratio: 1; }
}

.mask
{
    @include position.placement(fixed, 0, auto, auto, 0);

    @extend %any;

    z-index: 2;

    transform: scale(0);

    &.grabbing
    {
        transform: scale(1);
    
        cursor: grabbing !important;
    }
}
</style>