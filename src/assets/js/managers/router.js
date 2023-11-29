/*----------------------------------------------- #||--Router--|| */


/*-- #|-CLASS-| --*/

class Router
{

// #\-STATICS-\

    // --*


// #\-PRIVATES-\

    // --THIS
    #router_$ID   = {}
    #router_$HIDE = { value: false, setter: function ({target}) { this.target = target }, optionalparameters: { target: null } }

    #router_PAGES = []

    #router_ROUTE = '/'

    #router_SUBPATH
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

    get router_PAGES()    { return this.#router_PAGES }

    get router_ROUTE()    { return this.#router_ROUTE }

    get router_SUBPATH()  { return this.#router_SUBPATH }

    get router_RESPONSE() { return this.#router_RESPONSE }


//=======@LIFE|

    // --SET
    router_set(id, subPath, response)
    {
        this.#router_setVars(response)
    
        this.router_updateSubPath(id, subPath)
        this.router_update(id, true)
    }

    #router_setStores()
    {
        this.#router_$ID   = store_custom(this.#router_$ID)
        this.#router_$HIDE = store_custom(this.#router_$HIDE)
    }

    #router_setVars(response) { this.#router_RESPONSE = response }

    // --GET
    router_getInstant(top) { return Math.abs(APP.app_SCROLLTOP - top) > APP.app_HEIGHT * 2 }

    // --UPDATES
    router_update(id, instant)
    {
        const
        PAGE = this.#router_PAGES[id],
        TOP  = PAGE.top

        instant ??= this.router_getInstant(TOP)
    
        if (instant) this.router_updatePath(id, PAGE)

        EVENT.event_scrollTo(TOP, instant)
    }

    router_updatePath(id, page)
    {
        page ??= this.#router_PAGES[id]

        if (page)
        {
            const
            SUBPATH = (page.subPath ? page.subPath : ''),
            ROUTE   = '/' + page.name + SUBPATH
    
            history.pushState({}, '', location.origin + ROUTE)
    
            this.#router_$ID.set(id)
            this.#router_ROUTE = ROUTE
        }
    }

    router_updateSubPath(id, subPath = null)
    {
        const PAGE = this.#router_PAGES[id]

        if (PAGE)
        {
            PAGE.subPath = subPath ? '/' + subPath : subPath

            this.#router_SUBPATH = subPath
        }
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
                if (i !== this.#router_$ID.value) this.router_updatePath(i, PAGES[i])

                break
            }
        }
    }


//=======@UTILS|

    // --*
    router_add(id, name, label, top) { this.#router_PAGES[id] = { name, label, top } }

    router_remove(id) { this.#router_PAGES.splice(id, 1) }


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