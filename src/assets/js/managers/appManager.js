// #APP-MANAGER

class AppManager
{
// #VARIABLES

    // --APP-CONTEXT
    #app_MOBILE
    #app_ECO
    #app_FREEZE
    #app_KEYWORDS = ['reload', 'reset', 'success', 'error', 'mobile', 'eco', 'commands', 'fps']
    #app_KEYSTORAGE = ['eco']
    #app_COMMANDS = {}
    #app_RESPONSIVE = []
    #app_CONFIG_SAVE = {}

// #CONSTRUCTOR

constructor ()
{
    this.#app_FREEZE = writable(false)

    for (const NAME of this.app_KEYWORDS)
        try { this.app_COMMANDS = { name: NAME, command: this['app_' + NAME].bind(this) } } catch {}
}

// #FUNCTIONS

    // --SET
    app_setFormat() { this.app_MOBILE = navigator.maxTouchPoints > 0 && navigator.userAgent.match(/(iPhone|iPad|Android)/i) ? true : false }

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

    app_updateFormat(mobile) { for (const FUNC of this.#app_RESPONSIVE) FUNC(mobile) }
    
    // --COMMANDS
    app_reload() { this.app_updateFormat(this.app_MOBILE) }

    app_reset(view = false)
    {
        this.app_CONFIG_SAVE = {}
    
        for (const KEY of this.#app_KEYSTORAGE) this.app_COMMANDS[KEY]('d')

        if (!view && this.app_testCommand('clear')) this.app_COMMANDS.clear()
    }

    app_success(msg) { if (this.app_testCommand('log')) this.app_COMMANDS.log(new AppSuccess(msg)) }
    
    app_error(msg, type) { throw new AppError(type ?? 'Error', msg) }

    app_mobile(on)
    {
        if (this.app_testNull(on)) return this.app_COMMANDS.log('mobile ' + this.app_MOBILE)
    
        on = this.app_testDefault(on) ? this.app_MOBILE : this.app_testBoolean(on)

        this.app_updateFormat(on)

        this.app_success('mobile ' + on)
    }

    app_eco(on)
    {
        if (this.app_testNull(on)) return this.app_COMMANDS.log('eco ' + this.app_MOBILE)

        on = this.app_testDefault(on) ? false : this.app_testBoolean(on)

        if (on)
        {
            this.app_saveConfig()
            this.app_update({ spring: false, particles: false })
        }
        else this.app_update(this.app_CONFIG_SAVE)

        this.app_ECO = on
        this.app_success('eco ' + on)
    }

    app_commands()
    {
        for (const NAME of this.app_KEYWORDS)
            if (this.app_testCommand('log')) this.app_COMMANDS.log(NAME)
    }

    app_fps() { if (this.app_testCommand('log')) fps_get().then(fps => this.app_COMMANDS.log(fps + ' fps')) }

    // --TEST
    app_testCommand(command) { return this.app_KEYWORDS.includes(command) }

    app_testNull(value) { return (value == void 0 || value === '') && this.app_testCommand('log') }

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

    app_addResponsive(func)
    {
        const INDEX = this.#app_RESPONSIVE.indexOf(func)

        if (INDEX === -1) this.#app_RESPONSIVE.push(func)
    }

    app_removeResponsive(func)
    {
        const INDEX = this.#app_RESPONSIVE.indexOf(func)
    
        if (INDEX !== -1) this.#app_RESPONSIVE.splice(INDEX, 1)
    }

    app_saveConfig()
    {
        this.app_CONFIG_SAVE =
        {
            spring: localStorage.getItem('spring'),
            particles: localStorage.getItem('particles')
        }
    }

    // --GETTER
    get app_MOBILE() { return this.#app_MOBILE }

    get app_ECO() { return this.#app_ECO }

    get app_FREEZE() { return this.#app_FREEZE }

    get app_KEYWORDS() { return this.#app_KEYWORDS }

    get app_COMMANDS() { return this.#app_COMMANDS }

    get app_CONFIG_SAVE() { return this.#app_CONFIG_SAVE }

    // --SETTER
    set app_MOBILE(on)
    {
        if (this.#app_MOBILE !== on)
        {
            this.#app_MOBILE = on

            this.app_updateFormat(on)
        }
    }

    set app_ECO(on)
    {
        if (this.#app_ECO !== on)
        {
            this.#app_ECO = on

            localStorage.setItem('eco', on) 
        }
    }

    set app_FREEZE(on) { this.#app_FREEZE.set(on) }

    set app_COMMANDS({ name, command }) { this.#app_COMMANDS[name] = command }

    set app_CONFIG_SAVE(config) { this.#app_CONFIG_SAVE = config }
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