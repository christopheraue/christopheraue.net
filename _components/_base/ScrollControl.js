define([
  'lib/velocity'
],function(Velocity) {
  return {
    smoothScrollIntoView: function(el, options) {
      var duration = options.duration || 300,
          easing = options.easing || 'ease',
          anchor = options.anchor || 'center',
          distance,
          elRect = el.getBoundingClientRect();

      switch(anchor) {
        case 'top':
          distance = elRect.top;
          break;
        case 'bottom':
          distance = elRect.bottom - window.innerHeight;
          break;
        default: //case 'center':
          distance = elRect.top + elRect.height/2 - window.innerHeight/2;
          break;
      }

      window.scrollBy(0, distance);
      Velocity(document.body, {translateY: [0, distance]}, duration, easing, function() {
        document.body.style.transform = ''
      });
    },

    isInView: function(el) {
      var elRect = el.getBoundingClientRect();

      /*
       *
       *                               .---------.  ✓ top < innerHeight
       *                       inner   |         |  ✗ left < innerWidth
       *         0             Width   |         |  ✓ bottom > 0
       *       0 .---------------.     |         |  ✓ right > 0
       *         |               |     `---------´  ➥ outside
       *         |               |
       *         |               |
       *         |               |
       *         |           .---|-----.  ✓ top < innerHeight
       *   inner |           |   |     |  ✓ left < innerWidth
       *  Height `---------------´     |  ✓ bottom > 0
       *                     |         |  ✓ right > 0
       *                     `---------´  ➥ inside
       */
      return (
        elRect.top <= window.innerHeight &&
        elRect.left <= window.innerWidth &&
        elRect.bottom >= 0 &&
        elRect.right >= 0
      );
    },

    hideScrollbar: function(el) {
      var offsetWidth = (el === document.documentElement) ? window.innerWidth : el.offsetWidth,
          scrollbarWidth = offsetWidth - el.clientWidth,
          paddingRight = parseFloat(window.getComputedStyle(el, null).getPropertyValue('padding-right'));
      // add a padding to avoid jumps caused due to a disappearing scrollbar
      el.style['padding-right'] = (paddingRight + scrollbarWidth) + 'px';
      el.style['overflow'] = 'hidden';
    },

    showScrollbar: function(el) {
      el.style['padding-right'] = '';
      el.style['overflow'] = '';
    },

    disableScrolling: function(el) {
      el.savedscrollTop = el.scrollTop;
      this.hideScrollbar(el);
      el.style['position'] = "fixed";
      el.style['top'] = -el.savedscrollTop + 'px';
      el.style['width'] = "100%";
      el.style['box-sizing'] = "border-box";
    },

    enableScrolling: function(el) {
      this.showScrollbar(el);
      el.style['position'] = '';
      el.style['top'] = '';
      el.style['width'] = '';
      el.style['box-sizing'] = '';
      el.scrollTo(0, el.savedscrollTop);
      delete el.savedscrollTop;
    }
  }
});