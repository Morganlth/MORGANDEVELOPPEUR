<!----------------------------------------------- #||--snake--|| -->


<!-- #|-CONTEXT-| -->

<script
context="module"
>

// #\-IMPORTS-\

    // --SVELTE

     // --LIB

    // --JS


// #\-EXPORTS-\

    // --CONTEXTS
    export const SNAKE = { on: false, blocksize: 0, gameover: false }


</script>


<!-- #|-HTML-| -->

<div
class="snake"
class:game={snake_GAME}
style:--snake-blocksize="{snake_BLOCKSIZE}px"
style:z-index={snake_Z}
bind:this={snake}
on:fullscreenchange={snake_eFullscreenChange}
>
    <canvas
    class="canvas"
    style:width="{canvas_WIDTH}px"
    style:height="{canvas_HEIGHT}px"
    bind:this={canvas}
    >
    </canvas>

    {#if snake_GAME}
        <div
        class="grid"
        style:width="{canvas_WIDTH}px"
        style:height="{canvas_HEIGHT}px"
        >
        </div>

        {#if gameover_ON}
            <button
            class="gameover"
            type="button"
            on:click={gameover_eClick}
            >
                <pre>     -GAME</pre>
                <pre>OVER---   </pre>

                <span>{prop_SNAKE.gameoverInfo}</span>
            </button>
        {/if}

        <div
        class="frame"
        >
            <ul>
                <li
                class="score"
                >
                    SCORE
                    <span>{snake_SCORE}</span>
                </li>
                <li
                class="fps"
                >
                    FPS
                    <span>{$event_$FPS}</span>
                </li>
            </ul>
            
            <Cell
            prop_FOCUS={true}
            prop_ICON_WRAPPER={true}
            prop_CENTER={true}
            prop_TITLE="fermer"
            on:click={cell_eClick}
            >
                <Icon
                prop_COLOR={COLORS.light}
                prop_SPRING={false}
                >
                    <Cross />
                </Icon>
            </Cell>
        </div>
    {/if}
</div>


<!-- #|-SCRIPT-| -->

<script>

// #\-IMPORTS-\

    // --DATA

    // --SVELTE
    import { onMount, onDestroy } from 'svelte'

    // --LIB
    import COLORS, { color_rgba } from '$lib/colors'
    import { wait_getDelay }      from '$lib/wait'
    import { animation_interval } from '$lib/animation'

    // --CONTEXTS
    import { APP, COMMAND, EVENT } from '../../../../App.svelte'

//=======@COMPONENTS|

    // --*
    import Cell  from '../../../../global/covers/Cell.svelte'
    import Icon  from '../../../../global/covers/Icon.svelte'
    import Cross from '../../../../global/icons/Cross.svelte'
    
//=======@STYLE|

    // --*


// #\-EXPORTS-\

    // --PROPS
    export let
    prop_SNAKE = {}
    ,
    prop_ON = true
    ,
    prop_ID = void 0

    // --BINDING
    export let snake_GAME = false


// #\-CONSTANTES-\

    // --SVELTE

    // --CONTEXTS

    // --OUTSIDE

    // --THIS
    const
    SNAKE_DEFAULT_SIZE      = 10,
    SNAKE_DEFAULT_BLOCKSIZE = 40,
    SNAKE_DURATION          = wait_getDelay(24), // +- 400ms
    SNAKE_DELAY             = wait_getDelay(60)  // +- 1000ms
    ,
    SNAKE_APPLE = []
    ,
    SNAKE_COMMANDS =
    [
        {
            name           : 'snake_size',
            callback       : snake_c$Size,
            getCurrentValue: () => snake_BLOCKSIZE,
            params         : { defaultValue: SNAKE_DEFAULT_BLOCKSIZE, min: 20, max: 70 },
            tests          : { testNumber: true },
            desc           : { fr: 'Modifier la taille du serpent (p: [20; 70])', en: 'Adjust the size of the snake (p: [20; 70])' },
            storage        : true
        }
    ]
    ,
    SNAKE_EVENTS   = { resize: snake_e$Resize },
    SNAKE_EVENTS_2 =
    {
        mouseMove: snake_e$MouseMove,
        touchMove: snake_e$TouchMove
    }

    // --INSIDE


// #\-VARIABLES-\

    // --CONTEXTS
    let
    event_$FPS = EVENT.event_$FPS
    ,
    event_CLIENT_X = 0,
    event_CLIENT_Y = 0

    // --OUTSIDE
    let particles

    // --THIS
    let
    snake,
    snake_PARENT
    ,
    snake_CHARGED    = false,
    snake_INVINCIBLE = true
    ,
    snake_BLOCKSIZE = SNAKE_DEFAULT_BLOCKSIZE
    ,
    snake_Z = 0
    ,
    snake_COLOR_BODY  = color_rgba(COLORS.primary, .6),
    snake_COLOR_APPLE = color_rgba(COLORS.indicator, .8)
    ,
    snake_SNAKE = new Int8Array(SNAKE_DEFAULT_SIZE * 3) // x y hide
    ,
    snake_X = -1,
    snake_Y = -1
    ,
    snake_CUSTOM_BLOCKSIZE
    ,
    snake_SCORE = SNAKE_DEFAULT_SIZE
    ,
    snake_TIMEOUT
    ,
    snake_cancel = () => {}

    // --INSIDE
    let
    canvas
    ,
    canvas_CONTEXT
    ,
    canvas_WIDTH  = 0,
    canvas_HEIGHT = 0
    ,
    canvas_OFFSET_TOP  = 0,
    canvas_OFFSET_LEFT = 0
    ,
    canvas_COLUMNS,
    canvas_ROWS
    ,
    canvas_CLIENTRECT

    let gameover_ON = false


// #\-REATIVES-\

    // --CONTEXTS

    // --OUTSIDE

    // --THIS
    $: snake_startAndStop(prop_ON)
    $: snake_startAndStopGame(snake_GAME)

    // --INSIDE


// #\-FUNCTIONS-\

//=======@LIFE|

    // --SVELTE
    onMount(snake_set), onDestroy(snake_destroy)

    // --SET
    function snake_set()
    {
        snake_setVars()
        snake_setCommands()
        snake_setEvents()

        snake_setSnake()
        snake_setApple()

        canvas_setVars()

        snake_CHARGED = true
    }

    function snake_setVars()
    {
        const SIZE = snake_CUSTOM_BLOCKSIZE ?? (APP.app_$SMALL_SCREEN.value ? SNAKE_DEFAULT_BLOCKSIZE - 10 : SNAKE_DEFAULT_BLOCKSIZE)

        snake_PARENT ??= snake.parentElement

        SNAKE.blocksize = (snake_BLOCKSIZE = SIZE)
    }

    function snake_setCommands() { COMMAND.command_setCommands(SNAKE_COMMANDS) }

    function snake_setEvents() { EVENT.event_add(SNAKE_EVENTS) }

    function snake_setEvents2() { EVENT.event_add(SNAKE_EVENTS_2) }

    function snake_setSnake()
    {
        const CENTER_X = Math.floor(canvas_COLUMNS / 2)

        let y = 0
    
        for (let i = 0; i < snake_SNAKE.length; i += 3)
        {
            snake_SNAKE[i]     = CENTER_X
            snake_SNAKE[i + 1] = --y
            snake_SNAKE[i + 2] = 1
        }
    }

    function snake_setApple()
    {
        let [x, y] = snake_getRandomXY()

        for (let i = 0; i < snake_SNAKE.length; i += 3) if (snake_SNAKE[i] === x && snake_SNAKE[i + 1] === y) return snake_setApple()

        SNAKE_APPLE[0] = x
        SNAKE_APPLE[1] = y
    }

    function snake_setScore() { snake_SCORE = snake_SNAKE.length / 3 }

    function canvas_setVars()
    {
        const
        OFFSET_WIDTH  = snake.offsetWidth,
        OFFSET_HEIGHT = snake.offsetHeight,
        OVERFLOW      = snake_GAME ? -snake_BLOCKSIZE : snake_BLOCKSIZE
    
        canvas.width  = (canvas_WIDTH  = OFFSET_WIDTH  - OFFSET_WIDTH  % snake_BLOCKSIZE + OVERFLOW)
        canvas.height = (canvas_HEIGHT = OFFSET_HEIGHT - OFFSET_HEIGHT % snake_BLOCKSIZE + OVERFLOW)

        canvas_OFFSET_TOP  = (OFFSET_HEIGHT - canvas_HEIGHT) / 2
        canvas_OFFSET_LEFT = (OFFSET_WIDTH  - canvas_WIDTH)  / 2

        canvas_COLUMNS = canvas_WIDTH  / snake_BLOCKSIZE
        canvas_ROWS    = canvas_HEIGHT / snake_BLOCKSIZE

        canvas_CONTEXT = canvas_CONTEXT ?? canvas.getContext('2d')

        canvas_CLIENTRECT = canvas.getBoundingClientRect()
    }

    // --GET
    function snake_getRandomXY() { return [Math.floor(Math.random() * (canvas_COLUMNS - 2) + 1), Math.floor(Math.random() * (canvas_ROWS - 2) + 1)] }

    function snake_getModel(pre_X, pre_Y, current_X, current_Y, next_X, next_Y)
    {
        const
        X = Math.abs(current_X),
        Y = Math.abs(current_Y)
        
        return [pre_X && pre_Y ? snake_getPosition(pre_X, pre_Y, X, Y) : null, snake_getPosition(next_X, next_Y, X, Y)]
    }

    function snake_getPosition(x, y, current_X, current_Y)
    {
        const
        X = 1 + (Math.abs(x) - current_X),
        Y = 1 + (Math.abs(y) - current_Y)

        return X >= 3 || Y >= 3 ? 'a' : [['a', 'b', 'c'], ['d', 'e', 'f'], ['g', 'h', 'i']][Y][X]
    }

    function snake_getDimensions(model)
    {
        let [offset_X, offset_Y] = [1, 1]

        for (const _ of model)
            switch (_)
            {
                case 'a': offset_X = 0, offset_Y = 0 ;break
                case 'b':
                case 'c': offset_Y = 0               ;break
                case 'd':
                case 'g': offset_X = 0               ;break
                default :                            ;break
            }

        return [offset_X, offset_Y]
    }

    // --UPDATES
    function snake_update()
    {
        snake_setApple()

        if (!snake_INVINCIBLE) snake_updateSnake(snake_SNAKE.length + 3)
    }

    function snake_updateMove(x, y)
    {
        event_CLIENT_X = x
        event_CLIENT_Y = y

        snake_updateCoords()

        if (snake_testMove())
        {
            if (!snake_INVINCIBLE && snake_testOutside()) return gameover_update(true)

            if (snake_testEatenApple()) snake_update()

            snake_draw()
        }
    }

    function snake_updateCoords()
    {
        snake_X = Math.floor((event_CLIENT_X - canvas_OFFSET_LEFT) / snake_BLOCKSIZE)
        snake_Y = Math.floor((event_CLIENT_Y - canvas_OFFSET_TOP)  / snake_BLOCKSIZE)
    }

    function snake_updateSnake(length)
    {
        const TYPEDARRAY = new Int8Array(length)

        TYPEDARRAY.set(snake_SNAKE.slice(0, length))

        snake_SNAKE = TYPEDARRAY
        
        snake_setScore()
    }

    function gameover_update(value)
    {
        SNAKE.gameover = (gameover_ON = value)

        if (value)
        {
            snake_INVINCIBLE = true

            snake_stop()
        }
        else
        {
            snake_updateSnake(SNAKE_DEFAULT_SIZE * 3)
            snake_start()
        }
    }

    // --DESTROY
    function snake_destroy()
    {
        snake_cancel()
    
        snake_destroyEvents()
    }

    function snake_destroyEvents()
    {
        EVENT.event_remove(SNAKE_EVENTS)

        snake_destroyEvents2()
    }

    function snake_destroyEvents2() { EVENT.event_remove(SNAKE_EVENTS_2) }


//=======@COMMANDS|

    // --*
    function snake_c$Size(size)
    {
        snake_CUSTOM_BLOCKSIZE = size

        snake_e$Resize()
    }


//=======@EVENTS|

    // --*
    async function snake_e$MouseMove(clientX, clientY) { snake_updateMove(clientX, clientY) }

    async function snake_e$TouchMove(clientX, clientY) { snake_updateMove(clientX, clientY) }

    async function snake_e$Resize()
    {
        snake_setVars()
        snake_setApple()

        canvas_setVars()

        if (prop_ON || snake_GAME) snake_draw()
    }

    function snake_eFullscreenChange()
    {
        try 
        {
            const FULL_SCREEN_ELEMENT =
            document.fullscreenElement       ??
            document.webkitFullscreenElement ??
            document.mozFullScreenElement    ??
            document.msFullscreenElement     ??
            null

            if (!FULL_SCREEN_ELEMENT) snake_resetGame()
        }
        catch {}
    }

    function cell_eClick()
    {
        try 
        {
                 if (document.fullscreenElement)       document.exitFullscreen()
            else if (document.webkitFullscreenElement) document.webkitExitFullscreen()
            else if (document.mozFullScreenElement)    document.mozCancelFullScreen()
            else if (document.msFullscreenElement)     document.msExitFullscreen()
        }
        catch {}

        snake_resetGame()
    }

    function gameover_eClick()
    {
        gameover_update(false)

        snake_notInvincible()
    }


//=======@TRANSITIONS|

    // --*


//=======@ANIMATIONS|

    // --*
    function snake_a(invert = false)
    {
        if (!canvas_CONTEXT) return

        snake_cancel()

        const ACTION = (invert ? 'clear' : 'fill') + 'Rect'

        snake_cancel = animation_interval(i =>
        {
            const I = i * 3

            canvas_CONTEXT.fillStyle = i === 0 ? COLORS.primary : snake_COLOR_BODY
        
            canvas_CONTEXT[ACTION](snake_SNAKE[I] * snake_BLOCKSIZE, snake_SNAKE[I + 1] * snake_BLOCKSIZE, snake_BLOCKSIZE, snake_BLOCKSIZE)

            snake_SNAKE[I + 2] = invert ? 1 : 0
        },
        SNAKE_DURATION, snake_SCORE, invert ? snake_SCORE - 1 : 0, invert).cancel
    }


//=======@UTILS|

    // --*
    function snake_resetGame()
    {
        if (snake_Z && snake_PARENT instanceof HTMLElement) snake_PARENT.insertBefore(snake, snake_PARENT.firstElementChild ?? snake_PARENT.children[0])

        APP.app_$FREEZE = { value: false, target: prop_ID } 
    
        snake_GAME = false
        snake_Z    = 0
    }

    function snake_startAndStop(value)
    {
        SNAKE.on = value

        if (snake_CHARGED) value ? snake_start() : snake_stop()
    }

    function snake_start()
    {
        [event_CLIENT_X, event_CLIENT_Y] = EVENT.event_CLIENT_XY
    
        snake_setEvents2()
        snake_setApple()
        snake_updateCoords()
        snake_moveTo()
        snake_a()
    }

    function snake_stop()
    {
        snake_destroyEvents2()
        snake_clearApple()
        snake_a(true)
    }

    function snake_startAndStopGame(game) { if (snake_CHARGED) game ? snake_startGame() : snake_stopGame() }

    async function snake_startGame()
    {
        try
        {
            await (snake.requestFullscreen       ??
                   snake.webkitRequestFullscreen ??
                   snake.webkitEnterFullScreen   ??
                   snake.webkitEnterFullscreen   ??
                   snake.mozRequestFullScreen    ??
                   snake.msRequestFullscreen).call(snake)
        }
        catch
        {
            APP.app.appendChild(snake)

            snake_Z = 3 // header / footer / spring

            snake_e$Resize()
        }

        APP.app_$FREEZE = { value: true, target: prop_ID } 

        if (!prop_ON) snake_start()

        snake_notInvincible()

        ;(particles ??= document.querySelector('.particles'))?.moveTo(snake)
    }

    function snake_stopGame()
    {
        if (prop_ON)
        {
            if (gameover_ON) gameover_update(false)
        }
        else snake_stop()
        
        particles?.moveTo()

        snake_INVINCIBLE = true
    }

    function snake_testMove() { return snake_SNAKE[0] !== snake_X || snake_SNAKE[1] !== snake_Y }

    function snake_testEatenApple() { return snake_X === SNAKE_APPLE[0] && snake_Y === SNAKE_APPLE[1] }

    function snake_testOutside() { return snake_X < 0 || snake_X >= canvas_COLUMNS || snake_Y < 0 || snake_Y >= canvas_ROWS }

    function snake_testOverlay(x, y) { return x === snake_X && y === snake_Y  }

    function snake_draw()
    {
        const
        X = snake_SNAKE[0],
        Y = snake_SNAKE[1]

        let
        [gap_X, gap_Y] = [X - snake_X, Y - snake_Y],
        [add_X, add_Y] = [snake_X < X ? -1 : 1, snake_Y < Y ? -1 : 1],
        i              = 0

        while(i++ < 3)
        {
            if (gap_X !== 0) gap_X += add_X
            if (gap_Y !== 0) gap_Y += add_Y

            snake_clear()
            snake_drawApple()
            snake_drawSnake(snake_X + gap_X, snake_Y + gap_Y)

            if (gap_X === 0 && gap_Y === 0) break
        }
    }

    function snake_drawApple()
    {
        if (!snake_GAME) return
 
        const [X, Y, SIZE] = [SNAKE_APPLE[0] * snake_BLOCKSIZE + 1, SNAKE_APPLE[1] * snake_BLOCKSIZE + 1, snake_BLOCKSIZE - 2]
    
        canvas_CONTEXT.fillStyle = snake_COLOR_APPLE
        canvas_CONTEXT.fillRect(X, Y, SIZE, SIZE)
    }
    function snake_clearApple() { canvas_CONTEXT.clearRect(SNAKE_APPLE[0] * snake_BLOCKSIZE, SNAKE_APPLE[1] * snake_BLOCKSIZE, snake_BLOCKSIZE, snake_BLOCKSIZE) }

    function snake_drawSnake(x, y)
    {
        canvas_CONTEXT.fillStyle = snake_COLOR_BODY

        for (let i = snake_SNAKE.length - 3; i >= 3; i -= 3)
        {
            const
            X    = snake_SNAKE[i - 3],
            Y    = snake_SNAKE[i - 2],
            HIDE = snake_SNAKE[i - 1]
        
            snake_SNAKE[i]     = X
            snake_SNAKE[i + 1] = Y
            snake_SNAKE[i + 2] = HIDE

            if (HIDE) continue

            if (!snake_INVINCIBLE && snake_testOverlay(X, Y)) return gameover_update(true)

            snake_drawBody(X, Y, i, x, y)
        }

        snake_drawHead(x, y)
    }
    function snake_drawBody(current_X, current_Y, i, x, y)
    {
        const MODEL = snake_getModel(
            snake_SNAKE[i + 3]     , snake_SNAKE[i + 4],      // pre
            current_X              , current_Y,               // current
            snake_SNAKE[i - 6] ?? x, snake_SNAKE[i - 5] ?? y) // next
        
        const
        [OFFSET_X, OFFSET_Y] = snake_getDimensions(MODEL),
        X                    = current_X * snake_BLOCKSIZE + OFFSET_X,
        Y                    = current_Y * snake_BLOCKSIZE + OFFSET_Y

        canvas_CONTEXT.fillRect(X, Y, snake_BLOCKSIZE - OFFSET_X, snake_BLOCKSIZE - OFFSET_Y)
    }
    function snake_drawHead(x, y)
    {
        snake_SNAKE[0] = x
        snake_SNAKE[1] = y
    
        canvas_CONTEXT.fillStyle = COLORS.primary
        canvas_CONTEXT.fillRect(x * snake_BLOCKSIZE, y * snake_BLOCKSIZE, snake_BLOCKSIZE, snake_BLOCKSIZE)
    }

    function snake_clear() { canvas_CONTEXT.clearRect(0, 0, canvas_WIDTH, canvas_HEIGHT) }

    function snake_moveTo()
    {
        const
        DIF_X = snake_X - snake_SNAKE[0],
        DIF_Y = snake_Y - snake_SNAKE[1]

        for (let i = 0; i < snake_SNAKE.length; i += 3)
        {
            snake_SNAKE[i]     += DIF_X
            snake_SNAKE[i + 1] += DIF_Y
        }
    }

    function snake_notInvincible()
    {
        clearTimeout(snake_TIMEOUT)

        snake_TIMEOUT = setTimeout(() => snake_INVINCIBLE = false, SNAKE_DELAY)
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
    $blocksize: var(--snake-blocksize, '40px');


/* #\-THIS-\ */

.snake
{
    &, .gameover { @extend %any-size; }

    @include utils.placement(absolute, $top: 0, $left: 0);

    @extend %f-center;

    overflow: hidden;

    max-height: 100svh;

    &.game
    {
        background-color: $dark;

        pointer-events: auto;
    }

    .canvas, .grid { position: absolute; }

    .grid
    {
        pointer-events: none;

        background:
        repeating-linear-gradient($intermediate 0 1px, transparent 1px 100%),
        repeating-linear-gradient(90deg, $intermediate 0 1px, transparent 1px 100%);
        background-size: $blocksize $blocksize;

        border: solid $intermediate $blocksize;
    }

    .gameover
    {
        @include utils.placement(absolute, 0, 0, 0, 0);

        @extend %f-column-center;

        pre { @include font.h-(1, $light, .9, true); }

        span { @include font.text($color: $primary, $regular: false, $font-size: map.get(font.$font-sizes, s3), $line-height: 1.4); }
    }

    .frame
    {
        #{--cell-size}: calc($blocksize * .7);

        &, ul { display: flex; }

        @include utils.placement(absolute, $top: calc(app.$gap-block * 2), $right: 0, $left: 0);

        justify-content: space-between;

        height: fit-content;

        padding-inline: $blocksize;

        box-sizing: border-box;

        ul
        {
            gap: app.$gap-inline;

            .score, .fps
            {
                @include font.text($color: $light);

                span { font-family: font.$family-text-bold !important; }
            }
        }
    }
}


</style>