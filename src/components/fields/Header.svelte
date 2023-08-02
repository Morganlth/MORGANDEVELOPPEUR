<!-- #SCRIPT -->

<script>
// #IMPORTS

    // --JS
    import fps_get from '../../assets/js/utils/fps'

    // --LIB
    import { COLORS } from '$lib/app'

    // --SVELTE
    import { page } from '$app/stores'
    import { onMount, onDestroy } from 'svelte'

    // --COMPONENT-COVER
    import Icon from '../covers/Icon.svelte'

    // --COMPONENT-ICON
    import Logo from '../icons/Logo.svelte'

// #VARIABLES

    // --ELEMENT-HEADER
    let
    header_TRANSLATEY = 0,
    header_FPS = 0,
    header_LOOP

// #FUNCTIONS

    // --SET
    function header_set()
    {
        header_LOOP = true

        header_animationLoop()
    }

    // --DESTROY
    function header_destroy() { header_LOOP = false }

    // --ANIMATION
    async function header_animationLoop()
    {
       header_FPS = await fps_get()

       if (header_LOOP) header_animationLoop()
    }

// #CYCLES

onMount(header_set)
onDestroy(header_destroy)
</script>

<!-- #HTML -->

<header
style:transform="translateY({header_TRANSLATEY}%)"
>
    <strong
    data-sveltekit-reload
    >
        <Icon
        prop_COLOR={COLORS.light}
        prop_LINK={{ href: $page.url.origin, alt: 'home' }}
        >
            <Logo />
        </Icon>
            
        <p>
            <span>EE</span>

            LE THUAUT MORGAN
        </p>
    </strong>

    <span>
        {header_FPS}
    </span>
</header>

<!-- #STYLE -->

<style
lang="scss"
>
/* #USES */

@use '../../assets/scss/_app';

@use '../../assets/scss/styles/_position';
@use '../../assets/scss/styles/_font';

/* #HEADER */

header
{
    --icon-size: 25px;

    @include position.placement(fixed, 0, auto, auto, 0);

    z-index: 1;

    display: flex;
    justify-content: space-between;

    width: 100%;
    height: fit-content;

    padding: app.$gap-block app.$gap-inline 0;

    box-sizing: border-box;

    transition: transform .4s ease;

    &>strong
    {
        display: flex;

        p
        {
            @include font.interact($light);

            align-self: flex-end;

            margin-left: 2rem;
        }

        span
        {
            margin-right: 1rem;

            color: $primary;
            font-size: 1.2rem;
        }
    }

    &>span
    {
        @include font.interact($primary);
    }
}
</style>