// #EXPORT

    // --FEATURES-DATAS
    export default
    {
        name: 'features'
    ,
        process: true
    ,
        datas:
        [
            {
                tags: ['identity'],
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
                tags: ['locality'],
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
                tags: ['studies'],
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
                        html: 'strong',
                        props: {},
                        data: 'Développeur Web, OpenClassrooms'
                    }
                ]
            },
            {
                tags: ['job'],
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
                        html: 'strong',
                        props: {},
                        data: 'Email: lethuaut.morgan@gmail.com'
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
                        data: 'LinkedIn: '
                    }
                ]
            },
        ].map((feature, id) =>
        {
            feature.id = id

            for (const CONTENT of feature.contents)
            {
                for (const TOPIC of CONTENT.topic.split(/\s/g)) if (TOPIC.length > 2) feature.tags.push(TOPIC.toLowerCase())

                if (CONTENT.html === 'a')
                {
                    CONTENT.data += CONTENT.props.href
                    CONTENT.props['data-content'] = CONTENT.data
                }
            }
    
            return feature
        })
    }