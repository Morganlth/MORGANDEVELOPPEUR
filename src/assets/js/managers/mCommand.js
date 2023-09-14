// #COMMAND

class Command
{
// --VARIABLES

    // --COMMAND-CONTEXT
    static __command_PARAMS = { defaultValue: true, min: null, max: null, optimise: false }
    static __command_TESTS = { testBoolean: false, testNumber: false }

    #command_COMMANDS = {}
    #command_KEYWORDS = ['reset', 'success', 'error', 'commands', 'fps']
    #command_KEYSTORAGE = []

// #CONSTRUCTOR

constructor ()
{
    for (const NAME of this.#command_KEYWORDS)
        try { this.command_add(NAME, this['command_c$' + NAME.charAt(0).toUpperCase() + NAME.slice(1).toLowerCase()].bind(this)) } catch {}
}

    // --SET
    command_setBasicCommands(commands)
    {
        for (let { name, callback, params = Command.__command_PARAMS, tests = Command.__command_TESTS, storage } of commands)
        {
            if (params.optimise) APP.app_OPTIMISE_CONFIG = { name: name, value: params.optimise.value }

            this.command_add(name, (value) =>
            {
                value = this.command_testValue(value, params, tests)

                callback(value)

                if (value !== null)
                {
                    if (params.optimise && value !== params.optimise?.value) APP.app_OPTIMISE = false
                    if (storage) localStorage[value === params.defaultValue ? 'removeItem' : 'setItem'](name, value)

                    this.command_c$Success(name + ' ' + value)
                }
            }, storage)
        }
    }

    // --UPDATE
    command_update(commands)
    {
        for (const NAME in commands)
            try { this.#command_COMMANDS[NAME](commands[NAME]) } catch {}
    }

    // --COMMANDS
    command_c$Reset(view = false)
    {
        for (const NAME of this.#command_KEYSTORAGE) this.#command_COMMANDS[NAME]('d')

        if (!view && this.command_testCommand('clear')) this.#command_COMMANDS.clear()
    }

    command_c$Success(msg, name) { if (this.command_testCommand('log')) this.#command_COMMANDS.log(new CommandSuccess(msg, name)) }
    
    command_c$Error(msg, type) { throw new CommandError(type ?? 'Error', msg) }

    command_c$Commands()
    {
        if (this.command_testCommand('log'))
            for (const NAME of this.#command_KEYWORDS) this.#command_COMMANDS.log(NAME)
    }

    command_c$Fps() { if (this.command_testCommand('log')) fps_get().then(fps => this.#command_COMMANDS.log(fps + ' fps')) }

    // --TESTS
    command_test(toTest, type, callback, name, value)
    {
        typeof toTest === type
        ?   toTest !== value
            ? callback(toTest)
            : null
        : this.command_c$Success(value, name)
    }

    command_testCommand(toTest)
    {
        return this.#command_KEYWORDS.includes(toTest)
        ? true
        : this.command_c$Error('Une erreur s\'est produite, tenter de recharger la page')
    }

    command_testValue(value, params, tests)
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
            default: return this.command_c$Error('"t" / "true" pour vrai - "f" / "false" pour faux', 'TypeError')
        }
    }

    command_testNumber(toTest, min, max)
    {
        if (!/^\d*?\.?\d+$/.test(toTest)) this.command_c$Error('la valeur doit être un nombre', 'TypeError')
        if (min && max && (toTest < min || toTest > max)) this.command_c$Error(`la valeur doit être comprise entre [${min} et ${max}]`, 'RangeError')

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

// #ERROR

// --ERROR
export class CommandError extends Error
{
    constructor(type, msg)
    {
        super(msg)

        this.name = type
    }
}

export class CommandSuccess extends Error
{
    constructor(msg, name)
    {
        super(msg)

        this.name = name ?? 'Success'
    }
}

// #IMPORTS

    // --JS
    import fps_get from '../utils/fps'

    // --CONTEXT
    import APP from './mApp'

// #EXPORT

export default new Command()