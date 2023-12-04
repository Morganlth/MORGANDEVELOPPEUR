/*----------------------------------------------- #||--Event--|| */


/*-- #|-CLASS-| --*/

class Event
{

// #\-STATICS-\

    // --*


// #\-PRIVATES-\

    // --THIS
    #event_$FPS =
    {
        value: 0
    ,
        setter: function (args)
        {
            this.count = 0
            this.samples[this.i] = args[0] // fps
            
            if (++this.i >= this.samples.length) this.i = 0

            this.start = performance.now()
        }
    ,
        optionalparameters:
        {
            count: 0,
            i: 0,
            samples: new Float32Array(20),
            start: performance.now()
        ,
            getAverage: function () { return this.samples.reduce((som, n) => n === 0 ? som : som += n, 0) / this.samples.length }
        }
    }
    
    #event_MANAGER =
    {
        scroll   : [],
        mouseMove: [],
        mouseDown: [],
        mouseUp  : [],
        resize   : [],
        touchMove: [],
        animation: []
    }
    #event_FRAMES  = {}

    #event_ANIMATION


// #\-PUBLICS-\

    // --THIS
    event_CLIENT_XY = [0, 0]


// #\-CONSTRUCTOR-\

    // --THIS
    constructor ()
    {
        this.#event_setStores()

        this.event_resize = wait_debounce.call(this, this.event_resize, 6)
    }


// #\-FUNCTIONS-\

//=======@SETTER|

    // --*


//=======@GETTER|

    // --*
    get event_$FPS() { return this.#event_$FPS }


//=======@LIFE|

    // --SET
    event_set()
    {
        this.#event_setVars()
        this.#event_setEvents()

        this.#event_animationLoop()
    }

    #event_setStores() { this.#event_$FPS = store_custom(this.#event_$FPS) }

    #event_setVars() { this.#event_ANIMATION = this.#event_MANAGER.animation }

    #event_setEvents() { window.addEventListener('resize', this.event_resize) }

    // --GET

    // --UPDATES

    // --DESTROY
    event_destroy()
    {
        this.#event_destroyEvents()
        this.#event_destroyFrames()
    }

    #event_destroyEvents() { try { window.removeEventListener('resize', this.event_resize) } catch {} }

    #event_destroyFrames() { for (const FRAME in this.#event_FRAMES) cancelAnimationFrame(this.#event_FRAMES[FRAME]) }


//=======@COMMANDS|

    // --*


//=======@EVENTS|

    // --*
    async event_scroll({target: {scrollTop}})
    {
        if (this.#event_FRAMES.scroll) return

        this.#event_FRAMES.scroll = requestAnimationFrame(() =>
        {
            APP.app_SCROLLTOP = scrollTop

            this.#event_run.call(this.#event_MANAGER.scroll, scrollTop)

            this.#event_FRAMES.scroll = false
        })
    }

    async event_mouseMove({clientX, clientY})
    {
        if (this.#event_FRAMES.mouseMove) return

        this.#event_FRAMES.mouseMove = requestAnimationFrame(() =>
        {
            this.event_CLIENT_XY = [clientX, clientY]
    
            this.#event_run.call(this.#event_MANAGER.mouseMove, clientX, clientY)

            this.#event_FRAMES.mouseMove = false
        })
    }

    async event_mouseDown(e) { this.#event_run.call(this.#event_MANAGER.mouseDown, e) }

    async event_mouseUp() { this.#event_run.call(this.#event_MANAGER.mouseUp) }

    async event_touchMove({changedTouches})
    {
        if (this.#event_FRAMES.touchMove) return

        this.#event_FRAMES.touchMove = requestAnimationFrame(() =>
        {
            const
            TOUCHE   = changedTouches[0],
            CLIENT_X = TOUCHE.clientX,
            CLIENT_Y = TOUCHE.clientY

            this.event_CLIENT_XY = [CLIENT_X, CLIENT_Y]

            this.#event_run.call(this.#event_MANAGER.touchMove, CLIENT_X, CLIENT_Y)

            this.#event_FRAMES.touchMove = false
        })
    }

    async event_resize()
    {
        APP.app_updateSize()
        APP.app_updateSmallScreen()

        this.#event_run.call(this.#event_MANAGER.resize)
    }


//=======@UTILS|

    // --*
    event_add(events = {})
    {
        for (const CATEGORY in events)
        {
            const E = events[CATEGORY]

            if (this.event_contain(CATEGORY, E) === -1) this.#event_MANAGER[CATEGORY].push(E)
        }
    }

    event_remove(events = {})
    {
        for (const CATEGORY in events)
        {
            const INDEX = this.event_contain(CATEGORY, events[CATEGORY])

            if (~INDEX) this.#event_MANAGER[CATEGORY].splice(INDEX, 1)
        }
    }

    event_contain(category, func)
    {
        const EVENT = this.#event_MANAGER[category]

        return EVENT.indexOf(func)
    }

    #event_animationLoop()
    {
        const FPS = this.#event_$FPS
    
        FPS.count++
    
        if (performance.now() - FPS.start >= 500) FPS.set(FPS.count * 2)

        for (let i = 0; i < this.#event_ANIMATION.length; i++) this.#event_ANIMATION[i]()

        this.#event_FRAMES.animation = requestAnimationFrame(this.#event_animationLoop.bind(this))
    }

    #event_run() { for (const FUNC of this) FUNC(...arguments) }

    #event_scrollToCallback(top = 0, callback = () => {})
    {
        const
        EVENT = { scroll: event_scrollToCallback.bind(this) }
        ,
        START = +new Date()

        function event_scrollToCallback(scrollTop)
        {
                 if (+new Date() > START + 800) this.event_remove(EVENT)
            else if (scrollTop === top)
            {
                this.event_remove(EVENT)
        
                callback()
            }
        }

        this.event_add(EVENT)
    }

    async event_scrollTo(top, instant = false, hide = true, callback)
    {
        const APP_$FREEZE = APP.app_$FREEZE

        top = Math.floor(top)

        if (top !== APP.app_SCROLLTOP)
        {
      await tick() // app freeze overflow clip + set app manager
    
            if (APP_$FREEZE.value)
            {
                APP.app_$FREEZE = { value: false, target: APP_$FREEZE.target }

          await tick() // app freeze overflow clip
            }

            if (instant && hide) APP.app_hide()

            if (callback) this.#event_scrollToCallback(top, callback)

            ;(APP.app ?? document.getElementById('app'))?.scrollTo({ top: top, behavior: instant ? 'instant' : 'smooth' })
        }
        else if (callback) callback()
    }


}


// #\-IMPORTS-\

    // --SVELTE
    import { tick } from 'svelte'

    // --LIB
    import store_custom from '$lib/store'
    import { wait_debounce } from '$lib/wait'

    // --CONTEXTS
    import APP from './app'


// #\-EXPORTS-\

    // --THIS
    export default new Event()