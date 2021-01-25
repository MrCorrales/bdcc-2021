var Analytics = {
  isEnabled: false,

  init: function() {
    let s, t;
    s = document.createElement('script');
    s.type = 'text/javascript';
    s.src = Basics.cdn + '/resources/dist/analytics.js';
    s.onload = s.onreadystatechange = function() {
      if ( !Analytics.isEnabled && (!this.readyState || this.readyState == 'complete') ) {
        Analytics.isEnabled = true;
      }
    };
    t = document.getElementsByTagName('script')[0];
    t.parentNode.insertBefore(s, t);

    if(Main.hasTagManager) {
      let s, t;
      s = document.createElement('script');
      s.type = 'text/javascript';
      s.src = Basics.cdn + '/resources/dist/analytics-tag-manager.js';
      s.onload = s.onreadystatechange = function() {

      };
      t = document.getElementsByTagName('script')[0];
      t.parentNode.insertBefore(s, t);
    }
  },

  sendUrl: function(__url, __title) {
    if(this.isEnabled) {
      ga('set', {page: __url, title: __title});
      ga('send', 'pageview');

      if(Basics.isDebug) {
        console.log('send', 'pageview', __url, __title);
      }
    }
  },

  sendEvent: function(__data) {
    if(this.isEnabled) {
      const data = __data.split(",");
      ga('send', 'event', data[0]?data[0]:'', data[1]?data[1]:'', data[2]?data[2]:'');

      if(Basics.isDebug) {
        console.log('send', 'event', data[0]?data[0]:'x', data[1]?data[1]:'x', data[2]?data[2]:'x');
      }
    }
  }
};