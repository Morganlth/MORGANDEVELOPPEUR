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
style:--about-transition-duration="{about_TRANSITION_DURATION}ms"
bind:this={about}
transition:transition_fade={{ duration: 200 }}
>
    <div
    class="content"
    style:--x="{prop_X}px"
    style:--y="{prop_Y}px"
    style:--w="{prop_W}px"
    style:--h="{prop_H}px"
    >
        <div
        class="void"
        >
        </div>

        <p
        class="global"
        >
            {prop_GLOBAL}
        </p>

        <p
        class="this"
        >
            {prop_THIS}
        </p>
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
    export let
    prop_GLOBAL = void '',
    prop_THIS   = void ''
    ,
    prop_X = 0,
    prop_Y = 0,
    prop_W = 0,
    prop_H = 0

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
    let
    about
    ,
    about_TRANSITION_DURATION = 0

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
        about_setVars()
    
        canvas_setVars()
        canvas_setMatrix()
        canvas_setEvents()
        canvas_drawBackground()
        canvas_a()
    }

    function about_setVars() { about_TRANSITION_DURATION = navigator.userAgent.match(/(Chrome|Safari|Edg)/i) ? 200 : 0 }

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


/* #\-VARIABLES-\ */

    /* --* */
    $transition-duration: var(--about-transition-duration, 0ms);


/* #\-THIS-\ */

.about
{
    &, .content, .canvas { @extend %any-size; }

    &, .canvas { @include utils.placement(absolute, 0, 0, 0, 0); }

    .content
    {
        $gap-border:         1rem;
        $gap-center-element: 14%;
 
        @include display.grid($width: (auto 1fr), $height: (auto 1fr auto));
        @include font.text($line-height: 1.4);

        padding: 6rem app.$gap-inline;

        box-sizing: border-box;

        text-align: justify;

        .void, .global, .this { isolation: isolate; }

        .void
        {
            grid-column: 1 / 4; 

            height: var(--y);

            transition: height $transition-duration;
        }

        .global, .this
        {
            @extend %scroll-bar;

            grid-row: 2 / 3;

            overflow: clip auto;

            box-sizing: border-box;

            transition: width $transition-duration;
        }

        .global
        {
            width: var(--x);

            padding-inline: $gap-border $gap-center-element;

            color: $light;
        }
    
        .this
        {
            grid-column: 3 / 4;
        
            width: calc(100vw - var(--x) - var(--w));

            padding-inline: $gap-center-element $gap-border;

            color: $primary;
        }
    }

    .canvas { pointer-events: none; }
}


</style>