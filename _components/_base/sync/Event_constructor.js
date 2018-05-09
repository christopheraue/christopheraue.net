/*
 * Polyfill Event constructor in IE
 */

define(function(){
    if (typeof(window.Event) === 'function') {
        return;
    }

    var Event = function(name, params) {
        params = params || {};
        params.bubbles = ('bubbles' in params) ? params.bubbles : false;
        params.cancelable = ('cancelable' in params) ? params.cancelable : false;
        params.detail = ('detail' in params) ? params.detail : undefined;

        var event = document.createEvent('Event');
        event.initEvent(name, params.bubbles, params.cancelable, params.detail);
        return event;
    };

    Event.prototype = window.Event.prototype;

    window.Event = Event;
});