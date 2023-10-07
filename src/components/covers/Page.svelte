<!-- #MAP

    PAGE
        WRAPPER
            :COMPONENT
            ?NAV

-->

<!-- #SCRIPT -->

<script>
// #EXPORT

    // --PROP
    export let prop_PAGE = {}

// #IMPORTS

    // --COMPONENT-COVER
    import Wrapper from './Wrapper.svelte'

    // --COMPONENT-ELEMENT
    import Nav from '../elements/Nav.svelte'

// #VARIABLES

    // --ELEMENT-PAGE
    let
    page_CHARGED = false,

    page_ELEMENT,

    page_$NAV_CLICK

    // --ELEMENT-TITLE
    let title_HEIGHT = 0

// #FUNCTION

    // --EVENT
    function nav_eClick({detail})
    {
        const ID = detail.id
    
        page_$NAV_CLICK(detail)

        prop_PAGE.nav[ID] = prop_PAGE.nav[ID]
    }
</script>

<!-- #HTML -->

<div
id={prop_PAGE.name}
class="page"
style:z-index={prop_PAGE.focus ? 1 : 0}
>
    <Wrapper
    prop_CHARGED={page_CHARGED}
    prop_FOCUS={prop_PAGE.focus}
    prop_INTRO={prop_PAGE.intro}
    prop_ELEMENT={page_ELEMENT}
    {...prop_PAGE.wrapper}
    bind:title_HEIGHT
    >
        <svelte:component
        this={prop_PAGE.component}
        {...prop_PAGE.props}
        bind:page_CHARGED
        bind:page_ELEMENT
        bind:page_$NAV_CLICK
        />

        {#if page_$NAV_CLICK instanceof Function && prop_PAGE.focus}
            <Nav
            prop_INTRO={prop_PAGE.intro}
            prop_TRANSLATE_Y={title_HEIGHT}
            prop_ITEMS={prop_PAGE.nav}
            on:click={nav_eClick}
            />
        {/if}
    </Wrapper>
</div>

<!-- #STYLE -->

<style
lang="scss"
>
/* #USES */

@use '../../assets/scss/styles/position';
@use '../../assets/scss/styles/size';

/* #PAGE */

.page
{
    @include position.placement(absolute, 0, 0, 0, 0);

    @extend %any;
}
</style>