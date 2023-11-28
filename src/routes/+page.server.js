/*----------------------------------------------- #||--lang--|| */


// #\-IMPORTS-\

    // --SVELTE
    import { fail } from '@sveltejs/kit'

    // --LIB
    import { LANGS } from '$lib/lang'

    // --CONTEXTS

    // --JS

//=======@COMPONENTS|

    // --*


// #\-EXPORTS-\

    // --THIS
    export const actions =
    {
        default: async ({ request }) =>
        {
            try
            {
                const LANG = (await request.formData()).get(LANG_NAME)

                return LANGS.includes(LANG) ? { lang: LANG } : fail(403, { author: LANG_NAME, error: 'invalid parameter.' })
            }
            catch { return fail(500, { error: 'server failed.' }) }
        }
    }


// #\-CONSTANTES-\

    // --THIS
    const LANG_NAME = 'lang'


// #\-VARIABLES-\

    // --THIS


// #\-FUNCTIONS-\

    // --SET

    // --GET

    // --UPDATES


//=======@UTILS|

    // --*