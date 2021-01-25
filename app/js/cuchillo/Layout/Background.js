class _BG {
  static container = document.body;
  static actualPalette = null;
  static actualCSSPalette;
  static actual = null;

  static loop() {}

  static changePaletteDirect(__color, __call = null) {
    if (this.actualCSSPalette !== null) {
      document.body.classList.remove(this.actualCSSPalette);
    }

    let cssColor;

    switch (__color) {
      case Colors.BLACK:
        this.actualCSSPalette = "palette-black";
        cssColor = ColorsCSS.BLACK;
        break;

      case Colors.WHITE:
        this.actualCSSPalette = "palette-white";
        cssColor = ColorsCSS.WHITE;
        break;

      case Colors.PRIMARY:
        this.actualCSSPalette = "palette-primary";
        cssColor = ColorsCSS.PRIMARY;
        break;

      case Colors.SECONDARY:
        this.actualCSSPalette = "palette-secondary";
        cssColor = ColorsCSS.SECONDARY;
        break;

      case Colors.LIGHT:
        this.actualCSSPalette = "palette-light";
        cssColor = ColorsCSS.LIGHT;
        break;

      case Colors.ASSERTIVE:
        this.actualCSSPalette = "palette-assertive";
        cssColor = ColorsCSS.ASSERTIVE;
        break;

      case Colors.DARK:
        this.actualCSSPalette = "palette-dark";
        cssColor = ColorsCSS.DARK;
        break;
    }

    this.actualPalette = __color;
    document.body.classList.add(this.actualCSSPalette);
    this.changeBG(cssColor, true, __call);
  }

  static changePalette(__color, __call = null, __time = null, __ease = null) {
    if(this.actualPalette !== __color) {
      if (this.actualCSSPalette !== null) {
        document.body.classList.remove(this.actualCSSPalette);
      }

      let cssColor;

      switch (__color) {
        case Colors.BLACK:
          this.actualCSSPalette = "palette-black";
          cssColor = ColorsCSS.BLACK;
          break;

        case Colors.WHITE:
          this.actualCSSPalette = "palette-white";
          cssColor = ColorsCSS.WHITE;
          break;

        case Colors.PRIMARY:
          this.actualCSSPalette = "palette-primary";
          cssColor = ColorsCSS.PRIMARY;
          break;

        case Colors.SECONDARY:
          this.actualCSSPalette = "palette-secondary";
          cssColor = ColorsCSS.SECONDARY;
          break;

        case Colors.LIGHT:
          this.actualCSSPalette = "palette-light";
          cssColor = ColorsCSS.LIGHT;
          break;

        case Colors.ASSERTIVE:
          this.actualCSSPalette = "palette-assertive";
          cssColor = ColorsCSS.ASSERTIVE;
          break;

        case Colors.DARK:
          this.actualCSSPalette = "palette-dark";
          cssColor = ColorsCSS.DARK;
          break;
      }

      this.actualPalette = __color;
      document.body.classList.add(this.actualCSSPalette);
      this.changeBG(cssColor, false, __call, __time, __ease);
    } else if(__call) {
      __call();
    }
  }

  static changeBG(__color, __isDirect = false, __call = null, __time = .3, __ease = Quad.easeOut) {
    if(this.actual !== __color) {
      this.actual = __color;

      if(__isDirect) {
        gsap.set(this.container,{backgroundColor:__color});
        if(__call) __call();
      } else {
        gsap.to(this.container, {backgroundColor:__color, duration:__time, ease: __ease, onComplete:()=>{if(__call) __call();}});

      }
    }

  /*  if(next !== this.actualBG) {
      if (this.actualBG != null) {
        if(!__isDirect) {
          TweenLite.to(this.actualBG, 0.3, {alpha: 0, ease: Quad.easeOut});
        } else {
          TweenLite.set(this.actualBG, {alpha: 0});
        }
      }

      this.actualBG = next;


      if(!__isDirect) {
        TweenLite.to(this.actualBG, 0.3, {alpha: 1, ease: Quad.easeIn, onComplete:()=>{if(__call) __call();}});
      } else {
        TweenLite.set(this.actualBG, {alpha: 1});
      }
    }*/
  }
}


