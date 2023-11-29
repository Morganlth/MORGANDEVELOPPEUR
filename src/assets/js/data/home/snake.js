/*----------------------------------------------- #||--snake--|| */


// #\-IMPORTS-\

    // --SVELTE

    // --LIB
    import { lang_processing } from '$lib/lang'

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
        getData: lang => lang_processing(lang, SNAKE_DATA)
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