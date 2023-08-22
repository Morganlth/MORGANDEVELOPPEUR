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

    this.router_e$Scroll = wait_debounce.call(this, this.router_e$Scroll, 100)

    this.#router_EVENTS = { scroll: this.router_e$Scroll }
}

// #FUNCTIONS

    // --SET
    router_set(id) { this.#router_setVars(id) }

    #router_setVars(id) { this.router_$ID = id }

    #router_setEvents() { EVENT.event_add(this.#router_EVENTS) }

    router_setSubPath(id, subPath)
    {
        this.#router_PAGES[id].subPath = subPath ? '/' + subPath : void 0

        document.title = subPath ? subPath.toUpperCase() : this.#router_TITLE
    }

    // --UPDATE
    #router_update(id)
    {
        const PAGE = this.#router_PAGES[id]

        history.pushState({}, '', location.origin + '/' + PAGE.name + (PAGE.subPath ?? ''))

        this.router_$ID = id
    }

    // --CONTROL
    router_start()
    {
        this.#router_setEvents()

        const PAGE = this.#router_PAGES[this.#router_$ID.value]

        EVENT.event_scrollTo(PAGE.offsetTop, 'instant')
    }

    // --EVENT
    async router_e$Scroll()
    {
        const PAGES = this.#router_PAGES

        for (let i = PAGES.length - 1; i >= 0; i--)
            if (PAGES[i].offsetTop <= APP.app_scrollTop) return this.#router_update(i)
    }

    // --UTIL
    router_add(id, name, offsetTop) { this.#router_PAGES[id] = { name: name, offsetTop: offsetTop } }

    // --GETTER
    get router_$ID() { return this.#router_$ID }
    
    get router_PAGES() { return this.#router_PAGES }

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