// #ROUTER

class Router
{
// #VARIABLES

    // --CONTEXT-ROUTER
    #router_$ID = {}
    #router_$HIDE =
    {
        value: false
    ,
        setter: function ({target}) { this.target = target }
    ,
        optionalparameters: { target: null }
    }
    #router_$SUBPATH = writable('')
    #router_PAGES = []

// #CONSTRUCTOR

constructor ()
{
    this.#router_$ID = store_custom(this.#router_$ID)
    this.#router_$HIDE = store_custom(this.#router_$HIDE)
}

// #FUNCTIONS

    // --SET
    router_set(id, subPath)
    {
        this.router_updateSubPath(id, subPath)
        this.router_update(id, true)
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
    
        if (instant) this.router_updatePath(id, PAGE)

        EVENT.event_scrollTo(TOP, instant)
    }

    router_updatePath(id, page)
    {
        page ??= this.#router_PAGES[id]

        if (page)
        {
            const SUBPATH = (page.subPath ? page.subPath : '')
    
            history.pushState({}, '', location.origin + '/' + page.name + SUBPATH)
    
            this.#router_$ID.set(id)
        }
    }

    router_updateSubPath(id, subPath)
    {
        const PAGE = this.#router_PAGES[id]

        if (PAGE)
        {
            PAGE.subPath = subPath ? '/' + subPath : void ''
            this.#router_$SUBPATH.set(subPath)
        }
    }

    // --EVENT
    async router_e$Scroll(scrolltop)
    {
        const PAGES = this.#router_PAGES

        for (let i = PAGES.length - 1; i >= 0; i--)
        {
            if (PAGES[i].top <= scrolltop)
            {
                if (i !== this.#router_$ID.value) this.router_updatePath(i, PAGES[i])

                break
            }
        }
    }

    // --UTILS
    router_add({ id, name, top }) { this.#router_PAGES[id] = { name, top } } // rendre router_PAGES reactif ?

    router_remove(id) { this.#router_PAGES.splice(id, 1) }

    // --GETTER
    get router_$ID() { return this.#router_$ID }

    get router_$HIDE() { return this.#router_$HIDE }

    get router_$SUBPATH() { return this.#router_$SUBPATH }

    // --SETTER
    set router_$HIDE({value, target})
    {
        const CURRENT_TARGET = this.#router_$HIDE.target
    
        if (!CURRENT_TARGET || CURRENT_TARGET === target) this.#router_$HIDE.set(value, { target: value ? target : null })
    }
}

// #IMPORTS

    // --JS
    import store_custom from '../utils/store'

    // --CONTEXTS
    import APP from './mApp'
    import EVENT from './mEvent'

    // --SVELTE
    import { writable } from 'svelte/store'

// #EXPORT

    // --CONTEXT
    export default new Router()