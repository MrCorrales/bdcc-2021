class VideoObject extends MediaObject {

    static videos = [];

    _temp = null;
    isLoaded = false;
    autoplay = false;
    preload = true;
    isControls = false;
    typeContent = "VIDEO"

//==================================================================================================================
//          CONSTRUCTOR
//==================================================================================================================

    constructor(__item,  __showAtEnd = true, __showEffect = true) {
        super(__item, __showAtEnd, __showEffect, MediaObject.TYPE_VIDEO);

        if(this.item.getAttribute("data-autoplay")!==undefined) {
            if(this.item.getAttribute("data-autoplay") === "true")  this.autoplay = true;
        }

        if(this.item.getAttribute("data-preload")!==undefined) {
            if(this.item.getAttribute("data-preload") === "false")  this.autoplay = false;
        }

        if(this.item.getAttribute("data-controls")!==undefined) {
            if(this.item.getAttribute("data-controls") === "true")  this.isControls = true;
        }

      VideoObject.addVideo(this.id, this.item);
    }

//==================================================================================================================
//          PUBLIC
//==================================================================================================================

    static getVideo(__id) {
        return VideoObject.videos.find(obj => obj.id === __id);
    }

    static addVideo(__id, __item) {
        const findIndex = VideoObject.videos.findIndex(obj => obj.id === __id);

        if(findIndex > -1) {
          VideoObject.videos[findIndex].video = __item;
        } else {
          VideoObject.videos.push({id:__id, video:__item});
        }
    }

    load(__callback = null) {
        var tClass = this;

        if(this.typeContent === MediaObject.TYPE_VIDEO && !this.src) {
            this.loadVideo(__callback);
        } else {
            this._temp = document.createElement("img");
            this._temp.addEventListener('load', ()=>{
                C.Remove(tClass._temp);
                tClass._temp = null;
                tClass.item.setAttribute("poster", this.src);

                tClass.setup();
                tClass.show();
                tClass.loadVideo(__callback);
            });
        }
    }

    loadVideo(__callback = null) {
        var tClass = this;

        if(this.preload) {
            this.item.addEventListener('canplay', (e) => {
                tClass.videoCanPlay = true;
                if (!tClass.autoplay) {
                    //tClass.item.pause();
                  //tClass.item.currentTime = 0;
                }
                tClass.show();
              if (__callback) __callback();
            });

            this.item.load();
        } else {
            if (__callback != null) __callback();
        }
    }

    setup() {
        super.setup();

        if (this.item.getAttribute("data-button-id") !== undefined) {
            var state = this.autoplay? "PLAY" : "PAUSE"
            var autoDispose = this.isControls;
            new InterfaceItems.ToggleButtons.TogglePause($('#' + this.item.attr("data-button-id")), this.item, state, this.isControls, autoDispose);
        }
    }

    dispose() {
        this.item.pause();
        this.item.src = ""
        this.item.setAttribute("poster", "");

        this.item = null;

        if (this._temp) {
            this._temp[0]["src"] = "";
            this._temp = null;
        }
    }

    show() {
      super.show();
    }

}
