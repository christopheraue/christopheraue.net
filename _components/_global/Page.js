define([
    '_components/_global/EventTarget',
    'lib/velocity',
    '_components/page_transition/PageTransition',
    'core-ext/body'
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
            var transition = {category: targetCategory, transitionHeader: true},
                header = document.querySelector('body > header');

            if (header && header.inView() && transition.category !== 'home') {
                document.body.smoothScrollIntoView('top', '300ms ease-in-out');
                transition.transitionHeader = false;
            }

            if (transition.category === 'home') {
                document.body.hideScrollbar();
            }

            // Fade page
            PageTransition.fader.hidePage(transition, function() {
                this.dispatchEvent('transitionedOut', transition);
            }.bind(this));

            // Transition header
            if (!transition.transitionHeader && this.category !== transition.category) {
                // Slide header navigation to selected item
                var headerNavUl = document.querySelector('body > header nav ul'),
                    headerNavHeight = headerNavUl.children[0].offsetHeight;
                Velocity(headerNavUl, {translateY: -headerNavHeight + 'px'}, 300, 'ease-in-out')
            }

            return transition;
        },
        cleanUpTransition: function(transition) {
            document.body.showScrollbar();
            PageTransition.fader.cleanUpTransition(transition);
        }
    })
});