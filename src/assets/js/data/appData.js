/*----------------------------------------------- #||--appdata--|| */


// #\-IMPORTS-\

    // --SVELTE

    // --LIB
    import COLORS from '$lib/colors'

    // --CONTEXTS

    // --JS
    import HOME_SNAKE       from './home/snake'
    import HOME_BLACKBLOCKS from './home/blackblocks'
    import HOME_SLIDER      from './home/slider'
    import HOME_GAMES       from './home/games'
    import HOME_TERMINAL    from './home/terminal'

    import PRESENTATION_FEATURES from './presentation/features'
    import PRESENTATION_CONTACT  from './presentation/contact'

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
    export default function app_getData(lang = 'fr')
    {
        const APP = []
    
        for (let i = 0; i < APP_DATA.length; i++) APP.push(page_get(lang, APP_DATA[i], i))

        return APP
    }


// #\-CONSTANTES-\

    // --THIS
    const APP_DATA =
    [
/////////////////////////////////////////////HOME////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        {
            name     : 'home',
            component: Home,
            tag      : { fr: 'accueil', en: 'home' },
            overflow : false,
            height   : 0,
            label    : 'FR'
        ,
            route:
            {
                value: { fr: 'ACCUEIL', en: 'HOME' },
                alt  : { fr: 'Page d\'accueil', en: 'Home page' }
            }
        ,
            title:
            {   
                fragments:
                [
                    { frags: { fr: 'DEVELOPPEUR', en: 'DEVELOPER' } },
                    {
                        frags: { fr: 'WEB', en: 'WEB' },
                        tags : { fr: ['FRONT', 'BACK', '& DESIGNER'], en: ['FRONT', 'BACK', '& DESIGNER'] }
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
            tag      : { fr: 'presentation', en: 'presentation' },
            overflow : true,
            height   : 6,
            gap      : -1,
            label    : 'PRO'
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
                    { frags: { fr: 'PRESENTATION', en: 'PRESENTATION' } },
                    { tags : { fr: ['IDENTITÉ', 'LOCALITÉ', 'ÉTUDES', 'PRO', 'CONTACT'], en: ['IDENTITY', 'LOCALITY', 'STUDIES', 'PRO', 'CONTACT'] } }
                ]
            }
        ,
            nav:
            [
                {
                    id   : 0,
                    title: { fr: 'Page de contact', en: 'Contact page' },
                    value: { fr: 'Contact', en: 'Contact' }
                }
            ]
        ,
            quote:
            {
                value : { fr: 'L\'informatique est un domaine qui valorise la créativité et l\'innovation.', en: 'IT is a field that values creativity and innovation.' },
                author: 'Bill Gates'
            }
        ,
            children: [PRESENTATION_FEATURES, PRESENTATION_CONTACT]
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
            name     : 'skills',
            component: Skills,
            tag      : { fr: 'competences', en: 'skills' },
            overflow : true,
            height   : 6,
            label    : 'SYSTEM'
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
                    value: { fr: 'Html & Css', en: 'Html & Css' }
                },
                {
                    id   : 1,
                    value: { fr: 'Javascript', en: 'Javascript' }
                },
                {
                    id   : 2,
                    value: { fr: 'Node JS', en: 'Node JS' }
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
                prop_TOP: 0,
                prop_RATIO: 0,
                prop_START: void 0,
                prop_DIF: void 0
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
            label    : 'CARDS'
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
                    { tags : { fr: ['BOOKI', 'SOPHIE BLUEL', 'NINA CARDUCCI'], en: ['BOOKI', 'SOPHIE BLUEL', 'NINA CARDUCCI'] } }
                ]
            }
        ,
            nav:
            [
                {
                    id   : 0,
                    value: { fr: 'Booki', en: 'Booki' }
                },
                {
                    id   : 1,
                    value: { fr: 'Sophie Bluel', en: 'Sophie Bluel' }
                },
                {
                    id   : 2,
                    value: { fr: 'Nina Carducci', en: 'Nina Carducci' }
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
                prop_TOP: 0,
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
        const [CHILDREN, CHILDREN_PROCESS] = page_getChildrenData(lang, data.children)

        data.tag = data.tag[lang]

        const PAGE =
        {
            ...data
            ,
            id
            ,
            route: page_getRoute(lang, data.name, data.route),
            title: page_getTitle(lang, id, data.title),
            nav  : page_getNav(lang, data.nav),
            quote: page_getQuote(lang, data.quote)
            ,
            children: CHILDREN
            ,
            process: Object.assign({ [data.tag]: 'top' }, CHILDREN_PROCESS)
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

            if (CHILD.tag) PROCESS[CHILD.tag[lang]] = 'start'

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

    function page_getRoute(lang, name, {value, alt})
    {
        const
        VALUE = value[lang],
        ALT   = alt[lang]
    
        return {
            on        : false,
            value     : VALUE,
            attributes:
            {
                href        : '/' + name,
                alt         : ALT,
                title       : ALT,
                'aria-label': `${VALUE} ${VALUE.split('').join(' ')}`
            }
        }
    }

    function page_getTitle(lang, id, title)
    {
        for (const _ of title.fragments)
        {
            if (_.frags) _.frags = _.frags[lang]
            if (_.tags)  _.tags  = _.tags [lang]
        }
    
        return {
            html: 'h' + (id ? 2 : 1),
            ...title
        }
    }

    function page_getNav(lang, nav)
    {
        return (
        nav
        ? nav.map(_ =>
        {
            const NAV = { id: _.id }
        
            if (_.title) NAV.title = _.title[lang]
            if (_.value) NAV.value = _.value[lang]
        
            return NAV
        })
        : null)
    }

    function page_getQuote(lang, quote)
    {
        return quote
        ?   {
                value : quote.value[lang],
                author: quote.author ?? null
            }
        :   null
    }

    // --UPDATES


//=======@UTILS|

    // --*