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
                topics: ['NOM', 'AGE'],
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
                tags: ['locality'],
                topics: ['LOCALITE', 'FR'],
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
                tags: ['studies'],
                topics: ['ETUDES', 'FORMATIONS'],
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
                tags: ['job'],
                topics: ['PROFESSION', 'OBJECTIFS'],
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
                tags: ['contact'],
                topics: ['CONTACT'],
                contents:
                [
                    {
                        htmlElement: 'p',
                        props: {},
                        data: 'Email: lethuaut.morgan@gmail.com'
                    },
                    {
                        htmlElement: 'a',
                        props: {},
                        data: 'LinkedIn: https://www.linkedin.com/in/le-thuaut-morgan'
                    }
                ]
            },
        ].map((feature, id) =>
        {
            feature.id = id

            for (const TOPIC of feature.topics) if (TOPIC.length > 2) feature.tags.push(TOPIC.toLowerCase())
    
            return feature
        })
    }