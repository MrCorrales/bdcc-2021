uniform float time;
uniform float progress;
uniform sampler2D texture1;
uniform vec4 resolution;
varying vec2 vUv;


void main()	{
	vec2 newUV = (vUv - vec2(progress))*resolution.zw + vec2(progress);
	gl_FragColor = texture2D(texture1,newUV);
}