class Error404 extends Page {

//==================================================================================================================
//          CONSTRUCTOR
//==================================================================================================================

  _titles;

  constructor() {
    super();
    TweenLite.set(this.container, {alpha: 0});

    /* TITLES */

  }

//==================================================================================================================
//          PUBLIC
//==================================================================================================================

  //SHOW
  beforeShow() {
    TweenLite.set(this.container, {alpha: 1});
  }

  show__effect() {
    Cursor.color = ColorsCSS.BLACK;
    BG.changePalette(Colors.WHITE, ()=>{
      this.afterShow();
    }, .4, Quad.easeOut);
  }

  afterShow() {
    Header.showLogo();
    Header.showNav();
    Header.setActiveLink("");
    Footer.show();
    Preloader.enabled = false;
  }

  //HIDE
  beforeHide() {
    Cursor.hide();
  }

  beforeHide__effect(__continue) {
    Header.hideDetail();
    TweenLite.to(this.container, 0.5, {alpha: 0, ease: Quad.easeIn,onComplete:() => {__continue();}});
  }

  hide__effect() {
    this.afterHide();
  }

  afterHide() {
    Interaction.options.onDragStart = null;
    Interaction.options.onDragEnd = null;
    super.afterHide();
  }

  //RESIZE
  resize() {
    super.resize();
  }

  //LOOP
  loop() {
    if(this._isActive) {
      super.loop();
    }
  }
}