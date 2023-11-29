<!----------------------------------------------- #||--ninacarducci--|| -->


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
    {#each prop_DATA.meta ?? {} as meta}
        <meta
        property="og:{meta.property}"
        content={meta.content}
        >
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
            href="/projects/ninacarducci"
            alt={prop_DATA.desc}
            data-sveltekit-reload
            >
                <h1
                itemprop="name"
                >
                    Nina Carducci
                </h1>
            </a>
        
            <nav>
                <ul>
                    {#each prop_DATA.nav ?? [] as a}
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
                            src="/images/ninacarducci/instagram.png"
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
                <div
                itemscope
                itemtype="https://schema.org/ImageGallery"
                itemprop="subjectOf"
                >
                    {#each prop_DATA.slider ?? [] as item}
                        <div
                        class="slider-item"
                        style:transition-duration="{item.duration}ms"
                        style:transform="translateX({item.translateX - 100}%)"
                        >
                            <picture>
                                <source
                                media="(min-width: {BREAKPOINTS.ms6}px)"
                                srcset="/images/ninacarducci/slider/{item.src}-1920.jpg 1920w"
                                sizes="1920px"
                                >
            
                                {#each [6, 5, 4] as bp}
                                    <source
                                    media="(min-width: {BREAKPOINTS['ms' + (bp - 1)]}px)"
                                    srcset="/images/ninacarducci/slider/{item.src}-{BREAKPOINTS['ms' + bp]}.jpg {BREAKPOINTS['ms' + bp]}w"
                                    sizes="{BREAKPOINTS['ms' + bp]}px"
                                    >
                                {/each}
                
                                <source
                                srcset="/images/ninacarducci/slider/{item.src}-{BREAKPOINTS.ms3}.jpg {BREAKPOINTS.ms3}w"
                                sizes="{BREAKPOINTS.ms3}px"
                                >
                                <img
                                srcset="
                                /images/ninacarducci/slider/{item.src}-1920.jpg 1920w,
                                /images/ninacarducci/slider/{item.src}-1440.jpg {BREAKPOINTS.ms6}w,
                                /images/ninacarducci/slider/{item.src}-1024.jpg {BREAKPOINTS.ms5}w,
                                /images/ninacarducci/slider/{item.src}-768.jpg {BREAKPOINTS.ms4}w,
                                /images/ninacarducci/slider/{item.src}-425.jpg {BREAKPOINTS.ms3}w"
                                sizes="
                                (min-width: {BREAKPOINTS.ms6 + 1}px) 1920px,
                                (min-width: {BREAKPOINTS.ms5 + 1}px) {BREAKPOINTS.ms6}px,
                                (min-width: {BREAKPOINTS.ms4 + 1}px) {BREAKPOINTS.ms5}px,
                                (min-width: {BREAKPOINTS.ms3 + 1}px) {BREAKPOINTS.ms4}px,
                                425px"
                                src="/images/ninacarducci/slider/{item.src}-1920.jpg"
                                alt={item.alt}
                                decoding="sync"
                                itemprop="image"
                                >
                            </picture>
                        </div>
                    {/each}
                </div>

                {#each ['prev', 'next'] as btn}
                    <button
                    class={btn}
                    type="button"
                    on:click={slider_eClick.bind(null, btn === 'prev' ? -1 : 1)}
                    >
                        <img
                        src="/images/ninacarducci/icons/carousel-control-{btn}-icon.svg"
                        alt="{btn} button slider"
                        width="16"
                        height="27"
                        >
                    </button>
                {/each}

                <nav>
                    {#each Array(prop_DATA.slider?.length ?? 0) as _, id}
                        <button
                        type="button"
                        class:active={slider_TARGET === id}
                        on:click={slider_eClick2.bind(null, id)}
                        >
                        </button>
                    {/each}
                </nav>
            </div>
        
            <div
            id="ninacarducci-about"
            >
                <picture>
                    <source
                    media="(min-width: {BREAKPOINTS.ms5}px)"
                    srcset="/images/ninacarducci/nina.png 560w"
                    sizes="560px"
                    >
                    <source
                    media="(min-width: {BREAKPOINTS.ms4}px)"
                    srcset="/images/ninacarducci/nina-420.png 420w"
                    sizes="420px"
                    >
                    <source
                    srcset="/images/ninacarducci/nina-224.png 224w"
                    sizes="224px"
                    >
                    <img
                    srcset="
                    /images/ninacarducci/nina.png 560w,
                    /images/ninacarducci/nina-420.png 420w,
                    /images/ninacarducci/nina-224.png 224w"
                    sizes="(min-width: {BREAKPOINTS.ms5}px) 560px, (min-width: {BREAKPOINTS.ms4}px) 420px, 224px"
                    src="/images/ninacarducci/nina-224.png"
                    alt="Nina Carducci"
                    decoding="async"
                    itemprop="image"
                    >
                </picture>
        
                <article
                itemprop="description"
                >
                    <h2>{prop_DATA.description.title}</h2>
            
                    <em>{prop_DATA.description.intro}</em>

                    <p>{prop_DATA.description.text}</p>
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
                    <div>
                        {#each gallery_GALLERY as img (img.id)}
                            <button
                            type="button"
                            on:click={gallery_eClick2.bind(null, img.id)}
                            >
                                <picture>
                                    <source
                                    media="(min-width: {BREAKPOINTS.ms6}px)"
                                    srcset="/images/ninacarducci/gallery/{img.src}-424.jpg 424w"
                                    sizes="424px"
                                    >
                                    <source
                                    media="(min-width: {BREAKPOINTS.ms5}px)"
                                    srcset="/images/ninacarducci/gallery/{img.src}-304.jpg 304w"
                                    sizes="304px"
                                    >
                                    <source
                                    media="(min-width: {BREAKPOINTS.ms4}px)"
                                    srcset="/images/ninacarducci/gallery/{img.src}-224.jpg 224w"
                                    sizes="224px"
                                    >
                                    <source
                                    media="(min-width: {BREAKPOINTS.ms3}px)"
                                    srcset="/images/ninacarducci/gallery/{img.src}-194.jpg 194w"
                                    sizes="194px"
                                    >
                                    <source
                                    srcset="/images/ninacarducci/gallery/{img.src}-254.jpg 254w"
                                    sizes="254px"
                                    >
                                    <img
                                    srcset="
                                    /images/ninacarducci/gallery/{img.src}-424.jpg 424w,
                                    /images/ninacarducci/gallery/{img.src}-304.jpg 304w,
                                    /images/ninacarducci/gallery/{img.src}-254.jpg 254w,
                                    /images/ninacarducci/gallery/{img.src}-224.jpg 224w,
                                    /images/ninacarducci/gallery/{img.src}-194.jpg 194w"
                                    sizes="
                                    (min-width: {BREAKPOINTS.ms6}px) 424px,
                                    (min-width: {BREAKPOINTS.ms5}px) 304px,
                                    (min-width: {BREAKPOINTS.ms4}px) 224px,
                                    (min-width: {BREAKPOINTS.ms3}px) 194px,
                                    254px"
                                    src="/images/ninacarducci/gallery/{img.src}.jpg"
                                    alt={img.filter + ' ' + img.alt}
                                    width="424"
                                    height="424"
                                    decoding="async"
                                    itemprop="image"
                                    >
                                </picture>
                            </button>
                        {/each}
                    </div>
                </div>

                {#if gallery_TARGET != null}
                    <!-- svelte-ignore a11y-click-events-have-key-events a11y-no-static-element-interactions -->
                    <div
                    class="modal"
                    transition:transition_fade={{ duration: 200 }}
                    on:click={modal_eClick}
                    >
                        <div>
                            <img
                            src="/images/ninacarducci/gallery/{(prop_DATA.gallery ?? [])[gallery_TARGET]?.src}.jpg"
                            alt={(prop_DATA.gallery ?? [])[gallery_TARGET]?.alt}
                            width="498"
                            />

                            {#if gallery_GALLERY.length > 1}
                                {#each ['prev', 'next'] as btn}
                                    <button
                                    class={btn}
                                    type="button"
                                    on:click|stopPropagation={modal_eClick2.bind(null, btn === 'prev' ? -1 : 1)}
                                    >
                                        {btn === 'prev' ? '<' : '>'}
                                    </button>
                                {/each}
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
                            {prop_DATA.quote1.value}
                        </h2>
                    </blockquote>
        
                    <figcaption
                    itemprop="author"
                    >
                        - {prop_DATA.quote1.author}
                    </figcaption>
                </figure>
            </article>

            <section
            id="ninacarducci-service"
            >
                <h2>{prop_DATA.services.title}</h2>

                <div>
                    {#each prop_DATA.services.contents ?? [] as service}
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
                            {prop_DATA.quote2.value}
                        </h2>
                    </blockquote>
        
                    <figcaption 
                    itemprop="author"
                    >
                        - {prop_DATA.quote2.author}
                    </figcaption>
                </figure>
            </article>
        </main>

        <footer
        id="ninacarducci-contact"
        >
            <div>
                <section>
                    <h2>{prop_DATA.contact.title}</h2>
        
                    <p>{prop_DATA.contact.text}</p>
                    
                    <form
                    action="#"
                    method="post"
                    onsubmit="return false"
                    >
                        {#each prop_DATA.contact.form ?? [] as input}
                            {@const {value, textarea, ...rest} = input}
                            <label>
                                {value}

                                {#if textarea}
                                    <textarea
                                    {...rest}
                                    ></textarea>
                                {:else}
                                    <input
                                    {...rest}
                                    >
                                {/if}
                            </label>
                        {/each}

                        <input
                        type="submit"
                        value={prop_DATA.contact.formSubmit}
                        >
                    </form>
                </section>

                <picture>
                    <source
                    media="(min-width: {BREAKPOINTS.ms5}px)"
                    srcset="/images/ninacarducci/camera.png 419w"
                    sizes="419px"
                    >
                    <source
                    media="(min-width: {BREAKPOINTS.ms4}px)"
                    srcset="/images/ninacarducci/camera-279.png 279w"
                    sizes="279px"
                    >
                    <source
                    srcset="/images/ninacarducci/camera-159.png 159w"
                    sizes="159px"
                    >
                    <img
                    srcset="
                    /images/ninacarducci/camera.png 419w,
                    /images/ninacarducci/camera-279.png 279w,
                    /images/ninacarducci/camera-159.png 159w"
                    sizes="(min-width: {BREAKPOINTS.ms5}px) 418px, (min-width: {BREAKPOINTS.ms4}px) 279px, 158px"
                    src="/images/ninacarducci/camera.png"
                    alt="Camera video"
                    width="419"
                    height="418"
                    decoding="async"
                    >
                </picture>
            </div>

            <div>
                {#each prop_DATA.infos as info}
                    {@const {title, textAttributes, contents} = info}
                    <section>
                        <h2>{title}</h2>

                        <p
                        {...(textAttributes ?? {})}
                        >
                            {#each contents as content, i}
                                {@const {link, value, attributes} = content}
                                {#if attributes instanceof Object}
                                    <svelte:element
                                    this={link ? 'a' : 'span'}
                                    {...attributes}
                                    >
                                        {value}
                                    </svelte:element>
                                {:else}
                                    {value}
                                {/if}

                                {#if !i}
                                    <br>
                                {/if}
                            {/each}
                        </p>
                    </section>
                {/each}
            </div>
        </footer>
	</div>
</div>


<!-- #|-SCRIPT-| -->

<script>

// #\-IMPORTS-\

    // --DATA

    // --SVELTE
    import { onMount, onDestroy } from 'svelte'

    // --LIB
    import BREAKPOINTS         from '$lib/breakpoints'
    import { wait_getDelay }   from '$lib/wait'
    import { transition_fade } from '$lib/transition'

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
    const SLIDER_DURATION = wait_getDelay(36) // +- 600ms

    const GALLERY_FILTERS = gallery_getFilters()


// #\-VARIABLES-\

    // --CONTEXTS

    // --OUTSIDE

    // --THIS

    // --INSIDE
    let
    slider_TARGET = 0
    ,
    slider_INTERVAL
    ,
    slider_LAST = +new Date()

    let
    gallery_TARGET = null
    ,
    gallery_GALLERY = prop_DATA.gallery ?? []


// #\-REATIVES-\

    // --CONTEXTS

    // --OUTSIDE

    // --THIS

    // --INSIDE


// #\-FUNCTIONS-\

//=======@LIFE|

    // --SVELTE
    onMount(ninacarducci_set), onDestroy(ninacarducci_destroy)

    // --SET
    function ninacarducci_set()
    {
        slider_setInterval()
        slider_update(0)
    }

    function slider_setInterval() { slider_INTERVAL = setInterval(slider_update.bind(null, 1), 6000 + SLIDER_DURATION) }

    // --GET
    function gallery_getFilters()
    {
        const DEFAULT_FILTER = prop_DATA.defaultFilter
    
        return prop_DATA.gallery?.reduce((array, img) =>
        {
            const
            FILTER = img.filter ?? DEFAULT_FILTER,
            F      = array.find(_ => _.value === FILTER)
        
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
    function slider_update(n /* -1: prev | 1: next */)
    {
        const LENGTH = prop_DATA.slider?.length ?? 0

        for (let i = 0; i < LENGTH; i++)
        {
            const
            SLIDE = prop_DATA.slider[i],
            MAX   = LENGTH - 1
            
            let
            position = (SLIDE.position ?? i) - n,
            duration = SLIDER_DURATION

            const ABS_P = Math.abs(position)

            if (ABS_P >= MAX)
            {
                position = (ABS_P - LENGTH) * Math.sign(position)
                duration = 0
            }

            if (position === 0) slider_TARGET = i

            prop_DATA.slider[i] = { ...SLIDE, translateX: i * -100 + position * 100, position, duration }
        }
    }

    function slider_updateTo(n)
    {
        const NOW = +new Date()
        
        if (NOW - slider_LAST < SLIDER_DURATION) return

        slider_LAST = NOW

        slider_destroyInterval()
        slider_update(n)
        slider_setInterval()
    }

    function gallery_update(id)
    {
        gallery_GALLERY =
        !id
        ? prop_DATA.gallery ?? []
        : prop_DATA.gallery?.filter(img => img.filter_ID === id)
    }

    function gallery_updateFilter(id)
    {
        for (let i = 0; i < GALLERY_FILTERS.length; i++)
        {
            const FILTER = GALLERY_FILTERS[i]
        
            GALLERY_FILTERS[i] = { ...FILTER, on: FILTER.id === id }
        }
    }

    function modal_update(n /* -1: prev | 1: next */)
    {
        const LENGTH = gallery_GALLERY.length

        let i = -1

        while (++i < LENGTH)
            if (gallery_GALLERY[i].id == gallery_TARGET)
            {
                i += n

                gallery_TARGET = gallery_GALLERY[i < 0 ? LENGTH - 1 : i >= LENGTH ? 0 : i].id
        
                break
            }
    }

    // --DESTROY
    function ninacarducci_destroy() { slider_destroyInterval() }

    function slider_destroyInterval() { clearInterval(slider_INTERVAL) }


//=======@COMMANDS|

    // --*


//=======@EVENTS|

    // --*
    function slider_eClick(d) { slider_updateTo(d) }

    function slider_eClick2(id = 0) { slider_updateTo((prop_DATA.slider ?? [])[id].position ?? 0 * -1) }

    function gallery_eClick(id)
    {
        gallery_update(id)
        gallery_updateFilter(id)
    }

    function gallery_eClick2(id) { gallery_TARGET = id }

    function modal_eClick() { gallery_TARGET = null }

    function modal_eClick2(n) { modal_update(n) }


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
    @use '../../../../../assets/scss/styles/utils';
    @use '../../../../../assets/scss/styles/display';

    /* --MEDIA */
    @use '../../../../../assets/scss/styles/media';


/* #\-VARIABLES-\ */

    /* --* */
    $light-color: #FFF;

    $about-p-color: #f6d2b8;
    $about-s-color: #e5975f;

    $service-p-color: #a8d5d8;
    $service-s-color: #1c6474;

    $contact-p-color: #d8d3a8;
    $contact-s-color: #beb45a;


/* #\-THIS-\ */

#ninacarducci
{
    &, .body { width: 100%; }

    background-color: $light-color;

    .body
    {
        max-width: 1920px;

        margin: auto;

        font-family: 'Inter', sans-serif;
    }

    h1, h2, h3, h4
    {
        font-weight: 500;
        line-height: 1.2;
    }

    h2 { font-size: 3.2rem; }

    a { color: #000; }

    header
    {
        &, nav ul
        {
            align-items: center;
    
            width: 100%;
        }

        @include utils.placement(sticky, $top: 0, $right: 0, $left: 0, $z: 2);
    
        @extend %f-column;

        justify-content: space-between;

        padding-block: 3rem;

        background-color: $light-color;

        box-sizing: border-box;

        h1 { font-size: 2.5rem; }

        nav ul
        {
            display: flex;

            font-size: 1.4rem;

            li
            {
                flex: 1;
    
                padding: 1.6rem 1rem;

                text-align : center;
                white-space: nowrap;
            }

            img
            {
                width : 2rem;
                height: 2rem;
            }
        }
    }

    .slider
    {
        &, &>div, .slider-item
        {
            width : 100%;
            height: fit-content;
        }

        position: relative;

        max-height: 888px;

        &>div
        {
            display: flex;

            transform: translateX(100%);
        }

        .slider-item
        {
            @extend %f-j-center;

            flex-shrink: 0;
        
            overflow: clip;

            transition: transform ease-in-out;

            img
            {
                display: block;

                width : auto;
                height: auto;
            }
        }

        &>button
        {
            @include utils.placement(absolute, $top: 0, $z: 1);
    
            @extend %f-center;

            opacity: .5;

            width : 15%;
            height: 100%;

            background-color: transparent;

            &.prev { left: 0; }
    
            &.next { right: 0; }

            &:hover { opacity: 1; }
    
            img
            {
                vertical-align: middle;

                width : 1.6rem;
                height: 2.7rem;
            }
        }

        nav
        {
            @include utils.placement(absolute, $bottom: 16px, $left: 50%, $z: 1);

            transform: translateX(-50%);

            button
            {
                $border: solid transparent 1rem;
            
                opacity: .5;
    
                width : 3rem;
                height: 3px;

                margin-inline: 3px;

                background-color: $light-color;
                background-clip : padding-box;

                border-top   : $border;
                border-bottom: $border;

                box-sizing: content-box;

                transition: opacity .6s ease;

                &.active { opacity: 1; }
            }
        }
    }

    #ninacarducci-about, #ninacarducci-contact
    {
        padding: 10rem;

        picture::before { height: 150px; }
    }

    #ninacarducci-about, #ninacarducci-service>div, #ninacarducci-contact>div
    {
        @extend %f-column;
        
        align-items: center;
    }

    #ninacarducci-about
    {
        &, picture::before { width: 100%; }

        position: relative;

        background-color: $about-p-color;

        box-sizing: border-box;

        picture, article h2 { margin-top: 1.6rem; }

        picture
        {
            &::before
            {
                @include utils.placement(absolute, $top: 0, $left: 0, $z: -1, $pe: true);

                height: 30%;

                background-color: $about-s-color;
            }

            z-index: 0;
        
            width : 224px;
            height: 223px;
        }

        article
        {
            h2
            {
                margin-bottom: 1.6rem;

                text-align: center;
            }

            em, p { font-size: 1.6rem; }

            em
            {
                display: block;
    
                width: 60%;

                margin-bottom: .8rem;
        
                font-family: Spectral, sans-serif;
                font-weight: 800;
                font-style : italic;
                line-height: 1.2;
            }

            p { width: 80%; }
        }
    }

    #ninacarducci-gallery
    {
        width: 100%;

        h2
        {
            padding-block: 6.4rem;

            text-align: center;
        }

        button { background-color: transparent; }

        ul, .container { @extend %f-j-center; }

        ul
        {
            flex-wrap: wrap;

            gap: 1rem;

            margin-block: 2.4rem;

            button
            {
                padding: .8rem 1.6rem;

                color      : #000;
                font-size  : 1.6rem;
                line-height: 1.5;

                transition: color .15s ease-in-out, background-color .15s ease-in-out;

                &.active { background-color: $contact-s-color; }
            }
        }

        .container>div
        {
            display              : grid;
            grid-template-columns: 1fr;

            gap: 1.6rem;

            width    : fit-content;
            max-width: 100%;

            button
            {
                width : 254px;
                height: 254px;
            }

            img
            {
                aspect-ratio: 1 /  1;

                width : auto;
                height: auto;
            }
        }

        .modal
        {
            @include utils.placement(fixed, 0, 0, 0, 0, 3);

            @extend %f-j-center;
            @extend %any-size;

            background-color: rgba(0, 0, 0, .5);

            &>div
            {
                $border-size: 1rem;
        
                @extend %f-a-center;

                height: 100%;

                img
                {
                    order: 2;
    
                    width     : auto;
                    max-width : min(90vw, 498px);
                    max-height: 90vh;

                    object-fit: contain;
            
                    border       : solid $light-color $border-size;
                    border-radius: .5rem;

                    box-sizing: border-box;
                }

                button
                {
                    @extend %f-center;
        
                    &.prev
                    {
                        order: 1;
            
                        transform: translateX($border-size);
                    }
                    &.next
                    {
                        order: 3;
    
                        transform: translateX(-$border-size);
                    }

                    width : 3rem;
                    height: 3rem;

                    background-color: $light-color;

                    font-size: 2.4rem;
                }
            }
        }
    }

    .quote
    {
        width: 70%;

        margin       : auto;
        padding-block: 4.8rem;

        font-family: Spectral;

        blockquote { margin-bottom: 1rem; }

        figure { margin-bottom: 1rem; }

        h2
        {
            font-size  : 4rem !important;
            font-style : italic;
            font-weight: 300;
        }

        figcaption
        {
            font-size  : 2.2rem;
            font-weight: 800;
        }
    }

    #ninacarducci-service
    {
        &, article { width: 100%; }

        position: relative;

        background-color: $service-p-color;

        h2
        {
            padding-block: 6.4rem;

            text-align: center;
        }

        &>div, article
        {
            justify-content: space-between;

            box-sizing: border-box;
        }

        &>div
        {
            &::before
            {
                @include utils.placement(absolute, $right: 0, $bottom: 0, $pe: true);
    
                background-color: $service-s-color;

                width : 30%;
                height: 100%;
            }

            width: 94%;

            margin       : auto;
            padding-block: 3.2rem;
        }

        article
        {
            @extend %f-column;
    
            z-index: 1;

            max-width: 100%;
            height   : auto;
    
            margin-block: 3.2rem;
            padding     : 1.6rem;

            background-color: $light-color;

            font-size: 1.6rem;

            &>div:nth-child(1) { margin-bottom: 1.6rem; }

            h3, h4 { margin-bottom: .8rem; }
    
            h3 { font-size: 2.8rem; }

            h4 { font-size: 2.4rem; }
    
            p { margin-bottom: 1.6rem; }
        }
    }

    #ninacarducci-contact
    {
        position: relative;

        background-color: $contact-p-color;

        &>div
        {
            margin: auto;

            font-size  : 1.6rem;
            line-height: 1.5;

            &>* { z-index: 1; }

            h2 { margin-bottom: .8rem; }
        }

        &>div:nth-child(1)
        {
            section { flex: 2; }

            p { margin-bottom: 1.6rem; }

            form
            {
                &, input, textarea { width: 100%; }
        
                @extend %f-column;

                label, input
                {
                    font-size  :   inherit;
                    line-height: inherit;
                }

                input, textarea
                {
                    margin-bottom: 2rem;
                    padding      : .8rem 1.6rem;
    
                    background-color: transparent;
    
                    border: 1px solid;

                    box-sizing: border-box;
                }
    
                input { height: 4rem; }
    
                input[type="submit"]
                {
                    background-color: $contact-s-color;

                    cursor: pointer;
                }

                textarea 
                {
                    max-width: 100%;
                    height   : 9.6rem;
    
                    font-size  :   1.2em;
                    line-height: 2.5em;
                }
            }

            picture
            {
                &::before
                {
                    @include utils.placement(absolute, $bottom: 0, $right: 0, $z: -1, $pe: true);

                    width : 100%;
                    height: 150px;
                
                    background-color: $contact-s-color;
                }

                margin-top   : 1.6rem;
                margin-inline: 2rem;

                img
                {
                    width : auto;
                    height: auto;
                }
            }
        }

        &>div:nth-child(2)
        {
            justify-content: space-between;

            margin-top: 6rem;

            section
            {
                flex: 1;

                margin-top: 1rem;

                text-align: center;
            }

            p
            {
                font-size  : inherit;
                line-height: inherit;
            }
        }
    }

    @include media.min($ms3)
    {
        #ninacarducci-gallery .container>div
        {
            grid-template-columns: repeat(2, 1fr);

            button
            {
                width : 194px;
                height: 194px;
            }
        }
    }
    @include media.min($ms4)
    {
        header
        {
            flex-direction: row;

            padding-inline: 10rem;

            nav li { flex: auto !important; }
        }
    
        #ninacarducci-about, #ninacarducci-contact
        {
            padding: 10rem;

            picture::before { height: 329px; }
        }

        #ninacarducci-about picture
        {
            width : 420px;
            height: 419px;
        }

        #ninacarducci-gallery .container>div
        {
            grid-template-columns: repeat(3, 1fr);

            button
            {
                width : 224px;
                height: 224px;
            }
        }

        #ninacarducci-contact>div:nth-child(1)
        {
            form { width: 70%; }

            picture::before { height: 40%; }
        }
    }

    @include media.min($ms5)
    {
        #ninacarducci-about, #ninacarducci-service>div, #ninacarducci-contact>div
        {
            flex-direction: row;
            align-items   : start;
        }
    
        #ninacarducci-about
        {
            picture
            {
                &::before
                {
                    top   : auto;
                    bottom: 0;
    
                    width: 374px;
                }

                width : 560px;
                height: 558px;

                margin: 0 2rem;
            }

            article h2
            {
                margin-block: 3rem 6rem;

                text-align: left;
            }
        }

        #ninacarducci-gallery .container>div button
        {
            width : 304px;
            height: 304px;
        }

        #ninacarducci-service>div
        {
            &::before
            {
                left: 0;

                width : 100%;
                height: 30%;
            }

            article
            {
                width    : 30%;
                max-width: 390px;
                height   : 337px;
            }
        }

        #ninacarducci-contact>div:nth-child(1) picture
        {
            &::before
            {
                width : 374px;
                height: 329px;
            }
    
            flex: 1;

            margin-top: 0;
        }
    }

    @include media.min($ms6)
    {
        #ninacarducci-gallery .container>div button
        {
            width : 424px;
            height: 424px;
        }

        #ninacarducci-service>div, #ninacarducci-contact>div { max-width: 1320px; }
    }
}


</style>