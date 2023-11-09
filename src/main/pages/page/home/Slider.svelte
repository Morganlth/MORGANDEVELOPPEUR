<!----------------------------------------------- #||--slider--|| -->


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
class="slider"
>
    <span
    style:transform="translateY({slider_TRANSLATE_Y}%)"
    >
        {slider_CONTENT}
    </span>

    <p>ACCUEIL PRÉSENTATION COMPÉTENCES PROJETS</p>
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
    prop_SLIDER = [() => '']

    // --BINDING


// #\-CONSTANTES-\

    // --SVELTE

    // --CONTEXTS

    // --OUTSIDE

    // --THIS
    const
    SLIDER_DURATION = wait_getDelay(48), // +- 800ms
    SLIDER_DELAY    = wait_getDelay(480) // +- 8000ms

    // --INSIDE


// #\-VARIABLES-\

    // --CONTEXTS

    // --OUTSIDE

    // --THIS
    let
    slider_I = 0,
    slider_T = 1
    ,
    slider_CONTENT = prop_SLIDER[slider_I]()
    ,
    slider_TRANSLATE_Y = 100
    ,
    slider_TIMEOUT
    ,
    slider_cancel = () => {}

    // --INSIDE


// #\-REATIVES-\

    // --CONTEXTS

    // --OUTSIDE

    // --THIS
    $: slider_update(prop_FOCUS)

    // --INSIDE


// #\-FUNCTIONS-\

//=======@LIFE|

    // --SVELTE
    onDestroy(slider_destroy)

    // --SET

    // --GET

    // --UPDATES
    function slider_update(focus)
    {
        slider_destroy()

        slider_a(focus)

        if (focus) slider_loop()
    }

    // --DESTROY
    function slider_destroy()
    {
        slider_destroyTimeout()
        slider_cancel()
    }

    function slider_destroyTimeout() { clearTimeout(slider_TIMEOUT) }


//=======@COMMANDS|

    // --*


//=======@EVENTS|

    // --*


//=======@TRANSITIONS|

    // --*


//=======@ANIMATIONS|

    // --*
    function slider_a(invert = false)
    {
        let {cancel, promise} = animation(t =>
        {
            const T = slider_backIn(t)

            slider_T = t
    
            slider_TRANSLATE_Y = 100 * T
        }, SLIDER_DURATION, slider_T, invert)

        slider_cancel = cancel

        return promise
    }


//=======@UTILS|

    // --*
    function slider_loop()
    {
        slider_TIMEOUT = setTimeout(async () =>
        {
            if (++slider_I >= prop_SLIDER.length) slider_I = 0
    
            try
            {
                await slider_a()
        
                slider_CONTENT = prop_SLIDER[slider_I]()

                await slider_a(true) 

                slider_loop()
            }
            catch { return }
        },
        SLIDER_DELAY)
    }

    function slider_backIn(t)
    {
        const S = 1.20158
    
        return t * t * ((S + 1) * t - S)
    }


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
    @use '../../../../assets/scss/styles/utils';
    @use '../../../../assets/scss/styles/font';

    /* --MEDIA */


/* #\-VARIABLES-\ */

    /* --* */


/* #\-GLOBAL-\ */

    /* --* */


/* #\-THIS-\ */

.slider
{
    @include utils.placement(absolute, $bottom: 0, $left: 62%);

    transform-origin: bottom right;
    transform: perspective(900px) rotateX(-.6rad) scale(.5);

    overflow: clip;

    width: fit-content;
    height: 200vh;
    height: 200svh;

    padding-left: 4rem;

    border-left: solid $intermediate 2px;

    text-align: right;
    writing-mode: vertical-rl;

    &>*
    {
        height: 100%;

        padding-bottom: 42vh;

        box-sizing: border-box;
    }

    span
    {
        #{--title-size}: calc(map.get(font.$font-sizes, s8) * 2);

        @include font.h-($color: $intermediate, $line-height: 1.2, $italic: true);

        display: block;

        letter-spacing: -.6rem;
    }

    p
    {
        @include font.text($n: 0, $color: $intermediate, $regular: false, $font-size: map.get(font.$font-sizes, s3));

        letter-spacing: 1px;
    }
}


</style>