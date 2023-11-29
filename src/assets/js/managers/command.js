/*----------------------------------------------- #||--Command--|| */


/*-- #|-CLASS-| --*/

class Command
{

// #\-STATICS-\

    // --*
    static __command_DEFAULTS_COMMANDS =
    [
        {
            name: 'reset',
            desc: { fr: 'Réinitialiser les paramètres', en: 'Reset settings' },
            args: false
        },
        {
            name: 'success',
            desc: { fr: 'Afficher un Succès (p1: message, p2: nom du succès)', en: 'Display a Success (p1: message, p2: name of success)' },
            args: true
        },
        {
            name: 'error',
            desc: { fr: 'Afficher une Erreur (p1: message, p2: nom de l\'erreur)', en: 'Display an Error (p1: message, p2: error name)' },
            args: true
        },
        {
            name: 'config',
            desc: { fr: 'Afficher la configuration actuelle', en: 'Display current configuration' },
            args: false
        },
        {
            name: 'commands',
            desc: { fr: 'Afficher l\'ensemble des commandes', en: 'Display all orders' },
            args: false
        },
        {
            name: 'fps',
            desc: { fr: 'Obtenir les fps et fps moyen', en: 'Get fps and average fps' },
            args: false
        }
    ]

    static __command_PARAMS = { defaultValue: true, min: null, max: null, optimize: false }
    static __command_TESTS  = { testBoolean: false, testNumber: false }


// #\-PRIVATES-\

    // --THIS


// #\-PUBLICS-\

    // --THIS
    command_COMMANDS   = {}
    command_KEYSTORAGE = []


// #\-CONSTRUCTOR-\

    // --THIS


// #\-FUNCTIONS-\

//=======@SETTER|

    // --*


//=======@GETTER|

    // --*


//=======@LIFE|

    // --SET
    command_set() { this.#command_setDefaultsCommands() }

    #command_setDefaultsCommands()
    {
        const LANG = APP.app_LANG
    
        for (const COMMAND of Command.__command_DEFAULTS_COMMANDS)
        {
            try
            {
                const
                NAME     = COMMAND.name,
                CALLBACK = this['command_c$' + NAME.charAt(0).toUpperCase() + NAME.slice(1).toLowerCase()].bind(this)
            
                this.command_add(NAME, CALLBACK, COMMAND.desc[LANG], COMMAND.args)
            }
            catch { continue }
        }
    }

    command_setCommands(commands)
    {
        for (let { name, callback, getCurrentValue, params = Command.__command_PARAMS, tests = Command.__command_TESTS, desc, storage } of commands)
        {
            if (params.optimize) APP.app_OPTIMIZE_CONFIG = { name, value: params.optimize.value }

            this.command_add(name, (value) =>
            {
                const CURRENT_VALUE = getCurrentValue()
    
                value = this.command_getValue(value, params, tests)

                value == null
                ? this.command_c$Success(CURRENT_VALUE, name)
                : this.#command_execute(name, value, CURRENT_VALUE, callback, params, storage)
            },
            desc, true, storage)
        }
    }

    // --GET
    command_getValue(value, params, tests)
    {
        return this.command_testNull(value)
        ?   null
        :   this.command_testDefault(value)                                     // test default value
            ?   params.defaultValue
            :   tests.testBoolean
                ? this.command_testBoolean(value)                               // test boolean value 
                :   tests.testNumber
                    ? this.command_testNumber(value, params.min, params.max)    // test Number value
                    : null
    }

    // --UPDATES

    // --DESTROY


//=======@COMMANDS|

    // --*
    command_c$Reset(view = false)
    {
        for (const NAME of this.command_KEYSTORAGE) this.command_COMMANDS[NAME]('d')

        APP.app_destroySaveStorage()

        if (!view && this.command_test('clear')) this.command_COMMANDS.clear()
    }

    command_c$Success(msg, name) { if (this.command_test('log')) this.command_COMMANDS.log(new CommandSuccess(msg, name)) }
    
    command_c$Error(msg, type) { throw new CommandError(type ?? 'Error', msg) }

    command_c$Config()
    {
        try { if (this.command_test('clear')) this.command_COMMANDS.clear() } catch {}

        for (const KEY of this.command_KEYSTORAGE) this.command_COMMANDS.success(localStorage.getItem(KEY) ?? 'default', KEY)
    }

    command_c$Commands()
    {
        for (const TOTEST of ['log', 'clear', 'write']) this.command_test(TOTEST)

        const COMMANDS = this.command_COMMANDS
    
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
        this.command_test('log')
        
        this.command_COMMANDS.log(`${EVENT.event_$FPS.value} fps - ${EVENT.event_$FPS.getAverage()} fps/moyen`)
    }


//=======@EVENTS|

    // --*


//=======@UTILS|

    // --*
    command_add(name, command, desc = '', args = false, storage = false)
    {
        if (storage && !this.command_KEYSTORAGE.includes(name)) this.command_KEYSTORAGE.push(name)

        command.desc = desc instanceof Object ? desc[APP.app_LANG] : desc
        command.args = args

        this.command_COMMANDS[name] = command
    }

    command_test(toTest)
    {
        return toTest in this.command_COMMANDS
        ? true
        : this.command_c$Error('Une erreur s\'est produite, tenter de recharger la page')
    }

    command_testNull(toTest) { return toTest == null || toTest === '' }

    command_testDefault(toTest) { return toTest === 'd' || toTest === 'default' }

    command_testBoolean(toTest)
    {
        switch (toTest)
        {
            case false  :
            case 'f'    :
            case 'false': return false
            case true   :
            case 't'    :
            case 'true' : return true
            default     : return this.command_c$Error('"t" / "true" pour vrai - "f" / "false" pour faux', 'TypeError')
        }
    }

    command_testNumber(toTest, min, max)
    {
        if (!/^\d*?\.?\d+$/.test(toTest)) this.command_c$Error('la valeur doit être un nombre', 'TypeError')
        if (min && max && (toTest < min || toTest > max)) this.command_c$Error(`la valeur doit être comprise entre [${min} et ${max}]`, 'RangeError')

        return parseInt(toTest, 10)
    }

    #command_execute(name, value, current_VALUE, callback = () => {}, params = {}, storage = false)
    {
        if (value !== current_VALUE) callback(value)
        if (params.optimize && value !== params.optimize.value) APP.app_$OPTIMIZE = false
        if (storage) localStorage[value === params.defaultValue ? 'removeItem' : 'setItem'](name, value)

        this.command_c$Success(name + ' ' + value)
    }

    command_executes(commands) { for (const NAME in commands) try { this.command_COMMANDS[NAME](commands[NAME]) } catch {} }


}


// #\-IMPORTS-\

    // --SVELTE

    // --LIB

    // --CONTEXTS
    import APP   from './app'
    import EVENT from './event'


// #\-EXPORTS-\

    // --THIS
    export default new Command()

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