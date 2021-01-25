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

    this._widthIMG = this.dom.offsetWidth;
    this._heightIMG = this.dom.offsetHeight;
    this.offsetX = this.width *.5;
    this.offsetY = this.height *.5;

    const SC = this.width/this._widthIMG

    const X = Maths.maxminRandom(Metrics.WIDTH - this.width, 0) + this.width*.5;
    const Y = Maths.maxminRandom(-Metrics.HEIGHT *.5, -Metrics.HEIGHT*4);
    const ROT = Maths.maxminRandom(.4, -.4);

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


    /*const DOM = this._buttons[i].dom;
    console.log(this._objects[i].position)*/
  }

  resize() {
    this.height = this.dom.offsetHeight;
    this.width = this.dom.offsetWidth;

    const SCALE = this.width/this._oldWidth;
    Matter.Body.scale(this.box, SCALE, SCALE);

    this._oldWidth = this.width;
  }
}

class ScrollItem__Services extends VScroll_Item {
  WALL_SIZE = 300;

  _render;
  _timer;

  scaleX = 1;
  scaleY = 1;

  oldWidth;
  oldHeight;

  fixedWidth;
  fixedHeight;

  _walls = [];
  _buttons = [];
  _objects = [];
  _totalObjects = 0;

  _engine;

  constructor(__link, __index, __scroller) {
    super(__link, __index, __scroller);

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

    Matter.World.add(this._engine.world, [...this._walls, ...this._objects]);

    this.onShow = () => {
      Matter.Engine.run(this._engine);
      Matter.Render.run(this._render);
    };
    this.onHide = () => {

    };
    this.onMove = (__pos, __size) => {

    }

    gsap.ticker.add(() => {this.loop();});
  }

  setupWorld() {
    this._engine = Matter.Engine.create();
    this._render = Matter.Render.create({
      element: C.GetBy.class("canvas-holder",this.item)[0],
      engine: this._engine,
      options: {
        width: this.width,
        height: this.height,
        background: 'transparent',
        pixelRatio: 1,
        showAngleIndicator: false,
        wireframes: false
      },
    });

    this._engine.world.gravity.y = 1.4;
  }

  setupWalls() {
    this._walls = [
      Matter.Bodies.rectangle(this.width * .5, -6000, this.width, this.WALL_SIZE, { isStatic: true }),
      Matter.Bodies.rectangle(this.width + this.WALL_SIZE * .4, this.height * .5, this.WALL_SIZE, this.height, { isStatic: true }),
      Matter.Bodies.rectangle(this.width * .5, this.height + this.WALL_SIZE * .4, this.width, this.WALL_SIZE, { isStatic: true }),
      Matter.Bodies.rectangle(0 - this.WALL_SIZE * .4, this.height * .5, this.WALL_SIZE, this.height, { isStatic: true }),
    ];
  }

  setupObjects() {
    for(let i=0; i< this._totalObjects; i++) {
      this._buttons[i].setup2DBox();
      this._objects.push(this._buttons[i].box);
    }
  }

  loop() {

    for(let i=0; i< this._totalObjects; i++) {

      this._buttons[i].update(this.scaleX, this.scaleY);
      /*if(i===0) {
        console.log(this._objects[i].position.x, this._objects[i].position.y, this._buttons[i].box.position.x, this._buttons[i].box.position.y);
      }*/
    }
  }

  resize(w,h) {
    super.resize(w,h);
    this.opts.offsetShow = Metrics.HEIGHT *.35;
    //walls {
    clearTimeout(this._timer);
    this._timer = setTimeout(()=>{
      this.resizeMatter();
    },100);

  }

  resizeMatter() {
    const offX = Maths.precission(this.width/this.oldWidth, 2);
    const offY = Maths.precission(this.height/this.oldHeight, 2);

    this.scaleX = offX;
    this.scaleY = offY;



    this._engine.world.bounds.max.x = this.width;
    this._engine.world.bounds.max.y = this.height;
    console.log("this.scaleX " + this.scaleX)

    const posX = (this.oldWidth - this.width) *-1;
    const posY = (this.oldHeight - this.height) *-1;

    /*Matter.Body.translate(this._walls[0], {x: posX *.5, y: 0});
    Matter.Body.translate(this._walls[1], {x: posX, y: posY*.5});
    Matter.Body.translate(this._walls[2], {x: posX *.5, y: posY});
    Matter.Body.translate(this._walls[3], {x: 0, y: posY*.5});*/


   /* Matter.Body.scale(this._walls[0], offX, 1);
    Matter.Body.scale(this._walls[1], 1, offY);
    Matter.Body.scale(this._walls[2], offX, 1);
    Matter.Body.scale(this._walls[3], 1, offY);*/

    for(let i=0; i<this._totalObjects; i++) {
      this._buttons[i].resize();
    }



    const CANVAS = this._render.canvas;//C.GetBy.selector("canvas", this.item);
    if(CANVAS) {
      CANVAS.width = this.width;
      CANVAS.height = this.height;

      CANVAS.style.width = this.width + "px";
      CANVAS.style.height = this.height + "px";
    }

    this.oldWidth = this.width;
    this.oldHeight = this.height;
  }
}

Scroll._addClass("services", ScrollItem__Services);