class ScrollItem__Intro extends VScroll_Item {

  _logo = C.GetBy.class("section-intro__logo")[0];
  _headerTitle = C.GetBy.class("header__title")[0];
  _ul = C.GetBy.class("section-intro__ul")[0];
  _logoHeight;
  _offsetMargin;

  constructor(__link, __index, __scroller) {
    super(__link, __index, __scroller);

    if(Basics.isReducedMotion || Basics.isTouch) return;

    this.onShow = () => {

    };
    this.onHide = () => {

    };
    this.onMove = (__pos, __size) => {
      const heightTo = this._logoHeight + (__pos.y + this._offsetMargin);
      const scaleTo = Math.max(0, Math.min(1, heightTo / this._logoHeight));
      const ALPHA = Math.max(0, Math.min(1, Maths.normalize(.4, .3, scaleTo)));
      const LOGO = Math.max(0, Math.min(1, Maths.normalize(.4, .1, scaleTo)));

      this._logo.style[CSS.transform] = CSS.scale3D(scaleTo, scaleTo, 1);
      this._logo.style.opacity = ALPHA;
      //this._headerTitle.style.setProperty('--logo-progress', LOGO);
    }

    Header.mode = "INTRO";
  }

  dispose() {
    Header.mode = "NONE";
    super.dispose();
  }

  resize(w,h) {

    this._logo.style[CSS.transform] = CSS.scale3D(1, 1, 1);

    this._logoHeight = this._logo.offsetHeight;
    this._offsetMargin =  this._ul.offsetTop - (Header.height + this._logoHeight) + Metrics.HEIGHT * .1
    super.resize(w,h)
  }
}

Scroll._addClass("intro", ScrollItem__Intro);