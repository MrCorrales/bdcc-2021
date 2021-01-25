class Cursor {
  static canvas = Interface.canvas || document.createElement('canvas');
  static ctx = Interface.ctx || this.canvas.getContext('2d');
  static width;
  static height;
  static easing = 0.1;
  static power = .7;
  static powerRotation = 0;
  static powerMagnet = 0.4;
  static _color = "#FFFFFF";
  static colorRGB = "#FFFFFF";

  static _arrow;
  static _iconCross;
  static _iconDrag;
  static _iconLoading;
  static _follower;
  static _text;
  static _followerFixedPosition = {x:0,y:0};

  static _hasIconEffect = true;
  static _isArrowIcon = false;
  static _isFollowFixed = false;
  static _isIconFixed = false;
  static _isEnabledMove = true;

  static _arrowIcon = null;
  static _icon = null;
  static _icons = {};

  static get color() { return this._color; }
  static set color(__c) {
    this._color = __c;
    this.colorRGB =  Functions.hexToRgb(__c);

    if(this._arrow) this._arrow.backToDefaultColor();
    if(this._follower) this._follower.backToDefaultColor();
  }

  static set drag(__bool) {
    if(this._iconDrag.isDragging !== __bool) {
      if(__bool) {
        this._icon = null;
        this._iconDrag.drag();
      } else {
        this._iconDrag.dragEnd();
      }
    }
  }

  static get loading() { return  this._iconLoading.enabled; }
  static set loading(__bool) {
    if(__bool) {
      this._iconLoading.show();
    } else {
      this._iconLoading.hide();
    }
  }

  static set icons(__icons) {
    for(let i=0, j=__icons.length; i<j; i++) {
      this._icons[__icons[i].id] = new Cursor__Icon(__icons[i].src, __icons[i].size, this.ctx);
    }
  }

  static setPosition(__x, __y) {
    this._arrow.x = __x;
    this._arrow.y = __y;
    this._follower.x = __x;
    this._follower.y = __y;
  }

  static init(__container = document.body, options = {}, arrowOptions = {}, followerOptions = {}, loadingOptions = {}, __isEnabledMove = true) {
    if(Basics.isReducedMotion) return;

    this.color = options.color || this.color;
    this.easing = options.easing || this.easing;
    this.power = options.power || this.power;

    this._hasIconEffect = options.hasIconEffect != null?  options.hasIconEffect : this._hasIconEffect;

    this._isEnabledMove = __isEnabledMove;
    this.powerMagnet = options.powerMagnet || this.powerMagnet;

    this.width = Interface.width;
    this.height = Interface.height;

    arrowOptions = {
      size: arrowOptions.size !== undefined? arrowOptions.size : 20,
      stroke: arrowOptions.stroke !== undefined? arrowOptions.stroke : 0,
      alpha: arrowOptions.alpha !== undefined? arrowOptions.alpha : 1,
      strokeAlpha: arrowOptions.strokeAlpha !== undefined? arrowOptions.strokeAlpha : 0,
      time: arrowOptions.time !== undefined? arrowOptions.time : .3,
    };

    followerOptions = {
      size: followerOptions.size !== undefined? followerOptions.size : 20,
      stroke: followerOptions.stroke !== undefined? followerOptions.stroke : 1,
      alpha: followerOptions.alpha !== undefined? followerOptions.alpha : 1,
      strokeAlpha: followerOptions.strokeAlpha !== undefined? followerOptions.strokeAlpha : 1,
      time: followerOptions.time !== undefined? followerOptions.time : .3,
      easing:this.easing
    };

    loadingOptions = {
      size: loadingOptions.size !== undefined? loadingOptions.size : 20,
      stroke: loadingOptions.stroke !== undefined? loadingOptions.stroke : 1.4,
      strokeBG: loadingOptions.stroke !== undefined? loadingOptions.strokeBG : .2,
      strokeAlpha: loadingOptions.strokeAlpha !== undefined? loadingOptions.strokeAlpha : 1,
    };

   // __container.appendChild(this.canvas);

    this._arrowIcon = options.arrowIcon? this.getIcon(options.arrowIcon) : null;
    this._arrow = new Cursor__Dot(arrowOptions, this.ctx);
    this._follower = new Cursor__Dot(followerOptions, this.ctx);
    this._text = new Cursor__Text(options.fontStyle, this._arrow, this.ctx);
    this._iconDrag = new Cursor__Drag(4, this._arrow, this._follower, this.ctx);
    this._iconLoading = new Cursor__Loading(loadingOptions, this._arrow, this._follower, this.ctx);

    this.color = options.color || this.color;

    if(this._arrowIcon) {
      document.body.classList.add("__cursor-default-hide");
    }

    document.body.classList.add("__cursor-custom");
  }

  static start() {
    this._isEnabledMove = true;
    this.reset();
  }

  static reset() {
    if(Basics.isReducedMotion) return;
    this.isEnabled = true;

    if(!Basics.isTouch) {
      this.doCursor(CursorTypes.DRAG);
      this.doCursor(CursorTypes.MAGNETIC);
      this.doCursor(CursorTypes.FOLLOW);
      this.doCursor(CursorTypes.FOLLOWFIXED);
      this.doCursor(CursorTypes.NORMAL);
      this.doCursor(CursorTypes.COLOR);
      this.doCursor(CursorTypes.AXIS_X);
    }
  }

  static doCursor(__type) {
    let items =  C.GetBy.selector(__type);

    for(let i=0, j=items.length; i<j; i++) {
      let item = items[i];

      item.removeAttribute(__type);
      const isIconTargetFixed = item.getAttribute("data-icon-fixed") === "target";
      const target = C.GetBy.class("__target", item)[0] || item;
      const rotation = item.getAttribute("data-rotation") !== null? Number(item.getAttribute("data-rotation")) : this.powerRotation;

      var center = null;
      if (__type === CursorTypes.MAGNETIC || __type === CursorTypes.FOLLOW || __type === CursorTypes.FOLLOWFIXED || __type === CursorTypes.AXIS_X) {
        let pow;
        if(item.getAttribute("data-power")!=null) {
          pow = Number(item.getAttribute("data-power"));
        } else {
          pow = __type === CursorTypes.MAGNETIC? this.powerMagnet : this.power;
        }

        let _centerTo = item.getAttribute("data-center")? item.getAttribute("data-center") : "xy";

        item.addEventListener(Basics.moveEvent, (e) => {
          if(!this.isEnabled) return;
          //let pow = __type === CursorTypes.MAGNETIC? this.powerMagnet : this.power;

          const boundsItem = item.getBoundingClientRect();
          const bounds = target.getBoundingClientRect();
          const centerX = bounds.left + (bounds.width / 2);
          const centerY = bounds.top + (bounds.height / 2);

          if(!center) {
            center = [e.clientX, e.clientY];
          }

          const centerXItem = _centerTo === "x" || _centerTo === "xy"? boundsItem.left + (boundsItem.width / 2) : center[0];
          const centerYItem = _centerTo === "y" || _centerTo === "xy"? boundsItem.top + (boundsItem.height / 2) : center[1];

          const deltaX = Math.floor((centerXItem - e.clientX)) * pow * -1;
          const deltaY = Math.floor((centerYItem - e.clientY)) * pow * -1;

          if (__type === CursorTypes.FOLLOW || __type === CursorTypes.FOLLOWFIXED) {
            TweenLite.set(target,{x: deltaX, y: deltaY, rotation:deltaX*rotation});
          }

          if(__type === CursorTypes.FOLLOWFIXED) {
            this._followerFixedPosition.x = centerX;
            this._followerFixedPosition.y = centerY;

            if(isIconTargetFixed) {
              this._icon.x = centerX;
              this._icon.y = centerY;
            }
          } else {
            this._followerFixedPosition.x = centerX + deltaX;
            this._followerFixedPosition.y = centerY + deltaY;

            if(isIconTargetFixed) {
              this._icon.x = centerX;
              this._icon.y = centerY;
            }
          }
        });
      }

      item.addEventListener(Basics.mouseOver, (e)=> {
        if(!this.isEnabled) return;

        if(this.loading) return;
        if(this._iconDrag.isDragging && __type !== CursorTypes.DRAG) return;
        item.classList.add("hovered");
        center = null;

        if(__type !== CursorTypes.DRAG) {
          this._arrow.changeTo(item, "arrow", target, __type === CursorTypes.COLOR);
          this._follower.changeTo(item, "follower", target, __type === CursorTypes.COLOR);
          this._icon = this.getIcon(item);
          this._text.text = this.getText(item);
        }

        switch(__type) {
          case CursorTypes.DRAG:
            this._iconDrag.show(item.getAttribute("data-cursor-axis") || "x");
            break;

          case CursorTypes.MAGNETIC:
            this._isFollowFixed = true;
            this._isIconFixed = isIconTargetFixed;
            break;

          case CursorTypes.FOLLOW:
            this._isFollowFixed = true;
            this._isIconFixed = isIconTargetFixed;
            break;

          case CursorTypes.FOLLOWFIXED:
            this._isFollowFixed = true;
            this._isIconFixed = isIconTargetFixed;
            break;

          case CursorTypes.AXIS_X:
            this._isFollowFixed = true;
            this._isIconFixed = isIconTargetFixed;
            break;
        }
      });

      item.addEventListener(Basics.mouseOut, (e)=> {
        if(!this.isEnabled) return;

        if(this.loading) return;
        if(this._iconDrag.isDragging && __type !== CursorTypes.DRAG) return;

        item.classList.remove('hovered');

        if(__type !== CursorTypes.DRAG) {
          this._arrow.backToDefault();
          this._follower.backToDefault();
          this._icon = null;
          this._text.hide();
        }

        switch(__type) {
          case CursorTypes.DRAG:
            this._iconDrag.hide();
            break;

          case CursorTypes.MAGNETIC:
            this._isFollowFixed = false;
            break;

          case CursorTypes.FOLLOW:
            this._isFollowFixed = false;
            TweenLite.set(C.GetBy.class("__target", item)[0] || item, {x: 0, y: 0, rotation:0});
            break;

          case CursorTypes.FOLLOWFIXED:
            this._isFollowFixed = false;
            TweenLite.set(C.GetBy.class("__target", item)[0] || item, {x: 0, y: 0, rotation:0});
            break;

          case CursorTypes.AXIS_X:
            this._isFollowFixed = false;
            break;
        }
      });
    }
  }

  static hide() {
    if(Basics.isReducedMotion) return;
    this.isEnabled = false;
    this._icon = null;
    this._arrow.backToDefault();
    this._follower.backToDefault();
    this._text.hide();
    this._iconDrag.hide();
    this._isFollowFixed = false;
  }


  static showAlpha() {
    this._arrow.backToDefault();
    this._follower.backToDefault();
  }

  static hideAlpha() {
    TweenLite.to(this._arrow, .3, {alpha: 0, strokeAlpha:0, ease: Quad.easeIn});
    TweenLite.to(this._follower, .3, {alpha: 0, strokeAlpha:0, ease: Quad.easeIn});
  }

  static getIcon(item) {
    let idIcon = typeof item === "string"? item : item.getAttribute("data-cursor-icon");

    if(idIcon) {
      if(this._icons[idIcon]) {
        if(this._hasIconEffect) {
          this._icons[idIcon].show();
        }
        return this._icons[idIcon];
      }
    }

    return null;
  }

  static getText(item) {
    return item.getAttribute("data-cursor-text") || "";
  }

  static loop() {
   // this.ctx.clearRect(0, 0, this.width, this.height);

    if(this._isEnabledMove) {
      if (!this._isFollowFixed) {
        this._follower.x = Maths.precission(this._follower._xabs + (Interaction.positions.mouse.x - this._follower._xabs) * this._follower._easing);
        this._follower.y = Maths.precission(this._follower._yabs + (Interaction.positions.mouse.y - this._follower._yabs) * this._follower._easing);
      } else {
        this._follower.x = Maths.precission(this._follower._xabs + (this._followerFixedPosition.x - this._follower._xabs) * this._follower._easing);
        this._follower.y = Maths.precission(this._follower._yabs + (this._followerFixedPosition.y - this._follower._yabs) * this._follower._easing);
      }

      this._arrow.x = Interaction.positions.mouse.x;
      this._arrow.y = Interaction.positions.mouse.y;
    }

    if(this._iconDrag.enabled) {
      this._iconDrag.draw();
    }

    if(this.loading) {
      this._iconLoading.draw();
    }

    this._follower.draw();
    this._arrow.draw();

    if(this._icon) {
      this._icon.x = Interaction.positions.mouse.x;
      this._icon.y = Interaction.positions.mouse.y;
      this._icon.draw();
    } else if(this._arrowIcon) {
      this._arrowIcon.x = Interaction.positions.mouse.x;
      this._arrowIcon.y = Interaction.positions.mouse.y;
      this._arrowIcon.draw();
    }

    if(this._text.text) {
      this._text.draw();
    }
  }

  static dragMode() {

  }

  static resize() {
    this.width = Interface.width;
    this.height = Interface.height;
  }
}

