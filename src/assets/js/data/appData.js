/*----------------------------------------------- #||--appdata--|| */


// #\-IMPORTS-\

    // --SVELTE

    // --LIB
    import COLORS from '$lib/colors'

    // --CONTEXTS

    // --JS
    import HOME_BLACKBLOCKS from './home/blackblocks'
    import HOME_SLIDER      from './home/slider'
    import HOME_GAMES       from './home/games'

    import PRESENTATION_FEATURES from './presentation/features'

    import SKILLS_SYSTEM from './skills/system'

    import PROJECTS_ABOUT    from './projects/about'
    import PROJECTS_PROJECTS from './projects/projects'

//=======@COMPONENTS|

    // --*
    import Home         from '../../../main/pages/page/home/Home.svelte'
    import Presentation from '../../../main/pages/page/presentation/Presentation.svelte'
    import Skills       from '../../../main/pages/page/skills/Skills.svelte'
    import Projects     from '../../../main/pages/page/projects/Projects.svelte'

    import Icon from '../../../global/covers/Icon.svelte'

    import Logo from '../../../global/icons/Logo.svelte'


// #\-EXPORTS-\

    // --THIS
    export default
    [
  /////////////////////////////////////////////HOME////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        {
            name: 'home',
            component: Home,
            tag: 'accueil',
            overflow: false,
            h: 0
        ,
            route:
            {
                value: 'ACCUEIL',
                alt: 'Page accueil/home du site Morgan Développeur'
            }
        ,
            label: 'FR'
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
            children: [HOME_BLACKBLOCKS, HOME_SLIDER, HOME_GAMES]
        ,
            props:
            {
                prop_FOCUS: false,
                prop_TOP: 0
            }
        }
/////////////////////////////////////////////PRESENTATION////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    ,
        {
            name: 'presentation',
            component: Presentation,
            tag: 'presentation',
            overflow: true,
            h: 6,
            gap: -1
        ,
            route:
            {
                value: 'PRÉSENTATION',
                alt: 'Page de ma présentation personnel'
            }
        ,
            label: 'PRO'
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
                    value: 'Contact'
                }
            ]
        ,
            quote:
            {
                value: 'L\'informatique est un domaine qui valorise la créativité et l\'innovation.',
                author: 'Bill Gates'
            }
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
            tag: 'competences',
            overflow: true,
            h: 6
        ,
            route:
            {
                value: 'COMPÉTENCES',
                alt: 'Page de mes compétences de développeur web'
            }
        ,
            label: 'SYSTEM'
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
            quote: { value: 'Le code est une forme d\'art qui permet de changer le monde.' }
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
            tag: 'projets',
            overflow: false,
            h: 3
        ,
            route:
            {
                value: 'PROJETS',
                alt: 'Page de mes projets web'
            }
        ,
            label: 'CARDS'
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
            quote: { value: 'Le code est un moyen de matérialiser nos idées créatives.' }
        ,
            children: [PROJECTS_ABOUT, PROJECTS_PROJECTS]
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
        page.id    = id
        page.focus = (page.intro = false)
        page.top   = (page.start = (page.end = (page.dif = 0)))

        page.route = app_getRoute(page.name, page.route)
        page.title = app_getTitle(id, page.title)

        const [PROCESS, PROPS] = app_getChildrenData(page.children)

        page.props   = Object.assign(page.props, PROPS)
        page.process = Object.assign({ [page.tag]: 'top' }, PROCESS)

        return page
    })


// #\-CONSTANTES-\

    // --THIS


// #\-VARIABLES-\

    // --THIS


// #\-FUNCTIONS-\

    // --SET

    // --GET
    function app_getRoute(href, {value, alt})
    {
        return (
        {
            on: false,
            value,
            attributes:
            {
                href: '#' + href,
                alt,
                'aria-label': `${value} ${value.split('').join(' ')}`
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

    function app_getChildrenData(children = [])
    {
        const
        PROCESS = {},
        PROPS   = {}

        for (const CHILD of children)
        {
            const CHILD_NAME = CHILD.name

            if (CHILD.tag) PROCESS[CHILD.tag] = 'start'

            if (CHILD.datas instanceof Array)
            {
                for (const DATA of CHILD.datas)
                {
                    const TAGS = DATA.tags ?? []

                    for (const TAG of TAGS) if (TAG !== '') PROCESS[TAG] = CHILD_NAME
                }
            }

            PROPS['prop_' + CHILD_NAME.toUpperCase()] = CHILD.datas
        }

        return [PROCESS, PROPS]
    }

    // --UPDATES


//=======@UTILS|

    // --*