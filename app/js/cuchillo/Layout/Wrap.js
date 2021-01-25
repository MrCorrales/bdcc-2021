class _Wrap {
  static mainholder = C.GetBy.id("Main");
  static init() {}
  static show(__call) {
    gsap.to(this.mainholder, {
      alpha: 1,
      duration:.4,
      ease:Power3.easeOut,
      onComplete:() => {
        if(__call) __call();
      }
    });
  }

  static hide(__call) {
    gsap.to(this.mainholder, {
        alpha: 0,
        duration:.8,
        ease:Power4.easeIn,
        onComplete:() => {
          if(__call) __call();
        }
    });
  }

  static directShow() {
    gsap.set(this.mainholder, {alpha: 1});
  }

  static directHide() {
    gsap.set(this.mainholder, {alpha: 0});
  }
}


