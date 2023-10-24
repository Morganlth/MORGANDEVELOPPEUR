<!-- #MAP

-EVENT
    HEADER
        ICON
            LOGO

-->

<!-- #SCRIPT -->

<script>
// #IMPORTS

    // --LIB
    import COLORS from '$lib/colors'

    // --CONTEXT
    import { EVENT } from '../../App.svelte'

    // --SVELTE
    import { page } from '$app/stores'

    // --COMPONENT-COVER
    import Icon from '../covers/Icon.svelte'

    // --COMPONENT-ICON
    import Logo from '../icons/Logo.svelte'

// #VARIABLE

    // --EVENT
    let event_$FPS = EVENT.event_$FPS
</script>

<!-- #HTML -->

<header>
    <strong
    data-sveltekit-reload
    >
        <Icon
        prop_SIZE="2.5rem"
        prop_COLOR={COLORS.light}
        prop_LINK={{ href: $page.url.origin, alt: 'home' }}
        >
            <Logo />
        </Icon>
            
        <span>DEV.</span>

        <p>LE THUAUT MORGAN</p>
    </strong>

    <span>
        {$event_$FPS}
    </span>
</header>

<!-- #STYLE -->

<style
lang="scss"
>
/* #USES */

@use 'sass:map';

@use '../../assets/scss/app';

@use '../../assets/scss/styles/position';
@use '../../assets/scss/styles/font';
@use '../../assets/scss/styles/animation';

/* #HEADER */

header
{
    @include position.placement(fixed, $top: 0, $left: 0);

    @extend %aScaled;

    z-index: 2;

    display: flex;
    justify-content: space-between;
    align-items: flex-end;

    width: 100%;
    height: fit-content;

    padding: app.$gap-block app.$gap-inline 0;

    pointer-events: none;

    mix-blend-mode: lighten;

    box-sizing: border-box;

    &>strong
    {
        display: flex;
        align-items: flex-end;
        
        p { @include font.content($light); }

        span
        {
            margin-inline: app.$gap-block 1rem;

            font-size: map.get(font.$font-sizes, s1);
        }
    }

    span { @include font.content($primary, false); }
}
</style>