// #EXPORT

    // --STORECUSTOM
    export default function storecustom_get({ value, setter, optionalparameters })
    {
        value ??= false
        setter ??= () => {}
        optionalparameters ??= {}

        let { set, subscribe } = writable(value)

        return {
            value
        ,
            subscribe
        ,
            set: function (value)
            {
                this.value = value
               
                setter.call(this, arguments)

                set(value)
            }
        ,
            ...optionalparameters
        }
    }

// #IMPORT

    // --SVELTE
    import { writable } from 'svelte/store'