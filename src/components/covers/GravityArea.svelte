<!-- #MAP

-APP
-EVENT
    GRAVITYAREA
        ~SLOT

    SHIELD

-->

<!-- #SCRIPT -->

<script>
// #EXPORTS

    // --PROPS
    export let
    prop_$RESIZE = {},
    prop_$ANIMATION = {},

    prop_FOCUS = false,
    prop_FOCUSABLE = true,
    prop_3D = false,
    prop_GRABBING = false,

    prop_RATIO = null,

    prop_TITLE = '',

    prop_ORBIT_RADIUS = 0,
    prop_Z = 0,
    prop_ROTATE_Y = 0,
    prop_ROTATE_Z = 0,
    prop_OFFSET = 0,
    prop_X = 0,
    prop_Y = 0,
    prop_RADIUS = 100

    // --BIND
    export let gravityarea_TRANSLATE_Z = 0

// #IMPORTS

    // --JS
    import MATH from '../../assets/js/utils/math'
    import { wait_throttle } from '../../assets/js/utils/wait'
    import { animation } from '../../assets/js/utils/animation'
    import { update_floating } from '../../assets/js/utils/update'

    // --CONTEXTS
    import { APP, EVENT } from '../../App.svelte'

    // --SVELTE
    import { onMount, onDestroy, createEventDispatcher } from 'svelte'

// #CONSTANTES

    // --ELEMENT-GRAVITYAREA
    const
    GRAVITYAREA_PERSPECTIVE = 1200,

    GRAVITYAREA_EVENTS = { mouseMove: wait_throttle(gravityarea_e$MouseMove, 50) },
    GRAVITYAREA_EVENTS_2 = { mouseUp: gravityarea_e$MouseUp }

// #VARIABLES

     // --SVELTE
     const SVELTE_DISPATCH = createEventDispatcher()

    // --ELEMENT-GRAVITYAREA
    let
    gravityarea,

    gravityarea_TRANSLATE_X = 0,
    gravityarea_TRANSLATE_Y = 0,
    gravityarea_TRANSITION_DELAY = 0,

    gravityarea_ANIMATION_Y = 0,

    gravityarea_RADIUS = prop_RADIUS,
    gravityarea_RATIO = prop_RADIUS / Math.sqrt(prop_RADIUS ** 2 * 2),

    gravityarea_FLOATING = update_floating(),

    gravityarea_T = 0,

    gravityarea_LAST = +new Date(),
    gravityarea_LAST_2 = +new Date(),
    gravityarea_TIMEOUT,

    gravityarea_cancel = () => {}

    // --ELEMENT-SLOT
    let
    slot_GRABBING = false,

    slot_FORCE_X = 0,
    slot_FORCE_Y = 0,

    slot_ROTATE_Y = prop_ROTATE_Y,
    slot_ROTATE_Z = prop_ROTATE_Z,

    slot_update = prop_3D ? slot_update3d : slot_update2d

// #REACTIVES

    // --ELEMENT-GRAVITYAREA
    $: gravityarea_update(prop_FOCUS)
    $: gravityarea_updateEvent(slot_GRABBING)
    $: gravityarea_updateOrbit(prop_RATIO)

