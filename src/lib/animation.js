// #EXPORTS

    // --ANIMATION
    export function animation(callback = () => {}, duration = 0, t_INITIAL = 0, invert = false)
    {
        let
        resolved = false,
        t        = 0,
        cancel   = () => {}

        let frameId
    
        const
        DURATION = duration * (invert ? t_INITIAL : 1 - t_INITIAL),
        START    = +new Date()
        ,
        PROMISE = new Promise((resolve, reject) =>
        {
            if (!DURATION) return resolve()

            ;(async function frame()
            {
                const TIME = +new Date() - START
        
                if (TIME >= DURATION)
                {
                    t = invert ? t_INITIAL : 1 - t_INITIAL
        
                    resolved = true
                }
                else t = TIME / duration

                t = t_INITIAL + (invert ? -t : t)
        
                callback(t)

                resolved ? resolve() : frameId = requestAnimationFrame(frame)
            })()

            cancel = () =>
            {
                cancelAnimationFrame(frameId)
    
                reject()
            }
        })

        PROMISE.catch(() => void null)

        return { cancel, promise: PROMISE }
    }

    export function animation_interval(callback = () => {}, duration = 0, count = 1, i_INITIAL = 0, invert = false)
    {
        let
        i      = i_INITIAL,
        cancel = () => {}

        let timeout, frameId
        
        const
        DELAY = duration / count
        ,
        PROMISE = new Promise((resolve, reject) =>
        {
            if (!count) return resolve()
        
            ;(function interval()
            {
                timeout = setTimeout(() =>
                {
                    callback(i)

                    ;(invert ? --i < 0 : ++i >= count) ? resolve() : frameId = requestAnimationFrame(interval)
                }, DELAY)
            })()

            cancel = () =>
            {
                clearTimeout(timeout)
                cancelAnimationFrame(frameId)
    
                reject()
            }
        })

        PROMISE.catch(() => {})
    
        return { cancel, promise: PROMISE }
    }

    export function animation_staticWriting(children = [], callback = () => {})
    {
        let
        last     = +new Date(),
        i        = 0,
        j        = 0,
        resolved = false

        return async function writing()
        {
            if (resolved) return
    
            const
            NOW = +new Date(),
            GAP = NOW - last

            for (let k = i; k < j; k++) children[k].innerText = [' ', '>'][MATH.headsOrTails()]

            if (GAP > 16.67)
            {
                const MAX = children.length - 1

                if (j < MAX && j < i + 5) j++
        
                if (GAP > 33.34)
                {
                    const CHILD = children[i]

                    CHILD.innerText = CHILD.dataset.char

                    if (i++ >= MAX) callback(), resolved = true

                    last = NOW
                }
            }
        }
    }

    export function animation_staticErase(children = [], callback = () => {})
    {
        children = [...children]
    
        return async function erase()
        {
            const LENGTH = children.length
        
            if (LENGTH <= 0) return callback()

            const CHILD = children[LENGTH - 1]

            CHILD.innerText = ''

            children.pop()
        }
    }

    export function animation_staticFloating(t, step = .05)
    {
        const DIRECTION = MATH.headsOrTails() ? 1 : -1
    
        let invert = false
    
        t ??= Math.random()

        return () =>
        {
            t += invert ? -step : step
        
            if (t > 1)
            {
                t = 1

                invert = true
            }
            else if (t < 0)
            {
                t = 0

                invert = false
            }

            return (10 * (Math.sin((t - .5) * Math.PI) + 1) - 10) * DIRECTION
        }
    }

// #IMPORT

    // --LIB
    import MATH from '$lib/math'