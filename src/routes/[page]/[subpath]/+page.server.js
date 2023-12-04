/*----------------------------------------------- #||--project--|| */


// #\-IMPORTS-\

    // --SVELTE
    import { error } from '@sveltejs/kit'

    // --LIB
    import {LANGS} from '$lib/lang'

    // --CONTEXTS

    // --JS

//=======@COMPONENTS|

    // --*


// #\-EXPORTS-\

    // --THIS
    export function load({ params: {page, subpath}, cookies })
    {
        const [ID, SUBPATH] = page_getSubpath(page, subpath)

        if (ID == null || SUBPATH == null)
        {
            const ERROR = { fr: `La page ${page}/${subpath} n'existe pas.`, en: `The ${page}/${subpath} page does not exist.` }[cookies.get('lang') ?? LANGS[0]]

            throw error(404, ERROR)
        }

        return { page_ID: ID, subpath: SUBPATH }
    }


// #\-CONSTANTES-\

    // --THIS


// #\-VARIABLES-\

    // --THIS


// #\-FUNCTIONS-\

    // --SET

    // --GET
    function page_getSubpath(page, subpath)
    {
        switch (subpath)
        {
            case 'htmlcss'     :
            case 'javascript'  :
            case 'nodejs'      :
            case 'others'      : return page === 'skills'   ? [2, subpath] : [null, null]
            case 'booki'       :
            case 'sophiebluel' :
            case 'ninacarducci': return page === 'projects' ? [3, subpath] : [null, null]
            default            : return [null, null]
        }
    }

    // --UPDATES


//=======@UTILS|

    // --*