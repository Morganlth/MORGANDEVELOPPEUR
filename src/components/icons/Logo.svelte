<!-- #MAP

    LOGO

-->

<!-- #HTML -->

<svg
class="logo"
viewBox="0 0 50 50"
fill="none"
xmlns="http://www.w3.org/2000/svg"
>
    <path
    d="M25 30V5H45V45H5V25M5 25V5H20M5 25H20"
    stroke="var(--icon-color, #FFF)"
    stroke-width="10"
    />
</svg>

<!-- #STYLE -->

<style
lang="scss"
>
/* #USE */

@use '../../assets/scss/styles/size';

/* #LOGO */

.logo
{
    @extend %any;

    path { transition: stroke .8s; }
}
</style>