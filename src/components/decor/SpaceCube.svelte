<!-- #SCRIPT -->

<script>
// #IMPORTS

    // --LIB
    import { COLORS } from '$lib/app'

    // --THREE
    import WebGL from 'three/addons/capabilities/WebGL';
    import { BoxGeometry, Mesh, MeshBasicMaterial, PerspectiveCamera, Scene, WebGLRenderer } from 'three'

    // --SVELTE
    import { onMount } from 'svelte'

// #VARIABLES

    // --ELEMENT-SPACECUBE
    let
    spacecube,
    spacecube_SCENE,
    spacecube_CAMERA,
    spacecube_RENDERER,
    spacecube_CUBE

// #FUNCTIONS

    // --SET
    function spacecube_set()
    {
        if (WebGL.isWebGLAvailable())
        {
            spacecube_setVar()

            spacecube.appendChild(spacecube_RENDERER.domElement)

            spacecube_drawCube()
            spacecube_animationLoop()
        }
    }

    function spacecube_setVar()
    {
        const [WIDTH, HEIGHT] = [window.innerWidth, window.innerHeight]

        spacecube_SCENE = new Scene()
        spacecube_CAMERA = new PerspectiveCamera(75, WIDTH / HEIGHT, 0.1, 10)
        spacecube_RENDERER = new WebGLRenderer({ alpha: true })

        spacecube_CAMERA.position.z = 5

        spacecube_RENDERER.setClearColor(0x000000, 0)
        spacecube_RENDERER.setSize(WIDTH, HEIGHT)
    }

    // --DRAW
    function spacecube_drawCube()
    {
        const
        GEOMETRY = new BoxGeometry(1, 1, 1),
        MATERIAL = new MeshBasicMaterial({ color: COLORS.light })
        
        spacecube_CUBE = new Mesh(GEOMETRY, MATERIAL)

        spacecube_SCENE.add(spacecube_CUBE)
    }

    // --ANIMATION
    function spacecube_animationLoop()
    {
        spacecube_RENDERER.render(spacecube_SCENE, spacecube_CAMERA)

        spacecube_CUBE.rotation.x += 0.01;
        spacecube_CUBE.rotation.y += 0.01;

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

@use '../../assets/scss/styles/position';
@use '../../assets/scss/styles/size';

/* #SPACECUBE */

.space-cube
{
    @include position.placement(absolute, 0, 0, 0, 0);
    @include size.any;
}
</style>