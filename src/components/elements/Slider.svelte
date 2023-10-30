<!-- #MAP

    SLIDER

-->

<!-- #SCRIPT -->

<script>
// #EXPORTS

    // --PROPS
    export let
    prop_FOCUS = false,

    prop_SLIDER = [() => '']

    // --BINDS

// #IMPORTS

    // --JS
    import { animation } from '../../assets/js/utils/animation'

    // --LIB

    // --CONTEXTS

    // --SVELTE
    import { onDestroy } from 'svelte'

    // --COMPONENT-

// #CONSTANTES

    // --ELEMENT-SLIDER
    const SLIDER_DELAY = 8000

// #VARIABLES

    // --ELEMENT-SLIDER
    let
    slider_I = 0,
    slider_T = 0,

    slider_CONTENT = prop_SLIDER[slider_I](),

    slider_TRANSLATE_Y = 0,

    slider_TIMEOUT,

    slider_cancel = () => {}

// #REACTIVES

    // --ELEMENT-SLIDER
    $: slider_update(prop_FOCUS)

// #FUNCTIONS

    // --SET

    // --GET

    // --UPDATES
    function slider_update(focus)
    {
        slider_destroy()

        if (focus)
        {
            slider_a(true)
            slider_loop()
        }
        else slider_TIMEOUT = setTimeout(slider_a, 800)
    }

    // --CLEAR
    function slider_clear() { clearInterval(slider_TIMEOUT) }

    // --DESTROY
    function slider_destroy()
    {
        slider_clear()
        slider_cancel()
    }

        // !======IN-OUT=======!

    // --INTROS

    // --OUTROS

        // !======CONTEXT======!

    // --COMMANDS

    // --EVENTS

        // !======T-A==========!

    // --TRANSITIONS

    // --ANIMATIONS
    function slider_a(invert = false)
    {
        let { cancel, promise } = animation((t) =>
        {
            slider_T = t

            const T = slider_backIn(t)
    
            slider_TRANSLATE_Y = 100 * T
        }, 800, slider_T, invert)

        slider_cancel = cancel

        return promise
    }

        // !======CONTROL======!

    // --START

    // --END

        // !======TEST=========!

    // --TESTS

        // !======CANVAS=======!

    // --DRAW

        // !======UTILS========!

    // --UTILS
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

// #LIFECYCLES

onDestroy(slider_destroy)
</script>

<!-- #HTML -->

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

<!-- #STYLE -->

<style
lang="scss"
>
/* #USES */

@use 'sass:map';

@use '../../assets/scss/styles/position';
@use '../../assets/scss/styles/font';
@use '../../assets/scss/styles/media';

/* #SLIDER */

.slider
{
    @include position.placement(absolute, $bottom: 0, $left: 46%);
    @include font.content($intermediate, $regular: false, $font-size: map.get(font.$font-sizes, s3));

    transform-origin: bottom right;
    transform: perspective(800px) rotateX(-.6rad) scale(.5);

    overflow: clip;

    width: fit-content;
    height: 200vh;

    padding-left: 4rem;

    border-left: solid $intermediate 2px;

    text-align: right;
    writing-mode: vertical-rl;

    &>*
    {
        height: 100%;

        padding-bottom: 60vh;

        box-sizing: border-box;
    }

    span
    {
        @include font.h-custom($font-size: calc(map.get(font.$font-sizes, s8) * 2), $line-height: 1.2, $italic: true);

        display: block;
    }

    @include media.min($ms3)
    {
        left: 60%;

        &>* { padding-bottom: 42vh; }
    }
}
</style>