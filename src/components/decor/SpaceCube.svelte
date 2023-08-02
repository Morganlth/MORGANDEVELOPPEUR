<!-- #SCRIPT -->

<script>
// #IMPORTS

    // --JS
    import MATH from '../../assets/js/utils/math'

    // --LIB
    import { COLORS } from '$lib/app'

    // --THREE
    import WebGL from 'three/addons/capabilities/WebGL'
    import { AmbientLight, BoxGeometry, DirectionalLight, Mesh, MeshStandardMaterial, PerspectiveCamera, Scene, SpotLight, WebGLRenderer } from 'three'

    // --SVELTE
    import { onMount } from 'svelte'

// #CONSTANTES

    // --ELEMENT-SPACECUBE
    const SPACECUBE_CUBES = new Float64Array(
        [
            2, 1, -1,
            1.5, -1.75, -2.25,
            1.5, 2.75, -2.75,
            1.5, 3.75, 1.75,
            1, -1, -.5,
            1, -.5, -2,
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

            spacecube_setCubes()
            spacecube_setLight()
            spacecube_animationLoop()
        }
    }

    function spacecube_setVar()
    {
        const [WIDTH, HEIGHT] = [window.innerWidth, window.innerHeight]

        spacecube_SCENE = new Scene()
        spacecube_CAMERA = new PerspectiveCamera(75, WIDTH / HEIGHT, 0.1, 13)
        spacecube_RENDERER = new WebGLRenderer({ alpha: true, antialias: true })

        spacecube_CAMERA.position.z = 5

        spacecube_RENDERER.setClearColor(0x000000, 0)
        spacecube_RENDERER.setSize(WIDTH, HEIGHT)
    }

    function spacecube_setCubes()
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

    function spacecube_setLight()
    {
        const
        AMBIENTLIGHT = new AmbientLight(COLORS.light),
        DIRECTIONALLIGHT = new DirectionalLight(COLORS.light, 5),
        SPOTPRIMARYLIGHT = new SpotLight(COLORS.primary, 27, 11, .27, .7, .7)

        DIRECTIONALLIGHT.position.set(2, -2, -.5)
        SPOTPRIMARYLIGHT.position.set(-7, -2.7, -.7)
        SPOTPRIMARYLIGHT.target.position.set(0, -1.7, 0)

        spacecube_SCENE.add(AMBIENTLIGHT)
        spacecube_SCENE.add(DIRECTIONALLIGHT)
        spacecube_SCENE.add(SPOTPRIMARYLIGHT)
        spacecube_SCENE.add(SPOTPRIMARYLIGHT.target)
    }

    // --ANIMATION
    async function spacecube_animationLoop()
    {
        spacecube_RENDERER.render(spacecube_SCENE, spacecube_CAMERA)

        requestAnimationFrame(spacecube_animationLoop)
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

@use '../../assets/scss/styles/_position';
@use '../../assets/scss/styles/_size';

/* #SPACECUBE */

.space-cube
{
    @include position.placement(absolute, 0, 0, 0, 0);

    @extend %any;
}
</style>