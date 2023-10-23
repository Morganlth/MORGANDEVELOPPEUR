// #EXPORT

    // --PAGES-DATAS
    export default
    [
  /////////////////////////////////////////////HOME////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        {
            name: 'home',
            component: Home,
            tags: ['landing', 'accueil'],
            overflow: false,
            h: 1
        ,
            route:
            {
                value: 'ACCUEIL',
                alt: 'Accueil',
                label: 'Page accueil / home du site Morgan Développeur'
            }
        ,
            info: 'FR'
        ,
            title:
            {   
                fragments:
                [
                    { frags: 'DEVELOPPEUR' },
                    {
                        frags: 'WEB',
                        tags: ['FRONT', 'BACK', '& DESIGNER']
                    }
                ],
                element:
                {
                    component: Icon,
                    props:
                    {
                        prop_SIZE: 'calc(var(--title-size) * .71)',
                        prop_COLOR: COLORS.light,
                        prop_SPRING: false
                    },
                    children: [{ component: Logo }]
                }
            }
        ,
            children: [HOME_SPACECUBE, HOME_CUBES]
        ,
            props:
            {
                prop_FOCUS: false,
                prop_TOP: 0,
                prop_RATIO: 0
            }
        }
/////////////////////////////////////////////PRESENTATION////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    ,
        {
            name: 'presentation',
            component: Presentation,
            tags: ['caracteristique'],
            overflow: true,
            h: 8,
            startgap: .4,
            endgap: -1.6
        ,
            route:
            {
                value: 'PRÉSENTATION',
                alt: 'Ma présentation',
                label: 'Page de ma présentation personnel'
            }
        ,
            info: 'SNAKE'
        ,
            title:
            {
                fragments:
                [
                    { frags: 'PRESENTATION' },
                    { tags: ['IDENTITÉ', 'LOCALITÉ', 'ÉTUDES', 'PRO', 'CONTACT'] }
                ]
            }
        ,
            nav:
            [
                {
                    id: 0,
                    title: 'Page de contact',
                    value: 'CONTACT',
                    component: Arroba
                },
                {
                    id: 1,
                    title: 'Jouer au jeu du serpent revisité',
                    value: 'JOUER',
                    component: Game
                },
                {
                    id: 2,
                    title: '',
                    value: '',
                    component: Snake2,
                    color: COLORS.indicator,
                    update: function (on)
                    {
                        on ??= !localStorage.getItem('snake')
            
                        this.title = `${on ? 'Masque' : 'Affiche'} le serpent`,
                        this.value = on ? 'MASQUER' : 'AFFICHER'
                        this.color = COLORS[on ? 'indicator' : 'primary']
                    }
                }
            ]
        ,
            children: [PRESENTATION_FEATURES]
        ,
            props:
            {
                prop_FOCUS: false,
                prop_TOP: 0,
                prop_RATIO: 0,
                prop_START: void 0,
                prop_DIF: void 0
            }
        }
/////////////////////////////////////////////SKILLS////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    ,
        {
            name: 'skills',
            component: Skills,
            tags: ['competences'],
            overflow: true,
            h: 6
        ,
            route:
            {
                value: 'COMPÉTENCES',
                alt: 'Mes compétences',
                label: 'Page de mes compétences de développeur web'
            }
        ,
            info: 'SYSTEM'
        ,
            title:
            {
                fragments:
                [
                    { frags: 'COMPETENCES' },
                    { tags: ['HTML', 'CSS', 'JS', 'NODE JS', 'GESTION', 'ADAPTABILITÉ'] }
                ]
            }
        ,
            nav:
            [
                {
                    id: 0,
                    title: 'HTML et CSS',
                    value: 'Html & Css'
                },
                {
                    id: 1,
                    title: 'Javascript',
                    value: 'Javascript'
                },
                {
                    id: 2,
                    title: 'Node JS',
                    value: 'Node JS'
                },
                {
                    id: 3,
                    title: 'Gestion, Outils et Adaptabilité',
                    value: 'Autres...'
                }
            ]
        ,
            children: [SKILLS_SYSTEM]
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
        }
/////////////////////////////////////////////PROJECTS////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    , 
        {
            name: 'projects',
            component: Projects,
            tags: ['projets'],
            overflow: false,
            h: 3
        ,
            route:
            {
                value: 'PROJETS',
                alt: 'Mes projets',
                label: 'Page de mes projets web'
            }
        ,
            info: 'CARDS'
        ,
            title:
            {
                fragments:
                [
                    { frags: 'PROJETS' },
                    { tags: ['BOOKI', 'SOPHIE BLUEL', 'NINA CARDUCCI'] }
                ]
            }
        ,
            nav:
            [
                {
                    id: 0,
                    title: 'Booki',
                    value: 'Booki'
                },
                {
                    id: 1,
                    title: 'Sophie Bluel',
                    value: 'Sophie Bluel'
                },
                {
                    id: 2,
                    title: 'Nina Carducci',
                    value: 'Nina Carducci'
                }
            ]
        ,
            children: [PROJECTS_CARDS]
        ,
            props:
            {
                prop_FOCUS: false,
                prop_INTRO: false,
                prop_TOP: 0,
                prop_START: void 0
            }
        }
    ].map((page, id) =>
    {
        page.id = id
        page.focus = (page.intro = false)
        page.top = (page.start = (page.end = (page.dif = 0)))

        page.route = app_getRoute({ ...page.route, href: page.name })
        page.title = app_getTitle(id, page.title)

        const [PROCESS, PROPS] = app_getChildrenDatas(page.children)

        page.props = Object.assign(PROPS, page.props)
        page.process = Object.assign(PROCESS, app_getProcess([page.name, ...page.tags]))

        return page
    })

// #IMPORTS

    // --JS
    import HOME_SPACECUBE from './datas/home/dSpacecube'
    import HOME_CUBES from './datas/home/dCubes'

    import PRESENTATION_FEATURES from './datas/presentation/dFeatures'

    import SKILLS_SYSTEM from './datas/skills/dSystem'

    import PROJECTS_CARDS from './datas/projects/dCards'

    // --LIB
    import COLORS from '$lib/colors'

    // --COMPONENT-PAGES
    import Home from '../../components/pages/Home.svelte'
    import Presentation from '../../components/pages/Presentation.svelte'
    import Skills from '../../components/pages/Skills.svelte'
    import Projects from '../../components/pages/Projects.svelte'

    // --COMPONENT-COVER
    import Icon from '../../components/covers/Icon.svelte'

    // --COMPONENT-ICONS
    import Logo from '../../components/icons/Logo.svelte'
    import Arroba from '../../components/icons/Arroba.svelte'
    import Game from '../../components/icons/Game.svelte'
    import Snake2 from '../../components/icons/Snake2.svelte'

// #FUNCTIONS

    // --GET
    function app_getRoute({value, href, alt, label})
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

    function app_getTitle(id, title)
    {
        return (
        {
            html: 'h' + (id ? 2 : 1),
            ...title
        })
    }

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

                if (CHILD.datas instanceof Array)
                {
                    for (const DATA of CHILD.datas)
                    {
                        const TAGS = DATA.tags

                        for (const TAG of TAGS) if (TAG !== '') PROCESS[TAG] = CHILD_NAME
                    }
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