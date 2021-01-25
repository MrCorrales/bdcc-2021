class _Header {

  static container = C.GetBy.id("Header");
  static y = 0;
  static yOffset = 100;
  static height;

  static isShow = true;
  static isBlocked = false;
  static showOnBack = true;
  static actualPalette = null;
  static actualCSSPalette = null;

  static changePalette(__color = "") {
    if (this.actualCSSPalette) {
      this.container.classList.remove(this.actualCSSPalette);
    }

    switch (__color) {
      case Colors.WHITE:
        this.actualCSSPalette = "palette-white";
        break;

      case Colors.PRIMARY:
        this.actualCSSPalette = "palette-primary";
        break;

      case Colors.SECONDARY:
        this.actualCSSPalette = "palette-secondary";
        break;

      case Colors.ASSERTIVE:
        this.actualCSSPalette = "palette-assertive";
        break;

      case Colors.DARK:
        this.actualCSSPalette = "palette-dark";
        break;

      default:
        this.actualCSSPalette = "";
        break;
    }

    this.actualPalette = __color;
    if (this.actualCSSPalette) {
      this.container.classList.add(this.actualCSSPalette);
    }
  }

  static init() {
    this.height = this.container.offsetHeight;
  }

  static directShow() {
    this.isShow = true;
    TweenLite.set(this.container,{y:0, force3D:true});
  }

  static show() {
    if(!this.isShow) {
      this.isShow = true;
      this.show__effect();
    }
  }

  static show__effect() {
    this.container.style.opacity = "1";
  }

  static directHide() {
    this.isShow = false;
    this.container.style[CSS.transform] = CSS.translate3D(0, this.height, 0);
  }

  static hide() {
    if(this.isShow) {
      this.isShow = false;
      this.hide__effect();
    }
  }

  static hide__effect() {
    this.container.style.opacity = "0";
  }

  static resize() {
    this.height = this.container.offsetHeight;
  }

  static loop() {
    if(Scroll.isScrolling && !this.isBlocked) {
      if(-Scroll.y < this.height + this.yOffset || Scroll.direction === -1 && this.showOnBack) {
        this.show();
      } else {
        this.hide();
      }
    }
  }
}

