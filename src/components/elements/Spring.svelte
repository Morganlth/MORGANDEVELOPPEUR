<!-- #MAP

    SPRING

-->

<!-- #SCRIPT -->

<script>
// #IMPORT

    // --CONTEXT
    import { SPRING } from '../../App.svelte'

// #VARIABLES

    // --ELEMENT-SPRING
    let
    spring_$ON = SPRING.spring_$ON,
    spring_$COORDS = SPRING.spring_$COORDS,
    spring_$SIZE = SPRING.spring_$SIZE
</script>

<!-- #HTML -->

{#if $spring_$ON}
    <svg
    class="spring"
    >
        <circle
        cx={$spring_$COORDS.x}
        cy={$spring_$COORDS.y}
        r={Math.abs($spring_$SIZE)}
        />
    </svg>
{/if}

<!-- #STYLE -->

<style
lang="scss"
>
/* #USES */

@use '../../assets/scss/styles/position';
@use '../../assets/scss/styles/size';

/* #SPRING */

.spring
{
    @include position.placement(absolute, 0, 0, 0, 0);

    @extend %any;

    z-index: 3;

    mix-blend-mode: difference;

    pointer-events: none;

    circle { fill: $light; }
}
</style>