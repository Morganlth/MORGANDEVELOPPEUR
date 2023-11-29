/*----------------------------------------------- #||--contact--|| */


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
        name: 'contact'
    ,
        getData: lang => lang_processing(lang, CONTACT_DATA)
    }


// #\-CONSTANTES-\

    // --THIS
    const CONTACT_DATA =
    {
        headCellTitle          : { fr: 'fermer', en: 'close' },
        formCellTitle          : { fr: 'soumettre', en: 'submit' },
        formTextareaPlaceholder: { fr: 'caractères', en: 'characters' }
    }


// #\-VARIABLES-\

    // --THIS


// #\-FUNCTIONS-\

    // --SET

    // --GET

    // --UPDATES


//=======@UTILS|

    // --*