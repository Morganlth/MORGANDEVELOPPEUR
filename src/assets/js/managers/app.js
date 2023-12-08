/*----------------------------------------------- #||--App--|| */


/*-- #|-CLASS-| --*/

class App
{

// #\-STATICS-\

    // --*
    static __app_SAVE_NAME     = 'save'
    static __app_OPTIMIZE_NAME = 'optimize'


// #\-PRIVATES-\

    // --THIS
    #app
    
    #app_LANG = ''

    #app_$HIDE         = writable(true)
    #app_$MOBILE       = writable(false)
    #app_$FREEZE       = { value: false, setter: function (args) { this.target = args[1] }, optionalparameters: { target: null } }
    #app_$OPTIMIZE     = { value: false }
    #app_$SMALL_SCREEN = { value: false }
    #app_$USER_AGENT   = { value: '-?' }

    #app_OPTIMIZE_CONFIG = {}
    #app_STORAGE         = {}
    #app_COMMANDS        = []
    #app_WAITING_LOADING = []

    #app_TIMEOUT


// #\-PUBLICS-\

    // --THIS
    app_WIDTH             = 0
    app_HEIGHT            = 0
    app_RATIO             = 0
    app_PAGE_INTRO_HEIGHT = 0
    app_SCROLLTOP         = 0


// #\-CONSTRUCTOR-\

    // --THIS
    constructor ()
    {
        this.#app_setStores()

        this.#app_COMMANDS.push(
        {
            name           : App.__app_OPTIMIZE_NAME,
            callback       : this.#app_c$Optimize.bind(this),
            getCurrentValue: () => this.#app_$OPTIMIZE.value,
            params         : { defaultValue: this.#app_$OPTIMIZE.value },
            tests          : { testBoolean: true },
            desc           : { fr: 'Optimiser l\'application (p: \'t\' ou \'f\')', en: 'Optimize the application (p: \'t\' or \'f\')' },
            storage        : true
        })
    }


// #\-FUNCTIONS-\

//=======@SETTER|

