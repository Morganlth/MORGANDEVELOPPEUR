// #APP

class App
{
// #VARIABLES

    // --APP-CONTEXT
    #app_$START = writable(false)
    #app_$FREEZE = writable(false)
    #app_MOBILE
    #app_OPTIMISE = false
    #app_OPTIMISE_CONFIG = {}
    #app_STORAGE = {}

// #CONSTRUCTOR

constructor ()
{
    this.app_updateFormat = this.app_updateFormat.bind(this)
    this.app_updateMode = this.app_updateMode.bind(this)

    this.app_c$Mobile = this.app_c$Mobile.bind(this)
    this.app_c$Optimise = this.app_c$Optimise.bind(this)
}

// #FUNCTIONS

    // --SET
    app_set() { this.#app_setCommands() }

    #app_setCommands()
    {
        COMMAND.command_setBasicCommand(
            'mobile',
            this.app_c$Mobile,
            { defaultValue: this.#app_MOBILE },
            { testBoolean: true },
            false
        )

        COMMAND.command_setBasicCommand(
            'optimise',
            this.app_c$Optimise,
            { defaultValue: this.#app_OPTIMISE },
            { testBoolean: true },
            true
        )
    }

    app_setFormat() { this.app_MOBILE = navigator.maxTouchPoints > 0 && navigator.userAgent.match(/(iPhone|iPad|Android)/i) ? true : false }

    // --RESTORE
    app_restore()
    {
        const COMMANDS = COMMAND.command_COMMANDS

        for (const NAME of COMMAND.command_KEYSTORAGE)
            try { COMMANDS[NAME](localStorage.getItem(NAME) ?? 'd') } catch { localStorage.removeItem(NAME) }

        try { if (COMMAND.command_testCommand('clear')) COMMANDS.clear() } catch {}
    }

    // --UPDATES
    app_updateFormat(mobile) {  }

    app_updateMode(optimise)
    {
        if (optimise) this.app_saveStorage(this.#app_OPTIMISE_CONFIG)

        COMMAND.command_update(optimise ? this.#app_OPTIMISE_CONFIG : this.#app_STORAGE)

        this.app_OPTIMISE = optimise
    }
    
    // --COMMANDS
    app_c$Mobile(on) { COMMAND.command_test(on, 'boolean', this.app_updateFormat, 'mobile', this.#app_MOBILE) } // does not change the value of app_MOBILE

    app_c$Optimise(on) { COMMAND.command_test(on, 'boolean', this.app_updateMode, 'optimise', this.#app_OPTIMISE) }

    // --UTIL
    app_saveStorage(config = {}) { for (const NAME in config) this.#app_STORAGE[NAME] = localStorage.getItem(NAME) }

    // --GETTER
    get app_$START() { return this.#app_$START }

    get app_$FREEZE() { return this.#app_$FREEZE }

    get app_MOBILE() { return this.#app_MOBILE }

    get app_OPTIMISE() { return this.#app_OPTIMISE }

    get app_OPTIMISE_CONFIG() { return this.#app_OPTIMISE_CONFIG }

    // --SETTER
    set app_$START(start) { this.#app_$START.set(start) }

    set app_$FREEZE(on) { this.#app_$FREEZE.set(on) }

    set app_MOBILE(on)
    {
        if (this.#app_MOBILE !== on)
        {
            this.#app_MOBILE = on

            this.app_updateFormat(on)
        }
    }

    set app_OPTIMISE(on)
    {
        if (this.#app_OPTIMISE !== on)
        {
            this.#app_OPTIMISE = on

            localStorage.setItem('optimise', on) 
        }
    }

    set app_OPTIMISE_CONFIG(name) { this.#app_OPTIMISE_CONFIG[name] = false }
}

// #IMPORTS

    // --CONTEXT
    import COMMAND from './mCommand'

    // --SVELTE
    import { writable } from 'svelte/store'

// #EXPORT

    // --CONTEXT
    export default new App()