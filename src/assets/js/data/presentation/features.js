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
        tag: 'caracteristique'
    ,
        datas:
        [
            {
                tags: ['identite'],
                contents:
                [
                    {
                        topic: 'Nom Prenom',
                        html: 'strong',
                        props: {},
                        data: 'LE THUAUT Morgan'
                    },
                    {
                        topic: 'Age',
                        html: 'p',
                        props: {},
                        data: '21 ans'
                    }
                ]
            },
            {
                tags: ['localite'],
                contents:
                [
                    {
                        topic: 'Region',
                        html: 'p',
                        props: {},
                        data: 'Bretagne'
                    },
                    {
                        topic: 'Pays',
                        html: 'strong',
                        props: {},
                        data: 'FRANCE'
                    }
                ]
            },
            {
                tags: [],
                contents:
                [
                    {
                        topic: 'Etudes',
                        html: 'p',
                        props: {},
                        data: 'Bac S SVT spécialité MATHS, Lycée Jeanne d\'Arc Pontivy'
                    },
                    {
                        topic: 'Formations',
                        html: 'p',
                        props: {},
                        data: 'Développeur Web, OpenClassrooms'
                    }
                ]
            },
            {
                tags: [],
                contents:
                [
                    {
                        topic: 'Profesion',
                        html: 'strong',
                        props: {},
                        data: 'Développeur Web'
                    },
                    {
                        topic: 'Objectifs',
                        html: 'p',
                        props: {},
                        data: 'FULLSTACK, MOBILE & DESIGNER'
                    }
                ]
            },
            {
                tags: ['contact'],
                contents:
                [
                    {
                        topic: 'Email',
                        html: 'p',
                        props: {},
                        data: 'morganlethuaut@gmail.com',
                        contact: true
                    },
                    {
                        topic: 'LinkedIn',
                        html: 'a',
                        props:
                        {
                            href: 'https://www.linkedin.com/in/le-thuaut-morgan',
                            alt: 'Profil LinkedIn de LE THUAUT Morgan',
                            target: '_blank',
                        },
                        data: 'LinkedIn'
                    },
                    {
                        topic: 'Github',
                        html: 'a',
                        props:
                        {
                            href: 'https://github.com/Morganlth',
                            alt: 'Profil Github de LE THUAUT Morgan',
                            target: '_blank',
                        },
                        data: 'Github'
                    }
                ]
            },
        ].map((feature, id) =>
        {
            feature.id = id

            for (const CONTENT of feature.contents)
            {
                for (const TOPIC of CONTENT.topic.split(/\s/g)) if (TOPIC.length > 2) feature.tags.push(TOPIC.toLowerCase())

                if (CONTENT.html === 'a') CONTENT.props['data-content'] = CONTENT.data
            }
    
            return feature
        })
    }


// #\-CONSTANTES-\

    // --THIS


// #\-VARIABLES-\

    // --THIS


// #\-FUNCTIONS-\

    // --SET

    // --GET

    // --UPDATES


//=======@UTILS|

    // --*