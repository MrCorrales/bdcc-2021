uniform float time;
uniform float progress;
uniform float alpha;
uniform sampler2D texture1;
uniform vec4 resolution;
varying vec2 vUv;

void main()	{
    float scaleCenter = 0.5;
    vec2 newUV = (vUv - scaleCenter) * progress + scaleCenter;

    vec4 color = texture2D(texture1,newUV);
    gl_FragColor = vec4(color.rgb, alpha * color.a);
}