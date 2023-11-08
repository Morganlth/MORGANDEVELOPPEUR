<!----------------------------------------------- #||--icon--|| -->


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

<i
class="icon"
style:--icon-color={prop_COLOR}
style:opacity={prop_OPACITY}
style:width={prop_SIZE}
style:height={prop_SIZE}
style:pointer-events={prop_SPRING ? 'auto' : 'none'}
bind:this={icon}
>
    <slot />
</i>


<!-- #|-SCRIPT-| -->

<script>

// #\-IMPORTS-\

    // --DATA

    // --SVELTE
    import { onMount, onDestroy, tick } from 'svelte'

    // --LIB

    // --CONTEXTS
    import { SPRING } from '../../App.svelte'

//=======@COMPONENTS|

    // --*


// #\-EXPORTS-\

    // --PROPS
    export let
    prop_OPACITY = 1
    ,
    prop_SIZE = 'var(--icon-size, auto)',
    prop_COLOR = void ''
    ,
    prop_SPRING = true

    // --BINDING


// #\-CONSTANTES-\

    // --SVELTE

    // --CONTEXTS

    // --OUTSIDE

    // --THIS

    // --INSIDE


// #\-VARIABLES-\

    // --CONTEXTS
    let spring_HOVER = false

    // --OUTSIDE

    // --THIS
    let icon

    // --INSIDE


// #\-REATIVES-\

    // --CONTEXTS

    // --OUTSIDE

    // --THIS

    // --INSIDE


// #\-FUNCTIONS-\

//=======@LIFE|

    // --SVELTE
    onMount(icon_set), onDestroy(icon_destroy)

    // --SET
    function icon_set() { if (prop_SPRING) icon_setEvents() }

    function icon_setEvents()
    {
        icon.addEventListener('mouseenter', icon_eMouseEnter)
        icon.addEventListener('mouseleave', icon_eMouseLeave)
    }

    // --GET

    // --UPDATES
    function spring_update(hover, size)
    {
        SPRING.spring_HOVER = (spring_HOVER = hover)
        SPRING.spring_$SIZE = size
    }

    // --DESTROY
    function icon_destroy()
    {
        if (spring_HOVER) icon_eMouseLeave()
        if (icon instanceof HTMLElement) icon_destroyEvents()
    }

    function icon_destroyEvents()
    {
        icon.removeEventListener('mouseenter', icon_eMouseEnter)
        icon.removeEventListener('mouseleave', icon_eMouseLeave)
    }


//=======@COMMANDS|

    // --*


//=======@EVENTS|

    // --*
    async function icon_eMouseEnter()
    {
        const
        CLIENTRECT = icon.getBoundingClientRect(),
        [X, Y] = [CLIENTRECT.left + CLIENTRECT.width / 2, CLIENTRECT.top + CLIENTRECT.height / 2]

        spring_update(true, CLIENTRECT.width)

        await tick()
        
        SPRING.spring_$COORDS = { x: X, y: Y }
    }

    function icon_eMouseLeave() { spring_update(false, SPRING.spring_HIDE ? 0 : SPRING.spring_D_SIZE) } // no async


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

    /* --APP */

    /* --DEPENDENCIES */
    @use '../../assets/scss/styles/display';

    /* --MEDIA */


/* #\-VARIABLES-\ */

    /* --* */


/* #\-GLOBAL-\ */

    /* --* */


/* #\-THIS-\ */

.icon
{
    @extend %f-center;

    transition: opacity .6s;
}


</style>