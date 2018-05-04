define([
    'lib/velocity'
], function(Velocity) {
    return Object.inherit({
        constructor: function() {
            this.el = document.querySelector('body > header');
        },
        transitionIn: function(transition, onTransitioned) {
            // CSS classes already set in inlined javascript in _markup.html
            onTransitioned(this);
        },
        transitionOut: function(transition, onTransitioned) {
            if (this.el.inView() && transition.to !== 'home') {
                transition.transitionHeader = false;
                this.el.classList.add('on-top');
                Velocity(document.body, 'scroll', 300, 'ease-in-out', function() {
                    onTransitioned(this)
                }.bind(this));

                if (transition.from !== transition.to) {
                    // Slide header navigation to selected item
                    var headerNavUl = document.querySelector('body > header nav ul'),
                        headerNavHeight = headerNavUl.children[0].offsetHeight;
                    Velocity(headerNavUl, {translateY: -headerNavHeight + 'px'}, 300, 'ease-in-out')
                }
            } else {
                transition.transitionHeader = true;
                onTransitioned(this);
            }
        },
        cleanUpTransition: function(transition) {
            !transition.transitionHeader && this.el.classList.remove('on-top');
        }
    })
});