class GalleryPhoto extends Default {

  _visor;

//==================================================================================================================
//          CONSTRUCTOR
//==================================================================================================================

  constructor() {
    super();

    const VISOR_DOM = C.GetBy.class("gallery-portrait__visor", this.container)[0];

    if(Basics.isMobile) {
      C.Remove(VISOR_DOM);

    } else {
      this._visor = new VisorPhoto(VISOR_DOM);

      //////
      this._items = C.GetBy.class("__link", this.container);
      for (let i = 0, j = this._items.length; i < j; i++) {
        let item = this._items[i];

        item.addEventListener(Basics.mouseOver, (e) => {
          if (!this._isHide) this._visor.showImage(i);
        });

        item.addEventListener(Basics.mouseOut, (e) => {
          this._visor.hideImage(i);
        });
      }
    }
  }

//==================================================================================================================
//          PUBLIC
//==================================================================================================================

  //SHOW
  beforeShow() {
   super.beforeShow();
  }

  show__effect() {
    super.show__effect();
  }

  afterShow() {
    NavCategories__Photo.show();
    super.afterShow();
  }

  beforeHide() {
    if(Basics.tempValue !== "photo") {
      NavCategories__Photo.hide();
    } else {
      NavCategories__Photo.enableActive();
    }

    Basics.idProject = null;
    Basics.tempValue = null;
  }


  //RESIZE
  resize() {
    if(this._isActive) {
      super.resize();

      if(!Basics.isMobile) {
        this._visor.resize();
      }
    }
  }

  //LOOP
  loop() {
    if(this._isActive) {
      if(!Basics.isMobile) {
        const deltaX = Math.floor((Interaction.positions.mouse.x - this._visor.x)) * 0.08;
        const deltaY = Math.floor((Interaction.positions.mouse.y - this._visor.y)) * 0.08;
        this._visor.x += deltaX;
        this._visor.y += deltaY;

        const deltaRotateX = Math.floor((Interaction.positions.mouse.x - this._visor.xRotate)) * 0.1;
        const deltaRotateY = Math.floor((Interaction.positions.mouse.y - this._visor.yRotate)) * 0.1;
        this._visor.xRotate += deltaRotateX;
        this._visor.yRotate += deltaRotateY;

        this._visor.loop();
      }
      super.loop();
    }
  }
}