    // --*
    set app_$MOBILE(value) { this.#app_$MOBILE.set(value) }

    set app_$FREEZE({value, target})
    {
        const CURRENT_TARGET = this.#app_$FREEZE.target
    
        if (CURRENT_TARGET == null || CURRENT_TARGET === target) this.#app_$FREEZE.set(value, value ? target : null)
    }

    set app_$OPTIMIZE(value)
    {
        if (this.#app_$OPTIMIZE.value !== value)
        {
            this.#app_$OPTIMIZE.set(value)

            localStorage.setItem(App.__app_OPTIMIZE_NAME, value) 
        }
    }

    set app_OPTIMIZE_CONFIG({name, value}) { this.#app_OPTIMIZE_CONFIG[name] = value ?? false }

    set app_WAITING_LOADING(func) { if (func instanceof Function) this.#app_WAITING_LOADING ? this.#app_WAITING_LOADING.push(func) : func() }


//=======@GETTER|

    // --*
    get app()                 { return this.#app }

    get app_LANG()            { return this.#app_LANG }

    get app_$HIDE()           { return this.#app_$HIDE }

    get app_$MOBILE()         { return this.#app_$MOBILE }

    get app_$FREEZE()         { return this.#app_$FREEZE }

    get app_$SMALL_SCREEN()   { return this.#app_$SMALL_SCREEN }

    get app_$OPTIMIZE()       { return this.#app_$OPTIMIZE }

    get app_$USER_AGENT()     { return this.#app_$USER_AGENT }

    get app_OPTIMIZE_CONFIG() { return this.#app_OPTIMIZE_CONFIG }

    get app_WAITING_LOADING() { return this.#app_WAITING_LOADING }


//=======@LIFE|

    // --SET
    app_set(app, lang)
    {
        this.app_hide()
        this.#app_setLang(lang)
        this.#app_setVars(app)
        this.#app_setCommands()
        this.#app_restore()
        this.#app_loaded()
    }

    #app_setStores()
    {
        this.#app_$FREEZE       = store_custom(this.#app_$FREEZE)
        this.#app_$OPTIMIZE     = store_custom(this.#app_$OPTIMIZE)
        this.#app_$SMALL_SCREEN = store_custom(this.#app_$SMALL_SCREEN)
        this.#app_$USER_AGENT   = store_custom(this.#app_$USER_AGENT)
    }

    app_setLang(lang)  { this.#app_LANG = lang ?? LANGS[0] }

    #app_setLang(lang) { document.documentElement.lang = lang }

    #app_setVars(app)
    {
        this.#app = app ?? document.getElementById('app')

        this.#app_$USER_AGENT.set(navigator.userAgent.match(/(Chrome|Safari|Edg)/i) ? '-webkit' : '-?')
    }

    #app_setCommands() { COMMAND.command_setCommands(this.#app_COMMANDS) }

    #app_setSaveStorage()
    {
        const
        SAVE   = localStorage.getItem(App.__app_SAVE_NAME),
        CONFIG = JSON.parse(SAVE ?? '{}')
    
        for (const NAME in this.#app_OPTIMIZE_CONFIG) this.#app_STORAGE[NAME] = CONFIG[NAME] ?? (localStorage.getItem(NAME) ?? 'd')

        if (!SAVE) localStorage.setItem(App.__app_SAVE_NAME, JSON.stringify(this.#app_STORAGE))
    }

    // --GET
    app_getOptimizeState() { return localStorage.getItem(App.__app_OPTIMIZE_NAME) === 'true' }

    // --UPDATES
    app_updateSize()
    {
        this.app_WIDTH             = window.innerWidth
        this.app_HEIGHT            = window.innerHeight
        this.app_RATIO             = this.app_WIDTH / this.app_HEIGHT
        this.app_PAGE_INTRO_HEIGHT = this.app_HEIGHT
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
    #app_c$Optimize(value)
    {
        const COMMANDS = value
        ? this.#app_OPTIMIZE_CONFIG
        : (this.#app_STORAGE ?? (JSON.parse(localStorage.getItem(App.__app_SAVE_NAME) ?? {})))

        value ? this.#app_setSaveStorage() : this.app_destroySaveStorage()

        COMMAND.command_executes(COMMANDS)

        this.#app_$OPTIMIZE.set(value)
    }


//=======@EVENTS|

    // --*


//=======@UTILS|

    // --*
    app_testScreen(width, height) { return this.app_WIDTH < (width ?? -Infinity) || this.app_HEIGHT < (height ?? -Infinity) }

    #app_restore()
    {
        const
        OPTIMIZE        = this.#app_$OPTIMIZE.value,
        OPTIMIZE_CONFIG = this.#app_OPTIMIZE_CONFIG,
        COMMANDS        = COMMAND.command_COMMANDS

        for (const NAME of COMMAND.command_KEYSTORAGE)
        {
            try
            {
                const [COMMAND, STORAGE] = [COMMANDS[NAME], localStorage.getItem(NAME)]

                if (OPTIMIZE && NAME in OPTIMIZE_CONFIG) COMMAND(OPTIMIZE_CONFIG[NAME])
                if (STORAGE != null) COMMAND(STORAGE)
            }
            catch { localStorage.removeItem(NAME) }
        }

        try { if (COMMAND.command_test('clear')) COMMANDS.clear() } catch {}
    }

    async #app_loaded()
    {
  await tick() // router => event_scrollTo => tick

        for (const CALLBACK of this.#app_WAITING_LOADING) CALLBACK()

        this.#app_WAITING_LOADING = null
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
    import { tick }     from 'svelte'
    import { writable } from 'svelte/store'

    // --LIB
    import store_custom from '$lib/store'
    import BREAKPOINTS  from '$lib/breakpoints'
    import { LANGS }    from '$lib/lang'

    // --CONTEXTS
    import COMMAND from './command'


// #\-EXPORTS-\

    // --THIS
    export default new App()