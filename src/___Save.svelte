

    <!-- #SCRIPT -->

<script>
    // Code inspired, adapted / modified for texture projection in Three js from: https://github.com/marcofugaro/three-projected-material
    
    // #IMPORTS
    
        // --JS
        import SHADER_VERTEX from '../../assets/js/glsl/vertex'
        import SHADER_FRAGMENT from '../../assets/js/glsl/fragment'
        import MATH from '../../assets/js/utils/math'
        import { animation_floating } from '../../assets/js/utils/animation'
        import { wait_throttle } from '../../assets/js/utils/wait'
    
        // --LIB
        import { COLORS } from '$lib/app'
        import { SPACECUBE_FIXED_CUBES, SPACECUBE_FLOATING_CUBES } from '../../assets/js/datas/spacecube_cubes'
    
        // --CONTEXTS
        import { APP, EVENT } from '../../App.svelte'
    
        // --THREE
        import WebGL from 'three/addons/capabilities/WebGL'
        import
        {
            AmbientLightProbe,
            BoxGeometry,
            DirectionalLight,
            Group,
            InstancedBufferAttribute,
            InstancedMesh,
            Matrix4,
            Mesh,
            MeshStandardMaterial,
            Object3D,
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
    
        // --SVELTE
        import { onMount, onDestroy } from 'svelte'
    
    // #CONSTANTES
    
        // --ELEMENT-SPACECUBE
        const
        SPACECUBE_CUBES_COUNT = (SPACECUBE_FIXED_CUBES.length) / 3,
        SPACECUBE_CUBES = new Group(),
        SPACECUBE_GEOMETRY = new BoxGeometry(),
        SPACECUBE_MATERIAL = new MeshStandardMaterial({ color: COLORS.dark }),
        SPACECUBE_INSTANCED = new InstancedMesh(SPACECUBE_GEOMETRY, SPACECUBE_MATERIAL, SPACECUBE_CUBES_COUNT),
        SPACECUBE_SIZES = [],
        SPACECUBE_INITIALPOSITIONS = [],
        SPACECUBE_PARAMS =
        {
            antialias: true,
            fov: 75,
            near: 3,
            far: 7
        },
        SPACECUBE_EVENTS =
        {
            resize: spacecube_resize,
            animation: spacecube_animation
        }
    
        // --SHADERS
        const SHADER_UNIFORMS =
        {
            viewMatrixCamera: { value: new Matrix4() },
            projectionMatrixCamera: { value: new Matrix4() },
            projPosition: { value: new Vector3() },
            projDirection: { value: new Vector3(0, 0, -1) },
            projectedTexture: { value: '' },
            widthScaled: { value: 0 },
            heightScaled: { value: 0 },
            textureOffset: { value: new Vector2(-0.215, 0) }
        }
    
    // #VARIABLES
    
        // --ELEMENT-SPACECUBE
        let
        spacecube,
        spacecube_SCENE,
        spacecube_CAMERA,
        spacecube_RENDERER,
        spacecube_MOUSELIGHT,
        spacecube_TEXTURE,
        spacecube_ANIMATIONS = [],
        spacecube_MOUSEDOWN = false
    
    // #FUNCTIONS
    
        // --SET
        function spacecube_set()
        {
            if (WebGL.isWebGLAvailable())
            {
                spacecube_setVar()
                spacecube_setCamera()
                spacecube_setRenderer()
                spacecube_setBackground()
                spacecube_setScene()
            }
        }
    
        function spacecube_setVar()
        {
            spacecube_SCENE = new Scene()
            spacecube_CAMERA = new PerspectiveCamera(SPACECUBE_PARAMS.fov, window.innerWidth / window.innerHeight, SPACECUBE_CUBES.near, SPACECUBE_CUBES.far)
            spacecube_RENDERER = new WebGLRenderer({ alpha: true, antialias: SPACECUBE_PARAMS.antialias })
    
            spacecube.appendChild(spacecube_RENDERER.domElement)
        }
    
        function spacecube_setCamera()
        {
            spacecube_CAMERA.position.z = 5
            spacecube_CAMERA.lookAt(0, 0, 0)
        }
    
        function spacecube_setRenderer()
        {
            spacecube_RENDERER.setSize(window.innerWidth, window.innerHeight)
            spacecube_RENDERER.setPixelRatio(Math.min(window.devicePixelRatio, 2))
        }
    
        function spacecube_setBackground() { spacecube_RENDERER.setClearColor(0x000000, 0) }
    
        function spacecube_setScene()
        {
            spacecube_updateCameraMatrices()
            spacecube_setLight()
            spacecube_setResponsive()
    
            new TextureLoader().load('./images/me.png', async (texture) =>
            {
                spacecube_TEXTURE = texture
    
                shader_setUniforms()
                spacecube_setCubes()
                spacecube_setEvent()
            })
        }
    
        function spacecube_setLight()
        {
            spacecube_setAmbientLight()
            spacecube_setDirectionalLight()
            spacecube_setSpotLight()
        }
        function spacecube_setAmbientLight()
        {
            const AMBIENTLIGHT = new AmbientLightProbe(COLORS.light, .5)
    
            spacecube_SCENE.add(AMBIENTLIGHT)
        }
        function spacecube_setDirectionalLight()
        {
            const DIRECTIONALLIGHT = new DirectionalLight(COLORS.light, 1.5)
    
            DIRECTIONALLIGHT.position.set(5, -2.5, 0)
    
            spacecube_SCENE.add(DIRECTIONALLIGHT)
        }
        function spacecube_setSpotLight()
        {
            const SPOTLIGHT = new SpotLight(COLORS.primary, 100, 10, .3, .7, .7)
    
            SPOTLIGHT.position.set(5, -6, .7)
            SPOTLIGHT.target.position.set(6, 0, 0)
    
            spacecube_SCENE.add(SPOTLIGHT)
            spacecube_SCENE.add(SPOTLIGHT.target)
        }
        function spacecube_setMouseLight()
        {
            spacecube_MOUSELIGHT = new SpotLight(COLORS.primary, 1.5, 11, .6, .5, .4)
    
            spacecube_MOUSELIGHT.position.z = 5
    
            spacecube_SCENE.add(spacecube_MOUSELIGHT)
            spacecube_SCENE.add(spacecube_MOUSELIGHT.target)
        }
    
        function spacecube_setCubes()
        {
            spacecube_setProjectionDatas()
            spacecube_buildCubes2(SPACECUBE_FIXED_CUBES)
            // spacecube_buildCubes2(SPACECUBE_FLOATING_CUBES)
    
            // spacecube_buildCubes(SPACECUBE_FIXED_CUBES)
            // spacecube_buildCubes(SPACECUBE_FLOATING_CUBES, true)
    
            spacecube_SCENE.add(SPACECUBE_INSTANCED)
            
            spacecube_ANIMATIONS = wait_throttle(
            (() =>
            {
                const ANIMATIONS = spacecube_ANIMATIONS
    
                return () => { for (const ANIMATION of ANIMATIONS) ANIMATION() }
            })(), 100)
        }
        function spacecube_setProjectionDatas()
        {
            SPACECUBE_GEOMETRY.setAttribute(`savedModelMatrix0`, new InstancedBufferAttribute(new Float32Array(SPACECUBE_CUBES_COUNT * 4), 4))
            SPACECUBE_GEOMETRY.setAttribute(`savedModelMatrix1`, new InstancedBufferAttribute(new Float32Array(SPACECUBE_CUBES_COUNT * 4), 4))
            SPACECUBE_GEOMETRY.setAttribute(`savedModelMatrix2`, new InstancedBufferAttribute(new Float32Array(SPACECUBE_CUBES_COUNT * 4), 4))
            SPACECUBE_GEOMETRY.setAttribute(`savedModelMatrix3`, new InstancedBufferAttribute(new Float32Array(SPACECUBE_CUBES_COUNT * 4), 4))
        }
    
        function spacecube_buildCubes2(cubes)
        {
            SPACECUBE_MATERIAL.onBeforeCompile = shader_set.bind(SPACECUBE_INSTANCED)
        
            for (let i = 0; i < cubes.length / 3; i++)
            {
                const
                INDEX = i * 3,
                SIZE = cubes[INDEX]
    
                SPACECUBE_CUBES.scale.set(SIZE, SIZE, SIZE)
                SPACECUBE_CUBES.position.x = cubes[INDEX + 1]
                SPACECUBE_CUBES.position.y = cubes[INDEX + 2]
                SPACECUBE_CUBES.rotation.x = -MATH.rad.r45 / 2
                SPACECUBE_CUBES.rotation.y = MATH.rad.r45
    
                SPACECUBE_CUBES.updateMatrix()
                SPACECUBE_INSTANCED.setMatrixAt(i, SPACECUBE_CUBES.matrix)
    
                projectInstanceAt(i, SPACECUBE_CUBES.matrix)
    
                SPACECUBE_SIZES.push(SIZE)
                SPACECUBE_INITIALPOSITIONS.push({ ...SPACECUBE_CUBES.position })
            }
        }
    
        function projectInstanceAt(index, matrixWorld)
        {
            SPACECUBE_INSTANCED.geometry.attributes[`savedModelMatrix0`].setXYZW(index, matrixWorld.elements[0], matrixWorld.elements[1], matrixWorld.elements[2], matrixWorld.elements[3])
            SPACECUBE_INSTANCED.geometry.attributes[`savedModelMatrix1`].setXYZW(index, matrixWorld.elements[4], matrixWorld.elements[5], matrixWorld.elements[6], matrixWorld.elements[7])
            SPACECUBE_INSTANCED.geometry.attributes[`savedModelMatrix2`].setXYZW(index, matrixWorld.elements[8], matrixWorld.elements[9], matrixWorld.elements[10], matrixWorld.elements[11])
            SPACECUBE_INSTANCED.geometry.attributes[`savedModelMatrix3`].setXYZW(index, matrixWorld.elements[12], matrixWorld.elements[13], matrixWorld.elements[14], matrixWorld.elements[15])
    
            // if the material is not the first, output just the texture
            if (Array.isArray(SPACECUBE_INSTANCED.material))
            {
                const materialIndex = SPACECUBE_INSTANCED.material.indexOf(SPACECUBE_MATERIAL)
        
                if (!SPACECUBE_INSTANCED.material[materialIndex].transparent) {
                    console.warn(`You have to pass "transparent: true" to the ProjectedMaterial if you're working with multiple materials.`);
                }
                // if (materialIndex > 0) {
                //     this.uniforms.backgroundOpacity.value = 0;
                // }
            }
        }
    
        function spacecube_setCubeAnimation(cube)
        {
            const ANIMATION = animation_floating().animation
    
            return async () => cube.position.y += ANIMATION() * 0.001
        }
    
        function spacecube_setResponsive() { APP.app_addResponsive(spacecube_responsive) }
    
        function spacecube_setEvent() { EVENT.event_add(SPACECUBE_EVENTS) }
    
        function shader_set(shader)
        {
            shader.uniforms =
            {
                ...SHADER_UNIFORMS,
                ...shader.uniforms
            }
            shader.vertexShader = spacecube_monkeyPatch(shader.vertexShader, SHADER_VERTEX)
            shader.fragmentShader = spacecube_monkeyPatch(shader.fragmentShader, SHADER_FRAGMENT)
        }
    
        function shader_setUniforms()
        {
            const MODEL_MATRIX_CAMERA = spacecube_CAMERA.matrixWorld
    
            SHADER_UNIFORMS.projectedTexture.value = spacecube_TEXTURE
            SHADER_UNIFORMS.viewMatrixCamera.value.copy(spacecube_CAMERA.matrixWorldInverse)
            SHADER_UNIFORMS.projPosition.value.setFromMatrixPosition(MODEL_MATRIX_CAMERA)
            SHADER_UNIFORMS.projDirection.value.set(0, 0, 1).applyMatrix4(MODEL_MATRIX_CAMERA)
    
            shader_updateProjectionMatrixCamera()
            shader_updateTextureDimensions()
        }
    
        // --DESTROY
        function spacecube_destroy()
        {
            spacecube_destroyResponsive()
            spacecube_destroyEvent()
        }
    
        function spacecube_destroyResponsive() { APP.app_removeResponsive(spacecube_responsive) }
    
        function spacecube_destroyEvent() { EVENT.event_remove({ ...SPACECUBE_EVENTS, mouseMove: spacecube_mouseMove }) }
    
        // --UPDATES
        function spacecube_updateCameraMatrices()
        {
            spacecube_CAMERA.updateProjectionMatrix()
            spacecube_CAMERA.updateMatrixWorld()
            spacecube_CAMERA.updateWorldMatrix()
        }
    
        function shader_updateProjectionMatrixCamera() { SHADER_UNIFORMS.projectionMatrixCamera.value.copy(spacecube_CAMERA.projectionMatrix) }
    
        function shader_updateTextureDimensions()
        {
            const [TEXTURE_WIDTHSCALED, TEXTURE_HEIGHTSCALED] = spacecube_computeScaledDimensions(spacecube_TEXTURE.image, spacecube_CAMERA)
    
            SHADER_UNIFORMS.widthScaled.value = TEXTURE_WIDTHSCALED
            SHADER_UNIFORMS.heightScaled.value = TEXTURE_HEIGHTSCALED
        }
    
        function spacecube_updateMouseLight(x, y)
        {
            spacecube_MOUSELIGHT.target.position.x = x
            spacecube_MOUSELIGHT.target.position.y = y
        }
    
        function spacecube_updateCubes(x, y)
        {
            for (let i = 0; i < SPACECUBE_CUBES_COUNT; i++)
            {
                const
                [RADIUS, SIZE, X, Y] = [3, SPACECUBE_SIZES[i], SPACECUBE_INITIALPOSITIONS[i].x, SPACECUBE_INITIALPOSITIONS[i].y],
                [DIFX, DIFY] = [X - x, Y - y],
                [DIFX_ABS, DIFY_ABS] = [Math.abs(DIFX), Math.abs(DIFY)],
                HYP = Math.sqrt(DIFX_ABS * DIFX_ABS + DIFY_ABS * DIFY_ABS)
    
                if (HYP < RADIUS)
                {
                    const ANGLE = Math.atan(DIFY / DIFX)
            
                    SPACECUBE_CUBES.scale.set(SIZE, SIZE, SIZE)
                    SPACECUBE_CUBES.rotation.x = -MATH.rad.r45 / 2 + (1 - DIFX_ABS / (Math.cos(ANGLE) * RADIUS)) * DIFX * .1
                    SPACECUBE_CUBES.rotation.y = MATH.rad.r45 + (1 - DIFY_ABS / (Math.abs(Math.sin(ANGLE)) * RADIUS)) * DIFY * .1
                    SPACECUBE_CUBES.position.x = X + (1 - DIFX_ABS / (Math.cos(ANGLE) * RADIUS)) * DIFX * .4
                    SPACECUBE_CUBES.position.y = Y + (1 - DIFY_ABS / (Math.abs(Math.sin(ANGLE)) * RADIUS)) * DIFY * .4
    
                    SPACECUBE_CUBES.updateMatrix()
                    SPACECUBE_INSTANCED.setMatrixAt(i, SPACECUBE_CUBES.matrix)
                }
            }
    
            SPACECUBE_INSTANCED.instanceMatrix.needsUpdate = true
        }
    
        // --RESPONSIVE
        async function spacecube_responsive(mobile)
        {
            EVENT['event_' + (mobile ? 'remove' : 'add')]({ mouseMove: spacecube_mouseMove })
    
            if (!mobile) spacecube_setMouseLight()
            else if (spacecube_MOUSELIGHT) spacecube_SCENE.remove(spacecube_MOUSELIGHT)
        }
    
        let last = +new Date()
        // --EVENTS
        async function spacecube_mouseMove(clientX, clientY)
        {
            const now = +new Date()
            if (now < last + 20) return
            last = now
    
            const
            [X, Y] = [(clientX / window.innerWidth) * 2 - 1, -(clientY / window.innerHeight) * 2 + 1],
            RAYCASTER = new Raycaster(),
            INTERSECTION = new Vector3()
        
            RAYCASTER.setFromCamera(new Vector2(X, Y), spacecube_CAMERA)
            RAYCASTER.ray.intersectPlane(new Plane(new Vector3(0, 0, 1), 0), INTERSECTION)
    
            spacecube_updateMouseLight(INTERSECTION.x, INTERSECTION.y)
            spacecube_updateCubes(INTERSECTION.x, INTERSECTION.y)
    
            spacecube_CAMERA.position.x = INTERSECTION.x * .01
            spacecube_CAMERA.position.y = INTERSECTION.y * .01
        }
    
        async function spacecube_resize()
        {
            spacecube_CAMERA.aspect = window.innerWidth / window.innerHeight
            spacecube_CAMERA.updateProjectionMatrix()
    
            spacecube_setRenderer()
            shader_updateProjectionMatrixCamera()
            shader_updateTextureDimensions()
        }
    
        async function spacecube_animation()
        {
            spacecube_ANIMATIONS()
    
            spacecube_RENDERER.render(spacecube_SCENE, spacecube_CAMERA)
        }
    
        // --UTILS
        function spacecube_buildCubes(cubes, float = false)
        {
            for (let i = 0; i < cubes.length; i += 3)
            {
                const
                SIZE = cubes[i],
                GEOMETRY = new BoxGeometry(SIZE, SIZE, SIZE),
                MATERIAL = new MeshStandardMaterial({ color: COLORS.dark }),
                CUBE = new Mesh(GEOMETRY, MATERIAL)
    
                CUBE.position.set(cubes[i + 1], cubes[i + 2])
                CUBE.rotation.x = -MATH.rad.r45 / 2
                CUBE.rotation.y = MATH.rad.r45
                
                CUBE.initialPosition = {...CUBE.position}
                MATERIAL.onBeforeCompile = shader_set.bind(CUBE)
                CUBE.updateWorldMatrix(true, false)                                                        
    
                if (float) spacecube_ANIMATIONS.push(spacecube_setCubeAnimation(CUBE))
        
                SPACECUBE_CUBES.add(CUBE)
            }
        }
    
        function spacecube_monkeyPatch(shader, _ref)
        {
            let
            patchedShader = shader,
            { header = '', main = '', ...replaces } = _ref
    
            for (const KEY in replaces) patchedShader = patchedShader.split(KEY).join(replaces[KEY])
    
            return patchedShader.replace('void main() {', `${header} void main() { ${main}`)
        }
    
        function spacecube_computeScaledDimensions(image, camera)
        {
            const
            RATIO = image.naturalWidth / image.naturalHeight,
            CAMERA_RATIO = camera.aspect,
            CAMERA_HEIGHT = 1 / CAMERA_RATIO
    
            return RATIO < CAMERA_RATIO
            ? [1 / (CAMERA_HEIGHT * RATIO), 1]
            : [1, 1 / (1 / RATIO / CAMERA_HEIGHT)]
        }
    
    
    // #CYCLES
    
    onMount(spacecube_set)
    onDestroy(spacecube_destroy)
    </script>
    
    <!-- #HTML -->
    
    <div
    class="space-cube"
    bind:this={spacecube}
    >
        <div
        class="mask"
        >
        </div>
    </div>
    
    <!-- #STYLE -->
    
    <style
    lang="scss"
    >
    /* #USES */
    
    @use '../../assets/scss/styles/position';
    @use '../../assets/scss/styles/size';
    
    /* #SPACECUBE */
    
    .space-cube { @include position.placement(absolute, 0, auto, auto, 0); }
    
    .mask
    {
        @include position.placement(absolute, 0, 0, 0, 0);
    
        @extend %any;
    
        backdrop-filter: blur(20px);
    
        mask: radial-gradient(circle at 68% 50%, transparent 10%, $dark 100%);
    
        pointer-events: none;
    }
    </style>

    ///////////////////////////////////////////////////////////////////////

    <!-- #MAP

    CUBE
-->

<!-- #SCRIPT -->

<script>
    // #EXPORTS
    
        // --PROPS
        export let
        prop_ANIMATION_UPDATE = [],
        prop_X,
        prop_Y,
        prop_ROTATE,
        prop_ROTATEY,
        prop_SIZE
        // prop_ORBIT = false
    
        // BIND cube_mouseMove
        // BIND cube_mouseUp
        // BIND cube_resize
    
    // #IMPORTS
    
        // --JS
        import { wait_throttle } from '../../assets/js/utils/wait'
        import { update_floating } from '../../assets/js/utils/update'
    
        // --LIB
        import { COLORS } from '$lib/colors'
    
        // --SVELTE
        import { onMount, onDestroy } from 'svelte'
    
        // --COMPONENT-COVER
        import Icon from '../covers/Icon.svelte'
    
        // --COMPONENT-ICON
        import Logo from '../icons/Logo.svelte'
    
    // #VARIABLES
    
        // --ELEMENT-GRAVITY-AREA
        let
        gravityarea,
        gravityarea_TRANSLATE_X,
        gravityarea_TRANSLATE_Y,
        gravityarea_TRANSITION_DELAY,
        gravityarea_RADIUS,
        gravityarea_LAST = +new Date(),
        gravityarea_TIMEOUT
    
        // --ELEMENT-CUBE
        let
        cube,
        cube_FORCEX = 0,
        cube_FORCEY = 0,
        cube_GRABBING = false,
        cube_FLOATING_UPDATE = update_floating()
    
    // #FUNCTIONS
    
        // --SET
        function cube_set()
        {
            gravityarea_setVar()
            cube_start()
        }
    
        function gravityarea_setVar()
        {
            gravityarea_TRANSLATE_X = prop_X * window.innerWidth
            gravityarea_TRANSLATE_Y = prop_Y * window.innerHeight
            gravityarea_RADIUS = gravityarea.offsetWidth / 2
    
            setTimeout(() => gravityarea_TRANSITION_DELAY = .3, 50)
    
            // Math.cos(MATH.rad.r45) * (SIZE / Math.cos((MATH.rad.r90 - (prop_ORBIT ? Math.abs(prop_ROTATE) : 0) - MATH.rad.r45))) ancien calcule du radius
        }
    
        // --DESTROY
        function cube_destroy() { cube_stop() }
    
        // --UPDATES
        function cube_update(value) { cube_GRABBING = value }
    
        const cube_updatePosition = wait_throttle((x, y) =>
        {
            if (cube_GRABBING)
            {
                prop_ROTATE += (x - gravityarea_TRANSLATE_X) * .005
                prop_ROTATEY += (y - gravityarea_TRANSLATE_Y) * .005
    
                gravityarea_TRANSLATE_X = x
                gravityarea_TRANSLATE_Y = y
            }
        }, 50)
    
        // --EVENTS
        async function gravityarea_mouseMove({clientX, clientY})
        {
            const NOW = +new Date()
    
            clearTimeout(gravityarea_TIMEOUT)
    
            if (NOW > gravityarea_LAST + 50)
            {
                gravityarea_animationAttract(clientX, clientY)
    
                gravityarea_LAST = NOW
            }
            else gravityarea_TIMEOUT = setTimeout(gravityarea_animationAttract.bind(null, clientX, clientY), 200)
        }
    
        async function gravityarea_mouseEnter() { if (!cube_GRABBING) cube_stop() }
    
        async function gravityarea_mouseLeave()
        {
            [cube_FORCEX, cube_FORCEY] = [0, 0]
    
            clearTimeout(gravityarea_TIMEOUT)
    
            gravityarea_TIMEOUT = setTimeout(() =>
            {
                cube_FLOATING_UPDATE.setTime(.5)
    
                if (!cube_GRABBING) cube_start()
            }, 200)
        }
    
        async function cube_mouseDown() { cube_update(true) }
    
        export async function cube_mouseMove(clientX, clientY) { cube_updatePosition(clientX - gravityarea_RADIUS, clientY - gravityarea_RADIUS) }
    
        export async function cube_mouseUp() { if (cube_GRABBING) cube_update(false) }
    
        export async function cube_resize() { gravityarea_setVar() }
    
        async function cube_animation() { cube_FORCEY = cube_FLOATING_UPDATE.update() }
    
        // --ANIMATION
        function gravityarea_animationAttract(clientX, clientY)
        {
            const
            CLIENTRECT = gravityarea.getBoundingClientRect(),
            SIZE = CLIENTRECT.width / 2,
            [DIF_X, DIF_Y] = [clientX - (CLIENTRECT.left + SIZE), clientY - (CLIENTRECT.top + SIZE)],
            ANGLE = Math.atan(DIF_Y / DIF_X)
    
            cube_FORCEX = DIF_X * (1 - Math.abs(DIF_X) / (Math.cos(ANGLE) * gravityarea_RADIUS)) * .5
            cube_FORCEY = DIF_Y * (1 - Math.abs(DIF_Y) / Math.abs(Math.sin(ANGLE) * gravityarea_RADIUS)) * .5
        }
    
        // --CONTROLS
        function cube_start()
        {
            const INDEX = prop_ANIMATION_UPDATE.indexOf(cube_animation)
    
            if (INDEX === -1) prop_ANIMATION_UPDATE.push(cube_animation)
        }
    
        function cube_stop()
        {
            const INDEX = prop_ANIMATION_UPDATE.indexOf(cube_animation)
    
            if (~INDEX) prop_ANIMATION_UPDATE.splice(INDEX, 1)
        }
    
    // #CYCLES
    
    onMount(cube_set)
    onDestroy(cube_destroy)
    </script>
    
    <!-- #HTML -->
    
    <button
    class="gravityarea"
    style:--default-size="{prop_SIZE}px"
    style:transform="translate({gravityarea_TRANSLATE_X ?? -prop_SIZE * 2}px, {gravityarea_TRANSLATE_Y ?? -prop_SIZE * 2}px)"
    style:transition="transform {gravityarea_TRANSITION_DELAY}s ease-out"
    bind:this={gravityarea}
    on:mouseenter={gravityarea_mouseEnter}
    on:mousemove={gravityarea_mouseMove}
    on:mouseleave={gravityarea_mouseLeave}
    >
        <!-- application des forces -->
        <div
        style:transform="translate({cube_FORCEX}px, {cube_FORCEY}px)"
        >
            <!-- rotation de l'objet -->
            <!-- svelte-ignore a11y-no-static-element-interactions -->
            <div
            class="cube"
            style:transform="rotate({prop_ROTATE}rad) rotateY({prop_ROTATEY}rad)"
            style:cursor={cube_GRABBING ? 'grabbing' : 'grab'}
            bind:this={cube}
            on:mousedown={cube_mouseDown}
            >
                {#each [0, 1, 2, 3, 4, 5] as id}
                    <div
                    class="side"
                    class:grabbing={cube_GRABBING}
                    data-side-id={id}
                    >
                        <Icon
                        prop_SIZE="30%"
                        prop_COLOR={COLORS.light}
                        prop_SPRING={false}
                        >
                            <Logo />
                        </Icon>
                    </div>
                {/each}
            </div>
        </div>
    </button>
    
    <!-- #STYLE -->
    
    <style
    lang="scss"
    >
    /* #USES */
    
    @use '../../assets/scss/styles/position';
    @use '../../assets/scss/styles/display';
    @use '../../assets/scss/styles/size';
    
    /* #CUBE */
    
    .gravityarea
    {
        --cube-size: calc(var(--default-size) * var(--cube-ratio));
        --gravity-area-size: calc(var(--cube-size) * 2);
    
        @extend %f-center;
    
        position: absolute;
    
        width: var(--gravity-area-size);
        height: var(--gravity-area-size);
    
        background-color: transparent;
    
        border: none;
        border-radius: 50%;
        outline: none;
    
        pointer-events: auto;
    
        &>div
        {
            transition: transform .5s;
    
            width: var(--cube-size);
            height: var(--cube-size);
        }
    }
    
    .cube
    {
        &, .side { @extend %any; }
    
        transform-style: preserve-3d;
        transform-origin: center;
    
        transition: transform .35s ease-out;
    
        .side
        {
            @extend %f-center;
    
            background-color: $dark;
    
            border: solid $primary calc(var(--cube-size) * .05);
    
            box-sizing: border-box;
    
            transition: border .7s ease-in;
    
            &.grabbing { border-color: $indicator; }
        }
        .side:nth-child(1) { transform: translateZ(calc(var(--cube-size) / 2)); }
        .side:nth-child(2) { transform: translateY(-150%) rotateX(-90deg); }
        .side:nth-child(3) { transform: translate(-50%, -200%) rotateY(90deg) scaleX(-1); }
        .side:nth-child(4) { transform: translateY(-250%) rotateX(90deg); }
        .side:nth-child(5) { transform: translate(50%, -400%) rotateY(-90deg); }
        .side:nth-child(6) { transform: translateY(-500%) translateZ(calc(var(--cube-size) / -2)); }
    }
    </style>

    ///////////////////////////////////

    <!-- #MAP

    LOGO

-->

<!-- #SCRIPT -->

<script>
    // #EXPORT
    
        // --PROP
        export let prop_PIECE = false
    </script>
    
    <!-- #HTML -->
    
    <svg
    class="logo"
    width="90"
    height="90"
    viewBox="0 0 90 90"
    fill="none" 
    mlns="http://www.w3.org/2000/svg"
    >
        <mask
        id="path-1-inside-1_2_8"
        fill="white"
        >
            <path 
            d="M0 0H90V90H0V0Z"
            />
        </mask>
    
        <path
        class="frame"
        d={prop_PIECE
        ? 'M0 0V-20H-20V0H0ZM0 90H-20V110H0V90ZM0 20H90V-20H0V20ZM90 70H0V110H90V70ZM20 90V0H-20V90H20Z'
        : 'M0 0V-20H-20V0H0ZM90 0H110V-20H90V0ZM90 90V110H110V90H90ZM0 90H-20V110H0V90ZM0 20H90V-20H0V20ZM70 0V90H110V0H70ZM90 70H0V110H90V70ZM20 90V0H-20V90H20Z'}
        fill="var(--icon-color, #FFF)"
        mask="url(#path-1-inside-1_2_8)"
        />
    
        <path
        class="horizontal-bar"
        d="M0 45H55"
        stroke="var(--icon-color, #FFF)"
        stroke-width="20"
        />
    
        {#if !prop_PIECE}
            <path
            class="vertical-bar"
            d="M45 55V-2.6226e-06"
            stroke="var(--icon-color, #FFF)"
            stroke-width="20"
            />
        {/if}
    </svg>
    
    <!-- <svg class="logo" width="250" height="50" viewBox="0 0 250 50" fill="none" stroke="white" stroke-width="10" xmlns="http://www.w3.org/2000/svg">
        <path>
            <animate
            repeatCount="1"
            attributeName="d"
            dur="1s"
            fill="freeze"
            values="
            M244.99 5.98999H244.98V6.00999H245V5.98999H225V5.99999H0;
            M194.99 5H194.98V25.01H195V5H175V25H0;
            M144.99 44.99 H125 V45 H145 V5 H125 V25 H0;
            M74.99 24.99H55V45H95V5H75V25H0;
            M24.99 5 H5 V45 H45 V5 H25 V25 H0
            ">
        </path>
    </svg> -->
    
    <!-- #STYLE -->
    
    <style
    lang="scss"
    >
    /* #USE */
    
    @use '../../assets/scss/styles/size';
    
    /* #LOGO */
    
    svg { @extend %any; }
    </style>