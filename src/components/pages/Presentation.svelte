<!-- #MAP

-ROUTER
-COMMAND
-EVENT
    PRESENTATION
        SNAKE
        FEATURE
        MASK

-->

<!-- #SCRIPT -->

<script>
// #EXPORTS

    // --PROPS
    export let
    prop_FOCUS = false,

    prop_FEATURES = [],

    prop_RATIO = 0,

    prop_START = void 0,
    prop_END = void 0,
    prop_DIF = void 0

    // --BINDS
    export let page_CHARGED = false

    export const page_$NAV_CLICK = nav_eClick

// #IMPORTS

    // --CONTEXTS
    import { ROUTER, COMMAND, EVENT } from '../../App.svelte'

    // --SVELTE
    import { onMount } from 'svelte'

    // --COMPONENT-ELEMENTS
    import Snake from '../elements/Snake.svelte'
    import Features from '../elements/Features.svelte'
    import Mask from '../elements/Mask.svelte'

// #CONSTANTES

    // --ELEMENT-SNAKE
    const
    SNAKE_NAME = 'snake',
    SNAKE_COMMANDS =
    [
        {
            name: SNAKE_NAME,
            callback: snake_c$,
            params: { defaultValue: true },
            tests: { testBoolean: true },
            storage: true
        }
    ]

// #VARIABLES

    // --ELEMENT-SNAKE
    let
    snake_ON = true,
    snake_GAME = false

    // --ELEMENT-FEATURES
    let
    features_LENGTH, // LENGTH of FEATURES_DATAS + 1 (padding-right in track)
    features_CONTACT_TOP = 0

    // --ELEMENT-MASK
    let mask_RATIO = 0

// #REACTIVES

    // --ELEMENT-PRESENTATION
    $:
    prop_START != null &&
    prop_END != null &&
    prop_DIF != null
    ? presentation_setVars() : void 0
    
    // --ELEMENT-SNAKE
    $: snake_update(snake_ON)

// #FUNCTIONS

    // --SET
    function presentation_set()
    {
        snake_setCommands()

        page_CHARGED = true
    }

    function presentation_setVars() // resize by pages
    {
        features_setVars()
        mask_setVars()
    }

    function snake_setCommands() { COMMAND.command_setBasicCommands(SNAKE_COMMANDS) }

    function features_setVars() { features_CONTACT_TOP = prop_END - prop_DIF / features_LENGTH }

    function mask_setVars() { mask_RATIO = prop_DIF / prop_START }

    // --UPDATE
    function snake_update(on) { snake_ON = on }

    // --COMMAND
    function snake_c$(on) { COMMAND.command_test(on, 'boolean', snake_update, SNAKE_NAME, snake_ON) }

    // --EVENT
    function nav_eClick({id, item})
    {
        switch (id)
        {
            case 0:
                EVENT.event_scrollTo(features_CONTACT_TOP, ROUTER.router_getInstant(features_CONTACT_TOP))
                break
            case 1:
                snake_GAME = true
                break
            case 2:
                COMMAND.command_COMMANDS[SNAKE_NAME](!snake_ON)

                item.update(snake_ON)
        
                break
            default:
                break
        }
    }

// #CYCLE

onMount(presentation_set)
</script>

<!-- #HTML -->

<div
class="presentation"
>
    <Snake
    prop_ON={snake_ON && prop_RATIO < 1}
    bind:snake_GAME
    />

    <Features
    {prop_FOCUS}
    {prop_FEATURES}
    {prop_RATIO}
    bind:features_LENGTH
    />

    <Mask
    prop_SHADOW={true}
    prop_COORDS={[45, -10]}
    prop_GRADIENT={[50, 90]}
    prop_RATIO={prop_RATIO * mask_RATIO + 1}
    />
</div>