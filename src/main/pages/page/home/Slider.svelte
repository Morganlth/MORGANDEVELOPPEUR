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
class:focus={prop_FOCUS}
>
    <div
    class="banner"
    style:transform="translateY({banner_TRANSLATE_Y}%)"
    >
        {banner_CONTENT}
    </div>

    <div
    class="subbanner"
    >
        {subbanner_CONTENT}
    </div>
</div>


<!-- #|-SCRIPT-| -->

<script>

// #\-IMPORTS-\

    // --DATA

    // --SVELTE
    import { onMount, onDestroy } from 'svelte'

    // --LIB
    import { wait_getDelay } from '$lib/wait'
    import { animation }     from '$lib/animation'

    // --CONTEXTS
    import { APP, ROUTER } from '../../../../App.svelte'

//=======@COMPONENTS|

    // --*
    
//=======@STYLE|

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
    slider_TIMEOUT
    ,
    slider_cancel = () => {}

    // --INSIDE
    let
    banner_CONTENT = prop_SLIDER[slider_I]()
    ,
    banner_TRANSLATE_Y = 100

    let subbanner_CONTENT = ''


// #\-REATIVES-\

    // --CONTEXTS

    // --OUTSIDE

    // --THIS
    $: slider_update(prop_FOCUS)

    // --INSIDE


// #\-FUNCTIONS-\

//=======@LIFE|

    // --SVELTE
    onMount(slider_set), onDestroy(slider_destroy)

    // --SET
    function slider_set() { APP.app_WAITING_LOADING = subbanner_setVars }

    function subbanner_setVars() { subbanner_CONTENT = ROUTER.router_PAGES.map(route => route.label).join(' ') }

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
    
            banner_TRANSLATE_Y = 100 * T
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
        
                banner_CONTENT = prop_SLIDER[slider_I]()

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


/* #\-THIS-\ */

.slider
{
    @include utils.placement(absolute, $bottom: 0, $left: 62%);

    transform-origin: bottom right;
    transform:        perspective(860px) rotateX(-.6rad) scale(.5);

    overflow: clip;

    width:  fit-content;
    height: 200vh;
    height: 200svh;

    color:        $intermediate;
    text-align:   right;
    writing-mode: vertical-rl;

    &.focus div:nth-child(2) { transform: translateY(0); }

    .banner, .subbanner
    {
        height: 100%;

        padding-bottom: 44vh;

        box-sizing: border-box;
    }

    .banner
    {
        #{--title-size}: calc(map.get(font.$font-sizes, s8) * 2);

        @include font.h-($line-height: 1.1, $italic: true);
    
        letter-spacing: -.4rem;
    }

    .subbanner
    {
        @include font.text($regular: false, $font-size: map.get(font.$font-sizes, s3));

        transform: translateY(-100%);

        padding-left: 4rem;

        border-left: solid $intermediate 1px;

        transition: transform .8s .2s ease-in;
    }
}


</style>