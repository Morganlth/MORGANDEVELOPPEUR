// #ROUTER

class Router
{
// #VARIABLES

    // --CONTEXT-ROUTER
    #router_TITLE = 'LE THUAUT MORGAN - Développeur Web'
    #router_$ID = {}
    #router_EVENTS
    #router_PAGES = []

// #CONSTRUCTOR

constructor ()
{
    this.#router_setVars()

    this.router_e$Scroll = wait_throttle.call(this, this.router_e$Scroll, 50.01)

    this.#router_EVENTS = { scroll: this.router_e$Scroll }
}

// #FUNCTIONS

    // --SET
    router_set(id)
    {
        this.#router_setEvents()
    
        this.router_update(id, true)
    }

    #router_setVars()
    {
        let { subscribe, set } = writable(null)

        this.#router_$ID =
        {
            value: null,
            subscribe,
            set: function (value) { set(this.value = value) }
        }
    }

    #router_setEvents() { EVENT.event_add(this.#router_EVENTS) }

    router_setSubPath(id, subPath)
    {
        this.#router_PAGES[id].subPath = subPath ? '/' + subPath : void 0

        document.title = subPath ? subPath.toUpperCase() : this.#router_TITLE
    }

    // --GET
    router_getInstant(top) { return Math.abs(APP.app_SCROLLTOP - top) > window.innerHeight * 2 }

    // --UPDATE
    router_update(id, instant)
    {
        const
        PAGE = this.#router_PAGES[id],
        TOP = PAGE.top

        instant ??= this.router_getInstant(TOP)
    
        if (instant) this.#router_updatePath(id, PAGE)

        EVENT.event_scrollTo(TOP, instant)
    }

    #router_updatePath(id, page)
    {
        const PAGE = page ?? this.#router_PAGES[id]

        history.pushState({}, '', location.origin + '/' + PAGE.name + (PAGE.subPath ?? ''))
    
        this.#router_$ID.set(id)
    }

    // --EVENT
    async router_e$Scroll()
    {
        const PAGES = this.#router_PAGES

        for (let i = PAGES.length - 1; i >= 0; i--)
            if (PAGES[i].top <= APP.app_SCROLLTOP) return this.#router_updatePath(i, PAGES[i])
    }

    // --UTILS
    router_add({ id, name, top }) { this.#router_PAGES[id] = { name: name, top: top } } // rendre router_PAGES reactif ?

    router_remove(id) { this.#router_PAGES.splice(id, 1) }

    // --GETTER
    get router_$ID() { return this.#router_$ID }
}

// #IMPORTS

    // --JS
    import { wait_throttle } from '../utils/wait'

    // --CONTEXTS
    import APP from './mApp'
    import EVENT from './mEvent'

    // --SVELTE
    import { writable } from 'svelte/store'

// #EXPORT

    // --CONTEXT
    export default new Router()