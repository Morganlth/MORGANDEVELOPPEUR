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
        datas:
        [
            {
                name: 'booki',
                title: 'BOOKI',
                component: Booki,
                cardTexture: ThreeDiamonds,
                color: COLORS.indicator
            ,
                about: `Booki est le premier projet de la formation.
                    Il sert de base.
                    HTML et CSS sont les deux thèmes principaux.
                    Ceci explique sa simplicité.
                    Pour le contexte, Booki est un site de recherche d\'hébergements et d\'activités.
                    On y retrouve une single-page contenant une barre de recherche (non fonctionnelle), des filtres (non fonctionnels) et des exemples d\'hébergements et d\'activités.
                    Bref, on est plus sur une maquette qu\'un réel site web.
                    Néanmoins, rappelez-vous que ceci est un projet pour apprendre les bases du développement web.`
            ,
                img:
                {
                    src: '/images/booki/logo/booki3x.png',
                    alt: 'projet 1 Booki'
                }
            ,
                datas:
                {
                    nav:
                    [
                        {
                            href: 'hosting',
                            value: 'Hébergements'
                        },
                        {
                            href: 'activity',
                            value: 'Activités'
                        }
                    ]
                ,
                    filters:
                    [
                        {
                            icon: 'fa-money-bill-wave',
                            value: 'Économique'
                        },
                        {
                            icon: 'fa-person',
                            value: 'Familial'
                        },
                        {
                            icon: 'fa-heart',
                            value: 'Romantique'
                        },
                        {
                            icon: 'fa-dog',
                            value: 'Animaux autorisés'
                        }
                    ]
                ,
                    accommodation:
                    [
                        {
                            title: 'Auberge La Canebière',
                            desc: 'Nuit à partir de 25€',
                            src: 'marcus-loke-WQJvWU_HZFo-unsplash.jpg',
                            stars: [1, 1, 1, 1, 0]
                        },
                        {
                            title: 'Hôtel du port',
                            desc: 'Nuit à partir de 52€',
                            src: 'fred-kleber-gTbaxaVLvsg-unsplash.jpg',
                            stars: [1, 1, 1, 0, 0]
                        }
                        ,
                        {
                            title: 'Hôtel Les mouettes',
                            desc: 'Nuit à partir de 76€',
                            src: 'reisetopia-B8WIgxA_PFU-unsplash.jpg',
                            stars: [1, 1, 1, 1, 0]
                        },
                        {
                            title: 'Hôtel de la mer',
                            desc: 'Nuit à partir de 46€',
                            src: 'annie-spratt-Eg1qcIitAuA-unsplash.jpg',
                            stars: [1, 1, 1, 1, 1]
                        },
                        {
                            title: 'Auberge Le Panier',
                            desc: 'Nuit à partir de 23€',
                            src: 'nicate-lee-kT-ZyaiwBe0-unsplash.jpg',
                            stars: [1, 1, 1, 0, 0]
                        },
                        {
                            title: 'Hôtel Chez Amina',
                            desc: 'Nuit à partir de 96€',
                            src: 'febrian-zakaria-M6S1WvfW68A-unsplash.jpg',
                            stars: [1, 1, 1, 1, 0]
                        }
                    ]
                ,
                    popular:
                    [
                        {
                            title: 'Hôtel Le soleil du matin',
                            desc: 'Nuit à partir de 128€',
                            src: 'emile-guillemot-Bj_rcSC5XfE-unsplash.jpg',
                            stars: [1, 1, 1, 1, 1]
                        },
                        {
                            title: 'Chambres d’hôtes Au cœur de l’eau',
                            desc: 'Nuit à partir de 71€',
                            src: 'aw-creative-VGs8z60yT2c-unsplash.jpg',
                            stars: [1, 1, 1, 1, 1]
                        },
                        {
                            title: 'Hôtel Bleu et Blanc',
                            desc: 'Nuit à partir de 68€',
                            src: 'febrian-zakaria-sjvU0THccQA-unsplash.jpg',
                            stars: [1, 1, 1, 1, 0]
                        }
                    ]
                ,
                    activities:
                    [
                        {
                            title: 'Vieux-Port',
                            src: 'reno-laithienne-QUgJhdY5Fyk-unsplash.jpg'
                        },
                        {
                            title: 'Fort de Pomègues',
                            src: 'paul-hermann-QFTrLdQIRhI-unsplash.jpg'
                        },
                        {
                            title: 'Parc national des Calanques',
                            src: 'kilyan-sockalingum-NR8-cBCN3aI-unsplash.jpg'
                        },
                        {
                            title: 'Notre-Dame-de-la-Garde',
                            src: 'florian-wehde-xW9e8gdotxI-unsplash.jpg'
                        }
                    ]
                ,
                    footer:
                    [
                        {
                            title: 'À propos',
                            values: ['Fonctionnement du site', 'Conditions générales', 'Données et confidentialité']
                        },
                        {
                            title: 'Nos hébergements',
                            values: ['Charte qualité', 'Proposer votre hôtel']
                        },
                        {
                            title: 'Assistance',
                            values: ['Centre d’aide', 'Nous contacter']
                        }
                    ]
                }
            },
            {
                name: 'sophiebluel',
                title: 'SOPHIE BLUEL',
                component: SophieBluel,
                cardTexture: TwoHearts,
                color: COLORS.indicator
            ,
                about: `Sophie Bluel est une designeuse d\'espace.
                    Son site web intègre quelques notions de Javascript, comme par exemple une page de login, des modifications dans le DOM ou bien des requêtes vers une base de données.
                    Dans ce projet, vous retrouverez une copie du travail original.
                    Malheureusement les fonctionnalités principales ne sont pas disponibles (comme la page de login).`
            ,
                img:
                {
                    src: '/images/sophiebluel/sophie-bluel.png',
                    alt: 'projet 2 Sophie Bluel'
                }
            ,
                datas:
                {
                    nav:
                    [
                        {
                            href: 'projects',
                            value: 'projets'
                        },
                        {
                            href: 'contact',
                            value: 'contact'
                        },
                        { value: 'login' }
                    ]
                ,
                    gallery:
                    [
                        {
                            id: 0,
                            title: 'Abajour Tahina',
                            filter: 'Objets',
                            src: 'abajour-tahina1651286843956.png'
                        },
                        {
                            id: 1,
                            title: 'Appartement Paris V',
                            filter: 'Appartements',
                            src: 'appartement-paris-v1651287270508.png'
                        },
                        {
                            id: 2,
                            title: 'Restaurant Sushisen - Londres',
                            filter: 'Hotels & restaurants',
                            src: 'restaurant-sushisen-londres1651287319271.png'
                        },
                        {
                            id: 3,
                            title: 'Villa “La Balisiere” - Port Louis',
                            filter: 'Appartements',
                            src: 'la-balisiere1651287350102.png'
                        },
                        {
                            id: 4,
                            title: 'Structures Thermopolis',
                            filter: 'Objets',
                            src: 'structures-thermopolis1651287380258.png'
                        },
                        {
                            id: 5,
                            title: 'Appartement Paris X',
                            filter: 'Appartements',
                            src: 'appartement-paris-x1651287435459.png'
                        },
                        {
                            id: 6,
                            title: 'Pavillon “Le coteau” - Cassis',
                            filter: 'Appartements',
                            src: 'le-coteau-cassis1651287469876.png'
                        },
                        {
                            id: 7,
                            title: 'Villa Ferneze - Isola d’Elba',
                            filter: 'Appartements',
                            src: 'villa-ferneze1651287511604.png'
                        },
                        {
                            id: 8,
                            title: 'Appartement Paris XVIII',
                            filter: 'Appartements',
                            src: 'appartement-paris-xviii1651287541053.png'
                        },
                        {
                            id: 9,
                            title: 'Bar “Lullaby” - Paris',
                            filter: 'Hotels & restaurants',
                            src: 'bar-lullaby-paris1651287567130.png'
                        },
                        {
                            id: 10,
                            title: 'Hotel First Arte - New Delhi',
                            filter: 'Hotels & restaurants',
                            src: 'hotel-first-arte-new-delhi1651287605585.png'
                        },
                    ]
                }
            },
            {
                name: 'ninacarducci',
                title: 'NINA CARDUCCI',
                component: NinaCarducci,
                cardTexture: AceClubs,
                color: COLORS.primary
            ,
                about: `Nina Carducci est une photographe exceptionnelle!
                    Ses clichés sont représentés par une galerie construite à l\'aide de Javascript.
                    De plus, le site est mis sur le devant de la scène grace aux schéma.org, aux balises metas et aux optimisations apportés sur l\'ensemble de la page.
                    Ce projet a pour but de travailler le référencement et l\'optimisation.
                    Dans le code original (disponible sur mon github) Bootsrap était intégré par défaut.
                    Dans cette version j\'ai entièrement supprimé le framework pour retirer tout le superflu.`
            ,
                img:
                {
                    src: '/images/ninacarducci/nina.png',
                    alt: 'projet 3 Nina Carducci'
                }
            ,
                datas:
                {
                    meta:
                    [
                        {
                            property: 'title',
                            content: 'Nina Carducci - photographe'
                        },
                        {
                            property: 'description',
                            content: `Photographe - Photographies Bordeaux - Saisissez ces merveilleux moments au travers de mon regard et de ma technique.
                            Rendez les intemporels grâce à la photo, pour se les remémorer.`
                        },
                        {
                            property: 'image',
                            content: './images/ninacarducci/nina-meta.png'
                        }
                    ]
                ,
                    nav:
                    [
                        {
                            href: 'about',
                            value: 'À propos'
                        },
                        {
                            href: 'gallery',
                            value: 'Galerie'
                        },
                        {
                            href: 'service',
                            value: 'Service'
                        },
                        {
                            href: 'contact',
                            value: 'Contact'
                        }
                    ]
                ,
                    slider:
                    [
                        {
                            src: 'ryoji-iwata-wUZjnOv7t0g-unsplash',
                            alt: 'Ryoji Iwata',
                            translateX: 100
                        },
                        {
                            src: 'nicholas-green-nPz8akkUmDI-unsplash',
                            alt: 'Nicholas Green',
                            translateX: 200
                        },
                        {
                            src: 'edward-cisneros-3_h6-1NPDGw-unsplash',
                            alt: 'Edward Cisneros',
                            translateX: 0
                        }
                    ]
                ,
                    gallery:
                    [
                        {
                            id: 0,
                            filter: 'Concert',
                            src: 'concerts/aaron-paul-wnX-fXzB6Cw-unsplash',
                            alt: 'Aaron Paul'
                        },
                        {
                            id: 1,
                            filter: 'Entreprises',
                            src: 'entreprise/ali-morshedlou-WMD64tMfc4k-unsplash',
                            alt: 'Ali Morshedlou'
                        },
                        {
                            id: 2,
                            filter: 'Entreprises',
                            src: 'entreprise/jason-goodman-tHO1_OuKbg0-unsplash',
                            alt: 'Jason Goodman'
                        },
                        {
                            id: 3,
                            filter: 'Mariages',
                            src: 'mariage/hannah-busing-RvF2R_qMpRk-unsplash',
                            alt: 'Hannah Busing'
                        },
                        {
                            id: 4,
                            filter: 'Portrait',
                            src: 'portraits/ade-tunji-rVkhWWZFAtQ-unsplash',
                            alt: 'Ade Tunji'
                        },
                        {
                            id: 5,
                            filter: 'Mariages',
                            src: 'mariage/jakob-owens-SiniLJkXhMc-unsplash',
                            alt: 'Jakob Owens'
                        },
                        {
                            id: 6,
                            filter: 'Portrait',
                            src: 'portraits/nino-van-prattenburg--443cl1uR_8-unsplash',
                            alt: 'Non Van Prattenburg'
                        },
                        {
                            id: 7,
                            filter: 'Concert',
                            src: 'concerts/austin-neill-hgO1wFPXl3I-unsplash',
                            alt: 'Austin Neill'
                        },
                        {
                            id: 8,
                            filter: 'Entreprise',
                            src: 'entreprise/mateus-campos-felipe-Fsgzm8N0hIY-unsplash',
                            alt: 'Mateus Campos Felipe'
                        }
                    ]
                ,
                    service:
                    [
                        {
                            title: 'Shooting photo',
                            desc: 'Pour capturer vos moments les plus précieux et garder un souvenir impérissable. Je me déplace en Île-de-France pour réaliser vos photos',
                            price: '350€/demi journée',
                            info: 'Matériel, déplacement inclus'
                        },
                        {
                            title: 'Retouches',
                            desc: 'Vous souhaitez retoucher vos photos pour un résultat professionnel ? Bénéficier d’un rendu optimal pour vos publications',
                            price: '50€/photo',
                            info: '2 AR par photo'
                        },
                        {
                            title: 'Album photos',
                            desc: 'Partagez avec vos proches et vos clients les photos des moments partagés ensemble à travers un album photo personnalisé',
                            price: '400€ album A4',
                            info: '30 pages recto/verso'
                        }
                    ]
                }
            }
        ].map((project, id) =>
        {
            project.id   = id
            project.tags = [project.name]

            return project
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