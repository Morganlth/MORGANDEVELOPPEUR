/*----------------------------------------------- #||--App--|| */


/*-- #|-CLASS-| --*/

class App
{

// #\-STATICS-\

    // --*
    static __app_SAVE_NAME     = 'save'
    static __app_OPTIMISE_NAME = 'optimise'


// #\-PRIVATES-\

    // --THIS
    #app

    #app_$HIDE         = writable(true)
    #app_$MOBILE       = writable(false)
    #app_$FREEZE       = { value: false, setter: function ({target}) { this.target = target }, optionalparameters: { target: null } }
    #app_$OPTIMISE     = { value: false }
    #app_$SMALL_SCREEN = { value: false }

    #app_OPTIMISE_CONFIG = {}
    #app_STORAGE         = {}
    #app_COMMANDS        = []

    #app_TIMEOUT


// #\-PUBLICS-\

    // --THIS
    app_WIDTH             = 0
    app_HEIGHT            = 0
    app_PAGE_INTRO_HEIGHT = 0
    app_SCROLLTOP         = 0

    app_WAITING_LOADING = []


// #\-CONSTRUCTOR-\

    // --THIS
    constructor ()
    {
        this.#app_setStores()

        this.#app_COMMANDS.push(
        {
            name: App.__app_OPTIMISE_NAME,
            callback: this.#app_c$Optimise.bind(this),
            getCurrentValue: () => this.#app_$OPTIMISE.value,
            params: { defaultValue: this.#app_$OPTIMISE.value },
            tests: { testBoolean: true },
            desc: 'Optimiser l\'application (p: \'t\' ou \'f\')',
            storage: true
        })
    }


// #\-FUNCTIONS-\

//=======@SETTER|

    // --*
    set app_$MOBILE(value) { this.#app_$MOBILE.set(value) }

    set app_$FREEZE({value, target})
    {
        const CURRENT_TARGET = this.#app_$FREEZE.target
    
        if (!CURRENT_TARGET || CURRENT_TARGET === target) this.#app_$FREEZE.set(value, { target: value ? target : null })
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


//=======@GETTER|

    // --*
    get app()                 { return this.#app }

    get app_$HIDE()           { return this.#app_$HIDE }

    get app_$MOBILE()         { return this.#app_$MOBILE }

    get app_$FREEZE()         { return this.#app_$FREEZE }

    get app_$SMALL_SCREEN()   { return this.#app_$SMALL_SCREEN }

    get app_$OPTIMISE()       { return this.#app_$OPTIMISE }

    get app_OPTIMISE_CONFIG() { return this.#app_OPTIMISE_CONFIG }


//=======@LIFE|

    // --SET
    app_set(app)
    {
        this.app_hide()

        this.#app_setVars(app)
        this.#app_setCommands()

        this.#app_restore()
        this.#app_loaded()
    }

    #app_setStores()
    {
        this.#app_$FREEZE       = store_custom(this.#app_$FREEZE)
        this.#app_$OPTIMISE     = store_custom(this.#app_$OPTIMISE)
        this.#app_$SMALL_SCREEN = store_custom(this.#app_$SMALL_SCREEN)
    }

    #app_setVars(app) { this.#app = app }

    #app_setCommands() { COMMAND.command_setCommands(this.#app_COMMANDS) }

    #app_setSaveStorage()
    {
        const
        SAVE   = localStorage.getItem(App.__app_SAVE_NAME),
        CONFIG = JSON.parse(SAVE ?? '{}')
    
        for (const NAME in this.#app_OPTIMISE_CONFIG) this.#app_STORAGE[NAME] = CONFIG[NAME] ?? (localStorage.getItem(NAME) ?? 'd')

        if (!SAVE) localStorage.setItem(App.__app_SAVE_NAME, JSON.stringify(this.#app_STORAGE))
    }

    // --GET
    app_getOptimiseState() { return localStorage.getItem(App.__app_OPTIMISE_NAME) === 'true' }

    // --UPDATES
    app_updateSize()
    {
        this.app_WIDTH             = window.innerWidth
        this.app_HEIGHT            = window.innerHeight
        this.app_PAGE_INTRO_HEIGHT = Math.floor(this.app_HEIGHT * 1.2)
    }

    app_updateSmallScreen()
    {
        const MS4 = BREAKPOINTS.ms4
    
        this.#app_$SMALL_SCREEN.set(this.app_testScreen(MS4, MS4))
    }

    // --DESTROY
    #app_destroyTimeout() { clearTimeout(this.#app_TIMEOUT) }

    app_destroySaveStorage()
    {
        localStorage.removeItem(App.__app_SAVE_NAME)

        this.#app_STORAGE = {}
    }


//=======@COMMANDS|

    // --*
    #app_c$Optimise(value)
    {
        const COMMANDS = value
        ? this.#app_OPTIMISE_CONFIG
        : (this.#app_STORAGE ?? (JSON.parse(localStorage.getItem(App.__app_SAVE_NAME) ?? {})))

        value ? this.#app_setSaveStorage() : this.app_destroySaveStorage()

        COMMAND.command_executes(COMMANDS)

        this.#app_$OPTIMISE.set(value)
    }


//=======@EVENTS|

    // --*


//=======@UTILS|

    // --*
    app_testScreen(width, height) { return this.app_WIDTH < (width ?? -Infinity) || this.app_HEIGHT < (height ?? -Infinity) }

    #app_restore()
    {
        const
        OPTIMISE        = this.#app_$OPTIMISE.value,
        OPTIMISE_CONFIG = this.#app_OPTIMISE_CONFIG,
        COMMANDS        = COMMAND.command_COMMANDS

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

        try { if (COMMAND.command_test('clear')) COMMANDS.clear() } catch {}
    }

    #app_loaded()
    {
        for (const CALLBACK of this.app_WAITING_LOADING) CALLBACK()

        delete this.app_WAITING_LOADING
    }

    app_hide()
    {
        this.#app_destroyTimeout()

        this.#app_$HIDE.set(true)

        this.#app_TIMEOUT = setTimeout(() => this.#app_$HIDE.set(false), 600)
    }


}


// #\-IMPORTS-\

    // --SVELTE
    import { writable } from 'svelte/store'

    // --LIB
    import store_custom from '$lib/store'
    import BREAKPOINTS  from '$lib/breakpoints'

    // --CONTEXTS
    import COMMAND from './command'


// #\-EXPORTS-\

    // --THIS
    export default new App()