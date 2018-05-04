define([
    '_components/_global/EventTarget',
    'lib/velocity',
    '_components/page_transition/PageTransition'
], function(EventTarget, Velocity, PageTransition) {
    return EventTarget.inherit({
        constructor: function(category) {
            this.constructor.superconstructor.call(this);
            this.category = category;
        },
        transitionIn: function(transition) {
            PageTransition.fader.transitionIn(transition, function() {
                this.cleanUpTransition(transition);
            }.bind(this));
        },
        transitionOut: function(targetCategory) {
            var transition = {from: this.category, to: targetCategory, transitionHeader: true};

            PageTransition.fader.transitionOut(transition, function() {
                this.dispatchEvent('transitionedOut', transition);
            }.bind(this));

            return transition;
        },
        cleanUpTransition: function(transition) {
            PageTransition.fader.cleanUpTransition(transition);
        }
    })
});