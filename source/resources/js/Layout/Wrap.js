class Wrap extends _Wrap {

  static footer = C.GetBy.id("Footer");
  static prefooter = C.GetBy.class("prefooter")[0];

  static show(__call, __isDirect) {
    if(__isDirect) {
      gsap.set([this.mainholder, this.footer, this.prefooter], {alpha: 1});
      if(__call) __call();
    } else {
      gsap.to([this.mainholder, this.footer, this.prefooter], {
        alpha: 1,
        duration:.4,
        ease:Power2.easeOut,
        onComplete:() => {
          if(__call) __call();
        }
      });
    }
  }

  static hide(__call) {
    gsap.to([this.mainholder, this.footer, this.prefooter], {
      alpha: 0,
      duration:.3,
      ease:Power2.easeIn,
      onComplete:() => {
        if(__call) {
          setTimeout(()=>{ __call();},100);
        }
      }
    });
  }

  static directShow() {
    gsap.set([this.mainholder, this.footer, this.prefooter], {alpha: 1});
  }

  static directHide() {
    gsap.set([this.mainholder, this.footer, this.prefooter], {alpha: 0});
  }
}


