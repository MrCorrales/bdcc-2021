class MrScroll  {
  y0 = 0;
  y1 = 0;
  nItems = 0;

  _element = null;
  _container = null;
  _enabled = null;
  _items = [];
  _oldY = 0;

  isNative = false;

  get enabled() { return this._enabled; }
  set enabled(__bol) {

    if(this._enabled !== __bol) {
      if(!__bol) {
        if (!this._container.classList.contains("__noScroll")) {
          this._container.classList.add("__noScroll");
          Scroll.y = Scroll.y - 1;
          window.scroll(0, -Scroll.y);
        }
      } else {
          this._container.classList.remove("__noScroll");
      }
    }

    this._enabled = __bol;
  }

  constructor(__options = {}) {
    this._container = __options.container;
    this._element = __options.element;
    this._enabled = true;
    this._oldY = window.pageYOffset;
    this._container.classList.add("__scroll-manual");
    this._element.addEventListener('scroll', this.scroll, {passive: true});
  }

  scroll() {
    Scroll.isScrolling = true;
    Scroll.direction =  Scroll.y > -window.pageYOffset? 1 : -1;
    Scroll.y = -window.pageYOffset;
  }

  show() {
    this.loop(true);
  }

  goto(__n, __t = 3, __e = Expo.easeOut) {
    this.mainVel = 0;
    this.vel = 0;
    TweenLite.to(this._element,__t,{scrollTo:__n, ease:__e, onUpdate:()=>this.scroll()});
  }

  directGoto(__n) {
    this.mainVel = 0;
    this.vel = 0;
    TweenLite.set(this._element,{scrollTo:__n});
    this.scroll()
  }

  add(__item) {
    //let item = new MrScroll_Item(__item, this.nItems, this);
    this.nItems = this._items.push(__item);

    this.resetPositions();
  }

  addAll(__selector = '__scrollItem') {
    let _items = this._container.querySelectorAll("." + __selector);

    for (let i = 0, j = _items.length; i<j; i++) {
      let _item = new VScroll_Item(_items[i], this.nItems, this);
      this.nItems = this._items.push(_item);
    }

    //this.resetPositions();
  }

  resetPositions() {
    this.y1 = this.y0;
    for(let i=0; i<this.nItems; i++) {
      this._items[i].setPositions(0, Scroll.y);
      this.y1 += this._items[i].height;
    }
  }

  loop(__force) {
    if(Scroll.isScrolling || __force) {
      for (let i = 0; i < this.nItems; i++) {
        this._items[i].y = Scroll.y;
      }
      this._oldY = Scroll.y;
    }

    Scroll.isScrolling = false;
  }

  hide() {
    this._container.classList.remove("__scroll-manual");
    this._container.classList.remove("__noScroll");
  }

  resize() {
    this.y1 = this.y0;

    for (let i = 0; i < this.nItems; i++) {
      this._items[i].resize(this._container.offsetWidth, this._container.offsetHeight);
      this.y1 += this._items[i].height;
    }

    this.y1 = Math.floor(Metrics.HEIGHT - this.y1);
  }

  dispose() {
    this._element.removeEventListener('scroll', this.scroll);
    this.y0 = null;
    this.y1 = null;
    this.nItems = null;
    this._element = null;
    this._container = null;
    this._enabled = null;
    this._items = [];
    this._oldY = null;
  }
}