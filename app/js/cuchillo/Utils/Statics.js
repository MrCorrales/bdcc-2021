const Statics = {
  stats:null,

  init: function (__container = document.body) {
    if(Basics.isDebug) {
      this.stats = new Stats();
      this.stats.showPanel(0); // 0: fps, 1: ms, 2: mb, 3+: custom
      __container.appendChild(this.stats.dom);
    }
  },

  begin: function () {
    this.stats.begin();
  },

  end: function () {
    this.stats.end();
  },
};