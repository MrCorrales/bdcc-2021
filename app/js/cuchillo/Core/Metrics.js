const Sizes = {
  RATIO: window.devicePixelRatio,
  RATIO_CANVAS: window.devicePixelRatio,
  SMARTPHONE: 480,
  TABLET_PORTRAIT:  768,
  TABLET_LANDSCAPE:  1024,
  DESKTOP:  1174,
  LARGE_SCREEN:  1400,
};

var Metrics = {
  set WIDTH(n) { this._WIDTH = n; },
  get WIDTH() { return this._WIDTH; },
  set HEIGHT(n) { this._HEIGHT = n; },
  get HEIGHT() { return this._HEIGHT; },
  _WIDTH: window.innerWidth,
  _HEIGHT: window.innerHeight,
  CENTER_X: 0,
  CENTER_Y: 0,
  WIDTH_INSIDE: 0,
  HEIGHT_INSIDE: 0,
  SCROLL_WIDTH: 0,
  HEIGHT_SCROLL: 0,
  FONT_SIZE: 16,

  isSmartphone: function() {
    return Basics.isMobile && window.innerWidth <= Sizes.SMARTPHONE;
  },

  update: function(__first = false){
    this.WIDTH = window.innerWidth;
    this.HEIGHT = window.innerHeight;

    const VH = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${VH}px`);

    Basics.isPortrait = this.HEIGHT > this.WIDTH;

    if(__first) {
      this.WIDTH_INSIDE = this.WIDTH;
      this.SCROLL_WIDTH = this.WIDTH_INSIDE - this.WIDTH;

      window.addEventListener("resize", () => {
        clearTimeout(this._idTimer);
        this._idTimer = setTimeout(()=> {
          Metrics.update();
        },100);
      });

      if(Basics.isMobile) {
        window.addEventListener(Basics.isMobile ? "orientationchange" : "resize", () => {
          clearTimeout(this._idTimer);
          this._idTimer = setTimeout(() => {
            Metrics.update();
          }, 100);
        });
      }

    } else {
      this.WIDTH_INSIDE = this.WIDTH - this.SCROLL_WIDTH;
    }

    this.CENTER_X = this.WIDTH_INSIDE/2;
    this.CENTER_Y = this.HEIGHT/2;

    if (!__first) {
      this.fitHeight();
      this.fitContain();
      this.fitCover();
      Main.resize();
    }


    const limit = 1400 * 900;
    const pixels =  Metrics.WIDTH * Metrics.HEIGHT;
    //Sizes.RATIO_CANVAS = Math.min(window.devicePixelRatio, Math.max(1,Maths.precission((limit * window.devicePixelRatio)/pixels,1)));
    this.FONT_SIZE = parseFloat(getComputedStyle(document.documentElement).fontSize);
  },

  fitHeight: function() {
    let items = C.GetBy.selector("[fit-height]");
    for(let i=0, j=items.length; i<j; i++) {
      let item = items[i];
      item.style.height = Metrics.HEIGHT + "px";
    }
  },

  fitCover: function() {
    let items = C.GetBy.selector("[fit-cover]");
    for(let i=0, j=items.length; i<j; i++) {
      let item = items[i];

      Functions.fitCover(
        item,
        Number(item.getAttribute("width")) || Number(item.getAttribute("data-width")),
        Number(item.getAttribute("height")) || Number(item.getAttribute("data-height")),
        item.parentNode.offsetWidth,
        item.parentNode.offsetHeight,
        Number(item.getAttribute("data-fit-offset")) || 0
      );
    }
  },

  fitContain: function() {
    let items = C.GetBy.selector("[fit-contain]");
    for(let i=0, j=items.length; i<j; i++) {
      let item = items[i];
      let w = Number(item.getAttribute("width")) || Number(item.getAttribute("data-width"));
      let h = Number(item.getAttribute("height")) || Number(item.getAttribute("data-height"));
      let parentW =  item.parentNode.offsetWidth;
      let parentH =  item.parentNode.offsetHeight;
      let padding = Number(item.getAttribute("data-fit-offset")) || 0;

      Functions.fitInside(
        item,
        parentW - padding,
        parentH - padding,
        w,
        h,
        parentW,
        parentH,
        item.getAttribute("data-align") || "C",
        item.getAttribute("data-valign") || "C"
      );
    }
  },

  parseSize(__s, __target = null) {
    if(!__s) return null;

    const size = parseFloat(__s);
    let mult = 1;

    if(!isNaN(__s)) {
      mult = 1;
    } else if(__s.indexOf("rem") > -1) {
      mult = this.FONT_SIZE;
    } else if(__s.indexOf("vw") > -1) {
      mult = Metrics.WIDTH;
    } else if(__s.indexOf("vh") > -1) {
      mult = Metrics.HEIGHT;
    } else if(__s.indexOf("px") > -1) {
      mult = 1;
    } else if(__s.indexOf("x") > -1) {
      mult = __target? __target.offsetWidth : 1;
    } else if(__s.indexOf("y") > -1) {
      mult = __target? __target.offsetHeight : 1;
    }

    return size * mult;
  }
};