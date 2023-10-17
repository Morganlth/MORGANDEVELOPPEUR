// #ROUTER

class Router
{
// #VARIABLES

    // --CONTEXT-ROUTER
    #router_TITLE = 'LE THUAUT MORGAN - Développeur Web'
    #router_$ID = {}
    #router_$HIDE = {}
    #router_PAGES = []

// #CONSTRUCTOR

constructor () { this.#router_setVars() }

// #FUNCTIONS

    // --SET
    router_set(id) { this.router_update(id, true) }

    #router_setVars()
    {
        this.#router_setVars2()
        this.#router_setVars3()
    }

    #router_setVars2()
    {
        let { subscribe, set } = writable(null)

        this.#router_$ID =
        {
            value: null,
            subscribe,
            set: function (value) { set(this.value = value) }
        }
    }

    #router_setVars3()
    {
        let { set, subscribe } = writable(false)

        this.#router_$HIDE =
        {
            value: false,
            target: null,
            set: function (value, target)
            {
                this.value = value
                this.target = target

                set(value)
            },
            subscribe
        }
    }

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
        if (id === this.#router_$ID.value) return

        const PAGE = page ?? this.#router_PAGES[id]

        history.pushState({}, '', location.origin + '/' + PAGE.name + (PAGE.subPath ?? ''))
    
        this.#router_$ID.set(id)
    }

    // --EVENT
    async router_e$Scroll(scrolltop)
    {
        const PAGES = this.#router_PAGES

        for (let i = PAGES.length - 1; i >= 0; i--)
            if (PAGES[i].top <= scrolltop) return this.#router_updatePath(i, PAGES[i])
    }

    // --UTILS
    router_add({ id, name, top }) { this.#router_PAGES[id] = { name: name, top: top } } // rendre router_PAGES reactif ?

    router_remove(id) { this.#router_PAGES.splice(id, 1) }

    // --GETTER
    get router_$ID() { return this.#router_$ID }

    get router_$HIDE() { return this.#router_$HIDE }

    // --SETTER
    set router_$HIDE({value, target})
    {
        const CURRENT_TARGET = this.#router_$HIDE.target
    
        if (!CURRENT_TARGET || CURRENT_TARGET === target) this.#router_$HIDE.set(value, value ? target : null)
    }
}

// #IMPORTS

    // --CONTEXTS
    import APP from './mApp'
    import EVENT from './mEvent'

    // --SVELTE
    import { writable } from 'svelte/store'

// #EXPORT

    // --CONTEXT
    export default new Router()