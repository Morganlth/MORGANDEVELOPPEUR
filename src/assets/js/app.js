// #EXPORT

    // --PAGES-DATAS
    export default
    [
  /////////////////////////////////////////////HOME////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        {
            id: 0,
            name: 'home',
    
            focus: false,
            intro: false,
            overflow: false,

            h: 1,
            top: 0,
            start: 0,
            end: 0,
            dif: 0,

            props:
            {
                prop_FOCUS: false,
                prop_RATIO: 0
            ,
                prop_SPACECUBE: new Float64Array(
                [
                    // dimension / x - y / floating
                    2, 1, -1, 0,
            
                    1.5, -1.75, -2.25, 0,
                    1.5, 2.75, -2.75, 0,
                    1.5, 3.75, 1.75, 0,
            
                    1, 7, .5, 0,
                    1, 7, -2, 0,
                    1, 6.5, 2, 0,
                    1, 6, 3.5, 0,
                    1, 6, .5, 0,
                    1, 6, -1, 0,
                    1, 6, -2, 0,
                    1, 5, 2.5, 0,
                    1, 5, 1.5, 0,
                    1, 5, -.5, 0,
                    1, 5, -2.5, 0,
                    1, 4.5, .5, 0,
                    1, 4.5, -1.5, 0,
                    1, 4, -2.5, 0,
                    1, 3.5, 0, 0,
                    1, 3.5, -1, 0,
                    1, 2.5, 2, 0,
                    1, 2.5, 1, 0,
                    1, 2.5, -.5, 0,
                    1, 2.5, -1.5, 0,
                    1, 1.5, 2, 0,
                    1, 1.5, .5, 0,
                    1, .5, 1, 0,
                    1, .5, -2.5, 0,
                    1, -.5, -2, 0,
                    1, -1, -.5, 0,
                    1, -4.5, -2, 0,
                    1, -5.5, -2.5, 0,
            
                    .5, 7.75, 3.25, 0,
                    .5, 7.25, 3.75, 0,
                    .5, 7.25, 3.25, 0,
                    .5, 7.25, -.75, 0,
                    .5, 6.75, 1.25, 0,
                    .5, 5.25, -1.25, 0,
                    .5, 4.25, -.25, 0,
                    .5, 4.25, -.75, 0,
                    .5, 3.25, -1.75, 0,
                    .5, 2.25, .25, 0,
                    .5, 1.75, 1.25, 0,
                    .5, 1.75, -2.25, 0,
                    .5, 1.25, 1.25, 0,
                    .5, 1.25, -2.25, 0,
                    .5, .75, .25, 0,
                    .5, .25, .25, 0,
                    .5, -.25, -.25, 0,
                    .5, -.25, -.75, 0,
                    .5, -.25, -1.25, 0,
                    .5, -.75, -1.25, 0,
                    .5, -1.75, -.75, 0,
                    .5, -1.75, -1.25, 0,
                    .5, -4.75, -3.25, 0,
                    .5, -6.25, -2.75, 0,
                    .5, -6.75, -2.75, 0,
            
                    1, -3.5, -1, 1,
                    1, -3.5, -3.5, 1,
            
                        .5, 3, 3.5, 1,
                        .5, -.5, 2, 1,
                    .5, -.75, .75, 1,
                    .5, -2.25, .5, 1,
                    .5, -3.25, -2.25, 1,
                    .5, -4.75, -.75, 1,
                        .5, -6.75, -1.25, 1,
                    .5, -7.75, -3.5, 1
                ])
            ,
                prop_CUBES:
                [
                    {
                        id: 0,
                        props:
                        {
                            prop_X: .85,
                            prop_Y: .03,
                            prop_RADIUS: 120
                        }
                    },
                    {
                        id: 1,
                        props:
                        {
                            prop_X: .34,
                            prop_Y: .6,
                            prop_RADIUS: 140
                        }
                    },
                    {
                        id: 2,
                        props:
                        {
                            prop_X: .9,
                            prop_Y: .5,
                            prop_RADIUS: 160
                        }
                    }
                ]
            },
            link:
            {
                on: false,
                value: 'ACCUEIL',
                attributes:
                {
                    href: '#home',
                    alt: 'Accueil',
                    'aria-label': 'Page accueil / home du site Morgan Développeur' 
                }
            },
            wrapper:
            {
                prop_TITLE:
                {
                    htmlElement: 'h1',
                    contents:
                    [
                        { frags: 'DEVELOPPEUR' },
                        {
                            frags: 'WEB',
                            tags: ['FRONT', 'BACK', '& DESIGNER']
                        }
                    ]
                },
                prop_INFO: 'FR'
            }
        }
