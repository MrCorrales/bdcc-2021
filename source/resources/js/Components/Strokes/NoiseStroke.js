class NoiseStroke__Stroke {
  _path;
  _p1 = 0;
  _p2 = 0;
  _time = .3;
  _step = 0;

  constructor(__path) {
    this._path = __path;
    this._time = Strokes.setPath(this._path, "square");
    this.reset();
    this.loop();
  }

  show() {
    clearTimeout(this._idTimer);

    this._p1 = 0;
    this._p2 = 0;
    gsap.to(this,{_p2: 100, duration:this._time, ease:Quad.easeOut,
      onUpdate:()=> {this.loop();},
      onComplete:()=> {
        this.hide();
        //this._idTimer = setTimeout(()=>{this.loop(true)}, 100);
      },
    });
  }

  hide() {
    clearTimeout(this._idTimer);

    this._isHover = false;

    gsap.to(this,{_p1: 100, duration:.4, ease:Quad.easeInOut, delay:this._p2 > 50? 0 : .2,
      onUpdate:()=> {this.loop();},
      onComplete:()=> {
        this._idTimer = setTimeout(()=>{
            this.reset();
          this.loop(true)
        }, 100);
      },
    });
  }

  reset() {
    this._p1 = 0;
    this._p2 = 0;
    this._time = Strokes.setPath(this._path, "square");

    const SIZE = Maths.maxminRandom(Metrics.WIDTH*.3, Metrics.WIDTH*.05);
    const X = Maths.maxminRandom(Metrics.WIDTH, 0) - SIZE *.5;
    const Y = Maths.maxminRandom(Metrics.HEIGHT, 0) - SIZE *.5;
    const TIME = Maths.maxminRandom(5000, 1000);

    this._path.parentNode.style.width = SIZE + "px";
    this._path.parentNode.style.height = SIZE + "px";
    this._path.parentNode.style[CSS.transform] = CSS.translate3D(X, Y, 0);

    this._idTimer = setTimeout(()=>{
      this.show();
    }, TIME);
  }

  loop(__isLast) {
    if(this._step%3 === 0 || __isLast) {
      gsap.set(this._path, {drawSVG: this._p1 + "% " + this._p2 + "%"});
    }

    this._step++;
  }
}

class NoiseStroke {
  static TOTAL = 3;

  static _container = C.GetBy.class("strokes-container")[0];
  static _paths = [];

  static init() {
    this._paths.push(new NoiseStroke__Stroke(C.GetBy.class("strokes-container__path")[0]));
    this._paths.push(new NoiseStroke__Stroke(C.GetBy.class("strokes-container__path")[1]));
    this._paths.push(new NoiseStroke__Stroke(C.GetBy.class("strokes-container__path")[2]));
  }
}