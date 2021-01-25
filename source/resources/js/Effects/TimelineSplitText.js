function TimelineSplitText(__items, __tl = null, __delay = 0) {
  const _class = "__" + new Date().getTime();
  let tl = __tl? __tl : new gsap.timeline();

  tl.pause();

  for(let i=0; i<__items.length;i++) {
    __items[i].classList.add(_class);
  }

  new SplitText("." + _class, {type: "lines", linesClass: "_l_" + _class});
  let items = C.GetBy.class("_l_" + _class, this._item);

  if(items.length > 0) {
    const RATIO = items[0].offsetHeight / Metrics.WIDTH;
    const MULT = Math.min(1, Maths.precission(RATIO*10));
    const TIME_INC = Maths.precission(RATIO*.5, 2);
    const DELAY = TIME_INC;
    const TIME = 1.8 * MULT;
    const TIME_ROT = 1.5 * MULT;

    for (let i = 0; i < items.length; i++) {
      var wrapper = document.createElement('div');

      items[i].parentNode.insertBefore(wrapper, items[i]);
      wrapper.appendChild(items[i]);
      tl.from(items[i], {duration: TIME_ROT + (TIME_INC * i), rotation: 25, ease: C.Ease.EASE_CUCHILLO_IN_OUT, force3D: true}, __delay);
      tl.from(items[i], {y: "100%", duration: TIME + (TIME_INC * i), ease: C.Ease.EASE_CUCHILLO_IN_OUT, force3D: true}, __delay);
      __delay += DELAY;
    }
  }

  return tl;
}

function TimelineSplitTextNoRotation(__items, __tl = null, __delay = 0) {
  const _class = "__" + new Date().getTime();
  let tl = __tl? __tl : new gsap.timeline();

  tl.pause();

  for(let i=0; i<__items.length;i++) {
    __items[i].classList.add(_class);
  }

  new SplitText("." + _class, {type: "lines", linesClass: "_l_" + _class});
  let items = C.GetBy.class("_l_" + _class, this._item);

  for(let i=0; i<items.length; i++) {
    var wrapper = document.createElement('div');

    items[i].parentNode.insertBefore(wrapper, items[i]);
    wrapper.appendChild(items[i]);
    tl.from(items[i], {duration: 1.5 + (.1 * i), rotation:25, ease:C.Ease.EASE_CUCHILLO_IN_OUT, force3D: true}, __delay);
    tl.from(items[i], {y: "100%", duration: 1.8 + (.1 * i), ease:C.Ease.EASE_CUCHILLO_IN_OUT, force3D: true}, __delay);;
    __delay += .1;
  }

  return tl;
}


function SplitLinesToScrollItem(__items, __tl = null) {
  const _class = "__" + new Date().getTime();

  for(let i=0; i<__items.length;i++) {
    __items[i].classList.add(_class);
  }

  new SplitText("." + _class, {type: "lines", linesClass: "_l_" + _class});
  let items = C.GetBy.class("_l_" + _class, this._item);

  for(let i=0; i<items.length; i++) {
    var wrapper = document.createElement('div');
    wrapper.setAttribute("scroll-item", "");
    wrapper.setAttribute("data-scroll-class", "line");
    if(i+1===items.length) {
      wrapper.setAttribute("data-last-line", "true");
    }
    items[i].parentNode.insertBefore(wrapper, items[i]);
    gsap.set(items[i], {y: "100%", force3D: true});
    wrapper.appendChild(items[i]);
  }
}

function TimelineSplitGrunge(__items, __tl = null, __delay = 0) {
  const _class = "__" + new Date().getTime();
  let tl = __tl? __tl : new gsap.timeline();

  tl.pause();

  if(navigator.userAgent.indexOf('Safari') != -1 && navigator.userAgent.indexOf('Chrome') == -1) {

  } else {
    for (let i = 0; i < __items.length; i++) {
      __items[i].classList.add(_class);
    }

    new SplitText("." + _class, {type: "chars", charsClass: "_w_" + _class});
    let items = C.GetBy.class("_w_" + _class, this._item);

    for (let i = 0; i < items.length; i++) {
      gsap.set(items[i], {alpha: 0, force3D: true});

      tl.to(items[i], {alpha: 1, duration: .1, ease: Power3.easeIn, force3D: true}, __delay);
      __delay += .05;
      tl.from(items[i], {
        z: 600,
        duration: .2,
        transformOrigin: "50% 50%",
        ease: Power4.easeIn,
        force3D: true
      }, __delay);
      __delay += .05;
    }
  }

  return tl;
}

function TimelineSplitKeyboard(__items, __tl = null, __delay = 0) {
  const _class = "__" + new Date().getTime();
  let tl = __tl? __tl : new gsap.timeline();

  tl.pause();

  for(let i=0; i<__items.length;i++) {
    __items[i].classList.add(_class);
  }

  new SplitText("." + _class, {type: "chars", charsClass: "_w_" + _class});
  let items = C.GetBy.class("_w_" + _class, this._item);

  for(let i=0; i<items.length; i++) {
    gsap.set(items[i],{alpha:0, force3D:true});
    tl.to(items[i], {alpha:1, duration:2, ease:C.Ease.EASE_CUCHILLO_IN_OUT, force3D: true}, __delay);
    __delay += .05;
  }

  return tl;
}

function TimelineText(__items, __tl = null, __time = 1.5, __delay = 0) {
  let tl = __tl? __tl : new gsap.timeline();

  tl.pause();

  let items = __items;
  let incTime = __time * .006666666666;
  let incDelay = __time * .013333333333;

  for(let i=0; i<items.length; i++) {
    tl.from(items[i], {duration: __time + (incTime * i), rotation:15, ease:C.Ease.EASE_CUCHILLO_IN_OUT, force3D: true}, __delay*incDelay);
    tl.from(items[i], {y: "200%", duration: __time * 1.2 + (.1 * i), ease:C.Ease.EASE_CUCHILLO_IN_OUT, force3D: true}, __delay);
    __delay += .1;
  }

  return tl;
}