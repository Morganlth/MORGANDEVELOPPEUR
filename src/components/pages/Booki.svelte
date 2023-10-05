<!-- #MAP

    BOOKI

-->

<!-- #SCRIPT -->

<script>
// #IMPORT

    // --SVELTE
    import { page } from '$app/stores'
</script>

<!-- #HTML -->

<svelte:head>
    <!--* Raleway Google Fonts -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Raleway:wght@400;700&display=swap" rel="stylesheet">

    <!--* Font Awesome -->
    <script src="https://kit.fontawesome.com/17dbfbb394.js" crossorigin="anonymous"></script>
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
            href="{$page.url.origin}/project/booki"
            data-sveltekit-reload
            >
                <img
                src="{$page.url.origin}/images/projects/booki/logo/booki.png"
                alt="Logo Booki site de réservation et de vente d'hébergements et d'activités pour les vacances"
                >
            </a>

            <nav
            class="any-height"
            >
                <ul
                class="flex any-height"
                >
                    <li
                    class="any-height"
                    >
                        <a
                        class="flex any-height"
                        href="#hosting"
                        >
                            Hébergements
                        </a>
                    </li>

                    <li
                    class="any-height"
                    >
                        <a
                        class="flex any-height"
                        href="#activity"
                        >
                            Activités
                        </a>
                    </li>
                </ul>
            </nav>
        </header>

        <main>
            <section id="command">
                <h1>Trouvez votre hébergement pour des vacances de rêve</h1>
                <p>En plein centre-ville ou en pleine nature</p>

                <form class="flex" method="get" action="#" onsubmit="return false">
                    <button class="main-bg pointer" type="button"><i class="fa-solid fa-location-dot"></i></button>
                    <input class="any-width" type="search" value="Marseille, France">
                    <input class="pointer" type="submit" value="Rechercher">
                    <button class="pointer" type="submit"><i class="fa-solid fa-magnifying-glass"></i></button>
                </form>

                <ul class="flex">
                    <li>
                        <h4>Filtres</h4>
                    </li>
                    <li>
                        <button class="flex pointer hover">
                            <i class="main-color fa-solid fa-money-bill-wave"></i>
                            Économique
                        </button>
                    </li>
                    <li>
                        <button class="flex pointer hover">
                            <i class="main-color fa-solid fa-person"></i>
                            Familial
                        </button>
                    </li>
                    <li>
                        <button class="flex pointer hover">
                            <i class="main-color fa-solid fa-heart"></i>
                            Romantique
                        </button>
                    </li>
                    <li>
                        <button class="flex pointer hover">
                            <i class="main-color fa-solid fa-dog"></i>
                            Animaux autorisés
                        </button>
                    </li>
                </ul>

                <aside class="flex">
                    <i class="main-color fa-solid fa-info"></i>

                    <p>Plus de 500 logements sont disponibles dans cette ville</p>
                </aside>
            </section>

            <section id="hosting" class="flex">
                <div class="any-width main-bg">
                    <h2>Hébergements à Marseille</h2>

                    <div id="article-container-1" class="flex article-container">
                        <article>
                            <!-- svelte-ignore a11y-invalid-attribute -->
                            <a href="#">
                                <img class="any-width" src="{$page.url.origin}/images/projects/booki/hebergements/4_small/marcus-loke-WQJvWU_HZFo-unsplash.jpg" alt="Auberge La Canebière">
                            
                                <div>
                                    <h3>Auberge La Canebière</h3>
                                    <span>Nuit à partir de 25€</span>

                                    <ul class="flex star-list">
                                        <li><i class="main-color fa-solid fa-star"></i></li>
                                        <li><i class="main-color fa-solid fa-star"></i></li>
                                        <li><i class="main-color fa-solid fa-star"></i></li>
                                        <li><i class="main-color fa-solid fa-star"></i></li>
                                        <li><i class="fa-solid fa-star"></i></li>
                                    </ul>
                                </div>
                            </a>
                        </article>
                        <article>
                            <!-- svelte-ignore a11y-invalid-attribute -->
                            <a href="#">
                                <img class="any-width" src="{$page.url.origin}/images/projects/booki/hebergements/4_small/fred-kleber-gTbaxaVLvsg-unsplash.jpg" alt="Hôtel du port">
                            
                                <div>
                                    <h3>Hôtel du port</h3>
                                    <span>Nuit à partir de 52€</span>

                                    <ul class="flex star-list">
                                        <li><i class="main-color fa-solid fa-star"></i></li>
                                        <li><i class="main-color fa-solid fa-star"></i></li>
                                        <li><i class="main-color fa-solid fa-star"></i></li>
                                        <li><i class="main-color fa-solid fa-star"></i></li>
                                        <li><i class="fa-solid fa-star"></i></li>
                                    </ul>
                                </div>
                            </a>
                        </article>
                        <article>
                            <!-- svelte-ignore a11y-invalid-attribute -->
                            <a href="#">
                                <img class="any-width" src="{$page.url.origin}/images/projects/booki/hebergements/4_small/reisetopia-B8WIgxA_PFU-unsplash.jpg" alt="Hôtel Les mouettes">
                            
                                <div>
                                    <h3>Hôtel Les mouettes</h3>
                                    <span>Nuit à partir de 76€</span>

                                    <ul class="flex star-list">
                                        <li><i class="main-color fa-solid fa-star"></i></li>
                                        <li><i class="main-color fa-solid fa-star"></i></li>
                                        <li><i class="main-color fa-solid fa-star"></i></li>
                                        <li><i class="main-color fa-solid fa-star"></i></li>
                                        <li><i class="fa-solid fa-star"></i></li>
                                    </ul>
                                </div>
                            </a>
                        </article>
                        <article>
                            <!-- svelte-ignore a11y-invalid-attribute -->
                            <a href="#">
                                <img class="any-width" src="{$page.url.origin}/images/projects/booki/hebergements/4_small/annie-spratt-Eg1qcIitAuA-unsplash.jpg" alt="Hôtel de la mer">
                            
                                <div>
                                    <h3>Hôtel de la mer</h3>
                                    <span>Nuit à partir de 46€</span>

                                    <ul class="flex star-list">
                                        <li><i class="main-color fa-solid fa-star"></i></li>
                                        <li><i class="main-color fa-solid fa-star"></i></li>
                                        <li><i class="main-color fa-solid fa-star"></i></li>
                                        <li><i class="main-color fa-solid fa-star"></i></li>
                                        <li><i class="fa-solid fa-star"></i></li>
                                    </ul>
                                </div>
                            </a>
                        </article>
                        <article>
                            <!-- svelte-ignore a11y-invalid-attribute -->
                            <a href="#">
                                <img class="any-width" src="{$page.url.origin}/images/projects/booki/hebergements/4_small/nicate-lee-kT-ZyaiwBe0-unsplash.jpg" alt="Auberge Le Panier">
                            
                                <div>
                                    <h3>Auberge Le Panier</h3>
                                    <span>Nuit à partir de 23€</span>

                                    <ul class="flex star-list">
                                        <li><i class="main-color fa-solid fa-star"></i></li>
                                        <li><i class="main-color fa-solid fa-star"></i></li>
                                        <li><i class="main-color fa-solid fa-star"></i></li>
                                        <li><i class="main-color fa-solid fa-star"></i></li>
                                        <li><i class="fa-solid fa-star"></i></li>
                                    </ul>
                                </div>
                            </a>
                        </article>
                        <article>
                            <!-- svelte-ignore a11y-invalid-attribute -->
                            <a href="#">
                                <img class="any-width" src="{$page.url.origin}/images/projects/booki/hebergements/4_small/febrian-zakaria-M6S1WvfW68A-unsplash.jpg" alt="Auberge Le Panier">
                            
                                <div>
                                    <h3>Hôtel Chez Amina</h3>
                                    <span>Nuit à partir de 96€</span>

                                    <ul class="flex star-list">
                                        <li><i class="main-color fa-solid fa-star"></i></li>
                                        <li><i class="main-color fa-solid fa-star"></i></li>
                                        <li><i class="main-color fa-solid fa-star"></i></li>
                                        <li><i class="main-color fa-solid fa-star"></i></li>
                                        <li><i class="fa-solid fa-star"></i></li>
                                    </ul>
                                </div>
                            </a>
                        </article>
                    </div>

                    <!-- svelte-ignore a11y-invalid-attribute -->
                    <a href="#">Afficher plus</a>
                </div>

                <aside class="any-width main-bg">
                    <div class="flex">
                        <h2>Les plus populaires</h2>

                        <i class="main-color fa-solid fa-chart-line"></i>
                    </div>

                    <div id="article-container-2" class="flex article-container">
                        <article class="any-width">
                            <!-- svelte-ignore a11y-invalid-attribute -->
                            <a href="#">
                                <img class="any-height" src="{$page.url.origin}/images/projects/booki/hebergements/4_small/emile-guillemot-Bj_rcSC5XfE-unsplash.jpg" alt="Hôtel Le soleil du matin">
                            
                                <div class="any-height">
                                    <h3>Hôtel Le soleil du matin</h3>
                                    <span>Nuit à partir de 128€</span>

                                    <ul class="flex star-list">
                                        <li><i class="main-color fa-solid fa-star"></i></li>
                                        <li><i class="main-color fa-solid fa-star"></i></li>
                                        <li><i class="main-color fa-solid fa-star"></i></li>
                                        <li><i class="main-color fa-solid fa-star"></i></li>
                                        <li><i class="fa-solid fa-star"></i></li>
                                    </ul>
                                </div>
                            </a>
                        </article>
                        <article class="any-width">
                            <!-- svelte-ignore a11y-invalid-attribute -->
                            <a href="#">
                                <img class="any-height" src="{$page.url.origin}/images/projects/booki/hebergements/4_small/aw-creative-VGs8z60yT2c-unsplash.jpg" alt="Chambres d’hôtes Au cœur de l’eau">
                            
                                <div class="any-height">
                                    <h3>Chambres d’hôtes Au cœur de l’eau</h3>
                                    <span>Nuit à partir de 71€</span>

                                    <ul class="flex star-list">
                                        <li><i class="main-color fa-solid fa-star"></i></li>
                                        <li><i class="main-color fa-solid fa-star"></i></li>
                                        <li><i class="main-color fa-solid fa-star"></i></li>
                                        <li><i class="main-color fa-solid fa-star"></i></li>
                                        <li><i class="fa-solid fa-star"></i></li>
                                    </ul>
                                </div>
                            </a>
                        </article>
                        <article class="any-width">
                            <!-- svelte-ignore a11y-invalid-attribute -->
                            <a href="#">
                                <img class="any-height" src="{$page.url.origin}/images/projects/booki/hebergements/4_small/febrian-zakaria-sjvU0THccQA-unsplash.jpg" alt="Hôtel Bleu et Blanc">
                            
                                <div class="any-height">
                                    <h3>Hôtel Bleu et Blanc</h3>
                                    <span>Nuit à partir de 68€</span>

                                    <ul class="flex star-list">
                                        <li><i class="main-color fa-solid fa-star"></i></li>
                                        <li><i class="main-color fa-solid fa-star"></i></li>
                                        <li><i class="main-color fa-solid fa-star"></i></li>
                                        <li><i class="main-color fa-solid fa-star"></i></li>
                                        <li><i class="fa-solid fa-star"></i></li>
                                    </ul>
                                </div>
                            </a>
                        </article>
                    </div>
                </aside>
            </section>

            <section id="activity">
                <h2>Activités à Marseille</h2>

                <div id="article-container-3" class="flex article-container">
                    <!-- svelte-ignore a11y-invalid-attribute -->
                    <a href="#">
                        <figure class="any-width any-height">
                            <img class="any-width" src="{$page.url.origin}/images/projects/booki/activites/3_medium/reno-laithienne-QUgJhdY5Fyk-unsplash.jpg" alt="Vieux-Port">

                            <figcaption class="flex">
                                <h3>Vieux-Port</h3>
                            </figcaption>
                        </figure>
                    </a>
                    <!-- svelte-ignore a11y-invalid-attribute -->
                    <a href="#" class="any-height">
                        <figure class="any-width any-height">
                            <img class="any-width" src="{$page.url.origin}/images/projects/booki/activites/3_medium/paul-hermann-QFTrLdQIRhI-unsplash.jpg" alt="Fort de Pomègues">
                    
                            <figcaption class="flex">
                                <h3>Fort de Pomègues</h3>
                            </figcaption>
                        </figure>
                    </a>
                    <!-- svelte-ignore a11y-invalid-attribute -->
                    <a href="#" class="any-height">
                        <figure class="any-width any-height">
                            <img class="any-width" src="{$page.url.origin}/images/projects/booki/activites/3_medium/kilyan-sockalingum-NR8-cBCN3aI-unsplash.jpg" alt="Parc national des Calanques">

                            <figcaption class="flex">
                                <h3>Parc national des Calanques</h3>
                            </figcaption>
                        </figure>
                    </a>
                    <!-- svelte-ignore a11y-invalid-attribute -->
                    <a href="#">
                        <figure class="any-width any-height">
                            <img class="any-width" src="{$page.url.origin}/images/projects/booki/activites/3_medium/florian-wehde-xW9e8gdotxI-unsplash.jpg" alt="Notre-Dame-de-la-Garde">

                            <figcaption class="flex">
                                <h3>Notre-Dame-de-la-Garde</h3>
                            </figcaption>
                        </figure>
                    </a>
                </div>
            </section>
        </main>

        <footer class="flex main-bg">
            <nav>
                <h2>À propos</h2>

                <!-- svelte-ignore a11y-invalid-attribute -->
                <ul>
                    <li><a href="#">Fonctionnement du site</a></li>
                    <li><a href="#">Conditions générales</a></li>
                    <li><a href="#">Données et confidentialité</a></li>
                </ul>
            </nav>
            <nav>
                <h2>Nos hébergements</h2>

                <!-- svelte-ignore a11y-invalid-attribute -->
                <ul>
                    <li><a href="#">Charte qualité</a></li>
                    <li><a href="#">Proposer votre hôtel</a></li>
                </ul>
            </nav>
            <nav>
                <h2>Assistance</h2>

                <!-- svelte-ignore a11y-invalid-attribute -->
                <ul>
                    <li><a href="#">Centre d’aide</a></li>
                    <li><a href="#">Nous contacter</a></li>
                </ul>
            </nav>
        </footer>
    </div>
