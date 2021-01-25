class Sidemenu extends _Sidemenu{

  static _tl = new gsap.timeline();
  static _bg = C.GetBy.class("sidemenu__bg")[0];
  static _logo = C.GetBy.class("sidemenu__logo")[0];
  static _nav = C.GetBy.class("sidemenu__nav")[0];
  static _info = C.GetBy.class("sidemenu__search")[0];
  static _search = C.GetBy.class("sidemenu__info")[0];
  static height;
  static mask = 0;

  static init() {
    super.init();
    this.height = this.container.offsetHeight;
    this.directHide();
  }

  static show__effect(__d = 0) {
    gsap.killTweensOf(this._bg);
    this.container.setAttribute("aria-expanded", "true");

    gsap.set(this._bg, {alpha:1});
    gsap.to(this._bg, {
      y:0,
      duration:.6,
      ease: C.Ease.EASE_CUCHILLO_IN_OUT,
      force3D:true,
      onComplete:()=>{this.afterShow();},
    });

    gsap.to([this._logo, this._nav, this._info, this._search], {
      y:0,
      alpha:1,
      duration:.2,
      delay:.2,
      ease: Power2.easeIn,
      force3D:true
    });
  }

  static afterShow() {
    super.afterShow();
  }

  static directHide() {
    if(!Basics.isReducedMotion) {
      gsap.set(this._bg, {y:-this.height});
      gsap.set([this._logo, this._nav, this._info, this._search], {alpha:0, y:0});
    }

    super.directHide();
  }

  static hide__effect(__d = 0) {
    gsap.killTweensOf(this._bg);
    gsap.to(this._bg, {
      y:-this.height,
      duration:.8,
      ease:Expo.easeInOut,
      force3D:true,
      onComplete:()=>{gsap.set(this._bg, {alpha:0});this.afterHide();},
    });

    gsap.to([this._logo, this._nav, this._info, this._search], {
      alpha:0,
      y:0,
      duration:.2,
      ease: Power2.easeIn,
      force3D:true
    });
  }

  static afterHide() {
    super.afterHide();
  }

  static loop() {
    if(this.isOpen) {
      super.loop();
    }
  }
  static resize() {
    this.height = this.container.offsetHeight;
    if(!this.isOpen) {
      gsap.set(this._bg, {y:-this.height});
    }
    super.resize();
  }
}


