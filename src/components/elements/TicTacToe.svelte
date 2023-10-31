<!-- #MAP

-SPRING
    TICTACTOE
        CELL * 9
            ICON
                CIRCLE | CROSS

-->

<!-- #SCRIPT -->

<script>
// #EXPORT

    // --PROP
    export let prop_ON = false

// #IMPORTS

    // --JS
    import { color_rgba } from '../../assets/js/utils/color'

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
    TICTACTOE_AI = 1
,
    TICTACTOE_DEFAULT_COLOR = color_rgba(COLORS.light, .4)
,
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
    tictactoe_BORDER_COLOR = TICTACTOE_DEFAULT_COLOR,

    tictactoe_SIMULATION = [],

    tictactoe_ROUND = 0,
    tictactoe_AI_ROUND = false

    // --ELEMENT-ICON
    let icon_OPACITY = 1

// #FUNCTIONS

    // --GET
    function tictactoe_getWinner(emptyCells, depth)
    {
        const WINNER = tictactoe_isWinning()

        return (depth === 0 || WINNER || !emptyCells.length) ? WINNER : null
    }

    function tictactoe_getEmptyCells()
    {
        const EMPTYCELLS = []

        for (let i = 0; i < TICTACTOE_BOARD.length; i++)
            if (!TICTACTOE_BOARD[i]) EMPTYCELLS.push(i)

        return EMPTYCELLS
    }

    // --RESET
    function tictactoe_reset(winner)
    {
        tictactoe_BORDER_COLOR = COLORS
        [
            winner === TICTACTOE_PLAYER
            ? 'primary'
            : winner === TICTACTOE_AI ? 'indicator' : 'light'
        ]

        setTimeout(() =>
        {
            icon_OPACITY = 0

            setTimeout(tictactoe_resetGame, 300)
        }, 200)
    }

    function tictactoe_resetGame()
    {
        for (let i = 0; i < TICTACTOE_BOARD.length; i++) TICTACTOE_BOARD[i] = 0

        icon_OPACITY = 1

        tictactoe_BORDER_COLOR = TICTACTOE_DEFAULT_COLOR
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

        const WINNER = tictactoe_getWinner(tictactoe_getEmptyCells())

        WINNER != null ? tictactoe_reset(WINNER) : isAi ? tictactoe_AI_ROUND = false : tictactoe_play()
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
        const WINNER = tictactoe_getWinner(emptyCells, depth)
        
        return WINNER != null ? WINNER * (1 + emptyCells.length) : tictactoe_run(emptyCells, depth, maximizingPlayer)
    }
</script>

<!-- #HTML -->

{#if prop_ON}
    <!-- svelte-ignore a11y-no-static-element-interactions -->
    <div
    class="tictactoe"
    style:--pe-border-color={tictactoe_BORDER_COLOR}
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
{/if}

<!-- #STYLE -->

<style
lang="scss"
>
/* #USES */

@use '../../assets/scss/styles/utils';
@use '../../assets/scss/styles/position';
@use '../../assets/scss/styles/display';

/* #TICTACTOE */

.tictactoe
{
    $size: max(15vw, 15vh);

    $pe-color: var(--pe-border-color, rgba($light, .4));

    $cell-size: calc(100% / 3);

    --icon-size: 50%;

    &::before, &::after
    {
        opacity: 0;

        transition: border-color .4s;

        animation: aPe-intro .4s ease-out forwards;
    }

    &::before
    {
        --pe-translate: translate(-50%, -100%);
    
        @include utils.solid-border($pe-color, 1px, $top: false, $bottom: false);
        @include position.placement(absolute, $top: 100%, $left: 50%, $pseudo-element: true);

        transform: translateX(-50%);

        width: $cell-size;
        height: 100%;
    }

    @include position.placement(absolute, $top: 46%, $left: 46%);
    @include display.grid($cell-size, $cell-size, 3, 3);

    width: $size;
    height: $size;

    :global .cell { @extend %f-center; }

    &::after
    {
        --pe-translate: translate(-100%, -50%);

        @include utils.solid-border($pe-color, 1px, $right: false, $left: false);
        @include position.placement(absolute, $top: 50%, $left: 100%, $pseudo-element: true);

        transform: translateY(-50%);

        width: 100%;
        height: $cell-size;
    }

    @keyframes aPe-intro
    {
        to
        {
            transform: var(--pe-translate);

            opacity: 1;
        }
    }
}
</style>