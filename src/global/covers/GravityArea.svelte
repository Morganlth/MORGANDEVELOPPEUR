<!----------------------------------------------- #||--gravityarea--|| -->


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

<!-- svelte-ignore a11y-no-static-element-interactions a11y-no-noninteractive-tabindex -->
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
perspective({prop_3D ? prop_ORBIT_RADIUS * 2 + 'px' : 'none'})
translate3d(
{gravityarea_TRANSLATE_X}px,
{gravityarea_TRANSLATE_Y + gravityarea_FLOATING_Y}px,
{gravityarea_TRANSLATE_Z}px)"
style:cursor={prop_GRABBING ? 'grab' : 'pointer'}
style:transition="transform {gravityarea_TRANSITION_DELAY}ms ease-out"
type="button"
title={prop_TITLE}
tabindex={prop_FOCUSABLE ? 0 : -1}
data-tag={prop_TITLE.toLowerCase()}
bind:this={gravityarea}
on:click={gravityarea_eClick}
on:mouseenter={gravityarea_eMouseEnter}
on:mousemove={gravityarea_eMouseMove}
on:mouseleave={gravityarea_eMouseLeave}
on:mousedown={gravityarea_eMouseDown}
on:touchstart={gravityarea_eTouchStart}
on:touchend={gravityarea_eTouchEnd}
>
    <slot
    hide={slot_HIDE}
    grabbing={slot_GRABBING}
    />
</div>

<div
class="shield"
class:grabbing={slot_GRABBING}
>
</div>


<!-- #|-SCRIPT-| -->

<script>

// #\-IMPORTS-\

    // --DATA

    // --SVELTE
    import { onMount, onDestroy, createEventDispatcher } from 'svelte'

    // --LIB
    import MATH                                    from '$lib/math'
    import { wait_throttle, wait_getDelay }        from '$lib/wait'
    import { animation, animation_staticFloating } from '$lib/animation'

    // --CONTEXTS
    import { APP, EVENT } from '../../App.svelte'

//=======@COMPONENTS|

    // --*


// #\-EXPORTS-\

    // --PROPS
    export let
    prop_$RESIZE    = {},
    prop_$ANIMATION = {}
    ,
    prop_FOCUS     = false,
    prop_FOCUSABLE = true,
    prop_3D        = false,
    prop_GRABBING  = false
    ,
    prop_RATIO = null
    ,
    prop_TITLE = ''
    ,
    prop_ORBIT_RADIUS = 0,
    prop_Z            = 0,
    prop_ROTATE_Y     = 0,
    prop_ROTATE_Z     = 0,
    prop_OFFSET       = 0,
    prop_X            = 0,
    prop_Y            = 0,
    prop_RADIUS       = 100

    // --BINDING
    export let gravityarea_TRANSLATE_Z = 0


// #\-CONSTANTES-\

    // --SVELTE
    const SVELTE_DISPATCH = createEventDispatcher()

    // --CONTEXTS

    // --OUTSIDE

    // --THIS
    const
    GRAVITYAREA_PERSPECTIVE = 1200,
    GRAVITYAREA_DELAY       = wait_getDelay(3),  // +- 50ms
    GRAVITYAREA_DELAY_2     = wait_getDelay(18), // +- 300ms
    GRAVITYAREA_DELAY_3     = wait_getDelay(24)  // +- 400ms
    ,
    GRAVITYAREA_EVENTS   = { mouseUp:   gravityarea_e$MouseUp },
    GRAVITYAREA_EVENTS_2 = { mouseMove: wait_throttle(gravityarea_e$MouseMove, 3) }, // +- 50ms
    GRAVITYAREA_EVENTS_3 = { touchMove: wait_throttle(gravityarea_e$TouchMove, 3) }  // +- 50ms

    // --INSIDE


// #\-VARIABLES-\

    // --CONTEXTS

    // --OUTSIDE

    // --THIS
    let
    gravityarea
    ,
    gravityarea_ANIMATE = false
    ,
    gravityarea_TRANSLATE_X = 0,
    gravityarea_TRANSLATE_Y = 0
    ,
    gravityarea_TRANSITION_DELAY = 0
    ,
    gravityarea_FLOATING_Y = 0
    ,
    gravityarea_RADIUS = prop_RADIUS,
    gravityarea_RATIO  = prop_RADIUS / Math.sqrt(prop_RADIUS ** 2 * 2)
    ,
    gravityarea_T = 0
    ,
    gravityarea_LAST = +new Date()
    ,
    gravityarea_TIMEOUT
    ,
    gravityarea_getFloating
    ,
    gravityarea_cancel = () => {}

    // --INSIDE
    let
    slot_HIDE     = true,
    slot_GRABBING = false
    ,
    slot_FORCE_X = 0,
    slot_FORCE_Y = 0
    ,
    slot_ROTATE_Y = prop_ROTATE_Y,
    slot_ROTATE_Z = prop_ROTATE_Z
    ,
    slot_update = prop_3D ? slot_update3d : slot_update2d


