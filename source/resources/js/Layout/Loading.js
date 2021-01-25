class Loading extends _Loading {
  //static container = C.GetBy.class("indicator-clock")[0];
 // static _tl;

  static init() {
    /*this._tl =  new gsap.timeline();
    this._tl.repeat(20);

    const SAND_TOP = C.GetBy.selector(".indicator-clock__sand-top .sand");
    const SAND_BOTTOM = C.GetBy.selector(".indicator-clock__sand-bottom .sand");

    gsap.set(SAND_TOP,{y:"0%"});
    gsap.set(SAND_BOTTOM,{y:"-50%"});

    this._tl.to(SAND_TOP,{y:"100%", duration:1, ease:Linear.easeNone},0);
    this._tl.to(SAND_BOTTOM,{y:"0", duration:.6, ease:Linear.easeNone},0);
    this._tl.to(this.container,{rotation:180, duration:1, ease:Power4.easeInOut},.8);*/
  }

  static start__effect() {
   /* gsap.to(this.container,{alpha:1,duration:.1,ease:Power3.easeOut});
    this._tl.restart();*/
  }
  static stop__effect() {
   /* gsap.to(this.container,{alpha:0,duration:.3,ease:Power3.easeIn, delay:.3, onComplete:()=>{
        this._tl.pause();
      }});*/
  }
  static loop() {}
  static resize() {}
}


