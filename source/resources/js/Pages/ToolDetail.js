class ToolDetail extends Default {


  _dom = C.GetBy.class("section-tool-detail", this.container);

  constructor() {
    super();
    if(!Basics.isReducedMotion) {
      gsap.set(this._dom, {y: Metrics.HEIGHT * .2});
    }
  }

  //SHOW
  beforeShow() {
   super.beforeShow();
  }

  show__effect() {
    super.show__effect(null,true);
    if(!Basics.isReducedMotion) {
      gsap.to(this._dom, {y: 0, ease: Power2.easeOut, duration: .4});
    }
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