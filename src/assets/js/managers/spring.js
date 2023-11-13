/*----------------------------------------------- #||--Spring--|| */


/*-- #|-CLASS-| --*/

class Spring
{

// #\-STATICS-\

    // --*
    static __spring_DEFAULT_SIZE  = 7
    static __spring_DEFAULT_DELAY = 3 // +- 50ms


// #\-PRIVATES-\

    // --THIS
    #spring_$ON     = { value: true }
    #spring_$STATE  = { value: 0 }
    #spring_$HIDE   =
    {
        value: false
        ,
        setter: function () { this.lastValue = this.value }
        ,
        optionalparameters: { lastValue: false }
    }
    #spring_$COORDS = spring({ x: -Spring.__spring_DEFAULT_SIZE, y: -Spring.__spring_DEFAULT_SIZE }, { stiffness: .1, damping: .6 })
    #spring_$SIZE   = spring(Spring.__spring_DEFAULT_SIZE)

    #spring_HOVER = false // icon hover
   
    #spring_COMMANDS = []
    #spring_EVENTS   = {}


// #\-PUBLICS-\

    // --THIS


// #\-CONSTRUCTOR-\

    // --THIS
    constructor ()
    {
        this.#spring_setStores()

        this.#spring_COMMANDS.push(
        {
            name: 'spring',
            callback: this.spring_c$.bind(this),
            getCurrentValue: () => this.#spring_$ON.value,
            params: { defaultValue: this.#spring_$ON.value, optimise: { value: false } },
            tests: { testBoolean: true },
            desc: 'Activer/Désactiver le curseur personnalisé (p: \'t\' ou \'f\')',
            storage: true
        })

        this.#spring_EVENTS =
        {
            mouseMove: this.#spring_e$MouseMove.bind(this),
            touchMove: this.#spring_e$TouchMove.bind(this)
        }

        this.#spring_updateMouseDelay(true)
    }


// #\-FUNCTIONS-\

//=======@SETTER|

    // --*
    set spring_$STATE(value)   { if (this.#spring_$ON.value) this.#spring_updateState(value) }

    set spring_HOVER(on)       { this.#spring_HOVER = on }

    set spring_$COORDS(coords) { this.#spring_$COORDS.set(coords) }

    set spring_$SIZE(size)     { this.#spring_update(size) }


//=======@GETTER|

    // --*
    get spring_D_SIZE()  { return Spring.__spring_DEFAULT_SIZE }

    get spring_$ON()     { return this.#spring_$ON }

    get spring_$STATE()  { return this.#spring_$STATE }

    get spring_$COORDS() { return this.#spring_$COORDS }

    get spring_$SIZE()   { return this.#spring_$SIZE }

    get spring_HOVER()   { return this.#spring_HOVER }

    get spring_$HIDE()   { return this.#spring_$HIDE }

    get spring_HIDE() { console.trace('spring hide'); return null }


//=======@LIFE|

    // --SET
    spring_set()
    {
        this.#spring_setCommands()
        this.#spring_setEvents()
    }

    #spring_setStores()
    {
        this.#spring_$ON    = store_custom(this.#spring_$ON)
        this.#spring_$STATE = store_custom(this.#spring_$STATE)
        this.#spring_$HIDE  = store_custom(this.#spring_$HIDE)
    }

    #spring_setCommands() { COMMAND.command_setCommands(this.#spring_COMMANDS) }

    #spring_setEvents() { EVENT.event_add(this.#spring_EVENTS) }

    // --GET

    // --UPDATES
    #spring_update(size)
    {
        this.#spring_$HIDE.set(!size)
        this.#spring_$SIZE.set(size)
    }

    #spring_updateState(value)
    {
        const
        VALUE   = value === -1 || value === 0 || value === 1 ? value : 0,
        CURRENT = this.#spring_$STATE.value

        if (CURRENT !== VALUE)
        {
            this.#spring_$STATE.set(VALUE)

            if (CURRENT + VALUE) this.#spring_updateMouseDelay(!VALUE) // -1 + 1 = 0 | 0 + 1 = 1 | 0 - 1 = -1
        }
    }

    spring_updateCoords(x, y) { if (!this.#spring_HOVER) this.spring_$COORDS = { x: x, y: y } }

    #spring_updateMouseDelay(optimise)
    {
        this.spring_updateCoords = optimise
        ? wait_throttle.call(this, this.spring_updateCoords, Spring.__spring_DEFAULT_DELAY, Spring.__spring_DEFAULT_DELAY + 1)
        : this.spring_updateCoords.bind(this)
    }

    // --DESTROY
    spring_destroy() { this.#spring_destroyEvents() }

    #spring_destroyEvents() { EVENT.event_remove(this.#spring_EVENTS) }


//=======@COMMANDS|

    // --*
    spring_c$(value)
    {
        if (value)
        {
            this.#spring_setEvents()
            this.spring_$SIZE = Spring.__spring_DEFAULT_SIZE // set the size before the on
        }
        else this.spring_destroy()

        this.#spring_$ON.set(value)
    }


//=======@EVENTS|

    // --*
    async #spring_e$MouseMove(x, y) { this.spring_updateCoords(x, y) }

    async #spring_e$TouchMove(x, y) { this.spring_updateCoords(x, y) }

    spring_e$Show() { this.#spring_update(Spring.__spring_DEFAULT_SIZE) }

    spring_e$Hide() { this.#spring_update(0) }


//=======@UTILS|

    // --*


}


// #\-IMPORTS-\

    // --SVELTE
    import { spring } from 'svelte/motion'

    // --LIB
    import store_custom      from '$lib/store'
    import { wait_throttle } from '$lib/wait'

    // --CONTEXTS
    import COMMAND from './command'
    import EVENT   from './event'


// #\-EXPORTS-\

    // --THIS
    export default new Spring()