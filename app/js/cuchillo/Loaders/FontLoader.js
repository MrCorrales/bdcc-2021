class FontLoader extends CustomLoader{

  _manifest = [];

//==================================================================================================================
//          GETTER SETTER
//==================================================================================================================

//==================================================================================================================
//          CONSTRUCTOR
//==================================================================================================================

  constructor (__manifest, __total) {
    super();

    this.id = "FontLoader";
    this._manifest = __manifest;
    this.itemsTotal = __total;
    this.itemsLoaded = 0;
    this.progress = 0;
    this.errors = 0;
    this._manifest.classes = false;
    this._manifest.events = true;
    this._manifest.fontactive = this.fontActive.bind(this);
    this._manifest.active = this.end.bind(this);
  }

  init() {

    if(this.itemsTotal === this.itemsLoaded)    {
      this.end();
    } else {
      WebFont.load(this._manifest);
    }
  }

  end() {
    if(this.onComplete) this.onComplete(this.id);
    LoaderController.remove(this);
  }

  dispose() {
    this.onFileLoaded = null;
    this.onProgress = null;
    this.onComplete = null;
    this.itemsTotal = null;
    this.itemsLoaded = null;
    this.progress = null;
    this.errors = null;
    this._manifest = null;
  }

//==================================================================================================================
//          PRIVATE
//==================================================================================================================

  fontActive(e) {
    /*this.itemsLoaded++;
    this.progress = this.itemsLoaded/this.itemsTotal;*/
    this.progress = 1;

    if(this.onProgress) this.onProgress();
    if(this.onFileLoaded) this.onFileLoaded();
  }

  // An error happened on a file
  doError(event) {
    console.log("Error")
    this.errors  =   this.errors + 1;
  }
}


