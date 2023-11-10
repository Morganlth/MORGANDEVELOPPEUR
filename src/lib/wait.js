// #EXPORT

    // --WAIT
    export function wait_debounce(callback = () => {}, n = 0)
    {
        let timeout

        const CONTEXT = this
    
        function debounce()
        {
            clearTimeout(timeout)

            timeout = setTimeout(callback.bind(CONTEXT, ...arguments), wait_getDelay(n))
        }

        debounce.callback_NAME = callback.name

        return debounce
    }

    export function wait_throttle(callback = () => {}, n = 0, timeoutDelay = 0)
    {
        const
        CONTEXT = this,
        DELAY   = wait_getDelay(n)
    
        let
        last = +new Date()
        ,
        throttle

        if (timeoutDelay)
        {
            const TIMEOUT_DELAY = wait_getDelay(timeoutDelay)
    
            let timeout
    
            throttle = function ()
            {
                const NOW = +new Date()

                clearTimeout(timeout)

                NOW > last + DELAY
                ?   (callback.apply(CONTEXT, arguments),
                    last = NOW)
                :   timeout = setTimeout(() =>
                    {
                        callback.apply(CONTEXT, arguments)

                        last = +new Date()
                    }, TIMEOUT_DELAY)
            }
        }
        else
        {
            throttle = function ()
            {
                const NOW = +new Date()

                if (NOW > last + DELAY)
                {
                    callback.apply(CONTEXT, arguments)

                    last = NOW
                }
            }
        }

        throttle.callback_NAME = callback.name

        return throttle
    }

    export function wait_getDelay(n = 0) { return 1000 / 60 * n }