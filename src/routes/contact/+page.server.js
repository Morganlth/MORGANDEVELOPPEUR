/*----------------------------------------------- #||--contact--|| */


// #\-IMPORTS-\

    // --SVELTE
    import { redirect } from '@sveltejs/kit'

    // --LIB
    import { EMAIL }   from '$env/static/private'
    import transporter from '$lib/email.server'

    // --CONTEXTS

    // --JS

//=======@COMPONENTS|

    // --*


// #\-EXPORTS-\

    // --THIS
    export function load() { throw redirect(308, '/presentation') }

    export const actions =
    {
        default: async ({ request }) =>
        {
            const
            DATA = await request.formData()
            ,
            FROM = DATA.get('email'),
            MSG  = DATA.get('msg')
            ,
            HTML = `<h1>${FROM}</h1><pre>${MSG}</pre>`
            ,
            MESSAGE =
            {
                from   : FROM,
                to     : EMAIL,
                subject: '@auto_email from morgandevelopper/contact',
                text   : MSG,
                html   : HTML
            }

            try
            {
                await (async () => await new Promise((resolve, reject) => transporter.sendMail(MESSAGE, (err, info) => err ? reject(err) : resolve(info))))()

                return { success: 'email sent !' }
            }
            catch { return { error: 'email not sent.' }}
        }
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