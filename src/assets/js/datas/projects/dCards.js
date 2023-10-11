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
                value: 'BOOKI'
            },
            {
                tags: ['sophiebluel'],
                value: 'SOPHIE BLUEL'
            },
            {
                tags: ['ninacarducci'],
                value: 'NINA CARDUCCI'
            }
        ].map((card, i) =>
        {
            card.id = i

            return card
        })
    }