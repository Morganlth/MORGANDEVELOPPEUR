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
        tag: { fr: 'caracteristiques', en: 'features' }
    ,
        getData: lang =>
        {
            const FEATURES = lang_processing(lang, FEATURES_DATA)

            for (const FEATURE of FEATURES)
                for (const CONTENT of FEATURE.contents)
                {
                    const TOPIC = CONTENT.topic.replaceAll(/\s/g, '-')

                    if (TOPIC.length > 2)                   FEATURE.tags.push(TOPIC.toLowerCase())
                    if (CONTENT.setter instanceof Function) CONTENT.setter()
                    if (CONTENT.html === 'a')               CONTENT.attributes['data-content'] = CONTENT.value
                }

            return FEATURES
        }
    }


// #\-CONSTANTES-\

    // --THIS
    const FEATURES_DATA =
    [
        {
            id  : 0,
            tags: { fr: ['identite'], en: ['identity'] }
            ,
            contents:
            [
                {
                    topic     : { fr: 'Nom Prenom', en: 'Full Name' },
                    value     : 'LE THUAUT Morgan',
                    html      : 'strong',
                    attributes: { itemprop: 'name' }
                },
                {
                    topic: 'Age'
                    ,
                    value:
                    [
                        { value: { fr: 'ans', en: 'years old' } }
                        ,
                        {
                            value     : '2002-01-29',
                            attributes: { itemprop: 'birthDate' }
                        }
                    ]
                    ,
                    html      : 'p'
                    ,
                    setter: function ()
                    {
                        const
                        VALUE    = this.value[0].value,
                        BIRTHDAY = new Date(this.value[1].value),
                        TODAY    = new Date(),
                        BIRTHDAY_YEAR  = BIRTHDAY.getFullYear(),
                        BIRTHDAY_MONTH = BIRTHDAY.getMonth(),
                        TODAY_YEAR     = TODAY.getFullYear(),
                        TODAY_MONTH    = TODAY.getMonth(),    
                        AGE            = TODAY_YEAR - BIRTHDAY_YEAR
                                         -(TODAY_MONTH > BIRTHDAY_MONTH || (TODAY_MONTH === BIRTHDAY_MONTH && TODAY.getDate() >= BIRTHDAY.getDate()) ? 0 : 1)
            
                        this.value[0].value = `${AGE} ${VALUE} -`
                    }
                }
            ]
        },
        {
            id  : 1,
            tags: { fr: ['localite'], en: ['locality'] }
            ,
            attributes:
            {
                itemprop : 'address',
                itemscope: '',
                itemtype : 'https://schema.org/PostalAddress'
            }
            ,
            contents:
            [
                {
                    topic     : 'Region',
                    value     : 'Bretagne',
                    html      : 'p',
                    attributes: { itemprop: 'addressRegion' }
                },
                {
                    topic     : { fr: 'Pays', en: 'Country' },
                    value     : 'FRANCE',
                    html      : 'strong',
                    attributes: { itemprop: 'addressCountry' }
                }
            ]
        },
        {
            id  : 2,
            tags: { fr: ['formations'], en: ['studies'] }
            ,
            contents:
            [
                {
                    topic: { fr: 'Lycee', en: 'High School' }
                    ,
                    value:
                    [
                        {
                            value:
                            {
                                value     : { fr: 'Bac S SVT spécialité MATHS', en: 'Bac S SVT MATHS speciality' },
                                attributes: { itemprop: 'name' }
                            }
                            ,
                            attributes:
                            {
                                itemprop : 'hasCredential',
                                itemscope: '',
                                itemtype : 'https://schema.org/EducationalOccupationalCredential'
                            }
                        },
                        {
                            value     : { fr: 'lycée Jeanne d\'Arc Pontivy', en: 'high school Jeanne d\'Arc Pontivy' },
                            attributes: { itemprop: 'name' }
                        }
                    ]
                    ,
                    html : 'p'
                    ,
                    attributes:
                    {
                        itemprop : 'alumniOf',
                        itemscope: '',
                        itemtype : 'https://schema.org/HighSchool'
                    }
                },
                {
                    topic: { fr: 'Ecole Sup.', en: 'higher Educ.' }
                    ,
                    value:
                    [
                        {
                            value:
                            {
                                value     : { fr: 'Développeur Web', en: 'Web Developer' },
                                attributes: { itemprop: 'name' }
                            }
                            ,
                            attributes:
                            {
                                itemprop : 'hasCredential',
                                itemscope: '',
                                itemtype : 'https://schema.org/EducationalOccupationalCredential'
                            }
                        },
                        {
                            value     : 'OpenClassrooms',
                            attributes: { itemprop: 'name' }
                        }
                    ]
                    ,
                    html : 'p'
                    ,
                    attributes:
                    {
                        itemprop : 'alumniOf',
                        itemscope: '',
                        itemtype : 'https://schema.org/CollegeOrUniversity'
                    }
                }
            ]
        },
        {
            id  : 3,
            tags: { fr: [], en: [] }
            ,
            contents:
            [
                {
                    topic     : { fr: 'Profesion', en: 'Job' },
                    value     : { fr: 'Développeur Web', en: 'Web Developer' },
                    html      : 'strong',
                    attributes: { itemprop: 'jobTitle' }
                },
                {
                    topic: { fr: 'Objectifs', en: 'Objectives' },
                    value: 'Fullstack, Mobile & Designer',
                    html : 'p'
                }
            ]
        },
        {
            id  : 4,
            tags: ['contact']
            ,
            contents:
            [
                {
                    topic: 'Email',
                    value: 'morganlethuaut@gmail.com',
                    html : 'a'
                    ,
                    attributes:
                    {
                        href        : 'mailto:morganlethuaut@gmail.com',
                        alt         : { fr: 'adresse email de LE THUAUT Morgan', en: 'LE THUAUT Morgan\'s email address' },
                        'aria-label': 'email',
                        itemprop    : 'email'
                    }
                    ,
                    contact: { fr: 'Me contacter', en: 'Contact me' }
                },
                {
                    topic: 'LinkedIn',
                    value: 'LinkedIn',
                    html : 'a'
                    ,
                    attributes:
                    {
                        href    : 'https://www.linkedin.com/in/le-thuaut-morgan',
                        alt     : { fr: 'Profil LinkedIn de LE THUAUT Morgan', en: 'LE THUAUT Morgan\'s LinkedIn profile' },
                        target  : '_blank',
                        itemprop: 'sameAs'
                    }
                },
                {
                    topic: 'Github',
                    value: 'Github',
                    html : 'a'
                    ,
                    attributes:
                    {
                        href    : 'https://github.com/Morganlth',
                        alt     : { fr: 'Profil Github de LE THUAUT Morgan', en: 'LE THUAUT Morgan\'s Github profile' },
                        target  : '_blank',
                        itemprop: 'sameAs'
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