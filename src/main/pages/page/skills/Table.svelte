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
class="table d-fc-"
class:build={table_CHARGED}
class:destroy={table_DESTROY}
style:--table-duration="{prop_DURATION}ms"
transition:transition_fade={{ duration: prop_DURATION }}
on:introstart={table_eIn}
on:outrostart={table_eOut}
>
    <div
    class="p-a00 s-any b-drk"
    bind:this={background}
    >
        <!-- particles -->
    </div>

    <div
    class="head p-abs d-fac s-a-w"
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
    class="content p-a00 o-h-a s-any p-y--"
    >
        {#each prop_LINES as content}
        {@const {title, lines} = content}
            <section
            class="s-a-w"
            >
                <h4
                class="line p-rlt d-fac s-a-w b-box"
                itemprop="knowsAbout"
                >
                    {title}
                </h4>

                <ul
                class="d-fc- s-a-w"
                >
                    {#each lines as line}
                        <li
                        class="line p-rlt d-fac s-a-w b-box"
                        itemprop="knows"
                        >
                            <p>{line}</p>
                        </li>
                    {/each}
                </ul>
            </section>
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
    import COLORS              from '$lib/colors'
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
    ,
    prop_SET_TARGET = false
    ,
    prop_DURATION = 600

    // --BINDING
    export let head_HEIGHT


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

        if (!prop_SET_TARGET) head_HEIGHT = 0

        particles?.moveTo()
    }

    function table_destroyTimeout() { clearTimeout(table_TIMEOUT) }


//=======@COMMANDS|

    // --*


//=======@EVENTS|

    // --*
    function table_eIn()  { table_DESTROY = false }

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
    @use '../../../../assets/scss/styles/font';

    /* --MEDIA */


/* #\-VARIABLES-\ */

    /* --* */
    $a: polygon(0 0, 0 0, 0 110%, 0 110%);
    $b: polygon(0 0, 100% 0, 100% 110%, 0 110%);

    $duration: var(--table-duration, 0s);


/* #\-THIS-\ */

.table
{
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

        .content
        {
            filter: blur(100px);

            transition: filter $duration;
            
            .line
            {
                &::before { animation-name: a-0 !important; }

                &>* { animation-name: a-1 !important; }
            }
        }
    }

    .head, .content section { height: fit-content; }

    .head
    {
        #{--cell-size}: calc(var(--title-size) * font.$line-height-min);

        @include font.h-(4, $light, 1);

        z-index: 1;

        gap: 3rem;

        opacity: 0;

        padding-bottom: 2rem;

        h3 { animation: $duration ease-out forwards; }
    }

    .content
    {
        $font-size: map.get(font.$font-sizes, s3);
    
        @extend %scroll-bar;

        overscroll-behavior: none;

        h4
        {
            #{--title-size}: $font-size;
    
            @include font.h-($color: $primary);
        }

        ul
        {
            @include font.text($color: $light, $font-size: $font-size);

            user-select: text;
        }

        .line
        {
            &::before, &>* { animation: $duration ease-out forwards; }

            &::before
            {
                @include utils.placement(absolute, $bottom: 0, $left: -100%, $pe: true);
        
                width : 100%;
                height: 0;

                border-bottom: solid $intermediate 1px;

                animation-name: a-1;
            }

            justify-content: flex-end;

            min-height: max(12vw, 12vh, 160px);

            padding-inline: app.$gap-inline;

            text-align: right;
    
            transition: color .2s;

            &>* { animation-name: a-0; }
        }

        li { flex: 1; }

        @keyframes a-0 { from { transform: translateX(100%); } to { transform: translateX(0%);   } }
        @keyframes a-1 { from { transform: translateX(0%);   } to { transform: translateX(100%); } }
    }
}


</style>