</div>

<!-- #STYLE -->

<style>
/* #CLASS */

.flex { display: flex; }

.any-width { width: 100%; }
.any-height { height: 100%; }

.main-bg { background-color: var(--bg); }

.main-color { color: var(--color-0) !important; }

.pointer { cursor: pointer; }

.hover:hover { background-color: var(--color-1) !important; transition: background-color 0.4s; }

.star-list i { color: var(--bg); font-size: 12px; }

/* #CSS-VARIABLES */

#booki
{
    --color-0: #0065FC;
    --color-1: #DEEBFF;
    --color-2: #D9D9D9;

    --bg: #F2F2F2;
}

/* #DEFAULTS */

#booki
{
    width: 100vw;

    padding-top: 100px;

    background-color: white;
}

.body
{
    max-width: 1400px;

    margin: 0 auto;
    padding: 0 50px;

    font-family: 'Raleway', sans-serif;

    box-sizing: border-box;
}

article, #article-container-3>a
{
    overflow: hidden;

    background-color: white;

    border-radius: 20px;

    box-shadow: 0 10px 10px rgba(0, 0, 0, 0.1);
}

li { list-style-type: none; }

span { font-size: 14px; }

img { object-fit: cover; }

h1, h2, h3 { font-weight: 700; }
h1, h2 { font-size: 22px; }
h3 { font-size: 16px; }
p, a { font-size: 16px; }
a { color: black; text-decoration: none; }

