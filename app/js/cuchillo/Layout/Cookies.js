class _Cookies {
  static STATE_OPEN = "OPEN";
  static STATE_CLOSE = "CLOSE";
  static container = C.GetBy.id("Cookies");
  static _state = "CLOSE";

//==================================================================================================================
//          GETTER SETTER
//==================================================================================================================

  static get isOpen() { return this._state === Cookies.STATE_OPEN; }

//==================================================================================================================
//          CONSTRUCTOR
//==================================================================================================================

  static init() {
    if(Basics.hasCookies) {
      if (document.cookie.indexOf(Basics.id + "_cookie_policy") < 0) {
        this.setup();
        this.show();
      } else {
        this.enable();
        this.dispose();
      }
    } else {
      this.dispose();
    }
  }

  static setup() {
    Accessibility.trap(this.container);
    Keyboard.add("Escape", "CookiesESC", () => { Cookies.hide(); });
  }

  static actionButtonOK(item) {
    var now = new Date();
    var time = now.getTime();
    var expireTime = time + 999999999999;
    now.setTime(expireTime);
    document.cookie = Basics.id + "_cookie_policy=accepted; expires="+now.toUTCString() +"; path=/";
    Cookies.enable();
    Cookies.hide();
  }

  static actionButtonNOK(item) {
    Cookies.hide();
  }

  //SHOW
  static show(__d = 0) {
    this._state = Cookies.STATE_OPEN;
    this.show__effect();
  }

  static show__effect(__d = 0) {
    this.container.style.opacity = 1;
  }

  //HIDE
  static hide(__d = 0) {
    this._state = Cookies.STATE_CLOSE;
    this.hide__effect();
  }

  static hide__effect(__d = 0) {
    this.container.style.display = "none";
    this.dispose();

    if(document.body.classList.contains("__accessible")) {
      C.GetBy.tag("a", C.GetBy.id("Gotomain"))[0].focus();
    }
  }

  static enable() {
    Analytics.init();
    Basics.cookiesAccepted = true;
  }

  static dispose() {
    Accessibility.removeTrap();
    Keyboard.remove("Escape", "CookiesESC");

    this.container.parentNode.removeChild(this.container);
  }
}