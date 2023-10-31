<!-- #MAP

-EVENT
    WRAPPER
        ~SLOT INFO
        HEADER
            ~SLOT TITLE
            ~SLOT NAV
            ~SLOT DESCRIPTION
        ~SLOT

-->

<!-- #HTML -->

<div
class="wrapper"
>
    <slot
    name="info"
    />

    <section
    class="header"
    >
        <slot
        name="title"
        />

        <slot
        name="nav"
        />

        <slot
        name="quote"
        />
    </section>

    <slot />
</div>

<!-- #STYLE -->

<style
lang="scss"
>
/* #USES */

@use '../../assets/scss/app';

@use '../../assets/scss/styles/position';

@use '../../assets/scss/styles/media';

/* #WRAPPER */

.wrapper
{
    @include position.placement(sticky, $top: 0, $right: 0, $left: 0);

    overflow: clip;

    width: 100%;
    height: 100vh;

    padding: 8rem app.$gap-inline;

    background-color: crimson;
    border: solid $light 2px;

    box-sizing: border-box;

    .header
    {
        position: absolute;

        z-index: 1;

        width: calc(100% - app.$gap-inline * 2);
    
        user-select: none;
    }

    @include media.min($height: $ms3) { padding-top: max(11rem, 70px); }
}
</style>