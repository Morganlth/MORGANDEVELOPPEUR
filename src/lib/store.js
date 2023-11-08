// #EXPORT

    // --STORE
    export default function store_custom({ value, setter, optionalparameters })
    {
        value ??= null
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