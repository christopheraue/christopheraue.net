define([
    'lib/velocity'
], function(Velocity) {
    return Object.inherit({
        constructor: function() {
            this.el = document.getElementsByClassName('PageTransition-Fader')[0];
        },
        showPage: function(transition, onShown) {
            // CSS classes already set in inlined javascript in _markup.html
            Velocity(this.el, {opacity: [0, 1]}, 300, 'ease-in-out', onShown);
        },
        hidePage: function(transition, onHidden) {
            this.el.classList.add(transition.category + '-transition');
            transition.transitionHeader && this.el.classList.add('hide-header');
            Velocity(this.el, {opacity: [1, 0]}, 300, 'ease-in-out', onHidden);
        },
        cleanUpTransition: function(transition) {
            this.el.classList.remove(transition.category + '-transition');
            transition.transitionHeader && this.el.classList.remove('hide-header');
        }
    })
});