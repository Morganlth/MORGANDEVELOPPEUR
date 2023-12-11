/*----------------------------------------------- #||--project--|| */


// #\-IMPORTS-\

    // --ENV
    import { EMAIL } from '$env/static/private'

    // --SVELTE
    import { error, fail } from '@sveltejs/kit'

    // --LIB
    import transporter                      from '$lib/email.server'
    import { form_testEmail, form_testMsg } from '$lib/form'
    import { LANGS }                        from '$lib/lang'

    // --CONTEXTS

    // --JS

//=======@COMPONENTS|

    // --*


// #\-EXPORTS-\

    // --THIS
    export function load({ params: {page, subpath}, cookies })
    {
        const ID = page_getId(page, subpath)

        if (ID == null)
        {
            const ERROR = { fr: `La page ${page}/${subpath} n'existe pas.`, en: `The ${page}/${subpath} page does not exist.` }[cookies.get('lang') ?? LANGS[0]]

            throw error(404, ERROR)
        }

        return { page_ID: ID, subpath }
    }

    export const actions =
    {
        default: async ({request}) =>
        {
            try
            {
                const
                DATA = await request.formData()
                ,
                EMAIL = contact_getEncode(DATA.get('email')),
                MSG   = contact_getEncode(DATA.get('message'))

                if (!form_testEmail(EMAIL)) return fail(400, contact_getResponse({ email  : true }))
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
    const CONTACT_NAME = 'contact'


// #\-VARIABLES-\

    // --THIS


// #\-FUNCTIONS-\

    // --SET

    // --GET
    function page_getId(page, subpath)
    {
        switch (subpath)
        {
            case 'contact'     :
            case 'resume'      : if (page === 'presentation') return 1 ;break
            case 'htmlcss'     :
            case 'javascript'  :
            case 'nodejs'      :
            case 'others'      : if (page === 'skills')       return 2 ;break
            case 'booki'       :
            case 'sophiebluel' :
            case 'ninacarducci': if (page === 'projects')     return 3 ;break
            default            :                                       ;break
        }

        return null
    }

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
            subject: `@auto#email => ${email}`,
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