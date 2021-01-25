class Movable {
  container;
  _offset = {x:0,y:0};
  _position = {
    x: 0,
    y: 0,
    z: 0,
    rx:0,
    ry:0
  };
  _isDOwn = false;

  constructor(__item) {
    this.container = __item;

    this.container.addEventListener('mousedown', (e) => {
      this._isDown = true;
      this._offset = {
        x:Interaction.positions.mouse.x,
        y:Interaction.positions.mouse.y,
        z:Main.zIndex
      };

      this.container.style.zIndex = Main.zIndex;
      Main.zIndex++;

      }, true);


    document.addEventListener('mouseup', () => {
      this._isDown = false;
    }, true);
  }

  loop() {
    if (this._isDown) {
      this._position.x += Interaction.positions.mouse.x - this._offset.x;
      this._position.y += Interaction.positions.mouse.y - this._offset.y;

      this.container.style[CSS.transform] = CSS.translate3D(this._position.x, this._position.y, this._offset.z);

      this._offset = {
        x:Interaction.positions.mouse.x,
        y:Interaction.positions.mouse.y,
        z:this._offset.z,
      };
    }
  }
}