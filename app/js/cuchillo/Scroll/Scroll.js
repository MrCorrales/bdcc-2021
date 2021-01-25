const Scroll = {
  AXIS_X: "X",
  AXIS_Y: "Y",
  engine: null,
  y: -window.pageYOffset,
  x: -window.pageXOffset,
  slowPosition:0,
  axis: null,
  isScrolling: false,
  direction: 0,
  anchor:"",
  _anchors:[],
  _oldScroll: null,
  _wheel: null,
  speed:0,
  offsetAnchor:0,
  _classItems:[],

  init: function(__axis, options = {}) {
    this.axis = __axis;
    this._anchors = [];

    options = {
      container: options.container || document.body,
      element: options.element || window,
      axis: __axis || "Y",
      smooth: options.smooth || false,
      easing: options.easing || 0.08,
      maxSpeed: options.maxSpeed || 400,
      multiplicator: options.multiplicator || 1,
      itemClass: options.itemClass,
      infinity: options.infinity || false,
      wheel: options.wheel,
      hasSlowly: options.hasSlowly || false,
    };

    if(options.smooth) {
      if(!options.infinity) {
        this.engine = new VScroll(options);
      } else {
        if(this.axis === "Y") {
          this.engine = new VScrollInfinity(document.body. options);
        } else {
          this.engine = new VScrollHInfinity(document.body, options);
        }
      }
    } else {
      this.engine = new MrScroll(options)
    }

    if(history.state) {
      Scroll.directGoto(history.state.scrollY);
    }
  },

  //CLASSITEMS
  _addClass: function(__id, __class) {
    Scroll._classItems.push({id:__id, class:__class})
  },
  _getClass(__item) {
    let idClass = __item.getAttribute("data-class") || "default";

    for (let i = 0, j = Scroll._classItems.length; i < j; i++) {
      if (idClass === Scroll._classItems[i].id) {
        return Scroll._classItems[i].class;
      }
    }

    return VScroll_Item;
  },

  replace: function(__axis, options = {}) {
    if(this.engine.enabled) {
      this.engine.enabled = false;
    }

    Scroll.x = -window.pageXOffset;
    Scroll.y = -window.pageYOffset;

    _oldScroll = {
      engine: this.engine,
      y: this.y,
      x: this.x,
      axis: this.axis,
      direction: this.direction,
    };

    this.init(__axis, options);
  },

  show() {
    this.engine.show();
  },

  start() {
    if(!this.engine.enabled) this.engine.enabled = true;
  },

  stop() {
    if(this.engine.enabled) this.engine.enabled = false;
  },

  setEnabled: function (__bol) {
    if(this.engine.enabled !== __bol) this.engine.enabled = __bol;
  },

  setSlidesMode(__bol) {
    if(__bol) {
      this.engine.enabledWheel = false;

      this._wheel = new WheelControls({
        onForward:()=>{
          this.gotoAvPag();
        },
        onBackward:()=>{
          this.gotoRePag();
        },
      });

    } else {
      this.engine.enabledWheel = this.engine.options.wheel;
      this._wheel.dispose();
    }
  },

  setScrollbar: function (scrollbar) {
    this.engine.setScrollbar(scrollbar);
  },

  loop: function() {
    if(this.engine) {
      this.engine.loop();
    }
  },

  resize: function () {
    if (this.engine) {
      this.engine.resize();
    }
  },

  setWheel0: function(__n) {
    this.engine.pWheel0 = __n;
  },

  gotoDOMElement: function(__element) {
    Scroll.goto(this.axis === "Y"? __element.offsetTop - Scroll.offsetAnchor : __element.offsetLeft - Scroll.offsetAnchor );
  },

  gotoAnchor: function(__id) {
    let anchor = C.GetBy.id(__id);
    const offset = anchor.getAttribute("data-offscreen-anchor")!=undefined? Number(anchor.getAttribute("data-offscreen-anchor")) : Scroll.offsetAnchor;

    Scroll.goto(this.axis === "Y"? anchor.offsetTop - offset  : anchor.offsetLeft - offset );
  },

  gotoNextAnchor: function() {
    Scroll.gotoAnchor(this.getNextAnchor());
  },

  gotoPrevAnchor: function() {
    Scroll.gotoAnchor(Scroll.getPrevAnchor());
  },

  gotoAvPag(__isDirect) {
    this.engine.gotoAvPag();
  },

  gotoRePag(__isDirect) {
    this.engine.gotoRePag(__isDirect);
  },

  gotoHome(__isDirect) {
    this.engine.gotoHome(__isDirect);
  },

  gotoEnd(__isDirect) {
    this.engine.gotoEnd(__isDirect);
  },

  goto(__n) {
    this.engine.goto(__n)
  },

  gotoPercentage() {
    this.engine.gotoPercentage(__n)
  },

  directGoto(__n) {
    this.engine.directGoto(__n)
  },

  move(__n) {
    if(this.engine.enabled) this.engine.move(__n)
  },

  add(__item) {
    if(this.engine) this.engine.add(__item);
  },

  addAll() {
    if(this.engine) this.engine.addAll();
  },

  addBullet(__id) {
    this._anchors.push(__id);
    this.engine.addBullet(C.GetBy.id(__id));
  },

  getNextAnchor() {
    for (let i = 0; i < this._anchors.length; i++) {
      if(this._anchors[i] === this.anchor && i+1< this._anchors.length) {
        return this._anchors[i+1];
      }
    }

    return this.anchor;
  },

  getPrevAnchor() {
    for (let i = this._anchors.length-1; i > -1; i--) {
      if(this._anchors[i] === this.anchor && i-1> -1) {
        return this._anchors[i-1];
      }
    }

    return this.anchor;
  },

  hide() {
    if(this.engine) this.engine.hide();
  },

  dispose() {
    Scroll.engine.dispose();
    Scroll.engine = null;
    Scroll.y = -window.pageYOffset;
    Scroll.x = -window.pageXOffset;
    Scroll.axis = null;
    Scroll.isScrolling = false;
    Scroll.direction = 0;
    Basics.velocidad = 0;
  }
};