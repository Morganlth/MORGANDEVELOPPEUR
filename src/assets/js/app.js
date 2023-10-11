// #EXPORT

    // --PAGES-DATAS
    export default
    [
  /////////////////////////////////////////////HOME////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        {
            name: 'home',
            tags: ['landing', 'accueil'],
            overflow: false,
            h: 1
        ,
            children: [HOME_SPACECUBE, HOME_CUBES]
        ,
            props:
            {
                prop_FOCUS: false,
                prop_TOP: 0,
                prop_RATIO: 0
            }
        ,
            link:
            {
                value: 'ACCUEIL',
                alt: 'Accueil',
                label: 'Page accueil / home du site Morgan Développeur'
            }
        ,
            wrapper:
            {
                contents:
                [
                    { frags: 'DEVELOPPEUR' },
                    {
                        frags: 'WEB',
                        tags: ['FRONT', 'BACK', '& DESIGNER']
                    }
                ],
                info: 'FR'
            }
        }
, /////////////////////////////////////////////PRESENTATION////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        {
            name: 'presentation',
            tags: ['caracteristique'],
            overflow: true,
            h: 7
        ,
            children: [PRESENTATION_FEATURES]
        ,
            nav:
            [
                {
                    id: 0,
                    title: 'Page de contact',
                    value: 'CONTACT'
                },
                {
                    id: 1,
                    title: 'Jouer au jeu du serpent revisité',
                    value: 'JOUER'
                },
                {
                    id: 2,
                    title: '',
                    value: '',
                    update: function (on)
                    {
                        on ??= !localStorage.getItem('snake')
            
                        this.title = `${on ? 'Masque' : 'Affiche'} le serpent`,
                        this.value = on ? 'MASQUER' : 'AFFICHER'
                    }
                }
            ]
        ,
            props:
            {
                prop_FOCUS: false,
                prop_TOP: 0,
                prop_RATIO: 0,
                prop_START: void 0,
                prop_END: void 0,
                prop_DIF: void 0
            }
        ,
            link:
            {
                value: 'PRÉSENTATION',
                alt: 'Ma présentation',
                label: 'Page de ma présentation personnel'
            }
        ,
            wrapper:
            {
                contents:
                [
                    {
                        frags: 'MA',
                        tags: ['IDENTITÉ', 'LOCALITÉ', 'ÉTUDES', 'PRO', 'CONTACT']
                    },
                    { frags: 'PRESENTATION' }
                ],
                info: 'SNAKE'
            }
        }
, /////////////////////////////////////////////SKILLS////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        {
            name: 'skills',
            tags: ['competences'],
            overflow: true,
            h: 7
        ,
            children: [SKILLS_SYSTEM]
        ,
            nav:
            [
                {
                    id: 0,
                    title: 'HTML et CSS',
                    value: 'HTML & CSS'
                },
                {
                    id: 1,
                    title: 'Javascript',
                    value: 'JS'
                },
                {
                    id: 2,
                    title: 'Node JS',
                    value: 'NODE JS'
                },
                {
                    id: 3,
                    title: 'Gestion, Outils et Adaptabilité',
                    value: 'AUTRES'
                }
            ]
        ,
            props:
            {
                prop_FOCUS: false,
                prop_INTRO: false,
                prop_TOP: 0,
                prop_RATIO: 0,
                prop_START: void 0,
                prop_DIF: void 0
            }
        ,
            link:
            {
                value: 'COMPÉTENCES',
                alt: 'Mes compétences',
                label: 'Page de mes compétences de développeur web'
            }
        ,
            wrapper:
            {
                contents:
                [
                    {
                        frags: 'MES',
                        tags: ['HTML', 'CSS', 'JS', 'NODE JS', 'GESTION', 'ADAPTABILITÉ']
                    },
                    { frags: 'COMPETENCES' }
                ],
                info: 'SYSTEM'
            }
        }
, /////////////////////////////////////////////PROJECTS////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        {
            name: 'projects',
            tags: ['projets'],
            overflow: false,
            h: 3
        ,
            children: [PROJECTS_CARDS]
        ,
            nav:
            [
                {
                    id: 0,
                    title: 'Booki',
                    value: 'BOOKI'
                },
                {
                    id: 1,
                    title: 'Sophie Bluel',
                    value: 'SOPHIE BLUEL'
                },
                {
                    id: 2,
                    title: 'Nina Carducci',
                    value: 'NINA CARDUCCI'
                }
            ]
        ,
            props:
            {
                prop_INTRO: false,
                prop_TOP: 0,
                prop_RATIO: 0
            }
        ,
            link:
            {
                value: 'PROJETS',
                alt: 'Mes projets',
                label: 'Page de mes projets web'
            }
        ,
            wrapper:
            {
                contents:
                [
                    {
                        frags: 'MES',
                        tags: ['BOOKI', 'SOPHIE BLUEL', 'NINA CARDUCCI']
                    },
                    { frags: 'PROJETS' }
                ],
                info: 'SPACE'
            }
        }
    ].map((page, id) =>
    {
        page.id = id

        page.focus = (page.intro = false)

        page.top = (page.start = (page.end = (page.dif = 0)))

        const [PROCESS, PROPS] = app_getChildrenDatas(page.children)

        page.process = Object.assign(PROCESS, app_getProcess([page.name, ...page.tags]))
        page.props = Object.assign(PROPS, page.props)

        page.link = app_getLink({ ...page.link, href: page.name })
        page.wrapper = app_getWrapper(id, page.wrapper)

        return page
    })

// #IMPORT

    // --JS
    import HOME_SPACECUBE from './datas/home/dSpacecube'
    import HOME_CUBES from './datas/home/dCubes'

    import PRESENTATION_FEATURES from './datas/presentation/dFeatures'

    import SKILLS_SYSTEM from './datas/skills/dSystem'

    import PROJECTS_CARDS from './datas/projects/dCards'

// #FUNCTIONS

    // --GET
    function app_getChildrenDatas(children = [])
    {
        const
        PROCESS = {},
        PROPS = {}

        for (const CHILD of children)
        {
            const CHILD_NAME = CHILD.name

            if (CHILD.process)
            {
                PROCESS[CHILD_NAME] = 'start'

                for (const DATA of CHILD.datas)
                {
                    const TAGS = DATA.tags

                    for (const TAG of TAGS) if (TAG !== '') PROCESS[TAG] = CHILD_NAME
                }
            }

            PROPS['prop_' + CHILD_NAME.toUpperCase()] = CHILD.datas
        }

        return [PROCESS, PROPS]
    }

    function app_getProcess(tags = [])
    {
        const PROCESS = {}

        for (const TAG of tags) PROCESS[TAG] = 'top'

        return PROCESS
    }


    function app_getLink({value, href, alt, label})
    {
        return (
        {
            on: false,
            value,
            attributes:
            {
                href: '#' + href,
                alt,
                'aria-label': label
            }
        })
    }

    function app_getWrapper(id, {contents, info})
    {
        return (
        {
            prop_TITLE:
            {
                htmlElement: id ? 'h2' : 'h1',
                contents
            },
            prop_INFO: info
        })
    }