define([
    'base-_base/ActivatableElement'
], function(ActivatableElement) {
    document.ready(function() {
        var nav = document.querySelector('.CategoryDropdown');
        if (!nav) { return }

        // Make the header navigation activatable
        var activatable = ActivatableElement.instanceFor(nav);
        activatable.activateOnMouseOver();
        activatable.activateOnTouchDownUp();
    });
});