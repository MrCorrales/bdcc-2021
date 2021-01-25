var ControllerWindow = {

  _windows: [],

  toggle: function(__id, __btn) {
    let win = this.getWindow(__id);
    if(win != null) {
      win.window.actionButtonToggle(__btn);
    }
  },

  add(__id, __win) {
    this._windows.push({
      id:__id,
      window:__win
    });
  },

  hideAll() {
    for(let i=0; i<this._windows.length; i++) {
      if(this._windows[i].window.isOpen) {
        this._windows[i].window.hide();
      }
    }
  },

  getWindow: function(__id) {
    for(let i=0; i<this._windows.length; i++) {
      if(__id === this._windows[i].id) {
        return this._windows[i];
      }
    }
  },

  resize() {
    for(let i=0; i<this._windows.length; i++) {
      return this._windows[i].window.resize();
    }
  }
};