class MediaObject {

  static TYPE_BG = "BG";
  static TYPE_IMG = "IMG";
  static TYPE_VIDEO = "VIDEO";
  static TYPE_VIDEO_COVER = "VIDEOCOVER";
  static TYPE_PIXI = "VIDEO";

  _showAtEnd;
  _showEffect;
  _type;

  id;
  item;
  aspectRatio;

  videoCanPlay = false;
  isLoaded = false;
  width;
  height;
  maxratio;


  isImportant = false;
  isStatic = false;

//==================================================================================================================
//          GETTER SETTER
//==================================================================================================================

  get src() {
    return this.prefix !== ""?
      this.item.getAttribute("data-src").split("@1x.").join(this.prefix + ".") :
      this.item.getAttribute("data-src");
  }

  get prefix() {
    let __size = Math.min(this.maxratio, Math.floor((this.item.offsetWidth * Sizes.RATIO)/this.width)*2);
    return __size > 1? "@" + __size + "x" : "";
  }

  get type() {
    return this._type;
  }

  get showEffect() { return this._showEffect; }
  set showEffect(__bol) {
    this._showEffect = __bol;

    if(this._showEffect) {
      this.item.style.opacity = 0;
    } /*else {
      if(this._showAtEnd) this.item.style.opacity = 1;
      else this.item.style.opacity = 0;
    }*/
  }
  get showAtEnd() { return this._showAtEnd; }
  set showAtEnd(__bol) {
    this._showAtEnd = __bol;
    //if(this._showAtEnd) this.item.style.opacity = 1;
    //else this.item.style.opacity = 0;
  }

//==================================================================================================================
//          CONSTRUCTOR
//==================================================================================================================

  constructor(__item, __showAtEnd = true, __showEffect = true, __type = MediaObject.TYPE_IMG) {
    this.item  =   __item;
    this.id = __item.getAttribute("id");
    this._type = __type;

    this.isImportant =   this.item.getAttribute("data-item-preload") !== undefined;
    this.isStatic =   this.item.getAttribute("data-item-static") !== undefined;

    if(__type !== MediaObject.TYPE_VIDEO) {
      this.showEffect = __showEffect;
      this.showAtEnd = this.isImportant || __showAtEnd;
    }

    if(__type !== MediaObject.TYPE_VIDEO) {
      //this.showEffect = this.item.getAttribute("data-show-effect") !== "false";
      //this.showAtEnd = this.item.getAttribute("data-show-end") !== "false";
    }

    if(this.item.getAttribute("data-mobile-src")) {
      this.width = this.item.getAttribute("data-mobile-width")? Number(this.item.getAttribute("data-mobile-width")) : Number(this.item.getAttribute("width"));
      this.height = this.item.getAttribute("data-mobile-height")? Number(this.item.getAttribute("data-mobile-height")) : Number(this.item.getAttribute("height"));
      this.maxratio = this.item.getAttribute("data-mobile-maxratio")? Number(this.item.getAttribute("data-mobile-maxratio")) : 0;
    } else {
      this.width = this.item.getAttribute("data-width")? Number(this.item.getAttribute("data-width")) : Number(this.item.getAttribute("width"));
      this.height = this.item.getAttribute("data-height")? Number(this.item.getAttribute("data-height")) : Number(this.item.getAttribute("height"));
      this.maxratio = this.item.getAttribute("data-maxratio")? Number(this.item.getAttribute("data-maxratio")) : 0;
    }

    this.aspectRatio = (this.height / this.width) * 100;

    //if(this.item.parentNode.classList.contains("media-holder")) {
    if(this.item.parentNode.classList.contains("__aspect-ratio")) {
      this.item.parentNode.style.setProperty('--aspect-ratio', `${this.aspectRatio}%`);
    }

    /*if(this.isImportant && __type !== MediaObject.TYPE_VIDEO) {
      this.showAtEnd = true;
      this.showEffect = false;
    }*/

    this.item.setAttribute("data-item-loaded", "");
    this.item.removeAttribute("data-item-preload");
    this.item.removeAttribute("data-item-load");
  }

//==================================================================================================================
//          PUBLIC
//==================================================================================================================

  load(__callback = null) {
    if(__callback!=null)
      __callback();
  }

  setup(__callback = null) {
    this.isLoaded = true;
    this.item.removeAttribute("data-item-preload");
    this.item.removeAttribute("data-item-load");
    this.item.removeAttribute("data-src");

    if(__callback!=null)
      __callback();
  }
  dispose() {}
  show() {
    if(this.showEffect) {
      TweenLite.to(this.item, 1, {css: {opacity: 1}, ease: Power3.easeOut, force3D:true, onComplete:this.afterShow.bind(this)});
    }
  }

  afterShow() {
    if(this.item) {
      if(this.item.parentNode) {
        this.item.parentNode.classList.remove("__load_indicator");
      }
    }
  }

  loadVideo(__callback = null) {
    console.log("NO ES UN VIDEO")
  }
}