, /////////////////////////////////////////////PRESENTATION////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        {
            id: 1,
            name: 'presentation',

            focus: false,
            intro: false,
            overflow: true,

            h: 7,
            top: 0,
            start: 0,
            end: 0,
            dif: 0,
        
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
            ],
            props:
            {
                prop_FOCUS: false,
                prop_RATIO: 0,
                prop_START: void 0,
                prop_END: void 0,
                prop_DIF: void 0
            ,
                prop_FEATURES:
                [
                    {
                        topic: ['NOM', 'AGE'],
                        contents:
                        [
                            {
                                htmlElement: 'strong',
                                props: {},
                                data: 'LE THUAUT Morgan'
                            },
                            {
                                htmlElement: 'p',
                                props: {},
                                data: '21 ans'
                            }
                        ]
                    },
                    {
                        topic: ['LOCALITE', 'FR'],
                        contents:
                        [
                            {
                                htmlElement: 'p',
                                props: {},
                                data: 'Bretagne'
                            },
                            {
                                htmlElement: 'strong',
                                props: {},
                                data: 'FRANCE'
                            }
                        ]
                    },
                    {
                        topic: ['ETUDES', 'FORMATIONS'],
                        contents:
                        [
                            {
                                htmlElement: 'p',
                                props: {},
                                data: 'Bac S SVT spécialité MATHS, Lycée Jeanne d\'Arc Pontivy'
                            },
                            {
                                htmlElement: 'strong',
                                props: {},
                                data: 'Développeur Web, OpenClassrooms'
                            }
                        ]
                    },
                    {
                        topic: ['PROFESSION', 'OBJECTIFS'],
                        contents:
                        [
                            {
                                htmlElement: 'strong',
                                props: {},
                                data: 'Développeur Web'
                            },
                            {
                                htmlElement: 'p',
                                props: {},
                                data: 'Objectifs: dev FULLSTACK, dev MOBILE & DESIGNER'
                            }
                        ]
                    },
                    {
                        topic: ['CONTACT'],
                        contents:
                        [
                            {
                                htmlElement: 'p',
                                props: {},
                                data: 'Email: lethuaut.morgan@gmail.com'
                            },
                            {
                                htmlElement: 'p',
                                props: {},
                                data: 'Tel: 06 09 23 72 08'
                            },
                            {
                                htmlElement: 'a',
                                props: {},
                                data: 'LinkedIn: https://www.linkedin.com/in/le-thuaut-morgan'
                            }
                        ]
                    },
                ]
            },
            link:
            {
                on: false,
                value: 'PRÉSENTATION',
                attributes:
                {
                    href: '#presentation',
                    alt: 'Ma présentation',
                    'aria-label': 'Page de ma présentation personnel'
                }
            },
            wrapper:
            {
                prop_TITLE:
                {
                    htmlElement: 'h2',
                    contents:
                    [
                        {
                            frags: 'MA',
                            tags: ['IDENTITÉ', 'LOCALITÉ', 'ÉTUDES', 'PRO', 'CONTACT']
                        },
                        { frags: 'PRESENTATION' }
                    ]
                },
                prop_INFO: 'SNAKE'
            }
        }
