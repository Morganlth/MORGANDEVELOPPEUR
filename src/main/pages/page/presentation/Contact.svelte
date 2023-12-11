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
class="contact p-fxd p-y--"
transition:transition_fade={{ duration: 200 }}
on:introend={contact_eIntro}
>
    <div
    class="background p-a00 s-any"
    bind:this={background}
    >
        <!-- particles -->
    </div>

    <div
    class="head d-flx"
    >
        <Cell
        prop_FOCUS={true}
        prop_ICON_WRAPPER={true}
        prop_CENTER={true}
        prop_TITLE={prop_CONTACT.headCellTitle}
        on:click
        >
            <Icon
            prop_COLOR={COLORS.light}
            >
                <Cross />
            </Icon>
        </Cell>

        <div
        class="response b-box"
        class:success={response_SUCCESS}
        class:error={response_ERROR}
        >
            {response_VALUE}
        </div>
    </div>

    <div
    class="content p-a00 o-h-a s-any"
    >
        <div
        class="p-rlt d-f-c o-hid s-any b-box"
        >
            <form
            style:--pe-border-color={form_PE_BORDER_COLOR}
            method="post"
            action="/presentation/contact"
            bind:this={form}
            on:submit|preventDefault={form_eSubmit}
            >
                <label
                class="d-fac s-a-w b-box"
                for="contact-email"
                class:valid={email_VALID}
                >
                    Email
                </label>

                <input
                id="contact-email"
                class="b-box"
                type="email"
                name="email"
                aria-label="email"
                inputmode="email"
                placeholder="...@"
                autocomplete="on"
                required
                bind:value={email_VALUE}
                on:input={email_eInput}
                />

                <label
                class="d-fac s-a-w b-box"
                for="contact-message"
                class:valid={message_VALID}
                >
                    Message
                </label>

                <textarea
                id="contact-message"
                class="b-box"
                name="message"
                aria-label="message"
                inputmode="text"
                placeholder={prop_CONTACT.messagePlaceholder}
                minlength={FORM_MSG_MIN}
                maxlength={FORM_MSG_MAX}
                required
                bind:value={message_VALUE}
                on:input={message_eInput}
                ></textarea>

                <button
                class="d-f-c s-a-w b-box"
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
    import { transition_fade }                                          from '$lib/transition'

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
    ,
    form_PE_BORDER_COLOR = COLORS.light

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

    function response_setValue(value) { response_VALUE = value }

    function response_setSuccess(success)
    {
        response_update(true, false)
        
        response_setValue(success ?? prop_CONTACT.formSuccess)
    }

    function response_setError(error)
    {
        response_update(false, true)

             if (error.server)  response_setValue(error.server)
        else if (error.email)   response_setValue(prop_CONTACT.emailError)
        else if (error.message) response_setValue(prop_CONTACT.messageError)
        else                    response_setValue(prop_CONTACT.formError)
    }

    // --GET

    // --UPDATES
    function response_update(success = false, error = false)
    {
        response_SUCCESS = success
        response_ERROR   = error
    }

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
    function contact_eIntro() { form_PE_BORDER_COLOR = COLORS.intermediate }

    function form_eSubmit()
    {
        if (form_SUBMIT)    return
        if (!email_VALID)   return response_setError({ email  : prop_CONTACT.emailError })
        if (!message_VALID) return response_setError({ message: prop_CONTACT.messageError })

        response_update(false, false)
        response_setValue(prop_CONTACT.formWait)
    
        form_SUBMIT = true

        form.submit()
    }

    function email_eInput()   { email_VALID = form_testEmail(email_VALUE.trim()) }

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


/* #\-THIS-\ */

.contact
{
    z-index: 2; /* label & title */

    background-color: $dark;

    .background { z-index: -1; }

    .head
    {
        #{--cell-size}: map.get(font.$font-sizes, s4);

        @include utils.placement(absolute, $top: $head-top, $left: app.$gap-inline, $z: 1);

        align-items: flex-end;
        flex-wrap  : wrap;
        gap        : 2rem;

        .response
        {
            @include font.text($color: $intermediate, $regular: false);

            flex: 1;

            padding-left: 1rem;

            &.success { color: $primary;   }
            &.error   { color: $indicator; }
        }
    }

    .content
    {
        @extend %scroll-bar;

        &>div
        {
            min-height: $ms3;

            padding-block: $head-top * 2;
        }
    }

    form
    {
        $border: solid $intermediate 1px;
    
        $label-width : max(7vw, 80px);
        $label-height: 4rem;
    
        $message-width : min(calc(100vw - $label-width * 2), 880px);
        $message-height: max(38vh, calc($ms3 - $label-height * 2 - $head-top * 4));

        &::before, &::after { pointer-events: none; }

        &::before { width : $message-width; }

        @include display.grid($width: ($label-width $message-width $label-width), $height: ($label-height $message-height $label-height));
        @include font.text($color: $light, $font-size: map.get(font.$font-sizes, s2));

        @extend %a-grid;

        width : calc($label-width  * 2 + $message-width);
        height: calc($label-height * 2 + $message-height);

        #contact-email, #contact-message, button
        {
            padding: 1.4rem 1.8rem;

            color: inherit;
            font : inherit;

            &::placeholder { color: $primary; }
        }

        label, button
        {
            height: $label-height;

            background-color: $dark;
        }

        label
        {
            padding-left: 1.8rem;

            border-left: $border;

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
            #{--icon-size}: 1.6rem;
        
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