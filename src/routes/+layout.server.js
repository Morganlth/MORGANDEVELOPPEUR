/*----------------------------------------------- #||--lang--|| */


// #\-IMPORTS-\

    // --SVELTE

    // --LIB
    import { LANGS } from '$lib/lang'

    // --CONTEXTS

    // --JS

//=======@COMPONENTS|

    // --*


// #\-EXPORTS-\

    // --THIS
    export function load({ cookies }) { return { lang: cookies.get('lang') ?? LANGS[0] } }


// #\-CONSTANTES-\

    // --THIS


// #\-VARIABLES-\

    // --THIS


// #\-FUNCTIONS-\

    // --SET

    // --GET

    // --UPDATES


//=======@UTILS|

    // --*