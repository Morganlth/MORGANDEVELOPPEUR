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

// #CONSTANTE

    // --ELEMENT-INFO
    const INFO_D = 600

// #VARIABLES

     // --ELEMENT-INFO
     let info_OPACITY = 0

    // --ELEMENT-CLOSURE
    let closure_TIMEOUT

// #FUNCTIONS

    // --UPDATE
    function info_updateOpacity(opacity) { info_OPACITY = opacity }

    // --INTRO
    function closure_intro() { closure_TIMEOUT = setTimeout(() => info_updateOpacity(1), INFO_D) }

    // --OUTROS
    function closure_outro()
    {
        clearTimeout(closure_TIMEOUT)
    
        info_updateOpacity(0)
    }

    // --TRANSITIONS
    function content_t(node, { delay = 0 })
    {
        return {
            delay,
            duration: INFO_D,
            css: (t) =>
            {
                const T = t * 100 + '%'

                return `clip-path: polygon(0 0, ${T} 0, ${T} 100%, 0% 100%);`
            }
        }
    }

    function closure_t(node, { delay = 0 })
    {
        return {
            delay,
            duration: INFO_D,
            css: (t, u) => `transform: translateX(-${u * 100}%);`
        }
    }
</script>

<!-- #HTML -->

<div
class="info"
style:opacity={info_OPACITY}
>
    {#if prop_FOCUS}
        <span
        class="opening"
        >
            {'['}
        </span>

        <p
        class="content"
        in:content_t={{ delay: INFO_D }}
        out:content_t
        >
            {prop_CONTENT}
        </p>

        <span
        class="closure"
        in:closure_t={{ delay: INFO_D }}
        out:closure_t
        on:introstart={closure_intro}
        on:outroend={closure_outro}
        >
            {']'}
        </span>
    {/if}
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