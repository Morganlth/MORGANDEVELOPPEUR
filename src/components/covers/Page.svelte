<!-- #MAP

-APP
-PROCESS
    PAGE
        WRAPPER
            INFO
            TITLE
            ?NAV
            :COMPONENT

-->

<!-- #SCRIPT -->

<script>
// #EXPORTS

    // --PROPS
    export let
    prop_ID = void 0,

    prop_NAME = '',

    prop_FOCUS = false,
    prop_INTRO = false,

    prop_Z = 0,

    prop_COMPONENT = {},
    prop_INFO = '',
    prop_TITLE = {},
    prop_NAV = {},
    prop_QUOTE = {},
    prop_PROPS = {},
    prop_PROCESS = {}

// #IMPORTS

    // --CONTEXTS
    import { APP, PROCESS } from '../../App.svelte'

    // --SVELTE
    import { onMount } from 'svelte'

    // --COMPONENT-COVER
    import Wrapper from './Wrapper.svelte'

    // --COMPONENT-ELEMENTS
    import Info from '../elements/Info.svelte'
    import Title from '../elements/Title.svelte'
    import Nav from '../elements/Nav.svelte'
    import Quote from '../elements/Quote.svelte'

// #VARIABLES

    // --APP
    let app_$FREEZE = APP.app_$FREEZE

    // --ELEMENT-PAGE
    let
    page_CHARGED = false,
    page_HIDE = false,

    page_NAV,

    page_process

    // --ELEMENT-TITLE
    let title_HEIGHT = 0

// #REACTIVE

    // --ELEMENT-PAGE
    $: page_update($app_$FREEZE)

// #FUNCTIONS

    // --SET
    function page_set() { PROCESS.process_push(prop_PROCESS, page_process) }

    // --UPDATE
    function page_update(freeze)
    {
        if (freeze)
        {
            const TARGET = app_$FREEZE.target

            page_HIDE = TARGET != null && TARGET != prop_ID ? true : false
        }
        else page_HIDE = false
    }

    // --EVENT
    function nav_eClick({detail})
    {
        const ID = detail.id
    
        page_NAV.callback(detail)

        prop_NAV[ID] = prop_NAV[ID]
    }

// #LIFECYCLE

onMount(page_set)
</script>

<!-- #HTML -->

<div
id={prop_NAME}
class="page"
class:hide={page_HIDE}
style:z-index={prop_Z}
>
    <Wrapper>
        <Info
        prop_CONTENT={prop_INFO}
        {prop_FOCUS}
        slot="info"
        />

        <Title
        prop_CHARGED={page_CHARGED}
        {prop_INTRO}
        {prop_TITLE}
        bind:title_HEIGHT
        slot="title"
        />

        <svelte:fragment
        slot="nav"
        >
            {#if page_NAV}
                <Nav
                prop_TRANSLATE_Y={-title_HEIGHT + (page_NAV.offset ?? 0)}
                prop_ITEMS={prop_NAV}
                {prop_FOCUS}
                {prop_INTRO}
                on:click={nav_eClick}
                />
            {/if}
        </svelte:fragment>

        <svelte:fragment
        slot="quote"
        >
            {#if prop_QUOTE}
                <Quote
                {prop_INTRO}
                {prop_QUOTE}
                />
            {/if}
        </svelte:fragment>

        <svelte:component
        this={prop_COMPONENT}
        {...prop_PROPS}
        {prop_ID}
        bind:page_CHARGED
        bind:PAGE_NAV={page_NAV}
        bind:page_process
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

    visibility: visible;

    &.hide
    {
        visibility: hidden;

        pointer-events: none !important;
    }
}
</style>