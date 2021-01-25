class VScroll_Item {
  item;
  id;
  index;
  top;
  left;
  width;
  height;
  progress = 0;
  opts = {
    speed: {
      y:1,
      x:1,
      z:1
    },
    offset:0,
    offsetShow:0,
    positionStop:null,
    positionResume:null,
  };

  _item; //OLD

  //
  onShow = null;
  onVisible = null;
  onHide = null;
  onMove = null; //position{x,y,z} size{width,height}

  isShow = false;
  isVisible = false;
  firstShow = true;
  firstVisible = true;

  _x = 0;
  _y = 0;
  _z = 0;
  _p0 = 0;
  _p1 = 0;

  _needUpdate = true;

  _nInsiders = 0;
  _insiders = [];
  _nVideos = 0;
  _videos = [];

  _axis = "y";
  _measure = "height";
  _domAxis = "top";
  _offsetAxis = "offsetTop";
  _offsetSize = "offsetHeight";

  /* GETTER SETTER */

  get isInViewport() {return this.positionAxis >= this._p0 && this.positionAxis < this._p1;}
  get isInViewportOffset() { return this.positionAxis + this.opts.offsetShow >= this._p0 && this.positionAxis + this.opts.offsetShow < this._p1; }
  get progressItem() { return Maths.precission(Maths.normalize(this._p0,this._p1,this.positionAxis),3); }
  get progressZero() { return Maths.precission(Maths.normalize(this._p0+this._scroller[this._scroller._measure],this._p1-this._scroller[this._scroller._measure],this.positionAxis),3); }

  get realX() { return this.left + this._x; }
  get realY() { return this.top + this._y; }

  get positionAxis() { return this[this._axis]; }
  set positionAxis(__n) {
    this[this._axis] = __n;
    this.update();
  }

  get x() { return this._x;  }
  set x(__n) {
    this._x = Maths.precission(__n, 2) * this.opts.speed.x;
    this.update();
  }

  get y() { return this._y;  }
  set y(__n) {
    this._y =  Maths.precission(__n,2) * this.opts.speed.y;
    this.update();
  }

  get z() { return this._z;  }
  set z(__n) {
    this._z = Maths.precission(__n, 2) * this.opts.speed.z;
    this.update();
  }

  update() {
    this.progress = this.progressItem;

    if(this.isInViewport) {
      if(!this._needUpdate) {
        this.item.style.visibility = "visible";
        this._needUpdate = true;
      }

      this.draw();
      this.setInsideY();
      this.visible();
      this.show();

    } else if(this._needUpdate) {
      this._needUpdate = false;
      this.item.style.visibility = Basics.isTouch? "visible" : "hidden";
      this.draw();
      this.setInsideY();
      this.hide();
    }
  }

  draw() {
    let y = this._y;
    let x = this._x;
    let z = this._z;

    if (this.opts.positionStop != null) {
      switch (this._axis) {
        case "y":
          y = Math.min(this.y + this.opts.positionResume, Math.max(this.y, this.opts.positionStop));
          break;

        case "x":
          x = Math.min(this.x + this.opts.positionResume, Math.max(this.x, this.opts.positionStop));
          break;

        case "z":
          z = Math.min(this.z + this.opts.positionResume, Math.max(this.z, this.opts.positionStop));
          break;
      }
    }

    if(!this._scroller.isNative) {
      this.item.style[CSS.transform] = CSS.translate3D(x, y, z);
    }

    if(this.onMove) {
      this.onMove({x:this.realX, y:this.realY, z:this.z}, {width:this.width, height:this.height});
    }
  }

  setPositions(__top, __left) {
    this.top = __top;
    this.left = __left;
    this.setInsidePosition();
  }

  setInsideY() {
    if(this._nInsiders > 0) {
      let y = this.realY;

      for(let i = 0; i<this._nInsiders; i++) {
        this._insiders[i].loop({x:this.realX, y:this.realY, z:this.z}, this.progress);
      }
    }
  }
  setInsidePosition() {
    this.setInsideY();
  }

  //
  // CONSTRUCTOR
  //

  constructor(__link, __index, __scroller) {
    this.item = __link;
    this.index = __index;
    this.id = this.getId();

    this._item = __link;
    this._scroller = __scroller;

    this._axis = this._scroller._axis;
    this._domAxis = this._axis === "y"? "top" : "left";
    this._measure = this._axis === "y"? "height" : "width";

    const TRANSLATE = CSS.getTranslate(this.item);
    this._x = TRANSLATE.x;
    this._y = TRANSLATE.y;
    this._z = TRANSLATE.z;

    if(this.item.style.zIndex != "" && this._z === 0) {
      this._z = this.item.style.zIndex;
    }

    this.width = this.item.offsetWidth;
    this.height = this.item.offsetHeight;

    this.getOptions();
    this.getInsiders();
  }

  getOptions() {
    this.opts.speed[this._axis] = this.item.getAttribute("data-speed") !== null? Number(this.item.getAttribute("data-speed")) : this.opts.speed[this._axis];
    this.opts.speed.y = this.item.getAttribute("data-speed-y") !== null? Number(this.item.getAttribute("data-speed-y")) : this.opts.speed.y;
    this.opts.speed.x = this.item.getAttribute("data-speed-x") !== null? Number(this.item.getAttribute("data-speed-x")) : this.opts.speed.x;
    this.opts.speed.z = this.item.getAttribute("data-speed-z") !== null? Number(this.item.getAttribute("data-speed-z")) : this.opts.speed.z;
    this.opts.offset = this.item.getAttribute("data-offset") !== null? Number(this.item.getAttribute("data-offset")) : Metrics.HEIGHT * .2;
    this.opts.positionStop = this.item.getAttribute("data-stop") !== null? Number(this.item.getAttribute("data-stop")) : this.opts.positionStop;
    this.opts.positionResume = this.item.getAttribute("data-resume") !== null? Number(this.item.getAttribute("data-resume")) : this.opts.positionResume;
    //POSTION Z
    this._z = this.item.getAttribute("data-z") !== null? Number(this.item.getAttribute("data-z")) : this._z;
  }

  getId() {
    if(!this.item.getAttribute("id")) {
      this.item.setAttribute("id", "__" + new Date().getTime() + "__" + this.index);
    }

    return this.item.getAttribute("id");
  }

  getInsiders() {
    let items;

    /* VIDEO */
    items = C.GetBy.selector("[data-scroll-video]", this.item);
    for (let i = 0, j = items.length; i < j; i++) {
      let id = items[i].getAttribute("data-scroller-id") || this._scroller.id;
      const MOBILE_ENABLED = true;//Basics.isMobile && items[i].getAttribute("data-avoid-mobile") === null || !Basics.isMobile;
      /*** El PLAY PAUSE del video lo dejamos siempre activo, sea movil o no. */

      if(id === this._scroller.id && MOBILE_ENABLED) {
        items[i].removeAttribute("controls");
        if(!Basics.isMobile) {
          this._nVideos = this._videos.push(items[i])
        } else {
          items[i].setAttribute("autoplay", "true");
          const PARENT = items[i].parentNode;
          const VIDEO = items[i].cloneNode(true);
          C.Remove(items[i]);
          PARENT.appendChild(VIDEO);
        }
      }
    }

    /* SCALERS */
    items = C.GetBy.selector("[data-scroll-scale]", this.item);
    for (let i = 0, j = items.length; i < j; i++) {
      let id = items[i].getAttribute("data-scroller-id") || this._scroller.id;
      const MOBILE_ENABLED = Basics.isTouch && items[i].getAttribute("data-avoid-mobile") === null || !Basics.isTouch;

      if(id === this._scroller.id && MOBILE_ENABLED) {
        let item = new VScrollitem_Scale(items[i], this._axis);
        this._nInsiders = this._insiders.push(item)
      }
    }

    /* MOVERS */
    items = C.GetBy.selector("[data-scroll-displace]", this.item);
    for (let i = 0, j = items.length; i < j; i++) {
      let id = items[i].getAttribute("data-scroller-id") || this._scroller.id;
      const MOBILE_ENABLED = Basics.isTouch && items[i].getAttribute("data-avoid-mobile") === null || !Basics.isTouch;

      if(id === this._scroller.id && MOBILE_ENABLED) {
        let item = new VScrollitem_Displace(items[i], this._axis);
        this._nInsiders = this._insiders.push(item);
      }
    }

    /* INSIDERS */
    items = C.GetBy.selector("[data-scroll-insider]", this.item);
    for (let i = 0, j = items.length; i < j; i++) {
      let id = items[i].getAttribute("data-scroller-id") || this._scroller.id;
      const MOBILE_ENABLED = Basics.isTouch && items[i].getAttribute("data-avoid-mobile") === null || !Basics.isTouch;

      if(id === this._scroller.id && MOBILE_ENABLED) {
        let item = new VScrollitem_Insider(items[i], this._axis);
        this._nInsiders = this._insiders.push(item);
      }
    }

    /* INSIDERS MASK */
    items = C.GetBy.selector("[data-scroll-insider-mask]", this.item);
    for (let i = 0, j = items.length; i < j; i++) {
      let id = items[i].getAttribute("data-scroller-id") || this._scroller.id;
      const MOBILE_ENABLED = Basics.isTouch && items[i].getAttribute("data-avoid-mobile") === null || !Basics.isTouch;

      if(id === this._scroller.id && MOBILE_ENABLED) {
        let item = new VScrollitem_InsiderMask(items[i], this._axis, this.item);
        this._nInsiders = this._insiders.push(item);
      }
    }

    if(this._scroller.isNative) return; //DESDE AQUI SOLO VSCROLL

    /* STICKY */
    items = C.GetBy.selector("[data-scroll-sticky]", this.item);
    for (let i = 0, j = items.length; i < j; i++) {
      let id = items[i].getAttribute("data-scroller-id") || this._scroller.id;
      const MOBILE_ENABLED = Basics.isTouch && items[i].getAttribute("data-avoid-mobile") === null || !Basics.isTouch;

      if(id === this._scroller.id && MOBILE_ENABLED) {
        let item = new VScrollitem_Sticky(items[i], this._axis);
        this._nInsiders = this._insiders.push(item)
      }
    }
  }

  loop() {};

  visible() {
    if(Math.round(this.realY) === 0) {
      Scroll.anchor = this.id;
    }
    if(this.isVisible) return;

    Scroll.anchor = this.id;

    this._playVideos();

    if (this.onVisible) {
      this.onVisible();
    }

    this.firstVisible = false;
    this.isVisible = true;
  }

  show() {
    if(this.isShow) return;

    const doShow = () => {
      if (this.onShow) {
        this.onShow();

        if(!this.onHide) {
          this.onShow =  null;
        }
      }

      this.firstShow = false;
      this.isShow = true;
    };

    if(this.opts.offsetShow) {
      if(this.isInViewportOffset) {
        doShow();
      }
    } else {
      doShow();
    }
  }

  hide() {
    this._pauseVideos();
    this.isShow = false;
    this.isVisible = false;

    if(this.onHide) {
      this.onHide();
    }
  }

  _playVideos() {
    for(let i = 0; i<this._nVideos; i++) {
      this._videos[i].play()
    }
  }

  _pauseVideos() {
    for(let i = 0; i<this._nVideos; i++) {
      this._videos[i].pause()
    }
  }

  resize(__w,__h) {
    this.opts.offset = this.item.getAttribute("data-offset") !== null? Number(this.item.getAttribute("data-offset")) : Metrics.HEIGHT * .2;

    this.width = this.item.offsetWidth;
    this.height = this.item.offsetHeight;

    /* STOPPERS */
    if(this._nInsiders > 0) {
      for(let i = 0; i<this._nInsiders; i++) {
        this._insiders[i].resize({width:this.width, height:this.height});
      }
    }
    /* --- */
  }

  resizeLimits(__h) {
    this.top = this.item.offsetTop;
    this.top = this.item.getBoundingClientRect().top - Scroll.y;
    this.left = this.item.offsetLeft;

    if(this.opts.positionResume){
      this._p0 = -(this[this._measure] + this.opts.offset + this.opts.positionResume + this[this._domAxis]);
    } else {
      this._p0 = -(this[this._measure] + this.opts.offset + this[this._domAxis]);
    }

    this._p1 = __h + this.opts.offset - this[this._domAxis];

    /**/
    if(!this._scroller.isNative) {
      this.item.style[CSS.transform] = CSS.translate3D(this._x, this._y, this._z);
    }
    this.progress = this.progressItem;

    if(!this.isInViewport) {
      this.item.style.visibility = "visible";
    }

    this.setInsideY();
  }

  dispose() {
    this._nInsiders = 0;
    this._insiders = [];
    this.item.style[CSS.transform] = CSS.translate3D(0,0,0);
    this.item = null;
  }
}

