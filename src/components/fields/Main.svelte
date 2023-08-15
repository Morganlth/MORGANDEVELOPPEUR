<!-- #SCRIPT -->

<script>
// #IMPORTS

    // --CONTEXT
    import { APP } from '../../App.svelte'

    // --COMPONENT-PAGES
    import Home from '../pages/Home.svelte'

    // --COMPONENT-ELEMENT
    import Console from '../elements/Console.svelte'

// #VARIABLE

    // --APP-CONTEXT
    let app_FREEZE = APP.app_FREEZE
</script>

<!-- #HTML -->

<main
class:freeze={$app_FREEZE}
>
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
/* #USES */

@use '../../assets/scss/styles/utils';
@use '../../assets/scss/styles/size';

/* #MAIN */

main
{
    @extend %any;
    @extend %scroll-bar;

    position: relative;

    overflow: hidden scroll;

    background-color: $dark;

    &.freeze { overflow: hidden; }

    .pages-wrapper
    {
        width: 100%;
        height: 300vh;
    }
}
</style>