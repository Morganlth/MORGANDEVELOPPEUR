// #EXPORTS

    // --TRANSITIONS
    export function transition_wait(node, {duration}) { return { duration } }

    export function transition_fade(node, {duration}) { return { duration, css: (t) => `opacity: ${t}` }}