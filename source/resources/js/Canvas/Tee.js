class Tee extends THREE.Group {
  VISIBLE_WIDTH = 138;
  OBJ_WIDTH = 75;
  _secureHeight;

  _id;
  _src;
  _obj;
  _frontSide;
  _backSide;
  _holder = new THREE.Group();
  _auxHolder = new THREE.Group();
  _mainHolder = new THREE.Group();
  
  _height = 60;
  _direction = 1;
  pixelSize;
  isEnabled = false;
  isLoaded = false;
  isReadyShow = false;

  _hdrCubeRenderTarget;
  _normalMap;
  _materialTee;
  _gemBackMaterial;

  _domX;
  _domY;
  _posY = 0;
  _vector;
  _mask;

_rot = 0;
  _options;

  constructor(__src) {
    super();
    
    this._src = __src;
    this.setupMaterial();
    this.load();

    if(!Basics.isTouch) {
      this._interaction = new MrInteraction(C.GetBy.class("tshirt-editor__preview")[0], {
        drag: true,
        axis: "x",
        dragCheckTime: .05,
        onMove: (n) => {
          //if (__opt.onMove) __opt.onMove();
          console.log(n)

          this._rot += n / 100;

          //this._scroll.move(n)
        },
        onDragStart: () => {
        },
        onDragEnd: () => {
        }
      });
    }
  }

  setupMaterial() {

    let roughness = new THREE.TextureLoader().load("images/images/textures/roughness.jpg");
    let normal = new THREE.TextureLoader().load("images/images/textures/normal.jpg");
    let aoMap = new THREE.TextureLoader().load("images/images/textures/ambientOcclusion.jpg");
    let displacement = new THREE.TextureLoader().load("images/images/textures/displacement.jpg");
    let basecolor = new THREE.TextureLoader().load("images/images/textures/basecolor.png");

    this._materialTee = new THREE.MeshLambertMaterial( {
      //map: basecolor,
     // emissive: 0xFAFAFA,
      color:0x101010,
      side: THREE.DoubleSide,
      //gradientMap: new THREE.TextureLoader().load("images/images/textures/threeTone.jpg")
      //transparent: false,

    } );






  }

  load(__call = null) {
    const tClass = this;
    let nLoaded = 0;

    new THREE.OBJLoader().load(this._src,
      function ( object ) {

        tClass._obj = object;
        tClass._frontSide = object.children[0];
        tClass._frontSide.material = tClass._materialTee;

        nLoaded++;

        if(nLoaded === 1) {
          tClass.setup();
          if (__call) __call();
        }
      },
      function ( xhr ) {},
      function ( error ) {
        console.log( 'An error happened' );
      }
    );




    /*var pmremGenerator = new THREE.PMREMGenerator(ThreeStage.renderer);
    pmremGenerator.compileEquirectangularShader();

    new THREE.HDRCubeTextureLoader()
      //.setDataType( THREE.UnsignedByteType )
      .setPath( Paths.TEXTURES + 'cube/diamond/' )
      .load( [ 'px.hdr', 'nx.hdr', 'py.hdr', 'ny.hdr', 'pz.hdr', 'nz.hdr' ], function ( hdrCubeMap ) {

        tClass._hdrCubeRenderTarget = pmremGenerator.fromCubemap( hdrCubeMap );
        tClass._materialTee.envMap = tClass._gemBackMaterial.envMap = tClass._hdrCubeRenderTarget.texture;
        tClass._materialTee.needsUpdate = tClass._gemBackMaterial.needsUpdate = true;

        hdrCubeMap.dispose();
        pmremGenerator.dispose();

        nLoaded++;

        if(nLoaded === 2) {
          tClass.setup();
          if (__call) __call();
        }

      });*/
  }

  setup() {
    //this._frontSide.receiveShadow = false;

    this.add(this._mainHolder);
    this._mainHolder.add(this._frontSide);
    this.isEnabled = true;


    this.resize();

    /*this.particleLight = new THREE.PointLight(Colors.WHITE, 1 );
    this.particleLight3 = new THREE.PointLight(Colors.PRIMARY, .1 );
    this.particleLight4 = new THREE.PointLight(Colors.WHITE, .2 );
    this._mainHolder.add( this.particleLight );
    this._mainHolder.add( this.particleLight3 );
    this._mainHolder.add( this.particleLight4 );


    this.particleLight.position.x = -100;
    this.particleLight.position.y = 100;
    this.particleLight.position.z = 10;

    this.particleLight3.position.x = -100;
    this.particleLight3.position.y = -22;
    this.particleLight3.position.z = 100;

    this.particleLight4.position.x = -42;
    this.particleLight4.position.y = 53;
    this.particleLight4.position.z = -33;*/

    this.isLoaded = true;
    if(this.isReadyShow) {
      this.show();
    }
  }

  loop() {}

  show() {
    this.isReadyShow = true;
    if(this.isLoaded) {
      /*this.resize();
      this.resize();
      gsap.to(this._mask,{opacity:0,duration:.4,delay:.2,ease:Power3.easeIn});*/
    }
  }

  hide() {
    this.isEnabled = false;
  }

  /*moveTo(__y) {
    this._posY = __y*this.pixelSize;
    if(this.isEnabled) {
      this.position.set(this._vector.x, this._vector.y - this._posY, this._vector.z);
    }
  }
*/
  dispose() {
    this._frontSide.material.dispose();
    this._frontSide.geometry.dispose();
    this._obj = null;
  }

 /* getPixel3D() {
    const DOM_SIZE_REF = C.GetBy.id("Scrollbar");

    const P0 = new THREE.Vector3(
      this._domY,
      (0 / Metrics.HEIGHT) * 2 - 1,
      .99
    ).unproject(ThreeStage.camera);
    const P1 = new THREE.Vector3(
      this._domY,
      (Metrics.HEIGHT / Metrics.HEIGHT) * 2 - 1,
      .99
    ).unproject(ThreeStage.camera);

    return Math.abs(P1.y - P0.y)/Metrics.HEIGHT;
  }*/

  resize() {
    if(this.isEnabled) {
      //this.resize__position();
      this.scale.set(1,1,1);
      //this._holder.rotation.y = 0;
      //this._auxHolder.rotation.y = 0;
      /*ThreeStage.loop();
      this.resize__3D();
      this.pixelSize = this.getPixel3D();*/
    }
  }

  /*resize__position() {
    const DOM_SIZE_REF = C.GetBy.id("Scrollbar");

    if(Basics.isMobile && Basics.isPortrait) {
      this._domX = Metrics.WIDTH * .8;
    } else {
      this._domX = DOM_SIZE_REF.getBoundingClientRect().left;
    }

    this._domY = -((ThreeStage._secureHeight*.5) / ThreeStage._secureHeight) * 2 + 1;

    //3D
    this._vector = new THREE.Vector3(
      this._domY,
      this._domY,
      .99
    ).unproject(ThreeStage.camera);

    this.position.set(this._vector.x, this._vector.y + this._posY, this._vector.z);

    //DOM
    const POS_DOM_STAGE = Basics.isMobile?
      this._domX + (Metrics.WIDTH - ThreeStage._secureHeight)/2 :
      this._domX + (DOM_SIZE_REF.offsetWidth - ThreeStage._secureHeight)/2;

    ThreeStage.renderer.domElement.style.left = POS_DOM_STAGE + "px";
  }

  resize__3D() {
    const DOM_SIZE_REF = C.GetBy.id("Scrollbar");
    const SCALE_DOM = Basics.isMobile?
      ThreeStage._secureHeight*.75/ThreeStage._secureHeight :
      (DOM_SIZE_REF.offsetWidth*.9)/ThreeStage._secureHeight;

    const SIZE_3D = this.VISIBLE_WIDTH * SCALE_DOM;
    const SCALE = SIZE_3D/this.OBJ_WIDTH;
    this.scale.set(SCALE,SCALE,SCALE);
  }*/
}