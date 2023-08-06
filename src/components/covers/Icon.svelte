<!-- #SCRIPT -->

<script>
// #EXPORTS

    // --PROPS
    export let
    prop_SIZE = 'var(--icon-size, auto)',
    prop_COLOR = '#FFF',
    prop_LINK = null,
    prop_SPRING = true

// #IMPORTS

    // --CONTEXT
    import { SPRING } from '../../App.svelte'

    // --SVELTE
    import { onMount } from 'svelte'

// #VARIABLE

    // --ELEMENT-ICON
    let icon

// #FUNCTIONS

    // --SET
    function icon_set()
    {
        if (prop_SPRING)
        {
            icon.addEventListener('mouseenter', icon_mouseEnter)
            icon.addEventListener('mouseleave', icon_mouseLeave)
        }
    }

    // --UPDATE
    function icon_springUpdate(lock, hover, size)
    {
        SPRING.spring_LOCK = lock
        SPRING.spring_HOVER = hover
        SPRING.spring_SIZE = size
    }

    // --EVENTS
    function icon_mouseEnter()
    {
        if (SPRING.spring_ON)
        {
            const
            CLIENTRECT = icon.getBoundingClientRect(),
            [X, Y] = [CLIENTRECT.left + CLIENTRECT.width / 2, CLIENTRECT.top + CLIENTRECT.height / 2]

            icon_springUpdate(true, true, CLIENTRECT.width)

            requestAnimationFrame(() => SPRING.spring_COORDS = { x: X, y: Y })
        }
    }

    function icon_mouseLeave() { if (SPRING.spring_ON) icon_springUpdate(false, false, 7) }

// #CYCLE

onMount(icon_set)
</script>

<!-- #HTML -->

<svelte:element
this={prop_LINK ? 'a' : 'div'}
class="icon"
style:--icon-color={prop_COLOR}
style:width={prop_SIZE}
style:height={prop_SIZE}
{...(prop_LINK ?? {})}
bind:this={icon}
>
    <slot />
</svelte:element>

<!-- #STYLE -->

<style
lang="scss"
>
/* #USE */

@use '../../assets/scss/styles/display';

/* #ICON */

.icon
{
    @extend %f-center;

    pointer-events: auto;
}
</style>