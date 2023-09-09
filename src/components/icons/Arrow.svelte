<!-- #MAP

    ARROW

-->

<!-- #SCRIPT -->

<script>
// #EXPORT

    // --RPOP
    export let prop_FOCUS = false
</script>

<!-- #HTML -->

<svg
class="arrow"
class:focus={prop_FOCUS}
viewBox="0 0 43 66"
fill="none"
xmlns="http://www.w3.org/2000/svg"
>
    <path
    d="M38 5L5 33L38 61"
    stroke="var(--icon-color)"
    stroke-width="9"
    stroke-linecap="round"
    stroke-linejoin="round"
    />
</svg>

<!-- #STYLE -->

<style>
/* #ARROW */

.arrow.focus { transform: scaleX(-1); }
</style>