<!-- #SCRIPT -->

<script>
// #IMPORTS

    // --JS
    import MAIN_LINKS from '../../assets/js/datas/main_links'

    // --COMPONENT-PAGES
    import Home from '../pages/Home.svelte'

    // --COMPONENT-ELEMENT
    import Console from '../elements/Console.svelte'

// #FUNCTION

    // --EVENT
    function sitemap_click()
    {
        const LINK = MAIN_LINKS[this]

        if (LINK.on) return

        try { MAIN_LINKS.find(link => link.on).on = false } catch { /* recuperer le chemin dans l'url pour définir le lien sélectionné */ }

        MAIN_LINKS[this] = { ...LINK, on: true }
    }
</script>

<!-- #HTML -->

<main>
    <div
    class="pages-wrapper"
    >
        <Home />
    </div>

    <nav
    class="pages-link"
    >
        <ul>
            <!-- svelte-ignore a11y-no-static-element-interactions a11y-missing-attribute -->
            {#each MAIN_LINKS as link, id}
                <li>
                    <a
                    class:selected={link.on}
                    aria-label={link.label}
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
@use '../../assets/scss/styles/media';

/* #MAIN */

main
{
    &, .pages-wrapper { @extend %any; }

    position: relative;

    overflow: hidden;

    background-color: $dark;

    .pages-link
    {
        @include position.placement(fixed, 50%, app.$gap-inline);

        transform: translateY(-50%);

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

        @include media.min(false, $ms3)
        {
            top: 50vh;
            right: auto;
            left: app.$gap-inline;

            transform: translateY(0);
        }
        @include media.min(false, $ms4) { top: 56vh; }
    }
}
</style>