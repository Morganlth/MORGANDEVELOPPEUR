<!-- #MAP

    TICTACTOE
        CELL * 9
            ICON

-->

<!-- #SCRIPT -->

<script>
// #IMPORTS

    // --LIB
    import COLORS from '$lib/colors'

    // --CONTEXT
    import { SPRING } from '../../App.svelte'

    // --ELEMENT-COVERS
    import Cell from '../covers/Cell.svelte'
    import Icon from '../covers/Icon.svelte'

    // --ELEMENT-ICONS
    import Circle from '../icons/Circle.svelte'
    import Cross from '../icons/Cross.svelte'

// #CONSTANTES

    // --ELEMENT-TICTACTOE
    const
    TICTACTOE_PLAYER = -1,
    TICTACTOE_AI = 1,
    TICTACTOE_BOARD =
    [
        0, 0, 0,
        0, 0, 0,
        0, 0, 0
    ],
    TICTACTOE_WINNING_MODELS =
    [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ]

// #VARIABLES

    // --ELEMENT-TICTACTOE
    let
    tictactoe_BORDER_COLOR = COLORS.light,
    tictactoe_SIMULATION = [],
    tictactoe_ROUND = 0,
    tictactoe_AI_ROUND = false

    // --ELEMENT-ICON
    let icon_OPACITY = 1

// #FUNCTIONS

    // --GET
    function tictactoe_getResult(emptyCells, depth)
    {
        const RESULT = tictactoe_isWinning()

        return (depth === 0 || RESULT || !emptyCells.length) ? RESULT : null
    }

    function tictactoe_getEmptyCells()
    {
        const EMPTYCELLS = []

        for (let i = 0; i < TICTACTOE_BOARD.length; i++)
            if (!TICTACTOE_BOARD[i]) EMPTYCELLS.push(i)

        return EMPTYCELLS
    }

    // --RESET
    function tictactoe_reset(result)
    {
        tictactoe_BORDER_COLOR = COLORS[result === TICTACTOE_PLAYER ? 'primary' : result === TICTACTOE_AI ? 'indicator' : 'light']

        setTimeout(() =>
        {
            icon_OPACITY = 0

            setTimeout(tictactoe_resetGame, 300)
        }, 250)
    }

    function tictactoe_resetGame()
    {
        for (let i = 0; i < TICTACTOE_BOARD.length; i++) TICTACTOE_BOARD[i] = 0

        icon_OPACITY = 1

        tictactoe_BORDER_COLOR = COLORS.light
        tictactoe_ROUND = 0
        tictactoe_AI_ROUND = false
    }

    // --EVENT
    function cell_eClick()
    {
        if (tictactoe_AI_ROUND || TICTACTOE_BOARD[this]) return

        tictactoe_AI_ROUND = true

        tictactoe_newRound(this, false)
    }

    // --UTILS
    function tictactoe_newRound(id, isAi)
    {
        tictactoe_ROUND++

        TICTACTOE_BOARD[id] = isAi ? TICTACTOE_AI : TICTACTOE_PLAYER
        tictactoe_SIMULATION = [...TICTACTOE_BOARD]

        const RESULT = tictactoe_getResult(tictactoe_getEmptyCells())

        RESULT !== null ? tictactoe_reset(RESULT) : isAi ? tictactoe_AI_ROUND = false : tictactoe_play()
    }

    function tictactoe_isWinning() /* return -1 || 0 || 1 */
    {
        for (const MODEL of TICTACTOE_WINNING_MODELS)
        {
            const
            [A, B, C] = MODEL,
            CELL = tictactoe_SIMULATION[A]

            if (CELL && CELL === tictactoe_SIMULATION[B] && CELL === tictactoe_SIMULATION[C]) return CELL
        }

        return 0
    }

    function tictactoe_play()
    {
        const
        EMPTYCELLS = tictactoe_getEmptyCells(),
        DEPTH = Math.round(Math.random()) + 2, /* changer la valeur pour augmenter ou diminuer la difficulté */
        ID = tictactoe_ROUND > -1 ? tictactoe_run(EMPTYCELLS, DEPTH, true, true) : EMPTYCELLS[Math.round(Math.random() * (EMPTYCELLS.length - 1))]

        tictactoe_newRound(ID, true)
    }

    function tictactoe_run(emptyCells, depth, maximizingPlayer, start)
    {
        let
        [value, currentPlayer, type] = maximizingPlayer ? [-Infinity, TICTACTOE_AI, 'max'] : [Infinity, TICTACTOE_PLAYER, 'min'],
        id = emptyCells[0]

        depth--

        for (const CELL of emptyCells)
        {
            tictactoe_SIMULATION[CELL] = currentPlayer

            const CURRENTVALUE = tictactoe_minimax(emptyCells.filter(c => c != CELL), depth, !maximizingPlayer)

            ;[value, id] = start && (value < CURRENTVALUE || (value === CURRENTVALUE && Math.round(Math.random())))
            ? [CURRENTVALUE, CELL]
            : [Math[type](CURRENTVALUE, value), id]

            tictactoe_SIMULATION[CELL] = 0
        }

        return start ? id : value
    }

    function tictactoe_minimax(emptyCells, depth, maximizingPlayer)
    {
        const RESULT = tictactoe_getResult(emptyCells, depth)
        
        return RESULT !== null ? RESULT * (1 + emptyCells.length) : tictactoe_run(emptyCells, depth, maximizingPlayer)
    }
