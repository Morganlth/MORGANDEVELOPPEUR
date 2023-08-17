// #EXPORT

    // --ANIMATION
    export function animation(callback = () => {}, duration)
    {
        const
        START = +new Date(),
        CONTEXT = this ?? {}

        ;(async function frame()
        {
            const TIME = +new Date() - START

            if (TIME > duration) return
    
            callback(TIME / duration)

            CONTEXT.animation_FRAMEID = requestAnimationFrame(frame)
        })()
    }

    export function animation_floating(y)
    {
        let [t, up] = [Math.random(), Math.round(Math.random()) ? true : false]

        y = y ?? 0

        return {
            setTime: (time) => { t = time },
            animation: () =>
            {
                y = 10 * (Math.sin((t - .5) * Math.PI) + 1) - 10

                t += up ? -.05 : .05
        
                if (t > 1) t = 1, up = true
                else if (t < 0) t = 0, up = false

                return y
            }
        }
    }