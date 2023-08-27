// #ROUTER

class Router
{
// #VARIABLES

    // --CONTEXT-ROUTER
    #router_TITLE = 'LE THUAUT MORGAN - Développeur Web'
    #router_$ID = {}
    #router_$HIDE = writable(false)
    #router_EVENTS
    #router_PAGES = []
    #router_HIDE_TIMEOUT
    #router_EVENTS_TIMEOUT

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
        this.router_update(id, 'instant')
    }

    #router_setEvents() { EVENT.event_add(this.#router_EVENTS) }

    router_setSubPath(id, subPath)
    {
        this.#router_PAGES[id].subPath = subPath ? '/' + subPath : void 0

        document.title = subPath ? subPath.toUpperCase() : this.#router_TITLE
    }

    // --DESTROY
    #router_destroyEvents() { EVENT.event_remove(this.#router_EVENTS) }

    // --UPDATE
    router_update(id, behavior = 'smooth')
    {
        const PAGE = this.#router_PAGES[id]

        this.#router_updateEvents()
    
        if (Math.abs(APP.app_scrollTop - PAGE.offsetTop) > window.innerHeight * 2) this.#router_updateHide()
    
        EVENT.event_scrollTo(PAGE.offsetTop, behavior)

        this.#router_updatePath(id, PAGE)
    }

    #router_updateEvents()
    {
        clearTimeout(this.#router_EVENTS_TIMEOUT)

        this.#router_destroyEvents()

        this.#router_EVENTS_TIMEOUT = setTimeout(() => this.#router_setEvents(), 1000)
    }

    #router_updateHide()
    {
        clearTimeout(this.#router_HIDE_TIMEOUT)
    
        this.#router_$HIDE.set(true)

        this.#router_HIDE_TIMEOUT = setTimeout(() => this.#router_$HIDE.set(false), 700)
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

    get router_$HIDE() { return this.#router_$HIDE }

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