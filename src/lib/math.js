// #CONSTANTE

    // --MATH
    const MATH =
    {
        PIx2: Math.PI * 2
    ,
        toRad: (a) => a * Math.PI / 180
    ,
        toDeg: (a) => a / Math.PI * 180
    ,
        headsOrTails: (n = 1) => Math.round(Math.random() * n)
    }

// #EXPORT

    // --MATH
    export default MATH