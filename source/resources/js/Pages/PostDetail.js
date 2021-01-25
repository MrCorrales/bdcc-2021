class PostDetail extends Default {

  _header;

//==================================================================================================================
//          CONSTRUCTOR
//==================================================================================================================

  constructor() {
    super();
    this._header = C.GetBy.class("__header", this.container)[0];
    this.resizeHeader();
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
    super.afterShow();
  }
  beforeHide() {}

  //RESIZE
  resize() {
    if(this._isActive) {
      //HEADER
      this.resizeHeader();
      super.resize();
    }
  }

  resizeHeader() {
    const HEIGHT = this.container.offsetHeight - this._header.offsetTop;
    this._header.style.setProperty('--height', `${HEIGHT}px`);
  }

  //LOOP
  loop() {
    super.loop();
  }
}