class _Preloader {
  static container = C.GetBy.id("Preloader");
  static enabled = true;
  static isShow = false;

  static _progressReal = 0;
  static _progress = 0;
  static _acumulado = 0;
  static _limit = 100;

  static _cb;

  //SETTER && GETTERS

  static get progress() { return this._progressReal; }
  static set progress(__n) {
    this._progressReal = __n*100;
    this._progress = this._acumulado + (this._progressReal * (this._limit/100));
  }

  static init() {}

  //SHOW
  static show(__cb = null) {
    this._acumulado = 0;
    this.progress = 0;
    this.isShow = true;
    this._cb = __cb;
    this.beforeShow();
    this.show__effect();
  }

  static beforeShow() {}

  static show__effect() {
    this.container.style.display = "block";
    this.afterShow();
  }

  static afterShow() {
    if(this._cb) {
      this._cb();
    }
  }

  //HIDE
  static hide(__cb) {
    this._cb = __cb;
    this.beforeHide();
    this.hide__effect();
  }

  static beforeHide() {}

  static hide__effect() {
    this.afterHide();
  }

  static afterHide() {
    this.container.style.display = "none";

    if(this._cb) {
      this._cb();
      this._cb = null;
    }
  }

  //PROGRESS
  static progress__effect() {

  }
}

