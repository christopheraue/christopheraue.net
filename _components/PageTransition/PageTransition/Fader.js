define([
    'base-_base/lib/velocity',
    'base-_base/ScrollControl'
], function(Velocity, ScrollControl) {
    return Object.inherit({
        constructor: function() {
            this.el = document.getElementsByClassName('PageTransition-Fader')[0];
        },
        transitionIn: function(transition) {
            // CSS classes for the transition already set in inlined
            // javascript in _markup.html
            Velocity(this.el, {opacity: [0, 1]}, 300, 'ease-in-out', function() {
                // Remove the CSS classes set in _markup.html
                this.el.classList.remove(transition.to + '-transition');
            }.bind(this));
        },
        transitionOut: function(transition, onTransitioned) {
            if (transition.to === 'home') {
                ScrollControl.hideScrollbar(document.documentElement);
                document.onPersistedPageshow(function() {
                    ScrollControl.showScrollbar(document.documentElement);
                }.bind(this));
            }

            this.el.classList.add(transition.to + '-transition');
            document.onPersistedPageshow(function() {
                this.el.classList.remove(transition.to + '-transition');
            }.bind(this));

            Velocity(this.el, {opacity: [1, 0]}, 300, 'ease-in-out', function() {
                document.onPersistedPageshow(function() {
                    this.el.style.opacity = ''
                }.bind(this));
                onTransitioned(this)
            }.bind(this));
        }
    })
});