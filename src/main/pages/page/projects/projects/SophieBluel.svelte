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
class="s-a-w"
>
    <div
    class="body"
    >
        <header
        class="d-flx"
        >
            <a
            href="/projects/sophiebluel"
            alt={prop_DATA.desc}
            data-sveltekit-reload
            >
                <h1
                class="d-fc-"
                >
                    Sophie Bluel
    
                    <span>{prop_DATA.job}</span>
                </h1>
            </a>
        
            <nav>
                <ul
                class="d-fac"
                >
                    {#each prop_DATA.nav ?? [] as a}
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
            class="d-fc-"
            >
                <figure>
                    <img
                    src="/images/sophiebluel/sophie-bluel.png"
                    alt="Sophie Bluel"
                    >
                </figure>
        
                <article>
                    <h2>{prop_DATA.introduction.title}</h2>

                    {#each prop_DATA.introduction.contents as content}
                        <p>{content}</p>
                    {/each}
                </article>
            </section>
        
            <section
            id="sophiebluel-projects"
            >
                <h2>{prop_DATA.projects.title}</h2>

                <ul
                class="js-module d-fjc"
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
                class="gallery s-a-w"
                >
                    {#each sophiebluel_GALLERY as figure}
                        <figure
                        data-id={figure.id}
                        >
                            <img
                            class="s-a-w"
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
            class="s-a-w"
            >
                <h2>{prop_DATA.contact.title}</h2>

                <p>{prop_DATA.contact.desc}</p>
    
                <form
                class="d-fc-"
                action="#"
                method="post"
                rel="nofollow"
                onsubmit="return false"
                >
                    {#each prop_DATA.contact.form ?? [] as input}
                        {@const {value, textarea, ...rest} = input}
                        <label
                        class="d-fc-"
                        >
                            {value}

                            {#if textarea}
                                <textarea
                                class="b-box"
                                {...rest}
                                ></textarea>
                            {:else}
                                <input
                                class="b-box"
                                autocomplete="on"
                                {...rest}
                                >
                            {/if}
                        </label>
                    {/each}

                    <input
                    type="submit"
                    value={prop_DATA.contact.formSubmit}
                    autocomplete="on"
                    >
                </form>
            </section>
        </main>

        <footer>
            <nav>
                <ul
                class="d-flx"
                >
                    <li>{prop_DATA.footer}</li>
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
    export let prop_DATA = {}

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
    let sophiebluel_GALLERY = prop_DATA.projects.gallery ?? []

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
        const DEFAULT_FILTER = prop_DATA.defaultFilter
    
        return prop_DATA.projects.gallery?.reduce((array, figure) =>
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
        ? prop_DATA.projects.gallery ?? []
        : prop_DATA.projects.gallery?.filter(figure => figure.filter_ID === id)
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

    /* --MEDIA */
    @use '../../../../../assets/scss/styles/media';


/* #\-VARIABLES-\ */

    /* --* */
    $primary-color  : #AB633A;
    $secondary-color: #1D6154;


/* #\-THIS-\ */

#sophiebluel
{
    padding-block: 5rem 2rem;

    background-color: white;

    .body
    {
        width    : auto;
        max-width: 1140px;

        margin        : auto;
        padding-inline: 2rem;

        font-family: 'Work Sans';
        font-size  : 1.4rem;
    }

    header
    {
        justify-content: space-between;

        margin-bottom: 5rem;

        h1
        {
            color      : $primary-color;
            font-family: 'Syne';
            font-size  : 2.2rem;
            font-weight: 800;

            &>span
            {
                font-family   : 'Work Sans';
                font-size     : 1rem;
                letter-spacing: .1rem;
            }
        }

        nav
        {
            a
            {
                padding: 0 10px;
    
                color: #000;

                &:hover { color: $primary-color; }
            }

            img
            {
                width : 4rem;
                height: 4rem;
            }
        }
    }

    #sophiebluel-introduction, #sophiebluel-projects, #sophiebluel-contact { margin: 5rem 0; }

    #sophiebluel-introduction
    {
        align-items: center;
        gap        : 3rem;
    
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
            flex-wrap: wrap;
            gap      : 1rem;

            margin: 5rem 0;
    
            button
            {
                font-size  : 1.6rem;
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
            display              : grid;
            grid-template-columns: 1fr;
            gap                  : 2rem;
        }
    }

    #sophiebluel-contact
    {
        margin: auto;
        
        &>* { text-align: center; }
    
        h2 { margin-bottom: 2rem; }
    
        form
        {
            margin-top: 3rem;

            text-align: left;
        }

        input:not([type="submit"]), textarea
        {
            margin-top: 1rem;
            padding   : 1rem;
        }

        input, textarea
        {
            border: solid #000 1px;
    
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

            color      : #fff;
            font-family: 'Syne';
            font-weight: 700;
            text-align : center;

            cursor: pointer;
        }
    }

    nav { font-size: 1.2rem; }

    h2
    {
        color      : $secondary-color;
        font-family: 'Syne';
        font-weight: 700;
        font-size  : 3rem;
    }

    button
    {
        height: 3.7rem;

        background-color: transparent;

        border       : solid $secondary-color 1px;
        border-radius: 6rem;

        color: $secondary-color;

        &[type="button"] { padding: 0 2.2rem; }

        &:hover { color: $primary-color; }
    }

    footer ul
    {
        justify-content: flex-end;

        margin-top: 2rem;
    }

    @include media.min($ms3)
    {
        #sophiebluel-introduction
        {
            flex-direction: row;
            gap           : 0;
        }

        #sophiebluel-projects .gallery { grid-template-columns: 1fr 1fr 1fr; }

        #sophiebluel-contact
        {
            width: 50%;

            input, textarea { border: none; }
        }
    }
}


</style>