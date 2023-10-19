// #EXPORT

    // --CARDS-DATAS
    export default
    {
        name: 'cards'
    ,
        process: true
    ,
        datas:
        [
            {
                tags: ['booki'],
                value: 'BOOKI',
                component: Booki,
                texture: ThreeDiamonds,
                color: COLORS.indicator,
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
                tags: ['sophiebluel'],
                value: 'SOPHIE BLUEL',
                component: SophieBluel,
                texture: TwoHearts,
                color: COLORS.indicator,
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
                tags: ['ninacarducci'],
                value: 'NINA CARDUCCI',
                component: NinaCarducci,
                texture: AceClubs,
                color: COLORS.primary,
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
                }
            }
        ].map((card, i) =>
        {
            card.id = i

            return card
        })
    }

// #IMPORTS

    // --LIB
    import COLORS from '$lib/colors'

    // --COMPONENT-PAGES
    import Booki from '../../../../components/pages/Booki.svelte'
    import SophieBluel from '../../../../components/pages/SophieBluel.svelte'
    import NinaCarducci from '../../../../components/pages/NinaCarducci.svelte'

    // --COMPONENT-TEXTURES
    import AceClubs from '../../../../components/textures/AceClubs.svelte'
    import TwoHearts from '../../../../components/textures/TwoHearts.svelte'
    import ThreeDiamonds from '../../../../components/textures/ThreeDiamonds.svelte'