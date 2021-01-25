class BGObject extends MediaObject{

    _temp = document.createElement("img");
    size;
    position;

    constructor(__item, __showAtEnd = true, __showEffect = true) {
        super(__item, __showAtEnd, __showEffect, MediaObject.TYPE_BG);

        this.size = getComputedStyle(this.item)["background-size"];
        this.position = getComputedStyle(this.item)["background-position"];

        this._temp.style.display = "none";
        this.item.appendChild(this._temp);
    }

    setup() {
        super.setup();
    }

    load(__callback) {
        let tClass = this;
        this._temp.addEventListener('load', function(){
            C.Remove(tClass._temp);
            tClass._temp = null;

            tClass.item.style.backgroundImage = "url(" + tClass.src + ")";
            tClass.item.style.backgroundSize = tClass.bgSize;
            tClass.item.style.backgroundPosition = tClass.bgPos;

            tClass.setup();
            tClass.show();

            if(__callback != null)  __callback();
        });
        this._temp.setAttribute("src", this.src);
    }

    dispose() {
      if (!super.isStatic) {
        if (this._temp) {
          this._temp.setAttribute("src", "");
          this._temp = null;
        }
        this.item = null;
      }
    }

    show() {
        super.show();
    }
}


