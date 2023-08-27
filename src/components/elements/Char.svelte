<!-- #MAP

    CHAR

-->

<!-- #SCRIPT -->

<script>
// #EXPORTS

    // --PROPS
    export let
    prop_CHILDREN = [],
    prop_CHAR = ''
</script>

<!-- #HTML -->

<span
class="char"
data-char={prop_CHAR}
bind:this={prop_CHILDREN[prop_CHILDREN.length]}
>&nbsp;</span>