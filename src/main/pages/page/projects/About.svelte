<!----------------------------------------------- #||--about--|| -->


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


<!-- #|-SCRIPT-| -->

<script>

// #\-IMPORTS-\

    // --DATA

    // --SVELTE
    import { onDestroy, onMount } from 'svelte'

    // --LIB
    import COLORS              from '$lib/colors'
    import { wait_getDelay }   from '$lib/wait'
    import { transition_fade } from '$lib/transition'

    // --CONTEXTS
    import { EVENT } from '../../../../App.svelte'

//=======@COMPONENTS|

    // --*
    
//=======@STYLE|

    // --*


// #\-EXPORTS-\

    // --PROPS
    export let prop_CONTENT = []

    // --BINDING


// #\-CONSTANTES-\

    // --SVELTE

    // --CONTEXTS

    // --OUTSIDE

    // --THIS

    // --INSIDE
    const
    CANVAS_SQUARE_SIZE = 40,
    CANVAS_DELAY       = wait_getDelay(6) // +- 100ms
    ,
    CANVAS_EVENTS = { resize: canvas_e$Resize }


// #\-VARIABLES-\

    // --CONTEXTS

    // --OUTSIDE

    // --THIS
    let about

    // --INSIDE
    let
    canvas
    ,
    canvas_CONTEXT
    ,
    canvas_COLUMNS = 0,
    canvas_ROWS    = 0
    ,
    canvas_MATRIX
    ,
    canvas_TIMEOUT


// #\-REATIVES-\

    // --CONTEXTS

    // --OUTSIDE

    // --THIS

    // --INSIDE


// #\-FUNCTIONS-\

//=======@LIFE|

    // --SVELTE
    onMount(about_set), onDestroy(about_destroy)

    // --SET
    function about_set()
    {
        canvas_setVars()
        canvas_setMatrix()
        canvas_setEvents()
        canvas_drawBackground()
        canvas_a()
    }

    function canvas_setVars()
    {
        const
        WIDTH  = about.offsetWidth,
        HEIGHT = about.offsetHeight
    
        canvas.width  = WIDTH
        canvas.height = HEIGHT

        canvas_COLUMNS = Math.ceil(WIDTH / CANVAS_SQUARE_SIZE)
        canvas_ROWS    = Math.ceil(HEIGHT / CANVAS_SQUARE_SIZE)

        canvas_CONTEXT ??= canvas.getContext('2d')
    }

    function canvas_setMatrix()
    {
        canvas_MATRIX = new Int8Array(canvas_COLUMNS * canvas_ROWS)

        for (let i = 0; i < canvas_MATRIX.length; i++) canvas_MATRIX[i] = Math.floor(Math.random() * 10)
    }

    function canvas_setEvents() { EVENT.event_add(CANVAS_EVENTS) }

    // --GET

    // --UPDATES

    // --DESTROY
    function about_destroy()
    {
        canvas_destroyTimeout()
        canvas_destroyEvents()
    }

    function canvas_destroyTimeout() { clearTimeout(canvas_TIMEOUT) }

    function canvas_destroyEvents() { EVENT.event_remove(CANVAS_EVENTS) }


//=======@COMMANDS|

    // --*


//=======@EVENTS|

    // --*
    async function canvas_e$Resize()
    {
        canvas_setVars()
        canvas_setMatrix()
    }


//=======@TRANSITIONS|

    // --*


//=======@ANIMATIONS|

    // --*
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


//=======@UTILS|

    // --*
    function canvas_drawBackground()
    {
        canvas_CONTEXT.fillStyle = COLORS.dark
        canvas_CONTEXT.fillRect(0, 0, canvas.width, canvas.height)
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
    @use '../../../../assets/scss/app';

    /* --DEPENDENCIES */
    @use '../../../../assets/scss/styles/utils';
    @use '../../../../assets/scss/styles/display';
    @use '../../../../assets/scss/styles/font';

    /* --MEDIA */
    @use '../../../../assets/scss/styles/media';


/* #\-VARIABLES-\ */

    /* --* */
    $top: 14rem;


/* #\-THIS-\ */

.about
{
    @include utils.placement(fixed, $top, $right: app.$gap-inline);

    width:  calc(100% - app.$gap-inline * 2);
    height: calc(100% - $top);

    pointer-events: none;

    .content, .canvas { @extend %any-size; }

    .content
    {
        @include font.text($line-height: 1.4);

        @extend %scroll-bar;

        overflow: clip auto;

        padding-inline: 3rem;

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

    .canvas { @include utils.placement(absolute, 0, 0, 0, 0); }

    @include media.min($ms2)
    {
        width:  min(42rem, calc(100vw - app.$gap-inline * 2));
        height: calc(100% - $top * 2);
        
        .content { pointer-events: auto; }
    }
}


</style>