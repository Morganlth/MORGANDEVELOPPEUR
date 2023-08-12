// #APP-MANAGER

class AppManager
{
// #VARIABLES

    // --APP-CONTEXT
    #app_FREEZE = writable(false)
    #app_MOBILE
    #app_OPTIMISE = false
    #app_CONFIG_OPTIMISE = {}
    #app_STORAGE = {}

// #CONSTRUCTOR

constructor ()
{
    this.app_updateFormat = this.app_updateFormat.bind(this)
    this.app_updateMode = this.app_updateMode.bind(this)

    this.app_commandMobile = this.app_commandMobile.bind(this)
    this.app_commandOptimise = this.app_commandOptimise.bind(this)
}

// #FUNCTIONS

    // --SET
    app_set() { this.#app_setCommand() }

    app_setFormat() { this.app_MOBILE = navigator.maxTouchPoints > 0 && navigator.userAgent.match(/(iPhone|iPad|Android)/i) ? true : false }

    #app_setCommand()
    {
        COMMAND.command_setBasicCommand(
            'mobile',
            this.app_commandMobile,
            { defaultValue: this.#app_MOBILE },
            { testBoolean: true },
            false
        )

        COMMAND.command_setBasicCommand(
            'optimise',
            this.app_commandOptimise,
            { defaultValue: this.#app_OPTIMISE },
            { testBoolean: true },
            true
        )
    }

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
        if (optimise) this.app_saveStorage(this.#app_CONFIG_OPTIMISE)

        COMMAND.command_update(optimise ? this.#app_CONFIG_OPTIMISE : this.#app_STORAGE)

        this.app_OPTIMISE = optimise
    }
    
    // --COMMANDS
    app_commandMobile(on) { COMMAND.command_test(on, 'boolean', this.app_updateFormat, 'mobile', this.#app_MOBILE) } // does not change the value of app_MOBILE

    app_commandOptimise(on) { COMMAND.command_test(on, 'boolean', this.app_updateMode, 'optimise', this.#app_OPTIMISE) }

    // --UTIL
    app_saveStorage(config = {})
    {
        const STORAGE = { ...config }
    
        for (const NAME in config) STORAGE[NAME] = localStorage.getItem(NAME)

        this.#app_STORAGE = STORAGE
    }

    // --GETTER
    get app_FREEZE() { return this.#app_FREEZE }

    get app_MOBILE() { return this.#app_MOBILE }

    get app_OPTIMISE() { return this.#app_OPTIMISE }

    get app_CONFIG_OPTIMISE() { return this.#app_CONFIG_OPTIMISE }

    // --SETTER
    set app_FREEZE(on) { this.#app_FREEZE.set(on) }

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

    set app_CONFIG_OPTIMISE(name) { this.#app_CONFIG_OPTIMISE[name] = false }
}

// #IMPORTS

    // --CONTEXT
    import COMMAND from './commandManager'

    // --SVELTE
    import { writable } from 'svelte/store'

// #EXPORT

    // --CONTEXT
    export default new AppManager()