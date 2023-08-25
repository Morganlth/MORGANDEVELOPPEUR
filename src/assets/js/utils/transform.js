// #EXPORT

    // --TRANSFORM
    export function transform_getTranslate3d()
    {
        const
        GET = () => Math.random() * 4000 - 2000,
        [X, Y, Z] = [GET(), GET(), GET()]

        return `translate3d(${X}px, ${Y}px, ${Z}px)`
    }