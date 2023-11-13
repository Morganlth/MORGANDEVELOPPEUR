<!----------------------------------------------- #||--group--|| -->


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
class="group"
style={prop_STYLE}
>
    <slot
    resize={SLOT_$RESIZE}
    animation={SLOT_$ANIMATION}
    />
</div>


<!-- #|-SCRIPT-| -->

<script>

// #\-IMPORTS-\

    // --DATA

    // --SVELTE
    import { onMount, onDestroy } from 'svelte'

    // --LIB
    import { wait_throttle } from '$lib/wait'

    // --CONTEXTS
    import { EVENT } from '../../App.svelte'

//=======@COMPONENTS|

    // --*
    
//=======@STYLE|

    // --*


// #\-EXPORTS-\

    // --PROPS
    export let prop_STYLE = ''

    // --BINDING


// #\-CONSTANTES-\

    // --SVELTE

    // --CONTEXTS

    // --OUTSIDE

    // --THIS
    const
    GROUP_EVENTS   = { resize: group_e$Resize },
    GROUP_EVENTS_2 = { animation: wait_throttle(group_e$Animation, 6) } // +- 100ms
    ,
    GROUP_RESIZE    = [],
    GROUP_ANIMATION = []

    // --INSIDE
    const
    SLOT_$RESIZE    = { push: group_push.bind(GROUP_RESIZE),    splice: group_splice.bind(GROUP_RESIZE) },
    SLOT_$ANIMATION = { push: group_push.bind(GROUP_ANIMATION), splice: group_splice.bind(GROUP_ANIMATION) }


// #\-VARIABLES-\

    // --CONTEXTS

    // --OUTSIDE

    // --THIS

    // --INSIDE


// #\-REATIVES-\

    // --CONTEXTS

    // --OUTSIDE

    // --THIS

    // --INSIDE


// #\-FUNCTIONS-\

//=======@LIFE|

    // --SVELTE
    onMount(group_set), onDestroy(group_destroy)

    // --SET
    function group_set() { group_setEvents() }

    function group_setEvents() { EVENT.event_add(GROUP_EVENTS) }

    function group_setEvents2() { EVENT.event_add(GROUP_EVENTS_2) }

    // --GET

    // --UPDATES

    // --DESTROY
    function group_destroy()
    {
        group_destroyEvents()
        group_destroyEvents2()
    }

    function group_destroyEvents() { EVENT.event_remove(GROUP_EVENTS) }

    function group_destroyEvents2() { EVENT.event_remove(GROUP_EVENTS_2) }


//=======@COMMANDS|

    // --*


//=======@EVENTS|

    // --*
    async function group_e$Resize()    { group_run(GROUP_RESIZE) }

    async function group_e$Animation() { group_run(GROUP_ANIMATION) }


//=======@TRANSITIONS|

    // --*


//=======@ANIMATIONS|

    // --*


//=======@UTILS|

    // --*
    export function group_start() { group_setEvents2() }

    export function group_stop()  { group_destroyEvents() }

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


</script>


<!-- #|-STYLE-| -->

<style
lang="scss"
>

/* #\-USES-\ */

    /* --SASS */

    /* --APP */

    /* --DEPENDENCIES */

    /* --MEDIA */


/* #\-VARIABLES-\ */

    /* --* */


/* #\-THIS-\ */

.group { pointer-events: none; }


</style>