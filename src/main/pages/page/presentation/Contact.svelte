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
bind:this={contact}
>
    <section>
        <div
        class="head"
        >
            <Cell
            prop_FOCUS={true}
            prop_ICON_WRAPPER={true}
            prop_CENTER={true}
            prop_TITLE="fermer"
            on:click={cell_eClick}
            >
                <Icon
                prop_COLOR={COLORS.light}
                >
                    <Cross />
                </Icon>
            </Cell>

            <h3>Message</h3>

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
            <input
            class:valid={input_VALID}
            type="email"
            name="email"
            aria-label="contact email"
            placeholder="Email"
            required
            bind:this={input}
            bind:value={input_VALUE}
            on:input={input_eInput}
            />

            <Cell
            prop_FOCUS={true}
            prop_ICON_WRAPPER={true}
            prop_CENTER={true}
            prop_SUBMIT={cell_SUBMIT}
            prop_TITLE="Me contacter"
            >
                <Icon
                prop_COLOR={COLORS.light}
                >
                    <Send />
                </Icon>
            </Cell>

            <textarea
            class:valid={textarea_VALID}
            name="message"
            aria-label="contact message"
            placeholder="Message (min {FORM_MSG_MIN} - max {FORM_MSG_MAX} caractères)"
            minlength={FORM_MSG_MIN}
            maxlength={FORM_MSG_MAX}
            required
            bind:value={textarea_VALUE}
            on:input={textarea_eInput}
            ></textarea>
        </form>
    </section>
</div>


<!-- #|-SCRIPT-| -->

<script>

// #\-IMPORTS-\

    // --DATA

    // --SVELTE
    import { onMount, onDestroy } from 'svelte'

    // --LIB
    import COLORS                                                                   from '$lib/colors'
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
    let contact

    // --INSIDE
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

    function particles_set() { (particles ??= document.querySelector('.particles'))?.moveTo(contact) }

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


/* #\-THIS-\ */

.contact
{
    #{--cell-border-color}: $primary;

    @include utils.fixed($z: 2); /* label & title */

    pointer-events: auto;

    background-color: $dark;

    section h3, form input, form textarea { animation: a-intro .4s forwards; }

    section
    {
        @include utils.absolute-center;
    
        @extend %f-column;

        gap: 2.4rem;

        min-width:  46vw;
        width:      100%;
        max-width:  calc(100vw - app.$gap-inline * 2);
        min-height: 52vh;
        max-height: 88vh;

        &>div
        {
            #{--cell-size}: 2.4rem;

            display:     flex;
            align-items: flex-end;
            flex-wrap:   wrap;
            gap:         4rem;
        }

        h3
        {
            @include font.h-($n: 3, $color: $light, $line-height: 1);

            clip-path: polygon(0 0, 0 0, 0 100%, 0 100%);

            text-decoration: underline;
        }

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
        $height: 4.8rem;

        #{--cell-size}: $height;
    
        @include display.grid($width: (1fr $height), $height: ($height 1fr));
        @include font.text($color: $light);

        flex: 1;
        gap:  1.2rem;

        input, textarea
        {
            padding: 1.4rem 1.8rem;

            clip-path: polygon(100% 0, 100% 0, 100% 0, 100% 0);
    
            border: solid $intermediate 2px;

            color: inherit;
            font:  inherit;

            box-sizing: border-box;

            &.valid { border-color: $primary; }

            &::placeholder { color: $intermediate; }
        }

        textarea
        {
            @extend %scroll-bar;
    
            grid-column: 1 / 3;
        }
    }

    @include media.min($ms4, $ms4)
    {
        section { width: auto; }

        form { font-size: map.get(font.$font-sizes, s3); }
    }

    @keyframes a-intro { to { clip-path: polygon(-1% -1%, 101% -1%, 101% 101%, -1% 101%); } }
}


</style>