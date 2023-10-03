// #EXPORTS

    // --TRANSITIONS
    export function transition_wait(node, {duration = 0}) { return { duration } }

    export function transition_fade(node, {duration = 0}) { return { duration, css: (t) => `opacity: ${t}` }}