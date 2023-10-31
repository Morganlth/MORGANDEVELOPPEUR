// #EVENT

class Event
{
// #VARIABLES

    // --EVENT-CONTEXT
    #event_$FPS = {}
    event_GRABBING = writable(false)
    event_CLIENT_XY = [0, 0]
    #event_MANAGER =
    {
        scroll: [],
        mouseMove: [],
        mouseDown: [],
        mouseUp: [],
        resize: [],
        touchMove: [],
        animation: []
    }
    #event_ANIMATION
    #event_SCROLLFRAME
    #event_MOUSEFRAME
    #event_TOUCHFRAME

// #CONSTRUCTOR

constructor ()
{
    this.#event_setVars()

    this.event_resize = wait_debounce.call(this, this.event_resize, 100)
}

// #FUNCTIONS

    // --SET
    event_set()
    {
        window.addEventListener('resize', this.event_resize)

        this.#event_setAnimationLoop()
    }

    #event_setVars()
    {
        let { subscribe, set } = writable(0)
    
        this.#event_$FPS =
        {
            value: 0,
            count: 0,
            i: 0,
            samples: new Float32Array(20),
            start: performance.now()
        ,
            getAverage: function () { return this.samples.reduce((som, n) => n === 0 ? som : som += n, 0) / this.samples.length }
        ,
            update: function ()
            {
                const FPS = this.count * 2
            
                this.value = FPS
                this.count = 0
                this.samples[this.i] = FPS
                
                if (++this.i >= this.samples.length) this.i = 0

                this.start = performance.now()

                set(this.value)
            }
        ,
            subscribe
        }
    }

    #event_setAnimationLoop()
    {
        if (!this.#event_ANIMATION)
        {
            this.#event_ANIMATION = this.#event_MANAGER.animation

            this.#event_animationLoop()
        }
    }

    // --DESTROY
    event_destroy() { try { window.removeEventListener('resize', this.event_resize) } catch {} }

    // --EVENTS
    event_scroll({target: {scrollTop}})
    {
        if (this.#event_SCROLLFRAME) return

        this.#event_SCROLLFRAME = requestAnimationFrame(() =>
        {
            APP.app_SCROLLTOP = scrollTop

            this.#event_run.call(this.#event_MANAGER.scroll, scrollTop)

            this.#event_SCROLLFRAME = false
        })
    }

    event_mouseMove({clientX, clientY})
    {
        if (this.#event_MOUSEFRAME) return

        this.#event_MOUSEFRAME = requestAnimationFrame(() =>
        {
            this.event_CLIENT_XY = [clientX, clientY]
    
            this.#event_run.call(this.#event_MANAGER.mouseMove, clientX, clientY)

            this.#event_MOUSEFRAME = false
        })
    }

    event_mouseDown(e) { this.#event_run.call(this.#event_MANAGER.mouseDown, e) }

    event_mouseUp() { this.#event_run.call(this.#event_MANAGER.mouseUp) }

    event_touchMove(e)
    {
        if (this.#event_TOUCHFRAME) return

        this.#event_TOUCHFRAME = requestAnimationFrame(() =>
        {
            const TOUCH = e.changedTouches[0]

            this.#event_run.apply(this.#event_MANAGER.touchMove, [TOUCH.clientX, TOUCH.clientY])

            this.#event_TOUCHFRAME = false
        })
    }

    event_resize()
    {
        APP.app_updateSize()
        APP.app_updateSmallScreen()

        this.#event_run.call(this.#event_MANAGER.resize)
    }

    // --LOOP
    #event_animationLoop()
    {
        const FPS = this.#event_$FPS
    
        FPS.count++
    
        if (performance.now() - FPS.start >= 500) FPS.update()

        for (let i = 0; i < this.#event_ANIMATION.length; i++) this.#event_ANIMATION[i]()

        requestAnimationFrame(this.#event_animationLoop.bind(this))
    }

    // --UTILS
    event_add(events = {})
    {
        for (const CATEGORY in events)
        {
            const FUNC = events[CATEGORY]

            if (this.event_contain(CATEGORY, FUNC) === -1) this.#event_MANAGER[CATEGORY].push(FUNC)
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

    #event_run() { for (const FUNC of this) FUNC(...arguments) }

    async event_scrollTo(top, instant, hide = true)
    {
        const APP_$FREEZE = APP.app_$FREEZE

        await tick() // app freeze overflow clip
    
        if (APP_$FREEZE.value)
        {
            APP.app_$FREEZE = { value: false, target: APP_$FREEZE.target }

            await tick() // app freeze overflow clip
        }
        if (instant && hide) APP.app_$HIDE = true

        ;(APP.app ?? document.getElementById('app')).scrollTo({ top: top, behavior: instant ? 'instant' : 'smooth' })
    }

    // --GETTER
    get event_$FPS() { return this.#event_$FPS }
}

// #IMPORTS

    // --JS
    import { wait_debounce } from '../utils/wait'

    // --CONTEXT
    import APP from './mApp'

    // --SVELTE
    import { tick } from 'svelte'
    import { writable } from 'svelte/store'

// #EXPORT

    // --CONTEXT
    export default new Event()
