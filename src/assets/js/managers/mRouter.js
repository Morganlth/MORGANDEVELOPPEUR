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
    let { subscribe, set } = writable(0)

    this.#router_$ID =
    {
        value: 0,
        subscribe,
        set: function (value) { set(this.value = value) }
    }

    this.router_e$Scroll = wait_debounce.call(this, this.router_e$Scroll, 50)

    this.#router_EVENTS = { scroll: this.router_e$Scroll }
}

// #FUNCTIONS

    // --SET
    router_set(id)
    {
        this.#router_setEvents()

        this.router_update(id, 'instant')
    }

    #router_setEvents() { EVENT.event_add(this.#router_EVENTS) }

    router_setSubPath(id, subPath)
    {
        this.#router_PAGES[id].subPath = subPath ? '/' + subPath : void 0

        document.title = subPath ? subPath.toUpperCase() : this.#router_TITLE
    }

    // --UPDATE
    router_update(id, behavior = 'smooth')
    {
        const PAGE = this.#router_PAGES[id]

        EVENT.event_scrollTo(PAGE.offsetTop, behavior)

        this.#router_updatePath(id, PAGE)
    }

    #router_updatePath(id, page)
    {
        const PAGE = page ?? this.#router_PAGES[id]

        history.pushState({}, '', location.origin + '/' + PAGE.name + (PAGE.subPath ?? ''))
    
        this.router_$ID = id
    }

    // --EVENT
    async router_e$Scroll()
    {
        const PAGES = this.#router_PAGES

        for (let i = PAGES.length - 1; i >= 0; i--)
            if (PAGES[i].offsetTop <= APP.app_scrollTop) return this.#router_updatePath(i, PAGES[i])
    }

    // --UTIL
    router_add(id, name, offsetTop) { this.#router_PAGES[id] = { name: name, offsetTop: offsetTop } }

    // --GETTER
    get router_$ID() { return this.#router_$ID }

    // --SETTER
    set router_$ID(value) { this.#router_$ID.set(value) }

}

// #IMPORTS

    // --JS
    import { wait_debounce } from '../utils/wait'

    // --CONTEXTS
    import APP from './mApp'
    import EVENT from './mEvent'

    // --SVELTE
    import { writable } from 'svelte/store'

// #EXPORT

    // --CONTEXT
    export default new Router()