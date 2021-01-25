class RadioStroke {
  _refItem;
  _radios = [];
  _active;


  constructor(__container) {
    this._refItem = C.GetBy.selector("input", __container)[0];
    this.setupRadios();
  }

  setupRadios() {
    const DOM = C.GetBy.selector("[name='" + this._refItem.getAttribute("name") + "']");
    C.ForEach(DOM, (item) => {
      this._radios.push({
        input: item,
        stroke: new CheckboxStroke(item.parentNode, (e)=> {this.checkRadios(e);})
      });
    });
  }

  checkRadios(__newActive) {
    if(this._active) {
      this._active.out();
    }

    this._active = __newActive;

    /*console.log("SS");
    this._radios.forEach((item)=>{
      if(!item.input.checked) {
        item.input.checked
      }
    });*/
  }
}