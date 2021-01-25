class ScrollItem__GraficaBDCC__Buttons {
  dom;
  index;
  width;
  height;
  heightScene;
  box;
  _widthIMG;
  _heightIMG;
  _scale;

  offsetX;
  offsetY;

  _oldWidth;

  constructor(__dom, __index, __height) {
    this.dom = __dom;
    this.index = __index;
    this.heightScene = __height;
  }

  setup2DBox(__index, __height) {
    if(__height) this.heightScene = __height;

    this.width = this.dom.offsetWidth;
    this.height = this.dom.offsetHeight;
    this.offsetX = this.width *.5;
    this.offsetY = this.height *.5;

    const SC = this.width/this._widthIMG

    let X;
    let Y;
    let ROT;
    let CURVA;
    if(this.dom.classList.contains("__core")) {
      X = Metrics.WIDTH*.5;
      Y = Maths.maxminRandom(this.heightScene - this.height*.5, this.heightScene - this.height * .75) ;
      CURVA = this.height*.5;
      ROT = 0;
    } else if(this.dom.classList.contains("__left")) {
      const STEP = (this.heightScene + this.height*.5)/3;

      X = Maths.maxminRandom(Metrics.WIDTH *.2, 0) + this.width*.5; //Metrics.WIDTH;//Maths.maxminRandom(Metrics.WIDTH*.1, 0) + this.width *.5;
      Y = STEP*__index;



      CURVA = this.height*.5;
      ROT = Maths.maxminRandom(.4, -.4);
    } else {
      const STEP = (this.heightScene + this.height*.5)/3;

      X = Maths.maxminRandom(Metrics.WIDTH, Metrics.WIDTH *.8) - this.width * .5;
      //Y = Maths.maxminRandom(this.heightScene - this.height*.5, 0);
      Y = STEP*__index;

      CURVA = this.height*.5;
      ROT = Maths.maxminRandom(100, -100)/100;
    }

    this.box = Matter.Bodies.rectangle(X, Y, this.width, this.height, {
      restitution: .6,
      chamfer: { radius: [CURVA] },
      render: {
        fillStyle: '#ffffff',
        strokeStyle: '#000000',
        lineWidth: 4
      }
    });

    Matter.Body.rotate(this.box, ROT)
  }

  update(__scaleX, __scaleY) {
    this.dom.style[CSS.transform] =
      CSS.translate3D(this.box.position.x * __scaleX - this.offsetX, this.box.position.y * __scaleY - this.offsetY, 1) + " rotate( " + this.box.angle + "rad )";
  }

  reset() {}
  resize() {}
}

class ScrollItem__GraficaBDCC extends VScroll_Item {
  WALL_SIZE = 300;

  _timer;

  scaleX = 1;
  scaleY = 1;

  oldWidth;
  oldHeight;

  fixedWidth;
  fixedHeight;

  _walls = [];
  _buttons = [];
  _boxes = [];
  _totalObjects = 0;

  _resize_observer;

  _engine;

  constructor(__link, __index, __scroller) {
    super(__link, __index, __scroller);

    if(Basics.isReducedMotion) return;

    this.fixedWidth = this.width;
    this.oldWidth = this.width;
    this.fixedHeight = this.height;
    this.oldHeight = this.height;

    //BUTTONS
    C.ForEach(C.GetBy.class("__item", this.item), (dom)=> {
      this._buttons.push(new ScrollItem__GraficaBDCC__Buttons(dom, this._totalObjects, this.height));
      this._totalObjects++;
    })

    this.setupWorld();
    this.setupWalls();
    this.setupBoxes();

    //
    this._resize_observer = new ResizeObserver(entries => {
      clearTimeout(this._timer);
      this._timer = setTimeout(()=>{
        this.resetWorld();
      },300);
    });
    this._resize_observer.observe(this.item);
    //

    this.onShow = () => {
      this.initWorld();
    };
    this.onHide = () => {
      this.resetWorld();
    };

    gsap.ticker.add(() => {this.loop();});
  }

  setupWorld() {
    this._engine = Matter.Engine.create();
    this._engine.world.gravity.y = 1.4;
  }

  setupWalls() {
    this._walls = [
      Matter.Bodies.rectangle(this.width * .5, -6000, this.width, this.WALL_SIZE, { isStatic: true }),
      Matter.Bodies.rectangle(this.width + this.WALL_SIZE * .5, this.height * .5, this.WALL_SIZE, this.height, { isStatic: true }),
      Matter.Bodies.rectangle(this.width * .5, this.height + this.WALL_SIZE * .5, this.width, this.WALL_SIZE, { isStatic: true }),
      Matter.Bodies.rectangle(0 - this.WALL_SIZE * .5, this.height * .5, this.WALL_SIZE, this.height, { isStatic: true }),
    ];
  }

  setupBoxes() {
    let left = 0;
    let right = 0;

    for(let i=0; i< this._totalObjects; i++) {
      let index = 0;
      if(this._buttons[i].dom.classList.contains("__left")) {
        index = left;
        left ++;
      } else if(this._buttons[i].dom.classList.contains("__right")) {
        index = right;
        right ++;
      }

      this._buttons[i].setup2DBox(index, this.height);
      this._boxes.push(this._buttons[i].box);
    }
  }

  initWorld() {
    Matter.World.add(this._engine.world, [...this._walls, ...this._boxes]);
    Matter.Engine.run(this._engine);

    /*this._timer = setTimeout(()=>{
      gsap.to(this.item,{alpha:1, duration:.1, ease:Power2.easeIn})
    },300);*/
  }

  resetWorld() {
    Matter.World.clear(this._engine.world);
    Matter.Engine.clear(this._engine);

    this._engine = null;
    this._walls = [];
    this._boxes = [];

    this.setupWorld();
    this.setupWalls();
    this.setupBoxes();

    if(this.isShow) {
       this.initWorld();
    }
  }

  loop() {
    for(let i=0; i< this._totalObjects; i++) {
      this._buttons[i].update(this.scaleX, this.scaleY);
    }
  }

  dispose() {

    if(!Basics.isReducedMotion) {
      Matter.World.clear(this._engine.world);
      Matter.Engine.clear(this._engine);
      this._resize_observer.disconnect();

      this._engine = null;
      this._walls = [];
      this._boxes = [];
      this._resize_observer = null;
    }

    super.dispose();
  }

  resize(w,h) {
    super.resize(w,h);

    if(Basics.isReducedMotion) return;

    this.opts.offsetShow = Metrics.HEIGHT *.15;
  }
}

Scroll._addClass("grafica-bdcc", ScrollItem__GraficaBDCC);