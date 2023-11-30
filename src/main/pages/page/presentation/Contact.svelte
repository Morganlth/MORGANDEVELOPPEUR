<!----------------------------------------------- #||--contact--|| -->


<!-- #|-CONTEXT-| -->

<!--<script
context="module"
>

// #\-IMPORTS-\

    // --SVELTE

     // --LIB

    // --JS


// #\-EXPORTS-\

    // --CONTEXTS


</script>-->


<!-- #|-HTML-| -->

<div
class="contact"
>
    <div
    class="background"
    bind:this={background}
    >
        <!-- particles -->

        {#each [] as _}
            <span></span>
        {/each}
    </div>

    <div
    class="head"
    >
        <Cell
        prop_FOCUS={true}
        prop_ICON_WRAPPER={true}
        prop_CENTER={true}
        prop_TITLE={prop_CONTACT.headCellTitle}
        on:click={cell_eClick}
        >
            <Icon
            prop_COLOR={COLORS.light}
            >
                <Cross />
            </Icon>
        </Cell>

        <div
        class="response"
        class:success={response_SUCCESS}
        class:error={response_ERROR}
        >
            {response_VALUE}
        </div>
    </div>

    <form
    method="post"
    action="/presentation/contact"
    on:submit={form_eSubmit}
    >
        <label
        for="contact-email"
        class:valid={input_VALID}
        >
            Email
        </label>

        <input
        id="contact-email"
        type="email"
        name="email"
        aria-label="email"
        placeholder="..."
        required
        bind:this={input}
        bind:value={input_VALUE}
        on:input={input_eInput}
        />

        <label
        for="contact-message"
        class:valid={textarea_VALID}
        >
            Message
        </label>

        <textarea
        id="contact-message"
        name="message"
        aria-label="message"
        placeholder="(min {FORM_MSG_MIN} - max {FORM_MSG_MAX} {prop_CONTACT.formTextareaPlaceholder})"
        minlength={FORM_MSG_MIN}
        maxlength={FORM_MSG_MAX}
        required
        bind:value={textarea_VALUE}
        on:input={textarea_eInput}
        ></textarea>

        <button
        type="submit"
        >
            Envoyer

            <Icon
            prop_COLOR={COLORS.light}
            >
                <Send />
            </Icon>
        </button>
    </form>
</div>


<!-- #|-SCRIPT-| -->

<script>

// #\-IMPORTS-\

    // --DATA

    // --SVELTE
    import { onMount, onDestroy } from 'svelte'

    // --LIB
    import COLORS                                                       from '$lib/colors'
    import { FORM_MSG_MIN, FORM_MSG_MAX, form_testEmail, form_testMsg } from '$lib/form'

    // --CONTEXTS
    import { ROUTER } from '../../../../App.svelte'

//=======@COMPONENTS|

    // --*
    import Cell from '../../../../global/covers/Cell.svelte'
    import Icon from '../../../../global/covers/Icon.svelte'

    import Cross from '../../../../global/icons/Cross.svelte'
    import Send  from '../../../../global/icons/Send.svelte'

//=======@STYLE|

    // --*


// #\-EXPORTS-\

    // --PROPS
    export let prop_CONTACT = {}

    // --BINDING
    export let contact_ON = true


// #\-CONSTANTES-\

    // --SVELTE

    // --CONTEXTS

    // --OUTSIDE

    // --THIS

    // --INSIDE


// #\-VARIABLES-\

    // --CONTEXTS

    // --OUTSIDE
    let particles

    // --THIS

    // --INSIDE
    let background

    let
    response_SUCCESS = false,
    response_ERROR   = false
    ,
    response_VALUE = ''

    let
    input
    ,
    input_VALID = false
    ,
    input_VALUE = ''

    let cell_SUBMIT = true

    let
    textarea_VALID = false
    ,
    textarea_VALUE = ''


// #\-REATIVES-\

    // --CONTEXTS

    // --OUTSIDE

    // --THIS

    // --INSIDE


// #\-FUNCTIONS-\

//=======@LIFE|

    // --SVELTE
    onMount(contact_set), onDestroy(contact_destroy)

    // --SET
    function contact_set()
    {
        particles_set()

        response_setVars()
    
        input?.focus()
    }

    function particles_set() { (particles ??= document.querySelector('.particles'))?.moveTo(background) }

    function response_setVars()
    {
        const RESPONSE = ROUTER.router_RESPONSE

        if (RESPONSE?.author === 'contact')
        {
            if (RESPONSE.success) response_setSuccess()
            else                  response_setError(RESPONSE.error ?? 'Une erreur est survenue, tentez de recharger la page.')
        }
    }

    function response_setSuccess()
    {
        response_SUCCESS = true
        response_VALUE   = 'Message envoyé.'
    }

    function response_setError(error)
    {
        response_ERROR = true

             if (error.server) response_VALUE = error.server
        else if (error.email)  response_VALUE = error.email
        else if (error.msg)    response_VALUE = error.msg
        else                   response_VALUE = 'une erreur est survenue.'
    }

    // --GET

    // --UPDATES

    // --DESTROY
    function contact_destroy()
    {
        particles?.moveTo()

        ROUTER.router_RESPONSE = ''
    }


//=======@COMMANDS|

    // --*


//=======@EVENTS|

    // --* 
    function form_eSubmit() { cell_SUBMIT = false }

    function input_eInput() { input_VALID = form_testEmail(input_VALUE.trim()) }

    function cell_eClick() { contact_ON = false }

    function textarea_eInput() { textarea_VALID = form_testMsg(textarea_VALUE.trim()) }


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
    @use 'sass:map';

    /* --APP */
    @use '../../../../assets/scss/app';

    /* --DEPENDENCIES */
    @use '../../../../assets/scss/styles/utils';
    @use '../../../../assets/scss/styles/display';
    @use '../../../../assets/scss/styles/font';
    @use '../../../../assets/scss/styles/animation';

    /* --MEDIA */
    @use '../../../../assets/scss/styles/media';


/* #\-VARIABLES-\ */

    /* --* */
    $head-top: 8rem;

    $cell-size: map.get(font.$font-sizes, s4);


/* #\-THIS-\ */

.contact
{
    @include utils.fixed($z: 2); /* label & title */

    @extend %f-center;

    pointer-events: auto;

    background-color: $dark;

    .background
    {
        @include utils.placement(absolute, 0, 0, 0, 0, $z: -1);
    
        @extend %any-size;
    }

    .head
    {
        #{--cell-size}: $cell-size;

        @include utils.placement(absolute, $top: $head-top, $left: app.$gap-inline);

        display    : flex;
        align-items: flex-end;
        flex-wrap  : wrap;
        gap        : 2rem;

        .response
        {
            @include font.text($regular: false);

            flex: 1;

            padding-left: 1rem;

            box-sizing: border-box;

            &.success { color: $primary; }

            &.error   { color: $indicator; }
        }
    }

    form
    {
        $border: solid $intermediate 1px;

        $font-size: map.get(font.$font-sizes, s2);
    
        $label-width : max(7vw, 70px);
        $label-height: 4.4rem;
    
        $message-width : min(calc(100vw - $label-width * 2), 880px);
        $message-height: 38vh;

        &::before, &::after { pointer-events: none; }

        &::before
        {
            @include utils.placement(absolute, $top: 0, $bottom: 0, $left: 50%, $pe: true);

            transform: translateX(-50%);

            width : $message-width;
            height: 100vh;
            height: 100svh;

            border-inline: $border;
        }

        @include display.grid($width: ($label-width $message-width $label-width), $height: ($label-height $message-height $label-height));
        @include font.text($color: $light, $font-size: $font-size);

        width : calc($label-width  * 2 + $message-width);
        height: calc($label-height * 2 + $message-height);

        margin-top: $head-top;

        #contact-email, #contact-message, button
        {
            padding: 1.4rem 1.8rem;

            color: inherit;
            font : inherit;

            box-sizing: border-box;

            &::placeholder { color: $intermediate; }
        }

        label, button
        {
            width : 100%;
            height: $label-height;

            background-color: $dark;
        }

        label
        {
            @extend %f-a-center;

            padding-left: 1.8rem;

            border-left: $border;

            box-sizing: border-box;

            &.valid { color: $primary; }
        }

        label[for="contact-email"]
        {
            grid-column: 1 / 2;
            grid-row   : 1 / 2;

            border-top : $border;
        }

        #contact-email
        {
            grid-column: 2 / 3;
            grid-row   : 1 / 2;
        }

        label[for="contact-message"]
        {
            grid-column: 1 / 2;
            grid-row   : 2 / 3;

            border-bottom: $border;
        }

        #contact-message
        {
            @extend %scroll-bar;
    
            grid-column: 2 / 3;
            grid-row   : 2 / 3;

            overscroll-behavior: none;

            backdrop-filter: blur(8px);

            resize: none;
        }

        button
        {
            #{--icon-size}: $font-size;

            @extend %f-center;
        
            grid-column: 3 / 4;
            grid-row   : 3 / 4;

            gap: 1rem;

            border-right : $border;
            border-bottom: $border;

            :global .icon { flex-shrink: 0; }
        }

        &::after
        {
            @include utils.placement(absolute, $top: 50%, $right: 0, $left: 0, $pe: true);

            transform: translateY(-50%);

            width : 100vw;
            height: $message-height;

            margin-top: $head-top * .5;

            border-block: $border;
        }
    }
}


</style>