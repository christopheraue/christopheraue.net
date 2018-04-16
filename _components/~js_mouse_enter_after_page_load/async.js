/*
 * ATTENTION!
 * Must run last on document.ready after all mouse enter event listeners
 * have been registered! That is why the component name starts with ~
 */

define([
    'core-ext/document'
], function() {
    var triggerMouseEnterAt = function (x, y) {
        var el = document.elementFromPoint(x, y);
        while (el) {
            var event;
            if (typeof(Event) === 'function') {
                event = new Event('mouseenter');
            } else {
                event = document.createEvent('Event');
                event.initEvent('mouseenter', true, true);
            }
            el.dispatchEvent(event);
            el = el.parentElement;
        }
    };

    document.ready(function() {
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