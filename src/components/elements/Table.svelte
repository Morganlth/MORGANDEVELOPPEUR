<!-- #MAP

    TABLE

-->

<!-- #SCRIPT -->

<script>
// #EXPORTS

    // --PROPS
    export let
    prop_HEAD = '',
    prop_BODY = []
</script>

<!-- #HTML -->

<table
class="table"
>
    <thead>
        <tr>
            <th>.{prop_HEAD}</th>
        </tr>
    </thead>

    <tbody>
        {#each prop_BODY as value}
            <tr>
                <td>{value.text}</td>
            </tr>
        {/each}
    </tbody>
</table>

<!-- #STYLE -->

<style
lang="scss"
>
/* #USES */

@use 'sass:map';

@use '../../assets/scss/app';

@use '../../assets/scss/styles/position';
@use '../../assets/scss/styles/font';

/* #TABLE */

.table
{
    $size: calc(100% - app.$gap-inline * 2);

    @include position.placement(absolute, 0, 0, 0, 0);

    width: $size;
    height: $size;

    margin: app.$gap-inline;

    border-collapse: collapse;

    thead
    {
        @include font.h-custom($light, map.get(font.$font-sizes, s3));

        height: 10%;
    }
    tbody
    {
        @include font.interact(rgba($light, .3));

        overflow: hidden scroll;

        height: 90%;

        pointer-events: auto;

        tr { min-height: 50px; }

        tr:hover { color: $light; }
    }

    tr
    {
        border-bottom: solid $intermediate 1px;

        text-align: right;
    }
}
</style>