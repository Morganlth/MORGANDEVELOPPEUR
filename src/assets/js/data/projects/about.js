/*----------------------------------------------- #||--about--|| */


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
        name: 'about_GLOBAL'
    ,
        getData: lang => ABOUT_DATA[lang] 
    }


// #\-CONSTANTES-\

    // --THIS
    const ABOUT_DATA =
    {
        fr: `Voici quelques projets simples que j'ai réalisés au cours de ma formation.
        Veuillez noter que j'ai dû les modifier et les adapter au mieux pour les intégrer à l'architecture actuelle.
        Vous pouvez retrouver les codes originaux sur mon Github (lien situé en bas de la page ou dans la section contact de ma présentation).`
    ,
        en: `Here are a few simple projects I completed during my training.
        Please note that I had to modify and adapt them as best I could to fit in with the current architecture.
        You can find the original codes on my Github (link at the bottom of the page or in the contact section of my presentation).`
    }


// #\-VARIABLES-\

    // --THIS


// #\-FUNCTIONS-\

    // --SET

    // --GET

    // --UPDATES


//=======@UTILS|

    // --*