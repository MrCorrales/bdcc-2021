const CSS = {
  transform: "",

  init: function() {
    this.transform = this.GetVendorPrefix(["transform", "msTransform", "MozTransform", "webkitTransform", "OTransform"]);
  },

  GetVendorPrefix: function(__array) {
    let tmp = document.createElement("div");
    let result = null;

    for (var i = 0; i < __array.length; i++) {
      if (typeof tmp.style[__array[i]] != 'undefined') {
        return result = __array[i];
      }
    }

    return result;
  },

  translate3D: function(x = 0, y = 0, z = 0) {
    return "translate3d(" + x + "px, " + y + "px, " + z + "px)";
  },

  scale3D : function(x = 1, y = 1, z = 1) {
    return "scale3D(" + x + ", " + y + ", " + z + ")";
  },

  getTranslate : function(el) {
    const translate = {}
    if(!window.getComputedStyle) return;

    const style = getComputedStyle(el);
    const transform = style.transform || style.webkitTransform || style.mozTransform;

    let mat = transform.match(/^matrix3d\((.+)\)$/);

    if(mat) {
      translate.x = (mat[1].split(', ')[12]);
      translate.y = (mat[1].split(', ')[13]);
      translate.z = (mat[1].split(', ')[14]);
      return translate;
    }

    mat = transform.match(/^matrix\((.+)\)$/);
    translate.x = mat ? parseFloat(mat[1].split(', ')[4]) : 0;
    translate.y = mat ? parseFloat(mat[1].split(', ')[5]) : 0;
    translate.z = mat ? parseFloat(mat[1].split(', ')[6]) : 0;



    return translate;
  }
};

CSS.init();