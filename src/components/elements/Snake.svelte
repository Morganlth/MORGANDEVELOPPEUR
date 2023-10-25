<!-- #MAP

-APP
-COMMAND
-EVENT
    SNAKE
        ?PARTICLES
        CANVAS
        ?GRID
        ?GAMEOVER
        ?FRAME
            SCRORE
            FPS
            CELL
                ICON
                    CROSS

-->

<!-- #SCRIPT -->

<script
context="module"
>
// #EXPORTS

    // --ELEMENT-SNAKE
    export const
    SNAKE_$ON = writable(true),

    SNAKE_$BLOCKSIZE = writable(40)

    // --ELEMENT-GAMEOVER
    export const GAMEOVER_$ON = writable(false)

// #IMPORT

    // --SVELTE
    import { writable } from 'svelte/store'
</script>

<script>
// #EXPORTS

    // --PROP
    export let prop_ON = true

    // --BIND
    export let snake_GAME = false

// #IMPORTS

    // --JS
    import { color_rgba } from '../../assets/js/utils/color'

    // --LIB
    import COLORS from '$lib/colors'
    import BREAKPOINTS from '$lib/breakpoints'

    // --CONTEXTS
    import { APP, COMMAND, EVENT } from '../../App.svelte'

    // --SVELTE
    import { onMount, onDestroy } from 'svelte'

    // --COMPONENT-COVERS
    import Cell from '../covers/Cell.svelte'
    import Icon from '../covers/Icon.svelte'

    // --COMPONENT-ICON
    import Cross from '../icons/Cross.svelte'

// #CONSTANTES

    // --ELEMENT-SNAKE
    const
    SNAKE_SIZE_NAME = 'snake_size',

    SNAKE_BLOCKSIZE = 40,

    SNAKE_SNAKE = [],
    SNAKE_APPLE = [],

    SNAKE_COMMANDS =
    [
        {
            name: SNAKE_SIZE_NAME,
            callback: snake_c$Size,
            params: { defaultValue: SNAKE_BLOCKSIZE, min: 20, max: 70 },
            tests: { testNumber: true },
            storage: true
        }
    ],

    SNAKE_EVENTS = { resize: snake_e$Resize },
    SNAKE_EVENTS_2 = { mouseMove: snake_e$MouseMove }

// #VARIABLES

    // --EVENT
    let
    event_$FPS = EVENT.event_$FPS,

    event_CLIENT_X = 0,
    event_CLIENT_Y = 0

    // --ELEMENT-PARTICLES
    let particles

    // --ELEMENT-SNAKE
    let
    snake,

    snake_CHARGED = false,

    snake_WIDTH = 0,
    snake_HEIGHT = 0,

    snake_OFFSET_TOP = 0,
    snake_OFFSET_LEFT = 0,

    snake_COLOR_BODY = color_rgba(COLORS.primary, .6),
    snake_COLOR_APPLE = color_rgba(COLORS.indicator, .8),

    snake_X = -1,
    snake_Y = -1,

    snake_CUSTOM_BLOCKSIZE,

    snake_INVINCIBLE = true,

    snake_SCORE = 10,

    snake_TIMEOUT,
    snake_FRAME_ID

    // --ELEMENT-CANVAS
    let
    canvas,
    canvas_CONTEXT,
    canvas_COLUMNS,
    canvas_ROWS,
    canvas_CLIENTRECT

// #REACTIVES

    // --ELEMENT-SNAKE
    $: snake_CHARGED ? snake_update(prop_ON) : void 0
    $: snake_GAME ? snake_startGame() : void 0

    $: snake$_BLOCKSIZE = $SNAKE_$BLOCKSIZE
    $: gameover$_ON = $GAMEOVER_$ON

