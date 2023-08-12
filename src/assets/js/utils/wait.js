// #WAIT

// #EXPORTS

    // --UTILS
    export function wait_debounce(callback, delay)
    {
        let timeout

        const
        CONTEXT = this,
        DEBOUNCE = async function ()
        {
            clearTimeout(timeout)

            timeout = setTimeout(callback.bind(CONTEXT, ...arguments), delay)
        }

        DEBOUNCE.callbackName = callback.name

        return DEBOUNCE
    }

    export function wait_throttle(callback, delay, timeoutDelay)
    {
        let
        last = +new Date(),
        timeout

        const THROTTLE = async function ()
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

        THROTTLE.callbackName = callback.name

        return THROTTLE
    }