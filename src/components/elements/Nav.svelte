<!-- #MAP

    #if NAV

-->

<!-- #SCRIPT -->

<script>
// #EXPORTS

    // --PROPS
    export let
    prop_FOCUS = false,
    prop_INTRO = false,
    prop_TRANSLATE_Y = 0,
    prop_ITEMS = [],
    prop_EVENT = () => {}
</script>

<!-- #HTML -->

{#if prop_FOCUS}
    <nav
    class="nav"
    class:top={!prop_INTRO}
    style:--nav-translate-y="-{prop_TRANSLATE_Y}px"
    >
        <ul>
            {#each prop_ITEMS as item}
                <li>
                    <button
                    type="button"
                    title={item.title ?? (item.value ?? '')}
                    on:click={prop_EVENT.bind(null, item.id)}
                    >
                        #{item.value ?? ''}
                    </button>
                </li>
            {/each}
        </ul>
    </nav>
{/if}

<!-- #STYLE -->

<style
lang="scss"
>
/* #USES */

@use 'sass:map';

@use '../../assets/scss/styles/elements';
@use '../../assets/scss/styles/position';
@use '../../assets/scss/styles/display';
@use '../../assets/scss/styles/font';

/* #NAV */

.nav
{
    $animation-duration: 1.4;
    
    &::before
    {
        @include position.placement(absolute, $top: 0, $right: 0, $left: 0, $pseudo-element: true);

        transform: translateX(0) rotate(90deg);

        width: 100%;
        height: 0;

        border-top: solid $light 1px;

        transition: border .8s;

        animation: aBeforeIntro #{$animation-duration}s ease-in-out forwards;

        @keyframes aBeforeIntro
        {
            50% { border-top-color: $light; }
            70% { transform: translateX(-90%) rotate(0); }  
            100%
            {
                transform: translateX(0) rotate(0);

                border-top-color: $intermediate;
            }    
        }
    }

    position: relative;

    z-index: 1;

    transition: transform .4s ease-out;

    &.top
    {
        &::before { border-top-color: transparent !important; }

        transform: translateY(var(--nav-translate-y, -320%));
    }

    ul
    {
        @extend %f-a-center;

        justify-content: flex-start;
        flex-wrap: wrap;
    
        gap: 1rem 3rem;

        transform: translateX(-100%);

        opacity: 0;

        width: 100%;

        padding-block: 1rem;

        animation: aUlIntro  #{$animation-duration * .3}s  #{$animation-duration * .7}s ease-in-out forwards;

        @keyframes aUlIntro
        {
            100%
            {
                transform: translateX(0);
        
                opacity: 1;
            }
        }
    }

    li button
    {
        @include font.content($light, $font-size: map.get(font.$font-sizes, s3));
        @include font.simple-hover;

        @extend %button-reset;

        padding-block: .5rem;

        pointer-events: auto;
    }
}
</style>