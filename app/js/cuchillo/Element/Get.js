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
  p: function (p) {
    return p ? p : document
  },

  id: function (el, p) {
    return this.p(p).getElementById(el)
  },

  class: function (el, p) {
    return this.p(p).getElementsByClassName(el)
  },

  tag: function (el, p) {
    return this.p(p).getElementsByTagName(el)
  },

  selector: function (el, p) {
    return this.p(p).querySelectorAll(el)
  },
};

C.Selector = {
  forEach: function(selector, call) {
    let items = document.querySelectorAll(selector);
    items = [].slice.call(items);
    items.forEach(call);
  }
};

C.ForEach =  function(items, call) {
    items = [].slice.call(items);
    items.forEach(call);
};