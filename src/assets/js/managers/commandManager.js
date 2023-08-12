// #COMMAND-MANAGER

class CommandManager
{
// --VARIABLES

    // --COMMAND-CONTEXT
    #command_COMMANDS = {}
    #command_KEYWORDS = ['reload', 'reset', 'success', 'error', 'commands', 'fps']
    #command_KEYSTORAGE = []
    #command_PARAMS = { defaultValue: true, min: null, max: null, optimise: false }
    #command_TESTS = { testBoolean: false, testNumber: false }

// #CONSTRUCTOR

constructor ()
{
    for (const NAME of this.#command_KEYWORDS)
        try { this.command_add(NAME, this['command_' + NAME].bind(this)) } catch {}
}

    // --SET
    command_setBasicCommand(name, callback, params = this.#command_PARAMS, tests = this.#command_TESTS, storage)
    {
        const OPTIMISE = params.optimise

        if (OPTIMISE) APP.app_CONFIG_OPTIMISE = name

        this.command_add(name, (value) =>
        {
            value = this.#command_testValue(value, params, tests)

            callback(value)

            if (value === true && OPTIMISE) APP.app_OPTIMISE = false
            if (value !== null)
            {
                if (storage) localStorage.setItem(name, value)

                this.command_success(name + ' ' + value)
            }
        }, storage)
    }

    // --UPDATE
    command_update(commands)
    {
        for (const NAME in commands)
            try { this.#command_COMMANDS[NAME](commands[NAME]) } catch {}
    }

    // --COMMANDS
    command_reload() { APP.app_updateFormat(this.app_MOBILE) }

    command_reset(view = false)
    {
        APP.app_saveStorage()

        for (const NAME of this.#command_KEYSTORAGE) this.#command_COMMANDS[NAME]('d')

        if (!view && this.command_testCommand('clear')) this.#command_COMMANDS.clear()
    }

    command_success(msg, name) { if (this.command_testCommand('log')) this.#command_COMMANDS.log(new CommandSuccess(msg, name)) }
    
    command_error(msg, type) { throw new CommandError(type ?? 'Error', msg) }

    command_commands()
    {
        if (this.command_testCommand('log'))
            for (const NAME of this.#command_KEYWORDS) this.#command_COMMANDS.log(NAME)
    }

    command_fps() { if (this.command_testCommand('log')) fps_get().then(fps => this.#command_COMMANDS.log(fps + ' fps')) }

    // --TESTS
    command_test(value, type, callback, name, target)
    {
        typeof value === type
        ?   value !== target
            ? callback(value)
            : null
        : this.command_success(name, target)
    }

    command_testCommand(toTest)
    {
        return this.#command_KEYWORDS.includes(toTest)
        ? true
        : this.command_error('Une erreur s\'est produite, tenter de recharger la page')
    }

    #command_testValue(value, params, tests)
    {
        return (
        this.command_testNull(value)
        ?   null
        :   this.command_testDefault(value)                                     // test default value
            ?   params.defaultValue
            :   tests.testBoolean
                ? this.command_testBoolean(value)                               // test boolean value 
                :   tests.testNumber
                    ? this.command_testNumber(value, params.min, params.max)    // test Number value
                    : null
        )
    }

    command_testNull(toTest) { return toTest == void 0 || toTest === '' }

    command_testDefault(toTest) { return toTest === 'd' || toTest === 'default' }

    command_testBoolean(toTest)
    {
        switch (toTest)
        {
            case false:
            case 'f':
            case 'false': return false
            case true:
            case 't':
            case 'true': return true
            default: return this.command_error('"t" / "true" pour vrai - "f" / "false" pour faux', 'TypeError')
        }
    }

    command_testNumber(toTest, min, max)
    {
        if (!/^\d*?\.?\d+$/.test(toTest)) this.command_error('la valeur doit être un nombre', 'TypeError')
        if (min && max && (toTest < min || toTest > max)) this.command_error(`la valeur doit être comprise entre [${min} et ${max}]`, 'RangeError')

        return parseInt(toTest, 10)
    }
    
    // --UTIL
    command_add(name, command, storage = false)
    {
        if (!this.command_KEYWORDS.includes(name)) this.command_KEYWORDS.push(name)
        if (storage && !this.#command_KEYSTORAGE.includes(name)) this.#command_KEYSTORAGE.push(name)

        this.#command_COMMANDS[name] = command
    }

    // --GETTER
    get command_COMMANDS() { return this.#command_COMMANDS }

    get command_KEYWORDS() { return this.#command_KEYWORDS }

    get command_KEYSTORAGE() { return this.#command_KEYSTORAGE }
}

// #IMPORTS

    // --JS
    import CommandSuccess from '../class/success'
    import CommandError from '../class/error'
    import fps_get from '../utils/fps'

    // --CONTEXT
    import APP from './appManager'

// #EXPORT

export default new CommandManager()