class ScrollItem__GraficaICSS extends VScroll_Item {

  _domHeader;

  constructor(__link, __index, __scroller) {
    super(__link, __index, __scroller);

    this._domHeader = C.GetBy.selector("header", this.item)[0];

    this.onShow = () => {

    };
    this.onHide = () => {

    };
    var hasBorder = false;
    this.onMove = (__position) => {
      if(this.realY <= 0 && !hasBorder) {
        hasBorder = true
        this._domHeader.classList.add("--with-border");
      } else if(this.realY > 0 && hasBorder) {
        hasBorder = false
        this._domHeader.classList.remove("--with-border");
      }
    };
  }

  dispose() {
    super.dispose();
  }

  resize(w,h) {
    super.resize(w,h);
  }
}

Scroll._addClass("grafica-icss", ScrollItem__GraficaICSS);