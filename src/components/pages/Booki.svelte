<!-- #MAP

    BOOKI

-->

<!-- #SCRIPT -->

<script>
// #IMPORT

    // --SVELTE
    import { page } from '$app/stores'

// #CONSTANTES

    // --ELEMENT-BOOKI
    const
    BOOKI_NAV =
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
    BOOKI_FILTERS =
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
    BOOKI_ACCOMMODATION =
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
    BOOKI_POPULAR =
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
    BOOKI_ACTIVITIES =
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
    BOOKI_FOOTER =
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
</script>

<!-- #HTML -->

<svelte:head>
    <!-- Raleway Google Fonts -->
    <link
    rel="preconnect"
    href="https://fonts.googleapis.com"
    >
    <link
    rel="preconnect"
    href="https://fonts.gstatic.com"
    crossorigin
    >
    <link
    href="https://fonts.googleapis.com/css2?family=Raleway:wght@400;700&display=swap"
    rel="stylesheet"
    >

    <!-- Font Awesome -->
    <script
    src="https://kit.fontawesome.com/17dbfbb394.js"
    crossorigin="anonymous"
    >
    </script>
</svelte:head>

<div
id="booki"
>
    <div
    class="body"
    >
        <header
        class="flex"
        >
            <a
            id="logo"
            href="{$page.url.origin}/booki"
            data-sveltekit-reload
            >
                <img
                src="{$page.url.origin}/images/booki/logo/booki.png"
                alt="Logo Booki site de réservation et de vente d'hébergements et d'activités pour les vacances"
                >
            </a>

            <nav
            class="any-h"
            >
                <ul
                class="flex any-h"
                >
                    {#each BOOKI_NAV as a}
                        <li
                        class="any-h"
                        >
                            <a
                            class="flex any-h"
                            href="#{a.href}"
                            >
                                {a.value}
                            </a>
                        </li>
                    {/each}
                </ul>
            </nav>
        </header>

        <main
        class="flex"
        >
            <section
            id="nav"
            >
                <h1>Trouvez votre hébergement pour des vacances de rêve</h1>
                <p>En plein centre-ville ou en pleine nature</p>

                <form
                class="flex"
                method="get"
                action="#"
                onsubmit="return false"
                >
                    <button
                    class="bg pointer"
                    type="button"
                    >
                        <i
                        class="fa-solid fa-location-dot"
                        >
                        </i>
                    </button>
        
                    <input
                    class="any-w"
                    type="search"
                    value="Marseille, France"
                    >
            
                    <input
                    class="pointer"
                    type="submit"
                    value="Rechercher"
                    >
                
                    <button
                    class="pointer"
                    type="submit">
                        <i
                        class="fa-solid fa-magnifying-glass"
                        >
                        </i>
                    </button>
                </form>

                <ul
                class="flex"
                >
                    <li>
                        <h4>Filtres</h4>
                    </li>

                    {#each BOOKI_FILTERS as filter}
                        <li>
                            <button
                            class="flex pointer hover"
                            >
                                <i
                                class="main-color fa-solid {filter.icon}"
                                >
                                </i>

                                {filter.value}
                            </button>
                        </li>
                    {/each}
                </ul>

                <aside
                class="flex"
                >
                    <i
                    class="main-color fa-solid fa-info"
                    >
                    </i>

                    <p>Plus de 500 logements sont disponibles dans cette ville</p>
                </aside>
            </section>

            <section
            id="hosting"
            class="flex"
            >
                <div
                class="any-w bg"
                >
                    <h2>Hébergements à Marseille</h2>

                    <div
                    id="article-container-1"
                    class="flex article-container"
                    >
                        {#each BOOKI_ACCOMMODATION as accommodation}
                            <article>
                                <!-- svelte-ignore a11y-invalid-attribute -->
                                <a
                                href="#"
                                rel="nofollow"
                                >
                                    <img
                                    class="any-w"
                                    src="{$page.url.origin}/images/booki/hebergements/4_small/{accommodation.src}"
                                    alt={accommodation.title}
                                    >
                                
                                    <div>
                                        <h3>{accommodation.title}</h3>
                                        <span>{accommodation.desc}</span>

                                        <ul
                                        class="flex star-list"
                                        >
                                            {#each accommodation.stars as active}
                                                <li>
                                                    <i
                                                    class="fa-solid fa-star"
                                                    class:main-color={active}
                                                    >
                                                    </i>
                                                </li>
                                            {/each}
                                        </ul>
                                    </div>
                                </a>
                            </article>
                        {/each}
                    </div>

                    <!-- svelte-ignore a11y-invalid-attribute -->
                    <a
                    href="#"
                    rel="nofollow"
                    >
                        Afficher plus
                    </a>
                </div>

                <aside
                class="any-w bg"
                >
                    <div
                    class="flex"
                    >
                        <h2>Les plus populaires</h2>

                        <i
                        class="main-color fa-solid fa-chart-line"
                        >
                        </i>
                    </div>

                    <div
                    id="article-container-2"
                    class="flex article-container"
                    >
                        {#each BOOKI_POPULAR as popular}
                            <article
                            class="any-w"
                            >
                                <!-- svelte-ignore a11y-invalid-attribute -->
                                <a
                                href="#"
                                rel="nofollow"
                                >
                                    <img
                                    class="any-h"
                                    src="{$page.url.origin}/images/booki/hebergements/4_small/{popular.src}"
                                    alt={popular.title}
                                    >
                                
                                    <div
                                    class="any-h"
                                    >
                                        <h3>{popular.title}</h3>
                                        <span>{popular.desc}</span>

                                        <ul
                                        class="flex star-list"
                                        >
                                            {#each popular.stars as active}
                                                <li>
                                                    <i
                                                    class="fa-solid fa-star"
                                                    class:main-color={active}
                                                    >
                                                    </i>
                                                </li>
                                            {/each}
                                        </ul>
                                    </div>
                                </a>
                            </article>
                        {/each}
                    </div>
                </aside>
            </section>

            <section
            id="activity"
            >
                <h2>Activités à Marseille</h2>

                <div
                id="article-container-3"
                class="flex article-container"
                >
                    {#each BOOKI_ACTIVITIES as activity}
                        <!-- svelte-ignore a11y-invalid-attribute -->
                        <a
                        href="#"
                        rel="nofollow"
                        >
                            <figure
                            class="any-w any-h"
                            >
                                <img
                                class="any-w"
                                src="{$page.url.origin}/images/booki/activites/3_medium/{activity.src}"
                                alt={activity.title}
                                >

                                <figcaption
                                class="flex"
                                >
                                    <h3>{activity.title}</h3>
                                </figcaption>
                            </figure>
                        </a>
                    {/each}
                </div>
            </section>
        </main>

        <footer
        class="flex bg"
        >
            {#each BOOKI_FOOTER as nav}
                <nav>
                    <h2>{nav.title}</h2>

                    <ul>
                        {#each nav.values as value}
                            <!-- svelte-ignore a11y-invalid-attribute -->
                            <li>
                                <a
                                href="#"
                                rel="nofollow"
                                >
                                    {value}
                                </a>
                            </li>
                        {/each}
                    </ul>
                </nav>
            {/each}
        </footer>
    </div>
</div>

<!-- #STYLE -->

<style
lang="scss"
>
/* #BOOKI */

$primary-color: #0065FC;
$primary-light-color: #DEEBFF;
$light-color: #F2F2F2;
$border-color: #D9D9D9;

li { list-style-type: none; }

span { font-size: 14px; }

img { object-fit: cover; }

h1, h2, h3 { font-weight: 700; }
h1, h2 { font-size: 22px; }
h3 { font-size: 16px; }
p, a { font-size: 16px; }
a { color: black; text-decoration: none; }

#booki
{
    width: 100vw;

    padding-top: 100px;

    background-color: white;

    .flex { display: flex; }

    .any-w { width: 100%; }
    .any-h { height: 100%; }

    .bg { background-color: $light-color; }

    .main-color { color: $primary-color !important; }

    .pointer { cursor: pointer; }

    .hover:hover { background-color: $primary-light-color !important; transition: background-color 0.4s; }

    .star-list i { color: $light-color; font-size: 12px; }


    .body
    {
        max-width: 1400px;

        margin: 0 auto;
        padding: 0 50px;

        font-family: 'Raleway', sans-serif;

        box-sizing: border-box;
    }
}

header
{
    &, a { align-items: flex-end; }

    justify-content: space-between;

    height: 70px;

    #logo
    {
        width: 61px;
        height: 19px;

        img
        {
            width: inherit;
            height: inherit;
        }
    }

    &>nav a
    {
        justify-content: center;

        width: 162px;

        border-top: solid transparent 2px;

        box-sizing: border-box;

        &:hover
        {
            border-color: $primary-color;

            color: $primary-color !important;
        }
    }
}

main
{
    flex-direction: column;
    gap: 50px 0;

    padding: 50px 0;

    h2 { margin-bottom: 25px; }

    #nav
    {
        &>p { margin-top: 8px; }

        &>form
        {
            margin-top: 20px;

            &>*
            {
                height: 50px;

                border: none;

                font-size: 18px;
                font-weight: 700;
            }

            &>input[type="submit"], &>button[type="submit"]
            {
                background-color: $primary-color;

                border-radius: 0 15px 15px 0;

                color: white;
            }

            &>button
            {
                min-width: 50px;

                &[type="button"] { border-radius: 15px 0 0 15px; }

                &[type="submit"] { display: none; }
            }

            &>input
            {
                padding: 0 17px;

                &[type="search"]
                {
                    max-width: 232px;

                    border-top: solid $light-color 1px;
                    border-bottom: solid $light-color 1px;

                    outline: none;
                }
            }
        }

        &>ul, &>ul button, &>aside { align-items: center; }
    
        &>ul
        {
            flex-wrap: wrap;
            gap: 10px 20px;

            margin-top: 30px;

            h4 { font-size: 18px; }

            button
            {
                height: 50px;

                padding: 0 25px;

                background-color: transparent;

                border: solid $border-color 2px;
                border-radius: 30px;
                
                font-size: 17px;
                font-weight: 700;
            }

            i
            {
                margin-right: 10px;

                font-size: 22px;
            }
        }

        &>aside
        {
            margin-top: 40px;

            &>i
            {
                display: flex !important;
                justify-content: center;
                align-items: center;

                min-width: 24px;
                height: 24px;

                margin-right: 10px;

                border: solid $border-color 1px;
                border-radius: 50%;

                font-size: 12px;

                box-sizing: border-box;
            }
        }
    }

    article, #article-container-3>a
    {
        overflow: hidden;

        background-color: white;

        border-radius: 20px;

        box-shadow: 0 10px 10px rgba(0, 0, 0, 0.1);
    }

    #hosting
    {
        gap: 40px;

        &>div, &>aside
        {
            padding: 40px;

            border-radius: 20px;

            box-sizing: border-box;
        }
    
        & .article-container { gap: 25px 3.5%; }

        #article-container-1
        {
            flex-wrap: wrap;

            &>article { width: 31%; }
    
            & img { height: 124px; }
    
            & div
            {
                padding: 5px 15px;

                box-sizing: border-box;
            }
        }

        &>div>a
        {
            display: block;

            margin-top: 40px;

            font-size: 18px;
            font-weight: 700;
        }

        &>aside
        {
            flex-shrink: 2;

            &>div:nth-child(1)
            {
                justify-content: space-between;

                &>i { font-size: 18px; }
            }
        
            #article-container-2
            {
                flex-direction: column;

                article { height: 154px; }
        
                img
                {
                    float: left;

                    width: 37%;
                }
            
                div
                {
                    position: relative;

                    width: 63%;

                    margin-left: 37%;
                    padding: 15px 20px;

                    box-sizing: border-box;

                    @media screen and (max-width: 1134px) { padding: 5px 15px; }  /* correction: text superimposed in "Les plus populaires" */
                }

                .star-list
                {
                    position: absolute;
                    bottom: 10px;
                }
            }
        }
    }

    #article-container-3
    {
        gap: 15px 40px;

        a
        {
            display: block;

            width: 25%;
            height: 444px;
        }
    
        img { height: 87%; }
        
        figcaption
        {
            align-items: center;

            position: relative;
            bottom: 4px;

            height: 13%;

            padding: 0 20px;
        }
    }
}

footer
{
    padding: 50px 70px;

    nav
    {
        width: 33.33%;

        padding-left: 10px;
    }
    h2 { margin-bottom: 20px; }
    a
    {
        line-height: 30px;

        &:hover { text-decoration: underline; }
    }
}

@media screen and (max-width: 991px)
{
    #hosting { flex-wrap: wrap; }

    #article-container-2
    {
        flex-direction: row;

        &>article { width: 31%; }
        
        div { padding: 10px 19px; }
    }

    #article-container-3
    {
        &>a { height: 267px; }
        
        img { height: 80%; }
        
        figcaption { height: 20%; }
    }
}

/* #SUPPORT-MOBILE */

@media screen and (max-width: 767px)
{
    .body { padding: 0; }
    
    article, #article-container-3>a, #nav>ul>li:nth-child(1), #nav>ul button { width: 100% !important; }

    header
    {
        flex-direction: column;
        align-items: center;

        height: 130px;

        padding-top: 20px;

        nav, ul, &>nav a { width: 100%; }

        li { width: 50%; }

        &>nav a
        {
            padding-bottom: 23px;

            border-top: none;
            border-bottom: solid $light-color 3px;
        }
    }
    
    main
    {
        padding: 30px 0 80px;

        #nav
        {
            padding: 0 20px;

            &>form
            {
                justify-content: center;

                margin-top: 35px;

                &>input[type="search"] { max-width: 100%; }
        
                &>input[type="submit"] { display: none; }
        
                &>button[type="submit"] { display: block; }
            }
            
            &>ul
            {
                justify-content: center;
                gap: 3.5%;

                &>li
                {
                    width: 48.25%;

                    margin-top: 17px;
                }

                button
                {
                    padding: 0 13px;

                    font-size: 11px;
                }
            }
        }

        .article-container { flex-direction: column !important; }

        #hosting
        {
            flex-direction: column-reverse;
            gap: 0;

            &>div, &>aside
            {
                padding: 40px 20px;

                border-radius: 0;
            }

            &>div
            {
                background-color: white;

                &>a { display: none; }
            }
            
            .article-container { gap: 15px; }
        }

        #activity
        {
            padding: 0 20px;

            #article-container-3
            {
                &>a { height: 190px; }
            
                img { height: 73%; }
            
                figcaption { height: 27%; }
            }
        }
    }

    footer
    {
        flex-direction: column;
        gap: 40px;

        padding: 50px 30px;

        &>nav { width: 100%; }
    }
}
</style>