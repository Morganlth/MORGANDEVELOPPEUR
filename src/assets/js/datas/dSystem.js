// #EXPORTS

    // --DATAS-SYSTEM
    export const SYSTEM_SKILLS_DATAS =
    [
        [
            { text: 'Découper, assembler et intégrer tous les éléments d’une maquette graphique en HTML5 et CSS', tags: ['booki'] },
            { text: 'Ajouter du contenu audio et vidéo en HTML5' },
            { text: 'Animer les pages web avec CSS3' },
            { text: 'Intégrer Sass / Scss dans un projet' },
            { text: 'Déclarer des variables Sass / Scss' },
            { text: 'Utiliser la logique de Scss / Sass (if, each, for...)' },
            { text: 'Importer d\'autre fichier Sass / Scss avec la use directive' },
            { text: 'Créer des fonctions utilitaires avec les mixins de Sass / Scss' },
            { text: 'Importer et utiliser les modules Sass / Scss (sass:math, sass:list...)' }
        ],
        [
            { text: 'Faire réagir la page web en fonction des actions de l’utilisateur en JavaScript', tags: ['sophiebluel'] },
            { text: 'Se connecter à un service web pour exploiter des données tierces (API)', tags: ['sophiebluel'] },
            { text: 'Gérer les comptes utilisateurs (coté client)', tags: ['sophiebluel'] },
            { text: 'Animer les pages web avec JavaScript' },
            { text: 'Concevoir un site maintenable grâce à la gestion des erreurs et exceptions' },
            { text: 'Construire des algorithmes' },
            { text: 'Utiliser le framework React', tags: ['kasa'] },
            { text: 'Configurer la navigation entre les pages de l\'application avec React Router', tags: ['kasa'] },
            { text: 'Initialiser une application avec Create React App', tags: ['kasa'] },
            { text: 'Développer des éléments de l\'interface d\'un site web grâce à des composants React', tags: ['kasa'] },
            { text: 'Développer et initialiser une application avec Svelte et SvelteKit' },
            { text: 'Utiliser le système de routage de SvelteKit' },
            { text: 'Développer des composants Svelte' },
            { text: 'Intégrer des animations / transitions avec Svelte' },
            { text: 'Déclarer et manipuler les variables réactives, le binding, les props et les Stores de Svelte' },
            { text: 'Incorporer la logique de Svelte (if, else, each...)' },
            { text: 'Manipuler les fonctions de Lifecycle proposer par Svelte pour la gestion de composants' },
            { text: 'Utiliser les évènements Svelte, les modificateurs et la propagation' },
            { text: 'Ajouter Sass / Scss à Svelte' },
            { text: 'Récupérer les données utilisateurs dans le JavaScript via des formulaires', tags: ['sophiebluel'] },
            { text: 'Manipuler les éléments du DOM avec JavaScript', tags: ['sophiebluel'] }
        ],
        [
            { text: 'Créer un nouveau projet NodeJS impliquant diverses dépendances (Express, MongoDB, jsonwebtoken...)', tags: ['monvieuxgrimoire'] },
            { text: 'Gérer les comptes utilisateurs (coté serveur)', tags: ['monvieuxgrimoire'] },
            { text: 'Créer, gérer et afficher le contenu d’une base de données', tags: ['monvieuxgrimoire'] },
            { text: 'Créer des API (REST)', tags: ['monvieuxgrimoire'] },
            { text: 'Implémenter un modèle logique de données conformément à la réglementation', tags: ['monvieuxgrimoire'] },
            { text: 'Mettre en œuvre des opérations CRUD de manière sécurisée', tags: ['monvieuxgrimoire'] },
            { text: 'Stocker des données de manière sécurisée', tags: ['monvieuxgrimoire'] }
        ],
        [
            { text: 'Appliquer les standards du web et les normes en vigueur', tags: ['booki', 'ninacarducci'] },
            { text: 'Construire un site web fluide s’adaptant à tout type d’écran (web, smartphone et tablette)', tags: ['booki'] },
            { text: 'Améliorer le référencement naturel en utilisant les balises selon leur sémantique', tags: ['ninacarducci'] },
            { text: 'Améliorer les performances et optimiser une page web', tags: ['ninacarducci'] },
            { text: 'Appliquer les Schema.org', tags: ['ninacarducci'] },
            { text: 'Utiliser les balises meta OPEN GRAPH des réseaux sociaux (og, twitter)', tags: ['ninacarducci'] },
            { text: 'Débugger un site web grâce aux Chrome DevTools', tags: ['ninacarducci'] },
            { text: 'Rédiger un cahier de recette pour tester un site', tags: ['ninacarducci'] }
        ],
        [
            { text: 'Suivre le déroulement du projet grâce à un outil de gestion de projet' },
            { text: 'Rédiger les spécifications techniques d\'un projet web à partir de besoins fonctionnels' },
            { text: 'Découper une fonctionnalités en tâches pour préparer le développement' },
            { text: 'Présenter la solution technique' },
            { text: 'Mettre en place une méthode de veille technologique' },
            { text: 'Versionner son projet avec Git et Github' },
            { text: 'Installer un environnement de développement front-end' },
            { text: 'Utiliser le logiciel Notion' },
            { text: 'Déployer un site statique en ligne' }
        ]
    ]
    
    export const SYSTEM_ORBITS_DATAS =
    [
        {
            tag: 'HTML - CSS',
            props:
            {
                prop_ROTATE: MATH.toRad(30),
                prop_OFFSET: 0
            }
        },
        {
            tag: 'JAVASCRIPT',
            props:
            {
                prop_ROTATE: MATH.toRad(60),
                prop_OFFSET: 4.2
            }
        },
        {
            tag: 'NODE JS',
            props:
            {
                prop_ROTATE: MATH.toRad(90),
                prop_OFFSET: 3.15
            }
        },
        {
            tag: 'GESTION - OUTILS',
            props:
            {
                prop_ROTATE: MATH.toRad(120),
                prop_OFFSET: 2.1
            }
        },
        {
            tag: 'ADAPTABILITE',
            props:
            {
                prop_ROTATE: MATH.toRad(150),
                prop_OFFSET: 1.05
            }
        }
    ]

// #IMPORT

    // --JS
    import MATH from '../utils/math'