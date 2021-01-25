class Test extends Page {
  id;

//==================================================================================================================
//          CONSTRUCTOR
//==================================================================================================================

  constructor() {
    super();
    TweenLite.set(this.container, {alpha: 0});
    if(ControllerPage.firsTime) {
      BG.changePaletteDirect(Colors.LIGHT);
    }

    this.id = "__" + new Date().getTime();

    //DISPOSE
    this.addDispose(()=>{

    });
  }

//==================================================================================================================
//          PUBLIC
//==================================================================================================================

  //SHOW
  beforeShow() {
    Scroll.init(Scroll.AXIS_Y, {
      smooth:false,
      itemClass:[
        {id:"header-page", class:ScrollItem__HeaderPage},
        {id:"slider-video", class:ScrollItem__SliderVideo},
        {id:"default", class:VScroll_Item},
      ]
    });
    Scroll.addAll();
    Scroll.resize();
    Scroll.start();
    this.addDispose(Scroll.dispose);
  }

  show__effect() {
    TweenLite.set(this.container, {alpha: 1});
    BG.changePalette(Colors.LIGHT, ()=>{
      Scroll.show();
      this.afterShow();
    }, .4, Quad.easeOut);
  }

  afterShow() {
    super.afterShow();
  }


  beforeHide() {}
  hide__effect() {
    Sidemenu.hide();
    gsap.to(this.container, {alpha: 0, duration:.5, ease: Quad.easeIn,onComplete:() => {this.afterHide();}});
  }

  afterHide() {
    Scroll.hide();
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