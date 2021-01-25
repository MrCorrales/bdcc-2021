class DetailsFake {
  _container;
  _path;
  _p1 = 0;
  _p2 = 0;
  _step = 0;
  _time = .3;
  _idTimer;
  _isButton = false;
  _isHover = false;

  constructor(__container, __call, __isButton = true) {
    this._container = __container;
    this._isButton = __isButton;
    this._path = C.GetBy.selector("path", this._container)[0];

    if(this._path) {
      this._time = Math.min(.6, Math.max(this._time, (this._path.getTotalLength() * this._time) / 1000));

      this.loop();

      if (__isButton) {
        this.setupButton(__call);
      }
    }
  }

  setupButton(__call) {
    this._container.addEventListener(Basics.clickEvent, (e)=> {
      if(__call) {
        e.preventDefault();
        __call();
      }
    });

    this._container.addEventListener(Basics.mouseOver, (e)=> {
      e.preventDefault();
      if(!this._container.classList.contains("__active")) {
        this.hover();
      }
    });

    this._container.addEventListener(Basics.mouseOut, (e)=> {
      e.preventDefault();
      if(!this._container.classList.contains("__active")) {
        this.out();
      }
    });
  }

  hover() {
    if(this._isHover) return;

    gsap.killTweensOf(this);
    clearTimeout(this._idTimer);

    this._isHover = true;

    this._p1 = 0;
    this._p2 = 0;
    gsap.to(this,{_p2: 100, duration:this._time, ease:Quad.easeOut,
      onUpdate:()=> {this.loop();},
      onComplete:()=> {
        this._idTimer = setTimeout(()=>{this.loop(true)}, 100);
      },
    });
  }

  out() {
    clearTimeout(this._idTimer);

    this._isHover = false;

    gsap.to(this,{_p1: 100, duration:.4, ease:Quad.easeInOut, delay:this._p2 > 50? 0 : .2,
      onUpdate:()=> {this.loop();},
      onComplete:()=> {
        this._idTimer = setTimeout(()=>{this.loop(true)}, 100);
      },
    });
  }

  loop(__isLast) {
    if(this._step%3 === 0 || __isLast) {
      gsap.set(this._path, {drawSVG: this._p1 + "% " + this._p2 + "%"});
    }

    this._step++;
  }
}