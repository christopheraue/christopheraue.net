define([
    'lib/velocity',
    'CategoryDropdown',
    '_base/ScrollControl'
], function(Velocity, CategoryDropdown, ScrollControl) {
    return Object.inherit({
        constructor: function() {
            this.el = document.querySelector('.PageHeader');
        },
        transitionIn: function(transition) {
            var duration = 300;

            // CSS styles for the transition already set in inlined javascript
            // in _markup.html
            if (this.el && transition.transitionHeader) {
                Velocity(this.el, {opacity: [1, 0]}, duration, 'ease-in-out', function() {
                    // Remove the styles set in _markup.html
                    this.el.style.opacity = ''
                }.bind(this))
            }
        },
        transitionOut: function(transition, onTransitioned) {
            var duration = 300;

            if (!this.el) {
                transition.transitionHeader = true;
                onTransitioned(this);
                return;
            }

            if (ScrollControl.isInView(this.el) && transition.to !== 'home') {
                transition.transitionHeader = false;
                Velocity(document.body, 'scroll', duration, 'ease-in-out', function() {
                    onTransitioned(this)
                }.bind(this));

                // Close the header navigation for its transition
                var categoryDropdown = new CategoryDropdown(this.el.querySelector('.CategoryDropdown'));
                categoryDropdown.disable();
                document.onPersistedPageshow(function() {
                    categoryDropdown.enable();
                }.bind(this));

                // Slide header navigation to the selected category
                if (transition.from !== transition.to) {
                    categoryDropdown.slideTo(transition.to, duration);
                    document.onPersistedPageshow(function() {
                        categoryDropdown.releaseSlide();
                    }.bind(this));
                }
            } else {
                transition.transitionHeader = true;
                Velocity(this.el, {opacity: [0, 1]}, duration, 'ease-in-out', function() {
                    document.onPersistedPageshow(function() {
                        this.el.style.opacity = ''
                    }.bind(this));
                    onTransitioned(this);
                }.bind(this))
            }
        }
    })
});