<!----------------------------------------------- #||--fragments--|| -->


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

<div
class="fragments {prop_WORD_COLUMN ? '' : 'inline d-flx'}"
style:--fragments-direction={prop_DIRECTION}
>
    {#each prop_FRAGS.value as char, i}
        {#if prop_WORD_COLUMN && char === ' '}
            <br>
        {:else}
            <pre
            class:void={char === ' '}
            style={prop_getStyle(i)}
            bind:this={prop_FRAGS.children[prop_FRAGS.children.length]}
            >{char}</pre>
        {/if}
    {/each}

    {#if prop_TAGS.value instanceof Array}
        <ul
        class="d-flx"
        >
            {#each prop_TAGS.value as tag}
                <li>
                    <strong>
                        {#each tag + '.' as char}
                            <pre
                            data-char={char}
                            bind:this={prop_TAGS.children[prop_TAGS.children.length]}
                            >&nbsp;</pre>
                        {/each}
                    </strong>
                </li>
            {/each}
        </ul>
    {:else if prop_TAGS.value != void '' }
        {#each prop_TAGS.value as char}
            <pre
            data-char={char}
            bind:this={prop_TAGS.children[prop_TAGS.children.length]}
            >&nbsp;</pre>
        {/each}
    {/if}
</div>


<!-- #|-SCRIPT-| -->

<script>

// #\-IMPORTS-\

    // --DATA

    // --SVELTE

    // --LIB

    // --CONTEXTS

//=======@COMPONENTS|

    // --*
    
//=======@STYLE|

    // --*


// #\-EXPORTS-\

    // --PROPS
    export let
    prop_WORD_COLUMN = false
    ,
    prop_DIRECTION = 0
    ,
    prop_FRAGS = { children: [], value: '' },
    prop_TAGS  = { children: [], value: '' }
    ,
    prop_getStyle = () => ''

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

    // --SET

    // --GET

    // --UPDATES

    // --DESTROY


//=======@COMMANDS|

    // --*


//=======@EVENTS|

    // --*


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

    /* --APP */

    /* --DEPENDENCIES */
    @use '../../assets/scss/styles/font';

    /* --MEDIA */


/* #\-VARIABLES-\ */

    /* --* */


/* #\-THIS-\ */

.fragments
{
    &, pre { font: inherit; }

    &, ul li { white-space: nowrap; }

    &.inline { align-items: flex-end; }

    pre { display: inline-block; }

    ul
    {
        gap: 1rem;

        margin-left: 2rem;

        li { @include font.text($color: $primary, $regular: false, $line-height: font.$line-height-min); }
    }
}


</style>