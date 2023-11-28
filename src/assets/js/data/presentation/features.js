/*----------------------------------------------- #||--features--|| */


// #\-IMPORTS-\

    // --SVELTE

    // --LIB

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
        getData: lang => FEATURES_DATA.map(_ =>
        {
            _.tags = _.tags[lang]

            for (const CONTENT of _.contents)
            {
                CONTENT.topic = CONTENT.topic[lang]
                CONTENT.value = CONTENT.value[lang]
        
                const TOPIC = CONTENT.topic.replaceAll(/\s/g, '-')
                
                if (TOPIC.length > 2) _.tags.push(TOPIC.toLowerCase())

                if (CONTENT.html === 'a')
                {
                    CONTENT.props.alt             = CONTENT.props.alt[lang]
                    CONTENT.props['data-content'] = CONTENT.value
                }
                if (CONTENT.contact) CONTENT.contact = CONTENT.contact[lang]
            }

            return _
        })
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
                    value: { fr: 'LE THUAUT Morgan', en: 'LE THUAUT Morgan' },
                    html : 'strong'
                },
                {
                    topic: { fr: 'Age', en: 'Age' },
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
                    topic: { fr: 'Region', en: 'Region' },
                    value: { fr: 'Bretagne', en: 'Bretagne' },
                    html : 'p'
                },
                {
                    topic: { fr: 'Pays', en: 'Country' },
                    value: { fr: 'FRANCE', en: 'FRANCE' },
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
                    value: { fr: 'Fullstack, Mobile & Designer', en: 'Fullstack, Mobile & Designer' },
                    html : 'p'
                }
            ]
        },
        {
            id      : 4,
            tags    : { fr: ['contact'], en: ['contact'] },
            contents:
            [
                {
                    topic  : { fr: 'Email', en: 'Email' },
                    value  : { fr: 'morganlethuaut@gmail.com', en: 'morganlethuaut@gmail.com' },
                    html   : 'p',
                    contact: { fr: 'Me contacter', en: 'Contact me' }
                },
                {
                    topic: { fr: 'LinkedIn', en: 'LinkedIn' },
                    value: { fr: 'LinkedIn', en: 'LinkedIn' },
                    html : 'a',
                    props:
                    {
                        href  : 'https://www.linkedin.com/in/le-thuaut-morgan',
                        alt   : { fr: 'Profil LinkedIn de LE THUAUT Morgan', en: 'LE THUAUT Morgan\'s LinkedIn profile' },
                        target: '_blank',
                    }
                },
                {
                    topic: { fr: 'Github', en: 'Github' },
                    value: { fr: 'Github', en: 'Github' },
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