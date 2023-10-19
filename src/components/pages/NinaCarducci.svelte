
<!-- #SCRIPT -->

<script>
// #EXPORT

    // --PROP
    export let prop_DATAS = {}

// #IMPORTS
    
    // --SVELTE
    import { onMount } from 'svelte'
    import { page } from '$app/stores'
    import { fade } from 'svelte/transition'

// #CONSTANTES

    // --ELEMENT-SLIDER
    const SLIDER_DURATION = 600

    // --ELEMENT-GALLERY
    const GALLERY_FILTERS = gallery_getFilters()

    // --ELEMENT-SERVICE
    const SERVICES =
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

// #VARIABLES

    // --ELEMENT-SLIDER
    let
    slider_TARGET = 0,

    slider_INTERVAL,
    slider_LAST = +new Date()

    // --ELEMENT-GALLERY
    let
    gallery_GALLERY = prop_DATAS.gallery ?? [],

    gallery_CONTAINER,
    gallery_TAG_TARGET = 0,
    gallery_ELEMENT_TARGET,
    gallery_COLUMNS = 3,
    gallery_COUNT = gallery_GALLERY.length

// #FUNCTIONS

    // --SET
    function ninacarducci_set() { slider_set() }

    function slider_set() { slider_INTERVAL = setInterval(slider_update.bind(null, 2), 6000 + SLIDER_DURATION) }

    function modal_set(id)
    {
        gallery_COUNT = prop_DATAS.gallery?.reduce((a, item) => item.on ? ++a : a, 0) ?? 0
        gallery_ELEMENT_TARGET = id
    }

    // --DESTROY
    function modal_destroy() { gallery_ELEMENT_TARGET = null }

    // --GET
    function gallery_getFilters()
    {
        const DEFAULT_FILTER = 'Tous'
    
        return prop_DATAS.gallery?.reduce((array, img) =>
        {
            const
            FILTER = img.filter ?? DEFAULT_FILTER,
            F = array.find(_ => _.value === FILTER)
        
            if (F) img.filter_ID = F.id
            else
            {
                const ID = array.length
    
                img.filter_ID = ID

                array.push({ id: ID, on: false, value: FILTER })
            }

            return array
        },
        [{ on: true, value: DEFAULT_FILTER }]) ?? []
    }

    // --UPDATES
    function slider_update(n /* 1: prev | 2: next */)
    {
        const LENGTH = prop_DATAS.slider?.length ?? 0

        for (let i = 0; i < LENGTH; i++)
        {
            const 
            SLIDE = prop_DATAS.slider[i],
            TRANSLATE_X = (SLIDE.translateX + 100 * n) % (LENGTH * 100),
            DURATION = (n === 1 && TRANSLATE_X === 0) || (n === 2 && TRANSLATE_X === (LENGTH - 1) * 100) ? 0 : SLIDER_DURATION

            if (TRANSLATE_X === 100) slider_TARGET = i

            prop_DATAS.slider[i] = { ...SLIDE, translateX: TRANSLATE_X, duration: DURATION }
        }
    }
    
    function slider_updateTo(id)
    {
        const DIF = id - slider_TARGET

        DIF === -1 || DIF === 2
        ? slider_update(1)              // prev
        : DIF === -2 || DIF === 1
            ? slider_update(2)          // next
            : void 0
    }

    function gallery_update(id)
    {
        gallery_GALLERY =
        !id
        ? prop_DATAS.gallery ?? []
        : prop_DATAS.gallery?.filter(img => img.filter_ID === id)
    }

    function gallery_updateFilter(id)
    {
        for (let i = 0; i < GALLERY_FILTERS.length; i++)
        {
            const FILTER = GALLERY_FILTERS[i]
        
            GALLERY_FILTERS[i] = { ...FILTER, on: FILTER.id === id }
        }

        /*
        
            NINACARDUCCI GALLERY
                UPDATE GALLERY (gallery_GALLERY)
                UPDATE FILTRES (GALLERY_FILTERS)
                    UTILISER SVELTE POUR CHECK LES ELEMENT SUPPRIMER, LES ELEMENT A CONSERVER ET AJOUTER DANS LA GALLERY
                    
        */
    }

    function modal_update(a)
    {
        const
        children = [...gallery_CONTAINER.children],
        length = children.length

        let i = -1

        while (++i < length)
            if (children[i].dataset.id == gallery_ELEMENT_TARGET) { i += a; break }

        gallery_ELEMENT_TARGET = parseInt(children[i < 0 ? length - 1 : i >= length ? 0 : i].dataset.id, 10)
    }

    // --CLEAR
    function slider_clear() { clearInterval(slider_INTERVAL) }

    // --EVENTS
    function slider_eClick(d)
    {
        const NOW = +new Date()
        
        if (NOW - slider_LAST < SLIDER_DURATION) return

        slider_LAST = NOW

        slider_clear()
        slider_switcher(d)
        slider_set()
    }

    function gallery_eClick(id)
    {
        gallery_update(id)
        gallery_updateFilter(id)
    }

    function gallery_eClick2(id) { modal_set(id) }

    function modal_click() { modal_referral.call(this) }

    // --REFERRALS
    function modal_referral()
    {
        switch (this)
        {
            case 'c':
                modal_destroy()
                break
            case 'p':
                modal_update(-1)
                break
            case 'n':
                modal_update(+1)
                break
            default:
                break
        }
    }

    // --TRANSITION
    function scale() { return { duration: 200, css: (t) => `transform: scale(${t})` } }

    // --AUTO-CALL
    ;(function gallery_autoCompletionTags()
    {
        for (const item of prop_DATAS.gallery ?? [])
            if (!GALLERY_TAGS.find(tag => tag === item.tag)) GALLERY_TAGS.push(item.tag)
    })()

    // --UTILS
    function slider_switcher(d)
    {
        switch (d)
        {
            case 'prev':
                slider_update(1)
                break
            case 'next':
                slider_update(2)
                break
            default:
                if (typeof d === 'number') slider_updateTo(d)
                break
        }
    }

    function gallery_map(filter, value)
    {
        if (filter === 'Tous') value = true

        for (let i = 0; i < prop_DATAS.gallery?.length ?? 0; i++)
        prop_DATAS.gallery[i] = { ...prop_DATAS.gallery[i], on: value ?? (prop_DATAS.gallery[i].tag === tag ? true : false) }
    }

