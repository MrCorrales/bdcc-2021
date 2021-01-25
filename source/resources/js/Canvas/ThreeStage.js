class ThreeStage {
  container = /*C.GetBy.id("Interface");*/C.GetBy.class("tshirt-editor__preview")[0];
  time=0;
  mouse;
  raycaster;
  camera;
  controls;
  cameraDistanceGallery = 500;
  cameraDistanceScroll = 800;
  cameraDistance;
  scene;
  renderer;
  width;
  height;

  pointL;
  pointL2;

  alpha = 1;

  geometry;
  material;

  cintaRed;
  cintaBlue;
  tee;

  //_dom = C.GetBy.id("Page");
  _visor;

  isEnabled = false;
  isMouseEnabled = false;

  constructor(){}

  init(__call) {
    this.scene = new THREE.Scene();
    //this._visor = new Visor();

    this.width = this.container.offsetWidth;
    this.height = this.container.offsetHeight;
    this.cameraDistance = this.cameraDistanceScroll;
    this.mouse = new THREE.Vector2();

    this.loadShaders(() => {
      this.setupRenderer();
      this.setupCamera();

      //this.setupActions();
      //this._visor = new Visor(this);
      this.isEnabled = true;
      this.resize();

      if(!Basics.isTouch) {
        let dom = C.GetBy.id("ImgCintaRed");
        this.cintaRed = new CintaPrimt3D(C.GetBy.class("cinta")[0], {
          src: dom.getAttribute("data-src"),
          width: dom.getAttribute("width"),
          height: dom.getAttribute("height"),
          z: -410,
          rotation: -.1
        });

        dom = C.GetBy.id("ImgCintaBlue");
        this.cintaBlue = new CintaPrimt3D(C.GetBy.class("cinta")[0], {
          src: dom.getAttribute("data-src"),
          width: dom.getAttribute("width"),
          height: dom.getAttribute("height"),
          z: -400,
          rotation: .2
        });
      }
      
      
      this.tee = new Tee("/images/obj/tee.obj");
      Main.stage.scene.add(this.tee);

      //LUZ
      var light = new THREE.AmbientLight( 0xFFFFFF ); // soft white light

      this.pointL = new  THREE.PointLight(Colors.WHITE, .3 );
      this.pointL.position.x = 0;
      this.pointL.position.y = 0;
      this.pointL.position.z = -80;

      this.pointL2 = new  THREE.PointLight(Colors.WHITE, 1 );
      this.pointL2.position.x = 0;
      this.pointL2.position.y = 140;
      this.pointL2.position.z = 100;


      
      //Main.stage.scene.add(light);
      Main.stage.scene.add(this.pointL);
      Main.stage.scene.add(this.pointL2);


      __call();
    });
  }

  loadShaders(__call) {
    __call();
  }

  setupRenderer() {
    this.raycaster = new THREE.Raycaster(); // create once
    this.renderer = new THREE.WebGLRenderer({
      antialias: false,
      alpha: true
    });
    this.renderer.setPixelRatio(1.4);
    this.renderer.setSize(this.width,this.height);
    this.renderer.sortObjects = false;
    this.renderer.outputEncoding = THREE.sRGBEncoding;
    //this.renderer.setClearColor( Colors.PRIMARY, 1);

    this.renderer.domElement.id = "Interface_x_Canvas"


    this.container.appendChild(this.renderer.domElement);
  }

  domPositionTo3D(__x, __y) {
    const x = 0 - this.width * .5 + __x;
    const y = (Metrics.HEIGHT / 2) -  __y;




    return {
      x:x, y:y, z:0
    }
  }

  setupCamera() {
    this.camera = new THREE.PerspectiveCamera(
      70,
      this.width / this.height,
      10,
      10000
    );

    this.camera.position.set(0, 0, this.cameraDistanceScroll);
    this.camera.lookAt(0, 0, 0);

    this.controls = new THREE.OrbitControls( this.camera, this.renderer.domElement );
    this.controls.enableDamping = true;
    this.controls.dampingFactor = 0.05;

    this.controls.dampingFactor = 0.05;
    this.controls.rotateSpeed = 0.3;


    this.controls.minDistance = 90;
    this.controls.maxDistance = Metrics.isSmartphone() ? 600: 300 ;


    this.controls.minPolarAngle = Math.PI / 3;
    this.controls.maxPolarAngle = Math.PI / 1.5; // radians

// How far you can orbit horizontally, upper and lower limits.
// If set, must be a sub-interval of the interval [ - Math.PI, Math.PI ].
    if(!Basics.isTouch) {
      this.controls.minAzimuthAngle = 0;
      this.controls.maxAzimuthAngle = 0;
    }
    this.controls.update();
  }

  resize(){
    if(!this.isEnabled) return false;

    this.width = this.container.offsetWidth;
    this.height = this.container.offsetHeight;

    this.renderer.setSize(this.width, this.height);
    this.camera.aspect = this.width / this.height;

    this.camera.fov =
      2 *
      Math.atan(this.width / this.camera.aspect / (2 * this.cameraDistanceScroll)) *
      (180 / Math.PI); // in degrees

    this.camera.updateProjectionMatrix();

    if(this.cintaRed) {
      this.cintaRed.resize();
      this.cintaBlue.resize();
    }
  };

  createMesh(o) {
    let material = MATERIAL_CINTA.clone();
    let texture = new THREE.TextureLoader().load(o.src);
    texture.needsUpdate = true;
    // image cover
    let imageAspect = o.iHeight / o.iWidth;



    let a1;
    let a2;
    if (o.height / o.width > imageAspect) {
      a1 = (o.width / o.height) * imageAspect;
      a2 = 1;
    } else {
      a1 = 1;
      a2 = o.height / o.width / imageAspect;
    }
    texture.minFilter = THREE.LinearFilter;

    material.uniforms.resolution.value.x = o.width;
    material.uniforms.resolution.value.y = o.height;
    material.uniforms.resolution.value.z = a1;
    material.uniforms.resolution.value.w = a2;

    material.uniforms.columns.value = Math.ceil(o.width/(o.iWidth*imageAspect));
    material.uniforms.rows.value = 1;
    material.uniforms.speed.value = 1;

    material.uniforms.texture.value = texture;
    material.uniforms.texture.value.needsUpdate = true;

    let mesh = new THREE.Mesh(BASIC_PLANE, material);

    mesh.scale.set(o.width, o.height, o.width / 2);

    return mesh;
  }

  getSpeed() {

  }

  /*moveVisor() {
    this.camera.position.z = this.cameraDistance;

    const X = 0 - Metrics.WIDTH / 2 + (Interaction.positions.mouse.x);
    const Y = (Metrics.HEIGHT / 2 - Interaction.positions.mouse.y);

    const XTO = Math.floor((this._visor.centerX - X)) * .3 * -1;
    const YTO = Math.floor((this._visor.centerY - Y)) * .2 * -1;

    const deltaX = Maths.difference(this._visor.x, XTO + this._visor.centerX, .08);
    const deltaY = Maths.difference(this._visor.y, YTO + this._visor.centerY, .08);

    this._visor.x += deltaX;
    this._visor.y += deltaY;
    this._visor.xRotate = -deltaX*.01;
    this._visor.loop();
  }

  checkMouseOver() {
    this.mouse.x = (Interaction.positions.mouse.x / Metrics.WIDTH) * 2 - 1;
    this.mouse.y = - (Interaction.positions.mouse.y / Metrics.HEIGHT) * 2 + 1;

    if(this._visor.style === STYLE_GALLERY) return;

    if(Math.abs(Scroll.speed) < 20) {
      this.raycaster.setFromCamera(this.mouse, this.camera);
      var intersects = this.raycaster.intersectObjects(this.scene.children);

      if (intersects.length > 0) {
        this._visor.show(intersects[0].object.uuid);
      } else {
        this._visor.hide();
      }
    } else {
      this._visor.hide();
    }
  }*/

  loop(__time, __force){
    /*if(this.isMouseEnabled) {
      this.checkMouseOver();
    }*/

    if(this.isEnabled || __force) {
      //this.moveVisor();
      if(this.cintaRed) {
        this.cintaRed.draw();
        this.cintaBlue.draw();
      }
      this.time++;

      this.tee.rotation.y = Maths.lerp(this.tee.rotation.y, this.tee._rot, .1)


      this.pointL.position.y = Math.sin(this.time/20)*100;
      //this.pointL2.position.x = Math.sin(this.time/10)*100;

      this.controls.update();
      this.renderer.render(this.scene, this.camera);
    }
  };

  getSourceSynch(url) {
    // Create the XHR request
    var request = new XMLHttpRequest();

    // Return it as a Promise
    return new Promise(function (resolve, reject) {

      // Setup our listener to process compeleted requests
      request.onreadystatechange = function () {

        // Only run if the request is complete
        if (request.readyState !== 4) return;

        // Process the response
        if (request.status >= 200 && request.status < 300) {
          // If successful
          resolve(request);
        } else {
          // If failed
          reject({
            status: request.status,
            statusText: request.statusText
          });
        }
      };

      // Setup our HTTP request
      request.open('GET', url, true);

      // Send the request
      request.send();

    });
  };
}


