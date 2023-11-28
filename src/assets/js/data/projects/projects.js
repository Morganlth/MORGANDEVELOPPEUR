/*----------------------------------------------- #||--projects--|| */


// #\-IMPORTS-\

    // --SVELTE

    // --LIB
    import COLORS from '$lib/colors'

    // --CONTEXTS

    // --JS

//=======@COMPONENTS|

    // --*
    import Booki        from '../../../../main/pages/page/projects/projects/Booki.svelte'
    import SophieBluel  from '../../../../main/pages/page/projects/projects/SophieBluel.svelte'
    import NinaCarducci from '../../../../main/pages/page/projects/projects/NinaCarducci.svelte'

    import AceClubs      from '../../../../main/pages/page/projects/cards/textures/AceClubs.svelte'
    import TwoHearts     from '../../../../main/pages/page/projects/cards/textures/TwoHearts.svelte'
    import ThreeDiamonds from '../../../../main/pages/page/projects/cards/textures/ThreeDiamonds.svelte'


// #\-EXPORTS-\

    // --THIS
    export default
    {
        name: 'projects'
    ,
        getData: lang => PROJECTS_DATA.map(project =>
        {
            project.tags  = [project.name]
            project.about =  project.about[lang]
            project.data  =  project.getData(lang, project.data)

            delete project.getData

            return project
        })
    }


