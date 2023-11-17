/*----------------------------------------------- #||--form--|| */


// #\-IMPORTS-\

    // --SVELTE

    // --LIB

    // --CONTEXTS

    // --JS

//=======@COMPONENTS|

    // --*


// #\-EXPORTS-\

    // --THIS
    export const
    FORM_MSG_MIN = 155,
    FORM_MSG_MAX = 2000

    export function form_testEmail(value) { return value?.match(FORM_EMAIL_REGEX) }

    export function form_testMsg(value)
    {
        const LENGTH = value?.length ?? 0

        return LENGTH >= FORM_MSG_MIN && LENGTH <= FORM_MSG_MAX
    }


// #\-CONSTANTES-\

    // --THIS
    const FORM_EMAIL_REGEX = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/g


// #\-VARIABLES-\

    // --THIS


// #\-FUNCTIONS-\

    // --SET

    // --GET

    // --UPDATES


//=======@UTILS|

    // --*