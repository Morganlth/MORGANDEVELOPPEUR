<!-- #MAP

    SOPHIEBLUEL

-->

<!-- #SCRIPT -->

<script>
// #EXPORT

    // --PROP
    export let prop_DATAS = {}

// #IMPORT

    // --SVELTE
    import { page } from '$app/stores'

// #CONSTANTE

    // --ELEMENT-SOPHIEBLUEL
    const SOPHIEBLUEL_FILTERS = sophiebluel_getFilters()

// #VARIABLE

    // --ELEMENT-SOPHIEBLUEL
    let sophiebluel_GALLERY = prop_DATAS.gallery ?? []

// #FUNCTIONS

    // --GET
    function sophiebluel_getFilters()
    {
        const DEFAULT_FILTER = 'Tous'
    
        return prop_DATAS.gallery?.reduce((array, figure) =>
        {
            const
            FILTER = figure.filter ?? DEFAULT_FILTER,
            F = array.find(_ => _.value === FILTER)
        
            if (F) figure.filter_ID = F.id
            else
            {
                const ID = array.length
    
                figure.filter_ID = ID

                array.push({ id: ID, on: false, value: FILTER })
            }

            return array
        },
        [{ on: true, value: DEFAULT_FILTER }]) ?? []
    }

    // --UPDATES
    function sophiebluel_updateFilters(id)
    {
        for (let i = 0; i < SOPHIEBLUEL_FILTERS.length; i++)
        {
            const FILTER = SOPHIEBLUEL_FILTERS[i]
        
            SOPHIEBLUEL_FILTERS[i] = { ...FILTER, on: FILTER.id === id }
        }
    }

    function sophiebluel_updateGallery(id)
    {
        sophiebluel_GALLERY =
        !id
        ? prop_DATAS.gallery ?? []
        : prop_DATAS.gallery?.filter(figure => figure.filter_ID === id)
    }

    // --EVENT
    function sophiebluel_e$Click(id)
    {
        sophiebluel_updateGallery(id)
        sophiebluel_updateFilters(id)
    }
</script>

<!-- #HTML -->

<svelte:head>
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
    href="https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=Work+Sans&display=swap"
    rel="stylesheet"
    >
</svelte:head>

