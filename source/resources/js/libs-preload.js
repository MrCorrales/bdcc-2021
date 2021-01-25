"use strict";

var C = {}; //module.exports = Core;;"use strict";

var _isMobile = !!navigator.userAgent.match(/iPhone|iPad|iPod/i) || navigator.userAgent.match(/Android/i) || navigator.userAgent.match(/Opera Mini/i) || navigator.userAgent.match(/IEMobile/i);

var _isSafari = navigator.userAgent.indexOf('Safari') != -1 && navigator.userAgent.indexOf('Chrome') == -1;

var Basics = {
  id: "",
  cdn: "",
  language: document.documentElement.lang,
  mainLang: "es",
  isDebug: false,
  idProject: null,
  hasCookies: true,
  isPortrait: false,
  isMobile: _isMobile,
  isSmartphone: _isMobile && window.innerWidth <= 600,
  isTouch: 'ontouchstart' in window || navigator.maxTouchPoints > 0 || navigator.msMaxTouchPoints > 0,
  isReducedMotion: false,
  isSafari: _isSafari,
  cookiesAccepted: false,
  clickEvent: false,
  downEvent: false,
  upEvent: false,
  moveEvent: false,
  mouseOver: false,
  mouseOut: false,
  velocidad: 0,
  velocidadAux: 0
};
var mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
Basics.isReducedMotion = mediaQuery.matches;

try {
  mediaQuery.addEventListener('change', function () {
    location.reload();
  });
} catch (e1) {
  try {
    // Safari
    mediaQuery.addListener(function (e) {
      location.reload();
    });
  } catch (e2) {
    console.error(e2);
  }
}

if (!Basics.isTouch) {
  document.body.classList.add("__cursor");
  Basics.clickEvent = "click";
  Basics.downEvent = "mousedown";
  Basics.upEvent = "mouseup";
  Basics.moveEvent = "mousemove";
  Basics.mouseOver = "mouseover";
  Basics.mouseOut = "mouseout";
} else {
  document.body.classList.add("__touch");
  Basics.clickEvent = "click";
  Basics.downEvent = "touchstart";
  Basics.upEvent = "touchend";
  Basics.moveEvent = "touchmove";
  Basics.mouseOver = "touchstart";
  Basics.mouseOut = "touchend";
}

if (Basics.isMobile) document.body.classList.add("__mobile");
console.log("Basics.isMobile " + Basics.isMobile);;"use strict";

var Colors = {
  WHITE: 0xFFFFFF,
  BLACK: 0x010111,
  PRIMARY: 0xFFFF00,
  LIGHT: 0xEEF6FF,
  SECONDARY: 0xe4e4e4,
  DARK: 0x16000a,
  ASSERTIVE: 0xF5DA9E,
  NEGATIVE: 0x73fbfd,
  FACEBOOK: 0x3b5998,
  TWITTER: 0x55acee,
  YOUTUBE: 0xff0000,
  LINKEDIN: 0x007bb5,
  WHATSAPP: 0x4dc247,
  PINTEREST: 0xcb2027
};
var ColorsCSS = {
  WHITE: "#FFFFFF",
  BLACK: "#010111",
  PRIMARY: "#FFFF00",
  LIGHT: "#EEF6FF",
  SECONDARY: "#E4E4E4"
};;"use strict";

C.Ease = {
  EASE_CUCHILLO_IN_OUT: "EASE_CUCHILLO_IN_OUT",
  EASE_CUCHILLO_OUT: "EASE_CUCHILLO_OUT",
  EASE_IN_OUT: "EASE_IN_OUT",
  EASE_IN_OUT2: "EASE_IN_OUT2",
  init: function init() {
    //EASE
    CustomEase.create(this.EASE_CUCHILLO_IN_OUT, "M0,0 C0.5,0 0.1,1 1,1");
    CustomEase.create(this.EASE_CUCHILLO_OUT, "M0,0c0.2,0.6,0.1,1,1,1");
    CustomEase.create(this.EASE_IN_OUT, ".76,0,.32,.99");
    CustomEase.create(this.EASE_IN_OUT2, ".46,.06,.56,.9");
  }
};;"use strict";

var Fonts = {
  TOTAL: 0,
  FONTS: {
    families: [],
    urls: [document.getElementById("__appFONTS").getAttribute("href")]
  }
};;"use strict";

var CDN = document.body.getAttribute("data-cdn");
var Paths = {
  ASSETS: CDN + "/assets/",
  IMAGES: CDN + "/assets/images/",
  TEXTURES: CDN + "/assets/textures/",
  VIDEOS: CDN + "/assets/videos/",
  SVG: CDN + "/assets/svg/"
};;"use strict";

var Sizes = {
  RATIO: window.devicePixelRatio,
  RATIO_CANVAS: window.devicePixelRatio,
  SMARTPHONE: 480,
  TABLET_PORTRAIT: 768,
  TABLET_LANDSCAPE: 1024,
  DESKTOP: 1174,
  LARGE_SCREEN: 1400
};
var Metrics = {
  set WIDTH(n) {
    this._WIDTH = n;
  },

  get WIDTH() {
    return this._WIDTH;
  },

  set HEIGHT(n) {
    this._HEIGHT = n;
  },

  get HEIGHT() {
    return this._HEIGHT;
  },

  _WIDTH: window.innerWidth,
  _HEIGHT: window.innerHeight,
  CENTER_X: 0,
  CENTER_Y: 0,
  WIDTH_INSIDE: 0,
  HEIGHT_INSIDE: 0,
  SCROLL_WIDTH: 0,
  HEIGHT_SCROLL: 0,
  FONT_SIZE: 16,
  isSmartphone: function isSmartphone() {
    return Basics.isMobile && window.innerWidth <= Sizes.SMARTPHONE;
  },
  update: function update() {
    var _this = this;

    var __first = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;

    this.WIDTH = window.innerWidth;
    this.HEIGHT = window.innerHeight;
    var VH = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', "".concat(VH, "px"));
    Basics.isPortrait = this.HEIGHT > this.WIDTH;

    if (__first) {
      this.WIDTH_INSIDE = this.WIDTH;
      this.SCROLL_WIDTH = this.WIDTH_INSIDE - this.WIDTH;
      window.addEventListener("resize", function () {
        clearTimeout(_this._idTimer);
        _this._idTimer = setTimeout(function () {
          Metrics.update();
        }, 100);
      });

      if (Basics.isMobile) {
        window.addEventListener(Basics.isMobile ? "orientationchange" : "resize", function () {
          clearTimeout(_this._idTimer);
          _this._idTimer = setTimeout(function () {
            Metrics.update();
          }, 100);
        });
      }
    } else {
      this.WIDTH_INSIDE = this.WIDTH - this.SCROLL_WIDTH;
    }

    this.CENTER_X = this.WIDTH_INSIDE / 2;
    this.CENTER_Y = this.HEIGHT / 2;

    if (!__first) {
      this.fitHeight();
      this.fitContain();
      this.fitCover();
      Main.resize();
    }

    var limit = 1400 * 900;
    var pixels = Metrics.WIDTH * Metrics.HEIGHT; //Sizes.RATIO_CANVAS = Math.min(window.devicePixelRatio, Math.max(1,Maths.precission((limit * window.devicePixelRatio)/pixels,1)));

    this.FONT_SIZE = parseFloat(getComputedStyle(document.documentElement).fontSize);
  },
  fitHeight: function fitHeight() {
    var items = C.GetBy.selector("[fit-height]");

    for (var i = 0, j = items.length; i < j; i++) {
      var item = items[i];
      item.style.height = Metrics.HEIGHT + "px";
    }
  },
  fitCover: function fitCover() {
    var items = C.GetBy.selector("[fit-cover]");

    for (var i = 0, j = items.length; i < j; i++) {
      var item = items[i];
      Functions.fitCover(item, Number(item.getAttribute("width")) || Number(item.getAttribute("data-width")), Number(item.getAttribute("height")) || Number(item.getAttribute("data-height")), item.parentNode.offsetWidth, item.parentNode.offsetHeight, Number(item.getAttribute("data-fit-offset")) || 0);
    }
  },
  fitContain: function fitContain() {
    var items = C.GetBy.selector("[fit-contain]");

    for (var i = 0, j = items.length; i < j; i++) {
      var item = items[i];
      var w = Number(item.getAttribute("width")) || Number(item.getAttribute("data-width"));
      var h = Number(item.getAttribute("height")) || Number(item.getAttribute("data-height"));
      var parentW = item.parentNode.offsetWidth;
      var parentH = item.parentNode.offsetHeight;
      var padding = Number(item.getAttribute("data-fit-offset")) || 0;
      Functions.fitInside(item, parentW - padding, parentH - padding, w, h, parentW, parentH, item.getAttribute("data-align") || "C", item.getAttribute("data-valign") || "C");
    }
  },
  parseSize: function parseSize(__s) {
    var __target = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;

    if (!__s) return null;
    var size = parseFloat(__s);
    var mult = 1;

    if (!isNaN(__s)) {
      mult = 1;
    } else if (__s.indexOf("rem") > -1) {
      mult = this.FONT_SIZE;
    } else if (__s.indexOf("vw") > -1) {
      mult = Metrics.WIDTH;
    } else if (__s.indexOf("vh") > -1) {
      mult = Metrics.HEIGHT;
    } else if (__s.indexOf("px") > -1) {
      mult = 1;
    } else if (__s.indexOf("x") > -1) {
      mult = __target ? __target.offsetWidth : 1;
    } else if (__s.indexOf("y") > -1) {
      mult = __target ? __target.offsetHeight : 1;
    }

    return size * mult;
  }
};;"use strict";

var Analytics = {
  isEnabled: false,
  init: function init() {
    var s, t;
    s = document.createElement('script');
    s.type = 'text/javascript';
    s.src = Basics.cdn + '/resources/dist/analytics.js';

    s.onload = s.onreadystatechange = function () {
      if (!Analytics.isEnabled && (!this.readyState || this.readyState == 'complete')) {
        Analytics.isEnabled = true;
      }
    };

    t = document.getElementsByTagName('script')[0];
    t.parentNode.insertBefore(s, t);

    if (Main.hasTagManager) {
      var _s, _t;

      _s = document.createElement('script');
      _s.type = 'text/javascript';
      _s.src = Basics.cdn + '/resources/dist/analytics-tag-manager.js';

      _s.onload = _s.onreadystatechange = function () {};

      _t = document.getElementsByTagName('script')[0];

      _t.parentNode.insertBefore(_s, _t);
    }
  },
  sendUrl: function sendUrl(__url, __title) {
    if (this.isEnabled) {
      ga('set', {
        page: __url,
        title: __title
      });
      ga('send', 'pageview');

      if (Basics.isDebug) {
        console.log('send', 'pageview', __url, __title);
      }
    }
  },
  sendEvent: function sendEvent(__data) {
    if (this.isEnabled) {
      var data = __data.split(",");

      ga('send', 'event', data[0] ? data[0] : '', data[1] ? data[1] : '', data[2] ? data[2] : '');

      if (Basics.isDebug) {
        console.log('send', 'event', data[0] ? data[0] : 'x', data[1] ? data[1] : 'x', data[2] ? data[2] : 'x');
      }
    }
  }
};;"use strict";

C.Engine = {
  active: false,
  animate: function animate() {
    if (!this.active) return;
    Main.loop();
    requestAnimationFrame(this.animate.bind(this));
  },
  start: function start() {
    this.active = true;
    requestAnimationFrame(this.animate.bind(this));
  },
  stop: function stop() {
    Engine.active = false;
  }
};;"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var Interaction = {
  _idTimer: 0,
  positions: {
    old: {
      x: 0,
      y: 0
    },
    mouse: {
      x: 0,
      y: 0
    },
    click: {
      x: 0,
      y: 0
    },
    up: {
      x: 0,
      y: 0
    }
  },
  isDragging: false,
  isDragged: false,
  options: {},
  init: function init() {
    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    this.setOptions(options);

    this._click();

    if (this.options.drag) {
      this._down();

      this._up();
    }

    if (this.options.drag || this.options.ajax || this.options.hasMove) {
      this._move();
    }

    this.positions.mouse.x = Metrics.CENTER_X;
    this.positions.mouse.y = Metrics.CENTER_Y;
  },
  setOptions: function setOptions() {
    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    this.options = {
      ajax: options.ajax || false,
      drag: options.drag || false,
      hasMove: options.hasMove || false,
      dragIntensity: options.dragIntensity || .1,
      dragCheckTime: options.dragCheckTime * 1000 || 100,
      maxDrag: 4 || Metrics.WIDTH,
      pixelsCheck: options.pixelsCheck || 5,
      onMove: options.onMove || function (n) {
        Scroll.isScrolling = true;
        Scroll.move(n);
      },
      onMouseDown: options.onMouseDown || null,
      onMouseUp: options.onMouseUp || null,
      onDragStart: options.onDragStart || null,
      onDragEnd: options.onDragEnd || null
    };
  },
  _doDragMove: function _doDragMove() {
    var __lastMove = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;

    var axis = Scroll.axis.toLowerCase();
    this.positions.mouse.distance = this.positions.mouse[axis] - this.positions.old[axis];
    this.positions.mouse.speed = Math.min(this.options.maxDrag, Math.max(1, Math.abs(this.positions.mouse.distance) * this.options.dragIntensity));

    if (Math.abs(this.positions.mouse[axis] - this.positions.click[axis]) > this.options.pixelsCheck && !__lastMove) {
      this.isDragged = true;
    }

    this.options.onMove(this.positions.mouse.distance * this.positions.mouse.speed);
  },
  _move: function _move() {
    var _this = this;

    document.addEventListener(Basics.moveEvent, function (e) {
      _this.positions.mouse = {
        x: e.clientX,
        y: e.clientY
      };

      if (_this.isDragging) {
        _this._doDragMove();
      } else {
        switch (e.target.tagName.toLowerCase()) {
          case "a":
            //NOT ANCHOR
            if (_this.options.ajax && e.target.getAttribute("href").slice(0, 1) !== "#" && e.target.getAttribute("href").indexOf("mailto") < 0 && e.target.getAttribute("href").indexOf("tel") < 0 && e.target.getAttribute("target") !== '_blank' && e.target.getAttribute("data-internal") == null) {
              e.preventDefault();
              ControllerPage.preloadPage(e.target.getAttribute("href"));
            }

            break;
        }
      }

      _this.positions.old = _this.positions.mouse;
    });
  },
  _down: function _down() {
    var _this2 = this;

    document.addEventListener(Basics.downEvent, function (e) {
      _this2.positions.click = {
        x: e.clientX,
        y: e.clientY
      };

      if (_this2.options.drag) {
        _this2._idTimer = setTimeout(function () {
          _this2.isDragging = true;
          if (_this2.options.onDragStart) _this2.options.onDragStart();
        }, _this2.options.dragCheckTime);
      }

      if (_this2.options.onMouseDown) {
        _this2.options.onMouseDown();
      }
    });
  },
  _up: function _up() {
    var _this3 = this;

    document.addEventListener(Basics.upEvent, function (e) {
      clearInterval(_this3._idTimer);
      _this3.positions.up = {
        x: e.clientX,
        y: e.clientY
      };

      if (_this3.isDragging) {
        _this3.isDragging = false;
        if (_this3.options.onDragEnd) _this3.options.onDragEnd();
        setTimeout(function () {
          _this3.isDragged = false;
        }, 100);
      }

      if (_this3.options.onMouseUp) {
        _this3.options.onMouseUp();
      }
    });
  },
  _click: function _click() {
    var _this4 = this;

    document.addEventListener(Basics.clickEvent, function (e) {
      if (_this4.isDragged) {
        e.preventDefault();
      } else {
        switch (e.target.tagName.toLowerCase()) {
          case "a":
            //GMT
            if (e.target.getAttribute("data-gtm-event")) {} // dataLayer.push({'event': e.target.getAttribute("data-gtm-event")});
            //GA


            if (e.target.getAttribute("data-ga-event")) {
              Analytics.sendEvent(e.target.getAttribute("data-ga-event"));
            } //


            if (e.target.getAttribute("data-temp-value")) {
              Basics.tempValue = e.target.getAttribute("data-temp-value");
            } //


            if (e.target.getAttribute("data-toggle-sidemenu") !== null) {
              Sidemenu.toogleState();
            } //


            if (e.target.getAttribute("data-acordion-toogle") !== null) {
              e.preventDefault();
              Acordions.toggle(e.target);
            } //ANCHOR


            if (e.target.getAttribute("href").slice(0, 1) === "#") {
              e.preventDefault();
              Scroll.gotoAnchor(e.target.getAttribute("href").substring(1));
            } else if (e.target.getAttribute("data-back") !== null) {
              e.preventDefault();
              ControllerPage.back(e.target.getAttribute("href"));
            } else if (_this4.options.ajax && e.target.getAttribute("data-link-project")) {
              Basics.idProject = e.target.getAttribute("data-link-project");
              e.preventDefault();
              ControllerPage.changePage(e.target.getAttribute("href"));
            } else if (_this4.options.ajax && e.target.getAttribute("target") !== '_blank' && e.target.getAttribute("href").indexOf("mailto") < 0 && e.target.getAttribute("href").indexOf("tel") < 0 && e.target.getAttribute("data-internal") == null) {
              e.preventDefault();

              if (C.GetBy["class"]("__link-active").length > 0) {
                C.GetBy["class"]("__link-active")[0].classList.remove("__link-active");
              }

              e.target.classList.add("__link-active");
              var HISTORY_TYPE = e.target.getAttribute("data-history") || "push";
              ControllerPage.changePage(e.target.getAttribute("href"), HISTORY_TYPE);
            }

            break;

          case "button":
            //GMT
            if (e.target.getAttribute("data-gtm-event")) {} // dataLayer.push({'event': e.target.getAttribute("data-gtm-event")});
            //GA


            if (e.target.getAttribute("data-ga-event")) {
              Analytics.sendEvent(e.target.getAttribute("data-ga-event"));
            }

            if (e.target.getAttribute("data-toggle-sidemenu") !== null) {
              e.preventDefault();
              Sidemenu.toogleState();
            } else if (e.target.getAttribute("data-toggle-window") !== null) {
              ControllerWindow.toggle(e.target.getAttribute("data-toggle-window"), e.target);
            } else if (e.target.getAttribute("data-acordion-toogle") !== null) {
              Acordions.toggle(e.target);
            } else if (e.target.getAttribute("data-cookies-ok") !== null) {
              e.preventDefault();
              Cookies.actionButtonOK(e.target);
            } else if (e.target.getAttribute("data-cookies-nok") !== null) {
              e.preventDefault();
              Cookies.actionButtonNOK(e.target);
            } else if (e.target.getAttribute("data-back") !== null) {
              e.preventDefault();
              ControllerPage.back(e.target.getAttribute("data-href"));
            }

            break;
        }
      }
    });
  }
};

var MrInteraction =
/*#__PURE__*/
function () {
  function MrInteraction(__container, __options) {
    _classCallCheck(this, MrInteraction);

    _defineProperty(this, "_idTimer", 0);

    _defineProperty(this, "container", void 0);

    _defineProperty(this, "positions", {
      old: {
        x: 0,
        y: 0
      },
      mouse: {
        x: 0,
        y: 0
      },
      click: {
        x: 0,
        y: 0
      },
      up: {
        x: 0,
        y: 0
      }
    });

    _defineProperty(this, "isDragging", false);

    _defineProperty(this, "isDragged", false);

    _defineProperty(this, "options", {});

    this.container = __container;
    this.setOptions(__options); //this._click();

    if (this.options.drag) {
      this._down();

      this._up();
    }

    if (this.options.drag || this.options.ajax) {
      if (!Basics.isTouch) this._move();else this._moveTouch();
    }
  }

  _createClass(MrInteraction, [{
    key: "setOptions",
    value: function setOptions() {
      var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      this.options = {
        drag: options.drag || false,
        dragIntensity: options.dragIntensity || .1,
        dragCheckTime: options.dragCheckTime * 1000 || 100,
        maxDrag: 4 || Metrics.WIDTH,
        pixelsCheck: options.pixelsCheck || 5,
        onMove: options.onMove || null,
        onMouseDown: options.onMouseDown || null,
        onMouseUp: options.onMouseUp || null,
        onDragStart: options.onDragStart || null,
        onDragEnd: options.onDragEnd || null,
        axis: options.axis || "X"
      };
    }
  }, {
    key: "dispose",
    value: function dispose() {}
  }, {
    key: "_doDragMove",
    value: function _doDragMove() {
      var __lastMove = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;

      var axis = this.options.axis;
      this.positions.mouse.distance = this.positions.mouse[axis] - this.positions.old[axis];
      this.positions.mouse.speed = Math.min(this.options.maxDrag, Math.max(1, Math.abs(this.positions.mouse.distance) * this.options.dragIntensity));

      if (Math.abs(this.positions.mouse[axis] - this.positions.click[axis]) > this.options.pixelsCheck && !__lastMove) {
        this.isDragged = true;
      }

      this.options.onMove(this.positions.mouse.distance * this.positions.mouse.speed);
    }
  }, {
    key: "_move",
    value: function _move() {
      var _this5 = this;

      this.container.addEventListener(Basics.moveEvent, function (e) {
        _this5.positions.mouse = {
          x: e.touches ? e.touches[0].clientX : e.clientX,
          y: e.touches ? e.touches[0].clientY : e.clientY
        };

        if (_this5.isDragging) {
          _this5._doDragMove();
        } else {
          switch (e.target.tagName.toLowerCase()) {
            case "a":
              //NOT ANCHOR
              if (_this5.options.ajax && e.target.getAttribute("href").slice(0, 1) !== "#" && e.target.getAttribute("target") !== '_blank' && e.target.getAttribute("data-internal") == null) {
                e.preventDefault();
                ControllerPage.preloadPage(e.target.getAttribute("href"));
              }

              break;
          }
        }

        _this5.positions.old = _this5.positions.mouse;
      });
    }
  }, {
    key: "_moveTouch",
    value: function _moveTouch() {
      var _this6 = this;

      this.container.addEventListener(Basics.moveEvent, function (e) {
        _this6.positions.mouse = {
          x: e.touches ? e.touches[0].clientX : e.clientX,
          y: e.touches ? e.touches[0].clientY : e.clientY
        };

        if (_this6.isDragging) {
          _this6._doDragMove();

          _this6.positions.old = _this6.positions.mouse;
        }
      });
    }
  }, {
    key: "_down",
    value: function _down() {
      var _this7 = this;

      this.container.addEventListener(Basics.downEvent, function (e) {
        _this7.positions.click = {
          x: e.touches ? e.touches[0].clientX : e.clientX,
          y: e.touches ? e.touches[0].clientY : e.clientY
        };

        if (_this7.options.drag) {
          _this7._idTimer = setTimeout(function () {
            _this7.isDragging = true;
            if (Basics.isTouch) _this7.positions.old = _this7.positions.click;
            if (_this7.options.onDragStart) _this7.options.onDragStart();
          }, _this7.options.dragCheckTime);
        }

        if (_this7.options.onMouseDown) {
          _this7.options.onMouseDown();
        }
      });
    }
  }, {
    key: "_up",
    value: function _up() {
      var _this8 = this;

      this.container.addEventListener(Basics.upEvent, function (e) {
        _this8.positions.up = {
          x: e.touches ? e.touches[0].clientX : e.clientX,
          y: e.touches ? e.touches[0].clientY : e.clientY
        };

        if (_this8.isDragging) {
          _this8.isDragging = false;
          if (_this8.options.onDragEnd) _this8.options.onDragEnd();
          setTimeout(function () {
            _this8.isDragged = false;
          }, 100);
        }

        if (_this8.options.onMouseUp) {
          _this8.options.onMouseUp();
        }
      });
    }
  }, {
    key: "_click",
    value: function _click() {
      var _this9 = this;

      this.container.addEventListener(Basics.clickEvent, function (e) {
        if (_this9.isDragged) {
          e.preventDefault();
        } else {}
      });
    }
  }]);

  return MrInteraction;
}();;"use strict";

/*
──────────────────────────────────────────
──────────────────────────────────────────
GET ELEMENT BY
──────────────────────────────────────────
──────────────────────────────────────────
const content = Core.Element.id('content') UNIQUE
const btn = Core.Element.class('btn') ARRAY
const span = Core.Element.tag('span') ARRAY
CHILD OF ELEMENT
────────────────
const elements = Core.Element.class('elementClassName', parentEl)
*/
C.GetBy = {
  p: function p(_p) {
    return _p ? _p : document;
  },
  id: function id(el, p) {
    return this.p(p).getElementById(el);
  },
  "class": function _class(el, p) {
    return this.p(p).getElementsByClassName(el);
  },
  tag: function tag(el, p) {
    return this.p(p).getElementsByTagName(el);
  },
  selector: function selector(el, p) {
    return this.p(p).querySelectorAll(el);
  }
};
C.Selector = {
  forEach: function forEach(selector, call) {
    var items = document.querySelectorAll(selector);
    items = [].slice.call(items);
    items.forEach(call);
  }
};

C.ForEach = function (items, call) {
  items = [].slice.call(items);
  items.forEach(call);
};;"use strict";

/*
──────────────────────────────────────────
──────────────────────────────────────────
INDEX
──────────────────────────────────────────
──────────────────────────────────────────
const elementLiIndex = R.Index.list(liElement)
const elementClassIndex = R.Index.class(elementWithClass, className)
*/
C.Index = {
  i: function i(n, el) {
    var elL = el.length;

    for (var i = 0; i < elL; i++) {
      if (n === el[i]) {
        return i;
      }
    }

    return -1;
  },
  list: function list(n) {
    var el = n.parentNode.children;
    return this.i(n, el);
  },
  "class": function _class(n, cN) {
    var el = R.G["class"](cN);
    return this.i(n, el);
  }
};;"use strict";

/*
──────────────────────────────────────────
──────────────────────────────────────────
SELECT
──────────────────────────────────────────
──────────────────────────────────────────
const el[0] = R.Select.el(selector)
const type = R.Select.type(selector)
const name = R.Select.name(selector)
*/
C.Select = {
  el: function el(s) {
    var el = [];

    if (R.Is.str(s)) {
      var elName = s.substring(1);

      if (s.charAt(0) === '#') {
        el[0] = R.G.id(elName);
      } else {
        el = R.G["class"](elName);
      }
    } else {
      el[0] = s;
    }

    return el;
  },
  type: function type(s) {
    return s.charAt(0) === '#' ? 'id' : 'class';
  },
  name: function name(s) {
    return s.substring(1);
  }
};;"use strict";

/*
──────────────────────────────────────────
──────────────────────────────────────────
GET ELEMENT BY
──────────────────────────────────────────
──────────────────────────────────────────
const content = Core.Element.id('content')
const btn = Core.Element.class('btn')
const span = Core.Element.tag('span')
CHILD OF ELEMENT
────────────────
const elements = Core.Element.class('elementClassName', parentEl)
*/
C.Remove = function (element) {
  element.parentNode.removeChild(element);
};

C.Empty = function (element) {
  while (element.firstChild) {
    element.removeChild(element.firstChild);
  }
};;"use strict";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

