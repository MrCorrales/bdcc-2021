var VirtualScroll = (function(document) {

  var vs = {};

  var numListeners, listeners = [], initialized = false;

  var touchStartX, touchStartY;

  // [ These settings can be customized with the options() function below ]
  // Mutiply the touch action by two making the scroll a bit faster than finger movement
  var touchMult = 2;
  // Firefox on Windows needs a boost, since scrolling is very slow
  var firefoxMult = 60;
  //
  var chromeMult = .4;
  //
  var edgeMult = .4;
  // How many pixels to move with each key press
  var keyStep = 120;
  // General multiplier for all mousehweel including FF
  var mouseMult = 1;

  var bodyTouchAction;

  var hasWheelEvent = 'onwheel' in document;
  var hasMouseWheelEvent = 'onmousewheel' in document;
  var hasTouch = 'ontouchstart' in document;
  var hasTouchWin = navigator.msMaxTouchPoints && navigator.msMaxTouchPoints > 1;
  var hasPointer = !!window.navigator.msPointerEnabled;
  var hasKeyDown = 'onkeydown' in document;

  var isFirefox = navigator.userAgent.indexOf('Firefox') > -1;
  var isEdge = navigator.userAgent.indexOf('Edge') > -1;
  var isChrome = navigator.userAgent.indexOf('Chrome') > -1;

  var event = {
    y: 0,
    x: 0,
    deltaX: 0,
    deltaY: 0,
    originalEvent: null,
    isKey: false
  };

  vs.on = function(f) {
    if(!initialized) initListeners();
    listeners.push(f);
    numListeners = listeners.length;
  }

  vs.options = function(opt) {
    keyStep = opt.keyStep || 120;
    firefoxMult = opt.firefoxMult || 60;
    chromeMult = opt.chromeMult || .4;
    touchMult = opt.touchMult || 2;
    mouseMult = opt.mouseMult || 1;
  }

  vs.off = function(f) {
    for(var i=0;i<numListeners;i++) {
      if(f === listeners[i]) {
        listeners.splice(i, 1);
      }
    }

    numListeners = listeners.length;
    if(numListeners <= 0) destroyListeners();
  }

  var notify = function(e) {
    event.x += event.deltaX;
    event.y += event.deltaY;
    event.originalEvent = e;

    for(var i = 0; i < numListeners; i++) {
      listeners[i](event);
    }
    event.isKey = false;
  }

  var onWheel = function(e) {
    // In Chrome and in Firefox (at least the new one)
    event.deltaX = e.wheelDeltaX || e.deltaX * -1;
    event.deltaY = e.wheelDeltaY || e.deltaY * -1;

    // for our purpose deltamode = 1 means user is on a wheel mouse, not touch pad
    // real meaning: https://developer.mozilla.org/en-US/docs/Web/API/WheelEvent#Delta_modes
    if(isFirefox && e.deltaMode == 1) {
      event.deltaX *= firefoxMult;
      event.deltaY *= firefoxMult;
    }

    if(isEdge && e.deltaMode == 1) {
      event.deltaX *= firefoxMult;
      event.deltaY *= firefoxMult;
    }

    if(isChrome) {
      event.deltaX *= chromeMult;
      event.deltaY *= chromeMult;
    }

    event.deltaX *= mouseMult;
    event.deltaY *= mouseMult;

    notify(e);
  }

  var onMouseWheel = function(e) {
    // In Safari, IE and in Chrome if 'wheel' isn't defined
    event.deltaX = (e.wheelDeltaX) ? e.wheelDeltaX : 0;
    event.deltaY = (e.wheelDeltaY) ? e.wheelDeltaY : e.wheelDelta;

    notify(e);
  }

  var onTouchStart = function(e) {
    var t = (e.targetTouches) ? e.targetTouches[0] : e;
    touchStartX = t.pageX;
    touchStartY = t.pageY;
  }

  var onTouchMove = function(e) {
    // e.preventDefault(); // < This needs to be managed externally
    var t = (e.targetTouches) ? e.targetTouches[0] : e;

    event.deltaX = (t.pageX - touchStartX) * touchMult;
    event.deltaY = (t.pageY - touchStartY) * touchMult;

    touchStartX = t.pageX;
    touchStartY = t.pageY;

    notify(e);
  }

  var onKeyDown = function(e) {
    // 37 left arrow, 38 up arrow, 39 right arrow, 40 down arrow
    event.deltaX = event.deltaY = 0;

    switch(e.keyCode) {
      case 37:
        event.deltaX = -keyStep;
        event.isKey = true;
        break;
      case 39:
        event.deltaX = keyStep;
        event.isKey = true;
        break;
      case 38:
        event.deltaY = keyStep;
        event.isKey = true;
        break;
      case 40:
        event.deltaY = -keyStep;
        event.isKey = true;
        break;
    }

    notify(e);
  }

  var initListeners = function() {
    if(hasWheelEvent) document.addEventListener("wheel", onWheel, { capture: false, passive: true });
    if(hasMouseWheelEvent) document.addEventListener("mousewheel", onMouseWheel,{ capture: false, passive: true });

    if(hasTouch) {
      document.addEventListener("touchstart", onTouchStart, {passive: true});
      document.addEventListener("touchmove", onTouchMove, {passive: true});
    }

    if(hasPointer && hasTouchWin) {
      bodyTouchAction = document.body.style.msTouchAction;
      document.body.style.msTouchAction = "none";
      document.addEventListener("MSPointerDown", onTouchStart, {passive: true});
      document.addEventListener("MSPointerMove", onTouchMove, {passive: true});
    }

    if(hasKeyDown) document.addEventListener("keydown", onKeyDown, {passive: true});

    initialized = true;
  }

  var destroyListeners = function() {
    if(hasWheelEvent) document.removeEventListener("wheel", onWheel);
    if(hasMouseWheelEvent) document.removeEventListener("mousewheel", onMouseWheel);

    if(hasTouch) {
      document.removeEventListener("touchstart", onTouchStart);
      document.removeEventListener("touchmove", onTouchMove);
    }

    if(hasPointer && hasTouchWin) {
      document.body.style.msTouchAction = bodyTouchAction;
      document.removeEventListener("MSPointerDown", onTouchStart, true);
      document.removeEventListener("MSPointerMove", onTouchMove, true);
    }

    if(hasKeyDown) document.removeEventListener("keydown", onKeyDown);

    initialized = false;
  }

  return vs;
})(document);