// #\-REATIVES-\

    // --CONTEXTS

    // --OUTSIDE

    // --THIS
    $: gravityarea_update(prop_FOCUS)
    $: gravityarea_updateOrbit(prop_RATIO)

    // --INSIDE


// #\-FUNCTIONS-\

//=======@LIFE|

    // --SVELTE
    onMount(gravityarea_set), onDestroy(gravityarea_destroy)

    // --SET
    function gravityarea_set()
    {
        gravityarea_setVars()

        gravityarea_start()
    
        prop_$RESIZE.push(gravityarea_e$Resize)
    }

    function gravityarea_setVars()
    {
        gravityarea_RADIUS = gravityarea.offsetWidth / 2
    
        if (prop_FOCUS && !prop_3D) [gravityarea_TRANSLATE_X, gravityarea_TRANSLATE_Y] = gravityarea_get2d()

        if (!gravityarea_TRANSITION_DELAY) setTimeout(() => { gravityarea_TRANSITION_DELAY = 400 }, GRAVITYAREA_DELAY)
    }

    function gravityarea_setEvents()  { EVENT.event_add(GRAVITYAREA_EVENTS) }

    function gravityarea_setEvents2() { EVENT.event_add(GRAVITYAREA_EVENTS_2) }

    function gravityarea_setEvents3() { EVENT.event_add(GRAVITYAREA_EVENTS_3) }

    // --GET
    function gravityarea_get2d()
    {
        return [
            prop_X * APP.app_WIDTH - gravityarea_RADIUS / 2, // x
            prop_Y * APP.app_HEIGHT                          // y
        ]
    }

    function gravityarea_get3d()
    {
        const
        ANGLE = (prop_RATIO - prop_OFFSET) * MATH.PIx2,
        H     = Math.sin(ANGLE) * prop_ORBIT_RADIUS

        return [
            Math.cos(prop_ROTATE_Z) * H,        // x
            Math.sin(prop_ROTATE_Z) * H,        // y
            Math.cos(ANGLE) * prop_ORBIT_RADIUS // z
        ]
    }

    function slot_get3d()
    {
        // size / (perspective - z) * perspective * 2   ==detail==>   tan(ANGLE = atan(size / (D = perspective - z))) * perspective
    
        const D = GRAVITYAREA_PERSPECTIVE - gravityarea_TRANSLATE_Z
    
        return [
            gravityarea_TRANSLATE_X / D * GRAVITYAREA_PERSPECTIVE + APP.app_WIDTH  * .5, // x
            gravityarea_TRANSLATE_Y / D * GRAVITYAREA_PERSPECTIVE + APP.app_HEIGHT * .5, // y
            gravityarea_RADIUS      / D * GRAVITYAREA_PERSPECTIVE                        // radius
        ]
    }

    // --UPDATES
    function gravityarea_update(focus)
    {
        gravityarea_cancel()
    
        gravityarea_a(focus)
    }

    function gravityarea_updateOrbit()
    {
        if (prop_3D && prop_FOCUS)
        {
            [gravityarea_TRANSLATE_X, gravityarea_TRANSLATE_Y, gravityarea_TRANSLATE_Z] = gravityarea_get3d()
        
            slot_updateRotate(.025)
        }
    }

    function gravityarea_updatetranslate(x, y)
    {
        gravityarea_TRANSLATE_X = x
        gravityarea_TRANSLATE_Y = y
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
        DIF_X  = clientX - x,
        DIF_Y  = clientY - y,
        ANGLE  = Math.atan(DIF_Y / DIF_X),
        RADIUS = r * gravityarea_RATIO

        if (!ANGLE) return
    
        slot_FORCE_X = DIF_X * .3 * (1 - Math.abs(DIF_X) / (Math.cos(ANGLE) * RADIUS))
        slot_FORCE_Y = DIF_Y * .3 * (1 - Math.abs(DIF_Y) / Math.abs(Math.sin(ANGLE) * RADIUS))
    }

    function slot_updateRotate(rY, rZ)
    {
        slot_ROTATE_Y += rY ?? 0
        slot_ROTATE_Z += rZ ?? 0
    }

    // --DESTROY
    function gravityarea_destroy()
    {
        gravityarea_cancel()

        gravityarea_destroyTimeout()
    
        gravityarea_destroyEvents()
        gravityarea_destroyEvents2()
        gravityarea_destroyEvents3()

        gravityarea_stop()

        prop_$RESIZE.splice(gravityarea_e$Resize)
    }

    function gravityarea_destroyTimeout() { clearTimeout(gravityarea_TIMEOUT) }

    function gravityarea_destroyEvents()  { EVENT.event_remove(GRAVITYAREA_EVENTS) }

    function gravityarea_destroyEvents2() { EVENT.event_remove(GRAVITYAREA_EVENTS_2) }

    function gravityarea_destroyEvents3() { EVENT.event_remove(GRAVITYAREA_EVENTS_3) }


