// #WAIT

// #EXPORTS

    // --UTILS
    export function wait_debounce(callback, delay)
    {
        let timeout

        const CONTEXT = this
    
        function debounce()
        {
            clearTimeout(timeout)

            timeout = setTimeout(callback.bind(CONTEXT, ...arguments), delay)
        }

        debounce.callback_NAME = callback.name

        return debounce
    }

    export function wait_throttle(callback, delay, timeoutDelay)
    {
        let
        last = +new Date(),
        timeout

        const CONTEXT = this
    
        function throttle()
        {
            const NOW = +new Date()

            clearTimeout(timeout)

            NOW > last + delay
            ?   (callback.apply(CONTEXT, arguments),
                last = NOW)
            :   timeout = setTimeout(() =>
                {
                    callback.apply(CONTEXT, arguments)

                    last = +new Date()
                }, timeoutDelay ?? delay)
        }

        throttle.callback_NAME = callback.name

        return throttle
    }