define([
    '_components/js_activatable_element/activatable_element',
    'core-ext/document'
], function(ActivatableElement) {
    document.ready(function() {
        var nav = document.querySelector('body > header nav');
        if (!nav) { return }
        var activatable = ActivatableElement.instanceFor(nav);
        activatable.activateOnMouseOver();
        activatable.activateOnTouchDownUp();
    });
});