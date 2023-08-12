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
        prop_SIZE="2.5rem"
        prop_COLOR={COLORS.light}
        prop_LINK={{ href: $page.url.origin, alt: 'home' }}
        >
            <Logo />
        </Icon>
            
        <span>EE</span>

        <p>LE THUAUT MORGAN</p>
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

@use 'sass:map';

@use '../../assets/scss/app';

@use '../../assets/scss/styles/position';
@use '../../assets/scss/styles/font';

/* #HEADER */

header
{
    @include position.placement(fixed, 0, auto, auto, 0);

    z-index: 2;

    display: flex;
    justify-content: space-between;
    align-items: flex-end;

    width: 100%;
    height: fit-content;

    padding: app.$gap-block app.$gap-inline 0;

    box-sizing: border-box;

    transition: transform .4s ease;

    &>strong
    {
        display: flex;
        align-items: flex-end;

        p { @include font.interact($light, map.get(font.$font-sizes, s2), 1, map.get(font.$content-font-weight, w1)); }

        span
        {
            margin-inline: app.$gap-block 1rem;

            font-size: map.get(font.$font-sizes, s1);
        }
    }

    span { @include font.interact($primary); }
}
</style>