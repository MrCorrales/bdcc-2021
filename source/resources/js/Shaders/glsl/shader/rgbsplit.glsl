uniform float time;
uniform float progress;
uniform sampler2D texture1;
uniform vec4 resolution;
varying vec2 vUv;


void main()	{
    vec2 dir = vUv - vec2( .5 );
    float d = .7 * length( dir );
    normalize( dir );
    vec2 value = d * dir * ( 1000.0 * progress );

    /*
    vec4 c1 = texture2D( texture1, vUv - value / resolution.x );
    vec4 c2 = texture2D( texture1, vUv );
    vec4 c3 = texture2D( texture1, vUv + value / resolution.y );
    */

    vec2 newUV = (vUv - vec2(progress))*resolution.zw + vec2(progress);
    newUV.x += 0.001;// * progress;//*sin(newUV.y*0.05 + progress*10.0);

    //vUv.x += .5 * sin(vUv.y*20. + progress);
    vec4 c1 = texture2D( texture1, newUV );


    vec2 newUV2 = (vUv - vec2(.5))*resolution.zw + vec2(.5);
    vec4 c2 = texture2D( texture1, newUV2 );

    newUV2.x -= 0.001;// * progress;//*sin(newUV.y*0.05 + progress*10.0);
    vec4 c3 = texture2D( texture1, newUV2 );

    gl_FragColor = vec4( c1.r, c2.g, c3.b, c1.a  );
}