//=======@COMMANDS|

    // --*


//=======@EVENTS|

    // --*
    async function gravityarea_e$MouseMove(clientX, clientY) { gravityarea_move(clientX, clientY) }

    function gravityarea_e$MouseUp()
    {
        slot_GRABBING = false
    
        gravityarea_destroyEvents()
        gravityarea_destroyEvents2()
    }

    async function gravityarea_e$TouchMove(clientX, clientY) { gravityarea_move(clientX, clientY) }

    async function gravityarea_e$Resize() { gravityarea_setVars() }

    function gravityarea_eClick() { if (+new Date() - gravityarea_LAST < GRAVITYAREA_DELAY_2) SVELTE_DISPATCH('click') }

    function gravityarea_eMouseEnter()
    {
        if (!slot_GRABBING)
        {
            gravityarea_stop()

            gravityarea_FLOATING_Y = 0
        }
    }

    const gravityarea_eMouseMove = wait_throttle(async function gravityarea_eMouseMove({clientX, clientY})
    {
        if (!gravityarea_ANIMATE) slot_update(clientX, clientY)
    },
    12) // +- 200 ms

    function gravityarea_eMouseLeave()
    {
        slot_FORCE_X = (slot_FORCE_Y = 0)

        gravityarea_destroyTimeout()

        if (!slot_GRABBING) gravityarea_start(0)
    }

    function gravityarea_eMouseDown() // no async
    {
        gravityarea_LAST = +new Date()

        gravityarea_setEvents()

        if (prop_GRABBING)
        {
            slot_GRABBING = true

            gravityarea_setEvents2()
        }
    }

    function gravityarea_eTouchStart()
    {
        if (prop_GRABBING)
        {
            slot_GRABBING = true

            gravityarea_setEvents3()
        }
    }

    function gravityarea_eTouchEnd()
    {
        slot_GRABBING = false

        gravityarea_destroyEvents3()
    }


//=======@TRANSITIONS|

    // --*


//=======@ANIMATIONS|

    // --*
    async function gravityarea_a(invert = false)
    {
        gravityarea_ANIMATE = true

        let {cancel, promise} = animation(t =>
        {
            gravityarea_T = t
    
            const [X, Y, Z] = prop_3D ? gravityarea_get3d() : gravityarea_get2d()
    
            gravityarea_TRANSLATE_X = X + APP.app_WIDTH * t
            gravityarea_TRANSLATE_Y = Y - APP.app_HEIGHT * t
            gravityarea_TRANSLATE_Z = prop_3D ? Z + GRAVITYAREA_PERSPECTIVE * t : 0
        },
        GRAVITYAREA_DELAY_3, gravityarea_T, invert)

        gravityarea_cancel = cancel
        
        try
        {
            if (invert) slot_HIDE = false
        
            await promise
            
            if (!invert) slot_HIDE = true

            gravityarea_ANIMATE = false
        }
        catch { gravityarea_ANIMATE = false }
    }

    function gravityarea_a$Floating() { gravityarea_FLOATING_Y = gravityarea_getFloating() }


//=======@UTILS|

    // --*
    function gravityarea_start(t)
    {
        gravityarea_getFloating = animation_staticFloating(t)
    
        prop_$ANIMATION.push(gravityarea_a$Floating)
    }

    function gravityarea_stop() { prop_$ANIMATION.splice(gravityarea_a$Floating) }

    function gravityarea_move(x, y)
    {
        const
        X = x - gravityarea_RADIUS,
        Y = y - gravityarea_RADIUS

        slot_updateRotate((Y - gravityarea_TRANSLATE_Y) * .005, (X - gravityarea_TRANSLATE_X) * .005)

        gravityarea_updatetranslate(X, Y)
    }


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
    @use '../../assets/scss/styles/media';


/* #\-VARIABLES-\ */

    /* --* */
    $size: calc(var(--slot-size, '100px') * 2);


/* #\-GLOBAL-\ */

    /* --* */


/* #\-THIS-\ */

.gravityarea, .shield { pointer-events: auto; }

.gravityarea
{
    --slot-ratio: .4;
    --slot-size:  calc(var(--slot-default-size, '100px') * var(--slot-ratio, 1));

    @extend %f-center;

    contain: layout size;
    isolation: isolate;

    position: absolute;

    transform-style: preserve-3d;

    width:  $size;
    height: $size;

    border-radius: 50%;

    &.focus { will-change: transform; }

    @include media.min($ms4, $ms3) { --slot-ratio: .5; }
    @include media.min($ms5, $ms4) { --slot-ratio: .75; }
    @include media.min($ms6, $ms4) { --slot-ratio: 1; }
}

.shield
{
    @include utils.fixed(2);

    transform: scale(0);

    &.grabbing
    {
        transform: scale(1);
    
        cursor: grabbing !important;
    }
}


</style>