// #FUNCTIONS

    // --SET
    function snake_set()
    {
        snake_setVars()
        snake_setCommands()
        snake_setEvents()

        snake_setSnake()
        snake_setApple()

        snake_CHARGED = true
    }

    function snake_setVars()
    {
        const
        [WIDTH, HEIGHT] = [snake.offsetWidth, snake.offsetHeight],
        SIZE = snake_CUSTOM_BLOCKSIZE ?? (APP.app_testScreen(BREAKPOINTS.ms4, BREAKPOINTS.ms4) ? SNAKE_BLOCKSIZE - 10 : SNAKE_BLOCKSIZE),
        OVERFLOW =  snake_GAME ? -SIZE : SIZE

        SNAKE_$BLOCKSIZE.set(SIZE)

        snake_WIDTH = WIDTH - WIDTH % SIZE + OVERFLOW
        snake_HEIGHT = HEIGHT - HEIGHT % SIZE + OVERFLOW

        snake_OFFSET_TOP = (HEIGHT - snake_HEIGHT) / 2
        snake_OFFSET_LEFT = (WIDTH - snake_WIDTH) / 2

        canvas_setVars(SIZE)
    }

    function snake_setCommands() { COMMAND.command_setBasicCommands(SNAKE_COMMANDS) }

    function snake_setEvents() { EVENT.event_add(SNAKE_EVENTS) }

    function snake_setEvents2() { EVENT.event_add(SNAKE_EVENTS_2) }

    function snake_setSnake()
    {
        const CENTER_X = Math.floor(canvas_COLUMNS / 2)
    
        for (let i = 0; i < snake_SCORE; i++) SNAKE_SNAKE.push([CENTER_X, -1 - i])
    }

    function snake_setApple()
    {
        let [x, y] = snake_getRandomXY()

        while (SNAKE_SNAKE.some(body => body[0] === x && body[1] === y)) [x, y] = snake_getRandomXY()

        SNAKE_APPLE[0] = x
        SNAKE_APPLE[1] = y
    }

    function snake_setScore() { snake_SCORE = SNAKE_SNAKE.length }

    function canvas_setVars(size)
    {
        canvas.width = snake_WIDTH
        canvas.height = snake_HEIGHT

        canvas_COLUMNS = snake_WIDTH / size
        canvas_ROWS = snake_HEIGHT / size

        canvas_CONTEXT = canvas_CONTEXT ?? canvas.getContext('2d')

        canvas_CLIENTRECT = canvas.getBoundingClientRect()
    }

    // --DESTROY
    function snake_destroy() { snake_destroyEvents() }

    function snake_destroyEvents()
    {
        EVENT.event_remove(SNAKE_EVENTS)

        snake_destroyEvents2()
    }

    function snake_destroyEvents2() { EVENT.event_remove(SNAKE_EVENTS_2) }

    // --GET
    function snake_getRandomXY() { return [Math.floor(Math.random() * (canvas_COLUMNS - 2) + 1), Math.floor(Math.random() * (canvas_ROWS - 2) + 1)] }

    function snake_getModel(pre, current, next)
    {
        const [X, Y] = [Math.abs(current[0]), Math.abs(current[1])]
        
        return [pre ? snake_getPosition(pre, X, Y) : null, snake_getPosition(next, X, Y)]
    }

    function snake_getPosition(body, x, y)
    {
        try { return [['a', 'b', 'c'], ['d', 'e', 'f'], ['g', 'h', 'i']][1 + (Math.abs(body[1]) - y)][1 + (Math.abs(body[0]) - x)] }
        catch { return 'a' } // if gap > 3 err
    }

    function snake_getDimensions(model)
    {
        let [offset_X, offset_Y] = [1, 1]

        for (const M of model)
            switch (M)
            {
                case 'a':
                    offset_X = 0
                    offset_Y = 0
                    break
                case 'b':
                case 'c':
                    offset_Y = 0
                    break
                case 'd':
                case 'g':
                    offset_X = 0
                    break
                default:
                    break
            }

        return [offset_X, offset_Y]
    }

    // --UPDATES
    function snake_update(on)
    {
        SNAKE_$ON.set(on)

        on ? snake_start() : snake_stop()
    }

    function snake_update2()
    {
        snake_setApple()

        if (!snake_INVINCIBLE)
        {
            SNAKE_SNAKE.push([])
            
            snake_setScore()
        }
    }

    function snake_updateCoords()
    {
        snake_X = Math.floor((event_CLIENT_X - snake_OFFSET_LEFT) / snake$_BLOCKSIZE)
        snake_Y = Math.floor((event_CLIENT_Y - snake_OFFSET_TOP) / snake$_BLOCKSIZE)
    }

    function snake_updateSize(size)
    {
        snake_CUSTOM_BLOCKSIZE = size

        snake_e$Resize()
    }

    function snake_updateApple(tool)
    {
        canvas_CONTEXT.clearRect(SNAKE_APPLE[0] * snake$_BLOCKSIZE, SNAKE_APPLE[1] * snake$_BLOCKSIZE, snake$_BLOCKSIZE, snake$_BLOCKSIZE)

        if (tool === 'fillRect')
        {
            snake_setApple()
            snake_drawApple()
        }
    }

    function gameover_update(on)
    {
        GAMEOVER_$ON.set(on)

        if (on)
        {
            snake_INVINCIBLE = true

            snake_stop()
        }
        else
        {
            snake_resetScore()
            snake_start()
        }
    }

    // --RESET
    function snake_resetScore()
    {
        SNAKE_SNAKE.length = 10
    
        snake_setScore()
    }

    // --COMMAND
    function snake_c$Size(size) { COMMAND.command_test(size, 'number', snake_updateSize, SNAKE_SIZE_NAME, snake$_BLOCKSIZE) }

    // --EVENTS
    async function snake_e$MouseMove(clientX, clientY)
    {
        [event_CLIENT_X, event_CLIENT_Y] = [clientX, clientY]

        snake_updateCoords()

        if (snake_testMove()) snake_draw()
    }

    async function snake_e$Resize()
    {
        snake_setVars()
        snake_setApple()

        if (prop_ON || snake_GAME) snake_draw()
    }

    function snake_eFullscreenChange() { if (!document.fullscreenElement) snake_stopGame() }

    function canvas_eMouseLeave(e)
    {
        const TARGET = e.relatedTarget

        if (!TARGET || TARGET.classList.contains('snake')) gameover_update(true)
    }

    function cell_eClick() { document.exitFullscreen() }

    function gameover_eClick()
    {
        gameover_update(false)

        snake_notInvincible()
    }

    // --ANIMATION
    function snake_a(tool)
    {
        cancelAnimationFrame(snake_FRAME_ID)

        let
        last = +new Date(),
        i = SNAKE_SNAKE.length - 1
    
        canvas_CONTEXT.fillStyle = snake_COLOR_BODY

        ;(function frame()
        {
            const NOW = +new Date()
        
            if (NOW > last + 16.67)
            {
                const BODY = SNAKE_SNAKE[i]
    
                last = NOW
        
                canvas_CONTEXT[tool](BODY[0] * snake$_BLOCKSIZE, BODY[1] * snake$_BLOCKSIZE, snake$_BLOCKSIZE, snake$_BLOCKSIZE)
            
                if (--i < 0) return snake_updateApple(tool)
                else if (i === 0) canvas_CONTEXT.fillStyle = COLORS.primary
            }

            snake_FRAME_ID = requestAnimationFrame(frame)
        })()
    }

    // --CONTROLS
    function snake_start()
    {
        snake_setEvents2()

        if (SNAKE_SNAKE.length)
        {
            [event_CLIENT_X, event_CLIENT_Y] = EVENT.event_CLIENT_XY
    
            snake_updateCoords()
            snake_moveTo()
        }
    }

    function snake_stop()
    {
        snake_destroyEvents2()

        snake_a('clearRect')
    }

    async function snake_startGame()
    {
        try
        {
            await snake.requestFullscreen()

            if (!prop_ON) snake_start()

            snake_notInvincible()

            ;(particles ??= document.querySelector('.particles')).moveTo(snake)
        }
        catch { snake_stopGame() }
    }

    function snake_stopGame()
    {
        if (!prop_ON) snake_stop()
        
        particles?.moveTo()

        snake_GAME = false
        snake_INVINCIBLE = true

        gameover$_ON
        ? gameover_update(false)
        : prop_ON
            ? snake_moveTo()
            : void 0
    }

    // --TESTS
    function snake_testMove() { return SNAKE_SNAKE[0][0] !== snake_X || SNAKE_SNAKE[0][1] !== snake_Y }

    function snake_testEatenApple(x, y) { if (x === SNAKE_APPLE[0] && y === SNAKE_APPLE[1]) snake_update2() }

    function snake_testOverlay([x, y]) { if (!snake_INVINCIBLE && x === snake_X && y === snake_Y) gameover_update(true) }

    // --DRAW
    function snake_draw()
    {
        const [X, Y] = SNAKE_SNAKE[0]

        let
        [gap_X, gap_Y] = [X - snake_X, Y - snake_Y],
        [add_X, add_Y] = [snake_X < X ? -1 : 1, snake_Y < Y ? -1 : 1],
        i = 0

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
 
        const [X, Y, SIZE] = [SNAKE_APPLE[0] * snake$_BLOCKSIZE + 1, SNAKE_APPLE[1] * snake$_BLOCKSIZE + 1, snake$_BLOCKSIZE - 2]
    
        canvas_CONTEXT.fillStyle = snake_COLOR_APPLE
        canvas_CONTEXT.fillRect(X, Y, SIZE, SIZE)
    }

    function snake_drawSnake(x, y)
    {
        canvas_CONTEXT.fillStyle = snake_COLOR_BODY

        for (let i = snake_SCORE - 1; i > 0; i--)
        {
            const BODY = SNAKE_SNAKE[i-1]

            SNAKE_SNAKE[i] = BODY

            snake_testOverlay(BODY)
            snake_drawBody(BODY, i, x, y)
        }

        snake_drawHead(x, y)
    }
    function snake_drawBody(body, i, x, y)
    {
        const
        MODEL = snake_getModel(SNAKE_SNAKE[i + 1], body, SNAKE_SNAKE[i - 2] ?? [x, y]),
        [OFFSET_X, OFFSET_Y] = snake_getDimensions(MODEL),
        [X, Y] = [body[0] * snake$_BLOCKSIZE + OFFSET_X, body[1] * snake$_BLOCKSIZE + OFFSET_Y]

        canvas_CONTEXT.fillRect(X, Y, snake$_BLOCKSIZE - OFFSET_X, snake$_BLOCKSIZE - OFFSET_Y)
    }
    function snake_drawHead(x, y)
    {
        snake_testEatenApple(x, y)

        SNAKE_SNAKE[0] = [x, y]
    
        canvas_CONTEXT.fillStyle = COLORS.primary
        canvas_CONTEXT.fillRect(x * snake$_BLOCKSIZE, y * snake$_BLOCKSIZE, snake$_BLOCKSIZE, snake$_BLOCKSIZE)
    }

    // --CLEAR
    function snake_clear() { canvas_CONTEXT.clearRect(0, 0, snake_WIDTH, snake_HEIGHT) }

    // --UTILS
    function snake_moveTo()
    {
        if (!SNAKE_SNAKE.length) return

        const [GAPX, GAPY] = [snake_X - SNAKE_SNAKE[0][0], snake_Y - SNAKE_SNAKE[0][1]]

        for (let i = 0; i < SNAKE_SNAKE.length; i++)
        {
            const BODY = SNAKE_SNAKE[i]

            BODY[0] += GAPX
            BODY[1] += GAPY
        }

        snake_a('fillRect')
    }

    function snake_notInvincible()
    {
        clearTimeout(snake_TIMEOUT)

        snake_TIMEOUT = setTimeout(() => snake_INVINCIBLE = false, 1000)
    }

