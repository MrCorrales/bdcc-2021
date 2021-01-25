class CheckboxStroke {
  _container;
  _checkbox;
  _type;
  _path;
  _p1 = 0;
  _p2 = 0;
  _step = 0;
  _time = .3;
  _idTimer;
  _isHover = false;

  constructor(__container, __call) {
    this._container = __container;
    this._checkbox = C.GetBy.selector("input", this._container)[0];
    this._path = C.GetBy.selector("path", this._container)[0];
    this._type = this._container.getAttribute("data-stroke-type");

    if(this._path) {
      this._time = Strokes.setPath(this._path, this._type);

      this.loop();
      this.setupCheck(__call);
    }
  }

  setupCheck(__call) {
    this._checkbox.addEventListener('change', (event) => {
      if (event.target.checked) {
        this.hover();
      } else {
        this.out();
      }

      if(__call) __call(this);
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
        this._idTimer = setTimeout(()=>{
          if(this._type){
            this._time = Strokes.setPath(this._path, this._type);
          }
          this.loop(true);
        }, 100);
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