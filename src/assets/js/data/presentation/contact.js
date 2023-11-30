/*----------------------------------------------- #||--contact--|| */


// #\-IMPORTS-\

    // --SVELTE

    // --LIB
    import { lang_processing }            from '$lib/lang'
    import { FORM_MSG_MIN, FORM_MSG_MAX } from '$lib/form'

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
        headCellTitle     : { fr: 'fermer', en: 'close' },
        formCellTitle     : { fr: 'Envoyer', en: 'Send' },
        messagePlaceholder: { fr: `(min ${FORM_MSG_MIN} - max ${FORM_MSG_MAX} caractères)`, en: `(min ${FORM_MSG_MIN} - max ${FORM_MSG_MAX} characters)` },
        formWait          : { fr: 'Traitement...', en: 'Treatment...' },
        formSuccess       : { fr: 'Message envoyé.', en: 'Message sent.' },
        formError         : { fr: 'Une erreur est survenue.', en: 'An error has occurred.' },
        emailError        : { fr: 'L\'email n\'est pas valide.', en: 'The email is invalid.' },
        messageError      : { fr: `Le message n'est pas valide (min: ${FORM_MSG_MIN}, max: ${FORM_MSG_MAX} caractères).`, en: `The message is invalid (min: ${FORM_MSG_MIN}, max: ${FORM_MSG_MAX} characters).` }
    }


// #\-VARIABLES-\

    // --THIS


// #\-FUNCTIONS-\

    // --SET

    // --GET

    // --UPDATES


//=======@UTILS|

    // --*