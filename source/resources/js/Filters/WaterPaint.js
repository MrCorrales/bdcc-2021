class WaterPaint extends PIXI.Filter {

  /**
   * The WaterPaint constructor assembles all of the uniforms
   * and initialises the superclass.
   *
   * @constructor
   * @param {Number} resolution         The resolution of the application, essentially the pixel depth
   */

  cont = 0;

  constructor(width, height, resolution) {
    // Construct the super class based on the default vertex shader and the fragment shader from the WaterPaint
    super(PIXI.Filter.defaultVertexSrc, WaterPaint.fragmentSrc);

    this.resolution = resolution;

    // Set up the filter uniforms
    this.uniforms.time = 0;
    this.uniforms.mouse = [0,0];
    this.uniforms.u_resolution = [width*this.resolution,height*this.resolution];

    // This simply stops the filter from passing unexpected params to our shader
    this.autoFit = false;
  }

  /**
   * Reacts to the window resize event. Calculates the new size of the filter
   *
   * @public
   * @return null
   */
  resize(width, height) {
    this.uniforms.u_resolution = [width*this.resolution,height*this.resolution];
  }

  /**
   * (getter) The fragment shader for the screen filter
   *
   * @static
   * @type {string}
   */
  static get fragmentSrc() {
    return `
  precision highp float;
  varying vec2 vTextureCoord;
  uniform sampler2D uSampler;
  uniform vec4 inputSize;  
  uniform vec2 u_resolution;
  uniform float time;
  #define PI 3.14159265359
  
  float SCALE = 1.;
  mat3 m = mat3( 0.00,  0.80,  0.60,
              -0.80,  0.36, -0.48,
              -0.60, -0.48,  0.64 );
  
  float hash( float n ){
    return fract(sin(n)*43758.5453);
  }
  
  float noise( in vec3 x ){
    vec3 p = floor(x);
    vec3 f = fract(x);

    f = f*f*(3.0-2.0*f);

    float n = p.x + p.y*57.0 + 113.0*p.z;

    float res = mix(mix(mix( hash(n+  0.0), hash(n+  1.0),f.x),
                        mix( hash(n+ 57.0), hash(n+ 58.0),f.x),f.y),
                    mix(mix( hash(n+113.0), hash(n+114.0),f.x),
                        mix( hash(n+170.0), hash(n+171.0),f.x),f.y),f.z);
    return res;
  }
   
  float fBM( vec3 p )
  {
      float f;
      f  = 1. - 0.5000*noise( p ); p = m*p*2.1;
      f *= 1. - 0.2500*noise( p ); p = m*p*2.5;
      f *= 1. - 0.1250*noise( p ); p = m*p*0.08;
      f *= 1. - 0.0625*noise( p ); p = m*p*1.25;
      f *= 1. - 0.0625/2.*noise( p ); p = m*p*1.52;
      f *= 1. - 0.0625/4.*noise( p );
      return f;
  }
  
  
  float rand(vec2 c){
	  return fract(sin(dot(c.xy ,vec2(12.9898,78.233))) * 43758.5453);
  }
  
  float noise(vec2 p, float freq ){
    float unit = inputSize.x/freq;
    vec2 ij = floor(p/unit);
    vec2 xy = mod(p,unit)/unit;
   
    xy = .5*(1.-cos(PI*xy));
    float a = rand((ij+vec2(0.,0.)));
    float b = rand((ij+vec2(1.,0.)));
    float c = rand((ij+vec2(0.,1.)));
    float d = rand((ij+vec2(1.,1.)));
    float x1 = mix(a, b, xy.x);
    float x2 = mix(c, d, xy.x);
    return mix(x1, x2, xy.y);
  }
    
  void main(void){
    vec2 uv = gl_FragCoord.xy / u_resolution.xy;
    
    uv.y = -1.0 - uv.y;
    
    vec3 p = 4.*vec3(uv,0.)+time*.1;
    float x = fBM(p);
    vec3 v = (1.5+1.5*sin(x*vec3(10.,5.,1.)*SCALE))/SCALE;
     float g = 1.;
    g = pow(length(v),1.);
    g =  .5*noise(1.*m*m*m*p)+.5; g = 5.*pow(g,3.);
    v *= g;
    
    vec3 Ti = texture2D(uSampler,.02*v.xy+gl_FragCoord.xy / u_resolution.xy).rgb*1.4-.2;
    v = Ti;
    gl_FragColor = vec4(Ti,1.0);
  }
`;
  }


  apply(filterManager, input, output) {
    this.cont++;
    if(this.cont%2 === 0) this.uniforms.time += .04;
    filterManager.applyFilter(this, input, output);
  }
}