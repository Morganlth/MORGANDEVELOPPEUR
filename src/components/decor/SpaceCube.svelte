<!-- #SCRIPT -->

<script>
// #IMPORTS

    // --JS
    import MATH from '../../assets/js/utils/math'

    // --LIB
    import { COLORS } from '$lib/app'

    // --THREE
    import WebGL from 'three/addons/capabilities/WebGL'
    import { AmbientLight, BoxGeometry, DirectionalLight, Mesh, MeshStandardMaterial, PerspectiveCamera, Scene, WebGLRenderer } from 'three'

    // --SVELTE
    import { onMount } from 'svelte'

// #CONSTANTES

    // --ELEMENT-SPACECUBE
    // const SPACECUBE_CUBES = new Float64Array(
    //     [
    //         2, 3, -.5,
    //         1.5, 5, 2.2,
    //         1.5, 0, -1.5,
    //         1.5, 6, -1.7,
    //         1, 4, 3,
    //         1, 4, 0,
    //         1, 8, -1,
    //         1, .5, 2.5,
    //         1, 2, 1,
    //         1, 3, 1.1,
    //         1, 0, 2,
    //         1, 2, 2.5,
    //         1, 7, 0,
    //         1, 6, .8,
    //         1, 8.1, 3.5,
    //         1, 7.5, 2,
    //         1, -2, -1,
    //         1, 4, -2.5,
    //         1, 1.4, -2.3,
    //         1, -1, -2,
    //         1, -3.6, -2.7,
    //         1, -5, -3.3,
    //         1, .6, .3,
    //         1, -.3, -.1,
    //         .5, -7, -3.7,
    //         .5, -6, -3.3,
    //         .5, -4.8, -2.5,
    //         .5, -4, -2,
    //         .5, -3.8, -3.5,
    //         .5, -2.6, -2.6,
    //         .5, -2, -2,
    //         .5, -3, -1,
    //         .5, 1.5, -1,
    //         .5, -2.9, -1.9
    //     ]
    // )
    const SPACECUBE_CUBES = new Float64Array(
        [
            2, 1, -1,
            1.5, -1.75, -2.25,
            1.5, 2.75, -2.75,
            1.5, 3.75, 1.75,
            1, -1, -.5,
            1, -.5, -2,
            // 1, -.5, -3,
            1, .5, -2.5,
            1, 2.5, -1.5,
            1, 2.5, -.5,
            1, .5, 1,
            1, 1.5, .5,
            1, 1.5, 2,
            1, 2.5, 2,
            1, 2.5, 1,
            1, 5, 2.5,
            1, 5, 1.5,
            1, 4.5, .5,
            1, 3.5, 0,
            1, 3.5, -1,
            1, 5, -.5,
            1, 4.5, -1.5,
            1, 4, -2.5,
            1, 5, -2.5,
            1, -3.5, -1,
            1, -4.5, -2,
            1, -5.5, -2.5,
            1, -3.5, -3.5,
            1, 6, 3.5,
            1, 6.5, 2,
            1, 6, .5,
            1, 7, .5,
            1, 6, -1,
            1, 6, -2,
            1, 7, -2,
            .5, -1.75, -.75,
            .5, -1.75, -1.25,
            .5, -1.25, -1.25,
            .5, -.75, -1.25,
            .5, -.25, -1.25,
            .5, -.25, -.75,
            .5, -.25, -.25,
            .5, 1.25, -2.25,
            .5, 1.75, -2.25,
            .5, -.75, .75,
            .5, .25, .25,
            .5, .75, .25,
            .5, 1.25, 1.25,
            .5, 1.75, 1.25,
            .5, 2.25, .25,
            .5, 2.75, .25,
            .5, 3.25, .75,
            .5, 3.75, .75,
            .5, 3.25, -1.75,
            .5, 3.75, -1.75,
            .5, 4.25, -.25,
            .5, 4.25, -.75,
            .5, 5.25, -1.25,
            .5, 5.25, -1.75,
            .5, -2.25, .25,
            .5, -3.25, -2.25,
            .5, -4.75, -.75,
            .5, -4.75, -3.25,
            .5, -6.25, -2.75,
            .5, -6.75, -2.75,
            .5, -7.75, -3.5,
            .5, 6.75, 1.25,
            .5, 7.25, -.75,
            .5, 7.25, 3.75,
            .5, 7.25, 3.25,
            .5, 7.75, 3.25
        ]
    )

// #VARIABLES

    // --ELEMENT-SPACECUBE
    let
    spacecube,
    spacecube_SCENE,
    spacecube_CAMERA,
    spacecube_RENDERER

// #FUNCTIONS

    // --SET
    function spacecube_set()
    {
        if (WebGL.isWebGLAvailable())
        {
            spacecube_setVar()

            spacecube.appendChild(spacecube_RENDERER.domElement)

            spacecube_draw()
            spacecube_light()
            spacecube_animationLoop()
        }
    }

    function spacecube_setVar()
    {
        const [WIDTH, HEIGHT] = [window.innerWidth, window.innerHeight]

        spacecube_SCENE = new Scene()
        spacecube_CAMERA = new PerspectiveCamera(75, WIDTH / HEIGHT, 0.1, 10)
        spacecube_RENDERER = new WebGLRenderer({ alpha: true, antialias: true })

        spacecube_CAMERA.position.z = 5

        spacecube_RENDERER.setClearColor(0x000000, 0)
        spacecube_RENDERER.setSize(WIDTH, HEIGHT)
    }

    // --DRAW
    function spacecube_draw()
    {
        for (let i = 0; i < SPACECUBE_CUBES.length; i += 3)
        {
            const
            SIZE = SPACECUBE_CUBES[i],
            [GEOMETRY, MATERIAL] = [new BoxGeometry(SIZE, SIZE, SIZE), new MeshStandardMaterial({ color: COLORS.dark, wireframe: false })],
            CUBE = new Mesh(GEOMETRY, MATERIAL)

            CUBE.position.set(SPACECUBE_CUBES[i + 1], SPACECUBE_CUBES[i + 2])
            CUBE.rotation.x = -MATH.rad.r45 / 2
            CUBE.rotation.y = MATH.rad.r45
    
            spacecube_SCENE.add(CUBE)
        }
    }

    // --ANIMATION
    async function spacecube_animationLoop()
    {
        spacecube_RENDERER.render(spacecube_SCENE, spacecube_CAMERA)

        requestAnimationFrame(spacecube_animationLoop)
    }

    // --UTILS
    function spacecube_light()
    {
        const [AMBIENTLIGHT, DIRECTIONALLIGHT] = [new AmbientLight(COLORS.light), new DirectionalLight(COLORS.light, 2.5)]
        
        spacecube_SCENE.add(AMBIENTLIGHT)
        spacecube_SCENE.add(DIRECTIONALLIGHT)
    }

// #CYCLE

onMount(spacecube_set)
</script>

<!-- #HTML -->

<div
class="space-cube"
bind:this={spacecube}
>
</div>

<!-- #STYLE -->

<style
lang="scss"
>
/* #USES */

@use '../../assets/scss/styles/position';
@use '../../assets/scss/styles/size';

/* #SPACECUBE */

.space-cube
{
    @include position.placement(absolute, 0, 0, 0, 0);
    @include size.any;
}
</style>