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
class:focus={contact_FOCUS}
>
    <form
    method="post"
    on:submit|preventDefault={form_eSubmit}
    >
        <Cell
        prop_FOCUS={true}
        prop_CENTER={true}
        prop_TITLE="Me contacter"
        prop_TYPE="submit"
        >
            <Icon
            prop_SPRING={false}
            prop_COLOR={COLORS.light}
            prop_SIZE={ICON_SIZE}
            >
                <Send />
            </Icon>
        </Cell>

        <fieldset>
            <input
            type="email"
            aria-label="email"
            placeholder="Votre email..."
            required
            bind:this={input}
            />

            <textarea
            name="contact"
            placeholder="Votre message..."
            required
            bind:this={textarea}
            ></textarea>
        </fieldset>
    </form>

    <Cell
    prop_FOCUS={true}
    prop_CENTER={true}
    prop_TITLE="Me contacter"
    on:click={cell_e$Click}
    >
        <Icon
        prop_SPRING={false}
        prop_COLOR={COLORS.light}
        prop_SIZE={ICON_SIZE}
        >
            <Arrow
            prop_TURN={contact_FOCUS}
            />
        </Icon>
    </Cell>
</div>


<!-- #|-SCRIPT-| -->

<script>

// #\-IMPORTS-\

    // --DATA

    // --SVELTE
    import { onDestroy } from 'svelte'

    // --LIB
    import COLORS            from '$lib/colors'
    import { wait_getDelay } from '$lib/wait'

    // --CONTEXTS

//=======@COMPONENTS|

    // --*
    import Cell from '../../../../global/covers/Cell.svelte'
    import Icon from '../../../../global/covers/Icon.svelte'

    import Send  from '../../../../global/icons/Send.svelte'
    import Arrow from '../../../../global/icons/Arrow.svelte'

//=======@STYLE|

    // --*
    import '../../../../assets/scss/global/contact.scss'


// #\-EXPORTS-\

    // --PROPS

    // --BINDING


// #\-CONSTANTES-\

    // --SVELTE

    // --CONTEXTS

    // --OUTSIDE

    // --THIS

    // --INSIDE
    const ICON_SIZE = '4.2rem'

    const TEXTAREA_DELAY = wait_getDelay(24) // +- 400ms


// #\-VARIABLES-\

    // --CONTEXTS

    // --OUTSIDE

    // --THIS
    let contact_FOCUS = false

    // --INSIDE
    let input

    let
    textarea
    ,
    textarea_TIMEOUT


// #\-REATIVES-\

    // --CONTEXTS

    // --OUTSIDE

    // --THIS

    // --INSIDE


// #\-FUNCTIONS-\

//=======@LIFE|

    // --SVELTE
    onDestroy(contact_destroy)

    // --SET

    // --GET

    // --UPDATES

    // --DESTROY
    function contact_destroy() { textarea_destroyTimeout() }
    
    function textarea_destroyTimeout() { clearTimeout(textarea_TIMEOUT) }


//=======@COMMANDS|

    // --*


//=======@EVENTS|

    // --*
    async function form_eSubmit()
    {
        const
        EMAIL = input.value,
        MSG   = textarea.value

        try
        {
            const RESPONSE = await fetch('/contact',
            {
                method: 'post',
                headers:
                {
                    'Content-type': 'application/x-www-form-urlencoded'
                },
                body: new URLSearchParams(
                {
                    email: EMAIL,
                    msg  : MSG
                }).toString()
            })

            console.log(RESPONSE)
        }
        catch {}
    }

    function cell_e$Click()
    {
        textarea_destroyTimeout()

        contact_FOCUS = !contact_FOCUS

        if (contact_FOCUS) textarea_TIMEOUT = setTimeout(() => { if (textarea instanceof HTMLElement) textarea.focus() }, TEXTAREA_DELAY)
    }


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

    /* --MEDIA */


/* #\-VARIABLES-\ */

    /* --* */


/* #\-THIS-\ */

.contact
{
    &, form { display: flex; }

    @include utils.placement(absolute, 0, 0, 0, 0, 1);

    @extend %any-size;

    clip-path: polygon(94% 0, 100% 0, 100% 100%, 94% 100%);

    transition: clip-path .4s ease-in, background-color .4s;

    &.focus
    {
        clip-path: polygon(0 0, 100% 0, 100% 100%, 0% 100%);

        background-color: $dark;
    }

    form
    {
        &, fieldset { flex: 1; }

        height: 100%;

        fieldset, textarea { @extend %scroll-bar; }

        fieldset
        {
            @extend %f-column;

            @include font.text($color: $light, $font-size: map.get(font.$font-sizes, s3));

            overflow: clip scroll;

            gap: 2rem;

            height: calc(100% - app.$gap-block * 2);

            margin-block:   app.$gap-block;
            padding-inline: app.$gap-inline;

            box-sizing: border-box;

            ::placeholder { color: $intermediate; }
        }

        input, textarea
        {
            width: 100%;
        
            color: inherit;
            font:  inherit;
        }

        input
        {
            padding-block: app.$gap-block;

            border-bottom: solid $intermediate 2px;
        }

        textarea
        {
            min-height: 50vh;
        }
    }
}


</style>