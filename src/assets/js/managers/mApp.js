// #APP

class App
{
// #VARIABLES

    // --APP-CONTEXT
    #app
    #app_$FREEZE = writable(false)
    #app_$HIDE = writable(false)
    #app_OPTIMISE = false
    #app_OPTIMISE_CONFIG = {}
    #app_STORAGE = {}
    #app_COMMANDS = []
    #app_TIMEOUT

    app_scrollTop = 0

// #CONSTRUCTOR

constructor ()
{
    this.app_updateMode = this.app_updateMode.bind(this)

    this.app_c$Optimise = this.app_c$Optimise.bind(this)

    this.#app_COMMANDS.push(
        {
            name: 'optimise',
            callback: this.app_c$Optimise,
            params: { defaultValue: this.#app_OPTIMISE },
            tests: { testBoolean: true },
            storage: true
        }
    )
}

// #FUNCTIONS

    // --SET
    app_set()
    {
        this.#app_setVars()
        this.#app_setCommands()

        this.#app_restore()
    }

    #app_setVars() { this.#app = document.getElementById('app') }

    #app_setCommands() { COMMAND.command_setBasicCommands(this.#app_COMMANDS) }

    // #app_setFormat() { this.app_MOBILE = navigator.maxTouchPoints > 0 && navigator.userAgent.match(/(iPhone|iPad|Android)/i) ? true : false }

    // --RESTORE
    #app_restore()
    {
        const
        OPTIMISE = this.#app_OPTIMISE,
        OPTIMISE_CONFIG = this.#app_OPTIMISE_CONFIG,
        COMMANDS = COMMAND.command_COMMANDS

        for (const NAME of COMMAND.command_KEYSTORAGE)
            try
            {
                COMMANDS[NAME](
                    OPTIMISE && NAME in OPTIMISE_CONFIG
                    ? OPTIMISE_CONFIG[NAME]
                    : localStorage.getItem(NAME) ?? 'd'
                )
            }
            catch { localStorage.removeItem(NAME) }

        try { if (COMMAND.command_testCommand('clear')) COMMANDS.clear() } catch {}
    }

    // --UPDATE
    app_updateMode(optimise)
    {
        if (optimise) this.app_saveStorage(this.#app_OPTIMISE_CONFIG)

        COMMAND.command_update(optimise ? this.#app_OPTIMISE_CONFIG : this.#app_STORAGE)

        this.app_OPTIMISE = optimise
    }
    
    // --COMMAND
    app_c$Optimise(on) { COMMAND.command_test(on, 'boolean', this.app_updateMode, 'optimise', this.#app_OPTIMISE) }

    // --UTIL
    app_saveStorage(config = {}) { for (const NAME in config) this.#app_STORAGE[NAME] = localStorage.getItem(NAME) }

    // --GETTER
    get app() { return this.#app }

    get app_$FREEZE() { return this.#app_$FREEZE }

    get app_$HIDE() { return this.#app_$HIDE }

    get app_OPTIMISE() { return this.#app_OPTIMISE }

    get app_OPTIMISE_CONFIG() { return this.#app_OPTIMISE_CONFIG }

    // --SETTER
    set app_$FREEZE(on) { this.#app_$FREEZE.set(on) }

    set app_$HIDE(on)
    {
        clearTimeout(this.#app_TIMEOUT)

        this.#app_$HIDE.set(on)

        this.#app_TIMEOUT = setTimeout(() => this.#app_$HIDE.set(false), 700)
    }

    set app_OPTIMISE(on)
    {
        if (this.#app_OPTIMISE !== on)
        {
            this.#app_OPTIMISE = on

            localStorage.setItem('optimise', on) 
        }
    }

    set app_OPTIMISE_CONFIG({name, value}) { this.#app_OPTIMISE_CONFIG[name] = value ?? false }
}

// #IMPORTS

    // --CONTEXT
    import COMMAND from './mCommand'

    // --SVELTE
    import { writable } from 'svelte/store'

// #EXPORT

    // --CONTEXT
    export default new App()