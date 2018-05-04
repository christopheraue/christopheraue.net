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
            this.transitionBlocks = [new PageHeader(), PageTransition.fader];
        },
        transitionIn: function(transition) {
            var transitioning = [].concat(this.transitionBlocks),
                onTransitioned = function(block) {
                    transitioning.splice(transitioning.indexOf(block), 1);
                    if (transitioning.length > 0) { return }
                    this.cleanUpTransition(transition);
                }.bind(this);

            this.transitionBlocks.forEach(function(block) {
                block.transitionIn(transition, onTransitioned);
            });
        },
        transitionOut: function(targetCategory) {
            var transition = {from: this.category, to: targetCategory};

            if (transition.to === 'home') {
                document.body.hideScrollbar();
            }

            var transitioning = [].concat(this.transitionBlocks),
                onTransitioned = function(block) {
                    transitioning.splice(transitioning.indexOf(block), 1);
                    if (transitioning.length > 0) { return }
                    this.dispatchEvent('transitionedOut', transition);
                }.bind(this);

            this.transitionBlocks.forEach(function(block) {
                block.transitionOut(transition, onTransitioned);
            });

            return transition;
        },
        cleanUpTransition: function(transition) {
            if (transition.to === 'home') {
                document.body.showScrollbar();
            }

            this.transitionBlocks.forEach(function(block) {
                block.cleanUpTransition(transition);
            });
        }
    })
});