var Functions = {
  getSizePrefix: function getSizePrefix(__size) {
    var _prefix = "xlarge";
    if (__size == 0 || __size == undefined) __size = Metrics.WIDTH_INSIDE;
    if (__size <= 480) _prefix = "small";else if (__size <= 780) _prefix = "medium";else if (__size <= 1200) _prefix = "large";else if (__size > 1200) _prefix = "xlarge";
    return _prefix;
  },
  fullHeight: function fullHeight(__holder, __h) {
    __holder.css("height", __h + "px");
  },
  fullHeightPadding: function fullHeightPadding(__holder, __h) {
    __holder.css("padding-top", __h + "px");
  },
  minfullHeight: function minfullHeight(__holder, __h) {
    __holder.css("height", "auto");

    var n = Math.max(__holder.outerHeight(), __h);

    __holder.css("height", n + "px");
  },
  fulHeightIfNeccesary: function fulHeightIfNeccesary(__holder, __h) {
    var __content = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;

    var __padding = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 0;

    var n = Math.max(__holder.children().innerHeight() + __padding * 2, __h);

    __holder.css("height", n + "px");

    if (__content != null) {
      var y = (n - __padding * 2 - __content.innerHeight()) / 2;

      __content.css({
        '-webkit-transform': 'translateY(' + y + 'px)',
        '-moz-transform': 'translateY(' + y + 'px)',
        '-ms-transform': 'translateY(' + y + 'px)',
        '-o-transform': 'translateY(' + y + 'px)',
        'transform': 'translateY(' + y + 'px)'
      });
    }
  },
  fitCover: function fitCover(__item, __wReal, __hReal, __wDestino, __hDestino) {
    var __offset = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : 0;

    var scale = Math.max((__wDestino + __offset) / __wReal, (__hDestino + __offset) / __hReal);
    var w = __wReal * scale;
    var h = __hReal * scale;
    __item.style.width = w + "px";
    __item.style.height = h + "px";
    var left = 0;
    var top = 0;

    switch (__item.getAttribute("data-align")) {
      case "C":
        left = (__wDestino - w) / 2;
        __item.style.left = Math.round(left) + "px";
        break;

      case "L":
        left = 0;
        __item.style.left = "0px";
        break;

      case "R":
        __item.style.right = "0px";
        break;

      default:
        left = (__wDestino - w) / 2;
        __item.style.left = Math.round(left) + "px";
    }

    switch (__item.getAttribute("data-v-align")) {
      case "C":
        top = (__hDestino - __offset - h) / 2;
        __item.style.top = Math.round(top) + "px";
        break;

      case "T":
        top = 0;
        __item.style.top = "0px";
        break;

      case "B":
        __item.style.bottom = "0px";
        break;

      default:
        top = (__hDestino - __offset - h) / 2;
        __item.style.top = Math.round(top) + "px";
    }
  },
  fitInside: function fitInside(__item, __width, __height, __realWidth, __realHeight, __insideWidth, __insideHeight) {
    var __align = arguments.length > 7 && arguments[7] !== undefined ? arguments[7] : "C";

    var __valign = arguments.length > 8 && arguments[8] !== undefined ? arguments[8] : "C";

    var left = 0;
    var top = 0;
    var s = Math.min(__width / __realWidth, __height / __realHeight);
    var w = __realWidth * s;
    var h = __realHeight * s;

    switch (__align) {
      case "C":
        left = (__insideWidth - w) / 2;
        break;

      case "L":
        left = 0;
        break;

      case "R":
        left = __insideWidth - w;
        break;
    }

    switch (__valign) {
      case "C":
        top = (__insideHeight - h) / 2;
        break;

      case "T":
        top = 0;
        break;

      case "B":
        top = __insideHeight - h;
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
  getSelector: function getSelector(__item) {
    var selector = __item.parents().map(function () {
      return this.tagName;
    }).get().reverse().concat([__item[0].nodeName]).join(">");

    var id = __item.attr("id");

    if (id) {
      selector += "#" + id;
    }

    var classNames = __item.attr("class");

    if (classNames) {
      selector += "." + $.trim(classNames).replace(/\s/gi, ".");
    }

    return selector;
  },
  getId: function getId(__item) {
    if (!__item.getAttribute("id")) {
      __item.setAttribute("id", "__" + new Date().getTime());
    }

    return __item.getAttribute("id");
  },
  doMrCorrales: function doMrCorrales() {
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
  copyToClipboard: function copyToClipboard(str) {
    var el = document.createElement('textarea');
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
  url2Id: function url2Id(__url) {
    var id = "index";
    if (__url.charAt(__url.length - 1) == "/") __url = __url.slice(0, __url.length - 1);

    var _n;

    if (Basics.mainLang !== Basics.language) {
      _n = __url.indexOf("/" + Basics.language + "/");
    } else {
      _n = __url.lastIndexOf("/");
    }

    if (_n >= 0) id = __url.slice(_n, __url.length).split("/").join("").split(".").join("");else id = __url.split(".").join("");
    return id;
  },
  getRect: function getRect(x0, y0, x1, y1) {
    return "rect(" + y0 + "px " + x1 + "px " + y1 + "px " + x0 + "px)";
  },
  clone: function clone(obj) {
    if (null == obj || "object" != _typeof(obj)) return obj;
    var copy = obj.constructor();

    for (var attr in obj) {
      if (obj.hasOwnProperty(attr)) copy[attr] = obj[attr];
    }

    return copy;
  },
  arrayRandom: function arrayRandom(__array) {
    return __array.sort(function () {
      return Math.random() - 0.5;
    });
  },
  //COLORS
  hexToRgb: function hexToRgb(hex) {
    if (hex) {
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
  hexToCSS: function hexToCSS(hex) {
    var alpha = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;
    var rgb = this.hexToRgb(hex);
    return "rgba(" + rgb.r + ", " + rgb.g + ", " + rgb.b + ", " + alpha + ")";
  },
  decToCSS: function decToCSS(hex) {
    return "#" + hex.toString(16);
  },
  rgbToCSS: function rgbToCSS(rgb) {
    var alpha = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;
    return "rgba(" + rgb.r + ", " + rgb.g + ", " + rgb.b + ", " + alpha + ")";
  },
  decimalColorToHTMLcolor: function decimalColorToHTMLcolor(integer) {
    var number = (+d).toString(16).toUpperCase();

    if (number.length % 2 > 0) {
      number = "0" + number;
    }

    return number;
  },
  getOffsetLeft: function getOffsetLeft(elem) {
    var top = elem.offsetTop;

    do {
      if (!isNaN(elem.offsetTop)) {
        top += elem.offsetTop;
      }
    } while (elem = elem.offsetTop);

    return top;
  }
};;"use strict";

var Utils3D = {
  visibleHeightAtZDepth: function visibleHeightAtZDepth(depth, camera) {
    // compensate for cameras not positioned at z=0
    var cameraOffset = camera.position.z;
    if (depth < cameraOffset) depth -= cameraOffset;else depth += cameraOffset; // vertical fov in radians

    var vFOV = camera.fov * Math.PI / 180; // Math.abs to ensure the result is always positive

    return 2 * Math.tan(vFOV / 2) * Math.abs(depth);
  },
  visibleWidthAtZDepth: function visibleWidthAtZDepth(depth, camera) {
    var height = this.visibleHeightAtZDepth(depth, camera);
    return height * camera.aspect;
  }
};;"use strict";

var Cookie = {
  get: function get(cname) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');

    for (var i = 0; i < ca.length; i++) {
      var c = ca[i];

      while (c.charAt(0) == ' ') {
        c = c.substring(1);
      }

      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
      }
    }

    return "";
  },
  set: function set(cname, value) {
    var now = new Date();
    var time = now.getTime();
    now.setTime(time + 999999999999);
    document.cookie = cname + "=" + value + "; expires=" + now.toUTCString() + "; path=/";
  }
};;"use strict";

var Maths = {
  normalize: function normalize(max, min, val) {
    return (val - min) / (max - min);
  },
  lerp: function lerp(s, e, t) {
    return s * (1 - t) + e * t;
  },
  precission: function precission(val) {
    var dec = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 3;
    dec = Math.pow(10, dec);
    return Math.round(val * dec) / dec;
  },
  getRotationDegrees: function getRotationDegrees(obj) {
    var angle = 0;
    var matrix = obj.css("-webkit-transform") || obj.css("-moz-transform") || obj.css("-ms-transform") || obj.css("-o-transform") || obj.css("transform");

    if (matrix !== 'none') {
      var values = matrix.split('(')[1].split(')')[0].split(',');
      var a = values[0];
      var b = values[1];
      var angle = Math.round(Math.atan2(b, a) * (180 / Math.PI));
    } else {
      angle = 0;
    }

    return angle < 0 ? angle + 360 : angle;
  },
  getColorMid: function getColorMid(__c1, __c2, __ratio) {
    var r = Math.ceil(parseInt(__c1.substring(2, 4), 16) * __ratio + parseInt(__c2.substring(2, 4), 16) * (1 - __ratio));
    var g = Math.ceil(parseInt(__c1.substring(4, 6), 16) * __ratio + parseInt(__c2.substring(4, 6), 16) * (1 - __ratio));
    var b = Math.ceil(parseInt(__c1.substring(6, 8), 16) * __ratio + parseInt(__c2.substring(6, 8), 16) * (1 - __ratio));
    return Number("0x" + this.toHex(r) + this.toHex(g) + this.toHex(b));
  },
  toHex: function toHex(x) {
    x = x.toString(16);
    return x.length == 1 ? '0' + x : x;
  },
  maxminRandom: function maxminRandom(__max) {
    var __min = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;

    return Math.floor(Math.random() * (__max - __min + 1)) + __min;
  },
  lineDistance: function lineDistance(point1, point2) {
    var xs = 0;
    var ys = 0;
    xs = point2.x - point1.x;
    xs = xs * xs;
    ys = point2.y - point1.y;
    ys = ys * ys;
    return Math.sqrt(xs + ys);
  },
  toRadians: function toRadians(degrees) {
    return degrees * Math.PI / 180;
  },
  toRegrees: function toRegrees(radians) {
    return radians * 180 / Math.PI;
  },
  angleRadians: function angleRadians(p1, p2) {
    return Math.atan2(p2.y - p1.y, p2.x - p1.x);
  },
  angleDegrees: function angleDegrees(p1, p2) {
    return Math.atan2(p2.y - p1.y, p2.x - p1.x) * 180 / Math.PI;
  },
  thousandDot: function thousandDot(__n) {
    var s = __n.toString();

    var sL = __n.toString();

    if (__n.indexOf(".") == -1) {
      for (var i = sL.length - 1, j = 0; i > -1; i--) {
        j++;
        s = sL[i] + s;
        if (j == 3) s = s + ".";else if (j == 6) s = s + ".";
      }
    }

    return s;
  },
  numberWithCommas: function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  }
};;"use strict";

var CSS = {
  transform: "",
  init: function init() {
    this.transform = this.GetVendorPrefix(["transform", "msTransform", "MozTransform", "webkitTransform", "OTransform"]);
  },
  GetVendorPrefix: function GetVendorPrefix(__array) {
    var tmp = document.createElement("div");
    var result = null;

    for (var i = 0; i < __array.length; i++) {
      if (typeof tmp.style[__array[i]] != 'undefined') {
        return result = __array[i];
      }
    }

    return result;
  },
  translate3D: function translate3D() {
    var x = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
    var y = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
    var z = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
    return "translate3d(" + x + "px, " + y + "px, " + z + "px)";
  },
  scale3D: function scale3D() {
    var x = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1;
    var y = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;
    var z = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 1;
    return "scale3D(" + x + ", " + y + ", " + z + ")";
  },
  getTranslate: function getTranslate(el) {
    var translate = {};
    if (!window.getComputedStyle) return;
    var style = getComputedStyle(el);
    var transform = style.transform || style.webkitTransform || style.mozTransform;
    var mat = transform.match(/^matrix3d\((.+)\)$/);

    if (mat) {
      translate.x = mat[1].split(', ')[12];
      translate.y = mat[1].split(', ')[13];
      translate.z = mat[1].split(', ')[14];
      return translate;
    }

    mat = transform.match(/^matrix\((.+)\)$/);
    translate.x = mat ? parseFloat(mat[1].split(', ')[4]) : 0;
    translate.y = mat ? parseFloat(mat[1].split(', ')[5]) : 0;
    translate.z = mat ? parseFloat(mat[1].split(', ')[6]) : 0;
    return translate;
  }
};
CSS.init();;"use strict";

var Accessibility = {
  _spark: C.GetBy["class"]("focus-spark")[0],
  _selector: "__accessible",
  _idTimer: null,
  _time: 80000,
  isTrap: false,
  isAuto: false,
  isEnable: false,
  lastFocusableEl: null,
  firstFocusableEl: null,
  init: function init() {
    var __time = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 2000;

    this._time = __time;
    this._callDisable = this.disable.bind(this);
    this.disable();
    this.addCheck();
  },
  enable: function enable() {
    if (!Accessibility.isEnable) {
      Accessibility.isEnable = true;
      document.body.classList.add(Accessibility._selector);
      document.addEventListener('mousedown', Accessibility.disable);

      if (Accessibility.isAuto) {
        Accessibility._idTimer = setTimeout(Accessibility.disable, Accessibility._time);
      }
    }
  },
  disable: function disable() {
    document.body.classList.remove(Accessibility._selector);
    document.removeEventListener('mousedown', Accessibility.disable);
    Accessibility._idTimer = null;
    Accessibility.isEnable = false;
  },
  addCheck: function addCheck() {
    var _this = this;

    document.addEventListener('keydown', function (e) {
      var isTab = e.key === 'Tab' || e.keyCode === 9;

      if (isTab) {
        //TIMER
        if (_this._idTimer) {
          clearTimeout(_this._idTimer);
          _this._idTimer = null;
        } //IS TRAP


        if (_this.isTrap) {
          if (e.shiftKey)
            /* shift + tab */
            {
              if (document.activeElement === _this.firstFocusableEl) {
                _this.lastFocusableEl.focus();

                e.preventDefault();
              }
            } else
            /* tab */
            {
              if (_this.isTrapFirst) {
                _this.isTrapFirst = false;

                _this.firstFocusableEl.focus();

                e.preventDefault();
              } else {
                if (document.activeElement === _this.lastFocusableEl) {
                  _this.firstFocusableEl.focus();

                  e.preventDefault();
                }
              }
            }
        } //ENABLE ACCESSIBILITY


        _this.enable(); //DRAW CIRCLE

        /*setTimeout(() => {
          TweenLite.killTweensOf(this._spark);
           const rect = document.activeElement.getBoundingClientRect();
          const size = Math.min(100, Math.max(rect.width, rect.height));
           this._spark.style.opacity = "1";
          this._spark.style.width = size + "px";
          this._spark.style.height = size + "px";
          TweenLite.set(this._spark, {
            alpha: 1,
            x: Number(rect.left + (rect.width - size) / 2),
            y: Number(rect.top + (rect.height - size) / 2),
            scaleX: 1,
            scaleY: 1,
            ease: Quad.easeOut,
            force3D: true
          });
          TweenLite.to(this._spark, 1, {alpha: 0, scaleX: 3, scaleY: 3, ease: Quad.easeOut, force3D: true});
        }, 100);*/

      }
    });
  },
  trap: function trap(element) {
    var _first = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;

    var _last = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;

    this.isTrap = true;
    this.isTrapFirst = !this.isEnable;
    var focusableEls = element.querySelectorAll('a[href]:not([disabled]):not([tabindex="-1"]), button:not([disabled]):not([tabindex="-1"]), textarea:not([disabled]):not([tabindex="-1"]), input[type="text"]:not([disabled]):not([tabindex="-1"]), input[type="radio"]:not([disabled]):not([tabindex="-1"]), input[type="checkbox"]:not([disabled]):not([tabindex="-1"]), select:not([disabled]):not([tabindex="-1"])');
    this.firstFocusableEl = _first ? _first : focusableEls[0];
    this.lastFocusableEl = _last ? _first : focusableEls[focusableEls.length - 1];
    if (this.firstFocusableEl) this.firstFocusableEl.focus();
  },
  removeTrap: function removeTrap() {
    this.isTrap = false;
    this.isTrapFirst = false;
    this.firstFocusableEl = null;
    this.lastFocusableEl = null;
  }
};;"use strict";

var CuchilloWorker = {
  init: function init() {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('/service-worker.js').then(function () {});
    }
  }
};;"use strict";

var Keyboard = {
  UP: 38,
  DOWN: 40,
  LEFT: 37,
  RIGHT: 39,
  ESC: 27,
  HOME: 36,
  END: 35,
  AVPAG: 34,
  REPAG: 33,
  isEnable: false,
  _calls: null,
  _total: 0,
  init: function init() {
    var __time = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 2000;

    this._calls = [];
    this.enable();
  },
  enable: function enable() {
    if (!Keyboard.isEnable) {
      Keyboard.isEnable = true;
      document.addEventListener('keydown', Keyboard._check);
    }
  },
  disable: function disable() {
    if (Keyboard.isEnable) {
      Keyboard.isEnable = false;
      document.removeEventListener('keydown', Keyboard._check);
    }
  },
  add: function add(key, id, call) {
    this._total = this._calls.push({
      key: key,
      id: id,
      call: call
    });
  },
  remove: function remove(key, id) {
    for (var i = 0; i < Keyboard._total; i++) {
      if (key === Keyboard._calls[i].key && id === Keyboard._calls[i].id) {
        Keyboard._calls.splice(i, 1);

        Keyboard._total--;
      }
    }
  },
  _check: function _check(e) {
    for (var i = 0; i < Keyboard._total; i++) {
      if (e.key === Keyboard._calls[i].key || e.keyCode === Keyboard._calls[i].key) {
        Keyboard._calls[i].call();
      }
    }
  }
};;"use strict";

var Statics = {
  stats: null,
  init: function init() {
    var __container = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : document.body;

    if (Basics.isDebug) {
      this.stats = new Stats();
      this.stats.showPanel(0); // 0: fps, 1: ms, 2: mb, 3+: custom

      __container.appendChild(this.stats.dom);
    }
  },
  begin: function begin() {
    this.stats.begin();
  },
  end: function end() {
    this.stats.end();
  }
};;"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var FormValidator =
/*#__PURE__*/
function () {
  function FormValidator(__form) {
    var _this = this;

    _classCallCheck(this, FormValidator);

    _defineProperty(this, "_form", void 0);

    _defineProperty(this, "_fields", []);

    _defineProperty(this, "_dataSend", {});

    _defineProperty(this, "_files", null);

    this._form = __form;

    this._form.classList.add("__parsed");

    this._form.addEventListener("submit", function (e) {
      _this.prepareSubmit(e);
    });

    var items = C.GetBy.selector("input", this._form);

    for (var i = 0; i < items.length; i++) {
      this._fields.push(items[i]);

      this.setupFocus(items[i]);
    }

    items = C.GetBy.selector("select", this._form);

    for (var _i = 0; _i < items.length; _i++) {
      this._fields.push(items[_i]);

      this.setupFocus(items[_i]);
    }

    items = C.GetBy.selector("textarea", this._form);

    for (var _i2 = 0; _i2 < items.length; _i2++) {
      this._fields.push(items[_i2]);

      this.setupFocus(items[_i2]);
    }
  }

  _createClass(FormValidator, [{
    key: "setupFocus",
    value: function setupFocus(__item) {
      var tClass = this;

      __item.addEventListener('focus', function (evt) {
        tClass.isInputOK(this);
      });

      __item.addEventListener('blur', function (event) {});

      __item.addEventListener('input', function (evt) {
        tClass.isInputOK(this);
      });
    }
  }, {
    key: "isInputOK",
    value: function isInputOK(__input) {
      if (!__input) return false;
      var isOk = true;

      switch (__input.getAttribute("type")) {
        case "text":
          if (__input.value.split(" ").join("") === "" && __input.getAttribute("data-form-required") !== null) {
            isOk = false;

            __input.parentNode.classList.add("error");

            __input.parentNode.classList.remove("success");
          } else {
            isOk = true;

            __input.parentNode.classList.remove("error");

            __input.parentNode.classList.add("success");
          }

          break;

        case "email":
          var filter = /^([a-zA-Z0-9_\.\ñ\Ñ\-])+\@(([a-zA-Z0-9\-\ñ\Ñ])+\.)+([a-zA-Z0-9]{2,4})+$/;

          if (__input.value === "" && __input.getAttribute("data-form-required") !== null) {
            isOk = false;

            __input.parentNode.classList.add("error");

            __input.parentNode.classList.remove("success");
          } else if (!filter.test(__input.value)) {
            isOk = false;

            __input.parentNode.classList.add("error");

            __input.parentNode.classList.remove("success");
          } else {
            isOk = true;

            __input.parentNode.classList.remove("error");

            __input.parentNode.classList.add("success");
          }

          break;

        case "checkbox":
          {
            if (__input.getAttribute("data-form-required") !== null && !__input.checked) {
              __input.parentNode.classList.add("error");
            } else {
              __input.parentNode.classList.remove("error");
            }

            break;
          }
      }

      return isOk;
    }
  }, {
    key: "check",
    value: function check() {
      var bolContinuar = true;
      var field;

      for (var i = 0, j = this._fields.length; i < j; i++) {
        field = this._fields[i];

        switch (field.getAttribute("type")) {
          case "text":
            this._dataSend[field.getAttribute("name")] = "";

            if (field.value.split(" ").join("") === "" && field.getAttribute("data-form-required") !== null) {
              bolContinuar = false;
              field.parentNode.classList.add("error");
            } else {
              this._dataSend[field.getAttribute("name")] = field.value;
            }

            break;

          case "email":
            this._dataSend[field.getAttribute("name")] = "";
            var filter = /^([a-zA-Z0-9_\.\ñ\Ñ\-])+\@(([a-zA-Z0-9\-\ñ\Ñ])+\.)+([a-zA-Z0-9]{2,4})+$/;

            if (field.value.split(" ").join("") === "" && field.getAttribute("data-form-required") !== null) {
              bolContinuar = false;
              field.parentNode.classList.add("error");
            } else if (!filter.test(field.value)) {
              bolContinuar = false;
              field.parentNode.classList.add("error");
            } else {
              this._dataSend[field.getAttribute("name")] = field.value;
            }

            break;

          case "tel":
            this._dataSend[field.getAttribute("name")] = "";
            var filter = /^([0-9]+){9}$/; //<--- con esto vamos a validar el numero

            if (field.value.split(" ").join("") === "" && field.getAttribute("data-form-required") !== null) {
              bolContinuar = false;
              field.parentNode.classList.add("error");
            } else if (!filter.test(field.value.split(" ").join("")) && field.getAttribute("data-form-required") !== null) {
              bolContinuar = false;
              field.parentNode.classList.add("error");
            } else {
              this._dataSend[field.getAttribute("name")] = field.value;
            }

            break;

          case "file":
            {
              if (field.getAttribute("data-form-required") !== null && field.prop('files').length < 1) {
                bolContinuar = false;
                field.parentNode.classList.add("error");
              }

              break;
            }

          case "checkbox":
            {
              if (field.getAttribute("data-form-required") !== null && !field.checked) {
                bolContinuar = false;
                field.parentNode.classList.add("error");
              }

              break;
            }

          case "radio":
            {
              if (field.checked) {
                this._dataSend[field.getAttribute("name")] = field.value;
              }

              break;
            }

          default:
            this._dataSend[field.getAttribute("name")] = "";

            if (field.value.split(" ").join("") === "" && field.getAttribute("data-form-required") !== null) {
              bolContinuar = false;
              field.parentNode.classList.add("error");
            } else {
              this._dataSend[field.getAttribute("name")] = field.value;
            }

            break;
        }
      }

      return bolContinuar;
    }
  }, {
    key: "prepareSubmit",
    value: function prepareSubmit(e) {
      e.preventDefault();

      if (this.check()) {
        this.parseToSend();
      } else if (WinMessage) {
        var MSSG = this._form.getAttribute("data-inputs-nok") === undefined ? "ERROR" : this._form.getAttribute("data-inputs-nok");
        WinMessage.error(MSSG);
      }
    }
  }, {
    key: "parseToSend",
    value: function parseToSend() {
      this._dataSend["token"] = this._form.getAttribute("data-token");
      if (this._form.getAttribute("data-to") !== undefined) this._dataSend["to"] = this._form.getAttribute("data-to");
      FormSender.send(this, this._dataSend, this._form, this._files);
    }
  }, {
    key: "reset",
    value: function reset() {
      this._dataSend = {};

      for (var i = 0, j = this._fields.length; i < j; i++) {
        this._fields[i].val("");
      }
    }
  }, {
    key: "dispose",
    value: function dispose() {}
  }]);

  return FormValidator;
}();;"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

$.fn.serializeFormJSON = function () {
  var o = {};
  var a = this.serializeArray();
  $.each(a, function () {
    if (this.name == 'condiciones-dos') {
      this.name = 'condiciones';
    }

    if (o[this.name]) {
      if (!o[this.name].push) {
        o[this.name] = [o[this.name]];
      }

      o[this.name].push(this.value || '');
    } else {
      o[this.name] = this.value || '';
    }
  });
  var $radio = $('input[type=checkbox][name=condiciones-dos],input[type=checkbox][name=condiciones],input[type=checkbox][name=informacion]', this);
  $.each($radio, function () {
    if (this.name == 'condiciones-dos') {
      this.name = 'condiciones';
    }

    if (!o.hasOwnProperty(this.name)) {
      o[this.name] = false;
    } else {
      o[this.name] = true;
    }
  });
  return o;
};

var FormSender =
/*#__PURE__*/
function () {
  function FormSender() {
    _classCallCheck(this, FormSender);
  }

  _createClass(FormSender, null, [{
    key: "send",
    value: function send(__formValidator, __data, __form) {
      var __files = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : null;

      __form.classList.add("__loading");

      var data = {};
      var mssg_ok = __form.getAttribute("data-mssg-ok") === undefined ? "El mensaje ha sido envíado, nos pondremos en contacto contigo" : __form.getAttribute("data-mssg-ok");
      var mssg_nok = __form.getAttribute("data-mssg-nok") === undefined ? "Ha ocurrido un error. Revisa los datos y vuelve a intentarlo" : __form.getAttribute("data-mssg-nok");

      function WS_send(form) {
        var url = "https://www.euskadi.eus/ac93aBasqueDCCWSWar/BasqueDCCWS/sendInformation";
        var data;

        try {
          data = form.serializeFormJSON();
          $.ajax({
            url: url,
            type: "POST",
            // type of action POST || GET
            data: JSON.stringify(data),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            crossDomain: true,
            success: function success(response) {
              form[0].classList.remove("__loading");
              console.log(response);

              if (JSON.parse(response).estado != "1") {
                WinMessage.success(mssg_ok);
              } else {
                WinMessage.error(mssg_nok);
              }
            },
            error: function error(XMLHttpRequest, textStatus, errorThrown) {
              alert("some error: " + textStatus + " ; " + errorThrown);
            }
          });
        } catch (err) {
          console.log("ERROR FORM SEND");
        } finally {}
      } //*********** End ENVIO FORMULARIO *************//


      WS_send($(__form));
    }
  }]);

  return FormSender;
}();;"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var EventDispatcher =
/*#__PURE__*/
function () {
  function EventDispatcher() {
    _classCallCheck(this, EventDispatcher);
  }

  _createClass(EventDispatcher, null, [{
    key: "hasEventListener",
    value: function hasEventListener(type, listener, id) {
      var exists = false;

      for (var i = 0; i < this._listeners.length; i++) {
        if (this._listeners[i].type === type && this._listeners[i].id === id) {
          exists = true;
        }
      }

      return exists;
    }
  }, {
    key: "addEventListener",
    value: function addEventListener(typeStr, listenerFunc, id) {
      if (this.hasEventListener(typeStr, listenerFunc, id)) {
        return;
      }

      this._listeners.push({
        type: typeStr,
        listener: listenerFunc,
        id: id
      });
    }
  }, {
    key: "removeEventListener",
    value: function removeEventListener(typeStr, id) {
      for (var i = 0; i < this._listeners.length; i++) {
        if (this._listeners[i].type === typeStr && this._listeners[i].id === id) {
          this._listeners.splice(i, 1);
        }
      }
    }
  }, {
    key: "dispatchEvent",
    value: function dispatchEvent(evt) {
      for (var i = 0; i < this._listeners.length; i++) {
        if (this._listeners[i].type === evt) {
          this._listeners[i].listener.call(this, evt);
        }
      }
    }
  }]);

  return EventDispatcher;
}();

_defineProperty(EventDispatcher, "_listeners", []);;"use strict";

var Scroll = {
  AXIS_X: "X",
  AXIS_Y: "Y",
  engine: null,
  y: -window.pageYOffset,
  x: -window.pageXOffset,
  slowPosition: 0,
  axis: null,
  isScrolling: false,
  direction: 0,
  anchor: "",
  _anchors: [],
  _oldScroll: null,
  _wheel: null,
  speed: 0,
  offsetAnchor: 0,
  _classItems: [],
  init: function init(__axis) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    this.axis = __axis;
    this._anchors = [];
    options = {
      container: options.container || document.body,
      element: options.element || window,
      axis: __axis || "Y",
      smooth: options.smooth || false,
      easing: options.easing || 0.08,
      maxSpeed: options.maxSpeed || 400,
      multiplicator: options.multiplicator || 1,
      itemClass: options.itemClass,
      infinity: options.infinity || false,
      wheel: options.wheel,
      hasSlowly: options.hasSlowly || false
    };

    if (options.smooth) {
      if (!options.infinity) {
        this.engine = new VScroll(options);
      } else {
        if (this.axis === "Y") {
          this.engine = new VScrollInfinity(document.body.options);
        } else {
          this.engine = new VScrollHInfinity(document.body, options);
        }
      }
    } else {
      this.engine = new MrScroll(options);
    }

    if (history.state) {
      Scroll.directGoto(history.state.scrollY);
    }
  },
  //CLASSITEMS
  _addClass: function _addClass(__id, __class) {
    Scroll._classItems.push({
      id: __id,
      "class": __class
    });
  },
  _getClass: function _getClass(__item) {
    var idClass = __item.getAttribute("data-class") || "default";

    for (var i = 0, j = Scroll._classItems.length; i < j; i++) {
      if (idClass === Scroll._classItems[i].id) {
        return Scroll._classItems[i]["class"];
      }
    }

    return VScroll_Item;
  },
  replace: function replace(__axis) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    if (this.engine.enabled) {
      this.engine.enabled = false;
    }

    Scroll.x = -window.pageXOffset;
    Scroll.y = -window.pageYOffset;
    _oldScroll = {
      engine: this.engine,
      y: this.y,
      x: this.x,
      axis: this.axis,
      direction: this.direction
    };
    this.init(__axis, options);
  },
  show: function show() {
    this.engine.show();
  },
  start: function start() {
    if (!this.engine.enabled) this.engine.enabled = true;
  },
  stop: function stop() {
    if (this.engine.enabled) this.engine.enabled = false;
  },
  setEnabled: function setEnabled(__bol) {
    if (this.engine.enabled !== __bol) this.engine.enabled = __bol;
  },
  setSlidesMode: function setSlidesMode(__bol) {
    var _this = this;

    if (__bol) {
      this.engine.enabledWheel = false;
      this._wheel = new WheelControls({
        onForward: function onForward() {
          _this.gotoAvPag();
        },
        onBackward: function onBackward() {
          _this.gotoRePag();
        }
      });
    } else {
      this.engine.enabledWheel = this.engine.options.wheel;

      this._wheel.dispose();
    }
  },
  setScrollbar: function setScrollbar(scrollbar) {
    this.engine.setScrollbar(scrollbar);
  },
  loop: function loop() {
    if (this.engine) {
      this.engine.loop();
    }
  },
  resize: function resize() {
    if (this.engine) {
      this.engine.resize();
    }
  },
  setWheel0: function setWheel0(__n) {
    this.engine.pWheel0 = __n;
  },
  gotoDOMElement: function gotoDOMElement(__element) {
    Scroll["goto"](this.axis === "Y" ? __element.offsetTop - Scroll.offsetAnchor : __element.offsetLeft - Scroll.offsetAnchor);
  },
  gotoAnchor: function gotoAnchor(__id) {
    var anchor = C.GetBy.id(__id);
    var offset = anchor.getAttribute("data-offscreen-anchor") != undefined ? Number(anchor.getAttribute("data-offscreen-anchor")) : Scroll.offsetAnchor;
    Scroll["goto"](this.axis === "Y" ? anchor.offsetTop - offset : anchor.offsetLeft - offset);
  },
  gotoNextAnchor: function gotoNextAnchor() {
    Scroll.gotoAnchor(this.getNextAnchor());
  },
  gotoPrevAnchor: function gotoPrevAnchor() {
    Scroll.gotoAnchor(Scroll.getPrevAnchor());
  },
  gotoAvPag: function gotoAvPag(__isDirect) {
    this.engine.gotoAvPag();
  },
  gotoRePag: function gotoRePag(__isDirect) {
    this.engine.gotoRePag(__isDirect);
  },
  gotoHome: function gotoHome(__isDirect) {
    this.engine.gotoHome(__isDirect);
  },
  gotoEnd: function gotoEnd(__isDirect) {
    this.engine.gotoEnd(__isDirect);
  },
  "goto": function goto(__n) {
    this.engine["goto"](__n);
  },
  gotoPercentage: function gotoPercentage() {
    this.engine.gotoPercentage(__n);
  },
  directGoto: function directGoto(__n) {
    this.engine.directGoto(__n);
  },
  move: function move(__n) {
    if (this.engine.enabled) this.engine.move(__n);
  },
  add: function add(__item) {
    if (this.engine) this.engine.add(__item);
  },
  addAll: function addAll() {
    if (this.engine) this.engine.addAll();
  },
  addBullet: function addBullet(__id) {
    this._anchors.push(__id);

    this.engine.addBullet(C.GetBy.id(__id));
  },
  getNextAnchor: function getNextAnchor() {
    for (var i = 0; i < this._anchors.length; i++) {
      if (this._anchors[i] === this.anchor && i + 1 < this._anchors.length) {
        return this._anchors[i + 1];
      }
    }

    return this.anchor;
  },
  getPrevAnchor: function getPrevAnchor() {
    for (var i = this._anchors.length - 1; i > -1; i--) {
      if (this._anchors[i] === this.anchor && i - 1 > -1) {
        return this._anchors[i - 1];
      }
    }

    return this.anchor;
  },
  hide: function hide() {
    if (this.engine) this.engine.hide();
  },
  dispose: function dispose() {
    Scroll.engine.dispose();
    Scroll.engine = null;
    Scroll.y = -window.pageYOffset;
    Scroll.x = -window.pageXOffset;
    Scroll.axis = null;
    Scroll.isScrolling = false;
    Scroll.direction = 0;
    Basics.velocidad = 0;
  }
};;"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var Scrollbar =
/*#__PURE__*/
function () {
  //progress : thumb
  function Scrollbar() {
    var __container = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : C.GetBy.id("Scrollbar");

    _classCallCheck(this, Scrollbar);

    _defineProperty(this, "container", null);

    _defineProperty(this, "track", null);

    _defineProperty(this, "thumb", null);

    _defineProperty(this, "p0", 0);

    _defineProperty(this, "p1", 0);

    _defineProperty(this, "size", 0);

    _defineProperty(this, "sizeThumb", 0);

    _defineProperty(this, "offset", 0);

    _defineProperty(this, "axis", void 0);

    _defineProperty(this, "type", void 0);

    _defineProperty(this, "onChange", null);

    _defineProperty(this, "progress", 0);

    _defineProperty(this, "_isDrag", false);

    _defineProperty(this, "_axis", void 0);

    _defineProperty(this, "_s", void 0);

    _defineProperty(this, "_p", void 0);

    this.container = __container;
    this.track = C.GetBy["class"]("track", this.container)[0];
    this.thumb = C.GetBy["class"]("thumb", this.container)[0];
    this.axis = this.container.getAttribute("data-axis-x") == null ? "Y" : "X";
    this.type = this.container.getAttribute("data-type") == null ? "progress" : this.container.getAttribute("data-direction");

    if (this.axis === "Y") {
      this._axis = "y";
      this._s = "height";
      this._p = "scaleY";
    } else {
      this._axis = "x";
      this._s = "width";
      this._p = "scaleX";
    }

    this.setup();
    this.resize();
  }

  _createClass(Scrollbar, [{
    key: "setup",
    value: function setup() {
      var _this = this;

      if (this.type === "progress") {
        /*this.container.addEventListener(Basics.clickEvent, (e) => {
          this.check(this.direction === "Y"? e.clientY : e.clientX);
        });*/
        this.container.addEventListener(Basics.downEvent, function (e) {
          //Cursor.drag = true;
          var __drag = function __drag(e) {
            _this.drag(e);
          };

          var __remove = function __remove() {
            //Cursor.drag = false;
            _this.container.removeEventListener(Basics.moveEvent, __drag);

            _this.container.removeEventListener(Basics.upEvent, __remove);

            document.removeEventListener(Basics.moveEvent, __drag);
            document.removeEventListener(Basics.upEvent, __remove);
          };

          _this.check(_this.axis === "Y" ? e.clientY : e.clientX);

          _this.container.addEventListener(Basics.moveEvent, __drag);

          _this.container.addEventListener(Basics.upEvent, __remove);

          document.addEventListener(Basics.moveEvent, __drag);
          document.addEventListener(Basics.upEvent, __remove);
        });
      } else {}
    }
  }, {
    key: "drag",
    value: function drag(e) {
      this.check(this.axis === "Y" ? e.clientY : e.clientX);
    }
  }, {
    key: "check",
    value: function check(__p) {
      if (this.onChange) this.onChange(Math.max(0, Math.min(1, Maths.precission(Maths.normalize(this.p1, this.p0, __p - this.offset), 3))));
    }
  }, {
    key: "update",
    value: function update(__progress) {
      this.progress = __progress;
      TweenLite.set(this.thumb, _defineProperty({}, this._p, __progress));
    }
  }, {
    key: "end",
    value: function end() {
      this.progress = 0;
      TweenLite.set(this.thumb, _defineProperty({}, this._p, 0));
    }
  }, {
    key: "resize",
    value: function resize() {
      if (this.axis === "Y") {
        this.size = this.track.offsetHeight;
        this.sizeThumb = this.thumb.offsetHeight;
        this.offset = this.container.offsetTop;
      } else {
        this.size = this.track.offsetWidth;
        this.sizeThumb = this.thumb.offsetWidth;
        this.offset = this.container.offsetLeft;
      }

      this.p0 = 0;
      this.p1 = this.size;
    }
  }, {
    key: "dispose",
    value: function dispose() {}
  }]);

  return Scrollbar;
}();;"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var MrScroll =
/*#__PURE__*/
function () {
  _createClass(MrScroll, [{
    key: "enabled",
    //
    // GETTER & SETTER
    //
    get: function get() {
      return this._enabled;
    },
    set: function set(__bol) {
      if (this._enabled !== __bol) {
        if (!__bol) {
          if (!this._container.classList.contains("__noScroll")) {
            this._container.classList.add("__noScroll");

            Scroll.y = Scroll.y - 1;
            window.scroll(0, -Scroll.y);
          }

          this._element.removeEventListener('scroll', this._call, {
            passive: true
          });
        } else {
          this._container.classList.remove("__noScroll");

          this._element.addEventListener('scroll', this._call);
        }
      }

      this._enabled = __bol;
    } //
    // CONSTRUCTOR
    //

  }]);

  function MrScroll() {
    var _this = this;

    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    _classCallCheck(this, MrScroll);

    _defineProperty(this, "id", void 0);

    _defineProperty(this, "width", void 0);

    _defineProperty(this, "height", void 0);

    _defineProperty(this, "options", void 0);

    _defineProperty(this, "position", 0);

    _defineProperty(this, "size", 0);

    _defineProperty(this, "p0", 0);

    _defineProperty(this, "p1", 0);

    _defineProperty(this, "target", 0);

    _defineProperty(this, "pWheel0", 0);

    _defineProperty(this, "isNative", true);

    _defineProperty(this, "total_items", 0);

    _defineProperty(this, "progress", 0);

    _defineProperty(this, "scrollbar", null);

    _defineProperty(this, "hasLinkNext", false);

    _defineProperty(this, "_items", []);

    _defineProperty(this, "_container", null);

    _defineProperty(this, "_element", null);

    _defineProperty(this, "_enabled", false);

    _defineProperty(this, "_isShow", false);

    _defineProperty(this, "_axis", "y");

    _defineProperty(this, "_measure", "height");

    _defineProperty(this, "_offsetAxis", "offsetTop");

    _defineProperty(this, "_offsetSize", "offsetHeight");

    _defineProperty(this, "_call", void 0);

    this._container = options.container;
    this._element = options.element;
    this.id = this._container.getAttribute("id") || "";
    this.width = this._container.offsetWidth;
    this.height = this._container.offsetHeight;
    this.options = {
      itemClass: options.itemClass || VScroll_Item,
      wheel: options.wheel === undefined ? true : options.wheel,
      isMain: options.isMain || true
    };

    this._container.classList.add("__scroll-manual");

    this._container.classList.add("__scroll-axis-y");

    this._axis = "y";
    this._measure = "height";
    this._offsetAxis = "offsetTop";
    this._offsetSize = "offsetHeight";

    this._call = function () {
      _this._check();
    };

    this.position = Scroll.y = -window.pageYOffset;
  } //
  // PRIVATE
  //


  _createClass(MrScroll, [{
    key: "_check",
    value: function _check() {
      Scroll.isScrolling = true;
      Scroll.direction = Scroll.y > -window.pageYOffset ? 1 : -1;
      this.position = Scroll.y = -window.pageYOffset;
    }
  }, {
    key: "_getClass",
    value: function _getClass(__item) {
      var idClass = __item.getAttribute("data-scroll-class") || "default";

      for (var i = 0, j = this.options.itemClass.length; i < j; i++) {
        if (idClass === this.options.itemClass[i].id || i === this.options.itemClass.length - 1) {
          return this.options.itemClass[i]["class"];
        }
      }
    } //
    // PUBLIC
    //

  }, {
    key: "start",
    value: function start() {
      this.enabled = true;
    }
  }, {
    key: "show",
    value: function show() {
      if (!this._isShow) {
        this.loop(true);
        this._isShow = true;
      }
    }
  }, {
    key: "addDomElement",
    value: function addDomElement(__item) {
      var item = new this.options.itemClass(__item, this.total_items, this);
      this.total_items = this._items.push(item);
      this.resetPositions();
    }
  }, {
    key: "add",
    value: function add(__item) {
      var __z = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;

      this.total_items = this._items.push(__item);
    }
  }, {
    key: "addAll",
    value: function addAll() {
      var __selector = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '[scroll-item]';

      var _items = this._container.querySelectorAll(__selector);

      for (var i = 0, j = _items.length; i < j; i++) {
        var _class = Scroll._classItems.length > 0 ? Scroll._getClass(_items[i]) : this.options.itemClass;

        var _item = new _class(_items[i], this.total_items, this);

        this.total_items = this._items.push(_item);
      }

      this.resetPositions();
    }
  }, {
    key: "addBullet",
    value: function addBullet(__el) {
      this.scrollbar.addBullet(__el);
    }
  }, {
    key: "setScrollbar",
    value: function setScrollbar(__scrollbar) {
      var _this2 = this;

      this.scrollbar = __scrollbar;

      this.scrollbar.onChange = function (__p) {
        _this2["goto"](Maths.lerp(_this2.p0, -_this2.p1, __p));
      };
    }
  }, {
    key: "goto",
    value: function goto(__n) {
      var _this3 = this;

      var __duration = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 2;

      var __ease = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : Power3.easeInOut;

      gsap.to(this._element, {
        scrollTo: __n,
        __duration: __duration,
        ease: __ease,
        onUpdate: function onUpdate() {
          return _this3._check();
        }
      });
    }
  }, {
    key: "directGoto",
    value: function directGoto(__n) {
      TweenLite.set(this._element, {
        scrollTo: __n
      });

      this._check();
    }
  }, {
    key: "move",
    value: function move(__n) {
      this.directGoto(__n);
    }
  }, {
    key: "loop",
    value: function loop() {
      var __force = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;

      if (Scroll.isScrolling || __force) {
        for (var i = 0; i < this.total_items; i++) {
          this._items[i][this._axis] = this.position;
        }
      }

      Scroll.isScrolling = false;
    }
  }, {
    key: "resetPositions",
    value: function resetPositions() {
      this.p1 = this.p0;

      for (var i = 0; i < this.total_items; i++) {
        var temp = this._items[i]._item[this._offsetAxis]; //this._items[i].setPositions(0, temp);

        this.p1 = Math.max(this.p1, temp + this._items[i][this._measure]);
      }

      this.p1 = Math.floor(this._container[this._offsetSize] - this.p1);
      this.size = -this.p1;
    }
  }, {
    key: "resize",
    value: function resize() {
      this.width = this._container.offsetWidth;
      this.height = this._container.offsetHeight;
      this.p1 = this.p0;

      for (var i = 0; i < this.total_items; i++) {
        this._items[i].resize(this.width, this.height);
      }

      for (var _i = 0; _i < this.total_items; _i++) {
        //this._items[i].resizeLimits(this._container[this._offsetSize]); APAÑO RAPIDO
        this._items[_i].resizeLimits(Metrics.HEIGHT);

        this.p1 = Math.max(this.p1, this._items[_i]._item[this._offsetAxis] + this._items[_i][this._measure]);
      }

      this.p1 = Math.floor(this._container[this._offsetSize] - this.p1);
      this.position = Math.min(this.position, this.p1);
      this.size = -this.p1;
      if (this.scrollbar) this.scrollbar.resize();

      if (this._isShow) {
        this.loop(true);
      }
    }
  }, {
    key: "hide",
    value: function hide() {
      this.enabled = false;

      this._container.classList.remove("__scroll-manual");

      this._container.classList.remove("__noScroll");

      this._container.classList.remove("__scroll-axis-y");

      this._container.classList.remove("__scroll-axis-x");

      if (this.scrollbar) this.scrollbar.end();
    }
  }, {
    key: "dispose",
    value: function dispose() {
      this.enabled = false;

      for (var i = 0; i < this.total_items; i++) {
        this._items[i].dispose();
      }

      this.total_items = 0;
      this._items = [];
    }
  }]);

  return MrScroll;
}();;"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var VScroll =
/*#__PURE__*/
function () {
  _createClass(VScroll, [{
    key: "enabledWheel",
    //
    // GETTER & SETTER
    //
    get: function get() {
      return this._enabled;
    },
    set: function set(__isEnabled) {
      if (this._isWheelEnabled !== __isEnabled) {
        this._isWheelEnabled = __isEnabled;

        if (this._isWheelEnabled) {
          VirtualScroll.on(this._call);
        } else {
          VirtualScroll.off(this._call);
        }
      }
    }
  }, {
    key: "enabled",
    get: function get() {
      return this._enabled;
    },
    set: function set(__isEnabled) {
      if (this._enabled !== __isEnabled) {
        this._enabled = __isEnabled;

        if (__isEnabled) {
          this._initKeyboard();
        } else {
          this._endKeyboard();
        }

        this.enabledWheel = __isEnabled && this.options.wheel;
      }
    }
  }]);

  //
  // CONSTRUCTOR
  //
  function VScroll() {
    var _this = this;

    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    _classCallCheck(this, VScroll);

    _defineProperty(this, "id", void 0);

    _defineProperty(this, "width", void 0);

    _defineProperty(this, "height", void 0);

    _defineProperty(this, "options", void 0);

    _defineProperty(this, "position", 0);

    _defineProperty(this, "size", 0);

    _defineProperty(this, "p0", 0);

    _defineProperty(this, "p1", 0);

    _defineProperty(this, "target", 0);

    _defineProperty(this, "pWheel0", 0);

    _defineProperty(this, "isNative", false);

    _defineProperty(this, "total_items", 0);

    _defineProperty(this, "progress", 0);

    _defineProperty(this, "scrollbar", null);

    _defineProperty(this, "hasLinkNext", false);

    _defineProperty(this, "_items", []);

    _defineProperty(this, "_container", null);

    _defineProperty(this, "_enabled", false);

    _defineProperty(this, "_isWheelEnabled", false);

    _defineProperty(this, "_isShow", false);

    _defineProperty(this, "_axis", "y");

    _defineProperty(this, "_measure", "height");

    _defineProperty(this, "_offsetAxis", "offsetTop");

    _defineProperty(this, "_offsetSize", "offsetHeight");

    _defineProperty(this, "_call", void 0);

    this._container = options.container;
    this.id = Functions.getId(this._container);
    this.width = this._container.offsetWidth;
    this.height = this._container.offsetHeight;
    this.options = {
      axis: options.axis || Scroll.AXIS_Y,
      easing: options.easing || 0.08,
      maxSpeed: options.maxSpeed || 400,
      gap: options.gap || 1,
      multiplicator: options.multiplicator || 1,
      itemClass: options.itemClass || VScroll_Item,
      wheel: options.wheel === undefined ? true : options.wheel,
      isMain: options.isMain || true
    };

    this._call = function (e) {
      _this._check(e);
    };

    this._container.classList.add("__vscroll");

    switch (this.options.axis) {
      case Scroll.AXIS_Y:
        this._container.classList.add("__scroll-axis-y");

        this._axis = "y";
        this._measure = "height";
        this._offsetAxis = "offsetTop";
        this._offsetSize = "offsetHeight";
        break;

      case Scroll.AXIS_X:
        this._container.classList.add("__scroll-axis-x");

        this._axis = "x";
        this._measure = "width";
        this._offsetAxis = "offsetLeft";
        this._offsetSize = "offsetWidth";
        break;
    }
  }

  _createClass(VScroll, [{
    key: "_initKeyboard",
    value: function _initKeyboard() {
      var _this2 = this;

      Keyboard.add(Keyboard.HOME, this.id, function () {
        _this2.gotoHome();
      });
      Keyboard.add(Keyboard.END, this.id, function () {
        _this2.gotoEnd();
      });
      Keyboard.add(Keyboard.REPAG, this.id, function () {
        _this2.gotoRePag();
      });
      Keyboard.add(Keyboard.AVPAG, this.id, function () {
        _this2.gotoAvPag();
      });
    }
  }, {
    key: "_endKeyboard",
    value: function _endKeyboard() {
      Keyboard.remove(Keyboard.HOME, this.id);
      Keyboard.remove(Keyboard.END, this.id);
      Keyboard.remove(Keyboard.REPAG, this.id);
      Keyboard.remove(Keyboard.AVPAG, this.id);
    } //
    // PRIVATE
    //

  }, {
    key: "_check",
    value: function _check(e) {
      var d = e.deltaY * this.options.multiplicator;
      Scroll.isScrolling = true;
      Scroll.direction = e.deltaY < 0 ? 1 : -1;

      this._setTarget(Maths.precission(this.target + d, 2));
    }
  }, {
    key: "_setTarget",
    value: function _setTarget(__n) {
      this.target = Math.min(this.p0, Math.max(__n, this.p1));
    }
    /*_getClass(__item) {
      let idClass = __item.getAttribute("data-scroll-class") || "default";
      for (let i = 0, j = this.options.itemClass.length; i < j; i++) {
        if (idClass === this.options.itemClass[i].id || i === this.options.itemClass.length - 1) {
          return this.options.itemClass[i].class;
        }
      }
    }*/
    //
    // PUBLIC
    //

  }, {
    key: "start",
    value: function start() {
      this.enabled = true;
    }
  }, {
    key: "show",
    value: function show() {
      if (!this._isShow) {
        this.loop(true);
        this._isShow = true;
      }
    }
  }, {
    key: "addDomElement",
    value: function addDomElement(__item) {
      var __z = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;

      var item = new this.options.itemClass(__item, this.total_items, this);
      item.z = __z;
      this.total_items = this._items.push(item);
      this.resetPositions();
    }
  }, {
    key: "add",
    value: function add(__item) {
      var __z = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;

      this.total_items = this._items.push(__item);
    }
  }, {
    key: "addAll",
    value: function addAll() {
      var __selector = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '[scroll-item]';

      var _items = this._container.querySelectorAll(__selector);

      for (var i = 0, j = _items.length; i < j; i++) {
        var _class = Scroll._classItems.length > 0 ? Scroll._getClass(_items[i]) : this.options.itemClass;

        var _item = new _class(_items[i], this.total_items, this);

        this.total_items = this._items.push(_item);
      }

      this.resetPositions();
    }
  }, {
    key: "addBullet",
    value: function addBullet(__el) {
      this.scrollbar.addBullet(__el);
    }
  }, {
    key: "setScrollbar",
    value: function setScrollbar(__scrollbar) {
      var _this3 = this;

      this.scrollbar = __scrollbar;

      this.scrollbar.onChange = function (__p) {
        _this3["goto"](Maths.lerp(_this3.p0, -_this3.p1, __p));
      };
    }
    /*
     GOTOs
      */

  }, {
    key: "gotoAvPag",
    value: function gotoAvPag(__isDirect) {
      this._goto(-this.target + this[this._measure], __isDirect);
    }
  }, {
    key: "gotoRePag",
    value: function gotoRePag(__isDirect) {
      this._goto(-this.target - this[this._measure], __isDirect);
    }
  }, {
    key: "gotoHome",
    value: function gotoHome(__isDirect) {
      this._goto(0, __isDirect);
    }
  }, {
    key: "gotoEnd",
    value: function gotoEnd(__isDirect) {
      this._goto(-this.p1, __isDirect);
    }
  }, {
    key: "_goto",
    value: function _goto(__n, __isDirect) {
      if (__isDirect) {
        this.directGoto(__n);
      } else {
        this["goto"](__n);
      }
    }
  }, {
    key: "goto_percetage",
    value: function goto_percetage(__percentage, __isDirect) {
      this._goto(Maths.lerp(this.p0, -this.p1, __percentage, __isDirect));
    }
  }, {
    key: "goto",
    value: function goto(__n) {
      Scroll.isScrolling = true;

      this._setTarget(-__n);
    }
  }, {
    key: "directGoto",
    value: function directGoto(__n) {
      Scroll.isScrolling = true;

      this._setTarget(-__n);

      this.position = this.target;
      this.loop(true);
    }
  }, {
    key: "move",
    value: function move(__n) {
      this.target = Math.min(this.p0, Math.max(Maths.precission(this.target + __n, 2), this.p1));

      this._setTarget(Maths.precission(this.target + __n, 2));
    }
    /*
     LOOP
      */

  }, {
    key: "loop",
    value: function loop() {
      var __force = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;

      if (this.target !== this.position || __force) {
        this.speed = Maths.precission((this.target - this.position) * this.options.easing, 2);
        if (this.speed === 0) this.position = this.target;

        if (this.speed > 0) {
          this.speed = Math.min(this.speed, -this.position / 10);
          this.position = Maths.precission(this.position + this.speed, 2);
        } else if (this.speed < 0) {
          //SCROLL DOWN
          this.speed = Math.max(this.speed, (this.p1 - this.position) / 10);
          this.position = Maths.precission(this.position + this.speed, 2);
        }

        Scroll[this._axis] = this.position;

        for (var i = 0; i < this.total_items; i++) {
          this._items[i][this._axis] = this.position;
        }

        this.progress = this.position === 0 ? 0 : this.position / this.p1;

        if (this.scrollbar) {
          this.scrollbar.update(this.progress);
        }

        if (this.options.wheel && this.options.isMain) {
          Basics.velocidad = this.speed;
          Scroll.speed = this.speed;
        }
      } else if (this.target === this.p1 && this.hasLinkNext) {
        this._items[this.total_items - 1][this._axis] = this.position;
      } else {
        if (this.options.wheel) {
          Scroll.isScrolling = false;
        }
      }
    }
    /*
     RESIZES
      */

  }, {
    key: "resetPositions",
    value: function resetPositions() {
      this.p1 = this.p0;

      for (var i = 0; i < this.total_items; i++) {
        var temp = this._items[i]._item[this._offsetAxis]; //this._items[i].setPositions(0, temp);

        this.p1 = Math.max(this.p1, temp + this._items[i][this._measure]);
      }

      this.p1 = Math.floor(this._container[this._offsetSize] - this.p1);
      this.size = -this.p1;
    }
  }, {
    key: "resize",
    value: function resize() {
      this.width = this._container.offsetWidth;
      this.height = this._container.offsetHeight;
      this.p1 = this.p0;

      for (var i = 0; i < this.total_items; i++) {
        this._items[i].resize(this.width, this.height);
      }

      for (var _i = 0; _i < this.total_items; _i++) {
        this._items[_i].resizeLimits(this._container[this._offsetSize]);

        this.p1 = Math.max(this.p1, this._items[_i]._item[this._offsetAxis] + this._items[_i][this._measure]);
      }

      this.p1 = Math.floor(this._container[this._offsetSize] - this.p1);
      this.position = Math.max(this.position, this.p1);
      this.size = -this.p1;
      if (this.scrollbar) this.scrollbar.resize();

      if (this._isShow) {
        this.loop(true);
      }
    }
    /*
     HIDE
      */

  }, {
    key: "hide",
    value: function hide() {
      this.enabled = false;

      this._container.classList.remove("__vscroll");

      this._container.classList.remove("__scroll-axis-y");

      this._container.classList.remove("__scroll-axis-x");

      if (this.scrollbar) this.scrollbar.end();
    }
    /*
     DISPOSE
      */

  }, {
    key: "dispose",
    value: function dispose() {
      this.enabled = false;

      for (var i = 0; i < this.total_items; i++) {
        this._items[i].dispose();
      }

      this.total_items = 0;
      this._items = [];
    }
  }]);

  return VScroll;
}();

