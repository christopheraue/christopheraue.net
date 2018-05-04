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
            var transition = {category: targetCategory, transitionHeader: true};

            if (transition.category === 'home') {
                document.body.hideScrollbar();
            }

            // Transition header
            var header = document.querySelector('body > header');
            if (header.inView() && transition.category !== 'home') {
                transition.transitionHeader = false;
                header.classList.add('on-top');
                document.body.smoothScrollIntoView('top', '300ms ease-in-out');

                if (this.category !== transition.category) {
                    // Slide header navigation to selected item
                    var headerNavUl = document.querySelector('body > header nav ul'),
                        headerNavHeight = headerNavUl.children[0].offsetHeight;
                    Velocity(headerNavUl, {translateY: -headerNavHeight + 'px'}, 300, 'ease-in-out')
                }
            }

            // Transition content
            PageTransition.fader.hidePage(transition, function() {
                this.dispatchEvent('transitionedOut', transition);
            }.bind(this));

            return transition;
        },
        cleanUpTransition: function(transition) {
            document.body.showScrollbar();
            PageTransition.fader.cleanUpTransition(transition);

            var header = document.querySelector('body > header');
            !transition.transitionHeader && header.classList.remove('on-top');
        }
    })
});