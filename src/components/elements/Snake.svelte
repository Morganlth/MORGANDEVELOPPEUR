<!-- #MAP

-APP
-COMMAND
-EVENT
    SNAKE
        CANVAS

-->

<!-- #SCRIPT -->

<script>
// #EXPORT

    // --PROP
    export let prop_FOCUS = false

// #IMPORTS

    // --JS
    import { color_rgba } from '../../assets/js/utils/color'

    // --LIB
    import COLORS from '$lib/colors'

    // --CONTEXTS
    import { APP, COMMAND, EVENT } from '../../App.svelte'

    // --SVELTE
    import { onMount, onDestroy } from 'svelte'

// #CONSTANTES

    // --ELEMENT-SNAKE
    const
    SNAKE_SNAKE = [],
    SNAKE_APPLE = [],
    SNAKE_EVENTS =
    {
        scroll: snake_e$Scroll,
        mouseMove: snake_e$MouseMove,
        resize: snake_e$Resize
    }

// #VARIABLES

    // --APP
    let app_$FREEZE = APP.app_$FREEZE

    // --EVENT
    let
    event_CLIENT_X,
    event_CLIENT_Y

    // --ELEMENT-SNAKE
    let
    snake_WIDTH = 0,
    snake_HEIGHT = 0,
    snake_OFFSET_TOP = 0,
    snake_OFFSET_LEFT = 0,
    snake_COLOR = color_rgba(COLORS.primary, .6),
    snake_X = -1,
    snake_Y = -1,
    snake_BLOCKSIZE = 40,
    snake_SCOPE = false, // true si snake head est à l'intérieur
    snake_OUTSIDE = true, // true si snake est entièrement à l'exterieur
    snake_SCORE = 10,
    snake_TAIL

    // --ELEMENT-CANVAS
    let
    canvas,
    canvas_CONTEXT,
    canvas_COLUMNS,
    canvas_ROWS,
    canvas_CLIENTRECT

// #REACTIVE

    $: snake$_INVINCIBLE = $app_$FREEZE || prop_FOCUS

