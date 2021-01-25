C.Engine = {
    active:false,
    animate: function() {
      if(!this.active) return;
      Main.loop();
      requestAnimationFrame(this.animate.bind(this));
    },
    start:function() {
      this.active = true;
      requestAnimationFrame(this.animate.bind(this));
    },
    stop() {
      Engine.active = false;
    }
};

