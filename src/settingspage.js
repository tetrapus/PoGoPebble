this.exports = function(minified) {
  var clayConfig = this;
  var _ = minified._;
  var $ = minified.$;
  var HTML = minified.HTML;
  clayConfig.on(clayConfig.EVENTS.AFTER_BUILD, function() {
    var selector = clayConfig.getItemByAppKey("pokemon_selector");
    var tags = ["hide", "vibrate", "priority"];
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
    for (var i=1; i<=151; i++) {
      hide(i);
    }
    var visible = selector.get();
    show(visible);
    selector.on('change', function() {
      hide(visible);
      visible = selector.get();
      show(visible);
    });
  });
};