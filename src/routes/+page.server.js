/*----------------------------------------------- #||--lang--|| */


// #\-IMPORTS-\

    // --SVELTE
    import { fail, redirect } from '@sveltejs/kit'

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
            const
            DATA = await request.formData(),
            LANG = DATA.get(LANG_NAME),
            URL  = DATA.get('url')

            if (LANGS.includes(LANG))
            {
                if (URL != null) throw  redirect(302, URL)
                else             return { lang: LANG }
            }
            else return fail(403, { author: LANG_NAME, error: 'invalid parameter.' })
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