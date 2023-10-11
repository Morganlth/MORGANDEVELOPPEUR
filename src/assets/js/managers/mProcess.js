// use damerau levenshtein method

// #PROCESS

class Process
{
    static __process_KEYWORDS_NAME = 'keywords'
    static __process_D_MIN = 3

    #process_KEYWORDS = []
    #process_TREE = { children: {} }

//  {   current string
        #process_STR = ''
        #process_FIND = null
        #process_LENGTH = 0
        #process_PREVIOUS_L = null
        #process_MIN = Process.__process_D_MIN
//  }

// #FUNCTIONS

    // --SET
    process_set() { this.#process_setCommands() }

    #process_setVars(str)
    {
        this.#process_STR = str
        this.#process_FIND = null
        this.#process_LENGTH = str.length
        this.#process_PREVIOUS_L = null,
        this.#process_MIN = Process.__process_D_MIN
    }

    #process_setCommands() { COMMAND.command_add(Process.__process_KEYWORDS_NAME, this.#process_c$Keywords.bind(this)) }

    // --GET
    static process_getLevenshteinDistance(s1 = '', s2 = '') // not used
    {
        const
        [L1, L2] = [s1.length, s2.length],
        ARRAY = Array(L1 + 1).fill(null).map(() => new Int8Array(L2 + 1).fill(0))

        for (let i = 0; i <= L1; i++) ARRAY[i][0] = i

        for (let j = 1; j <= L2; j++) ARRAY[0][j] = j

        for (let i = 1; i <= L1; i++)
        {
            for (let j = 1; j <= L2; j++)
            {
                const K = s1[i - 1] === s2[j - 1] ? 0 : 1
            
                ARRAY[i]    [j] = Math.min(
                ARRAY[i]    [j - 1] + 1,
                ARRAY[i - 1][j] + 1,
                ARRAY[i - 1][j - 1] + K)

                if (i > 1 && j > 1 && s1[i - 1] === s2[j - 2] && s1[i - 2] === s2[j - 1])
                    ARRAY[i]    [j] = Math.min(
                    ARRAY[i]    [j],
                    ARRAY[i - 2][j - 2] + K)
            }
        }

        return ARRAY[L1][L2] 
    }

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
            K = L === l || L === this.#process_PREVIOUS_L ? 0 : 1
        
            CURRENT_ROW[i] = Math.min(
            previous_ROW[i]     + 1,
            CURRENT_ROW [i - 1] + 1,
            previous_ROW[i - 1] + K)
        }

        return CURRENT_ROW
    }

    // --COMMAND
    #process_c$Keywords()
    {
        if (COMMAND.command_testCommand('log'))
            for (const NAME of this.#process_KEYWORDS) COMMAND.command_COMMANDS.log(NAME)
    }

    // --UTILS
    process_push(datas, callback)
    {
        for (const STR in datas)
        {
            this.#process_KEYWORDS.push(STR)
    
            let _ = this.#process_TREE

            for (let i = 0; i < STR.length; i++)
            {
                const L = STR[i]
        
                if (!(L in _.children)) _.children[L] = { children: {} }

                _ = _.children[L]
            }

            _.data = { target: datas[STR], str: STR, callback }
        }
    }

    async process_spellChecker(str)
    {
        const
        START = performance.now(),
        ARRAY = this.#process_getArrayFrom(str),
        FINDS = []

        for (let i = 0; i < ARRAY.length; i++)
        {
            const STR = ARRAY[i]
    
            if (STR.length >= Process.__process_D_MIN)
            {
                this.#process_setVars(STR)

                const ROW = this.#process_getRow()
    
                this.#process_run(this.#process_TREE, ROW)
    
                if (this.#process_FIND) FINDS.push(this.#process_FIND)
            }
        }

        console.log(performance.now() - START)
    
        return FINDS
    }

    #process_run(node, row) { for (const L in node.children) this.#process_analyse(node.children[L], L, row) }

    #process_analyse(node, l, previous_ROW)
    {
        const
        CURRENT_ROW = this.#process_getCurrentRow(l, previous_ROW),
        DISTANCE = CURRENT_ROW[this.#process_LENGTH]

        this.#process_PREVIOUS_L = l

        if (DISTANCE < this.#process_MIN && node.data)
        {
            this.#process_FIND = node.data
            this.#process_MIN = DISTANCE
        }
        else
        {
            Math.min(...CURRENT_ROW) < this.#process_MIN
            ? this.#process_run(node, CURRENT_ROW)
            : this.#process_PREVIOUS_L = null
        }
    }
}

// #IMPORT

    // --CONTEXT
    import COMMAND from './mCommand'

// #EXPORT

export default new Process()