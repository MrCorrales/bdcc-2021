const MATERIAL_CINTA = new THREE.ShaderMaterial({
  extensions: {
    derivatives: "#extension GL_OES_standard_derivatives : enable"
  },
  side: THREE.DoubleSide,
  uniforms: {
    time: { type: "f", value: 0 },
    columns: { type: "f", value: 0 },
    rows: { type: "f", value: 0 },
    resolution: { type: "v4", value: new THREE.Vector4() },
    speed: { type: "f", value: 0 },
    texture: { type: "t", value: null },
  },

  transparent: true,
  vertexShader: VERTEX_BASIC,
  fragmentShader: FRAGMENT_REPEAT_COLUMNS
});