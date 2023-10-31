// #EXPORTS

    // --ANIMATIONS
    export function animation(callback, duration = 0, t_INITIAL = 0, invert = false) // tenter de passer le t dans le resolve et reject pour le recuperer uniquement a ce moment la et non a chauqe iteration
    {
        let
        t = 0,
        cancel = () => {},
        frameId,
        resolved = false
    
        const
        DURATION = duration * (invert ? t_INITIAL : 1 - t_INITIAL),
        START = +new Date()
    ,
        PROMISE = new Promise((resolve, reject) =>
        {
            if (!DURATION) return resolve()
    
            ;(function frame()
            {
                const TIME = +new Date() - START

                if (TIME >= DURATION)
                {
                    t = invert ? t_INITIAL : 1 - t_INITIAL
        
                    resolved = true
                }
                else t = TIME / duration
        
                callback(t_INITIAL + (invert ? -t : t))

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

    export function animation_interval(callback = () => {}, duration = 0, delay = 0)
    {
        let
        t = 0,
        cancel = () => {}
    
        const
        START = +new Date()
    ,
        PROMISE = new Promise((resolve, reject) =>
        {
            if (!duration) return resolve()

            const INTERVAL = setInterval(() =>
            {
                const TIME = +new Date() - START
        
                if (TIME >= duration)
                {
                    t = 1

                    clearInterval(INTERVAL)
        
                    resolve()
                }
                else t = TIME / duration

                callback(t)
            },
            delay)

            cancel = () =>
            {
                clearInterval(INTERVAL)
    
                reject()
            }
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