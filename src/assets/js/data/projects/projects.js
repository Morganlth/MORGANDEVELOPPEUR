/*----------------------------------------------- #||--projects--|| */


// #\-IMPORTS-\

    // --SVELTE

    // --LIB
    import COLORS              from '$lib/colors'
    import { lang_processing } from '$lib/lang'

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
            project.tags = [project.name]

            return lang_processing(lang, project)
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
                desc: { fr: 'projet Booki par LE THUAUT Morgan', en: 'Booki project by LE THUAUT Morgan' }
                ,
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
                head:
                {
                    title         : { fr: 'Trouvez votre hébergement pour des vacances de rêve', en: 'Find your accommodation for a dream holiday' },
                    subtitle      : { fr: 'En plein centre-ville ou en pleine nature', en: 'In the city centre or in the countryside' },
                    formInputValue: { fr: 'Rechercher', en: 'Search' },
                    filtersTitle  : { fr: 'Filtres', en: 'Filters' },
                    info          : { fr: 'Plus de 500 logements sont disponibles dans cette ville', en: 'More than 500 homes are available in the town' }
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
                }
            ,
                accommodation:
                {
                    title: { fr: 'Hébergements à Marseille', en: 'Accommodation in Marseille' },
                    more : { fr: 'Afficher plus', en: 'View more' }
                    ,
                    contents:
                    [
                        {
                            title: 'Auberge La Canebière',
                            desc : { fr: 'Nuit à partir de 25€', en: 'Night from 25€' },
                            src  : 'marcus-loke-WQJvWU_HZFo-unsplash.jpg',
                            stars: [1, 1, 1, 1, 0]
                        },
                        {
                            title: 'Hôtel du port',
                            desc : { fr: 'Nuit à partir de 52€', en: 'Night from 52€' },
                            src  : 'fred-kleber-gTbaxaVLvsg-unsplash.jpg',
                            stars: [1, 1, 1, 0, 0]
                        }
                        ,
                        {
                            title: 'Hôtel Les mouettes',
                            desc : { fr: 'Nuit à partir de 76€', en: 'Night from 76€' },
                            src  : 'reisetopia-B8WIgxA_PFU-unsplash.jpg',
                            stars: [1, 1, 1, 1, 0]
                        },
                        {
                            title: 'Hôtel de la mer',
                            desc: { fr: 'Nuit à partir de 46€', en: 'Night from 46€' },
                            src: 'annie-spratt-Eg1qcIitAuA-unsplash.jpg',
                            stars: [1, 1, 1, 1, 1]
                        },
                        {
                            title: 'Auberge Le Panier',
                            desc : { fr: 'Nuit à partir de 23€', en: 'Night from 23€' },
                            src  : 'nicate-lee-kT-ZyaiwBe0-unsplash.jpg',
                            stars: [1, 1, 1, 0, 0]
                        },
                        {
                            title: 'Hôtel Chez Amina',
                            desc : { fr: 'Nuit à partir de 96€', en: 'Night from 96€' },
                            src  : 'febrian-zakaria-M6S1WvfW68A-unsplash.jpg',
                            stars: [1, 1, 1, 1, 0]
                        }
                    ]
                }
            ,
                popular:
                {
                    title: { fr: 'Les plus populaires', en: 'The most popular' }
                    ,
                    contents:
                    [
                        {
                            title: 'Hôtel Le soleil du matin',
                            desc : { fr: 'Nuit à partir de 128€', en: 'Night from 128€' },
                            src  : 'emile-guillemot-Bj_rcSC5XfE-unsplash.jpg',
                            stars: [1, 1, 1, 1, 1]
                        },
                        {
                            title: 'Chambres d\'hôtes Au cœur de l\'eau',
                            desc : { fr: 'Nuit à partir de 71€', en: 'Night from 71€' },
                            src  : 'aw-creative-VGs8z60yT2c-unsplash.jpg',
                            stars: [1, 1, 1, 1, 1]
                        },
                        {
                            title: 'Hôtel Bleu et Blanc',
                            desc : { fr: 'Nuit à partir de 68€', en: 'Night from 68€' },
                            src  : 'febrian-zakaria-sjvU0THccQA-unsplash.jpg',
                            stars: [1, 1, 1, 1, 0]
                        }
                    ]
                }
            ,
                activities:
                {
                    title: { fr: 'Activités à Marseille', en: 'Activities in Marseille' }
                    ,
                    contents:
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
                }
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
                desc         : { fr: 'projet Sophie Bluel par LE THUAUT Morgan', en: 'project Sophie Bluel by LE THUAUT Morgan' },
                job          : { fr: 'Architecte d\'intérieur', en: 'Interior designer' },
                defaultFilter: { fr: 'Tous', en: 'All' }
            ,
                nav:
                [
                    {
                        href : 'projects',
                        value: { fr: 'projets', en: 'projects' }
                    },
                    {
                        href : 'contact',
                        value: 'contact'
                    },
                    { value: 'login' }
                ]
            ,
                introduction:
                {
                    title   : { fr: 'Designer d\'espace', en: 'Space designer' }
                    ,
                    contents:
                    [
                        {
                            fr: 'Je raconte votre histoire, je valorise vos idées. Je vous accompagne de la conception à la livraison finale du chantier.'
                            ,
                            en: 'I tell your story, I promote your ideas. I\'ll work with you from the design stage through to final delivery.'
                        },
                        {
                            fr: `Chaque projet sera étudié en commun, de façon à mettre en valeur les volumes,
                            les matières et les couleurs dans le respect de l\'esprit des lieux et le choix adapté des matériaux.
                            Le suivi du chantier sera assuré dans le souci du détail, le respect du planning et du budget.`
                            ,
                            en: `Each project will be studied together, so as to highlight the volumes,
                            materials and colours in keeping with the spirit of the place and the appropriate choice of materials.
                            The site will be monitored with attention to detail, on schedule and on budget.`
                        },
                        {
                            fr: 'En cas de besoin, une équipe pluridisciplinaire peut-être constituée : architecte DPLG, décorateur(trice).'
                            ,
                            en: 'If necessary, a multi-disciplinary team can be put together: DPLG architect, decorator.'
                        }
                    ]
                }
            ,
                projects:
                {
                    title: { fr: 'Mes Projets', en: 'My Projects' }
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
                            filter: { fr: 'Hôtels & restaurants', en: 'Hotels & restaurants' },
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
                            filter: { fr: 'Hôtels & restaurants', en: 'Hotels & restaurants' },
                            src   : 'bar-lullaby-paris1651287567130.png'
                        },
                        {
                            id    : 10,
                            title : 'Hotel First Arte - New Delhi',
                            filter: { fr: 'Hôtels & restaurants', en: 'Hotels & restaurants' },
                            src   : 'hotel-first-arte-new-delhi1651287605585.png'
                        },
                    ]
                }
            ,
                contact:
                {
                    title     : 'Contact',
                    desc      : { fr: 'Vous avez un projet ? Discutons-en !', en: 'Do you have a project in mind? Let\'s discuss it!' },
                    formSubmit: { fr: 'Envoyer', en: 'Send' }
                    ,
                    form:
                    [
                        {
                            value: { fr: 'Nom', en: 'Name' },
                            name : 'name',
                            type : 'text'
                        },
                        {
                            value: 'Email',
                            name : 'email',
                            type : 'email'
                        },
                        {
                            textarea: true,
                            value   : 'Message',
                            name    : 'message',
                            cols    : 30,
                            rows    : 10
                        }
                    ]
                }
            ,
                footer: { fr: 'Mentions Légales', en: 'Legal information' }
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
                desc         : { fr: 'projet Nina Carducci par LE THUAUT Morgan', en: 'Nina Carducci project by LE THUAUT Morgan' },
                defaultFilter: { fr: 'Tous', en: 'All' }
            ,
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
                        content : './images/ninacarducci/nina-meta.png'
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
                        value: 'Service'
                    },
                    {
                        href : 'contact',
                        value: 'Contact'
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
                description:
                {
                    title: { fr: 'À propos de moi', en: 'About me' },
                    intro:
                    {
                        fr: `Devenir photographe était pour moi une évidence.
                        Comme si j\'y étais prédestiné. Saisir un moment, une émotion, une situation, un endroit, une lumière et les rendre immortels,voilà ce qui me fait vibrer.`
                        ,
                        en: `For me, becoming a photographer was an obvious choice.
                        As if I was predestined. Capturing a moment, an emotion, a situation, a place, a light and making them immortal, that's what makes me tick.`
                    },
                    text:
                    {
                        fr: `Nous passons notre vie à chercher le bonheur, et lorsque nous y touchons, nous n\'avons qu\'une envie,
                        le figer au travers de photographies pour le savourer avec les personnes qui sont importantes à nos yeux, ou le partager au plus grand nombre.
                        C\'est ce que je vous propose: saisir ces merveilleux moments à travers mon regard, mon approche, ma technique.
                        Rendre ces moments immortels, afin que vous puissiez y puiser de l\'amour, du bonheur,
                        de la tendresse et de lumière à chaque fois que vous poserez les yeux sur vos photos.`
                        ,
                        en: `We spend our lives looking for happiness, and when we do find it,
                        all we want to do is freeze it in photographs so that we can savour it with the people who are important to us, or share it with as many people as possible.
                        This is what I propose to you: to capture these wonderful moments through my eyes, my approach and my technique.
                        To make these moments immortal, so that you can draw from them love, happiness, tenderness and light every time you look at your photos.`
                    }
                }
            ,
                gallery:
                [
                    {
                        id    : 0,
                        filter: 'Concert',
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
                        filter: 'Portrait',
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
                        filter: 'Portrait',
                        src   : 'portraits/nino-van-prattenburg--443cl1uR_8-unsplash',
                        alt   : 'Non Van Prattenburg'
                    },
                    {
                        id    : 7,
                        filter: 'Concert',
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
                quote1:
                {
                    author: 'Richard Avedon'
                    ,
                    value:
                    {
                        fr: `Un portrait n'est pas une ressemblance. Dès lors qu\'une émotion ou qu\'un fait est traduit en photo, il cesse d\'être un fait pour devenir une opinion.
                        L\'inexactitude n\'existe pas en photographie. Toutes les photos sont exactes. Aucune d\'elles n\'est la vérité.`
                        ,
                        en: `A portrait is not a likeness. As soon as an emotion or a fact is translated into a photograph, it ceases to be a fact and becomes an opinion.
                        There is no such thing as inaccuracy in photography. All photographs are accurate. None of them is the truth.`
                    }
                } 
            ,
                services:
                {
                    title: { fr: 'Mes services', en: 'My services' }
                    ,
                    contents:
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
                            price: '50€/photo',
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
                quote2:
                {
                    author: 'Richard Avedon'
                    ,
                    value:
                    {
                        fr: 'De manière inconsciente, je crois, je guette un regard, une expression, des traits ou une nostalgie capable de résumer ou plus exactement de révéler une vie.'
                        ,
                        en: `Unconsciously, I think, I watch for a look, an expression, features or nostalgia capable of summing up or, more accurately, revealing a life.`
                    }
                }
            ,
                contact:
                {
                    title     : { fr: 'Une question ? Une demande de devis ?', en: 'Do you have a question? Would you like a quote?' },
                    text      : { fr: 'N\'hésitez pas à m\'écrire ! Je vous répondrais en moins de 24 heures', en: 'Don\'t hesitate to write to me! I\'ll get back to you within 24 hours' },
                    formSubmit: { fr: 'Envoyer', en: 'Send' }
                    ,
                    form:
                    [
                        {
                            value: { fr: 'Nom', en: 'Name' },
                            type : 'text',
                            name : 'name' 
                        },
                        {
                            value: 'Email',
                            type : 'email',
                            name : 'email' 
                        },
                        {
                            value   : 'Message',
                            textarea: true,
                            name    : 'message',
                            cols    : 30,
                            rows    : 10
                        }
                    ]
                }
            ,
                infos:
                [
                    {
                        title: { fr: 'Adresse', en: 'Address' }
                        ,
                        textAttributes:
                        {
                            itemprop : 'address',
                            itemscope: true,
                            itemtype : 'https://schema.org/PostalAddress'
                        }
                        ,
                        contents:
                        [
                            {
                                value     : '68 avenue Alsace-Lorraine',
                                attributes: { itemprop: 'streetAddress' }
                            },
                            {
                                value     : '33200',
                                attributes: { itemprop: 'postalCode' }
                            },
                            {
                                value     : 'Bordeaux',
                                attributes: { itemprop: 'addressLocality' }
                            }
                        ]
                    }
                ,
                    {
                        title: 'Contact'
                        ,
                        contents:
                        [
                            { value: { fr: 'téléphone', en: 'phone' } },
                            {
                                value     : '05 56 67 78 89',
                                attributes: { itemprop: 'telephone' }
                            }
                        ]
                    }
                ,
                    {
                        title: { fr: 'Horaires', en: 'Schedules' }
                        ,
                        textAttributes:
                        {
                            itemprop: 'openingHours',
                            content : 'Mo, Tu, We, Th, Fr 10:00-19:00'
                        }
                        ,
                        contents:
                        [
                            { value: { fr: 'Du lundi au vendredi', en: 'Monday to Friday' } },
                            { value: { fr: 'de 10h à 19h.', en: 'from 10am to 7pm.' }}
                        ]
                    }
                ,
                    {
                        title: { fr: 'Tarifs', en: 'Rates' }
                        ,
                        contents:
                        [
                            {
                                value     : { fr: '50€ à 400€', en: '50€ to 400€' },
                                attributes: { itemprop: 'priceRange' }
                            },
                            {
                                link : true,
                                value: { fr: 'voir mes services', en: 'see my services' }
                                ,
                                attributes:
                                {
                                    href: '#ninacarducci-service',
                                    alt : 'Service'
                                }
                            }
                        ]
                    }
                ]
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