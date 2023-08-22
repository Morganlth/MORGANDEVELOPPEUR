// #EXPORT

    // --SCROLLSNAP
    export function scrollsnap(offsetTop)
    {
        const
        [MIN, MAX] = [offsetTop - 150, offsetTop + 150],
        SCROLLSNAP = wait_debounce(function scrollsnap(y) { if (y > MIN && y < MAX) EVENT.event_scrollTo(offsetTop) }, 100),
        SCROLLSNAP_EVENT = { scroll: SCROLLSNAP }

        EVENT.event_add(SCROLLSNAP_EVENT)

        return () => EVENT.event_remove(SCROLLSNAP_EVENT)
    }

// #IMPORTS

    // --JS
    import { wait_debounce } from './wait'

    // --CONTEXT
    import EVENT from '../managers/mEvent'