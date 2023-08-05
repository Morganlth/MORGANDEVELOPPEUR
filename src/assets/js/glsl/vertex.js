export default
{
    header: /* glsl */`
        uniform mat4 viewMatrixCamera;
        uniform mat4 projectionMatrixCamera;

        #ifdef USE_INSTANCING
        attribute vec4 savedModelMatrix0;
        attribute vec4 savedModelMatrix1;
        attribute vec4 savedModelMatrix2;
        attribute vec4 savedModelMatrix3;
        #else
        uniform mat4 savedModelMatrix;
        #endif

        varying vec3 vSavedNormal;
        varying vec4 vTexCoords;
        varying vec4 vWorldPosition;`
    ,
    main: /* glsl */`
        #ifdef USE_INSTANCING
        mat4 savedModelMatrix = mat4(
            savedModelMatrix0,
            savedModelMatrix1,
            savedModelMatrix2,
            savedModelMatrix3
        );
        #endif

        vSavedNormal = mat3(savedModelMatrix) * normal;
        vTexCoords = projectionMatrixCamera * viewMatrixCamera * savedModelMatrix * vec4(position, 1.0);
        vWorldPosition = savedModelMatrix * vec4(position, 1.0);
    `
}