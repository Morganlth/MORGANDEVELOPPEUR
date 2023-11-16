<!----------------------------------------------- #||--features--|| -->


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

<div
class="features"
class:focus={prop_FOCUS}
style:transform="translateY({features_TRANSLATE_Y}%)"
>
    {#each prop_FEATURES as group}
        <div
        class="container"
        class:show={group.show}
        >
            {#each group.contents as feature, j}
                <div
                style:--feature-direction={j % 2 ? -1 : 1}
                style:--feature-delay="{.2 * j}s"
                >
                    <Line>
                        <span
                        slot="id"
                        >
                            {j}
                        </span>

                        <section
                        slot="content"
                        >
                            <h3
                            class="topic"
                            data-topic={feature.topic}
                            >
                                {feature.topic}
                            </h3>

                            <svelte:element
                            this={feature.html ?? 'p'}
                            class="feature"
                            {...feature.props}
                            data-content={feature.data.toUpperCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "")}
                            tabindex={feature.html === 'a' && prop_FOCUS ? 0 : -1}
                            >
                                {feature.data}
                            </svelte:element>
                        </section>
                    </Line>

                    {#if feature.contact}
                        <div
                        class="contact-me"
                        >
                            <Cell
                            prop_TEXT_WRAPPER={true}
                            prop_CENTER={true}
                            prop_TITLE="Me contacter"
                            {prop_FOCUS}
                            on:click={cell_eClick}
                            >
                                <Icon
                                prop_SPRING={false}
                                prop_SIZE="1.8rem"
                                prop_COLOR={COLORS.light}
                                >
                                    <Arrow
                                    prop_TURN={contact_ON}
                                    />
                                </Icon>
    
                                Me contacter
                            </Cell>
                        </div>
                    {/if}
                </div>
            {/each}
        </div>
    {/each}

    {#if contact_ON}
        <Contact />
    {/if}
</div>


<!-- #|-SCRIPT-| -->

<script>

// #\-IMPORTS-\

    // --DATA

    // --SVELTE

    // --LIB
    import COLORS from '$lib/colors'

    // --CONTEXTS

//=======@COMPONENTS|

    // --*
    import Cell from '../../../../global/covers/Cell.svelte'
    import Icon from '../../../../global/covers/Icon.svelte'
    import Line from '../../../../global/covers/Line.svelte'

    import Arrow from '../../../../global/icons/Arrow.svelte'

    import Contact from './Contact.svelte'
    
//=======@STYLE|

    // --*
    import '../../../../assets/scss/global/features.scss'


// #\-EXPORTS-\

    // --PROPS
    export let
    prop_FOCUS = false
    ,
    prop_RATIO    = 0,
    prop_FRACTION = 0
    ,
    prop_FEATURES

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
    let features_TRANSLATE_Y = 0

    // --INSIDE
    let contact_ON = false


// #\-REATIVES-\

    // --CONTEXTS

    // --OUTSIDE

    // --THIS
    $: features_update(prop_RATIO)

    // --INSIDE


// #\-FUNCTIONS-\

//=======@LIFE|

    // --SVELTE

    // --SET

    // --GET

    // --UPDATES
    function features_update(ratio)
    {
        features_TRANSLATE_Y = -100 * ratio

        for (let i = prop_FEATURES.length - 1; i >= 0; i--)
        {
            const
            FEATURE = prop_FEATURES[i],
            SHOW    = ratio >= FEATURE.id * prop_FRACTION
        
            prop_FEATURES[i] = { ...FEATURE, show: SHOW }

            if (SHOW) break
        }
    }

    // --DESTROY


//=======@COMMANDS|

    // --*


//=======@EVENTS|

    // --*
    function cell_eClick() { contact_ON = !contact_ON }


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
    @use '../../../../assets/scss/styles/animation';

    /* --MEDIA */
    @use '../../../../assets/scss/styles/media';


/* #\-VARIABLES-\ */

    /* --* */
    $duration: .8s;


/* #\-THIS-\ */

.features
{
    &, .container
    {
        width:  100%;
        height: fit-content;
    }

    @include utils.placement(absolute, $top: 50%, $right: 0, $left: 0);

    transition: transform $duration ease-out;

    &.focus
    {
        animation: a-rgb 3s alternate infinite;

        @keyframes a-rgb { from { filter: hue-rotate(0deg); } to { filter: hue-rotate(30deg); } }
    }

    .container
    {
        $height: 30vh;

        margin-bottom: 4rem;

        &.show>div { transform: translate(0, 0); }

        &>div:nth-child(1) { border-top: solid $primary 1rem; }

        &>div
        {
            &::before
            {
                @include utils.placement(absolute, 0, 0, 0, 0, -1, true);

                @extend %any-size;

                opacity: .3;
        
                background:     url('/images/feature_bg.jpg') center / cover no-repeat;
                mix-blend-mode: darken;
            }
        
            @extend %f-a-center;

            isolation: isolate;
    
            transform: translate(calc(100% * var(--feature-direction, 1)), 100%);

            height: $height;

            background-color: rgba($dark, .8);

            border-bottom: solid $intermediate 1px;

            box-sizing: border-box;

            transition: transform $duration var(--feature-delay, 0) ease-in-out;
        }

        section
        {
            display: flex;
    
            width: 100%;
        }

        .topic, .contact-me { white-space: nowrap; }

        .topic
        {
            #{--title-size}: map.get(font.$font-sizes, s6);

            &::before { @include font.h-($color: $dark, $line-height: 0, $italic: true); }
        
            @include font.h-($n: 2, $color: $primary, $line-height: 0, $italic: true);

            position: relative;

            transform: translateY(-3rem);

            width: 10vw;

            padding-inline: 4rem;
        }

        .feature
        {
            &::before
            {
                @include utils.placement(absolute, $top: 50%, $right: calc(app.$gap-inline * 2), $z: -1, $pe: attr(data-content));
                @include font.h-(1, $color: $primary);

                transform: translateY(-50%);

                overflow: clip;

                width:  fit-content;
                height: $height;
    
                padding: 2.4rem .8rem;
            
                background-color: $dark;
                mix-blend-mode:   hue;

                border-block: solid $primary 1.2rem;

                writing-mode: vertical-rl;
                white-space:  nowrap;

                box-sizing: border-box;
            }
    
            position: relative;

            flex: 1;
        }

        a
        {
            @extend %a-text;

            pointer-events: auto;

            color:           inherit;
            text-decoration: underline;

            transition: color .4s;

            &:hover { color: $dark; }
        }

        .contact-me
        {
            #{--cell-border-color}: $primary;

            @include utils.placement(absolute, $top: 20%, $right: app.$gap-inline);

            transform: translateY(-50%);
        }

        @include media.min($ms4, $ms4)
        {
            .topic
            {
                &::before
                {
                    --title-size: 50rem;

                    @include utils.placement(absolute, $z: -1, $pe: attr(data-topic));

                    transform-origin: left;
                    transform:        rotate(2deg);

                    text-shadow:
                    1px  1px $light,
                    -1px  1px $light,
                    -1px -1px $light,
                    1px -1px $light;
                }

                transform: none;
    
                mix-blend-mode: hue;
            }

            .contact-me { top: 50%; }
        }
    }
}


</style>