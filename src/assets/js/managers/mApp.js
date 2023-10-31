// #APP

class App
{
// #VARIABLES

    // --APP-CONTEXT
    static __app_SAVE_NAME = 'save'
    static __app_OPTIMISE_NAME = 'optimise'

    #app
    #app_$CHARGED = writable(false)
    #app_$FREEZE = { init: false }
    #app_$OPTIMISE = { init: false }
    #app_$HIDE = writable(false)
    #app_$SMALL_SCREEN = writable(false)
    #app_OPTIMISE_CONFIG = {}
    #app_STORAGE = {}
    #app_COMMANDS = []
    #app_TIMEOUT

    app_WIDTH = 0
    app_HEIGHT = 0
    app_SCROLLTOP = 0

// #CONSTRUCTOR

constructor ()
{
    this.#app_setVars2()
    this.#app_setVars3()

    this.#app_COMMANDS.push(
    {
        name: App.__app_OPTIMISE_NAME,
        callback: this.app_c$Optimise.bind(this),
        params: { defaultValue: this.#app_$OPTIMISE.value },
        tests: { testBoolean: true },
        desc: 'Optimiser l\'application (p: \'t\' ou \'f\')',
        storage: true
    })
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
        this.#app_$CHARGED.set(true)

        this.app_updateSmallScreen()
    }

    #app_setVars2()
    {
        let { set, subscribe } = writable(this.#app_$FREEZE.init)

        this.#app_$FREEZE =
        {
            value: this.#app_$FREEZE.init,
            target: null,
            set: function (value, target)
            {
                this.value = value
                this.target = target

                set(value)
            },
            subscribe
        }
    }

    #app_setVars3()
    {
        let { set, subscribe } = writable(this.#app_$OPTIMISE.init)

        this.#app_$OPTIMISE =
        {
            value: this.#app_$OPTIMISE.init,
            set: function (value)
            {
                this.value = value

                set(value)
            },
            subscribe
        }
    }

    #app_setCommands() { COMMAND.command_setBasicCommands(this.#app_COMMANDS) }

    #app_setSaveStorage()
    {
        const
        SAVE = localStorage.getItem(App.__app_SAVE_NAME),
        CONFIG = JSON.parse(SAVE ?? '{}')
    
        for (const NAME in this.#app_OPTIMISE_CONFIG) this.#app_STORAGE[NAME] = CONFIG[NAME] ?? (localStorage.getItem(NAME) ?? 'd')

        if (!SAVE) localStorage.setItem(App.__app_SAVE_NAME, JSON.stringify(this.#app_STORAGE))
    }

    // --DESTROY
    app_destroySaveStorage() { localStorage.removeItem(App.__app_SAVE_NAME) }

    // --RESTORE
    #app_restore()
    {
        const
        OPTIMISE = this.#app_$OPTIMISE.value,
        OPTIMISE_CONFIG = this.#app_OPTIMISE_CONFIG,
        COMMANDS = COMMAND.command_COMMANDS

        for (const NAME of COMMAND.command_KEYSTORAGE)
        {
            try
            {
                const [COMMAND, STORAGE] = [COMMANDS[NAME], localStorage.getItem(NAME)]

                if (OPTIMISE && NAME in OPTIMISE_CONFIG) COMMAND(OPTIMISE_CONFIG[NAME])
                if (STORAGE != null) COMMAND(STORAGE)
            }
            catch { localStorage.removeItem(NAME) }
        }

        try { if (COMMAND.command_testCommand('clear')) COMMANDS.clear() } catch {}
    }

    // --UPDATES
    app_updateSize() { [this.app_WIDTH, this.app_HEIGHT] = [window.innerWidth, window.innerHeight] }

    app_updateSmallScreen() { this.#app_$SMALL_SCREEN.set(this.app_testScreen(BREAKPOINTS.ms3, BREAKPOINTS.ms3)) }

    #app_updateMode(optimise)
    {
        optimise ? this.#app_setSaveStorage() : this.app_destroySaveStorage()

        COMMAND.command_update(optimise
            ? this.#app_OPTIMISE_CONFIG
            : (this.#app_STORAGE ?? (JSON.parse(localStorage.getItem(App.__app_SAVE_NAME) ?? {})))
        )

        this.#app_$OPTIMISE.set(optimise)
    }
    
    // --COMMAND
    app_c$Optimise(value) { COMMAND.command_test(value, 'boolean', this.#app_updateMode.bind(this), App.__app_OPTIMISE_NAME, this.#app_$OPTIMISE.value) }

    // --TEST
    app_testScreen(width, height) { return this.app_WIDTH < (width ?? -Infinity) || this.app_HEIGHT < (height ?? -Infinity) }

    // --GETTER
    get app() { return this.#app }

    get app_$CHARGED() { return this.#app_$CHARGED }

    get app_$FREEZE() { return this.#app_$FREEZE }

    get app_$HIDE() { return this.#app_$HIDE }

    get app_$SMALL_SCREEN() { return this.#app_$SMALL_SCREEN }

    get app_$OPTIMISE() { return this.#app_$OPTIMISE }

    get app_OPTIMISE_CONFIG() { return this.#app_OPTIMISE_CONFIG }

    // --SETTER
    set app_$FREEZE({value, target})
    {
        const CURRENT_TARGET = this.#app_$FREEZE.target
    
        if (!CURRENT_TARGET || CURRENT_TARGET === target) this.#app_$FREEZE.set(value, value ? target : null)
    }

    set app_$HIDE(value)
    {
        clearTimeout(this.#app_TIMEOUT)

        this.#app_$HIDE.set(value)

        this.#app_TIMEOUT = setTimeout(() => this.#app_$HIDE.set(false), 600)
    }

    set app_$OPTIMISE(value)
    {
        if (this.#app_$OPTIMISE.value !== value)
        {
            this.#app_$OPTIMISE.set(value)

            localStorage.setItem(App.__app_OPTIMISE_NAME, value) 
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