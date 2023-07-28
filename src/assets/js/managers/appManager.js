// #APP-MANAGER

class AppManager
{
// #VARIABLES

    // --APP-CONTEXT
    app_FREEZE
    app_KEYWORDS = ['reset', 'success', 'error', 'fps', 'eco']
    app_KEYSTORAGE = []
    app_COMMANDS = {}
    app_CONFIGSAVE = {}

// #CONSTRUCTOR

constructor ()
{
    this.app_FREEZE = writable(false)

    this.app_set()
}

// #FUNCTIONS

    // --SET
    app_set()
    {
        for (const KEY of this.app_KEYWORDS)
            this.app_COMMANDS[KEY] = this['app_' + KEY].bind(this)
    }

    // --RESET
    app_reset(view = false)
    {
        for (const KEY of this.app_KEYSTORAGE) this.app_COMMANDS[KEY]('d')

        if (!view && this.app_testCommand('clear')) this.app_COMMANDS.clear()
    }

    // --RESTORE
    app_restore()
    {
        for (const COMMAND of this.app_KEYSTORAGE)
        {
            const VALUE = localStorage.getItem(COMMAND)

            try { this.app_COMMANDS[COMMAND](VALUE ?? 'd') } catch { localStorage.removeItem(COMMAND) }
        }

        if (this.app_testCommand('clear')) this.app_COMMANDS.clear()
    }


    // --UPDATE
    app_update(params) // params = { command: value, ... }
    {
        for (const COMMAND in params)
            if (this.app_testCommand(COMMAND)) this.app_COMMANDS[COMMAND](params[COMMAND])

        if (this.app_testCommand('clear')) this.app_COMMANDS.clear()
    }

    app_updateMode(eco) { localStorage.setItem('mode', eco ? 'eco' : 'perso') }
    
    // --COMMANDS
    app_success(msg) { if (this.app_testCommand('log')) this.app_COMMANDS.log(new AppSuccess(msg)) }
    
    app_error(msg, type) { throw new AppError(type ?? 'Error', msg) }

    async app_fps() { if (this.app_testCommand('log')) this.app_COMMANDS.log(await fps_get() + ' fps') }

    app_eco(eco)
    {
        eco = this.app_testDefault(eco) ? true : this.app_testBoolean(eco)

        if (eco)
        {
            this.app_saveConfig()
            this.app_update({ spring: false, snake: false })
        }
        else this.app_update(this.app_CONFIGSAVE)

        this.app_updateMode(eco)
        this.app_success('eco mode ' + eco)
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
        if (storage && !this.app_KEYSTORAGE.includes(name)) this.app_KEYSTORAGE.push(name)

        this.app_COMMANDS[name] = command
    }

    app_saveConfig()
    {
        this.app_CONFIGSAVE =
        {
            spring: localStorage.getItem('spring'),
            snake: localStorage.getItem('snake')
        }
    }
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