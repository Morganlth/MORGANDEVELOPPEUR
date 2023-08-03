// #FPS

// #EXPORT

    // --GET
    export default function fps_get()
    {
        const START = performance.now()

        let count = 0

        return new Promise(resolve =>
        {
            ANIMATION.animation_add(function frame()
            {
                count++

                if (performance.now() - START >= 500)
                    ANIMATION.animation_remove(frame),
                    resolve(count * 2)
            })
        })
    }

// #IMPORT

    // --CONTEXT
    import ANIMATION from '../managers/animationManager'