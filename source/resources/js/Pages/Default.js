class Default extends Page {

//==================================================================================================================
//          CONSTRUCTOR
//==================================================================================================================

  constructor() {
    super();

    const BG = this.container.getAttribute("data-bg") || "--white";

    if(BG) {
      document.body.style.setProperty('--bg-main', "var(" + BG + ")");
    }

    Acordions.reset();
    Videos.init();

    C.GetBy.selector()


    const players = Array.from(document.querySelectorAll('[data-plyr]')).map(p => new Plyr(p));

    const FORM_DOM = C.GetBy.tag("form");
    C.ForEach(FORM_DOM, (e) => {
      if(!e.classList.contains("sidemenu__form") && !e.classList.contains("__parsed")) {
        new FormValidator(e);
      }
    })
  }

//==================================================================================================================
//          PUBLIC
//==================================================================================================================

  _load() {
    this._contentLoaded();
  }
  _contentLoaded() {
    this._activate();
  }

  _activate() {
    C.Selector.forEach(".__language", function(element, i) {
      element.setAttribute("href", C.GetBy.id("__langURL").getAttribute("value"));
    });

    Metrics.update();
    ControllerPage.disposeOut();

    if(C.GetBy.class("goto-main")[0]) {
      C.GetBy.class("goto-main")[0].focus();
    }

    this.beforeShow();
    this._show();
  }

  beforeShow() {
    Scroll.init(Scroll.AXIS_Y, {smooth:false, multiplicator:1});
    // Scroll.directGoto()
    Scroll.addAll();
    Scroll.resize();
    Scroll.start();
  }

  show__effect(__call, __isDirect = false) {
    if(Basics.isDebug) {
      //setTimeout(()=>{Scroll.resize();Scroll.start();Scroll.show();},100);

      Scroll.directGoto(history.state.scrollY);
      Scroll.show();
    } else {
      //Preloader.showButtonStart(() => {
        Scroll.resize();
        Scroll.start();
        Scroll.show();
      //});
    }

    Wrap.show(__call, __isDirect);
    this.afterShow();
  }

  beforeHide() {}

  hide__effect(__isBack) {
   /* if(Sidemenu.isOpen) {
      Sidemenu.isPageChange = true;
      Sidemenu.hide();

      EventDispatcher.addEventListener(Sidemenu.ON_HIDE_END, ()=> {
        EventDispatcher.removeEventListener(Sidemenu.ON_HIDE_END,"PageHideSidemenu")
        this.afterHide();
      }, "PageHideSidemenu");

    } else { */


      if(Sidemenu.isOpen) {
        Sidemenu.isPageChange = true;
        Sidemenu.hide();
      }
      if(__isBack) {
        Wrap.directHide();
        this.afterHide();
      } else {
        Wrap.hide(() => {this.afterHide();});
      }
    //}
  }

  afterHide() {
    Scroll.hide();
    Scroll.dispose();
    super.afterHide();
  }

  resize() {
    super.resize();

    //STICKY

    const STICKY = C.GetBy.selector("[data-sticky]", this.container);
    C.ForEach(STICKY, (item)=> {
      if(item.offsetHeight > Metrics.HEIGHT) {
        item.style.setProperty('--position', `relative`);
      } else {
        item.style.setProperty('--position', `sticky`);
      }
    })
  }
}