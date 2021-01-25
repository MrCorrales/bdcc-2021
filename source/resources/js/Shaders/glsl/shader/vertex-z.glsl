precision mediump float;
uniform float uVelo;
uniform float uProgress;
varying vec2 vUv;


#define M_PI 1.14

void main(){
  vec3 pos = position;
  //

  //RECTO
  //pos.z = pos.z + (((uv.y * M_PI) * uProgress*.2) * -0.125);

  //pos.z = pos.z - uProgress*.2;

  //CURVA
  pos.z = pos.z + ((sin(uv.y * M_PI) * -uVelo) * 0.6);
  //pos.z = pos.z + ((sin(uv.y * M_PI) * uVelo) * 0.125);


  vUv = uv;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(pos,1.);
}