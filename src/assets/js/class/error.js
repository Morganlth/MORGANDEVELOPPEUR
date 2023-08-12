// #EXPORT

    // --ERROR
    export default class CommandError extends Error
    {
        constructor(type, msg)
        {
            super(msg)

            this.name = type
        }
    }