<!-- #MAP

    TABLE
        HEAD
            CELL
                ICON
                    CROSS

        LINES
            LINE * n

-->

<!-- #SCRIPT -->

<script>
// #EXPORTS

    // --PROPS
    export let
    prop_TITLE = '',
    prop_LINES = [],
    prop_TRANSLATE_Y = 0,
    prop_REDUCE = 0

// #IMPORTS

    // --LIB
    import COLORS from '$lib/colors'

    // --SVELTE
    import { createEventDispatcher } from 'svelte'

    // --COMPONENT-COVERS
    import Cell from '../covers/Cell.svelte'
    import Icon from '../covers/Icon.svelte'

    // --COMPONENT-ICON
    import Cross from '../icons/Cross.svelte'

// #CONSTANTE

    // --SVELTE
    const SVELTE_DISPATCH = createEventDispatcher()

// #VARIABLE

    // --ELEMENT-TABLE
    let table_DESTROY = false

// #FUNCTIONS

    // --EVENT
    function cell_eClick() { SVELTE_DISPATCH('click') }

    // --TRANSITION
    function table_tFade() { return { duration: 600, css: (t) => `opacity: ${t}` }}

    // --OUTRO
    function table_outro() { table_DESTROY = true }
</script>

<!-- #HTML -->

<section
class="table"
style:transform="translateY({-prop_TRANSLATE_Y}px)"
style:height="calc(100% - {prop_REDUCE}px)"
in:table_tFade
on:outrostart={table_outro}
>
    <div
    class="head"
    >
        <h3>{prop_TITLE}</h3>
    
        <Cell
        on:click={cell_eClick}
        >
            <Icon
            prop_COLOR={COLORS.light}
            prop_SPRING={true}
            >
                <Cross
                prop_DESTROY={table_DESTROY}
                />
            </Icon>
        </Cell>
    </div>

    <div
    class="lines"
    class:destroy={table_DESTROY}
    >
        {#each prop_LINES as line}
            <div
            class="line"
            >
                <svelte:element
                this={line.topic ? 'h4' : 'p'}
                >
                    {line.text}
                </svelte:element>
            </div>
        {/each}
    </div>
</section>

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
@use '../../assets/scss/styles/font';

/* #TABLE */

.table
{
    &, .lines { @extend %f-column; }

    width: 100%;

    gap: 1rem;

    .head, .lines
    {
        padding-right: app.$gap-inline;

        box-sizing: border-box;
    }
    .head, .line { width: 100%; }
    .head
    {
        $size: map.get(font.$font-sizes, s3);
    
        #{--icon-size}: calc($size * font.$line-height-title-min);

        @extend %f-a-center;

        justify-content: space-between;

        height: fit-content;

        h3 { @include font.h-custom($light, map.get(font.$font-sizes, s4)); }
    }
    .lines
    {
        @extend %scroll-bar;
        @extend %any;

        overflow: hidden scroll;

        pointer-events: auto;

        &.destroy .line
        {
            &::before { animation-name: a0; }

            &>* { animation-name: a1; }
        }

        .line
        {
            &::before, &>* { animation: .6s ease-out forwards; }

            &::before
            {
                @include position.placement(absolute, auto, auto, 0, -100%, true);
        
                width: 100%;
                height: 0;

                border-bottom: solid $intermediate 1px;

                animation-name: a1;
            }

            position: relative;

            @extend %f-a-center;

            justify-content: flex-end;
    
            flex: 1;

            min-height: 24%;

            text-align: right;

            transition: color .2s;

            &>* { animation-name: a0; }

            h4
            {
                color: $primary;
                font-family: font.$family-subtitle;
                font-size: map.get(font.$font-sizes, s2);
            }
    
            p { @include font.interact($light); }
        }

        @keyframes a0 { from { transform: translateX(100%); } to { transform: translateX(0%); } }
        @keyframes a1 { from { transform: translateX(0%); } to { transform: translateX(100%); } }
    }
}
</style>