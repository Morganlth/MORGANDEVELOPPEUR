// #IMPORT

    // --SCSS
    import BREAKPOINTS from '../assets/scss/modules/_breakpoints.module.scss'

// #EXPORT
 
    // --BREAKPOINTS
    export default (() =>
    {
        for (const POINT in BREAKPOINTS) BREAKPOINTS[POINT] = parseInt(BREAKPOINTS[POINT], 10)

        return BREAKPOINTS
    })()