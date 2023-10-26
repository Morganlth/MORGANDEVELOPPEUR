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
                component: Snake2,
                props:
                {
                    prop_TITLE: 'Snake',
                    prop_X: .85,
                    prop_Y: .03,
                    prop_RADIUS: 120
                }
            },
            {
                component: Grid,
                props:
                {
                    prop_TITLE: 'Tictactoe',
                    prop_X: .34,
                    prop_Y: .6,
                    prop_RADIUS: 140
                }
            },
            {
                component: CommandLine,
                props:
                {
                    prop_TITLE: 'Terminal',
                    prop_Z: 1,
                    prop_X: .9,
                    prop_Y: .58,
                    prop_RADIUS: 160
                }
            }
        ].map((cube, id) =>
        {
            cube.id = id
            cube.tags = [cube.props.prop_TITLE.toLowerCase()]

            return cube
        })
    }

// #IMPORTS

    // --COMPONENT-ICONS
    import Snake2 from '../../../../components/icons/Snake2.svelte'
    import Grid from '../../../../components/icons/Grid.svelte'
    import CommandLine from '../../../../components/icons/CommandLine.svelte'