class VScrollitem_Insider {
  item;
  speed;
  offset;
  axis;
  axisInside;
  x;
  y;
  z;
  min;
  width;
  height;

  constructor(__item, __axis) {
    this.item = __item;
    this.axis = __axis;
    this.axisInside = this.item.getAttribute("data-axis") || __axis;
    this.speed = this.item.getAttribute("data-speed")!== null? Number(this.item.getAttribute("data-speed")) : 0.8;
    this.min = this.item.getAttribute("data-min")!== null? Number(this.item.getAttribute("data-min")) : 666;

    const TRANSLATE = CSS.getTranslate(this.item);
    this.x = TRANSLATE.x;
    this.y = TRANSLATE.y;
    this.z = this.item.style.zIndex || 0;
    this.width = this.item.offsetWidth;
    this.height = this.item.offsetHeight;
  }

  loop(__position, __progress) {
    const X = this.axisInside === "x"? (this.offset + __position[this.axis]) * this.speed : this.x;
    const Y = this.axisInside === "y"? (this.offset + __position[this.axis]) * this.speed : this.y;

    if(this.min!==666) {
      this.item.style[CSS.transform] = CSS.translate3D(X,Math.max(this.min,Y),this.z);
    } else {
      this.item.style[CSS.transform] = CSS.translate3D(X,Y,this.z);
    }

  }

