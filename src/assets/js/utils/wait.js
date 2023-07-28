// #WAIT

// #EXPORTS

    // --UTILS
    export function wait_debounce(callback, delay)
    {
        let timeout
    
        return function ()
        {
            clearTimeout(timeout)

            timeout = setTimeout(callback.bind(this, ...arguments), delay)
        }
    }

    export function wait_throttle(callback, delay, timeoutDelay)
    {
        let
        last = +new Date(),
        timeout

        return function ()
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