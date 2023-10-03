<!-- #MAP

-EVENT
    GROUP
        ~SLOT

-->

<!-- #SCRIPT -->

<script>
// #EXPORTS

    // --PROPS
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
    GROUP_EVENTS = { resize: group_e$Resize },
    GROUP_EVENTS_2 = { animation: wait_throttle(group_e$Animation, 100) },
    GROUP_RESIZE = [],
    GROUP_ANIMATION = []

    // --ELEMENT-SLOT
    const
    SLOT_$RESIZE = { push: group_push.bind(GROUP_RESIZE), splice: group_splice.bind(GROUP_RESIZE) },
    SLOT_$ANIMATION = { push: group_push.bind(GROUP_ANIMATION), splice: group_splice.bind(GROUP_ANIMATION) }

// #FUNCTIONS

    // --SET
    function group_set() { group_setEvents() }

    function group_setEvents() { EVENT.event_add(GROUP_EVENTS) }

    function group_setEvents2() { EVENT.event_add(GROUP_EVENTS_2) }

    // --DESTROY
    function group_destroy()
    {
        group_destroyEvents()
        group_destroyEvents2()
    }

    function group_destroyEvents() { EVENT.event_remove(GROUP_EVENTS) }

    function group_destroyEvents2() { EVENT.event_remove(GROUP_EVENTS_2) }

    // --EVENTS
    async function group_e$Resize() { group_run(GROUP_RESIZE) }

    async function group_e$Animation() { group_run(GROUP_ANIMATION) }

    // --CONTROLS
    export function group_start() { group_setEvents2() }

    export function group_stop() { group_destroyEvents2() }

    // --UTILS
    function group_push(call)
    {
        const INDEX = this.indexOf(call)

        if (INDEX === -1) this.push(call)
    }

    function group_splice(call)
    {
        const INDEX = this.indexOf(call)

        if (~INDEX) this.splice(INDEX, 1)
    }

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
    resize={SLOT_$RESIZE}
    animation={SLOT_$ANIMATION}
    />
</div>

<!-- #STYLE -->

<style>
/* #GROUP */

.group { pointer-events: none; }
</style>