  resize(__size) {
    this.offset = 0;
    this.width = this.item.offsetWidth;
    this.height = this.item.offsetHeight;
  }
}

class VScrollitem_InsiderMask extends VScrollitem_Insider {
  _parentDOM;
  top = 0;
  left = 0;
  _verticalOffset = 0;
  _horizontalOffset = 0;
  _hasParent = false;

  constructor(__item, __axis, __parentDOM) {
    super(__item, __axis);
    this._parentDOM = __parentDOM;
    this._hasParent = !(__parentDOM === this.item.parentNode);
  }

  loop(__position, __progress) {
    const X = this.axis === "x"? (this.offset + __position.x) * this.speed : this.x;
    const Y = this.axis === "y"? (this.offset + __position.y) * this.speed : this.y;
    const Y0 = this.top + Y + this._verticalOffset;
    const Y1 = Y0 + this.height;
    const X0 = this.left + X + CSS.getTranslate(this.item.parentNode).x;
    const X1 = X0 + this.width;

    this._parentDOM.style.setProperty('--mask-top', `${Y0}px`);
    this._parentDOM.style.setProperty('--mask-right', `${X1}px`);
    this._parentDOM.style.setProperty('--mask-bottom', `${Y1}px`);
    this._parentDOM.style.setProperty('--mask-left', `${X0}px`);
    this.item.style[CSS.transform] = CSS.translate3D(X,Y,this.z);
  }

