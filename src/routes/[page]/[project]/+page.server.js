/*----------------------------------------------- #||--project--|| */


// #\-IMPORTS-\

    // --SVELTE

    // --LIB

    // --CONTEXTS

    // --JS

//=======@COMPONENTS|

    // --*


// #\-EXPORTS-\

    // --THIS
    export function load({ params: {page, project} }) { return page === 'projects' ? { page_ID: 3, subpath: page_getSubpath(project) } : { page_ID: null } }


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