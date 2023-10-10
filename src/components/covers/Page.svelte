<!-- #MAP

-PROCESS
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

    // --CONTEXT
    import { PROCESS } from '../../App.svelte'

    // --SVELTE
    import { onMount } from 'svelte'

    // --COMPONENT-COVER
    import Wrapper from './Wrapper.svelte'

    // --COMPONENT-ELEMENT
    import Nav from '../elements/Nav.svelte'

// #VARIABLES

    // --ELEMENT-PAGE
    let
    page_CHARGED = false,

    page_ELEMENT,

    page_process

    // --ELEMENT-TITLE
    let title_HEIGHT = 0

    // --ELEMENT-NAV
    let nav_e$Click

// #FUNCTIONS

    // --SET
    function page_set() { PROCESS.process_push(prop_PAGE.process, page_process) }

    // --EVENT
    function nav_eClick({detail})
    {
        const ID = detail.id
    
        nav_e$Click(detail)

        prop_PAGE.nav[ID] = prop_PAGE.nav[ID]
    }

// #CYCLE

onMount(page_set)
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
        {#if nav_e$Click instanceof Function && prop_PAGE.focus}
            <Nav
            prop_INTRO={prop_PAGE.intro}
            prop_TRANSLATE_Y={title_HEIGHT}
            prop_ITEMS={prop_PAGE.nav}
            on:click={nav_eClick}
            />
        {/if}

        <svelte:component
        this={prop_PAGE.component}
        {...prop_PAGE.props}
        bind:page_CHARGED
        bind:PAGE_ELEMENT={page_ELEMENT}
        bind:page_process
        bind:nav_e$Click
        />
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