  resize(__size) {
    super.resize(__size);

    if(this._hasParent) {
      this._verticalOffset = CSS.getTranslate(this.item.parentNode).y;
      this._horizontalOffset = CSS.getTranslate(this.item.parentNode).x;
      this.top = this.item.parentNode.offsetTop;
      this.left = this.item.parentNode.offsetLeft;
    } else {
      this.top = this.item.offsetTop;
      this.left = this.item.offsetLeft;
    }
  }
}

class VScrollitem_Displace {
  item;
  parent;
  p0;
  p1;
  direction;
  offset;
  axis;
  axisInside;
  x;
  y;
  z;

  constructor(__item, __axis) {
    this.item = __item;
    this.parent = __item.parentNode;
    this.direction = this.item.getAttribute("data-start")!== null? Number(this.item.getAttribute("data-start")) : 1;
    this.axis = __axis;
    this.axisInside = this.item.getAttribute("data-axis") || __axis;
    this.offset = this.item.offsetTop;

    const TRANSLATE = CSS.getTranslate(this.item);
    this.x = TRANSLATE.x;
    this.y = TRANSLATE.y;
    this.z = this.item.style.zIndex || 0;
  }

  loop(__position, __progress) {
    const X = this.axisInside === "x"? Maths.lerp(this.p0, this.p1, __progress) : this.x;
    const Y = this.axisInside === "y"? Maths.lerp(this.p0, this.p1, __progress) : this.y;
    this.item.style[CSS.transform] = CSS.translate3D(X,Y,this.z);
  }

