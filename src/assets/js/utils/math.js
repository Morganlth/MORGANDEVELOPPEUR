// #MATH

// #CONSTANTE

    // --OBJET-MATH
    const MATH =
    {
        PI: { x2: Math.PI * 2 }
    ,
        rad:
        {
            r45: 45 * Math.PI / 180,
            r90: 90 * Math.PI / 180
        }
    ,
        toRad: (a) => a * Math.PI / 180
    ,
        toDeg: (a) => a / Math.PI * 180
    ,
        headsOrTails: () => Math.round(Math.random())
    }

// #EXPORT

    // --OBJET-MATH
    export default MATH