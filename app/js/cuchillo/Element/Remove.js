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

C.Remove = function(element) {
  element.parentNode.removeChild(element);
};

C.Empty = function(element) {
  while(element.firstChild)
    element.removeChild(element.firstChild);
};