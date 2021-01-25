class Cookies extends _Cookies {
    static init() {
        super.init();
        gsap.set(this.container,{y:this.container.offsetHeight * 2, alpha:1});
    }

    static show__effect(__d = 0) {
        gsap.to(this.container,{y:0,duration:.8, ease:Power3.easeOut, delay:0});
    }

    static hide__effect(__d = 0) {
        gsap.to(this.container,{y:this.container.offsetHeight * 2, duration:.4, ease:Power3.easeOut, onComplete:()=>{this.dispose();}});
    }

    static dispose() {
        super.dispose();
    }
}


