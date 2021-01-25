class FilmDetail__mobile extends Default {

  _player;

//==================================================================================================================
//          CONSTRUCTOR
//==================================================================================================================

  constructor() {
    super();
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
    Header.showDetail();
    Breadcrumb.hide();

    setTimeout(()=> {
      document.body.classList.add("__invertMode");
    },1000);
  }

  afterShow() {
    super.afterShow();
  }

  beforeHide() {}


  afterHide() {
    Header.hideDetail();
    document.body.classList.remove("__invertMode");
    super.afterHide();
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