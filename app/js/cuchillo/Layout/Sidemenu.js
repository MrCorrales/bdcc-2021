class _Sidemenu {

  static ON_SHOW = "onshow";
  static ON_SHOW_END = "onshowend";
  static ON_HIDE = "onhide";
  static ON_HIDE_END = "onhideend";

  static STATE_OPEN = "OPEN";
  static STATE_CLOSE = "CLOSE";

  static isPageChange = false;

  static container = C.GetBy.id("Sidemenu");
  static _state = "CLOSE";

//==================================================================================================================
//          GETTER SETTER
//==================================================================================================================

  static get isOpen() { return this._state === _Sidemenu.STATE_OPEN; }
  static get state() { return this._state };
  static set state(__state) {
    if(this._state === __state) return;

    this._state = __state;
    this.updateToggleButtons();

    if(this.isOpen) {
      Keyboard.add("Escape", "SidemenuESC", () => { this.hide(); });
      Accessibility.trap(this.container);
      EventDispatcher.dispatchEvent(_Sidemenu.ON_SHOW);
    } else {
      Keyboard.remove("Escape", "SidemenuESC");
      Accessibility.removeTrap();
      EventDispatcher.dispatchEvent(_Sidemenu.ON_HIDE);
    }
  }

//==================================================================================================================
//          CONSTRUCTOR
//==================================================================================================================

  static init() {
    this.container.setAttribute("aria-expanded", "false");
  }

//==================================================================================================================
//          PUBLIC
//==================================================================================================================

  static toogleState() {
    if(!this.isOpen)    this.show();
    else                this.hide();
  }

  //SHOW
  static show(__d = 0) {
    this.state = _Sidemenu.STATE_OPEN;

    if(Basics.isReducedMotion) {
      this.afterShow();
    } else {
      this.show__effect();
    }
  }

  static show__effect(__d = 0) {}

  static afterShow() {
    this.container.setAttribute("aria-expanded", "true");
    EventDispatcher.dispatchEvent(_Sidemenu.ON_SHOW_END);
  }

  //HIDE
  static hide(__d = 0) {
    this.state = _Sidemenu.STATE_CLOSE;

    if(Basics.isReducedMotion) {
      this.directHide();
    } else {
      this.hide__effect();
    }
  }

  static hide__effect(__d = 0) {}

  static afterHide() {
    this.isPageChange = false;
    this.container.setAttribute("aria-expanded", "false");
    EventDispatcher.dispatchEvent(_Sidemenu.ON_HIDE_END);
  }

  static directHide() {
    this.state = _Sidemenu.STATE_CLOSE;
    this.afterHide();
  }

  static updateToggleButtons() {
    const btns = C.GetBy.selector("[data-toggle-sidemenu]");

    for(let i=0;i<btns.length;i++) {
      if(this.isOpen) {
        btns[i].classList.add("__close");
      }
      else {
        btns[i].classList.remove("__close");
      }
    }
  }

  static loop() {}
  static resize() {}
}


