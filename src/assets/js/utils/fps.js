// #FPS

// #EXPORT

    // --GET
    export default function fps_get()
    {
        const START = performance.now()

        let count = 0

        return new Promise(resolve =>
        {
            EVENT.event_add({ animation: async function frame()
            {
                count++

                if (performance.now() - START >= 500)
                    EVENT.event_remove({ animation: frame }),
                    resolve(count * 2)
            }})
        })
    }

// #IMPORT

    // --CONTEXT
    import EVENT from '../managers/eventManager'