/*----------------------------------------------- #||--project--|| */


// #\-IMPORTS-\

    // --SVELTE
    import { redirect } from '@sveltejs/kit'

    // --LIB

    // --CONTEXTS

    // --JS

//=======@COMPONENTS|

    // --*


// #\-EXPORTS-\

    // --THIS
    export function load({ params: {page, project} })
    {
        if (page === 'projects') return { page_ID: 3, subpath: page_getSubpath(project) }
        else                     throw redirect('308', '/' + page)
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