<!----------------------------------------------- #||--presentation--|| -->


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
class="presentation"
data-page-id={prop_ID}
>
    <Features
    prop_FRACTION={FEATURES_FRACTION}
    {prop_FOCUS}
    {prop_RATIO}
    {prop_FEATURES}
    bind:contact_ON
    />

    {#if contact_ON}
        <Contact
        bind:contact_ON
        />
    {/if}
</div>


<!-- #|-SCRIPT-| -->

<script>

// #\-IMPORTS-\

    // --DATA

    // --SVELTE
    import { onMount } from 'svelte'

    // --LIB

    // --CONTEXTS
    import { APP, ROUTER, EVENT } from '../../../../App.svelte'

//=======@COMPONENTS|

    // --*
    import Features from './Features.svelte'
    import Contact  from './Contact.svelte'
    
//=======@STYLE|

    // --*


// #\-EXPORTS-\

    // --PROPS
    export let
    prop_ID = void 0
    ,
    prop_FOCUS = false
    ,
    prop_FEATURES = []
    ,
    prop_TOP   = 0,
    prop_RATIO = 0
    ,
    prop_START = void 0,
    prop_DIF   = void 0

    // --BINDING
    export let page_CHARGED = false

    export const PAGE_NAV = { callback: nav_e$Click }


// #\-CONSTANTES-\

    // --SVELTE

    // --CONTEXTS
    const APP_$FREEZE = APP.app_$FREEZE

    // --OUTSIDE

    // --THIS
    const FEATURES_FRACTION = 1 / prop_FEATURES.length

    // --INSIDE


// #\-VARIABLES-\

    // --CONTEXTS

    // --OUTSIDE

    // --THIS

    // --INSIDE
    let contact_ON = false


// #\-REATIVES-\

    // --CONTEXTS
    $: !$APP_$FREEZE ? contact_ON = false : void 0

    // --OUTSIDE

    // --THIS

    // --INSIDE
    $: presentation_update(contact_ON)


// #\-FUNCTIONS-\

//=======@LIFE|

    // --SVELTE
    onMount(presentation_set)

    // --SET
    function presentation_set()
    {
        APP.app_WAITING_LOADING.push(() => contact_ON = ROUTER.router_SUBPATH === 'contact')

        page_CHARGED = true
    }

    // --GET
    function features_getTarget(target) { return prop_FEATURES.find(feature => feature.tags.includes(target)) }

    // --UPDATES
    function app_updateFreeze(value) { APP.app_$FREEZE = { value, target: prop_ID } }

    function router_updatePaths()
    {
        ROUTER.router_updateSubPath(prop_ID, contact_ON ? 'contact' : null)
        ROUTER.router_updatePath(prop_ID)
    }

    function presentation_update()
    {
        if (page_CHARGED)
        {
            router_updatePaths()
            presentation_updateScrollPosition()
        }
    }

    function presentation_updateScrollPosition()
    {
        contact_ON
        ? presentation_goTo(features_getTarget('contact')?.id ?? prop_FEATURES.length - 1, true, false, app_updateFreeze.bind(null, true))
        : app_updateFreeze(false)
    }

    // --DESTROY


//=======@COMMANDS|

    // --*


//=======@EVENTS|

    // --*
    export function nav_e$Click({id})
    {
        if (id === 0)
        {
            const CONTACT = features_getTarget('contact')
        
            presentation_goTo(CONTACT ? CONTACT.id : prop_FEATURES.length - 1)
        }
    }


//=======@TRANSITIONS|

    // --*


//=======@ANIMATIONS|

    // --*


//=======@UTILS|

    // --*
    export function page_process(str, target)
    {
        switch (target)
        {
            case 'top'     : EVENT.event_scrollTo(prop_TOP)                 ;break
            case 'start'   : EVENT.event_scrollTo(prop_START)               ;break
            case 'features': presentation_goTo(features_getTarget(str)?.id) ;break
            default        :                                                ;break
        }
    }

    function presentation_goTo(id = 0, instant, hide, callback)
    {
        const TOP = prop_START + id * FEATURES_FRACTION * prop_DIF + prop_DIF * FEATURES_FRACTION / 2

        EVENT.event_scrollTo(TOP, instant ?? ROUTER.router_getInstant(TOP), hide, callback)
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
    @use '../../../../assets/scss/styles/utils';

    /* --MEDIA */


/* #\-VARIABLES-\ */

    /* --* */


/* #\-THIS-\ */

.presentation
{
    @include utils.placement(absolute, 0, 0, 0, 0);

    @extend %any-size;

    overflow: clip;
}


</style>