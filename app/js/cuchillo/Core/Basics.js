const _isMobile = !!navigator.userAgent.match(/iPhone|iPad|iPod/i) ||
  navigator.userAgent.match(/Android/i) ||
  navigator.userAgent.match(/Opera Mini/i) ||
  navigator.userAgent.match(/IEMobile/i);

const _isSafari = navigator.userAgent.indexOf('Safari') != -1 && navigator.userAgent.indexOf('Chrome') == -1;

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
  isTouch: ('ontouchstart' in window) || (navigator.maxTouchPoints > 0) || (navigator.msMaxTouchPoints > 0),
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
  velocidadAux: 0,
};

const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
Basics.isReducedMotion = mediaQuery.matches;

try {
  mediaQuery.addEventListener('change', () => {
    location.reload();
  });
} catch (e1) {
  try {
    // Safari
    mediaQuery.addListener((e) => {
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
console.log("Basics.isMobile " + Basics.isMobile)