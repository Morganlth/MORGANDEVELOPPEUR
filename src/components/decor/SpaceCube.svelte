<!-- #SCRIPT -->

<script>
// #IMPORTS

    // --JS
    import MATH from '../../assets/js/utils/math'
    import ProjectedMaterial from '../../assets/js/utils/ProjectedMaterial'

    // --LIB
    import { COLORS } from '$lib/app'

    // --THREE
    import WebGL from 'three/addons/capabilities/WebGL'
    import { AmbientLight, BoxGeometry, DirectionalLight, Mesh, PerspectiveCamera, Scene, SpotLight, TextureLoader, Vector2, WebGLRenderer } from 'three'

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

            new TextureLoader().load('./images/me.png',
            async (texture) =>
            {
                spacecube_setCubesTest(texture)
                spacecube_setLight()
                spacecube_animationLoop()
            })
        }
    }

    function spacecube_setVar()
    {
        const [WIDTH, HEIGHT] = [window.innerWidth, window.innerHeight]

        spacecube_SCENE = new Scene()
        spacecube_CAMERA = new PerspectiveCamera(75, WIDTH / HEIGHT, 0.1, 7)
        spacecube_RENDERER = new WebGLRenderer({ alpha: true, antialias: true })

        spacecube_CAMERA.position.z = 5
        spacecube_CAMERA.lookAt(0, 0, 0)

        spacecube_RENDERER.setClearColor(0x000000, 0)
        spacecube_RENDERER.setSize(WIDTH, HEIGHT)
    }

    function spacecube_setCubesTest(texture)
    {
        for (let i = 0; i < SPACECUBE_CUBES.length; i += 3)
        {
            const
            SIZE = SPACECUBE_CUBES[i],
            GEOMETRY = new BoxGeometry(SIZE, SIZE, SIZE),
            MATERIAL = new ProjectedMaterial({
                camera: spacecube_CAMERA,
                texture,
                color: COLORS.dark,
                textureOffset: new Vector2(-0.22, 0)
            }),
            CUBE = new Mesh(GEOMETRY, MATERIAL)

            CUBE.position.set(SPACECUBE_CUBES[i + 1], SPACECUBE_CUBES[i + 2])
            CUBE.rotation.x = -MATH.rad.r45 / 2
            CUBE.rotation.y = MATH.rad.r45

            MATERIAL.project(CUBE)
    
            spacecube_SCENE.add(CUBE)
        }
    }

    function spacecube_setLight()
    {
        const
        AMBIENTLIGHT = new AmbientLight(COLORS.light),
        DIRECTIONALLIGHT = new DirectionalLight(COLORS.light, 5),
        SPOTPRIMARYLIGHT = new SpotLight(COLORS.primary, 7, 10, .3, .7, .7)

        DIRECTIONALLIGHT.position.set(2, -2, -.5)
        SPOTPRIMARYLIGHT.position.set(-7, -2.7, .7)
        SPOTPRIMARYLIGHT.target.position.set(0, -2, 0)

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