<!-- #MAP

    LINE
        ID
        CONTENT

-->

<!-- #HTML -->

<div
class="line"
>
    <div
    class="id"
    >
        <slot
        name="id"
        />
    </div>

    <div
    class="content"
    >
        <slot
        name="content"
        />
    </div>
</div>

<!-- #STYLE -->

<style
lang="scss"
>
/* #USES */

@use 'sass:map';

@use '../../assets/scss/styles/display';
@use '../../assets/scss/styles/font';
@use '../../assets/scss/styles/media';

/* #LINE */

.line
{
    $line-h: 5rem;
    $font-size: map.get(font.$font-sizes, s3);

    @include font.content($regular: true, $font-size: inherit);

    display: flex;

    width: 100%;
    height: $line-h;
    min-height: $line-h;
    max-height: $line-h;

    :global * { font: inherit;  }

    .id, .content
    {
        @extend %f-a-center;

        height: 100%;
    }

    .id
    {
        flex-shrink: 0;

        width: 4rem;
    
        color: $primary;
        font-size: $font-size;
    }

    .content
    {
        flex: 1;

        width: 100%;

        padding-left: 2rem;

        box-sizing: border-box;

        user-select: auto;

        color: $light;
        font-size: map.get(font.$font-sizes, s2);

        @include media.min($ms3) { font-size: $font-size; }
    }
}
</style>