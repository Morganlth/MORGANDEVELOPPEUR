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

    <button
    type="button"
    >
        &#60
    </button>
</footer>

<!-- #STYLE -->

<style
lang="scss"
>
/* #USES */

@use 'sass:math';
@use 'sass:map';

@use '../../assets/scss/_app';

@use '../../assets/scss/styles/_elements';
@use '../../assets/scss/styles/_position';
@use '../../assets/scss/styles/_font';

/* #FOOTER */

footer
{
    @include position.placement(fixed, auto, 0, 0, auto);

    z-index: 1;

    display: flex;

    justify-content: space-between;
    align-items: flex-end;

    width: 57%;

    padding: 0 app.$gap-inline app.$gap-block 0;

    box-sizing: border-box;

    ul
    {
        display: flex;

        gap: 8rem;

        a
        {
            @include font.interact($light);
    
            @extend %simple-hover;

            padding: .5rem 1rem 0;
            text-decoration: none;
        }
    }

    &>button
    {
        @include font.interact($primary, map.get(font.$font-sizes, s4), 1, map.get(font.$content-font-weight, w));

        @extend %button-reset;

        padding: 1rem 0 1rem 2rem;

        box-sizing: border-box;
    }
}
</style>