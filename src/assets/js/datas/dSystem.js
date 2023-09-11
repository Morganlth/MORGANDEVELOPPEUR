// #EXPORT

    // --DATAS-SYSTEM
    export const SYSTEM_ORBITS_DATAS =
    [
        {
            prop_ROTATE: MATH.toRad(150),
            prop_OFFSET: 1.05,
            prop_SRC: 'html-5.png',
            prop_ALT: 'HTML Logo : https://www.flaticon.com/fr/icone-gratuite/html-5_174854?term=html&page=1&position=2&origin=search&related_id=174854',
            prop_COLOR: '#FC490B'
        },
        {
            prop_ROTATE: MATH.toRad(30),
            prop_OFFSET: 0,
            prop_SRC: 'js.png',
            prop_ALT: 'JavaScript Logo : https://www.flaticon.com/fr/icone-gratuite/js_5968292?term=javascript&page=1&position=7&origin=search&related_id=5968292',
            prop_COLOR: '#FFDF00'
        },
        {
            prop_ROTATE: MATH.toRad(60),
            prop_OFFSET: 4.2,
            prop_SRC: 'node-js.png',
            prop_ALT: 'Node Js Logo : https://www.pngwing.com/en/free-png-yghmf',
            prop_COLOR: '#88C043'
        },
        {
            prop_ROTATE: MATH.toRad(90),
            prop_OFFSET: 3.15,
            prop_SRC: 'github-mark-white.png',
            prop_ALT: 'Github Logo : https://github.com/logos',
            prop_COLOR: '#FFFFFF'
        },
        {
            prop_ROTATE: MATH.toRad(120),
            prop_OFFSET: 2.1,
            prop_SRC: 'open-graph.png',
            prop_ALT: 'Open Graph Logo : https://fr.m.wikipedia.org/wiki/Fichier:Open_Graph_protocol_logo.png',
            prop_COLOR: '#7BA5D8'
        }
    ].map((props, i) => ({ tag: SKILLS_TAGS_DATAS[i], props: props }))

// #IMPORTS

    // --JS
    import { SKILLS_TAGS_DATAS } from './dSkills'
    import MATH from '../utils/math'