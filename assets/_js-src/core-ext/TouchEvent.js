/*
 * Extension for TouchEvents.
 */

define(function() {
    if (window.TouchEvent) {
        Object.defineProperty(TouchEvent.prototype, 'touchTarget', {
            get: function () {
                var touch = this.changedTouches[0];
                return document.elementFromPoint(touch.clientX, touch.clientY);
            }
        });
    }
});