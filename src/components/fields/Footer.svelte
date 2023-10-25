<!-- #MAP

    FOOTER

-->

<!-- #SCRIPT -->

<script>

</script>

<!-- #HTML -->

<footer>
    <nav>
        <ul>
            {#each ['LinkedIn', 'Github'] as a}
                <li>
                    <a
                    href="./"
                    alt="LE THUAUT Morgan - {a}"
                    >
                        {a}
                    </a>
                </li>
            {/each}
        </ul>
    </nav>

    <p>Tout droit réservé</p>
</footer>

<!-- #STYLE -->

<style
lang="scss"
>
/* #USES */

@use '../../assets/scss/app';

@use '../../assets/scss/styles/utils';
@use '../../assets/scss/styles/position';
@use '../../assets/scss/styles/font';
@use '../../assets/scss/styles/animation';
@use '../../assets/scss/styles/media';

/* #FOOTER */

footer
{
    @include position.placement(fixed, $right: 0, $bottom: 0);

    @extend %no-drag;
    @extend %aScaled;

    z-index: 2;

    display: flex;

    justify-content: space-between;
    align-items: flex-end;

    width: 100%;

    padding: 0 app.$gap-inline app.$gap-block;

    pointer-events: none;

    box-sizing: border-box;

    nav { width: 50%; }

    ul
    {
        display: flex;

        justify-content: flex-start;

        gap: app.$gap-block;

        width: 100%;

        a
        {
            @include font.content($light, false);
            @include font.simple-hover;

            padding: .5rem 1rem 0;

            pointer-events: auto;
    
            text-decoration: none;

            &:focus { color: $primary; }
        }

        @include media.min($ms4)
        {
            justify-content: flex-end;

            gap: 8rem;
        }
    }

    &>p { @include font.content($light); }
}
</style>