_defineProperty(VScroll, "classItems", []);;"use strict";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _get(target, property, receiver) { if (typeof Reflect !== "undefined" && Reflect.get) { _get = Reflect.get; } else { _get = function _get(target, property, receiver) { var base = _superPropBase(target, property); if (!base) return; var desc = Object.getOwnPropertyDescriptor(base, property); if (desc.get) { return desc.get.call(receiver); } return desc.value; }; } return _get(target, property, receiver || target); }

function _superPropBase(object, property) { while (!Object.prototype.hasOwnProperty.call(object, property)) { object = _getPrototypeOf(object); if (object === null) break; } return object; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var VScroll_Item =
/*#__PURE__*/
function () {
  _createClass(VScroll_Item, [{
    key: "update",
    value: function update() {
      this.progress = this.progressItem;

      if (this.isInViewport) {
        if (!this._needUpdate) {
          this.item.style.visibility = "visible";
          this._needUpdate = true;
        }

        this.draw();
        this.setInsideY();
        this.visible();
        this.show();
      } else if (this._needUpdate) {
        this._needUpdate = false;
        this.item.style.visibility = Basics.isTouch ? "visible" : "hidden";
        this.draw();
        this.setInsideY();
        this.hide();
      }
    }
  }, {
    key: "draw",
    value: function draw() {
      var y = this._y;
      var x = this._x;
      var z = this._z;

      if (this.opts.positionStop != null) {
        switch (this._axis) {
          case "y":
            y = Math.min(this.y + this.opts.positionResume, Math.max(this.y, this.opts.positionStop));
            break;

          case "x":
            x = Math.min(this.x + this.opts.positionResume, Math.max(this.x, this.opts.positionStop));
            break;

          case "z":
            z = Math.min(this.z + this.opts.positionResume, Math.max(this.z, this.opts.positionStop));
            break;
        }
      }

      if (!this._scroller.isNative) {
        this.item.style[CSS.transform] = CSS.translate3D(x, y, z);
      }

      if (this.onMove) {
        this.onMove({
          x: this.realX,
          y: this.realY,
          z: this.z
        }, {
          width: this.width,
          height: this.height
        });
      }
    }
  }, {
    key: "setPositions",
    value: function setPositions(__top, __left) {
      this.top = __top;
      this.left = __left;
      this.setInsidePosition();
    }
  }, {
    key: "setInsideY",
    value: function setInsideY() {
      if (this._nInsiders > 0) {
        var y = this.realY;

        for (var i = 0; i < this._nInsiders; i++) {
          this._insiders[i].loop({
            x: this.realX,
            y: this.realY,
            z: this.z
          }, this.progress);
        }
      }
    }
  }, {
    key: "setInsidePosition",
    value: function setInsidePosition() {
      this.setInsideY();
    } //
    // CONSTRUCTOR
    //

  }, {
    key: "isInViewport",
    //OLD
    //
    //position{x,y,z} size{width,height}

    /* GETTER SETTER */
    get: function get() {
      return this.positionAxis >= this._p0 && this.positionAxis < this._p1;
    }
  }, {
    key: "isInViewportOffset",
    get: function get() {
      return this.positionAxis + this.opts.offsetShow >= this._p0 && this.positionAxis + this.opts.offsetShow < this._p1;
    }
  }, {
    key: "progressItem",
    get: function get() {
      return Maths.precission(Maths.normalize(this._p0, this._p1, this.positionAxis), 3);
    }
  }, {
    key: "progressZero",
    get: function get() {
      return Maths.precission(Maths.normalize(this._p0 + this._scroller[this._scroller._measure], this._p1 - this._scroller[this._scroller._measure], this.positionAxis), 3);
    }
  }, {
    key: "realX",
    get: function get() {
      return this.left + this._x;
    }
  }, {
    key: "realY",
    get: function get() {
      return this.top + this._y;
    }
  }, {
    key: "positionAxis",
    get: function get() {
      return this[this._axis];
    },
    set: function set(__n) {
      this[this._axis] = __n;
      this.update();
    }
  }, {
    key: "x",
    get: function get() {
      return this._x;
    },
    set: function set(__n) {
      this._x = Maths.precission(__n, 2) * this.opts.speed.x;
      this.update();
    }
  }, {
    key: "y",
    get: function get() {
      return this._y;
    },
    set: function set(__n) {
      this._y = Maths.precission(__n, 2) * this.opts.speed.y;
      this.update();
    }
  }, {
    key: "z",
    get: function get() {
      return this._z;
    },
    set: function set(__n) {
      this._z = Maths.precission(__n, 2) * this.opts.speed.z;
      this.update();
    }
  }]);

  function VScroll_Item(__link, __index, __scroller) {
    _classCallCheck(this, VScroll_Item);

    _defineProperty(this, "item", void 0);

    _defineProperty(this, "id", void 0);

    _defineProperty(this, "index", void 0);

    _defineProperty(this, "top", void 0);

    _defineProperty(this, "left", void 0);

    _defineProperty(this, "width", void 0);

    _defineProperty(this, "height", void 0);

    _defineProperty(this, "progress", 0);

    _defineProperty(this, "opts", {
      speed: {
        y: 1,
        x: 1,
        z: 1
      },
      offset: 0,
      offsetShow: 0,
      positionStop: null,
      positionResume: null
    });

    _defineProperty(this, "_item", void 0);

    _defineProperty(this, "onShow", null);

    _defineProperty(this, "onVisible", null);

    _defineProperty(this, "onHide", null);

    _defineProperty(this, "onMove", null);

    _defineProperty(this, "isShow", false);

    _defineProperty(this, "isVisible", false);

    _defineProperty(this, "firstShow", true);

    _defineProperty(this, "firstVisible", true);

    _defineProperty(this, "_x", 0);

    _defineProperty(this, "_y", 0);

    _defineProperty(this, "_z", 0);

    _defineProperty(this, "_p0", 0);

    _defineProperty(this, "_p1", 0);

    _defineProperty(this, "_needUpdate", true);

    _defineProperty(this, "_nInsiders", 0);

    _defineProperty(this, "_insiders", []);

    _defineProperty(this, "_nVideos", 0);

    _defineProperty(this, "_videos", []);

    _defineProperty(this, "_axis", "y");

    _defineProperty(this, "_measure", "height");

    _defineProperty(this, "_domAxis", "top");

    _defineProperty(this, "_offsetAxis", "offsetTop");

    _defineProperty(this, "_offsetSize", "offsetHeight");

    this.item = __link;
    this.index = __index;
    this.id = this.getId();
    this._item = __link;
    this._scroller = __scroller;
    this._axis = this._scroller._axis;
    this._domAxis = this._axis === "y" ? "top" : "left";
    this._measure = this._axis === "y" ? "height" : "width";
    var TRANSLATE = CSS.getTranslate(this.item);
    this._x = TRANSLATE.x;
    this._y = TRANSLATE.y;
    this._z = TRANSLATE.z;

    if (this.item.style.zIndex != "" && this._z === 0) {
      this._z = this.item.style.zIndex;
    }

    this.width = this.item.offsetWidth;
    this.height = this.item.offsetHeight;
    this.getOptions();
    this.getInsiders();
  }

  _createClass(VScroll_Item, [{
    key: "getOptions",
    value: function getOptions() {
      this.opts.speed[this._axis] = this.item.getAttribute("data-speed") !== null ? Number(this.item.getAttribute("data-speed")) : this.opts.speed[this._axis];
      this.opts.speed.y = this.item.getAttribute("data-speed-y") !== null ? Number(this.item.getAttribute("data-speed-y")) : this.opts.speed.y;
      this.opts.speed.x = this.item.getAttribute("data-speed-x") !== null ? Number(this.item.getAttribute("data-speed-x")) : this.opts.speed.x;
      this.opts.speed.z = this.item.getAttribute("data-speed-z") !== null ? Number(this.item.getAttribute("data-speed-z")) : this.opts.speed.z;
      this.opts.offset = this.item.getAttribute("data-offset") !== null ? Number(this.item.getAttribute("data-offset")) : Metrics.HEIGHT * .2;
      this.opts.positionStop = this.item.getAttribute("data-stop") !== null ? Number(this.item.getAttribute("data-stop")) : this.opts.positionStop;
      this.opts.positionResume = this.item.getAttribute("data-resume") !== null ? Number(this.item.getAttribute("data-resume")) : this.opts.positionResume; //POSTION Z

      this._z = this.item.getAttribute("data-z") !== null ? Number(this.item.getAttribute("data-z")) : this._z;
    }
  }, {
    key: "getId",
    value: function getId() {
      if (!this.item.getAttribute("id")) {
        this.item.setAttribute("id", "__" + new Date().getTime() + "__" + this.index);
      }

      return this.item.getAttribute("id");
    }
  }, {
    key: "getInsiders",
    value: function getInsiders() {
      var items;
      /* VIDEO */

      items = C.GetBy.selector("[data-scroll-video]", this.item);

      for (var i = 0, j = items.length; i < j; i++) {
        var id = items[i].getAttribute("data-scroller-id") || this._scroller.id;

        var MOBILE_ENABLED = true; //Basics.isMobile && items[i].getAttribute("data-avoid-mobile") === null || !Basics.isMobile;

        /*** El PLAY PAUSE del video lo dejamos siempre activo, sea movil o no. */

        if (id === this._scroller.id && MOBILE_ENABLED) {
          items[i].removeAttribute("controls");

          if (!Basics.isMobile) {
            this._nVideos = this._videos.push(items[i]);
          } else {
            items[i].setAttribute("autoplay", "true");
            var PARENT = items[i].parentNode;
            var VIDEO = items[i].cloneNode(true);
            C.Remove(items[i]);
            PARENT.appendChild(VIDEO);
          }
        }
      }
      /* SCALERS */


      items = C.GetBy.selector("[data-scroll-scale]", this.item);

      for (var _i = 0, _j = items.length; _i < _j; _i++) {
        var _id = items[_i].getAttribute("data-scroller-id") || this._scroller.id;

        var _MOBILE_ENABLED = Basics.isTouch && items[_i].getAttribute("data-avoid-mobile") === null || !Basics.isTouch;

        if (_id === this._scroller.id && _MOBILE_ENABLED) {
          var item = new VScrollitem_Scale(items[_i], this._axis);
          this._nInsiders = this._insiders.push(item);
        }
      }
      /* MOVERS */


      items = C.GetBy.selector("[data-scroll-displace]", this.item);

      for (var _i2 = 0, _j2 = items.length; _i2 < _j2; _i2++) {
        var _id2 = items[_i2].getAttribute("data-scroller-id") || this._scroller.id;

        var _MOBILE_ENABLED2 = Basics.isTouch && items[_i2].getAttribute("data-avoid-mobile") === null || !Basics.isTouch;

        if (_id2 === this._scroller.id && _MOBILE_ENABLED2) {
          var _item2 = new VScrollitem_Displace(items[_i2], this._axis);

          this._nInsiders = this._insiders.push(_item2);
        }
      }
      /* INSIDERS */


      items = C.GetBy.selector("[data-scroll-insider]", this.item);

      for (var _i3 = 0, _j3 = items.length; _i3 < _j3; _i3++) {
        var _id3 = items[_i3].getAttribute("data-scroller-id") || this._scroller.id;

        var _MOBILE_ENABLED3 = Basics.isTouch && items[_i3].getAttribute("data-avoid-mobile") === null || !Basics.isTouch;

        if (_id3 === this._scroller.id && _MOBILE_ENABLED3) {
          var _item3 = new VScrollitem_Insider(items[_i3], this._axis);

          this._nInsiders = this._insiders.push(_item3);
        }
      }
      /* INSIDERS MASK */


      items = C.GetBy.selector("[data-scroll-insider-mask]", this.item);

      for (var _i4 = 0, _j4 = items.length; _i4 < _j4; _i4++) {
        var _id4 = items[_i4].getAttribute("data-scroller-id") || this._scroller.id;

        var _MOBILE_ENABLED4 = Basics.isTouch && items[_i4].getAttribute("data-avoid-mobile") === null || !Basics.isTouch;

        if (_id4 === this._scroller.id && _MOBILE_ENABLED4) {
          var _item4 = new VScrollitem_InsiderMask(items[_i4], this._axis, this.item);

          this._nInsiders = this._insiders.push(_item4);
        }
      }

      if (this._scroller.isNative) return; //DESDE AQUI SOLO VSCROLL

      /* STICKY */

      items = C.GetBy.selector("[data-scroll-sticky]", this.item);

      for (var _i5 = 0, _j5 = items.length; _i5 < _j5; _i5++) {
        var _id5 = items[_i5].getAttribute("data-scroller-id") || this._scroller.id;

        var _MOBILE_ENABLED5 = Basics.isTouch && items[_i5].getAttribute("data-avoid-mobile") === null || !Basics.isTouch;

        if (_id5 === this._scroller.id && _MOBILE_ENABLED5) {
          var _item5 = new VScrollitem_Sticky(items[_i5], this._axis);

          this._nInsiders = this._insiders.push(_item5);
        }
      }
    }
  }, {
    key: "loop",
    value: function loop() {}
  }, {
    key: "visible",
    value: function visible() {
      if (Math.round(this.realY) === 0) {
        Scroll.anchor = this.id;
      }

      if (this.isVisible) return;
      Scroll.anchor = this.id;

      this._playVideos();

      if (this.onVisible) {
        this.onVisible();
      }

      this.firstVisible = false;
      this.isVisible = true;
    }
  }, {
    key: "show",
    value: function show() {
      var _this = this;

      if (this.isShow) return;

      var doShow = function doShow() {
        if (_this.onShow) {
          _this.onShow();

          if (!_this.onHide) {
            _this.onShow = null;
          }
        }

        _this.firstShow = false;
        _this.isShow = true;
      };

      if (this.opts.offsetShow) {
        if (this.isInViewportOffset) {
          doShow();
        }
      } else {
        doShow();
      }
    }
  }, {
    key: "hide",
    value: function hide() {
      this._pauseVideos();

      this.isShow = false;
      this.isVisible = false;

      if (this.onHide) {
        this.onHide();
      }
    }
  }, {
    key: "_playVideos",
    value: function _playVideos() {
      for (var i = 0; i < this._nVideos; i++) {
        this._videos[i].play();
      }
    }
  }, {
    key: "_pauseVideos",
    value: function _pauseVideos() {
      for (var i = 0; i < this._nVideos; i++) {
        this._videos[i].pause();
      }
    }
  }, {
    key: "resize",
    value: function resize(__w, __h) {
      this.opts.offset = this.item.getAttribute("data-offset") !== null ? Number(this.item.getAttribute("data-offset")) : Metrics.HEIGHT * .2;
      this.width = this.item.offsetWidth;
      this.height = this.item.offsetHeight;
      /* STOPPERS */

      if (this._nInsiders > 0) {
        for (var i = 0; i < this._nInsiders; i++) {
          this._insiders[i].resize({
            width: this.width,
            height: this.height
          });
        }
      }
      /* --- */

    }
  }, {
    key: "resizeLimits",
    value: function resizeLimits(__h) {
      this.top = this.item.offsetTop;
      this.top = this.item.getBoundingClientRect().top - Scroll.y;
      this.left = this.item.offsetLeft;

      if (this.opts.positionResume) {
        this._p0 = -(this[this._measure] + this.opts.offset + this.opts.positionResume + this[this._domAxis]);
      } else {
        this._p0 = -(this[this._measure] + this.opts.offset + this[this._domAxis]);
      }

      this._p1 = __h + this.opts.offset - this[this._domAxis];
      /**/

      if (!this._scroller.isNative) {
        this.item.style[CSS.transform] = CSS.translate3D(this._x, this._y, this._z);
      }

      this.progress = this.progressItem;

      if (!this.isInViewport) {
        this.item.style.visibility = "visible";
      }

      this.setInsideY();
    }
  }, {
    key: "dispose",
    value: function dispose() {
      this._nInsiders = 0;
      this._insiders = [];
      this.item.style[CSS.transform] = CSS.translate3D(0, 0, 0);
      this.item = null;
    }
  }]);

  return VScroll_Item;
}();

var VScrollitem_Insider =
/*#__PURE__*/
function () {
  function VScrollitem_Insider(__item, __axis) {
    _classCallCheck(this, VScrollitem_Insider);

    _defineProperty(this, "item", void 0);

    _defineProperty(this, "speed", void 0);

    _defineProperty(this, "offset", void 0);

    _defineProperty(this, "axis", void 0);

    _defineProperty(this, "axisInside", void 0);

    _defineProperty(this, "x", void 0);

    _defineProperty(this, "y", void 0);

    _defineProperty(this, "z", void 0);

    _defineProperty(this, "min", void 0);

    _defineProperty(this, "width", void 0);

    _defineProperty(this, "height", void 0);

    this.item = __item;
    this.axis = __axis;
    this.axisInside = this.item.getAttribute("data-axis") || __axis;
    this.speed = this.item.getAttribute("data-speed") !== null ? Number(this.item.getAttribute("data-speed")) : 0.8;
    this.min = this.item.getAttribute("data-min") !== null ? Number(this.item.getAttribute("data-min")) : 666;
    var TRANSLATE = CSS.getTranslate(this.item);
    this.x = TRANSLATE.x;
    this.y = TRANSLATE.y;
    this.z = this.item.style.zIndex || 0;
    this.width = this.item.offsetWidth;
    this.height = this.item.offsetHeight;
  }

  _createClass(VScrollitem_Insider, [{
    key: "loop",
    value: function loop(__position, __progress) {
      var X = this.axisInside === "x" ? (this.offset + __position[this.axis]) * this.speed : this.x;
      var Y = this.axisInside === "y" ? (this.offset + __position[this.axis]) * this.speed : this.y;

      if (this.min !== 666) {
        this.item.style[CSS.transform] = CSS.translate3D(X, Math.max(this.min, Y), this.z);
      } else {
        this.item.style[CSS.transform] = CSS.translate3D(X, Y, this.z);
      }
    }
  }, {
    key: "resize",
    value: function resize(__size) {
      this.offset = 0;
      this.width = this.item.offsetWidth;
      this.height = this.item.offsetHeight;
    }
  }]);

  return VScrollitem_Insider;
}();

var VScrollitem_InsiderMask =
/*#__PURE__*/
function (_VScrollitem_Insider) {
  _inherits(VScrollitem_InsiderMask, _VScrollitem_Insider);

  function VScrollitem_InsiderMask(__item, __axis, __parentDOM) {
    var _this2;

    _classCallCheck(this, VScrollitem_InsiderMask);

    _this2 = _possibleConstructorReturn(this, _getPrototypeOf(VScrollitem_InsiderMask).call(this, __item, __axis));

    _defineProperty(_assertThisInitialized(_this2), "_parentDOM", void 0);

    _defineProperty(_assertThisInitialized(_this2), "top", 0);

    _defineProperty(_assertThisInitialized(_this2), "left", 0);

    _defineProperty(_assertThisInitialized(_this2), "_verticalOffset", 0);

    _defineProperty(_assertThisInitialized(_this2), "_horizontalOffset", 0);

    _defineProperty(_assertThisInitialized(_this2), "_hasParent", false);

    _this2._parentDOM = __parentDOM;
    _this2._hasParent = !(__parentDOM === _this2.item.parentNode);
    return _this2;
  }

  _createClass(VScrollitem_InsiderMask, [{
    key: "loop",
    value: function loop(__position, __progress) {
      var X = this.axis === "x" ? (this.offset + __position.x) * this.speed : this.x;
      var Y = this.axis === "y" ? (this.offset + __position.y) * this.speed : this.y;
      var Y0 = this.top + Y + this._verticalOffset;
      var Y1 = Y0 + this.height;
      var X0 = this.left + X + CSS.getTranslate(this.item.parentNode).x;
      var X1 = X0 + this.width;

      this._parentDOM.style.setProperty('--mask-top', "".concat(Y0, "px"));

      this._parentDOM.style.setProperty('--mask-right', "".concat(X1, "px"));

      this._parentDOM.style.setProperty('--mask-bottom', "".concat(Y1, "px"));

      this._parentDOM.style.setProperty('--mask-left', "".concat(X0, "px"));

      this.item.style[CSS.transform] = CSS.translate3D(X, Y, this.z);
    }
  }, {
    key: "resize",
    value: function resize(__size) {
      _get(_getPrototypeOf(VScrollitem_InsiderMask.prototype), "resize", this).call(this, __size);

      if (this._hasParent) {
        this._verticalOffset = CSS.getTranslate(this.item.parentNode).y;
        this._horizontalOffset = CSS.getTranslate(this.item.parentNode).x;
        this.top = this.item.parentNode.offsetTop;
        this.left = this.item.parentNode.offsetLeft;
      } else {
        this.top = this.item.offsetTop;
        this.left = this.item.offsetLeft;
      }
    }
  }]);

  return VScrollitem_InsiderMask;
}(VScrollitem_Insider);

var VScrollitem_Displace =
/*#__PURE__*/
function () {
  function VScrollitem_Displace(__item, __axis) {
    _classCallCheck(this, VScrollitem_Displace);

    _defineProperty(this, "item", void 0);

    _defineProperty(this, "parent", void 0);

    _defineProperty(this, "p0", void 0);

    _defineProperty(this, "p1", void 0);

    _defineProperty(this, "direction", void 0);

    _defineProperty(this, "offset", void 0);

    _defineProperty(this, "axis", void 0);

    _defineProperty(this, "axisInside", void 0);

    _defineProperty(this, "x", void 0);

    _defineProperty(this, "y", void 0);

    _defineProperty(this, "z", void 0);

    this.item = __item;
    this.parent = __item.parentNode;
    this.direction = this.item.getAttribute("data-start") !== null ? Number(this.item.getAttribute("data-start")) : 1;
    this.axis = __axis;
    this.axisInside = this.item.getAttribute("data-axis") || __axis;
    this.offset = this.item.offsetTop;
    var TRANSLATE = CSS.getTranslate(this.item);
    this.x = TRANSLATE.x;
    this.y = TRANSLATE.y;
    this.z = this.item.style.zIndex || 0;
  }

  _createClass(VScrollitem_Displace, [{
    key: "loop",
    value: function loop(__position, __progress) {
      var X = this.axisInside === "x" ? Maths.lerp(this.p0, this.p1, __progress) : this.x;
      var Y = this.axisInside === "y" ? Maths.lerp(this.p0, this.p1, __progress) : this.y;
      this.item.style[CSS.transform] = CSS.translate3D(X, Y, this.z);
    }
  }, {
    key: "resize",
    value: function resize(__size) {
      var LIMIT = this.axisInside === "y" ? this.item.offsetHeight - this.parent.offsetHeight : this.item.offsetWidth - this.parent.offsetWidth;

      if (this.direction === 0) {
        this.p0 = 0;
        this.p1 = -LIMIT;
      } else {
        this.p1 = 0;
        this.p0 = -LIMIT;
      }
    }
  }]);

  return VScrollitem_Displace;
}();

var VScrollitem_Scale =
/*#__PURE__*/
function () {
  function VScrollitem_Scale(_item) {
    _classCallCheck(this, VScrollitem_Scale);

    _defineProperty(this, "item", void 0);

    _defineProperty(this, "scale0", void 0);

    _defineProperty(this, "scale1", void 0);

    _defineProperty(this, "offset", void 0);

    this.item = _item;
    this.scale1 = this.item.getAttribute("data-end") !== null ? Number(this.item.getAttribute("data-end")) : 1;
    this.scale0 = this.item.getAttribute("data-start") !== null ? Number(this.item.getAttribute("data-start")) : 2;
    this.offset = this.item.offsetLeft;
  }

  _createClass(VScrollitem_Scale, [{
    key: "loop",
    value: function loop(__position, __progress) {
      var scale = Maths.lerp(this.scale0, this.scale1, __progress);
      this.item.style[CSS.transform] = CSS.scale3D(scale, scale);
    }
  }, {
    key: "resize",
    value: function resize(__size) {}
  }]);

  return VScrollitem_Scale;
}();

var VScrollitem_Sticky =
/*#__PURE__*/
function () {
  //APAÑO para modificar la posicion slomo sin cambiar min;
  function VScrollitem_Sticky(_item) {
    _classCallCheck(this, VScrollitem_Sticky);

    _defineProperty(this, "item", void 0);

    _defineProperty(this, "p0", void 0);

    _defineProperty(this, "p1", void 0);

    _defineProperty(this, "min", void 0);

    _defineProperty(this, "offsetSlomo", void 0);

    _defineProperty(this, "max", void 0);

    _defineProperty(this, "offset", void 0);

    _defineProperty(this, "slomo", void 0);

    _defineProperty(this, "x", void 0);

    _defineProperty(this, "y", void 0);

    _defineProperty(this, "z", void 0);

    this.item = _item;
    this.p0 = this.item.getAttribute("data-stop") !== null ? Number(this.item.getAttribute("data-stop")) : 0;
    this.p1 = this.item.getAttribute("data-resume") !== null ? Number(this.item.getAttribute("data-resume")) : 1;
    this.offset = this.item.offsetTop;
    this.slomo = this.item.getAttribute("data-slomo") !== null ? Number(this.item.getAttribute("data-slomo")) : 1;
    var TRANSLATE = CSS.getTranslate(this.item);
    this.x = TRANSLATE.x;
    this.y = TRANSLATE.y;
    this.z = this.item.style.zIndex || 0;
  }

  _createClass(VScrollitem_Sticky, [{
    key: "loop",
    value: function loop(__position, __progress) {
      var POSITION = __position.y + this.offset;

      if (POSITION <= this.min) {
        this.item.style[CSS.transform] = CSS.translate3D(0, Math.min(this.max, this.offsetSlomo + Math.max(this.min, POSITION * -this.slomo)), this.z);
      } else {
        this.item.style[CSS.transform] = CSS.translate3D(0, this.offsetSlomo + this.min, this.z);
      }
    }
  }, {
    key: "resize",
    value: function resize(__size) {
      this.min = (__size.height - this.item.offsetHeight) * this.p0;
      this.max = (__size.height - this.item.offsetHeight) * this.p1;
      this.max -= this.offset;
      this.offsetSlomo = this.min + this.max * (1 - this.slomo) * .5;
    }
  }]);

  return VScrollitem_Sticky;
}();;"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var WheelControls =
/*#__PURE__*/
function () {
  _createClass(WheelControls, [{
    key: "enabled",
    get: function get() {
      return this._enabled;
    },
    set: function set(__enabled) {
      if (this._enabled !== __enabled) {
        this._enabled = __enabled;
        this._isPosible = __enabled;

        if (this._enabled) {
          VirtualScroll.on(this._call);
        } else {
          VirtualScroll.off(this._call);
        }
      }
    }
  }]);

  function WheelControls() {
    var _this = this;

    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    _classCallCheck(this, WheelControls);

    _defineProperty(this, "_enabled", false);

    _defineProperty(this, "_isPosible", false);

    _defineProperty(this, "_oldDelta", 0);

    _defineProperty(this, "_idTimer", void 0);

    _defineProperty(this, "options", void 0);

    _defineProperty(this, "direction", void 0);

    _defineProperty(this, "_call", void 0);

    this.options = {
      onMove: options.onMove || null,
      onBackward: options.onBackward || null,
      onForward: options.onForward || null,
      timeToActive: options.timeToActive === undefined ? 200 : options.timeToActive
    };

    this._call = function (e) {
      _this._check(e);
    };
  }

  _createClass(WheelControls, [{
    key: "_isSpeedPossible",
    value: function _isSpeedPossible(__delta) {
      if (this.direction < 0) {
        if (__delta > this._oldDelta) {
          return true;
        }
      } else if (this.direction > 0) {
        if (__delta < this._oldDelta) {
          return true;
        }
      }

      return false;
    }
  }, {
    key: "_check",
    value: function _check(e) {
      var _this2 = this;

      var keyMod = e.isKey ? -1 : 1;
      var delta = Math.abs(e.deltaX) > Math.abs(e.deltaY) ? e.deltaX * keyMod : e.deltaY;
      var newDirection = delta < 0 ? 1 : -1;

      if (e.isKey || this.direction !== newDirection || this._isSpeedPossible(delta) || !this.options.timeToActive) {
        this.direction = newDirection;

        if (this.options.onMove && this._isPosible) {
          this.options.onMove(this.direction, delta);
        }

        if (this.options.onForward && this.direction === 1 && this._isPosible) {
          this.options.onForward(delta);
        }

        if (this.options.onBackward && this.direction === -1 && this._isPosible) {
          this.options.onBackward(delta);
        }

        if (this.options.timeToActive) {
          this._isPosible = false;
          clearTimeout(this._idTimer);
          this._idTimer = setTimeout(function () {
            _this2._isPosible = true;
          }, this.options.timeToActive);
        }
      }

      this._oldDelta = delta;
    }
  }, {
    key: "dispose",
    value: function dispose() {
      this.enabled = false;
      this.options = {};
    }
  }]);

  return WheelControls;
}();

;;"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var Slider_Item =
/*#__PURE__*/
function () {
  function Slider_Item(__item, __index, __slider) {
    _classCallCheck(this, Slider_Item);

    _defineProperty(this, "item", void 0);

    _defineProperty(this, "index", void 0);

    _defineProperty(this, "slider", void 0);

    _defineProperty(this, "links", void 0);

    _defineProperty(this, "width", void 0);

    _defineProperty(this, "height", void 0);

    this.item = __item;
    this.index = __index;
    this.slider = __slider;
    this.links = C.GetBy.tag("a", __item);
    this.height = __item.offsetHeight;
    this.width = __item.offsetWidth;
    this.afterHide();
  }

  _createClass(Slider_Item, [{
    key: "show",
    value: function show() {
      var __d = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1;

      if (!this.item.classList.contains("__active")) {
        this.item.classList.add("__active");
      }

      this.item.setAttribute("aria-hidden", "false");

      for (var i = 0, j = this.links.length; i < j; i++) {
        this.links[i].removeAttribute("tabindex");
      }
    }
  }, {
    key: "hide",
    value: function hide() {
      var __d = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1;

      this.afterHide();
    }
  }, {
    key: "afterHide",
    value: function afterHide() {
      this.item.classList.remove("__active");
      this.item.setAttribute("aria-hidden", "true");

      for (var i = 0, j = this.links.length; i < j; i++) {
        this.links[i].setAttribute("tabindex", "-1");
      }
    }
  }]);

  return Slider_Item;
}();

var Slider_Button =
/*#__PURE__*/
function () {
  function Slider_Button(__item, __index, __call) {
    var _this = this;

    _classCallCheck(this, Slider_Button);

    _defineProperty(this, "item", void 0);

    _defineProperty(this, "index", void 0);

    this.item = __item;
    this.index = __index;
    this.item.addEventListener(Basics.clickEvent, function (e) {
      e.preventDefault();

      __call(_this.index, null, true);
    });
  }

  _createClass(Slider_Button, [{
    key: "show",
    value: function show() {
      if (!this.item.classList.contains("__active")) {
        this.item.classList.add("__active");
      }
    }
  }, {
    key: "hide",
    value: function hide() {
      this.item.classList.remove("__active");
    }
  }]);

  return Slider_Button;
}();

var Slider =
/*#__PURE__*/
function () {
  _createClass(Slider, [{
    key: "actual",
    get: function get() {
      return this._actual;
    }
  }, {
    key: "total",
    get: function get() {
      return this._total;
    }
  }, {
    key: "enabled",
    get: function get() {
      return this._enabled;
    },
    set: function set(__bol) {
      var _this2 = this;

      if (this._enabled !== __bol) {
        this._enabled = __bol;
        this._keyEnabled = __bol;

        if (this._enabled) {
          Keyboard.add("ArrowLeft", this.id, function () {
            _this2.prev();
          });
          Keyboard.add("ArrowRight", this.id, function () {
            _this2.next();
          });
        } else {
          Keyboard.remove("ArrowLeft", this.id);
          Keyboard.remove("ArrowRight", this.id);
        }
      }
    }
  }]);

  function Slider(__container) {
    var _this3 = this;

    var __classSlide = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : Slider_Item;

    var __classButton = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : Slider_Button;

    _classCallCheck(this, Slider);

    _defineProperty(this, "id", void 0);

    _defineProperty(this, "isInfinity", true);

    _defineProperty(this, "isShow", true);

    _defineProperty(this, "_sSlides", "__slides");

    _defineProperty(this, "_sControls", "__controls");

    _defineProperty(this, "_container", null);

    _defineProperty(this, "_containerSlides", null);

    _defineProperty(this, "_controls", null);

    _defineProperty(this, "_total", 0);

    _defineProperty(this, "_actual", null);

    _defineProperty(this, "_enabled", false);

    _defineProperty(this, "_items", []);

    _defineProperty(this, "_btns", []);

    this.id = String(new Date().getTime());
    this._container = __container;
    this._containerSlides = C.GetBy["class"](this._sSlides, this._container)[0];
    this._controls = C.GetBy["class"](this._sControls, this._container)[0]; //SLIDES

    var temp = C.GetBy.tag("li", this._containerSlides);

    for (var i = 0, j = temp.length; i < j; i++) {
      var item = new __classSlide(temp[i], i, this);
      this._total = this._items.push(item);
    }

    if (this._total <= 1 && this._controls) {
      this._controls.classList.add("__noSlides");
    }

    if (this._total > 1 && this._controls) {
      //BUTTON
      temp = C.GetBy.tag("button", this._controls);
      var index = 0;

      for (var _i = 0, _j = temp.length; _i < _j; _i++) {
        if (temp[_i].classList.contains("__next")) {
          temp[_i].addEventListener(Basics.clickEvent, function (e) {
            e.preventDefault();
            var n = _this3._actual ? _this3._actual : 0;
            n = _this3._actual + 1 === _this3._total ? 0 : _this3._actual + 1;

            _this3["goto"](n, 1, true);
          });
        } else if (temp[_i].classList.contains("__prev")) {
          temp[_i].addEventListener(Basics.clickEvent, function (e) {
            e.preventDefault();
            var n = _this3._actual ? _this3._actual : 0;
            n = _this3._actual === 0 ? _this3._total - 1 : _this3._actual - 1;

            _this3["goto"](n, -1, true);
          });
        } else if (temp[_i].classList.contains("__close")) {
          temp[_i].addEventListener(Basics.clickEvent, function (e) {
            e.preventDefault();

            _this3.close();
          });
        } else {
          var _item = new __classButton(temp[_i], index, this["goto"].bind(this));

          this._btns.push(_item);

          index++;
        }
      }
    } //INIT

    /*this._items[0].show();
    if(this._btns.length > 0) this._btns[0].show();
    this._actual = 0;*/

  }

  _createClass(Slider, [{
    key: "goto",
    value: function goto(__index) {
      var __direction = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;

      var isUserAction = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
      if (__index === this._actual) return;

      if (__direction === null) {
        __direction = __index > this._actual ? 1 : -1;
      }

      if (isUserAction) {
        this._container.setAttribute("aria-live", "polite");
      }

      this.beforeGoto(__direction);

      if (this._actual != null) {
        this._items[this._actual].hide(__direction);

        if (this._btns.length > 0) this._btns[this._actual].hide(__direction);
      }

      this._actual = __index;

      this._items[this._actual].show(__direction);

      if (this._btns.length > 0) this._btns[this._actual].show(__direction);
      this.afterGoto(__direction);
    }
  }, {
    key: "afterGoto",
    value: function afterGoto(__direction) {}
  }, {
    key: "beforeGoto",
    value: function beforeGoto(__direction) {}
  }, {
    key: "next",
    value: function next() {
      var index = this._actual + 1;

      if (index === this._total) {
        if (this.isInfinity) {
          this["goto"](0, 1);
        }
      } else {
        this["goto"](index, 1);
      }
    }
  }, {
    key: "prev",
    value: function prev() {
      var index = this._actual - 1;

      if (index < 0) {
        if (this.isInfinity) {
          this["goto"](this._total - 1, 1);
        }
      } else {
        this["goto"](index, 1);
      }
    }
  }, {
    key: "close",
    value: function close() {}
  }, {
    key: "dispose",
    value: function dispose() {
      this.enabled = false;
    }
  }]);

  return Slider;
}();;"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var CarruselItem =
/*#__PURE__*/
function () {
  _createClass(CarruselItem, [{
    key: "x",
    get: function get() {
      return this._x;
    },
    set: function set(__n) {
      this._x = Maths.precission(__n, 2);
      this._item.style[CSS.transform] = "translate3d(" + this._x + "px, 0, 1px)";
    }
  }]);

  function CarruselItem(__item) {
    _classCallCheck(this, CarruselItem);

    _defineProperty(this, "_x", void 0);

    _defineProperty(this, "_y", void 0);

    _defineProperty(this, "_item", void 0);

    _defineProperty(this, "width", void 0);

    this._item = __item;
    this.x = 0;
    this.width = this._item.offsetWidth;
  }

  _createClass(CarruselItem, [{
    key: "resize",
    value: function resize() {
      this.width = this._item.offsetWidth();
    }
  }]);

  return CarruselItem;
}();

var Carrusel =
/*#__PURE__*/
function () {
  _createClass(Carrusel, [{
    key: "multiplicator",
    get: function get() {
      return this._multiplicator;
    },
    set: function set(__n) {
      this._multiplicator = __n;
      this.velocidad *= this._multiplicator;
    }
  }, {
    key: "progress",
    get: function get() {
      return this._progress;
    },
    set: function set(__n) {
      this._progress = __n;
      this.offsetX = this._limit1 * __n;
    }
  }, {
    key: "offsetX",
    set: function set(__x) {
      this._itemMain.x = 0;
      this._itemAux.x = this._itemMain.x - this._itemAux.width;
      this._itemMain.x += __x;
      this._itemAux.x += __x;

      if (__x > 0) {
        if (this._itemMain.x > this._limit1) {
          this._itemMain.x = this._itemAux.x - this._itemMain.width;
          var temp = this._itemAux;
          this._itemAux = this._itemMain;
          this._itemMain = temp;
        }
      } else {
        if (this._itemAux.x < this._limit0) {
          this._itemAux.x = this._itemMain.x + this._itemMain.width;
          var _temp = this._itemAux;
          this._itemAux = this._itemMain;
          this._itemMain = _temp;
        }
      }
    }
  }]);

  function Carrusel(__w, __item1, __item2) {
    _classCallCheck(this, Carrusel);

    _defineProperty(this, "_itemMain", void 0);

    _defineProperty(this, "_itemAux", void 0);

    _defineProperty(this, "_multiplicator", 1);

    _defineProperty(this, "_x", void 0);

    _defineProperty(this, "_widthMask", void 0);

    _defineProperty(this, "_limit1", void 0);

    _defineProperty(this, "_limit0", void 0);

    _defineProperty(this, "_progress", void 0);

    _defineProperty(this, "fixedDirection", false);

    _defineProperty(this, "fixedScroll", false);

    _defineProperty(this, "velocidad", 1);

    _defineProperty(this, "minVel", 1);

    this._itemAux = new CarruselItem(__item2);
    this._itemMain = new CarruselItem(__item1);
    this._limit1 = __w;
    this._limit0 = -this._itemMain.width;
    this._itemAux.x = this._itemMain.x - this._itemAux.width;
  }

  _createClass(Carrusel, [{
    key: "loop",
    value: function loop() {
      if (this.fixedScroll) {
        this.velocidad = Basics.velocidad * this.multiplicator;
      } else {
        var vel;
        var temp = Basics.velocidad * this.multiplicator;

        if (this.fixedDirection) {
          vel = Math.max(this.minVel, Math.abs(temp));
        } else {
          if (temp > 0) {
            vel = Math.min(-this.minVel, -temp);
          } else if (temp < 0) {
            vel = Math.max(this.minVel, -temp);
          } else {
            vel = this.velocidad > 0 ? this.minVel : -this.minVel;
          }
        }

        this.velocidad += Maths.precission((vel - this.velocidad) * 0.1, 2);
      }

      this._itemMain.x += this.velocidad;
      this._itemAux.x += this.velocidad;

      if (this.velocidad > 0) {
        if (this._itemMain.x > this._limit1) {
          this._itemMain.x = this._itemAux.x - this._itemMain.width;
          var _temp2 = this._itemAux;
          this._itemAux = this._itemMain;
          this._itemMain = _temp2;
        }
      } else {
        if (this._itemAux.x < this._limit0) {
          this._itemAux.x = this._itemMain.x + this._itemMain.width;
          var _temp3 = this._itemAux;
          this._itemAux = this._itemMain;
          this._itemMain = _temp3;
        }
      }
    }
  }, {
    key: "resize",
    value: function resize(__w) {
      this._limit1 = __w;

      this._itemMain.resize();

      this._itemAux.resize();

      this._itemMain.x = 0;
      this._itemAux.x = this._itemMain.x - this._itemAux.width;
    }
  }, {
    key: "dispose",
    value: function dispose() {
      this._itemMain = null;
      this._itemAux = null;
      this.velocidad = null;
      this._multiplicator = null;
      this._x = null;
      this._widthMask = null;
      this._limit1 = null;
      this._limit0 = null;
    }
  }]);

  return Carrusel;
}();;"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var Acordions = {
  _acordions: [],
  init: function init() {
    var ACORDIONS = C.GetBy.selector("[data-acordion]");

    for (var i = 0; i < ACORDIONS.length; i++) {
      this._acordions.push(new Acordion(ACORDIONS[i]));
    }
  },
  reset: function reset() {
    this.dispose();
    this.init();
  },
  dispose: function dispose() {
    this._acordions = [];
  },
  toggle: function toggle(__btn) {
    var ACORDION = __btn.parentNode;
    ACORDION.setAttribute("aria-expanded", ACORDION.getAttribute("aria-expanded") === "false");
  },
  resize: function resize() {
    for (var i = 0; i < this._acordions.length; i++) {
      this._acordions[i].resize();
    }
  }
};

