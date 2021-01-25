const Functions = {
  getSizePrefix: function(__size) {
    var _prefix = "xlarge";

    if(__size == 0 || __size == undefined) __size = Metrics.WIDTH_INSIDE;

    if(__size <= 480)         _prefix = "small";
    else if(__size <= 780)    _prefix = "medium";
    else if(__size <= 1200)   _prefix = "large";
    else if(__size > 1200)    _prefix = "xlarge";

    return _prefix;
  },

  fullHeight: function(__holder, __h) {
    __holder.css("height", __h + "px");
  },

  fullHeightPadding: function(__holder, __h) {
    __holder.css("padding-top", __h + "px");
  },

  minfullHeight: function(__holder,  __h) {
    __holder.css("height", "auto");
    var n = Math.max(__holder.outerHeight(), __h);
    __holder.css("height", n + "px");
  },


  fulHeightIfNeccesary: function(__holder, __h, __content = null, __padding = 0) {
    var n = Math.max(__holder.children().innerHeight() + __padding*2, __h);
    __holder.css("height", n + "px");

    if(__content!=null) {
      var y = ((n - __padding * 2) - __content.innerHeight()) / 2;
      __content.css({
        '-webkit-transform': 'translateY(' + y + 'px)',
        '-moz-transform': 'translateY(' + y + 'px)',
        '-ms-transform': 'translateY(' + y + 'px)',
        '-o-transform': 'translateY(' + y + 'px)',
        'transform': 'translateY(' + y + 'px)'
      });
    }
  },

  fitCover: function(__item,__wReal, __hReal, __wDestino, __hDestino, __offset=0) {
    const scale = Math.max((__wDestino+__offset)/__wReal, (__hDestino+__offset)/__hReal);
    const w			=	__wReal*scale;
    const h			=	__hReal*scale;

    __item.style.width = w + "px";
    __item.style.height = h + "px";

    let left        =   0;
    let top         =   0;

    switch(__item.getAttribute( "data-align" )) {
      case "C":
        left		=	(__wDestino-w)/2;
        __item.style.left = Math.round(left) + "px";
        break;
      case "L":
        left		=	0;
        __item.style.left = "0px";
        break;
      case "R":
        __item.style.right = "0px";
        break;
      default:
        left		=	(__wDestino-w)/2;
        __item.style.left = Math.round(left) + "px";
    }

    switch(__item.getAttribute( "data-v-align" )) {
      case "C":
        top			=	(__hDestino-__offset - h)/2;
        __item.style.top = Math.round(top) + "px";
        break;
      case "T":
        top			=	0;
        __item.style.top = "0px";
        break;
      case "B":
        __item.style.bottom = "0px";
        break;
      default:
        top			=	(__hDestino-__offset - h)/2;
        __item.style.top = Math.round(top) + "px";
    }
  },

  fitInside: function(__item,
                      __width,
                      __height,
                      __realWidth,
                      __realHeight,
                      __insideWidth,
                      __insideHeight,
                      __align = "C",
                      __valign = "C") {

    var left        =   0;
    var top         =   0;
    var s           =   Math.min(__width/__realWidth,__height/__realHeight);
    var w			=	__realWidth*s;
    var h			=	__realHeight*s;

    switch(__align) {
      case "C":
        left		=	(__insideWidth - w)/2;
        break;
      case "L":
        left		=	0;
        break;
      case "R":
        left		=	(__insideWidth - w);
        break;
    }

    switch(__valign) {
      case "C":
        top			=	(__insideHeight - h)/2;
        break;
      case "T":
        top			=	0;
        break;
      case "B":
        top			=	(__insideHeight - h);
        break;
    }

    __item.style.width = w + "px";
    __item.style.height = h + "px";

    /*__item.css({
      width:w + "px",
      height:h + "px",
      top:top + "px",
      left:left + "px",
    });*/
  },


//==================================================================================================================
//          DIVS
//==================================================================================================================

  getSelector: function(__item) {
    var selector = __item
      .parents()
      .map(function() { return this.tagName; })
      .get()
      .reverse()
      .concat([__item[0].nodeName])
      .join(">");

    var id = __item.attr("id");
    if (id) {
      selector += "#"+ id;
    }

    var classNames = __item.attr("class");
    if (classNames) {
      selector += "." + $.trim(classNames).replace(/\s/gi, ".");
    }

    return selector;
  },

  getId(__item) {
    if(!__item.getAttribute("id")) {
      __item.setAttribute("id", "__" + new Date().getTime());
    }

    return __item.getAttribute("id");
  },

  doMrCorrales: function() {
    console.log('⟶ http://cuchillo.studio');
    console.log('⟶ https://www.instagram.com/_cuchillo');
    console.log('⟶ https://www.facebook.com/somoscuchillo');
    console.log('⟶ https://www.behance.net/cuchillo');
    console.log('');
    console.log('TweenLite & TimelineLite by Greenshock');
    console.log('⟶ https://greensock.com');
    console.log('');
    console.log('PixiJS 5.0.3');
    console.log('⟶ https://www.pixijs.com');
    console.log('');
    console.log('SVGOMG');
    console.log('⟶ https://jakearchibald.github.io/svgomg/');
    console.log('');
    console.log('Favicon Generator');
    console.log('⟶ https://realfavicongenerator.net');
    console.log('');
    console.log('Against Refresh Font');
    console.log('⟶ http://www.onlinewebfonts.com');
  },

  copyToClipboard: function(str) {
    const el = document.createElement('textarea');
    el.value = str;
    el.setAttribute('readonly', '');
    el.style.position = 'absolute';
    el.style.left = '-9999px';
    document.body.appendChild(el);
    el.select();
    document.execCommand('copy');
    document.body.removeChild(el);
  },

  /*loadImage(__item:JQuery, __src: string): Promise<any> {
      return new Promise((resolve,reject)=>{
          __item.attr("src", __src).load(()=>{
             resolve();
          });
      });
  }

  loadPoster(__item:JQuery, __src: string): Promise<any> {
      return new Promise((resolve,reject)=>{
          __item.attr("poster", __src).load(()=>{
              resolve();
          });
      });
  }*/


  url2Id: function(__url) {
    var id = "index";

    if(__url.charAt(__url.length-1) == "/") __url = __url.slice(0, __url.length-1);

    let _n;

    if(Basics.mainLang !== Basics.language) {
      _n = __url.indexOf("/" + Basics.language + "/");
    } else {

      _n = __url.lastIndexOf("/");
    }

    if(_n >= 0) id =  __url.slice(_n, __url.length).split("/").join("").split(".").join("");
    else id = __url.split(".").join("");

    return id;
  },

  getRect: function(x0, y0, x1, y1) {
    return "rect(" + y0 + "px " + x1 + "px " + y1 + "px " + x0 + "px)"
  },

  clone: function(obj) {
    if (null == obj || "object" != typeof obj) return obj;
    var copy = obj.constructor();
    for (var attr in obj) {
      if (obj.hasOwnProperty(attr)) copy[attr] = obj[attr];
    }
    return copy;
  },


  arrayRandom: function(__array) {
    return __array.sort(function() {return Math.random() - 0.5});
  },

  //COLORS
  hexToRgb: function(hex) {
    if(hex) {
      var shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
      hex = hex.toString().replace(shorthandRegex, function (m, r, g, b) {
        return r + r + g + g + b + b;
      });

      var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
      return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
      } : null;
    } else {
      return null;
    }
  },

  hexToCSS: function(hex, alpha = 1) {
    const rgb = this.hexToRgb(hex);
    return "rgba(" + rgb.r + ", " + rgb.g + ", " + rgb.b + ", " + alpha + ")";
  },

  decToCSS: function(hex) {
    return "#" + hex.toString(16);
  },

  rgbToCSS: function(rgb, alpha = 1) {
    return "rgba(" + rgb.r + ", " + rgb.g + ", " + rgb.b + ", " + alpha + ")";
  },

  decimalColorToHTMLcolor: function (integer) {
    let number = (+d).toString(16).toUpperCase()
    if( (number.length % 2) > 0 ) { number= "0" + number }
    return number
  },

getOffsetLeft: function ( elem ) {
    var top = elem.offsetTop;
    do {
      if ( !isNaN( elem.offsetTop ) ) {
        top += elem.offsetTop;
      }
    } while( elem = elem.offsetTop );
    return top;
  }
};

