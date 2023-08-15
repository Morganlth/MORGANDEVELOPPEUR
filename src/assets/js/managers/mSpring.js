// #SPRING

class Spring
{
// --VARIABLES

    // --SPRING-CONTEXT
    static __spring_NAME = 'spring'
    static __spring_D_SIZE = 7

    #spring_$ON = true
    #spring_HOVER = false // icon hover
    #spring_$COORDS
    #spring_$SIZE
    #spring_EVENTS

// #CONSTRUCTOR

constructor ()
{
    let { subscribe, set } = writable(this.#spring_$ON)

    this.#spring_$ON =
    {
        on: this.#spring_$ON,
        subscribe,
        set: function (on) { set(this.on = on) }
    }

    this.#spring_$COORDS = spring({ x: -Spring.__spring_D_SIZE, y: -Spring.__spring_D_SIZE }, { stiffness: 0.1, damping: 0.4 })
    this.#spring_$SIZE = spring(Spring.__spring_D_SIZE)

    this.spring_update = this.spring_update.bind(this)
    this.spring_command = this.spring_command.bind(this)
    this.spring_mouseMove = wait_throttle(this.spring_mouseMove, 50)

    this.#spring_EVENTS = { mouseMove: this.spring_mouseMove.bind(this) }
}

    // --SET
    spring_set()
    {
        this.#spring_setCommand()
        this.#spring_setEvent()
    }

    #spring_setCommand()
    {
        COMMAND.command_setBasicCommand(
            Spring.__spring_NAME,
            this.spring_command,
            { defaultValue: this.#spring_$ON.on, optimise: true },
            { testBoolean: true },
            true
        )
    }

    #spring_setEvent() { EVENT.event_add(this.#spring_EVENTS) }

    // --DESTROY
    #spring_destroy() { this.spring_destroyEvent() }

    spring_destroyEvent() { EVENT.event_remove(this.#spring_EVENTS) }

    // --UPDATE
    spring_update(on)
    {
        if (on)
        {
            this.#spring_setEvent()
            this.spring_$SIZE = Spring.__spring_D_SIZE // set the size before the on
        }
        else this.#spring_destroy()

        this.#spring_$ON.set(on)
    }

    // --COMMAND
    spring_command(on) { COMMAND.command_test(on, 'boolean', this.spring_update, Spring.__spring_NAME, this.#spring_$ON.on) }

    // --EVENT
    spring_mouseMove(x, y) { if (!this.#spring_HOVER) this.spring_$COORDS = { x: x, y: y } }

    // --UTILS
    spring_show() { this.spring_$SIZE = Spring.__spring_D_SIZE }

    spring_hide() { this.spring_$SIZE = 0 }

    // --GETTER
    get spring_$ON() { return this.#spring_$ON }

    get spring_HOVER() { return this.#spring_HOVER }

    get spring_$COORDS() { return this.#spring_$COORDS }

    get spring_$SIZE() { return this.#spring_$SIZE }

    // --SETTER
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