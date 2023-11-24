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
                            <div
                            class="text-background"
                            >
                                {feature.topic.toUpperCase()}
                            </div>
                    
                            <h3
                            class="topic"
                            >
                                {feature.topic}
                            </h3>

                            <svelte:element
                            this={feature.html ?? 'p'}
                            class="feature"
                            {...feature.props}
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
                                    <Arrow />
                                </Icon>
    
                                Me contacter
                            </Cell>
                        </div>
                    {/if}
                </div>
            {/each}
        </div>
    {/each}
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
    
//=======@STYLE|

    // --*
    import '../../../../assets/scss/global/features.scss'


// #\-EXPORTS-\

    // --PROPS
    export let
    prop_FOCUS = false
    ,
    prop_RATIO           = 0,
    prop_CONTENTS_LENGTH = 0
    ,
    prop_FEATURES

    // --BINDING
    export let contact_ON = false


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
        features_updateTranslate(ratio)
        features_updateTarget(ratio)
    }

    function features_updateTranslate(ratio) { features_TRANSLATE_Y = -100 * ratio }

    function features_updateTarget(ratio)
    {
        let
        last_SHOW = false,
        position  = prop_CONTENTS_LENGTH

        for (let i = prop_FEATURES.length - 1; i >= 0; i--)
        {
            const FEATURE = prop_FEATURES[i]

            position -= FEATURE.contents.length
        
            const SHOW = last_SHOW ? last_SHOW : ratio >= position / prop_CONTENTS_LENGTH
        
            prop_FEATURES[i] = { ...FEATURE, show: SHOW }

            if (SHOW) last_SHOW = true
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

    transition: transform .1s;

    .container
    {
        $height: 32vh;

        margin-bottom: 4rem;

        &.show>div { transform: translate(0, 0); }

        &>div, section, .feature { box-sizing: border-box; }

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

            transition: transform $duration var(--feature-delay, 0) ease-in-out;
        }

        section, .feature { position: relative; }

        section
        {
            &::before
            {
                @include utils.placement(absolute, $top: 50%, $right: calc(app.$gap-inline * 2), $z: -1, $pe: true);

                transform: translateY(-50%);

                height: $height;
            
                mix-blend-mode: hue;

                border-right: solid $primary 1.2rem;
            }
    
            width: 100%;
        }

        .text-background
        {
            --title-size: 56rem;

            @include utils.placement(absolute, $top: 50%, $left: 0, $z: -1, $pe: attr(data-topic));
            @include font.h-($color: $dark, $line-height: 0, $italic: true);

            text-shadow:
             1px  1px $light,
            -1px  1px $light,
            -1px -1px $light,
             1px -1px $light;

            mix-blend-mode: hue;
        }

        .text-background, .contact-me { white-space: nowrap; }

        .topic { @include font.h-($n: 2, $color: $light, $line-height: 1); }

        .feature
        {
            display: inline;
    
            background-color: $intermediate;

            padding-block: .2rem;
            padding-left:  app.$gap-inline; 
        }

        a
        {
            @extend %a-text;

            pointer-events: auto;

            color:           inherit;
            text-decoration: underline;

            transition: color .4s;

            &::after
            {
                justify-content: flex-end;
                align-items:     center;
            }
        }

        .contact-me
        {
            #{--cell-border-color}: $primary;

            @include utils.placement(absolute, $top: 18%, $right: app.$gap-inline);

            transform: translateY(-50%);
        }
    }

    @include media.min($ms4, $ms4)
    {
        transition-duration: .7s;

        .container
        {
            section { padding-left: 6%; }

            .topic { line-height: 0; }

            .feature { padding-left: 34%; }
    
            .contact-me { top: 50%; }
        }
    }
}


</style>