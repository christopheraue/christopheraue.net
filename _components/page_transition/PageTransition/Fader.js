define([
    'lib/velocity'
], function(Velocity) {
    return Object.inherit({
        constructor: function() {
            this.el = document.getElementsByClassName('PageTransition-Fader')[0];
        },
        transitionIn: function(transition, onTransitioned) {
            // CSS classes already set in inlined javascript in _markup.html
            Velocity(this.el, {opacity: [0, 1]}, 300, 'ease-in-out', function() {
                onTransitioned(this);
            }.bind(this));
        },
        transitionOut: function(transition, onTransitioned) {
            this.el.classList.add(transition.to + '-transition');
            Velocity(this.el, {opacity: [1, 0]}, 300, 'ease-in-out', function() {
                onTransitioned(this)
            }.bind(this));
        },
        cleanUpTransition: function(transition) {
            this.el.classList.remove(transition.to + '-transition');
        }
    })
});