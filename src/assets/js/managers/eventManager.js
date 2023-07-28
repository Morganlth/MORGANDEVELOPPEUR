// #EVENT-MANAGER

class EventManager
{
// #VARIABLES

    // --EVENT-CONTEXT
    event_MANAGER =
    {
        scroll: [],
        wheel: [],
        mouseMove: [],
        mouseDown: [],
        mouseUp: [],
        resize: [],
        touchMove: []
    }
    event_SCROLLFRAME
    event_MOUSEFRAME
    event_TOUCHFRAME
    event_GRABBING

    // --ELEMENT-MAIN
    main
    main_scrollTop

// #CONSTRUCTOR

constructor () { this.event_GRABBING = writable(false) }

// #FUNCTIONS

    // --SET
    event_set(main) { this.main = main }

    // --EVENTS
    event_scroll({target})
    {
        if (this.event_SCROLLFRAME) return

        this.event_SCROLLFRAME = requestAnimationFrame(() =>
        {
            this.main_scrollTop = target.scrollTop

            this.event_run.call(this.event_MANAGER.scroll)

            this.event_SCROLLFRAME = false
        })
    }

    event_wheel({deltaY}) { this.event_run.call(this.event_MANAGER.wheel, deltaY) }

    event_mouseMove({clientX, clientY})
    {
        if (this.event_MOUSEFRAME) return

        this.event_MOUSEFRAME = requestAnimationFrame(() =>
        {
            this.event_run.call(this.event_MANAGER.mouseMove, clientX, clientY)

            this.event_MOUSEFRAME = false
        })
    }

    event_mouseDown(e) { this.event_run.call(this.event_MANAGER.mouseDown, e) }

    event_mouseUp() { this.event_run.call(this.event_MANAGER.mouseUp) }

    event_resize(smallScreen) { this.event_run.call(this.event_MANAGER.resize, smallScreen) }

    event_touchMove(e)
    {
        if (this.event_TOUCHFRAME) return

        this.event_TOUCHFRAME = requestAnimationFrame(() =>
        {
            const TOUCH = e.changedTouches[0]

            this.event_run.apply(this.event_MANAGER.touchMove, [TOUCH.clientX, TOUCH.clientY])

            this.event_TOUCHFRAME = false
        })
    }

    // --UTILS
    event_add(events)
    {
        for (const CATEGORY in events)
        {
            const FUNC = events[CATEGORY]

            if (this.event_contain(CATEGORY, FUNC) === -1) this.event_MANAGER[CATEGORY].push(FUNC)
        }
    }

    event_remove(events)
    {
        for (const CATEGORY in events)
        {
            const INDEX = this.event_contain(CATEGORY, events[CATEGORY])

            if (INDEX !== -1) this.event_MANAGER[CATEGORY].splice(INDEX, 1)
        }
    }

    event_contain(category, func)
    {
        const EVENT = this.event_MANAGER[category]

        return EVENT.indexOf(func)
    }

    event_run() { for (const FUNC of this) FUNC(...arguments) }

    event_scrollTo(top) { (this.main ?? document.querySelector('main')).scrollTo({ top: top, behavior: 'instant' }) }
}

// #IMPORT

    // --SVELTE
    import { writable } from "svelte/store"

// #EXPORT

    // --CONTEXT
    export default new EventManager()
