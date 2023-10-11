// #EXPORT

    // --SYSTEM-DATAS
    export default
    {
        name: 'system'
    ,
        process: true
    ,
        datas:
        [
            {
                tags: ['html', 'css'],
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
                tags: ['javascript'],
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
                tags: ['node', 'nodejs'],
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
                tags: ['gestion', 'outils', 'adaptabilite'],
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
    
            item.id = i
            item.props.prop_TITLE = item.tag
            item.props.prop_OFFSET = FRACTION * (LENGTH - i) + FRACTION / 2
    
            return item
        })
    }

// #IMPORT

    // --JS
    import MATH from '../../utils/math'