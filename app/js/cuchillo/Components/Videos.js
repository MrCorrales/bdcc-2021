var Videos = {
  _observer : null,
  _options: {
    rootMargin: '0px 0px 100px 0px',
    threshold: 0
  },

  init() {
    if(this._observer) {
      this._observer.disconnect();
    }

    this._observer = new IntersectionObserver(this.check, this._options);
    C.Selector.forEach("[data-autoplay]", (el, i) => {
      if(Basics.isTouch) {
        const POSTER = el.getAttribute("data-poster");
        if(POSTER) {
          el.setAttribute("poster", POSTER);
        }
      } else {
        el.removeAttribute("controls");
      }
      this._observer.observe(el);
    });
  },

  check(entries, observer) {
    entries.forEach(entry => {
      const AUTOPLAY = entry.target.getAttribute("data-autoplay");
      const ITEM = entry.target;

      if(AUTOPLAY !== null) {
        if(entry.isIntersecting) ITEM.play();
        else ITEM.pause();
      }
    });
  }
};