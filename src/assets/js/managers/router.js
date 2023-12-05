/*----------------------------------------------- #||--Router--|| */


/*-- #|-CLASS-| --*/

class Router
{

// #\-STATICS-\

    // --*


// #\-PRIVATES-\

    // --THIS
    #router_$ID      = {}
    #router_$HIDE    = { value: false, setter: function ({target}) { this.target = target }, optionalparameters: { target: null } }
    #router_$SUBPATH = { value: '' }

    #router_PAGES = []

    #router_ROUTE = '/'

    #router_RESPONSE


// #\-PUBLICS-\

    // --THIS


// #\-CONSTRUCTOR-\

    // --THIS
    constructor () { this.#router_setStores() }


// #\-FUNCTIONS-\

//=======@SETTER|

    // --*
    set router_$HIDE({value, target})
    {
        const CURRENT_TARGET = this.#router_$HIDE.target
    
        if (!CURRENT_TARGET || CURRENT_TARGET === target) this.#router_$HIDE.set(value, { target: value ? target : null })
    }

    set router_RESPONSE(value) { this.#router_RESPONSE = value }


//=======@GETTER|

    // --*
    get router_$ID()      { return this.#router_$ID }

    get router_$HIDE()    { return this.#router_$HIDE }

    get router_$SUBPATH() { return this.#router_$SUBPATH }

    get router_PAGES()    { return this.#router_PAGES }

    get router_ROUTE()    { return this.#router_ROUTE }

    get router_RESPONSE() { return this.#router_RESPONSE }


//=======@LIFE|

    // --SET
    router_set(id, subPath, response)
    {
        this.#router_setVars(response)

        this.router_update(id, subPath, true)
    }

    #router_setStores()
    {
        this.#router_$ID      = store_custom(this.#router_$ID)
        this.#router_$HIDE    = store_custom(this.#router_$HIDE)
        this.#router_$SUBPATH = store_custom(this.#router_$SUBPATH)
    }

    #router_setVars(response) { this.#router_RESPONSE = response }

    // --GET
    #router_getPageFocus() { return this.#router_PAGES.find(page => page.focus) }

    router_getInstant(top) { return Math.abs(APP.app_SCROLLTOP - top) > APP.app_HEIGHT * 2 }

    // --UPDATES
    router_update(id, subPath, instant, history = true)
    {
        const
        PAGE = this.#router_PAGES[id],
        TOP  = PAGE.top

        instant ??= this.router_getInstant(TOP)
    
        if (instant || PAGE.id === this.#router_getPageFocus()?.id) this.router_updatePage(id, subPath, PAGE, history)

        EVENT.event_scrollTo(TOP, instant)
    }

    router_updatePage(id, subPath, page, history = true)
    {
        page ??= this.#router_PAGES[id]

        if (page)
        {
            const ROUTE = '/' + page.name + (subPath ? '/' + subPath : '')

            if (this.#router_ROUTE !== ROUTE)
            {
                this.#router_resetLastPageFocus()
                this.#router_updateVars(id, subPath, ROUTE)

                page.focus = true

                if (history) this.#router_updateHistory(id, subPath, ROUTE)
            }
        }
    }

    #router_updateHistory(id, subPath, route) { history.pushState({id, subPath}, '', location.origin + route) }

    #router_updateVars(id, subPath, route)
    {
        this.#router_$ID.set(id)
        this.#router_$SUBPATH.set(subPath)
    
        this.#router_ROUTE = route
    }

    // --DESTROY


//=======@COMMANDS|

    // --*


//=======@EVENTS|

    // --*
    async router_e$Scroll(scrolltop)
    {
        const PAGES = this.#router_PAGES

        for (let i = PAGES.length - 1; i >= 0; i--)
        {
            if (PAGES[i].top <= scrolltop)
            {
                if (i !== this.#router_$ID.value) this.router_updatePage(i, null, PAGES[i])

                break
            }
        }
    }


//=======@UTILS|

    // --*
    router_add(id, name, label, top) { this.#router_PAGES[id] = { focus: false, id, name, label, top } }

    router_remove(id) { this.#router_PAGES.splice(id, 1) }

    #router_resetLastPageFocus()
    {
        const PAGE = this.#router_getPageFocus()
    
        if (PAGE) PAGE.focus = false
    }


}


// #\-IMPORTS-\

    // --SVELTE

    // --LIB
    import store_custom from '$lib/store'

    // --CONTEXTS
    import APP   from './app'
    import EVENT from './event'


// #\-EXPORTS-\

    // --THIS
    export default new Router()