var Acordion =
/*#__PURE__*/
function () {
  function Acordion(__container, __id) {
    _classCallCheck(this, Acordion);

    _defineProperty(this, "container", void 0);

    _defineProperty(this, "group", void 0);

    _defineProperty(this, "toogle", void 0);

    this.container = __container;
    this.toogle = C.GetBy.selector("[data-acordion-toogle]", __container)[0];
    this.group = C.GetBy.selector("[data-acordion-group]", __container)[0];
    this.container.setAttribute("aria-expanded", "false");
    /*this.toogle.addEventListener(Basics.clickEvent, (e)=> {
        e.preventDefault();
        this.toogleState();
    });*/

    this.resize();
  }

  _createClass(Acordion, [{
    key: "toogleState",
    value: function toogleState() {
      this.container.setAttribute("aria-expanded", this.container.getAttribute("aria-expanded") === "false");
    }
  }, {
    key: "resize",
    value: function resize() {
      this.container.style.setProperty("--height-close", this.toogle.offsetHeight + "px");
      this.container.style.setProperty("--height-open", this.group.offsetHeight + "px");
    }
  }]);

  return Acordion;
}();;"use strict";

var Videos = {
  _observer: null,
  _options: {
    rootMargin: '0px 0px 100px 0px',
    threshold: 0
  },
  init: function init() {
    var _this = this;

    if (this._observer) {
      this._observer.disconnect();
    }

    this._observer = new IntersectionObserver(this.check, this._options);
    C.Selector.forEach("[data-autoplay]", function (el, i) {
      if (Basics.isTouch) {
        var POSTER = el.getAttribute("data-poster");

        if (POSTER) {
          el.setAttribute("poster", POSTER);
        }
      } else {
        el.removeAttribute("controls");
      }

      _this._observer.observe(el);
    });
  },
  check: function check(entries, observer) {
    entries.forEach(function (entry) {
      var AUTOPLAY = entry.target.getAttribute("data-autoplay");
      var ITEM = entry.target;

      if (AUTOPLAY !== null) {
        if (entry.isIntersecting) ITEM.play();else ITEM.pause();
      }
    });
  }
};;"use strict";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _get(target, property, receiver) { if (typeof Reflect !== "undefined" && Reflect.get) { _get = Reflect.get; } else { _get = function _get(target, property, receiver) { var base = _superPropBase(target, property); if (!base) return; var desc = Object.getOwnPropertyDescriptor(base, property); if (desc.get) { return desc.get.call(receiver); } return desc.value; }; } return _get(target, property, receiver || target); }

