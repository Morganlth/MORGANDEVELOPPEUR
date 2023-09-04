<!-- #MAP

-EVENT
    GROUP
        ~SLOT

-->

<!-- #SCRIPT -->

<script>
// #EXPORTS

    // --PROP
    export let prop_STYLE = ''

    // BIND group_start
    // BIND group_stop

// #IMPORTS

    // --JS
    import { wait_throttle } from '../../assets/js/utils/wait'

    // --CONTEXT
    import { EVENT } from '../../App.svelte'

    // --SVELTE
    import { onMount, onDestroy } from 'svelte'

// #CONSTANTES

    // --ELEMENT-GROUP
    const
    GROUP_EVENT_RESIZE = { resize: group_e$Resize },
    GROUP_EVENT_ANIMATION = { animation: wait_throttle(group_e$Animation, 100) }

    // --ELEMENT-SLOT
    const
    SLOT_e$RESIZE = [],
    SLOT_e$ANIMATION = []

// #FUNCTIONS

    // --SET
    function group_set() { group_setEventResize() }

    function group_setEventResize() { EVENT.event_add(GROUP_EVENT_RESIZE) }

    function group_setEventAnimation() { EVENT.event_add(GROUP_EVENT_ANIMATION) }

    // --DESTROY
    function group_destroy()
    {
        group_destroyEventResize()
        group_destroyEventAnimation()
    }

    function group_destroyEventResize() { EVENT.event_remove(GROUP_EVENT_RESIZE) }

    function group_destroyEventAnimation() { EVENT.event_remove(GROUP_EVENT_ANIMATION) }

    // --EVENTS
    async function group_e$Resize() { group_run(SLOT_e$RESIZE) }

    async function group_e$Animation() { group_run(SLOT_e$ANIMATION) }

    // --CONTROLS
    export function group_start() { group_setEventAnimation() }

    export function group_stop() { group_destroyEventAnimation() }

    // --UTIL
    function group_run(array = []) { for (const FUNC of array) FUNC() }

// #CYCLES

onMount(group_set)
onDestroy(group_destroy)
</script>

<!-- #HTML -->

<div
class="group"
style={prop_STYLE}
>
    <slot
    resize={SLOT_e$RESIZE}
    animation={SLOT_e$ANIMATION}
    />
</div>

<!-- #STYLE -->

<style
lang="scss"
>
/* #USE */

@use '../../assets/scss/styles/size';

/* #GROUP */

.group
{
    @extend %any;

    pointer-events: none;
}
</style>