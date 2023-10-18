<!-- #MAP

-EVENT
    WRAPPER
        ~SLOT INFO
        HEADER
            ~SLOT TITLE
            ~SLOT NAV
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

/* #WRAPPER */

.wrapper
{
    @include position.placement(sticky, $top: 0, $right: 0, $left: 0);

    overflow: clip;

    width: 100%;
    height: 100vh;

    padding: max(11rem, 70px) app.$gap-inline 8rem;

    pointer-events: none;

    box-sizing: border-box;

    .header
    {
        position: absolute;

        width: calc(100% - app.$gap-inline * 2);
    
        user-select: none;
    }
}
</style>