function _superPropBase(object, property) { while (!Object.prototype.hasOwnProperty.call(object, property)) { object = _getPrototypeOf(object); if (object === null) break; } return object; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var SliderScroll =
/*#__PURE__*/
function () {
  _createClass(SliderScroll, [{
    key: "size",
    get: function get() {
      return this._container.offsetWidth + this._scroll.size;
    }
  }]);

  function SliderScroll(__container) {
    var _this = this;

    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    _classCallCheck(this, SliderScroll);

    _defineProperty(this, "_container", void 0);

    _defineProperty(this, "_holder", void 0);

    _defineProperty(this, "_scroll", void 0);

    _defineProperty(this, "_scrollBar", void 0);

    _defineProperty(this, "_interaction", void 0);

    this._container = __container;
    this._holder = C.GetBy["class"]("__holder", __container)[0];
    this._scroll = new VScroll({
      container: __container,
      axis: Scroll.AXIS_X,
      wheel: false,
      itemClass: SliderScroll__Item,
      easing: options.easing,
      smooth: options.smooth
    });

    if (options.hasScrollbar) {
      this._scrollBar = new Scrollbar(C.GetBy["class"]("scrollbar")[0]);

      this._scroll.setScrollbar(this._scrollBar);

      this._scrollBar.update(0);
    }

    this._scroll.addAll("[scroll-slider-item]");

    this._scroll.resize();

    this._scroll.start();

    if (!options.interaction === false) {
      this._interaction = new MrInteraction(this._holder, {
        drag: true,
        axis: "x",
        dragCheckTime: .05,
        onMove: function onMove(n) {
          if (options.onMove) options.onMove();

          _this._scroll.move(n);
        },
        onDragStart: function onDragStart() {
          if (options.onDragStart) options.onDragStart();

          for (var i = 0; i < _this._scroll.total_items; i++) {
            _this._scroll._items[i].mouseDown();
          }
        },
        onDragEnd: function onDragEnd() {
          if (options.onDragEnd) options.onDragEnd();

          for (var i = 0; i < _this._scroll.total_items; i++) {
            _this._scroll._items[i].mouseUp();
          }
        }
      });
    }
  }

  _createClass(SliderScroll, [{
    key: "goto_percetage",
    value: function goto_percetage(__p, __isDirect) {
      this._scroll.goto_percetage(__p, __isDirect);
    }
  }, {
    key: "loop",
    value: function loop() {
      this._scroll.loop();
    }
  }, {
    key: "resize",
    value: function resize() {
      this._scroll.resize();
    }
  }, {
    key: "dispose",
    value: function dispose() {
      this._scroll.dispose();

      if (this._interaction) {
        this._interaction.dispose();
      }

      if (this._scrollBar) {
        this._scrollBar.dispose();
      }
    }
  }]);

  return SliderScroll;
}();

var SliderScroll__Item =
/*#__PURE__*/
function (_VScroll_Item) {
  _inherits(SliderScroll__Item, _VScroll_Item);

  //==================================================================================================================
  //          CONSTRUCTOR
  //==================================================================================================================
  function SliderScroll__Item(__link, __index, __scroller) {
    var _this2;

    _classCallCheck(this, SliderScroll__Item);

    _this2 = _possibleConstructorReturn(this, _getPrototypeOf(SliderScroll__Item).call(this, __link, __index, __scroller));

    _defineProperty(_assertThisInitialized(_this2), "_figure", void 0);

    _defineProperty(_assertThisInitialized(_this2), "_image", void 0);

    _defineProperty(_assertThisInitialized(_this2), "_size", void 0);

    _defineProperty(_assertThisInitialized(_this2), "_sizePress", void 0);

    _defineProperty(_assertThisInitialized(_this2), "_isDragging", false);

    _defineProperty(_assertThisInitialized(_this2), "_isDragged", false);

    _defineProperty(_assertThisInitialized(_this2), "_firstShow", true);

    _defineProperty(_assertThisInitialized(_this2), "isVoid", false);

    _this2.isVoid = C.GetBy.selector("img", _this2._item).length === 0;

    if (!_this2.isVoid) {
      _this2._image = C.GetBy.selector("img", _this2._item)[0];
      _this2._figure = C.GetBy.selector("figure", _this2._item)[0];

      _this2.resize();
    }

    return _this2;
  } //==================================================================================================================
  //          PUBLIC
  //==================================================================================================================


  _createClass(SliderScroll__Item, [{
    key: "mouseOver",
    value: function mouseOver() {
      if (!this.isVoid) {
        TweenLite.to(this._figure, 0.8, {
          clip: this._sizeHover,
          ease: C.Ease.EASE_CUCHILLO_IN_OUT
        });
      }
    }
  }, {
    key: "mouseDown",
    value: function mouseDown() {
      if (!this.isVoid) {
        TweenLite.to(this._figure, 0.8, {
          clip: this._sizePress,
          ease: C.Ease.EASE_CUCHILLO_IN_OUT
        });
        this._isDragging = true;
        this._isDragged = true;
      }
    }
  }, {
    key: "mouseUp",
    value: function mouseUp() {
      if (!this.isVoid) {
        TweenLite.to(this._figure, 2, {
          clip: this._size,
          ease: Expo.easeOut
        });
        this._isDragging = false;
        this._isDragged = false;
      }
    }
  }, {
    key: "show",
    value: function show() {
      _get(_getPrototypeOf(SliderScroll__Item.prototype), "show", this).call(this);
    }
  }, {
    key: "hide",
    value: function hide() {
      _get(_getPrototypeOf(SliderScroll__Item.prototype), "hide", this).call(this);
    }
  }, {
    key: "loop",
    value: function loop() {}
  }, {
    key: "resize",
    value: function resize() {
      if (!this.isVoid) {
        var wI = this._image.getAttribute("width") || this._image.getAttribute("data-width");

        var hI = this._image.getAttribute("height") || this._image.getAttribute("data-height");

        var scale = this.height / hI;
        var w = wI * scale;
        var h = hI * scale;
        this._size = Functions.getRect(w * .0, h * .0, w * 1, h * 1);
        this._sizePress = Functions.getRect(w * .05, h * .05, w * .9, h * .9);
        this._item.style.width = w + "px";
        this._figure.style.clip = this._size;
      }

      _get(_getPrototypeOf(SliderScroll__Item.prototype), "resize", this).call(this);
    }
  }]);

  return SliderScroll__Item;
}(VScroll_Item);;"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var _Wrap =
/*#__PURE__*/
function () {
  function _Wrap() {
    _classCallCheck(this, _Wrap);
  }

  _createClass(_Wrap, null, [{
    key: "init",
    value: function init() {}
  }, {
    key: "show",
    value: function show(__call) {
      gsap.to(this.mainholder, {
        alpha: 1,
        duration: .4,
        ease: Power3.easeOut,
        onComplete: function onComplete() {
          if (__call) __call();
        }
      });
    }
  }, {
    key: "hide",
    value: function hide(__call) {
      gsap.to(this.mainholder, {
        alpha: 0,
        duration: .8,
        ease: Power4.easeIn,
        onComplete: function onComplete() {
          if (__call) __call();
        }
      });
    }
  }, {
    key: "directShow",
    value: function directShow() {
      gsap.set(this.mainholder, {
        alpha: 1
      });
    }
  }, {
    key: "directHide",
    value: function directHide() {
      gsap.set(this.mainholder, {
        alpha: 0
      });
    }
  }]);

  return _Wrap;
}();

_defineProperty(_Wrap, "mainholder", C.GetBy.id("Main"));;"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var _Header =
/*#__PURE__*/
function () {
  function _Header() {
    _classCallCheck(this, _Header);
  }

  _createClass(_Header, null, [{
    key: "changePalette",
    value: function changePalette() {
      var __color = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "";

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
  }, {
    key: "init",
    value: function init() {
      this.height = this.container.offsetHeight;
    }
  }, {
    key: "directShow",
    value: function directShow() {
      this.isShow = true;
      TweenLite.set(this.container, {
        y: 0,
        force3D: true
      });
    }
  }, {
    key: "show",
    value: function show() {
      if (!this.isShow) {
        this.isShow = true;
        this.show__effect();
      }
    }
  }, {
    key: "show__effect",
    value: function show__effect() {
      this.container.style.opacity = "1";
    }
  }, {
    key: "directHide",
    value: function directHide() {
      this.isShow = false;
      this.container.style[CSS.transform] = CSS.translate3D(0, this.height, 0);
    }
  }, {
    key: "hide",
    value: function hide() {
      if (this.isShow) {
        this.isShow = false;
        this.hide__effect();
      }
    }
  }, {
    key: "hide__effect",
    value: function hide__effect() {
      this.container.style.opacity = "0";
    }
  }, {
    key: "resize",
    value: function resize() {
      this.height = this.container.offsetHeight;
    }
  }, {
    key: "loop",
    value: function loop() {
      if (Scroll.isScrolling && !this.isBlocked) {
        if (-Scroll.y < this.height + this.yOffset || Scroll.direction === -1 && this.showOnBack) {
          this.show();
        } else {
          this.hide();
        }
      }
    }
  }]);

  return _Header;
}();

_defineProperty(_Header, "container", C.GetBy.id("Header"));

_defineProperty(_Header, "y", 0);

_defineProperty(_Header, "yOffset", 100);

_defineProperty(_Header, "height", void 0);

_defineProperty(_Header, "isShow", true);

_defineProperty(_Header, "isBlocked", false);

_defineProperty(_Header, "showOnBack", true);

_defineProperty(_Header, "actualPalette", null);

_defineProperty(_Header, "actualCSSPalette", null);;"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var _Sidemenu =
/*#__PURE__*/
function () {
  function _Sidemenu() {
    _classCallCheck(this, _Sidemenu);
  }

  _createClass(_Sidemenu, null, [{
    key: "init",
    //==================================================================================================================
    //          CONSTRUCTOR
    //==================================================================================================================
    value: function init() {
      this.container.setAttribute("aria-expanded", "false");
    } //==================================================================================================================
    //          PUBLIC
    //==================================================================================================================

  }, {
    key: "toogleState",
    value: function toogleState() {
      if (!this.isOpen) this.show();else this.hide();
    } //SHOW

  }, {
    key: "show",
    value: function show() {
      var __d = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;

      this.state = _Sidemenu.STATE_OPEN;

      if (Basics.isReducedMotion) {
        this.afterShow();
      } else {
        this.show__effect();
      }
    }
  }, {
    key: "show__effect",
    value: function show__effect() {
      var __d = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
    }
  }, {
    key: "afterShow",
    value: function afterShow() {
      this.container.setAttribute("aria-expanded", "true");
      EventDispatcher.dispatchEvent(_Sidemenu.ON_SHOW_END);
    } //HIDE

  }, {
    key: "hide",
    value: function hide() {
      var __d = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;

      this.state = _Sidemenu.STATE_CLOSE;

      if (Basics.isReducedMotion) {
        this.directHide();
      } else {
        this.hide__effect();
      }
    }
  }, {
    key: "hide__effect",
    value: function hide__effect() {
      var __d = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
    }
  }, {
    key: "afterHide",
    value: function afterHide() {
      this.isPageChange = false;
      this.container.setAttribute("aria-expanded", "false");
      EventDispatcher.dispatchEvent(_Sidemenu.ON_HIDE_END);
    }
  }, {
    key: "directHide",
    value: function directHide() {
      this.state = _Sidemenu.STATE_CLOSE;
      this.afterHide();
    }
  }, {
    key: "updateToggleButtons",
    value: function updateToggleButtons() {
      var btns = C.GetBy.selector("[data-toggle-sidemenu]");

      for (var i = 0; i < btns.length; i++) {
        if (this.isOpen) {
          btns[i].classList.add("__close");
        } else {
          btns[i].classList.remove("__close");
        }
      }
    }
  }, {
    key: "loop",
    value: function loop() {}
  }, {
    key: "resize",
    value: function resize() {}
  }, {
    key: "isOpen",
    //==================================================================================================================
    //          GETTER SETTER
    //==================================================================================================================
    get: function get() {
      return this._state === _Sidemenu.STATE_OPEN;
    }
  }, {
    key: "state",
    get: function get() {
      return this._state;
    },
    set: function set(__state) {
      var _this = this;

      if (this._state === __state) return;
      this._state = __state;
      this.updateToggleButtons();

      if (this.isOpen) {
        Keyboard.add("Escape", "SidemenuESC", function () {
          _this.hide();
        });
        Accessibility.trap(this.container);
        EventDispatcher.dispatchEvent(_Sidemenu.ON_SHOW);
      } else {
        Keyboard.remove("Escape", "SidemenuESC");
        Accessibility.removeTrap();
        EventDispatcher.dispatchEvent(_Sidemenu.ON_HIDE);
      }
    }
  }]);

  return _Sidemenu;
}();

_defineProperty(_Sidemenu, "ON_SHOW", "onshow");

_defineProperty(_Sidemenu, "ON_SHOW_END", "onshowend");

_defineProperty(_Sidemenu, "ON_HIDE", "onhide");

_defineProperty(_Sidemenu, "ON_HIDE_END", "onhideend");

_defineProperty(_Sidemenu, "STATE_OPEN", "OPEN");

_defineProperty(_Sidemenu, "STATE_CLOSE", "CLOSE");

_defineProperty(_Sidemenu, "isPageChange", false);

_defineProperty(_Sidemenu, "container", C.GetBy.id("Sidemenu"));

_defineProperty(_Sidemenu, "_state", "CLOSE");;"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var _Preloader =
/*#__PURE__*/
function () {
  function _Preloader() {
    _classCallCheck(this, _Preloader);
  }

  _createClass(_Preloader, null, [{
    key: "init",
    value: function init() {} //SHOW

  }, {
    key: "show",
    value: function show() {
      var __cb = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;

      this._acumulado = 0;
      this.progress = 0;
      this.isShow = true;
      this._cb = __cb;
      this.beforeShow();
      this.show__effect();
    }
  }, {
    key: "beforeShow",
    value: function beforeShow() {}
  }, {
    key: "show__effect",
    value: function show__effect() {
      this.container.style.display = "block";
      this.afterShow();
    }
  }, {
    key: "afterShow",
    value: function afterShow() {
      if (this._cb) {
        this._cb();
      }
    } //HIDE

  }, {
    key: "hide",
    value: function hide(__cb) {
      this._cb = __cb;
      this.beforeHide();
      this.hide__effect();
    }
  }, {
    key: "beforeHide",
    value: function beforeHide() {}
  }, {
    key: "hide__effect",
    value: function hide__effect() {
      this.afterHide();
    }
  }, {
    key: "afterHide",
    value: function afterHide() {
      this.container.style.display = "none";

      if (this._cb) {
        this._cb();

        this._cb = null;
      }
    } //PROGRESS

  }, {
    key: "progress__effect",
    value: function progress__effect() {}
  }, {
    key: "progress",
    //SETTER && GETTERS
    get: function get() {
      return this._progressReal;
    },
    set: function set(__n) {
      this._progressReal = __n * 100;
      this._progress = this._acumulado + this._progressReal * (this._limit / 100);
    }
  }]);

  return _Preloader;
}();

_defineProperty(_Preloader, "container", C.GetBy.id("Preloader"));

_defineProperty(_Preloader, "enabled", true);

_defineProperty(_Preloader, "isShow", false);

_defineProperty(_Preloader, "_progressReal", 0);

_defineProperty(_Preloader, "_progress", 0);

_defineProperty(_Preloader, "_acumulado", 0);

_defineProperty(_Preloader, "_limit", 100);

_defineProperty(_Preloader, "_cb", void 0);;"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var _Cookies =
/*#__PURE__*/
function () {
  function _Cookies() {
    _classCallCheck(this, _Cookies);
  }

  _createClass(_Cookies, null, [{
    key: "init",
    //==================================================================================================================
    //          CONSTRUCTOR
    //==================================================================================================================
    value: function init() {
      if (Basics.hasCookies) {
        if (document.cookie.indexOf(Basics.id + "_cookie_policy") < 0) {
          this.setup();
          this.show();
        } else {
          this.enable();
          this.dispose();
        }
      } else {
        this.dispose();
      }
    }
  }, {
    key: "setup",
    value: function setup() {
      Accessibility.trap(this.container);
      Keyboard.add("Escape", "CookiesESC", function () {
        Cookies.hide();
      });
    }
  }, {
    key: "actionButtonOK",
    value: function actionButtonOK(item) {
      var now = new Date();
      var time = now.getTime();
      var expireTime = time + 999999999999;
      now.setTime(expireTime);
      document.cookie = Basics.id + "_cookie_policy=accepted; expires=" + now.toUTCString() + "; path=/";
      Cookies.enable();
      Cookies.hide();
    }
  }, {
    key: "actionButtonNOK",
    value: function actionButtonNOK(item) {
      Cookies.hide();
    } //SHOW

  }, {
    key: "show",
    value: function show() {
      var __d = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;

      this._state = Cookies.STATE_OPEN;
      this.show__effect();
    }
  }, {
    key: "show__effect",
    value: function show__effect() {
      var __d = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;

      this.container.style.opacity = 1;
    } //HIDE

  }, {
    key: "hide",
    value: function hide() {
      var __d = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;

      this._state = Cookies.STATE_CLOSE;
      this.hide__effect();
    }
  }, {
    key: "hide__effect",
    value: function hide__effect() {
      var __d = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;

      this.container.style.display = "none";
      this.dispose();

      if (document.body.classList.contains("__accessible")) {
        C.GetBy.tag("a", C.GetBy.id("Gotomain"))[0].focus();
      }
    }
  }, {
    key: "enable",
    value: function enable() {
      Analytics.init();
      Basics.cookiesAccepted = true;
    }
  }, {
    key: "dispose",
    value: function dispose() {
      Accessibility.removeTrap();
      Keyboard.remove("Escape", "CookiesESC");
      this.container.parentNode.removeChild(this.container);
    }
  }, {
    key: "isOpen",
    //==================================================================================================================
    //          GETTER SETTER
    //==================================================================================================================
    get: function get() {
      return this._state === Cookies.STATE_OPEN;
    }
  }]);

  return _Cookies;
}();

_defineProperty(_Cookies, "STATE_OPEN", "OPEN");

_defineProperty(_Cookies, "STATE_CLOSE", "CLOSE");

_defineProperty(_Cookies, "container", C.GetBy.id("Cookies"));

_defineProperty(_Cookies, "_state", "CLOSE");;"use strict";

var ControllerWindow = {
  _windows: [],
  toggle: function toggle(__id, __btn) {
    var win = this.getWindow(__id);

    if (win != null) {
      win.window.actionButtonToggle(__btn);
    }
  },
  add: function add(__id, __win) {
    this._windows.push({
      id: __id,
      window: __win
    });
  },
  hideAll: function hideAll() {
    for (var i = 0; i < this._windows.length; i++) {
      if (this._windows[i].window.isOpen) {
        this._windows[i].window.hide();
      }
    }
  },
  getWindow: function getWindow(__id) {
    for (var i = 0; i < this._windows.length; i++) {
      if (__id === this._windows[i].id) {
        return this._windows[i];
      }
    }
  },
  resize: function resize() {
    for (var i = 0; i < this._windows.length; i++) {
      return this._windows[i].window.resize();
    }
  }
};;"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var Win =
/*#__PURE__*/
function () {
  _createClass(Win, [{
    key: "isOpen",
    //==================================================================================================================
    //          GETTER SETTER
    //==================================================================================================================
    get: function get() {
      return this._state === Win.STATE_OPEN;
    } //==================================================================================================================
    //          CONSTRUCTOR
    //==================================================================================================================

  }]);

  function Win(__container, __id) {
    _classCallCheck(this, Win);

    _defineProperty(this, "container", void 0);

    _defineProperty(this, "id", void 0);

    _defineProperty(this, "width", void 0);

    _defineProperty(this, "height", void 0);

    _defineProperty(this, "_state", void 0);

    this.id = __id;
    this.container = __container;
    this.container.setAttribute("aria-expanded", "false");
    this.resize();
    ControllerWindow.add(this.id, this);
  } //==================================================================================================================
  //          PUBLIC
  //==================================================================================================================


  _createClass(Win, [{
    key: "actionButtonToggle",
    value: function actionButtonToggle(item) {
      if (item.classList.contains("__close")) {
        item.classList.remove("__close");
      } else {
        item.classList.add("__close");
      }

      this.toogleState();
    }
  }, {
    key: "toogleState",
    value: function toogleState() {
      if (!this.isOpen) this.show();else this.hide();
    } //SHOW

  }, {
    key: "show",
    value: function show() {
      var __d = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;

      this.container.setAttribute("aria-expanded", "true");
      this._state = _Sidemenu.STATE_OPEN;
      this.show__effect();
    }
  }, {
    key: "show__effect",
    value: function show__effect() {
      /*this.container.style.display = "block";
      this.afterShow();*/

      var __d = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
    }
  }, {
    key: "afterShow",
    value: function afterShow() {
      var _this = this;

      Accessibility.trap(this.container);
      Keyboard.add("Escape", this.id + "_ESC", function () {
        _this.hide();
      });
    } //HIDE

  }, {
    key: "hide",
    value: function hide() {
      var __d = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;

      this.hide__effect();
    }
  }, {
    key: "hide__effect",
    value: function hide__effect() {
      /*this.container.style.display = "none";
      this.afterHide();*/

      var __d = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
    }
  }, {
    key: "afterHide",
    value: function afterHide() {
      this._state = _Sidemenu.STATE_CLOSE;
      Accessibility.removeTrap();
      Keyboard.remove("Escape", this.id + "_ESC");
      this.container.setAttribute("aria-expanded", "false");
    }
  }, {
    key: "directHide",
    value: function directHide() {
      this._state = _Sidemenu.STATE_CLOSE;
      this.afterHide();
    }
  }, {
    key: "loop",
    value: function loop() {}
  }, {
    key: "resize",
    value: function resize() {
      this.width = this.container.offsetWidth;
      this.height = this.container.offsetHeight;
    }
  }]);

  return Win;
}();

_defineProperty(Win, "ON_SHOW", "onshow");

_defineProperty(Win, "ON_SHOW_END", "onshowend");

_defineProperty(Win, "ON_HIDE", "onhide");

_defineProperty(Win, "ON_HIDE_END", "onhideend");

_defineProperty(Win, "STATE_OPEN", "OPEN");

_defineProperty(Win, "STATE_CLOSE", "CLOSE");;"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var Interface =
/*#__PURE__*/
function () {
  function Interface() {
    _classCallCheck(this, Interface);
  }

  _createClass(Interface, null, [{
    key: "init",
    value: function init() {
      var __container = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : document.body;

      var __id = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "Interface__Canvas";

      this.canvas.id = __id;

      __container.appendChild(this.canvas);
    }
  }, {
    key: "loop",
    value: function loop() {
      this.ctx.clearRect(0, 0, this.width, this.height);
    }
  }, {
    key: "resize",
    value: function resize() {
      this.width = this.canvas.offsetWidth * Sizes.RATIO_CANVAS;
      this.height = this.canvas.offsetHeight * Sizes.RATIO_CANVAS;
      this.canvas.setAttribute("width", this.width);
      this.canvas.setAttribute("height", this.height);
    }
  }]);

  return Interface;
}();

_defineProperty(Interface, "canvas", document.createElement('canvas'));

_defineProperty(Interface, "ctx", Interface.canvas.getContext('2d'));

_defineProperty(Interface, "width", void 0);

_defineProperty(Interface, "height", void 0);;"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var Cursor =
/*#__PURE__*/
function () {
  function Cursor() {
    _classCallCheck(this, Cursor);
  }

  _createClass(Cursor, null, [{
    key: "setPosition",
    value: function setPosition(__x, __y) {
      this._arrow.x = __x;
      this._arrow.y = __y;
      this._follower.x = __x;
      this._follower.y = __y;
    }
  }, {
    key: "init",
    value: function init() {
      var __container = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : document.body;

      var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      var arrowOptions = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
      var followerOptions = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};
      var loadingOptions = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : {};

      var __isEnabledMove = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : true;

      if (Basics.isReducedMotion) return;
      this.color = options.color || this.color;
      this.easing = options.easing || this.easing;
      this.power = options.power || this.power;
      this._hasIconEffect = options.hasIconEffect != null ? options.hasIconEffect : this._hasIconEffect;
      this._isEnabledMove = __isEnabledMove;
      this.powerMagnet = options.powerMagnet || this.powerMagnet;
      this.width = Interface.width;
      this.height = Interface.height;
      arrowOptions = {
        size: arrowOptions.size !== undefined ? arrowOptions.size : 20,
        stroke: arrowOptions.stroke !== undefined ? arrowOptions.stroke : 0,
        alpha: arrowOptions.alpha !== undefined ? arrowOptions.alpha : 1,
        strokeAlpha: arrowOptions.strokeAlpha !== undefined ? arrowOptions.strokeAlpha : 0,
        time: arrowOptions.time !== undefined ? arrowOptions.time : .3
      };
      followerOptions = {
        size: followerOptions.size !== undefined ? followerOptions.size : 20,
        stroke: followerOptions.stroke !== undefined ? followerOptions.stroke : 1,
        alpha: followerOptions.alpha !== undefined ? followerOptions.alpha : 1,
        strokeAlpha: followerOptions.strokeAlpha !== undefined ? followerOptions.strokeAlpha : 1,
        time: followerOptions.time !== undefined ? followerOptions.time : .3,
        easing: this.easing
      };
      loadingOptions = {
        size: loadingOptions.size !== undefined ? loadingOptions.size : 20,
        stroke: loadingOptions.stroke !== undefined ? loadingOptions.stroke : 1.4,
        strokeBG: loadingOptions.stroke !== undefined ? loadingOptions.strokeBG : .2,
        strokeAlpha: loadingOptions.strokeAlpha !== undefined ? loadingOptions.strokeAlpha : 1
      }; // __container.appendChild(this.canvas);

      this._arrowIcon = options.arrowIcon ? this.getIcon(options.arrowIcon) : null;
      this._arrow = new Cursor__Dot(arrowOptions, this.ctx);
      this._follower = new Cursor__Dot(followerOptions, this.ctx);
      this._text = new Cursor__Text(options.fontStyle, this._arrow, this.ctx);
      this._iconDrag = new Cursor__Drag(4, this._arrow, this._follower, this.ctx);
      this._iconLoading = new Cursor__Loading(loadingOptions, this._arrow, this._follower, this.ctx);
      this.color = options.color || this.color;

      if (this._arrowIcon) {
        document.body.classList.add("__cursor-default-hide");
      }

      document.body.classList.add("__cursor-custom");
    }
  }, {
    key: "start",
    value: function start() {
      this._isEnabledMove = true;
      this.reset();
    }
  }, {
    key: "reset",
    value: function reset() {
      if (Basics.isReducedMotion) return;
      this.isEnabled = true;

      if (!Basics.isTouch) {
        this.doCursor(CursorTypes.DRAG);
        this.doCursor(CursorTypes.MAGNETIC);
        this.doCursor(CursorTypes.FOLLOW);
        this.doCursor(CursorTypes.FOLLOWFIXED);
        this.doCursor(CursorTypes.NORMAL);
        this.doCursor(CursorTypes.COLOR);
        this.doCursor(CursorTypes.AXIS_X);
      }
    }
  }, {
    key: "doCursor",
    value: function doCursor(__type) {
      var _this = this;

      var items = C.GetBy.selector(__type);

      var _loop = function _loop(i, j) {
        var item = items[i];
        item.removeAttribute(__type);
        var isIconTargetFixed = item.getAttribute("data-icon-fixed") === "target";
        var target = C.GetBy["class"]("__target", item)[0] || item;
        var rotation = item.getAttribute("data-rotation") !== null ? Number(item.getAttribute("data-rotation")) : _this.powerRotation;
        center = null;

        if (__type === CursorTypes.MAGNETIC || __type === CursorTypes.FOLLOW || __type === CursorTypes.FOLLOWFIXED || __type === CursorTypes.AXIS_X) {
          var pow;

          if (item.getAttribute("data-power") != null) {
            pow = Number(item.getAttribute("data-power"));
          } else {
            pow = __type === CursorTypes.MAGNETIC ? _this.powerMagnet : _this.power;
          }

          var _centerTo = item.getAttribute("data-center") ? item.getAttribute("data-center") : "xy";

          item.addEventListener(Basics.moveEvent, function (e) {
            if (!_this.isEnabled) return; //let pow = __type === CursorTypes.MAGNETIC? this.powerMagnet : this.power;

            var boundsItem = item.getBoundingClientRect();
            var bounds = target.getBoundingClientRect();
            var centerX = bounds.left + bounds.width / 2;
            var centerY = bounds.top + bounds.height / 2;

            if (!center) {
              center = [e.clientX, e.clientY];
            }

            var centerXItem = _centerTo === "x" || _centerTo === "xy" ? boundsItem.left + boundsItem.width / 2 : center[0];
            var centerYItem = _centerTo === "y" || _centerTo === "xy" ? boundsItem.top + boundsItem.height / 2 : center[1];
            var deltaX = Math.floor(centerXItem - e.clientX) * pow * -1;
            var deltaY = Math.floor(centerYItem - e.clientY) * pow * -1;

            if (__type === CursorTypes.FOLLOW || __type === CursorTypes.FOLLOWFIXED) {
              TweenLite.set(target, {
                x: deltaX,
                y: deltaY,
                rotation: deltaX * rotation
              });
            }

            if (__type === CursorTypes.FOLLOWFIXED) {
              _this._followerFixedPosition.x = centerX;
              _this._followerFixedPosition.y = centerY;

              if (isIconTargetFixed) {
                _this._icon.x = centerX;
                _this._icon.y = centerY;
              }
            } else {
              _this._followerFixedPosition.x = centerX + deltaX;
              _this._followerFixedPosition.y = centerY + deltaY;

              if (isIconTargetFixed) {
                _this._icon.x = centerX;
                _this._icon.y = centerY;
              }
            }
          });
        }

        item.addEventListener(Basics.mouseOver, function (e) {
          if (!_this.isEnabled) return;
          if (_this.loading) return;
          if (_this._iconDrag.isDragging && __type !== CursorTypes.DRAG) return;
          item.classList.add("hovered");
          center = null;

          if (__type !== CursorTypes.DRAG) {
            _this._arrow.changeTo(item, "arrow", target, __type === CursorTypes.COLOR);

            _this._follower.changeTo(item, "follower", target, __type === CursorTypes.COLOR);

            _this._icon = _this.getIcon(item);
            _this._text.text = _this.getText(item);
          }

          switch (__type) {
            case CursorTypes.DRAG:
              _this._iconDrag.show(item.getAttribute("data-cursor-axis") || "x");

              break;

            case CursorTypes.MAGNETIC:
              _this._isFollowFixed = true;
              _this._isIconFixed = isIconTargetFixed;
              break;

            case CursorTypes.FOLLOW:
              _this._isFollowFixed = true;
              _this._isIconFixed = isIconTargetFixed;
              break;

            case CursorTypes.FOLLOWFIXED:
              _this._isFollowFixed = true;
              _this._isIconFixed = isIconTargetFixed;
              break;

            case CursorTypes.AXIS_X:
              _this._isFollowFixed = true;
              _this._isIconFixed = isIconTargetFixed;
              break;
          }
        });
        item.addEventListener(Basics.mouseOut, function (e) {
          if (!_this.isEnabled) return;
          if (_this.loading) return;
          if (_this._iconDrag.isDragging && __type !== CursorTypes.DRAG) return;
          item.classList.remove('hovered');

          if (__type !== CursorTypes.DRAG) {
            _this._arrow.backToDefault();

            _this._follower.backToDefault();

            _this._icon = null;

            _this._text.hide();
          }

          switch (__type) {
            case CursorTypes.DRAG:
              _this._iconDrag.hide();

              break;

            case CursorTypes.MAGNETIC:
              _this._isFollowFixed = false;
              break;

            case CursorTypes.FOLLOW:
              _this._isFollowFixed = false;
              TweenLite.set(C.GetBy["class"]("__target", item)[0] || item, {
                x: 0,
                y: 0,
                rotation: 0
              });
              break;

            case CursorTypes.FOLLOWFIXED:
              _this._isFollowFixed = false;
              TweenLite.set(C.GetBy["class"]("__target", item)[0] || item, {
                x: 0,
                y: 0,
                rotation: 0
              });
              break;

            case CursorTypes.AXIS_X:
              _this._isFollowFixed = false;
              break;
          }
        });
      };

      for (var i = 0, j = items.length; i < j; i++) {
        var center;

        _loop(i, j);
      }
    }
  }, {
    key: "hide",
    value: function hide() {
      if (Basics.isReducedMotion) return;
      this.isEnabled = false;
      this._icon = null;

      this._arrow.backToDefault();

      this._follower.backToDefault();

      this._text.hide();

      this._iconDrag.hide();

      this._isFollowFixed = false;
    }
  }, {
    key: "showAlpha",
    value: function showAlpha() {
      this._arrow.backToDefault();

      this._follower.backToDefault();
    }
  }, {
    key: "hideAlpha",
    value: function hideAlpha() {
      TweenLite.to(this._arrow, .3, {
        alpha: 0,
        strokeAlpha: 0,
        ease: Quad.easeIn
      });
      TweenLite.to(this._follower, .3, {
        alpha: 0,
        strokeAlpha: 0,
        ease: Quad.easeIn
      });
    }
  }, {
    key: "getIcon",
    value: function getIcon(item) {
      var idIcon = typeof item === "string" ? item : item.getAttribute("data-cursor-icon");

      if (idIcon) {
        if (this._icons[idIcon]) {
          if (this._hasIconEffect) {
            this._icons[idIcon].show();
          }

          return this._icons[idIcon];
        }
      }

      return null;
    }
  }, {
    key: "getText",
    value: function getText(item) {
      return item.getAttribute("data-cursor-text") || "";
    }
  }, {
    key: "loop",
    value: function loop() {
      // this.ctx.clearRect(0, 0, this.width, this.height);
      if (this._isEnabledMove) {
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

      if (this._iconDrag.enabled) {
        this._iconDrag.draw();
      }

      if (this.loading) {
        this._iconLoading.draw();
      }

      this._follower.draw();

      this._arrow.draw();

      if (this._icon) {
        this._icon.x = Interaction.positions.mouse.x;
        this._icon.y = Interaction.positions.mouse.y;

        this._icon.draw();
      } else if (this._arrowIcon) {
        this._arrowIcon.x = Interaction.positions.mouse.x;
        this._arrowIcon.y = Interaction.positions.mouse.y;

        this._arrowIcon.draw();
      }

      if (this._text.text) {
        this._text.draw();
      }
    }
  }, {
    key: "dragMode",
    value: function dragMode() {}
  }, {
    key: "resize",
    value: function resize() {
      this.width = Interface.width;
      this.height = Interface.height;
    }
  }, {
    key: "color",
    get: function get() {
      return this._color;
    },
    set: function set(__c) {
      this._color = __c;
      this.colorRGB = Functions.hexToRgb(__c);
      if (this._arrow) this._arrow.backToDefaultColor();
      if (this._follower) this._follower.backToDefaultColor();
    }
  }, {
    key: "drag",
    set: function set(__bool) {
      if (this._iconDrag.isDragging !== __bool) {
        if (__bool) {
          this._icon = null;

          this._iconDrag.drag();
        } else {
          this._iconDrag.dragEnd();
        }
      }
    }
  }, {
    key: "loading",
    get: function get() {
      return this._iconLoading.enabled;
    },
    set: function set(__bool) {
      if (__bool) {
        this._iconLoading.show();
      } else {
        this._iconLoading.hide();
      }
    }
  }, {
    key: "icons",
    set: function set(__icons) {
      for (var i = 0, j = __icons.length; i < j; i++) {
        this._icons[__icons[i].id] = new Cursor__Icon(__icons[i].src, __icons[i].size, this.ctx);
      }
    }
  }]);

  return Cursor;
}();

_defineProperty(Cursor, "canvas", Interface.canvas || document.createElement('canvas'));

_defineProperty(Cursor, "ctx", Interface.ctx || Cursor.canvas.getContext('2d'));

_defineProperty(Cursor, "width", void 0);

_defineProperty(Cursor, "height", void 0);

_defineProperty(Cursor, "easing", 0.1);

_defineProperty(Cursor, "power", .7);

_defineProperty(Cursor, "powerRotation", 0);

_defineProperty(Cursor, "powerMagnet", 0.4);

_defineProperty(Cursor, "_color", "#FFFFFF");

_defineProperty(Cursor, "colorRGB", "#FFFFFF");

_defineProperty(Cursor, "_arrow", void 0);

_defineProperty(Cursor, "_iconCross", void 0);

_defineProperty(Cursor, "_iconDrag", void 0);

_defineProperty(Cursor, "_iconLoading", void 0);

_defineProperty(Cursor, "_follower", void 0);

_defineProperty(Cursor, "_text", void 0);

_defineProperty(Cursor, "_followerFixedPosition", {
  x: 0,
  y: 0
});

_defineProperty(Cursor, "_hasIconEffect", true);

_defineProperty(Cursor, "_isArrowIcon", false);

_defineProperty(Cursor, "_isFollowFixed", false);

_defineProperty(Cursor, "_isIconFixed", false);

_defineProperty(Cursor, "_isEnabledMove", true);

_defineProperty(Cursor, "_arrowIcon", null);

_defineProperty(Cursor, "_icon", null);

_defineProperty(Cursor, "_icons", {});;"use strict";

var CursorTypes = {
  DRAG: "[cursor-drag]",
  MAGNETIC: "[cursor-magnetic]",
  NORMAL: "[cursor-normal]",
  COLOR: "[cursor-color]",
  FOLLOW: "[cursor-follow]",
  FOLLOWFIXED: "[cursor-follow-fixed]",
  AXIS_X: "[cursor-axis-x]",
  AXIS_Y: "[cursoraxis-Y]",
  // AXIS_X: "[cursor-axis-X]",
  AXIS_XY: "[cursor-axis-XY]",
  ARROW_L: "[cursor-arrow-L]",
  ARROW_R: "[cursor-arrow-R]",
  ARROW_D: "[cursor-arrow-D]",
  ARROW_Y: "[cursor-arrow-Y]",
  ARROW_INFO: "[cursor-arrow-info]"
};;"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var Cursor__Item =
/*#__PURE__*/
function () {
  _createClass(Cursor__Item, [{
    key: "x",
    get: function get() {
      return this._x;
    },
    set: function set(__x) {
      this._xabs = __x - this._sizeabs * .5;
      this._x = this._xabs * Sizes.RATIO_CANVAS;
    }
  }, {
    key: "y",
    get: function get() {
      return this._y;
    },
    set: function set(__y) {
      this._yabs = __y - this._sizeabs * .5;
      this._y = this._yabs * Sizes.RATIO_CANVAS;
    }
  }, {
    key: "size",
    get: function get() {
      return this._sizeabs;
    },
    set: function set(__n) {
      this._sizeabs = __n;
      this._size = __n * Sizes.RATIO_CANVAS;
    }
  }]);

  function Cursor__Item(__size, __ctx) {
    _classCallCheck(this, Cursor__Item);

    _defineProperty(this, "image", new Image());

    _defineProperty(this, "alpha", 1);

    _defineProperty(this, "_x", 1);

    _defineProperty(this, "_y", 1);

    _defineProperty(this, "_xabs", 1);

    _defineProperty(this, "_yabs", 1);

    _defineProperty(this, "_size", 0);

    _defineProperty(this, "_sizeabs", 0);

    _defineProperty(this, "_ctx", void 0);

    this.size = __size;
    this._ctx = __ctx;
  }

  _createClass(Cursor__Item, [{
    key: "draw",
    value: function draw() {}
  }]);

  return Cursor__Item;
}();;"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var Cursor__Dot =
/*#__PURE__*/
function () {
  _createClass(Cursor__Dot, [{
    key: "x",
    get: function get() {
      return this._x;
    },
    set: function set(__x) {
      this._x = __x * Sizes.RATIO_CANVAS;
      this._xabs = __x;
    }
  }, {
    key: "y",
    get: function get() {
      return this._y;
    },
    set: function set(__y) {
      this._y = __y * Sizes.RATIO_CANVAS;
      this._yabs = __y;
    }
  }, {
    key: "stroke",
    get: function get() {
      return this._strokeabs;
    },
    set: function set(__n) {
      this._strokeabs = __n;
      this._stroke = Maths.precission(__n * Sizes.RATIO_CANVAS);
    }
  }, {
    key: "size",
    get: function get() {
      return this._sizeabs;
    },
    set: function set(__n) {
      this._sizeabs = __n;
      this._size = __n * Sizes.RATIO_CANVAS;
      this._radius = this._size * .5;
    }
  }]);

  function Cursor__Dot() {
    var __default = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    var __ctx = arguments.length > 1 ? arguments[1] : undefined;

    _classCallCheck(this, Cursor__Dot);

    _defineProperty(this, "_x", 1);

    _defineProperty(this, "_y", 1);

    _defineProperty(this, "_xabs", 1);

    _defineProperty(this, "_yabs", 1);

    _defineProperty(this, "_size", 0);

    _defineProperty(this, "_sizeabs", 0);

    _defineProperty(this, "_easing", 1);

    _defineProperty(this, "_stroke", 0);

    _defineProperty(this, "_strokeabs", 0);

    _defineProperty(this, "_radius", 0);

    _defineProperty(this, "_pi2", Math.PI * 2);

    _defineProperty(this, "_ctx", void 0);

    _defineProperty(this, "alpha", 0);

    _defineProperty(this, "strokeAlpha", 0);

    _defineProperty(this, "colorR", 255);

    _defineProperty(this, "colorG", 255);

    _defineProperty(this, "colorB", 255);

    _defineProperty(this, "default", {
      size: 40,
      color: {
        r: 255,
        g: 255,
        b: 255
      },
      alpha: 0,
      stroke: 0,
      strokeAlpha: 0,
      time: .3
    });

    this._ctx = __ctx;
    this["default"] = {
      size: __default.size || this["default"].size,
      stroke: __default.stroke || this["default"].stroke,
      color: Functions.hexToRgb(__default.color) || null,
      alpha: __default.alpha || this["default"].alpha,
      strokeAlpha: __default.strokeAlpha || this["default"].strokeAlpha,
      strokeColor: __default.strokeColor || null,
      time: __default.time || this["default"].time
    };
    var defaultColor = this["default"].color ? this["default"].color : Cursor.colorRGB;
    this._easing = __default.easing || this._easing;
    this.size = this["default"].size;
    this.stroke = this["default"].stroke;
    this.color = this["default"].color;
    this.alpha = this["default"].alpha;
    this.strokeColor = this["default"].strokeColor;
    this.strokeAlpha = this["default"].strokeAlpha;
    this.colorR = defaultColor.r;
    this.colorG = defaultColor.g;
    this.colorB = defaultColor.b;
  }

  _createClass(Cursor__Dot, [{
    key: "changeTo",
    value: function changeTo(__item) {
      var __type = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "arrow";

      var __target = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;

      var __isOnlyColor = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;

      if (!__target) __target = __item;
      var alpha = __item.getAttribute("data-" + __type + "-alpha") !== null ? Number(__item.getAttribute("data-" + __type + "-alpha")) : null;
      var strokeAlpha = __item.getAttribute("data-" + __type + "-stroke-alpha") !== null ? Number(__item.getAttribute("data-" + __type + "-stroke-alpha")) : null;
      var defaultColor = this["default"].color ? this["default"].color : Cursor.colorRGB;
      var options = {
        color: Functions.hexToRgb(__item.getAttribute("data-" + __type + "-color")) || defaultColor,
        alpha: __item.getAttribute("data-" + __type + "-alpha") !== null ? Number(__item.getAttribute("data-" + __type + "-alpha")) : this["default"].alpha,
        time: __item.getAttribute("data-" + __type + "-time") !== null ? Number(__item.getAttribute("data-" + __type + "-time")) : this["default"].time,
        size: __item.getAttribute("data-" + __type + "-size") !== null ? Metrics.parseSize(__item.getAttribute("data-" + __type + "-size"), __target) : this["default"].size,
        stroke: __item.getAttribute("data-" + __type + "-stroke") !== null ? Number(__item.getAttribute("data-" + __type + "-stroke")) : this["default"].stroke,
        strokeAlpha: __item.getAttribute("data-" + __type + "-stroke-alpha") !== null ? Number(__item.getAttribute("data-" + __type + "-stroke-alpha")) : this["default"].strokeAlpha
      };

      if (__isOnlyColor) {
        TweenLite.to(this, options.time, {
          colorR: options.color.r,
          colorG: options.color.g,
          colorB: options.color.b,
          ease: Power3.easeOut
        });
      } else {
        TweenLite.to(this, options.time, {
          size: options.size,
          colorR: options.color.r,
          colorG: options.color.g,
          colorB: options.color.b,
          alpha: options.alpha,
          stroke: options.stroke,
          strokeAlpha: options.strokeAlpha,
          ease: Power3.easeOut
        });
      }
    }
  }, {
    key: "backToDefault",
    value: function backToDefault() {
      var options = this["default"];
      var defaultColor = this["default"].color ? this["default"].color : Cursor.colorRGB;
      TweenLite.to(this, options.time, {
        size: options.size,
        colorR: defaultColor.r,
        colorG: defaultColor.g,
        colorB: defaultColor.b,
        alpha: options.alpha,
        stroke: options.stroke,
        strokeAlpha: options.strokeAlpha,
        ease: Power3.easeOut
      });
    }
  }, {
    key: "backToDefaultColor",
    value: function backToDefaultColor() {
      var options = this["default"];
      var defaultColor = this["default"].color ? this["default"].color : Cursor.colorRGB;
      TweenLite.to(this, options.time, {
        colorR: defaultColor.r,
        colorG: defaultColor.g,
        colorB: defaultColor.b,
        ease: Power3.easeOut
      });
    }
  }, {
    key: "draw",
    value: function draw() {
      this._ctx.globalAlpha = 1;

      this._ctx.beginPath();

      this._ctx.arc(this._x, this._y, this._radius, 0, this._pi2, false);

      this._ctx.fillStyle = Functions.rgbToCSS({
        r: this.colorR,
        g: this.colorG,
        b: this.colorB
      }, this.alpha);

      this._ctx.fill(); //


      this._ctx.lineWidth = this._stroke;
      this._ctx.strokeStyle = Functions.rgbToCSS({
        r: this.colorR,
        g: this.colorG,
        b: this.colorB
      }, this.strokeAlpha);

      this._ctx.stroke();
    }
  }]);

  return Cursor__Dot;
}();;"use strict";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var Cursor__DotComplex =
/*#__PURE__*/
function (_Cursor__Dot) {
  _inherits(Cursor__DotComplex, _Cursor__Dot);

  function Cursor__DotComplex() {
    var _this;

    var __default = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    var __ctx = arguments.length > 1 ? arguments[1] : undefined;

    _classCallCheck(this, Cursor__DotComplex);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Cursor__DotComplex).call(this, __default, __ctx));

    _defineProperty(_assertThisInitialized(_this), "angleStart", 0);

    _defineProperty(_assertThisInitialized(_this), "angleEnd", 1);

    _defineProperty(_assertThisInitialized(_this), "rotation", 0);

    return _this;
  }

  _createClass(Cursor__DotComplex, [{
    key: "draw",
    value: function draw() {
      this._ctx.globalAlpha = 1;

      this._ctx.beginPath();

      this._ctx.arc(this._x, this._y, this._radius, this._pi2 * this.angleStart + this.rotation, this._pi2 * this.angleEnd + this.rotation, false);

      this._ctx.fillStyle = Functions.rgbToCSS({
        r: this.colorR,
        g: this.colorG,
        b: this.colorB
      }, this.alpha);

      this._ctx.fill(); //


      this._ctx.lineWidth = this._stroke;
      this._ctx.strokeStyle = Functions.rgbToCSS({
        r: this.colorR,
        g: this.colorG,
        b: this.colorB
      }, this.strokeAlpha);

      this._ctx.stroke();
    }
  }]);

  return Cursor__DotComplex;
}(Cursor__Dot);;"use strict";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var Cursor__Icon =
/*#__PURE__*/
function (_Cursor__Item) {
  _inherits(Cursor__Icon, _Cursor__Item);

  function Cursor__Icon(__src, __size, __ctx) {
    var _this;

    _classCallCheck(this, Cursor__Icon);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Cursor__Icon).call(this, __size, __ctx));

    _defineProperty(_assertThisInitialized(_this), "image", new Image());

    _defineProperty(_assertThisInitialized(_this), "enabled", false);

    _defineProperty(_assertThisInitialized(_this), "_sizeShow", void 0);

    _this.image.onload = function () {
      _this.enabled = true;
    };

    _this.image.src = __src;
    _this._sizeShow = _this.size;
    return _this;
  }

  _createClass(Cursor__Icon, [{
    key: "show",
    value: function show() {
      this.size = this._sizeShow * .5;
      TweenLite.to(this, .5, {
        size: this._sizeShow,
        ease: Power4.easeOut
      });
    }
  }, {
    key: "draw",
    value: function draw() {
      if (this.enabled) {
        this._ctx.globalAlpha = this.alpha;

        this._ctx.drawImage(this.image, this._x, this._y, this._size, this._size);

        this._ctx.restore(); //this._ctx.translate(0,0);

      }
    }
  }]);

  return Cursor__Icon;
}(Cursor__Item);;"use strict";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var Cursor__Drag =
/*#__PURE__*/
function (_Cursor__Item) {
  _inherits(Cursor__Drag, _Cursor__Item);

  function Cursor__Drag(__size, __arrow, __follower, __ctx) {
    var _this;

    _classCallCheck(this, Cursor__Drag);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Cursor__Drag).call(this, __size, __ctx));

    _defineProperty(_assertThisInitialized(_this), "iconL", void 0);

    _defineProperty(_assertThisInitialized(_this), "iconR", void 0);

    _defineProperty(_assertThisInitialized(_this), "posL", 0);

    _defineProperty(_assertThisInitialized(_this), "posR", 0);

    _defineProperty(_assertThisInitialized(_this), "enabled", false);

    _defineProperty(_assertThisInitialized(_this), "axis", void 0);

    _defineProperty(_assertThisInitialized(_this), "_arrow", void 0);

    _defineProperty(_assertThisInitialized(_this), "_follower", void 0);

    _defineProperty(_assertThisInitialized(_this), "_isOut", true);

    _this.iconL = new Cursor__Dot({
      size: __size,
      alpha: 1,
      stroke: 0,
      strokeAlpha: 0
    }, __ctx);
    _this.iconR = new Cursor__Dot({
      size: __size,
      alpha: 1,
      stroke: 0,
      strokeAlpha: 0
    }, __ctx);
    _this._arrow = __arrow;
    _this._follower = __follower;
    return _this;
  }

  _createClass(Cursor__Drag, [{
    key: "show",
    value: function show() {
      var __axis = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "x";

      this.axis = __axis;
      this._isOut = false;
      this.enabled = true;

      if (!this.isDragging) {
        TweenLite.to(this.iconL, .2, {
          size: this._sizeabs,
          ease: Power4.easeOut
        });
        TweenLite.to(this.iconR, .2, {
          size: this._sizeabs,
          ease: Power4.easeOut
        });
        TweenLite.to(this, .8, {
          posL: -20,
          posR: 20,
          ease: Power4.easeOut
        });
        TweenLite.to(this._arrow, .4, {
          size: 10,
          ease: Power4.easeOut
        });
        TweenLite.to(this._follower, .8, {
          size: 80,
          ease: Power4.easeOut
        });
      }
    }
  }, {
    key: "hide",
    value: function hide() {
      var _this2 = this;

      this._isOut = true;

      if (!this.isDragging) {
        TweenLite.to(this.iconL, .2, {
          size: 0,
          ease: Power3.easeOut
        });
        TweenLite.to(this.iconR, .2, {
          size: 0,
          ease: Power3.easeOut
        });
        TweenLite.to(this._arrow, .4, {
          size: this._arrow["default"].size,
          ease: Power3.easeOut
        });
        TweenLite.to(this._follower, .3, {
          size: this._follower["default"].size,
          ease: Power3.easeOut
        });
        TweenLite.to(this, .4, {
          posL: 0,
          posR: 0,
          ease: Power3.easeOut,
          onComplete: function onComplete() {
            _this2.enabled = false;
          }
        });
      }
    }
  }, {
    key: "drag",
    value: function drag() {
      this.isDragging = true;
      this.enabled = true;
      TweenLite.to(this.iconL, .2, {
        size: this._sizeabs,
        ease: Power4.easeOut
      });
      TweenLite.to(this.iconR, .2, {
        size: this._sizeabs,
        ease: Power4.easeOut
      });
      TweenLite.to(this, .8, {
        posL: -14,
        posR: 14,
        ease: Power4.easeOut
      });
      TweenLite.to(this._arrow, .4, {
        size: 10,
        ease: Power4.easeOut
      });
      TweenLite.to(this._follower, .8, {
        size: 100,
        ease: Power4.easeOut
      });
    }
  }, {
    key: "dragEnd",
    value: function dragEnd() {
      this.isDragging = false;

      if (this._isOut) {
        this.hide();
      } else {
        this.show(this.axis);
      }
    }
  }, {
    key: "draw",
    value: function draw() {
      if (this.axis === "x") {
        this.iconL._x = this._arrow._x + this.posL * Sizes.RATIO_CANVAS;
        this.iconL._y = this._arrow._y;
        this.iconR._x = this._arrow._x + this.posR * Sizes.RATIO_CANVAS;
        this.iconR._y = this._arrow._y;
      } else {
        this.iconL._x = this._arrow._x;
        this.iconL._y = this._arrow._y + this.posL * Sizes.RATIO_CANVAS;
        this.iconR._x = this._arrow._x;
        this.iconR._y = this._arrow._y + this.posR * Sizes.RATIO_CANVAS;
      }

      this.iconL.colorR = this._arrow.colorR;
      this.iconL.colorG = this._arrow.colorG;
      this.iconL.colorB = this._arrow.colorB;
      this.iconR.colorR = this._arrow.colorR;
      this.iconR.colorG = this._arrow.colorG;
      this.iconR.colorB = this._arrow.colorB;
      this.iconL.draw();
      this.iconR.draw();
    }
  }]);

  return Cursor__Drag;
}(Cursor__Item);;"use strict";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var Cursor__Text =
/*#__PURE__*/
function (_Cursor__Item) {
  _inherits(Cursor__Text, _Cursor__Item);

  function Cursor__Text() {
    var _this;

    var __style = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    var __arrow = arguments.length > 1 ? arguments[1] : undefined;

    var __ctx = arguments.length > 2 ? arguments[2] : undefined;

    _classCallCheck(this, Cursor__Text);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Cursor__Text).call(this, 0, __ctx));

    _defineProperty(_assertThisInitialized(_this), "text", null);

    _defineProperty(_assertThisInitialized(_this), "alpha", 1);

    _defineProperty(_assertThisInitialized(_this), "style", {
      size: 16,
      unit: "px",
      fontFamily: "Helvetica",
      color: "#000000",
      textAlign: "center"
    });

    _defineProperty(_assertThisInitialized(_this), "_arrow", void 0);

    _defineProperty(_assertThisInitialized(_this), "_offsetY", void 0);

    _this.style = {
      size: __style.size || _this.style.size,
      unit: __style.unit || _this.style.unit,
      fontFamily: __style.fontFamily || _this.style.fontFamily,
      color: __style.color || _this.style.color,
      textAlign: __style.textAlign || _this.style.textAlign
    };
    _this._arrow = __arrow;
    _this.style.size = _this.style.size * Sizes.RATIO_CANVAS;
    _this._offsetY = _this.style.size * .5;
    return _this;
  }

  _createClass(Cursor__Text, [{
    key: "hide",
    value: function hide() {
      this.text = null;
    }
  }, {
    key: "draw",
    value: function draw() {
      if (this.text) {
        this._ctx.globalAlpha = this.alpha;
        this._ctx.font = this.style.size + this.style.unit + " " + this.style.fontFamily;
        this._ctx.fillStyle = this.style.color;
        this._ctx.textAlign = this.style.textAlign;

        this._ctx.fillText(this.text, this._arrow._x, this._arrow._y + this._offsetY);
      }
    }
  }]);

  return Cursor__Text;
}(Cursor__Item);;"use strict";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var Cursor__Loading =
/*#__PURE__*/
function (_Cursor__Item) {
  _inherits(Cursor__Loading, _Cursor__Item);

  function Cursor__Loading(__options, __arrow, __follower, __ctx) {
    var _this;

    _classCallCheck(this, Cursor__Loading);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Cursor__Loading).call(this, __options.size, __ctx));

    _defineProperty(_assertThisInitialized(_this), "enabled", false);

    _defineProperty(_assertThisInitialized(_this), "_follower", void 0);

    _defineProperty(_assertThisInitialized(_this), "_dot", void 0);

    _defineProperty(_assertThisInitialized(_this), "_idTimer", void 0);

    _defineProperty(_assertThisInitialized(_this), "_options", void 0);

    _this._arrow = __arrow;
    _this._follower = __follower;
    _this._options = __options;
    _this._dot = new Cursor__DotComplex({
      size: _this._follower["default"].size,
      alpha: 0,
      stroke: _this._options.stroke,
      strokeAlpha: 1
    }, __ctx);
    _this._dot.angleStart = 0;
    _this._dot.angleEnd = 0;
    return _this;
  }

  _createClass(Cursor__Loading, [{
    key: "show",
    value: function show() {
      var _this2 = this;

      if (this._idTimer) {
        clearTimeout(this._idTimer);
      }

      document.body.classList.add("__loading");
      this.enabled = true;
      this._dot.angleStart = 0;
      this._dot.angleEnd = 0;
      this._dot.stroke = this._options.stroke;
      this._idTimer = setTimeout(function () {
        TweenLite.to(_this2._arrow, .1, {
          alpha: 0,
          ease: Power3.easeOut
        });
        TweenLite.to(_this2._follower, 1, {
          size: _this2._sizeabs,
          stroke: _this2._options.strokeBG,
          strokeAlpha: _this2._options.strokeAlpha,
          ease: Expo.easeOut
        });
        TweenLite.to(_this2._arrow, 1, {
          size: _this2._sizeabs,
          ease: Expo.easeOut
        });
        TweenLite.to(_this2._dot, 1, {
          size: _this2._sizeabs,
          ease: Expo.easeOut
        });
        TweenLite.to(_this2._dot, 10, {
          angleEnd: .9,
          ease: Linear.easeNone
        });
      }, 200);
    }
  }, {
    key: "hide",
    value: function hide() {
      var _this3 = this;

      if (this._idTimer) {
        clearTimeout(this._idTimer);
      }

      TweenLite.killTweensOf(this._dot);
      TweenLite.to(this._dot, .4, {
        angleEnd: 1,
        ease: Power4.easeOut
      });
      TweenLite.to(this._dot, 1, {
        size: this._follower["default"].size,
        stroke: this._follower["default"].stroke,
        ease: Expo.easeInOut
      });
      TweenLite.to(this._arrow, 1, {
        size: this._arrow["default"].size,
        alpha: this._arrow["default"].alpha,
        ease: Expo.easeInOut
      });
      TweenLite.to(this._follower, 1, {
        size: this._follower["default"].size,
        stroke: this._follower["default"].stroke,
        ease: Expo.easeInOut
      });
      this._idTimer = setTimeout(function () {
        _this3.enabled = false;
        _this3._idTimer = null;
        document.body.classList.remove("__loading");
      }, 1000);
    }
  }, {
    key: "draw",
    value: function draw() {
      this._dot.colorR = this._arrow.colorR;
      this._dot.colorG = this._arrow.colorG;
      this._dot.colorB = this._arrow.colorB;
      this._dot.rotation += .1;
      this._dot._x = this._follower._x;
      this._dot._y = this._follower._y;

      this._dot.draw();
    }
  }]);

  return Cursor__Loading;
}(Cursor__Item);;"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var _Loading =
/*#__PURE__*/
function () {
  function _Loading() {
    _classCallCheck(this, _Loading);
  }

  _createClass(_Loading, null, [{
    key: "init",
    value: function init() {
      var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      this.color = options.color || this.color;
      this.optionsAbs = {
        color: options.color !== undefined ? options.color : this._color,
        size: options.size !== undefined ? options.size : 110,
        position: options.position !== undefined ? options.position : Loading.POSITION_BOTTOM_RIGHT,
        padding: options.padding !== undefined ? options.padding : 20,
        sizeModificator: options.sizeModificator !== undefined ? options.sizeModificator : 1,
        stroke: options.stroke !== undefined ? options.stroke : 1.4,
        strokeBG: options.stroke !== undefined ? options.strokeBG : .2,
        strokeAlpha: options.strokeAlpha !== undefined ? options.strokeAlpha : 1
      };
      this.options = {
        color: this.optionsAbs.color,
        size: Metrics.parseSize(this.optionsAbs.size),
        position: this.optionsAbs.position,
        padding: Metrics.parseSize(this.optionsAbs.padding) + Metrics.parseSize(this.optionsAbs.stroke) / 2,
        sizeModificator: this.optionsAbs.sizeModificator,
        stroke: Metrics.parseSize(this.optionsAbs.stroke),
        strokeBG: Metrics.parseSize(this.optionsAbs.strokeBG),
        strokeAlpha: this.optionsAbs.strokeAlpha
      };
      this._indicator = new Loading__Indicator(this.options, Interface.ctx);
      this.color = this.options.color;
      this.color = this.options.color;
    }
  }, {
    key: "start",
    value: function start() {
      document.body.classList.add("__loading");
      this.start__effect();
    }
  }, {
    key: "start__effect",
    value: function start__effect() {
      if (!this._indicator.enabled) {
        this._indicator.show();
      }
    }
  }, {
    key: "stop",
    value: function stop() {
      document.body.classList.remove("__loading");
      this.stop__effect();
    }
  }, {
    key: "stop__effect",
    value: function stop__effect() {
      if (this._indicator.enabled) {
        this._indicator.hide();
      }
    }
  }, {
    key: "loop",
    value: function loop() {
      if (this._indicator.enabled) {
        this._indicator.draw();
      }
    }
  }, {
    key: "resize",
    value: function resize() {
      var x = 0;
      var y = 0;
      this.options.size = Metrics.parseSize(this.optionsAbs.size);
      this.options.padding = Metrics.parseSize(this.optionsAbs.padding) + Metrics.parseSize(this.optionsAbs.stroke) / 2;
      this.options.stroke = Metrics.parseSize(this.optionsAbs.stroke);
      this.options.strokeBG = Metrics.parseSize(this.optionsAbs.strokeBG);

      switch (this.options.position) {
        case Loading.POSITION_TOP_LEFT:
          x = this.options.size / 2 + this.options.padding;
          y = this.options.size / 2 + this.options.padding;
          break;

        case Loading.POSITION_TOP_RIGHT:
          x = Metrics.WIDTH - this.options.size / 2 - this.options.padding;
          y = this.options.size / 2 + this.options.padding;
          break;

        case Loading.POSITION_BOTTOM_LEFT:
          x = this.options.size / 2 + this.options.padding;
          y = Metrics.HEIGHT - this.options.size / 2 - this.options.padding;
          break;

        case Loading.POSITION_BOTTOM_RIGHT:
          x = Metrics.WIDTH - this.options.size / 2 - this.options.padding;
          y = Metrics.HEIGHT - this.options.size / 2 - this.options.padding;
          break;

        case Loading.POSITION_CENTER:
          x = Metrics.CENTER_X;
          y = Metrics.CENTER_Y;
          break;
      }

      this._indicator.setPosition(x, y);
    }
  }, {
    key: "color",
    get: function get() {
      return this._color;
    },
    set: function set(__c) {
      this._color = __c;
      this.colorRGB = Functions.hexToRgb(__c);

      if (this._indicator) {
        this._indicator.color = this.colorRGB;
      }
    }
  }, {
    key: "enabled",
    get: function get() {
      return this._enabled;
    },
    set: function set(__bool) {
      if (this._enabled === __bool) return;
      this._enabled = __bool;

      if (this._enabled) {
        this.start();
      } else {
        this.stop();
      }
    }
  }]);

  return _Loading;
}();

