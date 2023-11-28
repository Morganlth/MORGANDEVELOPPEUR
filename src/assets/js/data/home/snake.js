/*----------------------------------------------- #||--snake--|| */


// #\-IMPORTS-\

    // --SVELTE

    // --LIB

    // --CONTEXTS

    // --JS

//=======@COMPONENTS|

    // --*


// #\-EXPORTS-\

    // --THIS
    export default
    {
        name: 'snake'
    ,
        getData: lang =>
        {
            SNAKE_DATA.gameoverInfo = SNAKE_DATA.gameoverInfo[lang]
        
            return SNAKE_DATA
        }
    }


// #\-CONSTANTES-\

    // --THIS
    const SNAKE_DATA = { gameoverInfo: { fr: 'CLIQUER pour REJOUER', en: 'CLICK to REPLAY' } }


// #\-VARIABLES-\

    // --THIS


// #\-FUNCTIONS-\

    // --SET

    // --GET

    // --UPDATES


//=======@UTILS|

    // --*