// #CYCLE

onMount(ninacarducci_set)
</script>

<!-- #HTML -->
<svelte:head>
    <!-- #META -->

    {#each prop_DATAS.meta ?? {} as meta}
        <meta
        property="og:{meta.property}"
        content={meta.content}
        />
        <meta
        name="twitter:{meta.property}"
        content={meta.content}
        >
    {/each}

    <meta
    property="og:type"
    content="website"
    >
    <meta
    property="og:locale"
    content="fr_FR"
    >
    <meta
    property="og:image:type"
    content="image/png"
    >
    <meta
    property="og:image:width"
    content="1200"
    >
    <meta
    property="og:image:height"
    content="627"
    >
    <meta
    property="og:image:alt"
    content="Nina Carducci - photographe"
    >

    <meta
    name="twitter:card"
    content="summary_large_image"
    >
    <meta
    name="twitter:site"
    content="@Nina-Carducci-photographe"
    >
    <meta
    name="twitter:creator"
    content="@Nina-Carducci"
    >
    
    <!-- #FONT -->

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
    href="https://fonts.googleapis.com/css2?family=Inter&family=Spectral:ital,wght@0,400;1,300;1,400;1,800&display=block"
    rel="stylesheet"
    >
</svelte:head>

<div
id="ninacarducci"
>
	<div
    class="body"
    itemscope
    itemtype="https://schema.org/LocalBusiness"
    >
        <header>
            <a
            href="./project/ninacarducci"
            >
                <h1
                itemprop="name"
                >
                    Nina Carducci
                </h1>
            </a>
        
            <nav>
                <ul>
                    {#each prop_DATAS.nav ?? [] as a}
                        <li>
                            <a
                            href="#ninacarducci-{a.href}"
                            alt="Nina Carducci {a.value}"
                            >
                                {a.value}
                            </a>
                        </li>
                    {/each}
                    
                    <li>
                        <a
                        href="https://www.instagram.com/ninacarducci.photo/?hl=fr"
                        alt="Nina Carducci Instagram"
                        target="_blank"
                        >
                            <img
                            src="{$page.url.origin}/images/ninacarducci/instagram.png"
                            alt="Instagram"
                            width="20"
                            height="20"
                            >
                        </a>
                    </li>
                </ul>
            </nav>
        </header>

        <main>
            <div
            class="slider"
            >
                <nav>
                    {#each Array(prop_DATAS.slider?.length ?? 0) as _, id}
                        <button
                        type="button"
                        class:active={slider_TARGET === id}
                        on:click={slider_eClick.bind(null, id)}
                        >
                        </button>
                    {/each}
                </nav>

                <div
                itemscope
                itemtype="https://schema.org/ImageGallery"
                itemprop="subjectOf"
                >
                    {#each prop_DATAS.slider ?? [] as item}
                        <div
                        class="slider-item"
                        style:transition-duration="{item.duration}ms"
                        style:transform="translateX({item.translateX - 100}%)"
                        >
                            <img
                            srcset="
                            {$page.url.origin}/images/ninacarducci/slider/{item.src}-1920.jpg 1920w,
                            {$page.url.origin}/images/ninacarducci/slider/{item.src}-1440.jpg 1440w,
                            {$page.url.origin}/images/ninacarducci/slider/{item.src}-1024.jpg 1024w,
                            {$page.url.origin}/images/ninacarducci/slider/{item.src}-768.jpg 768w,
                            {$page.url.origin}/images/ninacarducci/slider/{item.src}-425.jpg 425w"
                            sizes="(min-width: 1441px) 1920px, (min-width: 1025px) 1440px, (min-width: 769px) 1024px, (min-width: 426px) 768px, 425px"
                            src="{$page.url.origin}/images/ninacarducci/slider/{item.src}-1920.jpg"
                            alt={item.alt}
                            width="1920"
                            height="888"
                            itemprop="image"
                            >
                        </div>
                    {/each}

                    {#each ['prev', 'next'] as btn}
                        <button
                        class={btn}
                        type="button"
                        on:click={slider_eClick.bind(null, btn)}
                        >
                            <img
                            src="{$page.url.origin}/images/ninacarducci/icons/carousel-control-{btn}-icon.svg"
                            alt="{btn} button pour le slider"
                            width="16"
                            height="27"
                            >
                        </button>
                    {/each}
                </div>
            </div>
        
            <div
            id="ninacarducci-about"
            >
                <picture>
                    <source
                    media="(min-width: 1180px)"
                    srcset="{$page.url.origin}/images/ninacarducci/nina.png 560w"
                    sizes="560px"
                    >
                    <source
                    media="(min-width: 650px)"
                    srcset="{$page.url.origin}/images/ninacarducci/nina-420.png 420w"
                    sizes="420px"
                    >
                    <source
                    media="(max-width: 650px)"
                    srcset="{$page.url.origin}/images/ninacarducci/nina-224.png 224w"
                    sizes="224px"
                    >
                    <img
                    srcset="
                    {$page.url.origin}/images/ninacarducci/nina.png 560w,
                    {$page.url.origin}/images/ninacarducci/nina-420.png 420w,
                    {$page.url.origin}/images/ninacarducci/nina-224.png 224w"
                    sizes="(min-width: 1180px) 559px, (min-width: 650px) 419px, 223px"
                    src="{$page.url.origin}/images/ninacarducci/nina.png"
                    alt="moi - Nina Carducci"
                    width="560"
                    height="558"
                    itemprop="image"
                    >
                </picture>
        
                <article
                itemprop="description"
                >
                    <h2>À propos de moi</h2>
            
                    <em>
                        Devenir photographe était pour moi une évidence. Comme si j’y étais prédestiné. Saisir un moment, une émotion, une situation, un endroit, une lumière et les rendre immortels,
                        voilà ce qui me fait vibrer.
                    </em>

                    <p>
                        Nous passons notre vie à chercher le bonheur, et lorsque nous y touchons, nous n’avons qu’une envie : le figer au travers de photographies pour le savourer avec les personnes
                        qui sont importantes à nos yeux, ou le partager au plus grand nombre.
                        C’est ce que je vous propose : saisir ces merveilleux moments au travers de mon regard, mon approche, ma technique. Rendre ces moments immortels, afin que vous puissiez y 
                        puiser de l’amour, du bonheur, de la tendresse et de lumière à chaque fois que vous poserez les yeux sur vos photos.
                    </p>
                </article>
            </div>

            <section
            id="ninacarducci-gallery"
            itemscope
            itemtype="https://schema.org/ImageGallery"
            itemprop="subjectOf"
            >
                <h2
                itemprop="name"
                >
                    Portfolio
                </h2>

                <nav>
                    <ul>
                        {#each GALLERY_FILTERS as filter}
                            <li>
                                <button
                                class:active={filter.on}
                                type="button"
                                on:click={gallery_eClick.bind(null, filter.id)}
                                >
                                    {filter.value}
                                </button>
                            </li>
                        {/each}
                    </ul>
                </nav>
            
                <div
                class="container"
                >
                    <div
                    style:--columns={gallery_COLUMNS}
                    bind:this={gallery_CONTAINER}
                    >
                        {#each prop_DATAS.gallery ?? [] as img}
                            {#if img.on}
                                <button
                                data-id={img.id}
                                type="button"
                                on:click={gallery_eClick2.bind(null, img.id)}
                                transition:scale
                                >
                                    <img
                                    srcset="
                                    {$page.url.origin}/images/ninacarducci/gallery/{img.src}-424.jpg 424w,
                                    {$page.url.origin}/images/ninacarducci/gallery/{img.src}-364.jpg 364w,
                                    {$page.url.origin}/images/ninacarducci/gallery/{img.src}-304.jpg 304w,
                                    {$page.url.origin}/images/ninacarducci/gallery/{img.src}-224.jpg 224w,
                                    {$page.url.origin}/images/ninacarducci/gallery/{img.src}-254.jpg 254w"
                                    sizes="(min-width: 1400px) 423px, (min-width: 1200px) 363px, (min-width: 992px) 303px, (min-width: 768px) 223px, (min-width: 576px) 253px, 423px"
                                    src="{$page.url.origin}/images/ninacarducci/gallery/{img.src}.jpg"
                                    alt={img.filter + ' ' + img.alt}
                                    width="424"
                                    height="424"
                                    itemprop="image"
                                    >
                                </button>
                            {/if}
                        {/each}
                    </div>
                </div>

                {#if gallery_ELEMENT_TARGET != null}
                    <!-- svelte-ignore a11y-click-events-have-key-events a11y-no-static-element-interactions -->
                    <div
                    class="modal"
                    transition:fade={{ duration: 200 }}
                    on:click={modal_click.bind('c')}
                    >
                        <div
                        transition:scale
                        >
                            <img
                            src="{$page.url.origin}/images/ninacarducci/gallery/{(prop_DATAS.gallery ?? [])[gallery_ELEMENT_TARGET]?.src}.jpg"
                            alt={(prop_DATAS.gallery ?? [])[gallery_ELEMENT_TARGET]?.alt}
                            width="498"
                            />

                            {#if gallery_COUNT > 1}
                                <button
                                class="prev"
                                type="button"
                                on:click|stopPropagation={modal_click.bind('p')}
                                >
                                    &#x3C;
                                </button>

                                <button
                                class="next"
                                type="button"
                                on:click|stopPropagation={modal_click.bind('n')}
                                >
                                    &#x3E;
                                </button>
                            {/if}
                        </div>
                    </div>
                {/if}
            </section>

            <article
            class="quote"
            >
                <figure
                itemscope
                itemtype="https://schema.org/Quotation"
                itemprop="subjectOf"
                >
                    <blockquote>
                        <h2
                        itemprop="citation"
                        >
                            Un portrait n’est pas une ressemblance. Dès lors qu’une émotion ou qu’un fait est traduit en photo, il cesse d’être un fait pour devenir une opinion.
                            L’inexactitude n’existe pas en photographie. Toutes les photos sont exactes. Aucune d’elles n’est la vérité.
                        </h2>
                    </blockquote>
        
                    <figcaption
                    itemprop="author"
                    >
                        - Richard Avedon
                    </figcaption>
                </figure>
            </article>

            <section
            id="ninacarducci-service"
            >
                <h2>Mes services</h2>

                <div>
                    {#each SERVICES as service}
                        <article
                        itemscope
                        itemtype="https://schema.org/Offer"
                        itemprop="makesOffer"
                        >
                            <div>
                                <h3
                                itemprop="itemOffered"
                                >
                                    {service.title}
                                </h3>
            
                                <p
                                itemprop="description"
                                >
                                    {service.desc}
                                </p>
                            </div>

                            <div
                            itemscope
                            itemtype="https://schema.org/PriceSpecification"
                            itemprop="priceSpecification"
                            >
                                <h4
                                itemprop="price"
                                >
                                    {service.price}
                                </h4>
        
                                <span
                                itemprop="description"
                                >
                                    {service.info}
                                </span>
                            </div>
                        </article>
                    {/each}
                </div>
            </section>

            <article
            class="quote"
            >
                <figure
                itemscope
                itemtype="https://schema.org/Quotation"
                itemprop="subjectOf"
                >
                    <blockquote>
                        <h2
                        itemprop="citation"
                        >
                            De manière inconsciente, je crois, je guette un regard, une expression, des traits ou une nostalgie capable de résumer ou plus exactement de révéler une vie
                        </h2>
                    </blockquote>
        
                    <figcaption 
                    itemprop="author"
                    >
                        - Richard Avedon
                    </figcaption>
                </figure>
            </article>
        </main>

        <footer
        id="ninacarducci-contact"
        >
            <div>
                <section>
                    <h2>Une question ? Une demande de devis ?</h2>
        
                    <p> N’hésitez pas à m’écrire ! Je vous répondrais en moins de 24 heures</p>
                    
                    <form
                    action="#"
                    method="post"
                    >
                        <label>
                            Nom
        
                            <input
                            type="text"
                            name="nom"
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

                <picture>
                    <source
                    media="(min-width: 1180px)"
                    srcset="{$page.url.origin}/images/ninacarducci/camera.png 419w"
                    sizes="419px"
                    >
                    <source media="(min-width: 650px)"
                    srcset="{$page.url.origin}/images/ninacarducci/camera-279.png 279w"
                    sizes="279px"
                    >
                    <source
                    media="(max-width: 650px)"
                    srcset="{$page.url.origin}/images/ninacarducci/camera-159.png 159w"
                    sizes="159px"
                    >
                    <img
                    srcset="
                    {$page.url.origin}/images/ninacarducci/camera.png 419w,
                    {$page.url.origin}/images/ninacarducci/camera-279.png 279w,
                    {$page.url.origin}/images/ninacarducci/camera-159.png 159w"
                    sizes="(min-width: 1180px) 418px, (min-width: 650px) 279px, 158px"
                    src="{$page.url.origin}/images/ninacarducci/camera.png"
                    alt="Caméra"
                    width="419"
                    height="418"
                    >
                </picture>
            </div>

            <div>
                <section>
                    <h2>Adresse</h2>

                    <p
                    itemprop="address"
                    itemscope itemtype="https://schema.org/PostalAddress"
                    >
                        <span
                        itemprop="streetAddress"
                        >
                            68 avenue Alsace-Lorraine
                        </span>
                    <br>
                        <span
                        itemprop="postalCode"
                        >
                            33200
                        </span>
                        <span
                        itemprop="addressLocality"
                        >
                            Bordeaux
                        </span>
                    </p>
                </section>

                <section>
                    <h2>Contact</h2>

                    <p>
                        téléphone
                    <br>
                        <span
                        itemprop="telephone"
                        >
                            05 56 67 78 89
                        </span>
                    </p>
                </section>

                <section>
                    <h2>Horaires</h2>

                    <p
                    itemprop="openingHours"
                    content="Mo, Tu, We, Th, Fr 10:00-19:00"
                    >
                        Du lundi au vendredi
                    <br>
                        de 10h à 19h.
                    </p>
                </section>

                <section>
                    <h2>Tarifs</h2>

                    <p>
                        <span
                        itemprop="priceRange"
                        >
                            50€ à 400€
                        </span>
                    <br>
                        <a
                        href="#ninacarducci-service"
                        >
                            voir mes services
                        </a>
                    </p>
                </section>
            </div>
        </footer>
	</div>
</div>

<!-- #STYLE -->

<style
lang="scss"
>
/* #NINACARDUCCI */

#ninacarducci
{
    width: 100vw;

    background-color: white;
}

    .body
    {
        max-width: 1920px;
        width: 100%;

        margin: auto;

        font-family: 'Inter', sans-serif;
    }

    h1, h2, h3, h4
    {
        font-weight: 500;
        line-height: 1.2;
    }

    a { color: #000; }

    button
    {
        border: none;
        outline: none;

        cursor: pointer;
    }

    header
    {
        display: flex;
        justify-content: space-between;
        align-items: center;

        position: sticky;
        top: 0;
        left: 0;

        z-index: 2;

        width: 100%;

        padding: 30px 100px;

        background-color: #fff;

        box-sizing: border-box;

        h1 { font-size: 1.6em; }

        a { text-decoration: none; }

        nav ul
        {
            display: flex;
            align-items: center;

            width: 100%;

            font-size: 14px;

            li { padding-inline: 10px; }
        }
    }

    .slider
    {
        position: relative;

        width: 100%;
        height: 888px;
        
        nav
        {
            position: absolute;
            bottom: 16px;
            left: 50%;

            z-index: 1;

            transform: translateX(-50%);

            button
            {
                opacity: .5;
    
                width: 30px;
                height: 3px;

                margin: 0 3px;

                background-color: #fff;
                background-clip: padding-box;

                border-top: solid transparent 10px;
                border-bottom: solid transparent 10px;

                box-sizing: content-box;

                transition: opacity .6s ease;
            }
            button.active { opacity: 1; }
        }

        &>div
        {
            position: relative;

            width: 100%;
            height: 100%;

            .slider-item
            {
                position: absolute;
                top: 0;
                left: 0;
        
                width: 100%;
                height: 100%;

                transition: transform ease-in-out;
            }
    
            button
            {
                display: flex;
                justify-content: center;
                align-items: center;
    
                position: absolute;
                top: 0;

                z-index: 1;

                opacity: .5;

                width: 15%;
                height: 100%;

                background-color: transparent;

                &:hover { opacity: 1; }
        
                img
                {
                    vertical-align: middle;
    
                    width: 16px;
                    height: 27px;
                }
            }
            .prev { left: 0; }
            .next { right: 0; }
        }
    }

    #ninacarducci-about
    {
        display: flex;

        position: relative;

        width: 100%;

        padding: 100px;

        background-color: #f6d2b8;

        box-sizing: border-box;

        picture
        {
            z-index: 0;
        
            width: 560px;
            height: 558px;

            margin: 0 20px;

            &::before
            {
                content: '';

                position: absolute;

                bottom: 0;
                left: 0;

                z-index: -1;
    
                width: 374px;
                height: 329px;

                background-color: #e5975f;
            }
        }

        article
        {
            h2 { margin: 1em 0 60px; }

            em
            {
                display: block;
    
                width: 60%;

                margin-bottom: 0.5rem;
        
                font-family: Spectral, sans-serif;
                font-size: 1rem;
                font-weight: 800;
                font-style: italic;
                line-height: 1.2;
            }

            p
            {
                width: 80%;

                font-size: 14px;
            }
        }
    }

    #ninacarducci-gallery
    {
        width: 100%;

        h2
        {
            padding-block: 2em;

            text-align: center;
        }

        button { background-color: transparent; }

        ul
        {
            display: flex;
            justify-content: center;
            flex-wrap: wrap;

            gap: 10px;

            margin-block: 1.5em;

            button
            {
                padding: 0.5rem 1rem;

                color: #000;
                font-size: 1em;
                line-height: 1.5;

                transition: color .15s ease-in-out, background-color .15s ease-in-out;
            }
            button.active { background-color: #beb45a; }
        }

        .container
        {
            display: flex;
            justify-content: center;

            &>div
            {
                display: grid;
                grid-template-columns: repeat(var(--columns), auto);

                gap: 1em;

                img { user-select: none; }
            }
        }

        .modal
        {
            display: flex;
            justify-content: center;
            align-items: center;

            position: fixed;
            top: 0;
            left: 0;

            z-index: 3;

            width: 100vw;
            height: 100vh;

            background-color: rgba(0,0,0,.5);

            &
            >div
            {
                position: relative;

                transition: transform .3s ease-out;

                img
                {
                    max-width: 498px;
            
                    border: solid #fff 1rem;
                    border-radius: 5px;

                    box-sizing: border-box;
                }

                button
                {
                    display: flex;
                    justify-content: center;
                    align-items: center;
            
                    position: absolute;
                    top: 50%;
            
                    &.prev
                    {
                        left: 0;

                        transform: translate(-50%, -50%);
                    }
                    &.next
                    {
                        right: 0;

                        transform: translate(50%, -50%);
                    }

                    width: 30px;
                    height: 30px;

                    background-color: #fff;

                    font-size: 24px;
                }
            }
        }
    }

    .quote
    {
        width: 70%;

        margin: auto;
        padding-block: 3em;

        font-family: Spectral;

        blockquote { margin-bottom: 1rem; }

        figure { margin-bottom: 1rem; }

        h2
        {
            font-size: 2.5rem !important;
            font-style: italic;
            font-weight: 300;
        }

        figcaption
        {
            font-size: 22px;
            font-weight: 800;
        }
    }

    #ninacarducci-service
    {
        position: relative;
    
        width: 100%;

        background-color: #a8d5d8;

        h2
        {
            padding-block: 2em;

            text-align: center;
        }

        &
        >div
        {
            display: flex;
            justify-content: space-between;

            margin: auto;
            padding: 2em 0;

            box-sizing: border-box;

            &::before
            {
                content: '';

                position: absolute;
                bottom: 0;
                left: 0;
    
                background-color: #1c6474;
    
                width: 100%;
                height: 30%;
            }
        }

        article
        {
            display: flex;
            flex-direction: column;
            justify-content: space-between;

            z-index: 1;

            max-width: 390px;
            width: 30%;
            height: 337px;
    
            padding: 1em;

            background-color: #fff;

            box-sizing: border-box;

            h3, h4 { margin-bottom: 0.5rem; }
            h3 { font-size: 1.75rem; }
            h4 { font-size: 1.5rem; }
            p { margin-bottom: 1rem; }
        }
    }

    #ninacarducci-contact
    {
        position: relative;

        padding: 100px;

        background-color: #d8d3a8;

        &>div
        {
            display: flex;

            margin: auto;

            font-size: 1rem;
            line-height: 1.5;

            &>* { z-index: 1; }

            h2 { margin-bottom: 0.5rem; }
        }
        &>div:nth-child(1)
        {
            section { flex: 2; }

            p { margin-bottom: 1rem; }

            form
            {
                display: flex;
                flex-direction: column;

                width: 70%;

                label
                {
                    font-size: inherit;
                    line-height: inherit;
                }

                input,
                textarea
                {
                    width: 100%;
    
                    margin-bottom: 20px;
    
                    background-color: transparent;
    
                    border: 1px solid;

                    font-size: inherit;
                    line-height: inherit;

                    box-sizing: border-box;
                }
                input { height: 2.5em; }
                input[type="text"], input[type="email"] { padding: 1px 2px; }
                input[type=submit]
                {
                    padding: 0.5em 1em;
    
                    background-color: #beb45a;

                    cursor: pointer;
                }
                textarea 
                {
                    height: 5em;
    
                    font-size: 1.2em;
                    line-height: 2.5em;
                }
            }

            picture
            {
                margin-inline: 20px;

                &::before
                {
                    content: '';
        
                    position: absolute;
                    right: 0;
                    bottom: 0;

                    z-index: -1;

                    width: 374px;
                    height: 329px;
                
                    background-color: #beb45a;
                }
            }
        }
        &>div:nth-child(2)
        {
            justify-content: space-between;

            margin-top: 60px;

            section { text-align: center; }

            p
            {
                font-size: inherit;
                line-height: inherit;
            }
        }
    }

    @media (min-width: 576px)
    {
        #ninacarducci-service>div,
        #ninacarducci-contact>div { max-width: 540px; }
    }

    @media all and (max-width: 650px)
    {
        header
        {
            flex-direction: column;
    
            padding-inline: 0;

            nav
            {
                width: 100%;

                li
                {
                    flex: 1;

                    padding-block: 1em;

                    text-align: center;
                }
            }
        }
    
        #ninacarducci-about,
        #ninacarducci-contact { padding: 2em; }

        #ninacarducci-about picture::before,
        #ninacarducci-contact picture::before { height: 150px; }

        #ninacarducci-about picture
        {
            width: 224px;
            height: 223px;
        }

        #ninacarducci-service>div
        {
            align-items: center;

            article { max-width: 90%; }
        }

        #ninacarducci-contact form { width: 100%; }
    }

    @media (min-width: 768px)
    {
        #ninacarducci-service>div,
        #ninacarducci-contact>div { max-width: 720px; }
    }

    @media (min-width: 992px)
    {
        #ninacarducci-service>div,
        #ninacarducci-contact>div { max-width: 960px; }
    }

    @media all and (max-width: 1000px)
    {
        #ninacarducci-about
        {
            flex-direction: column;

            picture,
            h2
            {
                margin-top: 1em;

                text-align: center;
            }
    
            picture
            {
                &::before
                {
                    position: absolute;

                    top: 0;
                    bottom: auto;
                    left: 0;
                
                    width: 100%;
                    height: 30%;
                }
            }

            /* article { width: 100%; } */
        }

        #ninacarducci-service
        {
            &
            >div
            {
                flex-direction: column;

                &::before
                {
                    right: 0;
                    left: auto;

                    width: 30%;
                    height: 100%;
                }
            }
    
            article
            {
                width: 100%;
                max-width: 100%;
                height: auto;

                margin: 2em 0;

                &
                >div:nth-child(1) { margin-bottom: 1em; }
            }
        }


        #ninacarducci-contact
        {
            &>div { flex-direction: column; }
    
            picture
            {
                margin-top: 1em;

                &::before
                {
                    width: 100%;
                    height: 40%;
                }
            }
        }
    }

     @media all and (max-width: 1180px)
    {
        #ninacarducci-about
        {
            align-items: center;
    
            picture
            {
                width: 420px;
                height: 419px;
            }

            h2
            {
                margin-top: 0;
                margin-bottom: 1em;
            }
        }

        #ninacarducci-contact>div { align-items: center; }
    }

    @media (min-width: 1200px)
    {
        h2 { font-size: 2rem; }

        #ninacarducci-service>div,
        #ninacarducci-contact>div { max-width: 1140px; }
    }

    @media (min-width: 1400px)
    {
        #ninacarducci-service>div,
        #ninacarducci-contact>div { max-width: 1320px; }
    }
</style>