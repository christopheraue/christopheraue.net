define([
    '_components/_global/ActivatableElement'
], function(ActivatableElement) {
    document.ready(function() {
        var nav = document.querySelector('body > header nav');
        if (!nav) { return }
        var activatable = ActivatableElement.instanceFor(nav);
        activatable.activateOnMouseOver();
        activatable.activateOnTouchDownUp();
    });
});