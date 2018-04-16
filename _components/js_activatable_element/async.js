define([
    './js/activatable_element',
    'core-ext/document'
], function(ActivatableElement) {
    document.ready(function() {
        document.getElementsByClassName('js-activate-on-mousedownup').forEach(function (el) {
            ActivatableElement.instanceFor(el).activateOnMouseDownUp();
        });

        document.getElementsByClassName('js-activate-on-touchdownup').forEach(function (el) {
            ActivatableElement.instanceFor(el).activateOnTouchDownUp();
        });

        document.getElementsByClassName('js-activate-on-mousedown').forEach(function (el) {
            ActivatableElement.instanceFor(el).activateOnMouseDown();
        });

        document.getElementsByClassName('js-activate-on-touchdown').forEach(function (el) {
            ActivatableElement.instanceFor(el).activateOnTouchDown();
        });

        document.getElementsByClassName('js-activate-on-mouseover').forEach(function (el) {
            ActivatableElement.instanceFor(el).activateOnMouseOver();
        });

        // touch over (finger hovering over the display) does not exist
    });
});