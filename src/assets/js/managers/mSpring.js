// #SPRING

class Spring
{
// --VARIABLES

    // --SPRING-CONTEXT
    static __spring_NAME = 'spring'
    static __spring_D_SIZE = 7
    static __spring_D_DELAY = 50.01

    #spring_$ON = { init: true }
    #spring_$STATE = { init: 0 }
    #spring_HOVER = false // icon hover
    #spring_HIDE = false
    #spring_$COORDS = spring({ x: -Spring.__spring_D_SIZE, y: -Spring.__spring_D_SIZE }, { stiffness: .1, damping: .6 })
    #spring_$SIZE = spring(Spring.__spring_D_SIZE)
    #spring_COMMANDS = []
    #spring_EVENTS = {}

// #CONSTRUCTOR

constructor ()
{
    this.#spring_setVars()
    this.#spring_setMouseMove()

    this.spring_update = this.spring_update.bind(this)
    this.spring_c$ = this.spring_c$.bind(this)

    this.#spring_COMMANDS.push(
    {
        name: Spring.__spring_NAME,
        callback: this.spring_c$,
        params: { defaultValue: this.#spring_$ON.on, optimise: { value: false } },
        tests: { testBoolean: true },
        storage: true
    })
}

    // --SET
    spring_set()
    {
        this.#spring_setCommands()
        this.#spring_setEvents()
    }

    #spring_setVars()
    {
        this.#spring_setVars2()
        this.#spring_setVars3()
    }

    #spring_setVars2()
    {
        let { subscribe, set } = writable(this.#spring_$ON.init)

        this.#spring_$ON =
        {
            on: this.#spring_$ON.init,
            subscribe,
            set: function (on) { set(this.on = on) }
        }
    }

    #spring_setVars3()
    {
        let { subscribe, set } = writable(this.#spring_$STATE.init)

        this.#spring_$STATE =
        {
            value: this.#spring_$STATE.init,
            subscribe,
            set: function (value) { set(this.value = value) }
        }
    }

    #spring_setCommands() { COMMAND.command_setBasicCommands(this.#spring_COMMANDS) }

    #spring_setEvents() { EVENT.event_add(this.#spring_EVENTS) }

    #spring_setMouseMove(optimise)
    {
        this.#spring_EVENTS.mouseMove = optimise
        ? wait_throttle.call(this, this.spring_e$MouseMove, Spring.__spring_D_DELAY)
        : this.spring_e$MouseMove.bind(this)
    }

    // --DESTROY
    #spring_destroy() { this.spring_destroyEvents() }

    spring_destroyEvents() { EVENT.event_remove(this.#spring_EVENTS) }

    // --UPDATE
    spring_update(on)
    {
        if (on)
        {
            this.#spring_setEvents()
            this.spring_$SIZE = Spring.__spring_D_SIZE // set the size before the on
        }
        else this.#spring_destroy()

        this.#spring_$ON.set(on)
    }

    #spring_updateSize(size)
    {
        this.#spring_HIDE = !size

        this.spring_$SIZE = size
    }

    #spring_updateMouseDelay(optimise)
    {
        this.spring_destroyEvents()
        this.#spring_setMouseMove(optimise)
        this.#spring_setEvents()
    }

    // --COMMAND
    spring_c$(on) { COMMAND.command_test(on, 'boolean', this.spring_update, Spring.__spring_NAME, this.#spring_$ON.on) }

    // --EVENTS
    async spring_e$MouseMove(x, y) { if (!this.#spring_HOVER) this.spring_$COORDS = { x: x, y: y } }

    spring_e$Show() { this.#spring_updateSize(Spring.__spring_D_SIZE) }

    spring_e$Hide() { this.#spring_updateSize(0) }

    // --GETTER
    get spring_D_SIZE() { return Spring.__spring_D_SIZE }

    get spring_$ON() { return this.#spring_$ON }

    get spring_$STATE() { return this.#spring_$STATE }

    get spring_HOVER() { return this.#spring_HOVER }

    get spring_HIDE() { return this.#spring_HIDE }

    get spring_$COORDS() { return this.#spring_$COORDS }

    get spring_$SIZE() { return this.#spring_$SIZE }

    // --SETTER
    set spring_$STATE(value) 
    {
        const
        VALUE = value === -1 || value === 0 || value === 1 ? value : 0,
        CURRENT = this.#spring_$STATE.value

        if (CURRENT !== VALUE)
        {
            this.#spring_$STATE.set(VALUE)

            if (CURRENT + VALUE) this.#spring_updateMouseDelay(!VALUE) // -1 + 1 = 0 | 0 + 1 = 1 | 0 - 1 = -1
        }
    }

    set spring_HOVER(on) { this.#spring_HOVER = on }

    set spring_$COORDS(coords) { this.#spring_$COORDS.set(coords) }

    set spring_$SIZE(size) { this.#spring_$SIZE.set(size) }
}

// #IMPORT

    // --JS
    import { wait_throttle } from '../utils/wait'

    // --CONTEXTS
    import COMMAND from './mCommand'
    import EVENT from './mEvent'

    // --SVELTE
    import { writable } from 'svelte/store'
    import { spring } from 'svelte/motion'

// #EXPORT

export default new Spring()