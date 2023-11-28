/*----------------------------------------------- #||--terminal--|| */


// #\-IMPORTS-\

    // --SVELTE

    // --LIB

    // --CONTEXTS

    // --JS

//=======@COMPONENTS|

    // --*


// #\-EXPORTS-\

    // --THIS
    export default
    {
        name: 'terminal'
    ,
        getData: lang =>
        {
            TERMINAL_DATA.face.head.cellTitle = TERMINAL_DATA.face.head.cellTitle[lang]
            TERMINAL_DATA.face.head.info      = TERMINAL_DATA.face.head.info[lang]

            TERMINAL_DATA.back.cellTitle        = TERMINAL_DATA.back.cellTitle[lang]
            TERMINAL_DATA.back.cellCommandTitle = TERMINAL_DATA.back.cellCommandTitle[lang]
            TERMINAL_DATA.back.desc.title       = TERMINAL_DATA.back.desc.title[lang]

            for (const SECTION of TERMINAL_DATA.back.desc.sections)
            {
                SECTION.title = SECTION.title[lang]
        
                for (let i = 0; i < SECTION.contents.length; i++)
                {
                    const C = SECTION.contents[i]
            
                         if (C.br)                              continue
                    else if (C.cell)                            C.cellTitle         = C.cellTitle[lang]
                    else if (C.command)         { if (C.params) C.params            = C.params[lang]     }
                    else if (C.commandFraction) { if (C.value)  C.value             = C.value[lang]      }
                    else                                        SECTION.contents[i] = C[lang]
                }
            }

            return TERMINAL_DATA
        }
    }


// #\-CONSTANTES-\

    // --THIS
    const TERMINAL_DATA =
    {
        face:
        {
            head:
            {
                cellTitle: { fr: 'description du terminal', en: 'terminal description' }
                ,
                info:
                {
                    fr: [{ topic: 'recherche', datatype: 'texte' }, { topic: 'commande', datatype: 'app...' }]
                    ,
                    en: [{ topic: 'search', datatype: 'text' }, { topic: 'command', datatype: 'app...' }]
                }
            }
        }
    ,
        back:
        {
            cellTitle       : { fr: 'fermer', en: 'close' },
            cellCommandTitle: { fr: 'cliquer pour éxécuter la commande', en: 'click to run the command' }
            ,
            desc:
            {
                title: { fr: 'FONCTIONS DU TERMINAL', en: 'TERMINAL FUNCTIONS' }
                ,
                sections:
                [
                    {
                        title: { fr: 'Taper une commande pour obtenir, modifier, ou optimiser', en: 'Type a command to obtain, modify or optimise' }
                        ,
                        contents:
                        [
                            {
                                fr: `Le terminal vous offre la possibilité de personnaliser le site web LE THUAUT Morgan.
                                Vous pouvez par exemple changer des paramètres pour optimiser la page ou réduire/augmenter des effets visuels.
                                Les commandes se traduisent par le mot-clé:`
                                ,
                                en: `The terminal allows you to personalise the LE THUAUT Morgan website.
                                For example, you can change parameters to optimise the page or reduce/increase visual effects.
                                Commands are expressed by the keyword:`
                            }
                            ,
                            {
                                commandFraction: true,
                                commandType    : 'app'
                            }
                            ,
                            { fr: 'suivi du nom d\'une commande, par exemple:', en: 'followed by the name of a command, for example:' }
                            ,
                            {
                                commandFraction: true,
                                commandType    : 'name',
                                value          : { fr: 'success', en: 'success' }
                            }
                            ,
                            { fr: '; puis éventuellement d\'un ou plusieurs paramètres séparés par des virgules:', en: '; then optionally one or more parameters separated by commas:' }
                            ,
                            {
                                commandFraction: true,
                                commandType    : 'params',
                                value          : { fr: '"Le terminal, mon Succès"', en: '"The terminal, my Success"' }
                            }
                            ,
                            { fr: '(premier paramètre "p1", second paramètre "p2", ...).', en: '(first parameter "p1", second parameter "p2", etc.).'}
                            ,
                            { br: true }
                            ,
                            { fr: 'Cela nous donne la commande suivante:', en: 'This gives us the following command:' }
                            ,
                            {
                                command: true,
                                name   : 'success',
                                params : { fr: 'Le terminal, mon Succès', en: 'The terminal, my Success' }
                            }
                            ,
                            { br: true }
                            ,
                            { br: true }
                            ,
                            { fr: 'Vous pouvez retrouver la liste des commandes avec la commande', en: 'You can retrieve the list of commands with the command' }
                            ,
                            {
                                command: true,
                                name   : 'commands'
                            }
                        ]
                    }
                    ,
                    {
                        title: { fr: 'Rechercher une section ou une information', en: 'Search for a section or information' }
                        ,
                        contents:
                        [
                            {
                                fr : `Le terminal agit comme une barre de recherche.
                                Tapez un mot-clé pour trouver une section correspondante, par exemple:`
                                ,
                                en: `The terminal acts as a search bar.
                                Type in a keyword to find a corresponding section, for example:`
                            }
                            ,
                            {
                                cell     : true,
                                cellTitle: { fr: 'cliquer pour rejoindre la page de contact', en: 'click here to go to the contact page' },
                                value    : 'contact'
                            }
                            ,
                            { br: true }
                            ,
                            { br: true }
                            ,
                            { fr: 'Vous pouvez retrouver la liste des mots-clés avec la commande', en: 'You can retrieve the list of keywords with the command' }
                            ,
                            {
                                command: true,
                                name   : 'keywords'
                            }
                        ]
                    }
                ]
            }
        }
    }


// #\-VARIABLES-\

    // --THIS


// #\-FUNCTIONS-\

    // --SET

    // --GET

    // --UPDATES


//=======@UTILS|

    // --*