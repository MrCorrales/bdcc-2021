class Instructions__Label {
  _container;
  _lblHolder;
  _widthMask = 0;

  get widthMask() {
    return this._widthMask;
  }
  set widthMask(__n) {
    if(isNaN(__n)) {
      this._container.style.setProperty("--width", __n);
    } else {
      this._widthMask = __n;
      this._container.style.setProperty("--width", __n + "px");
    }
  }

  constructor(__item) {
    this._container = __item;
    this._lblHolder = C.GetBy.class("aux", __item)[0];
  }

  show() {
    if(!this._lblHolder) return;

    const SIZE = this._lblHolder.offsetWidth;
    gsap.to(this,{widthMask:SIZE, ease:Expo.easeInOut, duration:1, onComplete:()=> {
      this.widthMask = "auto";
      }});
  }

  hide() {
    if(!this._lblHolder) return;

    this.widthMask = this._lblHolder.offsetWidth;
    gsap.to(this,{widthMask:0, ease:Expo.easeInOut, duration:1});
  }
}

class Instructions__ProgressTimers {
  TIME = 5;
  _container;
  _progress = 0;
  _call;

  get progress() {
    return this._progress;
  }

  set progress(__n) {
      this._progress = __n;
      this._container.style.setProperty("--progress", this._progress);
  }

  constructor(__item, __callback) {
    this._container = __item;
    this._call = __callback;
  }

  start() {
    gsap.to(this,{progress:1, ease:"none", duration:this.TIME, delay:1, onComplete:()=> {
        this._call();
      }});
  }

  stop() {
    gsap.killTweensOf(this)
    gsap.to(this,{progress:0, ease:Power2.easeOut, duration:1});
  }
}

class Instructions extends Slider {

  _labels = [];
  _strokeBtns = [];
  _progressTimers = [];
  _isPause = false;

  constructor(__item) {
    super(__item);
    this.setupLabels();
    this.setupButtons();
    this.setupProgressTimers();
  }

  show() {
    this.goto(0);
  }

  enableStart() {

  }

  setupButtons() {
    const BTNS = C.GetBy.selector("button", this._container);

    for(let i=0, j=BTNS.length; i<j; i++) {
      this._strokeBtns.push(new ButtonStroke(BTNS[i]));
    }
  }

  setupLabels() {
    const LABELS = C.GetBy.class("__button", this._container);

    for(let i=0, j=LABELS.length; i<j; i++) {
      this._labels.push(new Instructions__Label(LABELS[i]));
    }
  };

  setupProgressTimers() {
    const TIMERS = C.GetBy.class("progress", this._container);

    for(let i=0, j=TIMERS.length; i<j; i++) {
      this._progressTimers.push(new Instructions__ProgressTimers(TIMERS[i], ()=>{this.next();}));
    }
  };

  goto(__index, __direction, isUserAction) {
    if(isUserAction) this._isPause = true;

    if(this._actual != undefined) {
      this._labels[this._actual].hide();
      this._strokeBtns[this._actual].out();
    }

    if(this._progressTimers[this._actual]) {
      this._progressTimers[this._actual].stop();
    }

    super.goto(__index, __direction, isUserAction);
    this._labels[this._actual].show();
    this._strokeBtns[this._actual].hover();

    if(this._progressTimers[this._actual] && !this._isPause) {
      this._progressTimers[this._actual].start();
    }
  }
}