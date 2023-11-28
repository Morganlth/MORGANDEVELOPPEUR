/*----------------------------------------------- #||--contact--|| */


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
        name: 'contact'
    ,
        getData: lang =>
        {
            CONTACT_DATA.headCellTitle           = CONTACT_DATA.headCellTitle[lang]
            CONTACT_DATA.formCellTitle           = CONTACT_DATA.formCellTitle[lang]
            CONTACT_DATA.formTextareaPlaceholder = CONTACT_DATA.formTextareaPlaceholder[lang]

            return CONTACT_DATA
        }
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