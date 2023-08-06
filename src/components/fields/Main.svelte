<!-- #SCRIPT -->

<script>
// #IMPORTS

    // --COMPONENT-PAGES
    import Home from '../pages/Home.svelte'

    // --COMPONENT-ELEMENT
    import Console from '../elements/Console.svelte'

// #CONSTANTES

    // --ELEMENT-NAV
    const SITEMAP_LINKS =
    [
        {
            on: true,
            content: 'ACCUEIL',
            attributes: { href: '#home', alt: 'Accueil' }
        },
        {
            on: false,
            content: 'PRÉSENTATION',
            attributes: { href: '#presentation', alt: 'Ma présentation' }
        },
        {
            on: false,
            content: 'COMPÉTENCES',
            attributes: { href: '#skills', alt: 'Mes compétences' }
        },
        {
            on: false,
            content: 'PROJETS',
            attributes: { href: '#projects', alt: 'Mes projets' }
        }
    ]

// #FUNCTION

    // --EVENT
    function sitemap_click()
    {
        const LINK = SITEMAP_LINKS[this]

        if (LINK.on) return

        try { SITEMAP_LINKS.find(link => link.on).on = false } catch { /* recuperer le chemin dans l'url pour définir le lien sélectionné */ }

        SITEMAP_LINKS[this] = { ...LINK, on: true }
    }
</script>

<!-- #HTML -->

<main>
    <Home />

    <nav
    class="site-map"
    >
        <ul>
            <!-- svelte-ignore a11y-no-static-element-interactions a11y-missing-attribute -->
            {#each SITEMAP_LINKS as link, id}
                <li>
                    <a
                    class:selected={link.on}
                    {...link.attributes}
                    on:click|preventDefault={sitemap_click.bind(id)}
                    >
                        {link.content}
                    </a>
                </li>
            {/each}
        </ul>
    </nav>

   <Console />
</main>

<!-- #STYLE -->

<style
lang="scss"
>
/* #USES */

@use '../../assets/scss/app';

@use '../../assets/scss/styles/position';
@use '../../assets/scss/styles/size';
@use '../../assets/scss/styles/font';

/* #MAIN */

main
{
    @extend %any;

    overflow: hidden;

    background-color: $dark;

    .site-map
    {
        @include position.placement(fixed, 50vh, auto, auto, app.$gap-inline);

        width: fit-content;
        height: fit-content;

        a
        {
            @include font.interact($light, 2.4rem, 1.5);

            @extend %any;
            @extend %selected;

            position: relative;

            display: inline-block;
    
            transform: rotate(-.7deg);
    
            margin-bottom: .5rem;
            padding-inline: 1rem;

            box-sizing: border-box;

            text-decoration: none;
        }
    }
}
</style>