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

    prop_TOP = 0,
    prop_RATIO = 0,

    prop_START = void 0,
    prop_END = void 0,
    prop_DIF = void 0

    // --BINDS
    export let page_CHARGED = false

    export const PAGE_NAV = { callback: nav_e$Click }

    // BIND page_process

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
    SNAKE = 'snake',
    SNAKE_COMMANDS =
    [
        {
            name: SNAKE,
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
    let features_LENGTH // LENGTH of FEATURES_DATAS + 1 (padding-right in track)

    // --ELEMENT-MASK
    let mask_RATIO = 0

// #REACTIVES
    
    // --ELEMENT-SNAKE
    $: snake_update(snake_ON)

    // --ELEMENT-MASK
    $:
    prop_START != null &&
    prop_END != null &&
    prop_DIF != null
    ? mask_setVars() : void 0

// #FUNCTIONS

    // --SET
    function presentation_set()
    {
        snake_setCommands()

        page_CHARGED = true
    }

    function snake_setCommands() { COMMAND.command_setBasicCommands(SNAKE_COMMANDS) }

    function mask_setVars() { mask_RATIO = prop_DIF / prop_START }

    // --GET
    function features_getTarget(target) { return prop_FEATURES.find(feature => feature.tags.includes(target)) }

    // --UPDATE
    function snake_update(on) { snake_ON = on }

    // --COMMAND
    function snake_c$(on) { COMMAND.command_test(on, 'boolean', snake_update, SNAKE, snake_ON) }

    // --EVENT
    export function nav_e$Click({id, item})
    {
        switch (id)
        {
            case 0:
                const CONTACT = features_getTarget('contact')
        
                presentation_goTo(CONTACT ? CONTACT.id : prop_FEATURES.length - 1)
        
                break
            case 1:
                snake_GAME = true
                break
            case 2:
                COMMAND.command_COMMANDS[SNAKE](!snake_ON)

                item.update(snake_ON)
        
                break
            default:
                break
        }
    }

    // --UTILS
    export function page_process(str, target)
    {
        switch (target)
        {
            case 'top':
                EVENT.event_scrollTo(prop_TOP)
                break
            case 'start':
                EVENT.event_scrollTo(prop_START)
                break
            case 'features':
                const FEATURE = features_getTarget(str)

                if (FEATURE) presentation_goTo(FEATURE.id)

                break
            case 'snake':
                snake_GAME = true
                break
            default:
                break
        }
    }

    function presentation_goTo(id = 0)
    {
        const TOP = prop_END - prop_DIF / features_LENGTH * (prop_FEATURES.length - id)

        EVENT.event_scrollTo(TOP, ROUTER.router_getInstant(TOP))
    }
// #CYCLE

onMount(presentation_set)
</script>

<!-- #HTML -->

<div
class="presentation"
>
    <Features
    {prop_FOCUS}
    {prop_FEATURES}
    {prop_RATIO}
    bind:features_LENGTH
    />

    <Mask
    prop_SHADOW={true}
    prop_GRADIENT={[50, 100]}
    prop_RATIO={prop_RATIO * mask_RATIO + 1}
    />

    <Snake
    prop_ON={snake_ON && prop_RATIO < 1}
    bind:snake_GAME
    />
</div>