_defineProperty(_Loading, "POSITION_BOTTOM_LEFT", "BL");

_defineProperty(_Loading, "POSITION_BOTTOM_RIGHT", "BR");

_defineProperty(_Loading, "POSITION_TOP_LEFT", "TL");

_defineProperty(_Loading, "POSITION_TOP_RIGHT", "TR");

_defineProperty(_Loading, "POSITION_CENTER", "C");

_defineProperty(_Loading, "colorRGB", "#FFFFFF");

_defineProperty(_Loading, "options", void 0);

_defineProperty(_Loading, "optionsAbs", void 0);

_defineProperty(_Loading, "_enabled", false);

_defineProperty(_Loading, "_color", "#FFFFFF");

_defineProperty(_Loading, "_indicator", void 0);

var Loading__Indicator =
/*#__PURE__*/
function () {
  _createClass(Loading__Indicator, [{
    key: "draw",
    value: function draw() {}
  }, {
    key: "x",
    get: function get() {
      return this._x;
    },
    set: function set(__x) {
      this._xabs = __x - this._sizeabs * .5;
      this._x = this._xabs * Sizes.RATIO_CANVAS;
    }
  }, {
    key: "y",
    get: function get() {
      return this._y;
    },
    set: function set(__y) {
      this._yabs = __y - this._sizeabs * .5;
      this._y = this._yabs * Sizes.RATIO_CANVAS;
    }
  }, {
    key: "size",
    get: function get() {
      return this._sizeabs;
    },
    set: function set(__n) {
      this._sizeabs = __n;
      this._size = __n * Sizes.RATIO_CANVAS;
    }
  }, {
    key: "color",
    set: function set(__c) {
      if (this._dot) {
        this._dot.colorR = __c.r;
        this._dot.colorG = __c.g;
        this._dot.colorB = __c.b;
      }

      if (this._bg) {
        this._bg.colorR = __c.r;
        this._bg.colorG = __c.g;
        this._bg.colorB = __c.b;
      }
    }
  }]);

  function Loading__Indicator(__options, __ctx) {
    _classCallCheck(this, Loading__Indicator);

    _defineProperty(this, "image", new Image());

    _defineProperty(this, "alpha", 1);

    _defineProperty(this, "enabled", false);

    _defineProperty(this, "_bg", void 0);

    _defineProperty(this, "_dot", void 0);

    _defineProperty(this, "_idTimer", void 0);

    _defineProperty(this, "_options", void 0);

    _defineProperty(this, "_x", 1);

    _defineProperty(this, "_y", 1);

    _defineProperty(this, "_xabs", 1);

    _defineProperty(this, "_yabs", 1);

    _defineProperty(this, "_size", 0);

    _defineProperty(this, "_sizeabs", 0);

    _defineProperty(this, "_ctx", void 0);

    this.size = __options.size;
    this._ctx = __ctx; //super(__options.size, __ctx);

    this._options = __options;
    this._bg = new Cursor__Dot({
      size: this._options.size,
      alpha: 0,
      stroke: 0,
      strokeAlpha: 0
    }, __ctx);
    this._dot = new Cursor__DotComplex({
      size: this._options.size,
      alpha: 0,
      stroke: 0,
      strokeAlpha: 0
    }, __ctx);
    this._dot.angleStart = 0;
    this._dot.angleEnd = 0;
  }

  _createClass(Loading__Indicator, [{
    key: "setPosition",
    value: function setPosition(__x, __y) {
      this._dot.x = __x;
      this._dot.y = __y;
      this._bg.x = __x;
      this._bg.y = __y;
    }
  }, {
    key: "show",
    value: function show() {
      var _this = this;

      if (this._idTimer) {
        clearTimeout(this._idTimer);
      }

      this.enabled = true;
      this._dot.angleStart = 0;
      this._dot.angleEnd = 0;
      this._dot.stroke = this._options.stroke;
      this._idTimer = setTimeout(function () {
        _this._bg.stroke = _this._dot.stroke = 0;
        _this._bg.strokeAlpha = _this._dot.strokeAlpha = 1;
        _this._dot.size = _this._bg.size = _this._options.size * _this._options.sizeModificator;
        TweenLite.to(_this._bg, 1, {
          size: _this._options.size,
          stroke: _this._options.strokeBG,
          ease: Expo.easeOut
        });
        TweenLite.to(_this._dot, 1, {
          size: _this._options.size,
          stroke: _this._options.stroke,
          ease: Expo.easeOut
        });
        TweenLite.to(_this._dot, 10, {
          angleEnd: .9,
          ease: Linear.easeNone
        });
      }, 200);
    }
  }, {
    key: "hide",
    value: function hide() {
      var _this2 = this;

      if (this._idTimer) {
        clearTimeout(this._idTimer);
      }

      TweenLite.killTweensOf(this._dot);
      TweenLite.to(this._dot, .4, {
        angleEnd: 1,
        ease: Power4.easeOut
      });
      TweenLite.to(this._bg, 1, {
        size: this._options.size * this._options.sizeModificator,
        stroke: 0,
        strokeAlpha: 0,
        ease: Expo.easeInOut
      });
      TweenLite.to(this._dot, 1, {
        size: this._options.size * this._options.sizeModificator,
        stroke: 0,
        strokeAlpha: 0,
        ease: Expo.easeInOut
      });
      this._idTimer = setTimeout(function () {
        _this2.enabled = false;
        _this2._idTimer = null;
        document.body.classList.remove("__loading");
      }, 1000);
    }
  }, {
    key: "draw",
    value: function draw() {
      this._dot.rotation += .1;

      this._dot.draw();

      this._bg.draw();
    }
  }]);

  return Loading__Indicator;
}();;"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var LoaderController =
/*#__PURE__*/
function () {
  function LoaderController() {
    _classCallCheck(this, LoaderController);
  }

  _createClass(LoaderController, null, [{
    key: "reset",
    value: function reset() {
      for (var a in LoaderController._loaders) {
        if (LoaderController._loaders[a] != null) {
          LoaderController._loaders[a].cancel();

          LoaderController._loaders[a].reset();
        }
      }

      LoaderController.progress = 0;
      LoaderController.itemsTotal = 0;
      LoaderController.itemsLoaded = 0;
    }
  }, {
    key: "add",
    value: function add(__loader) {
      LoaderController.itemsTotal += 1;
      LoaderController._loaders[__loader.id] = __loader;
    }
  }, {
    key: "remove",
    value: function remove(__loader) {
      /*if(LoaderController._loaders[__loader.id] != null) {
          LoaderController._loaders[__loader.id].dispose();
          LoaderController._loaders[__loader.id] = null;
          LoaderController.itemsTotal--;
      }*/
      for (var a in LoaderController._loaders) {
        if (a === __loader.id) {
          LoaderController._loaders[a].dispose();

          LoaderController._loaders[a] = null;
          LoaderController.itemsTotal--;
        }
      }
    }
  }, {
    key: "init",
    value: function init() {
      var __cb = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;

      if (__cb) LoaderController.onComplete = __cb;

      for (var a in LoaderController._loaders) {
        if (LoaderController._loaders[a] != null && !LoaderController._loaders.isBackground) {
          LoaderController._loaders[a].onFileLoaded = LoaderController.fileLoaded;
          LoaderController._loaders[a].onProgress = LoaderController.onProgress;
          LoaderController._loaders[a].onComplete = LoaderController.end;

          LoaderController._loaders[a].init();
        }
      }
    }
  }, {
    key: "end",
    value: function end() {
      var allLoad = true;

      for (var a in LoaderController._loaders) {
        if (LoaderController._loaders[a] != null) {
          if (LoaderController._loaders[a].progress < 1) {
            allLoad = false;
            break;
          }
        }
      }

      if (LoaderController.onComplete && allLoad) {
        LoaderController.onComplete();
        LoaderController.onComplete = null;
      }
    }
  }, {
    key: "onProgress",
    value: function onProgress() {
      var _p = 0;
      var _c = 0;

      for (var a in LoaderController._loaders) {
        if (LoaderController._loaders[a] != null && !LoaderController._loaders.isBackground) {
          _p += LoaderController._loaders[a].progress;
          _c++;
        }
      }

      LoaderController.progress = _p / _c;
    }
  }, {
    key: "fileLoaded",
    value: function fileLoaded() {
      LoaderController.itemsLoaded++;
    }
  }, {
    key: "type",
    get: function get() {
      return LoaderController._type;
    }
  }]);

  return LoaderController;
}();