, /////////////////////////////////////////////SKILLS////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        {
            id: 2,
            name: 'skills',
    
            focus: false,
            intro: false,
            overflow: true,

            h: 7,
            top: 0,
            start: 0,
            end: 0,
            dif: 0,
        
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
            ],
            props:
            {
                prop_FOCUS: false,
                prop_INTRO: false,
                prop_RATIO: 0,
                prop_START: void 0,
                prop_DIF: void 0
            ,
                prop_SYSTEM:
                [
                    {
                        id: 0,
                        tag: 'HTML - CSS',
                        props:
                        {
                            prop_ROTATE: MATH.toRad(150),
                            prop_SRC: 'html-5.png',
                            prop_ALT: 'HTML Logo : https://www.flaticon.com/fr/icone-gratuite/html-5_174854?term=html&page=1&position=2&origin=search&related_id=174854',
                            prop_COLOR: '#FC490B'
                        },
                        skills:
                        [
                            { topic: true, text: 'HTML5 & CSS3' },
                            { text: 'Découper, assembler et intégrer tous les éléments d’une maquette graphique en HTML5 et CSS', tags: ['booki'] },
                            { text: 'Choisir intelligemment les balises HTML' },
                            { text: 'Ajouter du contenu audio et vidéo en HTML5' },
                            { text: 'Utiliser less Media Queries CSS' },
                            { text: 'Selectionner intelligemment les couleurs, tailles et autres propriétés' },
                            { text: 'Appliquer des transitions' },
                            { text: 'Animer les pages web avec CSS3 (animation & KeyFrames)' },
                            { text: 'Optimiser les performances en favorisant les propriétés de transformation' },
                            { text: 'Manipuler la perspective et la 3d CSS' },
                            { topic: true, text: 'SASS - SCSS' },
                            { text: 'Intégrer Sass / Scss dans un projet' },
                            { text: 'Déclarer des variables Sass / Scss' },
                            { text: 'Utiliser la logique de Scss / Sass (@if, @each, @for...)' },
                            { text: 'Importer d\'autre fichier Sass / Scss avec la @use directive' },
                            { text: 'Créer des fonctions utilitaires avec @function et @mixin de Sass / Scss' },
                            { text: 'Importer et utiliser les modules Sass / Scss (sass:math, sass:list...)' },
                            { text: 'Utiliser la @extend directive et les placeholder' },
                            { text: 'Exporter des modules Sass / Scss vers JavaScript' }
                        ]
                    },
                    {
                        id: 1,
                        tag: 'JAVASCRIPT',
                        props:
                        {
                            prop_ROTATE: MATH.toRad(30),
                            prop_SRC: 'js.png',
                            prop_ALT: 'JavaScript Logo : https://www.flaticon.com/fr/icone-gratuite/js_5968292?term=javascript&page=1&position=7&origin=search&related_id=5968292',
                            prop_COLOR: '#FFDF00'
                        },
                        skills:
                        [
                            { topic: true, text: 'ES5 & ES6' },
                            { text: 'Manipuler les éléments du DOM avec JavaScript', tags: ['sophiebluel'] },
                            { text: 'Faire réagir la page web en fonction des actions de l’utilisateur en JavaScript', tags: ['sophiebluel'] },
                            { text: 'Se connecter à un service web pour exploiter des données tierces (API)', tags: ['sophiebluel'] },
                            { text: 'Gérer les comptes utilisateurs (coté client)', tags: ['sophiebluel'] },
                            { text: 'Récupérer les données utilisateurs dans le JavaScript via les formulaires', tags: ['sophiebluel'] },
                            { text: 'Animer les pages web avec JavaScript' },
                            { text: 'Concevoir un site maintenable grâce à la gestion des erreurs et exceptions' },
                            { text: 'Construire des algorithmes' },
                            { text: 'Utiliser le Javascript Asynchrone (async, await, Promise...)' },
                            { text: 'Créer et instancier des objets avec les classes Javascript' },
                            { text: 'Dessiner sur un canvas des formes, courbes, images...' },
                            { topic: true, text: 'REACT & REACT ROUTER' },
                            { text: 'Utiliser le framework React', tags: ['kasa'] },
                            { text: 'Configurer la navigation entre les pages de l\'application avec React Router', tags: ['kasa'] },
                            { text: 'Initialiser une application avec Create React App', tags: ['kasa'] },
                            { text: 'Développer des éléments de l\'interface d\'un site web grâce à des composants React', tags: ['kasa'] },
                            { topic: true, text: 'SVELTE & SVELTEKIT' },
                            { text: 'Développer et initialiser une application avec Svelte et SvelteKit' },
                            { text: 'Utiliser le système de routage de SvelteKit' },
                            { text: 'Créer des composants Svelte' },
                            { text: 'Intégrer des animations / transitions avec Svelte' },
                            { text: 'Déclarer et manipuler les variables réactives, le binding, les props et les Stores de Svelte' },
                            { text: 'Incorporer la logique de Svelte (if, else, each...)' },
                            { text: 'Manipuler les fonctions de Lifecycle proposer par Svelte pour la gestion de composants' },
                            { text: 'Utiliser les évènements Svelte, les modificateurs et la propagation' },
                            { text: 'Intégrer Sass / Scss à Svelte' },
                            { topic: true, text: 'THREE JS' },
                            { text: 'créer une scène Three JS' },
                            { text: 'Ajouter une Caméra adapter à une situation (perspectiveCamera, orthographicCamera...)' },
                            { text: 'Jouer avec les différents effets de lumières et les ombres de Three JS' },
                            { text: 'Rendre des objets 3d de différentes géometries et matériaux' },
                            { text: 'Appliquer des Textures comme des images sur les objets Three JS' },
                            { text: 'Manipuler les positions et rotations sur les plans x, y et z' },
                            { text: 'Animer des objets 3d' },
                            { text: 'Utiliser les Vecteurs ou les Courbes de Bezier' },
                            { text: 'Utiliser les Shaders (niveau débutant)' }
                        ]
                    },
                    {
                        id: 2,
                        tag: 'NODE JS',
                        props:
                        {
                            prop_ROTATE: MATH.toRad(60),
                            prop_SRC: 'node-js.png',
                            prop_ALT: 'Node Js Logo : https://www.pngwing.com/en/free-png-yghmf',
                            prop_COLOR: '#88C043'
                        },
                        skills:
                        [
                            { topic: true, text: 'NODE JS' },
                            { text: 'Créer un nouveau projet NodeJS impliquant diverses dépendances (Express, MongoDB, jsonwebtoken...)', tags: ['monvieuxgrimoire'] },
                            { text: 'Gérer les comptes utilisateurs (coté serveur)', tags: ['monvieuxgrimoire'] },
                            { text: 'Créer, gérer et afficher le contenu d’une base de données', tags: ['monvieuxgrimoire'] },
                            { text: 'Créer des API (REST)', tags: ['monvieuxgrimoire'] },
                            { text: 'Implémenter un modèle logique de données conformément à la réglementation', tags: ['monvieuxgrimoire'] },
                            { text: 'Mettre en œuvre des opérations CRUD de manière sécurisée', tags: ['monvieuxgrimoire'] },
                            { text: 'Stocker des données de manière sécurisée', tags: ['monvieuxgrimoire'] }
                        ]
                    },
                    {
                        id: 3,
                        tag: 'AUTRES',
                        props:
                        {
                            prop_ROTATE: MATH.toRad(90),
                            prop_SRC: 'github-mark-white.png',
                            prop_ALT: 'Github Logo : https://github.com/logos',
                            prop_COLOR: '#FFFFFF'
                        },
                        skills:
                        [
                            { topic: true, text: 'GESTION & OUTILS' },
                            { text: 'Suivre le déroulement du projet grâce à un outil de gestion de projet' },
                            { text: 'Rédiger les spécifications techniques d\'un projet web à partir de besoins fonctionnels' },
                            { text: 'Découper une fonctionnalités en tâches pour préparer le développement' },
                            { text: 'Présenter la solution technique' },
                            { text: 'Mettre en place une méthode de veille technologique' },
                            { text: 'Versionner son projet avec Git et Github' },
                            { text: 'Installer un environnement de développement front-end' },
                            { text: 'Utiliser le logiciel Notion' },
                            { text: 'Déployer un site statique en ligne' },
                            { topic: true, text: 'ADAPTABILITE' },
                            { text: 'Appliquer les standards du web et les normes en vigueur', tags: ['booki', 'ninacarducci'] },
                            { text: 'Construire un site web fluide s’adaptant à tout type d’écran (web, smartphone et tablette)', tags: ['booki'] },
                            { text: 'Améliorer le référencement naturel en utilisant les balises selon leur sémantique', tags: ['ninacarducci'] },
                            { text: 'Améliorer les performances et optimiser une page web', tags: ['ninacarducci'] },
                            { text: 'Appliquer les Schema.org', tags: ['ninacarducci'] },
                            { text: 'Utiliser les balises meta OPEN GRAPH des réseaux sociaux (og, twitter)', tags: ['ninacarducci'] },
                            { text: 'Débugger un site web grâce aux DevTools', tags: ['ninacarducci'] },
                            { text: 'Rédiger un cahier de recette pour tester un site', tags: ['ninacarducci'] }
                        ]
                    }
                ].map((item, i, array) =>
                {
                    const
                    LENGTH = array.length,
                    FRACTION = MATH.PI.x2 / LENGTH
            
                    item.props.prop_OFFSET = FRACTION * (LENGTH - i) + FRACTION / 2
            
                    return item
                })
            },
            link:
            {
                on: false,
                value: 'COMPÉTENCES',
                attributes:
                {
                    href: '#skills',
                    alt: 'Mes compétences',
                    'aria-label': 'Page de mes compétences de développeur web'
                }
            },
            wrapper:
            {
                prop_TITLE:
                {
                    htmlElement: 'h2',
                    contents:
                    [
                        {
                            frags: 'MES',
                            tags: ['HTML', 'CSS', 'JS', 'NODE JS', 'GESTION', 'ADAPTABILITÉ']
                        },
                        { frags: 'COMPETENCES' }
                    ]
                },
                prop_INFO: 'SYSTEM'
            }
        }
