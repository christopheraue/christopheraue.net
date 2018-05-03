define([
    '_components/page_transition/js/PageTransition',
    'lib/velocity',
    'core-ext/body'
], function(PageTransition, Velocity) {
    return Object.inherit({
        constructor: function(category) {
            this.category = category;
        },
        transitionIn: function(transition) {
            // transition dependent CSS classes already set in _sync.js
            var fader = document.getElementById('transition-fader');
            Velocity(fader, {opacity: [0, 1]}, 300, 'ease-in-out', function(){
                this.cleanUpTransition(transition);
            }.bind(this));
        },
        transitionOut: function(targetCategory) {
            var transition = {category: targetCategory, fadeHeader: true},
                header = document.querySelector('body > header');

            if (header && header.inView() && transition.category !== 'home') {
                document.body.smoothScrollIntoView('top', '300ms ease-in-out');
                transition.fadeHeader = false;
            }

            if (transition.category === 'home') {
                document.body.hideScrollbar();
            }

            // Fade page
            document.body.classList.add(transition.category + '-transition');
            var fader = document.getElementById('transition-fader');
            Velocity(fader, {opacity: [1, 0]}, 300, 'ease-in-out', function(){
                PageTransition.dispatchEvent('transitioned', transition);
            });

            // Transition header
            if (transition.fadeHeader) {
                document.body.classList.add('header-fade-transition');
            } else if (this.category !== transition.category) {
                // Slide header navigation to selected item
                var headerNavUl = document.querySelector('body > header nav ul'),
                    headerNavHeight = headerNavUl.children[0].offsetHeight;
                Velocity(headerNavUl, {translateY: -headerNavHeight + 'px'}, 300, 'ease-in-out')
            }

            return transition;
        },
        cleanUpTransition: function(transition) {
            document.body.showScrollbar();
            document.body.classList.remove(transition.category + '-transition');
            transition.fadeHeader && document.body.classList.remove('header-fade-transition');
        }
    })
});