</script>

<!-- #HTML -->

<!-- svelte-ignore a11y-no-static-element-interactions -->
<div
class="tictactoe"
style:--border-color={tictactoe_BORDER_COLOR}
on:mouseenter={SPRING.spring_e$Hide.bind(SPRING)}
on:mouseleave={SPRING.spring_e$Show.bind(SPRING)}
>
    {#each TICTACTOE_BOARD as cell, i (i)}
        <Cell
        on:click={cell_eClick.bind(i)}
        >
            <Icon
            prop_OPACITY={icon_OPACITY}
            prop_SPRING={false}
            prop_COLOR={cell === TICTACTOE_AI ? COLORS.indicator : COLORS.primary}
            >
                {#if cell === TICTACTOE_PLAYER}
                    <Circle />
                {:else if cell === TICTACTOE_AI}
                    <Cross />
                {/if}
            </Icon>
        </Cell>
    {/each}
</div>

<!-- #STYLE -->

<style
lang="scss"
>
/* #USES */

@use '../../assets/scss/styles/utils';
@use '../../assets/scss/styles/display';
@use '../../assets/scss/styles/size';
@use '../../assets/scss/styles/media';

/* #TICTACTOE */

.tictactoe
{
    --icon-size: 2.7rem;

    @include display.grid(calc(100% / 3), calc(100% / 3), 3, 3);

    position: absolute;
    right: 10%;
    bottom: 30%;

    width: 100px;
    height: 100px;

    :global
    {
        .cell
        {
            @extend %f-center;
            @extend %any;

            transition: border .4s;
        }
        .cell:nth-child(1)
        {
            @include utils.solid-border(var(--border-color, $light), 3px, true, false, false, true);
        }
        .cell:nth-child(2)
        {
            @include utils.solid-border($intermediate, 2px, false, true, true, true);
        }
        .cell:nth-child(3)
        {
            @include utils.solid-border(var(--border-color, $light), 3px, true, true, false, false);
        }
        .cell:nth-child(4)
        {
            @include utils.solid-border($intermediate, 2px, true, true, true, false);
        }
        .cell:nth-child(5)
        {
            @include utils.solid-border($intermediate, 2px, false, true, true, false);
        }
        .cell:nth-child(6)
        {
            @include utils.solid-border($intermediate, 2px, true, false, true, false);
        }
        .cell:nth-child(7)
        {
            @include utils.solid-border(var(--border-color, $light), 3px, false, false, true, true);
        }
        .cell:nth-child(8)
        {
            @include utils.solid-border($intermediate, 2px, false, true, false, true);
        }
        .cell:nth-child(9)
        {
            @include utils.solid-border(var(--border-color, $light), 3px, false, true, true, false);
        }
    }

    @include media.min(375px, 325px)
    {
        width: 140px;
        height: 140px;
    }
    @include media.min(425px, 768px)
    {
        width: 180px;
        height: 180px;
    }

    /* @include media.max(650px, 584px) { display: none; } */
}
</style>