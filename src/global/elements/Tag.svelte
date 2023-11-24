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
class:target={prop_TARGET}
style={prop_getTagStyle()}
bind:this={tag}
>
    <Fragments
    prop_WORD_COLUMN={true}
    prop_FRAGS={{ children: TAG_FRAGS, value: prop_CONTENT }}
    prop_getStyle={prop_getFragmentsStyle}
    />

    {#if prop_IMG}
        <!-- svelte-ignore a11y-missing-attribute -->
        <img
        class:on={prop_IMG_ON}
        {...prop_IMG}
        >
    {/if}
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
    prop_FOCUS  = false,
    prop_TARGET = false,
    prop_IMG_ON = false
    ,
    prop_CONTENT  = '',
    prop_IMG      = void {},
    prop_DURATION = 0
    ,
    prop_getTagStyle       = () => '',
    prop_getFragmentsStyle = () => ''

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
    $: tag_update(prop_FOCUS || prop_TARGET)

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
    @use '../../assets/scss/styles/utils';
    @use '../../assets/scss/styles/font';

    /* --MEDIA */


/* #\-VARIABLES-\ */

    /* --* */
    $duration: var(--frag-duration, .4s);


/* #\-THIS-\ */

.tag
{
    @include font.h-(3, $light);

    opacity: 0;

    width:  fit-content;
    height: fit-content;

    text-align: right;

    transition: opacity $duration;

    &.focus
    {
        opacity: 1;

        img.on
        {
            opacity: 1;
        
            clip-path: polygon(0 0, 100% 0, 100% 100%, 0% 100%);

            transition: clip-path $duration;
        }
    }

    &.target { mix-blend-mode: screen; }

    img
    {
        @include utils.placement(absolute, $top: 50%, $left: 50%, $z: -1);

        transform: translate(var(--tag-x, 0), calc(var(--tag-y, 0) - 50%));

        opacity: 0;

        width:      min(36vw, 36vh);
        height:     auto;
        max-height: min(24vw, 24vh);

        clip-path: polygon(0 50%, 0 50%, 0 50%, 0 50%);

        object-fit:      cover;
        object-position: top;

        transition: transform $duration, opacity 0s $duration, clip-path $duration;
    }
}


</style>