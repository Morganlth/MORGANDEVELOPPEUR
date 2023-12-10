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
    class="body b-box"
    >
        <header
        class="d-fcc"
        >
            <a
            id="booki-logo"
            href="/projects/booki"
            alt={prop_DATA.desc}
            data-sveltekit-reload
            >
                <img
                src="/images/booki/logo/booki.png"
                alt="Logo Booki"
                >
            </a>

            <nav
            class="s-any"
            >
                <ul
                class="d-flx s-any"
                >
                    {#each prop_DATA.nav ?? [] as a}
                        <li
                        class="s-a-h"
                        >
                            <a
                            class="d-fjc s-any b-box"
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
        class="d-fc-"
        >
            <section
            id="booki-head"
            >
                <h1>{prop_DATA.head.title}</h1>
    
                <p>{prop_DATA.head.subtitle}</p>

                <form
                class="d-fjc"
                method="get"
                action="#"
                onsubmit="return false"
                rel="nofollow"
                >
                    <button
                    type="button"
                    aria-label="location"
                    >
                        <i
                        class="fa-solid fa-location-dot"
                        >
                        </i>
                    </button>
        
                    <input
                    class="s-a-w"
                    type="search"
                    name="search"
                    aria-label="search"
                    value="Marseille, France"
                    >
            
                    <input
                    class="d-hid"
                    type="submit"
                    value={prop_DATA.head.formInputValue}
                    >
                
                    <button
                    type="submit"
                    >
                        <i
                        class="fa-solid fa-magnifying-glass"
                        >
                        </i>
                    </button>
                </form>

                <ul
                class="d-f-c"
                >
                    <li
                    class="s-a-w"
                    >
                        <span>{prop_DATA.head.filtersTitle}</span>
                    </li>

                    {#each prop_DATA.head.filters ?? [] as filter}
                        <li>
                            <button
                            class="hover d-fac s-a-w"
                            type="button"
                            aria-label="filtre {filter.value}"
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
                class="d-fac"
                >
                    <i
                    class="main-color b-box fa-solid fa-info d-f-c"
                    >
                    </i>

                    <p>{prop_DATA.head.info}</p>
                </aside>
            </section>

            <section
            id="booki-accommodation"
            class="d-flx"
            >
                <div
                class="d-fc- s-a-w b-box"
                >
                    <h2>{prop_DATA.accommodation.title}</h2>

                    <div
                    id="booki-container-accommodation"
                    class="container d-fc-"
                    >
                        {#each prop_DATA.accommodation.contents ?? [] as accommodation}
                            <article
                            class="o-hid s-a-w"
                            >
                                <!-- svelte-ignore a11y-invalid-attribute -->
                                <a
                                href="#"
                                rel="nofollow"
                                >
                                    <img
                                    class="s-a-w"
                                    src="/images/booki/hebergements/{accommodation.src}"
                                    alt={accommodation.title}
                                    >
                                
                                    <div
                                    class="b-box"
                                    >
                                        <h3>{accommodation.title}</h3>
                                        <span>{accommodation.desc}</span>

                                        <ul
                                        class="d-flx star-list"
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
                    class="d-hid"
                    href="#"
                    rel="nofollow"
                    >
                        {prop_DATA.accommodation.more}
                    </a>
                </div>

                <aside
                class="s-a-w b-box"
                >
                    <div
                    class="d-flx"
                    >
                        <h2>{prop_DATA.popular.title}</h2>

                        <i
                        class="main-color fa-solid fa-chart-line"
                        >
                        </i>
                    </div>

                    <div
                    id="booki-container-popular"
                    class="container d-fc-"
                    >
                        {#each prop_DATA.popular.contents ?? [] as popular}
                            <article
                            class="o-hid s-a-w"
                            >
                                <!-- svelte-ignore a11y-invalid-attribute -->
                                <a
                                href="#"
                                rel="nofollow"
                                >
                                    <img
                                    class="s-a-h"
                                    src="/images/booki/hebergements/{popular.src}"
                                    alt={popular.title}
                                    >
                                
                                    <div
                                    class="p-rlt s-a-h b-box"
                                    >
                                        <h3>{popular.title}</h3>
    
                                        <span>{popular.desc}</span>

                                        <ul
                                        class="star-list p-abs d-flx"
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
                <h2>{prop_DATA.activities.title}</h2>

                <div
                id="booki-container-activities"
                class="container d-fc-"
                >
                    {#each prop_DATA.activities.contents ?? [] as activity}
                        <!-- svelte-ignore a11y-invalid-attribute -->
                        <a
                        class="o-hid s-a-w"
                        href="#"
                        rel="nofollow"
                        >
                            <figure
                            class="s-any"
                            >
                                <img
                                class="s-a-w"
                                src="/images/booki/activites/{activity.src}"
                                alt="{prop_DATA.activities.alt} {activity.title}"
                                >

                                <figcaption
                                class="p-rlt d-fac"
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
        class="d-fc-"
        >
            {#each prop_DATA.footer ?? [] as nav}
                <nav
                class="s-a-w"
                >
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
    @use '../../../../../assets/scss/styles/media';


/* #\-VARIABLES-\ */

    /* --* */
    $primary-color      : #0065FC;
    $primary-light-color: #DEEBFF;
    $light-color        : #F2F2F2;
    $border-color       : #D9D9D9;


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

    .main-color { color: $primary-color !important; }

    .hover:hover
    {
        background-color: $primary-light-color !important;
        
        transition: background-color .4s;
    }

    .star-list i
    {
        color    : $light-color;
        font-size: 1.2rem;
    }

    .body
    {
        max-width: 1400px;

        margin-inline : auto;
        padding-inline: 5rem;

        font-family: 'Raleway', sans-serif;
    }

    header
    {
        height: 13rem;
            
        padding-top: 2rem;

        #booki-logo
        {
            width : 61px;
            height: 19px;

            img
            {
                width : inherit;
                height: inherit;
            }
        }

        nav
        {
            li { width: 50%; }

            a
            {
                align-items: flex-end;
        
                padding-bottom: 2.3rem;

                border-bottom: solid $light-color .3rem;

                &:hover
                {
                    border-color: $primary-color;

                    color: $primary-color !important;
                }
            }
        }
    }

    main
    {
        gap: 5rem 0;

        padding-block: 3rem 8rem;

        h2 { margin-bottom: 2.5rem; }

        #booki-head
        {
            padding-inline: 2rem;

            &>p { margin-top: .8rem; }

            form
            {
                margin-top: 3.5rem;

                &>*
                {
                    height: 5rem;

                    font-size  : 1.8rem;
                    font-weight: 700;
                }

                input[type="submit"], button[type="submit"]
                {
                    background-color: $primary-color;

                    border-radius: 0 1.5rem 1.5rem 0;

                    color: #fff;
                }

                input[type="submit"] { cursor: pointer; }

                button
                {
                    min-width: 50px;

                    &[type="button"]
                    {
                        background-color: $light-color;
            
                        border-radius: 1.5rem 0 0 1.5rem;
                    }
                }

                input
                {
                    padding-inline: 1.7rem;

                    &[type="search"]
                    {
                        border-block: solid $light-color 1px;

                        outline: none;
                    }
                }
            }
        
            ul
            {
                flex-wrap: wrap;
                gap      : 3.5%;

                margin-top: 3rem;

                li { margin-top: 1.7rem; }

                li:not(:nth-child(1)) { width: 48.25%; }

                span, button { font-weight: 700; }

                span { font-size: 1.8rem; }

                button
                {
                    height: 5rem;

                    padding-inline: 1.3rem;

                    background-color: transparent;

                    border       : solid $border-color .2rem;
                    border-radius: 3rem;
                    
                    font-size: 1.1rem;
                }

                i
                {
                    margin-right: 1rem;

                    font-size: 2.2rem;
                }
            }

            aside
            {
                margin-top: 4rem;

                &>i
                {
                    display: flex !important;
            
                    width : 2.4rem;
                    height: 2.4rem;

                    margin-right: 1rem;

                    border       : solid $border-color 1px;
                    border-radius: 50%;

                    font-size: 1.2rem;
                }
            }
        }

        article, #booki-container-activities>a
        {
            background-color: white;

            border-radius: 2rem;

            box-shadow: 0 1rem 1rem rgba(0, 0, 0, 0.1);
        }

        #booki-accommodation
        {
            flex-direction: column-reverse;
            flex-wrap     : wrap;

            &>div, &>aside { padding: 4rem 2rem; }

            &>div
            {
                justify-content: space-between;

                &>a
                {
                    margin-top: 2.5rem;

                    font-size  : 1.8rem;
                    font-weight: 700;
                }
            }
        
            .container { gap: 1.5rem; }

            #booki-container-accommodation
            {
                flex-wrap: wrap;
        
                img { height: 124px; }
        
                div { padding: .5rem 1.5rem; }
            }

            &>aside
            {
                flex-shrink: 2;

                background-color: $light-color;

                &>div:nth-child(1)
                {
                    justify-content: space-between;

                    &>i { font-size: 1.8rem; }
                }
            
                #booki-container-popular
                {
                    article { height: 154px; }
            
                    img
                    {
                        float: left;

                        width: 37%;
                    }
                
                    div
                    {
                        width: 63%;

                        margin-left: 37%;
                        padding    : 1rem 1.9rem;
                    }

                    .star-list { bottom: 1rem; }
                }
            }
        }

        #booki-activity
        {
            padding-inline: 2rem;

            #booki-container-activities
            {
                gap: 1.5rem 4rem;

                a { height: 190px; }

                img { height: 73%; }
                
                figcaption
                {
                    bottom: .4rem;

                    height: 27%;

                    padding-inline: 2rem;
                }
            }
        }
    }

    footer
    {
        gap: 4rem;

        padding: 5rem 3rem;

        background-color: $light-color;

        nav { padding-left: 1rem; }

        h2 { margin-bottom: 2rem; }

        a
        {
            line-height: 3rem;

            &:hover { text-decoration: underline; }
        }
    }

    @include media.min($ms4)
    {
        header
        {
            flex-direction : row;
            justify-content: space-between;
            align-items    : flex-end;
        
            height: 7rem;

            nav
            {
                width: auto;
        
                a
                {
                    width: 16.2rem;

                    padding-bottom: 0;
                
                    border-top   : solid transparent .2rem;
                    border-bottom: none;
                }
            }
        }

        main
        {
            padding-block: 5rem;

            .container { flex-direction: row; }

            #booki-head
            {
                padding-inline: 0;

                form, ul { justify-content: flex-start; }

                form
                {
                    margin-top: 2rem;

                    input
                    {
                        &[type="search"] { max-width: 232px; }

                        &[type="submit"] { display: block !important; }
                    }

                    button[type="submit"] { display: none; }
                }
        
                ul
                {
                    gap: 1rem 2rem;

                    li, button { width: auto !important; }

                    button
                    {
                        padding-inline: 2.5rem;

                        font-size: 1.7rem;
                    }
                }
            }

            #booki-accommodation
            {
                gap: 4rem;

                &>div, &>aside
                {
                    padding: 4rem;

                    border-radius: 2rem;
                }

                &>div
                {
                    background-color: $light-color;

                    &>a { display: block !important; }
                }
                
                .container { gap: 2.5rem 3.5%; }

                #booki-container-accommodation>article { width: 31%; }
            }

            #booki-activity
            {
                padding-inline: 0;
        
                #booki-container-activities
                {
                    a
                    {
                        width : 25%;
                        height: 267px;
                    }

                    img { height: 80%; }

                    figcaption { height: 20%; }
                }
            }
        }

        footer
        {
            flex-direction: row;
    
            padding: 5rem 7rem;

            nav { width: 33.33%; }
        }
    }

    @include media.min($ms5)
    {
        main
        {
            #booki-accommodation
            {
                flex-direction: row;
                flex-wrap     : nowrap;
            }

            #booki-container-popular
            {
                flex-direction: column;

                div { padding: 1.5rem 2rem; }
            }

            #booki-activity #booki-container-activities
            {
                a { height: 444px; }

                img { height: 87%; }
                
                figcaption { height: 13%; }
            }
        }
    }
}


</style>