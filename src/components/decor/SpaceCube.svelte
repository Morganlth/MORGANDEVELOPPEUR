<!-- #SCRIPT -->

<script>
// #IMPORTS

    // --JS
    import MATH from '../../assets/js/utils/math'
    import ProjectedMaterial from '../../assets/js/utils/ProjectedMaterial'

    // --LIB
    import { COLORS } from '$lib/app'
    import SPACECUBE_CUBES from '../../assets/js/datas/spacecube_cubes'

    // --CONTEXTS
    import { EVENT, ANIMATION } from '../../App.svelte'

    // --THREE
    import WebGL from 'three/addons/capabilities/WebGL'
    import
    {
        AmbientLight,
        BoxGeometry,
        DirectionalLight,
        Mesh,
        PerspectiveCamera,
        Plane,
        Raycaster,
        Scene,
        SpotLight,
        TextureLoader,
        Vector2,
        Vector3,
        WebGLRenderer
    } from 'three'

    import { OrbitControls } from 'three/addons/controls/OrbitControls'

    // --SVELTE
    import { onMount, onDestroy } from 'svelte'

// #VARIABLES

    // --ELEMENT-SPACECUBE
    let
    spacecube,
    spacecube_SCENE,
    spacecube_CAMERA,
    spacecube_RENDERER,
    spacecube_MOUSELIGHT,
    spacecube_CONTROLS

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
                spacecube_start()
            })

            spacecube_setEvent()
        }
    }

    function spacecube_setVar()
    {
        const [WIDTH, HEIGHT] = [window.innerWidth, window.innerHeight]

        spacecube_SCENE = new Scene()
        spacecube_CAMERA = new PerspectiveCamera(75, WIDTH / HEIGHT, 0.1, 70) // 7
        spacecube_RENDERER = new WebGLRenderer({ alpha: true, antialias: true })

        spacecube_CAMERA.position.z = 5
        spacecube_CAMERA.lookAt(0, 0, 0)

        spacecube_RENDERER.setClearColor(0x000000, 0)
        spacecube_RENDERER.setSize(WIDTH, HEIGHT)

        spacecube_CONTROLS = new OrbitControls(spacecube_CAMERA, spacecube_RENDERER.domElement)
    }

    function spacecube_setEvent() { EVENT.event_add({ mouseMove: spacecube_mouseMove }) }

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
        SPOTPRIMARYLIGHT = new SpotLight(COLORS.primary, 10, 10, .3, .7, .7)

        DIRECTIONALLIGHT.position.set(2, -2, -.5)
        SPOTPRIMARYLIGHT.position.set(-7, -2, .7)
        SPOTPRIMARYLIGHT.target.position.set(0, -2, 0)

        spacecube_MOUSELIGHT = new SpotLight(COLORS.primary, 3, 13, .4, .7, .7)
        spacecube_MOUSELIGHT.position.z = 5

        spacecube_SCENE.add(AMBIENTLIGHT)
        spacecube_SCENE.add(DIRECTIONALLIGHT)
        spacecube_SCENE.add(SPOTPRIMARYLIGHT)
        spacecube_SCENE.add(SPOTPRIMARYLIGHT.target)
        spacecube_SCENE.add(spacecube_MOUSELIGHT)
        spacecube_SCENE.add(spacecube_MOUSELIGHT.target)
    }

    // --DESTROY
    function spacecube_destroy()
    {
        spacecube_stop()
        spacecube_destroyEvent()
    }

    function spacecube_destroyEvent() { EVENT.event_remove({ mouseMove: spacecube_mouseMove }) }

    // --EVENT
    async function spacecube_mouseMove(clientX, clientY) // étudier code
    {
        const
        [X, Y] = [(clientX / window.innerWidth) * 2 - 1, -(clientY / window.innerHeight) * 2 + 1],
        RAYCASTER = new Raycaster(),
        INTERSECTION = new Vector3()
    
        RAYCASTER.setFromCamera(new Vector2(X, Y), spacecube_CAMERA)
        RAYCASTER.ray.intersectPlane(new Plane(new Vector3(0, 0, 1), 0), INTERSECTION)

        spacecube_MOUSELIGHT.target.position.set(INTERSECTION.x, INTERSECTION.y, 0)
    }

    // --ANIMATION
    async function spacecube_animation() { spacecube_RENDERER.render(spacecube_SCENE, spacecube_CAMERA), spacecube_CONTROLS.update() }

    // --CONTROLS
    function spacecube_start() { ANIMATION.animation_add(spacecube_animation) }

    function spacecube_stop() { ANIMATION.animation_remove(spacecube_animation) }

// #CYCLES

onMount(spacecube_set)
onDestroy(spacecube_destroy)
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