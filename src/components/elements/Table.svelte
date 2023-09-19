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
    prop_TRANSLATE_Y = 0

// #IMPORTS

    // --JS
    import { transition_fade } from '../../assets/js/utils/transition'

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

    // --OUTRO
    function table_outro() { table_DESTROY = true }
</script>

<!-- #HTML -->

<section
class="table"
class:destroy={table_DESTROY}
transition:transition_fade={{ duration: 600 }}
on:outrostart={table_outro}
>
    <div
    class="head"
    style:transform="translateY(-{prop_TRANSLATE_Y}px)"
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
@use '../../assets/scss/styles/size';
@use '../../assets/scss/styles/font';

/* #TABLE */

.table
{
    &, .lines { @extend %f-column; }

    gap: 1rem;

    &.destroy
    {
        h3 { animation-name: aOutro !important; }

        .line
        {
            &::before { animation-name: a0 !important; }

            &>* { animation-name: a1 !important; }
        }
    }

    .head, .line { width: 100%; }
    .head
    {
        $size: map.get(font.$font-sizes, s3);
    
        #{--icon-size}: calc($size * font.$line-height-title-min);

        position: relative;

        z-index: 1;

        display: flex;
        justify-content: space-between;

        height: fit-content;

        h3
        {
            $a: polygon(0 0, 0 0, 0 100%, 0 100%);
            $b: polygon(0 0, 100% 0, 100% 100%, 0 100%);
        
            @include font.h-custom($light);

            @extend %m-h-3;

            animation: aIntro .6s ease-out forwards;

            @keyframes aIntro { from { clip-path: $a; } to { clip-path: $b; } }
            @keyframes aOutro { from { clip-path: $b; } to { clip-path: $a; } }
        }
    }
    .lines
    {
        &, .line { box-sizing: border-box; }
    
        @extend %scroll-bar;
        @extend %any;

        @include position.placement(absolute, 0, 0, 0, 0);

        @extend %any;

        overflow: hidden scroll;

        pointer-events: auto;

        padding-inline: app.$gap-inline;

        background-color: $dark;

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

            padding-inline: 11%;

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