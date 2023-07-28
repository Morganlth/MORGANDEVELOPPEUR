// #COLOR

// #EXPORT

    // --UTILS
    export function color_rgb(color) { return color.match(/\w\w/g).map(x => parseInt(x, 16)) }

    export function color_rgba(color, alpha) { return `rgba(${rgb(color)}, ${alpha})` }