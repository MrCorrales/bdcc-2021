class Page {
  _disposes = [];
  _resizes = [];
  _loops = [];

  _nDisposes;
  _nResizes;
  _nLoops;

  _isHide = false;
  _isActive = false;
  _maskNegative;

  wrap;
  container;
  isFirstTime = false;

//==================================================================================================================
//          CONSTRUCTOR
//==================================================================================================================

  constructor() {
    this.wrap = C.GetBy.class("wrap")[0];
    this.container = C.GetBy.class("__page")[0];
    this.container.classList.remove("__page");
  }


//==================================================================================================================
//          PUBLIC
//==================================================================================================================

  _load(__firstTime = false) {
    this.isFirstTime = __firstTime;
    if(!__firstTime && LoaderController._loaders.MediaLoader) {
      LoaderController.onComplete = () => { this._contentLoaded(); };
      LoaderController._loaders.MediaLoader.getMedia();
      LoaderController.init(false);
    } else {
      this._contentLoaded();
    }
  }

  _contentLoaded() {
    if(LoaderController._loaders.PagesLoader) LoaderController._loaders.PagesLoader.initBackground();
    if(LoaderController._loaders.MediaLoader) LoaderController._loaders.MediaLoader.initBackground();
    if(LoaderController._loaders.LazyLoader) LoaderController._loaders.LazyLoader.initBackground();
    this._activate();
  }

  _activate() {
    C.Selector.forEach(".__language", function(element, i) {
      element.setAttribute("href", C.GetBy.id("__langURL").getAttribute("value"));
    });

    Metrics.update();
    ControllerPage.disposeOut();

    this.beforeShow();
    /*if(Preloader) {
      if (Preloader.enabled) {
        Preloader.hide(() => {
          this._show();
        });
      } else {
        this._show();
      }
    } else {
      this._show();
    }*/
    this._show();
  }

  _show() {
    let tClass = this;

    if (typeof Cursor !== 'undefined') {
      Cursor.start();
    }

    if (typeof Loading !== 'undefined') {
      Loading.stop();
    }

    requestAnimationFrame(function() {
      tClass.show__effect();
    }.bind(this));
  }

  _hide(__isBack) {
    this._isHide = true;
    this.wrap.classList.add("wrap-out");
    this.wrap.classList.remove("wrap");

    if (typeof Cursor !== 'undefined') {
      Cursor.hide();
    }

    this.beforeHide();
    this.beforeHide__effect(()=> {
      /*if(Preloader) {
        if (Preloader.enabled) {
          Preloader.show(() => {
            this.hide__effect(__isBack);
          });
        } else {
          this.hide__effect(__isBack);
        }
      } else {
        this.hide__effect(__isBack);
      }*/
      this.hide__effect(__isBack);
    });
  }


  _dispose() {
    for(var i = 0,j=this._nDisposes; i<j; i++) {
      this._disposes[i]();
    }

    this._disposes = [];
    this._resizes = [];
    this._loops = [];
  }


  //SHOW
  beforeShow() {}
  show__effect() {
    TweenLite.set(this.container, {alpha: 1});
    this.afterShow();
  }

  afterShow() {
    this._isActive = true;
  }


  //HIDE
  beforeHide() {}
  beforeHide__effect(__call) {
    __call();
  }

  hide__effect(__isBack) {
    TweenLite.set(this.container, {alpha: 0});
    this.afterHide();
  }

  afterHide() {
    TweenLite.killTweensOf(this.container);
    this._isHide = true;
    this.wrap.parentNode.removeChild(this.wrap);

    LoaderController.reset();

    if (typeof Loading !== 'undefined') {
      Loading.start();
    }

    ControllerPage._loadPage();
  }

  //LOOP
  addLoop(call) {
    this._nLoops = this._loops.push(call);
  }

  loop() {
    if(!this._isHide) {
      for (var i = 0; i < this._nLoops; i++) {
        this._loops[i]();
      }
    }
  }

  //RESIZE
  addResize(call) {
    this._nResizes = this._resizes.push(call);
  }
  resize() {
    if(!this._isHide) {
      for (var i = 0; i < this._nResizes; i++) {
        this._resizes[i]();
      }
    }
  }

  addDispose(call) {
    this._nDisposes = this._disposes.push(call);
  }
}