<!-- #MAP

    LOGO

-->

<!-- #SCRIPT -->

<script>
// #EXPORT

    // --PROP
    export let prop_PIECE = false
</script>

<!-- #HTML -->

<svg
class="logo"
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
    class="frame"
    d={prop_PIECE
    ? 'M0 0V-20H-20V0H0ZM0 90H-20V110H0V90ZM0 20H90V-20H0V20ZM90 70H0V110H90V70ZM20 90V0H-20V90H20Z'
    : 'M0 0V-20H-20V0H0ZM90 0H110V-20H90V0ZM90 90V110H110V90H90ZM0 90H-20V110H0V90ZM0 20H90V-20H0V20ZM70 0V90H110V0H70ZM90 70H0V110H90V70ZM20 90V0H-20V90H20Z'}
    fill="var(--icon-color, #FFF)"
    mask="url(#path-1-inside-1_2_8)"
    />

    <path
    class="horizontal-bar"
    d="M0 45H55"
    stroke="var(--icon-color, #FFF)"
    stroke-width="20"
    />

    {#if !prop_PIECE}
        <path
        class="vertical-bar"
        d="M45 55V-2.6226e-06"
        stroke="var(--icon-color, #FFF)"
        stroke-width="20"
        />
    {/if}
</svg>

<!-- <svg class="logo" width="250" height="50" viewBox="0 0 250 50" fill="none" stroke="white" stroke-width="10" xmlns="http://www.w3.org/2000/svg">
    <path>
        <animate
        repeatCount="1"
        attributeName="d"
        dur="1s"
        fill="freeze"
        values="
        M244.99 5.98999H244.98V6.00999H245V5.98999H225V5.99999H0;
        M194.99 5H194.98V25.01H195V5H175V25H0;
        M144.99 44.99 H125 V45 H145 V5 H125 V25 H0;
        M74.99 24.99H55V45H95V5H75V25H0;
        M24.99 5 H5 V45 H45 V5 H25 V25 H0
        ">
    </path>
</svg> -->

<!-- #STYLE -->

<style
lang="scss"
>
/* #USE */

@use '../../assets/scss/styles/size';

/* #LOGO */

svg { @extend %any; }
</style>