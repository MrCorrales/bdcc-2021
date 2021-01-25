class Win {

  static ON_SHOW = "onshow";
  static ON_SHOW_END = "onshowend";
  static ON_HIDE = "onhide";
  static ON_HIDE_END = "onhideend";

  static STATE_OPEN = "OPEN";
  static STATE_CLOSE = "CLOSE";

  container;
  id;
  width;
  height;
  _state;

//==================================================================================================================
//          GETTER SETTER
//==================================================================================================================

  get isOpen() { return this._state === Win.STATE_OPEN; }

//==================================================================================================================
//          CONSTRUCTOR
//==================================================================================================================

  constructor(__container, __id) {
    this.id = __id;
    this.container = __container;
    this.container.setAttribute("aria-expanded", "false");

    this.resize();

    ControllerWindow.add(this.id, this);
  }

//==================================================================================================================
//          PUBLIC
//==================================================================================================================

  actionButtonToggle(item) {
    if(item.classList.contains("__close")) {
      item.classList.remove("__close");
    } else {
      item.classList.add("__close");
    }

    this.toogleState();
  }

  toogleState() {
    if(!this.isOpen)    this.show();
    else                this.hide();
  }

  //SHOW
  show(__d = 0) {
    this.container.setAttribute("aria-expanded", "true");
    this._state = _Sidemenu.STATE_OPEN;
    this.show__effect();
  }

  show__effect(__d = 0) {
    /*this.container.style.display = "block";
    this.afterShow();*/
  }

  afterShow() {
    Accessibility.trap(this.container);
    Keyboard.add("Escape", this.id + "_ESC", () => { this.hide(); });
  }

  //HIDE
  hide(__d = 0) {
    this.hide__effect();
  }

  hide__effect(__d = 0) {
    /*this.container.style.display = "none";
    this.afterHide();*/
  }

  afterHide() {
    this._state = _Sidemenu.STATE_CLOSE;
    Accessibility.removeTrap();
    Keyboard.remove("Escape", this.id + "_ESC");
    this.container.setAttribute("aria-expanded", "false");
  }

  directHide() {
    this._state = _Sidemenu.STATE_CLOSE;
    this.afterHide();
  }

  loop() {}
  resize() {
    this.width = this.container.offsetWidth;
    this.height = this.container.offsetHeight;
  }
}


