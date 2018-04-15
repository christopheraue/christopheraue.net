define([
    'core-ext/document'
], function() {
    var triggerMouseEnterAt = function(x, y) {
        var el = document.elementFromPoint(x, y);
        while (el) {
            var event;
            if(typeof(Event) === 'function') {
                event = new Event('mouseenter');
            } else {
                event = document.createEvent('Event');
                event.initEvent('mouseenter', true, true);
            }
            el.dispatchEvent(event);
            el = el.parentElement;
        }
    };

    return {
        triggerMouseEnterAfterPageLoad: function() {
            // document.initClient{X,Y} are set by a script inlined in the <head>.
            if (document.initClientX) {
                triggerMouseEnterAt(document.initClientX, document.initClientY);
            } else {
                var initHover = function(){
                    triggerMouseEnterAt(document.initClientX, document.initClientY);
                    document.removeEventListener('mouseover', initHover, false);
                };
                document.addEventListener('mouseover', initHover, false);
            }
        }
    }
});