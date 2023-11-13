<!----------------------------------------------- #||--sophiebluel--|| -->


<!-- #|-CONTEXT-| -->
<!--
<script
context="module"
>

// #\-IMPORTS-\

    // --SVELTE

     // --LIB

    // --JS


// #\-EXPORTS-\

    // --CONTEXTS


</script>
-->

<!-- #|-HTML-| -->

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
                        src="/images/sophiebluel/icons/instagram.png"
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
                    src="/images/sophiebluel/sophie-bluel.png"
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
                            on:click={sophiebluel_eClick.bind(null, filter.id)}
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
                            src="/images/sophiebluel/gallery/{figure.src}"
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


<!-- #|-SCRIPT-| -->

<script>

// #\-IMPORTS-\

    // --DATA

    // --SVELTE

    // --LIB

    // --CONTEXTS

//=======@COMPONENTS|

    // --*
    
//=======@STYLE|

    // --*


// #\-EXPORTS-\

    // --PROPS
    export let prop_DATAS = {}

    // --BINDING


// #\-CONSTANTES-\

    // --SVELTE

    // --CONTEXTS

    // --OUTSIDE

    // --THIS
    const SOPHIEBLUEL_FILTERS = sophiebluel_getFilters()

    // --INSIDE


// #\-VARIABLES-\

    // --CONTEXTS

    // --OUTSIDE

    // --THIS
    let sophiebluel_GALLERY = prop_DATAS.gallery ?? []

    // --INSIDE


// #\-REATIVES-\

    // --CONTEXTS

    // --OUTSIDE

    // --THIS

    // --INSIDE


// #\-FUNCTIONS-\

//=======@LIFE|

    // --SVELTE

    // --SET

    // --GET
    function sophiebluel_getFilters()
    {
        const DEFAULT_FILTER = 'Tous'
    
        return prop_DATAS.gallery?.reduce((array, figure) =>
        {
            const
            FILTER = figure.filter ?? DEFAULT_FILTER,
            F      = array.find(_ => _.value === FILTER)
        
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

    // --DESTROY


//=======@COMMANDS|

    // --*


//=======@EVENTS|

    // --*
    function sophiebluel_eClick(id)
    {
        sophiebluel_updateGallery(id)
        sophiebluel_updateFilters(id)
    }


//=======@TRANSITIONS|

    // --*


//=======@ANIMATIONS|

    // --*


//=======@UTILS|

    // --*


</script>


<!-- #|-STYLE-| -->

<style
lang="scss"
>

/* #\-USES-\ */

    /* --SASS */

    /* --APP */

    /* --DEPENDENCIES */
    @use '../../../../../assets/scss/styles/display';

    /* --MEDIA */


/* #\-VARIABLES-\ */

    /* --* */
    $primary-color:   #B1663C;
    $secondary-color: #1D6154;


/* #\-THIS-\ */

#sophiebluel
{
    width: 100%;

    padding: 5rem 0 2rem;

    background-color: white;

    .body
    {
        max-width: 1140px;

        margin: auto;

        font-family: 'Work Sans';
        font-size: 1.4rem;
    }

    header
    {
        display: flex;
        justify-content: space-between;

        margin-bottom: 5rem;

        h1
        {
            @extend %f-column;

            color: $primary-color;
            font-family: 'Syne';
            font-size: 2.2rem;
            font-weight: 800;

            &>span
            {
                font-family: 'Work Sans';
                font-size: 1rem;
                letter-spacing: .1rem;
            }
        }

        nav
        {
            ul { @extend %f-a-center; }
    
            a
            {
                padding: 0 10px;
    
                color: #000;

                &:hover { color: $primary-color; }
            }
        }
    }

    #sophiebluel-introduction, #sophiebluel-projects, #sophiebluel-contact { margin: 5rem 0; }

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
    
        h2 { margin-bottom: 1rem; }
    
        p { margin-bottom: .5rem; }
    }

    #sophiebluel-projects
    {
        h2
        {
            margin-bottom: 1rem;
            margin-inline: 3rem;

            text-align: center;
        }

        ul
        {
            @extend %f-j-center;

            gap: 0 1rem;

            margin: 5rem 0;
    
            button
            {
                font-size: 1.6rem;
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
            gap: 2rem;

            &, img { width: 100%; }
        }
    }

    #sophiebluel-contact
    {
        width: 50%;

        margin: auto;
        
        &>* { text-align: center; }
    
        h2 { margin-bottom: 2rem; }
    
        form
        {
            @extend %f-column;

            margin-top: 3rem;

            text-align: left;
        }
    
        label { @extend %f-column; }

        input:not([type="submit"]), textarea
        {
            margin-top: 1rem;
            padding: 1rem;

            box-sizing: border-box;
        }

        input, textarea
        {
            border: none;
    
            box-shadow: 0px .4rem 1.4rem rgba(0, 0, 0, .1);
        }
    
        input
        {
            height: 5rem;

            font-size: 1.2rem;

            &:not([type="submit"]) { margin-bottom: 2rem; }
        }
    
        input[type="submit"]
        {
            width: 180px;

            margin: 2rem auto;

            background-color: $secondary-color;

            border-radius: 6rem;

            color: #fff;
            font-family: 'Syne';
            font-weight: 700;
            text-align: center;

            cursor: pointer;
        }
    }

    nav { font-size: 1.2rem; }

    h2
    {
        color: $secondary-color;
        font-family: 'Syne';
        font-weight: 700;
        font-size: 3rem;
    }

    button
    {
        height: 3.7rem;

        background-color: transparent;

        border: solid $secondary-color 1px;
        border-radius: 6rem;

        color: $secondary-color;

        &[type="button"] { padding: 0 2.2rem; }

        &:hover { color: $primary-color; }
    }

    footer nav ul
    {
        display: flex;
        justify-content: flex-end;

        margin-top: 2rem;
    }
}


</style>