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
        datas:
        [
            () => 'SCROLL',
            () =>
            {
                const
                NOW = new Date(),
                [DAY, MONTH, YEAR] = [NOW.getDate(), NOW.getMonth() + 1, NOW.getFullYear() % 100]
    
                return `${getDateFormat(DAY)}.${getDateFormat(MONTH)}.${getDateFormat(YEAR)}`
            },
            () =>
            {
                const
                NOW = new Date(),
                [HOURS, MINUTES] = [NOW.getHours(), NOW.getMinutes() + 1]
    
                return `${getDateFormat(HOURS)}:${getDateFormat(MINUTES)}`
            }
        ]
    }


// #\-CONSTANTES-\

    // --THIS


// #\-VARIABLES-\

    // --THIS


// #\-FUNCTIONS-\

    // --SET

    // --GET
    function getDateFormat(n) { return n.toString().padStart(2, '0') }

    // --UPDATES


//=======@UTILS|

    // --*