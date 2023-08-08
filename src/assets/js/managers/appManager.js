// #APP-MANAGER

class AppManager
{
// #VARIABLES

    // --APP-CONTEXT
    #app_MOBILE
    #app_FREEZE
    #app_KEYWORDS = ['reset', 'success', 'error', 'fps', 'eco', 'mobile']
    #app_KEYSTORAGE = ['eco']
    #app_COMMANDS = {}
    #app_RESPONSIVE = []
    #app_CONFIGSAVE = {}

// #CONSTRUCTOR

constructor ()
{
    this.#app_FREEZE = writable(false)

    for (const NAME of this.app_KEYWORDS)
        try { this.app_COMMANDS = { name: NAME, command: this['app_' + NAME].bind(this) } } catch {}
}

// #FUNCTIONS

    // --SET
    app_set()
    {
        this.#app_MOBILE = navigator.maxTouchPoints > 0 && navigator.userAgent.match(/(iPhone|iPad|Android)/i) ? true : false
    }

    // --RESET
    app_reset(view = false)
    {
        for (const KEY of this.#app_KEYSTORAGE) this.app_COMMANDS[KEY]('d')

        if (!view && this.app_testCommand('clear')) this.app_COMMANDS.clear()
    }

    // --RESTORE
    app_restore()
    {
        for (const NAME of this.#app_KEYSTORAGE)
            try { this.app_COMMANDS[NAME](localStorage.getItem(NAME) ?? 'd') }
            catch (e) { console.log(e);localStorage.removeItem(NAME) }

        if (this.app_testCommand('clear')) this.app_COMMANDS.clear()
    }


    // --UPDATES
    app_update(params) // params = { command: value, ... }
    {
        for (const COMMAND in params)
            if (this.app_testCommand(COMMAND)) this.app_COMMANDS[COMMAND](params[COMMAND])
    }

    app_updateEco(on) { localStorage.setItem('eco', on) }
    
    // --COMMANDS
    app_mobile(value)
    {
        value = this.app_testDefault(value) ? this.app_MOBILE : this.app_testBoolean(value)

        for (const FUNC of this.#app_RESPONSIVE) FUNC(value)
    }

    app_success(msg) { if (this.app_testCommand('log')) this.app_COMMANDS.log(new AppSuccess(msg)) }
    
    app_error(msg, type) { throw new AppError(type ?? 'Error', msg) }

    async app_fps() { if (this.app_testCommand('log')) this.app_COMMANDS.log(await fps_get() + ' fps') }

    app_eco(on)
    {
        on = this.app_testDefault(on) ? false : this.app_testBoolean(on)

        if (on)
        {
            this.app_saveConfig()
            this.app_update({ spring: false, snake: false })
        }
        else this.app_update(this.app_CONFIGSAVE)

        this.app_updateEco(on)
        this.app_success('eco ' + on)
    }

    // --TEST
    app_testCommand(command) { return this.app_KEYWORDS.includes(command) }

    app_testDefault(value) { return value === 'd' || value === 'default' }

    app_testBoolean(value)
    {
        if (value === false || value === 'f' || value === 'false') return false
        else if (value === true || value === 't' || value === 'true') return true
        else this.app_error('"t" / "true" pour vrai - "f" / "false" pour faux', 'TypeError')
    }

    app_testNumber(value, min, max)
    {
        if (!/^\d*?\.?\d+$/.test(value)) this.app_error('la valeur doit être un nombre', 'TypeError')
        if (value < min || value > max) this.app_error(`la valeur doit être comprise entre [${min} et ${max}]`, 'RangeError')

        return parseInt(value, 10)
    }

    // --UTIL
    app_add(name, command, storage)
    {
        if (!this.app_KEYWORDS.includes(name)) this.app_KEYWORDS.push(name)
        if (storage && !this.#app_KEYSTORAGE.includes(name)) this.#app_KEYSTORAGE.push(name)

        this.app_COMMANDS = { name, command }
    }

    app_saveConfig()
    {
        this.app_CONFIGSAVE =
        {
            spring: localStorage.getItem('spring'),
            snake: localStorage.getItem('snake')
        }
    }

    // --GETTER
    get app_MOBILE() { return this.#app_MOBILE }

    get app_FREEZE() { return this.#app_FREEZE }

    get app_KEYWORDS() { return this.#app_KEYWORDS }

    get app_COMMANDS() { return this.#app_COMMANDS }

    get app_CONFIGSAVE() { return this.#app_CONFIGSAVE }

    // --SETTER
    set app_MOBILE(value) { this.#app_MOBILE = value }

    set app_FREEZE(value) { this.#app_FREEZE.set(value) }

    set app_COMMANDS({ name, command }) { this.#app_COMMANDS[name] = command }

    set app_CONFIGSAVE(config) { this.#app_CONFIGSAVE = config }
}

// #IMPORTS

    // --JS
    import AppSuccess from '../class/success'
    import AppError from '../class/error'
    import fps_get from '../utils/fps'

    // --SVELTE
    import { writable } from 'svelte/store'

// #EXPORT

    // --CONTEXT
    export default new AppManager()