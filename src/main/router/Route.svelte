<!----------------------------------------------- #||--route--|| -->


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

<!-- svelte-ignore a11y-no-static-element-interactions a11y-missing-attribute -->
<a
class="route"
class:selected={prop_ON}
{...prop_ATTRIBUTES}
on:mouseenter={route_eMouseEnter}
on:click|preventDefault={route_eClick}
>
    <Fragments
    prop_TAGS={{ children: ROUTE_TAGS, value: prop_VALUE }}
    />
</a>


<!-- #|-SCRIPT-| -->

<script>

// #\-IMPORTS-\

    // --DATA

    // --SVELTE
    import { onMount, onDestroy }    from 'svelte'
    import { createEventDispatcher } from 'svelte'

    // --LIB
    import { animation_staticWriting } from '$lib/animation'

    // --CONTEXTS
    import { EVENT } from '../../App.svelte'

//=======@COMPONENTS|

    // --*
    import Fragments from '../../global/elements/Fragments.svelte'
            
//=======@STYLE|

    // --*


// #\-EXPORTS-\

    // --PROPS
    export let
    prop_ON = false
    ,
    prop_ID         = 0,
    prop_VALUE      = '',
    prop_ATTRIBUTES = {}
    ,
    prop_e$mouseEnter = () => {}

    // --BINDING


// #\-CONSTANTES-\

    // --SVELTE
    const SVELTE_DISPATCH = createEventDispatcher()

    // --CONTEXTS

    // --OUTSIDE

    // --THIS
    const
    ROUTE_TAGS = []
    ,
    ROUTE_EVENTS = {}

    // --INSIDE


// #\-VARIABLES-\

    // --CONTEXTS

    // --OUTSIDE

    // --THIS

    // --INSIDE


// #\-REATIVES-\

    // --CONTEXTS

    // --OUTSIDE

    // --THIS

    // --INSIDE


// #\-FUNCTIONS-\

//=======@LIFE|

    // --SVELTE
    onMount(route_set), onDestroy(route_destroy)

    // --SET
    function route_set() { route_intro() }

    function route_setEvents() { EVENT.event_add(ROUTE_EVENTS) }

    // --GET

    // --UPDATES

    // --DESTROY
    function route_destroy() { route_destroyEvents() }

    function route_destroyEvents() { EVENT.event_remove(ROUTE_EVENTS) }


//=======@COMMANDS|

    // --*


//=======@EVENTS|

    // --*
    function route_eMouseEnter() { prop_e$mouseEnter(prop_ID) }

    function route_eClick() { SVELTE_DISPATCH('click', { id: prop_ID }) }


//=======@TRANSITIONS|

    // --*


//=======@ANIMATIONS|

    // --*


//=======@UTILS|

    // --*
    async function route_intro()
    {
        await new Promise(resolve =>
        {
            ROUTE_EVENTS.animation = animation_staticWriting(ROUTE_TAGS, resolve)
            
            route_setEvents()
        })

        route_destroyEvents()
    }


</script>


<!-- #|-STYLE-| -->

<style
lang="scss"
>

/* #\-USES-\ */

    /* --SASS */
    @use 'sass:map';

    /* --APP */

    /* --DEPENDENCIES */
    @use '../../assets/scss/styles/utils';
    @use '../../assets/scss/styles/display';
    @use '../../assets/scss/styles/font';

    /* --MEDIA */
    @use '../../assets/scss/styles/media';


/* #\-VARIABLES-\ */

    /* --* */
    $pe-before-duration: .2s;


/* #\-THIS-\ */

.route
{
    &, &::after { box-sizing: border-box; }

    @include font.text($color: $light, $regular: false);

    @extend %f-a-center;

    position: relative;

    opacity: .9;

    width: 100%;
    height: 3.4rem;
    
    padding-inline: 1.2rem;

    &::after
    {
        @include utils.placement(absolute, 50%, 0, 0, 0, $pe: true);

        @extend %any-size;

        transform: translateY(-50%) scale(1, 0);

        border: solid $primary 1px;
        
        box-shadow: 0 0 5px $primary;
    }

    &.selected
    {
        opacity: 1;

        animation: a-selected .4s forwards;

        &::after
        {
            animation: a-pe-after-selected .2s $pe-before-duration ease-out forwards;

            @keyframes a-pe-after-selected { 100% { transform: translateY(-50%) scale(1); } }
        }

        @keyframes a-selected
        {
            40%     { color: $indicator; }
            100%    { color: $primary; }    
        }
    }

    @include media.min(false, $ms3)
    {
        &::before
        {
            @include utils.placement(absolute, 50%, 0, 0, 0, $pe: true);

            transform: translateX(-50%);

            width: .6rem;
            height: 0;
            
            border-top: solid $light 1px;
        }

        font-size: map.get(font.$font-sizes, s3);

        &.selected::before
        {
            border-top-color: $primary;

            animation: a-pe-before-selected $pe-before-duration ease-out;

            @keyframes a-pe-before-selected
            {
                100%
                {
                    transform: translateX(0);
        
                    width: 100%;
                }
            }
        }
    }
}


</style>