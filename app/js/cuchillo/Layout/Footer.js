class _Footer {

    static container = C.GetBy.id("Footer");
    static y = 0;
    static yOffset = 100;
    static height;
    static isShow = true;

    static init() {
        this.height = this.container.offsetHeight + this.yOffset;
    }

    static directShow() {
        this.isShow = true;
        TweenLite.set(this.container,{y:0, force3D:true});
    }

    static show() {
        if(!this.isShow) {
          this.isShow = true;
          this.show__effect();
        }
    }

    static show__effect() {
        TweenLite.to(this.container, 0.4, {y: 0, force3D: true});
    }

    static directHide() {
        this.isShow = false;
        TweenLite.to(this.container, 1, {y: this.height, ease: Basics.EASE_CUCHILLO_IN_OUT, force3D: true});
    }

    static hide() {
        if(this.isShow) {
            this.isShow = false;
            this.hide__effect();
        }
    }

    static hide__effect() {
        this.container.style.opacity = "0";
    }

    static resize() {}
    static loop() {}
}