// #CYCLES

onMount(snake_set)
onDestroy(snake_destroy)
</script>

<!-- #HTML -->

<div
class="snake"
class:game={snake_GAME}
style:--snake-blocksize="{snake$_BLOCKSIZE}px"
bind:this={snake}
on:fullscreenchange={snake_eFullscreenChange}
>
    <canvas
    style:width="{snake_WIDTH}px"
    style:height="{snake_HEIGHT}px"
    bind:this={canvas}
    on:mouseleave={canvas_eMouseLeave}
    >
    </canvas>

    {#if snake_GAME}
        <div
        class="grid"
        style:width="{snake_WIDTH}px"
        style:height="{snake_HEIGHT}px"
        >
        </div>

        {#if gameover$_ON}
            <button
            class="gameover"
            type="button"
            on:click={gameover_eClick}
            >
                <pre>     -GAME</pre>
                <pre>OVER---   </pre>

                <span>CLICK pour REJOUER</span>
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
            prop_CONTAINER={true}
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

<!-- #STYLE -->

<style
lang="scss"
>
/* #USES */

@use 'sass:map';

@use '../../assets/scss/app';

@use '../../assets/scss/styles/elements';
@use '../../assets/scss/styles/utils';
@use '../../assets/scss/styles/position';
@use '../../assets/scss/styles/display';
@use '../../assets/scss/styles/size';
@use '../../assets/scss/styles/font';

/* #SNAKE */

.snake
{
    $blocksize: var(--snake-blocksize, '40px');

    &, .gameover { @extend %any; }

    @extend %f-center;

    &, canvas { position: absolute; }

    &.game
    {
        background-color: $dark;

        canvas, .gameover { pointer-events: auto; }
    }

    .grid
    {
        position: absolute;

        background:
        repeating-linear-gradient($intermediate 0 1px, transparent 1px 100%),
        repeating-linear-gradient(90deg, $intermediate 0 1px, transparent 1px 100%);
        background-size: $blocksize $blocksize;

        border: solid $intermediate $blocksize;
    }

    .gameover
    {
        @include position.placement(absolute, 0, 0, 0, 0);

        @extend %button-reset;
        @extend %f-center;

        flex-direction: column;

        pre
        {
            @include font.h-custom($light);
            
            @extend %m-h-1;

            font-style: italic;
        }
        span { @include font.content($primary, false, map.get(font.$font-sizes, s3), 1.4); }
    }

    .frame
    {
        #{--cell-size}: calc($blocksize * .7);

        @include position.placement(absolute, $top: calc(app.$gap-block * 2), $right: 0, $left: 0);
    
        display: flex;
        justify-content: space-between;

        height: fit-content;

        padding-inline: $blocksize;

        box-sizing: border-box;

        ul
        {
            display: flex;

            gap: app.$gap-inline;

            .score, .fps
            {
                @include font.content($light);

                span { font-family: font.$family-content-bold !important; }
            }
        }
    }
}
</style>