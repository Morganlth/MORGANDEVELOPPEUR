<!-- #MAP

    CIRCLE

-->

<!-- #SCRIPT -->

<script>
    // #EXPORT

        // --PROP
        export let prop_FILL = false
</script>

<!-- #HTML -->

<svg
class="circle"
class:animate-circle={!prop_FILL}
viewBox="0 0 80 80"
fill={prop_FILL ? 'var(--icon-color, #FFF)' : 'none'}
stroke="var(--icon-color, #FFF)"
stroke-width="15"
xmlns="http://www.w3.org/2000/svg"
>
    <circle cx="40" cy="40" r="32.5" />
</svg>

<!-- #STYLE -->

<style
lang="scss"
>
/* #USE */

@use '../../assets/scss/styles/size';

/* #CIRCLE */

.circle
{
    @extend %any;

    &.animate-circle
    {
        stroke-dasharray: 300%;
        stroke-dashoffset: 300%;

        animation: draw .3s ease-in forwards;

        @keyframes draw { to { stroke-dashoffset: 0%; } }
    }
}
</style>