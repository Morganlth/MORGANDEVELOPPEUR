/*----------------------------------------------- #||--features--|| */


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
        name: 'features'
    ,
        tag: { fr: 'caracteristique', en: 'features' }
    ,
        getData: lang =>
        {
            const FEATURES = lang_processing(lang, FEATURES_DATA)

            for (const FEATURE of FEATURES)
                for (const CONTENT of FEATURE.contents)
                {
                    const TOPIC = CONTENT.topic.replaceAll(/\s/g, '-')

                    if (TOPIC.length > 2)     FEATURE.tags.push(TOPIC.toLowerCase())
                    if (CONTENT.html === 'a') CONTENT.props['data-content'] = CONTENT.value
                }

            return FEATURES
        }
    }


// #\-CONSTANTES-\

    // --THIS
    const FEATURES_DATA =
    [
        {
            id      : 0,
            tags    : { fr: ['identite'], en: ['identity'] },
            contents:
            [
                {
                    topic: { fr: 'Nom Prenom', en: 'Full Name' },
                    value: 'LE THUAUT Morgan',
                    html : 'strong'
                },
                {
                    topic: 'Age',
                    value: { fr: '21 ans', en: '21 years old' },
                    html : 'p'
                }
            ]
        },
        {
            id      : 1,
            tags    : { fr: ['localite'], en: ['locality'] },
            contents:
            [
                {
                    topic: 'Region',
                    value: 'Bretagne',
                    html : 'p'
                },
                {
                    topic: { fr: 'Pays', en: 'Country' },
                    value: 'FRANCE',
                    html : 'strong'
                }
            ]
        },
        {
            id      : 2,
            tags    : { fr: ['formations'], en: ['studies'] },
            contents:
            [
                {
                    topic: { fr: 'Lycee', en: 'High School' },
                    value: { fr: 'Bac S SVT spécialité MATHS, lycée Jeanne d\'Arc Pontivy', en: 'Bac S SVT MATHS speciality, high school Jeanne d\'Arc Pontivy' },
                    html : 'p'
                },
                {
                    topic: { fr: 'Ecole Sup.', en: 'higher Educ.' },
                    value: { fr: 'Développeur Web, OpenClassrooms', en: 'Web Developer, OpenClassrooms' },
                    html : 'p'
                }
            ]
        },
        {
            id      : 3,
            tags    : { fr: [], en: [] },
            contents:
            [
                {
                    topic: { fr: 'Profesion', en: 'Job' },
                    value: { fr: 'Développeur Web', en: 'Web Developer' },
                    html : 'strong',
                    props: {}
                },
                {
                    topic: { fr: 'Objectifs', en: 'Objectives' },
                    value: 'Fullstack, Mobile & Designer',
                    html : 'p'
                }
            ]
        },
        {
            id      : 4,
            tags    : ['contact'],
            contents:
            [
                {
                    topic  : 'Email',
                    value  : 'morganlethuaut@gmail.com',
                    html   : 'p',
                    contact: { fr: 'Me contacter', en: 'Contact me' }
                },
                {
                    topic: 'LinkedIn',
                    value: 'LinkedIn',
                    html : 'a',
                    props:
                    {
                        href  : 'https://www.linkedin.com/in/le-thuaut-morgan',
                        alt   : { fr: 'Profil LinkedIn de LE THUAUT Morgan', en: 'LE THUAUT Morgan\'s LinkedIn profile' },
                        target: '_blank',
                    }
                },
                {
                    topic: 'Github',
                    value: 'Github',
                    html : 'a',
                    props:
                    {
                        href  : 'https://github.com/Morganlth',
                        alt   : { fr: 'Profil Github de LE THUAUT Morgan', en: 'LE THUAUT Morgan\'s Github profile' },
                        target: '_blank',
                    }
                }
            ]
        },
    ]


// #\-VARIABLES-\

    // --THIS


// #\-FUNCTIONS-\

    // --SET

    // --GET

    // --UPDATES


//=======@UTILS|

    // --*