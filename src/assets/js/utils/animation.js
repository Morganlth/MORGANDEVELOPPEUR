// #EXPORTS

    // --ANIMATIONS
    export function animation(callback, duration = 0, t = 0, invert = false)
    {
        let
        cancel,
        frameId
    
        const
        RATIO = invert ? t : 1 - t,
        DURATION = duration * RATIO,
        START = +new Date(),
        PROMISE = new Promise((resolve, reject) =>
        {
            cancel = () =>
            {
                cancelAnimationFrame(frameId)
    
                reject()
            }

            if (!DURATION) return resolve()
    
            ;(function frame()
            {
                const TIME = +new Date() - START

                if (TIME >= DURATION)
                {
                    callback(invert ? 0 : 1)
                    resolve()

                    return
                }

                const T = TIME / duration
        
                callback(invert ? t - T : t + T)

                frameId = requestAnimationFrame(frame)
            })()
        })

        PROMISE.catch(() => void null)

        return { cancel, promise: PROMISE }
    }

    export function animation_writing(children = [], callback = () => {})
    {
        let [last, i, j, resolved] = [+new Date(), 0, 0, false]

        return async function writing()
        {
            if (resolved) return
    
            const
            NOW = +new Date(),
            GAP = NOW - last

            for (let k = i; k < j; k++) children[k].innerText = [' ', '>'][Math.round(Math.random())]

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

    export function animation_erase(children = [], callback = () => {})
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