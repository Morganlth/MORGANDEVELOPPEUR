/*----------------------------------------------- #||--lang--|| */


// #\-IMPORTS-\

    // --SVELTE

    // --LIB

    // --CONTEXTS

    // --JS

//=======@COMPONENTS|

    // --*


// #\-EXPORTS-\

    // --THIS
    export const LANGS = ['fr', 'en']

    export function lang_processing(lang = LANGS[0], data)
    {
             if (data instanceof Array)  data = lang_arrayProcessing( lang, data)
        else if (data instanceof Object) data = lang_objectProcessing(lang, data)

        return data
    }


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
    function lang_arrayProcessing(lang, array = [])
    {
        for (let i = 0; i < array.length; i++) array[i] = lang_processing(lang, array[i])

        return array
    }

    function lang_objectProcessing(lang, object = {})
    {
        for (const _ in object)
        {
            if (LANGS.includes(_)) return object[lang]
            else                   object[_] = lang_processing(lang, object[_])
        }

        return object
    }