// #FUNCTIONS

    // --SET
    function snake_set()
    {
        snake_setVars()
        snake_setCommands()
        snake_setEvents()

        canvas_setVars()

        snake_setSnake()
        snake_setApple()
    }

    function snake_setVars()
    {
        const [WIDTH, HEIGHT] = [window.innerWidth, window.innerHeight]

        snake_WIDTH = WIDTH - (WIDTH - 1) % snake_BLOCKSIZE
        snake_HEIGHT = HEIGHT - (HEIGHT - 1) % snake_BLOCKSIZE

        snake_OFFSET_TOP = (HEIGHT - snake_HEIGHT) / 2
        snake_OFFSET_LEFT = (WIDTH - snake_WIDTH) / 2
    }

    function snake_setCommands()
    {
        COMMAND.command_setBasicCommand(
            'snake_size',
            snake_c$Size,
            { defaultValue: 40, min: 10, max: 70 },
            { testBoolean: true, testNumber: true },
            true
        )
    }

    function snake_setEvents() { EVENT.event_add(SNAKE_EVENTS) }

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

    function canvas_setVars()
    {
        canvas.width = snake_WIDTH
        canvas.height = snake_HEIGHT

        canvas_COLUMNS = snake_WIDTH / snake_BLOCKSIZE
        canvas_ROWS = snake_HEIGHT / snake_BLOCKSIZE

        canvas_CONTEXT = canvas_CONTEXT ?? canvas.getContext('2d')

        canvas_setClientRect()
    }
    function canvas_setClientRect() { canvas_CLIENTRECT = canvas.getBoundingClientRect() }

    // --GET
    function snake_getRandomXY() { return [Math.floor(Math.random() * (canvas_COLUMNS - 2) + 1), Math.floor(Math.random() * (canvas_ROWS - 2) + 1)] }

    function snake_getModel(pre, current, next)
    {
        const [X, Y] = [Math.abs(current[0]), Math.abs(current[1])]
        
        return [pre ? snake_getPosition(pre, X, Y) : null, snake_getPosition(next, X, Y)]
    }

    function snake_getPosition(body, x, y) { return [['a', 'b', 'c'], ['d', 'e', 'f'], ['g', 'h', 'i']][1 + (Math.abs(body[1]) - y)][1 + (Math.abs(body[0]) - x)] }

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

    // --RESET
    function snake_reset()
    {
        snake_setVars()

        canvas_setVars()
    
        snake_setApple()
    }

    // --UPDATE
    function snake_update()
    {
        snake_setApple()

        if (!snake$_INVINCIBLE)
        {
            const [TAIL_X, TAIL_Y] = SNAKE_SNAKE[snake_SCORE - 1]

            snake_TAIL = [TAIL_X * snake_BLOCKSIZE, TAIL_Y * snake_BLOCKSIZE]

            SNAKE_SNAKE.push([])
            
            snake_setScore()
        }
    }

    function snake_updateCoords()
    {
        snake_X = Math.floor((event_CLIENT_X - snake_OFFSET_LEFT) / snake_BLOCKSIZE)
        snake_Y = Math.floor((event_CLIENT_Y - snake_OFFSET_TOP) / snake_BLOCKSIZE)

        snake_SCOPE = snake_X >= 0 && snake_X < canvas_COLUMNS - 1 && snake_Y >= 0 && snake_Y < canvas_ROWS - 1
    }

    // --DESTROY
    function snake_destroy() { snake_destroyEvents() }

    function snake_destroyEvents() { EVENT.event_remove(SNAKE_EVENTS) }

    // --COMMAND
    function snake_c$Size(size)
    {
        snake_BLOCKSIZE = size

        snake_reset()
    }

    // --EVENTS
    async function snake_e$Scroll() { snake_move() }

    async function snake_e$MouseMove(clientX, clientY)
    {
        [event_CLIENT_X, event_CLIENT_Y] = [clientX, clientY]

        snake_move()
    }

    async function snake_e$Resize() { snake_reset() }

    // --TESTS
    function snake_test()
    {
        if (SNAKE_SNAKE[0][0] !== snake_X || SNAKE_SNAKE[0][1] !== snake_Y)
        {
            if (snake_SCOPE) snake_OUTSIDE = false
            else if (snake_OUTSIDE || snake_testOutside()) return false

            return true
        }
        else return false
    }

    function snake_testOutside()
    {
        snake_OUTSIDE = !SNAKE_SNAKE.some(body =>
        {
            const [X, Y] = body

            return X >= 0 && X < canvas_COLUMNS && Y >= 0 && Y < canvas_ROWS
        })

        return snake_OUTSIDE
    }

    function snake_testEatenApple(x, y) { if (x === SNAKE_APPLE[0] && y === SNAKE_APPLE[1]) snake_update() }

    function snake_testBody([x, y])
    {
        if (!snake$_INVINCIBLE && snake_SCOPE && x === snake_X && y === snake_Y)
        {   
            SNAKE_SNAKE.pop()
    
            snake_setScore()
        }
    }

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
        canvas_CONTEXT.fillStyle = COLORS.indicator
        canvas_CONTEXT.fillRect(SNAKE_APPLE[0] * snake_BLOCKSIZE, SNAKE_APPLE[1] * snake_BLOCKSIZE, snake_BLOCKSIZE, snake_BLOCKSIZE)
    }

    function snake_drawSnake(x, y)
    {
        canvas_CONTEXT.fillStyle = snake_COLOR

        for (let i = snake_SCORE - 1; i > 0; i--)
        {
            const BODY = SNAKE_SNAKE[i-1]

            SNAKE_SNAKE[i] = BODY

            snake_testBody(BODY)
            snake_drawBody(BODY, i, x, y)
        }

        snake_drawHead(x, y)
    }
    function snake_drawBody(body, i, x, y)
    {
        const
        MODEL = snake_getModel(SNAKE_SNAKE[i + 1], body, SNAKE_SNAKE[i - 2] ?? [x, y]),
        [OFFSET_X, OFFSET_Y] = snake_getDimensions(MODEL),
        [X, Y] = [body[0] * snake_BLOCKSIZE + OFFSET_X, body[1] * snake_BLOCKSIZE + OFFSET_Y]

        canvas_CONTEXT.fillRect(X, Y, snake_BLOCKSIZE - OFFSET_X, snake_BLOCKSIZE - OFFSET_Y)
    }
    function snake_drawHead(x, y)
    {
        snake_testEatenApple(x, y)

        SNAKE_SNAKE[0] = [x, y]
    
        canvas_CONTEXT.fillStyle = COLORS.primary
        canvas_CONTEXT.fillRect(x * snake_BLOCKSIZE, y * snake_BLOCKSIZE, snake_BLOCKSIZE, snake_BLOCKSIZE)
    }

    // --CLEAR
    function snake_clear() { canvas_CONTEXT.clearRect(0, 0, snake_WIDTH, snake_HEIGHT) }

    // --UTILS
    function snake_move()
    {
        snake_updateCoords()

        if (snake_test()) snake_draw()
    }

// #CYCLES

onMount(snake_set)
onDestroy(snake_destroy)
</script>

<!-- #HTML -->

<!-- svelte-ignore a11y-no-static-element-interactions -->
<div
class="snake"
style:width="{snake_WIDTH}px"
style:height="{snake_HEIGHT}px"
style:margin="{snake_OFFSET_TOP}px {snake_OFFSET_LEFT}px"
>
    <canvas
    bind:this={canvas}
    >
    </canvas>
</div>

<!-- #STYLE -->

<style
lang="scss"
>
/* #USES */

@use '../../assets/scss/styles/position';
@use '../../assets/scss/styles/size';

/* #SNAKE */

.snake
{
    @include position.placement(absolute, 0, 0, auto, 0);

    canvas
    {
        @extend %any;

        pointer-events: none;
    }
}
</style>