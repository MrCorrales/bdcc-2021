class Tools extends Default {

  _dragger;
  _toolsHolderDOM;
  _sliderDOM;
  _widthSlider;
  _idTimerResize;
  _posX;
  _buttons=[];
  _actual = 0;
  _btnNext = C.GetBy.class("__next")[0];
  _btnPrev = C.GetBy.class("__prev")[0];

  get bounds() {
    return {
      top: 0,
      left: Metrics.WIDTH - this._widthSlider,
      width: (this._widthSlider - Metrics.WIDTH) + this._widthSlider,
      height: 0,
    }
  }

//==================================================================================================================
//          CONSTRUCTOR
//==================================================================================================================

  constructor() {
    super();

    if(Basics.isReducedMotion) return;

    this._sliderDOM = C.GetBy.class("__ul", this.container)[0];
    this._toolsHolderDOM = C.GetBy.class("__toolsHolder", this.container)[0];
    this._widthSlider = this._sliderDOM.offsetWidth;

    this.setupSticky();
    this.setupScroll();
    this.setupButtons();
    this.setupTools();

    //CONTROLS
    this._btnNext.addEventListener(Basics.clickEvent,(e)=> {
      e.preventDefault();
      this.selectTool(Math.min(this._buttons.length-1, this._actual+1));
    });

    this._btnPrev.addEventListener(Basics.clickEvent,(e)=> {
      e.preventDefault();
      this.selectTool(Math.max(0, this._actual-1));
    });
  }

  setupSticky() {
    const DOM_CARD = C.GetBy.class("card-tool-category", this.item)[0];

    if(DOM_CARD) {
      const DOM_TOOLS = C.GetBy.class("block-tools__ul", this.item)[0];
      const DOM_HOLDER = C.GetBy.class("__tools", this.item)[0];

      const HEIGHT = Math.min(DOM_CARD.offsetHeight, DOM_TOOLS.offsetHeight);
      const HEIGHT_HEADER = Header.height;

      let top = Metrics.HEIGHT - HEIGHT;
      if (top > HEIGHT_HEADER) {
        top = HEIGHT_HEADER;
      } else {
        top -= 2;
      }

      DOM_HOLDER.style.setProperty('--top-sticky', top + "px");
    }
  }

  setupTools() {
    gsap.set(".__card", {alpha:0});
    gsap.set(this._toolsHolderDOM,{alpha:1,y:0});
  }

  showTools() {
    const TOOLS = C.GetBy.class("__card", this._toolsHolderDOM);

    gsap.to(".__card", {
      alpha:1,
      stagger: { // wrap advanced options in an object
        amount:TOOLS.length * .05,
        each: 0.01,
        from: "start",
        ease: "power2.Out",
      }
    });
  }

  setupScroll() {
    if(Basics.isTouch) return;

    Draggable.zIndex = 0
    Draggable.create(this._sliderDOM, {
      type:"x",
      edgeResistance:0.25,
      bounds: this.bounds,
      inertia:true,
      snap: {
        x: function (endValue) {
          this._posX = endValue;
          return endValue;
        },
      }
    });

    this._dragger = Draggable.get(this._sliderDOM);
  }

  setupButtons() {
    const BTNS = C.GetBy.class("__button", this._sliderDOM);
    this._buttons = [];

    let x = 0;
    for(let i=0; i<BTNS.length; i++) {
      const BTN = BTNS[i];
      this._buttons.push({
        dom:BTN,
        url:BTN.getAttribute("href"),
        x:x,
      });

      if(BTN.classList.contains("__active")) {
        this._actual = i;
      }

      BTN.addEventListener(Basics.clickEvent, (e)=> {
        e.preventDefault();
        this.selectTool(i, false);
      });

      x-=BTN.offsetWidth;
      x = Math.max(x, -this._widthSlider + Metrics.WIDTH )
    }
  }

  selectTool(__n, __hasMove = true) {
    this._buttons[this._actual].dom.classList.remove("__active");
    this._actual = __n;
    this._buttons[this._actual].dom.classList.add("__active");

    if(__hasMove)
      gsap.to(this._sliderDOM, {x:this._buttons[this._actual].x+"px", duration:.6, ease:Power2.easeOut, force3D:true});

    this._toolsHolderDOM.classList.add("--loading");
    gsap.to(this._toolsHolderDOM, {alpha:0, duration:1, ease:Power2.easeIn, force3D:true});

    ControllerPage._loader.cancel();
    ControllerPage._loader.loadPage(this._buttons[this._actual].url, (__data) => {
      const dataPage = ControllerPage._parsePage(__data.page, "__tools");
      C.Empty(this._toolsHolderDOM);

      this._toolsHolderDOM.classList.remove("--loading");
      gsap.killTweensOf(this._toolsHolderDOM);

      this._toolsHolderDOM.appendChild(dataPage.page);
      Analytics.sendUrl(this._buttons[this._actual].url, dataPage.title);
      ControllerPage.pushState({scrollX: 0, scrollY: 0, section: "tool"}, null, this._buttons[this._actual].url);
      document.title = dataPage.title;

      Cursor.reset();

      Scroll.resize();
      this.setupTools();
      this.setupSticky();
      this.showTools();
    })
  }


//==================================================================================================================
//          PUBLIC
//==================================================================================================================

  //SHOW
  beforeShow() {
   super.beforeShow();
  }

  show__effect() {
    super.show__effect();
    this.showTools();
  }

  afterShow() {
    super.afterShow();
  }

  beforeHide() {}

  afterHide() {
    if(this._dragger) {
      this._dragger.kill();
      this._dragger = null;
    }
    super.afterHide();
  }

  //RESIZE
  resize() {
    if(!Basics.isReducedMotion && !Basics.isTouch) {
      this._widthSlider = this._sliderDOM.offsetWidth;
      clearTimeout(this._idTimerResize);
      this._idTimerResize = setTimeout(() => {
        this._sliderDOM.removeAttribute("style");
        gsap.set(this._sliderDOM, {x: "0px", force3D: true});

        this._dragger.kill();
        this._dragger = null;

        this.setupScroll();
        this.setupButtons();
      }, 100);
    }

    this.setupSticky();
    super.resize();
  }

  dispose() {
    super.dispose();
  }
}