// #EXPORT

    // --ANIMATION
    export function animation(animation, duration, scale)
    {
        const [DELAY, STEP] = [duration / scale, 1 / scale]
        let t = STEP, interval

        animation(t)

        return (interval = setInterval(() =>
        {
            t += STEP
    
            animation(t)
    
            if (t >= 1) clearInterval(interval)
        }, DELAY))
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