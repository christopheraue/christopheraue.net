define([
    'lib/velocity',
    'core-ext/Element'
], function(Velocity) {
    return Object.inherit({
        constructor: function() {
            this.el = document.querySelector('body > header');
        },
        transitionIn: function(page, transition, onShown) {
            // CSS classes already set in inlined javascript in _markup.html
            // nothing else to do
        },
        transitionOut: function(page, transition, onHidden) {
            if (this.el.inView() && transition.category !== 'home') {
                transition.transitionHeader = false;
                this.el.classList.add('on-top');
                document.body.smoothScrollIntoView('top', '300ms ease-in-out');

                if (page.category !== transition.category) {
                    // Slide header navigation to selected item
                    var headerNavUl = document.querySelector('body > header nav ul'),
                        headerNavHeight = headerNavUl.children[0].offsetHeight;
                    Velocity(headerNavUl, {translateY: -headerNavHeight + 'px'}, 300, 'ease-in-out')
                }
            } else {
                transition.transitionHeader = true;
            }
        },
        cleanUpTransition: function(page, transition) {
            !transition.transitionHeader && this.el.classList.remove('on-top');
        }
    })
});