/* #HEADER */

header, header a { align-items: flex-end; }
header
{
    justify-content: space-between;

    height: 70px;
}
#logo
{
    width: 61px;
    height: 19px;
}
#logo img { width: inherit; height: inherit; }
header>nav a
{
    justify-content: center;

    width: 162px;

    border-top: solid transparent 2px;

    box-sizing: border-box;
}
header>nav a:hover
{
    border-color: var(--color-0);

    color: var(--color-0) !important;
}

/* #MAIN */

main
{
    display: flex;
    flex-direction: column;
    gap: 50px 0;

    padding: 50px 0;
}
main h2 { margin-bottom: 25px; }

#command>p { margin-top: 8px; }

#command>form { margin-top: 20px; }
#command>form>*
{
    height: 50px;

    border: none;

    font-size: 18px;
    font-weight: 700;
}
#command>form>button { min-width: 50px; }
#command>form>button[type="button"] { border-radius: 15px 0 0 15px; }
#command>form>input { padding: 0 17px; }
#command>form>input[type="search"]
{
    max-width: 232px;

    border-top: solid var(--bg) 1px;
    border-bottom: solid var(--bg) 1px;

    outline: none;
}
#command>form>input[type="submit"], #command>form>button[type="submit"]
{
    background-color: var(--color-0);

    border-radius: 0 15px 15px 0;

    color: white;
}
#command>form>button[type="submit"] { display: none; }

