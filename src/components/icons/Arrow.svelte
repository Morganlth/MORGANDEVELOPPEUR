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
style:opacity={prop_FOCUS ? 1 : 0}
viewBox="0 0 30 26"
fill="none"
xmlns="http://www.w3.org/2000/svg"
>
    <path
    d="M30 13L0 25.9904L3 13L0 0.00961304L30 13Z"
    fill="var(--icon-color, #FFF)"
    />
</svg>
    
<!-- #STYLE -->

<style>
/* #ARROW */

.arrow
{
    width: 100%;

    transition: opacity .2s;
}
</style>