// #FUNCTIONS

    // --SET
    function gravityarea_set()
    {
        gravityarea_setVars()
    
        prop_$RESIZE.push(gravityarea_e$Resize)

        gravityarea_start()
    }

    function gravityarea_setVars()
    {
        gravityarea_RADIUS = gravityarea.offsetWidth / 2
    
        if (prop_FOCUS && !prop_3D) [gravityarea_TRANSLATE_X, gravityarea_TRANSLATE_Y] = gravityarea_get2d()

        if (!gravityarea_TRANSITION_DELAY) setTimeout(() => { gravityarea_TRANSITION_DELAY = 400 }, 50.01)
    }

    function gravityarea_setEvents() { EVENT.event_add(GRAVITYAREA_EVENTS) }

    function gravityarea_setEvents2() { EVENT.event_add(GRAVITYAREA_EVENTS_2) }

    // --DESTROY
    function gravityarea_destroy()
    {
        gravityarea_cancel()
        gravityarea_clear()
    
        gravityarea_destroyEvents()
        gravityarea_destroyEvents2()

        prop_$RESIZE.splice(gravityarea_e$Resize)
    
        gravityarea_stop()
    }

    function gravityarea_destroyEvents() { EVENT.event_remove(GRAVITYAREA_EVENTS) }

    function gravityarea_destroyEvents2() { EVENT.event_remove(GRAVITYAREA_EVENTS_2) }

    // --GET
    function gravityarea_get2d()
    {
        return [
            prop_X * APP.app_WIDTH - gravityarea_RADIUS / 2,    // x
            prop_Y * APP.app_HEIGHT                             // y
        ]
    }

    function gravityarea_get3d()
    {
        const
        ANGLE = (prop_RATIO - prop_OFFSET) * MATH.PI.x2,
        H = Math.sin(ANGLE) * prop_ORBIT_RADIUS

        return [
            Math.cos(prop_ROTATE_Z) * H,              // x
            Math.sin(prop_ROTATE_Z) * H,              // y
            Math.cos(ANGLE) * prop_ORBIT_RADIUS     // z
        ]
    }

    function slot_get3d()
    {
        // size / (perspective - z) * perspective * 2   ==detail==>   tan(ANGLE = atan(size / (D = perspective - z))) * perspective
    
        const D = GRAVITYAREA_PERSPECTIVE - gravityarea_TRANSLATE_Z
    
        return [
            gravityarea_TRANSLATE_X / D * GRAVITYAREA_PERSPECTIVE + APP.app_WIDTH * .5,   // x
            gravityarea_TRANSLATE_Y / D * GRAVITYAREA_PERSPECTIVE + APP.app_HEIGHT * .5,  // y
            gravityarea_RADIUS / D * GRAVITYAREA_PERSPECTIVE                              // radius
        ]
    }

    // --UPDATES
    function gravityarea_update(focus)
    {
        gravityarea_cancel()
    
        gravityarea_a(focus)
    }

    function gravityarea_updateEvent(grabbing) { if (prop_GRABBING) grabbing ? gravityarea_setEvents() : gravityarea_destroyEvents() }

    function gravityarea_updateOrbit()
    {
        if (prop_3D && prop_FOCUS)
        {
            [gravityarea_TRANSLATE_X, gravityarea_TRANSLATE_Y, gravityarea_TRANSLATE_Z] = gravityarea_get3d()
        
            slot_updateRotate(.025)
        }
    }

    function slot_update2d(clientX, clientY)
    {
        const
        X = gravityarea_TRANSLATE_X + gravityarea_RADIUS,
        Y = gravityarea_TRANSLATE_Y + gravityarea_RADIUS
    
        slot_updateForces(clientX, clientY, X, Y, gravityarea_RADIUS)
    }

    function slot_update3d(clientX, clientY)
    {
        const [X, Y, RADIUS] = slot_get3d()

        slot_updateForces(clientX, clientY, X, Y, RADIUS)
    }

    function slot_updateForces(clientX, clientY, x, y, r)
    {
        const
        [DIF_X, DIF_Y] = [clientX - x, clientY - y],
        [ANGLE, RADIUS] = [Math.atan(DIF_Y / DIF_X), r * gravityarea_RATIO]

        if (!ANGLE) return
    
        slot_FORCE_X = DIF_X * .3 * (1 - Math.abs(DIF_X) / (Math.cos(ANGLE) * RADIUS))
        slot_FORCE_Y = DIF_Y * .3 * (1 - Math.abs(DIF_Y) / Math.abs(Math.sin(ANGLE) * RADIUS))
    }

    function slot_updateRotate(rY, rZ)
    {
        slot_ROTATE_Y += rY ?? 0
        slot_ROTATE_Z += rZ ?? 0
    }

    // --CLEAR
    function gravityarea_clear() { clearTimeout(gravityarea_TIMEOUT) }

    // --EVENTS
    function gravityarea_e$MouseMove(clientX, clientY) // THROTTLE
    {
        const [X, Y] = [clientX - gravityarea_RADIUS, clientY - gravityarea_RADIUS]

        slot_updateRotate((Y - gravityarea_TRANSLATE_Y) * .005, (X - gravityarea_TRANSLATE_X) * .005)

        gravityarea_TRANSLATE_X = X
        gravityarea_TRANSLATE_Y = Y
    }

    async function gravityarea_eMouseMove({clientX, clientY})
    {
        const NOW = +new Date()

        gravityarea_clear()

        if (NOW > gravityarea_LAST + 50.01)
        {
            slot_update(clientX, clientY)

            gravityarea_LAST = NOW
        }
        else gravityarea_TIMEOUT = setTimeout(() => slot_update(clientX, clientY), 200.04)
    }

    async function gravityarea_eMouseEnter() { if (!slot_GRABBING) gravityarea_stop() }

    async function gravityarea_eMouseLeave()
    {
        [slot_FORCE_X, slot_FORCE_Y] = [0, 0]

        gravityarea_clear()

        gravityarea_TIMEOUT = setTimeout(() =>
        {
            gravityarea_FLOATING.setTime(.5)

            if (!slot_GRABBING) gravityarea_start()
        }, 200)
    }

    function gravityarea_eMouseDown() // no async
    {
        slot_GRABBING = true

        gravityarea_setEvents2()

        gravityarea_LAST_2 = +new Date()
    }

    function gravityarea_e$MouseUp() // no async
    {
        if (+new Date() - gravityarea_LAST_2 < 200.04) SVELTE_DISPATCH('click')

        slot_GRABBING = false
    
        gravityarea_destroyEvents2()
    }

    async function gravityarea_e$Resize() { gravityarea_setVars() }

    async function gravityarea_e$Animation() { gravityarea_ANIMATION_Y = gravityarea_FLOATING.update() }

    // --CONTROLS
    function gravityarea_start() { prop_$ANIMATION.push(gravityarea_e$Animation) }

    function gravityarea_stop() { prop_$ANIMATION.splice(gravityarea_e$Animation) }

    // --ANIMATION
    function gravityarea_a(invert = false)
    {
        gravityarea_cancel = animation((t) =>
        {
            const [X, Y, Z] = prop_3D ? gravityarea_get3d() : gravityarea_get2d()

            gravityarea_T = t
    
            gravityarea_TRANSLATE_X = X + APP.app_WIDTH * t
            gravityarea_TRANSLATE_Y = Y - APP.app_HEIGHT * t
            gravityarea_TRANSLATE_Z = prop_3D ? Z + GRAVITYAREA_PERSPECTIVE * t : 0
        },
        400, gravityarea_T, invert).cancel
    }

