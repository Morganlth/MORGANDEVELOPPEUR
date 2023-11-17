/*----------------------------------------------- #||--project--|| */


// #\-IMPORTS-\

    // --SVELTE
    import { error } from '@sveltejs/kit'

    // --LIB

    // --CONTEXTS

    // --JS

//=======@COMPONENTS|

    // --*


// #\-EXPORTS-\

    // --THIS
    export function load({ params: {page, project} })
    {
        const SUBPATH = page_getSubpath(project)

             if (page !== 'projects') throw error(404, `La page ${page} n'existe pas.`)
        else if (SUBPATH == null)     throw error(404, `Le projet ${project} n'existe pas.`)

        return { page_ID: 3, subpath: SUBPATH }
    }


// #\-CONSTANTES-\

    // --THIS


// #\-VARIABLES-\

    // --THIS


// #\-FUNCTIONS-\

    // --SET

    // --GET
    function page_getSubpath(project)
    {
        switch (project)
        {
            case 'booki'       :
            case 'sophiebluel' :
            case 'ninacarducci': return project
            default            : return null
        }
    }

    // --UPDATES


//=======@UTILS|

    // --*