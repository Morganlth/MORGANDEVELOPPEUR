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
                component: Logo,
                props:
                {
                    prop_TITLE: '',
                    prop_X: .85,
                    prop_Y: .03,
                    prop_RADIUS: 120
                }
            },
            {
                component: Grid,
                props:
                {
                    prop_TITLE: 'Morpion',
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
    import Logo from '../../../../components/icons/Logo.svelte'
    import Grid from '../../../../components/icons/Grid.svelte'
    import CommandLine from '../../../../components/icons/CommandLine.svelte'
