<!-- #MAP

    CROSS

-->

<!-- #HTML -->

<svg
viewBox="0 0 81 81"
fill="none"
stroke="var(--icon-color)"
stroke-width="15"
stroke-linecap="round"
xmlns="http://www.w3.org/2000/svg"
>
    <path d="M8 8.05371L73 73"/>
    <path d="M8 72.9504L72.9957 7.99989"/>
</svg>

<!-- #STYLE -->

<style>
    path
    {
        stroke-dasharray: 120%;
        stroke-dashoffset: 120%;

        animation: draw .15s ease-in forwards;
    }
    path:nth-child(1) { animation-delay: .25s; }
    path:nth-child(2) { animation-delay: .4s; }

    @keyframes draw { to { stroke-dashoffset: 0%; } }
</style>