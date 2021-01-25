class PhotoDetail extends Default {

//==================================================================================================================
//          CONSTRUCTOR
//==================================================================================================================

  constructor() {
    super();

    /*const ITEMS = C.GetBy.class("media-holder", this.container);

    for(let i = 0; i<ITEMS.length; i++) {
      ITEMS[i].setAttribute("data-speed",1 + Maths.maxminRandom(1,-1)/10)
    }*/
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
    // /NavCategories__Photo.show();
    Header.showPhotoDetail();
    super.afterShow();
  }

  beforeHide() {


    Basics.idProject = null;
    Basics.tempValue = null;
  }
  hide__effect(__isBack) {
    Header.hideDetail();
    super.hide__effect(__isBack);
  }

  //RESIZE
  resize() {
    if(this._isActive) {
      super.resize();
    }
  }

  //LOOP
  loop() {
    if(this._isActive) {
      super.loop();
    }
  }
}