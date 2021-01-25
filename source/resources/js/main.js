var Main = {
  page:null,
  scrollbar:null,

  stats:null,
  _movables:[],
  zIndex:0,

  init: function() {
    Basics.id = "BDCC_v0.2.1";
    Basics.mainLang = "__";
    Basics.isDebug = document.body.classList.contains("__isDebug");
    Basics.hasCookies = false;
    Analytics.isEnabled = true;

    Keyboard.init();

    Cursor.init();
    Cursor.power = .2;
    Cursor.powerRotation = .05;
    C.Ease.init();
    Interaction.init({ajax:!Basics.isReducedMotion, drag:false, hasMove:true});

    Metrics.update(true);
    Accessibility.init();
    Sidemenu.init();
    Functions.doMrCorrales();
    Statics.init(C.GetBy.id("Interface"));

    LoaderController.add(new PagesLoader());
    LoaderController.init(()=> this.setup());
  },

  setup: function() {
    Wrap.init();
    Header.init();
    Cookies.init();
    Acordions.init();

    ControllerPage.getTypePage = Main.getTypePage;
    ControllerPage.init(Wrap.mainholder);

    if(Basics.isDebug) {
      gsap.ticker.add(() => {Main.loopDebug();});
    } else {
      gsap.ticker.add(() => {Main.loop();});
    }
  },

  getTypePage: function() {

    //console.log("GET Basics.isMobile " + Basics.isMobile, window.innerWidth < 600)
    switch (C.GetBy.id("Page").getAttribute("data-page")) {
      case "tools":
        return new Tools();
        break;

      case "tool-detail":
        return new ToolDetail();
        break;

      case "icss":
        return new ICSS();
        break;

      case "ayudas":
        return new Ayudas();
        break;

      case "search":
        return new Search();
        break;


      default:
        return new Default();
    }
  },

  resize: function() {
    ControllerWindow.resize();
    Acordions.resize();
    Sidemenu.resize();
    Header.resize();
    if(ControllerPage.page) ControllerPage.page.resize();
    Scroll.resize();
    Scroll.resize();
    Scroll.offsetAnchor = Header.height + 4;
  },

  loop: function(__time, __delta, __frame) {

    if(Scroll.isScrolling) {
      Header.loop();
      Scroll.loop();
    }

   // if(ControllerPage.page) ControllerPage.page.loop();
  },

  loopDebug: function(__time, __delta, __frame) {
    Statics.begin();
    this.loop();
    Statics.end();
  }
};

//READY?
if (document.attachEvent ? document.readyState === "complete" : document.readyState !== "loading"){
  Main.init();
} else {
  document.addEventListener('DOMContentLoaded', Main.init);
}
