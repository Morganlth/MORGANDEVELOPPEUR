/*----------------------------------------------- #||--system--|| */


// #\-IMPORTS-\

    // --SVELTE

    // --LIB
    import MATH from '$lib/math'

    // --CONTEXTS

    // --JS

//=======@COMPONENTS|

    // --*


// #\-EXPORTS-\

    // --THIS
    export default
    {
        name: 'system'
    ,
        getData: lang => SYSTEM_DATA.map(item =>
        {
            item.name              = item.name[lang]
            item.tags              = item.tags[lang]
            item.props.prop_TITLE  = item.name
            item.props.prop_OFFSET = 1 / (SYSTEM_DATA.length + 1) * (item.id + 1)

            for (let i = 0; i < item.skills.length; i++)
            {
                const SKILL = item.skills[i]

                if (SKILL instanceof Object) item.skills[i] = { skill: SKILL[lang] }
            }

            return item
        })
    }


// #\-CONSTANTES-\

    // --THIS
    const SYSTEM_DATA =
    [
        {
            id   : 0,
            name : { fr: 'Html et Css', en: 'Html and Css' },
            tags : { fr: ['html', 'css'], en: ['html', 'css'] },
            props:
            {
                prop_ROTATE: MATH.toRad(150),
                prop_SRC   : 'html-5.png',
                prop_ALT   : 'HTML Logo: https://www.flaticon.com/fr/icone-gratuite/html-5_174854?term=html&page=1&position=2&origin=search&related_id=174854',
                prop_COLOR : '#FC490B'
            },
            skills:
            [
                'HTML5 & CSS3',
                {
                    fr: 'Découper, assembler et intégrer tous les éléments d\'une maquette graphique en HTML5 et CSS.'
                    ,
                    en: 'Slice, assemble and integrate all the elements of a graphic model in HTML5 and CSS.'
                },
                {
                    fr: 'Choisir intelligemment les balises HTML.'
                    ,
                    en: 'Choose HTML tags intelligently.'
                },
                {
                    fr: 'Ajouter du contenu audio et vidéo en HTML5.'
                    ,
                    en: 'Add audio and video content in HTML5.'
                },
                {
                    fr: 'Utiliser les Media Queries CSS.'
                    ,
                    en: 'Use CSS Media Queries.'
                },
                {
                    fr: 'Sélectionner intelligemment les couleurs, tailles et autres propriétés.'
                    ,
                    en: 'Select colours intelligently, sizes and other properties.'
                },
                {
                    fr: 'Appliquer des transitions.'
                    ,
                    en: 'Apply transitions.'
                },
                {
                    fr: 'Animer les pages web avec CSS3 (animation & KeyFrames).'
                    ,
                    en: 'Animate web pages with CSS3 (animation & KeyFrames).'
                },
                {
                    fr: 'Optimiser les performances en favorisant les propriétés de transformation.'
                    ,
                    en: 'Optimise performance by promoting transformation properties.'
                },
                {
                    fr: 'Manipuler la perspective et la 3d CSS.'
                    ,
                    en: 'Use perspective and 3d CSS.'
                },
                'SASS - SCSS',
                {
                    fr: 'Intégrer Sass/Scss dans un projet.'
                    ,
                    en: 'Integrate Sass/Scss into a project.'
                },
                {
                    fr: 'Déclarer des variables Sass/Scss.'
                    ,
                    en: 'Declare Sass/Scss variables.'
                },
                {
                    fr: 'Utiliser la logique de Scss/Sass (@if, @each, @for...).'
                    ,
                    en: 'Use Scss/Sass logic (@if, @each, @for, etc.).'
                },
                {
                    fr: 'Importer d\'autre fichier Sass/Scss avec la @use directive.'
                    ,
                    en: 'Import another Sass/Scss file with the @use directive.'
                },
                {
                    fr: 'Créer des fonctions utilitaires avec @function et @mixin de Sass/Scss.'
                    ,
                    en: 'Create utility functions with @function and @mixin in Sass/Scss.'
                },
                {
                    fr: 'Importer et utiliser les modules Sass/Scss (sass:math, sass:list...).'
                    ,
                    en: 'Import and use Sass/Scss modules (sass:math, sass:list, etc.).'
                },
                {
                    fr: 'Utiliser la @extend directive et les placeholder.'
                    ,
                    en: 'Use the @extend directive and placeholders.'
                },
                {
                    fr: 'Exporter des modules Sass/Scss vers JavaScript.'
                    ,
                    en: 'Export Sass/Scss modules to JavaScript.'
                }
            ]
        },
        {
            id   : 1,
            name : { fr: 'Javascript', en: 'Javascript' },
            tags : { fr: ['javascript'], en: ['javascript'] },
            props:
            {
                prop_ROTATE: MATH.toRad(30),
                prop_SRC   : 'js.png',
                prop_ALT   : 'JavaScript Logo: https://www.flaticon.com/fr/icone-gratuite/js_5968292?term=javascript&page=1&position=7&origin=search&related_id=5968292',
                prop_COLOR : '#FFDF00'
            },
            skills:
            [
                'ES5 & ES6',
                {
                    fr: 'Manipuler les éléments du DOM avec JavaScript.'
                    ,
                    en: 'Manipulate DOM elements with JavaScript.'
                },
                {
                    fr: 'Faire réagir la page web en fonction des actions de l\'utilisateur en JavaScript.'
                    ,
                    en: 'Make the web page react to user actions using JavaScript.'
                },
                {
                    fr: 'Se connecter à un service web pour exploiter des données tierces (API).'
                    ,
                    en: 'Connect to a web service to use third-party data (API).'
                },
                {
                    fr: 'Gérer les comptes utilisateurs (coté client).'
                    ,
                    en: 'Manage user accounts (client side).'
                },
                {
                    fr: 'Récupérer, traiter et analyser des données en JavaScript.'
                    ,
                    en: 'Retrieve, process, and analyze data in JavaScript.'
                },
                {
                    fr: 'Animer des éléments avec JavaScript.'
                    ,
                    en: 'Animate elements with JavaScript.'
                },
                {
                    fr: 'Concevoir un site maintenable grâce à la gestion des erreurs et des exceptions.'
                    ,
                    en: 'Design a maintainable website through error and exception handling.'
                },
                {
                    fr: 'Construire des algorithmes.'
                    ,
                    en: 'Build algorithms.'
                },
                {
                    fr: 'Utiliser le Javascript Asynchrone (async, await, Promise...).'
                    ,
                    en: 'Use asynchronous JavaScript (async, await, Promise, etc.).'
                },
                {
                    fr: 'Créer et instancier des objets avec les class Javascript.'
                    ,
                    en: 'Create and instantiate objects with JavaScript class.'
                },
                {
                    fr: 'Dessiner sur un canvas des formes, images, text...'
                    ,
                    en: 'Draw shapes, images, text, etc., on a canvas.'
                },
                'REACT & REACT ROUTER',
                {
                    fr: 'Utiliser le framework React.'
                    ,
                    en: 'Use the React framework.'
                },
                {
                    fr: 'Configurer la navigation entre les pages de l\'application avec React Router.'
                    ,
                    en: 'Configure page navigation within the application using React Router.'
                },
                {
                    fr: 'Initialiser une application avec Create React App.'
                    ,
                    en: 'Initialise an application with Create React App.'
                },
                {
                    fr: 'Développer des éléments de l\'interface d\'un site web grâce à des composants React.'
                    ,
                    en: 'Develop interface elements of a website using React components.'
                },
                'SVELTE',
                {
                    fr: 'Créer des composants Svelte.'
                    ,
                    en: 'Create Svelte components.'
                },
                {
                    fr: 'Intégrer des animations/transitions avec Svelte.'
                    ,
                    en: 'Integrate animations/transitions with Svelte.'
                },
                {
                    fr: 'Déclarer et manipuler les variables réactives, le binding, les props et les stores de Svelte.'
                    ,
                    en: 'Declare and manipulate reactive variables, binding, props, and stores in Svelte.'
                },
                {
                    fr: 'Incorporer la logique de Svelte (if, else, each...).'
                    ,
                    en: 'Incorporate Svelte logic (if, else, each, etc.).'
                },
                {
                    fr: 'Manipuler les fonctions de Lifecycle proposer par Svelte pour la gestion de composants.'
                    ,
                    en: 'Manipulate the Lifecycle functions provided by Svelte for component management.'
                },
                {
                    fr: 'Utiliser les évènements Svelte, les modificateurs et la propagation.'
                    ,
                    en: 'Use Svelte events, modifiers and propagation.'
                },
                {
                    fr: 'Intégrer Sass/Scss à Svelte.'
                    ,
                    en: 'Integrate Sass/Scss with Svelte.'
                },
                'THREE JS',
                {
                    fr: 'Créer une scène Three JS.'
                    ,
                    en: 'Create a Three JS scene.'
                },
                {
                    fr: 'Ajouter des caméras (perspectiveCamera, orthographicCamera...).'
                    ,
                    en: 'Add cameras (perspectiveCamera, orthographicCamera, etc.).'
                },
                {
                    fr: 'Jouer avec les différents effets de lumière et les ombres de Three JS.'
                    ,
                    en: 'Play with the different lighting effects and shadows in Three JS.'
                },
                {
                    fr: 'Rendre des objets 3d de différentes géométries et matériaux.'
                    ,
                    en: 'Render 3d objects with different geometries and materials.'
                },
                {
                    fr: 'Appliquer des Textures comme des images sur les objets Three JS.'
                    ,
                    en: 'Apply textures like images to Three JS objects.'
                },
                {
                    fr: 'Manipuler les positions et les rotations sur les plans x, y et z.'
                    ,
                    en: 'Manipulate positions and rotations on the x, y, and z planes.'
                },
                {
                    fr: 'Animer des objets 3d.'
                    ,
                    en: 'Animate 3d objects.'
                },
                {
                    fr: 'Utiliser les Vecteurs ou les Courbes de Bezier.'
                    ,
                    en: 'Use Vectors or Bezier curves.'
                },
                {
                    fr: 'Utiliser les Shaders (niveau débutant).'
                    ,
                    en: 'Use shaders (beginner level).'
                }
            ]
        },
        {
            id   : 2,
            name : { fr: 'Node JS', en: 'Node JS' },
            tags : { fr: ['nodejs'], en: ['nodejs'] },
            props:
            {
                prop_ROTATE: MATH.toRad(60),
                prop_SRC   : 'node-js.png',
                prop_ALT   : 'Node Js Logo: https://www.pngwing.com/en/free-png-yghmf',
                prop_COLOR : '#88C043'
            },
            skills:
            [
                'NODE JS',
                {
                    fr: 'Créer un nouveau projet NodeJS impliquant diverses dépendances (Express, MongoDB, jsonwebtoken...).'
                    ,
                    en: 'Create a new NodeJS project involving various dependencies (Express, MongoDB, jsonwebtoken, etc.).'
                },
                {
                    fr: 'Gérer les comptes utilisateurs (coté serveur).'
                    ,
                    en: 'Manage user accounts (server side).'
                },
                {
                    fr: 'Créer, gérer et afficher le contenu d\'une base de données.'
                    ,
                    en: 'Create, manage and display the contents of a database.'
                },
                {
                    fr: 'Créer des API (REST).'
                    ,
                    en: 'Create RESTful APIs.'
                },
                {
                    fr: 'Implémenter un modèle logique de données conformément à la réglementation.'
                    ,
                    en: 'Implement a logical data model in compliance with regulations.'
                },
                {
                    fr: 'Mettre en œuvre des opérations CRUD de manière sécurisée.'
                    ,
                    en: 'Implement CRUD operations securely.'
                },
                {
                    fr: 'Stocker des données de manière sécurisée.'
                    ,
                    en: 'Store data securely.'
                },
                'SVELTEKIT',
                {
                    fr: 'Développer et initialiser une application avec Svelte et SvelteKit.'
                    ,
                    en: 'Develop and initialize an application with Svelte and SvelteKit.'
                },
                {
                    fr: 'Utiliser le système de routage de SvelteKit (page, layout).'
                    ,
                    en: 'Use the SvelteKit routing system (page, layout).'
                },
                {
                    fr: 'Ajouter des routes dynamiques [dynamique] et utiliser le paramètre de rest [...rest].'
                    ,
                    en: 'Add dynamic routes [dynamic] and use the rest parameter [...rest].'
                },
                {
                    fr: 'Traiter les cookies, paramètres... dans la load fonction.'
                    ,
                    en: 'Process cookies, settings, etc. in the load function.'
                },
                {
                    fr: 'Traiter les actions de formulaire.'
                    ,
                    en: 'Process form actions.'
                }
            ]
        },
        {
            id   : 3,
            name : { fr: 'Autres...', en: 'Others...' },
            tags : { fr: ['gestion', 'outils', 'adaptabilite'], en: ['management', 'tools', 'adaptability'] },
            props:
            {
                prop_ROTATE: MATH.toRad(90),
                prop_SRC   : 'github-mark-white.png',
                prop_ALT   : 'Github Logo: https://github.com/logos',
                prop_COLOR : '#FFFFFF'
            },
            skills:
            [
                'GESTION & OUTILS',
                {
                    fr: 'Suivre le déroulement du projet grâce à un outil de gestion de projet (Notion).'
                    ,
                    en: 'Monitor project progress using a project management tool (Notion).'
                },
                {
                    fr: 'Rédiger les spécifications techniques d\'un projet web à partir de besoins fonctionnels.'
                    ,
                    en: 'Write the technical specifications for a web project based on functional requirements.'
                },
                {
                    fr: 'Découper une fonctionnalité en tâches pour préparer le développement.'
                    ,
                    en: 'Break down a feature into tasks to prepare for development.'
                },
                {
                    fr: 'Présenter une solution technique.'
                    ,
                    en: 'Present a technical solution.'
                },
                {
                    fr: 'Mettre en place une méthode de veille technologique.'
                    ,
                    en: 'Establish a method for technology watch.'
                },
                {
                    fr: 'Versionner son projet avec Git et Github.'
                    ,
                    en: 'Version your project with Git and GitHub.'
                },
                {
                    fr: 'Installer un environnement de développement (VS Code, IntelliJ IDEA...).'
                    ,
                    en: 'Install a development environment (VS Code, IntelliJ IDEA, etc.).'
                },
                {
                    fr: 'Utiliser le logiciel Notion.'
                    ,
                    en: 'Use Notion software.'
                },
                {
                    fr: 'Déployer un site web en ligne.'
                    ,
                    en: 'Deploy an online website.'
                },
                'ADAPTABILITE',
                {
                    fr: 'Appliquer les standards du web et les normes en vigueur.'
                    ,
                    en: 'Apply web standards and current norms.'
                },
                {
                    fr: 'Construire un site web fluide s\'adaptant à tout type d\'écran (PC, smartphone et tablette).'
                    ,
                    en: 'Build a fluid website that adapts to all types of screen (PC, smartphone and tablet).'
                },
                {
                    fr: 'Optimiser le référencement naturel en utilisant les balises conformément à leur sémantique.'
                    ,
                    en: 'Optimise natural referencing by using tags in accordance with their semantics.'
                },
                {
                    fr: 'Améliorer les performances et optimiser une page web.'
                    ,
                    en: 'Improve performance and optimise a web page.'
                },
                {
                    fr: 'Appliquer les Schema.org.'
                    ,
                    en: 'Apply Schema.org.'
                },
                {
                    fr: 'Utiliser les balises meta OPEN GRAPH des réseaux sociaux (og, twitter).'
                    ,
                    en: 'Use OPEN GRAPH meta tags for social networks (og, twitter).'
                },
                {
                    fr: 'Débugger un site web grâce aux DevTools.'
                    ,
                    en: 'Debug a website using DevTools.'
                },
                {
                    fr: 'Rédiger un cahier de recette pour tester un site.'
                    ,
                    en: 'Write a recipe book for testing a site.'
                }
            ]
        }
    ]


// #\-VARIABLES-\

    // --THIS


// #\-FUNCTIONS-\

    // --SET

    // --GET

    // --UPDATES


//=======@UTILS|

    // --*