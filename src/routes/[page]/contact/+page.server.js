/*----------------------------------------------- #||--contact--|| */


// #\-IMPORTS-\

    // --SVELTE
    import { redirect, fail } from '@sveltejs/kit'

    // --ENV
    import { EMAIL } from '$env/static/private'

    // --LIB
    import transporter                      from '$lib/email.server'
    import { form_testEmail, form_testMsg } from '$lib/form'

    // --CONTEXTS

    // --JS

//=======@COMPONENTS|

    // --*


// #\-EXPORTS-\

    // --THIS
    export function load({ params: {page} })
    {
        if (page === 'presentation') return { page_ID: 1, subpath: 'contact' }
        else                         throw redirect(308, '/' + page)
    }

    export const actions =
    {
        default: async ({ request }) =>
        {
            try
            {
                const
                DATA = await request.formData()
                ,
                EMAIL = contact_getEncode(DATA.get('email')),
                MSG   = contact_getEncode(DATA.get('message'))

                if (!form_testEmail(EMAIL)) return fail(400, contact_getResponse({ email : true }))
                if (!form_testMsg(MSG))     return fail(400, contact_getResponse({ message: true }))

                const
                HTML    = contact_getHtml(EMAIL, MSG),
                MESSAGE = contact_getMessage(EMAIL, MSG, HTML)

                return await contact_send(MESSAGE)
            }
            catch { return fail(500, contact_getResponse({ server: 'server failed.' })) }
        }
    }


// #\-CONSTANTES-\

    // --THIS
    const
    CONTACT_NAME    = 'contact',
    CONTACT_SUBJECT = '@auto_email from morgandevelopper/contact'


// #\-VARIABLES-\

    // --THIS


// #\-FUNCTIONS-\

    // --SET

    // --GET
    function contact_getEncode(value = '')
    {
        value ??= ''

        return value
        .trim()
        .replaceAll(/(<|>)/gm, '@CHEVRON')
        .replaceAll('&',       '@AND')
        .replaceAll('?',       '@QUESTION')
        .replaceAll('=',       '@EQUAL')
        .replaceAll('\\',      '@BACKSLASH')
    }

    function contact_getHtml(email, msg) { `<h1>${email}</h1><pre>${msg}</pre>` }

    function contact_getMessage(email, msg, html)
    {
        return {
            from   : email,
            to     : EMAIL,
            subject: CONTACT_SUBJECT,
            text   : msg,
            html   : html
        }
    }

    function contact_getResponse(error)
    {
        return {
            author: CONTACT_NAME
            ,
            success: !error,
            error
        }
    }

    // --UPDATES


//=======@UTILS|

    // --*
    

    async function contact_send(message)
    {
        await (async () => await new Promise((resolve, reject) => transporter.sendMail(message, (err, info) => err ? reject(err) : resolve(info))))()

        return contact_getResponse()
    }