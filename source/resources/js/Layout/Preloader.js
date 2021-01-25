class Preloader extends _Preloader {
    static enabled = true;
    static _isPossible = false;
    static _isLoaded = false;
    static _callbackStart;
    static _btnStartDOM = C.GetBy.class("__start", this.container)[0];
    static _instructionsDOM = C.GetBy.class("__instructions", this.container)[0];
    static _btnStart = new ButtonStroke(this._btnStartDOM, ()=>{this.hide(this._callbackStart)});
    static _instructions = new Instructions(this._instructionsDOM, this.container);

    static init() {
      this._logo = C.GetBy.class("__logo", this.container)[0];
    }
    static beforeShow() {}
    static show__effect() {
      if(!Basics.isDebug) {
        ///Loading.start();
        this._isPossible = true;
        this._instructions.show();

        setTimeout(()=> {this.afterShow();},500);
      } else {
        this.hide__effect();
      }
    }

    static showButtonStart(__call) {
      this._btnStartDOM.classList.add("__show");
      this._callbackStart = __call;
    }

    static afterShow() {
      super.afterShow();
    }

    static beforeHide() {}
    static hide__effect() {
      if(!Basics.isDebug) {
        gsap.to(this._btnStart,{alpha:0, duration:.2});
        gsap.to(this._instructionsDOM,{alpha:0, duration:.3});
        gsap.to(this.container,{y:-Metrics.HEIGHT, duration:.8, delay:.2, ease:Expo.easeInOut, onComplete:this.afterHide.bind(this)});
      } else {
        this.afterHide();
      }
    }

    static afterHide() {
      this.enabled = false;
      this._isPossible = false;
      this._isLoaded = false;
      super.afterHide();
    }

    static progress__effect() {

    }
}

