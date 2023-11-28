/*----------------------------------------------- #||--games--|| */


// #\-IMPORTS-\

    // --SVELTE

    // --LIB

    // --CONTEXTS

    // --JS

//=======@COMPONENTS|

    // --*
    import Snake2      from '../../../../global/icons/Snake2.svelte'
    import Grid        from '../../../../global/icons/Grid.svelte'
    import CommandLine from '../../../../global/icons/CommandLine.svelte'


// #\-EXPORTS-\

    // --THIS
    export default
    {
        name: 'games'
    ,
        getData: lang => GAMES_DATA.map(game =>
        {
            const TITLE = game.props.prop_TITLE[lang]
    
            game.props.prop_TITLE = TITLE
            game.tags             = [TITLE.toLowerCase()]

            return game
        })
    }


// #\-CONSTANTES-\

    // --THIS
    const GAMES_DATA =
    [
        {
            id       : 0,
            component: Snake2,
            props    :
            {
                prop_TITLE : { fr: 'Serpent', en: 'Snake' },
                prop_X     : .85,
                prop_Y     : .03,
                prop_RADIUS: 120
            }
        }
        ,
        {
            id       : 1,
            component: Grid,
            props    :
            {
                prop_TITLE : { fr: 'Morpion', en: 'Tictactoe' },
                prop_X     : .34,
                prop_Y     : .6,
                prop_RADIUS: 140
            }
        }
        ,
        {
            id       : 2,
            component: CommandLine,
            props    :
            {
                prop_TITLE : { fr: 'Terminal', en: 'Terminal' },
                prop_Z     : 1,
                prop_X     : .89,
                prop_Y     : .58,
                prop_RADIUS: 160
            }
        }
    ]


// #\-VARIABLES-\

    // --THIS


// #\-FUNCTIONS-\

    // --SET

    // --GET

    // --UPDATES


//=======@UTILS|

    // --*
