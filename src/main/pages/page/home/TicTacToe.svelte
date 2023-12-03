<!----------------------------------------------- #||--tictactoe--|| -->


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

{#if prop_ON}
    <!-- svelte-ignore a11y-no-static-element-interactions -->
    <div
    class="tictactoe"
    style:--pe-border-color={tictactoe_BORDER_COLOR}
    out:transition_fade={{ duration: 200 }}
    on:mouseenter={SPRING.spring_e$Hide.bind(SPRING)}
    on:mouseleave={SPRING.spring_e$Show.bind(SPRING)}
    >
        {#each TICTACTOE_BOARD as cell, i (i)}
            <Cell
            prop_FOCUS={prop_ON}
            prop_CENTER={true}
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


<!-- #|-SCRIPT-| -->

<script>

// #\-IMPORTS-\

    // --DATA

    // --SVELTE

    // --LIB
    import COLORS, { color_rgba } from '$lib/colors'
    import { transition_fade }    from '$lib/transition'

    // --CONTEXTS
    import { SPRING } from '../../../../App.svelte'

//=======@COMPONENTS|

    // --*
    import Cell   from '../../../../global/covers/Cell.svelte'
    import Icon   from '../../../../global/covers/Icon.svelte'
    import Circle from '../../../../global/icons/Circle.svelte'
    import Cross  from '../../../../global/icons/Cross.svelte'
    
//=======@STYLE|

    // --*


// #\-EXPORTS-\

    // --PROPS
    export let prop_ON = false

    // --BINDING


// #\-CONSTANTES-\

    // --SVELTE

    // --CONTEXTS

    // --OUTSIDE

    // --THIS
    const
    TICTACTOE_PLAYER = -1,
    TICTACTOE_AI     = 1
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

    // --INSIDE


// #\-VARIABLES-\

    // --CONTEXTS

    // --OUTSIDE

    // --THIS
    let
    tictactoe_AI_ROUND = false
    ,
    tictactoe_BORDER_COLOR = TICTACTOE_DEFAULT_COLOR
    ,
    tictactoe_SIMULATION = []
    ,
    tictactoe_ROUND = 0

    // --INSIDE
    let icon_OPACITY = 1


// #\-REATIVES-\

    // --CONTEXTS

    // --OUTSIDE

    // --THIS

    // --INSIDE


// #\-FUNCTIONS-\

//=======@LIFE|

    // --SVELTE

    // --SET

    // --GET
    function tictactoe_getWinner(emptyCells, depth)
    {
        const WINNER = tictactoe_isWinning()

        return (depth === 0 || WINNER || !emptyCells.length) ? WINNER : null
    }

    function tictactoe_getEmptyCells()
    {
        const EMPTYCELLS = []

        for (let i = 0; i < TICTACTOE_BOARD.length; i++) if (!TICTACTOE_BOARD[i]) EMPTYCELLS.push(i)

        return EMPTYCELLS
    }

    // --UPDATES

    // --DESTROY


//=======@COMMANDS|

    // --*


//=======@EVENTS|

    // --*
    function cell_eClick()
    {
        if (tictactoe_AI_ROUND || TICTACTOE_BOARD[this]) return

        tictactoe_AI_ROUND = true

        tictactoe_newRound(this, false)
    }


//=======@TRANSITIONS|

    // --*


//=======@ANIMATIONS|

    // --*


//=======@UTILS|

    // --*
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

            setTimeout(tictactoe_resetGame, 200)
        }, 200)
    }

    function tictactoe_resetGame()
    {
        for (let i = 0; i < TICTACTOE_BOARD.length; i++) TICTACTOE_BOARD[i] = 0

        icon_OPACITY = 1

        tictactoe_BORDER_COLOR = TICTACTOE_DEFAULT_COLOR
        tictactoe_ROUND        = 0
        tictactoe_AI_ROUND     = false
    }

    function tictactoe_newRound(id, isAi)
    {
        tictactoe_ROUND++

        TICTACTOE_BOARD[id]  = isAi ? TICTACTOE_AI : TICTACTOE_PLAYER
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
        DEPTH      = Math.round(Math.random()) + 2, /* changer la valeur pour augmenter ou diminuer la difficulté */
        ID         = tictactoe_ROUND > -1 ? tictactoe_run(EMPTYCELLS, DEPTH, true, true) : EMPTYCELLS[Math.round(Math.random() * (EMPTYCELLS.length - 1))]

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


<!-- #|-STYLE-| -->

<style
lang="scss"
>

/* #\-USES-\ */

    /* --SASS */

    /* --APP */

    /* --DEPENDENCIES */
    @use '../../../../assets/scss/styles/utils';
    @use '../../../../assets/scss/styles/display';
    @use '../../../../assets/scss/styles/animation';

    /* --MEDIA */


/* #\-VARIABLES-\ */

    /* --* */
    $size: max(15vw, 15vh);

    $cell-size: calc(100% / 3);


/* #\-THIS-\ */

.tictactoe
{
    --icon-size: 50%;

    &::before { width: $cell-size; }

    @include utils.placement(absolute, $top: 46%, $left: 46%);
    @include display.grid($cell-size, $cell-size, 3, 3);

    @extend %a-grid;

    width : $size;
    height: $size;

    &::after { height: $cell-size; }
}


</style>