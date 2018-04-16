define(function() {
    return function (x, y) {
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
    }
});