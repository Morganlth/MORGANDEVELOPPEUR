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
    prop_LINES = []

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

// #VARIABLES

    // --ELEMENT-LINES
    let lines

    // --ELEMENT-CROSS
    let cross_DESTROY = false

// #FUNCTIONS

    // --EVENT
    function cell_eClick() { SVELTE_DISPATCH('click') }

    // --TRANSITION
    function table_t() { return { duration: 600, css: (t, n) => `--line-translate: ${n * 200}%`}}

    // --INTRO
    function table_intro() { lines.style.overflow = 'hidden auto' }

    // --OUTRO
    function table_outro()
    {
        lines.style.overflow = 'hidden'

        cross_DESTROY = true
    }
</script>

<!-- #HTML -->

<section
class="table"
transition:table_t
on:introstart={table_intro}
on:outrostart={table_outro}
>
    <div
    class="head"
    >
        <Cell
        on:click={cell_eClick}
        >
            <Icon
            prop_COLOR={COLORS.primary}
            prop_SPRING={true}
            >
                <Cross
                prop_DESTROY={cross_DESTROY}
                />
            </Icon>
        </Cell>
    </div>

    <div
    class="lines"
    bind:this={lines}
    >
        <div
        class="line"
        >
            <h3>{prop_TITLE}</h3>
        </div>

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
    @include position.placement(absolute, 0, 0, 0, 0);

    @extend %any;

    padding-block: calc(app.$gap-block * 4);
    padding-left: app.$gap-inline;

    box-sizing: border-box;

    .head, .lines
    {
        padding-right: calc(app.$gap-inline * 1.5);

        box-sizing: border-box;
    }
    .head, .line
    {
        @extend %f-a-center;

        justify-content: flex-end;
        
        width: 100%;
    }
    .head
    {
        $size: map.get(font.$font-sizes, s3);
    
        #{--icon-size}: calc($size * font.$line-height-title-min);

        height: 8%;
        min-height: $size;
    }
    .lines
    {
        @extend %scroll-bar;
        @extend %f-column;

        height: 92%;

        pointer-events: auto;

        box-sizing: border-box;

        .line
        {
            &::before
            {
                @include position.placement(absolute, auto, auto, 0, -100%, true);

                transform: translateX(calc(100% - var(--line-translate, 0%)));
        
                width: 100%;
                height: 0;

                border-bottom: solid $intermediate 1px;
            }

            position: relative;
    
            flex: 1;

            min-height: 120px;

            transition: color .2s;

            &:hover p { color: $light; }

            &>* { transform: translateX(var(--line-translate, 0)); }
            h3 { @include font.h-custom($light, map.get(font.$font-sizes, s4)); }
            h4
            {
                color: $primary;
                font-family: font.$family-subtitle;
                font-size: map.get(font.$font-sizes, s2);
            }
            p { @include font.interact(rgba($light, .3)); }
        }
    }
}
</style>