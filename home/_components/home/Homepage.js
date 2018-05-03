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
            PageTransition.fader.showPage(transition, function() {
                this.cleanUpTransition(transition);
            }.bind(this));
        },
        transitionOut: function(targetCategory) {
            var transition = {category: targetCategory, transitionHeader: true};

            // Fade page
            PageTransition.fader.hidePage(transition, function() {
                this.dispatchEvent('transitionedOut', transition);
            }.bind(this));

            return transition;
        },
        cleanUpTransition: function(transition) {
            PageTransition.fader.cleanUpTransition(transition);
        }
    })
});