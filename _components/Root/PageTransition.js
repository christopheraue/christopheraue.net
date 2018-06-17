define([
  'base/ScrollControl'
], function(ScrollControl) {
  return Object.inherit({
    transitionIn: function() {
      // nothing special to do
    },
    transitionOut: function(transition, onTransitioned) {
      if (transition.to[0] === 'home') {
        ScrollControl.hideScrollbar(document.documentElement);
        document.onPersistedPageshow(function() {
          ScrollControl.showScrollbar(document.documentElement);
        }.bind(this));
      }
      onTransitioned(this);
    }
  })
});