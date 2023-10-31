<!-- #MAP

-EVENT
    ABOUT

-->

<!-- #SCRIPT -->

<script>
// #EXPORTS

    // --PROPS
    export let prop_CONTENT = []

    // --BINDS

// #IMPORTS

    // --JS
    import { transition_fade } from '../../assets/js/utils/transition'

    // --LIB
    import COLORS from '$lib/colors'

    // --CONTEXTS
    import { EVENT } from '../../App.svelte'

    // --SVELTE
    import { onDestroy, onMount } from 'svelte'

    // --COMPONENT-

// #CONSTANTES

    // --ELEMENT-CANVAS
    const
    CANVAS_SQUARE_SIZE = 40
,
    CANVAS_DELAY = 100.02
,
    CANVAS_EVENTS = { resize: canvas_e$Resize }

// #VARIABLES

    // --ELEMENT-ABOUT
    let about

    // --ELEMENT-CANVAS
    let
    canvas
,
    canvas_CONTEXT
,
    canvas_COLUMNS = 0,
    canvas_ROWS = 0
,
    canvas_MATRIX
,
    canvas_TIMEOUT

// #REACTIVES

// #FUNCTIONS

    // --SET
    function about_set()
    {
        canvas_setVars()
        canvas_setEvents()
        canvas_drawBackground()
        canvas_a()
    }

    function canvas_setVars()
    {
        const [WIDTH, HEIGHT] = [about.offsetWidth, about.offsetHeight]
    
        canvas.width = WIDTH
        canvas.height = HEIGHT

        canvas_COLUMNS = Math.ceil(WIDTH / CANVAS_SQUARE_SIZE)
        canvas_ROWS = Math.ceil(HEIGHT / CANVAS_SQUARE_SIZE)

        canvas_CONTEXT ??= canvas.getContext('2d')

        canvas_setMatrix()
    }

    function canvas_setMatrix()
    {
        canvas_MATRIX = new Int8Array(canvas_COLUMNS * canvas_ROWS)

        for (let i = 0; i < canvas_MATRIX.length; i++) canvas_MATRIX[i] = Math.floor(Math.random() * 10)
    }

    function canvas_setEvents() { EVENT.event_add(CANVAS_EVENTS) }

    // --GET

    // --UPDATES

    // --CLEAR
    function canvas_clear() { clearTimeout(canvas_TIMEOUT) }

    // --DESTROY
    function about_destroy()
    {
        canvas_clear()
        canvas_destroyEvents()
    }

    function canvas_destroyEvents() { EVENT.event_remove(CANVAS_EVENTS) }

        // !======IN-OUT=======!

    // --INTROS

    // --OUTROS

        // !======CONTEXT======!

    // --COMMANDS

    // --EVENTS
    async function canvas_e$Resize() { canvas_setVars() }

        // !======T-A==========!

    // --TRANSITIONS

    // --ANIMATIONS
    async function canvas_a(n = 0)
    {
        for (let i = 0; i < canvas_MATRIX.length; i++)
        {
            if (canvas_MATRIX[i] === n)
            {
                const
                X = i % canvas_COLUMNS * CANVAS_SQUARE_SIZE,
                Y = Math.floor(i / canvas_COLUMNS) * CANVAS_SQUARE_SIZE

                canvas_CONTEXT.clearRect(X, Y, CANVAS_SQUARE_SIZE, CANVAS_SQUARE_SIZE)
            }
        }

        if (++n < 10) canvas_TIMEOUT = setTimeout(() => canvas_a(n), CANVAS_DELAY)
    }

        // !======CONTROL======!

    // --START

    // --END

        // !======TEST=========!

    // --TESTS

        // !======CANVAS=======!

    // --DRAW
    function canvas_drawBackground()
    {
        canvas_CONTEXT.fillStyle = COLORS.dark
        canvas_CONTEXT.fillRect(0, 0, canvas.width, canvas.height)
    }

        // !======UTILS========!

    // --UTILS

// #LIFECYCLES

onMount(about_set)
onDestroy(about_destroy)
</script>

<!-- #HTML -->

<div
class="about"
bind:this={about}
transition:transition_fade={{ duration: 200 }}
>
    <div
    class="content"
    >
        {#each prop_CONTENT as content}
            <p>
                {#each content as p, i}
                    {#if p === ''}
                        <br>
                    {:else}
                        <span
                        style:--about-text-delay="{i * .5}s"
                        >
                            {p}
                        </span>
                    {/if}
                {/each}
            </p>
        {/each}
    </div>

    <canvas
    class="canvas"
    bind:this={canvas}
    >
    </canvas>
</div>

<!-- #STYLE -->

<style
lang="scss"
>
/* #USES */

@use 'sass:map';

@use '../../assets/scss/app';

@use '../../assets/scss/styles/utils';
@use '../../assets/scss/styles/position';
@use '../../assets/scss/styles/display';
@use '../../assets/scss/styles/size';
@use '../../assets/scss/styles/font';

/* #ABOUT */
.about
{
    $top: 12%;

    @include position.placement(fixed, $top, $right: app.$gap-inline);

    width: min(42rem, calc(100vw - app.$gap-inline * 2));
    height: 100% - $top * 2;

    .content, .canvas { @extend %any; }

    .content
    {
        @include font.content($line-height: 1.4);

        @extend %scroll-bar;

        overflow: clip auto;

        padding-right: 3rem;

        box-sizing: border-box;

        p
        {
            padding-block: 2rem;
        
            text-align: justify;

            span { margin-left: 2rem; }
        }

        p:nth-child(1) { color: $light; }

        p:not(:nth-child(1)) { color: $primary; }
    }

    .canvas
    {
        @include position.placement(absolute, 0, 0, 0, 0);

        pointer-events: none;
    }
}
</style>