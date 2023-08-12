<!-- #SCRIPT -->

<script>

</script>

<!-- #HTML -->

<footer>
    <nav>
        <ul>
            <li>
                <a
                href="./"
                alt="LE THUAUT Morgan - LinkedIn"
                >
                    LinkedIn
                </a>
            </li>

            <li>
                <a
                href="./"
                alt="LE THUAUT Morgan - Github"
                >
                    Github
                </a>
            </li>
        </ul>
    </nav>

    <p>Tout droit réservé</p>
</footer>

<!-- #STYLE -->

<style
lang="scss"
>
/* #USES */

@use 'sass:map';

@use '../../assets/scss/app';

@use '../../assets/scss/styles/position';
@use '../../assets/scss/styles/font';
@use '../../assets/scss/styles/media';

/* #FOOTER */

footer
{
    @include position.placement(fixed, auto, 0, 0, auto);

    z-index: 2;

    display: flex;

    justify-content: space-between;
    align-items: flex-end;

    width: 100%;

    padding: 0 app.$gap-inline app.$gap-block;

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
            @include font.interact($light);
    
            @extend %simple-hover;

            padding: .5rem 1rem 0;

            text-decoration: none;
        }

        @include media.min($ms4)
        {
            justify-content: flex-end;

            gap: 8rem;
        }
    }

    &>p { @include font.interact($light, map.get(font.$font-sizes, s2), 1, map.get(font.$content-font-weight, w1)); }
}
</style>