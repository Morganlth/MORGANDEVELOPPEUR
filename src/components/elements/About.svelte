<!-- #MAP

    ABOUT

-->

<!-- #SCRIPT -->

<script>
// #EXPORTS

    // --PROPS
    export let prop_CONTENT = []

    // --BINDS

// #IMPORTS

    // --JS

    // --LIB
    import COLORS from '$lib/colors'

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
class="about"
>
    {#each prop_CONTENT as content}
        <p>
            {#each content as p, i}
                {#if p === ''}
                    <br>
                {:else}
                    <span
                    style:--about-text-delay="{i * .5}s"
                    >
                        {p}
                    </span>
                {/if}
            {/each}
        </p>
    {/each}
</div>

<!-- #STYLE -->

<style
lang="scss"
>
/* #USES */

@use 'sass:map';

@use '../../assets/scss/app';

@use '../../assets/scss/styles/utils';
@use '../../assets/scss/styles/position';
@use '../../assets/scss/styles/display';
@use '../../assets/scss/styles/size';
@use '../../assets/scss/styles/font';

/* #ABOUT */
.about
{
    $top: 8%;

    @include position.placement(fixed, $top: $top, $left: 70%);
    @include font.content($line-height: 1.4);

    @extend %scroll-bar;

    overflow: clip auto;

    width: fit-content;
    max-width: min(calc(30% - app.$gap-inline), 420px);
    height: 100% - $top * 2;

    padding-right: 3rem;

    box-sizing: border-box;

    p
    {
        padding-block: 2rem;
    
        text-align: justify;

        span
        {
            display: block;
    
            margin-left: 2rem;

            clip-path: polygon(0 0, 0 0, 0 100%, 0 100%);

            animation: aTextIntro .8s var(--about-text-delay, 0s) ease-out forwards;

            @keyframes aTextIntro { to { clip-path: polygon(0 0, 100% 0, 100% 100%, 0 100%); } }
        }
    }

    p:nth-child(1) { color: $light; }

    p:not(:nth-child(1)) { color: $primary; }
}
</style>