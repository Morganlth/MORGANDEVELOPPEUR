/*----------------------------------------------- #||--games--|| */


// #\-IMPORTS-\

    // --SVELTE

    // --LIB
    import { lang_processing } from '$lib/lang'

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
            const GAME = lang_processing(lang, game)
    
            GAME.tags = [GAME.props.prop_TITLE.toLowerCase()]

            return GAME
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
                prop_TITLE : 'Terminal',
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
