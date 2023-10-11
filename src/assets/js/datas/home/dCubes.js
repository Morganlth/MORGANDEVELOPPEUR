// #EXPORT

    // --CUBES-DATAS
    export default
    {
        name: 'cubes'
    ,
        process: true
    ,
        datas:
        [
            {
                prop_TITLE: '',
                prop_X: .85,
                prop_Y: .03,
                prop_RADIUS: 120
            },
            {
                prop_TITLE: 'Morpion',
                prop_X: .34,
                prop_Y: .6,
                prop_RADIUS: 140
            },
            {
                prop_TITLE: 'Terminal',
                prop_Z: 1,
                prop_X: .9,
                prop_Y: .5,
                prop_RADIUS: 160
            }
        ].map((cube, id) =>
        {
            cube.props = { ...cube }
            cube.id = id
            cube.tags = [cube.props.prop_TITLE.toLowerCase()]

            return cube
        })
    }