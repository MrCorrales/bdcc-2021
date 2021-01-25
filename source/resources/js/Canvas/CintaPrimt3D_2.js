

class CintaPrimt3D_2 {
  _item;

  mesh;
  width;
  height;
  left;
  fixed = false;
  attributes = {x:0, y:0, z:-410, rotation:0, scale:0, speed:0, scaleItem:1};

  _image;
  _img;
  _imageSize;
  _text;

  constructor(__item) {
    this._item = __item;

    this.onVisible = () => {};
    this.onShow = () => {
      this.mesh.visible = true;
    };
    this.onHide = () => {
      this.mesh.visible = false;
    };

    this._image = this._item;//C.GetBy.selector("figure", this.item)[0];
    this._img = C.GetBy.id("img2");

    this.getSize(true);

   /* const material = new THREE.MeshBasicMaterial({
      color: 0xFF0000,    // red (can also use a CSS color string here)
      flatShading: true,
    });
    this.mesh = new THREE.Mesh(Main.stage.geometry, material);
    this.mesh.scale.set(this._imageSize.width, this._imageSize.height, this._imageSize.width / 2);*/

    this.mesh = Main.stage.createMesh({
      width: this._imageSize.width,
      height: this._imageSize.height,
      src: this._img.getAttribute("data-src"),
      image: this._img,
      iWidth: Number(this._img.getAttribute("width")),
      iHeight: Number(this._img.getAttribute("height")),
    });

    Main.stage.scene.add(this.mesh);

    this.mesh.position.x =  this.attributes.x;
    this.mesh.position.y =  this.attributes.y;
    this.mesh.position.z =  this.attributes.z;
    this.mesh.rotation.z =  -.05;//this.attributes.rotation;
  }

  draw() {
    //super.draw();

    //console.log(this.mesh.position.x, this.mesh.position.y, this._imageSize.top, this._imageSize.height)
    this.mesh.visible = true;

   // this.attributes.y = "currentScroll + winsize.height / 2 - this.insideRealTop - this.height / 2;

    /* const POS = Main.stage.domPositionTo3D(this._imageSize.left + this._imageSize.width / 2, this._imageSize.top - this._imageSize.height / 2);
    this.attributes.x = POS.x;
    this.attributes.y = POS.y;
    this.attributes.z = POS.z;*/

    this.attributes.y = Metrics.HEIGHT / 2 - this._imageSize.top - this._imageSize.height / 2;
    this.attributes.x = 0;// - Metrics.WIDTH / 4 + this._imageSize.left + this._imageSize.width / 2;

    //console.log(this.attributes.x, this.attributes.y)

    this.mesh.position.x = this.attributes.x;
    this.mesh.position.y = this.attributes.y;
    this.mesh.position.z = this.attributes.z;
    this.mesh.scale.x = this._imageSize.width;
    this.mesh.scale.y = this._imageSize.height;
    this.mesh.material.uniforms.time.value++;


    /*this.attributes.scale = Math.min(1, this.progress + this.attributes__mod.scale);
    this.attributes.speed = Scroll.speed * -.04;
    this.mesh.rotation.z = this.attributes.rotation + this.attributes__mod.rotation;*/

   // this.mesh.material.uniforms.progress.value = Maths.lerp(0.5, 1, 1);
  ////  this.mesh.material.uniforms.uVelo.value = 0;//this.attributes.speed;
  //  this.mesh.material.uniforms.alpha.value = 1;//this.style === STYLE_GALLERY? this.attributes__mod.alpha : Main.stage.alpha;
  }
  
  /*toGallerySize(__isdDirect) {
    WinImage.text = this._text;
    WinImage.show(this._imageSize.width * this._scaleShow, this._imageSize.height * this._scaleShow, __isdDirect);

    this.style = STYLE_GALLERY;
    this.attributes__mod.alpha = 1;
    gsap.killTweensOf(this.attributes__mod);

    if(__isdDirect) {
      this.attributes__mod.positionMod = 0;
      this.attributes__mod.x = 0;
      this.attributes__mod.y = 0;
      this.attributes__mod.z = 100 - this.attributes.z;
      this.attributes__mod.scaleItem = this._scaleShow;
      this.attributes__mod.scale = 1;
      this.attributes__mod.rotation = 0 - this.attributes.rotation;
      this.mesh.visible = true;

      Scroll.directGoto(this.top);

      this.draw();

      Main.scrollbar.time = this.indexImage;
    } else {
      gsap.to(this.attributes__mod, {
        positionMod: 0,
        x: 0,
        y: 0,
        z: 100 - this.attributes.z,
        scale: 1,
        scaleItem: this._scaleShow,
        rotation: 0 - this.attributes.rotation,
        ease: Power4.easeOut,
        duration: .8
      });
    }
  }

  toScrollSize(__call, __isdDirect) {
    gsap.killTweensOf(this.attributes__mod);
    if(__isdDirect) {
      this.attributes__mod.positionMod = 1;
      this.attributes__mod.x = 0;
      this.attributes__mod.y = 0;
      this.attributes__mod.z = 0;
      this.attributes__mod.alpha = 0;
      this.attributes__mod.scaleItem = 1;
      this.attributes__mod.scale = 0;
      this.attributes__mod.rotation = 0;
      this.mesh.visible = this.isVisible;
      this.style = STYLE_SCROLL;
      this.draw();
    } else {
      WinImage.hide();
      gsap.to(this.attributes__mod, {
        positionMod: 1,
        x: 0,
        y: 0,
        z: 0,
        alpha: 1,
        scaleItem: 1,
        scale: 0,
        rotation: 0,
        ease: Power4.easeInOut,
        duration: 1,
        onComplete: () => {
          this.style = STYLE_SCROLL;
          __call();
        }
      });
    }
  }*/

  getSize(__first) {
    const bounds = this._image.getBoundingClientRect();


    this._imageSize = {
      top: Metrics.HEIGHT*.5,//bounds.top - Scroll.y,
      left: bounds.left,
      width: bounds.width * 10,
      height: bounds.height
    };

    console.log(bounds.top)
  }

  resize(w,h) {
    this.getSize();
    this.mesh.scale.set(this._imageSize.width, this._imageSize.height, 200);
  }

  dispose() {
    super.dispose();
  }
}