_defineProperty(LoaderController, "onComplete", void 0);

_defineProperty(LoaderController, "itemsTotal", 0);

_defineProperty(LoaderController, "itemsLoaded", 0);

_defineProperty(LoaderController, "_loaders", {});

_defineProperty(LoaderController, "progress", 0);;"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var CustomLoader =
/*#__PURE__*/
function () {
  function CustomLoader() {
    _classCallCheck(this, CustomLoader);

    _defineProperty(this, "id", void 0);

    _defineProperty(this, "onFileLoaded", void 0);

    _defineProperty(this, "onProgress", void 0);

    _defineProperty(this, "onComplete", void 0);

    _defineProperty(this, "itemsTotal", void 0);

    _defineProperty(this, "itemsLoaded", void 0);

    _defineProperty(this, "errors", void 0);

    _defineProperty(this, "progress", void 0);

    _defineProperty(this, "isBackground", false);
  }

  _createClass(CustomLoader, [{
    key: "init",
    value: function init() {}
  }, {
    key: "cancel",
    value: function cancel() {}
  }, {
    key: "reset",
    value: function reset() {}
  }, {
    key: "dispose",
    value: function dispose() {}
  }]);

  return CustomLoader;
}();;"use strict";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var MediaLoader =
/*#__PURE__*/
function (_CustomLoader) {
  _inherits(MediaLoader, _CustomLoader);

  function MediaLoader() {
    var _this;

    _classCallCheck(this, MediaLoader);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(MediaLoader).call(this));

    _defineProperty(_assertThisInitialized(_this), "mode", "");

    _defineProperty(_assertThisInitialized(_this), "data", []);

    _defineProperty(_assertThisInitialized(_this), "maxLoads", 10);

    _defineProperty(_assertThisInitialized(_this), "_manifest", []);

    _defineProperty(_assertThisInitialized(_this), "_running", false);

    _defineProperty(_assertThisInitialized(_this), "_activeLoads", 0);

    _this.id = "MediaLoader";
    _this.itemsLoaded = 0;
    _this.progress = 0;
    _this.errors = 0;
    _this.itemsTotal = 0;

    _this.getMedia();

    return _this;
  }

  _createClass(MediaLoader, [{
    key: "getMedia",
    value: function getMedia() {
      var __all = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;

      var tClass = this;
      var TYPE_MEDIA = __all ? "data-item-load" : "data-item-preload";
      var item;
      C.Selector.forEach("[" + TYPE_MEDIA + "]", function (el, i) {
        var HAS_EFFECT = !el.hasAttribute("data-no-effect");
        var SHOW_AT_END = !el.hasAttribute("data-no-show");

        switch (el.tagName.toUpperCase()) {
          case "IMG":
            item = new Display.image(el, SHOW_AT_END, HAS_EFFECT);
            break;

          case "VIDEO":
            item = new Display.video(el, true, false);
            break;

          default:
            item = new Display.bg(el, true, true);
            break;
        }

        tClass.add(item);
      }.bind(this));
      C.Selector.forEach("[data-aspect-ratio]", function (el, i) {
        //if(el.parentNode.classList.contains("media-holder")) {
        var w = Number(el.getAttribute("width")) || Number(el.getAttribute("data-width"));
        var h = Number(el.getAttribute("height")) || Number(el.getAttribute("data-height"));
        el.parentNode.style.paddingTop = h / w * 100 + "%"; //}
      }.bind(this));
    }
  }, {
    key: "add",
    value: function add(__item) {
      this.itemsTotal = this._manifest.push(__item);
    }
  }, {
    key: "init",
    value: function init() {
      this.mode = MediaLoader.NORMAL;
      this.maxLoads = 10;

      if (this.itemsLoaded === this.itemsTotal) {
        this.progress = 1;
        this.end();
      } else {
        this._running = true;

        while (this._activeLoads < this.maxLoads && this._manifest.length > 0) {
          this.next();
        }
      }
    }
  }, {
    key: "initBackground",
    value: function initBackground() {
      this.mode = MediaLoader.BACKGROUND;
      this.maxLoads = 2;
      this.reset();
      this.getMedia();
      this.getMedia(true);
      this.next();
    }
  }, {
    key: "cancel",
    value: function cancel() {
      for (var i = 0, j = this._manifest.length; i < j; i++) {
        this._manifest[i].dispose();
      }

      for (var _i = 0, _j = this.data.length; _i < _j; _i++) {
        this.data[_i].dispose();
      }

      this.data = [];
    }
  }, {
    key: "end",
    value: function end() {
      this._running = false;
      if (this.onComplete) this.onComplete(this.id);
      this.onFileLoaded = null;
      this.onProgress = null;
      this.onComplete = null;
    }
  }, {
    key: "reset",
    value: function reset() {
      this._activeLoads = 0;
      this.onFileLoaded = null;
      this.onProgress = null;
      this.onComplete = null;
      this.itemsTotal = 0;
      this.itemsLoaded = 0;
      this.progress = 0;
      this.errors = 0;
      this._manifest = [];
    }
  }, {
    key: "next",
    value: function next() {
      if (this._activeLoads !== this.maxLoads) {
        if (this.itemsLoaded === this.itemsTotal) {
          this.end();
        } else if (this._manifest.length > 0) {
          var tClass = this;

          var _item = this._manifest.shift();

          this.data.push(_item);
          this._activeLoads++;

          _item.load(function () {
            tClass.itemLoaded();
          });
        }
      }
    }
  }, {
    key: "itemLoaded",
    value: function itemLoaded() {
      this.itemsLoaded++;
      this._activeLoads--;
      this.progress = this.itemsLoaded / this.itemsTotal;
      if (this.onProgress) this.onProgress();
      if (this.onFileLoaded) this.onFileLoaded();
      this.next();
    }
  }, {
    key: "doError",
    value: function doError(event) {
      this.errors = this.errors + 1;
      this.itemLoaded();
    }
  }]);

  return MediaLoader;
}(CustomLoader);

_defineProperty(MediaLoader, "NORMAL", "normal");

_defineProperty(MediaLoader, "BACKGROUND", "bg");;"use strict";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var LazyLoader =
/*#__PURE__*/
function (_CustomLoader) {
  _inherits(LazyLoader, _CustomLoader);

  function LazyLoader() {
    var _this;

    _classCallCheck(this, LazyLoader);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(LazyLoader).call(this));

    _defineProperty(_assertThisInitialized(_this), "isBackground", true);

    _defineProperty(_assertThisInitialized(_this), "data", []);

    _defineProperty(_assertThisInitialized(_this), "_manifest", []);

    _defineProperty(_assertThisInitialized(_this), "_running", false);

    _this.id = "LazyLoader";
    _this.itemsTotal = 0;
    return _this;
  }

  _createClass(LazyLoader, [{
    key: "getMedia",
    value: function getMedia() {
      var tClass = this;
      var typeMedia = "data-item-lazyload";
      var item;
      C.Selector.forEach("[" + typeMedia + "]", function (el, i) {
        if (el.tagName.toUpperCase() !== "IMG") {
          item = new Display.bg(el, true, true);
        } else {
          item = new Display.image(el, true, true);
        }

        tClass.add(item);
      }.bind(this));
    }
  }, {
    key: "add",
    value: function add(__item) {
      this.itemsTotal = this._manifest.push(__item);
    }
  }, {
    key: "initBackground",
    value: function initBackground() {
      this.getMedia();
    }
  }, {
    key: "loop",
    value: function loop() {
      if (this.itemsTotal > 0) {
        for (var i = 0; i < this.itemsTotal; i++) {
          if (this._manifest[i]._yShow + Scroll.y <= 0) {
            var item = this._manifest.shift();

            this.data.push(item);
            item.load();
            i--;
            this.itemsTotal--;
          }
        }
      }
    }
  }, {
    key: "cancel",
    value: function cancel() {
      for (var i = 0, j = this._manifest.length; i < j; i++) {
        this._manifest[i].dispose();
      }

      for (var _i = 0, _j = this.data.length; _i < _j; _i++) {
        this.data[_i].dispose();
      }

      this.data = [];
    }
  }, {
    key: "end",
    value: function end() {
      this._running = false;
      if (this.onComplete) this.onComplete(this.id);
    }
  }, {
    key: "reset",
    value: function reset() {
      this.itemsTotal = 0;
      this._manifest = [];
    }
  }]);

  return LazyLoader;
}(CustomLoader);

_defineProperty(LazyLoader, "NORMAL", "normal");

_defineProperty(LazyLoader, "BACKGROUND", "bg");;"use strict";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var PageData = function PageData() {
  _classCallCheck(this, PageData);

  _defineProperty(this, "id", void 0);

  _defineProperty(this, "url", void 0);

  _defineProperty(this, "title", void 0);

  _defineProperty(this, "page", void 0);
};

var PagesLoader =
/*#__PURE__*/
function (_CustomLoader) {
  _inherits(PagesLoader, _CustomLoader);

  //==================================================================================================================
  //          CONSTRUCTOR
  //==================================================================================================================
  function PagesLoader() {
    var _this;

    _classCallCheck(this, PagesLoader);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(PagesLoader).call(this));

    _defineProperty(_assertThisInitialized(_this), "mode", "normal");

    _defineProperty(_assertThisInitialized(_this), "data", []);

    _defineProperty(_assertThisInitialized(_this), "_XHR", void 0);

    _defineProperty(_assertThisInitialized(_this), "_manifest", []);

    _defineProperty(_assertThisInitialized(_this), "_running", false);

    _this.id = "PagesLoader";
    _this.itemsLoaded = 0;
    _this.progress = 0;
    _this.errors = 0;
    _this.itemsTotal = 0;

    _this.getLinks();

    return _this;
  }

  _createClass(PagesLoader, [{
    key: "getLinks",
    value: function getLinks() {
      var tClass = this;
      var typeMedia = this.mode === PagesLoader.NORMAL ? "data-link-preload" : "data-link-load";
      C.Selector.forEach("[" + typeMedia + "]", function (el, i) {
        var href = el.getAttribute("href");

        if (tClass.getData(href) == null) {
          tClass.itemsTotal = tClass._manifest.push({
            id: Functions.url2Id(href),
            url: href,
            page: null,
            title: ""
          });
        }
      }.bind(this));
    }
  }, {
    key: "init",
    value: function init() {
      this.mode = PagesLoader.NORMAL;

      if (this.itemsLoaded === this.itemsTotal) {
        this.progress = 1;
        this.end();
      } else {
        this._running = true;

        this._next();
      }
    }
  }, {
    key: "initBackground",
    value: function initBackground() {
      this.mode = PagesLoader.BACKGOUND;
      this.reset();
      this.getLinks();
      this.init();
    }
  }, {
    key: "loadPage",
    value: function loadPage(__url, __callback) {
      var __id = Functions.url2Id(__url);

      this.cancel();
      this.reset();
      this.onFileLoaded = __callback;
      this.itemsTotal = this._manifest.push({
        id: __id,
        url: __url,
        page: null,
        title: ""
      });
      this.init();
    }
  }, {
    key: "cancel",
    value: function cancel() {
      if (this._XHR) this._XHR.abort();
    }
  }, {
    key: "reset",
    value: function reset() {
      this.onFileLoaded = null;
      this.onProgress = null;
      this.onComplete = null;
      this.itemsTotal = 0;
      this.itemsLoaded = 0;
      this.progress = 0;
      this.errors = 0;
      this._manifest = []; //$(".__remove-preload-image").remove();
    }
  }, {
    key: "end",
    value: function end() {
      this._running = false;
      if (this.onComplete) this.onComplete(this.id);
      this.onFileLoaded = null;
      this.onProgress = null;
      this.onComplete = null;
    }
  }, {
    key: "dispose",
    value: function dispose() {
      this.onFileLoaded = null;
      this.onProgress = null;
      this.onComplete = null;
      this.itemsTotal = null;
      this.itemsLoaded = null;
      this.progress = null;
      this.errors = null;
    } //==================================================================================================================
    //          PRIVATE
    //==================================================================================================================

  }, {
    key: "_next",
    value: function _next() {
      if (this.itemsLoaded === this.itemsTotal) {
        this.end();
      } else {
        this._load(this._manifest[0].id, this._manifest[0].url);
      }
    }
  }, {
    key: "_load",
    value: function _load(__id, __url) {
      var tClass = this;
      this._XHR = new XMLHttpRequest();

      this._XHR.open('GET', __url, true);

      this._XHR.onload = function () {
        if (tClass._XHR.status >= 200 && tClass._XHR.status < 400) {
          //var data = tClass._XHR.responseText;//.split("<!doctype html>")[1];
          //let parser = new DOMParser();
          //let xmlDoc = parser.parseFromString(data,"text/html");
          tClass._manifest[0].page = tClass._XHR.responseText; //xmlDoc.documentElement.getElementsByClassName("wrap")[0];

          var _p = tClass._manifest.shift();

          tClass.data.push(_p);

          tClass._pageLoaded(_p);
        } else {
          console.log("ERROR");
        }
      };

      this._XHR.onerror = function () {
        console.log("onerror");
      };

      this._XHR.send();
      /* this._XHR = $.ajax({
               dataType : 'html',
               url      : __url
           })
           .done(function(data) {
               tClass._XHR = null;
               tClass._manifest[0].page = $(data).find(".wrap").prop('outerHTML');
               tClass._manifest[0].title = $(data).filter('title').text();
               //tClass._loadAssets($(data).find(".wrap").find("[data-item-cacheload]"), tClass.data.length);
               var _p = tClass._manifest.shift();
                tClass.data.push(_p);
               tClass._pageLoaded(_p);
           })
           .fail(function(fail) {
               tClass._XHR = null;
           });*/

    }
  }, {
    key: "_pageLoaded",
    value: function _pageLoaded(__p) {
      this.itemsLoaded++;
      this.progress = this.itemsLoaded / this.itemsTotal;
      if (this.onProgress) this.onProgress();
      if (this.onFileLoaded) this.onFileLoaded(__p);

      this._next();
    }
  }, {
    key: "_loadAssets",
    value: function _loadAssets(__assets, __index) {}
    /*if(__assets.length > 0) {
        var tClass = this;
        $("<img class='__remove-preload-image'/>").appendTo($("body"))
            .css("display", "none")
            .attr("src", $(__assets[0]).attr("data-src")).on('load', function () {
                //tClass.data[__index].page = tClass.data[__index].page.split("data-item-preload").join("MIERDA")
                $(this).remove();
            });
    }*/
    // An error happened on a file

  }, {
    key: "_doError",
    value: function _doError(event) {
      this.errors = this.errors + 1;
    }
  }, {
    key: "getData",
    value: function getData(__url) {
      var _id = Functions.url2Id(__url);

      for (var i = 0, j = this.data.length; i < j; i++) {
        if (this.data[i].id === _id) {
          return this.data[i];
        }
      }

      return null;
    }
  }]);

  return PagesLoader;
}(CustomLoader);

