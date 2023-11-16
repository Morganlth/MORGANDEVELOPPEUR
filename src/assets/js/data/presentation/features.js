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
                        topic: 'NOM PRENOM',
                        html: 'strong',
                        props: {},
                        data: 'LE THUAUT Morgan'
                    },
                    {
                        topic: 'AGE',
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
                        topic: 'REGION',
                        html: 'p',
                        props: {},
                        data: 'Bretagne'
                    },
                    {
                        topic: 'PAYS',
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
                        topic: 'ETUDES',
                        html: 'p',
                        props: {},
                        data: 'Bac S SVT spécialité MATHS, Lycée Jeanne d\'Arc Pontivy'
                    },
                    {
                        topic: 'FORMATIONS',
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
                        topic: 'PROFESSION',
                        html: 'strong',
                        props: {},
                        data: 'Développeur Web'
                    },
                    {
                        topic: 'OBJECTIFS',
                        html: 'p',
                        props: {},
                        data: 'Objectifs: dev FULLSTACK, dev MOBILE & DESIGNER'
                    }
                ]
            },
            {
                tags: ['contact'],
                contents:
                [
                    {
                        topic: 'EMAIL',
                        html: 'p',
                        props: {},
                        data: 'Email: morganlethuaut@gmail.com',
                        contact: true
                    },
                    {
                        topic: 'LINKEDIN',
                        html: 'a',
                        props:
                        {
                            href: 'https://www.linkedin.com/in/le-thuaut-morgan',
                            alt: 'Profil LinkedIn de LE THUAUT Morgan',
                            target: '_blank',
                        },
                        data: 'LinkedIn'
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