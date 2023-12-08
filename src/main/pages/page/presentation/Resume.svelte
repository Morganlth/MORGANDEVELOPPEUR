<!----------------------------------------------- #||--resume--|| -->


<!-- #|-CONTEXT-| -->

<!--<script
context="module"
>

// #\-IMPORTS-\

    // --SVELTE

     // --LIB

    // --JS


// #\-EXPORTS-\

    // --CONTEXTS


</script>-->


<!-- #|-HTML-| -->

<div
class="resume"
transition:transition_fade={{ duration: 200 }}
>
    <div
    class="head"
    >
        <Cell
        prop_FOCUS={true}
        prop_CENTER={true}
        prop_ICON_WRAPPER={true}
        prop_TITLE={prop_RESUME.cellTitle}
        on:click
        >
            <Icon
            prop_COLOR={COLORS.light}
            >
                <Cross />
            </Icon>
        </Cell>
    </div>

    <div
    class="content d-f-c s-any"
    style:--content-mul={content_MUL}
    bind:this={content}
    on:wheel={content_eWheel}
    >
        <div
        class="p-rlt t-p3d s-fit"
        >
            {#each [false, true] as self}
                <article
                class={self ? 'self p-rlt t-p3d' : 'copy p-abs'}
                >
                    <header
                    class="pe-b-rotate pe-a-rotate d-fc- o-hid s-a-w b-box"
                    class:t-p3d={self}
                    >
                        <h3>{prop_RESUME.header.title}</h3>
                
                        <p>{prop_RESUME.header.subTitle}</p>
                    </header>

                    <main
                    class="pe-b-rotate p-rlt d-f-- o-hid s-any b-box"
                    class:t-p3d={self}
                    >
                        {#each prop_RESUME.main as column}
                        {@const {className, content} = column}
                            <div
                            class="column d-fc- s-a-h b-box {className ?? ''}"
                            >
                                {#each content as section}
                                {@const {hide, title, content} = section}
                                    <section
                                    class="d-fc-"
                                    class:o-hid={hide}
                                    >
                                        <h4>{title}</h4>

                                        <ul
                                        class="{hide ? 'd-fc- o-h-a' : ''} b-box"
                                        >
                                            {#each content ?? [] as _}
                                                <li>
                                                    <p>
                                                        {#if _ instanceof Object}
                                                        {@const {topic, html, attributes, value} = _}
                                                            {#if topic}
                                                                <strong>{topic}</strong>
                                                            <br>
                                                            {/if}

                                                            <svelte:element
                                                            this={html ?? 'span'}
                                                            {...(attributes ?? {})}
                                                            >
                                                                {value}
                                                            </svelte:element>
                                                        {:else}
                                                            {_}
                                                        {/if}
                                                    </p>
                                                </li>
                                            {/each}
                                        </ul>
                                    </section>
                                {/each}
                            </div>
                        {/each}
                    </main>
                </article>
            {/each}
        </div>
    </div>
</div>


<!-- #|-SCRIPT-| -->

<script>

// #\-IMPORTS-\

    // --DATA

    // --SVELTE
    import { onMount, onDestroy } from 'svelte'

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
    export let prop_RESUME = {}

    // --BINDING


// #\-CONSTANTES-\

    // --SVELTE

    // --CONTEXTS

    // --OUTSIDE

    // --THIS

    // --INSIDE


// #\-VARIABLES-\

    // --CONTEXTS

    // --OUTSIDE

    // --THIS

    // --INSIDE
    let
    content
    ,
    content_MUL = 1

    let copy_TIMEOUT


// #\-REATIVES-\

    // --CONTEXTS

    // --OUTSIDE

    // --THIS

    // --INSIDE


// #\-FUNCTIONS-\

//=======@LIFE|

    // --SVELTE
    onMount(resume_set), onDestroy(resume_destroy)

    // --SET
    function resume_set() { copy_setVars() }

    function copy_setVars() { copy_TIMEOUT = setTimeout(copy_destroy, 1000) }

    // --GET

    // --UPDATES

    // --DESTROY
    function resume_destroy() { copy_destroyTimeout() }

    function copy_destroy() { content.querySelector('.copy')?.remove() }

    function copy_destroyTimeout() { clearTimeout(copy_TIMEOUT) }


//=======@COMMANDS|

    // --*


//=======@EVENTS|

    // --*
    function content_eWheel(e)
    {
        if (e.ctrlKey)
        {
            e.preventDefault()

                 if (e.deltaY < 0)     { if (content_MUL < 3) content_MUL += .1 }
            else if (content_MUL > .5)                        content_MUL -= .1
        }
    }


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
    @use 'sass:math';

    /* --APP */
    @use '../../../../assets/scss/app';

    /* --DEPENDENCIES */
    @use '../../../../assets/scss/styles/utils';
    @use '../../../../assets/scss/styles/display';
    @use '../../../../assets/scss/styles/font';

    /* --MEDIA */


/* #\-VARIABLES-\ */

    /* --* */
    $i-duration: .2s;
    $a-duration: .8s;

    $mul   : 2.4;
    $width : 210 * $mul;
    $height: 297 * $mul;
    $ratio : var(--content-ratio);

    $pe-rotate: rotate(-8deg);

    $header-height: 30%;


/* #\-THIS-\ */

.resume
{
    @include utils.fixed($z: 2);

    pointer-events: auto;

    backdrop-filter: blur(80px);

    .head
    {
        #{--cell-size}: map.get(font.$font-sizes, s4);
    
        @include utils.placement(absolute, $top: 8rem, $left: app.$gap-inline, $z: 1);
    }

    .content, section.o-hid { overscroll-behavior: none; }

    .content
    {
        #{--content-ratio}: calc(min(calc(100vw / #{$height}), calc(100vh / #{920})) * var(--content-mul, 1));

        @extend %scroll-bar;

        perspective: 2000px;

        transform: translateY(100%);

        overflow: auto;

        animation: a-content-intro $i-duration + .08s ease-out forwards;

        @keyframes a-content-intro { to { transform: translateY(0); } }

        &>div:hover article { border-color: $primary !important; }
    }

    article
    {
        width : calc($width  * $ratio);
        height: calc($height * $ratio);

        aspect-ratio: #{$width} / #{$height};
    }

    .copy { clip-path: polygon(110% 50%, 110% 97%, 96% 110%, -10% 110%, -10% 50%); }

    .self
    {
        &::before, main { clip-path: polygon(0 0, 100% 0, 100% 50%, 0 50%); }
    
        &::before
        {
            @include utils.absolute-any($pe: true);

            background-color: $light;
        }

        transform: rotateX(-180deg);

        animation: a-self-intro $a-duration $i-duration ease-out forwards;

        &>* { backface-visibility: hidden; }

        main
        {
            animation: a-main-intro ($a-duration * .5) ($a-duration * .5 + $i-duration) ease-out forwards;

            @keyframes a-main-intro { to { clip-path: polygon(0 0, 100% 0, 100% 100%, 0% 100%); } }
        }

        &::after
        {
            @include utils.placement(absolute, $top: 50%, $right: 0, $left: 0, $pe: true);

            width : 100%;
            height: calc(1 * $ratio);

            mix-blend-mode: exclusion;

            box-shadow: 0 0 calc(10 * $ratio) $light;
        }

        @keyframes a-self-intro { to { transform: rotateX(0deg); } }
    }

    .pe-b-rotate::before, .pe-a-rotate::after
    {
        transform-origin: bottom left;
        transform       : $pe-rotate;
    }

    header, main { padding: calc(16 * $ratio) calc(22 * $ratio); }

    header::after, main::before { border-top: double calc(40 * $ratio) $primary; }

    header
    {
        &::before, &::after
        {
            @include utils.placement(absolute, $top: 0, $left: 0, $z: -1, $pe: true);

            width: 106%;
        }

        &::before
        {
            height: 100%;
    
            background: $dark url('/images/me_meta.png') center / cover no-repeat;
        }

        @include utils.placement(absolute, $top: 0, $right: 0, $left: 0, $z: 2);

        justify-content: center;
        gap            : calc(8 * $ratio);

        height: $header-height;

        border       : solid transparent calc(2 * $ratio);
        border-bottom: none;

        h3
        {
            #{--title-size}: calc(24 * $ratio);
        
            @include font.h-($color: $primary);

            letter-spacing: calc(2 * $ratio);
        }

        p
        {
            @include font.text($color: $light, $regular: false);

            padding-bottom: calc(20 * $ratio);

            font-size: calc(18 * $ratio);
        }
    }

    main
    {
        &::before
        {
            @include utils.placement(absolute, $top: $header-height + 2%, $left: 0, $pe: true);

            width: 106%;
        }

        justify-content: space-between;

        background-color: $light;

        border: solid $light calc(2 * $ratio);

        .column { @include utils.placement(relative, $z: 1); }

        .column:nth-child(1)
        {
            &::before
            {
                @include utils.placement(absolute, $bottom: 0, $left: 0, $z: -1, $pe: true);

                width : 140%;
                height: 100%;

                background-color: $primary;
            }

            gap: calc(2 * $ratio);
    
            width: 45%;

            padding-block: 44% calc(26 * $ratio);

            h4, ul { padding-left: calc(10 * $ratio); }
    
            h4 { color: $dark; }

            a
            {
                color          : $light;
                font-size      : calc(13 * $ratio);
                text-decoration: underline;
            }
        }

        .column:nth-child(2)
        {
            gap: calc(8 * $ratio);

            width: 50%;

            padding-top: 40%;

            h4
            {
                padding-left: calc(8 * $ratio);
        
                background-color: $dark;
    
                color: $primary;
            }

            ul
            {
                padding-top : calc(4 * $ratio);
                padding-left: calc(2 * $ratio);
            }
        }

        section.o-hid
        {
            &, ul { flex: 1; }
    
            ul
            {
                gap: calc(8 * $ratio);
        
                &::-webkit-scrollbar, &::-webkit-scrollbar-thumb { pointer-events: auto !important; }
        
                &::-webkit-scrollbar { width: calc(3 * $ratio); }

                &::-webkit-scrollbar-thumb { background-color: $dark; }
            }
        }

        h4
        {
            #{--title-size}: calc(16 * $ratio);
    
            @include font.h-($subtitle: true);

            padding-block: calc(8 * $ratio);

            white-space: nowrap;
        }

        ul
        {
            @include font.text($color: $dark, $font-size: calc(16 * $ratio));
    
            height: fit-content;

            padding-right: calc(8 * $ratio);
    
            user-select: text;
        }
    }
}


</style>