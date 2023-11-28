<!----------------------------------------------- #||--booki--|| -->


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
    href="https://fonts.googleapis.com/css2?family=Raleway:wght@400;700&display=swap"
    rel="stylesheet"
    >

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
            id="booki-logo"
            href="/projects/booki"
            alt="projet Booki par LE THUAUT Morgan"
            data-sveltekit-reload
            >
                <img
                src="/images/booki/logo/booki.png"
                alt="Logo Booki site de réservation et de vente d'hébergements et d'activités pour les vacances"
                >
            </a>

            <nav
            class="any-h"
            >
                <ul
                class="flex any-h"
                >
                    {#each prop_DATA.nav ?? [] as a}
                        <li
                        class="any-h"
                        >
                            <a
                            class="flex any-h"
                            href="#booki-{a.href}"
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
            id="booki-nav"
            >
                <h1>Trouvez votre hébergement pour des vacances de rêve</h1>
                <p>En plein centre-ville ou en pleine nature</p>

                <form
                class="flex"
                method="get"
                action="#"
                onsubmit="return false"
                rel="nofollow"
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

                    {#each prop_DATA.filters ?? [] as filter}
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
            id="booki-accommodation"
            class="flex"
            >
                <div
                class="any-w bg"
                >
                    <h2>Hébergements à Marseille</h2>

                    <div
                    id="booki-container-accommodation"
                    class="flex container"
                    >
                        {#each prop_DATA.accommodation ?? [] as accommodation}
                            <article>
                                <!-- svelte-ignore a11y-invalid-attribute -->
                                <a
                                href="#"
                                rel="nofollow"
                                >
                                    <img
                                    class="any-w"
                                    src="/images/booki/hebergements/4_small/{accommodation.src}"
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
                    id="booki-container-popular"
                    class="flex container"
                    >
                        {#each prop_DATA.popular ?? [] as popular}
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
                                    src="/images/booki/hebergements/4_small/{popular.src}"
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
            id="booki-activity"
            >
                <h2>Activités à Marseille</h2>

                <div
                id="booki-container-activities"
                class="flex container"
                >
                    {#each prop_DATA.activities ?? [] as activity}
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
                                src="/images/booki/activites/3_medium/{activity.src}"
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
            {#each prop_DATA.footer ?? [] as nav}
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

    // --INSIDE


// #\-VARIABLES-\

    // --CONTEXTS

    // --OUTSIDE

    // --THIS

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

    // --UPDATES

    // --DESTROY


//=======@COMMANDS|

    // --*


//=======@EVENTS|

    // --*


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


/* #\-VARIABLES-\ */

    /* --* */
    $primary-color: #0065FC;
    $primary-light-color: #DEEBFF;
    $light-color: #F2F2F2;
    $border-color: #D9D9D9;


/* #\-THIS-\ */

#booki
{
    img { object-fit: cover; }

    h1, h2, h3 { font-weight: 700; }

    h1, h2 { font-size: 2.2rem; }

    h3, p, a { font-size: 1.6rem; }

    a { color: #000; }

    span { font-size: 1.4rem; }

    width: 100vw;

    padding-top: 100px;

    background-color: #fff;

    .flex { display: flex; }

    .any-w { width:  100%; }
    .any-h { height: 100%; }

    .bg { background-color: $light-color; }

    .main-color { color: $primary-color !important; }

    .pointer { cursor: pointer; }

    .hover:hover
    {
        background-color: $primary-light-color !important;
        
        transition: background-color .4s;
    }

    .star-list i
    {
        color: $light-color;
        font-size: 1.2rem;
    }

    .body
    {
        max-width: 1400px;

        margin: 0 auto;
        padding: 0 5rem;

        font-family: 'Raleway', sans-serif;

        box-sizing: border-box;
    }
}

header
{
    &, a { align-items: flex-end; }

    justify-content: space-between;

    height: 70px;

    #booki-logo
    {
        width:  61px;
        height: 19px;

        img
        {
            width:  inherit;
            height: inherit;
        }
    }

    &>nav a
    {
        justify-content: center;

        width: 162px;

        border-top: solid transparent .2rem;

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
    gap: 5rem 0;

    padding: 5rem 0;

    h2 { margin-bottom: 2.5rem; }

    #booki-nav
    {
        &>p { margin-top: .8rem; }

        &>form
        {
            margin-top: 2rem;

            &>*
            {
                height: 5rem;

                border: none;

                font-size: 1.8rem;
                font-weight: 700;
            }

            &>input[type="submit"], &>button[type="submit"]
            {
                background-color: $primary-color;

                border-radius: 0 1.5rem 1.5rem 0;

                color: #fff;
            }

            &>button
            {
                min-width: 50px;

                &[type="button"] { border-radius: 1.5rem 0 0 1.5rem; }

                &[type="submit"] { display: none; }
            }

            &>input
            {
                padding: 0 1.7rem;

                &[type="search"]
                {
                    max-width: 232px;

                    border-top:    solid $light-color 1px;
                    border-bottom: solid $light-color 1px;

                    outline: none;
                }
            }
        }

        &>ul, &>ul button, &>aside { align-items: center; }
    
        &>ul
        {
            flex-wrap: wrap;
            gap: 1rem 2rem;

            margin-top: 3rem;

            h4 { font-size: 1.8rem; }

            button
            {
                height: 5rem;

                padding: 0 2.5rem;

                background-color: transparent;

                border: solid $border-color .2rem;
                border-radius: 3rem;
                
                font-size: 1.7rem;
                font-weight: 700;
            }

            i
            {
                margin-right: 1rem;

                font-size: 2.2rem;
            }
        }

        &>aside
        {
            margin-top: 4rem;

            &>i
            {
                display: flex !important;
                justify-content: center;
                align-items: center;

                min-width: 24px;
                height: 2.4rem;

                margin-right: 1rem;

                border: solid $border-color 1px;
                border-radius: 50%;

                font-size: 1.2rem;

                box-sizing: border-box;
            }
        }
    }

    article, #booki-container-activities>a
    {
        overflow: hidden;

        background-color: white;

        border-radius: 2rem;

        box-shadow: 0 1rem 1rem rgba(0, 0, 0, 0.1);
    }

    #booki-accommodation
    {
        gap: 4rem;

        &>div, &>aside
        {
            padding: 4rem;

            border-radius: 2rem;

            box-sizing: border-box;
        }
    
        & .container { gap: 2.5rem 3.5%; }

        #booki-container-accommodation
        {
            flex-wrap: wrap;

            &>article { width: 31%; }
    
            & img { height: 124px; }
    
            & div
            {
                padding: .5rem 1.5rem;

                box-sizing: border-box;
            }
        }

        &>div>a
        {
            display: block;

            margin-top: 4rem;

            font-size: 1.8rem;
            font-weight: 700;
        }

        &>aside
        {
            flex-shrink: 2;

            &>div:nth-child(1)
            {
                justify-content: space-between;

                &>i { font-size: 1.8rem; }
            }
        
            #booki-container-popular
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
                    padding: 1.5rem 2rem;

                    box-sizing: border-box;
                }

                .star-list
                {
                    position: absolute;
                    bottom: 1rem;
                }
            }
        }
    }

    #booki-container-activities
    {
        gap: 1.5rem 4rem;

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
            bottom: .4rem;

            height: 13%;

            padding: 0 2rem;
        }
    }
}

footer
{
    padding: 5rem 7rem;

    nav
    {
        width: 33.33%;

        padding-left: 1rem;
    }
    h2 { margin-bottom: 2rem; }
    a
    {
        line-height: 3rem;

        &:hover { text-decoration: underline; }
    }
}

@media screen and (max-width: 991px)
{
    #booki-accommodation { flex-wrap: wrap; }

    #booki-container-popular
    {
        flex-direction: row;

        &>article { width: 31%; }
        
        div { padding: 1rem 1.9rem; }
    }

    #booki-container-activities
    {
        &>a { height: 267px; }
        
        img { height: 80%; }
        
        figcaption { height: 20%; }
    }
}

@media screen and (max-width: 767px)
{
    .body { padding: 0; }
    
    article, #booki-container-activities>a, #booki-nav>ul>li:nth-child(1), #booki-nav>ul button { width: 100% !important; }

    header
    {
        flex-direction: column;
        align-items: center;

        height: 130px;

        padding-top: 2rem;

        nav, ul, &>nav a { width: 100%; }

        li { width: 50%; }

        &>nav a
        {
            padding-bottom: 2.3rem;

            border-top:    none;
            border-bottom: solid $light-color .3rem;
        }
    }
    
    main
    {
        padding: 3rem 0 8rem;

        #booki-nav
        {
            padding: 0 2rem;

            &>form
            {
                justify-content: center;

                margin-top: 3.5rem;

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

                    margin-top: 1.7rem;
                }

                button
                {
                    padding: 0 1.3rem;

                    font-size: 1.1rem;
                }
            }
        }

        .container { flex-direction: column !important; }

        #booki-accommodation
        {
            flex-direction: column-reverse;
            gap: 0;

            &>div, &>aside
            {
                padding: 4rem 2rem;

                border-radius: 0;
            }

            &>div
            {
                background-color: white;

                &>a { display: none; }
            }
            
            .container { gap: 1.5rem; }
        }

        #booki-activity
        {
            padding: 0 2rem;

            #booki-container-activities
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
        gap: 4rem;

        padding: 5rem 3rem;

        &>nav { width: 100%; }
    }
}


</style>