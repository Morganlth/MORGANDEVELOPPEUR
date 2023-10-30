// #EXPORT

    // --SLIDER-DATAS
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
            () => new Date().toLocaleTimeString()
        ]
    }

// #FUNCTION

function getDateFormat(n) { return n.toString().padStart(2, '0') }