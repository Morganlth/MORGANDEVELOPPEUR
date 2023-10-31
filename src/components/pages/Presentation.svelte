<!-- #MAP

-ROUTER
-EVENT
    PRESENTATION
        FEATURE

-->

<!-- #SCRIPT -->

<script>
// #EXPORTS

    // --PROPS
    export let
    prop_ID = void 0,

    prop_FOCUS = false,

    prop_FEATURES = [],

    prop_TOP = 0,
    prop_RATIO = 0,

    prop_START = void 0,
    prop_DIF = void 0

    // --BINDS
    export let page_CHARGED = false

    export const PAGE_NAV = { callback: nav_e$Click }

    // BIND page_process

// #IMPORTS

    // --CONTEXTS
    import { ROUTER, EVENT } from '../../App.svelte'

    // --SVELTE
    import { onMount } from 'svelte'

    // --COMPONENT-ELEMENT
    import Features from '../elements/Features.svelte'

// #CONSTANTE

    // --ELEMENT-FEATURES
    const FEATURES_FRACTION = 1 / prop_FEATURES.length

// #FUNCTIONS

    // --SET
    function presentation_set() { page_CHARGED = true }

    // --GET
    function features_getTarget(target) { return prop_FEATURES.find(feature => feature.tags.includes(target)) }

    // --EVENT
    export function nav_e$Click({id})
    {
        if (id === 0)
        {
            const CONTACT = features_getTarget('contact')
        
            presentation_goTo(CONTACT ? CONTACT.id : prop_FEATURES.length - 1)
        }
    }

    // --UTILS
    export function page_process(str, target)
    {
        switch (target)
        {
            case 'top':
                EVENT.event_scrollTo(prop_TOP)
                break
            case 'start':
                EVENT.event_scrollTo(prop_START)
                break
            case 'features':
                const FEATURE = features_getTarget(str)
                if (FEATURE) presentation_goTo(FEATURE.id)
                break
            default:
                break
        }
    }

    function presentation_goTo(id = 0)
    {
        console.log(id)
        const TOP = prop_START + id * FEATURES_FRACTION * prop_DIF + prop_DIF * FEATURES_FRACTION / 2

        EVENT.event_scrollTo(TOP, ROUTER.router_getInstant(TOP))
    }

// #CYCLE

onMount(presentation_set)
</script>

<!-- #HTML -->

<div
class="presentation"
data-page-id={prop_ID}
>
    <Features
    prop_FRACTION={FEATURES_FRACTION}
    {prop_FOCUS}
    {prop_RATIO}
    {prop_FEATURES}
    />
</div>

<style
lang="scss"
>
/* #USES */

@use '../../assets/scss/styles/position';
@use '../../assets/scss/styles/size';

/* #PRESENTATION */

.presentation
{
    @include position.placement(absolute, 0, 0, 0, 0);

    @extend %any;

    overflow: clip;
}
</style>