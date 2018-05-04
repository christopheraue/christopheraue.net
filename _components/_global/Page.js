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
        },
        transitionIn: function(transition) {
            this.header.transitionIn(this, transition);

            PageTransition.fader.showPage(transition, function() {
                this.cleanUpTransition(transition);
            }.bind(this));
        },
        transitionOut: function(targetCategory) {
            var transition = {category: targetCategory};

            if (transition.category === 'home') {
                document.body.hideScrollbar();
            }

            this.header.transitionOut(this, transition);

            PageTransition.fader.hidePage(transition, function() {
                this.dispatchEvent('transitionedOut', transition);
            }.bind(this));

            return transition;
        },
        cleanUpTransition: function(transition) {
            document.body.showScrollbar();
            this.header.cleanUpTransition(this, transition);
            PageTransition.fader.cleanUpTransition(transition);
        }
    })
});