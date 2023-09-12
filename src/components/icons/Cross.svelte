<!-- #MAP

    CROSS

-->

<!-- #SCRIPT -->

<script>
// #EXPORT

    // --PROP
    export let prop_DESTROY = false
</script>

<!-- #HTML -->

<svg
class="cross {prop_DESTROY ? 'destroy' : 'build'}"
viewBox="0 0 81 81"
fill="none"
stroke="var(--icon-color, #FFF)"
stroke-width="15"
stroke-linecap="round"
xmlns="http://www.w3.org/2000/svg"
>
    <path d="M8 8.05371L73 73"/>
    <path d="M8 72.9504L72.9957 7.99989"/>
</svg>

<!-- #STYLE -->

<style
lang="scss"
>
/* #CROSS */

.cross
{
    width: var(--icon-size, 100%);
    height: var(--icon-size, 100%);

    &.build path
    {
        stroke-dashoffset: 120%;

        animation: aBuild .15s ease-in forwards;

        @keyframes aBuild { to { stroke-dashoffset: 0%; } }
    }
    &.destroy path
    {
        stroke-dashoffset: 0%;

        animation: aDestroy .15s ease-in forwards;

        @keyframes aDestroy { to { stroke-dashoffset: 120%; } }
    }

    path { stroke-dasharray: 120%; }
    path:nth-child(1) { animation-delay: .25s; }
    path:nth-child(2) { animation-delay: .4s; }
}
</style>