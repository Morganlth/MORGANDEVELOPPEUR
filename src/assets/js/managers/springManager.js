// #SPRING-MANAGER

class SpringManager
{
// --VARIABLES

    // --SPRING-CONTEXT
    #spring_ON = false // active / desactive
    #spring_LOCK = false // bloque / debloque action
    #spring_HOVER = false // icon hover
    #spring_COORDS = spring({ x: -7, y: -7 }, { stiffness: 0.1, damping: 0.4 })
    #spring_SIZE = spring(7)
    #spring_EVENTS =
    {
        mouseMove: this.spring_mouseMove.bind(this),
        mouseDown: this.spring_mouseDown.bind(this),
        mouseUp: this.spring_mouseUp.bind(this)
    }

    spring_TIMEOUT = null

// #CONSTRUCTOR

constructor ()
{
    this.spring_responsive = this.spring_responsive.bind(this)
    this.spring_command = this.spring_command.bind(this)
}

    // --SET
    spring_set()
    {
        APP.app_addResponsive(this.spring_responsive)
        APP.app_add('spring', this.spring_command, true)
    }

    spring_setEvent() { EVENT.event_add(this.#spring_EVENTS) }

    // --DESTROY
    spring_destroy()
    {
        this.spring_destroyResponsive()
        this.spring_destroyEvent()
    }

    spring_destroyResponsive() { APP.app_removeResponsive(this.spring_responsive) }

    spring_destroyEvent() { EVENT.event_remove(this.#spring_EVENTS) }

    // --UPDATES
    spring_update(on)
    {
        if (this.#spring_ON === on) return
        
        on
        ? (this.spring_setEvent(), APP.app_ECO = false)
        : (this.spring_destroy(), this.spring_clear())

        this.spring_ON = on
        this.spring_SIZE = on ? 7 : 0
    }

    spring_updateState(lock, size)
    {
        if (this.#spring_ON)
        {
            this.spring_LOCK = lock
            this.spring_SIZE = size
        }
    }

    // --CLEAR
    spring_clear() { clearTimeout(this.spring_TIMEOUT) }

    // --RESPONSIVE
    async spring_responsive(mobile) { this.spring_update(!mobile) }

    // --COMMAND
    spring_command(on)
    {
        on = APP.app_testDefault(on) ? true : APP.app_testBoolean(on)

        this.spring_update(on)

        localStorage.setItem('spring', on)

        APP.app_success('spring ' + on)
    }

    // --EVENTS
    async spring_mouseMove(x, y) { if (!this.#spring_HOVER) this.spring_COORDS = { x: x, y: y } }

    async spring_mouseDown() { return; if (!this.#spring_LOCK) this.spring_TIMEOUT = setTimeout(() => this.spring_SIZE = 150, 200) }

    async spring_mouseUp()
    {
        this.spring_clear()

        if (!this.#spring_LOCK) this.spring_SIZE = 7
    }

    async spring_mouseEnter()
    {
        this.spring_clear()

        this.spring_updateState(true, 0)
    }

    async spring_mouseLeave() { this.spring_updateState(false, 7) }

    // 66GETTER
    get spring_ON() { return this.#spring_ON }

    get spring_LOCK() { return this.#spring_LOCK }

    get spring_HOVER() { return this.#spring_HOVER }

    get spring_COORDS() { return this.#spring_COORDS }

    get spring_SIZE() { return this.#spring_SIZE }

    // --SETTER
    set spring_ON(on) { this.#spring_ON = on }

    set spring_LOCK(lock) { this.#spring_LOCK = lock }

    set spring_HOVER(hover) { this.#spring_HOVER = hover }

    set spring_COORDS(coords) { this.#spring_COORDS.set(coords) }

    set spring_SIZE(size) { this.#spring_SIZE.set(size) }
}

// #IMPORT

    // --CONTEXTS
    import APP from './appManager'
    import EVENT from './eventManager'

    // --SVELTE
    import { spring } from 'svelte/motion'

// #EXPORT

export default new SpringManager()