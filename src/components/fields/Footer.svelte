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

    <p> TOUT DROIT RÉSERVÉ </p>
</footer>

<!-- #STYLE -->

<style
lang="scss"
>
/* #USES */

@use 'sass:math';

@use '../../assets/scss/app';

@use '../../assets/scss/styles/position';
@use '../../assets/scss/styles/font';

/* #FOOTER */

footer
{
    @include position.placement(fixed, auto, 0, 0, auto);
    @include font.interact($dark);

    z-index: 1;

    display: flex;

    justify-content: space-between;
    align-items: flex-end;

    width: 50%;

    padding: 0 app.$gap-inline app.$gap-block 0;

    box-sizing: border-box;

    ul
    {
        display: flex;

        gap: 6rem;

        a
        {
            color: inherit;
            text-decoration: none;
        }
    }
}
</style>