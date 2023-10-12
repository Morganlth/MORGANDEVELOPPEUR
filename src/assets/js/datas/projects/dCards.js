// #EXPORT

    // --CARDS_DATAS
    export default
    {
        name: 'cards'
    ,
        process: true
    ,
        datas:
        [
            {
                tags: ['booki'],
                value: 'BOOKI',
                texture: ThreeDiamonds,
                color: COLORS.indicator
            },
            {
                tags: ['sophiebluel'],
                value: 'SOPHIE BLUEL',
                texture: TwoHearts,
                color: COLORS.indicator
            },
            {
                tags: ['ninacarducci'],
                value: 'NINA CARDUCCI',
                texture: AceClubs,
                color: COLORS.primary
            }
        ].map((card, i) =>
        {
            card.id = i

            return card
        })
    }

// #IMPORTS

    // --LIB
    import COLORS from '$lib/colors'

    // --COMPONENT-CARDS
    import AceClubs from '../../../../components/cards/AceClubs.svelte'
    import TwoHearts from '../../../../components/cards/TwoHearts.svelte'
    import ThreeDiamonds from '../../../../components/cards/ThreeDiamonds.svelte'