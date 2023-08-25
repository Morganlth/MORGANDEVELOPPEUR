<!-- #MAP

-ROUTER
    PRESENTATION
        WRAPPER
            SNAKE

            CONTENT
                BUTTON
                FEATURE

-->

<!-- #SCRIPT -->

<script>
// #EXPORT

    // --PROP
    export let prop_FOCUS = false

// #IMPORTS

    // --CONTEXT
    import { ROUTER } from '../../App.svelte'

    // --SVELTE
    import { onMount } from 'svelte'

    // --COMPONENT-COVER
    import Content from '../covers/Content.svelte'

    // --COMPONENT-ELEMENTS
    import Snake from '../elements/Snake.svelte'
    import Feature from '../elements/Features.svelte'

// #VARIABLE

    // --ELEMENT-PRESENTATION
    let presentation_CHARGED = false

// #FUNCTIONS

    // --SET
    function presentation_set()
    {
        presentation_setVars()
        presentation_setPage()
    }

    function presentation_setVars() { presentation_CHARGED = true }

    function presentation_setPage() { ROUTER.router_add(1, 'presentation', window.innerHeight * 3 * (2 / 3))}

// #CYCLE

onMount(presentation_set)
</script>

<!-- #HTML -->

<div
id="presentation"
>
    <div
    class="wrapper"
    >
        <Snake
        {prop_FOCUS}
        />

        <Content
        prop_TITLE={{ htmlElement: 'h2', contents: 'Presentation' }}
        prop_INFO="SNAKE GAME"
        prop_CHARGED={presentation_CHARGED}
        {prop_FOCUS}
        >
            <button
            type="button"
            >
                ~~JOUER
            </button>

            <a
            class="contact"
            href="#contact"
            >
                #Contact
            </a>

            <Feature />
        </Content>
    </div>
</div>

<!-- #STYLE -->

<style
lang="scss"
>
/* #USES */

@use 'sass:map';

@use '../../assets/scss/app';

@use '../../assets/scss/styles/elements';
@use '../../assets/scss/styles/position';
@use '../../assets/scss/styles/font';

/* #PRESENTATION */

#presentation
{
    @include position.placement(absolute, 0, 0, auto, 0);

    width: 100%;
    height: 1200vh;

    .wrapper { @extend %wrapper; }

    button, .contact
    {
        @include font.interact($light, map.get(font.$font-sizes, s3), 1, map.get(font.$content-font-weight, w1));

        @extend %simple-hover;

        pointer-events: auto;
    }

    button
    {
        @extend %button-reset;

        padding-right: 1rem;
        padding-bottom: 1rem;
    }

    .contact
    {
        display: block;

        width: 100%;

        margin-block: 5.2% app.$gap-block;

        text-align: right;
        text-decoration: none;
    }
}
</style>