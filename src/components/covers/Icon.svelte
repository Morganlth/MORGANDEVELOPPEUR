<!-- #SCRIPT -->

<script>
// #EXPORTS

    // --PROPS
    export let
    prop_SIZE = 'var(--icon-size, auto)',
    prop_COLOR = null,
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
    function spring_update(hover, size)
    {
        SPRING.spring_HOVER = hover
        SPRING.spring_$SIZE = size
    }

    // --EVENTS
    function icon_mouseEnter()
    {
        const
        CLIENTRECT = icon.getBoundingClientRect(),
        [X, Y] = [CLIENTRECT.left + CLIENTRECT.width / 2, CLIENTRECT.top + CLIENTRECT.height / 2]

        spring_update(true, CLIENTRECT.width)

        requestAnimationFrame(() => SPRING.spring_$COORDS = { x: X, y: Y })
    }

    function icon_mouseLeave() { spring_update(false, 7) }

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