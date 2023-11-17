/*----------------------------------------------- #||--page--|| */


// #\-IMPORTS-\

    // --SVELTE

    // --LIB

    // --CONTEXTS

    // --JS

//=======@COMPONENTS|

    // --*


// #\-EXPORTS-\

    // --THIS
    export function load({ params: {page} })
    {
        const PAGE_ID = pages_getId(page)
    
        return { page_ID: PAGE_ID }
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
    function pages_getId(page)
    {
        switch (page)
        {
            case 'home'        : return 0
            case 'presentation': return 1
            case 'skills'      : return 2
            case 'projects'    : return 3
            default            : return null
        }
    }