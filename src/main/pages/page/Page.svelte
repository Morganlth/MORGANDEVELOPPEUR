<!----------------------------------------------- #||--page--|| -->


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
id={prop_NAME}
class="page p-a00 s-any"
class:hide={page_HIDE}
style:z-index={prop_Z}
>
    <Wrapper>
        <Label
        {prop_LABEL}
        {prop_FOCUS}
        slot="label"
        />

        <Title
        prop_CHARGED={page_CHARGED}
        {prop_TITLE}
        {prop_INTRO}
        {prop_TOP}
        bind:title_HEIGHT
        slot="title"
        />

        <svelte:fragment
        slot="nav"
        >
            {#if page_NAV}
                <Nav
                prop_TRANSLATE_Y={-title_HEIGHT + (page_NAV.offset ?? 0)}
                {prop_NAV}
                {prop_FOCUS}
                {prop_INTRO}
                on:click={nav_eClick}
                />
            {/if}
        </svelte:fragment>

        <svelte:fragment
        slot="quote"
        >
            {#if prop_QUOTE}
                <Quote
                {prop_QUOTE}
                {prop_INTRO}
                />
            {/if}
        </svelte:fragment>

        <svelte:component
        this={prop_COMPONENT}
        {...prop_PROPS}
        {prop_ID}
        {prop_CHILDREN}
        bind:page_CHARGED
        bind:PAGE_NAV={page_NAV}
        bind:page_process
        />
    </Wrapper>
</div>


<!-- #|-SCRIPT-| -->

<script>

// #\-IMPORTS-\

    // --DATA

    // --SVELTE
    import { onMount } from 'svelte'

    // --LIB

    // --CONTEXTS
    import { APP, PROCESS } from '../../../App.svelte'

//=======@COMPONENTS|

    // --*
    import Wrapper from './Wrapper.svelte'
    import Label   from './Label.svelte'
    import Title   from './Title.svelte'
    import Nav     from './Nav.svelte'
    import Quote   from './Quote.svelte'
            
//=======@STYLE|

    // --*


// #\-EXPORTS-\

    // --PROPS
    export let
    prop_ID = void 0
    ,
    prop_NAME = ''
    ,
    prop_FOCUS = false,
    prop_INTRO = false
    ,
    prop_TOP = 0,
    prop_Z   = 0
    ,
    prop_COMPONENT = {},
    prop_LABEL     = {},
    prop_TITLE     = {},
    prop_NAV       = {},
    prop_QUOTE     = void {},
    prop_PROPS     = {},
    prop_PROCESS   = {},
    prop_CHILDREN  = {}

    // --BINDING


// #\-CONSTANTES-\

    // --SVELTE

    // --CONTEXTS
    const APP_$FREEZE = APP.app_$FREEZE

    // --OUTSIDE

    // --THIS

    // --INSIDE


// #\-VARIABLES-\

    // --CONTEXTS

    // --OUTSIDE

    // --THIS
    let
    page_CHARGED = false,
    page_HIDE    = false
    ,
    page_NAV
    ,
    page_process

    // --INSIDE
    let title_HEIGHT = 0


// #\-REATIVES-\

    // --CONTEXTS

    // --OUTSIDE

    // --THIS
    $: page_update($APP_$FREEZE)

    // --INSIDE


// #\-FUNCTIONS-\

//=======@LIFE|

    // --SVELTE
    onMount(page_set)

    // --SET
    function page_set() { PROCESS.process_push(prop_PROCESS, page_process) }

    // --GET

    // --UPDATES
    function page_update(freeze)
    {
        if (freeze)
        {
            const TARGET = APP_$FREEZE.target

            page_HIDE = TARGET != null && TARGET != prop_ID
        }
        else page_HIDE = false
    }

    // --DESTROY


//=======@COMMANDS|

    // --*


//=======@EVENTS|

    // --*
    function nav_eClick({detail}) { page_NAV.callback(detail) }


//=======@TRANSITIONS|

    // --*


//=======@ANIMATIONS|

    // --*


//=======@UTILS|

    // --*


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

.page.hide
{
    visibility: hidden;

    pointer-events: none !important;
}


</style>