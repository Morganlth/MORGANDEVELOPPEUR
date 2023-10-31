<!-- #MAP

    QUOTE

-->

<!-- #SCRIPT -->

<script>
// #EXPORTS

    // --PROPS
    export let
    prop_INTRO = false,
    
    prop_QUOTE = {}

    // --BINDS

// #IMPORTS

    // --JS

    // --LIB

    // --CONTEXTS

    // --SVELTE

    // --COMPONENT-

// #CONSTANTES

// #VARIABLES

// #REACTIVES

// #FUNCTIONS

    // --SET

    // --GET

    // --UPDATES

    // --CLEAR

    // --DESTROY

        // !======IN-OUT=======!

    // --INTROS

    // --OUTROS

        // !======CONTEXT======!

    // --COMMANDS

    // --EVENTS

        // !======T-A==========!

    // --TRANSITIONS

    // --ANIMATIONS

        // !======CONTROL======!

    // --START

    // --END

        // !======TEST=========!

    // --TESTS

        // !======CANVAS=======!

    // --DRAW

// #LIFECYCLES

</script>

<!-- #HTML -->

<div
class="quote"
class:focus={prop_INTRO}
>
    {#if prop_QUOTE.author}
        <figure>
            <blockquote>{prop_QUOTE.value}</blockquote>

            <figcaption>{prop_QUOTE.author}</figcaption>
        </figure>
    {:else}
        <q>{prop_QUOTE.value}</q>
    {/if}
</div>

<!-- #STYLE -->

<style
lang="scss"
>
/* #USES */

@use 'sass:map';

@use '../../../assets/scss/app';

@use '../../../assets/scss/styles/font';
@use '../../../assets/scss/styles/media';

/* #QUOTE */
.quote
{
    @include font.content($light);

    display: none;

    justify-content: flex-end;

    width: 100%;

    margin-top: 26vh;

    &.focus>* { clip-path: polygon(100% 0, 0 0, 0 100%, 100% 100%); }

    &>*
    {
        clip-path: polygon(100% 0, 100% 0, 100% 100%, 100% 100%);

        text-align: right;

        transition: clip-path .8s .8s ease-in-out;
    }

    blockquote, q { background-color: $dark; }

    figcaption { margin-top: 1rem; }

    q::before, q::after { content: '' }

    @include media.min($height: $ms3) { display: flex; }
}
</style>