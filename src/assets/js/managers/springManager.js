// #SPRING-MANAGER

class SpringManager
{
// --VARIABLES

    // --SPRING-CONTEXT
    spring_ON = false // active / desactive
    spring_LOCK = false // bloque / debloque action
    spring_HOVER = false // icon hover
    spring_TIMEOUT = null
    spring_COORDS
    spring_SIZE
    spring_EVENTS

// --CONSTRUCTOR
constructor ()
{
    this.spring_COORDS = spring({ x: -7, y: -7 }, { stiffness: 0.1, damping: 0.4 })
    this.spring_SIZE = spring(7)
    this.spring_EVENTS =
    {
        mouseMove: this.spring_mouseMove.bind(this),
        mouseDown: this.spring_mouseDown.bind(this),
        mouseUp: this.spring_mouseUp.bind(this)
    }
}

    // --SET
    spring_set() { APP.app_add('spring', this.spring_command.bind(this), true) }

    spring_setEvent() { EVENT.event_add(this.spring_EVENTS) }

    // --DESTROY
    spring_destroy() { EVENT.event_remove(this.spring_EVENTS) }

    // --UPDATES
    spring_update(on)
    {
        if (this.spring_ON === on) return
        
        on
        ? (this.spring_setEvent(), APP.app_updateMode(false))
        : (this.spring_destroy(), this.spring_clear())

        this.spring_ON = on
        this.spring_SIZE.set(on ? 7 : 0)
    }

    spring_updateState(lock, size)
    {
        if (this.spring_ON)
        {
            this.spring_LOCK = lock
            this.spring_SIZE.set(size)
        }
    }

    // --CLEAR
    spring_clear() { clearTimeout(this.spring_TIMEOUT) }

    // --COMMAND
    spring_command(on)
    {
        on = APP.app_testDefault(on) ? true : APP.app_testBoolean(on)

        this.spring_update(on)

        localStorage.setItem('spring', on)

        APP.app_success('spring ' + on)
    }

    // --EVENTS
    async spring_mouseMove(x, y) { if (!this.spring_HOVER) this.spring_COORDS.set({ x: x, y: y }) }

    async spring_mouseDown() { if (!this.spring_LOCK) this.spring_TIMEOUT = setTimeout(this.spring_SIZE.set.bind(null, 150), 200) }

    async spring_mouseUp()
    {
        this.spring_clear()

        if (!this.spring_LOCK) this.spring_SIZE.set(7)
    }

    async spring_mouseEnter()
    {
        this.spring_clear()

        this.spring_updateState(true, 0)
    }

    async spring_mouseLeave() { this.spring_updateState(false, 7) }
}

// #IMPORT

    // --CONTEXTS
    import APP from './appManager'
    import EVENT from './eventManager'

    // --SVELTE
    import { spring } from 'svelte/motion'

// #EXPORT

export default new SpringManager()