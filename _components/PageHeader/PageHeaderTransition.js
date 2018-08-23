define([
  'base/lib/velocity',
  'base/ScrollControl',
  'nav-DropdownNavigation'
], function(Velocity, ScrollControl, DropdownNavigation) {
  CSS_DURATION = /^(\d+(?:\.\d+)?)(s|ms)$/;

  return Object.inherit({
    constructor: function() {
      this.el = document.querySelector('.PageHeader');
    },
    transitionIn: function() {
      if (!this.el || !this.el.classList.contains('prepare-transition-in')) {
        return;
      }

      this.el.classList.remove('prepare-transition-in');
      this.el.classList.add('transition-in');

      var removeTransition = function() {
        this.el.removeEventListener('animationend', removeTransition);
        this.el.classList.remove('transition-in');
      }.bind(this);
      this.el.addEventListener('animationend', removeTransition);
    },
    transitionOut: function(transition, onTransitioned) {
      if (!this.el) {
        transition.transitionHeader = true;
        onTransitioned(this);
        return;
      }

      if (ScrollControl.isInView(this.el) && transition.to[0] !== 'root') {
        var match = getComputedStyle(this.el)['animation-duration'].match(CSS_DURATION),
            duration = (match[2] === 's' ? 1000 : 1) * parseFloat(match[1]);
        transition.transitionHeader = false;
        Velocity(document.body, 'scroll', duration, 'ease-in-out', function() {
          onTransitioned(this)
        }.bind(this));

        // Close the header navigation for its transition
        var categoryDropdown = new DropdownNavigation(this.el.querySelector('.nav-DropdownNavigation'));
        categoryDropdown.close();
        categoryDropdown.disable();
        document.onPersistedPageshow(function() {
          categoryDropdown.enable();
        }.bind(this));

        // Slide header navigation to the selected category
        if (transition.from[0] !== transition.to[0]) {
          categoryDropdown.select(transition.to[0] + '-category');
          document.onPersistedPageshow(function() {
            categoryDropdown.select(transition.from[0] + '-category');
          }.bind(this));
        }
      } else {
        transition.transitionHeader = true;

        this.el.classList.add('transition-out');
        document.onPersistedPageshow(function() {
          this.el.classList.remove('transition-out');
        }.bind(this));

        if (window.AnimationEvent) {
          var removeTransition = function() {
            this.el.removeEventListener('animationend', removeTransition);
            onTransitioned(this);
          }.bind(this);
          this.el.addEventListener('animationend', removeTransition);
        } else {
          onTransitioned(this);
        }
      }
    }
  })
});