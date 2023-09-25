<!-- #MAP

    CARD

-->

<!-- #SCRIPT -->

<script>
// #EXPORTS

    // --PROPS
    export let
    prop_ID = void 0,
    prop_GROUP = []
</script>

<!-- #HTML -->

<div
class="card"
data-id={prop_ID}
style:transform="translate({prop_ID % 2 ? 1 : -1})"
bind:this={prop_GROUP[prop_GROUP.length]}
>

</div>

<!-- #STYLE -->

<style
lang="scss"
>
/* #CARD */

.card
{
    position: absolute;

    width: max(100px, 30vw);
    height: max(300px, 90vw);

    border: solid $light 2px;
}
</style>