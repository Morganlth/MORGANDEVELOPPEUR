// #EXPORT

    // --SUCCESS
    export default class CommandSuccess extends Error
    {
        constructor(msg, name)
        {
            super(msg)

            this.name = name ?? 'Success'
        }
    }