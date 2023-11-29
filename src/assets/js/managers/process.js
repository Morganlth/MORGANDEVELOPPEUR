/*----------------------------------------------- #||--Process--|| */

// use damerau levenshtein method


/*-- #|-CLASS-| --*/

class Process
{

// #\-STATICS-\

    // --*
    static __process_DEFAULT_MIN = 3


// #\-PRIVATES-\

    // --THIS
    #process_TREE       = { children: {} }
    #process_KEYWORDS   = []
    #process_COMMANDS   = []

    #process_STR                = ''
    #process_FIND               = null
    #process_LENGTH             = 0
    #process_PREVIOUS_LETTER    = null
    #process_MIN                = Process.__process_DEFAULT_MIN


// #\-PUBLICS-\

    // --THIS


// #\-CONSTRUCTOR-\

    // --THIS
    constructor ()
    {
        this.#process_COMMANDS.push(
        {
            name    : 'keywords',
            callback: this.#process_c$Keywords.bind(this),
            desc    : { fr: 'Afficher les mots clés', en: 'Display keywords' }
        })
    }


// #\-FUNCTIONS-\

//=======@SETTER|

    // --*


//=======@GETTER|

    // --*


//=======@LIFE|

    // --SET
    process_set() { this.#process_setCommands() }

    #process_setVars(str)
    {
        const LENGTH = str.length
    
        this.#process_STR = str
        this.#process_FIND = null
        this.#process_LENGTH = LENGTH
        this.#process_PREVIOUS_LETTER = null,
        this.#process_MIN = LENGTH === 3 ? 1 : Process.__process_DEFAULT_MIN
    }

    #process_setCommands() { for (const CMD of this.#process_COMMANDS) COMMAND.command_add(CMD.name, CMD.callback, CMD.desc) }

    // --GET
    #process_getArrayFrom(str)
    {
        return (
        str.toLowerCase()                   // min
        .normalize("NFD")                   // normalize
        .replace(/[\u0300-\u036f]/g, "")
        .split(/[\s|']/gm))                 // split into words
    }

    #process_getRow()
    {
        const ROW = new Int8Array(this.#process_LENGTH + 1)

        for (let i = 0; i <= this.#process_LENGTH; i++) ROW[i] = i

        return ROW
    }

    #process_getCurrentRow(l, previous_ROW)
    {
        const CURRENT_ROW = new Int8Array(this.#process_LENGTH + 1)

        CURRENT_ROW[0] = previous_ROW[0] + 1
    
        for (let i = 1; i <= this.#process_LENGTH; i++)
        {
            const
                L = this.#process_STR[i - 1],
                K = L === l || L === this.#process_PREVIOUS_LETTER ? 0 : 1
        
            CURRENT_ROW[i] = Math.min(
            previous_ROW[i]     + 1,
            CURRENT_ROW [i - 1] + 1,
            previous_ROW[i - 1] + K)
        }

        return CURRENT_ROW
    }

    // --UPDATES

    // --DESTROY


//=======@COMMANDS|

    // --*
    #process_c$Keywords()
    {
        if (COMMAND.command_test('log') && COMMAND.command_test('clear'))
        {
            COMMAND.command_COMMANDS.clear()
        
            for (const DATAS of this.#process_KEYWORDS) COMMAND.command_COMMANDS.log(DATAS.str, DATAS)
        }
    }


//=======@EVENTS|

    // --*


//=======@UTILS|

    // --*
    process_push(strs, callback)
    {
        for (const STR in strs)
        {
            const DATAS = { target: strs[STR], str: STR, callback }

            this.#process_KEYWORDS.push(DATAS)

            let _ = this.#process_TREE

            for (let i = 0; i < STR.length; i++)
            {
                const L = STR[i]
        
                if (!(L in _.children)) _.children[L] = { children: {} }

                _ = _.children[L]
            }

            _.datas = DATAS
        }
    }

    process_spellChecker(str)
    {
        const
        ARRAY = this.#process_getArrayFrom(str),
        FINDS = []

        for (let i = 0; i < ARRAY.length; i++)
        {
            const STR = ARRAY[i]
    
            if (STR.length >= Process.__process_DEFAULT_MIN)
            {
                this.#process_setVars(STR)

                const ROW = this.#process_getRow()
    
                this.#process_run(this.#process_TREE, ROW)
    
                if (this.#process_FIND) FINDS.push(this.#process_FIND)
            }
        }
    
        return FINDS
    }

    #process_run(node, row) { for (const L in node.children) this.#process_analyse(node.children[L], L, row) }

    #process_analyse(node, l, previous_ROW)
    {
        const
        CURRENT_ROW = this.#process_getCurrentRow(l, previous_ROW),
        DISTANCE = CURRENT_ROW[this.#process_LENGTH]

        this.#process_PREVIOUS_LETTER = l

        if (DISTANCE < this.#process_MIN && node.datas)
        {
            this.#process_FIND = node.datas
            this.#process_MIN = DISTANCE
        }
        else Math.min(...CURRENT_ROW) < this.#process_MIN ? this.#process_run(node, CURRENT_ROW) : this.#process_PREVIOUS_LETTER = null
    }


}


// #\-IMPORTS-\

    // --SVELTE

    // --LIB

    // --CONTEXTS
    import COMMAND from './command'


// #\-EXPORTS-\

    // --THIS
    export default new Process()