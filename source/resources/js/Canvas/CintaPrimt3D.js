class CintaPrimt3D {
  _dom;

  mesh;
  width;
  height;
  attributes = {x:0, y:0, z:-400, rotation:0, scale:0, speed:0, scaleItem:1};

  _img;
  _size;
  _text;

  constructor(__dom, __opts) {
    this._dom = __dom;
    this.getSize(true);

    this.mesh = this.createMesh({
      width: this._size.width,
      height: this._size.height,
      src: __opts.src,
      iWidth: Number(__opts.width),
      iHeight: Number(__opts.height),
    });

    this.attributes.z = __opts.z;
    this.attributes.rotation = __opts.rotation;

    this.mesh.position.x =  this.attributes.x;
    this.mesh.position.y =  this.attributes.y;
    this.mesh.position.z =  this.attributes.z;
    this.mesh.rotation.z =  this.attributes.rotation;

    Main.stage.scene.add(this.mesh);
  }

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

  draw() {
    this.mesh.material.uniforms.time.value++;
  }

  getSize(__first) {
    const bounds = this._dom.getBoundingClientRect();

    this._size = {
      top: Metrics.HEIGHT*.5,//bounds.top - Scroll.y,
      left: bounds.left,
      width: bounds.width * 10,
      height: bounds.height
    };
  }

  resize(w,h) {
    this.getSize();

    this.attributes.y = Metrics.HEIGHT / 2 - this._size.top - this._size.height / 2;
    this.attributes.x = 0;// - Metrics.WIDTH / 4 + this._size.left + this._size.width / 2;

    this.mesh.position.x = this.attributes.x;
    this.mesh.position.y = this.attributes.y;
    this.mesh.position.z = this.attributes.z;
    this.mesh.scale.set(this._size.width, this._size.height, 200);
  }

  dispose() {
    super.dispose();
  }
}

