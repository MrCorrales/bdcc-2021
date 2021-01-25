class ScrollItem__Services__Buttons {
  dom;
  index;
  width;
  height;
  box;
  _widthIMG;
  _heightIMG;
  _scale;

  offsetX;
  offsetY;

  _oldWidth;

  constructor(__dom, __index) {
    this.dom = __dom;
    this.index = __index;
  }

  setup2DBox() {
    this.width = this.dom.offsetWidth;
    this.height = this.dom.offsetHeight;
    this.offsetX = this.width *.5;
    this.offsetY = this.height *.5;

    const SC = this.width/this._widthIMG
    const X = Maths.maxminRandom(Metrics.WIDTH - this.width, 0) + this.width*.5;
    const Y = Maths.maxminRandom(-Metrics.HEIGHT *.5, -Metrics.HEIGHT*4);
    const ROT = Maths.maxminRandom(100, -100)/100;

    this.box = Matter.Bodies.rectangle(X, Y, this.width, this.height, {
      restitution: .6,
      chamfer: { radius: [this.height*.5] },
      render: {
        fillStyle: '#ffffff',
        strokeStyle: '#000000',
        lineWidth: 4,
        sprite: {
          // texture: __dom.getAttribute("data-src"),
          xScale: SC,
          yScale: SC
        }
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

class ScrollItem__Services extends VScroll_Item {
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
    C.ForEach(C.GetBy.class("__button", this.item), (dom)=> {
      this._buttons.push(new ScrollItem__Services__Buttons(dom, this._totalObjects));
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
    for(let i=0; i< this._totalObjects; i++) {
      this._buttons[i].setup2DBox();
      this._boxes.push(this._buttons[i].box);
    }
  }

  initWorld() {
    Matter.World.add(this._engine.world, [...this._walls, ...this._boxes]);
    Matter.Engine.run(this._engine);
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

Scroll._addClass("services", ScrollItem__Services);