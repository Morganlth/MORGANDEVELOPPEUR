// #APP

class App
{
// #VARIABLES

    // --APP-CONTEXT
    static __app_SAVE_NAME = 'save'
    static __app_OPTIMISE_NAME = 'optimise'

    #app
    #app_$FREEZE = {}
    #app_$OPTIMISE = {}
    #app_$HIDE = writable(false)
    #app_SMALL_SCREEN = false // use by presentation and skills for mask title with small height -> to modified
    #app_OPTIMISE_CONFIG = {}
    #app_STORAGE = {}
    #app_COMMANDS = []
    #app_TIMEOUT

    app_SCROLLTOP = 0

// #CONSTRUCTOR

constructor ()
{
    this.#app_setFreeze()
    this.#app_setOptitmise()

    this.app_updateMode = this.app_updateMode.bind(this)

    this.#app_COMMANDS.push(
        {
            name: App.__app_OPTIMISE_NAME,
            callback: this.app_c$Optimise.bind(this),
            params: { defaultValue: this.#app_$OPTIMISE.on },
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

    #app_setVars()
    {
        this.#app = document.getElementById('app')

        this.app_updateSmallScreen()
    }

    #app_setCommands() { COMMAND.command_setBasicCommands(this.#app_COMMANDS) }

    #app_setFreeze()
    {
        let { set, subscribe } = writable(false)

        this.#app_$FREEZE =
        {
            on: false,
            target: null,
            set: function (on, target)
            {
                this.on = on
                this.target = target

                set(on)
            },
            subscribe
        }
    }

    #app_setOptitmise()
    {
        let { set, subscribe } = writable(false)

        this.#app_$OPTIMISE =
        {
            on: false,
            set: function (on)
            {
                this.on = on

                set(on)
            },
            subscribe
        }
    }

    #app_setStorage()
    {
        const
        STORAGE = localStorage.getItem(App.__app_SAVE_NAME),
        CONFIG = JSON.parse(STORAGE ?? '{}')
    
        for (const NAME in this.#app_OPTIMISE_CONFIG) this.#app_STORAGE[NAME] = CONFIG[NAME] ?? (localStorage.getItem(NAME) ?? 'd')

        if (!STORAGE) localStorage.setItem(App.__app_SAVE_NAME, JSON.stringify(this.#app_STORAGE))
    }

    // --DESTROY
    #app_destroyStorage() { localStorage.removeItem(App.__app_SAVE_NAME) }

    // --RESTORE
    #app_restore()
    {
        const
        OPTIMISE = this.#app_$OPTIMISE.on,
        OPTIMISE_CONFIG = this.#app_OPTIMISE_CONFIG,
        COMMANDS = COMMAND.command_COMMANDS

        for (const NAME of COMMAND.command_KEYSTORAGE)
            try
            {
                const [COMMAND, STORAGE] = [COMMANDS[NAME], localStorage.getItem(NAME)]

                if (OPTIMISE && NAME in OPTIMISE_CONFIG) COMMAND(OPTIMISE_CONFIG[NAME])
                if (STORAGE != null) COMMAND(STORAGE)
            }
            catch { localStorage.removeItem(NAME) }

        try { if (COMMAND.command_testCommand('clear')) COMMANDS.clear() } catch {}
    }

    // --UPDATES
    app_updateSmallScreen() { this.#app_SMALL_SCREEN = this.app_testScreen(null, BREAKPOINTS.ms3) }

    app_updateMode(optimise)
    {
        optimise ? this.#app_setStorage() : this.#app_destroyStorage()

        COMMAND.command_update(optimise
            ? this.#app_OPTIMISE_CONFIG
            : (this.#app_STORAGE ?? (JSON.parse(localStorage.getItem(App.__app_SAVE_NAME) ?? {})))
        )

        this.app_$OPTIMISE = optimise
    }
    
    // --COMMAND
    app_c$Optimise(on) { COMMAND.command_test(on, 'boolean', this.app_updateMode, App.__app_OPTIMISE_NAME, this.#app_$OPTIMISE.on) }

    // --TEST
    app_testScreen(width, height) { return window.innerWidth < (width ?? -Infinity) || window.innerHeight < (height ?? -Infinity) }

    // --GETTER
    get app() { return this.#app }

    get app_$FREEZE() { return this.#app_$FREEZE }

    get app_$HIDE() { return this.#app_$HIDE }

    get app_SMALL_SCREEN() { return this.#app_SMALL_SCREEN }

    get app_$OPTIMISE() { return this.#app_$OPTIMISE }

    get app_OPTIMISE_CONFIG() { return this.#app_OPTIMISE_CONFIG }

    // --SETTER
    set app_$FREEZE({ on, target })
    {
        const CURRENT_TARGET = this.#app_$FREEZE.target
    
        if (!CURRENT_TARGET || CURRENT_TARGET === target) this.#app_$FREEZE.set(on, on ? target : null)
    }

    set app_$HIDE(on)
    {
        clearTimeout(this.#app_TIMEOUT)

        this.#app_$HIDE.set(on)

        this.#app_TIMEOUT = setTimeout(() => this.#app_$HIDE.set(false), 600)
    }

    set app_$OPTIMISE(on)
    {
        if (this.#app_$OPTIMISE.on !== on)
        {
            this.#app_$OPTIMISE.set(on)

            localStorage.setItem('optimise', on) 
        }
    }

    set app_OPTIMISE_CONFIG({name, value}) { this.#app_OPTIMISE_CONFIG[name] = value ?? false }
}

// #IMPORTS

    // --LIB
    import BREAKPOINTS from '$lib/breakpoints'

    // --CONTEXT
    import COMMAND from './mCommand'

    // --SVELTE
    import { writable } from 'svelte/store'

// #EXPORT

    // --CONTEXT
    export default new App()