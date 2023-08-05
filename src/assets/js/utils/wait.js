// #WAIT

// #EXPORTS

    // --UTILS
    export function wait_debounce(callback, delay)
    {
        const CONTEXT = this

        let timeout
    
        return async function ()
        {
            clearTimeout(timeout)

            timeout = setTimeout(callback.bind(CONTEXT, ...arguments), delay)
        }
    }

    export function wait_throttle(callback, delay, timeoutDelay)
    {
        let
        last = +new Date(),
        timeout

        return async function ()
        {
            const NOW = +new Date()

            clearTimeout(timeout)

            NOW > last + delay
            ?   (callback.apply(this, arguments),
                last = NOW)
            :   timeout = setTimeout(() =>
                {
                    callback.apply(this, arguments)

                    last = +new Date()
                }, timeoutDelay ?? delay)
        }
    }