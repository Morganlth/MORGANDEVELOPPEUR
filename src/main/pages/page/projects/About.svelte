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
class="about {$APP_$USER_AGENT} p-a00 d-fc- o-h-a s-any b-box"
style:--x="{prop_X}px"
style:--y="{prop_Y}px"
style:--w="{prop_W}px"
bind:this={about}
transition:transition_fade={{ duration: 200 }}
>
    <div
    class="sup p-rlt"
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
    class="global b-box"
    >
        {prop_GLOBAL}
    </p>

    <p
    class="this b-box"
    >
        {prop_THIS}
    </p>

    <canvas
    class="canvas p-a00 s-any p-n--"
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
    import { APP } from '../../../../App.svelte'

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
    const APP_$USER_AGENT = APP.app_$USER_AGENT

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
        canvas_setVars()
        canvas_setMatrix()
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
    $gap-border        : 1rem;
    $gap-center-element: 14%;


/* #\-THIS-\ */

.about
{
    &, .global, .this { @extend %scroll-bar; }

    @include font.text($font-size: map.get(font.$font-sizes, s3), $line-height: 1.2);

    gap: 2rem;

    padding: 8rem app.$gap-inline;

    text-align: justify;

    .sup, .global, .this { isolation: isolate; }

    .global, .this
    {
        min-width: max(10vw, 10vh);

        padding-inline: $gap-border;
    }
    
    .sup
    {
        #{--cell-size}: map.get(font.$font-sizes, s4);

        z-index: 1;
    
        min-height: var(--cell-size, fit-content);
    }

    .global { color: $light; }

    .this { color: $primary; }

    .canvas { transition: opacity .2s; }

    @include media.min($ms4, $ms4)
    {
        @include display.grid($width: (auto 1fr), $height: (auto 1fr auto));

        overflow-y: hidden;
    
        &.-webkit
        {
            .sup { transition: height .2s; }

            .global, .this { transition: width .2s; }
        }

        .sup
        {
            grid-column: 1 / 4; 

            height: var(--y, $gap-center-element);
        }

        .global, .this
        {
            grid-row: 2 / 3;

            overflow: hidden auto;
        }

        .global
        {
            width: var(--x, 50vw);

            padding-right: $gap-center-element;
        }

        .this
        {
            grid-column: 3 / 4;

            width: calc(100vw - var(--x, 50vw) - var(--w, 0));

            padding-left: $gap-center-element;
        }
    }
}


</style>