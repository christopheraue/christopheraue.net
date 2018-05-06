define([
    'lib/velocity',
    '_components/CategoryDropdown/CategoryDropdown'
], function(Velocity, CategoryDropdown) {
    return Object.inherit({
        constructor: function() {
            this.el = document.querySelector('.PageHeader');
        },
        transitionIn: function(transition) {
            var duration = 300;

            // CSS styles already set in inlined javascript in _markup.html
            if (this.el && transition.transitionHeader) {
                Velocity(this.el, {opacity: [1, 0]}, duration, 'ease-in-out', function() {
                    this.cleanUpTransition(transition);
                }.bind(this))
            } else {
                this.cleanUpTransition(transition);
            }
        },
        transitionOut: function(transition, onTransitioned) {
            var duration = 300;

            if (!this.el) {
                transition.transitionHeader = true;
                onTransitioned(this);
                return;
            }

            if (this.el.inView() && transition.to !== 'home') {
                transition.transitionHeader = false;
                Velocity(document.body, 'scroll', duration, 'ease-in-out', function() {
                    onTransitioned(this)
                }.bind(this));

                // Close the header navigation for its transition
                var categoryDropdown = new CategoryDropdown(this.el.querySelector('.CategoryDropdown'));
                categoryDropdown.disable();
                window.addEventListener('pageshow', function(e) {
                    if (!e.persisted) { return }
                    categoryDropdown.enable();
                }, false);

                // Slide header navigation to the selected category
                if (transition.from !== transition.to) {
                    categoryDropdown.slideTo(transition.to, duration);
                    window.addEventListener('pageshow', function(e) {
                        if (!e.persisted) { return }
                        categoryDropdown.releaseSlide();
                    }, false);
                }
            } else {
                transition.transitionHeader = true;
                Velocity(this.el, {opacity: [0, 1]}, duration, 'ease-in-out', function() {
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