<div
id="sophiebluel"
>
    <div
    class="body"
    >
        <header>
            <a
            href="/projects/sophiebluel"
            alt="projet Sophie Bluel par LE THUAUT Morgan"
            data-sveltekit-reload
            >
                <h1>
                    Sophie Bluel
    
                    <span>Architecte d'inteérieur</span>
                </h1>
            </a>
        
            <nav>
                <ul>
                    {#each prop_DATAS.nav ?? [] as a}
                        <li>
                            <!-- svelte-ignore a11y-invalid-attribute -->
                            <a
                            href="#{a.href ? 'sophiebluel-' + a.href : ''}"
                            alt={a.value}
                            rel="nofollow"
                            >
                                {a.value}
                            </a>
                        </li>
                    {/each}
        
                    <li>
                        <img
                        src="{$page.url.origin}/images/sophiebluel/icons/instagram.png"
                        alt="Instagram"
                        >
                    </li>
                </ul>
            </nav>
        </header>

        <main>
            <section
            id="sophiebluel-introduction"
            >
                <figure>
                    <img
                    src="{$page.url.origin}/images/sophiebluel/sophie-bluel.png"
                    alt="Sophie Bluel"
                    >

                    <!--* Ajout d'une ancre pour les éléments d'édition -->
        
                    <figcaption
                    class="js-anchor"
                    >
                    </figcaption>
                </figure>
        
                <article>
                    <!--* Ajout d'une ancre pour les éléments d'édition -->
        
                    <div
                    class="js-anchor"
                    >
                    </div>
        
                    <h2>Designer d'espace</h2>
            
                    <p>Je raconte votre histoire, je valorise vos idées. Je vous accompagne de la conception à la livraison finale du chantier.</p>
                    <p>Chaque projet sera étudié en commun, de façon à mettre en valeur les volumes, les matières et les couleurs dans le respect de l’esprit des lieux et le choix adapté des matériaux. Le suivi du chantier sera assuré dans le souci du détail, le respect du planning et du budget.</p>
                    <p>En cas de besoin, une équipe pluridisciplinaire peut-être constituée : architecte DPLG, décorateur(trice)</p>
                </article>
            </section>
        
            <section
            id="sophiebluel-projects"
            >
                <h2>Mes Projets</h2>

                <!--* Ajout d'une ancre pour les éléments d'édition + div -->
        
                <div
                class="js-anchor"
                >
                </div>

                <!--* Ajout d'une liste contenant l'ensemble des filtres -->

                <ul
                class="js-module"
                >
                    {#each SOPHIEBLUEL_FILTERS as filter}
                        <li>
                            <button
                            class:active={filter.on}
                            type="button"
                            on:click={sophiebluel_e$Click.bind(null, filter.id)}
                            >
                                {filter.value}
                            </button>
                        </li>
                    {/each}
                </ul>

                <!--* Suppression des éléments présent dans la gallery => import via le serveur -->
        
                <div
                class="gallery"
                >
                    {#each sophiebluel_GALLERY as figure}
                        <figure
                        data-id={figure.id}
                        >
                            <img
                            src="{$page.url.origin}/images/sophiebluel/gallery/{figure.src}"
                            alt={figure.title}
                            crossorigin
                            >
                
                            <figcaption>{figure.title}</figcaption>
                        </figure>
                    {/each}
                </div>
            </section>
    
            <section
            id="sophiebluel-contact"
            >
                <h2>Contact</h2>

                <p>Vous avez un projet ? Discutons-en !</p>
    
                <form
                action="#"
                method="post"
                rel="nofollow"
                onsubmit="return false"
                >
                    <label>
                        Nom

                        <input
                        type="text"
                        name="name"
                        >
                    </label>
            
                    <label>
                        Email

                        <input
                        type="email"
                        name="email"
                        >
                    </label>
                
                    <label>
                        Message

                        <textarea
                        name="message"
                        cols="30"
                        rows="10"
                        ></textarea>
                    </label>

                    <input
                    type="submit"
                    value="Envoyer"
                    >
                </form>
            </section>
        </main>

        <footer>
            <nav>
                <ul>
                    <li>Mentions Légales</li>
                </ul>
            </nav>
        </footer>
    </div>
</div>

<!-- #STYLE -->

<style
lang="scss"
>
/* #USE */

@use '../../assets/scss/styles/display';

/* #SOPHIEBLUEL */

#sophiebluel
{
    $primary-color: #B1663C;
    $secondary-color: #1D6154;

    width: 100%;

    padding: 50px 0 2em;

    background-color: white;

    .body
    {
        max-width: 1140px;

        margin: auto;

        font-family: 'Work Sans';
        font-size: 14px;
    }

    header
    {
        display: flex;
        justify-content: space-between;

        margin-bottom: 50px;

        a
        {
            text-decoration: none;
    
            cursor: pointer;
        }

        h1
        {
            @extend %f-column;

            color: $primary-color;
            font-family: 'Syne';
            font-size: 22px;
            font-weight: 800;

            &>span
            {
                font-family: 'Work Sans';
                font-size: 10px;
                letter-spacing: 0.1em;
            }
        }

        nav
        {
            ul
            {
                @extend %f-a-center;

                list-style-type: none;
            }
    
            a
            {
                padding: 0 10px;
    
                color: black;

                &:hover { color: $primary-color; }
            }
        }
    }

    #sophiebluel-introduction, #sophiebluel-projects, #sophiebluel-contact { margin: 50px 0; }

    #sophiebluel-introduction
    {
        @extend %f-a-center;
    
        article, figure { flex: 1; }
        
        img
        {
            display: block;

            width: 80%;
            
            margin: auto;
        }
    
        h2 { margin-bottom: 1em; }
        p { margin-bottom: 0.5em; }
    }

    #sophiebluel-projects
    {
        h2
        {
            margin-bottom: 1em;
            margin-inline: 30px;

            text-align: center;
        }

        ul
        {
            @extend %f-j-center;

            gap: 0 10px;

            margin: 51px 0;
    
            button
            {
                font-size: 16px;
                font-weight: 700;

                &.active
                {
                    background-color: $secondary-color !important;

                    color: white !important;
                }
            }
        }

        .gallery
        {
            display: grid;
            grid-template-columns: 1fr 1fr 1fr;
            grid-column-gap: 20px;
            grid-row-gap: 20px;

            &, img { width: 100%; }
        }
    }

    #sophiebluel-contact
    {
        width: 50%;

        margin: auto;
        
        &>* { text-align: center; }
    
        h2 { margin-bottom: 20px; }
    
        form
        {
            @extend %f-column;

            margin-top: 30px;

            text-align: left;
        }
    
        label { @extend %f-column; }

        input:not([type="submit"]), textarea
        {
            margin-top: 1em;
            padding: 1em;

            box-sizing: border-box;
        }
    
        input
        {
            height: 50px;

            border: none;

            font-size: 1.2em;

            box-shadow: 0px 4px 14px rgba(0, 0, 0, 0.09);

            &:not([type="submit"]) { margin-bottom: 2em; }
        }
        input[type="submit"]
        {
            width: 180px;

            margin: 2em auto;

            background-color: $secondary-color;

            border-radius: 60px;

            color: white;
            font-family: 'Syne';
            font-weight: 700;
            text-align: center;

            cursor: pointer;
        }

        textarea
        {
            border: none;

            box-shadow: 0px 4px 14px rgba(0, 0, 0, 0.09);
        }
    }

    nav { font-size: 1.2em; }

    h2
    {
        color: $secondary-color;
        font-family: 'Syne';
        font-weight: 700;
        font-size: 30px;
    }

    button
    {
        height: 37px;

        background-color: transparent;

        border: solid $secondary-color 1px;
        border-radius: 60px;

        color: $secondary-color;

        cursor: pointer;

        &[type="button"] { padding: 0 22px; }

        &:hover { color: $primary-color; }
    }

    footer nav ul
    {
        display: flex;
        justify-content: flex-end;

        margin-top: 2em;
    }
}
</style>