// #\-CONSTANTES-\

    // --THIS
    const PROJECTS_DATA =
    [
        {
            id         : 0,
            name       : 'booki',
            title      : 'BOOKI',
            component  : Booki,
            cardTexture: ThreeDiamonds,
            color      : COLORS.indicator
        ,
            about:
            {
                fr: `Le projet Booki traite des fondamentaux avec HTML et CSS, ce qui explique sa simplicité.
                Il s'agit d'un site de recherche d'hébergements et d'activités.
                Vous y trouverez une single-page comportant une barre de recherche (non fonctionnelle), des filtres (non fonctionnels) et des exemples d'hébergements et d'activités.
                En somme, il s'agit davantage d'une maquette que d'un véritable site web.
                Néanmoins, ce projet a été réalisé dans le but d'apprendre les bases du développement web.`
                ,
                en: `The Booki project covers the basics of HTML and CSS, which explains its simplicity.
                It's a site for finding accommodation and activities.
                You'll find a single page with a search bar (not functional), filters (not functional) and examples of accommodation and activities.
                In short, it's more of a mock-up than a real website.
                Nevertheless, this project was carried out with the aim of learning the basics of web development.` 
            }
        ,
            img:
            {
                src: '/images/booki/logo/booki3x.png',
                alt: 'Booki'
            }
        ,
            data:
            {
                nav:
                [
                    {
                        href : 'accommodation',
                        value: { fr: 'Hébergements', en: 'Accommodation' }
                    },
                    {
                        href : 'activity',
                        value: { fr: 'Activités', en: 'Activities' }
                    }
                ]
            ,
                filters:
                [
                    {
                        icon : 'fa-money-bill-wave',
                        value: { fr: 'Économique', en: 'Economic' }
                    },
                    {
                        icon : 'fa-person',
                        value: { fr: 'Familial', en: 'Family' }
                    },
                    {
                        icon : 'fa-heart',
                        value: { fr: 'Romantique', en: 'Romantic' }
                    },
                    {
                        icon : 'fa-dog',
                        value: { fr: 'Animaux autorisés', en: 'Pets allowed' }
                    }
                ]
            ,
                accommodation:
                [
                    {
                        title: 'Auberge La Canebière',
                        desc : { fr: 'Nuit à partir de 25€', en: 'Night from €25' },
                        src  : 'marcus-loke-WQJvWU_HZFo-unsplash.jpg',
                        stars: [1, 1, 1, 1, 0]
                    },
                    {
                        title: 'Hôtel du port',
                        desc : { fr: 'Nuit à partir de 52€', en: 'Night from €52' },
                        src  : 'fred-kleber-gTbaxaVLvsg-unsplash.jpg',
                        stars: [1, 1, 1, 0, 0]
                    }
                    ,
                    {
                        title: 'Hôtel Les mouettes',
                        desc : { fr: 'Nuit à partir de 76€', en: 'Night from €76' },
                        src  : 'reisetopia-B8WIgxA_PFU-unsplash.jpg',
                        stars: [1, 1, 1, 1, 0]
                    },
                    {
                        title: 'Hôtel de la mer',
                        desc: { fr: 'Nuit à partir de 46€', en: 'Night from €46' },
                        src: 'annie-spratt-Eg1qcIitAuA-unsplash.jpg',
                        stars: [1, 1, 1, 1, 1]
                    },
                    {
                        title: 'Auberge Le Panier',
                        desc : { fr: 'Nuit à partir de 23€', en: 'Night from €23' },
                        src  : 'nicate-lee-kT-ZyaiwBe0-unsplash.jpg',
                        stars: [1, 1, 1, 0, 0]
                    },
                    {
                        title: 'Hôtel Chez Amina',
                        desc : { fr: 'Nuit à partir de 96€', en: 'Night from €96' },
                        src  : 'febrian-zakaria-M6S1WvfW68A-unsplash.jpg',
                        stars: [1, 1, 1, 1, 0]
                    }
                ]
            ,
                popular:
                [
                    {
                        title: 'Hôtel Le soleil du matin',
                        desc : { fr: 'Nuit à partir de 128€', en: 'Night from €128' },
                        src  : 'emile-guillemot-Bj_rcSC5XfE-unsplash.jpg',
                        stars: [1, 1, 1, 1, 1]
                    },
                    {
                        title: 'Chambres d\'hôtes Au cœur de l\'eau',
                        desc : { fr: 'Nuit à partir de 71€', en: 'Night from €71' },
                        src  : 'aw-creative-VGs8z60yT2c-unsplash.jpg',
                        stars: [1, 1, 1, 1, 1]
                    },
                    {
                        title: 'Hôtel Bleu et Blanc',
                        desc : { fr: 'Nuit à partir de 68€', en: 'Night from €68' },
                        src  : 'febrian-zakaria-sjvU0THccQA-unsplash.jpg',
                        stars: [1, 1, 1, 1, 0]
                    }
                ]
            ,
                activities:
                [
                    {
                        title: 'Vieux-Port',
                        src  : 'reno-laithienne-QUgJhdY5Fyk-unsplash.jpg'
                    },
                    {
                        title: 'Fort de Pomègues',
                        src  : 'paul-hermann-QFTrLdQIRhI-unsplash.jpg'
                    },
                    {
                        title: 'Parc national des Calanques',
                        src  : 'kilyan-sockalingum-NR8-cBCN3aI-unsplash.jpg'
                    },
                    {
                        title: 'Notre-Dame-de-la-Garde',
                        src  : 'florian-wehde-xW9e8gdotxI-unsplash.jpg'
                    }
                ]
            ,
                footer:
                [
                    {
                        title : { fr: 'À propos', en: 'About' },
                        values: { fr: ['Fonctionnement du site', 'Conditions générales', 'Données et confidentialité'], en: ['How the site works', 'General terms and conditions', 'Data and confidentiality'] }
                    },
                    {
                        title : { fr: 'Nos hébergements', en: 'Our accommodation' },
                        values: { fr: ['Charte qualité', 'Proposer votre hôtel'], en: ['Quality charter', 'Suggest your hotel'] }
                    },
                    {
                        title : { fr: 'Assistance', en: 'Support' },
                        values: { fr: ['Centre d\'aide', 'Nous contacter'], en: ['Help centre', 'Contact us'] }
                    }
                ]
            }
        ,
            getData: (lang, data) =>
            {
                for (const _ of data.nav)           _.value = _.value[lang]
                for (const _ of data.filters)       _.value = _.value[lang]
                for (const _ of data.accommodation) _.desc  = _.desc[lang]
                for (const _ of data.popular)       _.desc  = _.desc[lang]
                for (const _ of data.footer)        _.title = _.title[lang], _.values = _.values[lang]

                return data
            }
        }
    ,
        {
            id         : 1,
            name       : 'sophiebluel',
            title      : 'SOPHIE BLUEL',
            component  : SophieBluel,
            cardTexture: TwoHearts,
            color      : COLORS.indicator
        ,
            about:
            {
                fr: `Sophie Bluel est une designeuse d'espace.
                Son site web intègre quelques notions de Javascript, comme par exemple une page de login, des modifications dans le DOM ou bien des requêtes vers une base de données.
                Dans ce projet, vous retrouverez une copie du travail original.
                Malheureusement les fonctionnalités principales ne sont pas disponibles (comme la page de login).`
                ,
                en: `Sophie Bluel is a space designer.
                Her website incorporates a few notions of Javascript, such as a login page, modifications to the DOM and database queries.
                In this project, you will find a copy of the original work.
                Unfortunately the main functionalities are not available (such as the login page).`
            }
        ,
            img:
            {
                src: '/images/sophiebluel/sophie-bluel.png',
                alt: 'Sophie Bluel'
            }
        ,
            data:
            {
                nav:
                [
                    {
                        href : 'projects',
                        value: { fr: 'projets', en: 'projects' }
                    },
                    {
                        href : 'contact',
                        value: { fr: 'contact', en: 'contact' }
                    },
                    { value: { fr: 'login', en: 'login' } }
                ]
            ,
                gallery:
                [
                    {
                        id    : 0,
                        title : 'Abajour Tahina',
                        filter: { fr: 'Objets', en: 'Objects' },
                        src   : 'abajour-tahina1651286843956.png'
                    },
                    {
                        id    : 1,
                        title : 'Appartement Paris V',
                        filter: { fr: 'Appartements', en: 'Flats' },
                        src   : 'appartement-paris-v1651287270508.png'
                    },
                    {
                        id    : 2,
                        title : 'Restaurant Sushisen - Londres',
                        filter: { fr: 'Hotels & restaurants', en: 'Hotels & restaurants' },
                        src   : 'restaurant-sushisen-londres1651287319271.png'
                    },
                    {
                        id    : 3,
                        title : 'Villa “La Balisiere” - Port Louis',
                        filter: { fr: 'Appartements', en: 'Flats' },
                        src   : 'la-balisiere1651287350102.png'
                    },
                    {
                        id: 4,
                        title: 'Structures Thermopolis',
                        filter: { fr: 'Objets', en: 'Objects' },
                        src: 'structures-thermopolis1651287380258.png'
                    },
                    {
                        id    : 5,
                        title : 'Appartement Paris X',
                        filter: { fr: 'Appartements', en: 'Flats' },
                        src   : 'appartement-paris-x1651287435459.png'
                    },
                    {
                        id: 6,
                        title: 'Pavillon “Le coteau” - Cassis',
                        filter: { fr: 'Appartements', en: 'Flats' },
                        src: 'le-coteau-cassis1651287469876.png'
                    },
                    {
                        id     : 7,
                        title : 'Villa Ferneze - Isola d’Elba',
                        filter: { fr: 'Appartements', en: 'Flats' },
                        src   : 'villa-ferneze1651287511604.png'
                    },
                    {
                        id    : 8,
                        title : 'Appartement Paris XVIII',
                        filter: { fr: 'Appartements', en: 'Flats' },
                        src   : 'appartement-paris-xviii1651287541053.png'
                    },
                    {
                        id    : 9,
                        title : 'Bar “Lullaby” - Paris',
                        filter: { fr: 'Hotels & restaurants', en: 'Hotels & restaurants' },
                        src   : 'bar-lullaby-paris1651287567130.png'
                    },
                    {
                        id    : 10,
                        title : 'Hotel First Arte - New Delhi',
                        filter: { fr: 'Hotels & restaurants', en: 'Hotels & restaurants' },
                        src   : 'hotel-first-arte-new-delhi1651287605585.png'
                    },
                ]
            }
        ,
            getData: (lang, data) =>
            {
                for (const _ of data.nav)     _.value  = _.value[lang]
                for (const _ of data.gallery) _.filter = _.filter[lang]
    
                return data
            }
        }
    ,
        {
            id         : 2,
            name       : 'ninacarducci',
            title      : 'NINA CARDUCCI',
            component  : NinaCarducci,
            cardTexture: AceClubs,
            color      : COLORS.primary
        ,
            about:
            {
                fr: `Nina Carducci est une photographe exceptionnelle.
                Ses clichés sont présentés au sein d'une galerie construite à l'aide de JavaScript.
                De plus, le site est mis sur le devant de la scène grâce aux schéma.org, aux balises meta et aux optimisations apportées.
                Ce projet se concentre sur le référencement et l'optimisation d'une page web.
                Dans le code original (disponible sur mon Github), Bootstrap était intégré par défaut.
                Dans cette version, j'ai entièrement supprimé le framework afin d'éliminer tout le superflu.`
                ,
                en: `Nina Carducci is an exceptional photographer.
                Her photos are presented in a gallery built using JavaScript.
                What's more, the site is brought to the fore thanks to schema.org, meta tags and optimisation.
                This project focuses on referencing and optimising a web page.
                In the original code (available on my Github), Bootstrap was integrated by default.
                In this version, I've removed the framework entirely in order to eliminate anything superfluous.`
            }
        ,
            img:
            {
                src: '/images/ninacarducci/nina.png',
                alt: 'Nina Carducci'
            }
        ,
            data:
            {
                meta:
                [
                    {
                        property: 'title',
                        content : { fr: 'Nina Carducci - photographe', en: 'Nina Carducci - photographer' }
                    },
                    {
                        property: 'description',
                        content :
                        {
                            fr: `Photographe - Photographies Bordeaux - Saisissez ces merveilleux moments à travers mon regard et ma technique.
                            Rendez-les intemporels grâce à la photo, pour se les remémorer.`
                            ,
                            en: `Photographer - Photographs Bordeaux - Capture those wonderful moments through my eyes and my technique.
                            Make them timeless through photography, so that you can remember them.`
                        }
                    },
                    {
                        property: 'image',
                        content : { fr: './images/ninacarducci/nina-meta.png', en: './images/ninacarducci/nina-meta.png' }
                    }
                ]
            ,
                nav:
                [
                    {
                        href : 'about',
                        value: { fr: 'À propos', en: 'About' }
                    },
                    {
                        href : 'gallery',
                        value: { fr: 'Galerie', en: 'Gallery' }
                    },
                    {
                        href : 'service',
                        value: { fr: 'Service', en: 'Service' }
                    },
                    {
                        href : 'contact',
                        value: { fr: 'Contact', en: 'Contact' }
                    }
                ]
            ,
                slider:
                [
                    {
                        src       : 'ryoji-iwata-wUZjnOv7t0g-unsplash',
                        alt       : 'Ryoji Iwata',
                        translateX: 100
                    },
                    {
                        src       : 'nicholas-green-nPz8akkUmDI-unsplash',
                        alt       : 'Nicholas Green',
                        translateX: 200
                    },
                    {
                        src       : 'edward-cisneros-3_h6-1NPDGw-unsplash',
                        alt       : 'Edward Cisneros',
                        translateX: 0
                    }
                ]
            ,
                gallery:
                [
                    {
                        id    : 0,
                        filter: { fr: 'Concert', en: 'Concert' },
                        src   : 'concerts/aaron-paul-wnX-fXzB6Cw-unsplash',
                        alt   : 'Aaron Paul'
                    },
                    {
                        id    : 1,
                        filter: { fr: 'Entreprises', en: 'Companies' },
                        src   : 'entreprise/ali-morshedlou-WMD64tMfc4k-unsplash',
                        alt   : 'Ali Morshedlou'
                    },
                    {
                        id    : 2,
                        filter:  { fr: 'Entreprises', en: 'Companies' },
                        src   : 'entreprise/jason-goodman-tHO1_OuKbg0-unsplash',
                        alt   : 'Jason Goodman'
                    },
                    {
                        id    : 3,
                        filter: { fr: 'Mariages', en: 'Weddings' },
                        src   : 'mariage/hannah-busing-RvF2R_qMpRk-unsplash',
                        alt   : 'Hannah Busing'
                    },
                    {
                        id    : 4,
                        filter: { fr: 'Portrait', en: 'Portrait' },
                        src   : 'portraits/ade-tunji-rVkhWWZFAtQ-unsplash',
                        alt   : 'Ade Tunji'
                    },
                    {
                        id    : 5,
                        filter: { fr: 'Mariages', en: 'Weddings' },
                        src   : 'mariage/jakob-owens-SiniLJkXhMc-unsplash',
                        alt   : 'Jakob Owens'
                    },
                    {
                        id    : 6,
                        filter: { fr: 'Portrait', en: 'Portrait' },
                        src   : 'portraits/nino-van-prattenburg--443cl1uR_8-unsplash',
                        alt   : 'Non Van Prattenburg'
                    },
                    {
                        id    : 7,
                        filter: { fr: 'Concert', en: 'Concert' },
                        src   : 'concerts/austin-neill-hgO1wFPXl3I-unsplash',
                        alt   : 'Austin Neill'
                    },
                    {
                        id    : 8,
                        filter:  { fr: 'Entreprises', en: 'Companies' },
                        src   : 'entreprise/mateus-campos-felipe-Fsgzm8N0hIY-unsplash',
                        alt   : 'Mateus Campos Felipe'
                    }
                ]
            ,
                service:
                [
                    {
                        title: { fr: 'Shooting photo', en: 'Photo shooting' },
                        desc :
                        {
                            fr: 'Pour capturer vos moments les plus précieux et garder un souvenir impérissable. Je me déplace en Île-de-France pour réaliser vos photos.'
                            ,
                            en: 'To capture your most precious moments and make them unforgettable. I\'ll travel to the Paris region to take your photos.'
                        },
                        price: { fr: '350€/demi journée', en: '350€/half day' },
                        info : { fr: 'Matériel, déplacement inclus', en: 'Materials, displacement included' }
                    },
                    {
                        title: { fr: 'Retouches', en: 'Touch-ups' },
                        desc :
                        {
                            fr: 'Vous souhaitez retoucher vos photos pour un résultat professionnel ? Bénéficier d\'un rendu optimal pour vos publications.'
                            ,
                            en: 'Would you like to retouch your photos for a professional result? Get the best possible rendering for your publications.'
                        },
                        price: { fr: '50€/photo', en: '50€/photo' },
                        info : { fr: '2 AR par photo', en: '2 AR per photo' }
                    },
                    {
                        title: { fr: 'Album photos', en: 'Photo album' },
                        desc :
                        {
                            fr: 'Partagez avec vos proches et vos clients les photos des moments partagés ensemble à travers un album photo personnalisé.'
                            ,
                            en: 'Share photos of the moments you\'ve shared together with your loved ones and your customers in a personalised photo album.'
                        },
                        price: { fr: '400€ album A4', en: '400€ A4 album' },
                        info : { fr: '30 pages recto-verso', en: '30 double-sided pages' }
                    }
                ]
            }
        ,
            getData: (lang, data) =>
            {
                for (const _ of data.meta)    _.content = _.content[lang]
                for (const _ of data.nav)     _.value   = _.value[lang]
                for (const _ of data.gallery) _.filter  = _.filter[lang]
                for (const _ of data.service) _.title   = _.title[lang], _.desc = _.desc[lang], _.price = _.price[lang], _.info = _.info[lang]
    
                return data
            }
        }
    ]


// #\-VARIABLES-\

    // --THIS


// #\-FUNCTIONS-\

    // --SET

    // --GET

    // --UPDATES


//=======@UTILS|

    // --*