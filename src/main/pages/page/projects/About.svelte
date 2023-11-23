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
    >
        <div
        class="sup"
        >
            <Cell
            prop_FOCUS={true}
            prop_ICON_WRAPPER={true}
            prop_CENTER={true}
            prop_TITLE="fermer"
            on:click={cell_eClick}
            >
                <Icon
                prop_COLOR={COLORS.light}
                >
                    <Cross />
                </Icon>
            </Cell>
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
    style:opacity={canvas_OPACITY}
    bind:this={canvas}
    >
    </canvas>
</div>


<!-- #|-SCRIPT-| -->

<script>

// #\-IMPORTS-\

    // --DATA

    // --SVELTE
    import { onDestroy, onMount, createEventDispatcher } from 'svelte'

    // --LIB
    import COLORS              from '$lib/colors'
    import { wait_getDelay }   from '$lib/wait'
    import { transition_fade } from '$lib/transition'

    // --CONTEXTS

//=======@COMPONENTS|

    // --*
    import Cell from '../../../../global/covers/Cell.svelte'
    import Icon from '../../../../global/covers/Icon.svelte'

    import Cross from '../../../../global/icons/Cross.svelte'
    
//=======@STYLE|

    // --*


// #\-EXPORTS-\

    // --PROPS
    export let
    prop_ID = 0
    ,
    prop_GLOBAL = void '',
    prop_THIS   = void ''
    ,
    prop_X = 0,
    prop_Y = 0,
    prop_W = 0

    // --BINDING


// #\-CONSTANTES-\

    // --SVELTE
    const SVELTE_DISPATCH = createEventDispatcher()

    // --CONTEXTS

    // --OUTSIDE

    // --THIS

    // --INSIDE
    const
    CANVAS_SQUARE_SIZE = 40,
    CANVAS_DELAY       = wait_getDelay(6) // +- 100ms


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
    canvas_OPACITY = 1
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

    // --GET

    // --UPDATES

    // --DESTROY
    function about_destroy() { canvas_destroyTimeout() }

    function canvas_destroyTimeout() { clearTimeout(canvas_TIMEOUT) }


//=======@COMMANDS|

    // --*


//=======@EVENTS|

    // --*
    function cell_eClick() { SVELTE_DISPATCH('click', { id: prop_ID })}


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

        ++n < 10 ? canvas_TIMEOUT = setTimeout(() => canvas_a(n), CANVAS_DELAY) : canvas_OPACITY = 0
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
    $transition-duration: var(--about-transition-duration, 0ms);


/* #\-THIS-\ */

.about
{
    &, .content, .canvas { @extend %any-size; }

    &, .canvas { @include utils.placement(absolute, 0, 0, 0, 0); }

    padding: 8rem app.$gap-inline;

    box-sizing: border-box;

    .content
    {
        $gap-border:         1rem;
        $gap-center-element: 14%;

        &, .global, .this { @extend %scroll-bar; }
 
        @include font.text($font-size: map.get(font.$font-sizes, s3), $line-height: 1.2);

        @extend %f-column;

        gap: 2rem;

        overflow: clip auto;

        text-align: justify;

        .sup, .global, .this { isolation: isolate; }

        .sup
        {
            #{--cell-size}: map.get(font.$font-sizes, s4);
        
            min-height: var(--cell-size, fit-content);
        }

        .global, .this
        {
            min-width: max(10vw, 10vh);
    
            box-sizing: border-box;
        }

        .global
        {
            padding-inline: $gap-border $gap-center-element;

            color: $light;
        }
    
        .this
        {
            padding-inline: $gap-center-element $gap-border;

            color: $primary;
        }

        @include media.min($ms4, $ms4)
        {
            @include display.grid($width: (auto 1fr), $height: (auto 1fr auto));
        
            overflow-y: clip;

            .sup
            {
                grid-column: 1 / 4; 

                height: var(--y, $gap-center-element);

                transition: height $transition-duration;
            }

            .global, .this
            {
                grid-row: 2 / 3;

                overflow: clip auto;

                transition: width $transition-duration;
            }

            .global { width: var(--x, 50vw); }

            .this
            {
                grid-column: 3 / 4;

                width: calc(100vw - var(--x, 50vw) - var(--w, 0));
            }
        }
    }

    .canvas
    {
        pointer-events: none;

        transition: opacity .2s;
    }
}


</style>