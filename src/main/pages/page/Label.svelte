<!----------------------------------------------- #||--label--|| -->


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
class="label"
style:opacity={label_OPACITY}
>
    <span
    class="opening"
    >
        {'['}
    </span>

    <p
    class="content"
    style:clip-path="polygon(0 0, {content_CLIP}% 0, {content_CLIP}% 100%, 0% 100%)"
    >
        {prop_CONTENT}
    </p>

    <span
    class="closure"
    style:transform="translateX({closure_TRANSLATE_X}%)"
    >
        {']'}
    </span>
</div>


<!-- #|-SCRIPT-| -->

<script>

// #\-IMPORTS-\

    // --DATA

    // --SVELTE
    import { onDestroy } from 'svelte'

    // --LIB
    import { wait_getDelay } from '$lib/wait'
    import { animation }     from '$lib/animation'

    // --CONTEXTS

//=======@COMPONENTS|

    // --*


// #\-EXPORTS-\

    // --PROPS
    export let
    prop_FOCUS = false
    ,
    prop_CONTENT = ''

    // --BINDING


// #\-CONSTANTES-\

    // --SVELTE

    // --CONTEXTS

    // --OUTSIDE

    // --THIS
    const LABEL_D = wait_getDelay(36) // +- 600ms

    // --INSIDE


// #\-VARIABLES-\

    // --CONTEXTS

    // --OUTSIDE

    // --THIS
    let
    label_OPACITY = 0
    ,
    label_T = 0
    ,
    label_TIMEOUT
    ,
    label_cancel = () => {}

    // --INSIDE
    let content_CLIP = 0

    let closure_TRANSLATE_X = 0

// #\-REATIVES-\

    // --CONTEXTS

    // --OUTSIDE

    // --THIS
    $: label_update(prop_FOCUS)

    // --INSIDE


// #\-FUNCTIONS-\

//=======@LIFE|

    // --SVELTE
    onDestroy(label_destroy)

    // --SET

    // --GET

    // --UPDATES
    function label_update(focus)
    {
        label_destroy()

        label_a(!focus)
    }

    // --DESTROY
    function label_destroy()
    {
        clearTimeout(label_TIMEOUT)

        label_cancel()
    }


//=======@COMMANDS|

    // --*


//=======@EVENTS|

    // --*


//=======@TRANSITIONS|

    // --*


//=======@ANIMATIONS|

    // --*
    function label_a(invert = false)
    {
        label_TIMEOUT = setTimeout(async () =>
        {
            let {cancel, promise} = animation(t =>
            {
                label_T = t
        
                closure_TRANSLATE_X = -100 + (content_CLIP = t * 100)
            }, LABEL_D, label_T, invert)

            label_cancel = cancel

            if(invert)
            {
                try { await promise, label_OPACITY = 0 } catch {}
            }
            else label_OPACITY = 1
        },
        !invert && label_T === 0 ? LABEL_D : 0)
    }


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
    @use '../../../assets/scss/styles/utils';
    @use '../../../assets/scss/styles/font';

    /* --MEDIA */


/* #\-VARIABLES-\ */

    /* --* */


/* #\-GLOBAL-\ */

    /* --* */


/* #\-THIS-\ */

.label
{
    &, .content { width: min-content; }
    
    @include utils.placement(relative, $z: 2);
    @include font.text($light);

    padding-bottom: 2rem;

    .opening { @include utils.placement(absolute, $top: 0, $left: 0); }

    .content { margin-left: 1rem; }

    .closure
    {
        @include utils.placement(absolute, $top: 0, $right: 0, $left: 2rem);

        width: calc(100% - 1rem);

        text-align: right;
    }
}


</style>