this.exports = function(minified) {
  var clayConfig = this;
  var _ = minified._;
  var $ = minified.$;
  var HTML = minified.HTML;
  var pokemon = this.meta.userData.pokemon;
  clayConfig.on(clayConfig.EVENTS.AFTER_BUILD, function() {
    var selector = clayConfig.getItemByAppKey("pokesearch");
    var tags = ["heading", "hide", "vibrate", "priority"];
    var show = function(num) {
      for (var tag=0; tag<tags.length; ++tag) {
       clayConfig.getItemByAppKey(tags[tag]+num).show();
      }
    };
    var hide = function(num) {
      for (var tag=0; tag<tags.length; ++tag) {
       clayConfig.getItemByAppKey(tags[tag]+num).hide();
      }
    };
    var updateVisible = function(str) {
      for (var i=1; i<=151; i++) {
        if (str && pokemon[i].toLowerCase().indexOf(str) === 0) {
          show(i);
        } else {
          hide(i);
        }
      }
    };

    updateVisible(selector.get());

    selector.on('change', function() {
      updateVisible(selector.get());
    });
  });
};