// #CYCLES

onMount(gravityarea_set)
onDestroy(gravityarea_destroy)
</script>

<!-- #HTML -->

<!-- svelte-ignore a11y-no-static-element-interactions -->
<!-- svelte-ignore a11y-no-noninteractive-tabindex -->
<div
class="gravityarea"
class:focus={prop_FOCUS}
style:--slot-default-size="{prop_RADIUS}px"
style:--slot-f-x="{slot_FORCE_X}px"
style:--slot-f-y="{slot_FORCE_Y}px"
style:--slot-r-y="{slot_ROTATE_Y}rad"
style:--slot-r-z="{slot_ROTATE_Z}rad"
style:z-index={prop_Z}
style:transform="
perspective({prop_3D ? GRAVITYAREA_PERSPECTIVE + 'px' : 'none'})
translate3d(
{gravityarea_TRANSLATE_X}px,
{gravityarea_TRANSLATE_Y + gravityarea_ANIMATION_Y}px,
{gravityarea_TRANSLATE_Z}px)"
style:transition="transform {gravityarea_TRANSITION_DELAY}ms ease-out"
type="button"
title={prop_TITLE}
tabindex={prop_FOCUSABLE ? 0 : -1}
data-tag={prop_TITLE.toLowerCase()}
bind:this={gravityarea}
on:mouseenter={gravityarea_eMouseEnter}
on:mousemove={gravityarea_eMouseMove}
on:mousedown={gravityarea_eMouseDown}
on:mouseleave={gravityarea_eMouseLeave}
>
    <slot
    grabbing={slot_GRABBING}
    />
</div>

<div
class="shield"
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

.gravityarea, .shield { pointer-events: auto; }

.gravityarea
{
    --slot-ratio: .4;
    --slot-size: calc(var(--slot-default-size, '100px') * var(--slot-ratio, 1));

    $size: var(--slot-size, '100px');

    @extend %f-center;

    contain: layout size;
    isolation: isolate;

    position: absolute;

    transform-style: preserve-3d;

    width: calc($size * 2);
    height: calc($size * 2);

    border-radius: 50%;

    cursor: grab;

    &.focus { will-change: transform; }

    @include media.min($ms4, $ms3) { --slot-ratio: .5; }
    @include media.min($ms5, $ms4) { --slot-ratio: .75; }
    @include media.min($ms6, $ms4) { --slot-ratio: 1; }
}

.shield
{
    @include position.placement(fixed, 0, 0, 0, 0);

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