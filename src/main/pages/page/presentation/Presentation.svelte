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
class="presentation p-a00 s-any"
data-page-id={prop_ID}
>
    <Features
    prop_FEATURES={prop_CHILDREN.features}
    prop_FOCUS={prop_FOCUS && !contact_ON && !resume_ON}
    prop_CONTENTS_LENGTH={FEATURES_CONTENTS_LENGTH}
    {prop_RATIO}
    on:click={features_eClick}
    />

    {#if contact_ON}
        <Contact
        prop_CONTACT={prop_CHILDREN.contact ?? {}}
        on:click={contact_eClick}
        />
    {/if}

    {#if resume_ON}
        <Resume
        prop_RESUME={prop_CHILDREN.resume ?? {}}
        on:click={resume_eClick}
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
    import Resume   from './Resume.svelte'
    
//=======@STYLE|

    // --*


// #\-EXPORTS-\

    // --PROPS
    export let
    prop_ID = void 0
    ,
    prop_FOCUS = false
    ,
    prop_TOP   = 0,
    prop_RATIO = 0
    ,
    prop_START = void 0,
    prop_DIF   = void 0
    ,
    prop_CHILDREN = {}

    // --BINDING
    export let page_CHARGED = false

    export const PAGE_NAV = { callback: nav_e$Click }


// #\-CONSTANTES-\

    // --SVELTE

    // --CONTEXTS
    const APP_$FREEZE = APP.app_$FREEZE

    const ROUTER_$SUBPATH = ROUTER.router_$SUBPATH

    // --OUTSIDE

    // --THIS

    // --INSIDE
    const FEATURES_CONTENTS_LENGTH = features_getContentsLength()

    const CONTACT_NAME = 'contact'


// #\-VARIABLES-\

    // --CONTEXTS

    // --OUTSIDE

    // --THIS

    // --INSIDE
    let contact_ON = false

    let resume_ON = false


// #\-REATIVES-\

    // --CONTEXTS

    // --OUTSIDE

    // --THIS

    // --INSIDE
    $: contact_update($ROUTER_$SUBPATH)

    $: !$APP_$FREEZE ? presentation_resetChildrenVars() : void 0 // after contact_update


// #\-FUNCTIONS-\

//=======@LIFE|

    // --SVELTE
    onMount(presentation_set)

    // --SET
    function presentation_set() { page_CHARGED = true }
 
    // --GET
    function features_getContentsLength() { return prop_CHILDREN.features.reduce((accumulator, current) => accumulator += current.contents.length, 0) }

    function features_getTarget(target) { return prop_CHILDREN.features.find(feature => feature.tags.includes(target)) }

    function features_getCurrentTarget() { return prop_CHILDREN.features.findLast(feature => feature.show) }

    // --UPDATES
    function app_updateFreeze(value) { APP.app_$FREEZE = { value, target: prop_ID } }

    function router_updatePage(subPath) { ROUTER.router_updatePage(prop_ID, subPath) }

    function contact_update(subPath)
    {
        if (page_CHARGED)
        {
            const ON = subPath === CONTACT_NAME

            if (ON)
            {
                features_goTo(features_getTarget(CONTACT_NAME)?.id ?? 0, true, false, app_updateFreeze.bind(null, true))

                contact_ON = true
            }
            else if (contact_ON) app_updateFreeze(false) // => presentation_resetChildrenVars
        }
    }

    function resume_update()
    {
        const FEATURE_ID = features_getCurrentTarget()?.id ?? 0
    
        resume_ON = true
        
        features_goTo(FEATURE_ID, true, false, app_updateFreeze.bind(null, true))
    }

    // --DESTROY


//=======@COMMANDS|

    // --*


//=======@EVENTS|

    // --*
    export function nav_e$Click({id})
    {
        switch (id)
        {
            case 0 : features_goTo(features_getTarget(CONTACT_NAME)?.id ?? 0) ;break
            case 1 : resume_update()                                          ;break
            default:                                                          ;break
        }
    }

    function features_eClick() { router_updatePage(CONTACT_NAME) }

    function contact_eClick()  { router_updatePage(null) }

    function resume_eClick()   { app_updateFreeze(false) } // => presentation_resetChildrenVars


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
            case 'top'     : EVENT.event_scrollTo(prop_TOP)                                                     ;break
            case 'start'   : str === prop_CHILDREN.resume.tag ? resume_update() : presentation_goTo(prop_START) ;break
            case 'features': features_goTo(features_getTarget(str)?.id)                                         ;break
            default        :                                                                                    ;break
        }
    }

    function presentation_resetChildrenVars()
    {
        contact_ON = false
        resume_ON  = false
    }

    function presentation_goTo(top, instant, hide, callback) { EVENT.event_scrollTo(top, instant ?? ROUTER.router_getInstant(top), hide, callback) }

    function features_goTo(id = 0, instant, hide, callback)
    {
        let position = 0
    
        for (const DATA of prop_CHILDREN.features)
        {
            if (DATA.id < id) position += DATA.contents.length
            else              break
        }

        const TOP = prop_START + prop_DIF * position / FEATURES_CONTENTS_LENGTH + APP.app_HEIGHT / 4 // 1/4 app_HEIGHT because Features top 50%

        presentation_goTo(TOP, instant, hide, callback)
    }


</script>


<!-- #|-STYLE-| -->

<!-- <style
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


</style> -->