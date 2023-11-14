/*----------------------------------------------- #||--cards--|| */


// #\-IMPORTS-\

    // --SVELTE

    // --LIB
    import COLORS from '$lib/colors'

    // --CONTEXTS

    // --JS

//=======@COMPONENTS|

    // --*
    import AceClubs      from '../../../../main/pages/page/projects/cards/textures/AceClubs.svelte'
    import TwoHearts     from '../../../../main/pages/page/projects/cards/textures/TwoHearts.svelte'
    import ThreeDiamonds from '../../../../main/pages/page/projects/cards/textures/ThreeDiamonds.svelte'


// #\-EXPORTS-\

    // --THIS
    export default
    {
        name: 'cards'
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


// #\-CONSTANTES-\

    // --THIS


// #\-VARIABLES-\

    // --THIS


// #\-FUNCTIONS-\

    // --SET

    // --GET

    // --UPDATES


//=======@UTILS|

    // --*