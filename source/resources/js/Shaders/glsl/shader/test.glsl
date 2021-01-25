uniform float time;
uniform float progress;
uniform sampler2D texture1;
uniform vec4 resolution;
varying vec2 vUv;


void main()	{
    float scaleCenter = 0.5;
    vec2 newUV = (vUv - scaleCenter) * .1 + scaleCenter;
    vec2 UV2 = vUv;

    UV2.x = ( UV2.x * UV2.y ) * progress;

    gl_FragColor = texture2D(texture1,UV2);
}
