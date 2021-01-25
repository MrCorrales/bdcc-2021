class Search extends Default {

//==================================================================================================================
//          CONSTRUCTOR
//==================================================================================================================

  constructor() {
    super();

    if(Basics.isReducedMotion) return;
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

  afterHide() {
    super.afterHide();
  }

  //RESIZE
  resize() {
    super.resize();
  }

  dispose() {
    super.dispose();
  }
}