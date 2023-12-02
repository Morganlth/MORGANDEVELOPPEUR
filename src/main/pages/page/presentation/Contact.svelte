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

    <div
    class="content"
    >
        <div>
            <form
            method="post"
            action="/presentation/contact"
            bind:this={form}
            on:submit|preventDefault={form_eSubmit}
            >
                <label
                for="contact-email"
                class:valid={email_VALID}
                >
                    Email
                </label>

                <input
                id="contact-email"
                type="email"
                name="email"
                aria-label="email"
                placeholder="...@"
                autocomplete="on"
                required
                bind:value={email_VALUE}
                on:input={email_eInput}
                />

                <label
                for="contact-message"
                class:valid={message_VALID}
                >
                    Message
                </label>

                <textarea
                id="contact-message"
                name="message"
                aria-label="message"
                placeholder={prop_CONTACT.messagePlaceholder}
                minlength={FORM_MSG_MIN}
                maxlength={FORM_MSG_MAX}
                required
                bind:value={message_VALUE}
                on:input={message_eInput}
                ></textarea>

                <button
                type="submit"
                title={prop_CONTACT.formCellTitle}
                >
                    {prop_CONTACT.formCellTitle}

                    <Icon
                    prop_COLOR={COLORS.light}
                    >
                        <Send />
                    </Icon>
                </button>
            </form>
        </div>
    </div>
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
    form
    ,
    form_SUBMIT = false

    let
    email_VALID = false
    ,
    email_VALUE = ''

    let
    message_VALID = false
    ,
    message_VALUE = ''


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
    }

    function particles_set() { (particles ??= document.querySelector('.particles'))?.moveTo(background) }

    function response_setVars()
    {
        const RESPONSE = ROUTER.router_RESPONSE

        if (RESPONSE?.author === 'contact')
        {
            if (RESPONSE.success) response_setSuccess()
            else                  response_setError(RESPONSE.error ?? prop_CONTACT.formError)
        }
    }

    function response_setSuccess(success)
    {
        response_SUCCESS = true
        response_VALUE   = success ?? prop_CONTACT.formSuccess
    }

    function response_setError(error)
    {
        response_ERROR = true

             if (error.server)  response_VALUE = error.server
        else if (error.email)   response_VALUE = prop_CONTACT.emailError
        else if (error.message) response_VALUE = prop_CONTACT.messageError
        else                    response_VALUE = prop_CONTACT.formError
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
    function form_eSubmit()
    {
        if (form_SUBMIT)    return
        if (!email_VALID)   return response_setError({ email  : prop_CONTACT.emailError })
        if (!message_VALID) return response_setError({ message: prop_CONTACT.messageError })

        response_setSuccess(prop_CONTACT.formWait)
    
        form_SUBMIT = true

        form.submit()
    }

    function email_eInput()   { email_VALID = form_testEmail(email_VALUE.trim()) }

    function cell_eClick()    { contact_ON = false }

    function message_eInput() { message_VALID = form_testMsg(message_VALUE.trim()) }


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


/* #\-VARIABLES-\ */

    /* --* */
    $head-top: 8rem;

    $cell-size: map.get(font.$font-sizes, s4);


/* #\-THIS-\ */

.contact
{
    @include utils.fixed($z: 2); /* label & title */

    pointer-events: auto;
    touch-action  : auto;

    background-color: $dark;

    .background, .content, .content>div { @extend %any-size; }

    .background, .content { @include utils.placement(absolute, 0, 0, 0, 0); }

    .background { z-index: -1; }

    .head
    {
        #{--cell-size}: $cell-size;

        @include utils.placement(absolute, $top: $head-top, $left: app.$gap-inline, $z: 1);

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

    .content
    {
        @extend %scroll-bar;
    
        overflow: hidden auto;

        &>div
        {
            @extend %f-center;

            position: relative;

            min-height: $ms3;

            padding-block: $head-top * 2;

            box-sizing: border-box;
        }
    }

    form
    {
        $border: solid $intermediate 1px;

        $font-size: map.get(font.$font-sizes, s2);
    
        $label-width : max(7vw, 78px);
        $label-height: 4rem;
    
        $message-width : min(calc(100vw - $label-width * 2), 880px);
        $message-height: max(38vh, calc($ms3 - $label-height * 2 - $head-top * 4));

        &::before, &::after { pointer-events: none; }

        &::before { width : $message-width; }

        @include display.grid($width: ($label-width $message-width $label-width), $height: ($label-height $message-height $label-height));
        @include font.text($color: $light, $font-size: $font-size);

        @extend %a-grid;

        width : calc($label-width  * 2 + $message-width);
        height: calc($label-height * 2 + $message-height);

        #contact-email, #contact-message, button
        {
            padding: 1.4rem 1.8rem;

            color: inherit;
            font : inherit;

            box-sizing: border-box;

            &::placeholder { color: $primary; }
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

            backdrop-filter: blur(8px) hue-rotate(30deg);

            resize: none;
        }

        button
        {
            #{--icon-size}: $font-size;

            @extend %f-center;
        
            grid-column: 3 / 4;
            grid-row   : 3 / 4;

            gap: .6rem;

            border-right : $border;
            border-bottom: $border;

            :global .icon { flex-shrink: 0; }
        }

        &::after { height: $message-height; }
    }
}


</style>