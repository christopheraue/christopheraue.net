define(function() {
  return Object.inherit({
    transitionIn: function() {
      // nothing special to do
    },
    transitionOut: function(transition, onTransitioned) {
      onTransitioned(this);
    }
  })
});