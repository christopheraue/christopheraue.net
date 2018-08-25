define([
  'base/ScrollControl',
  'cat/ROOT_CATEGORY_NAME'
], function(ScrollControl, ROOT_CATEGORY_NAME) {
  return Object.inherit({
    transitionIn: function() {
      // nothing special to do
    },
    transitionOut: function(transition, onTransitioned) {
      if (transition.to[0] === ROOT_CATEGORY_NAME) {
        ScrollControl.hideScrollbar(document.documentElement);
        document.onPersistedPageshow(function() {
          ScrollControl.showScrollbar(document.documentElement);
        }.bind(this));
      }
      onTransitioned(this);
    }
  })
});