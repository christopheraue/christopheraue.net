/*
 *  Triggering the initial mouseenter event must be initialized last
 *  during document.ready so that all mouse enter event listeners have
 *  been registered.
 */
define(function() {
  document.ready(function() {
    var triggerMouseEnterAt = function (x, y) {
      var el = document.elementFromPoint(x, y),
          ev = new Event('mouseenter', {bubbles: true});
      el.dispatchEvent(ev);
    };

    if (document.initClientX) {
      triggerMouseEnterAt(document.initClientX, document.initClientY);
    } else {
      var initHover = function(){
        triggerMouseEnterAt(document.initClientX, document.initClientY);
        document.removeEventListener('mouseover', initHover, false);
      };
      document.addEventListener('mouseover', initHover, false);
    }
  });
});