_defineProperty(PagesLoader, "NORMAL", "normal");

_defineProperty(PagesLoader, "BACKGOUND", "bg");;"use strict";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var FontLoader =
/*#__PURE__*/
function (_CustomLoader) {
  _inherits(FontLoader, _CustomLoader);

  //==================================================================================================================
  //          GETTER SETTER
  //==================================================================================================================
  //==================================================================================================================
  //          CONSTRUCTOR
  //==================================================================================================================
  function FontLoader(__manifest, __total) {
    var _this;

    _classCallCheck(this, FontLoader);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(FontLoader).call(this));

    _defineProperty(_assertThisInitialized(_this), "_manifest", []);

    _this.id = "FontLoader";
    _this._manifest = __manifest;
    _this.itemsTotal = __total;
    _this.itemsLoaded = 0;
    _this.progress = 0;
    _this.errors = 0;
    _this._manifest.classes = false;
    _this._manifest.events = true;
    _this._manifest.fontactive = _this.fontActive.bind(_assertThisInitialized(_this));
    _this._manifest.active = _this.end.bind(_assertThisInitialized(_this));
    return _this;
  }

  _createClass(FontLoader, [{
    key: "init",
    value: function init() {
      if (this.itemsTotal === this.itemsLoaded) {
        this.end();
      } else {
        WebFont.load(this._manifest);
      }
    }
  }, {
    key: "end",
    value: function end() {
      if (this.onComplete) this.onComplete(this.id);
      LoaderController.remove(this);
    }
  }, {
    key: "dispose",
    value: function dispose() {
      this.onFileLoaded = null;
      this.onProgress = null;
      this.onComplete = null;
      this.itemsTotal = null;
      this.itemsLoaded = null;
      this.progress = null;
      this.errors = null;
      this._manifest = null;
    } //==================================================================================================================
    //          PRIVATE
    //==================================================================================================================

  }, {
    key: "fontActive",
    value: function fontActive(e) {
      /*this.itemsLoaded++;
      this.progress = this.itemsLoaded/this.itemsTotal;*/
      this.progress = 1;
      if (this.onProgress) this.onProgress();
      if (this.onFileLoaded) this.onFileLoaded();
    } // An error happened on a file

  }, {
    key: "doError",
    value: function doError(event) {
      console.log("Error");
      this.errors = this.errors + 1;
    }
  }]);

  return FontLoader;
}(CustomLoader);;"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var MediaObject =
/*#__PURE__*/
function () {
  _createClass(MediaObject, [{
    key: "src",
    //==================================================================================================================
    //          GETTER SETTER
    //==================================================================================================================
    get: function get() {
      return this.prefix !== "" ? this.item.getAttribute("data-src").split("@1x.").join(this.prefix + ".") : this.item.getAttribute("data-src");
    }
  }, {
    key: "prefix",
    get: function get() {
      var __size = Math.min(this.maxratio, Math.floor(this.item.offsetWidth * Sizes.RATIO / this.width) * 2);

      return __size > 1 ? "@" + __size + "x" : "";
    }
  }, {
    key: "type",
    get: function get() {
      return this._type;
    }
  }, {
    key: "showEffect",
    get: function get() {
      return this._showEffect;
    },
    set: function set(__bol) {
      this._showEffect = __bol;

      if (this._showEffect) {
        this.item.style.opacity = 0;
      }
      /*else {
      if(this._showAtEnd) this.item.style.opacity = 1;
      else this.item.style.opacity = 0;
      }*/

    }
  }, {
    key: "showAtEnd",
    get: function get() {
      return this._showAtEnd;
    },
    set: function set(__bol) {
      this._showAtEnd = __bol; //if(this._showAtEnd) this.item.style.opacity = 1;
      //else this.item.style.opacity = 0;
    } //==================================================================================================================
    //          CONSTRUCTOR
    //==================================================================================================================

  }]);

  function MediaObject(__item) {
    var __showAtEnd = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;

    var __showEffect = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;

    var __type = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : MediaObject.TYPE_IMG;

    _classCallCheck(this, MediaObject);

    _defineProperty(this, "_showAtEnd", void 0);

    _defineProperty(this, "_showEffect", void 0);

    _defineProperty(this, "_type", void 0);

    _defineProperty(this, "id", void 0);

    _defineProperty(this, "item", void 0);

    _defineProperty(this, "aspectRatio", void 0);

    _defineProperty(this, "videoCanPlay", false);

    _defineProperty(this, "isLoaded", false);

    _defineProperty(this, "width", void 0);

    _defineProperty(this, "height", void 0);

    _defineProperty(this, "maxratio", void 0);

    _defineProperty(this, "isImportant", false);

    _defineProperty(this, "isStatic", false);

    this.item = __item;
    this.id = __item.getAttribute("id");
    this._type = __type;
    this.isImportant = this.item.getAttribute("data-item-preload") !== undefined;
    this.isStatic = this.item.getAttribute("data-item-static") !== undefined;

    if (__type !== MediaObject.TYPE_VIDEO) {
      this.showEffect = __showEffect;
      this.showAtEnd = this.isImportant || __showAtEnd;
    }

    if (__type !== MediaObject.TYPE_VIDEO) {//this.showEffect = this.item.getAttribute("data-show-effect") !== "false";
      //this.showAtEnd = this.item.getAttribute("data-show-end") !== "false";
    }

    if (this.item.getAttribute("data-mobile-src")) {
      this.width = this.item.getAttribute("data-mobile-width") ? Number(this.item.getAttribute("data-mobile-width")) : Number(this.item.getAttribute("width"));
      this.height = this.item.getAttribute("data-mobile-height") ? Number(this.item.getAttribute("data-mobile-height")) : Number(this.item.getAttribute("height"));
      this.maxratio = this.item.getAttribute("data-mobile-maxratio") ? Number(this.item.getAttribute("data-mobile-maxratio")) : 0;
    } else {
      this.width = this.item.getAttribute("data-width") ? Number(this.item.getAttribute("data-width")) : Number(this.item.getAttribute("width"));
      this.height = this.item.getAttribute("data-height") ? Number(this.item.getAttribute("data-height")) : Number(this.item.getAttribute("height"));
      this.maxratio = this.item.getAttribute("data-maxratio") ? Number(this.item.getAttribute("data-maxratio")) : 0;
    }

    this.aspectRatio = this.height / this.width * 100; //if(this.item.parentNode.classList.contains("media-holder")) {

    if (this.item.parentNode.classList.contains("__aspect-ratio")) {
      this.item.parentNode.style.setProperty('--aspect-ratio', "".concat(this.aspectRatio, "%"));
    }
    /*if(this.isImportant && __type !== MediaObject.TYPE_VIDEO) {
      this.showAtEnd = true;
      this.showEffect = false;
    }*/


    this.item.setAttribute("data-item-loaded", "");
    this.item.removeAttribute("data-item-preload");
    this.item.removeAttribute("data-item-load");
  } //==================================================================================================================
  //          PUBLIC
  //==================================================================================================================


  _createClass(MediaObject, [{
    key: "load",
    value: function load() {
      var __callback = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;

      if (__callback != null) __callback();
    }
  }, {
    key: "setup",
    value: function setup() {
      var __callback = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;

      this.isLoaded = true;
      this.item.removeAttribute("data-item-preload");
      this.item.removeAttribute("data-item-load");
      this.item.removeAttribute("data-src");
      if (__callback != null) __callback();
    }
  }, {
    key: "dispose",
    value: function dispose() {}
  }, {
    key: "show",
    value: function show() {
      if (this.showEffect) {
        TweenLite.to(this.item, 1, {
          css: {
            opacity: 1
          },
          ease: Power3.easeOut,
          force3D: true,
          onComplete: this.afterShow.bind(this)
        });
      }
    }
  }, {
    key: "afterShow",
    value: function afterShow() {
      if (this.item) {
        if (this.item.parentNode) {
          this.item.parentNode.classList.remove("__load_indicator");
        }
      }
    }
  }, {
    key: "loadVideo",
    value: function loadVideo() {
      var __callback = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;

      console.log("NO ES UN VIDEO");
    }
  }]);

  return MediaObject;
}();

_defineProperty(MediaObject, "TYPE_BG", "BG");

_defineProperty(MediaObject, "TYPE_IMG", "IMG");

_defineProperty(MediaObject, "TYPE_VIDEO", "VIDEO");

_defineProperty(MediaObject, "TYPE_VIDEO_COVER", "VIDEOCOVER");

_defineProperty(MediaObject, "TYPE_PIXI", "VIDEO");;"use strict";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _get(target, property, receiver) { if (typeof Reflect !== "undefined" && Reflect.get) { _get = Reflect.get; } else { _get = function _get(target, property, receiver) { var base = _superPropBase(target, property); if (!base) return; var desc = Object.getOwnPropertyDescriptor(base, property); if (desc.get) { return desc.get.call(receiver); } return desc.value; }; } return _get(target, property, receiver || target); }

function _superPropBase(object, property) { while (!Object.prototype.hasOwnProperty.call(object, property)) { object = _getPrototypeOf(object); if (object === null) break; } return object; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var ImageObject =
/*#__PURE__*/
function (_MediaObject) {
  _inherits(ImageObject, _MediaObject);

  function ImageObject(__item) {
    var __showAtEnd = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;

    var __showEffect = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;

    _classCallCheck(this, ImageObject);

    return _possibleConstructorReturn(this, _getPrototypeOf(ImageObject).call(this, __item, __showAtEnd, __showEffect, MediaObject.TYPE_IMG));
  }

  _createClass(ImageObject, [{
    key: "setup",
    value: function setup() {
      _get(_getPrototypeOf(ImageObject.prototype), "setup", this).call(this);
    }
  }, {
    key: "load",
    value: function load(__callback) {
      var tClass = this;
      this.item.addEventListener('load', function () {
        tClass.setup();
        tClass.show();
        if (__callback != null) __callback();
      });
      this.item.setAttribute("src", this.src);
    }
  }, {
    key: "dispose",
    value: function dispose() {
      if (!_get(_getPrototypeOf(ImageObject.prototype), "isStatic", this)) {
        this.item = null;
        /*                super.item.remove();
                    this.item[0]["src"] = "";
                    delete this.item;
                    this.item = null; */
      }
    }
  }, {
    key: "show",
    value: function show() {
      _get(_getPrototypeOf(ImageObject.prototype), "show", this).call(this);
    }
  }]);

  return ImageObject;
}(MediaObject);;"use strict";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _get(target, property, receiver) { if (typeof Reflect !== "undefined" && Reflect.get) { _get = Reflect.get; } else { _get = function _get(target, property, receiver) { var base = _superPropBase(target, property); if (!base) return; var desc = Object.getOwnPropertyDescriptor(base, property); if (desc.get) { return desc.get.call(receiver); } return desc.value; }; } return _get(target, property, receiver || target); }

function _superPropBase(object, property) { while (!Object.prototype.hasOwnProperty.call(object, property)) { object = _getPrototypeOf(object); if (object === null) break; } return object; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var BGObject =
/*#__PURE__*/
function (_MediaObject) {
  _inherits(BGObject, _MediaObject);

  function BGObject(__item) {
    var _this;

    var __showAtEnd = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;

    var __showEffect = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;

    _classCallCheck(this, BGObject);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(BGObject).call(this, __item, __showAtEnd, __showEffect, MediaObject.TYPE_BG));

    _defineProperty(_assertThisInitialized(_this), "_temp", document.createElement("img"));

    _defineProperty(_assertThisInitialized(_this), "size", void 0);

    _defineProperty(_assertThisInitialized(_this), "position", void 0);

    _this.size = getComputedStyle(_this.item)["background-size"];
    _this.position = getComputedStyle(_this.item)["background-position"];
    _this._temp.style.display = "none";

    _this.item.appendChild(_this._temp);

    return _this;
  }

  _createClass(BGObject, [{
    key: "setup",
    value: function setup() {
      _get(_getPrototypeOf(BGObject.prototype), "setup", this).call(this);
    }
  }, {
    key: "load",
    value: function load(__callback) {
      var tClass = this;

      this._temp.addEventListener('load', function () {
        C.Remove(tClass._temp);
        tClass._temp = null;
        tClass.item.style.backgroundImage = "url(" + tClass.src + ")";
        tClass.item.style.backgroundSize = tClass.bgSize;
        tClass.item.style.backgroundPosition = tClass.bgPos;
        tClass.setup();
        tClass.show();
        if (__callback != null) __callback();
      });

      this._temp.setAttribute("src", this.src);
    }
  }, {
    key: "dispose",
    value: function dispose() {
      if (!_get(_getPrototypeOf(BGObject.prototype), "isStatic", this)) {
        if (this._temp) {
          this._temp.setAttribute("src", "");

          this._temp = null;
        }

        this.item = null;
      }
    }
  }, {
    key: "show",
    value: function show() {
      _get(_getPrototypeOf(BGObject.prototype), "show", this).call(this);
    }
  }]);

  return BGObject;
}(MediaObject);;"use strict";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _get(target, property, receiver) { if (typeof Reflect !== "undefined" && Reflect.get) { _get = Reflect.get; } else { _get = function _get(target, property, receiver) { var base = _superPropBase(target, property); if (!base) return; var desc = Object.getOwnPropertyDescriptor(base, property); if (desc.get) { return desc.get.call(receiver); } return desc.value; }; } return _get(target, property, receiver || target); }

function _superPropBase(object, property) { while (!Object.prototype.hasOwnProperty.call(object, property)) { object = _getPrototypeOf(object); if (object === null) break; } return object; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var VideoObject =
/*#__PURE__*/
function (_MediaObject) {
  _inherits(VideoObject, _MediaObject);

  //==================================================================================================================
  //          CONSTRUCTOR
  //==================================================================================================================
  function VideoObject(__item) {
    var _this;

    var __showAtEnd = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;

    var __showEffect = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;

    _classCallCheck(this, VideoObject);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(VideoObject).call(this, __item, __showAtEnd, __showEffect, MediaObject.TYPE_VIDEO));

    _defineProperty(_assertThisInitialized(_this), "_temp", null);

    _defineProperty(_assertThisInitialized(_this), "isLoaded", false);

    _defineProperty(_assertThisInitialized(_this), "autoplay", false);

    _defineProperty(_assertThisInitialized(_this), "preload", true);

    _defineProperty(_assertThisInitialized(_this), "isControls", false);

    _defineProperty(_assertThisInitialized(_this), "typeContent", "VIDEO");

    if (_this.item.getAttribute("data-autoplay") !== undefined) {
      if (_this.item.getAttribute("data-autoplay") === "true") _this.autoplay = true;
    }

    if (_this.item.getAttribute("data-preload") !== undefined) {
      if (_this.item.getAttribute("data-preload") === "false") _this.autoplay = false;
    }

    if (_this.item.getAttribute("data-controls") !== undefined) {
      if (_this.item.getAttribute("data-controls") === "true") _this.isControls = true;
    }

    VideoObject.addVideo(_this.id, _this.item);
    return _this;
  } //==================================================================================================================
  //          PUBLIC
  //==================================================================================================================


  _createClass(VideoObject, [{
    key: "load",
    value: function load() {
      var _this2 = this;

      var __callback = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;

      var tClass = this;

      if (this.typeContent === MediaObject.TYPE_VIDEO && !this.src) {
        this.loadVideo(__callback);
      } else {
        this._temp = document.createElement("img");

        this._temp.addEventListener('load', function () {
          C.Remove(tClass._temp);
          tClass._temp = null;
          tClass.item.setAttribute("poster", _this2.src);
          tClass.setup();
          tClass.show();
          tClass.loadVideo(__callback);
        });
      }
    }
  }, {
    key: "loadVideo",
    value: function loadVideo() {
      var __callback = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;

      var tClass = this;

      if (this.preload) {
        this.item.addEventListener('canplay', function (e) {
          tClass.videoCanPlay = true;

          if (!tClass.autoplay) {//tClass.item.pause();
            //tClass.item.currentTime = 0;
          }

          tClass.show();
          if (__callback) __callback();
        });
        this.item.load();
      } else {
        if (__callback != null) __callback();
      }
    }
  }, {
    key: "setup",
    value: function setup() {
      _get(_getPrototypeOf(VideoObject.prototype), "setup", this).call(this);

      if (this.item.getAttribute("data-button-id") !== undefined) {
        var state = this.autoplay ? "PLAY" : "PAUSE";
        var autoDispose = this.isControls;
        new InterfaceItems.ToggleButtons.TogglePause($('#' + this.item.attr("data-button-id")), this.item, state, this.isControls, autoDispose);
      }
    }
  }, {
    key: "dispose",
    value: function dispose() {
      this.item.pause();
      this.item.src = "";
      this.item.setAttribute("poster", "");
      this.item = null;

      if (this._temp) {
        this._temp[0]["src"] = "";
        this._temp = null;
      }
    }
  }, {
    key: "show",
    value: function show() {
      _get(_getPrototypeOf(VideoObject.prototype), "show", this).call(this);
    }
  }], [{
    key: "getVideo",
    value: function getVideo(__id) {
      return VideoObject.videos.find(function (obj) {
        return obj.id === __id;
      });
    }
  }, {
    key: "addVideo",
    value: function addVideo(__id, __item) {
      var findIndex = VideoObject.videos.findIndex(function (obj) {
        return obj.id === __id;
      });

      if (findIndex > -1) {
        VideoObject.videos[findIndex].video = __item;
      } else {
        VideoObject.videos.push({
          id: __id,
          video: __item
        });
      }
    }
  }]);

  return VideoObject;
}(MediaObject);

_defineProperty(VideoObject, "videos", []);;"use strict";

var Display = {
  image: ImageObject,
  bg: BGObject,
  video: VideoObject
};;"use strict";

var ControllerPage = {
  container: null,
  loader: null,
  page: null,
  pageOut: null,
  state: 0,
  //ALL OK 1: RUNNING 2:WAITING FOR NEXT
  firsTime: true,
  userAction: false,
  _directHref: "",
  _selector: "",
  _historyType: false,
  _waitingData: null,
  _preloadHref: false,
  dataStates: [],
  init: function init(__container) {
    var _this = this;

    this.container = __container;
    this._loader = LoaderController._loaders.PagesLoader;

    window.onpopstate = function () {
      _this.popState();
    };

    setTimeout(function () {
      _this.pushState({
        scrollX: window.pageXOffset,
        scrollY: window.pageYOffset
      }, null, window.location.href);

      _this._continueLoad();
    }, 100);
  },
  enable_ESC_Mode: function enable_ESC_Mode() {
    var _this2 = this;

    var __isON = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;

    if (__isON) {
      Keyboard.remove("Escape", "Page_ESC");
      Keyboard.add("Escape", "Page_ESC", function () {
        _this2.back();
      });
    } else {
      Keyboard.remove("Escape", "Page_ESC");
    }
  },
  back: function back() {
    var __safeURL = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;

    ControllerWindow.hideAll();

    if (ControllerPage.dataStates.length > 1) {
      history.back();
    } else if (__safeURL) {
      this.changePage(__safeURL);
    } else {
      this.changePage(C.GetBy.id("BackLINK").value);
    }
  },
  popState: function popState() {
    this.dataStates.pop();

    this._hidePage(true);
  },
  pushState: function pushState(__data, __title, __url) {
    this.dataStates.push({
      data: __data,
      title: __title,
      url: __url
    });
    history.pushState(__data, __title, __url);
  },
  replaceState: function replaceState(__data, __title, __url) {
    this.dataStates[this.dataStates.length - 1] = {
      data: __data,
      title: __title,
      url: __url
    };
    history.replaceState(__data, __title, __url);
  },
  changePage: function changePage() {
    var __href = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "";

    var __historyType = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "push";

    var __selector = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : "main";

    var __section = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : null;

    if (__href === ControllerPage._directHref) {
      this.state = 0;
    } else {
      if (this.state === 0) {
        this.state = 1;
        this.userAction = true;
        this._directHref = __href;
        this._historyType = __historyType;
        this._selector = __selector;

        if (this._historyType === "push") {
          history.replaceState({
            scrollX: -Scroll.x,
            scrollY: -Scroll.y
          }, null, window.location.href);
          ControllerPage.pushState({
            scrollX: 0,
            scrollY: 0,
            section: __section
          }, null, this._directHref);
        } else {
          ControllerPage.replaceState({
            scrollX: 0,
            scrollY: 0,
            section: __section
          }, null, this._directHref);
        }

        this._hidePage();
      } else {
        this.state = 2;
        this._waitingData = {
          _directHref: __href,
          _historyType: __historyType,
          _selector: __selector,
          _section: __section
        };
      }
    }
  },
  disposeOut: function disposeOut() {
    if (this.pageOut != null) {
      this.pageOut._dispose();

      this.pageOut = null;

      if (this.state < 2) {
        this.state = 0;
      } else {
        this.state = 0;
        this.changePage(this._waitingData._directHref, this._waitingData._historyType, this._waitingData._selector, this._waitingData._section);
      }
    }
  },
  _hidePage: function _hidePage() {
    var __isBack = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;

    //  if(this._isAll) {
    if (this.firsTime) this._loadPage();else {
      if (this.page) {
        this.page._hide(__isBack);
      } //this.page.hide();

      /*this.pageOut = this.page;
      this.page = null;
      if(this.pageOut) {
        this.pageOut._hide();
      }*/

    } //}
  },
  preloadPage: function preloadPage(__href) {
    if (!ControllerPage._loader.getData(__href) && ControllerPage._preloadHref !== __href) {
      ControllerPage._preloadHref = __href;

      ControllerPage._loader.loadPage(ControllerPage._preloadHref, function () {
        ControllerPage._preloadHref = null;
      });
    }
  },
  _loadPage: function _loadPage() {
    this.pageOut = this.page;
    this.page = null;

    if (this.firsTime) {
      this.continueLoad();
    } else {
      this._directHref = window.location.href; //Utils.UrlManager.url;

      var _p = this._loader.getData(ControllerPage._directHref);

      if (_p != null) {
        var dataPage = ControllerPage._parsePage(_p.page);

        document.title = dataPage.title; //this.container.prepend(dataPage.page);

        this.container.insertBefore(dataPage.page, this.container.firstChild);
        Analytics.sendUrl(ControllerPage._directHref, dataPage.title);

        ControllerPage._continueLoad();
      } else {
        //if(!ControllerPage.container.hasClass("__loading")) ControllerPage.container.addClass("__loading");
        //ControllerPage.initBarLoad();
        var pageLoaded = function pageLoaded(__data) {
          var dataPage = ControllerPage._parsePage(__data.page); //ControllerPage.container.prepend(dataPage.page);


          ControllerPage.container.insertBefore(dataPage.page, ControllerPage.container.firstChild);
          Analytics.sendUrl(ControllerPage._directHref, dataPage.title);
          document.title = dataPage.title;
          ControllerPage._preloadHref = null;

          ControllerPage._continueLoad();
        };

        if (ControllerPage._preloadHref === ControllerPage._directHref) {
          ControllerPage.onFileLoaded = pageLoaded;
        } else {
          ControllerPage._loader.loadPage(ControllerPage._directHref, pageLoaded);
        }
      }
    }
  },
  _parsePage: function _parsePage(__page) {
    var __className = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "wrap";

    var data = __page;
    var parser = new DOMParser();
    var xmlDoc = parser.parseFromString(data, "text/html");
    return {
      title: C.GetBy.selector("title", xmlDoc.documentElement)[0].innerText,
      page: xmlDoc.documentElement.getElementsByClassName(__className)[0]
    };
  },
  _continueLoad: function _continueLoad() {
    this.page = ControllerPage.getTypePage();

    this.page._load(ControllerPage.firsTime);

    this.firsTime = false;
  },
  //PAGES
  getTypePage: function getTypePage() {
    return new Page();
  },
  loop: function loop() {
    if (ControllerPage.pageOut) ControllerPage.pageOut.loop();
    if (ControllerPage.page) ControllerPage.page.loop();
  },
  resize: function resize() {
    if (ControllerPage.page) ControllerPage.page.resize();
  },
  _doLink: function _doLink(e) {
    e.preventDefault();
    ControllerPage.changePage(this.getAttribute("href"));
  },
  _doLinkAnchor: function _doLinkAnchor(e) {
    e.preventDefault();
    Scroll.gotoAnchor(this.getAttribute("href").substring(1));
  }
};;"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var Page =
/*#__PURE__*/
function () {
  //==================================================================================================================
  //          CONSTRUCTOR
  //==================================================================================================================
  function Page() {
    _classCallCheck(this, Page);

    _defineProperty(this, "_disposes", []);

    _defineProperty(this, "_resizes", []);

    _defineProperty(this, "_loops", []);

    _defineProperty(this, "_nDisposes", void 0);

    _defineProperty(this, "_nResizes", void 0);

    _defineProperty(this, "_nLoops", void 0);

    _defineProperty(this, "_isHide", false);

    _defineProperty(this, "_isActive", false);

    _defineProperty(this, "_maskNegative", void 0);

    _defineProperty(this, "wrap", void 0);

    _defineProperty(this, "container", void 0);

    _defineProperty(this, "isFirstTime", false);

    this.wrap = C.GetBy["class"]("wrap")[0];
    this.container = C.GetBy["class"]("__page")[0];
    this.container.classList.remove("__page");
  } //==================================================================================================================
  //          PUBLIC
  //==================================================================================================================


  _createClass(Page, [{
    key: "_load",
    value: function _load() {
      var _this = this;

      var __firstTime = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;

      this.isFirstTime = __firstTime;

      if (!__firstTime && LoaderController._loaders.MediaLoader) {
        LoaderController.onComplete = function () {
          _this._contentLoaded();
        };

        LoaderController._loaders.MediaLoader.getMedia();

        LoaderController.init(false);
      } else {
        this._contentLoaded();
      }
    }
  }, {
    key: "_contentLoaded",
    value: function _contentLoaded() {
      if (LoaderController._loaders.PagesLoader) LoaderController._loaders.PagesLoader.initBackground();
      if (LoaderController._loaders.MediaLoader) LoaderController._loaders.MediaLoader.initBackground();
      if (LoaderController._loaders.LazyLoader) LoaderController._loaders.LazyLoader.initBackground();

      this._activate();
    }
  }, {
    key: "_activate",
    value: function _activate() {
      C.Selector.forEach(".__language", function (element, i) {
        element.setAttribute("href", C.GetBy.id("__langURL").getAttribute("value"));
      });
      Metrics.update();
      ControllerPage.disposeOut();
      this.beforeShow();
      /*if(Preloader) {
        if (Preloader.enabled) {
          Preloader.hide(() => {
            this._show();
          });
        } else {
          this._show();
        }
      } else {
        this._show();
      }*/

      this._show();
    }
  }, {
    key: "_show",
    value: function _show() {
      var tClass = this;

      if (typeof Cursor !== 'undefined') {
        Cursor.start();
      }

      if (typeof Loading !== 'undefined') {
        Loading.stop();
      }

      requestAnimationFrame(function () {
        tClass.show__effect();
      }.bind(this));
    }
  }, {
    key: "_hide",
    value: function _hide(__isBack) {
      var _this2 = this;

      this._isHide = true;
      this.wrap.classList.add("wrap-out");
      this.wrap.classList.remove("wrap");

      if (typeof Cursor !== 'undefined') {
        Cursor.hide();
      }

      this.beforeHide();
      this.beforeHide__effect(function () {
        /*if(Preloader) {
          if (Preloader.enabled) {
            Preloader.show(() => {
              this.hide__effect(__isBack);
            });
          } else {
            this.hide__effect(__isBack);
          }
        } else {
          this.hide__effect(__isBack);
        }*/
        _this2.hide__effect(__isBack);
      });
    }
  }, {
    key: "_dispose",
    value: function _dispose() {
      for (var i = 0, j = this._nDisposes; i < j; i++) {
        this._disposes[i]();
      }

      this._disposes = [];
      this._resizes = [];
      this._loops = [];
    } //SHOW

  }, {
    key: "beforeShow",
    value: function beforeShow() {}
  }, {
    key: "show__effect",
    value: function show__effect() {
      TweenLite.set(this.container, {
        alpha: 1
      });
      this.afterShow();
    }
  }, {
    key: "afterShow",
    value: function afterShow() {
      this._isActive = true;
    } //HIDE

  }, {
    key: "beforeHide",
    value: function beforeHide() {}
  }, {
    key: "beforeHide__effect",
    value: function beforeHide__effect(__call) {
      __call();
    }
  }, {
    key: "hide__effect",
    value: function hide__effect(__isBack) {
      TweenLite.set(this.container, {
        alpha: 0
      });
      this.afterHide();
    }
  }, {
    key: "afterHide",
    value: function afterHide() {
      TweenLite.killTweensOf(this.container);
      this._isHide = true;
      this.wrap.parentNode.removeChild(this.wrap);
      LoaderController.reset();

      if (typeof Loading !== 'undefined') {
        Loading.start();
      }

      ControllerPage._loadPage();
    } //LOOP

  }, {
    key: "addLoop",
    value: function addLoop(call) {
      this._nLoops = this._loops.push(call);
    }
  }, {
    key: "loop",
    value: function loop() {
      if (!this._isHide) {
        for (var i = 0; i < this._nLoops; i++) {
          this._loops[i]();
        }
      }
    } //RESIZE

  }, {
    key: "addResize",
    value: function addResize(call) {
      this._nResizes = this._resizes.push(call);
    }
  }, {
    key: "resize",
    value: function resize() {
      if (!this._isHide) {
        for (var i = 0; i < this._nResizes; i++) {
          this._resizes[i]();
        }
      }
    }
  }, {
    key: "addDispose",
    value: function addDispose(call) {
      this._nDisposes = this._disposes.push(call);
    }
  }]);

  return Page;
}();