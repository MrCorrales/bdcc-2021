class Header extends _Header{

  static ON_SHOW = "HEADERSHOW";
  static ON_HIDE = "HEADERHIDE";
  static isBlocked = false;
  static showOnBack = true;
  static modActual;
  static mods = [];
  static multiplicatorY = .03;
  static multiplicatorBgY = .3;

  static set mode(__s) {
    if(__s === "INTRO") {
      this.multiplicatorY = .3;
      this.multiplicatorBgY = .3;
    } else {
      this.multiplicatorY = .03;
      this.multiplicatorBgY = .03;
    }

    super.yOffset = Metrics.HEIGHT * this.multiplicatorY;
  }

  static init() {
    super.yOffset = Metrics.HEIGHT * this.multiplicatorY;
    super.yBG = Metrics.HEIGHT * this.multiplicatorBgY;

    this.isBlocked = Basics.isReducedMotion;

    super.init();

    setTimeout(()=> {
      this.resetModificators();

      this.container.classList.remove("--loading-styles");

      let timerSidemenu = 0;
      EventDispatcher.addEventListener(Sidemenu.ON_SHOW, ()=> {
        clearTimeout(timerSidemenu)
        this.container.classList.add("--sidemenu-show");
      })
      EventDispatcher.addEventListener(Sidemenu.ON_HIDE, ()=> {
        setTimeout(()=> timerSidemenu = this.container.classList.remove("--sidemenu-show"), 500);
      })
    },100)
  }

  static resetModificators() {
    let lastY = 0;

    this.mods = [];
    if(this.modActual) this.container.classList.remove(this.modActual);
    this.modActual = null;

    C.Selector.forEach("[data-header-mod]", (el, i) => {
      const BOUNDS = el.getBoundingClientRect();

      ///PRIMERO
      /*if(this.mods.length === 0 && lastY !== 0) {
        this.mods.push({
          dom:el,
          y0:0,
          y1:lastY,
          mod:el.getAttribute("--default")
        });
      }
*/
      if(lastY !== -BOUNDS.top && lastY!== 0) {
        this.mods.push({
          dom:el,
          y0:lastY,
          y1:-BOUNDS.top + Scroll.y,
          mod:"--default"
        });
      }

      lastY = lastY - (BOUNDS.top + el.offsetHeight) + Scroll.y;

      this.mods.push({
        dom:el,
        y0:-BOUNDS.top + Scroll.y,
        y1:lastY,
        mod:el.getAttribute("data-header-mod")
      });
    });

    this.checkColor();
  }

  static show_block() {
    this.isBlocked = false;
    if(this.isShow) {
      this.show__effect();
    }
  }

  static hide_block() {
    this.isBlocked = true;
    this.hide__effect();
  }

  static show__effect(__delay = 0) {
    EventDispatcher.dispatchEvent(Header.ON_SHOW);

    gsap.killTweensOf(this.container);

    document.body.classList.remove("--header-hide");
    this.container.classList.remove("--disabled");
    if(Basics.isReducedMotion) {
      gsap.set(this.container,{alpha:1});
    } else {
      gsap.to(this.container,{alpha:1, ease:Power2.easeOut, duration:.4});
    }

  }

  static hide__effect() {
    EventDispatcher.dispatchEvent(Header.ON_HIDE);

    gsap.killTweensOf(this.container);
    document.body.classList.add("--header-hide");

    if(Basics.isReducedMotion) {
      this.container.classList.add("--disabled");
      gsap.set(this.container,{alpha:0});
    } else {
      gsap.to(this.container,{alpha:0, duration:.2, onComplete:()=> {
          this.container.classList.add("--disabled");
          this.container.classList.add("--with-bg");
          gsap.set(this.container,{alpha:1});
        }});
    }
  }

  static directHide() {
    this.isShow = false;
    //TweenLite.set(this.container,{y:-70, force3D:true});
  }

  static checkColor() {
    for(let i=0; i<this.mods.length; i++) {
      if(Scroll.y <= this.mods[i].y0 && Scroll.y >= this.mods[i].y1 && this.modActual !==  this.mods[i].mod) {
        if(this.modActual) this.container.classList.remove(this.modActual);
        this.modActual = this.mods[i].mod;
        this.container.classList.add(this.modActual);
        break;
      }
    }
  }

  static loop() {
    super.loop();

    if(Scroll.isScrolling) {
      if(-Scroll.y < this.yBG) {
        if(this.container.classList.contains("--with-bg")) {
          this.container.classList.remove("--with-bg");
        }
      } else {
        if(!this.container.classList.contains("--with-bg")) {
          //this.container.classList.add("--with-bg");
        }
      }

      this.checkColor();
    }
  }

  static resize() {
    super.yOffset = Metrics.HEIGHT * this.multiplicatorY;
    super.yBG = Metrics.HEIGHT * this.multiplicatorBgY;
    this.resetModificators();
    super.resize();
  }
}

