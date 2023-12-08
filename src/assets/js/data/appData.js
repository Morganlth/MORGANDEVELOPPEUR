/*----------------------------------------------- #||--appdata--|| */


// #\-IMPORTS-\

    // --SVELTE

    // --LIB
    import COLORS              from '$lib/colors'
    import { LANGS, lang_processing } from '$lib/lang'

    // --CONTEXTS

    // --JS
    import HOME_SNAKE       from './home/snake'
    import HOME_BLACKBLOCKS from './home/blackblocks'
    import HOME_SLIDER      from './home/slider'
    import HOME_GAMES       from './home/games'
    import HOME_TERMINAL    from './home/terminal'

    import PRESENTATION_FEATURES from './presentation/features'
    import PRESENTATION_CONTACT  from './presentation/contact'
    import PRESENTATION_RESUME   from './presentation/resume'

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
    export default function app_getData(lang = LANGS[0]) { return lang_processing(lang, APP_DATA) }

    export function app_getPageData(lang = LANGS[0])
    {
        const APP = []
    
        for (let i = 0; i < APP_PAGE_DATA.length; i++) APP.push(page_get(lang, APP_PAGE_DATA[i], i))

        return APP
    }


// #\-CONSTANTES-\

    // --THIS
    const
    APP_DATA =
    {
        title: { fr: 'MORGAN - Développeur Web', en: 'MORGAN - Web Developer'}
        ,
        desc :
        {
            fr: 'Je suis un créateur, un développeur web et à mes heures perdues, un designer. Je vous propose mes services pour la réalisation de sites web entièrement sur mesure.'
            ,
            en: 'I\'m a creator, a web developer and, in my spare time, a designer. I offer you my services for the creation of fully customized websites. #FRONT, #BACK & #DESIGNER.'
        }
        ,
        image: '/images/me_meta.png'
    }
    ,
    APP_PAGE_DATA =
    [
/////////////////////////////////////////////HOME////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        {
            name     : 'home',
            component: Home,
            tag      : { fr: 'accueil', en: 'home' },
            overflow : false,
            height   : 0,
            label    :
            {
                value     : 'FR',
                attributes: { itemprop: 'nationality' }
            }
        ,
            route:
            {
                value: { fr: 'ACCUEIL', en: 'HOME' },
                alt  : { fr: 'Page d\'accueil', en: 'Home page' }
            }
        ,
            title:
            {
                attributes: { itemprop: 'description' }
                ,
                fragments:
                [
                    { frags: { fr: 'DEVELOPPEUR', en: 'DEVELOPER' } },
                    {
                        frags: { fr: 'WEB', en: 'WEB' },
                        tags : ['FRONT', 'BACK', '& DESIGNER']
                    }
                ]
                ,
                element:
                {
                    component: Icon
                    ,
                    props:
                    {
                        prop_SIZE  : 'calc(var(--title-size) * .7)',
                        prop_COLOR : COLORS.light,
                        prop_SPRING: false
                    }
                    ,
                    children: [{ component: Logo }]
                }
            }
        ,
            children: [HOME_SNAKE, HOME_BLACKBLOCKS, HOME_SLIDER, HOME_GAMES, HOME_TERMINAL]
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
            name     : 'presentation',
            component: Presentation,
            tag      : 'presentation',
            overflow : true,
            height   : 6,
            gap      : -1,
            label    : { value: 'PRO' }
        ,
            route:
            {
                value: { fr: 'PRÉSENTATION', en: 'PRESENTATION' },
                alt  : { fr: 'Page de présentation', en: 'Presentation page' }
            }
        ,
            title:
            {
                fragments:
                [
                    { frags: 'PRESENTATION' },
                    { tags : { fr: ['IDENTITÉ', 'LOCALITÉ', 'ÉTUDES', 'PRO', 'CONTACT'], en: ['IDENTITY', 'LOCALITY', 'STUDIES', 'PRO', 'CONTACT'] } }
                ]
            }
        ,
            nav:
            [
                {
                    id   : 0,
                    title: { fr: 'Page de contact', en: 'Contact page' },
                    value: 'Contact'
                },
                {
                    id   : 1,
                    value: { fr: 'CV', en: 'Resume' }
                }
            ]
        ,
            quote:
            {
                value : { fr: 'L\'informatique est un domaine qui valorise la créativité et l\'innovation.', en: 'IT is a field that values creativity and innovation.' },
                author: 'Bill Gates'
            }
        ,
            children: [PRESENTATION_FEATURES, PRESENTATION_CONTACT, PRESENTATION_RESUME]
        ,
            props:
            {
                prop_FOCUS: false,
                prop_TOP  : 0,
                prop_RATIO: 0,
                prop_START: void 0,
                prop_DIF  : void 0
            }
        }
