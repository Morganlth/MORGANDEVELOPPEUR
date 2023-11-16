<!----------------------------------------------- #||--table--|| -->


<!-- #|-CONTEXT-| -->
<!--
<script
context="module"
>

// #\-IMPORTS-\

    // --SVELTE

     // --LIB

    // --JS


// #\-EXPORTS-\

    // --CONTEXTS


</script>
-->

<!-- #|-HTML-| -->

<section
class="table"
class:build={table_CHARGED}
class:destroy={table_DESTROY}
transition:transition_fade={{ duration: 600 }}
on:outrostart={table_eOut}
>
    <div
    class="background"
    bind:this={background}
    >
    </div>

    <div
    class="head"
    bind:offsetHeight={head_HEIGHT}
    >
        <Cell
        prop_FOCUS={true}
        prop_ICON_WRAPPER={true}
        prop_CENTER={true}
        prop_TITLE="fermer"
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
    
        <h3>{prop_TITLE}</h3>
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


<!-- #|-SCRIPT-| -->

<script>

// #\-IMPORTS-\

    // --DATA

    // --SVELTE
    import { onMount, onDestroy, createEventDispatcher } from 'svelte'

    // --LIB
    import COLORS from '$lib/colors'
    import { transition_fade } from '$lib/transition'

    // --CONTEXTS

//=======@COMPONENTS|

    // --*
    import Cell from '../../../../global/covers/Cell.svelte'
    import Icon from '../../../../global/covers/Icon.svelte'

    import Cross from '../../../../global/icons/Cross.svelte'
            
//=======@STYLE|

    // --*


// #\-EXPORTS-\

    // --PROPS
    export let
    prop_TITLE = ''
    ,
    prop_LINES = []

    // --BINDING
    export let head_HEIGHT = 0


// #\-CONSTANTES-\

    // --SVELTE
    const SVELTE_DISPATCH = createEventDispatcher()

    // --CONTEXTS

    // --OUTSIDE

    // --THIS

    // --INSIDE


// #\-VARIABLES-\

    // --CONTEXTS

    // --OUTSIDE
    let particles

    // --THIS
    let
    table_CHARGED = false,
    table_DESTROY = false
    ,
    table_TIMEOUT

    // --INSIDE
    let background


// #\-REATIVES-\

    // --CONTEXTS

    // --OUTSIDE

    // --THIS

    // --INSIDE


// #\-FUNCTIONS-\

//=======@LIFE|

    // --SVELTE
    onMount(table_set), onDestroy(table_destroy)

    // --SET
    function table_set()
    {
        table_setVars()
        table_setParticles()
    }

    function table_setVars() { table_TIMEOUT = setTimeout(() => table_CHARGED = true, 200) }

    function table_setParticles() { (particles ??= document.querySelector('.particles'))?.moveTo(background) }

    // --GET

    // --UPDATES

    // --DESTROY
    function table_destroy()
    {
        table_destroyTimeout()

        particles?.moveTo()
    }

    function table_destroyTimeout() { clearTimeout(table_TIMEOUT) }


//=======@COMMANDS|

    // --*


//=======@EVENTS|

    // --*
    function table_eOut() { table_DESTROY = true }

    function cell_eClick() { SVELTE_DISPATCH('click') }


//=======@TRANSITIONS|

    // --*


//=======@ANIMATIONS|

    // --*


//=======@UTILS|

    // --*


</script>


<!-- #|-STYLE-| -->

<style
lang="scss"
>

/* #\-USES-\ */

    /* --SASS */
    @use 'sass:map';

    /* --APP */
    @use '../../../../assets/scss/app';

    /* --DEPENDENCIES */
    @use '../../../../assets/scss/styles/utils';
    @use '../../../../assets/scss/styles/display';
    @use '../../../../assets/scss/styles/font';

    /* --MEDIA */


/* #\-VARIABLES-\ */

    /* --* */
    $a: polygon(0 0, 0 0, 0 100%, 0 100%);
    $b: polygon(0 0, 100% 0, 100% 100%, 0 100%);


/* #\-THIS-\ */

.table
{
    &, .lines { @extend %f-column; }

    gap: 1rem;

    &.build
    {
        .head { opacity: 1; }
    
        h3
        {
            animation-name: a-in !important;

            @keyframes a-in { from { clip-path: $a; } to { clip-path: $b; } }
        }
    }

    &.destroy
    {
        h3
        {
            animation-name: a-out !important;

            @keyframes a-out { from { clip-path: $b; } to { clip-path: $a; } }
        }

        .line
        {
            &::before { animation-name: a-0 !important; }

            &>* { animation-name: a-1 !important; }
        }
    }

    .background, .lines
    {
        @include utils.placement(absolute, 0, 0, 0, 0);
    
        @extend %any-size;
    }

    .background { background-color: $dark; }

    .head, .line { width: 100%; }

    .head
    {
        #{--cell-size}: calc(var(--title-size) * font.$line-height-title-min);

        @include utils.placement(absolute, $z: 1);
        @include font.h-(4, $light, 1);
    
        @extend %f-a-center;

        gap: 3rem;

        opacity: 0;

        height: fit-content;

        padding-bottom: 2rem;

        h3 { animation: .6s ease-out forwards; }
    }
    .lines
    {
        &, .line { box-sizing: border-box; }
    
        @extend %scroll-bar;

        overflow: hidden scroll;

        pointer-events: auto;

        padding-inline: app.$gap-inline calc(app.$gap-inline - utils.$scroll-bar-width);

        .line
        {
            $font-size: map.get(font.$font-sizes, s3);
    
            &::before, &>* { animation: .6s ease-out forwards; }

            &::before
            {
                @include utils.placement(absolute, $bottom: 0, $left: -100%, $pe: true);
        
                width: 100%;
                height: 0;

                border-bottom: solid $intermediate 1px;

                animation-name: a-1;
            }

            position: relative;

            @extend %f-a-center;

            justify-content: flex-end;
    
            flex: 1;

            min-height: 30%;

            padding-inline: app.$gap-inline;

            text-align: right;
    
            transition: color .2s;

            &>* { animation-name: a-0; }

            h4
            {
                color:       $primary;
                font-family: font.$family-subtitle;
                font-size:   $font-size;
            }
    
            p { @include font.text($color: $light, $font-size: $font-size); }
        }

        @keyframes a-0 { from { transform: translateX(100%); } to { transform: translateX(0%); } }
        @keyframes a-1 { from { transform: translateX(0%); }   to { transform: translateX(100%); } }
    }
}


</style>