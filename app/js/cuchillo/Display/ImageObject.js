class ImageObject extends MediaObject{

    constructor(__item, __showAtEnd = true, __showEffect = true) {
        super(__item, __showAtEnd, __showEffect, MediaObject.TYPE_IMG);
    }

    setup() {
        super.setup();
    }

    load(__callback) {
        var tClass = this;

        this.item.addEventListener('load', function(){
            tClass.setup();
            tClass.show();

            if(__callback != null)  __callback();
        });
        this.item.setAttribute("src", this.src);
    }

    dispose() {
        if(!super.isStatic) {
            this.item = null;
/*                super.item.remove();
            this.item[0]["src"] = "";
            delete this.item;
            this.item = null; */
        }
    }

    show() {
        super.show();
    }
}


