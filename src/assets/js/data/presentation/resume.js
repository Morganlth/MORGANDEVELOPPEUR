/*----------------------------------------------- #||--resume--|| */


// #\-IMPORTS-\

    // --SVELTE

    // --LIB
    import { lang_processing } from '$lib/lang'

    // --CONTEXTS

    // --JS

//=======@COMPONENTS|

    // --*


// #\-EXPORTS-\

    // --THIS
    export default
    {
        name: 'resume'
    ,
        getData: lang => lang_processing(lang, RESUME_DATA)
    }


// #\-CONSTANTES-\

    // --THIS
    const RESUME_DATA =
    {
        cellTitle: { fr: 'fermer', en: 'close' }
        ,
        header:
        {
            title   : { fr: 'DEVELOPPEUR WEB', en: 'WEB DEVELOPER' },
            subTitle: 'LE THUAUT Morgan'
        }
        ,
        main:
        [
            {
                className: 'pe-b-rotate o-hid'
                ,
                content:
                [
                    {
                        hide : true,
                        title: { fr: 'PROFIL', en: 'PROFILE' }
                        ,
                        content:
                        [
                            {
                                fr: 'Au travers de ma qualité d\'autodidacte, je dessine mon profil de développeur.'
                                ,
                                en: 'Through my self-taught quality, I draw my developer profile.'
                            },
                            {
                                fr: 'En effet, j\'ai acquis une maîtrise du HTML, CSS, JavaScript et Node.js.'
                                ,
                                en: 'Indeed, I\'ve mastered HTML, CSS, JavaScript and Node.js.'
                            },
                            {
                                fr: 'Ainsi que des frameworks: Svelte, React, Three.js; et du préprocesseur: Sass.'
                                ,
                                en: 'As well as frameworks: Svelte, React, Three.js; and the preprocessor: Sass.'
                            },
                            {
                                fr: 'De plus, dans une certaine mesure, je possède des notions de PHP, SQL et Java.'
                                ,
                                en: 'I also have some knowledge of PHP, SQL and Java.'
                            },
                            {
                                fr: 'Mais encore, je nourris un attrait pour l\'art du design.'
                                ,
                                en: ' But I\'m also drawn to the art of design.'
                            },
                            {
                                fr: 'En conclusion, j\'ai de l\'intérêt pour le développement.'
                                ,
                                en: 'In conclusion, I\'m interested in development.'
                            },
                            {
                                fr: 'Mon objectif est de devenir un solide développeur fullstack, mobile et designer.'
                                ,
                                en: 'My goal is to become a solid fullstack developer, mobile and designer.'
                            }
                        ]
                    },
                    {
                        hide : true,
                        title: { fr: 'COMPETENCES', en: 'SKILLS' }
                        ,
                        content:
                        [
                            {
                                fr: 'Découper, assembler et intégrer tous les éléments d\'une maquette graphique en HTML5 et CSS.'
                                ,
                                en: 'Slice, assemble and integrate all the elements of a graphic model in HTML5 and CSS.'
                            },
                            {
                                fr: 'Intégrer Sass/Scss dans un projet.'
                                ,
                                en: 'Integrate Sass/Scss into a project.'
                            },
                            {
                                fr: 'Manipuler les éléments du DOM avec JavaScript.'
                                ,
                                en: 'Manipulate DOM elements with JavaScript.'
                            },
                            {
                                fr: 'Développer et initialiser une application avec Svelte et SvelteKit.'
                                ,
                                en: 'Develop and initialize an application with Svelte and SvelteKit.'
                            },
                            {
                                fr: 'Développer des éléments de l\'interface d\'un site web grâce à des composants React.'
                                ,
                                en: 'Develop interface elements of a website using React components.'
                            },
                            {
                                fr: 'Rendre des objets 3d de différentes géométries et matériaux avec Three.js.'
                                ,
                                en: 'Render 3d objects of different geometries and materials with Three.js.'
                            },
                            {
                                fr: 'Créer un nouveau projet Node.js impliquant diverses dépendances (Express, MongoDB, jsonwebtoken...).'
                                ,
                                en: 'Create a new Node.js project involving various dependencies (Express, MongoDB, jsonwebtoken, etc.).'
                            },
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
                                html : 'a',
                                value: { fr: 'Autres compétences', en: 'Other skills' }
                                ,
                                attributes:
                                {
                                    href                   : '/skills',
                                    alt                    : { fr: 'Compétences de Morgan LE THUAUT', en: 'Morgan LE THUAUT\'s skills' },
                                    'aria-label'           : { fr: 'compétences', en: 'skills' },
                                    'data-sveltekit-reload': true
                                }
                            }
                        ]
                    },
                    {
                        title: { fr: 'CONTACTEZ-MOI', en: 'CONTACT ME' }
                        ,
                        content:
                        [
                            {
                                html : 'a',
                                value: 'morganlethuaut@gmail.com'
                                ,
                                attributes:
                                {
                                    href        : 'mailto:morganlethuaut@gmail.com',
                                    alt         : { fr: 'adresse email de LE THUAUT Morgan', en: 'LE THUAUT Morgan\'s email address' },
                                    'aria-label': 'email'
                                }
                            },
                            {
                                html : 'a',
                                value: 'LinkedIn'
                                ,
                                attributes:
                                {
                                    href    : 'https://www.linkedin.com/in/le-thuaut-morgan',
                                    alt     : { fr: 'Profil LinkedIn de LE THUAUT Morgan', en: 'LE THUAUT Morgan\'s LinkedIn profile' },
                                    target  : '_blank'
                                }
                            }
                        ]
                    }
                ]
            },
            {
                content:
                [
                    {
                        hide : true,
                        title: { fr: 'MAITRISE', en: 'EXPERTISE' }
                        ,
                        content:
                        [
                            {
                                topic: { fr: 'Langages', en: 'Languages' },
                                value: 'HTML, CSS, JavaScript, Node.js, PHP, SQL, Java'
                            },
                            {
                                topic: 'Frameworks',
                                value: 'Svelte, React, Three.js'
                            },
                            {
                                topic: { fr: 'Logiciels', en: 'Software' },
                                value: 'VS code, IntelliJ IDEA, Krita, Figma, Notion'
                            }
                        ]
                    },
                    {
                        hide : true,
                        title: { fr: 'FORMATIONS', en: 'TRAINING' }
                        ,
                        content:
                        [
                            {
                                topic: 'OpenClassrooms',
                                value:
                                {
                                    fr: 'RNCP niveau 5 - Développeur Web (08/12/22-31/07/23)'
                                    ,
                                    en: 'RNCP level 5 - Web Developer (08/12/22-31/07/23)'
                                }
                            },
                            {
                                topic: 'OpenClassrooms',
                                value:
                                {
                                    fr: 'OpenClassrooms Prep\'Apprentissage - Développeur Web (09/05/22-08/09/22)'
                                    ,
                                    en: 'OpenClassrooms Prep\'Apprenticeship - Web Developer (09/05/22-08/09/22)'
                                }
                            },
                            {
                                topic: 'Jeanne d\'Arc, PONTIVY',
                                value:
                                {
                                    fr: 'Bac S-SVT spé Mathématique'
                                    ,
                                    en: 'Bac S-SVT spe Mathematics'
                                }
                            },
                            {
                                topic: 'Les Saints-Anges, PONTIVY',
                                value: 'Brevet des collèges'
                            }
                        ]
                    },
                    {
                        hide : true,
                        title: { fr: 'CENTRES D\'INTERET', en: 'HOBBIES' }
                        ,
                        content:
                        [
                            {
                                topic: { fr: 'Activités sportives', en: 'Sports activities' },
                                value: { fr: 'plongée, vélo, course et musculation', en: 'diving, cycling, running and weight training' }
                            },
                            {
                                topic: { fr: 'Arts et concepts', en: 'Arts and concepts' },
                                value: { fr: 'programmation, dessin, mécanique', en: 'programming, design, mechanics' }
                            }
                        ]
                    },
                    {
                        title: { fr: 'QUALITE HUMAINE', en: 'HUMAN QUALITY' }
                        ,
                        content:
                        [
                            { fr: 'Honnête'    , en: 'Honest' },
                            { fr: 'Polyvalent' , en: 'Versatile' },
                            'Leadership',
                            { fr: 'Visionnaire', en: 'Visionary' }
                        ]
                    }
                ]
            }
        ]
    }


// #\-VARIABLES-\

    // --THIS


// #\-FUNCTIONS-\

    // --SET

    // --GET

    // --UPDATES


//=======@UTILS|

    // --*