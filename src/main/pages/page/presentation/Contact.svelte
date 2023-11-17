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
        <div>
            <Cell
            prop_FOCUS={true}
            prop_ICON_WRAPPER={true}
            prop_CENTER={true}
            prop_TITLE="fermer"
            on:click={cell_e$Click}
            >
                <Icon
                prop_COLOR={COLORS.light}
                >
                    <Cross />
                </Icon>
            </Cell>

            <h3>Message</h3>
        </div>

        <form
        method="post"
        on:submit|preventDefault={form_eSubmit}
        >
            <input
            type="email"
            aria-label="email"
            placeholder="Email"
            required
            bind:this={input}
            />

            <Cell
            prop_FOCUS={true}
            prop_ICON_WRAPPER={true}
            prop_CENTER={true}
            prop_TITLE="Me contacter"
            prop_TYPE="submit"
            >
                <Icon
                prop_COLOR={COLORS.light}
                >
                    <Send />
                </Icon>
            </Cell>

            <textarea
            name="contact"
            placeholder="Message"
            required
            bind:this={textarea}
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
    import COLORS from '$lib/colors'

    // --CONTEXTS

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
    let input

    let textarea


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
    
        input?.focus()
    }

    function particles_set() { (particles ??= document.querySelector('.particles'))?.moveTo(contact) }

    // --GET

    // --UPDATES

    // --DESTROY
    function contact_destroy() { particles?.moveTo() }


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

    function cell_e$Click() { contact_ON = false }


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
    $color: rgba($primary, .4);


/* #\-THIS-\ */

.contact
{
    #{--cell-border-color}: $primary;

    @include utils.fixed($z: 1);

    pointer-events: auto;

    background-color: $dark;

    section>div, form { gap: .8rem; }

    section
    {
        @include utils.absolute-center();
    
        @extend %f-column;
        @extend %a-hue-30;

        gap: 1.8rem;

        min-width:  40vw;
        max-width:  90vw;
        min-height: 44vh;
        max-height: 90vh;

        &>div
        {
            #{--cell-size}: 2.4rem;

            display:     flex;
            align-items: flex-end;
        }

        h3
        {
            @include font.h-($n: 3, $color: $color);
        }
    }

    form
    {
        $height: 4.8rem;

        #{--cell-size}: $height;
    
        @include display.grid($width: (1fr $height), $height: ($height 1fr));

        flex: 1;

        input, textarea
        {
            @include font.text($color: $light, $font-size: map.get(font.$font-sizes, s3));

            padding: .8rem 1.4rem;
    
            border: solid $color 1px;

            box-sizing: border-box;

            &::placeholder { color: $intermediate; }
        }

        textarea
        {
            @extend %scroll-bar;
    
            grid-column: 1 / 3;
            grid-row: 2;
        }
    }
}


</style>