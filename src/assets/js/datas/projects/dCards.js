// #EXPORT

    // --CARDS-DATAS
    export default
    {
        name: 'cards'
    ,
        process: true
    ,
        datas:
        [
            {
                id: 0,
                name: 'booki',
                value: 'BOOKI',
                texture: ThreeDiamonds,
                color: COLORS.indicator
            },
            {
                id: 1,
                name: 'sophiebluel',
                value: 'SOPHIE BLUEL',
                texture: TwoHearts,
                color: COLORS.indicator
            },
            {
                id: 2,
                name: 'ninacarducci',
                value: 'NINA CARDUCCI',
                texture: AceClubs,
                color: COLORS.primary
            }
        ].map(card =>
        {
            card.tags = [card.name]

            return card
        })
    }

// #IMPORTS

    // --LIB
    import COLORS from '$lib/colors'

    // --COMPONENT-TEXTURES
    import AceClubs from '../../../../components/textures/AceClubs.svelte'
    import TwoHearts from '../../../../components/textures/TwoHearts.svelte'
    import ThreeDiamonds from '../../../../components/textures/ThreeDiamonds.svelte'