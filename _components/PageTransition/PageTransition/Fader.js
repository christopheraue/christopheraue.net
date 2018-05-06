define([
    'lib/velocity',
    'core-ext/body'
], function(Velocity) {
    return Object.inherit({
        constructor: function() {
            this.el = document.getElementsByClassName('PageTransition-Fader')[0];
        },
        transitionIn: function(transition) {
            // CSS classes already set in inlined javascript in _markup.html
            Velocity(this.el, {opacity: [0, 1]}, 300, 'ease-in-out', function() {
                this.cleanUpTransition(transition);
            }.bind(this));
        },
        transitionOut: function(transition, onTransitioned) {
            if (transition.to === 'home') {
                document.body.hideScrollbar();
            }
            this.el.classList.add(transition.to + '-transition');
            Velocity(this.el, {opacity: [1, 0]}, 300, 'ease-in-out', function() {
                onTransitioned(this)
            }.bind(this));
        },
        cleanUpTransition: function(transition) {
            if (transition.to === 'home') {
                document.body.showScrollbar();
            }
            this.el.classList.remove(transition.to + '-transition');
        }
    })
});