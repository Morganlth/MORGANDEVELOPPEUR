<!-- #MAP

-ROUTER
-COMMAND
-EVENT
    PRESENTATION
        SNAKE

        CONTENT
            FEATURE
            NAV

        MASK

-->

<!-- #SCRIPT -->

<script>
// #EXPORTS

    // --PROPS
    export let
    prop_FOCUS = false,
    prop_INTRO = false,

    prop_RATIO = 0,

    prop_START = void 0,
    prop_END = void 0,
    prop_DIF = void 0

// #IMPORTS

    // --JS
    import { PRESENTATION_CONTENT_DATAS, NAV_ITEMS_DATAS } from '../../assets/js/datas/dPresentation'

    // --CONTEXTS
    import { ROUTER, COMMAND, EVENT } from '../../App.svelte'

    // --SVELTE
    import { onMount } from 'svelte'

    // --COMPONENT-COVER
    import Content from '../covers/Content.svelte'

    // --COMPONENT-ELEMENTS
    import Snake from '../elements/Snake.svelte'
    import Features from '../elements/Features.svelte'
    import Nav from '../elements/Nav.svelte'
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

    // --ELEMENT-PRESENTATION
    let  presentation_CHARGED = false

    // --ELEMENT-SNAKE
    let
    snake_ON = true,
    snake_GAME = false

    // --ELEMENT-TITLE
    let title_HEIGHT = 0

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

        presentation_CHARGED = true
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
    function snake_update(on)
    {
        snake_ON = on

        NAV_ITEMS_DATAS[2] =
        {
            ...NAV_ITEMS_DATAS[2],
            title: `${on ? 'Masque' : 'Affiche'} le serpent`,
            value: on ? 'MASQUER' : 'AFFICHER'
        }
    }

    // --COMMAND
    function snake_c$(on) { COMMAND.command_test(on, 'boolean', snake_update, SNAKE_NAME, snake_ON) }

    // --EVENT
    function nav_eClick({detail: {id}})
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
id="presentation"
>
    <Snake
    prop_ON={snake_ON && prop_RATIO < 1}
    bind:snake_GAME
    />

    <Content
    prop_CHARGED={presentation_CHARGED}
    {...PRESENTATION_CONTENT_DATAS}
    {prop_FOCUS}
    {prop_INTRO}
    bind:title_HEIGHT
    >
        <Features
        {prop_FOCUS}
        {prop_RATIO}
        bind:features_LENGTH
        />

        {#if prop_FOCUS}
            <Nav
            prop_TRANSLATE_Y={title_HEIGHT}
            prop_ITEMS={NAV_ITEMS_DATAS}
            {prop_INTRO}
            on:click={nav_eClick}
            />
        {/if}
    </Content>

    <Mask
    prop_SHADOW={true}
    prop_COORDS={[45, -10]}
    prop_GRADIENT={[50, 90]}
    prop_RATIO={prop_RATIO * mask_RATIO + 1}
    />
</div>