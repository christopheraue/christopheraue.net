define([
    './PageHeaderTransition',
    '_components/PageTransition/PageTransition',
    '_components/_global/ActivatableElement'
], function(PageHeaderTransition, PageTransition, ActivatableElement) {
    document.ready(function() {
        PageTransition.register(new PageHeaderTransition());

        var nav = document.querySelector('.PageHeader-Nav');
        if (!nav) { return }

        // Make the header navigation activatable
        var activatable = ActivatableElement.instanceFor(nav);
        activatable.activateOnMouseOver();
        activatable.activateOnTouchDownUp();
    });
});