const FRAGMENT_REPEAT_COLUMNS =  `
uniform float time;
uniform float columns;
uniform float rows;
uniform float speed;
uniform sampler2D texture;
uniform vec4 resolution;
varying vec2 vUv;

void main() {
    float utime = time * -0.01 * speed;
    vec2 repeat = vec2(columns, rows);
    vec2 uv = fract(vUv * repeat + vec2(-utime, 0.));
    vec3 texture = texture2D(texture, uv).rgb;
    gl_FragColor = vec4(texture, 1.);
}
`;
