<!----------------------------------------------- #||--tag--|| -->


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

<h3
class="tag"
class:focus={tag_FOCUS}
style={prop_STYLE.tag_style()}
bind:this={tag}
>
    <Fragments
    prop_FRAGS={{ children: TAG_FRAGS, value: prop_CONTENT }}
    prop_STYLE={prop_STYLE.fragments_style}
    />
</h3>


<!-- #|-SCRIPT-| -->

<script>

// #\-IMPORTS-\

    // --DATA

    // --SVELTE
    import { createEventDispatcher } from 'svelte'

    // --LIB

    // --CONTEXTS

//=======@COMPONENTS|

    // --*
    import Fragments from './Fragments.svelte'
    
//=======@STYLE|

    // --*


// #\-EXPORTS-\

    // --PROPS
    export let
    prop_FOCUS = false
    ,
    prop_CONTENT  = '',
    prop_DURATION = 0
    ,
    prop_STYLE = { tag_style: () => '', fragments_style: () => '' }

    // --BINDING


// #\-CONSTANTES-\

    // --SVELTE
    const SVELTE_DISPATCH = createEventDispatcher()

    // --CONTEXTS

    // --OUTSIDE

    // --THIS
    const TAG_FRAGS = []

    // --INSIDE


// #\-VARIABLES-\

    // --CONTEXTS

    // --OUTSIDE

    // --THIS
    let
    tag
    ,
    tag_FOCUS = false
    ,
    tag_TIMEOUT

    // --INSIDE


// #\-REATIVES-\

    // --CONTEXTS

    // --OUTSIDE

    // --THIS
    $: tag_update(prop_FOCUS)

    // --INSIDE


// #\-FUNCTIONS-\

//=======@LIFE|

    // --SVELTE

    // --SET

    // --GET

    // --UPDATES
    function tag_update(focus)
    {
        if (tag)
        {
            tag_destroyTimeout()

            tag_TIMEOUT = setTimeout(() => tag_FOCUS = focus, focus ? 0 : prop_DURATION)

            SVELTE_DISPATCH(focus ? 'in' : 'out', { tag, frags: TAG_FRAGS })
        }
    }

    // --DESTROY
    function tag_destroyTimeout() { clearTimeout(tag_TIMEOUT) }


//=======@COMMANDS|

    // --*


//=======@EVENTS|

    // --*


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
    @use 'sass:map';

    /* --APP */

    /* --DEPENDENCIES */
    @use '../../assets/scss/styles/font';

    /* --MEDIA */


/* #\-VARIABLES-\ */

    /* --* */


/* #\-THIS-\ */

.tag
{
    @include font.h-(3, $light);

    opacity: 0;

    width:  fit-content;
    height: fit-content;

    transition: opacity var(--frag-duration, .4s);

    &.focus { opacity: 1; }
}


</style>