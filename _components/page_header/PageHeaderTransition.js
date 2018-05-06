define([
    'lib/velocity'
], function(Velocity) {
    return Object.inherit({
        constructor: function() {
            this.el = document.querySelector('.PageHeader');
        },
        transitionIn: function(transition) {
            // CSS styles already set in inlined javascript in _markup.html
            if (this.el && transition.transitionHeader) {
                Velocity(this.el, {opacity: [1, 0]}, 300, 'ease-in-out', function() {
                    this.cleanUpTransition(transition);
                }.bind(this))
            } else {
                this.cleanUpTransition(transition);
            }
        },
        transitionOut: function(transition, onTransitioned) {
            if (!this.el) {
                transition.transitionHeader = true;
                onTransitioned(this);
            } else if (this.el.inView() && transition.to !== 'home') {
                transition.transitionHeader = false;
                Velocity(document.body, 'scroll', 300, 'ease-in-out', function() {
                    onTransitioned(this)
                }.bind(this));

                if (transition.from !== transition.to) {
                    // Slide header navigation to selected item
                    var headerNavUl = document.querySelector('.PageHeader-NavList'),
                        headerNavHeight = headerNavUl.children[0].offsetHeight;
                    Velocity(headerNavUl, {translateY: -headerNavHeight + 'px'}, 300, 'ease-in-out')
                }
            } else {
                transition.transitionHeader = true;
                Velocity(this.el, {opacity: [0, 1]}, 300, 'ease-in-out', function() {
                    onTransitioned(this);
                }.bind(this))
            }
        },
        cleanUpTransition: function(transition) {
            if (this.el) {
                this.el.opacity = '';
            }
        }
    })
});