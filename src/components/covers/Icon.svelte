<!-- #MAP

    ICON
        SLOT

-->

<!-- #SCRIPT -->

<script>
// #EXPORTS

    // --PROPS
    export let
    prop_OPACITY = 1,
    prop_SIZE = 'var(--icon-size, auto)',
    prop_COLOR = null,
    prop_LINK = null,
    prop_SPRING = true

// #IMPORTS

    // --CONTEXT
    import { SPRING } from '../../App.svelte'

    // --SVELTE
    import { onMount, onDestroy } from 'svelte'

// #VARIABLE

    // --ELEMENT-ICON
    let icon

// #FUNCTIONS

    // --SET
    function icon_set() { if (prop_SPRING) icon_setEvents() }

    function icon_setEvents()
    {
        icon.addEventListener('mouseenter', icon_eMouseEnter)
        icon.addEventListener('mouseleave', icon_eMouseLeave)
    }

    // --DESTROY
    function icon_destroy() { if (icon) icon_destroyEvents() }

    function icon_destroyEvents()
    {
        icon.removeEventListener('mouseenter', icon_eMouseEnter)
        icon.removeEventListener('mouseleave', icon_eMouseLeave)
    }

    // --UPDATE
    function icon_updateSpring(hover, size)
    {
        SPRING.spring_HOVER = hover
        SPRING.spring_$SIZE = size
    }

    // --EVENTS
    function icon_eMouseEnter() // no async
    {
        const
        CLIENTRECT = icon.getBoundingClientRect(),
        [X, Y] = [CLIENTRECT.left + CLIENTRECT.width / 2, CLIENTRECT.top + CLIENTRECT.height / 2]

        icon_updateSpring(true, CLIENTRECT.width)

        requestAnimationFrame(() => SPRING.spring_$COORDS = { x: X, y: Y })
    }

    function icon_eMouseLeave() { icon_updateSpring(false, 7) } // no async

// #CYCLES

onMount(icon_set)
onDestroy(icon_destroy)
</script>

<!-- #HTML -->

<svelte:element
this={prop_LINK ? 'a' : 'div'}
class="icon"
style:--icon-color={prop_COLOR}
style:opacity={prop_OPACITY}
style:width={prop_SIZE}
style:height={prop_SIZE}
style:pointer-events={prop_SPRING ? 'auto' : 'none'}
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

    transition: opacity .4s;
}
</style>