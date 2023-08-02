<!-- #SCRIPT -->

<script>
// #IMPORTS

    // --COMPONENT-PAGES
    import Home from '../pages/Home.svelte'

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
</main>

<!-- #STYLE -->

<style
lang="scss"
>
/* #USES */

@use '../../assets/scss/_app';

@use '../../assets/scss/styles/_position';
@use '../../assets/scss/styles/_size';
@use '../../assets/scss/styles/_font';

/* #MAIN */

main
{
    @extend %any;

    overflow: hidden;

    background-color: $dark;

    .site-map
    {
        @include position.placement(fixed, 50vh, 0, 0, app.$gap-inline);

        width: fit-content;
        height: fit-content;

        a
        {
            &::before
            {
                @include position.placement(absolute, 50%, 0, 0, 0, true);

                transform: translateX(-50%) scaleX(.05);

                width: 100%;
                height: 0;
                
                border-top: solid $light 1px;
            }

            @include font.interact($light, 2.4rem, 1.5);

            @extend %any;

            position: relative;

            display: inline-block;
    
            transform: rotate(-.7deg);

            opacity: .9;
    
            margin-bottom: .5rem;
            padding-inline: 1rem;

            box-sizing: border-box;

            text-decoration: none;

            transition: opacity .3s;

            &.selected
            {
                &::before
                {
                    border-top-color: $primary;
    
                    animation: selected-anim-before .3s ease-out;
    
                    @keyframes selected-anim-before { 100% { transform: scaleX(1); } }
                }

                opacity: 1;

                animation: selected-anim .4s forwards;

                @keyframes selected-anim
                {
                    40% { color: $indicator; }
                    100% { color: $primary; }    
                }

                &::after
                {
                    animation: selected-anim-after .2s linear .25s forwards;

                    @keyframes selected-anim-after { 100% { transform: scale(1); } }
                }
            }

            &::after
            {
                @include position.placement(absolute, -1px, 0, 0, 0, true);
    
                @extend %any;

                transform: scale(1, 0);

                border: solid $primary 1px;
                
                box-shadow: 0 0 5px $primary;
            }
        }
    }
}
</style>