#command>ul, #command>ul button, #command>aside { align-items: center;}
#command>ul
{
    flex-wrap: wrap;
    gap: 10px 20px;

    margin-top: 30px;
}
#command>ul h4 { font-size: 18px; }
#command>ul button
{
    height: 50px;

    padding: 0 25px;

    background-color: transparent;

    border: solid var(--color-2) 2px;
    border-radius: 30px;
    
    font-size: 17px;
    font-weight: 700;
}
#command>ul i
{
    margin-right: 10px;

    font-size: 22px;
}

#command>aside { margin-top: 40px; }
#command>aside>i
{
    display: flex !important;
    justify-content: center;
    align-items: center;

    min-width: 24px;
    height: 24px;

    margin-right: 10px;

    border: solid var(--color-2) 1px;
    border-radius: 50%;

    font-size: 12px;

    box-sizing: border-box;
}

#hosting { gap: 40px; }

#hosting>div, #hosting>aside
{
    padding: 40px;

    border-radius: 20px;

    box-sizing: border-box;
}
#hosting .article-container { gap: 25px 3.5%; }

#article-container-1 { flex-wrap: wrap; }
#article-container-1>article { width: 31%; }
#article-container-1 img { height: 124px; }
#article-container-1 div
{
    padding: 5px 15px;

    box-sizing: border-box;
}
#hosting>div>a
{
    display: block;

    margin-top: 40px;

    font-size: 18px;
    font-weight: 700;
}

