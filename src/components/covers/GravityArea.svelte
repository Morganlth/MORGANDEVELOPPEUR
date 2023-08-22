<!-- #MAP

    GRAVITYAREA
        CONTENT
            SLOT

    MASK

-->

<!-- #SCRIPT -->

<script>
// #EXPORTS

    // --PROPS
    export let
    prop_GRABBING,
    prop_ANIMATION_UPDATE = [],
    prop_X,
    prop_Y,
    prop_SIZE

    // BIND gravityarea_e$Resize

// #IMPORTS

    // --JS
    import { wait_throttle } from '../../assets/js/utils/wait'
    import { update_floating } from '../../assets/js/utils/update'

    // --CONTEXT
    import { EVENT } from '../../App.svelte'

    // --SVELTE
    import { onMount, onDestroy } from 'svelte'
    import { writable } from 'svelte/store'

// #CONSTANTES

    // --ELEMENT-GRAVITYAREA
    const GRAVITYAREA_EVENTS = { mouseMove: wait_throttle(gravityarea_e$MouseMove, 50) }

    // --ELEMENT-SLOT
    const
    SLOT_$GRABBING = writable(false),
    SLOT_$ROTATION = writable({ rX: 0, rY: 0 })

// #VARIABLES

    // --ELEMENT-GRAVITYAREA
    let
    gravityarea,
    gravityarea_CHARGED = false,
    gravityarea_TRANSLATE_X,
    gravityarea_TRANSLATE_Y,
    gravityarea_TRANSITION_DELAY = 0,
    gravityarea_RADIUS,
    gravityarea_LAST = +new Date(),
    gravityarea_TIMEOUT

    // --ELEMENT-CONTENT
    let
    content_FORCE_X = 0,
    content_FORCE_Y = 0,
    content_FLOATING_UPDATE = update_floating()

    // --ELEMENT-SLOT
    let slot_GRABBING = false

// #REACTIVE

    // --ELEMENT-GRAVITYAREA
    $: gravityarea_CHARGED ? gravityarea_updateGrabbing($SLOT_$GRABBING && prop_GRABBING) : void 0

// #FUNCTIONS

    // --SET
    function gravityarea_set()
    {
        gravityarea_setVars()

        content_start()

        gravityarea_CHARGED = true
    }

    function gravityarea_setVars()
    {
        gravityarea_TRANSLATE_X = prop_X * window.innerWidth
        gravityarea_TRANSLATE_Y = prop_Y * window.innerHeight
        gravityarea_RADIUS = gravityarea.offsetWidth / 2

        setTimeout(() => { gravityarea_TRANSITION_DELAY = 300 }, 50)
    }

    function gravityarea_setEvents() { EVENT.event_add(GRAVITYAREA_EVENTS) }

    // --DESTROY
    function gravityarea_destroy()
    {
        gravityarea_destroyEvents()
    
        content_stop()
    }

    function gravityarea_destroyEvents() { EVENT.event_remove(GRAVITYAREA_EVENTS) }

    // --UPDATES
    function gravityarea_updateContent(clientX, clientY)
    {
        const
        CLIENTRECT = gravityarea.getBoundingClientRect(),
        SIZE = CLIENTRECT.width / 2,
        [DIF_X, DIF_Y] = [clientX - (CLIENTRECT.left + SIZE), clientY - (CLIENTRECT.top + SIZE)],
        ANGLE = Math.atan(DIF_Y / DIF_X)

        content_FORCE_X = DIF_X * (1 - Math.abs(DIF_X) / (Math.cos(ANGLE) * gravityarea_RADIUS)) * .5
        content_FORCE_Y = DIF_Y * (1 - Math.abs(DIF_Y) / Math.abs(Math.sin(ANGLE) * gravityarea_RADIUS)) * .5
    }

    function gravityarea_updateGrabbing(grabbing)
    {
        slot_GRABBING = grabbing

        grabbing ? gravityarea_setEvents() : gravityarea_destroyEvents()
    }

    // --EVENTS
    function gravityarea_e$MouseMove(clientX, clientY) // throttle
    {
        const [X, Y] = [clientX - gravityarea_RADIUS, clientY - gravityarea_RADIUS]

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
            gravityarea_updateContent(clientX, clientY)

            gravityarea_LAST = NOW
        }
        else gravityarea_TIMEOUT = setTimeout(() => gravityarea_updateContent(clientX, clientY), 200)
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

    export async function gravityarea_e$Resize() { gravityarea_setVars() }

    async function content_e$Animation() { content_FORCE_Y = content_FLOATING_UPDATE.update() }

    // --CONTROLS
    function content_start()
    {
        const INDEX = prop_ANIMATION_UPDATE.indexOf(content_e$Animation)

        if (INDEX === -1) prop_ANIMATION_UPDATE.push(content_e$Animation)
    }

    function content_stop()
    {
        const INDEX = prop_ANIMATION_UPDATE.indexOf(content_e$Animation)

        if (~INDEX) prop_ANIMATION_UPDATE.splice(INDEX, 1)
    }

// #CYCLES

onMount(gravityarea_set)
onDestroy(gravityarea_destroy)
</script>

<!-- #HTML -->

<button
class="gravityarea"
style:--default-size="{prop_SIZE}px"
style:transform="translate({gravityarea_TRANSLATE_X ?? -prop_SIZE * 2}px, {gravityarea_TRANSLATE_Y ?? -prop_SIZE * 2}px)"
style:transition="transform {gravityarea_TRANSITION_DELAY}ms ease-out"
type="button"
bind:this={gravityarea}
on:mouseenter={gravityarea_eMouseEnter}
on:mousemove={gravityarea_eMouseMove}
on:mouseleave={gravityarea_eMouseLeave}
>
    <div
    class="content"
    style:transform="translate({content_FORCE_X}px, {content_FORCE_Y}px)"
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

/* #GRAVITYAREA */

.gravityarea, .mask { pointer-events: auto; }

.gravityarea
{
    --content-size: calc(var(--default-size) * var(--content-ratio, 1));

    @extend %f-center;

    position: absolute;

    width: calc(var(--content-size) * 2);
    height: calc(var(--content-size) * 2);

    background-color: transparent;

    border: none;
    border-radius: 50%;
    outline: none;

    .content
    {
        transition: transform .5s;

        width: var(--content-size);
        height: var(--content-size);
    }
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