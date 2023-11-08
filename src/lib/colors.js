// #IMPORT

    // --SCSS
    import COLORS from '../assets/scss/modules/_colors.module.scss'

// #EXPORTS
 
    // --COLORS
    export default COLORS

    export function color_rgb(color) { return color.match(/\w\w/g).map(x => parseInt(x, 16)) }

    export function color_rgba(color, alpha = 1) { return `rgba(${color_rgb(color)}, ${alpha})` }