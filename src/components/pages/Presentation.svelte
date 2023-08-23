<!-- #MAP

-ROUTER
    PRESENTATION
        SNAKE

        CONTENT

-->

<!-- #SCRIPT -->

<script>
// #EXPORT

    // --PROP
    export let prop_FOCUS = false

// #IMPORTS

    // --LIB
    import COLORS from '$lib/colors'

    // --CONTEXT
    import { ROUTER } from '../../App.svelte'

    // --SVELTE
    import { onMount } from 'svelte'

    // --COMPONENT-COVER
    import Icon from '../covers/Icon.svelte'

    // --COMPONENT-ELEMENT
    import Snake from '../elements/Snake.svelte'

    // --COMPONENT-ICON
     

// #CONSTANTE

    // --ELEMENT-TITLE
    const TITLE_CHILDREN = []

// #VARIABLES

    // --ELEMENT-PRESENTATION
    let presentation_CHARGED = false

    // --ELEMENT-CONTENT
    let
    content_OPACITY = 0,
    content_TRANSITION_DELAY = 0

// #REACTIVE

    // --ELEMENT-HOME
    $: content_update(prop_FOCUS)

// #FUNCTIONS

    // --SET
    function presentation_set()
    {
        presentation_setVars()
        presentation_setPage()

        presentation_CHARGED = true
    }

    function presentation_setVars() { content_TRANSITION_DELAY = '1.2s' }

    function presentation_setPage() { ROUTER.router_add(1, 'presentation', window.innerHeight * 3 * (2 / 3))}

    // --GET
    function title_getTranslate3d()
    {
        const
        GET = () => Math.random() * 4000 - 2000,
        [X, Y, Z] = [GET(), GET(), GET()]

        return `translate3d(${X}px, ${Y}px, ${Z}px)`
    }

    // --INTRO
    async function content_intro()
    {
        content_OPACITY = 1

        for (const CHILD of TITLE_CHILDREN) CHILD.style.transform = `translate3d(0, 0, 0)`
    }

    // --OUTRO
    async function content_outro()
    {
        content_OPACITY = 0

        for (const CHILD of TITLE_CHILDREN) CHILD.style.transform = title_getTranslate3d()
    }

    // --UPDATE
    function content_update(focus)
    {
        if (presentation_CHARGED)
        {
            focus
            ?   content_intro()
            :   content_outro()
        }
    }

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

        <section
        class="content"
        style:opacity={content_OPACITY}
        style:transition="opacity {content_TRANSITION_DELAY} ease-in"
        >
            <div
            class="info"
            >
                {'{SNAKE GAME}'}
            </div>

            <h2
            class="title"
            >
                {#each 'Presentation' as char}
                    <span
                    style:transform={title_getTranslate3d()}
                    style:transition="transform {content_TRANSITION_DELAY} ease-out"
                    bind:this={TITLE_CHILDREN[TITLE_CHILDREN.length]}
                    >{char}</span>
                {/each}
            </h2>

            <button
            type="button"
            >
               ~~JOUER
            </button>
        </section>
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
@use '../../assets/scss/styles/animation';

/* #PRESENTATION */

#presentation
{
    @include position.placement(absolute, 0, 0, auto, 0);

    width: 100%;
    height: 300vh;

    .wrapper { @extend %wrapper; }

    .content
    {
        @extend %aScaled;
    
        position: relative;

        .info, .title { user-select: none; }

        .info { @include font.interact($light, map.get(font.$font-sizes, s2), 1, map.get(font.$content-font-weight, w1)); }
    
        .title
        {
            &::before
            {
                @include position.placement(absolute, -.7rem, auto, auto, 0, true);

                width: 2.4rem;
                height: 2.4rem;

                background-color: $primary;
            }

            @include font.h-(1);
        
            @extend %m-h-1;

            position: relative;

            margin-block: 3rem;
            margin-left: app.$gap-inline;
            padding-left: app.$gap-inline;

            span { display: inline-block; }
        }

        button
        {
            @include font.interact($light, map.get(font.$font-sizes, s3), 1, map.get(font.$content-font-weight, w1));

            @extend %button-reset;

            padding-right: 1rem;
            padding-bottom: 1rem;
        
            pointer-events: auto;
        }
    }
}
</style>