#hosting>aside { flex-shrink: 2; }
#hosting>aside>div:nth-child(1) { justify-content: space-between; }
#hosting>aside>div:nth-child(1)>i { font-size: 18px; }
#article-container-2 { flex-direction: column; }
#article-container-2 article { height: 154px; }
#article-container-2 img
{
    float: left;

    width: 37%;
}
#article-container-2 div
{
    position: relative;

    width: 63%;

    margin-left: 37%;
    padding: 15px 20px;

    box-sizing: border-box;
}
#article-container-2 .star-list
{
    position: absolute;
    bottom: 10px;
}

#article-container-3 { gap: 15px 40px; }
#article-container-3 a
{
    display: block;

    width: 25%;
    height: 444px;
}
#article-container-3 img { height: 87%; }
#article-container-3 figcaption
{
    align-items: center;

    position: relative;
    bottom: 4px;

    height: 13%;

    padding: 0 20px;
}

/* #FOOTER */

footer { padding: 50px 70px; }
footer nav
{
    width: 33.33%;

    padding-left: 10px;
}
footer h2 { margin-bottom: 20px; }
footer a { line-height: 30px; }
footer a:hover { text-decoration: underline; }

@media screen and (max-width: 1134px) { #article-container-2 div { padding: 5px 15px; } }  /* correction: text superimposed in "Les plus populaires" */

/* #SUPPORT-TABLET */ 

@media screen and (max-width: 991px)
{
    #hosting { flex-wrap: wrap; }

    #article-container-2 { flex-direction: row; }
    #article-container-2>article { width: 31%; }
    #article-container-2 div { padding: 10px 19px; }

    #article-container-3>a { height: 267px; }
    #article-container-3 img { height: 80%; }
    #article-container-3 figcaption { height: 20%; }
}

/* #SUPPORT-MOBILE */

@media screen and (max-width: 767px)
{
    .body { padding: 0; }
    
    article, #article-container-3>a, #command>ul>li:nth-child(1), #command>ul button { width: 100% !important; }

    header
    {
        flex-direction: column;
        align-items: center;

        height: 130px;

        padding-top: 20px;
    }
    header nav, header ul, header>nav a { width: 100%; }
    header li { width: 50%; }
    header>nav a
    {
        padding-bottom: 23px;

        border-top: none;
        border-bottom: solid var(--bg) 3px;
    }
    
    main { padding: 30px 0 80px; }

    #command { padding: 0 20px; }
    #command>form
    {
        justify-content: center;

        margin-top: 35px;
    }
    #command>form>input[type="search"] { max-width: 100%; }
    #command>form>input[type="submit"] { display: none; }
    #command>form>button[type="submit"] { display: block; }
    #command>ul
    {
        justify-content: center;
        gap: 3.5%;
    }
    #command>ul>li
    {
        width: 48.25%;

        margin-top: 17px;
    }
    #command>ul button
    {
        padding: 0 13px;

        font-size: 11px;
    }

    #hosting
    {
        flex-direction: column-reverse;
        gap: 0;
    }
    #hosting>div, #hosting>aside { padding: 40px 20px; }
    #hosting>div, #hosting>aside { border-radius: 0; }
    #hosting>div { background-color: white; }
    #hosting>div>a { display: none; }
    #hosting .article-container { gap: 15px; }

    .article-container { flex-direction: column !important; }

    #activity { padding: 0 20px; }
    #article-container-3>a { height: 190px; }
    #article-container-3 img { height: 73%; }
    #article-container-3 figcaption { height: 27%; }

    footer
    {
        flex-direction: column;
        gap: 40px;

        padding: 50px 30px;
    }
    footer>nav { width: 100%; }
}
</style>