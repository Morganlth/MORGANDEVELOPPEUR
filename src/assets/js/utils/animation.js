// #EXPORT

    // --ANIMATION
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

                if (TIME > duration) return resolve()
        
                callback(TIME / duration)

                CONTEXT.animation_FRAMEID = requestAnimationFrame(frame)
            })()
        })
    }