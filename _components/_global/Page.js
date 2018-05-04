define([
    '_components/_global/EventTarget',
    'lib/velocity',
    '_components/page_transition/PageTransition',
    '_components/page_header/PageHeader',
    'core-ext/body'
], function(EventTarget, Velocity, PageTransition, PageHeader) {
    return EventTarget.inherit({
        constructor: function(category) {
            this.constructor.superconstructor.call(this);
            this.category = category;
            this.header = new PageHeader();
            this.fader = PageTransition.fader;
        },
        transitionIn: function(transition) {
            this.header.transitionIn(transition);
            this.fader.transitionIn(transition, function() {
                this.cleanUpTransition(transition);
            }.bind(this));
        },
        transitionOut: function(targetCategory) {
            var transition = {from: this.category, to: targetCategory};

            if (transition.to === 'home') {
                document.body.hideScrollbar();
            }

            this.header.transitionOut(transition);
            this.fader.transitionOut(transition, function() {
                this.dispatchEvent('transitionedOut', transition);
            }.bind(this));

            return transition;
        },
        cleanUpTransition: function(transition) {
            if (transition.to === 'home') {
                document.body.showScrollbar();
            }

            this.header.cleanUpTransition(transition);
            this.fader.cleanUpTransition(transition);
        }
    })
});