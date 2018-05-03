define([
    '_components/_global/EventTarget',
    'lib/velocity'
], function(EventTarget, Velocity) {
    return EventTarget.inherit({
        constructor: function(category) {
            this.constructor.superconstructor.call(this);
            this.category = category;
        },
        transitionIn: function(transition) {
            // transition dependent CSS classes already set in _sync.js
            var fader = document.getElementById('transition-fader');
            Velocity(fader, {opacity: [0, 1]}, 300, 'ease-in-out', function() {
                this.cleanUpTransition(transition);
            }.bind(this));
        },
        transitionOut: function(targetCategory) {
            var transition = {category: targetCategory, fadeHeader: true};

            // Fade page
            document.body.classList.add(transition.category + '-transition');
            var fader = document.getElementById('transition-fader');
            Velocity(fader, {opacity: [1, 0]}, 300, 'ease-in-out', function(){
                this.dispatchEvent('transitionedOut', transition);
            }.bind(this));

            return transition;
        },
        cleanUpTransition: function(transition) {
            document.body.classList.remove(transition.category + '-transition');
        }
    })
});