/////////////////////////////////////////////SKILLS////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    ,
        {
            name     : 'skills',
            component: Skills,
            tag      : { fr: 'competences', en: 'skills' },
            overflow : true,
            height   : 6,
            label    : { value: 'SYSTEM' }
        ,
            route:
            {
                value: { fr: 'COMPÉTENCES', en: 'SKILLS' },
                alt  : { fr: 'Page des compétences', en: 'Skills page' }
            }
        ,
            title:
            {
                fragments:
                [
                    { frags: { fr: 'COMPETENCES', en: 'SKILLS' } },
                    { tags : { fr: ['HTML', 'CSS', 'JS', 'NODE JS', 'GESTION', 'ADAPTABILITÉ'], en: ['HTML', 'CSS', 'JS', 'NODE JS', 'MANAGEMENT', 'ADAPTABILITY'] } }
                ]
            }
        ,
            nav:
            [
                {
                    id   : 0,
                    title: { fr: 'HTML et CSS', en: 'HTML and CSS' },
                    value: 'Html & Css'
                },
                {
                    id   : 1,
                    value: 'Javascript'
                },
                {
                    id   : 2,
                    value: 'Node JS'
                },
                {
                    id   : 3,
                    title: { fr: 'Gestion, Outils et Adaptabilité', en: 'Management, Tools and Adaptability' },
                    value: { fr: 'Autres...', en: 'Others...' }
                }
            ]
        ,
            quote: { value: { fr: 'Le code est une forme d\'art qui permet de changer le monde.', en: 'Code is an art form that can change the world.' } }
        ,
            children: [SKILLS_SYSTEM]
        ,
            props:
            {
                prop_FOCUS: false,
                prop_INTRO: false,
                prop_TOP  : 0,
                prop_RATIO: 0,
                prop_START: void 0,
                prop_DIF  : void 0
            }
        }
/////////////////////////////////////////////PROJECTS////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    ,
        {
            name     : 'projects',
            component: Projects,
            tag      : { fr: 'projets', en: 'projects' },
            overflow : false,
            height   : 3,
            label    : { value: 'CARDS' }
        ,
            route:
            {
                value: { fr: 'PROJETS', en: 'PROJECTS' },
                alt  : { fr: 'Page des projets', en: 'Project page' }
            }
        ,
            title:
            {
                fragments:
                [
                    { frags: { fr: 'PROJETS', en: 'PROJECTS' } },
                    { tags : ['BOOKI', 'SOPHIE BLUEL', 'NINA CARDUCCI'] }
                ]
            }
        ,
            nav:
            [
                {
                    id   : 0,
                    value: 'Booki'
                },
                {
                    id   : 1,
                    value: 'Sophie Bluel'
                },
                {
                    id   : 2,
                    value: 'Nina Carducci'
                }
            ]
        ,
            quote: { value: { fr: 'Le code est un moyen de matérialiser nos idées créatives.', en: 'Code is a way of turning our creative ideas into reality.' } }
        ,
            children: [PROJECTS_ABOUT, PROJECTS_PROJECTS]
        ,
            props:
            {
                prop_FOCUS: false,
                prop_INTRO: false,
                prop_TOP  : 0,
                prop_START: void 0
            }
        }
    ]


// #\-VARIABLES-\

    // --THIS


// #\-FUNCTIONS-\

    // --SET

    // --GET
    function page_get(lang, data, id)
    {
        const
        DATA                         = lang_processing(lang, data),
        [CHILDREN, CHILDREN_PROCESS] = page_getChildrenData(lang, data.children)

        const PAGE =
        {
            ...DATA
            ,
            id
            ,
            route: page_getRoute(DATA.name, DATA.route),
            title: page_getTitle(id, DATA.title)
            ,
            children: CHILDREN
            ,
            process: Object.assign({ [DATA.tag]: 'top' }, CHILDREN_PROCESS)
        }

        return PAGE
    }

    function page_getChildrenData(lang, children = [])
    {
        const
        CHILDREN = {},
        PROCESS  = {}

        for (const CHILD of children)
        {
            const
            NAME = CHILD.name,
            DATA = CHILD.getData(lang)

            if (CHILD.tag) PROCESS[CHILD.tag] = 'start'

            if (DATA instanceof Array)
            {
                for (let {tags} of DATA)
                {
                    if (tags instanceof Array) for (const TAG of tags) if (TAG !== '') PROCESS[TAG] = NAME
                }
            }

            CHILDREN[NAME] = DATA
        }

        return [CHILDREN, PROCESS]
    }

    function page_getRoute(name, {value, alt})
    {
        return {
            on        : false,
            value,
            attributes:
            {
                href        : '/' + name,
                alt         : alt,
                title       : alt,
                'aria-label': `${value} ${value.split('').join(' ')}`
            }
        }
    }

    function page_getTitle(id, title)
    {
        return {
            html: 'h' + (id ? 2 : 1),
            ...title
        }
    }

    // --UPDATES


//=======@UTILS|

    // --*