  resize(__size) {
    const LIMIT = this.axisInside === "y"? this.item.offsetHeight - this.parent.offsetHeight : this.item.offsetWidth - this.parent.offsetWidth;

    if(this.direction === 0) {
      this.p0 = 0;
      this.p1 = -LIMIT;
    } else {
      this.p1 = 0;
      this.p0 = -LIMIT;
    }
  }
}

class VScrollitem_Scale {
  item;
  scale0;
  scale1;
  offset;

  constructor(_item) {
    this.item = _item;

    this.scale1 = this.item.getAttribute("data-end")!== null? Number(this.item.getAttribute("data-end")) : 1;
    this.scale0 = this.item.getAttribute("data-start")!== null? Number(this.item.getAttribute("data-start")) : 2;

    this.offset = this.item.offsetLeft;
  }

  loop(__position, __progress) {
    let scale = Maths.lerp(this.scale0, this.scale1, __progress);
    this.item.style[CSS.transform] = CSS.scale3D(scale, scale);
  }

  resize(__size) {}
}


class VScrollitem_Sticky {
  item;
  p0;
  p1;
  min;
  offsetSlomo //APAÑO para modificar la posicion slomo sin cambiar min;
  max;
  offset;
  slomo;
  x;
  y;
  z;

  constructor(_item) {
    this.item = _item;
    this.p0 = this.item.getAttribute("data-stop")!== null? Number(this.item.getAttribute("data-stop")) : 0;
    this.p1 = this.item.getAttribute("data-resume")!== null? Number(this.item.getAttribute("data-resume")) : 1;
    this.offset = this.item.offsetTop;
    this.slomo = this.item.getAttribute("data-slomo")!== null? Number(this.item.getAttribute("data-slomo")) : 1;

    const TRANSLATE = CSS.getTranslate(this.item);
    this.x = TRANSLATE.x;
    this.y = TRANSLATE.y;
    this.z = this.item.style.zIndex || 0;
  }

  loop(__position, __progress) {

    const POSITION = __position.y + this.offset;

    if(POSITION <= this.min) {
      this.item.style[CSS.transform] = CSS.translate3D(0, Math.min(this.max, this.offsetSlomo + Math.max(this.min, POSITION*-this.slomo)), this.z);
    } else {
      this.item.style[CSS.transform] = CSS.translate3D(0, this.offsetSlomo + this.min, this.z);
    }
  }

  resize(__size) {
    this.min = ((__size.height - this.item.offsetHeight) * this.p0);
    this.max = (__size.height - this.item.offsetHeight) * this.p1;
    this.max -= this.offset;
    this.offsetSlomo = this.min + (this.max * (1 - this.slomo))*.5;
  }
}