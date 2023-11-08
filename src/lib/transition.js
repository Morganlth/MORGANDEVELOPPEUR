// #EXPORTS

    // --TRANSITIONS
    export function transition_wait(_, {duration = 0}) { return { duration } }

    export function transition_fade(_, {duration = 0}) { return { duration, css: (t) => `opacity: ${t}` }}