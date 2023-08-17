// #FPS

// #EXPORT

    // --GET
    export default function fps_get()
    {
        const START = performance.now()

        let count = 0

        return new Promise(resolve =>
        {
            requestAnimationFrame(async function frame()
            {
                count++

                performance.now() - START >= 500
                ? resolve(count * 2)
                : requestAnimationFrame(frame)
            })
        })
    }