, /////////////////////////////////////////////PROJECTS////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        {
            id: 3,
            name: 'projects',
    
            focus: false,
            intro: false,
            overflow: false,

            h: 3,
            top: 0,
            start: 0,
            end: 0,
            dif: 0,
        
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
            ],
            props:
            {
                prop_INTRO: false,
                prop_RATIO: 0
            ,
                prop_CARDS:
                [
                    {
                        id: 0,
                        value: 'BOOKI'
                    },
                    {
                        id: 1,
                        value: 'SOPHIE BLUEL'
                    },
                    {
                        id: 2,
                        value: 'NINA CARDUCCI'
                    }
                ]
            },
            link:
            {
                on: false,
                value: 'PROJETS',
                attributes:
                {
                    href: '#projects',
                    alt: 'Mes projets',
                    'aria-label': 'Page de mes projets web'
                }
            },
            wrapper:
            {
                prop_TITLE:
                {
                    htmlElement: 'h2',
                    contents:
                    [
                        {
                            frags: 'MES',
                            tags: ['BOOKI', 'SOPHIE BLUEL', 'NINA CARDUCCI']
                        },
                        { frags: 'PROJETS' }
                    ]
                },
                prop_INFO: 'SPACE'
            }
        }
    ]

// #IMPORT

    // --JS
    import MATH from './utils/math'