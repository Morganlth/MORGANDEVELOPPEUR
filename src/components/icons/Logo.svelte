<!-- #SCRIPT -->

<script>
// #EXPORT

    // --PROP
    export let prop_PIECE = false
</script>

<!-- #HTML -->

<svg
width="90"
height="90"
viewBox="0 0 90 90"
fill="none" 
mlns="http://www.w3.org/2000/svg"
>
    <mask
    id="path-1-inside-1_2_8"
    fill="white"
    >
        <path 
        d="M0 0H90V90H0V0Z"
        />
    </mask>

    <path
    d={prop_PIECE
    ? 'M0 0V-20H-20V0H0ZM0 90H-20V110H0V90ZM0 20H90V-20H0V20ZM90 70H0V110H90V70ZM20 90V0H-20V90H20Z'
    : 'M0 0V-20H-20V0H0ZM90 0H110V-20H90V0ZM90 90V110H110V90H90ZM0 90H-20V110H0V90ZM0 20H90V-20H0V20ZM70 0V90H110V0H70ZM90 70H0V110H90V70ZM20 90V0H-20V90H20Z'}
    fill="var(--icon-color)"
    mask="url(#path-1-inside-1_2_8)"
    />

    <path
    d="M0 45H55"
    stroke="var(--icon-color)"
    stroke-width="20"
    />

    {#if !prop_PIECE}
        <path
        d="M45 55V-2.6226e-06"
        stroke="var(--icon-color)"
        stroke-width="20"
        />
    {/if}
</svg>


<!-- #STYLE -->

<style
lang="scss"
>
/* #USE */

@use '../../assets/scss/styles/_size';

/* #LOGO */

svg { @extend %any; }
</style>