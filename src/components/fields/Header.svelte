<!-- #MAP

    HEADER

-->

<!-- #SCRIPT -->

<script>
// #IMPORTS

    // --JS
    import fps_get from '../../assets/js/utils/fps'

    // --LIB
    import COLORS from '$lib/colors'

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
    header_FPS = 0,
    header_LOOP

// #FUNCTIONS

    // --SET
    function header_set()
    {
        header_setVars()
        header_setAnimations()
    }

    function header_setVars() { header_LOOP = true }

    function header_setAnimations() { header_loop() }

    // --DESTROY
    function header_destroy() { header_LOOP = false }

    // --LOOP
    async function header_loop()
    {
       header_FPS = await fps_get()

       if (header_LOOP) header_loop()
    }

// #CYCLES

onMount(header_set)
onDestroy(header_destroy)
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
@use '../../assets/scss/styles/animation';

/* #HEADER */

header
{
    @include position.placement(fixed, 0, auto, auto, 0);

    @extend %aScaled;

    z-index: 2;

    display: flex;
    justify-content: space-between;
    align-items: flex-end;

    width: 100%;
    height: fit-content;

    padding: app.$gap-block app.$gap-inline 0;

    pointer-events: none;

    box-sizing: border-box;

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