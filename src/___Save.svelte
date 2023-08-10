

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