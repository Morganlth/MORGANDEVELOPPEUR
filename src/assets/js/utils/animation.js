// #EXPORTS

    // --ANIMATIONS
    export function animation(callback = () => {}, duration)
    {
        const
        START = +new Date(),
        CONTEXT = this ?? {}
       
        return new Promise(resolve =>
        {
            (function frame()
            {
                const TIME = +new Date() - START

                if (TIME > duration)
                {
                    callback(1)
                    resolve()

                    return
                }
        
                callback(TIME / duration)

                CONTEXT.animation_FRAMEID = requestAnimationFrame(frame)
            })()
        })
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