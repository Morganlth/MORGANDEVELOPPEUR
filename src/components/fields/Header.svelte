<!-- #SCRIPT -->

<script>
// #IMPORTS

    // --LIB
    import { COLORS } from '$lib/app'

    // --SVELTE
    import { page } from '$app/stores'

    // --COMPONENT-COVER
    import Icon from '../covers/Icon.svelte'

    // --COMPONENT-ICON
    import Logo from '../icons/Logo.svelte'

// #VARIABLE

    // --COMPONENT-HEADER
    let header_TRANSLATEY = 0
</script>

<!-- #HTML -->

<header
style:transform="translateY({header_TRANSLATEY}%)"
>
    <strong
    data-sveltekit-reload
    >
        <Icon
        prop_COLOR={COLORS.dark}
        prop_LINK={{ href: $page.url.origin, alt: 'home' }}
        >
            <Logo />
        </Icon>
            
        <p>
            <span>EE</span>

            LE THUAUT MORGAN
        </p>
    </strong>
</header>

<!-- #STYLE -->

<style
lang="scss"
>
/* #USES */

@use '../../assets/scss/app';

@use '../../assets/scss/styles/position';
@use '../../assets/scss/styles/font';

/* #HEADER */

header
{
    --icon-size: 25px;

    @include position.placement(fixed, 0, auto, auto, 0);

    z-index: 1;

    justify-content: space-between;

    width: fit-content;
    height: fit-content;

    padding: app.$gap-block 0 0 app.$gap-inline;

    transition: transform .4s ease;

    &>strong { display: flex; }

    p
    {
        @include font.interact($dark);

        align-self: flex-end;

        margin-left: 2rem;

        span
        {
            margin-right: 1rem;

            color: $primary;
            font-size: 1.2rem;
        }
    }
}
</style>