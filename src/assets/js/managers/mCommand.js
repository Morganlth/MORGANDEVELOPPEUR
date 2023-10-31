// #COMMAND

class Command
{
// --VARIABLES

    // --COMMAND-CONTEXT
    static __command_DEFAULTS_COMMANDS =
    [
        {
            name: 'reset',
            desc: 'Réinitialiser les paramètres',
            args: false
        },
        {
            name: 'success',
            desc: 'Afficher un Succès (p1: message, p2: nom du succès)',
            args: true
        },
        {
            name: 'error',
            desc: 'Afficher une Erreur (p1: message, p2: nom de l\'erreur)',
            args: true
        },
        {
            name: 'config',
            desc: 'Afficher la configuration actuelle',
            args: false
        },
        {
            name: 'commands',
            desc: 'Afficher l\'ensemble des commandes',
            args: false
        },
        {
            name: 'fps',
            desc: 'Obtenir les fps et fps moyen',
            args: false
        }
    ]

    static __command_PARAMS = { defaultValue: true, min: null, max: null, optimise: false }
    static __command_TESTS = { testBoolean: false, testNumber: false }

    #command_COMMANDS = {}
    #command_KEYSTORAGE = []

// #CONSTRUCTOR

constructor ()
{
    for (const COMMAND of Command.__command_DEFAULTS_COMMANDS)
    {
        try
        {
            const
            NAME = COMMAND.name,
            CALLBACK = this['command_c$' + NAME.charAt(0).toUpperCase() + NAME.slice(1).toLowerCase()].bind(this)
        
            this.command_add(NAME, CALLBACK, COMMAND.desc, COMMAND.args)
        } catch { continue }
    }
}

    // --SET
    command_setBasicCommands(commands)
    {
        for (let { name, callback, params = Command.__command_PARAMS, tests = Command.__command_TESTS, desc, storage } of commands)
        {
            if (params.optimise) APP.app_OPTIMISE_CONFIG = { name: name, value: params.optimise.value }

            this.command_add(name, (value) =>
            {
                value = this.command_testValue(value, params, tests)

                callback(value)

                if (value !== null)
                {
                    if (params.optimise && value !== params.optimise?.value) APP.app_$OPTIMISE = false
                    if (storage) localStorage[value === params.defaultValue ? 'removeItem' : 'setItem'](name, value)

                    this.command_c$Success(name + ' ' + value)
                }
            }, desc, true, storage)
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

        APP.app_destroySaveStorage()

        if (!view && this.command_testCommand('clear')) this.#command_COMMANDS.clear()
    }

    command_c$Success(msg, name) { if (this.command_testCommand('log')) this.#command_COMMANDS.log(new CommandSuccess(msg, name)) }
    
    command_c$Error(msg, type) { throw new CommandError(type ?? 'Error', msg) }

    command_c$Config()
    {
        try { if (this.command_testCommand('clear')) this.command_COMMANDS.clear() } catch {}

        for (const KEY of this.command_KEYSTORAGE) this.command_COMMANDS.success(localStorage.getItem(KEY) ?? 'default', KEY)
    }

    command_c$Commands()
    {
        for (const TOTEST of ['log', 'clear', 'write']) this.command_testCommand(TOTEST)

        const COMMANDS = this.#command_COMMANDS
    
        COMMANDS.clear()
    
        for (const NAME in COMMANDS)
        {
            const
            COMMAND = COMMANDS[NAME],
            CALLBACK = COMMAND.args ? COMMANDS.write.bind(null, `app ${NAME} `) : COMMAND
        
            COMMANDS.log(NAME, { callback: CALLBACK, placeholder: COMMAND.desc })
        }
    }

    command_c$Fps()
    {
        this.command_testCommand('log')
        
        this.#command_COMMANDS.log(`${EVENT.event_$FPS.value} fps - ${EVENT.event_$FPS.getAverage()} fps/moyen`)
    }

    // --TESTS
    command_test(toTest, type, callback, name, value)
    {
        typeof toTest === type
        ? toTest !== value
            ? callback(toTest)
            : null
        : this.command_c$Success(value, name)
    }

    command_testCommand(toTest)
    {
        return toTest in this.#command_COMMANDS
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
    command_add(name, command, desc = '', args = false, storage = false)
    {
        if (storage && !this.#command_KEYSTORAGE.includes(name)) this.#command_KEYSTORAGE.push(name)

        command.desc = desc
        command.args = args

        this.#command_COMMANDS[name] = command
    }

    // --GETTER
    get command_COMMANDS() { return this.#command_COMMANDS }

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

    // --CONTEXTS
    import APP from './mApp'
    import EVENT from './mEvent'

// #EXPORT

export default new Command()