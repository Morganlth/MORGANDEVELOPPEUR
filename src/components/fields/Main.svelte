<!-- #SCRIPT -->

<script>
// #IMPORTS

    // --COMPONENT-PAGES
    import Home from '../pages/Home.svelte'

    // --COMPONENT-ELEMENT
    import Console from '../elements/Console.svelte'
</script>

<!-- #HTML -->

<main>
    <div
    class="pages-wrapper"
    >
        <Home />
    </div>

   <Console />
</main>

<!-- #STYLE -->

<style
lang="scss"
>
/* #USE */

@use '../../assets/scss/styles/size';

/* #MAIN */

main
{
    &, .pages-wrapper { @extend %any; }

    position: relative;

    overflow: hidden;

    background-color: $dark;
}
</style>