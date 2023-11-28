/*----------------------------------------------- #||--slider--|| */


// #\-IMPORTS-\

    // --SVELTE

    // --LIB

    // --CONTEXTS

    // --JS

//=======@COMPONENTS|

    // --*


// #\-EXPORTS-\

    // --THIS
    export default
    {
        name: 'slider'
    ,
        getData: () => SLIDER_DATA
    }


// #\-CONSTANTES-\

    // --THIS
    const SLIDER_DATA =
    [
        () => 'SCROLL'
    ,
        () =>
        {
            const
            NOW   = new Date(),
            DAY   = NOW.getDate(),
            MONTH = NOW.getMonth() + 1,
            YEAR  = NOW.getFullYear() % 100

            return `${getDateFormat(DAY)}.${getDateFormat(MONTH)}.${getDateFormat(YEAR)}`
        }
    ,
        () =>
        {
            const
            NOW     = new Date(),
            HOURS   = NOW.getHours(),
            MINUTES = NOW.getMinutes() + 1

            return `${getDateFormat(HOURS)}:${getDateFormat(MINUTES)}`
        }
    ]


// #\-VARIABLES-\

    // --THIS


// #\-FUNCTIONS-\

    // --SET

    // --GET
    function getDateFormat(n) { return n.toString().padStart(2, '0') }

    // --UPDATES


//=======@UTILS|

    // --*