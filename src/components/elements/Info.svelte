<!-- #MAP

    INFO
        OPENNING
        CONTENT
        CLOSURE

-->

<!-- #SCRIPT -->

<script>
// #EXPORTS

    // --PROPS
    export let
    prop_CONTENT = '',

    prop_FOCUS = false 

// #IMPORTS

    // --JS
    import { animation } from '../../assets/js/utils/animation'

// #CONSTANTE

    // --ELEMENT-INFO
    const INFO_D = 600

// #VARIABLES

    // --ELEMENT-INFO
    let
    info_OPACITY = 0,

    info_T = 0,

    info_TIMEOUT,

    info_cancel = () => {}

    // --ELEMENT-CONTENT
    let content_CLIP = 0

    // --ELEMENT-CLOSURE
    let closure_TRANSLATE_X = 0

// #REACTIVE

    // --ELEMENT-INFO
    $: info_update(prop_FOCUS)

// #FUNCTIONS

    // --UPDATES
    function info_update(focus)
    {
        info_clear()

        info_a(!focus)
    }

    // --CLEAR
    function info_clear()
    {
        clearTimeout(info_TIMEOUT)

        info_cancel()
    }

    // --ANIMATION
    function info_a(invert = false)
    {
        info_TIMEOUT = setTimeout(async () =>
        {
            let {cancel, promise} = animation((t) =>
            {
                info_T = t

                closure_TRANSLATE_X = -100 + (content_CLIP = t * 100)
            }, INFO_D, info_T, invert)

            info_cancel = cancel

            try { info_OPACITY = invert ? (await promise, 0) : 1 } catch {}
        },
        !invert && info_T === 0 ? INFO_D : 0)
    }
</script>

<!-- #HTML -->

<div
class="info"
style:opacity={info_OPACITY}
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

<!-- #STYLE -->

<style
lang="scss"
>
/* #USES */

@use '../../assets/scss/styles/position';
@use '../../assets/scss/styles/font';

/* #INFO */

.info
{
    &, .content { width: min-content; }

    @include font.content($light);

    position: relative;

    z-index: 2;

    opacity: 0;

    padding-bottom: 2rem;

    .opening { @include position.placement(absolute, $top: 0, $left: 0); }

    .content { margin-left: 1rem; }

    .closure
    {
        @include position.placement(absolute, $top: 0, $right: 0, $left: 2rem);

        width: calc(100% - 1rem);

        text-align: right;
    }
}
</style>