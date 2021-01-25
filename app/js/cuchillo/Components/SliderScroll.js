class SliderScroll {
  _container;
  _holder;
  _scroll;
  _scrollBar;
  _interaction;

  get size() {
    return this._container.offsetWidth + this._scroll.size;
  }

  constructor(__container, options = {}) {
    this._container = __container;
    this._holder = C.GetBy.class("__holder", __container)[0];

    this._scroll = new VScroll( {
      container:__container,
      axis:Scroll.AXIS_X,
      wheel:false,
      itemClass: SliderScroll__Item,
      easing: options.easing,
      smooth: options.smooth
    });

    if(options.hasScrollbar) {
      this._scrollBar = new Scrollbar(C.GetBy.class("scrollbar")[0]);
      this._scroll.setScrollbar(this._scrollBar);
      this._scrollBar.update(0);
    }
    this._scroll.addAll("[scroll-slider-item]");
    this._scroll.resize();
    this._scroll.start();

    if(!options.interaction === false) {
      this._interaction = new MrInteraction(this._holder, {
        drag: true,
        axis: "x",
        dragCheckTime: .05,
        onMove: (n) => {
          if (options.onMove) options.onMove();
          this._scroll.move(n)
        },
        onDragStart: () => {
          if (options.onDragStart) options.onDragStart();
          for (let i = 0; i < this._scroll.total_items; i++) {
            this._scroll._items[i].mouseDown();
          }
        },
        onDragEnd: () => {
          if (options.onDragEnd) options.onDragEnd();
          for (let i = 0; i < this._scroll.total_items; i++) {
            this._scroll._items[i].mouseUp();
          }
        }
      });
    }
  }

  goto_percetage(__p, __isDirect) {
    this._scroll.goto_percetage(__p, __isDirect);
  }

  loop() {
    this._scroll.loop();
  }

  resize() {
    this._scroll.resize();
  }

  dispose() {
    this._scroll.dispose();
    if(this._interaction) {
      this._interaction.dispose();
    }
    if(this._scrollBar) {
      this._scrollBar.dispose();
    }
  }
}

class SliderScroll__Item extends VScroll_Item {
  _figure;
  _image;

  _size;
  _sizePress;

  _isDragging = false;
  _isDragged = false;
  _firstShow = true;

  isVoid = false;

//==================================================================================================================
//          CONSTRUCTOR
//==================================================================================================================

  constructor(__link, __index, __scroller) {
    super(__link, __index, __scroller);

    this.isVoid = C.GetBy.selector("img", this._item).length === 0;

    if(!this.isVoid) {
      this._image = C.GetBy.selector("img", this._item)[0];
      this._figure = C.GetBy.selector("figure", this._item)[0];
      this.resize();
    }
  }

//==================================================================================================================
//          PUBLIC
//==================================================================================================================

  mouseOver() {
    if(!this.isVoid) {
      TweenLite.to(this._figure, 0.8, {
        clip: this._sizeHover,
        ease: C.Ease.EASE_CUCHILLO_IN_OUT
      });
    }
  }

  mouseDown() {
    if(!this.isVoid) {
      TweenLite.to(this._figure, 0.8, {
        clip: this._sizePress,
        ease: C.Ease.EASE_CUCHILLO_IN_OUT
      });
      this._isDragging = true;
      this._isDragged = true;
    }
  }

  mouseUp() {
    if(!this.isVoid) {

      TweenLite.to(this._figure, 2, {
        clip: this._size,
        ease: Expo.easeOut
      });
      this._isDragging = false;

      this._isDragged = false;
    }
  }

  show() {
    super.show();
  }

  hide() {
    super.hide();
  }

  loop() {

  }

  resize() {
    if(!this.isVoid) {
      const wI = this._image.getAttribute("width") || this._image.getAttribute("data-width");
      const hI = this._image.getAttribute("height") || this._image.getAttribute("data-height");
      const scale = this.height/hI;
      const w = wI * scale;
      const h = hI * scale;

      this._size = Functions.getRect(w * .0, h * .0, w * 1, h * 1);
      this._sizePress = Functions.getRect(w * .05, h * .05, w * .9, h * .9);

      this._item.style.width = w + "px";
      this._figure.style.clip = this._size;
    }

    super.resize();
  }
}